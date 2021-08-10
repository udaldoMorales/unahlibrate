import React, { useRef, useState, useEffect } from 'react';
import '../catalogo/catalogo.css';
import CardItem from '../catalogo/card-item';
import Cards from '../cards/Cards';
import Cards_catalogo from './cards-catalogo';
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import Swal from "sweetalert2";
import {Link, Redirect, useParams} from 'react-router-dom';
import {peticionDatoUsuario, peticionUsuarioLoggeado, cerrarSesion} from '../../../services/Auth';
import { allBooks, searchBooks } from '../../../services/UserBooks';
import Cookies from 'universal-cookie';
import Search from '../searchBar/searchbar';
import '../searchBar/search.css'

const cookies = new Cookies();


function Catalogo() {

const {search} = useParams();

//State que recibe el allow de peticionUsuarioLoggeado:
const [allowed, setAllow] = useState({});

//State que confirma una sesión iniciada:
const [isSigned, setIsSigned] = useState(null);

const [user, setUser] = useState({});

//State que obtiene los libros del usuario
const [books, setBooks] = useState(null);

//State que obtiene los libros del usuario traídos por búsqueda.
const [filteredBooks, setFilteredBooks] = useState(null);

//Pregunta por el token y si hay una sesión iniciada
const pedirLogg = async () => {

    try {

      var response = await peticionUsuarioLoggeado(cookies.get('auth'), cookies.get('refreshToken'));
      setAllow(response);
      setIsSigned(response.status);

    } catch (err) {
      console.log(err);
    }
  }

//Recibe la información del usuario logeado
const pedirDatos = async () => {

    try {
      var rr = await peticionDatoUsuario(cookies.get('user'));
      setUser(rr.user);
    } catch (err) {
      console.log(err);
    }
  }

const pedirLibros = (id) => {
  allBooks().then(res=>{
    if (res.status==='success') setBooks(res.books);
  });

};

const buscarLibros = (busqueda) => {
  searchBooks(busqueda)
  .then((res) => {
    if (res.status==='success') setFilteredBooks(res.books);
        })
  .catch((err) => console.log(err)
    )
}

  useEffect(() => {
    pedirDatos();
    pedirLogg();
    if (search!==undefined) {
      buscarLibros(search);
    } else if (search==undefined) {
      pedirLibros();  
    }
    
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
            <Search/>
              {/*Esto es cuando no exista una búsqueda*/}
              {search==undefined && books==null &&
                <div className='cards'>
                <h1>Aún no se han publicado libros.</h1>
                </div>
              }
              {search==undefined && books!=null && filteredBooks==null &&
                <React.Fragment>
                <h3>Estos son los libros que tenemos para ti</h3>
                <Cards_catalogo libros={books}/>
                </React.Fragment>
              }

              {/*Esto es cuando exista una búsqueda*/}
              {search!==undefined && filteredBooks==null && books==null &&
                <div className='cards'>
                <h3>No hay libros que coincidan con {`"${search}"`}.</h3>
                </div>
              }
              {search!==undefined && filteredBooks!=null && books==null &&
                <React.Fragment>
                <h3>Búsquedas coincidentes con {`"${search}"`}</h3>
                <Cards_catalogo libros={filteredBooks}/>
                </React.Fragment>
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
  