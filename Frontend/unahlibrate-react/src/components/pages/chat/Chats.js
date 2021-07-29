//Panel para ver los chats que tenga un usuario.

import React, {useState, useEffect, useRef} from 'react';

import socket from './../../../sockets/socket';
import './chat.css';

//Importaciones del proyecto
import Navbar from './../Home/Navbar';
import { peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion } from '../../../services/Auth';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Chats = () => {

	//Cosas del proyecto
	//State que recibe el allow de peticionUsuarioLoggeado:
	const [allowed, setAllow] = useState({});

	//State que confirma una sesión iniciada:
	const [isSigned, setIsSigned] = useState(null);

	const [user, setUser] = useState({});
	//Cosas del proyecto

	//Cosas del proyecto
	//Pregunta por el token y si hay una sesión iniciada
	const pedirLogg = async () => {

	try {

		var response = await peticionUsuarioLoggeado(cookies.get('auth'), cookies.get('refreshToken'));
		setAllow(response);
		setIsSigned(response.status);

	} catch (err) {
		console.log(err);
	}
	}

	//Recibe la información del usuario logeado
	const pedirDatos = async () => {

	try {

		var rr = await peticionDatoUsuario(cookies.get('user'));
		setUser(rr.user);

	} catch (err) {
		console.log(err);
		}
	}

	useEffect(() => {
		pedirDatos();
		pedirLogg();
		//setNombre(user.user);
	}, [isSigned]);

	if(isSigned==false){
		return(
			<Redirect to="/" />
		  )
		} else if
		(isSigned==true) {
		return (
			<React.Fragment>
			<Navbar />
			<p>Hello, World!</p>
			</React.Fragment>
			);
		} else {
			return (
			<React.Fragment>
			<Navbar />
			</React.Fragment>
			);
		}

}

export default Chats;