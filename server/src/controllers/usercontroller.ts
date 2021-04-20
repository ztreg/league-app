import {Application, Request, Response, NextFunction} from 'express'
import { addUserModel, getUsersModel }  from '../models/usermodel';

export const getUsers = async (req: Request, res: Response) => {
  const users = await getUsersModel(req, res)
  res.status(200).json(users);
}

export const addUser = async (req: Request, res: Response) => {
  const addedUser = await addUserModel(req.body, res)
  res.status(201).json(addedUser)
}
  