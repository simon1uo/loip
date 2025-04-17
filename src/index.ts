// Components
import LoremIpsum from './components/LoremIpsum.vue'
import Avatar from './components/Avatar.vue'

// Functions
import { loremIpsum, name, surname, fullname, username, avatarUrl } from './utils/lorem-ipsum'

// Types
import type { LoremIpsumOptions, Gender } from './utils/lorem-ipsum'

// Export components
export { LoremIpsum, Avatar }

// Export functions
export { loremIpsum, name, surname, fullname, username, avatarUrl }

// Export types
export type { LoremIpsumOptions, Gender }

// Default export
export default {
  LoremIpsum,
  Avatar,
  loremIpsum,
  name,
  surname,
  fullname,
  username,
  avatarUrl
}
