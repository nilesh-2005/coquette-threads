const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('Backend Auth: Received token', token ? 'Yes' : 'No');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Backend Auth: Token verified for ID:', decoded.id);

            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                console.log('Backend Auth: User NOT found in DB');
            } else {
                console.log('Backend Auth: User found:', req.user.email, 'isAdmin:', req.user.isAdmin);
            }
            return next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.isAdmin)) {
        return next();
    } else {
        console.log('Backend Auth: Admin check FAILED for user:', req.user ? req.user.email : 'None');
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

const restoreUser = async (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
            // Silently ignore token errors for public routes
        }
    }
    next();
};

module.exports = { protect, admin, restoreUser };
