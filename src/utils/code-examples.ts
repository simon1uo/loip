// Code examples for the demo page

export const loremIpsumBasic = `import { LoremIpsum } from 'loip'

<LoremIpsum :p="2" />`

export const loremIpsumWithOptions = `<LoremIpsum
  :p="3"
  :avg-words-per-sentence="10"
  :avg-sentences-per-paragraph="5"
  :start-with-lorem-ipsum="true"
  :random="true"
/>`

export const loremIpsumFunction = `import { loremIpsum } from 'loip'

// Generate 2 paragraphs of lorem ipsum text
const paragraphs = loremIpsum({ p: 2 })

// Display the paragraphs
paragraphs.forEach(paragraph => {
  console.log(paragraph)
})`

export const avatarComponent = `import { Avatar } from 'loip'

// Male avatar
<Avatar gender="male" class="w-12 h-12 rounded-full" />

// Female avatar
<Avatar gender="female" class="w-12 h-12 rounded-full" />

// Random gender avatar
<Avatar gender="all" class="w-12 h-12 rounded-full" />

// With key prop for refreshing when data changes
<Avatar :key="userAvatarKey" gender="male" class="w-12 h-12 rounded-full" />`

export const nameFunctions = `import { name, surname, fullname, username } from 'loip'

// Generate random names
const maleName = name('male')       // e.g. "John"
const femaleName = name('female')   // e.g. "Mary"
const randomName = name()           // e.g. "David" or "Susan"

// Generate random surname
const lastName = surname()          // e.g. "Smith"

// Generate random full names
const maleFullName = fullname('male')       // e.g. "Michael Johnson"
const femaleFullName = fullname('female')   // e.g. "Jennifer Wilson"
const randomFullName = fullname()           // e.g. "Thomas Brown" or "Lisa Davis"`

export const usernameAndAvatarUrl = `import { username, avatarUrl } from 'loip'

// Generate random username
const user = username()  // e.g. "cool_ninja42" or "happy.tiger.7"

// Generate avatar URLs
const maleAvatarUrl = avatarUrl('male')     // URL to a male avatar image
const femaleAvatarUrl = avatarUrl('female') // URL to a female avatar image
const randomAvatarUrl = avatarUrl()         // URL to a random gender avatar image`
