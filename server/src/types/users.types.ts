import { Document, Model } from "mongoose";
export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  dateOfEntry?: Date;
  lastUpdated?: Date;
}
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}

export interface User {
  following: string[]
  _id: number
  id?: string
  summonerName: string
  password?: string
}