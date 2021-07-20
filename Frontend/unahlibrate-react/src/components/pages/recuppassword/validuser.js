import React, { useState } from "react";
import { Link } from "react-router-dom";
import './style.css'
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import Swal from "sweetalert2";
import SessionStorageService from "../../../services/Storage";
import { forgotPassword } from '../../../services/User';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';

const cookies = new Cookies();

const FormValiduser = ({ history }) => {
  //Creando el state para leer los inputs:
  const [information, handleInformation] = useState({
    Usuario: "",
  });

  //Funcion que se ejecuta cuando se escribe en un input:
  const handleChangeInfo = (e) => {
    handleInformation({
      ...information,
      [e.target.name]: e.target.value,
    });
  };

  //State para el error:
  const [error, handleError] = useState(false);

  //State para la respuesta:
  const [respuesta, setRespuesta] = useState({});

  //Extrayendo los valores con destructuring:
  const { Usuario } = information;

  //Funcion para el boton de login:
  const submitUser = (e) => {
    e.preventDefault();

    //Validacion:
    if (Usuario.trim() === "") {
      handleError(true);
      return;
    }

    handleError(false);
    
    forgotPassword(Usuario)
      .then( (resp) => {
        if (resp.status === 'success'){
          Swal.fire(
            'Correo enviado',
            'Verifica tu correo, se ha enviado uno para que recuperes tu contraseña.',
            "success"
            ).then((resps) => {
              console.log(resp);
            })
          .catch((err) => {
            console.log(err);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: resp.title,
            text: resp.text
          })
        }
      }

        )
      .catch(
        );
  }
  
  if (respuesta.status === 'logged'){
    console.log(respuesta);
    return (
      <Redirect to={{pathname:'/perfil', state: {user: Usuario}}}/>
      )
  }
  return (
    <React.Fragment>
      <Navbar />

    <div className="limiter">
      <div className="container-login100 bkgImgLogIn">
        <div className="wrap-login500 p-l-50 p-r-50 p-t-77 p-b-30">
          <form className="login-form validate-form" onSubmit={submitUser}>
            <img id='logounahlibrate-azul' className='center' src='/images/Logo-175ca8.png' height={35}/>
            <p className='text-center w-full p-b-25'>Ingresar Usuario</p>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                id="userInput"
                className="input100"
                type="text"
                name="Usuario"
                placeholder="Usuario"
                onChange={handleChangeInfo}
                value={Usuario}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-user"></span>
              </span>
            </div>

            {respuesta.status === 'incorrect user' ? (
              <p className="alert alert-danger error-p text-white">
                El usuario ingresado no es valido
              </p>
            ) : null}

            <div className="container-login100-form-btn p-t-25">
              <button type="submit" className="login100-form-btn">
                Recuperar Contraseña
              </button>
            </div>  
          </form>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default FormValiduser;
