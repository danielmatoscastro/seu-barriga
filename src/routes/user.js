const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

module.exports = (app) => {
  router.get('/users', UserController.index);
  router.post('/users', UserController.store);

  app.use(router);
};
