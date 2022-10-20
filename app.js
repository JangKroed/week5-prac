// reqiures
const express = require('express');
const router = require('./routes');
const Http = require('http');
require('dotenv').config();

const cookieParser = require('cookie-parser');
// const {
//   errorLogger,
//   errorHandler,
// } = require('./middlewares/error-hander.middleware');

const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 3000;

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(router);
// app.use(errorLogger);
// app.use(errorHandler);

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;
