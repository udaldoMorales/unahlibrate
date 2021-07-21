import React, { useState, useEffect } from "react";

import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./detLibro.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Redirect, useParams} from 'react-router-dom';

//Importaciones para la conexión con el backend
import { individualBook } from '../../../services/UserBooks';
import { URL_GET_IMAGE_BOOK } from '../../../constants/urls';
import {peticionDatoUsuario, peticionUsuarioLoggeado} from '../../../services/Auth';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const DetLibro = () =>{

    const {bookId} = useParams();

    const [user, setUser] = useState({});
    
    //State que recibe el allow de peticionUsuarioLoggeado:
    const [allowed, setAllow] = useState({});

    //State que confirma una sesión iniciada:
    const [isSigned, setIsSigned] = useState(null);

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

    const [data, setData] = useState({
        tituloLibro: "",
    
        autor: "",
    
        edicion: "",
    
        genero: "",
    
        precio: "",
        
        estado:"",

        usuario: '',
    
        descripcion: "",

        imagenLibro: ""

      });

    const bookInfo = (id) => {
      individualBook(id)
      .then(
          (res) => {
              if(res.status==='success'){
                  setData({
                      tituloLibro: res.book.title,
                      autor: res.book.autor,
                      edicion: res.book.edition,
                      genero: res.book.genre[0],
                      precio: res.book.price,
                      estado: res.book.condition,
                      usuario: res.book.user,
                      descripcion: res.book.description,
                      imagenLibro: res.book.image
                  })
              }
          }
          )
      .catch(
          )
    }

    const volverAtras = (e) => {
      //e.preventDefault();
      console.log('Backeo, eo, eo.');
      window.history.back();
    }

    useEffect(() => {
        pedirDatos();
        pedirLogg();
        bookInfo(bookId);
    }, [isSigned]);

    if (isSigned===false){
      return (
        <Redirect to='/login' />
        ); 
    } else if (isSigned===true && user!=={}) {
    console.log(data.usuario);
    console.log("---");
    console.log(user._id);
      return(
        <React.Fragment>
           <Navbar/>
          <section className="seccion-perfil-usuario">
        <div className="perfil-usuario-header">
        </div>
        
        <div className="perfil-usuario-body">
        

             <div className="perfil-usuario-footer">

             

             <div className="row mb-3">
             <div className="col-md-6">
             
                <div>
                  {
                  ( data.imagenLibro !== "")? (
                    <div className='centerImage'>
                    <img src={`${URL_GET_IMAGE_BOOK}${data.imagenLibro}`} alt={""} className="imagenLibro"/>
                    </div>
                  ) : (
                    <div className='centerImage'>
                   
                    </div>
                  )
                  
                  }
                  {/**/}
                </div>
                
                </div>
            
            <div className="col-md-6">
            <div className="row mb-3">
            <div className="form-group">
            <span>Titulo:</span>
            <br />
            {/*<b>Aqui val el titulo</b>*/}
            <b>{data.tituloLibro}</b>
            </div>
            </div>
          
            <div className="row mb-3">
            <div className="form-group">
            <span>Autor:</span> 
            <br />
            {/*<b>Aqui va el nombre del autor</b>*/}
            <b>{data.autor}</b>
            </div>
            </div>
            
            <div className="row-mb-3">
            <div className="form-group">
                <span>Precio:</span>
                 <br />
                 {/*<b>Aqui va el precio</b>*/}
            <b>{data.precio}</b>
            </div>
            </div>

            <div className="row-mb-3">
            <div className="form-group">
            <span>Genero:</span> 
            <br />
            {/*<b>Aqui va el genero del libro </b>*/}
            <b>{data.genero}</b>
            </div>
            </div>

            <div className="row-mb-3">
            <div className="form-group">
            <span>Estado:</span> 
            <br />
            {/*<b>Aqui va el estado del libro </b>*/}
            <b>{data.estado}</b>
            </div>
            </div>

            </div>
        </div>
      

             <div className="row">
             <div className="col-12">
             <div className="form-group inputubucacion ">
          
                 <b>Descripcion:</b>
                 <br />
                 {/*<b>Aqui va una descripcion</b>*/}
             <p>{data.descripcion}</p>
            
           </div>
             
            </div>
            </div>
            <div className="container-login100-form-btn p-t-25">
              <button
                type="submit"
                className= "login100-form-btn">
                Comprar
              </button>

            </div>
            {(data.usuario === user._id) &&
              <div className="container-login100-form-btn p-t-25">
                <button
                  type="submit"
                  className= "login100-form-btn">
                  Editar
                </button>
            </div>}
            <div className="container-login100-form-btn p-t-25">
              <button
                type="submit"
                onClick={volverAtras}
                className= "login100-form-btn btn btn-warning">
                Volver
              </button>

            </div>

            </div>

        </div>

       


        </section>
        
        </React.Fragment>
         )
    } else {
      return (
        <React.Fragment>
          <Navbar />
        </React.Fragment>
        );
    }
    
        
};

export default DetLibro;