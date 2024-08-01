const Library = require('../models/Library');
const Book = require('../models/Book');

// Retrieve a list of all libraries
exports.getLibraries = async (req, res) => {
    try {
        const libraries = await Library.find();
        res.json(libraries);
    } catch (err) {
        res.status(500).json({ message: req.t('library.error') });
    }
};

// Retrieve details of a specific library by its ID
exports.getLibraryById = async (req, res) => {
    try {
        const library = await Library.findById(req.params.id).populate({
            path: 'books',
            populate: { path: 'borrower', select: 'name' }
        });

        if (!library) {
            return res.status(404).json({ message: req.t('library.notFound') });
        }

        res.json(library);
    } catch (err) {
        res.status(500).json({ message: req.t('library.error') });
    }
};

// Create a new library
exports.createLibrary = async (req, res) => {
    const { name, address } = req.body;

    try {
        const library = new Library({ name, address });
        await library.save();
        res.status(201).json({ message: req.t('library.created'), library });
    } catch (err) {
        res.status(500).json({ message: req.t('library.error') });
    }
};

// Update details of a specific library by its ID
exports.updateLibrary = async (req, res) => {
    const { name, address } = req.body;

    try {
        const library = await Library.findByIdAndUpdate(
            req.params.id,
            { name, address },
            { new: true }
        );

        if (!library) {
            return res.status(404).json({ message: req.t('library.notFound') });
        }

        res.json({ message: req.t('library.updated'), library });
    } catch (err) {
        res.status(500).json({ message: req.t('library.error') });
    }
};

// Delete a library by its ID
exports.deleteLibrary = async (req, res) => {
    try {
        const library = await Library.findByIdAndDelete(req.params.id);

        if (!library) {
            return res.status(404).json({ message: req.t('library.notFound') });
        }

        res.json({ message: req.t('library.deleted') });
    } catch (err) {
        res.status(500).json({ message: req.t('library.error') });
    }
};

// Retrieve a list of books available in a specific library
exports.getLibraryInventory = async (req, res) => {
    try {
        const library = await Library.findById(req.params.id).populate('books');

        if (!library) {
            return res.status(404).json({ message: req.t('library.notFound') });
        }

        res.json(library.books);
    } catch (err) {
        res.status(500).json({ message: req.t('library.error') });
    }
};

// Add a book to the inventory of a specific library
exports.addBookToInventory = async (req, res) => {
    const { bookId } = req.body;

    try {
        const library = await Library.findById(req.params.id);
        const book = await Book.findById(bookId);

        if (!library || !book) {
            return res.status(404).json({ message: req.t('library.bookNotFound') });
        }

        library.books.push(bookId);
        await library.save();

        res.json({ message: req.t('library.bookAdded'), library });
    } catch (err) {
        res.status(500).json({ message: req.t('library.error') });
    }
};

// Remove a book from the inventory of a specific library by its ID
exports.removeBookFromInventory = async (req, res) => {
    const { bookId } = req.params;

    try {
        const library = await Library.findById(req.params.id);

        if (!library) {
            return res.status(404).json({ message: req.t('library.notFound') });
        }

        library.books.pull(bookId);
        await library.save();

        res.json({ message: req.t('library.bookRemoved'), library });
    } catch (err) {
        res.status(500).json({ message: req.t('library.error') });
    }
};
