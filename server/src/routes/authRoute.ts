import { Router } from 'express';
import { loginController } from '../controllers/authcontroller';

const authRouter = Router();

authRouter.post('/login', loginController)

export default authRouter;