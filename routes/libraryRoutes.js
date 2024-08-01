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
router.get('/libraries', authenticate, getLibraries);
router.get('/libraries/:id', authenticate, getLibraryById);
router.post('/libraries', authenticate, validateRole('Admin'), createLibrary);
router.put('/libraries/:id', authenticate, validateRole('Admin'), updateLibrary);
router.delete('/libraries/:id', authenticate, validateRole('Admin'), deleteLibrary);

// Library inventory routes
router.get('/libraries/:id/inventory', authenticate, getLibraryInventory);
router.post('/libraries/:id/inventory', authenticate, validateRole('Admin'), addBookToInventory);
router.delete('/libraries/:id/inventory/:bookId', authenticate, validateRole('Admin'), removeBookFromInventory);

module.exports = router;
