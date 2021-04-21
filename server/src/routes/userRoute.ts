import { addUser, getUsers }  from '../controllers/usercontroller';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', addUser)
usersRouter.get('/', getUsers);


export default usersRouter;