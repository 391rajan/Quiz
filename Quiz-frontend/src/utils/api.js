// API utility functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Custom Error for API calls
export class APIError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
  }
}

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
      let errorData;
      let errorMessage;
      const responseClone = response.clone();
      try {
        // Try to parse the error response body as JSON
        errorData = await response.json();
        errorMessage = errorData.message;
      // eslint-disable-next-line no-unused-vars
      } catch (_e) { 
        // If parsing fails, use the raw response text
        errorMessage = await responseClone.text();
      }
      
      // Throw a custom error with more context
      throw new APIError(
        errorMessage || 'An API error occurred',
        response.status,
        errorData ? errorData.details : undefined
      );
    }
    
    // For successful but empty responses (e.g., 204 No Content)
    if (response.status === 204) {
        return null;
    }

    return await response.json();

  } catch (error) {
    // Re-throw custom API errors, wrap others
    if (error instanceof APIError) {
      throw error;
    }
    
    console.error('API call failed:', error);
    throw new APIError(error.message || 'A network error occurred.', 0, error);
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

  // Get all data for the main analytics dashboard
  getDashboardData: () => apiCall('/analytics/dashboard'),
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
  googleLogin: (tokenData) => apiCall('/auth/google', {
    method: 'POST',
    body: JSON.stringify(tokenData),
  }),
  updateProfile: (userData) => apiCall('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  forgotPassword: (email) => apiCall('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),
  resetPassword: (data) => apiCall('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Admin API functions
export const adminAPI = {
  getAllUsers: () => apiCall('/admin/users'),
  getAllQuizzes: () => apiCall('/admin/quizzes'),
  promoteToAdmin: (userId) => apiCall(`/admin/users/${userId}/promote`, {
    method: 'PUT',
  }),
  deleteQuiz: (quizId) => apiCall(`/admin/quizzes/${quizId}`, {
    method: 'DELETE',
  }),
};

// Payment API functions
export const paymentAPI = {
  dummyPayment: (planData) => apiCall('/payments/dummy-payment', {
    method: 'POST',
    body: JSON.stringify(planData),
  }),
  getSubscriptionStatus: () => apiCall('/payments/subscription-status'),
};