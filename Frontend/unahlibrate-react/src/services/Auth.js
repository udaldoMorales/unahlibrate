import {URL_POST_USER_REFRESH, URL_GET_USER_ACCESS} from '../constants/urls';
import axios from 'axios';

export const esUsuario = async (user, cookie, refreshCookie) => {

	var responseTo;

	try {

		var peticionToken = await axios.get(URL_GET_USER_ACCESS, { headers: {'Authorization': `Bearer ${cookie}`} })
		
		responseTo = peticionToken.data;
		console.log('Aquí se imprime:');
		console.log(responseTo);
		return responseTo;

	} catch(error) {

		console.log('Response erro');
		let {response} = error;

		console.log('Response erro');
		if (response.data.status === 'error' && response.status === 403){
		
			responseTo = response.data;
			console.log('Aquí viene:');
			console.log(responseTo);
			return responseTo;
		
		} else if (response.data.status === 'error' && response.status === 401) {

			console.log('Aquí viene: 2');
			responseTo = response.data;
			console.log(responseTo);
			return responseTo;

		} else if (response.data.status === 'expired' && response.status === 403){
		
			//Petición refresh.
			console.log('Response:');
			console.log(response.data);
			try {
				console.log('Llegaste?');
				var refresh = await axios.post(URL_POST_USER_REFRESH, {user, refreshToken: refreshCookie});
				console.log('Llegá, pues.');
				return refresh.data;
			} catch(err) {
				console.log('Response pre');
				var queDa = err.response;
				console.log('Response fff');
				console.log(queDa);
				return queDa.data;

			}
			
		} else {
			console.log(response);
		}

	}

}