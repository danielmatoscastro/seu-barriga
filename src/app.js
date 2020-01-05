const express = require('express');
const consign = require('consign');
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.test.env',
});

const app = express();

consign({ cwd: 'src', verbose: false })
  .include('./middlewares/bodyParser.js')
  .include('./routes/userRoutes.js')
  .include('./routes/accountRoutes.js')
  .include('./routes/authRoutes.js')
  .include('./middlewares/errorHandler.js')
  .into(app);

app.get('/', (req, res) => res.sendStatus(200));

module.exports = app;
