import React from 'react';
import "./App.css";
import Routes from "./components/routes";
import Navbar from "./components/pages/Home/Navbar";
import { Login } from "./components/pages";
import { Registro, ActualizarPerfil, Formclv } from "./components/pages";
import Home from "./components/pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Perfil } from "./components/pages";
import AboutUs from './components/pages/aboutUs/AboutUs';

function App() {
  return (
    <Router>
      {/*<Navbar />*/}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registro" component={Registro} />
        <Route path="/actualizarPerfil" component={ActualizarPerfil} />
        <Route path="/Formclv" component={Formclv} />
        <Route path="/perfil" component={Perfil}/>
        <Route path="/about"  component={AboutUs} />
      </Switch>
    </Router>
  );
}

export default App;
