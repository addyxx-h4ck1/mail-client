import express from 'express';
import { config } from 'dotenv';
import routeHandler from './routes/mail-route.js';
import { logger } from './middleware/logger.js';
import agent from 'express-useragent';
import reqip from 'request-ip';
config();
const port = process.env.PORT;
const app = express();

//middleware
app.use(agent.express());
app.use(reqip.mw());
app.use(logger);
app.use(express.json());

//routes
app.use('/', routeHandler);

//start server
app.listen(port, () => console.log(`server is running on port ${port}`));
