// File: App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './LandingPage';
import AuthPage from './pages/AuthPage';
import QuizSelectionPage from './pages/QuizSelectionPage';
import CreateQuizPage from './pages/CreateQuizPage';
import DashboardPage from './pages/DashboardPage'; // Import the new page

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/quizzes" element={<QuizSelectionPage />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* New route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
