// routes/bookRoutes.js
const express = require('express');
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/bookController');
const { authenticate } = require('../middleware/auth');
const { validateRole } = require('../middleware/role');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', authenticate, getAllBooks);
router.get('/:id', authenticate, getBookById);
router.post('/', authenticate, validateRole(['Author']), upload.single('coverImage'), createBook);
router.put('/:id', authenticate, validateRole(['Author']), upload.single('coverImage'), updateBook);
router.delete('/:id', authenticate, validateRole(['Author']), deleteBook);

module.exports = router;
