import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import { Divider } from "antd";
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./style.css";
import bookEdit from '../../../img/notebook.svg'
import {Notebook} from "../../atoms";


const ActualizarLibro = () => {

  const[datos, setDatos] = useState({

    Nombre:"",
    Autor:"",
    Edicion:"",
    Genero:"",
    Precio:"",
    Descripcion:"",
  })
  const{Nombre,Autor,Edicion,Genero,Precio,Descripcion} =datos;

  const handleInputChange = (e) =>{
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

    return (
        <React.Fragment>
        <Navbar />
        <section className="contact-box">
        <div className = "row no-gutters formulario">
      <div className="col-xl-5 col-lg-12 register-bga">
      <center>
        <div class="titulo1">
        <p >Actualiza tus libros</p>
          <Notebook className="oso"/>
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
             name="Nombre"
             onChange ={handleInputChange}
             value={Nombre}
           />
         </div>
           
           </div>
           <div className="col-md-6">
           <div className="form-group">
             <label className="form-weight-bold mb-2">Autor</label>
             <input
               type="text"
               className="form-control"
               name="Autor"
               onChange ={handleInputChange}
               value={Autor}
             />
           </div>
         </div>
           
           
           </div>

           <div className="row mb-3">
           <div className="col-md-4">
             <div className="form-group">
               <label className="form-weight-bold mb-2 ">Edición</label>
               <input
                 type="text"
                 className="form-control"
                 name="Edicion"
                 onChange ={handleInputChange}
                 value={Edicion}
               />
             </div>
           </div>
           <div className="col-md-4">
               <div className="form-group">
                 <label className="form-weight-bold  mb-2">Género</label>
                 <select className="form-select select-genero" aria-label="Default select example">
                 <option selected>Elegir Género</option>
                 <option value="1">Género Narrativo</option>
                 <option value="2">Género Lírico</option>
                 <option value="3">Género Dramático</option>
                 <option value="3">Género Didáctico</option>
               </select>
               </div>
             </div> 
             <div className="col-md-4">
             <div className="form-group">
               <label className="form-weight-bold mb-2">Precio</label>
               <input
                 type="text"
                 className="form-control"
                 name="Precio"
                 onChange ={handleInputChange}
                 value={Precio}
               />
             </div>
           </div>
         </div>
         <label className=" mb-2" for="">Estado</label>
       
         <div className="row mb-3">
         <div className="col-md-6">
         <div className="form-group">
           <div className="form-check form-check-inline">
             <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"  onChange ={handleInputChange} />
             <label className="form-check-label" for="inlineRadio1">Usado</label>
           </div>
         </div>
       </div>
       <div className="col-md-6">
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"  onChange ={handleInputChange}/>
           <label className="form-check-label" for="inlineRadio2">Nuevo</label>
         </div>
       </div>
     </div>
         </div>
         <div className="form-group mb-5">
         <div className="mb-3">
           <label className="form-weight-bold mb-2">Descripción</label>
           <textarea className="form-control" value={Descripcion} onChange ={handleInputChange} id="exampleFormControlTextarea1"   name="Descripcion" rows="3" 
           ></textarea>
         </div>
       </div>
       <center>
       <button type="button" class="btn btn-success width-100 btn-agregar mb-3 ">Actualizar</button>
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

export default ActualizarLibro;
