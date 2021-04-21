import {Application, Request, Response, NextFunction} from 'express'
import { addUserModel, getUsersModel }  from '../models/usermodel';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersModel(req, res)
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({msg: error})
  }
}

export const addUser = async (req: Request, res: Response) => {
  try {
    const addedUser = await addUserModel(req.body, res)
    res.status(201).json(addedUser)
    
  } catch (error) {
    res.status(401).json({msg: error})
  }
}
  