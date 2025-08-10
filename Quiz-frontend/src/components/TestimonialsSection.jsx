// File: components/TestimonialsSection.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "QuizMaster has transformed my study habits. I can easily generate quizzes on tough topics and see my progress over time. Highly recommended!",
      name: "Jane Doe",
      title: "Student",
      avatar: "https://placehold.co/40x40/E8E8E8/4A4A4A?text=JD",
      action: "Start Learning",
      link: "/quizzes"
    },
    {
      quote: "The instant feedback and personalized analytics help me identify my weak spots faster than any other tool. It's an essential part of my learning.",
      name: "John Smith",
      title: "Educator",
      avatar: "https://placehold.co/40x40/E8E8E8/4A4A4A?text=JS",
      action: "Create Quiz",
      link: "/create-quiz"
    },
    {
      quote: "As a professional, I use QuizMaster to stay sharp on industry trends. The customizable quizzes are a game-changer.",
      name: "Sam Wilson",
      title: "Software Engineer",
      avatar: "https://placehold.co/40x40/E8E8E8/4A4A4A?text=SW",
      action: "View Plans",
      link: "/plans"
    },
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-900">What Our Users Say</h2>
        
        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md transition-all hover:shadow-lg hover:scale-105">
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center mb-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <Link 
                to={testimonial.link}
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                {testimonial.action}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic mb-4">"{testimonials[activeTestimonial].quote}"</p>
            <div className="flex items-center mb-4">
              <img 
                src={testimonials[activeTestimonial].avatar} 
                alt={testimonials[activeTestimonial].name} 
                className="w-10 h-10 rounded-full mr-4" 
              />
              <div>
                <p className="font-semibold">{testimonials[activeTestimonial].name}</p>
                <p className="text-sm text-gray-500">{testimonials[activeTestimonial].title}</p>
              </div>
            </div>
            <Link 
              to={testimonials[activeTestimonial].link}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              {testimonials[activeTestimonial].action}
            </Link>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
