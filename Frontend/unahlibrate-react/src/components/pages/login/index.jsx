import React, { useState } from "react";
import { Link } from "react-router-dom";
import './style.css'
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import Swal from "sweetalert2";
import SessionStorageService from "../../../services/Storage";
import { loginUser } from '../../../services/Login';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';


const cookies = new Cookies();

const FormLog = ({ history }) => {
  //Creando el state para leer los inputs:
  const [information, handleInformation] = useState({
    Usuario: "",
    Contraseña: "",
  });

  //Funcion que se ejecuta cuando se escribe en un input:
  const handleChangeInfo = (e) => {
    handleInformation({
      ...information,
      [e.target.name]: e.target.value,
    });
  };

  //Funcion para validar el correo:
  /*
  const validarEmail = () => {
    const patron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (patron.test(document.getElementById("userInput").value)) {
      handleErrorEmail(false);
    } else {
      handleErrorEmail(true);
    }
  };
  */

  /*COOKIE*/
  //const [cookies, setCookie, removeCookie] = useCookies(['auth', 'refreshToken', 'user']);

  //State para el error:
  const [error, handleError] = useState(false);

  //State para la respuesta:
  const [respuesta, setRespuesta] = useState({});

  //State para validacion del correo:
  //const [errorUser, handleErrorUser] = useState(false);

  //Extrayendo los valores con destructuring:
  const { Usuario, Contraseña } = information;

  //Funcion para el boton de login:
  const submitUser = (e) => {
    e.preventDefault();

    //Validacion:
    if (Usuario.trim() === "" || Contraseña.trim() === "") {
      handleError(true);
      return;
    }

    handleError(false);
    
    var resp = loginUser(Usuario, Contraseña)
      .then(res => {
        console.log(res);
        if (res.code === 403){
          //Contraseña incorrecta.
          setRespuesta({
            status: 'incorrect pass'
          });
          console.log(respuesta);
        } else if (res.code === 404 && res.status === 'error'){
          //Usuario inexistente.
          setRespuesta({
            status: 'incorrect user'
          });
          console.log(respuesta);
        } else if (res.code === 404 && res.status === 'failed'){
          //Error en el touken.
          setRespuesta({
            status: 'server error'
          });
          console.log(respuesta);
          } else {
            cookies.set('auth', res.response.token, {path: "/"});
            cookies.set('refreshToken', res.response.refreshToken, {path: "/"});
            cookies.set('user', res.response.user.user, {path: "/"});
            setRespuesta({
              status: 'logged'
            });
        }
        console.log(respuesta);
      })
      .catch(err => {
        console.log('From error');
      })

    //Peticion al servidor Login

    //Almaceno el token.

    //Hacer nueva petición al backend con el token en la cookie.
    //Retornar un nuevo componente.

    //--FUERA DE TODO ESO, ACÁ ANDO PROBANDO
  }
  
  if (respuesta.status === 'logged'){
    console.log(respuesta);
    return (
      <Redirect to={{pathname:'/perfilusuario', state: {user: Usuario}}}/>
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
            <p className='text-center w-full p-b-25'>Bienvenido a esta comunidad en crecimiento.</p>

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

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="Contraseña"
                placeholder="Contraseña"
                onChange={handleChangeInfo}
                value={Contraseña}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-lock"></span>
              </span>
            </div>

            {error ? (
              <p className="alert alert-danger error-p text-white">
                La contraseña no puede estar vacia
              </p>
            ) : null}

            {respuesta.status === 'incorrect pass' ? (
              <p className="alert alert-danger error-p text-white">
                La contraseña no es válida
              </p>
            ) : null}


            <div className="container-login100-form-btn p-t-25">
              <button type="submit" className="login100-form-btn">
                Iniciar Sesión
              </button>
            </div>
              
            <div className="text-center w-full p-t-25">
              <span className="txt1 mr-2">¿Olvidaste tu contraseña? </span>
              <Link className="txt1 bo1 hov1" to="/recuppassword">
                Recuperar
              </Link>
              </div> 
  

            <div className="text-center w-full p-t-25">
              <span className="txt1 mr-2">¿No tienes cuenta? </span>
              <Link className="txt1 bo1 hov1" to="/registro">
                Regístrate
              </Link>
  
            </div>
          </form>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default FormLog;
