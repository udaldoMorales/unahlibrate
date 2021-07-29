import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Menu, Dropdown, Button as Buttonand, Space } from "antd";
import { Link, Redirect } from "react-router-dom";
import "./Navbar.css";
import Cookies from 'universal-cookie';
import axios from 'axios';
import {peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion} from '../../../services/Auth';

import {URL_GET_USER_ACCESS, URL_GET_GET_USERNAME} from './../../../constants/urls';


const cookies = new Cookies();

function Navbar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

        /**Estado de nav , opciones */
  const [isSigned, setIsSigned] = useState(null);

  //Estado para saber el usuario
  const [user, setUser] = useState({});
  const [userLogged, setUserLogged] = useState({});

  //Estado para saber el allowed del thiis.
  const [allowed, setAllow] = useState({});


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const pedirDatos = async () => {

    try {
      //console.log(2);
      var rr = await peticionDatoUsuario(cookies.get('user'));
      //console.log('Response');
      //console.log(rr);
      setUser(rr.user);
    } catch (err) {
        console.log(err);
    }

  }

  const pedirLogg = async () => {
    
    try {

      //console.log(1);
      var response = await peticionUsuarioLoggeado(cookies.get('auth'), cookies.get('refreshToken'));
      //console.log('Viene de peticionUsuarioLoggeado');
      //console.log(cookies.get('auth'));
      //console.log(cookies.get('refreshToken'));
      //console.log(response);
      setAllow(response);
      setIsSigned(response.status);

    } catch (err) {
      console.log(err);
    }
  }

  const cerrarSesionActual = () => {
    cerrarSesion();
    setIsSigned(false);
  }

  useEffect(() => {

    pedirLogg();
    pedirDatos();

    /*
    peticionUsuarioLoggeado(cookies.get('auth'), cookies.get('refreshToken'))
      .then(response => {
        if (response) {
          setAllow(response);
          setIsSigned(response.status);
          console.log("Ejecuté peticionUsuarioLoggeado");
        }
      })
      .catch(err => {if (err) {console.log(err)}});

    peticionDatoUsuario(cookies.get('user'))
      .then(rr => {
        if (rr){
          setUser(rr.user);
          console.log('Ejecuté peticionusuario');
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
    */

    showButton();
  }, [isSigned]);

  window.addEventListener("resize", showButton);

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/perfilusuario" replace={false} >Mi perfil</Link>
        {/*<Redirect to="/" onClick={cerrarSesionActual}>Cerrar Sesión</Redirect>*/}
      </Menu.Item>
      <Menu.Item>
        <Link to="/actualizarPerfil" replace={false}>Actualizar perfil</Link>
        {/*<Redirect to="/" onClick={cerrarSesionActual}>Cerrar Sesión</Redirect>*/}
      </Menu.Item>
      <Menu.Item>
        <Link to="/formclv" replace={false}>Actualizar Contraseña</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/" replace={false} onClick={cerrarSesionActual}>Cerrar Sesión</Link>
        {/*<Redirect to="/" onClick={cerrarSesionActual}>Cerrar Sesión</Redirect>*/}
      </Menu.Item>
      <Menu.Item>
        <Link to="/actualizarLibros" replace={false}>Actualizar Libros</Link>
        {/*<Redirect to="/" onClick={cerrarSesionActual}>Cerrar Sesión</Redirect>*/}
      </Menu.Item>
    </Menu>
  );
  
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo logo" onClick={closeMobileMenu}>
            {/*UNAHLibrate*/}
            <img id='logounahlibrate' src='/images/Logo.png' height={35}/>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          {(isSigned == false || user == undefined) && (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Acerca de Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/registro"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Registrarse
                </Link>
              </li>

              {/*
              <li>
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              */}
            </ul>
          )}

          {button && (isSigned == false || user == undefined) && (
            <Button onClick={'/login'} buttonStyle="btn--outline">Login</Button>
          )}

          {(isSigned == true && user != undefined) && (

            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-links" onClick={() => {closeMobileMenu();  window.location.replace(`/catalogo`);}}>
                  Catálogo
                </a>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Acerca de Nosotros
                </Link>
              </li>
              <li className="nav-item">
              <Link
                to="/agregarLibro"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Agregar Libros
              </Link>
            </li>
             </ul>            

            )
          }

          {button && isSigned == true && user != undefined && (
            <Dropdown
              className="btn--outline"
              overlay={menu}
              placement="bottomLeft"
            >
              <button id='userButton'>{user.user}</button>
            </Dropdown>
          )}
        </div>
      </nav>
    </>
  );
}

{/*<button id='userButton'>{user.user}</button>*/}
{/*<Buttonand className="btn-options-full">{user.user}</Buttonand>*/}

export default Navbar;
