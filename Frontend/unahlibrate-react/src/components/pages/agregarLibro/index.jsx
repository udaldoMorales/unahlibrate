
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
//import { Divider } from "antd";
import { Link } from 'react-router-dom';
//import { Row, Col } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./style.css";
import axios from "axios";
import libro from '../../../img/library.svg'
import Swal from "sweetalert2";
import { addBook } from "../../../services/AddBook";
import { URL_POST_SAVE_IMAGE_BOOOK, URL_POST_SAVE_IMAGE_BOOOK_MULTER, URL_POST_SAVE_IMAGE_BOOOK_GOOGLE } from "../../../constants/urls"
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

  const [validator, setValidator] = useState({
    nombre: false,
    precio: false,
    condicion: false,
    image: false,
  });

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

    if (Nombre != "" && Precio != "" && !isNaN(Number(Precio)) && Condicion != "" && selectFile != null) {

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

          if (selectFile !== null) {
            const formData = new FormData();

            formData.append(
              'file0',
              selectFile,
              selectFile.name
            );

            axios.post(URL_POST_SAVE_IMAGE_BOOOK + bookID, formData) //Para no usar Google Drive en la subida de las fotos, pueden usar este.
            //axios.post(URL_POST_SAVE_IMAGE_BOOOK_MULTER + bookID, formData) //Con el Heroku y el Google Drive, se usa este.
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

                <form onSubmit={submitBook} enctype='multipart/form-data'>

                  <center>
                    <div className="centerMargen mt-3 mb-4 " id="imagenLibro">

                    </div>
                    <p>Cargar imagen</p>
                    <input
                      className="inputImagenLibro mb-4 hidden"
                      type="file"
                      name="file0"
                      onChange={cargarImagen}
                      accept="image/*"
                    />
                    {validator.image ? (
                      <p className="alert alert-danger error-p text-white">
                        El libro debe tener una imagen
                      </p>
                    ) : null}
                  </center>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-group" id="Nombre">
                        <label className="form-weight-bold  mb-2">Título</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Nombre"
                          onChange={handleInputChange}
                          value={Nombre}
                          placeholder="Titulo del libro"
                        />
                        {validator.nombre ? (
                          <p className="alert alert-danger error-p text-white">
                            El libro debe tener un nombre
                          </p>
                        ) : null}
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
                          placeholder="Autor o Autores del libro"
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
                          placeholder="Numero de edición"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-weight-bold  mb-2">Tipo de libro</label>
                        <select className="form-select select-genero" aria-label="Default select example" onChange={handleInputChange} value={Genero} name="Genero">
                          <option >Elegir Tipo</option>
                          <option value="Novela">Novela</option>
                          <option value="Lirico">Relato</option>
                          <option value="Ensayo">Ensayo</option>
                          <option value="Poesía">Poesía</option>
                          <option value="Biografía">Biografía</option>
                          <option value="Científico">Científico</option>
                          <option value="Biografía">Biografía</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group" id="Precio">
                        <label className="form-weight-bold mb-2">Precio</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Precio"
                          onChange={handleInputChange}
                          value={Precio}
                          placeholder="Valor en Lempiras"
                          pattern="[0-9]{1,3}" maxlength="4"
                        />
                        {validator.precio ? (
                          <p className="alert alert-danger error-p text-white">
                            Se debe especificar el precio
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <label className=" mb-2" for="">Estado</label>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="form-group" id="Condicion">
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
                      {validator.condicion ? (
                        <p className="alert alert-danger error-p text-white">
                          Se debe especificar el estado del libro
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group mb-5">
                    <div className="mb-3">
                      <label className="form-weight-bold mb-2">Descripción</label>
                      <textarea className="form-control" value={Descripcion} onChange={handleInputChange} id="exampleFormControlTextarea1" name="Descripcion" rows="3"
                        placeholder="Escriba una pequena descripcion acerca del libro" maxLength="250"></textarea>
                    </div>
                  </div>
                  <center>
                    <button type="submit" class="btn btn-success width-100 btn-agregar mb-3 ">Agregar</button>
                    <Link to="/" >
                      <button type="button" class="btn btn-primary width-100 btn-cancelar  mb-3">Cancelar</button>
                    </Link>
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
