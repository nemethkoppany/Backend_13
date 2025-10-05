import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
export default app;
