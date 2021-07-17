
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Divider } from "antd";
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./style.css";
import axios from "../../../modules/axios";
import libro from '../../../img/library.svg'
import Swal from "sweetalert2";
import { addBook } from "../../../services/AddBook";
import { URL_POST_SAVE_IMAGE_BOOOK } from "../../../constants/urls"
import { peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion } from '../../../services/Auth';

import Cookies from 'universal-cookie';


const cookies = new Cookies();


//Inicio del componente
const AgregarLibro = () => {

  const [datos, setDatos] = useState({

    Nombre: "",
    Autor: "",
    Edicion: "",
    Genero: "",
    Precio: "",
    Condicion: "",
    Descripcion: "",
    Imagen: ""
  })
  const { Nombre, Autor, Edicion, Genero, Precio, Condicion, Descripcion, Imagen } = datos;

  const [selectFile, setSelectFile] = useState(null);

  //State que recibe el allow de peticionUsuarioLoggeado:
  const [allowed, setAllow] = useState({});

  //State que confirma una sesión iniciada:
  const [isSigned, setIsSigned] = useState(null);

  const [addedBook, setAddedBook] = useState(false);

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

  useEffect(() => {
    pedirDatos();
    pedirLogg();

    console.log('use Effect');
    console.log(infoUser);
  }, [isSigned]);

  //Objeto del usuario loggeado

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

  //
  const cargarImagen = (e) => {
    setSelectFile(e.target.files[0]);
    console.log("estoy capturando el archivo de imagen");
    console.log(selectFile);
  }

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


  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  //Funcion para agregar el libro a la base de datos
  const submitBook = e => {
    e.preventDefault();

    //Hacer validaciones respectivas FALTA ESO
    console.log("estoy aca");
    console.log(datos);

    addBook(
      Nombre,
      Autor,
      Edicion,
      Genero,
      Condicion,
      Descripcion,
      Precio,
      infoUser.id
    )
      .then(res => {
        var bookID = res.book._id;
        //Si se guardo el libro que se guarde la imagen del mismo
        console.log("Estoy aqui quiero ver res **********");
        console.log(res);
        console.log(res.book._id);

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

          console.log("Lariza");
          console.log(formData);
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
  }

  if (addedBook == true) {
    return (
      <Redirect to='/perfil'></Redirect>
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
            <div className="col-xl-5 col-lg-12 register-bg">
              <center>
                <div class="titulo">
                  <p >Agrega tus libros</p>
                  <img className="iconolbr" src={libro} alt="" />
                </div>
              </center>
            </div>
            <div className="col-xl-7 col-lg-12 d-flex">
              <div className="container align-self-center">

                <form onSubmit={submitBook}>

                  <center>
                    <div className="centerMargen mt-3 mb-4 ">

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
                        <label className="form-weight-bold  mb-2">Titulo</label>
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
                        <select className="form-select select-genero" aria-label="Default select example" onChange={handleInputChange} value={Genero} name="Genero">
                          <option >Elegir Género</option>
                          <option value="Narrativo">Género Narrativo</option>
                          <option value="Lirico">Género Lírico</option>
                          <option value="Dramatico">Género Dramático</option>
                          <option value="Didactico">Género Didáctico</option>
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
                          <label className="form-check-label" for="inlineRadio1">
                            <input className="form-check-input" type="radio" name="Condicion"
                              id="inlineRadio1" value="Usado" onChange={handleInputChange} checked={datos.Condicion === "Usado"} />
                            Usado</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check form-check-inline">

                          <label className="form-check-label" for="inlineRadio2">
                            <input className="form-check-input" type="radio" name="Condicion"
                              id="inlineRadio2" value="Nuevo" onChange={handleInputChange} checked={datos.Condicion === "Nuevo"} />
                            Nuevo</label>
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
                    <button type="submit" class="btn btn-success width-100 btn-agregar mb-3 ">Agregar</button>
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

export default AgregarLibro;
