import { Request, Response } from 'express';
import { BookModel } from '../models/bookModel';
import { CreateBookRequest, UpdateBookRequest } from '../types/bookType';
import mongoose from 'mongoose';
/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Menambahkan buku baru
 *     description: |
 *       Untuk mengakses endpoint ini, Anda perlu mengirimkan token JWT di header Authorization.
 *       Format: `Authorization: Bearer <token>`
 *
 *       Gantilah `<token>` dengan token yang Anda dapatkan setelah berhasil login
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "B001"
 *               title:
 *                 type: string
 *                 example: "Judul Buku"
 *               author:
 *                 type: string
 *                 example: "Nama Penulis"
 *               description:
 *                 type: string
 *                 example: "Deskripsi buku"
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 *       400:
 *         description: Kesalahan dalam permintaan
 */

export const createBookController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user._id;
  console.log(userId);

  const { code, title, author, description } = req.body as CreateBookRequest;
  if (!code || !title || !author || !description) {
    res.status(400).json({ message: 'Request tidak valid' });
    return;
  }

  const codeExist = await BookModel.findOne({ code });
  if (codeExist) {
    res.status(400).json({ message: 'Kode sudah tersedia!' });
    return;
  }

  const titleExist = await BookModel.findOne({ title });
  if (titleExist) {
    res.status(400).json({ message: 'Judul sudah tersedia!' });
    return;
  }

  try {
    const book = await BookModel.create({
      user_id: userId,
      code,
      title,
      author,
      description,
    });

    res.status(201).json({ message: 'Buku berhasil ditambahkan', data: book });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Mendapatkan semua buku
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Buku ditemukan
 *       404:
 *         description: Buku tidak ditemukan
 */
export const getAllBooksController = async (req: Request, res: Response) => {
  try {
    const books = await BookModel.find();
    if (!books) {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
      return;
    }
    res.status(200).json({ message: 'Buku ditemukan', data: books });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Mendapatkan buku berdasarkan ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku yang ingin diambil
 *     responses:
 *       200:
 *         description: Buku ditemukan
 *       404:
 *         description: Buku tidak ditemukan
 */
export const getBookController = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Buku tidak ditemukan' });
    return;
  }

  try {
    const book = await BookModel.findById(id);

    if (!book) {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
      return;
    }

    res.status(200).json({ message: 'Buku ditemukan', data: book });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/books/{id}:
 *   patch:
 *     summary: Memperbarui buku berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku yang ingin diubah
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Buku berhasil diubah
 *       404:
 *         description: Buku tidak ditemukan
 */
export const updateBookController = async (req: Request, res: Response) => {
  const data: UpdateBookRequest = req.body;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Buku tidak ditemukan' });
    return;
  }

  try {
    const updatedBook = await BookModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedBook) {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
      return;
    }

    res
      .status(200)
      .json({ message: 'Buku berhasil diubah', data: updatedBook });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Menghapus buku berdasarkan ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID buku yang ingin dihapus
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *       404:
 *         description: Buku tidak ditemukan
 */
export const deleteBookController = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Buku tidak ditemukan' });
    return;
  }

  try {
    const book = await BookModel.findByIdAndDelete(id);
    if (!book) {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
      return;
    }

    res.status(200).json({ message: 'Buku berhasil dihapus' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
