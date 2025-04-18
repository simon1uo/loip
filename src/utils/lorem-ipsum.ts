// Data for lorem ipsum generation
// Import types from types directory
import type { Gender, Language, LoremIpsumOptions } from '../types/lorem-ipsum'
// Import Chinese data
import { chineseFemaleNames, chineseMaleNames, chineseSurnames, chineseUsernameAdjectives, chineseUsernameNouns } from './chinese-data'
// Import Chinese pinyin data for usernames
import { chinesePinyinAdjectives, chinesePinyinNouns } from './chinese-pinyin-data'
// Import English data
import { englishFemaleNames, englishMaleNames, englishSurnames, englishUsernameAdjectives, englishUsernameNouns } from './english-data'

const words = [
  'a',
  'ac',
  'accumsan',
  'ad',
  'adipiscing',
  'aenean',
  'aliquam',
  'aliquet',
  'amet',
  'ante',
  'aptent',
  'arcu',
  'at',
  'auctor',
  'augue',
  'bibendum',
  'blandit',
  'congue',
  'consectetur',
  'consequat',
  'convallis',
  'cras',
  'cubilia',
  'curabitur',
  'curae',
  'cursus',
  'dapibus',
  'diam',
  'dictum',
  'dignissim',
  'dis',
  'dolor',
  'donec',
  'dui',
  'duis',
  'efficitur',
  'egestas',
  'eget',
  'eleifend',
  'elementum',
  'elit',
  'enim',
  'erat',
  'eros',
  'est',
  'et',
  'etiam',
  'eu',
  'euismod',
  'facilisi',
  'facilisis',
  'fames',
  'faucibus',
  'felis',
  'fermentum',
  'feugiat',
  'fringilla',
  'fusce',
  'gravida',
  'habitant',
  'habitasse',
  'hendrerit',
  'himenaeos',
  'iaculis',
  'id',
  'imperdiet',
  'in',
  'inceptos',
  'integer',
  'interdum',
  'ipsum',
  'justo',
  'lacinia',
  'lacus',
  'laoreet',
  'lectus',
  'leo',
  'libero',
  'ligula',
  'litora',
  'lobortis',
  'lorem',
  'luctus',
  'magna',
  'magnis',
  'maecenas',
  'malesuada',
  'massa',
  'mattis',
  'mauris',
  'maximus',
  'metus',
  'mi',
  'molestie',
  'mollis',
  'montes',
  'morbi',
  'nam',
  'nascetur',
  'natoque',
  'nec',
  'neque',
  'netus',
  'nibh',
  'nisi',
  'nisl',
  'non',
  'nostra',
  'nulla',
  'nullam',
  'nunc',
  'odio',
  'orci',
  'ornare',
  'parturient',
  'pellentesque',
  'penatibus',
  'per',
  'pharetra',
  'phasellus',
  'placerat',
  'platea',
  'porta',
  'porttitor',
  'posuere',
  'potenti',
  'praesent',
  'pretium',
  'primis',
  'proin',
  'pulvinar',
  'purus',
  'quam',
  'quis',
  'quisque',
  'rhoncus',
  'ridiculus',
  'risus',
  'rutrum',
  'sagittis',
  'sapien',
  'scelerisque',
  'sed',
  'sem',
  'semper',
  'senectus',
  'sit',
  'sociosqu',
  'sodales',
  'sollicitudin',
  'suscipit',
  'suspendisse',
  'taciti',
  'tellus',
  'tempor',
  'tempus',
  'tincidunt',
  'torquent',
  'tortor',
  'tristique',
  'turpis',
  'ullamcorper',
  'ultrices',
  'ultricies',
  'urna',
  'ut',
  'varius',
  'vehicula',
  'vel',
  'velit',
  'venenatis',
  'vestibulum',
  'vitae',
  'vivamus',
  'viverra',
  'volutpat',
  'vulputate',
]

// Names for avatar generation are now imported from english-data.ts and chinese-data.ts

// Helper functions
function getRandomInt(min: number, max: number, useRandom: boolean = true): number {
  const randomValue = useRandom ? Math.random() : 0.5
  return Math.floor(randomValue * (max - min + 1)) + min
}

function getRandomElement<T>(array: T[], useRandom: boolean = true): T {
  return array[getRandomInt(0, array.length - 1, useRandom)]
}

function getRandomWord(useRandom: boolean = true): string {
  return getRandomElement(words, useRandom)
}

