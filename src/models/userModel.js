const bcrypt = require('bcrypt');
const UserRepository = require('./repositories/userRepository');
const UserSchema = require('./schemas/userSchema');
const { throwValidationError } = require('../errors/factories');

class UserModel {
  static async listUsers() {
    return UserRepository.find();
  }

  static async createUser(user) {
    const newUser = { ...user };

    const { error } = UserSchema.simpleValidate(newUser);
    if (error) {
      throwValidationError(error.message);
    }

    const mailInDB = await UserRepository.findByMail(newUser.mail);
    if (mailInDB.length > 0) {
      throwValidationError('mail already exists');
    }

    newUser.passwd = await bcrypt.hash(newUser.passwd, Number(process.env.SALT_ROUNDS));

    const result = await UserRepository.create(newUser);
    delete result[0].passwd;

    return result;
  }
}

module.exports = UserModel;
