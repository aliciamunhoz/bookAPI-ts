import express from 'express'
import BooksController from '../controllers/book-controller'

const books = express.Router()

// Create book
books.post('/', BooksController.create)

// Get all books
books.get('/', BooksController.findAll)

// Get book by ID
books.get('/:id', BooksController.findOne)

// Update book by ID
books.patch('/:id', BooksController.update)

//Delete by ID Method
books.delete('/:id', BooksController.delete)

export default books
