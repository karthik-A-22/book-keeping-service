const Book = require('../models/Books');
const Library = require('../models/Library');
const User = require('../models/User');
const { uploadImageToFirebase } = require('../utils/firebase');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author library borrower');
        res.json({
            message: req.t('books_fetched_successfully'),
            data: books
        });
    } catch (err) {
        res.status(500).json({ message: req.t('error_fetching_books') });
    }
};

// Get book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author library borrower');
        if (!book) return res.status(404).json({ message: req.t('book_not_found') });
        res.json({
            message: req.t('book_fetched_successfully'),
            data: book
        });
    } catch (err) {
        res.status(500).json({ message: req.t('error_fetching_book') });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    const { title, author, library } = req.body;
    const file = req.file;

    try {
        if (!file) {
            return res.status(400).json({ message: req.t('no_image_provided') });
        }

        const coverImage = await uploadImageToFirebase(file);

        const book = new Book({ title, author, library, coverImage });
        await book.save();
        res.status(201).json({
            message: req.t('book_created_successfully'),
            data: book
        });
    } catch (err) {
        res.status(500).json({ message: req.t('error_creating_book') });
    }
};

// Update book by ID
exports.updateBook = async (req, res) => {
    const { title, author, library } = req.body;
    const file = req.file;

    try {
        let updateData = { title, author, library };

        if (file) {
            const coverImage = await uploadImageToFirebase(file);
            updateData.coverImage = coverImage;
        }

        const book = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!book) return res.status(404).json({ message: req.t('book_not_found') });
        res.json({
            message: req.t('book_updated_successfully'),
            data: book
        });
    } catch (err) {
        res.status(500).json({ message: req.t('error_updating_book') });
    }
};

// Delete book by ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: req.t('book_not_found') });
        res.json({
            message: req.t('book_deleted_successfully')
        });
    } catch (err) {
        res.status(500).json({ message: req.t('error_deleting_book') });
    }
};
