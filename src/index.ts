// Types
import type { Gender, Language, LoremIpsumOptions } from './types/lorem-ipsum'
import Avatar from './components/Avatar.vue'

// Components
import LoremIpsum from './components/LoremIpsum.vue'

// Functions
import { avatarUrl, fullname, loremIpsum, name, surname, username } from './utils/lorem-ipsum'

// Export components
export { Avatar, LoremIpsum }

// Export functions
export { avatarUrl, fullname, loremIpsum, name, surname, username }

// Export types
export type { Gender, Language, LoremIpsumOptions }

// Default export
export default {
  LoremIpsum,
  Avatar,
  loremIpsum,
  name,
  surname,
  fullname,
  username,
  avatarUrl,
}
