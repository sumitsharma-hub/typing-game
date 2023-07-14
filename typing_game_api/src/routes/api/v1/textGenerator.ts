import { Router } from 'express'

import { textGenerateController } from '../../../controllers/textGenerator'

const accountController = new textGenerateController();

const textGen = Router()

textGen.route('/generate').get(accountController.generateText)

export default textGen
