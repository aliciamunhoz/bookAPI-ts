import express from 'express'
import BooksControler from '../controlers/BookControler'

const books = express.Router()

// Create book
books.post('/', BooksControler.create)

// Get all books
books.get('/', BooksControler.findAll)

// Get book by ID
books.get('/:id', BooksControler.findOne)

// Update book by ID
books.patch('/:id', BooksControler.update)

//Delete by ID Method
books.delete('/:id', BooksControler.delete)

export default books
