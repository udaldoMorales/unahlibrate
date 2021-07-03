import React from 'react';
import '../../../App.css';
import Cards from '../cards/Cards';
import HeroSection from './HeroSection';
import Footer from '../footer/Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
