import { Application, Request, Response, NextFunction } from 'express'
import { Logger } from 'mongodb';
import { addUserModel, getSingleUserModel, getUsersModel, updateFollowingListModel, updateUserFollowModel }  from '../models/usermodel';
import { User } from '../types/users.types';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersModel()
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({msg: error})
  }
}

export const addUser = async (req: Request, res: Response) => {
  try {
    const addedUser = await addUserModel(req.body)
    res.status(201).json(addedUser)
    
  } catch (error) {
    res.status(401).json({msg: error})
  }
}

export const updateUserFollow = async (req: Request, res: Response) => {
  const { id } = req.params
  const { accountId } = req.body
  const currentFollowing: User | any = await getSingleUserModel({_id: id})
  const testfoll = currentFollowing.following

  for (let i = 0; i < testfoll.length; i++) {
    const element = testfoll[i];
    if(element === accountId) {
      testfoll.splice(i, 1);
      const newObject = {
        id, following: testfoll
      }
      const test = await updateFollowingListModel(newObject)
      res.status(200).json(test)
      
    } else {
      console.log('not following that user');
    }
  }
    try {
      console.log('npnp');
      const updatedUser = await updateUserFollowModel({id, accountId})
      res.status(200).json(updatedUser)
    } catch (error) {
      console.log(error);
      
      res.status(401).json(error)
    }

}
  