import { word } from "../data/words";

export class textGeneratorService {
  constructor() {}

  async GenerateText(): Promise<String[]> {
    let randomText: string[] = [];
    const generateRandomWords=(numWords: number) => {
      const wordList = word.words;
      const randomIndices = getRandomIndices(wordList.length, numWords);
      const randomWords = randomIndices.map((index) => wordList[index]);
      return randomWords;
    }

    const getRandomIndices=(max: number, count: number) => {
      const indices: number[] = [];
      while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
      }
      return indices;
    }
    const randomWords = generateRandomWords(50);
    (await randomWords).forEach((words) => randomText.push(words));
    return randomText;
  }
}
