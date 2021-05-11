import { Application, Request, Response, NextFunction } from 'express'
import { addUserModel, getUsersModel, updateUserFollowModel }  from '../models/usermodel';

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

  try {
    const updatedUser = await updateUserFollowModel({id, accountId})
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(401).json(error)
  }
}
  