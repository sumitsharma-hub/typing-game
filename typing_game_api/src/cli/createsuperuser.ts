import { hash } from 'bcryptjs'
import Joi from 'joi'
import mongoose from 'mongoose'

import { type IUser } from '../interfaces/user'
import { User } from '../models'
import { MONGO_URI, SALT } from '../settings'

const createSuperUserSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(1).required(),
  password: Joi.string().min(3).required()
})

export default async function createsuperuser (
  email: string,
  firstName: string,
  lastName: string,
  password: string
): Promise<void> {
  const args = {
    email,
    firstName,
    lastName,
    password
  }
  const validatedData = await createSuperUserSchema.validateAsync(args)
  validatedData.password = await hash(validatedData.password, SALT)
  const newUser: IUser = new User({ ...validatedData, isAdmin: true })
  await mongoose.connect(MONGO_URI)
  await newUser.save()
}
