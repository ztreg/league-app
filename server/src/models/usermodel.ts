import {Application, Request, Response, NextFunction} from 'express'
import { FilterQuery } from 'mongoose';
import dbFile from '../database/mongodb'

export const getUsersModel = async (req: Request, res: Response) => {
  res.status(200).json({'xd': 'xd'});
}

// export const getSingleUserModel = async(userObject: any): Promise<any> => {
//   return {summonerName: 'Ztreg', password: 'hejsan'}
// }

export const getSingleUserModel = async(summonerName: any) => {
  return await dbFile.User.findOne({summonerName})
}

export const addUserModel = async (user: Request, res: Response) => {
  const addedUser = await dbFile.User.create(user)
  return addedUser
}

