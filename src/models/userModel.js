const UserRepository = require('./repositories/userRepository');

class UserModel {
  static listUsers() {
    return UserRepository.find();
  }

  static createUser(user) {
    if (!user.name) {
      return { error: 'cannot to insert an user without name' };
    }

    if (!user.mail) {
      return { error: 'cannot to insert an user without mail' };
    }

    return UserRepository.create(user);
  }
}

module.exports = UserModel;
