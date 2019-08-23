const knex = require('../../config/db');

class AccountRepository {
  static find() {
    return knex('accounts').select();
  }

  static findById(id) {
    return knex('accounts').select().where({ id });
  }

  static create(account) {
    return knex('accounts').insert(account, '*');
  }
}

module.exports = AccountRepository;
