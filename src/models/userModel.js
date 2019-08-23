const UserRepository = require('./repositories/userRepository');
const UserSchema = require('./schemas/userSchema');

class UserModel {
  static async listUsers() {
    return UserRepository.find();
  }

  static async createUser(user) {
    const { error } = UserSchema.simpleValidate(user);
    if (error) {
      return { error: error.message };
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
