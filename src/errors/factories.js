const { VALIDATION_ERR, NOT_FOUND_ERR } = require('./types.js');

const throwValidationError = (message) => {
  const err = new Error(message);
  err.status = VALIDATION_ERR;
  throw err;
};

const throwNotFoundError = (message) => {
  const err = new Error(message);
  err.status = NOT_FOUND_ERR;
  throw err;
};

module.exports = { throwValidationError, throwNotFoundError };
