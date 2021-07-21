import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { loginUser } from '../../../services/Login';
import {Link, Redirect, useParams} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion } from '../../../services/Auth';
import {restorePassword} from '../../../services/User';

import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Formrecupclv = ({ history }) => {
  //Creando el state para leer los inputs:
  const [information, handleInformation] = useState({
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

  const {token} = useParams();

  //State para el error:
  const [error, handleError] = useState(false);

  //State para la respuesta:
  const [respuesta, setRespuesta] = useState({});

  //State que recibe el allow de peticionUsuarioLoggeado:
  const [allowed, setAllow] = useState({});

  //State que confirma una sesión iniciada:
  const [isSigned, setIsSigned] = useState(null);
  
  const [user, setUser] = useState({});

  //Extrayendo los valores con destructuring:
  const {ContraseñaNueva ,ConfirmacionContraseña} = information;

  //State que confirma la contraseña cambiada:
  const [changed, cambiarContrasenia] = useState(false);

  const pedirDatos = async () => {

    try {
      console.log(2);
      var rr = await peticionDatoUsuario(cookies.get('user'));
      setUser(rr.user);
      console.log('- .');
      console.log('- ');
    } catch (err) {
      console.log(err);
    }
  }

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
  
  const cambiarContra = async (e) => {
      //Comprobación de que las contraseñas sean distintas:
      e.preventDefault();
      
      
    if (ContraseñaNueva !== ConfirmacionContraseña){
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Las contraseñas nuevas no coinciden."
        })
      } else if (ContraseñaNueva === '' || ConfirmacionContraseña === ''){
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Los campos necesitan estar llenos."
        })
      } else if (ContraseñaNueva === ConfirmacionContraseña){
        //Aquí debería todo estar correcto.
        console.log(' Perfecto ');
        console.log(token);
        //Peticion

        try {
          console.log(token);
          console.log(ContraseñaNueva);
          var restorePass = await restorePassword(token, ContraseñaNueva);
          if (restorePass.status == 'success'){
            Swal.fire(
              "Actualizada",
              "Se ha actualizado tu contraseña exitosamente.",
              "success"
            ).then(res => {
              console.log(restorePass);
              //Actualizar el estado.
              cambiarContrasenia(true);
            })
              .catch(er => { console.log(er) });
          } else {
            Swal.fire({
              icon: "error",
              title: restorePass.title,
              text: restorePass.text
            })
          }
    
        } catch (err) {
          console.log('Algo pasó acá.')
          console.log(err);
          Swal.fire({
            icon: "error",
            title: err.title,
            text: err.text
          });
        }

      }
  }
  
  useEffect(() => {
    pedirDatos();
    pedirLogg();
  }, [isSigned]);
  //Funcion para el boton de login:
  
  
  if (changed == true) {
    return (
      <Redirect to='/perfilusuario'></Redirect>
    );
  }
  if (isSigned == true){
    return (
      <Redirect to='/perfilusuario' />
    );
  } else if (isSigned == false) {
  return (
    <React.Fragment>
      <Navbar />
    <div className="limiter">
      <div className="container-login100 imagenFondo">
        <div className="wrap-login500 p-l-50 p-r-50 p-t-77 p-b-201">
          <form className="login-form validate-form" onSubmit={cambiarContra}>
            <span className="login100-form-title p-b-21">Cambiar Contraseña</span>
            

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
  } else {
    return (
    <React.Fragment>
    <Navbar />
    </React.Fragment>
    );
  }
};

export default Formrecupclv;