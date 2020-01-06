const AccountRepository = require('./repositories/accountRepository');
const {
  throwValidationError,
  throwNotFoundError,
} = require('../errors/factories');

class AccountModel {
  // eslint-disable-next-line camelcase
  static listAccounts(user_id) {
    return AccountRepository.find({ user_id });
  }

  static async findAccount(id) {
    const result = await AccountRepository.findById(id);

    if (result.length === 0) {
      throwNotFoundError('account not found');
    }

    return result;
  }

  static createAccount(account) {
    return AccountRepository.create(account);
  }

  static updateAccount(id, account) {
    const { name } = account;

    if (!name || name.trim() === '') {
      throwValidationError('Name must be a non-empty string.');
    }

    return AccountRepository.updateName(id, account.name);
  }

  static removeAccount(id) {
    return AccountRepository.delete(id);
  }
}

module.exports = AccountModel;
