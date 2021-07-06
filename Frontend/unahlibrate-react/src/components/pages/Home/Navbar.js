import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Menu, Dropdown, Button as Buttonand, Space } from "antd";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

        /**Estado de nav , opciones */
  const [isSigned, setIsSigned] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/formclv">Actualizar Contraseña</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/">Cerrar Sesión </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            UNAHLibrate
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          {!isSigned ? (
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

              <li>
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  to="/actualizarPerfil"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Actualizar Perfil
                </Link>
              </li>

              <li>
                <Dropdown
                  className="nav-links-mobile btn-opciones"
                  overlay={menu}
                  placement="bottomLeft"
                >
                  <Buttonand>Opciones</Buttonand>
                </Dropdown>
              </li>
            </ul>
          )}

          {button && !isSigned && (
            <Button buttonStyle="btn--outline">Login</Button>
          )}

          {button && isSigned && (
            <Dropdown
              classNamee="btn--outline "
              overlay={menu}
              placement="bottomLeft"
            >
              <Buttonand className="btn-options-full">Opciones</Buttonand>
            </Dropdown>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
