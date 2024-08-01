const express = require('express');
const { borrowBook, returnBook } = require('../controllers/borrowController');
const { authenticate } = require('../middleware/auth');
const { validateRole } = require('../middleware/role');

const router = express.Router();

router.post('/borrow', authenticate, validateRole(['Borrower']), borrowBook);
router.put('/return/:id', authenticate, validateRole(['Borrower']), returnBook);

module.exports = router;
