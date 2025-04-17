import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    UnoCSS(),
  ],
  build: mode === 'demo' ? {
    // Demo build configuration for Vercel deployment
    outDir: 'dist-demo',
    emptyOutDir: true,
  } : {
    // Library build configuration
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Loip',
      fileName: format => `loip.${format}.js`,
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
}))
