import React, { useState } from 'react';
import { authAPI } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await authAPI.forgotPassword(email);
      setSuccess('An email has been sent with instructions to reset your password.');
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-20">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl font-bold mb-2 text-center text-gray-900">Forgot Password</h2>
          <p className="text-lg text-gray-600 text-center mb-10">
            Enter your email to receive a password reset link.
          </p>
          {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center mb-4">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm text-center mb-4">{success}</div>}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <section className="bg-white p-8 rounded-xl shadow-lg">
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    required
                  />
                </div>
              </div>
            </section>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="w-full max-w-xs px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded-full hover:bg-purple-700 transition-transform transform hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
