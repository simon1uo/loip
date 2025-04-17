import { defineConfig, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons(),
  ],
  theme: {
    colors: {
      primary: '#3498db',
      secondary: '#2ecc71',
      dark: '#2c3e50',
    },
  },
})
