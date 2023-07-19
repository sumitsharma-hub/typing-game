import { Router } from 'express'

import { TextGenerateController } from '../../../controllers'

const accountController = new TextGenerateController();

const textGen = Router()

textGen.route('/text').get(accountController.generateText)

export default textGen
