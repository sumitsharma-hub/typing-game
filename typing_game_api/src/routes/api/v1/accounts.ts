import { Router } from 'express'

import { AccountController } from '../../../controllers'

const accountController = new AccountController()

const accounts = Router()
accounts.route('/login').post(accountController.login)
accounts.route('/detail').get(accountController.detail)
accounts.route('/logout').delete(accountController.logout)

export default accounts
