const knex = require('./db');

class UserModel {
  static find() {
    return knex('users').select();
  }

  static create(user) {
    return knex('users').insert(user, '*');
  }
}

module.exports = UserModel;
