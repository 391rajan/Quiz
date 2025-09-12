const express = require('express');
const { googleLogin, registerUser, authUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/google', googleLogin);

module.exports = router;