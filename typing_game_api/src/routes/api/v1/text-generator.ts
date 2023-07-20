import { Router } from 'express'

import { TextGeneratorController } from '../../../controllers'

const textGeneratorController = new TextGeneratorController()

const generator = Router()

generator.route('/text').get(textGeneratorController.generateText)

export default generator
