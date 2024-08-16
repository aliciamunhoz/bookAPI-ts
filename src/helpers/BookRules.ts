/* eslint-disable @typescript-eslint/no-explicit-any */

import requestCheck from 'request-check'
import mongoose from 'mongoose'

import is from './is'

const BookRules = {
  validations: (...args: any) => {
    const validator = requestCheck()
    validator.requiredMessage = 'Campo obrigatório!'

    validator.addRules('id', [
      {
        validator: (value: string) => is.objectId(value),
        message: 'ID inválido!',
      },
    ])

    validator.addRules('id', [
      {
        validator: (id: string) => mongoose.Types.ObjectId.isValid(id),
        message: 'ID inválido!',
      },
    ])

    validator.addRules('title', [
      {
        validator: (value: string) => is.string(value),
        message: 'Título inválido!',
      },
    ])

    validator.addRules('author', [
      {
        validator: (value: string) => is.string(value),
        message: 'Autor inválido!',
      },
    ])

    validator.addRules('publisher', [
      {
        validator: (value: string) => is.string(value),
        message: 'Editora inválida!',
      },
    ])

    validator.addRules('pages', [
      {
        validator: (value: number) => is.number(value),
        message: 'Número de páginas inválido!',
      },
    ])

    const invalid = validator.check(...args)

    return invalid
  },
}

export default BookRules
