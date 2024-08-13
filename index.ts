import express from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/router';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import responser from 'responser';

dotenv.config();

const mongoString: string = process.env.DATABASE_URL as string;
mongoose.connect(mongoString);
const database = mongoose.connection;

const app = express();
const port = 4000;

// Middlewares
app.use(bodyParser.json());
app.use(responser);

// Rotas
app.use('/api', routes);

app.listen(port, () => {
  console.log(`API running on port ${port}.`);
});

database.on('error', (error: unknown) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});
