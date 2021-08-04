import React, {useState} from 'react';
import { Divider } from "antd";
import {Redirect} from 'react-router-dom';

const SearchBar = () => {

    const [busqueda, setBusqueda] = useState(null);

    const [error, setError] = useState(false);

    const valorBusqueda = (e) => {
    setBusqueda(e.target.value);
    console.log(busqueda);
    };

    const buscar = (e) => {
        e.preventDefault();

        if (busqueda === null) {
          setError(true);
          console.log(error);
          return;
        }

        console.log(busqueda);
        window.location.replace(`/catalogo/busqueda/${busqueda}`);
    };

    return (
        <div class="padre ">
            <h3>¡Encuentra tu Libro!</h3>
        {/*<form action="/catalogo/" method="get" class="barra-busqueda">*/}
        <form onSubmit={buscar} className='barra-busqueda'>
            <label htmlFor="header-search">
                <span className="visually-hidden">Busca un Libro</span>
            </label>
           
           <input className="input-search"
                type="text"
                id="header-search"
                placeholder="Buscar libros (título o autor)"
                name="busqueda"
                onChange={valorBusqueda} 
            />
            <button type="submit" className="boton btn btn-primary">Buscar</button>
            
            {error==true ? (
              <p className="alerta alert alert-danger error-p text-white">
                Debes ingresar un campo.
              </p>
            ) : null}
            
            
        </form>


        </div>
    );

}

export default SearchBar;