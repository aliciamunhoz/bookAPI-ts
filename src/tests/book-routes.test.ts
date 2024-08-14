import request from 'supertest'
import app from '../../index'
import Book from '../models/books'
import mongoose from 'mongoose'

// Mock do método save
const mockSave = jest.fn().mockResolvedValue({
  _id: 'mocked_id',
  title: 'Test Book',
  author: 'Test Author',
  publisher: 'Test Publisher',
  pages: 123,
})

// Mock do método find
const mockFind = jest.fn().mockResolvedValue([
  {
    _id: 'mocked_id',
    title: 'Test Book',
    author: 'Test Author',
    publisher: 'Test Publisher',
    pages: 123,
  },
])

// Mock do método findByIdAndUpdate
const mockFindByIdAndUpdate = jest.fn().mockResolvedValue({
  _id: 'mocked_id',
  title: 'Updated Book',
  author: 'Updated Author',
  publisher: 'Updated Publisher',
  pages: 456,
})

// Mock do método findByIdAndDelete
const mockFindByIdAndDelete = jest.fn().mockResolvedValue({
  _id: 'mocked_id',
  title: 'Deleted Book',
  author: 'Deleted Author',
  publisher: 'Deleted Publisher',
  pages: 789,
})

// Substituir os métodos reais pelos mocks
beforeAll(() => {
  jest.spyOn(Book.prototype, 'save').mockImplementation(mockSave)
  jest.spyOn(Book, 'find').mockImplementation(mockFind)
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

  it('should create a new book', async () => {
    const response = await request(app).post('/books').send({
      title: 'New Book',
      author: 'John Doe',
      publisher: 'Publisher Name',
      pages: 123,
    })

    expect(response.status).toBe(201)
    expect(response.body.title).toBe('Test Book')
    bookId = response.body._id // Armazenar o ID do livro para uso em outros testes
  })

  it('should get all books', async () => {
    const response = await request(app).get('/books')

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0].title).toBe('Test Book')
  })

  it('should update a book', async () => {
    const response = await request(app).put(`/books/${bookId}`).send({
      title: 'Updated Book',
      author: 'John Doe Updated',
    })

    expect(response.status).toBe(200)
    expect(response.body.title).toBe('Updated Book')
  })

  it('should delete a book', async () => {
    const response = await request(app).delete(`/books/${bookId}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Book deleted')
  })
})
