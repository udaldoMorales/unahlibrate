import React, { Component } from "react";
import "./index.css";

const Input = () => {
  return (
    <>
      <input
        className="inputs"
        type="email"
       placeholder=" &#128100;  Correo"
        required
        autofocus
      />
      <input  className="inputs" type="password" placeholder=" &#x1f512;  Contraseña " required  autofocus/>
    </>
  );
};

export default Input;
