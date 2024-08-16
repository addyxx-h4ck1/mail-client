const express = require('express');
const env = require('dotenv').config();
const port = process.env.PORT;
const app = express();

//test route
//@ts-ignore
app.get('/', (req, res) => {
  res.send('Hello there');
});

app.listen(port, () => console.log(`server is running on port ${port}`));
