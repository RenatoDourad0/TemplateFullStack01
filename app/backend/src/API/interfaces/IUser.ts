import type mongoose from 'mongoose';

export default interface IUser {
  _id?: mongoose.Types.ObjectId | undefined
  id?: mongoose.Types.ObjectId | undefined
  firstName: string
  lastName: string
  email: string
  password: string
  __v?: number | undefined
}
