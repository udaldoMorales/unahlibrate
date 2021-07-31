
import React from 'react';
import "./App.css";
import Routes from "./components/routes";
import Navbar from "./components/pages/Home/Navbar";
import { Login } from "./components/pages";
import { Registro, ActualizarPerfil, Formclv, Agregarlibro,PerfilUsers, DetLibro,ActualizarLibro,PanelChat } from "./components/pages";
import Home from "./components/pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Perfil } from "./components/pages";
import AboutUs from './components/pages/aboutUs/AboutUs';
import Catalogo from './components/pages/catalogo/catalogo';
import FormValiduser from './components/pages/recuppassword/validuser';
import Formrecupclv from './components/pages/recuppassword/recuperar';

import Chat from './components/pages/chat/Chat';
import Chats from './components/pages/chat/Chats';

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
        <Route path="/recuppassword" component={FormValiduser} />
        <Route path='/restore-password/:token' component={Formrecupclv} />
        <Route path="/perfil" component={Perfil}/>
        <Route path="/agregarLibro" component={Agregarlibro}/>
        <Route path="/about"  component={AboutUs} />
        <Route path="/catalogo" exact component={Catalogo} />
        <Route path="/catalogo/busqueda/:search?" exact component={Catalogo} />
        <Route path="/perfilusuario" exact component={PerfilUsers}/>
        <Route path="/detLibro/:bookId" exact component={DetLibro}/>
        <Route path="/actualizarLibros" component={ActualizarLibro}/>
        <Route path="/panelChat" exact component={PanelChat}/>

      {/*Para probar el chat*/}
      {/*<Route path='/chat' exact component={Chat}/>
      <Route path='/chats' exact component={Chats}/>*/}
      </Switch>
    </Router>
  );
}

export default App;
