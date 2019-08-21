const knex = require('../../config/db');

class UserRepository {
  static find() {
    return knex('users').select();
  }

  static create(user) {
    return knex('users').insert(user, '*');
  }
}

module.exports = UserRepository;
