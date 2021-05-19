import { addUser, getUsers, updateUserFollow }  from '../controllers/usercontroller';
import { Router } from 'express';
import {authMiddleware} from '../utils/auhorization'

const usersRouter = Router();

usersRouter.post('/', addUser)
usersRouter.get('/', getUsers);
usersRouter.patch('/:id', authMiddleware, updateUserFollow);


export default usersRouter;