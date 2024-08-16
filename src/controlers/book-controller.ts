import { Request, Response } from 'express'
import Book from '../models/book-model'
import BookRules from '../helpers/book-rules'

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

      return res.send_created('Livro cadastrado', dataToSave)
    } catch (error: unknown) {
      return res.send_internalServerError('Houve um erro interno', error)
    }
  },

  async findAll(req: Request, res: Response) {
    const allowedFilters = ['title', 'author', 'publisher', 'pages']

    try {
      const match: Record<string, unknown> = {}
      const invalidFilters: string[] = []

      // Verificando filtros permitidos
      Object.keys(req.query).forEach((key) => {
        if (allowedFilters.includes(key)) {
          // Adiciona o filtro à pesquisa
          if (key === 'title' || key === 'author' || key === 'publisher') {
            match[key] = { $regex: req.query[key], $options: 'i' } // Filtros com regex para strings
          } else if (key === 'pages' && !isNaN(Number(req.query[key]))) {
            match[key] = Number(req.query[key]) // Garante que 'pages' seja numérico
          } else {
            invalidFilters.push(key)
          }
        } else {
          invalidFilters.push(key) // Filtros não permitidos
        }
      })

      if (invalidFilters.length > 0) {
        return res.send_badRequest(
          `Os seguintes filtros não são suportados: ${invalidFilters.join(', ')}`
        )
      }

      const data = await Book.find(match)

      if (data.length === 0) {
        return res.send_notFound(
          'Nenhum livro encontrado para os filtros aplicados.'
        )
      }

      res.send_ok('Os livros cadastrados foram encontrados.', data)
    } catch (error: unknown) {
      return res.send_internalServerError('Houve um erro interno', error)
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
        return res.send_notFound(
          'Nenhum livro encontrado para o identificador informado!'
        )
      }

      res.send_ok('Livro encontrado', data)
    } catch (error: unknown) {
      return res.send_internalServerError('Houve um erro interno', error)
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
        return res.send_notFound(
          'Nenhum livro encontrado para o identificador informado!'
        )
      }

      res.send_ok('Livro atualizado', data)
    } catch (error: unknown) {
      return res.send_internalServerError('Houve um erro interno', error)
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
        return res.send_notFound(
          'Nenhum livro encontrado para o identificador informado!'
        )
      }

      res.send_ok('Livro deletado')
    } catch (error: unknown) {
      return res.send_internalServerError('Houve um erro interno', error)
    }
  },
}

export default BooksControler
