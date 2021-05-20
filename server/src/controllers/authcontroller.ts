import {Request, Response} from 'express'
import {loginModel} from '../models/authmodel'
import { validateAddUsersSchema } from '../utils/dataValidation'

export const loginController = async (req: Request, res: Response) => {
  try {
    await validateAddUsersSchema().validateAsync(req.body)
    if(req.body) {
      req.body.summonerName = req.body.summonerName.toLowerCase()
    }
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
