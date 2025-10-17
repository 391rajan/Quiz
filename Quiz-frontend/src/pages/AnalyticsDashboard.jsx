import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyticsAPI } from '../utils/api';

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <span className="text-blue-500">{icon}</span>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const ActivityItem = ({ activity }) => (
  <div className="border-b border-gray-200 py-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{activity.type}</p>
        <p className="text-sm text-gray-500">
          {new Date(activity.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>
);

const ProgressQuizCard = ({ quiz }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <h4 className="font-medium text-gray-900">{quiz.quizId.topic}</h4>
    <p className="text-sm text-gray-500">
      Difficulty: {quiz.quizId.difficulty}
    </p>
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{
            width: `${(quiz.currentQuestionIndex / quiz.totalQuestions) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  </div>
);

const SubscriptionCard = ({ subscription }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Subscription Status</h3>
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        Plan: <span className="font-medium capitalize">{subscription.plan}</span>
      </p>
      <p className="text-sm text-gray-600">
        Status: <span className="font-medium capitalize">{subscription.status}</span>
      </p>
      {subscription.expiryDate && (
        <p className="text-sm text-gray-600">
          Expires: {new Date(subscription.expiryDate).toLocaleDateString()}
        </p>
      )}
    </div>
  </div>
);

const AnalyticsDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await analyticsAPI.getDashboardData();
        setDashboardData(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!dashboardData) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Attempts"
          value={dashboardData.stats.totalAttempts}
          icon="📝"
        />
        <StatCard
          title="Average Score"
          value={`${dashboardData.stats.averageScore}%`}
          icon="🎯"
        />
        <StatCard
          title="Completed Quizzes"
          value={dashboardData.stats.completedQuizzes}
          icon="✅"
        />
        <StatCard
          title="In Progress"
          value={dashboardData.stats.inProgressQuizzes}
          icon="⏳"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-2">
              {dashboardData.recentActivity.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>
          </div>
        </div>

        {/* Subscription Info */}
        <div>
          <SubscriptionCard subscription={dashboardData.subscription} />
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">In Progress Quizzes</h2>
            <div className="space-y-4">
              {dashboardData.inProgressQuizzes.map((quiz, index) => (
                <ProgressQuizCard key={index} quiz={quiz} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;