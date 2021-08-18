import React from 'react';
import './AboutUs.css';
import Navbar from './../Home/Navbar';
import CardItem from '../cards/CardItem';
import Footer from '../footer/Footer';

function AboutUs() {
  return (
	<React.Fragment>
	<Navbar />
    <div className='cards'>
      
	<h1 className="login100-form-title">Esto es</h1>
	    <div align="center"><img src='/images/Logo-266fbd.png' height={55} alt="logo-unahlibrate"/></div>
		<div className="text-center w-full">
        <h3 className='p-b-30'></h3>
		<div align="center"><h3 className='p-b-30'>¡Bienvenid@ a este sitio!</h3> </div> 
		<p>Esta es una plataforma hecha para la Universidad Nacional Autónoma de Honduras -y próximamente, más allá-.
		En esta plataforma, estudiantes, docentes y demás personas van a poder comprar o vender libros (estén usados o nuevos).</p>
        <div className='cards'>
	    <p>Por el momento, un grupo de estudiantes estamos en el desarrollo de esta plataforma:</p>
		<div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/Lisan2.jpeg'
              text='Lisandro Suarez'
              label='Desarrollador'
            />
            <CardItem
              src='images/Kat.jpeg'
              text='Katherine Espino'
              label='Desarrollador'
             
            />
            <CardItem
              src='images/Lari.jpeg'
              text='Lariza Sandoval'
              label='Analista'
              
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/Jordan.jpeg'
              text='Jordan Martínez'
              label='Tester'
              
            />
            <CardItem
              src='images/Lou.jpeg'
              text='Lourdes Cárcamo'
              label='Diseñador'
              
            />
            <CardItem
              src='images/Udaldo.jpeg'
              text='Udaldo Morales'
              label='Desarrollador'
             
            />
          </ul>
        </div>
       </div>
      </div>
	  </div>
	 
	  <Footer />
	</React.Fragment>
  );
}

export default AboutUs;