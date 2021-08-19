import React from 'react';
import '../../../App.css';
import { Button } from './Button';
import './HeroSection.css';
import Libros from '../../../img/Libros.jpg'

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-3.mp4' autoPlay loop muted />
      <p>¿Qué estas esperando para ser parte de nuestra comunidad?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={'/registro'}
        >
          INICIA SESIÓN
        </Button>
        {/*<Button
                  className='btns'
                  buttonStyle='btn--primary'
                  buttonSize='btn--large'
                  onClick={'/videos/Trailer.mp4'}
                >
                  MIRA EL TRAILER <i className='far fa-play-circle' />
                </Button>*/}
      </div>
    </div>
  );
}

export default HeroSection;
