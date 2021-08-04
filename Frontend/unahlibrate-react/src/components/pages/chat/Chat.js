//Chat entre dos usuarios.

import React, {useState, useEffect, useRef} from 'react';

import socket from './../../../sockets/socket';
import './chat.css';

//Importaciones del proyecto
import Navbar from './../Home/Navbar';
import { peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion } from '../../../services/Auth';
import {Redirect, useLocation} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Chat = () => {

	const location = new useLocation();

	const usuario1 = location.state.user1;
	const usuario2 = location.state.user2;

	//Cosas del proyecto:
	//State que recibe el allow de peticionUsuarioLoggeado:
	const [allowed, setAllow] = useState({});

	//State que confirma una sesión iniciada:
	const [isSigned, setIsSigned] = useState(null);

	const [user, setUser] = useState({});

	const [user2, setUser2] = useState({});
	//Cosas del proyecto

	//Cosas para el chat entre dos
	const [mensajes, setMensajes] = useState(null);

	const [mensajeAEnviar, setMensajeAEnviar] = useState('');
	//Cosas para el chat entre dos

	//Cosas del proyecto
	//Pregunta por el token y si hay una sesión iniciada
	const pedirLogg = async () => {

	try {

	//console.log(1);
	var response = await peticionUsuarioLoggeado(cookies.get('auth'), cookies.get('refreshToken'));
	setAllow(response);
	setIsSigned(response.status);
	//console.log("Me ejecuté.")

	} catch (err) {
	console.log(err);
	}
	}

	//Recibe la información del usuario logeado
	const pedirDatos = async () => {

	try {
	//console.log(2);
	var rr = await peticionDatoUsuario(cookies.get('user'));
	setUser(rr.user);
	//console.log('- Yo también.');
	//console.log('- METIDO.');
	} catch (err) {
	console.log(err);
	}

	}


	//useEffect del Proyecto:
	useEffect(() => {
		
		pedirDatos();
		pedirLogg();

		if(user && (user._id !== undefined)) {
			console.log(`user1: ${user._id}`);
			console.log(`user2: ${usuario2}`);
			console.log('Lo tomo de user');
			socket.emit('individualChat', user._id, usuario2);
		} else {
			console.log('Lo tomo de prop.location.state');
			socket.emit('individualChat', usuario1, usuario2);
		}
		
		/*
		socket.on('chat', (messages) => {
			setMensajes(messages);
		});

		socket.on('nochat', (message) => {
			setMensajes(message)
		})

		console.log(`Mensajes: ${mensajes}`);
	*/

	}, [isSigned]);

	useEffect(() => {
		if(user) {
			console.log(`user1: ${user._id}`);
			console.log(`user2: ${usuario2}`);
			//socket.emit('individualChat', user._id, usuario2);
		}
		
		socket.on('chat', (messages) => {
			setMensajes(messages);
		});

		socket.on('nochat', (message) => {
			setMensajes(message)
		})

		console.log(`Mensajes: ${mensajes}`);
	}, [mensajes]);

	
	//Cosas del chat entre dos
	const submit = function (e) {
		e.preventDefault();

		console.log(mensajeAEnviar)
		socket.emit('message', mensajeAEnviar, user._id, usuario2, false);
		setMensajeAEnviar('');
	}
	//Cosas del chat entre dos

	//Del proyecto
	if(isSigned==false){
      return(
        <Redirect to="/" />
      )
  	} else if
      (isSigned==true) {
	return (
		<React.Fragment>
		<Navbar />
		<div className='chat'>
			{(mensajes instanceof Array) && mensajes.map((e,i) => {
				if(e.sender===user._id){
					return (
						<div key={i} className='right'>{`${e.sender}: ${e.content}`}</div>
						);
				} else {
					return (
						<div key={i} className='left'>{`${e.sender}: ${e.content}`}</div>
						);
				}	
			})}
			{(mensajes === 'None') && <div>Sin mensajes</div>}
			{(mensajes === null) && <div>No sé qué carajo.</div>}
		</div>

		<form onSubmit={submit}>
			<label htmlFor=''>Escriba su mensaje</label>
			<textarea name='' id=''  cols='30' rows='10' value={mensajeAEnviar} onChange={e => setMensajeAEnviar(e.target.value)}></textarea>
			<button>Enviar</button>
		</form>
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

export default Chat;