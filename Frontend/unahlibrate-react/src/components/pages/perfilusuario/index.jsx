//import React from 'react';
import Cards from '../cards/Cards';
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./style.css";
import perfil from '../../../img/perfil.jpg'
import "bootstrap/dist/css/bootstrap.min.css";
//Importaciones para conectar con el backend
import { peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion } from '../../../services/Auth';
import { userBooks } from '../../../services/UserBooks';
import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { ProfileUser } from "../../atoms";
import Cookies from 'universal-cookie';
import {URL_GET_USER_BOOKS} from '../../../constants/urls';
const cookies = new Cookies();


const PerfilUsers = () => {

  const [sent, setSent] = useState(false);

  //State que guarda los datos de la BD
  const [data, setData] = useState({
    usuario: "",

    nombre: "",

    apellido: "",

    email: "",

    telefono: "",

    imagenPerfil: "",

    ubicacion: ""
  });

  //State que obtiene los libros del usuario
  const [books, setBooks]=useState(null);

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
/*
  const pedirLibros = async ()=>{
    try{
      var libros = await userBooks(usuario);
      setBooks(libros)
    }
  }
*/
  useEffect(() => {
    /*"Funcion que recibe la info"()
      .then((res) => {
        setData(res);
 
      })
 
      .catch((err) => console.log(err));*/

    pedirDatos();
    pedirLogg();

  }, [isSigned]);


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


      ///////////////////
      return (
        <React.Fragment>
          <Navbar />
          <section className="seccion-perfil-usuario">
            <div className="perfil-usuario-header">
              <div className="perfil-usuario-portada">
                <div className="perfil-usuario-avatar">
                  {/*<img className="iconolbr" src={perfil} alt="" />*/}
                  {

                    (data.imagenPerfil !== "") ? (
                      <div className='centerImage'>
                        <img src={"http://localhost:3900/api/" + 'get-image/' + data.imagenPerfil} alt={""} className="iconolbr" />
                      </div>
                    ) : (
                      <div className='centerImage'>
                        <ProfileUser />
                      </div>
                    )

                  }
                </div>
              </div>
            </div>

            <div className="perfil-usuario-body">

              <div className="perfil-usuario-footer">

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-weight-bold lnr lnr-user">Usuario</label>
                      <input
                        type="text"
                        className="form-control inputnombre"
                        name="Nombre"
                        disabled
                        value = {data.usuario}
                      />
                    </div>

                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-weight-bold lnr lnr-user">Nombre</label>
                      <input
                        type="text"
                        className="form-control inputnombre"
                        name="Nombre"
                        disabled
                        value={`${data.nombre} ${data.apellido}`}
                      />
                    </div>

                  </div>

                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-weight-bold lnr lnr-envelope">Correo</label>
                      <input
                        type="email"
                        className="form-control inputnombre"
                        name="Nombre"
                        disabled
                        value={data.email}
                      />
                    </div>

                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-weight-bold lnr lnr-phone-handset ">Telefono</label>
                      <input
                        type="text"
                        className="form-control inputnombre"
                        name="Nombre"
                        value={data.telefono}
                        disabled

                      />
                    </div>

                  </div>

                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="form-group ">
                      <label className="form-weight-bold lnr lnr-map-marker">Ubicacion</label>
                      <input
                        type="email"
                        className="form-control inputnombre"
                        name="Nombre"
                        disabled
                        value={data.ubicacion}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>

          <div className="container ">

            <div class="alert alert-primary" role="alert">
              <center><h2>Libros Publicados</h2></center>
            </div>
            <Cards />

          </div>

        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Navbar />
        </React.Fragment>
      );
    }
  }
}
  export default PerfilUsers;
