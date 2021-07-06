import React from 'react';
import '../../../App.css';
import Cards from '../cards/Cards';
import HeroSection from './HeroSection';
import Footer from '../footer/Footer';
import Navbar from './Navbar';
import './Navbar.css';

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
