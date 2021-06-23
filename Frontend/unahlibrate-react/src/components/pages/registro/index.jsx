import React, { useState, useEffect } from "react";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import { registerNormalUser } from "../../../services/Register";
import Swal from "sweetalert2";

const FormUser = ({ history }) => {
  //Creando el state para leer los inputs:
  const [infoUser, handleUserInfo] = useState({
    email: "",
    password: "",
    phone: "",
    address: "",
    name: "",
    lastname: "",
    birth_date: "",
    register_id: ""
  });

  const [enableButton, setEnableButton] = useState(true);

  //Extrayendo los valores con destructuring:
  const {
    email,
    password,
    phone,
    address,
    name,
    lastname,
    birth_date,
    register_id
  } = infoUser;

  useEffect(() => {
    if (
      email.trim() !== "" &&
      password.trim() !== "" &&
      phone.trim() !== "" &&
      address.trim() !== "" &&
      name.trim() !== "" &&
      register_id.trim() !== ""
    ) {
      setEnableButton(false);
      return;
    }
  }, [register_id, name, phone, password, email]);

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
      email.trim() === "" ||
      password.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === "" ||
      name.trim() === "" ||
      lastname.trim() === "" ||
      birth_date.trim() === "" ||
      register_id.trim() === ""
    ) {
      handleError(true);
      return;
    }

    handleError(false);

    //Peticion al endpoint de usuario normal:
    registerNormalUser(
      email,
      password,
      phone,
      address,
      name,
      lastname,
      register_id,
      birth_date
    )
      .then(res => {
        Swal.fire(
          "Registro Exitoso",
          "Se ha creado el usuario exitosamente",
          "success"
        ).then(e => {
          history.push("/login");
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

  return (
    <div className="limiter">
      <div className="container-login100 imgFormRegUs">
        <div className="wrap-login100 p-l-50 p-r-50 p-t-50 p-b-30">
          <form className="login100-form validate-form" onSubmit={submitUser}>
            <span className="login100-form-title p-b-25">Registro Usuario</span>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                id="emailInput"
                className="input100"
                type="text"
                name="email"
                placeholder="Correo"
                onChange={handleChangeInfo}
                value={email}
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
                name="password"
                placeholder="Contraseña"
                onChange={handleChangeInfo}
                value={password}
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
                type="phone"
                name="phone"
                placeholder="Teléfono"
                onChange={handleChangeInfo}
                value={phone}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-phone-handset"></span>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="address"
                name="address"
                placeholder="Dirección"
                onChange={handleChangeInfo}
                value={address}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-home"></span>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Nombre"
                onChange={handleChangeInfo}
                value={name}
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
                name="lastname"
                placeholder="Apellido"
                onChange={handleChangeInfo}
                value={lastname}
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
                type="date"
                name="birth_date"
                onChange={handleChangeInfo}
                value={birth_date}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-calendar-full"></span>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="text"
                name="register_id"
                placeholder="Número de Identidad"
                onChange={handleChangeInfo}
                value={register_id}
                maxLength={13}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-license"></span>
              </span>
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
