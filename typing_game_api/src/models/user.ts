import { compare, getSalt, hash } from 'bcryptjs'
import { type CallbackError, type CallbackWithoutResultAndOptionalError, Schema, model } from 'mongoose'

import { type IUser } from '../interfaces/user'

const tokenSchema: Schema = new Schema({
  key: { type: String, require: true, unique: true }
}, { timestamps: { createdAt: 'created' } })

const userSchema: Schema = new Schema({
  email: { type: String, require: true, unique: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, require: false, default: false },
  isActive: { type: Boolean, require: true, default: true },
  dateJoined: { type: Date, require: true, default: Date.now },
  lastLogin: { type: Date, require: false },
  token: { type: tokenSchema, require: false }
})

userSchema.pre(
  'save', async function (next: CallbackWithoutResultAndOptionalError
  ): Promise<void> {
    if (!this.isModified(this.password)) { next(); return }
    try {
      const salt: string = await getSalt('12')
      const hashedPassword: string = await hash(this.password, salt)
      this.password = hashedPassword
      next()
    } catch (e: unknown) {
      next(e as CallbackError)
    }
  })

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  const success: boolean = await compare(password, this.password)
  return success
}

export default model<IUser>('User', userSchema)
