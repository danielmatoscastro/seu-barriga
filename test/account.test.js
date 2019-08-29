const request = require('supertest');
const faker = require('faker');
const app = require('../src/app');
const insert = require('./utils/insert')(app);

describe('account-related routes', () => {
  let user = {};
  const account = {};

  beforeAll(async () => {
    user.name = faker.name.findName();
    user.mail = faker.internet.email();
    user.passwd = faker.internet.password(6);

    user = await insert('users', user);
  });

  beforeEach(() => {
    account.name = faker.random.alphaNumeric(6);
    account.user_id = user.id;
  });

  describe('POST /accounts', () => {
    it('should insert an account', async () => {
      const response = await request(app)
        .post('/accounts')
        .send(account);

      expect(response.status).toBe(201);
      expect(response.body[0]).toHaveProperty('name', account.name);
    });
  });

  describe('GET /accounts', () => {
    it('should list all accounts', async () => {
      await insert('accounts', account);

      const response = await request(app).get('/accounts');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(
        response.body.find(
          (item) => item.name === account.name && item.user_id === account.user_id,
        ),
      ).not.toBeUndefined();
    });
  });

  describe('GET /accounts/:id', () => {
    it('should find an account by id', async () => {
      const accountDB = await insert('accounts', account);

      const response = await request(app).get(`/accounts/${accountDB.id}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toEqual(accountDB);
    });
  });

  describe('PUT /accounts/:id', () => {
    it("should update account's name", async () => {
      const accountDB = await insert('accounts', account);
      const url = `/accounts/${accountDB.id}`;
      accountDB.name += new Date().getMilliseconds().toString();

      const response = await request(app)
        .put(url)
        .send(accountDB);

      const accountDBModified = (await request(app).get(url)).body[0];

      expect(response.status).toBe(204);
      expect(accountDBModified.name).toBe(accountDB.name);
    });
  });
});
