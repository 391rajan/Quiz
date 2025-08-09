// File: backend/controllers/analyticsController.js
const QuizAttempt = require('../models/QuizAttempt');
const Quiz = require('../models/Quiz');

// @desc    Get detailed quiz results for a specific attempt
// @route   GET /api/analytics/results/:attemptId
// @access  Private
const getQuizResults = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.attemptId)
      .populate({
        path: 'quizId',
        select: 'topic questions',
      });

    if (!attempt) {
      return res.status(404).json({ message: 'Quiz attempt not found' });
    }
    
    if (attempt.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this attempt' });
    }
    
    if (!attempt.quizId) {
      return res.status(404).json({ message: 'Associated quiz not found for this attempt.' });
    }

    const quiz = attempt.quizId;
    const results = {
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      topic: quiz.topic,
      questions: quiz.questions.map(q => {
        const userAnswer = attempt.answers.find(a => a.questionId.equals(q._id));
        return {
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation,
          userAnswer: userAnswer ? userAnswer.userAnswer : null,
          isCorrect: userAnswer ? userAnswer.isCorrect : false,
        };
      }),
      dateTaken: attempt.dateTaken,
    };
    
    res.json(results);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's overall performance and weak/strong topics
// @route   GET /api/analytics/me
// @access  Private
const getUserAnalytics = async (req, res) => {
  const userId = req.user._id;
  try {
    const attempts = await QuizAttempt.find({ userId }).populate('quizId', 'topic difficulty');

    if (attempts.length === 0) {
      return res.json({
        message: 'No quiz attempts yet. Start taking quizzes to see your performance!',
        analytics: {},
        weakTopics: [],
        strongTopics: [],
        quizHistory: [],
        overallScore: { totalScore: 0, totalQuestions: 0, percentage: 0 }
      });
    }

    const topicPerformance = {};
    let overallCorrect = 0;
    let overallTotal = 0;

    attempts.forEach(attempt => {
      if (attempt.quizId) {
        const topic = attempt.quizId.topic;
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = { totalScore: 0, totalQuestions: 0, attemptsCount: 0, incorrectCount: 0 };
        }
        topicPerformance[topic].totalScore += attempt.score;
        topicPerformance[topic].totalQuestions += attempt.totalQuestions;
        topicPerformance[topic].attemptsCount++;
        topicPerformance[topic].incorrectCount += (attempt.totalQuestions - attempt.score);

        overallCorrect += attempt.score;
        overallTotal += attempt.totalQuestions;
      }
    });

    const weakTopics = [];
    const strongTopics = [];
    const analyticsSummary = {};

    for (const topic in topicPerformance) {
      const avgScore = (topicPerformance[topic].totalScore / topicPerformance[topic].totalQuestions) * 100;
      analyticsSummary[topic] = {
        averageScore: parseFloat(avgScore.toFixed(2)),
        attempts: topicPerformance[topic].attemptsCount,
        incorrectAnswers: topicPerformance[topic].incorrectCount,
      };

      if (avgScore < 60) {
        weakTopics.push({
          topic,
          averageScore: avgScore.toFixed(2),
          reason: `You scored an average of ${avgScore.toFixed(2)}% on this topic, with ${topicPerformance[topic].incorrectCount} incorrect answers over ${topicPerformance[topic].attemptsCount} attempts. Focus on this area!`,
        });
      } else if (avgScore >= 80) {
        strongTopics.push({
          topic,
          averageScore: avgScore.toFixed(2),
          message: `Excellent! You scored an average of ${avgScore.toFixed(2)}% on this topic. Keep up the great work!`,
        });
      }
    }

    const overallPercentage = overallTotal > 0 ? (overallCorrect / overallTotal) * 100 : 0;

    res.json({
      analytics: analyticsSummary,
      weakTopics,
      strongTopics,
      quizHistory: attempts.filter(attempt => attempt.quizId).map(attempt => ({
        _id: attempt._id,
        quizId: attempt.quizId._id,
        topic: attempt.quizId.topic,
        score: attempt.score,
        totalQuestions: attempt.totalQuestions,
        dateTaken: attempt.dateTaken,
      })).sort((a, b) => new Date(b.dateTaken) - new Date(a.dateTaken)),
      overallScore: {
        totalScore: overallCorrect,
        totalQuestions: overallTotal,
        percentage: parseFloat(overallPercentage.toFixed(2))
      }
    });
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all available quizzes with optional filters
// @route   GET /api/analytics/quizzes
// @access  Public
const getAllQuizzes = async (req, res) => {
  const { difficulty, category } = req.query;
  const filter = {};

  if (difficulty) {
    // Corrected to use $in for multiple difficulties
    filter.difficulty = { $in: Array.isArray(difficulty) ? difficulty : [difficulty] };
  }
  if (category) {
    // Corrected to use $in for multiple categories
    filter.topic = { $in: Array.isArray(category) ? category : [category] };
  }

  try {
    const quizzes = await Quiz.find(filter).populate('createdBy', 'username');

    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found matching your criteria.' });
    }

    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching all quizzes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getQuizResults, getUserAnalytics, getAllQuizzes };