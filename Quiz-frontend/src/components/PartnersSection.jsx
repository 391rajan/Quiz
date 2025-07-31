// File: components/PartnersSection.jsx
import React from 'react';

const PartnersSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <p className="text-sm text-gray-500 mb-6">Trusted by leading educational and corporate institutions worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold">
            Logo
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold">
            Logo
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold">
            Logo
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold">
            Logo
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
