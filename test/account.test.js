const request = require('supertest');
const faker = require('faker');
const app = require('../src/app');
const insert = require('./utils/insert')(app);

describe('account-related routes', () => {
  const user = {};
  let token;
  const account = {};

  beforeAll(async () => {
    user.name = faker.name.findName();
    user.mail = faker.internet.email();
    user.passwd = faker.internet.password(6);

    user.id = (await insert('users', user)).id;

    const responseAuth = await request(app)
      .post('/login')
      .send({ mail: user.mail, passwd: user.passwd });
    token = `Bearer ${responseAuth.body.token}`;
  });

  beforeEach(() => {
    account.name = faker.random.alphaNumeric(6);
    account.user_id = user.id;
  });

  describe('POST /accounts', () => {
    it('should returns 401 if token is not provided', async () => {
      const response = await request(app)
        .post('/accounts')
        .send(account);

      const { error } = response.body;
      expect(response.status).toBe(401);
      expect(error).toBe('protected resource');
      expect(response.body.length).toBeUndefined();
    });

    it('should insert an account', async () => {
      const response = await request(app)
        .post('/accounts')
        .set('Authorization', token)
        .send(account);

      expect(response.status).toBe(201);
      expect(response.body[0]).toHaveProperty('name', account.name);
    });
  });

  describe('GET /accounts', () => {
    it('should returns 401 if token is not provided', async () => {
      await insert('accounts', account, token);

      const response = await request(app).get('/accounts');

      const { error } = response.body;
      expect(response.status).toBe(401);
      expect(error).toBe('protected resource');
      expect(response.body.length).toBeUndefined();
    });

    it('should list all accounts', async () => {
      await insert('accounts', account, token);

      const response = await request(app)
        .get('/accounts')
        .set('Authorization', token);

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
    it('should returns 401 if token is not provided', async () => {
      const accountDB = await insert('accounts', account, token);

      const response = await request(app).get(`/accounts/${accountDB.id}`);

      const { error } = response.body;
      expect(response.status).toBe(401);
      expect(error).toBe('protected resource');
      expect(response.body.length).toBeUndefined();
    });

    it('should find an account by id', async () => {
      const accountDB = await insert('accounts', account, token);

      const response = await request(app)
        .get(`/accounts/${accountDB.id}`)
        .set('Authorization', token);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toEqual(accountDB);
    });

    it('should return 404 when account not exists', async () => {
      const id = faker.random.number({ min: 10000000 });

      const response = await request(app)
        .get(`/accounts/${id}`)
        .set('Authorization', token);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /accounts/:id', () => {
    it('should returns 401 if token is not provided', async () => {
      const accountDB = await insert('accounts', account, token);
      const url = `/accounts/${accountDB.id}`;
      const oldName = accountDB.name;
      accountDB.name += new Date().getMilliseconds().toString();

      const response = await request(app)
        .put(url)
        .send(accountDB);

      const accountDBNotModified = (
        await request(app)
          .get(url)
          .set('Authorization', token)
      ).body[0];

      const { error } = response.body;
      expect(response.status).toBe(401);
      expect(error).toBe('protected resource');
      expect(accountDBNotModified.name).toBe(oldName);
    });

    it("should update account's name", async () => {
      const accountDB = await insert('accounts', account, token);
      const url = `/accounts/${accountDB.id}`;
      accountDB.name += new Date().getMilliseconds().toString();

      const response = await request(app)
        .put(url)
        .send(accountDB)
        .set('Authorization', token);

      const accountDBModified = (
        await request(app)
          .get(url)
          .set('Authorization', token)
      ).body[0];

      expect(response.status).toBe(204);
      expect(accountDBModified.name).toBe(accountDB.name);
    });
  });

  describe('DELETE /accounts/:id', () => {
    it('should returns 401 if token is not provided', async () => {
      const { id } = await insert('accounts', account, token);
      const url = `/accounts/${id}`;

      const response = await request(app).delete(url);

      const accountNotDeleted = await request(app)
        .get(url)
        .set('Authorization', token);

      const { error } = response.body;
      expect(response.status).toBe(401);
      expect(error).toBe('protected resource');
      expect(accountNotDeleted.status).toBe(200);
      expect(accountNotDeleted.body[0].id).toBe(id);
    });

    it('should delete an account', async () => {
      const { id } = await insert('accounts', account, token);
      const url = `/accounts/${id}`;

      const response = await request(app)
        .delete(url)
        .set('Authorization', token);

      const accountDeleted = await request(app)
        .get(url)
        .set('Authorization', token);
      expect(response.status).toBe(200);
      expect(accountDeleted.status).toBe(404);
    });
  });
});
