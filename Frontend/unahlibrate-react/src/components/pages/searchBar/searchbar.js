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
            placeholder="Buscar libros (título o autor)"
            name="s" 
        />
        <button type="submit" class="btn btn-primary">Buscar</button>
        
        
    </form>


    </div>
);

export default SearchBar;