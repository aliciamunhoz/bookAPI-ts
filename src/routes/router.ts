import express from 'express';
import booksRouter from './book-routes';

const router = express.Router();

router.use('/books', booksRouter);

export default router;
