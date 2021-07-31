import React, { useState, useEffect } from "react";

import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./detLibro.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, useParams, Link } from 'react-router-dom';

//Importaciones para la conexión con el backend
import { individualBook } from '../../../services/UserBooks';
import { URL_GET_IMAGE_BOOK } from '../../../constants/urls';
import { peticionDatoUsuario, peticionUsuarioLoggeado } from '../../../services/Auth';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const DetLibro = () => {

  const { bookId } = useParams();

  const [user, setUser] = useState({});

  //State que recibe el allow de peticionUsuarioLoggeado:
  const [allowed, setAllow] = useState({});

  //State que confirma una sesión iniciada:
  const [isSigned, setIsSigned] = useState(null);

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

    imagenLibro: ""

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
              imagenLibro: res.book.image
            })
          }
        }
      )
      .catch(
      )
  }

  const volverAtras = (e) => {
    //e.preventDefault();
    console.log('Backeo, eo, eo.');
    window.history.back();
  }

  useEffect(() => {
    pedirDatos();
    pedirLogg();
    bookInfo(bookId);
  }, [isSigned]);

  if (isSigned === false) {
    return (
      <Redirect to='/login' />
    );
  } else if (isSigned === true && user !== {}) {
    return (
      <React.Fragment>
        <Navbar />
        <section className="seccion-perfil-usuario">
          <div className="perfil-usuario-header">
          </div>

          <div className="perfil-usuario-body">


            <div className="perfil-usuario-footer">



              <div className="row mb-3">
                <div className="col-md-6">

                  <div>
                    {
                      (data.imagenLibro !== "") ? (
                        <div className='centerImage'>
                          <img src={`${URL_GET_IMAGE_BOOK}${data.imagenLibro}`} alt={""} className="imagenLibro" />
                        </div>
                      ) : (
                        <div className='centerImage'>

                        </div>
                      )

                    }
                    {/**/}
                  </div>

                </div>
              </div>

              <div className="col-md-6">
                <div className="col-md-12 info">
                  <div className="row mb-3">
                    <div className="form-group">
                      <span className="etiqueta">Titulo: </span>

                      {/*<b>Aqui val el titulo</b>*/}
                      <b className="etiqueta">{data.tituloLibro}</b>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="form-group">
                      <span className="etiqueta">Autor: </span>

                      {/*<b>Aqui va el nombre del autor</b>*/}
                      <b className="etiqueta">{data.autor}</b>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="form-group">
                      <span className="etiqueta">Precio: </span>

                      {/*<b>Aqui va el precio</b>*/}
                      <b className="etiqueta">{data.precio + " Lps."}</b>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="form-group">
                      <span className="etiqueta">Genero: </span>

                      {/*<b>Aqui va el genero del libro </b>*/}
                      <b className="etiqueta">{data.genero}</b>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="form-group">
                      <span className="etiqueta">Estado: </span>

                      {/*<b>Aqui va el estado del libro </b>*/}
                      <b className="etiqueta">{data.estado}</b>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="form-group">
                      <span className="etiqueta">Por: </span>

                      {/*<b>Aqui va el estado del libro </b>*/}
                      <b className="etiqueta">{data.usuario.user}</b>
                    </div>
                  </div>

                </div>
              </div>

              <div class="container padre">
                <b>Descripcion:</b>
                <br />
                {/*<b>Aqui va una descripcion</b>*/}
                <p>{data.descripcion}</p>
              </div>

              {data.usuario._id != user._id &&
                <div className="col md-3">
                  <Link to={{ pathname: '/panelChat', state: { user1: user._id, user2: data.usuario._id } }}>
                    <button
                      type="button"
                      className="btn btn-success btn-lg btn-v">
                      Contactar al vendedor
                    </button>
                  </Link>
                </div>
              }
              {(data.usuario._id === user._id) &&
                <div className="col md-3" >
                  <Link
                    to={{
                      pathname: "/actualizarLibros",
                      state:{
                        libro: data,
                        libroID: bookId
                      }
                    }
                    }
                  >
                    <button
                      type="button"
                      class="btn btn-primary btn-lg">
                      Editar
                    </button>
                  </Link>
                </div>}
                {(data.usuario._id === user._id) &&
                <div className="col md-3" >
                  <button
                    type="button"
                    class="btn btn-danger btn-lg">
                    Eliminar
                  </button>
                </div>}
              <div className="col md-3" >
                <button
                  type="button"
                  onClick={volverAtras}
                  className="btn btn-secondary btn-lg">
                  Volver
                </button>

              </div>

            </div>

          </div>
        </section>

      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Navbar />
      </React.Fragment>
    );
  }


};

export default DetLibro;