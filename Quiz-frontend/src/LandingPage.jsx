import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import PartnersSection from './components/PartnersSection';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;