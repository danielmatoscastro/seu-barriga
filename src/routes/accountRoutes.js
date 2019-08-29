const express = require('express');
const AccountController = require('../controllers/accountController');

const router = express.Router();

module.exports = (app) => {
  router.get('/accounts', AccountController.index);
  router.get('/accounts/:id', AccountController.show);
  router.post('/accounts', AccountController.store);
  router.put('/accounts/:id', AccountController.update);
  router.delete('/accounts/:id', AccountController.destroy);

  app.use(router);
};
