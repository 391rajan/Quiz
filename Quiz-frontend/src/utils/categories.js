// Utility to categorize quiz topics based on seeder.js data
export const quizCategories = {
  'Technology & Gadgets': [
    'JavaScript Basics',
    'React State Management',
    'HTML & CSS Fundamentals',
    'MongoDB Queries',
    'Machine Learning Basics',
    'Software Development Life Cycle (SDLC)',
    'Advanced JavaScript Concepts',
    'System Design & Architecture',
    'Data Structures & Algorithms'
  ],
  'Science & Biology': [
    'General Science',
    'Quantum Physics for Beginners'
  ],
  'History & Events': [
    'World History: Ancient Civilizations'
  ],
  'Arts & Literature': [
    'Arts & Literature'
  ],
  'Pop Culture & Trivia': [
    'Pop Culture Trivia'
  ],
  'General Knowledge': [
    'General Knowledge Trivia'
  ]
};

// Function to get category for a given topic
export const getCategoryForTopic = (topic) => {
  for (const [category, topics] of Object.entries(quizCategories)) {
    if (topics.includes(topic)) {
      return category;
    }
  }
  return 'Other'; // Fallback for any topics not explicitly categorized
};

// Function to get all unique categories
export const getAllCategories = () => Object.keys(quizCategories);

// Function to get topics for a specific category
export const getTopicsForCategory = (category) => {
  return quizCategories[category] || [];
};
