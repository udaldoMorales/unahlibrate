import React, { useRef, useState, useEffect } from 'react';
import '../catalogo/catalogo.css';
import CardItem from '../catalogo/card-item';
import Cards from '../cards/Cards';
import Cards_catalogo from './cards-catalogo';
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import Swal from "sweetalert2";
import {Link, Redirect} from 'react-router-dom';
import {peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion} from '../../../services/Auth';
import { allBooks } from '../../../services/UserBooks';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function Catalogo() {

//State que recibe el allow de peticionUsuarioLoggeado:
const [allowed, setAllow] = useState({});

//State que confirma una sesión iniciada:
const [isSigned, setIsSigned] = useState(null);

const [user, setUser] = useState({});

//State que obtiene los libros del usuario
const [books, setBooks] = useState(null);

//Pregunta por el token y si hay una sesión iniciada
const pedirLogg = async () => {

    try {

      console.log(1);
      var response = await peticionUsuarioLoggeado(cookies.get('auth'), cookies.get('refreshToken'));
      setAllow(response);
      setIsSigned(response.status);
      console.log("Me ejecuté.")

    } catch (err) {
      console.log(err);
    }
  }

//Recibe la información del usuario logeado
const pedirDatos = async () => {

    try {
      console.log(2);
      var rr = await peticionDatoUsuario(cookies.get('user'));
      setUser(rr.user);
      console.log('- Yo también.');
      console.log('- METIDO.');
    } catch (err) {
      console.log(err);
    }
  }

const pedirLibros = (id) => {
  allBooks().then(res=>{
    if (res.status==='success') setBooks(res.books);
  });
  console.log("Me ejecute");
  console.log(books);
};

  useEffect(() => {
    pedirDatos();
    pedirLogg();
    pedirLibros();
  }, [isSigned]);

  if(isSigned==false){
      return(
        <Redirect to="/" />
      )
  } else if
      (isSigned==true){
        return (
            <React.Fragment>
            <Navbar />
              {books==null &&
                <div className='cards'>
                <h1>Aún no se han publicado libros.</h1>
                </div>
              }
              {books!=null &&
                <Cards_catalogo libros={books}/>
              }
            </React.Fragment>
            ); 
      }
      else if (isSigned === null || books === null) {
        return (
        <React.Fragment>
        <Navbar />
        </React.Fragment>
        );
      }
  
  
  //Funcion para el boton de login:

    return (
    <React.Fragment>
    <Navbar />
    <Cards_catalogo />
    </React.Fragment>
    );
  }
  
  export default Catalogo;
  