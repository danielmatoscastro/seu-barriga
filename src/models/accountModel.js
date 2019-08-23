const AccountRepository = require('./repositories/accountRepository');

class AccountModel {
  static listAccounts() {
    return AccountRepository.find();
  }

  static findAccount(id) {
    return AccountRepository.findById(id);
  }

  static createAccount(account) {
    return AccountRepository.create(account);
  }
}

module.exports = AccountModel;
