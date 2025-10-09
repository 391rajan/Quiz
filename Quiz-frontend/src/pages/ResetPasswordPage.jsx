import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await authAPI.resetPassword({ token, password });
      setSuccess('Password has been reset successfully. You can now log in with your new password.');
      setTimeout(() => navigate('/auth'), 3000);
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-20">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl font-bold mb-2 text-center text-gray-900">Reset Password</h2>
          <p className="text-lg text-gray-600 text-center mb-10">
            Enter your new password.
          </p>
          {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center mb-4">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm text-center mb-4">{success}</div>}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <section className="bg-white p-8 rounded-xl shadow-lg">
              <div className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
