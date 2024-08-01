const express = require('express');
const {
    getLibraries,
    getLibraryById,
    createLibrary,
    updateLibrary,
    deleteLibrary,
    getLibraryInventory,
    addBookToInventory,
    removeBookFromInventory
} = require('../controllers/libraryController');
const { authenticate } = require('../middleware/auth');
const { validateRole } = require('../middleware/role');

const router = express.Router();

// Library routes
router.get('/', authenticate, getLibraries);
router.get('/:id', authenticate, getLibraryById);
router.post('/', authenticate, validateRole('Admin'), createLibrary);
router.put('/:id', authenticate, validateRole('Admin'), updateLibrary);
router.delete('/:id', authenticate, validateRole('Admin'), deleteLibrary);

// Library inventory routes
router.get('/:id/inventory', authenticate, getLibraryInventory);
router.post('/:id/inventory', authenticate, validateRole('Admin'), addBookToInventory);
router.delete('/:id/inventory/:bookId', authenticate, validateRole('Admin'), removeBookFromInventory);

module.exports = router;
