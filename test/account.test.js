const request = require('supertest');
const faker = require('faker');
const app = require('../src/app');

describe('account-related routes', () => {
  let user = {};

  beforeAll(async () => {
    user.name = faker.name.findName();
    user.mail = faker.internet.email();
    user.passwd = faker.internet.password(6);

    const response = await request(app).post('/users').send(user);
    [user] = response.body;
  });

  describe('POST /accounts', () => {
    const account = {};

    beforeEach(() => {
      account.name = faker.random.alphaNumeric(6);
      account.user_id = user.id;
    });

    it('should insert an account', async () => {
      const response = await request(app).post('/accounts').send(account);

      expect(response.status).toBe(201);
      expect(response.body[0]).toHaveProperty('name', account.name);
    });
  });
});
