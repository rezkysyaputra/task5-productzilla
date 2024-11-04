import request from 'supertest';
import mongoose from 'mongoose';
import { UserModel } from '../models/userModel';
import { web } from '../app/web';

const mockUser = {
  username: 'testuser',
  password: 'test123',
};

beforeAll(async () => {
  await UserModel.create(mockUser);
});

afterAll(async () => {
  await UserModel.deleteMany({});
  await mongoose.connection.close();
});

describe('API Login', () => {
  it('POST /api/login - Login berhasil dengan username dan password yang benar', async () => {
    const response = await request(web).post('/api/login').send({
      username: 'testuser',
      password: 'test123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Login berhasil');
    expect(response.body).toHaveProperty('token');
  });

  it('POST /api/login - Login gagal dengan username yang salah', async () => {
    const response = await request(web).post('/api/login').send({
      username: 'wronguser',
      password: 'test123',
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      'message',
      'Username atau password salah'
    );
  });

  it('POST /api/login - Login gagal dengan password yang salah', async () => {
    const response = await request(web).post('/api/login').send({
      username: 'testuser',
      password: 'wrongpassword',
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      'message',
      'Username atau password salah'
    );
  });

  it('POST /api/login - Login gagal dengan data yang tidak lengkap', async () => {
    const response = await request(web).post('/api/login').send({
      username: 'testuser',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Request tidak valid');
  });
});
