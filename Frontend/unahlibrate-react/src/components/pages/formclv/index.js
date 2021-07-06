import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import "./estilos.css";
import Swal from "sweetalert2";
import SessionStorageService from "../../../services/Storage";
import { loginUser } from '../../../services/Login';
import {Redirect} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';

const Formclv = ({ history }) => {
  //Creando el state para leer los inputs:
  const [information, handleInformation] = useState({
    ContraseñaActual: "",
    ContraseñaNueva: "",
    ConfirmacionContraseña: ""

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

  //State para validacion del correo:
  //const [errorUser, handleErrorUser] = useState(false);

  //Extrayendo los valores con destructuring:
  const { ContraseñaActual, ContraseñaNueva ,ConfirmacionContraseña} = information;



  //Funcion para el boton de login:
  
  
 
  return (
    <React.Fragment>
      <Navbar />
    <div className="limiter">
      <div className="container-login100 imagenFondo">
        <div className="wrap-login500 p-l-50 p-r-50 p-t-77 p-b-30">
          <form className="login-form validate-form" >
            <span className="login100-form-title p-b-21">Cambiar Contraseña</span>
            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="ContraseñaActual"
                placeholder="Contraseña Anterior"
                onChange={handleChangeInfo}
                value={ContraseñaActual}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-lock"></span>
              </span>
            </div>

            <div
            className="wrap-input100 validate-input m-b-16"
            data-validate="Password is required"
          >
            <input
              className="input100"
              type="password"
              name="ContraseñaNueva"
              placeholder="Contraseña Nueva"
              onChange={handleChangeInfo}
              value={ContraseñaNueva}
            />
            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <span className="lnr lnr-lock"></span>
            </span>
          </div>
          <div
          className="wrap-input100 validate-input m-b-16"
          data-validate="Password is required"
        >
          <input
            className="input100"
            type="password"
            name="ConfirmacionContraseña"
            placeholder="Confirma tu Contraseña"
            onChange={handleChangeInfo}
            value={ConfirmacionContraseña}
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
                Actualizar
              </button>
            </div>

    
          </form>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default Formclv;
