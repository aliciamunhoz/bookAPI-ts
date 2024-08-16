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
      const match = {}

      if (req.query.title)
        Object.assign(match, {
          title: { $regex: req.query.title, $options: 'i' },
        })
      if (req.query.publisher)
        Object.assign(match, {
          publisher: { $regex: req.query.publisher, $options: 'i' },
        })
      if (req.query.pages) Object.assign(match, { pages: req.query.pages })

      const data = await Book.find(match)

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

      if (!data) {
        res.send_notFound(
          'Nenhum livro encontrado para o identificador informado!'
        )
      }

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
      const updatedData = {}
      if (req.body.title) Object.assign(updatedData, { title: req.body.title })
      if (req.body.author)
        Object.assign(updatedData, { author: req.body.author })
      if (req.body.publisher)
        Object.assign(updatedData, { publisher: req.body.publisher })
      if (req.body.pages) Object.assign(updatedData, { pages: req.body.pages })

      const options = { new: true } // define se vai retornar o conteúdo atualizado no body
      const data = await Book.findByIdAndUpdate(id, updatedData, options)

      if (!data) {
        res.send_notFound(
          'Nenhum livro encontrado para o identificador informado!'
        )
      }

      res.send_ok('Livro atualizado', data)
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
      const data = await Book.findByIdAndDelete(id)

      if (!data) {
        res.send_notFound(
          'Nenhum livro encontrado para o identificador informado!'
        )
      }

      res.send_ok('Livro deletado')
    } catch (error: unknown) {
      res.send_internalServerError('Houve um erro interno', error)
    }
  },
}

export default BooksControler
