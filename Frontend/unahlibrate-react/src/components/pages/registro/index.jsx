import React, { useState, useEffect } from "react";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import { registerNormalUser } from "../../../services/Register";
import { loginUser } from '../../../services/Login';
import Swal from "sweetalert2";
import {Redirect} from 'react-router-dom';

const FormUser = ({ history }) => {
  //Creando el state para leer los inputs:
  const [infoUser, handleUserInfo] = useState({
    Usuario: "",
    Nombre: "",
    Apellido: "",
    Correo: "",
    Contraseña: "",
  });

  const [enableButton, setEnableButton] = useState(true);

  const [registeredAndLogged, setLogin] = useState(false);

  //Extrayendo los valores con destructuring:
  const {
    Usuario,
    Nombre,
    Apellido,
    Correo,
    Contraseña,
  } = infoUser;

  useEffect(() => {
    if (
      Usuario.trim() !== "" &&
      Nombre.trim() !== "" &&
      Apellido.trim() !== "" &&
      Correo.trim() !== "" &&
      Contraseña.trim() !== "" 
    ) {
      setEnableButton(false);
      return;
    }
  }, [Usuario, Nombre, Apellido, Correo, Contraseña]);

  //Funcion que se ejecuta cuando se escribe en un input:
  const handleChangeInfo = e => {
    handleUserInfo({
      ...infoUser,
      [e.target.name]: e.target.value
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

  //Funcion para el boton de login:
  const submitUser = e => {
    e.preventDefault();

    validarEmail();

    //Validacion:
    if (
      Usuario.trim() === "" ||
      Nombre.trim() === "" ||
      Apellido.trim() === "" ||
      Correo.trim() === "" ||
      Contraseña.trim() === "" 
    ) {
      handleError(true);
      return;
    }

    handleError(false);

    //Peticion al endpoint de usuario normal

    registerNormalUser(
      Usuario,
      Nombre,
      Apellido,
      Correo,
      Contraseña
    )
      .then(res => {
        Swal.fire(
          "Registro Exitoso",
          "Se ha creado el usuario exitosamente. Revisa tu correo, se envio una verificación de tu cuenta.",
          "success"
        ).then(e => {
              //Loggeo de usuario, instantáneamente al registrarse.
              var logIn = loginUser(Usuario, Contraseña)
              .then(res => {
                console.log(res);
                setLogin(true);
              })
              .catch(err => {
                console.log(err);
              });
        });
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: error.title,
          text: error.text
        });
      });
  };

  
  if (registeredAndLogged) {
    return (<Redirect to='/home' />)
  }
  return (
    <div className="limiter">
      <div className="container-login100 imgFormRegUs">
        <div className="wrap-login300 p-l-50 p-r-50 p-t-50 p-b-30">
          <form className="login100-form validate-form" onSubmit={submitUser}>
            <span className="login100-form-title p-b-35">Registro de Usuario</span>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
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
            
            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                id="emailInput"
                className="input100"
                type="text"
                name="Correo"
                placeholder="Correo"
                onChange={handleChangeInfo}
                value={Correo}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-envelope"></span>
              </span>
            </div>

            {errorEmail ? (
              <p className="alert alert-danger error-p text-white">
                El correo ingresado no es valido!!!
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

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="text"
                name="Nombre"
                placeholder="Nombre"
                onChange={handleChangeInfo}
                value={Nombre}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-user"></span>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="text"
                name="Apellido"
                placeholder="Apellido"
                onChange={handleChangeInfo}
                value={Apellido}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-user"></span>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
            </div>

            {error ? (
              <p className="alert alert-danger error-p text-white">
                Todos los campos son obligatorios!!!
              </p>
            ) : null}

            <div className="contact100-form-checkbox m-l-4">
              <input
                className="input-checkbox100"
                id="ckb1"
                type="checkbox"
                name="remember-me"
              />
            </div>

            <div className="container-login100-form-btn p-t-25">
              <button
                type="submit"
                className={
                  !enableButton
                    ? "login100-form-btn"
                    : "btn btn-lg btn-disabled"
                }
                disabled={enableButton}
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUser;
