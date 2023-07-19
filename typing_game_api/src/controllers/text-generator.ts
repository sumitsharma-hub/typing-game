import { type Request, type Response } from "express";

import { TextGeneratorService } from "../services";

const textService = new TextGeneratorService();

export default class TextGenerateController {
  constructor() {}

  async generateText(request: Request, response: Response): Promise<Response> {
    try {
      const data = await textService.generateText();
      if (data.length === 0 || data === undefined) {
        return response.status(500).json("something went wrong");
      }
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).json(e);
    }
  }
}