// Main functions for lorem ipsum generation
export function loremIpsum(options: LoremIpsumOptions = {}): string[] {
  const {
    p = 1,
    avgWordsPerSentence = 8,
    avgSentencesPerParagraph = 8,
    startWithLoremIpsum = true,
    random = true,
  } = options

  const paragraphs: string[] = []

  for (let i = 0; i < p; i++) {
    const sentences: string[] = []
    const sentenceCount = getRandomInt(
      Math.floor(avgSentencesPerParagraph * 0.75),
      Math.ceil(avgSentencesPerParagraph * 1.25),
      random,
    )

    for (let j = 0; j < sentenceCount; j++) {
      let sentence: string[] = []
      const wordCount = getRandomInt(
        Math.floor(avgWordsPerSentence * 0.75),
        Math.ceil(avgWordsPerSentence * 1.25),
        random,
      )

      // Start with 'Lorem ipsum dolor sit amet' for the first sentence of the first paragraph
      if (i === 0 && j === 0 && startWithLoremIpsum) {
        sentence = ['Lorem', 'ipsum', 'odor', 'amet', 'consectetuer', 'adipiscing', 'elit']

        // Add more random words if needed
        for (let k = sentence.length; k < wordCount; k++) {
          sentence.push(getRandomWord(random))
        }
      }
      else {
        // Generate a random sentence
        for (let k = 0; k < wordCount; k++) {
          sentence.push(getRandomWord(random))
        }
      }

      // Capitalize first letter of the sentence
      sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1)

      // Add punctuation
      const punctuation = getRandomInt(1, 10, random) <= 8 ? '.' : getRandomInt(1, 10, random) <= 5 ? ';' : '?'

      sentences.push(sentence.join(' ') + punctuation)
    }

    paragraphs.push(sentences.join(' '))
  }

  return paragraphs
}

// Avatar and name generation functions
export function name(gender: Gender = 'all', language: Language = 'en'): string {
  if (language === 'en') {
    if (gender === 'male') {
      return getRandomElement(englishMaleNames)
    }
    else if (gender === 'female') {
      return getRandomElement(englishFemaleNames)
    }
    else {
      return getRandomElement([...englishMaleNames, ...englishFemaleNames])
    }
  }
  else { // Chinese names
    if (gender === 'male') {
      return getRandomElement(chineseMaleNames)
    }
    else if (gender === 'female') {
      return getRandomElement(chineseFemaleNames)
    }
    else {
      return getRandomElement([...chineseMaleNames, ...chineseFemaleNames])
    }
  }
}

export function surname(language: Language = 'en'): string {
  return language === 'en'
    ? getRandomElement(englishSurnames)
    : getRandomElement(chineseSurnames)
}

export function fullname(gender: Gender = 'all', language: Language = 'en'): string {
  if (language === 'en') {
    const firstName = name(gender, language)
    const middleInitial = String.fromCharCode(65 + getRandomInt(0, 25))
    const lastName = surname(language)

    return getRandomInt(1, 10) <= 3
      ? `${firstName} ${middleInitial}. ${lastName}`
      : `${firstName} ${lastName}`
  }
  else { // Chinese names
    // In Chinese, surname comes first followed by given name
    const lastName = surname(language)
    const firstName = name(gender, language)
    return `${lastName}${firstName}`
  }
}

export function username(language: Language = 'en'): string {
  if (language === 'en') {
    const adjective = getRandomElement(englishUsernameAdjectives)
    const noun = getRandomElement(englishUsernameNouns)
    const number = getRandomInt(1, 99)

    const formats = [
      `${adjective}_${noun}`,
      `${adjective}.${noun}.${number}`,
      `${adjective}${noun}${number}`,
      `${noun}_${adjective}`,
      `${adjective}_${noun}_${number}`,
    ]

    return getRandomElement(formats)
  }
  else { // Chinese usernames with pinyin (romanized) characters
    // Get the index of a random Chinese adjective and noun
    const adjectiveIndex = getRandomInt(0, chineseUsernameAdjectives.length - 1)
    const nounIndex = getRandomInt(0, chineseUsernameNouns.length - 1)

    // Use the same index to get the corresponding pinyin
    const adjective = chinesePinyinAdjectives[adjectiveIndex]
    const noun = chinesePinyinNouns[nounIndex]
    const number = getRandomInt(1, 99)

    const formats = [
      `${adjective}_${noun}`,
      `${adjective}${noun}${number}`,
      `${noun}_${adjective}`,
      `${adjective}.${noun}`,
      `${noun}${adjective}${number}`,
    ]

    return getRandomElement(formats)
  }
}

// Avatar URL generation
export function avatarUrl(gender: Gender = 'all', _language: Language = 'en'): string {
  // We use the same avatar service for both languages since it's just placeholder images
  const actualGender = gender === 'all' ? (getRandomInt(0, 1) === 0 ? 'male' : 'female') : gender
  const id = getRandomInt(1, 99)

  return `https://randomuser.me/api/portraits/${actualGender === 'male' ? 'men' : 'women'}/${id}.jpg`
}
