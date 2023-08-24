import fs from 'fs'
import path from 'path'

import { BASE_DIR } from '../settings'

export default class TextGeneratorService {
   public readonly words: string[]

  constructor () {
    const dataPath = path.join(BASE_DIR, 'data', 'words.json')
    this.words = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  }

  async generateText (): Promise<string[]> {
    const randomText: string[] = []
    

    const randomWords = this.generateRandomWords(10)
    randomWords.forEach((words) => randomText.push(words))
    return randomText
  }

 generateRandomWords = (numWords: number): string[] => {
  const wordList = this.words
  const randomIndices = this.getRandomIndices(wordList.length, numWords)
  const randomWords = randomIndices.map((index: number): string => wordList[index])
  return randomWords
}

 getRandomIndices = (max: number, count: number): number[] => {
  const indices: number[] = []
  while (indices.length < count) {
    const randomIndex = Math.floor(Math.random() * max)
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices
}
}