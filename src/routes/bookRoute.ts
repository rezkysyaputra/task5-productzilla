import { Router } from 'express';
import {
  createBookController,
  deleteBookController,
  getAllBooksController,
  getBookController,
  updateBookController,
} from '../controllers/bookController';
import { authMiddleware } from '../middlewares/authMiddleware';

const bookRoute: Router = Router();

bookRoute.use(authMiddleware);

bookRoute.post('/books', createBookController);
bookRoute.get('/books', getAllBooksController);
bookRoute.get('/books/:id', getBookController);
bookRoute.patch('/books/:id', updateBookController);
bookRoute.delete('/books/:id', deleteBookController);

export default bookRoute;
