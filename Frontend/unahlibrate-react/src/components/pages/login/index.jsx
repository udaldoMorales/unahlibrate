import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import Swal from "sweetalert2";
import SessionStorageService from "../../../services/Storage";

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
  const validarEmail = () => {
    const patron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (patron.test(document.getElementById("emailInput").value)) {
      handleErrorEmail(false);
    } else {
      handleErrorEmail(true);
    }
  };

  //State para el error:
  const [error, handleError] = useState(false);

  //State para validacion del correo:
  const [errorEmail, handleErrorEmail] = useState(false);

  //Extrayendo los valores con destructuring:
  const { Usuario, Contraseña } = information;

  //Funcion para el boton de login:
  const submitUser = (e) => {
    e.preventDefault();

    validarEmail();

    //Validacion:
    if (Usuario.trim() === "" || Contraseña.trim() === "") {
      handleError(true);
      return;
    }

    handleError(false);

    //Peticion a endpoint de user
    
  };

  return (
    <div className="limiter">
      <div className="container-login100 bkgImgLogIn">
        <div className="wrap-login500 p-l-50 p-r-50 p-t-77 p-b-30">
          <form className="login-form validate-form" onSubmit={submitUser}>
            <span className="login100-form-title p-b-55">Login UNAHLibrate</span>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                id="emailInput"
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

            {errorEmail ? (
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

            <div className="contact100-form-checkbox m-l-4">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
              <label className="label-checkbox100">Recuerdame</label>
            </div>

            <div className="container-login100-form-btn p-t-25">
              <button type="submit" className="login100-form-btn">
                Iniciar Sesión
              </button>
            </div>

            <div className="text-center w-full p-t-115">
              <span className="txt1 mr-2">¿No tienes cuenta?</span>
              <Link className="txt1 bo1 hov1" to="/registro">
                Registrarse
              </Link>
              <div className="pt-2">
                <span className="txt1 mr-2">¿Olvidaste tu contraseña?</span>
                <Link className="txt1 bo1 hov1" to="/recovery-password">
                  Recupérala
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLog;
