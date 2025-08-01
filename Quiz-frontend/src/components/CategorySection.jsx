// File: components/CategorySection.jsx
import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center text-center hover:bg-gray-100 transition-colors cursor-pointer">
      <p className="text-lg font-medium">{category}</p>
    </div>
  );
};

const CategorySection = ({ categories }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Browse Quizzes by Category</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;