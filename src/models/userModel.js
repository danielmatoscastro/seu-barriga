const UserRepository = require('./repositories/userRepository');

class UserModel {
  static async listUsers() {
    return UserRepository.find();
  }

  static async createUser(user) {
    if (!user.name) {
      return { error: 'cannot to insert an user without name' };
    }

    if (!user.mail) {
      return { error: 'cannot to insert an user without mail' };
    }

    if (!user.passwd) {
      return { error: 'cannot to insert an user without passwd' };
    }

    const mailInDB = await UserRepository.findByMail(user.mail);

    if (mailInDB.length > 0) {
      return { error: 'mail already exists' };
    }

    return UserRepository.create(user);
  }
}

module.exports = UserModel;
