const request = require('supertest');
const app = require('../server');

describe('Task API Authentication', () => {
  test('GET /tasks without a token should return 401', async () => {
    const response = await request(app).get('/tasks');

    expect(response.statusCode).toBe(401);

    expect(response.body.error).toBe('No token provided');
  });
});


