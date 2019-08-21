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
      const response = await request(app).post('/users').send(user);

      expect(response.status).toBe(201);
      expect(response.body[0]).toHaveProperty('name', user.name);
    });

    it('should not insert an unnamed user', async () => {
      delete user.name;

      const response = await request(app).post('/users').send(user);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'cannot to insert an user without name');
    });

    it('should not insert an user without mail', async () => {
      delete user.mail;

      const response = await request(app).post('/users').send(user);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'cannot to insert an user without mail');
    });

    it('should not insert an user without passwd', async () => {
      delete user.passwd;

      const response = await request(app).post('/users').send(user);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'cannot to insert an user without passwd');
    });

    it('should not insert an user which mail already exists', async () => {
      await request(app).post('/users').send(user);

      const response = await request(app).post('/users').send(user);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'mail already exists');
    });
  });
});
