import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken'
const secret = process.env.SECRET

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  
  if(!req.headers.authorization) return res.status(403).json({msg:"No token"})
  const token = req.headers.authorization.replace("Bearer ", "")
  
  try {
    await verifyToken(token)
    next()
  } catch(error){
    if(error instanceof jsonwebtoken.TokenExpiredError){
       res.status(403).json({msg: "You are not logged in"})
    } else {
      res.status(403).json({error: error})
    }
  }
}

async function verifyToken (token: string): Promise<any> {
  if(secret) {
    return jsonwebtoken.verify(token, secret)
  }

}