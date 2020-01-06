/* eslint-disable camelcase */
const AccountRepository = require('./repositories/accountRepository');
const {
  throwValidationError,
  throwNotFoundError,
  throwForbiddenError,
} = require('../errors/factories');

class AccountModel {
  static listAccounts(user_id) {
    return AccountRepository.find({ user_id });
  }

  static async findAccount(id, user_id) {
    const result = await AccountRepository.findById(id);

    if (result.length === 0) {
      throwNotFoundError('account not found');
    }

    if (result[0].user_id !== user_id) {
      throwForbiddenError('this account is not yours');
    }

    return result;
  }

  static async createAccount(account) {
    const accountInDB = await AccountRepository.find({
      name: account.name,
      user_id: account.user_id,
    });
    if (accountInDB.length > 0) {
      throwValidationError('name already exists');
    }

    return AccountRepository.create(account);
  }

  static async updateAccount(id, account, user_id) {
    const { name } = account;

    if (!name || name.trim() === '') {
      throwValidationError('Name must be a non-empty string.');
    }

    const accountInDB = await AccountRepository.findById(id);
    if (accountInDB[0].user_id !== user_id) {
      throwForbiddenError('this account is not yours');
    }

    return AccountRepository.updateName(id, account.name);
  }

  static removeAccount(id) {
    return AccountRepository.delete(id);
  }
}

module.exports = AccountModel;
