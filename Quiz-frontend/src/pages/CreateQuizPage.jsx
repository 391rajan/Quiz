// File: pages/CreateQuizPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

// Component for a single Multiple Choice Question form
const MultipleChoiceQuestionForm = ({ question, index, onQuestionChange }) => {
  const handleTextChange = (e) => {
    onQuestionChange(index, { ...question, text: e.target.value });
  };

  const handleOptionChange = (e, optionIndex) => {
    const newOptions = [...question.options];
    newOptions[optionIndex] = e.target.value;
    onQuestionChange(index, { ...question, options: newOptions });
  };

  const handleCorrectAnswerChange = (e) => {
    onQuestionChange(index, { ...question, correctAnswer: e.target.value });
  };

  return (
    <div className="p-4 mb-4 border border-gray-300 rounded-lg bg-white">
      <h4 className="font-semibold text-lg mb-2">{`Question ${index + 1}`}</h4>
      <input
        type="text"
        placeholder="Enter your question text"
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        value={question.text}
        onChange={handleTextChange}
        required
      />
      <div className="mt-4 space-y-2">
        <p className="text-sm font-medium text-gray-700">Options:</p>
        {[...Array(4)].map((_, optionIndex) => (
          <div key={optionIndex} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={question.options[optionIndex] || ''}
              onChange={(e) => handleOptionChange(e, optionIndex)}
              required
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Correct Answer:</label>
        <select
          value={question.correctAnswer || ''}
          onChange={handleCorrectAnswerChange}
          className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select Correct Option</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
    </div>
  );
};


const CreateQuizPage = () => {
  const [quizDetails, setQuizDetails] = useState({
    title: '',
    category: '',
    description: '',
    difficulty: 'medium',
    coverImage: null,
  });

  const [questions, setQuestions] = useState([]);
  const [currentQuestionType, setCurrentQuestionType] = useState('mcq');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQuizDetails(prev => ({ ...prev, coverImage: file }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setQuizDetails(prev => ({ ...prev, coverImage: file }));
    }
  };

  const handleAddQuestion = () => {
    const newQuestion = { type: currentQuestionType, text: '', options: ['', '', '', ''], correctAnswer: '' };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const handleQuestionChange = (index, newQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = newQuestion;
    setQuestions(newQuestions);
  };
  
  const handleSaveQuiz = (e) => {
      e.preventDefault();
      // TODO: Implement logic to save the quiz to the backend
      console.log('Saving quiz:', quizDetails);
      console.log('Questions:', questions);
  };

  return (
    <div className="font-inter antialiased text-gray-800 bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-20">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Create Your Own Quiz</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-center">
          Design engaging quizzes with multiple question types and customized options.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSaveQuiz}>
          {/* Quiz Details Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Quiz Details</h3>
            <p className="text-sm text-gray-500 mb-6">Define the core information and settings for your quiz.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Quiz Title */}
              <div>
                <label htmlFor="quizTitle" className="block text-sm font-medium text-gray-700">Quiz Title</label>
                <input
                  type="text"
                  id="quizTitle"
                  name="title"
                  value={quizDetails.title}
                  onChange={handleInputChange}
                  placeholder="e.g., 'Quiz on MERN Stack'"
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  id="category"
                  name="category"
                  value={quizDetails.category}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="technology">Technology</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  {/* Add more categories here */}
                </select>
              </div>
              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={quizDetails.description}
                  onChange={handleInputChange}
                  placeholder="Provide a brief overview of what this quiz covers..."
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 h-24"
                  required
                ></textarea>
              </div>
              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={quizDetails.difficulty}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              {/* Cover Image */}
              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image (Optional)</label>
                <div
                  className="mt-1 flex justify-center items-center h-24 border-2 border-gray-300 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input 
                    type="file" 
                    id="coverImage"
                    name="coverImage"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <p className="text-sm text-gray-500">
                    {quizDetails.coverImage ? quizDetails.coverImage.name : 'Click to upload an image or drag & drop'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Questions Section */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Questions ({questions.length})</h3>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setCurrentQuestionType('mcq')}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    currentQuestionType === 'mcq'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="mr-2">🔘</span> Multiple Choice
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentQuestionType('true_false')}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    currentQuestionType === 'true_false'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="mr-2">✅</span> True/False
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentQuestionType('fill_in_the_blank')}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    currentQuestionType === 'fill_in_the_blank'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <span className="mr-2">📝</span> Fill-in-the-Blank
                </button>
              </div>
            </div>

            {/* Question list or placeholder */}
            <div className="mt-4 p-8 bg-gray-100 rounded-lg border border-gray-200">
              {questions.length === 0 ? (
                <p className="text-center text-gray-500 italic">
                  Start by adding your first question above!
                </p>
              ) : (
                <div>
                  {questions.map((q, index) => {
                    switch (q.type) {
                      case 'mcq':
                        return (
                          <MultipleChoiceQuestionForm 
                            key={index}
                            question={q}
                            index={index}
                            onQuestionChange={handleQuestionChange}
                          />
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={handleAddQuestion}
                className="flex items-center text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Add Question
              </button>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Preview Quiz
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
            >
              Save Quiz
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default CreateQuizPage;