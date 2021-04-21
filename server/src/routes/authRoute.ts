import { addUser, getUsers }  from '../controllers/usercontroller';
import { Router } from 'express';
import { loginController } from '../controllers/authcontroller';

const authRouter = Router();

authRouter.post('/login', loginController)
// usersRouter.get('/', getUsers);


export default authRouter;