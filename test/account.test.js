const request = require('supertest');
const faker = require('faker');
const app = require('../src/app');

describe('account-related routes', () => {
  let user = {};
  const account = {};

  beforeAll(async () => {
    user.name = faker.name.findName();
    user.mail = faker.internet.email();
    user.passwd = faker.internet.password(6);

    const response = await request(app).post('/users').send(user);
    [user] = response.body;
  });

  beforeEach(() => {
    account.name = faker.random.alphaNumeric(6);
    account.user_id = user.id;
  });

  describe('POST /accounts', () => {
    it('should insert an account', async () => {
      const response = await request(app).post('/accounts').send(account);

      expect(response.status).toBe(201);
      expect(response.body[0]).toHaveProperty('name', account.name);
    });
  });

  describe('GET /accounts', () => {
    it('should list all accounts', async () => {
      await request(app).post('/accounts').send(account);

      const response = await request(app).get('/accounts');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body.find((item) => item.name === account.name 
      && item.user_id === account.user_id)).not.toBeUndefined();
    });
  });
});
