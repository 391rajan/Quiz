import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { analyticsAPI } from '../utils/api';
import { getCategoryForTopic } from '../utils/categories';
import { getQuizImage, getQuizDuration } from '../utils/quizImages';

const FeaturedQuizCard = ({ quiz, buttonText, isActive }) => {
    const category = getCategoryForTopic(quiz.topic);
    const quizImage = getQuizImage(quiz.topic);
    const duration = getQuizDuration(quiz.difficulty, quiz.questions.length);
    const difficultyDisplay = quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1);
    
    const difficultyColors = {
        Easy: 'bg-emerald-100 text-emerald-800',
        Medium: 'bg-amber-100 text-amber-800',
        Hard: 'bg-red-100 text-red-800',
    };

    return (
        <div className={`transition-all duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex group">
                <div className="md:w-1/2">
                    <img
                        src={quizImage}
                        alt={quiz.topic}
                        className="h-64 w-full object-cover md:h-full transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4">
                        <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">{category}</span>
                        <span className="text-gray-400">&bull;</span>
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${difficultyColors[difficultyDisplay]}`}>{difficultyDisplay}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">{quiz.topic}</h3>
                    <p className="text-gray-600 mb-8">
                        {quiz.questions.length} questions &bull; {duration} &bull; Test your knowledge in {category.toLowerCase()}.
                    </p>
                    <Link
                        to={`/quiz/${quiz._id}`}
                        className="self-start bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
};


const FeaturedQuizzesSection = () => {
    const [featuredQuizzes, setFeaturedQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

    useEffect(() => {
        const fetchFeaturedQuizzes = async () => {
            try {
                setLoading(true);
                const quizzes = await analyticsAPI.getAllQuizzes();
                // Logic from your file to select and sort featured quizzes
                const featured = quizzes
                    .sort((a, b) => {
                        if (a.difficulty === 'medium' && b.difficulty !== 'medium') return -1;
                        if (b.difficulty === 'medium' && a.difficulty !== 'medium') return 1;
                        return 0;
                    })
                    .slice(0, 6);
                setFeaturedQuizzes(featured);
            } catch (error) {
                console.error('Error fetching featured quizzes:', error);
                setFeaturedQuizzes([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedQuizzes();
    }, []);

    useEffect(() => {
        if (featuredQuizzes.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentQuizIndex(prev => (prev + 1) % featuredQuizzes.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [featuredQuizzes.length]);

    if (loading) {
        return (
            <section>
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex animate-pulse">
                    <div className="md:w-1/2 h-64 md:h-full bg-gray-200"></div>
                    <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 mb-8"></div>
                        <div className="h-12 bg-gray-200 rounded-lg w-40"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (featuredQuizzes.length === 0) {
        return null; // Don't render if no quizzes are featured
    }

    return (
        <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Quizzes</h2>
            <div className="relative min-h-[400px]">
                {featuredQuizzes.map((quiz, index) => (
                    <FeaturedQuizCard
                        key={quiz._id}
                        quiz={quiz}
                        buttonText="Start Quiz"
                        isActive={index === currentQuizIndex}
                    />
                ))}
            </div>
            {featuredQuizzes.length > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {featuredQuizzes.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentQuizIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentQuizIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300 hover:bg-gray-400 w-2'
                            }`}
                            aria-label={`Go to quiz ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeaturedQuizzesSection;