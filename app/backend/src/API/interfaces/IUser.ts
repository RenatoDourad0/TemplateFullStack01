import { type ObjectId } from 'mongoose';

export default interface IUser {
  _id?: ObjectId
  id?: string
  firstName: string
  lastName: string
  email: string
  password: string
}
