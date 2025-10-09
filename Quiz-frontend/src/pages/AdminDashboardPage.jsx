import React, { useState, useEffect } from 'react';
import { adminAPI } from '../utils/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, quizzesData] = await Promise.all([
          adminAPI.getAllUsers(),
          adminAPI.getAllQuizzes(),
        ]);
        setUsers(usersData);
        setQuizzes(quizzesData);
      } catch (err) {
        setError(err.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePromote = async (userId) => {
    try {
      await adminAPI.promoteToAdmin(userId);
      setUsers(users.map(user => user._id === userId ? { ...user, isAdmin: true } : user));
    } catch (err) {
      setError(err.message || 'Failed to promote user.');
    }
  };

  const handleEditQuiz = async (quizId) => {
    try {
      // Navigate to edit quiz page
      window.location.href = `/create-quiz?edit=${quizId}`;
    } catch (err) {
      setError(err.message || 'Failed to edit quiz.');
    }
  };

  const [deleteSuccess, setDeleteSuccess] = useState(null);

  const handleDeleteQuiz = async (quizId) => {
    const quiz = quizzes.find(q => q._id === quizId);
    if (window.confirm(`Are you sure you want to delete the quiz "${quiz.topic}"? This action cannot be undone.`)) {
      try {
        setLoading(true);
        await adminAPI.deleteQuiz(quizId);
        setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
        setDeleteSuccess(`Quiz "${quiz.topic}" was successfully deleted.`);
        // Clear success message after 3 seconds
        setTimeout(() => {
          setDeleteSuccess(null);
        }, 3000);
      } catch (err) {
        setError(err.message || 'Failed to delete quiz.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-20">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-900">Admin Dashboard</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {deleteSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{deleteSuccess}</span>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Users</h3>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.isAdmin ? 'Admin' : 'User'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {!user.isAdmin && (
                          <button
                            onClick={() => handlePromote(user._id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Promote to Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Quizzes</h3>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Topic
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Questions
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quizzes.map((quiz) => (
                    <tr key={quiz._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quiz.topic}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{quiz.difficulty}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.questions ? quiz.questions.length : 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditQuiz(quiz._id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteQuiz(quiz._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
