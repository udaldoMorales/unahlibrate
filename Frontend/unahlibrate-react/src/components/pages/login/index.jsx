import React, {useState} from "react";
import { Link } from "react-router-dom";
import {Titulo} from "./../../atoms";
import {FormLogin} from "./../../molecule"



import "antd/dist/antd.css";
import "./style.css";

const Login = () => {
  const [state,setState]=useState({
    correo: null,
    contrasenia: null
  })
      
  
  return( 
    <div className="login_container">
    <Titulo/>

   {/* <form className="login_form">

      <Input/>

     <Boton/>

     <Label/>
  </form>*/}
 <div className='formLoginStyle'><FormLogin/></div> 
  </div>
  );
};

export default Login;
