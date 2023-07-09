import { Router } from 'express'

import { AccountController } from '../../../controllers'
import { User } from '../../../models'
import { AccountService } from '../../../services'

const accountController = new AccountController(new AccountService(User))

const accounts = Router()
accounts.route('/login').post(accountController.login)
accounts.route('/detail').get(accountController.detail)
accounts.route('/logout').delete(accountController.logout)

export default accounts
