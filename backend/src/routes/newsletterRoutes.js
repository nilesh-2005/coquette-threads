const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if email already exists
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        const newSubscriber = await Newsletter.create({ email });

        res.status(201).json({
            message: 'Successfully subscribed to newsletter',
            data: newSubscriber
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
