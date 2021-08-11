import React, {useState, useEffect} from 'react';
import '../../../App.css';
import Cards from '../cards/Cards';
import HeroSection from './HeroSection';
import Footer from '../footer/Footer';
import Navbar from './Navbar';
import './Navbar.css';
import './../cards/Cards.css';

import {getLastBooks} from './../../../services/UserBooks';

function Home() {

  const [lastBooks, setLastBooks] = useState(null);

  const [mensaje, setMensaje] = useState("Estos son algunos de nuestros libros");

  const getBooks = (numero) => {

    getLastBooks(numero)
    .then((res) => {
      if (res.status === 'success'){
        setLastBooks(res.books)
      }
    })
    .catch((err) => console.log(err));

  };

  useEffect(() => {

    getBooks(4); //Cambiar este número significa que van a cambiar los libros que estén en el mostrador.

  })

  return (
    <>
      <Navbar />
      <HeroSection />
      <div style={{paddingTop: "2rem", paddingBottom: "1px", background: 'white'}}>
      <h1 style={{color:'#175ca8'}}>¡Esto es UNAHLibrate!</h1>
      <h5 style={{textAlign: 'center'}}>
        Somos una plataforma en crecimiento creada para la venta y compra de libros entre todas las personas que formen parte.
        <br/>
        Buscamos formar una comunidad de personas que puedan encontrar lo que necesiten, a un alcance pronto y oportuno.
        <br/>
        <br/>
        ¿Estás interesado en adquirir o vender libros?
        <br/>
        ¡Forma parte de UNAHLibrate, la comunidad de personas aficionadas
        al buen gusto de los libros!
        </h5>
      </div>
      {lastBooks !== undefined && lastBooks !== null
       ? <Cards libros={lastBooks} mensaje={mensaje} /> : <Cards />
      }
      <Footer />
    </>
  );
}

export default Home;
