import fs from 'fs'
import path from 'path'

import { BASE_DIR } from '../settings'

export default class TextGeneratorService {
  private readonly words: string[]

  constructor () {
    const dataPath = path.join(BASE_DIR, 'data', 'words.json')
    this.words = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  }

  async generateText (): Promise<string[]> {
    console.log('this is being generate text')
    const randomText: string[] = []
    const generateRandomWords = (numWords: number): string[] => {
      const wordList = this.words
      const randomIndices = getRandomIndices(wordList.length, numWords)
      const randomWords = randomIndices.map((index: number): string => wordList[index])
      return randomWords
    }

    const getRandomIndices = (max: number, count: number): number[] => {
      const indices: number[] = []
      while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * max)
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex)
        }
      }
      return indices
    }
    const randomWords = generateRandomWords(50)
    randomWords.forEach((words) => randomText.push(words))
    return randomText
  }
}
