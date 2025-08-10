// Utility to map quiz topics to appropriate images
export const getQuizImage = (topic) => {
  const imageMap = {
    // Technology & Gadgets
    'JavaScript Basics': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop&crop=center',
    'React State Management': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&crop=center',
    'HTML & CSS Fundamentals': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center',
    'MongoDB Queries': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop&crop=center',
    'Machine Learning Basics': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center',
    'Software Development Life Cycle (SDLC)': 'https://images.unsplash.com/photo-1555066931-4365d308bab7?w=800&h=400&fit=crop&crop=center',
    'Advanced JavaScript Concepts': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop&crop=center',
    'System Design & Architecture': 'https://images.unsplash.com/photo-1555066931-4365d308bab7?w=800&h=400&fit=crop&crop=center',
    'Data Structures & Algorithms': 'https://images.unsplash.com/photo-1555066931-4365d308bab7?w=800&h=400&fit=crop&crop=center',
    
    // Science & Biology
    'General Science': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop&crop=center',
    'Quantum Physics for Beginners': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop&crop=center',
    
    // History & Events
    'World History: Ancient Civilizations': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=400&fit=crop&crop=center',
    
    // Arts & Literature
    'Arts & Literature': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop&crop=center',
    
    // Pop Culture & Entertainment
    'Pop Culture Trivia': 'https://images.unsplash.com/photo-1489599835367-ac875f64f8b2?w=800&h=400&fit=crop&crop=center',
    
    // General Knowledge
    'General Knowledge Trivia': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center',
  };

  return imageMap[topic] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center';
};

// Get category-specific background images
export const getCategoryBackground = (category) => {
  const categoryImages = {
    'Technology & Gadgets': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&crop=center',
    'Science & Biology': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop&crop=center',
    'History & Events': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=400&fit=crop&crop=center',
    'Arts & Literature': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop&crop=center',
    'Pop Culture & Trivia': 'https://images.unsplash.com/photo-1489599835367-ac875f64f8b2?w=800&h=400&fit=crop&crop=center',
    'General Knowledge': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center',
  };

  return categoryImages[category] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center';
};

// Calculate quiz duration based on difficulty and number of questions
export const getQuizDuration = (difficulty, questionCount) => {
  // Base time per question (in minutes) based on difficulty
  const timePerQuestion = {
    easy: 0.5,      // 30 seconds per question
    medium: 1,      // 1 minute per question
    hard: 1.5       // 1.5 minutes per question
  };
  
  // Calculate total duration
  const totalMinutes = Math.ceil(questionCount * timePerQuestion[difficulty] || 1);
  
  // Format duration
  if (totalMinutes < 1) {
    return '< 1 min';
  } else if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  } else {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }
};

// Calculate individual question time limit based on quiz difficulty
export const getQuestionTimeLimit = (difficulty) => {
  // Time limit in seconds for each question based on difficulty
  const timeLimits = {
    easy: 30,      // 30 seconds for easy questions
    medium: 60,    // 1 minute for medium questions
    hard: 90       // 1.5 minutes for hard questions
  };
  
  return timeLimits[difficulty] || 60; // Default to 60 seconds
};

// Format time remaining in MM:SS format
export const formatTimeRemaining = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};
