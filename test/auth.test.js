const request = require('supertest');
const faker = require('faker');
const app = require('../src/app');
const insert = require('./utils/insert')(app);

describe('auth-related routes', () => {
  let user = {};

  beforeAll(async () => {
    user.name = faker.name.findName();
    user.mail = faker.internet.email();
    user.passwd = faker.internet.password(6);

    user = { ...user, ...(await insert('users', user)) };
  });

  describe('POST /login', () => {
    it('should returns a token when user exists', async () => {
      const response = await request(app)
        .post('/login')
        .send({ mail: user.mail, passwd: user.passwd });

      const { token } = response.body;

      expect(token).not.toBeUndefined();
    });
  });
});
