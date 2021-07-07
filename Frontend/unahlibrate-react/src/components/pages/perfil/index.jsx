import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { Row, Col } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProfileUser } from "../../atoms";
import "antd/dist/antd.css";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "./style.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import { peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion } from '../../../services/Auth';
import Cookies from 'universal-cookie';
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';

const cookies = new Cookies();


const Perfil = () => {


  const [goEdit, setGoEdit] = useState(false);

  const [sent, setSent] = useState(false);

  //State que guarda los datos de la BD
  const [data, setData] = useState({
    usuario: "",

    nombre: "",

    apellido: "",

    email: "",

    telefono: "",
    
    imagenPerfil:"",

    ubicacion: ""
  });


  //State que recibe el allow de peticionUsuarioLoggeado:
  const [allowed, setAllow] = useState({});

  //State que confirma una sesión iniciada:
  const [isSigned, setIsSigned] = useState(null);

  const pedirDatos = async () => {

    try {
      console.log(2);
      var rr = await peticionDatoUsuario(cookies.get('user'));
      setData({
        usuario: rr.user.user,
        nombre: rr.user.name,
        apellido: rr.user.lastname,
        email: rr.user.email,
        telefono: rr.user.phone,
        imagenPerfil: rr.user.imageProfile,
        ubicacion: rr.user.ubication
      });
      console.log('Yo también.')
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

  const actualizar = (event) => {
    event.preventDefault();
    setSent(true);
  }

  useEffect(() => {
    /*"Funcion que recibe la info"()
      .then((res) => {
        setData(res);
 
      })
 
      .catch((err) => console.log(err));*/

    pedirDatos();
    pedirLogg();

  }, [isSigned]);

  const goToEdit = () => {
    setGoEdit(true);
  };

  if (sent == true) {
    return (
      <Redirect to='/actualizarPerfil' />
    )
  } else {
    if (isSigned == false) {
      return (
        <Redirect to='/login' />
      );
    } else if (isSigned == true) {
      return (
        <React.Fragment>
          <Navbar />
          <div className="limiter">
          <div className="container-login100 imagenFondo">
              <div className="wrap-login500 p-l-50 p-r-50 p-t-50 p-b-100">
                
                <form
                  onSubmit={actualizar}
                  className="login100-form validate-form btn"
                >
                  <span className="login100-form-title p-b-34">
                    Perfil de Usuario
                  </span>
                  <div>
                  
                    
                    {

                    ( data.imagenPerfil !== "")? (
                      <img src={"http://localhost:3900/api/" + 'get-image/' + data.imagenPerfil} alt={""} className="imageProfile"/>
                    ) : (
                      <ProfileUser /> 
                    )
                    
                    }
                    {/**/}
                  </div>

            <br />

            <div
              className="wrap-input100  m-b-16"
            >
              <input
                className="row mt-4"
                className="col-md-5 col-sm-6 p-r-0 p-l-0"
                className="lnr lnr-user txt-info icon-info"
                type="text"
                name="Usuario"
                placeholder="Usuario"
                value={`Usuario: ${data.usuario}`}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-user"></span>
              </span>
            </div>

            <div
              className="wrap-input100  m-b-16"
            >
              <input
                className="col-md-7 col-sm-6"
                className="lnr lnr-user txt-info icon-info"
                type="txt.info"
                
                value={`${data.nombre+ " " + data.apellido}`}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-user"></span>
              </span>
            </div>

            <div
              className="wrap-input100 m-b-16"
    
            >
              <input
                id="emailInput"
                className="input100"
                className="row mt-4"
                className="col-md-5 col-sm-6 p-r-0 p-l-0"
                className="lnr lnr-envelope txt-info icon-info"
                type="text"
                name="Correo"
                placeholder="Correo"
                value={`${data.email}`}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-envelope"></span>
              </span>
            </div>

            <div
              className="wrap-input100 m-b-16"
            >
              <input
                id="emailInput"
                className="input100"
                className="row mt-4"
                className="col-md-5 col-sm-6 p-r-0 p-l-0"
                className="lnr lnr-envelope txt-info icon-info"
                type="text"
                name="NumeroTelefono"
                placeholder="Numero de Telefono"
                value={`${data.telefono}`}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-phone-handset"></span>
              </span>
            </div>
            
            <div
              className="wrap-input100 m-b-16"
            >
              <input
                id="emailInput"
                className="input100"
                className="row mt-4"
                className="col-md-5 col-sm-6 p-r-0 p-l-0"
                className="lnr lnr-envelope txt-info icon-info"
                type="text"
                name="Ubicacion"
               
                value={`${data.ubicacion}`}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-map-marker"></span>
              </span>
            </div>
            
            <button type="submit" className="login100-form-btn">
                  Editar information
                </button>
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
    }

}

export default Perfil;
