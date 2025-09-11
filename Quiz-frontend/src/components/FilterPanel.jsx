import React, { useState, useEffect } from 'react';

// This is a placeholder. Replace with your actual API utility.
const analyticsAPI = { getAllQuizzes: () => new Promise(res => setTimeout(() => res([
    { topic: 'JavaScript' }, { topic: 'React' }, { topic: 'CSS' },
    { topic: 'Biology' }, { topic: 'World War II' }, { topic: 'Renaissance Art' }
]), 1000)) };

// This is a placeholder. Replace with your actual category utilities.
const getAllCategories = () => ['Technology & Gadgets', 'Science & Biology', 'History & Events', 'Arts & Literature'];
const getTopicsForCategory = (category) => {
    const map = {
        'Technology & Gadgets': ['JavaScript', 'React', 'CSS'],
        'Science & Biology': ['Biology'],
        'History & Events': ['World War II'],
        'Arts & Literature': ['Renaissance Art'],
    };
    return map[category] || [];
};
// --- End Placeholders ---


const CustomCheckbox = ({ label, id, ...props }) => (
    <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer group">
        <input type="checkbox" id={id} className="peer sr-only" {...props} />
        <span className="w-5 h-5 border-2 rounded-md border-gray-300 group-hover:border-indigo-500 peer-focus:ring-2 peer-focus:ring-indigo-300 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center transition-all duration-200">
            <svg className="w-3 h-3 text-white transform scale-0 peer-checked:scale-100 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </span>
        <span className="text-gray-700 group-hover:text-indigo-600 transition-colors peer-checked:font-medium">{label}</span>
    </label>
);

const FilterPanel = ({ onApplyFilters }) => {
    const [filters, setFilters] = useState({
        categories: [],
        difficulties: [],
    });
    const [availableCategories, setAvailableCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                setLoading(true);
                // In a real app, you might have a dedicated endpoint for categories.
                // Here, we derive it from existing quizzes.
                const quizzes = await analyticsAPI.getAllQuizzes();
                const activeTopics = [...new Set(quizzes.map(quiz => quiz.topic))];
                const activeCategories = getAllCategories().filter(category => {
                    const categoryTopics = getTopicsForCategory(category);
                    return categoryTopics.some(topic => activeTopics.includes(topic));
                });
                setAvailableCategories(activeCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Fallback to all categories on error
                setAvailableCategories(getAllCategories());
            } finally {
                setLoading(false);
            }
        };
        fetchQuizData();
    }, []);

    const handleCheckboxChange = (e, filterType) => {
        const { value, checked } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: checked
                ? [...prevFilters[filterType], value]
                : prevFilters[filterType].filter(item => item !== value),
        }));
    };

    const handleApplyFilters = () => {
        onApplyFilters(filters);
    };

    const handleClearAll = () => {
        const clearedFilters = { categories: [], difficulties: [] };
        setFilters(clearedFilters);
        onApplyFilters(clearedFilters);
    };

    if (loading) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-md animate-pulse">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-4 mb-8">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                </div>
                <div className="mt-8 h-12 bg-gray-200 rounded-lg w-full"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button
                    onClick={handleClearAll}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    Clear All
                </button>
            </div>
            <div className="space-y-6">
                <div>
                    <p className="font-semibold mb-3 text-gray-800">Category</p>
                    <div className="space-y-3">
                        {availableCategories.map((category) => (
                            <CustomCheckbox
                                key={category}
                                id={`cat-${category}`}
                                label={category}
                                value={category}
                                onChange={(e) => handleCheckboxChange(e, 'categories')}
                                checked={filters.categories.includes(category)}
                            />
                        ))}
                    </div>
                </div>
                <hr className="border-gray-200" />
                <div>
                    <p className="font-semibold mb-3 text-gray-800">Difficulty</p>
                    <div className="space-y-3">
                        <CustomCheckbox id="diff-easy" label="Easy" value="Easy" onChange={(e) => handleCheckboxChange(e, 'difficulties')} checked={filters.difficulties.includes('Easy')} />
                        <CustomCheckbox id="diff-medium" label="Medium" value="Medium" onChange={(e) => handleCheckboxChange(e, 'difficulties')} checked={filters.difficulties.includes('Medium')} />
                        <CustomCheckbox id="diff-hard" label="Hard" value="Hard" onChange={(e) => handleCheckboxChange(e, 'difficulties')} checked={filters.difficulties.includes('Hard')} />
                    </div>
                </div>
            </div>
            <button
                onClick={handleApplyFilters}
                className="mt-8 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterPanel;
