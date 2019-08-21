const UserModel = require('../models/user');

class UserController {
  static async index(req, res) {
    const users = await UserModel.find();

    return res.json(users);
  }

  static async store(req, res) {
    const user = await UserModel.create(req.body);

    return res.status(201).json(user);
  }
}

module.exports = UserController;
