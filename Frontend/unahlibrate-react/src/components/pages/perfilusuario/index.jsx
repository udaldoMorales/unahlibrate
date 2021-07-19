import React from 'react';
import Cards from '../cards/Cards';
import Navbar from './../Home/Navbar';
import './../Home/Navbar.css';
import "./style.css";
import perfil from '../../../img/perfil.jpg'
import "bootstrap/dist/css/bootstrap.min.css";

const PerfilUsers = () => {
 return(
<React.Fragment>
   <Navbar/>
  <section className="seccion-perfil-usuario">
<div className="perfil-usuario-header">
    <div className="perfil-usuario-portada">
<div className="perfil-usuario-avatar">
<img className="iconolbr" src={perfil} alt=""/>
</div>
</div>
</div>

<div className="perfil-usuario-body">

     <div className="perfil-usuario-footer">
 
     <div className="row mb-3">
     <div className="col-md-6">
     <div className="form-group">
     <label className="form-weight-bold lnr lnr-user">Usuario</label>
     <input
     type="text"
     className="form-control inputnombre"
     name="Nombre"
   />
   </div>
     
     </div>
     <div className="col-md-6">
     <div className="form-group">
     <label className="form-weight-bold lnr lnr-user">Nombre</label>
     <input
       type="text"
       className="form-control inputnombre"
       name="Nombre"
   
    
     />
   </div>
     
     </div>
     
     </div>

     <div className="row mb-3">
     <div className="col-md-6">
     <div className="form-group">
     <label className="form-weight-bold lnr lnr-envelope">Correo</label>
     <input
     type="email"
     className="form-control inputnombre"
     name="Nombre"

   />
   </div>
     
     </div>
     <div className="col-md-6">
     <div className="form-group">
     <label className="form-weight-bold lnr lnr-phone-handset ">Telefono</label>
     <input
       type="text"
       className="form-control inputnombre"
       name="Nombre"
     
    
     />
   </div>
     
     </div>
     
     </div>

     <div className="row">
     <div className="col-12">
     <div className="form-group inputubucacion ">
     <label className="form-weight-bold lnr lnr-map-marker">Ubicacion</label>
     <input
     type="email"
     className="form-control inputnombre"
     name="Nombre"
  
  
   />
   </div>
     
     </div>
   
     
     </div>
         </div>
</div>

</section>

<div className="container ">
   
    <div class="alert alert-primary" role="alert">
      <center><h2>Libros Publicados</h2></center> 
</div>
<Cards/>

</div>

</React.Fragment>
 )

};

export default PerfilUsers;
