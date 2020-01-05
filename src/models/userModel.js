const bcrypt = require('bcrypt');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const UserRepository = require('./repositories/userRepository');
const UserSchema = require('./schemas/userSchema');
const {
  throwValidationError,
  throwNotFoundError,
} = require('../errors/factories');

const sign = promisify(jwt.sign);
const compare = promisify(bcrypt.compare);

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

    newUser.passwd = await bcrypt.hash(
      newUser.passwd,
      Number(process.env.SALT_ROUNDS),
    );

    const result = await UserRepository.create(newUser);
    delete result[0].passwd;

    return result;
  }

  static async getToken(mail, passwd) {
    const user = await UserRepository.findByMail(mail)[0];

    if (!user) {
      throwNotFoundError('user not found');
    }

    const passwdIsValid = await compare(passwd, user.passwd);
    if (!passwdIsValid) {
      throwValidationError('passwd invalid');
    }

    return sign({ id: user.id }, process.env.SECRET);
  }
}

module.exports = UserModel;
