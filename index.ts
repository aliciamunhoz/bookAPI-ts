import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const mongoString: string = process.env.DATABASE_URL as string;
mongoose.connect(mongoString);
const database = mongoose.connection;

const app = express();
const port = 4000;

app.use(bodyParser.json())
app.use('/api', routes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log(`API running on port ${port}.`)
})

database.on('error', (error: any) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

