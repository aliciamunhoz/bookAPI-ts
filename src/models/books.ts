import mongoose, { Document, Schema, Model } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  publisher?: string;
  pages: number;
}

const titleRequired: [boolean, string] = [true, 'The book must have a name'];
const authorRequired: [boolean, string] = [true, 'The author must have a name'];
const pagesRequired: [boolean, string] = [
  true,
  'The book must have a number of pages',
];

const bookSchema: Schema<IBook> = new Schema({
  title: {
    required: titleRequired,
    type: String,
  },
  author: {
    required: authorRequired,
    type: String,
  },
  publisher: {
    required: false,
    type: String,
  },
  pages: {
    required: pagesRequired,
    type: Number,
  },
});

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export default Book;
