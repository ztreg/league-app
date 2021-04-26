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
  const res = await dbFile.User.findOne({summonerName})
  console.log(res);
  return res
  
}

export const addUserModel = async (user: any) => {
  user.password = await hashPW(user.password)
  const addedUser = await dbFile.User.create(user)
  return addedUser
}

export const updateUserFollowModel = async (userObject: any) => {
  const {id, accountId} = userObject
  return await dbFile.User.updateOne(
      { _id: id }, 
      { $push: { following: accountId } }
  );

}

