import { addUser, getUsers, updateUserFollow }  from '../controllers/usercontroller';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', addUser)
usersRouter.get('/', getUsers);
usersRouter.patch('/:id', updateUserFollow);


export default usersRouter;