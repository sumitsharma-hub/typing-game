import { type ILogin } from '../interfaces/login'
import { type ITokenDetail, type IUser, type IUserDetail } from '../interfaces/user'
import { User } from '../models'
import { generateKey } from '../utils/token'

export default class AccountService {
  async performLogin (payload: ILogin): Promise<ITokenDetail | null> {
    const user: IUser | null = await User.findOne({ email: payload.email, isActive: true })
    if (user == null) return null
    const match: boolean = await user.validatePassword(payload.password)
    if (!match) return null
    if (user.token == null) {
      user.token = { key: generateKey() }
      user.lastLogin = new Date()
      await user.save()
    }

    return { token: user.token.key }
  }

  async retrieveDetails (user: IUser): Promise<IUserDetail> {
    const detail = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateJoined: user.dateJoined,
      isAdmin: user.isAdmin
    }
    return detail
  }

  async performLogout (user: IUser): Promise<Record<string, unknown>> {
    user.set('token', undefined, { strict: false })
    await user.save()
    return {}
  }
}
