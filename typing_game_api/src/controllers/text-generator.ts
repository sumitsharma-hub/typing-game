import { type Request, type Response } from 'express'

import { TextGeneratorService } from '../services'

const textGeneratorService = new TextGeneratorService()

export default class TextGeneratorController {
  async generateText (request: Request, response: Response): Promise<Response> {
    try {
      const data = await textGeneratorService.generateText();
      if (data.length === 0 || data === undefined) {
        return response.status(500).json('something went wrong')
      }
      return response.status(200).json({"data":data})
    } catch (e) {
      return response.status(400).json(e);
    }
  }
}
