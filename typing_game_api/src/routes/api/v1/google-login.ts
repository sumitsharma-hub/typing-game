import { Router } from 'express'

import SessionController from '../../../controllers/session';

const sessionController=new SessionController();


const googleLogin = Router()

googleLogin.route("/sessions/oauth/google").get(sessionController.googleOauthHandler)

export default googleLogin
