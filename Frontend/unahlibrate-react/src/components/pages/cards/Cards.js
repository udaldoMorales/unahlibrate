import React, { useRef } from 'react';
import '../cards/Cards.css';
import CardItem from '../cards/CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Revisa los libros que tenemos para ti!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
          <CardItem
              src='images/8.jpg'
              text='Expediciones matematicas es una amena seleccion de
              mas de quinientos problemas de diferentes epocas y civilizaciones...'
              label='Matematicas'
              path='/sign-up'
            />
           <CardItem
              src='images/3.jpg'
              text='La literatura nos ayuda a vivir y nos permite responder mejor
              a nuestra vocacion de seres humanos. Estas dos ideas sencillas...'
              label='Literatura'
              path='/services'
            />
            <CardItem
              src='images/1.jpg'
              text='Quiénes son los millennials colombianos presenta los resultados de una 
              investigación que tuvo como objetivo conocer...'
              label='Cultural'
              path='/services'
            />
            <CardItem
              src='images/2.jpg'
              text='​Indaga en la relación entre emociones, 
              expresiones faciales y la cultura en ese tipo de encuentros...'
              label='Cultural'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/9.jpg'
              text='Para los que nacimos en la segunda mitad del siglo XX 
              y algunos en este siglo, el nombre Baldor es sinónimo de conocimiento, educación, calidad...'
              label='Matematicas'
              path='/services'
            />
            <CardItem
              src='images/4.jpg'
              text='El presente libro hace parte de una gran publicación sobre Minería y desarrollo 
              elaborada por un grupo interdisciplinario de más de noventa investigadores...'
              label='Historia'
              path='/products'
            />
            <CardItem
              src='images/6.jpg'
              text='La explotación indiscriminada de los recursos ambientales nos ha llevado 
              a pensar que somos externos al medio ambiente...'
              label='Ambiental'
              path='/sign-up'
            />
            <CardItem
              src='images/7.jpg'
              text='Libro para la formacion integral de ambientes educativos sin importar
              el grado educativo llevado...'
              label='Cultural'
              path='/sign-up'
            />
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
