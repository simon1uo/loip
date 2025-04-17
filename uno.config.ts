import { defineConfig, presetAttributify, presetIcons, presetWebFonts, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        lucide: () => import('@iconify-json/lucide/icons.json').then(i => i.default),
      },
    }),
    presetWind3(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'Roboto',
        serif: 'Roboto Slab',
        mono: 'Roboto Mono',
      },
    }),
  ],
  theme: {
    colors: {
      primary: '#3498db',
      secondary: '#2ecc71',
      dark: '#2c3e50',
    },
    breakpoints: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
})
