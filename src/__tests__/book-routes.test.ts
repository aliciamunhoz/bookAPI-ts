import request from 'supertest'
import app from '../../index'
import Book from '../models/book-model'
import mongoose from 'mongoose'

const validBookId = '507f1f77bcf86cd799439011'

// Mock do método save
const mockSave = jest.fn().mockResolvedValue({
  _id: validBookId,
  title: 'Test Book',
  author: 'Test Author',
  publisher: 'Test Publisher',
  pages: 123,
})

// Mock do método find
const mockFind = jest.fn().mockResolvedValue([
  {
    _id: validBookId,
    title: 'Test Book',
    author: 'Test Author',
    publisher: 'Test Publisher',
    pages: 123,
  },
])

// Mock do método find
const mockFindById = jest.fn().mockResolvedValue({
  _id: validBookId,
  title: 'Test Book',
  author: 'Test Author',
  publisher: 'Test Publisher',
  pages: 183,
})

// Mock do método findByIdAndUpdate
const mockFindByIdAndUpdate = jest.fn().mockResolvedValue({
  _id: validBookId,
  title: 'Updated Book',
  author: 'Updated Author',
  publisher: 'Updated Publisher',
  pages: 456,
})

// Mock do método findByIdAndDelete
const mockFindByIdAndDelete = jest.fn().mockResolvedValue({
  _id: validBookId,
  title: 'Deleted Book',
  author: 'Deleted Author',
  publisher: 'Deleted Publisher',
  pages: 789,
})

// Substituir os métodos reais pelos mocks
beforeAll(() => {
  jest.spyOn(Book.prototype, 'save').mockImplementation(mockSave)
  jest.spyOn(Book, 'find').mockImplementation(mockFind)
  jest.spyOn(Book, 'findById').mockImplementation(mockFindById)
  jest
    .spyOn(Book, 'findByIdAndUpdate')
    .mockImplementation(mockFindByIdAndUpdate)
  jest
    .spyOn(Book, 'findByIdAndDelete')
    .mockImplementation(mockFindByIdAndDelete)
})

afterAll(async () => {
  // Fechar a conexão com o banco de dados após todos os testes serem concluídos
  await mongoose.connection.close()
})

describe('Books API', () => {
  let bookId: string

  const book = {
    title: 'New Book',
    author: 'John Doe',
    publisher: 'Publisher Name',
    pages: 123,
  }

  describe('success scenarios', () => {
    it('should create a new book', async () => {
      const response = await request(app).post('/api/books').send(book)

      expect(response.status).toBe(201)
      expect(response.body.data.title).toBe('Test Book')
      bookId = response.body.data._id
    })

    it('should get all books', async () => {
      const response = await request(app).get('/api/books')

      expect(response.status).toBe(200)
      expect(response.body.data).toHaveLength(1)
      expect(response.body.data[0].title).toBe('Test Book')
    })

    it('should get one book', async () => {
      const response = await request(app).get(`/api/books/${bookId}`)

      expect(response.status).toBe(200)
      expect(response.body.data.title).toBe('Test Book')
    })

    it('should update a book', async () => {
      const response = await request(app).patch(`/api/books/${bookId}`).send({
        title: 'Updated Book',
        author: 'John Doe Updated',
      })

      expect(response.status).toBe(200)
      expect(response.body.data.title).toBe('Updated Book')
    })

    it('should delete a book', async () => {
      const response = await request(app).delete(`/api/books/${bookId}`)

      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Livro deletado')
    })
  })

  describe('error scenarios', () => {
    it('should return bad request for invalid id', async () => {
      const response = await request(app).get('/api/books/invalid-id')

      expect(response.status).toBe(400)
    })

    it('should return bad request for invalid filter', async () => {
      const response = await request(app).get('/api/books?category=romance')

      expect(response.status).toBe(400)
    })

    it('should return not found for missing book', async () => {
      mockFindById.mockResolvedValueOnce(null)

      const response = await request(app).get(`/api/books/${validBookId}`)

      expect(response.status).toBe(404)
    })
  })
})
