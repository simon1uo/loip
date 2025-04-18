// Type definitions for lorem-ipsum utility

export interface LoremIpsumOptions {
  p?: number
  avgWordsPerSentence?: number
  avgSentencesPerParagraph?: number
  startWithLoremIpsum?: boolean
  random?: boolean
}

export type Gender = 'male' | 'female' | 'all'

export type Language = 'en' | 'zh'
