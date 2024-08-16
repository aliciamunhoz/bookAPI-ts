import express from 'express'
import booksRouter from './BookRoutes'

const router = express.Router()

router.use('/books', booksRouter)

export default router
