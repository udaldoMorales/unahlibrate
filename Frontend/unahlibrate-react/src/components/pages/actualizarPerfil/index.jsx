import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";
import "./estilos.css";
import "../../../styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import { peticionDatoUsuario, peticionUsuarioLoggeado } from '../../../services/Auth';
import { updateUser} from '../../../services/User';
import Swal from "sweetalert2";

import { URL_POST_USER_CHANGE_IMAGE_PROFILE, URL_POST_USER_CHANGE_IMAGE_PROFILE_GOOGLE} from "../../../constants/urls";

import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ActualizarPerfil = () => {
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
  const [enableButton, setEnableButton] = useState(true);

  //State que recibe el allow de peticionUsuarioLoggeado:
  const [allowed, setAllow] = useState({});

  //State que confirma una sesión iniciada:
  const [isSigned, setIsSigned] = useState(null);

  //State para el error:

  //State para recoger la imagen de perfil
  const [selectFile, setSelectFile] = useState(null);

  const [error, handleError] = useState(false);

  //State para validacion del correo:
  const [errorEmail, handleErrorEmail] = useState(false);

  //Actualizado ya. Hook.
  const [updated, setUpdated] = useState(false);

  var { id, Usuario, Nombre, Apellido, Correo, NumeroTelefono, imagenPerfil, Ubicacion } =
    infoUser;

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

  const handleChangeInfo = (e) => {
    handleUserInfo({
      ...infoUser,
      [e.target.name]: e.target.value,
    });
  };

  const cargarImagen = (e) => {
    
    let fileReader = new FileReader();
    setSelectFile(e.target.files[0]);
    fileReader.readAsDataURL(e.target.files[0]);

    fileReader.onload = () => {
      let div = document.getElementById("imagenLibro");

      let image = document.createElement('img');
      image.src = fileReader.result;
      image.alt = "Imagen del libro";
      image.style = "width: 243px; height: 247px;"
      div.innerHTML = '';
      div.append(image);
    }
  }

  const submitUser = async (e) => {
    e.preventDefault();
    var logAntesdePedir = isSigned;

    pedirLogg();

    var logDespuesdePedir = isSigned;

    if (logAntesdePedir === logDespuesdePedir) {
      try {

        var update = await updateUser(id, Usuario, Nombre, Apellido, Correo, NumeroTelefono, imagenPerfil, Ubicacion);

        if (selectFile !== null) {

          const formData = new FormData();

          formData.append(
            'file0',
            selectFile,
            selectFile.name
          );

          console.log("en esta parte del if");
          console.log(formData.file0);
          console.log(selectFile);
          axios.post(URL_POST_USER_CHANGE_IMAGE_PROFILE + id, formData) //Para no usar Google Drive en la subida de las fotos, pueden usar este.
          //axios.post(URL_POST_USER_CHANGE_IMAGE_PROFILE_MULTER + id, formData)
          //updateImageProfile(id, formData) //Con el Heroku y el Google Drive, se usa este.
            .then(res => {
              if (res.data.user) {
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Error con la imagen de perfil",
                  text: "Error al al guardar la imagen de perfil"
                })
              }
            });
          console.log(formData);
        }

        if (update.status === 'success') {

          Swal.fire(
            "Actualizado",
            "Se ha actualizado el usuario exitosamente.",
            "success"
          )

            .then(res => {
              console.log(update);
              //Actualizar el estado.
              cookies.set('user', update.user.user, { path: '/' });
              setUpdated(true);
            })
            .catch(er => { console.log(er) });
        } else {
          console.log(update);

          Swal.fire({
            icon: "error",
            title: update.title,
            text: update.text
          })
        }
      }
      catch (err) {
        Swal.fire({
          icon: "error",
          title: err.title,
          text: err.text
        });
      }
    } else {
      console.log(isSigned);
      Swal.fire({
        icon: "error",
        title: 'Sesión acabada'
      });
    }
  };

  if (updated == true) {
    return (
      <Redirect to='/perfilusuario'></Redirect>
    );
  }
  if (isSigned === false) {
    return (
      <Redirect to='/login' />
    );
  } else if (isSigned === true) {
    return (
      <React.Fragment>
        <Navbar />
        <div className="limiter">
        <div className="container-login100 imgFormRegUs">
            <div className="wrap-login100 p-l-50 p-r-50 p-t-50 p-b-30">
              <form
                className="login100-form validate-form btn"
                onSubmit={submitUser}
                enctype='multipart/form-data'
              >
                <span className="login100-form-title p-b-34">
                  Actualizar Perfil
                </span>
                <div className="centerImage" id="imagenLibro">
                  {/*Para no usar Google Drive en la subida de las fotos, pueden usar este.*/}
                  {

                    (imagenPerfil !== "") ? (
                      <img src={"http://localhost:3900/api/" + 'get-image/' + imagenPerfil} alt={""} className="imageProfile" />
                    ) : (
                      <img src={"https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"} className="imageProfile"/>
                    )

                  }
                  {/*Con el Heroku y el Google Drive, se usa este.*/}
                  {/*

                    (imagenPerfil !== "") ? (
                      <img src={imagenPerfil} alt={""} className="imageProfile" />
                    ) : (
                      <img src={"https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"} className="imageProfile"/>
                    )

                  */}
                </div>

                <center>
                  {/*<Upload>
                    <Button icon={<UploadOutlined />}>Cambiar Foto</Button>
                  </Upload>*/}
                  
                  <input
                    className="inputImagenPerfil hidden"
                    type="file"
                    name="file0"
                    accept="image/*"
                    onChange={cargarImagen} />
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

export default ActualizarPerfil;
