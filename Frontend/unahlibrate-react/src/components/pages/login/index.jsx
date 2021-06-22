import React, { useState } from "react";
import { Titulo, Label, ProfileUser } from "./../../atoms";
import { FormLogin } from "./../../molecule";

import "antd/dist/antd.css";
import "./style.css";

const Login = () => {
  const [state, setState] = useState({
    correo: null,
    contrasenia: null,
  });

  const controladorActualizarEstado = (values) => {
    setState((prevState) => ({ ...prevState, ...values }));
  };

  return (
    <div className="login_container">
      <Titulo />
      <div className="iconProfile">
        <ProfileUser />
      </div>
      <div className="formLoginStyle">
        <FormLogin
          valoresIniciales={state}
          actualizarEstado={controladorActualizarEstado}
        />
        <Label />
      </div>
    </div>
  );
};

export default Login;