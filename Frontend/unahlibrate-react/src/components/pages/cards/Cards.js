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
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
              label='Matematicas'
              path='/sign-up'
            />
           <CardItem
              src='images/3.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
              label='Literatura'
              path='/services'
            />
            <CardItem
              src='images/1.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
              label='Cultural'
              path='/services'
            />
            <CardItem
              src='images/2.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
              label='Cultural'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/9.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
              label='Matematicas'
              path='/services'
            />
            <CardItem
              src='images/4.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
              label='Historia'
              path='/products'
            />
            <CardItem
              src='images/6.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
              label='Ambiental'
              path='/sign-up'
            />
            <CardItem
              src='images/7.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed eiusmod tempor incidunt ut labore et dolore magna aliqua.'
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
