const {google} = require('googleapis');
const {CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN} = require ('./../config/googleAuth');
const fs = require('fs');
const path = require('path');

uploadUserImage = (request, response, next) => {

	const oauth2Client = new google.auth.OAuth2(
	  CLIENT_ID,
	  CLIENT_SECRET,
	  REDIRECT_URI
	)

	oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

	const drive = google.drive({version: 'v3', auth: oauth2Client});

	var fileName = 'imagen no subida';
    var files = req.files;
    if (!files) {
        return res.status(404).send({
            status: 'error',
            message: fileName
        });
    }
    //Conseguir el nombre y la extension del archivo
    var filePath = req.files.file0.path;
    var fileSplit = filePath.split(`${path.sep}`) //Para linux es /

    //Nombre del archivo
    fileName = fileSplit[fileSplit.length - 1];
    //Extension del archivo
    var extensionSplit = fileName.split('\.');
    var fileExtension = extensionSplit[extensionSplit.length - 1];
    //Comprobar con la extension, solo imagenes, si no es valida borrar el fichero
    if
        (fileExtension != 'png' && fileExtension != 'jpg' && fileExtension != 'jpeg' && fileExtension != 'gif') {
        //borrar el archivo
        fs.unlink(filePath, (err) => {
			return res.status(501).send({
                status: 'error',
                message: 'extension de la imagen invalida'
            });
        });
	} else {

		drive.files.create({
      		requestBody: {
        		'name': fileName,
        		'parents': ['1fkDRrc0Le-OsVVBPSvp6jZ9QSOm7F4UU'], //Id de la carpeta users
       			'mimeType': `image/${fileExtension}`
     		},
      		media: {
        		mimeType: `image/${fileExtension}`,
        		body: fs.createReadStream(`${filePath}`)
      		}
    	}, (err, file) => {
    		if (err){
    			console.log(err);
    			return response.status(500).send({
    				status: 'error', 
    				message: 'Error en la subida de la imagen'
    			})
    		} else {
    			drive.permissions.create({fileId: file.id, requestBody: {role: 'reader', type: 'anyone'}}, (err2, permission) => {
    				if (err2) {
    					console.log(err2);
						return response.status(500).send({
    						status: 'error', 
    						message: 'Error en los permisos de la imagen'
    					});
    				} else {
						drive.files.get({fileId: file.id, fields: '*'}, (err3, gotFile) => { //fields: 'webViewLink, webContentLink'
							if (err3){
								console.log(err3);
								return response.status(500).send({
		    						status: 'error', 
		    						message: 'Error en los permisos de la imagen'
		    					});
							} else {
								let fileLink = gotFile.webContentLink.split(`&`)[0];
								response.fileLink = fileLink;
								next('route');
							}
						})
    				}
    			});
    		}
    	});
	}

};

module.exports = uploadUserImage;