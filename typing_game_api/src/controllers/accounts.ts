import { type Request, type Response } from 'express'

import { type ILogin } from '../interfaces/login'
import { type ITokenDetail, type IUserDetail } from '../interfaces/user'
import { AccountService } from '../services'
import { loginSchema } from '../validators'

const accountService: AccountService = new AccountService()

export default class AccountController {
  async login (request: Request, response: Response): Promise<Response> {
    try {
      const validatedData: ILogin = await loginSchema.validateAsync(request.body)
      const data: ITokenDetail | null = await accountService.performLogin(validatedData)

      if (data == null) {
        return response.status(401).json({ detail: 'Invalid credentials!' })
      }
      return response.status(201).json(data)
    } catch (error) {
      console.log(error)
      return response.status(400).json(error)
    }
  }

  async detail (request: Request, response: Response): Promise<Response> {
    if (request.user == null) {
      return response.status(401).json({ detail: 'Unauthorized' })
    }
    const data: IUserDetail = await accountService.retrieveDetails(request.user)
    return response.status(200).json(data)
  }

  async logout (request: Request, response: Response): Promise<Response> {
    if (request.user == null) {
      return response.status(401).json({ detail: 'Unauthorized' })
    }
    const data: {} = await accountService.performLogout(request.user)
    return response.status(204).json(data)
  }
}
