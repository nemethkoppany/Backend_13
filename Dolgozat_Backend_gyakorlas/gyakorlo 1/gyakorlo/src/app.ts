import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;