import axios from "axios";
import { URL_POST_LOGIN } from "../constants/urls";

export const loginUser = async (user, password) => {

	const data = {
		user,
		password
	};

 	var toSend;

 	try {
	var peiticion = await axios.post(URL_POST_LOGIN, data);
		//console.log(peiticion);
		console.log('Aquí llega la respuesta.');
		toSend = {
			status: peiticion.data.status,
			code: peiticion.status,
			response: peiticion.data
		}
		return toSend;
 	} catch (err) {
 		//console.log(err);
		console.log('Aquí llega el error.');
 		let {response} = err;
 		toSend = {
			status: response.data.status,
			code: response.status,
			response: response.data
		};
		return toSend;
 	}
}