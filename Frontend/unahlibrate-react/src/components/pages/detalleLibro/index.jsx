import React, { useState, useEffect } from "react";
import Navbar from './../Home/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import libro from '../../../img/1.jpg'
import "./style1.css";

//Importaciones para conexión con Backend.

import { Redirect, useParams, Link } from 'react-router-dom';
import Swal from "sweetalert2";
import Moment from 'react-moment';
import 'moment/locale/es';

import { individualBook, deleteBook } from '../../../services/UserBooks';
import { URL_GET_IMAGE_BOOK } from '../../../constants/urls';
import { peticionDatoUsuario, peticionUsuarioLoggeado } from '../../../services/Auth';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const DetalleLibro = () => {

  const { bookId } = useParams();

  const [user, setUser] = useState({});

  //State que recibe el allow de peticionUsuarioLoggeado:
  const [allowed, setAllow] = useState({});

  //State que confirma una sesión iniciada:
  const [isSigned, setIsSigned] = useState(null);

  const [libroElimando, setLibroElimnado] = useState(false);

  const pedirDatos = async () => {

    try {
      var rr = await peticionDatoUsuario(cookies.get('user'));
      setUser(rr.user);
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
  }

  const [data, setData] = useState({
    tituloLibro: "",

    autor: "",

    edicion: "",

    genero: "",

    precio: "",

    estado: "",

    usuario: '',

    descripcion: "",

    imagenLibro: "", 
    
    fecha: ''

  });

  const bookInfo = (id) => {
    individualBook(id)
      .then(
        (res) => {
          if (res.status === 'success') {
            setData({
              tituloLibro: res.book.title,
              autor: res.book.autor,
              edicion: res.book.edition,
              genero: res.book.genre[0],
              precio: res.book.price,
              estado: res.book.condition,
              usuario: res.book.user,
              descripcion: res.book.description,
              imagenLibro: res.book.image,
              fecha: res.book.date
            })
          }
        }
      )
      .catch(
      )
  }
  const eliminarLibro = () => {

    Swal.fire({
      title: '¿Estás seguro (a)?',
      text: "No seras capaz de recuperar la publicacion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(bookId)
          .then((res) => {
            if (res.status === "success") {

              Swal.fire(
                'Eliminado',
                'La publicacion de tu libro ha sido elimanda',
                'success'
              ).then(res => {
                setLibroElimnado(true);
              });

            } else {
              Swal.fire({
                icon: "warning",
                title: "Error al eliminar libro",
                text: "Error en el servidor al borrar libro"
              })
            }
          });
      }
    })

  }

  const volverAtras = (e) => {
    //e.preventDefault();
    window.history.back();
  }

  useEffect(() => {
    console.log(bookId);
    pedirDatos();
    pedirLogg();
    bookInfo(bookId);
  }, [isSigned, libroElimando]);

  if (isSigned === false){
      return (
          <Redirect to='/registro' />
          )
  } else if (isSigned === true && user !== {} && libroElimando === false) {
        return(
        <React.Fragment>
        <Navbar/>
       
        <div className="container1">
        <div className="card-element">
            <div className="shoeBackground seccion2">
                <div className="gradients">
                    <div className="gradient second" color="blue"></div>
                    <div className="gradient" color="red"></div>
                    <div className="gradient" color="green"></div>
                    <div className="gradient" color="orange"></div>
                    <div className="gradient" color="black"></div>
                </div>
                <h1 className="nike">Detalle del Libro</h1>
                {/*Aquí irá ubicada la carga de la imagen*/}
                {/*<img className="img-detalle" src={libro} alt=""/>*/}

                {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                    {
                      (data.imagenLibro !== "") && (
                        <img src={`${URL_GET_IMAGE_BOOK}${data.imagenLibro}`} alt={""} style={{objectFit: 'cover'}} className="img-detalle" />
                      )
                    }
                    {/*Con el Heroku y el Google Drive, se usa este.*/}
                    {/*
                      (data.imagenLibro !== "") && (
                        <img src={`${data.imagenLibro}`} alt={""} style={{objectFit: 'cover'}} className="img-detalle" />
                      )

                    */}
              
            </div>
            <div className="infomacion">
                <div className="shoeName">
                    <div className="big">
                        {/*<h1 >Millennials</h1>*/}
                        <h1 >{data.tituloLibro}</h1>
                     
                    </div>
                    {/*<h3 className="small tiltulo-autor">Marcio Martinez</h3>*/}
                    <h3 className="small tiltulo-autor">{data.autor}</h3>
                </div>
                     
                <div className="form-floating divis">
                    <h4 className="title">Descripcion</h4>
                    {data.descripcion ?
                        <textarea className="form-control1 desc-detalle" value={data.descripcion} ></textarea>
                        : <textarea className="form-control1 desc-detalle" value={`Cargando...`} ></textarea>}
                 
                  </div>

              
                <div className="color-container">
                  
                    <div className="row ">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="">Precio</label>
                        {/*<input
                                                  type="text"
                                                  className="form-control input-detalle"
                                              
                                                />*/}
                        <input
                          type="text"
                          className="form-control input-detalle"
                          disabled
                          value={`Lps. ${data.precio}`}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-weight-bold">Genero</label>
                          {/*<input
                                                      type="text"
                                                      className="form-control input-detalle"
                                                  
                                                    />*/}
                          <input
                          type="text"
                          className="form-control input-detalle"
                          disabled
                          value={`${data.genero}`}
                        />
                        </div>
                      </div>
                      <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-weight-bold">Estado</label>
                        {/*<input
                                                  type="text"
                                                  className="form-control input-detalle"
                                            
                                                />*/}
                          <input
                          type="text"
                          className="form-control input-detalle"
                          disabled
                          value={`${data.estado}`}
                        />
                      </div>
                    </div>
                      
                  </div>

                </div>
                <div className="size-container">
                  
                    <div className="row ">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="">Por</label>
                        {/*<input
                                                  type="text"
                                                  className="form-control input-detalle"
                                              
                                                />*/}
                        <Link to={`/perfilusuario/user/${data.usuario.user}`}>
                      <p className="etiqueta">
                        {data.usuario.user}
                      </p>
                      </Link>
                      </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-weight-bold">Publicado</label>
                          {/*<input
                                                      type="text"
                                                      className="form-control input-detalle"
                                                
                                                    />*/}
                          <p
                          className="form-control input-detalle"
                          >
                          <Moment locale='es' fromNow>{data.fecha}</Moment>
                          </p>
                        </div>
                      </div>
                    
                      
                  </div>
                    
                </div>

                {/*DIV DE LOS BOTONES*/}
                <div className="buy-price">
                {data.usuario._id !== user._id &&
                    <Link to={{ pathname: '/panelChat', state: { user1: user._id, user2: data.usuario._id } }}>
                    <button type="button" class="btn btn-success">Contactar al vendedor</button>
                    </Link>
                }
                {(data.usuario._id === user._id) &&

                    <Link
                    to={{
                      pathname: "/actualizarLibros",
                      state: {
                        libro: data,
                        libroID: bookId
                      }
                    }
                    }
                  >
                    <button
                      type="button"
                      class="btn btn-primary">
                      Editar
                    </button>
                    </Link>
                }
                {(data.usuario._id === user._id) &&

                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={eliminarLibro}>
                    Eliminar

                  </button>

                }
                <button type="button" onClick={volverAtras} class="btn btn-secondary">Volver</button>
                 
                </div>
            </div>
        </div>
        </div>
  

      </React.Fragment>
    )      
  } else if (libroElimando) {
    return (<Redirect to="/perfilusuario"></Redirect>);
  } else {
    return (
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    );
  }

}

export default DetalleLibro;