const AccountModel = require('../models/accountModel');

class AccountController {
  static async index(req, res) {
    const result = await AccountModel.listAccounts();

    return res.json(result);
  }

  static async show(req, res) {
    const { id } = req.params;
    const result = await AccountModel.findAccount(id);

    if (result.error) {
      return res.sendStatus(404);
    }

    return res.json(result);
  }

  static async store(req, res) {
    const account = req.body;

    const result = await AccountModel.createAccount(account);

    return res.status(201).json(result);
  }

  static async update(req, res) {
    const { id } = req.params;
    const account = req.body;

    await AccountModel.updateAccount(id, account);

    return res.sendStatus(204);
  }

  static async destroy(req, res) {
    const { id } = req.params;

    await AccountModel.removeAccount(id);

    return res.sendStatus(200);
  }
}

module.exports = AccountController;
