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

  static updateAccount(id, account) {
    const { name } = account;

    if (!name || name.trim() === '') {
      return { error: 'Name must be a non-empty string.' };
    }

    return AccountRepository.updateName(id, account.name);
  }
}

module.exports = AccountModel;
