// File: pages/QuizSelectionPage.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedQuizzesSection from '../components/FeaturedQuizzesSection';
import FilterPanel from '../components/FilterPanel';
import QuizGridSection from '../components/QuizGridSection';
import CategorySection from '../components/CategorySection';

const QuizSelectionPage = () => {
  // Mock data would be fetched from the backend here
  const mockQuizzes = [
    { id: 1, title: "Introduction to Cellular Biology", time: "15 min", questions: "10" },
    { id: 2, title: "World War II: Key Events & Figures", time: "20 min", questions: "15" },
    { id: 3, title: "Classical Literature: A Deep Dive", time: "30 min", questions: "20" },
    { id: 4, title: "Pro-Culture & Technology", time: "10 min", questions: "8" },
    { id: 5, title: "The Human Heart: Anatomy & Function", time: "25 min", questions: "18" },
    { id: 6, title: "Web Development: HTML & CSS", time: "15 min", questions: "12" },
    { id: 7, title: "Sports Legends: Basketball", time: "10 min", questions: "10" },
    { id: 8, title: "Music Theory: Fundamentals", time: "15 min", questions: "10" },
    { id: 9, title: "General Trivia: Animals", time: "10 min", questions: "10" },
  ];
  
  const mockCategories = [
    "Science & Biology", "History & Events", "Arts & Literature", "Pop Culture & Trivia",
    "Health & Wellness", "Technology & Gadgets", "Sports & Games", "Music & Cinema",
    "General Knowledge",
  ];

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-8 md:py-20">
        <FeaturedQuizzesSection />
        <hr className="my-12 border-gray-200" />
        <div className="grid lg:grid-cols-4 gap-8">
          <FilterPanel />
          <QuizGridSection quizzes={mockQuizzes} />
        </div>
        <hr className="my-12 border-gray-200" />
        <CategorySection categories={mockCategories} />
      </main>
      <Footer />
    </div>
  );
};

export default QuizSelectionPage;