const express = require('express');
const AuthController = require('../controllers/authController.js');

const router = express.Router();

module.exports = (app) => {
  router.post('/login', AuthController.login);

  app.use(router);
};
