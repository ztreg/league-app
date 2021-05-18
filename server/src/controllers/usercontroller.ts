import { Request, Response, NextFunction } from 'express'
import { addUserModel, getSingleUserModel, getUsersModel, updateFollowingListModel, updateUserFollowModel }  from '../models/usermodel';
import { User } from '../types/users.types';
import { validateAddUsersSchema, validateUserId } from '../utils/dataValidation';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersModel()
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({msg: error})
  }
}

export const addUser = async (req: Request, res: Response) => {
  const allUsers: any = await getUsersModel()
  for (const user of allUsers) {
    if(user.summonerName.toLowerCase() === req.body.summonerName.toLowerCase()) {
      return res.status(403).json({status: {
        status_code: 403,
        message: 'This summoner has already a acoount on this application'
      }})
    }
  }
  try {
    await validateAddUsersSchema().validateAsync(req.body)
    const addedUser = await addUserModel(req.body)
    res.status(201).json(addedUser)
    
  } catch (error) {
    res.status(401).json(error)
  }

}

export const updateUserFollow = async (req: Request, res: Response) => {
  const { id } = req.params
  const { accountId } = req.body
  let currentlyFollowingArray = []

  try {
    await validateUserId().validateAsync(accountId)
    const currentUserData: User | any = await getSingleUserModel({_id: id})
    currentlyFollowingArray = currentUserData.following
  } catch (error) {
    return res.status(401).json(error)
  }

  for (let i = 0; i < currentlyFollowingArray.length; i++) {
    const element = currentlyFollowingArray[i];
    if(element === accountId) {
      currentlyFollowingArray.splice(i, 1);
      const newObject = {
        id, following: currentlyFollowingArray
      }
      const updatedFollowingList = await updateFollowingListModel(newObject)
      return res.status(200).json(updatedFollowingList)
      
    }
  }
    try {
      const updatedUser = await updateUserFollowModel({id, accountId})
      res.status(200).json(updatedUser)
    } catch (error) {  
      res.status(401).json(error)
    }

}
  