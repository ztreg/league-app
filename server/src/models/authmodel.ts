require('dotenv').config();
import { getSingleUserModel } from './usermodel'
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
const secret = process.env.SECRET

function createToken (payload: any) {
  if(secret) {
    return jsonwebtoken.sign(payload, secret, {expiresIn : '1h'})
  }
}

export const loginModel = async (loginObject: any) => {
  try {
    const user: any = await getSingleUserModel(loginObject.summonerName)
    if(user) {
        const checkedPassword = bcrypt.compareSync(loginObject.password, user.password)
        if(checkedPassword) {
            let token = createToken({userId: user._id, summonerName: user.summonerName})
            return {token: token, summonerName: user.summonerName, id: user._id.toString()}
        } else {
            return {msg: 'wrong password'}
        }
    } else {
        return {msg: 'wrong summonerName'}
    }
  } catch (error) {
    console.log(error);
    return error
    
  }

}

