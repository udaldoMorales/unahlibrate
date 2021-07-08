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
import "./Perfil.css";
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
              <div className="wrap-login500perf p-l-30 p-r-30 p-t-50">
                
                  <span className="login100-form-title p-b-34">
                    Perfil de Usuario
                  </span>
                  <div>
                  
                    
                    {

                    ( data.imagenPerfil !== "")? (
                      <div className='centerImage'>
                      <img src={"http://localhost:3900/api/" + 'get-image/' + data.imagenPerfil} alt={""} className="imageProfile"/>
                      </div>
                    ) : (
                      <ProfileUser /> 
                    )
                    
                    }
                    {/**/}
                  </div>

            <br />

            <ul id='lista' className='p-b-30'>
                    <div className='centerListPerf'>
                    <li>

                      <h4 className='idLista'>
                        <i className="lnr lnr-user"></i>
                      </h4>
                      <p className='idLista letra'>
                        <b>{data.usuario}</b>
                      </p>
                      
                      <div className='clearFix'></div>
                      
                      <br/>
                      <br/>

                    </li>
                    <li>

                      <h4 className='idLista'>
                        <i className="lnr lnr-user"></i>
                      </h4>
                      <p className='idLista letra'>
                        {`${data.nombre} ${data.apellido}`}
                      </p>

                      <br/>
                      <br/>

                      <div className='clearFix'></div>

                    </li>
                    <li>

                      <h4 className='idLista'>
                        <i className="lnr lnr-envelope"></i>
                      </h4>
                      <p className='idLista letra'>
                        {data.email}
                      </p>

                      <br/>
                      <br/>
                      <div className='clearFix'></div>

                    </li>
                    <li>

                      <h4 className='idLista'>
                        <i className="lnr lnr-phone-handset"></i>
                      </h4>
                      <p className='idLista letra'>
                        {data.telefono != '' &&
                          data.telefono
                        }
                        {data.telefono == '' &&
                          `Sin teléfono`
                        }
                      </p>
                      <br/>
                      <br/>
                      <div className='clearFix'></div>

                    </li>
                    <li>

                      <h4 className='idLista'>
                        <i className="lnr lnr-map-marker"></i>
                      </h4>
                      <p className='idLista letra'>
                        {data.ubicacion != '' &&
                          data.ubicacion
                        }
                        {data.ubicacion == '' &&
                          `Sin dirección`
                        }
                      </p>

                      <br/>
                      <br/>
                      <div className='clearFix'></div>

                    </li>
                    </div>
                  </ul>
       </div>
       <div className="wrap-login200perf p-l-30 p-r-30 p-t-30 p-b-30">
            <h1 className="login100-form-title">
              Tus libros publicados
            </h1>
            <span>
            <h5 className='text-center'>Esta es tu lista de libros</h5>
            </span>
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
