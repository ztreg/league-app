import {Request, Response} from 'express'
import {loginModel} from '../models/authmodel'

export const loginController = async (req: Request, res: Response) => {
  try {
    const response = await loginModel(req.body)
    if(response.token) {
        res.status(200).json(response)
    } else {
        res.status(401).json({msg: response.msg})
    }
  } catch (error) {
    res.status(500).json({msg: error})
  }
}
