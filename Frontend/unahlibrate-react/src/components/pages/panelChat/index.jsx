import React,{useState} from 'react';
import img1 from '../../../img/perfil.jpg'
import img2 from '../../../img/perfil2.jpg'
import img3 from '../../../img/perfil3.jpg'
import img4 from '../../../img/perfil4.jpg'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./style.css";



const PanelChat = () => {

 
    return (
        <React.Fragment>
        <Navbar />

        <section className="body-chat">
        <div className="seccion-titulo">
            <h3 className="titulo2">
                <i className="fas fa-comments icono-msj"></i>
                Sistema de mensajeria
            </h3>
        </div>
        <div className="seccion-usuarios">
            <div className="seccion-buscar">
                <div className="input-buscar">
                    <input type="search" placeholder="Buscar usuario"/>
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <div className="seccion-lista-usuarios">
                <div className="usuario">
                    <div className="avatar">
                        <img src={img1} alt=""/>
                        <span className="estado-usuario enlinea"></span>
                    </div>
                    <div className="cuerpo">
                        <span> Nombre apellido</span>
                        <span>detalles de mensaje</span>
                    </div>
                    <span className="notificacion">
                        3
                    </span>
                </div>
                <div className="usuario">
                    <div className="avatar">
                        <img src={img3} alt=""/>
                        <span className="estado-usuario ocupado"></span>
                    </div>
                    <div className="cuerpo">
                        <span> Nombre apellido</span>
                        <span>detalles de mensaje</span>
                    </div>
                    <span className="notificacion">
                        1
                    </span>
                </div>
                <div className="usuario">
                    <div className="avatar">
                        <img src={img2} alt=""/>
                        <span className="estado-usuario desconectado"></span>
                    </div>
                    <div className="cuerpo">
                        <span> Nombre apellido</span>
                        <span>detalles de mensaje</span>
                    </div>
                    <span className="notificacion">
                        1
                    </span>
                </div>
            </div>
        </div>

        <div className="seccion-chat">
            <div className="usuario-seleccionado">
                <div className="avatar">
                    <img src={img3} alt=""/>
                </div>
                <div className="cuerpo">
                    <span>Nombre de usuario</span>
                    <span>Activo - Escribiendo...</span>
                </div>
              
            </div>
            <div className="panel-chat">
                <div className="mensaje">
                    <div className="avatar">
                        <img src={img3} alt=""/>
                    </div>
                    <div className="cuerpo">
                
                        <div className="texto">
                            Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Dolor eligendi voluptatum dolore voluptas iure.
                            <span className="tiempo">
                                <i className="far fa-clock"></i>
                                Hace 5 min
                            </span>
                        </div>
                       
                    </div>
                </div>
             
                <div className="mensaje left">
                    <div className="cuerpo">
                      
                        <div className="texto">
                            Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Dolor eligendi voluptatum dolore voluptas iure.
                            <span className="tiempo">
                                <i className="far fa-clock"></i>
                                Hace 6 min
                            </span>
                        </div>
                      
                    </div>
                    <div className="avatar">
                        <img src={img4} alt=""/>
                    </div>
                </div>
                <div className="mensaje">
                <div className="avatar">
                    <img src={img3} alt=""/>
                </div>
                <div className="cuerpo">
            
                    <div className="texto">
                        Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Dolor eligendi voluptatum dolore voluptas iure.
                        <span className="tiempo">
                            <i className="far fa-clock"></i>
                            Hace 3 min
                        </span>
                    </div>
                   
                </div>
            </div>
            <div className="mensaje left">
                    <div className="cuerpo">
                      
                        <div className="texto">
                            Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Dolor eligendi voluptatum dolore voluptas iure.
                            <span className="tiempo">
                                <i className="far fa-clock"></i>
                                Hace 2 min
                            </span>
                        </div>
                      
                    </div>
                    <div className="avatar">
                        <img src={img4} alt=""/>
                    </div>
                </div>
         
            </div>
            <div className="panel-escritura">
                <form className="textarea">
                    <div className="opcines">
                        <button type="button">
                            <i className="fas fa-file"></i>
                            <label for="file"></label>
                            <input type="file" id="file"/>
                        </button>
                        <button type="button">
                            <i className="far fa-image"></i>
                            <label for="img"></label>
                            <input type="file" id="img"/>
                        </button>
                    </div>
                    <textarea placeholder="Escribir mensaje"></textarea>
                    <button type="button" className="enviar">
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    </section>
      
        </React.Fragment>
    )
};

export default PanelChat;
