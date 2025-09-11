import React from 'react';
import { Link } from 'react-router-dom';

// This will now use the functions from your project's utils folder
import { getQuizImage, getQuizDuration } from '../utils/quizImages';

const ClockIcon = () => (
    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const DocumentTextIcon = () => (
     <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const QuizCard = ({ quiz }) => {
    // Using props from your provided file
    const { _id, topic, questions, difficulty } = quiz;

    const quizImage = getQuizImage(topic);
    const duration = getQuizDuration(difficulty, questions.length);

    const difficultyStyles = {
        easy: 'bg-emerald-100 text-emerald-800',
        medium: 'bg-amber-100 text-amber-800',
        hard: 'bg-red-100 text-red-800',
    };
    
    const difficultyDisplay = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    return (
        <Link 
            to={`/quiz/${_id}`} 
            className="group block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
        >
            <div className="flex flex-col h-full">
                {/* Image Container */}
                <div className="relative">
                    <img src={quizImage} alt={topic} className="w-full h-40 object-cover" />
                    <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyStyles[difficulty.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
                        {difficultyDisplay}
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-grow flex flex-col">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 truncate">{topic}</h4>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">
                        Test your knowledge on {topic}. A great way to challenge yourself and learn something new!
                    </p>
                    
                    {/* Info Bar */}
                    <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-4">
                        <span className="flex items-center">
                            <DocumentTextIcon />
                            {questions.length} Questions
                        </span>
                        <span className="flex items-center">
                            <ClockIcon />
                            {duration}
                        </span>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="bg-gray-50 group-hover:bg-indigo-50 p-4 text-center font-bold text-indigo-600 transition-colors duration-300">
                    Start Quiz
                </div>
            </div>
        </Link>
    );
};

export default QuizCard;
