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

// Male avatar (English)
<Avatar gender="male" language="en" class="w-12 h-12 rounded-full" />

// Female avatar (Chinese)
<Avatar gender="female" language="zh" class="w-12 h-12 rounded-full" />

// Random gender avatar (default language is English)
<Avatar gender="all" class="w-12 h-12 rounded-full" />

// With key prop for refreshing when data changes
<Avatar :key="userAvatarKey" gender="male" class="w-12 h-12 rounded-full" />`

export const nameFunctions = `import { name, surname, fullname, username } from 'loip'

// Generate random names (English by default)
const maleName = name('male')                // e.g. "John"
const femaleName = name('female')            // e.g. "Mary"
const randomName = name()                    // e.g. "David" or "Susan"

// Generate Chinese names
const chineseMaleName = name('male', 'zh')   // e.g. "伟"
const chineseFemaleName = name('female', 'zh') // e.g. "芳"

// Generate random surname
const lastName = surname()                   // e.g. "Smith"
const chineseLastName = surname('zh')        // e.g. "李"

// Generate random full names
const maleFullName = fullname('male')        // e.g. "Michael Johnson"
const femaleFullName = fullname('female')    // e.g. "Jennifer Wilson"
const randomFullName = fullname()            // e.g. "Thomas Brown" or "Lisa Davis"

// Generate Chinese full names
const chineseFullName = fullname('all', 'zh') // e.g. "李伟" or "王芳"`

export const usernameAndAvatarUrl = `import { username, avatarUrl } from 'loip'

// Generate random username (English by default)
const user = username()                // e.g. "cool_ninja42" or "happy.tiger.7"

// Generate Chinese username (in pinyin/romanized form)
const chineseUser = username('zh')     // e.g. "kuaile_mao" or "chaoji_gaoshou42"

// Generate avatar URLs
const maleAvatarUrl = avatarUrl('male')     // URL to a male avatar image
const femaleAvatarUrl = avatarUrl('female') // URL to a female avatar image
const randomAvatarUrl = avatarUrl()         // URL to a random gender avatar image`
