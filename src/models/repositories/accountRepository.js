const knex = require('../../config/db');

class AccountRepository {
  static create(account) {
    return knex('accounts').insert(account, '*');
  }
}

module.exports = AccountRepository;
