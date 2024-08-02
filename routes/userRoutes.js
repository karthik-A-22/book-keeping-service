// routes/userRoutes.js
const express = require('express');
const { register, login, getAllUsers } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth')
const { validateRole } = require('../middleware/role')
const router = express.Router();

router.get('/', authenticate, validateRole(['Admin']), getAllUsers);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
