const AccountRepository = require('./repositories/accountRepository');

class AccountModel {
  static listAccounts() {
    return AccountRepository.find();
  }

  static async findAccount(id) {
    const result = await AccountRepository.findById(id);

    if (result.length === 0) {
      return { error: 'account not found' };
    }

    return result;
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

  static removeAccount(id) {
    return AccountRepository.delete(id);
  }
}

module.exports = AccountModel;
