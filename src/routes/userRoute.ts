import { Router } from 'express';
import { loginController } from '../controllers/userController';

const userRoute = Router();

userRoute.post('/login', loginController);

export default userRoute;
