import {port} from '../index'; 

module.exports = Global = {
	urlApi: `http://localhost:${port}/api/`,
	//Cosas del token.
	tokenExpires: '60m',
	refreshTokenExpires: 72000 //Segundos. Va en números, por el modelo de refreshtoken.
}