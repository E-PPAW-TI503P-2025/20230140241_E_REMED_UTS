const { Book } = require('../models');

module.exports = {
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.findAll();
            res.json(books);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getBookById: async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id);
            if (!book) return res.status(404).json({ message: 'Book not found' });
            res.json(book);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createBook: async (req, res) => {
        try {
            const { title, author, stock } = req.body;
            if (!title || !author || stock === undefined) {
                return res.status(400).json({ message: 'Title, author, and stock are required' });
            }
            const book = await Book.create({ title, author, stock });
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateBook: async (req, res) => {
        try {
            const { title, author, stock } = req.body;
            const book = await Book.findByPk(req.params.id);
            if (!book) return res.status(404).json({ message: 'Book not found' });

            await book.update({ title, author, stock });
            res.json(book);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteBook: async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id);
            if (!book) return res.status(404).json({ message: 'Book not found' });

            await book.destroy();
            res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
