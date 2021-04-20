import {Application, Request, Response, NextFunction} from 'express'


export const getUsers = async (req: Request, res: Response) => {
  res.status(200).json({'xd': 'xd'});
}

export const addUser = async (req: Request, res: Response) => {
  res.status(201).json({'Item added:': req})
}
  