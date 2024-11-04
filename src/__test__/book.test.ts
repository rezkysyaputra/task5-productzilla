import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UserModel } from '../models/userModel';
import { BookModel } from '../models/bookModel';
import { web } from '../app/web';

let token: string;
const mockUser = {
  _id: new mongoose.Types.ObjectId().toString(),
  username: 'testuser',
  password: 'password123',
};

beforeAll(async () => {
  const user = await UserModel.create(mockUser);
  token = jwt.sign(user.toObject(), process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
});

afterAll(async () => {
  await UserModel.deleteMany({});
  await BookModel.deleteMany({});
  await mongoose.connection.close();
});

describe('API Buku', () => {
  let bookId: string;

  it('POST /api/books - Menambahkan buku baru', async () => {
    const response = await request(web)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        code: 'BOOK123',
        title: 'Buku Baru',
        author: 'Penulis A',
        description: 'Deskripsi Buku',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      'message',
      'Buku berhasil ditambahkan'
    );
    expect(response.body.data).toHaveProperty('_id');
    bookId = response.body.data._id;
  });

  it('POST /api/books - Menambahkan buku tanpa kode', async () => {
    const response = await request(web)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Buku Tanpa Kode',
        author: 'Penulis C',
        description: 'Deskripsi Buku Tanpa Kode',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Request tidak valid');
  });

  it('POST /api/books - Menambahkan buku dengan kode yang sudah ada', async () => {
    await request(web)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        code: 'BOOK123',
        title: 'Buku Baru',
        author: 'Penulis A',
        description: 'Deskripsi Buku',
      });

    const response = await request(web)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        code: 'BOOK123',
        title: 'Buku Duplikat',
        author: 'Penulis D',
        description: 'Deskripsi Buku Duplikat',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Kode sudah tersedia!');
  });

  it('GET /api/books - Mendapatkan semua buku', async () => {
    const response = await request(web)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/books/:id - Mendapatkan buku berdasarkan ID', async () => {
    const response = await request(web)
      .get(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('_id', bookId);
    expect(response.body.data).toHaveProperty('code');
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data).toHaveProperty('author');
    expect(response.body.data).toHaveProperty('description');
  });

  it('GET /api/books/:id - Mendapatkan buku berdasarkan ID yang tidak valid', async () => {
    const response = await request(web)
      .get('/api/books/invalidId')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Buku tidak ditemukan');
  });

  it('PATCH /api/books/:id - Memperbarui buku berdasarkan ID yang tidak ada', async () => {
    const response = await request(web)
      .patch(`/api/books/${new mongoose.Types.ObjectId()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Buku Update Tidak Ada',
        author: 'Penulis E',
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Buku tidak ditemukan');
  });

  it('PATCH /api/books/:id - Memperbarui buku dengan data tidak valid', async () => {
    const response = await request(web)
      .patch(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({}); // Mengirimkan data kosong

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Request tidak valid');
  });

  it('DELETE /api/books/:id - Menghapus buku berdasarkan ID', async () => {
    const response = await request(web)
      .delete(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Buku berhasil dihapus');
  });

  it('DELETE /api/books/:id - Menghapus buku berdasarkan ID yang tidak ada', async () => {
    const response = await request(web)
      .delete(`/api/books/${new mongoose.Types.ObjectId()}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Buku tidak ditemukan');
  });
});
