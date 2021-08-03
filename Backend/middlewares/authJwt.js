const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {TokenExpiredError} = jwt;

// Authorization: Bearer <token>
verifyToken = (req, res, next) => {
     
     const bearerHeader =  req.headers['authorization'];

     if(typeof bearerHeader !== 'undefined'){
          const bearerToken = bearerHeader.split(" ")[1];
          req.token  = bearerToken;
     }else{
         return res.status(403).send({
         	status: 'error',
         	message: 'No hay token.'
         });
     }

     jwt.verify(req.token, 'secretkey', (err, info) => {
     	if (err || !info){
     	if(err instanceof TokenExpiredError){
     			return res.status(403).send({
     				status: 'expired',
     				message: 'El token ha expirado.'
     			});
     		} else {
                    var f = new Date();
                    console.log('Error + ', f);
     			//console.log(err);
	     		return res.status(401).send({
	     			status: 'error',
	     			message: 'El token no sirve. No hay acceso.'
	     		});
     		}
     	} else if (info) {
     		//console.log('Correcto.');
               //console.log(`Este es info:`);
               //console.log(info);
     		//Esto, traer la información decodificada.
     		res.userData = info;
     		next();
     	}
     })

}

module.exports = verifyToken;