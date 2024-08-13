import express, { Request, Response } from 'express';
import Book from '../models/books';
import requestCheck from 'request-check';
const router = express.Router();

//Create Method
router.post('/create', async (req: Request, res: Response) => {
  const { title, author, publisher, pages } = req.body;
  const rc = requestCheck();
  const errors = rc.check({ title }, { author }, { publisher }, { pages });

  if (errors) {
    return res.send_badRequest('Request is wrong', errors);
  }

  const data = new Book({
    title,
    author,
    publisher,
    pages,
  });

  try {
    const dataToSave = await data.save();
    res.send_created('Book created', dataToSave);
  } catch (error: unknown) {
    res.send_internalServerError('There was an error', error);
  }
});

//Get all Method
router.get('/find', async (req: Request, res: Response) => {
  try {
    const data = await Book.find();
    res.send_ok('Book found', data);
  } catch (error: unknown) {
    res.send_internalServerError('There was an error', error);
  }
});

//Get by ID Method
router.get('/findOne/:id', async (req: Request, res: Response) => {
  /*
    const { id } = req.params
        const rc = requestCheck()
        const errors = rc.check({id})

        if(errors) {
            return res.send_badRequest('Request is wrong', errors);
        }
        */
  try {
    const data = await Book.findById(req.params.id);
    res.send_ok('Book found', data);
  } catch (error: unknown) {
    res.send_internalServerError('There was an error', error);
  }
});

//Update by ID Method
router.patch('/update/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Book.findByIdAndUpdate(id, updatedData, options);
    res.send_ok('Book updated', result);
  } catch (error: unknown) {
    res.send_internalServerError('There was an error', error);
  }
});

//Delete by ID Method
router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Book.findByIdAndDelete(id);
    res.send_ok('Book deleted');
  } catch (error: unknown) {
    res.send_internalServerError('There was an error', error);
  }
});

export default router;
