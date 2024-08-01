const Book = require('../models/Books');
const Library = require('../models/Library');
const User = require('../models/User');

// Borrow a book against a charge
exports.borrowBook = async (req, res) => {
    const { bookId, libraryId } = req.body;

    try {
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: req.t('borrow.bookNotFound') });
        }

        if (book.borrower) {
            return res.status(400).json({ message: req.t('borrow.alreadyBorrowed') });
        }

        const library = await Library.findById(libraryId);

        if (!library) {
            return res.status(404).json({ message: req.t('borrow.libraryNotFound') });
        }

        if (!library.books.includes(bookId)) {
            return res.status(400).json({ message: req.t('borrow.bookNotInLibrary') });
        }

        book.borrower = req.user._id;
        await book.save();

        res.status(200).json({
            message: req.t('borrow.success'),
            book
        });
    } catch (error) {
        res.status(500).json({ message: req.t('borrow.error') });
    }
};

// Return a borrowed book by its ID
exports.returnBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: req.t('return.bookNotFound') });
        }

        if (!book.borrower.equals(req.user._id)) {
            return res.status(403).json({ message: req.t('return.notBorrowedByUser') });
        }

        book.borrower = null;
        await book.save();

        res.status(200).json({
            message: req.t('return.success'),
            book
        });
    } catch (error) {
        res.status(500).json({ message: req.t('return.error') });
    }
};
