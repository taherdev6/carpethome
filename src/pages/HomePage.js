import React from 'react';
import { FeaturedProducts, Hero, Services, Contact } from '../components';
const HomePage = () => {
  if(localStorage.getItem('pending')) localStorage.removeItem('pending') 
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
