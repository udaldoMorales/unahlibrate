import {URL_POST_USER_REFRESH, URL_GET_USER_ACCESS, URL_GET_GET_USERNAME} from '../constants/urls';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const esUsuario = async (cookie, refreshCookie) => {

	var responseTo;

	try {

		console.log(cookie);
		console.log(refreshCookie);
		var peticionToken = await axios.get(URL_GET_USER_ACCESS, { headers: {'Authorization': `Bearer ${cookie}`} })
		
		responseTo = peticionToken.data;
		console.log('Aquí hay resultado positivo, el token es correcto:');
		console.log(responseTo);
		return responseTo;

	} catch(error) {

		console.log('El token no es el correcto');
		let {response} = error;

		console.log('Response erro');
		if (response.data.status === 'error' && response.status === 403){
		
			responseTo = response.data;
			console.log('No hay token');
			console.log(responseTo);
			return responseTo;
		
		} else if (response.data.status === 'error' && response.status === 401) {

			console.log('Token no sirve');
			responseTo = response.data;
			console.log(responseTo);
			return responseTo;

		} else if (response.data.status === 'expired' && response.status === 403){
		
			//Petición refresh.
			console.log('El token expiró');
			console.log(response.data);
			try {
				console.log('Llegaste? Digo, a pedir el nuevo token');
				var refresh = await axios.post(URL_POST_USER_REFRESH, {refreshToken: refreshCookie});
				console.log(refresh.status);
				console.log('Sí, se dio el nuevo token.')
				return refresh.data;
			} catch(err) {
				console.log('No se está dando el nuevo token');
				var queDa = err.response;
				console.log(queDa.status);
				console.log('Quiero saber qué pasó.');
				console.log(queDa);
				return queDa.data;

			}
			
		} else {
			console.log(response);
		}

	}

}

export const peticionDatoUsuario = async (userName) => {
    //console.log('me ejecuté acá.')
    try {
    	let rrr = await axios.get(`${URL_GET_GET_USERNAME}${userName}`);
        return ({
       		user: rrr.data.user[0]
      	});

    } catch (err) {
        let {response} = err;
        console.log(response);
    }
         
}

export const peticionUsuarioLoggeado = async (cookie, refreshCookie) => {
	var allowed = {};

	try {


		var response = await esUsuario(cookie, refreshCookie);
		if (response) {
			console.log('¿Qué hay acá?');
			console.log(response);
		}


        if(response.status === 'error'){
          //No devolver nada.
          console.log('Respuesta de Usuario: 1')
          allowed = {
              status: false,
              message: 'not'  
            };
          console.log(allowed.message);
          return allowed;

        } else if (response.status === 'noToken'){
          console.log('Respuesta de Usuario: 2')
          allowed = {
              status: false,
              message: 'sentOff'
            }
          	return allowed;	
          console.log(allowed.message);
        }
        else if (response.status === 'newToken'){
          
        	console.log('Respuesta de Usuario: 3')

          cookies.set('auth', response.accessToken, {path: '/'});
          cookies.set('refreshToken', response.accessToken, {path: '/'});
            
          allowed = {
              status: true,
              message: 'remain'
            }
          	return allowed;	
          console.log(allowed.message);

        } else if (response.status === 'noTokenExp'){
          console.log('Respuesta de Usuario: 4')

          allowed = {
              status: false,
              message: 'out'
            };
            return allowed;	
        } else if (response.status === 'success'){
          console.log('Cambié todo.');
          //setUserLogged(response.loggedUser);
          
		console.log('Respuesta de Usuario: 5')
          allowed = {
              status: true,
              message: 'in'
            }
          console.log('Se comprobó primero');
          return allowed;
          console.log(allowed.message);
        }
        return allowed;	


	} catch (err) {
		console.log(err);
		return (err);
	}

}


export const cerrarSesion = () => {
	cookies.remove('user', {path: "/"});
	cookies.remove('auth', {path: "/"});
	cookies.remove('refreshToken', {path: "/"});
}