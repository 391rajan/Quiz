import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { authAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Google login success:', credentialResponse);

    // The credentialResponse object contains the JWT ID token.
    const idToken = credentialResponse.credential;

    try {
      // Send the token to your backend for verification and user creation/login
      const data = await authAPI.googleLogin({ token: idToken });

      // Assuming your backend returns a JWT for your app and user info
      // You would typically save the token and user data in your app's state/context
      // and local storage.
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Navigate to the dashboard or home page after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Backend login failed:', error);
      // Handle login failure (e.g., show an error message to the user)
    }
  };

  const handleGoogleError = () => {
    console.log('Google Login Failed');
    // Handle login failure (e.g., show an error message to the user)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login to Quiz App</h1>
        <p className="mb-6 text-gray-600">Sign in to create and take quizzes!</p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
        />
      </div>
    </div>
  );
};

export default Login;