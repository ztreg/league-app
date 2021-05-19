import { addUser, getUsers, updateUserFollow }  from '../controllers/usercontroller';
import { Router } from 'express';
import {authMiddleware} from '../utils/auhorization'

const usersRouter = Router();

usersRouter.post('/', addUser)
usersRouter.patch('/:id', updateUserFollow);


export default usersRouter;