import React, { useState } from "react";
import { Row, Col } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProfileUser } from "../../atoms";
import "antd/dist/antd.css";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "./estilos.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";

const ActualizarPerfil = () => {
  const [infoUser, handleUserInfo] = useState({
    Usuario: "",
    Nombre: "",
    Apellido: "",
    Correo: "",
    NumeroTelefono: "",
    Ubicacion: "",
  });
  const [enableButton, setEnableButton] = useState(true);
  //State para el error:
  const [error, handleError] = useState(false);

  //State para validacion del correo:
  const [errorEmail, handleErrorEmail] = useState(false);

  const { Usuario, Nombre, Apellido, Correo, NumeroTelefono, Ubicacion } =
    infoUser;

  const handleChangeInfo = (e) => {
    handleUserInfo({
      ...infoUser,
      [e.target.name]: e.target.value,
    });
  };

  const submitUser = () => {};

  return (
    <div className="limiter">
      <div className="container-login100 imagen">
        <div className="wrap-login300 p-l-50 p-r-50 p-t-50 p-b-30">
          <form
            className="login100-form validate-form btn"
            onSubmit={submitUser}
          >
            <span className="login100-form-title p-b-34">
              Actualizar Perfil
            </span>
            <div>
              <ProfileUser />
            </div>

            <center>
              <Upload>
                <Button icon={<UploadOutlined />}>Cambiar Foto</Button>
              </Upload>
            </center>
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
                id="emailInput"
                className="input100"
                type="text"
                name="NumeroTelefono"
                placeholder="Numero de Telefono"
                onChange={handleChangeInfo}
                value={NumeroTelefono}
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
                id="emailInput"
                className="input100"
                type="text"
                name="Ubicacion"
                placeholder="Ubicacion"
                onChange={handleChangeInfo}
                value={Ubicacion}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-map-marker"></span>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
            ></div>

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
              <div className="container-login100-form-btn p-t-25">
                <button type="submit" className="login100-form-btn">
                  Actualizar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarPerfil;
