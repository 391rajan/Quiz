// File: App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './LandingPage';
import AuthPage from './pages/AuthPage';
import QuizSelectionPage from './pages/QuizSelectionPage';
import CreateQuizPage from './pages/CreateQuizPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage'; // Import the new page
import PlanPage from './pages/PlanPage'; // Import the plan page
import ProfilePage from './pages/ProfilePage'; // Import the profile page
import AdminDashboardPage from './pages/AdminDashboardPage'; // Import the admin dashboard page
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // Import the forgot password page
import ResetPasswordPage from './pages/ResetPasswordPage'; // Import the reset password page
import AnalyticsDashboard from './pages/AnalyticsDashboard'; // Import the analytics dashboard

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/quizzes" element={<QuizSelectionPage />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/quiz/:id" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/results/:attemptId" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
          <Route path="/plans" element={<ProtectedRoute><PlanPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
