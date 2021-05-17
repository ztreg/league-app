import {Request, Response} from 'express'
import {loginModel} from '../models/authmodel'

export const loginController = async (req: Request, res: Response) => {
  try {
    const response = await loginModel(req.body)
    if(response.token) {
        console.log(response)
        res.status(200).json(response)
    } else {
        res.status(401).json({msg: response.msg})
    }
  } catch (error) {
    res.status(500).json({msg: error})
  }
}


// module.exports = {
//     checkToken: async(req: Request, res: Response) => {
//         // console.log(req.user.username)
//         // const response = {
//         //     isLoggedIn : true,
//         //     userid: req.user.userId,
//         //     role: req.user.role,
//         //     username: req.user.username,
//         //     test: 'test'
//         // }
//         // res.status(200).json(response)
//     }
// }