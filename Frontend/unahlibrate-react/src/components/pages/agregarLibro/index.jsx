import { Divider } from "antd";
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./style.css";
import libro from '../../../img/library.svg'


const agregarLibro = () => {
    return (
        <React.Fragment>
        <Navbar />
        <section className="contact-box">
        <div className = "row no-gutters formulario">
      <div className="col-xl-5 col-lg-12 register-bg">
      <center>
        <div class="titulo">
        <p >Agrega tus libros</p>
          <img className="iconolbr" src={libro} alt=""/>
       </div>
        </center>
     </div>
        <div className="col-xl-7 col-lg-12 d-flex">
           <div className="container align-self-center">
          
           <form>
        
           <center>
           <div className="centerMargen mt-3 mb-4 ">
           
           </div>
           <input 
               className="inputImagenLibro mb-4"
               type="file" 
               name="file0"
               />
         </center>
           <div className="row mb-4">
           <div className="col-md-6">
           <div className="form-group">
           <label className="form-weight-bold  mb-2">Nombre</label>
           <input
             type="text"
             className="form-control"
            
           />
         </div>
           
           </div>
           <div className="col-md-6">
           <div className="form-group">
             <label className="form-weight-bold mb-2">Autor</label>
             <input
               type="text"
               className="form-control"
         
             />
           </div>
         </div>
           
           
           </div>

           <div className="row mb-3">
           <div className="col-md-6">
             <div className="form-group">
               <label className="form-weight-bold mb-2">Edicion</label>
               <input
                 type="text"
                 className="form-control"
             
               />
             </div>
           </div>
           <div className="col-md-6">
               <div className="form-group">
                 <label className="form-weight-bold  mb-2">Genero</label>
                 <input
                   type="text"
                   className="form-control"
              
                 />
               </div>
             </div> 
         </div>
         <label className=" mb-2" for="">Estados</label>
       
         <div className="row mb-3">
         <div className="col-md-6">
         <div className="form-group">
           <div className="form-check form-check-inline">
             <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
             <label className="form-check-label" for="inlineRadio1">Usando</label>
           </div>
         </div>
       </div>
       <div className="col-md-6">
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
           <label className="form-check-label" for="inlineRadio2">Nuevo</label>
         </div>
       </div>
     </div>
         </div>
         <div className="form-group mb-5">
         <div className="mb-3">
           <label className="form-weight-bold mb-2">Descripcion</label>
           <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
         </div>
       </div>
       <center>
       <button type="button" class="btn btn-success width-100 btn-agregar mb-3 ">Agregar</button>
       <button type="button" class="btn btn-primary width-100 btn-cancelar  mb-3">Cancelar</button>
     </center>
           </form>

           </div>
        </div>
        </div>
        </section>
        
        </React.Fragment>
    )
};

export default agregarLibro;
