import React from "react";
import { Link } from "react-router-dom";
import Titulo from "../../atoms/titulo";
import Input from "../../atoms/input";
import Boton from "../../atoms/boton";
import Label from "../../atoms/label";



import "antd/dist/antd.css";
import "./style.css";

const Login = () => {
      
  
  return( 
    <div className="login_container">
    <Titulo/>

    <form className="login_form">

      <Input/>

     <Boton/>

     <Label/>
    </form>
  </div>
  );
};

export default Login;
