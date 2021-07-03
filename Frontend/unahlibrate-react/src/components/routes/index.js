import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Login, Registro, ActualizarPerfil, Formclv } from "./../pages";
import Home from './../Home';

const Routes = () => {
  return (
    <Router>
      <Switch>
     
      <Route exact path="/" component={Login} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/actualizarPerfil" component={ActualizarPerfil} />
      </Switch>
    </Router>
  );
};

export default Routes;
