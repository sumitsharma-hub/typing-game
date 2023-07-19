import fs from "fs";
import path from "path";

import { BASE_DIR } from "../settings";

export default class TextGeneratorService {
  private words: string[];

  constructor() {
    const dataPath = path.join(BASE_DIR, "data", "words.json");
    this.words = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  }

  async generateText(): Promise<String[]> {
    let randomText: string[] = [];
    const generateRandomWords = (numWords: number) => {
      const wordList = this.words;
      const randomIndices = getRandomIndices(wordList.length, numWords);
      const randomWords = randomIndices.map((index) => wordList[index]);
      return randomWords;
    };

    const getRandomIndices = (max: number, count: number) => {
      const indices: number[] = [];
      while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
      }
      return indices;
    };
    const randomWords = generateRandomWords(50);
    randomWords.forEach((words) => randomText.push(words));
    return randomText;
  }
}
