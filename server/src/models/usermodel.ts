import {Application, Request, Response, NextFunction} from 'express'


export const getUsersModel = async (req: Request, res: Response) => {
  res.status(200).json({'xd': 'xd'});
}

export const addUserModel = async (user: Request, res: Response) => {
  res.status(201).json({'Item added:': user})
}
  