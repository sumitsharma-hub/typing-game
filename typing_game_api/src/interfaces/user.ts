import { type Document } from 'mongoose'

interface IToken {
  _id?: string
  key: string
  created?: string
}

export interface ITokenDetail {
  token: string
}

export interface IUserDetail {
  email: string
  firstName: string
  lastName: string
  dateJoined: string
  isAdmin: boolean
}

export interface IUser extends Document {
  email: string
  firstName: string
  lastName: string
  password?: string
  isAdmin: boolean
  isActive: boolean
  dateJoined: string
  lastLogin?: Date | string
  profilePhoto?: string;
  token?: IToken
  validatePassword: CallableFunction
}
export interface IRegister{
  email:string
  password:string
  confirmPassword:string
}