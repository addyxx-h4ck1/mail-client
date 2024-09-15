import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import routeHandler from './routes/mail-route.js';
import authRoutes from './routes/auth.js';
import userDataRoute from './routes/user.js';
import { logger } from './middleware/logger.js';
import agent from 'express-useragent';
import reqip from 'request-ip';
import parser from 'cookie-parser';
import { connection } from './database/conn.js';
import './cron/delete-old-activities.js';
config();
const port = process.env.PORT;
const app = express();

//middleware
app.use(cors());
app.use(parser());
app.use(agent.express());
app.use(reqip.mw());
app.use(logger);
app.use(express.json());

//mail routes
app.use('/', routeHandler);

//auth routes
app.use('/auth', authRoutes);

//userdata route
app.use('/u/d', userDataRoute);

//start server
const start = (URI: string | undefined) => {
  connection(URI as string)
    .then((conn) => {
      console.log(`Connected to mongo database`);
      app.listen(port, () => console.log(`server is running on port ${port}`));
    })
    .catch((err) => {
      console.error(err);
    });
};
start(process.env.MONGO_URI);
//app.listen(port, () => console.log(`server is running on port ${port}`));
