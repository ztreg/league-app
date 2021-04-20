import { addUser, getUsers }  from '../controllers/usercontroller';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', addUser)

export default usersRouter;