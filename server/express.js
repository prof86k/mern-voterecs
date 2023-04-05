import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import devBundle from './devBundle';
import dbConnection from './../databases/dbConnection';
import morgan from 'morgan';

const app = express();

dotenv.config({ path: 'config.env' });

dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(cors());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

if (process.env.NODE_ENV == 'development') {
    devBundle.compile(app);
}

export default app