import {Application, Request, Response, NextFunction} from 'express'
import dbFile from '../database/mongodb'

export const getUsersModel = async (req: Request, res: Response) => {
  res.status(200).json({'xd': 'xd'});
}

export const addUserModel = async (user: Request, res: Response) => {
  const addedUser = await dbFile.User.create(user)
  return addedUser
}

