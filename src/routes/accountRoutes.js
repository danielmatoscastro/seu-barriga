const express = require('express');
const AccountController = require('../controllers/accountController');

const router = express.Router();

module.exports = (app) => {
  router.post('/accounts', AccountController.store);

  app.use(router);
};
