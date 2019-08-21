const UserRepository = require('./repositories/userRepository');

class UserModel {
  static listUsers() {
    return UserRepository.find();
  }

  static createUser(user) {
    if (!user.name) {
      return { error: 'cannot to insert an unnamed user' };
    }

    return UserRepository.create(user);
  }
}

module.exports = UserModel;
