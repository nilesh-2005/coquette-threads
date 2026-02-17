const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { authUser, registerUser } = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.post('/login', asyncHandler(authUser));
router.post('/register', asyncHandler(registerUser)); // Public registration for customers

module.exports = router;
