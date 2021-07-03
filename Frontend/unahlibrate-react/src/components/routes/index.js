import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Login, Registro, ActualizarPerfil, Formclv } from "./../pages";

import Home from "./../pages/Home/Home";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/actualizarPerfil" component={ActualizarPerfil} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
