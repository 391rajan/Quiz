// File: components/TestimonialsSection.jsx
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "QuizMaster has transformed my study habits. I can easily generate quizzes on tough topics and see my progress over time. Highly recommended!",
      name: "Jane Doe",
      title: "Student",
      avatar: "https://placehold.co/40x40/E8E8E8/4A4A4A?text=JD"
    },
    {
      quote: "The instant feedback and personalized analytics help me identify my weak spots faster than any other tool. It's an essential part of my learning.",
      name: "John Smith",
      title: "Educator",
      avatar: "https://placehold.co/40x40/E8E8E8/4A4A4A?text=JS"
    },
    {
      quote: "As a professional, I use QuizMaster to stay sharp on industry trends. The customizable quizzes are a game-changer.",
      name: "Sam Wilson",
      title: "Software Engineer",
      avatar: "https://placehold.co/40x40/E8E8E8/4A4A4A?text=SW"
    },
  ];

  return (
    <section className="bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-900">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg">
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
