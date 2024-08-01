// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
    // Retrieve the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: req.t('unauthorized_no_token') });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decoded.userId); // Adjust based on your token payload
        if (!user) {
            return res.status(401).json({ message: req.t('unauthorized_user_not_found') });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (err) {
        // Check if the error is related to token verification
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: req.t('unauthorized_invalid_token') });
        }

        // Handle other possible errors
        res.status(500).json({ message: req.t('server_error') });
    }
};
