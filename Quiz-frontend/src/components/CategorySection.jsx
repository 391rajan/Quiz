// File: components/CategorySection.jsx
import React, { useState, useEffect } from 'react';
import { analyticsAPI } from '../utils/api';
import { getAllCategories, getTopicsForCategory } from '../utils/categories';
import { getCategoryBackground } from '../utils/quizImages';

const CategoryCard = ({ category, quizCount, onCategoryClick }) => {
  const backgroundImage = getCategoryBackground(category);
  
  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => onCategoryClick(category)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 text-white h-full flex flex-col justify-end">
        <div className="text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <span className="text-2xl">
              {category === 'Technology & Gadgets' ? '💻' :
               category === 'Science & Biology' ? '🔬' :
               category === 'History & Events' ? '📚' :
               category === 'Arts & Literature' ? '🎨' :
               category === 'Pop Culture & Trivia' ? '🎭' :
               category === 'General Knowledge' ? '🧠' : '❓'}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2 drop-shadow-lg">{category}</h3>
          <p className="text-sm text-gray-200 drop-shadow-lg">{quizCount} quizzes available</p>
        </div>
      </div>
    </div>
  );
};

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const quizzes = await analyticsAPI.getAllQuizzes();
        
        // Get categories with quiz counts
        const categoryData = getAllCategories().map(category => {
          const categoryTopics = getTopicsForCategory(category);
          const quizCount = quizzes.filter(quiz => 
            categoryTopics.includes(quiz.topic)
          ).length;
          
          return {
            name: category,
            quizCount
          };
        }).filter(category => category.quizCount > 0); // Only show categories with quizzes
        
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to static categories
        setCategories([
          { name: 'Programming & Technology', quizCount: 6 },
          { name: 'Science & Biology', quizCount: 2 },
          { name: 'History & Events', quizCount: 1 },
          { name: 'Arts & Literature', quizCount: 1 },
          { name: 'Pop Culture & Entertainment', quizCount: 1 },
          { name: 'General Knowledge', quizCount: 1 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    // You can implement navigation to a filtered quiz page here
    console.log(`Clicked on category: ${categoryName}`);
    // Example: navigate to quiz selection page with category filter
    // navigate(`/quizzes?category=${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Browse Quizzes by Category</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Browse Quizzes by Category</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryCard 
            key={index} 
            category={category.name}
            quizCount={category.quizCount}
            onCategoryClick={handleCategoryClick}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;