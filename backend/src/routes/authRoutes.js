const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/login', authUser);
router.post('/register', registerUser); // Public registration for customers

module.exports = router;
