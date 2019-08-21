const knex = require('knex');
const knexfile = require('../../knexfile');

module.exports = knex(process.env === 'production'
  ? knexfile.production
  : knexfile.test);
