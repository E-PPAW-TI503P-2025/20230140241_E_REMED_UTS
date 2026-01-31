const router = require('express').Router();
const bookController = require('../controllers/bookController');
const borrowController = require('../controllers/borrowController');
const { isAdmin, isUser } = require('../middleware/authSimulation');

// Public
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);

// Admin
router.post('/books', isAdmin, bookController.createBook);
router.put('/books/:id', isAdmin, bookController.updateBook);
router.delete('/books/:id', isAdmin, bookController.deleteBook);

// User
router.post('/borrow', isUser, borrowController.borrowBook);

module.exports = router;
