const UserRepository = require('./repositories/userRepository');
const UserSchema = require('./schemas/userSchema');
const { throwValidationError } = require('../errors/factories');

class UserModel {
  static async listUsers() {
    return UserRepository.find();
  }

  static async createUser(user) {
    const { error } = UserSchema.simpleValidate(user);
    if (error) {
      throwValidationError(error.message);
    }

    const mailInDB = await UserRepository.findByMail(user.mail);
    if (mailInDB.length > 0) {
      throwValidationError('mail already exists');
    }

    return UserRepository.create(user);
  }
}

module.exports = UserModel;
