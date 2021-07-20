import React, { useRef, useState, useEffect } from 'react';
import '../catalogo/catalogo.css';
import CardItem from '../catalogo/card-item';
import Cards_catalogo from './cards-catalogo';
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import {Link, Redirect} from 'react-router-dom';
import {peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion} from '../../../services/Auth';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function Cards() {

//State que recibe el allow de peticionUsuarioLoggeado:
const [allowed, setAllow] = useState({});

//State que confirma una sesión iniciada:
const [isSigned, setIsSigned] = useState(null);

const [user, setUser] = useState({});

//Pregunta por el token y si hay una sesión iniciada
const pedirLogg = async () => {

    try {

      console.log(1);
      var response = await peticionUsuarioLoggeado(cookies.get('auth'), cookies.get('refreshToken'));
      setAllow(response);
      setIsSigned(response.status);
      console.log("Me ejecuté.")

    } catch (err) {
      console.log(err);
    }
  }

//Recibe la información del usuario logeado
const pedirDatos = async () => {

    try {
      console.log(2);
      var rr = await peticionDatoUsuario(cookies.get('user'));
      setUser(rr.user);
      console.log('- Yo también.');
      console.log('- METIDO.');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    pedirDatos();
    pedirLogg();
  }, [isSigned]);

  if(isSigned==false){
      return(
        <Redirect to="/" />
      )
  } else if
      (isSigned==true){
        return (
            <React.Fragment>
            <Navbar />
              <div className='cards'>
                <div className='cards__container'>
                  <div className='cards__wrapper'>
                    <ul className='cards__items'>
                    <CardItem
                        src='images/8.jpg'
                        text='Nombre del libro'
                        label='Matematicas'
                        path='/registro'
                      />
                     <CardItem
                        src='images/3.jpg'
                        text='Nombre del libro'
                        label='Literatura'
                        path='/registro'
                      />
                      <CardItem
                        src='images/1.jpg'
                        text='Nombre del libro'
                        label='Cultural'
                        path='/registro'
                      />
                      <CardItem
                        src='images/2.jpg'
                        text='Nombre del libro'
                        label='Cultural'
                        path='/registro'
                      />
                    </ul>
                    <ul className='cards__items'>
                      <CardItem
                        src='images/9.jpg'
                        text='Nombre del libro'
                        label='Matematicas'
                        path='/registro'
                      />
                      <CardItem
                        src='images/4.jpg'
                        text='Nombre del libro'
                        label='Historia'
                        path='/registro'
                      />
                      <CardItem
                        src='images/6.jpg'
                        text='Nombre del libro'
                        label='Ambiental'
                        path='/registro'
                      />
                      <CardItem
                        src='images/7.jpg'
                        text='Nombre del libro'
                        label='Cultural'
                        path='/registro'
                      />
                      
                    </ul>
                  </div>
                </div>
              </div>
            </React.Fragment>
            ); 
      }
      else {
        <React.Fragment>
        <Navbar />
        </React.Fragment>
      }
  
  //Funcion para el boton de login:

    return (
    <React.Fragment>
    <Navbar />
    <Cards_catalogo />
    </React.Fragment>
    );
  }
  
  export default Cards;
  