import React, { useState, useEffect } from "react";
import Navbar from './../Home/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import libro from '../../../img/1.jpg'
import "./style1.css";


const DetalleLibro = () => {
    return(
        <React.Fragment>
        <Navbar/>
       
        <div className="container1">
        <div className="card-element">
            <div className="shoeBackground seccion2">
                <div className="gradients">
                    <div className="gradient second" color="blue"></div>
                    <div className="gradient" color="red"></div>
                    <div className="gradient" color="green"></div>
                    <div className="gradient" color="orange"></div>
                    <div className="gradient" color="black"></div>
                </div>
                <h1 className="nike">Detalle del Libro</h1>
                <img className="img-detalle" src={libro} alt=""/>
               
              
            </div>
            <div className="infomacion">
                <div className="shoeName">
                    <div className="big">
                        <h1 >Logica programacion</h1>
                     
                    </div>
                    <h3 className="small tiltulo-autor">Marcio Martinez</h3>
                </div>
                     
                <div className="form-floating divis">
                    <h4 className="title">Descripcion</h4>
                    <textarea className="form-control1 desc-detalle"  ></textarea>
                 
                  </div>

              
                <div className="color-container">
                  
                    <div className="row ">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="">Precio</label>
                        <input
                          type="text"
                          className="form-control input-detalle"
                      
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                          <label className="form-weight-bold">Genero</label>
                          <input
                            type="text"
                            className="form-control input-detalle"
                        
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-weight-bold">Estado</label>
                        <input
                          type="text"
                          className="form-control input-detalle"
                    
                        />
                      </div>
                    </div>
                      
                  </div>

                </div>
                <div className="size-container">
                  
                    <div className="row ">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="">Por</label>
                        <input
                          type="text"
                          className="form-control input-detalle"
                      
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                          <label className="form-weight-bold">Publicado</label>
                          <input
                            type="text"
                            className="form-control input-detalle"
                      
                          />
                        </div>
                      </div>
                    
                      
                  </div>
                    
                </div>
                <div className="buy-price">
                <button type="button" class="btn btn-success">Contactar al vendedor</button>
                <button type="button" class="btn btn-secondary">Volver</button>
                 
                </div>
            </div>
        </div>
    </div>
  

      </React.Fragment>
    )
}

export default DetalleLibro;