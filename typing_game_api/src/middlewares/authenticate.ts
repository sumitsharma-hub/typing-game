import { type Request, type Response, type NextFunction } from 'express'

import { User } from '../models'
import { type IUser } from '../interfaces/user'

const EXCLUDE_URLS = ['/api/v1/accounts/login']

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

export default async function authenticate (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | undefined> {
  if (EXCLUDE_URLS.includes(request.path)) {
    next(); return
  }
  const keyword = 'Token'
  const authorization: string | undefined = request.headers?.authorization
  if (authorization === undefined) {
    return response.status(401).json({ detail: 'Unauthorized' })
  }
  const values = authorization.split(' ')
  if (values.length !== 2) {
    return response.status(401).json({ detail: 'Unauthorized' })
  }
  if (keyword.toLowerCase() !== values[0].toLowerCase()) {
    return response.status(401).json({ detail: 'Unauthorized' })
  }
  const user: IUser | null = await User.findOne({
    'token.key': values[1]
  })
  if (user == null) {
    return response.status(403).json({ detail: 'Forbidden' })
  }
  request.user = user
  next()
}
