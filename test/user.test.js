const request = require('supertest');
const faker = require('faker');
const app = require('../src/app');

describe('user-related routes', () => {
  describe('GET /users', () => {
    it('should list all users', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /users', () => {
    const user = {};

    beforeEach(() => {
      user.name = faker.name.findName();
      user.mail = faker.internet.email();
      user.passwd = faker.internet.password(6);
    });

    it('should insert an user', async () => {
      const response = await request(app)
        .post('/users')
        .send(user);

      expect(response.status).toBe(201);
      expect(response.body[0]).toHaveProperty('name', user.name);
    });
  });
});
