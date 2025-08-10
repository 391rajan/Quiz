// File: components/PartnersSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PartnersSection = () => {
  const partners = [
    {
      name: "Tech University",
      logo: "TU",
      description: "Leading institution in technology education",
      link: "/plans"
    },
    {
      name: "Global Learning",
      logo: "GL",
      description: "Worldwide educational platform",
      link: "/quizzes"
    },
    {
      name: "Innovation Corp",
      logo: "IC",
      description: "Corporate training solutions",
      link: "/create-quiz"
    },
    {
      name: "EduTech Solutions",
      logo: "ES",
      description: "Educational technology provider",
      link: "/plans"
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Trusted by Leading Institutions</h2>
        <p className="text-sm text-gray-500 mb-8">Educational and corporate institutions worldwide choose QuizMaster</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <Link 
              key={index} 
              to={partner.link}
              className="group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-gray-500 text-lg md:text-xl font-bold shadow-md transition-all group-hover:shadow-lg group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 mx-auto mb-3">
                {partner.logo}
              </div>
              <h3 className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                {partner.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 hidden md:block">
                {partner.description}
              </p>
            </Link>
          ))}
        </div>
        
        <div className="mt-8">
          <Link 
            to="/plans"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
