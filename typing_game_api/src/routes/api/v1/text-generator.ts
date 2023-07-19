import { Router } from 'express'

import { TextGenerateController } from '../../../controllers'
import { TextGeneratorService } from '../../../services'

const textController = new TextGenerateController(new TextGeneratorService())

const textGen = Router()

textGen.route('/text').get(textController.generateText)

export default textGen
