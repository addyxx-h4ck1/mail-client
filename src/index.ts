import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import routeHandler from './routes/mail-route';
config();
const port = process.env.PORT;
const app = express();

//middleware
app.use(express.json());

//routes
app.use('/', routeHandler);

//start server
app.listen(port, () => console.log(`server is running on port ${port}`));
