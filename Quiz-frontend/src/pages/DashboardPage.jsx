// File: pages/DashboardPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  
  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          {user ? `Welcome to your Dashboard, ${user.username}!` : 'Welcome to your Dashboard'}
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          This is where you'll see your quiz history, track your progress, and identify weak topics.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
