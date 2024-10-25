import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
