import React, { useRef } from 'react';
import '../cards/Cards.css';
import CardItem from '../cards/CardItem';

function Cards_catalogo() {
  return (
    <div className='cards'>
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
            <CardItem
                src='images/8.jpg'
                text='Nombre del libro'
                label='Matematicas'
                path='/registro'
              />
             <CardItem
                src='images/3.jpg'
                text='Nombre del libro'
                label='Literatura'
                path='/registro'
              />
              <CardItem
                src='images/1.jpg'
                text='Nombre del libro'
                label='Cultural'
                path='/registro'
              />
              <CardItem
                src='images/2.jpg'
                text='Nombre del libro'
                label='Cultural'
                path='/registro'
              />
            </ul>
            <ul className='cards__items'>
              <CardItem
                src='images/9.jpg'
                text='Nombre del libro'
                label='Matematicas'
                path='/registro'
              />
              <CardItem
                src='images/4.jpg'
                text='Nombre del libro'
                label='Historia'
                path='/registro'
              />
              <CardItem
                src='images/6.jpg'
                text='Nombre del libro'
                label='Ambiental'
                path='/registro'
              />
              <CardItem
                src='images/7.jpg'
                text='Nombre del libro'
                label='Cultural'
                path='/registro'
              />
              
            </ul>
          </div>
        </div>
      </div>
  );
}

export default Cards_catalogo;
