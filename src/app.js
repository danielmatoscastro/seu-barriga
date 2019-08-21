const express = require('express');
const consign = require('consign');

const app = express();

consign({ cwd: 'src', verbose: false })
  .include('./middlewares/bodyParser.js')
  .include('./routes/userRoutes.js')
  .into(app);

app.get('/', (req, res) => res.sendStatus(200));


module.exports = app;
