//import React from 'react';
import Cards from '../cards/Cards';
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./style.css";
import perfil from '../../../img/perfil.jpg'
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
//Importaciones para conectar con el backend
import { peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion } from '../../../services/Auth';
import { userBooks } from '../../../services/UserBooks';
import { getUserByUsername } from '../../../services/User';
import React, { useState, useEffect } from "react";
import { Redirect, useParams } from 'react-router-dom';
import { ProfileUser } from "../../atoms";
import Cookies from 'universal-cookie';
import { URL_GET_USER_BOOKS } from '../../../constants/urls';
const cookies = new Cookies();


const PerfilUsers = () => {

  //Tomar de params el user del usuario que querramos visualizar.
  const otherUserName = useParams().user;

  const [sent, setSent] = useState(false);

  //State que guarda los datos de la BD
  /*const [data, setData] = useState({
    userID: "",

    usuario: "",

    nombre: "",

    apellido: "",

    email: "",

    telefono: "",

    imagenPerfil: "",

    ubicacion: ""
  });*/
  const [data, setData] = useState({});
  //State que obtiene los libros del usuario
  const [books, setBooks] = useState(null);

  //State que recibe el allow de peticionUsuarioLoggeado:
  const [allowed, setAllow] = useState({});

  //State que confirma una sesión iniciada:
  const [isSigned, setIsSigned] = useState(null);

  //State que contendrá la información del usuario que se quiera visualizar:
  const [viewingUser, setViewingUser] = useState(null);

  //State que contiene los libros de ese otro usuario por el que se pregunta.
  const [viewingUserBooks, setViewingUserBooks] = useState(null);

  const pedirDatosOtroUsuario = (userName) => {
      getUserByUsername(userName).then(res=>{
        if(res.status === 'success') {
          setViewingUser({
            userID: res.user[0]._id,
            usuario: res.user[0].user,
            nombre: res.user[0].name,
            apellido: res.user[0].lastname,
            email: res.user[0].email,
            telefono: res.user[0].phone,
            imagenPerfil: res.user[0].imageProfile,
            ubicacion: res.user[0].ubication
            });
        pedirLibrosOtroUsuario(res.user[0]._id);
        }
      });
  };

  const pedirLibrosOtroUsuario = (id) => {
      userBooks(id).then(res=>{
        if(res.status === 'success') setViewingUserBooks(res.books);
      });
      console.log(viewingUserBooks);

  };

  const pedirDatos = async () => {
    try {
      var rr = await peticionDatoUsuario(cookies.get('user'));
      setData({
        userID: rr.user._id,
        usuario: rr.user.user,
        nombre: rr.user.name,
        apellido: rr.user.lastname,
        email: rr.user.email,
        telefono: rr.user.phone,
        imagenPerfil: rr.user.imageProfile,
        ubicacion: rr.user.ubication
      });
      pedirLibros(rr.user._id);
    } catch (err) {
      console.log(err);
    }

  }


  const pedirLogg = async () => {

    try {

      var response = await peticionUsuarioLoggeado(cookies.get('auth'), cookies.get('refreshToken'));
      setAllow(response);
      setIsSigned(response.status);

    } catch (err) {
      console.log(err);
    }
  };

  const pedirLibros = (id) => {
    userBooks(id).then(res=>{
      if(res.status === 'success') setBooks(res.books);

    });

  };

  useEffect(() => {

    pedirDatos();
    pedirLogg();

    console.log('This is user:' + otherUserName);

    if (otherUserName !== undefined){
      pedirDatosOtroUsuario(otherUserName);
    };

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
      if (viewingUser !== undefined && viewingUser !== null) {
        if (viewingUser.userID === data.userID){
            window.location.replace(`/perfilusuario`);
        } else {

        return (
        <React.Fragment>
          <Navbar />
          <section className="seccion-perfil-usuario">
            <div className="perfil-usuario-header">
              <div className="perfil-usuario-portada">
                <div className="perfil-usuario-avatar">
                  {/*<img className="iconolbr" src={perfil} alt="" />*/}
                  {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                  {

                    (viewingUser.imagenPerfil !== "") ? (
                      
                        <img src={"http://localhost:3900/api/" + 'get-image/' + viewingUser.imagenPerfil} alt={"Imagen del perfil"} className="iconolbr" />
                     
                    ) : (
                      <div className='centerImage'>
                        <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="imagen de perfil por defecto" className="iconolbr"/>
                      </div>
                    )

                  }
                  {/*Con el Heroku y el Google Drive, se usa este.*/}
                  {/*

                    (viewingUser.imagenPerfil !== "") ? (
                      
                        <img src={viewingUser.imagenPerfil} alt={"Imagen del perfil"} className="iconolbr" />
                     
                    ) : (
                      <div className='centerImage'>
                        <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="imagen de perfil por defecto" className="iconolbr"/>
                      </div>
                    )

                  */}
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
                        value={viewingUser.usuario}
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
                        value={`${viewingUser.nombre} ${viewingUser.apellido}`}
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
                        value={viewingUser.email}
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
                        value={viewingUser.telefono}
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
                        value={viewingUser.ubicacion}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>

          <div className="container ">

            <div class="alert alert-primary" role="alert">
              <center><h2>Libros publicados por {viewingUser.usuario}</h2></center>
            </div>

            {viewingUserBooks==null &&
              <h1 id='nobooks'>{viewingUser.usuario} aún no ha publicado libros.</h1>
            }
            {viewingUserBooks!=null &&
              <Cards libros={viewingUserBooks}/>
            }

          </div>

        </React.Fragment>
        )

          }

        } //Fin del if del viewingUser.
       
       else {
      
      return (
        <React.Fragment>
          <Navbar />
          <section className="seccion-perfil-usuario">
            <div className="perfil-usuario-header">
              <div className="perfil-usuario-portada">
                <div className="perfil-usuario-avatar">
                  {/*<img className="iconolbr" src={perfil} alt="" />*/}
                  {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                  {

                    (data.imagenPerfil !== "") ? (
                      
                        <img src={"http://localhost:3900/api/" + 'get-image/' + data.imagenPerfil} alt={"Imagen del perfil"} className="iconolbr" />
                     
                    ) : (
                      <div className='centerImage'>
                        <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="imagen de perfil por defecto" className="iconolbr"/>
                      </div>
                    )

                  }
                  {/*Con el Heroku y el Google Drive, se usa este.*/}
                  {/*

                    (data.imagenPerfil !== "") ? (
                      
                        <img src={data.imagenPerfil} alt={"Imagen del perfil"} className="iconolbr" />
                     
                    ) : (
                      <div className='centerImage'>
                        <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="imagen de perfil por defecto" className="iconolbr"/>
                      </div>
                    )

                  */}
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
                        value={data.usuario}
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
              <center><h2>Tu lista de libros publicados</h2></center>
            </div>

            {books==null &&
              <h1 id='nobooks'>Aún no haz publicado libros.</h1>
            }
            {books!=null &&
              <Cards libros={books}/>
            }

          </div>

        </React.Fragment>
      )
      }


    } else if(isSigned==null || books==null){
      return (
        <React.Fragment>
          <Navbar />
        </React.Fragment>
      );
    }
  }
}
export default PerfilUsers;
