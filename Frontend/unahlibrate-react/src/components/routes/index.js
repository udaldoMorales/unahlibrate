import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Login, Registro, ActualizarPerfil, Perfil, Formclv, DetLibro } from "./../pages";

import Home from "./../pages/Home/Home";
import Catalogo from "./../pages/catalogo/catalogo";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/perfil" component={Perfil} />
        <Route exact path="/actualizarPerfil" component={ActualizarPerfil} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/" component={Home} />
        <Route exact path="/aboutus"  render={() => {<React.Fragment><p>Esta es una prueba.</p></React.Fragment>}} />
        <Route exact path="/catalogo" component={Catalogo} />
        <Route exact path="/detLibro" component={DetLibro}/>
      </Switch>
    </Router>
  );
};

export default Routes;
