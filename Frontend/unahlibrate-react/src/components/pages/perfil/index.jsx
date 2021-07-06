import React, { useState } from "react";
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

import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';


const Perfil = () => {
    

    const [goEdit, setGoEdit] = useState(false);

    //State que guarda los datos de la BD
    const [data, setData] = useState({
        usuario: "",
    
        contraseña: "",
    
        email: "",
    
        telefono: "",
    
        ubicacion: ""
      });

    /*  useEffect(() => {
        "Funcion que recibe la info"()
          .then((res) => {
            setData(res);
    
          })
    
          .catch((err) => console.log(err));
      }, []);*/

      const goToEdit = () => {
        setGoEdit(true);
      };
    
     return(
        <div className="limiter">
            <div className=" justify-content-center imagenFondo">
                <div className="wrap-login300 p-l-50 p-r-50 p-t-50 p-b-30">
                <form
                  className="login100-form validate-form btn"
                >
            <span className="login100-form-title p-b-34">
              Perfil de Usuario
            </span>
            <div>
              <ProfileUser />
            </div>
            <br />

            <div
              className="wrap-input100  m-b-16"
            >
              <input
                className="input100"
                type="text"
                name="Usuario"
                placeholder="Usuario"
                value={"3psil0n274"}
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
                className="input100"
                type="password"
                name="Password"
                placeholder="Password"
                value={"Lisandro"}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-lock"></span>
              </span>
            </div>

            <div
              className="wrap-input100 m-b-16"
    
            >
              <input
                id="emailInput"
                className="input100"
                type="text"
                name="Correo"
                placeholder="Correo"
                value={"lisan3@hotmail.com"}
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
                type="text"
                name="NumeroTelefono"
                placeholder="Numero de Telefono"
                value={"88063544"}
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
                type="text"
                name="Ubicacion"
                placeholder="Ubicacion"
                value={"Tegucigalpa"}
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
     );

}

export default Perfil;
