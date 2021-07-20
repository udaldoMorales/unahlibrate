import React, { useState, useEffect } from "react";
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./detLibro.css";
import "bootstrap/dist/css/bootstrap.min.css";

const DetLibro = () =>{

    const [data, setData] = useState({
        tituloLibro: "",
    
        autor: "",
    
        edicion: "",
    
        genero: "",
    
        precio: "",
        
        estado:"",
    
        descripcion: "",

        imagenLibro: ""

      });


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
                    <img src={"http://localhost:3900/api/" + 'get-image/' + data.imagenLibro} alt={""} className="imagenLibro"/>
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
            <b>Aqui val el titulo</b>
            <b>{data.tituloLibro}</b>
            </div>
            </div>
          
            <div className="row mb-3">
            <div className="form-group">
            <span>Autor:</span> 
            <br />
            <b>Aqui va el nombre del autor</b>
            <b>{data.autor}</b>
            </div>
            </div>
            
            <div className="row-mb-3">
            <div className="form-group">
                <span>Precio:</span>
                 <br />
                 <b>Aqui va el precio</b>
            <b>{data.precio}</b>
            </div>
            </div>

            <div className="row-mb-3">
            <div className="form-group">
            <span>Genero:</span> 
            <br />
            <b>Aqui va el genero del libro </b>
            <b>{data.genero}</b>
            </div>
            </div>

            <div className="row-mb-3">
            <div className="form-group">
            <span>Estado:</span> 
            <br />
            <b>Aqui va el estado del libro </b>
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
                 <b>Aqui va una descripcion</b>
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
            <div className="container-login100-form-btn p-t-25">
              <button
                type="submit"
                className= "login100-form-btn btn btn-warning">
                Volver
              </button>

            </div>

            </div>

        </div>

       


        </section>
        
        </React.Fragment>
         )
        
        };

export default DetLibro;