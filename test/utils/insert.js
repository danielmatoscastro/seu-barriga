const request = require('supertest');

module.exports = (app) => async (table, data) => {
  const result = (await request(app)
    .post(`/${table}`)
    .send(data)).body[0];
  return result;
};
