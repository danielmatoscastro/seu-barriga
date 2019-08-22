const AccountRepository = require('./repositories/accountRepository');

class AccountModel {
  static createAccount(account) {
    return AccountRepository.create(account);
  }
}

module.exports = AccountModel;
