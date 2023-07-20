import { type Request, type Response } from 'express'

import { type TextGeneratorService } from '../services'

export default class TextGeneratorController {
  constructor (private readonly textService: TextGeneratorService) {}

  async generateText (request: Request, response: Response): Promise<Response> {
    try {
      const data = await this.textService.generateText()
      if (data.length === 0 || data === undefined) {
        return response.status(500).json('something went wrong')
      }
      return response.status(200).json(data)
    } catch (e) {
      return response.status(400).json(e)
    }
  }
}
