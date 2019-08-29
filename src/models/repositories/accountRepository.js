const knex = require('../../config/db');

class AccountRepository {
  static find() {
    return knex('accounts').select();
  }

  static findById(id) {
    return knex('accounts')
      .select()
      .where({ id });
  }

  static create(account) {
    return knex('accounts').insert(account, '*');
  }

  static updateName(id, name) {
    return knex('accounts')
      .where({ id })
      .update({ name });
  }
}

module.exports = AccountRepository;
