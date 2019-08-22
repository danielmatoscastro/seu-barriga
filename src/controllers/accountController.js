const AccountModel = require('../models/accountModel');

class AccountController {
  static async index(req, res) {
    const result = await AccountModel.listAccounts();

    return res.json(result);
  }

  static async store(req, res) {
    const account = req.body;

    const result = await AccountModel.createAccount(account);

    return res.status(201).json(result);
  }
}

module.exports = AccountController;
