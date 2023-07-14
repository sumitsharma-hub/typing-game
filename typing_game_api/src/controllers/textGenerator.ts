import { type Request, type Response } from "express";

import { textGeneratorService } from "../services/textGenerator";

const textService = new textGeneratorService();

export class textGenerateController {
  constructor() {}

  async generateText(request: Request, response: Response): Promise<Response> {
    try {
      const data = await textService.GenerateText();
      if (data.length === 0 || data === undefined) {
        return response.status(500).json("something went wrong");
      }
      return response.status(200).json(data);
    } catch (e) {
      return response.status(400).json(e);
    }
  }
}
