const UserRepository = require('./repositories/userRepository');

class UserModel {
  static async listUsers() {
    return UserRepository.find();
  }

  static async createUser(user) {
    const missing = UserModel.requiredFieldsMissing(user);

    if (missing.length > 0) {
      return { error: `cannot to insert an user without ${missing[0]}` };
    }

    const mailInDB = await UserRepository.findByMail(user.mail);

    if (mailInDB.length > 0) {
      return { error: 'mail already exists' };
    }

    return UserRepository.create(user);
  }

  static requiredFieldsMissing(user) {
    const requiredFields = ['name', 'mail', 'passwd'];
    const requiredFieldsMissing = [];

    requiredFields.forEach((field) => {
      if (!user[field]) {
        requiredFieldsMissing.push(field);
      }
    });

    return requiredFieldsMissing;
  }
}

module.exports = UserModel;
