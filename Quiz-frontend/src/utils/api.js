// API utility functions
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Quiz API functions
export const quizAPI = {
  // Get all quizzes for filtering (from analytics endpoint)
  getAllQuizzes: (endpoint = '/quizzes') => apiCall(endpoint),
  
  // Get quiz by ID
  getQuizById: (id) => apiCall(`/quizzes/${id}`),
  
  // Submit quiz
  submitQuiz: (data) => apiCall('/quizzes/submit', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Generate new quiz
  generateQuiz: (data) => apiCall('/quizzes/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Analytics API functions
export const analyticsAPI = {
  // Get all quizzes with filters (public endpoint)
  getAllQuizzes: (queryParams = '') => {
    const endpoint = queryParams ? `/analytics/quizzes?${queryParams}` : '/analytics/quizzes';
    return apiCall(endpoint);
  },
  
  // Get quiz results
  getQuizResults: (attemptId) => apiCall(`/analytics/results/${attemptId}`),
  
  // Get user analytics
  getUserAnalytics: () => apiCall('/analytics/me'),
};

// Auth API functions
export const authAPI = {
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  getProfile: () => apiCall('/auth/profile'),
};
