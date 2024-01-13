import express, { Request, Response, NextFunction } from 'express';
const app = express();
const router = express.Router();
import { defaultErrorHandler } from './middlewares/error.middlewares';
import { myDataSource } from './orm/connectDb';
import paginate from 'express-paginate';
import dotenv, { config } from 'dotenv';
import indexRouter from './routes/index.routes';
import cors from 'cors';
// import { firebaseConfig } from './config/firebase.config';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

dotenv.config();
const PORT = process.env.PORT || 3001;

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err: any) => {
    console.error('Error during Data Source initialization:', err);
  });

const options = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

initializeApp({
  credential: applicationDefault(),
  projectId: 'web2-289e9',
});

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(paginate.middleware(5, 50));
app.use(indexRouter);
app.use(defaultErrorHandler);
app.listen(PORT, () => {
  console.log('server is running on port', PORT);
});
