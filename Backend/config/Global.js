const {port} = require('../index'); 

module.exports = Global = {
	//urlApi: `http://localhost:${port}/api/`, //En producción, se tiene que dejar este.
	urlApi: `http://localhost:3900/api/`, //En desarrollo local, este se tiene que dejar.
	//urlApi: `${window.location.hostname}`,
	//Cosas del token.
	tokenExpires: '60m',
	refreshTokenExpires: 72000 //Segundos. Va en números, por el modelo de refreshtoken.
}