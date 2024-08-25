import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import routeHandler from './routes/mail-route.js';
import { logger } from './middleware/logger.js';
import agent from 'express-useragent';
import reqip from 'request-ip';
import { connection } from './database/conn.js';
config();
const port = process.env.PORT;
const app = express();

//middleware
app.use(cors());
app.use(agent.express());
app.use(reqip.mw());
app.use(logger);
app.use(express.json());

//routes
app.use('/', routeHandler);

//start server
const start = (URI: string | undefined) => {
  connection(URI as string)
    .then((conn) => {
      console.log(`Connected to mongoDB`);
      app.listen(port, () => console.log(`server is runnign on port ${port}`));
    })
    .catch((err) => {
      console.error(err);
    });
};
start(process.env.MONGO_URI);
