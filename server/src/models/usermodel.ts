import {Application, Request, Response, NextFunction} from 'express'
import { FilterQuery } from 'mongoose';
import bcrypt from 'bcryptjs'
import dbFile from '../database/mongodb'

async function hashPW (password: string) {
  return bcrypt.hashSync(password, 10)
}

export const getUsersModel = async () => {
  return await dbFile.User.find({})
}


export const getSingleUserModel = async(summonerName: any) => {
  return await dbFile.User.findOne({summonerName})
}

export const addUserModel = async (user: any) => {
  user.password = await hashPW(user.password)
  const addedUser = await dbFile.User.create(user)
  return addedUser
}

