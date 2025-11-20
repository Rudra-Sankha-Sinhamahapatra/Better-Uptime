import request from 'supertest';

const apiUrl = 'http://localhost:3001';


const uniqueEmail = `user${Date.now()}@example.com`;

beforeAll(async() => {
  await request(apiUrl)
    .post('/admin/user-delete')
    .send({
      email: uniqueEmail
    });
})

describe('User Signup API', () => {
  it('should return 400 for invalid signup body format', async () => {
    const res = await request(apiUrl)
      .post('/user/signup')
      .send({
        email: 'invalid-email@',
        password: 'short'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should signup a new user', async () => {
    const res = await request(apiUrl)
      .post('/user/signup')
      .send({
        email: uniqueEmail,
        password: 'validPassword123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  it('should return 400 if user already exists', async () => {
    const res = await request(apiUrl)
      .post('/user/signup')
      .send({
        email: uniqueEmail,
        password: 'validPassword123'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });
});

describe('User Signin API', () => {
  it('should return 400 for invalid signin body format', async () => {
    const res = await request(apiUrl)
      .post('/user/signin')
      .send({
        email: 'wrongemail@',
        password: '123'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should return 400 for non-existing user signin attempt', async () => {
    const res = await request(apiUrl)
      .post('/user/signin')
      .send({
        email: 'nonexistentuser@example.com',
        password: 'irrelevantPassword'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'User does not exist');
  });

  it('should login an existing user', async () => {
    const res = await request(apiUrl)
      .post('/user/signin')
      .send({
        email: uniqueEmail,
        password: 'validPassword123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login successful');
    expect(res.body).toHaveProperty('token');
  });
});


afterAll(async() => {
  await request(apiUrl)
    .post('/admin/user-delete')
    .send({
      email: uniqueEmail
    });
})