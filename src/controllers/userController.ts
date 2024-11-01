import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { RequestUserLogin } from '../types/userType';
import jwt from 'jsonwebtoken';

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Unique username for the user
 *         password:
 *           type: string
 *           description: Password for the user account
 *       example:
 *         username: "test"
 *         password: "test123"
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       404:
 *         description: Username atau password salah
 *       400:
 *         description: An error occurred during login
 */
export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body as RequestUserLogin;
  try {
    const user = await UserModel.findOne({ username, password });
    if (!user) {
      res.status(404).json({ message: 'Username atau password salah' });
      return;
    }
    const createToken = jwt.sign(
      user.toObject(),
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login berhasil', token: createToken });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
