const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: req.t('register.userExists') });
        }

        user = new User({ name, email, password, role });
        await user.save();

        res.status(201).json({ message: req.t('register.success') });
    } catch (err) {
        res.status(500).json({ message: req.t('register.error') });
    }
};

// Login a user and generate JWT token
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: req.t('login.invalidCredentials') });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: req.t('login.invalidCredentials') });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: req.t('login.success'), token });
    } catch (err) {
        res.status(500).json({ message: req.t('login.error') });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password from the response
        res.json({ message: req.t('users_fetched_successfully'), data: users });
    } catch (err) {
        res.status(500).json({ message: req.t('error_fetching_users') });
    }
};