// File: App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AuthPage from './pages/AuthPage';
import QuizSelectionPage from './pages/QuizSelectionPage'; 
import CreateQuizPage from './pages/CreateQuizPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        {/* New route for quiz selection page */}
        <Route path="/quizzes" element={<QuizSelectionPage />} /> 
        <Route path="/create-quiz" element={<CreateQuizPage />} />
      </Routes>
    </Router>
  );
};

export default App;
