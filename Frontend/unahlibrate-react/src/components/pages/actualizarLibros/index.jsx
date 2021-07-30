import React, { useState, useEffect } from 'react';
import { Redirect, Link, useLocation } from 'react-router-dom';
//import { Divider } from "antd";
//import { Row, Col } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./style.css";
//import bookEdit from '../../../img/notebook.svg'
import { Notebook } from "../../atoms";
import Swal from "sweetalert2";
import axios from "axios";
import { URL_GET_USER_BOOKS, URL_GET_BOOKS, URL_GET_BOOK_BY_ID, URL_GET_SEARCH_BOOKS, URL_POST_DELETE_BOOK, URL_PUT_UPDATE_BOOK } from '../../../constants/urls';

import { peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion } from '../../../services/Auth';

import { updateBook } from '../../../services/UserBooks';
import { URL_POST_SAVE_IMAGE_BOOOK, URL_GET_IMAGE_BOOK } from "../../../constants/urls";

import Cookies from 'universal-cookie';
const cookies = new Cookies();




const ActualizarLibro = () => {

  const location = new useLocation();

  const libro = location.state.libro;


  //State que recibe el allow de peticionUsuarioLoggeado:
  const [allowed, setAllow] = useState({});

  //State que confirma una sesión iniciada:
  const [isSigned, setIsSigned] = useState(null);

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


  const [datos, setDatos] = useState({

    Nombre: libro.tituloLibro,
    Autor: libro.autor,
    Edicion: libro.edicion,
    Genero: libro.genero,
    Precio: libro.precio,
    Descripcion: libro.descripcion,
    Condicion: libro.estado,
    Imagen: libro.imagenLibro
  })

  const { Nombre, Autor, Edicion, Genero, Precio, Condicion, Descripcion, Imagen } = datos;

  const [selectFile, setSelectFile] = useState(null);



  const [addedBook, setAddedBook] = useState(false);

  const [validator, setValidator] = useState({
    nombre: false,
    precio: false,
    condicion: false,
    image: false,
  });

  const cargarImagen = (e) => {

    let fileReader = new FileReader();
    setSelectFile(e.target.files[0]);
    fileReader.readAsDataURL(e.target.files[0]);

    fileReader.onload = () => {
      let div = document.getElementById("imagenLibro");

      let image = document.createElement('img');
      image.src = fileReader.result;
      image.alt = "Imagen del libro";
      image.style = "width: 235px; height: 238px; object-fit:cover;"
      div.innerHTML = '';
      div.append(image);
    }
  }

  //Funcion para agregar el libro a la base de datos
  const submitBook = e => {
    e.preventDefault();


    if (Nombre != "" && Precio != "" && !isNaN(Number(Precio)) && Condicion != "" && selectFile != null) {

      updateBook(
        location.state.libroID,
        Nombre,
        Autor,
        Edicion,
        Genero,
        Condicion,
        Descripcion,
        Precio,
      )
        .then(res => {
          var bookID = res.book._id;
          //Si se guardo el libro que se guarde la imagen del mismo

          if (selectFile !== null) {
            const formData = new FormData();

            formData.append(
              'file0',
              selectFile,
              selectFile.name
            );

            axios.post(URL_POST_SAVE_IMAGE_BOOOK + bookID, formData)
              .then(res => {

                if (res.data.book) {
                  console.log("Se guardo la imagen");
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "Error con la imagen de perfil",
                    text: "Error al al guardar la imagen de perfil"
                  })
                }
              });

          }
          Swal.fire(
            "Libro agregado con exito",
            "El libro se agrego al catalago de libros en venta",
            "success"
          ).then(res => {
            setAddedBook(true);
          });
        })
        .catch(error => {
          Swal.fire({
            icon: "error",
            title: error.title,
            text: error.text
          });
        });
    } else if (Nombre == "" || Precio == "" || Condicion == "" || selectFile == null) {
      if (Nombre == "") {
        setValidator({ nombre: true });
        console.log("entre aqui vacio");
      } else
        if (Precio == "") {
          setValidator({ precio: true });
          console.log("aqui tambien vacio");
        } else
          if (Condicion == "") {
            setValidator({ condicion: true });
            console.log("mass");
          } else
            if (selectFile == null) {
              setValidator({ image: true });
              console.log("no hay imagen");
            }
    }
  }

  const [infoUser, handleUserInfo] = useState({
    id: null,
    Usuario: "",
    Nombre: "",
    Apellido: "",
    Correo: "",
    NumeroTelefono: "",
    imagenPerfil: "",
    Ubicacion: "",
  });

  //Pedir datos de sesion iniciado
  const pedirDatos = async () => {

    try {
      console.log(2);
      var rr = await peticionDatoUsuario(cookies.get('user'));

      //Asignación de datos del usuario
      handleUserInfo({
        id: rr.user._id,
        Usuario: rr.user.user,
        Nombre: rr.user.name,
        Apellido: rr.user.lastname,
        Correo: rr.user.email,
        NumeroTelefono: rr.user.phone,
        imagenPerfil: rr.user.imageProfile,
        Ubicacion: rr.user.ubication,
      });

      console.log('- Yo también.');
      console.log('- METIDO.');
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    pedirDatos();
    pedirLogg();

    console.log('use Effect');
    console.log(infoUser);
  }, [isSigned]);

  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };


  if (addedBook == true) {
    return (
      <Redirect to='/perfilusuario'></Redirect>
    );
  }
  if (isSigned == false) {
    return (
      <Redirect to='/login' />
    );
  } else if (isSigned == true) {

    return (
      <React.Fragment>
        <Navbar />
        <section className="contact-box">
          <div className="row no-gutters formulario">
            <div className="col-xl-5 col-lg-12 register-bga">
              <center>
                <div class="titulo1">
                  <p >Actualiza tus libros</p>
                  <Notebook className="oso" />
                </div>
              </center>
            </div>
            <div className="col-xl-7 col-lg-12 d-flex">
              <div className="container align-self-center">

                <form onSubmit={submitBook}>

                  <center>
                    <div className="centerMargen mt-3 mb-4 " id="imagenLibro">
                      {libro.imagenLibro &&
                        <img src={`${URL_GET_IMAGE_BOOK}${libro.imagenLibro}`} alt="imagen del libro" />
                      }
                    </div>
                    <input
                      className="inputImagenLibro mb-4"
                      type="file"
                      name="file0"
                      onChange={cargarImagen}
                    />
                  </center>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-weight-bold  mb-2">Nombre</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Nombre"
                          onChange={handleInputChange}
                          value={Nombre}
                        />
                      </div>

                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="form-weight-bold mb-2">Autor</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Autor"
                          onChange={handleInputChange}
                          value={Autor}
                        />
                      </div>
                    </div>


                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-weight-bold mb-2 ">Edición</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Edicion"
                          onChange={handleInputChange}
                          value={Edicion}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-weight-bold  mb-2">Género</label>
                        <select className="form-select select-genero" aria-label="Default select example">
                          <option selected>Elegir Género</option>
                          <option value="1">Género Narrativo</option>
                          <option value="2">Género Lírico</option>
                          <option value="3">Género Dramático</option>
                          <option value="3">Género Didáctico</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-weight-bold mb-2">Precio</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Precio"
                          onChange={handleInputChange}
                          value={Precio}
                        />
                      </div>
                    </div>
                  </div>
                  <label className=" mb-2" for="">Estado</label>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={handleInputChange} />
                          <label className="form-check-label" for="inlineRadio1">Usado</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={handleInputChange} />
                          <label className="form-check-label" for="inlineRadio2">Nuevo</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-5">
                    <div className="mb-3">
                      <label className="form-weight-bold mb-2">Descripción</label>
                      <textarea className="form-control" value={Descripcion} onChange={handleInputChange} id="exampleFormControlTextarea1" name="Descripcion" rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <center>
                    <button type="submit" class="btn btn-success width-100 btn-agregar mb-3 ">Actualizar</button>
                    <button type="button" class="btn btn-primary width-100 btn-cancelar  mb-3">Cancelar</button>
                  </center>
                </form>

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

export default ActualizarLibro;
