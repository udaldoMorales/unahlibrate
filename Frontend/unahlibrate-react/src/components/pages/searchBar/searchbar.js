import { Divider } from "antd";

const SearchBar = () => (
    <div class="padre ">
        <h3>¡Encuentra tu Libro!</h3>
    <form action="/catalogo/" method="get" class="barra-busqueda">
        <label htmlFor="header-search">
            <span className="visually-hidden">Busca un Libro</span>
        </label>
       <input class="input-search"
            type="text"
            id="header-search"
            placeholder="Busca un Libro"
            name="s" 
        />
        <div>
            <button type="submit" class="btn btn-info boton-search">Buscar</button>
        </div>
        
    </form>


    </div>
);

export default SearchBar;