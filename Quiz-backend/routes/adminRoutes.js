const express = require('express');
const router = express.Router();
const { getAllUsers, getAllQuizzes, promoteUserToAdmin, deleteQuiz } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/users', protect, admin, getAllUsers);
router.get('/quizzes', protect, admin, getAllQuizzes);
router.put('/users/:id/promote', protect, admin, promoteUserToAdmin);
router.delete('/quizzes/:id', protect, admin, deleteQuiz);

module.exports = router;
