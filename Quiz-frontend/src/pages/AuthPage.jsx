// File: pages/AuthPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../AuthLayout';
import { useAuth } from '../context/AuthContext';

// A reusable input component for cleaner code
const InputField = ({ id, type, placeholder, value, onChange, label, icon }) => (
  <div>
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </span>
    </div>
  </div>
);

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for signup form
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email: loginEmail,
        password: loginPassword,
      });
      console.log('Login successful:', data);
      
      // Call login from context, passing the user object and token
      login({ username: data.username, token: data.token });
      navigate('/quizzes'); 
    } catch (err) {
      console.error('Login failed:', err.response.data.message);
      setError(err.response.data.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      });
      console.log('Signup successful:', data);
      
      // Call login from context, passing the user object and token
      login({ username: data.username, token: data.token });
      navigate('/quizzes'); 
    } catch (err) {
      console.error('Signup failed:', err.response.data.message);
      setError(err.response.data.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Login/Signup View Toggler */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsLoginView(true)}
          className={`flex-1 py-3 px-4 font-semibold rounded-l-lg transition-colors ${
            isLoginView
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLoginView(false)}
          className={`flex-1 py-3 px-4 font-semibold rounded-r-lg transition-colors ${
            !isLoginView
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Sign Up
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800">Welcome to QuizMaster</h2>
      <p className="text-center text-gray-600 text-sm mt-1">
        {isLoginView
          ? 'Sign in to start your quiz journey.'
          : 'Create an account to start your quiz journey.'}
      </p>

      {/* Social Sign-in Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button className="flex items-center justify-center w-1/3 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <span className="text-lg">⚛️</span> GitHub
        </button>
        <button className="flex items-center justify-center w-1/3 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <span className="text-lg">▶️</span> Youtube
        </button>
        <button className="flex items-center justify-center w-1/3 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
          <span className="text-lg">📘</span> Facebook
        </button>
      </div>

      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-400">Or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Conditional Form Rendering */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center mb-4">
          {error}
        </div>
      )}

      {isLoginView ? (
        // Login Form
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            id="login-email"
            type="email"
            label="Email"
            placeholder="name@example.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            icon={<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" /><path d="M12 14v-2M12 10V8M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /><path d="M18 10h-2M6 10H4M10 18v-2M10 6V4M14 18v-2M14 6V4" /></svg>}
          />
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="login-password" className="sr-only">
                Password
              </label>
              <Link to="#" className="text-sm text-indigo-600 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                id="login-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                className="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path d="M21 12c-2.4 4-5.6 6-9 6s-6.6-2-9-6c2.4-4 5.6-6 9-6s6.6 2 9 6z" /></svg>
              </span>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path d="M21 12c-2.4 4-5.6 6-9 6s-6.6-2-9-6c2.4-4 5.6-6 9-6s6.6 2 9 6z" /></svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      ) : (
        // Signup Form
        <form onSubmit={handleSignup} className="space-y-4">
          <InputField
            id="signup-username"
            type="text"
            label="Username"
            placeholder="Username"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
            icon={<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 11c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>}
          />
          <InputField
            id="signup-email"
            type="email"
            label="Email"
            placeholder="name@example.com"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            icon={<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 12a4 4 0 11-8 0 4 4 0 018 0z" /><path d="M12 14v-2M12 10V8M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z" /><path d="M18 10h-2M6 10H4M10 18v-2M10 6V4M14 18v-2M14 6V4" /></svg>}
          />
          <InputField
            id="signup-password"
            type="password"
            label="Password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            icon={<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path d="M21 12c-2.4 4-5.6 6-9 6s-6.6-2-9-6c2.4-4 5.6-6 9-6s6.6 2 9 6z" /></svg>}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create an account'}
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default AuthPage;