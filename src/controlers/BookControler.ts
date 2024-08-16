import { Request, Response } from 'express'
import Book from '../models/Books'
import BookRules from '../helpers/BookRules'

const BooksControler = {
  async create(req: Request, res: Response) {
    const { title, author, publisher, pages } = req.body
    const errors = BookRules.validations(
      { title },
      { author },
      { publisher },
      { pages }
    )

    if (errors) {
      return res.send_badRequest('A requisição deu errada', errors)
    }

    const data = new Book({
      title,
      author,
      publisher,
      pages,
    })

    try {
      const dataToSave = await data.save()

      res.send_created('Livro cadastrado', dataToSave)
    } catch (error: unknown) {
      res.send_internalServerError('Houve um erro interno', error)
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const data = await Book.find()

      res.send_ok('Os livros cadastrados foram encontrados.', data)
    } catch (error: unknown) {
      res.send_internalServerError('Houve um erro interno', error)
    }
  },

  async findOne(req: Request, res: Response) {
    const { id } = req.params
    const errors = BookRules.validations({ id })

    if (errors) {
      return res.send_badRequest('A requisição deu errada', errors)
    }

    try {
      const data = await Book.findById(req.params.id)

      res.send_ok('Livro encontrado', data)
    } catch (error: unknown) {
      res.send_internalServerError('Houve um erro interno', error)
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params
    const errors = BookRules.validations({ id })

    if (errors) {
      return res.send_badRequest('A requisição deu errada', errors)
    }

    try {
      const updatedData = req.body
      const options = { new: true } // define se vai retornar o conteúdo atualizado no body
      const result = await Book.findByIdAndUpdate(id, updatedData, options)

      res.send_ok('Livro atualizado', result)
    } catch (error: unknown) {
      res.send_internalServerError('Houve um erro interno', error)
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params
    const errors = BookRules.validations({ id })

    if (errors) {
      return res.send_badRequest('A requisição deu errada', errors)
    }

    try {
      await Book.findByIdAndDelete(id)
      res.send_ok('Livro deletado')
    } catch (error: unknown) {
      res.send_internalServerError('Houve um erro interno', error)
    }
  },
}

export default BooksControler
