const { Book, BorrowLog } = require('../models');

module.exports = {
    borrowBook: async (req, res) => {
        try {
            const userId = req.user.id;
            const { bookId, latitude, longitude } = req.body;

            if (!bookId || !latitude || !longitude) {
                return res.status(400).json({ message: 'Book ID, latitude, and longitude are required' });
            }

            const book = await Book.findByPk(bookId);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            if (book.stock < 1) {
                return res.status(400).json({ message: 'Book is out of stock' });
            }

            // Decrement stock
            await book.decrement('stock');

            // Create log
            const log = await BorrowLog.create({
                userId,
                bookId,
                borrowDate: new Date(),
                latitude,
                longitude
            });

            res.json({ message: 'Book borrowed successfully', data: log });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
