const UserModel = require('../models/userModel');

class UserController {
  static async index(req, res) {
    const users = await UserModel.listUsers();

    return res.json(users);
  }

  static async store(req, res) {
    const result = await UserModel.createUser(req.body);

    if (result.error) {
      res.status(400);
    } else {
      res.status(201);
    }

    return res.json(result);
  }
}

module.exports = UserController;
