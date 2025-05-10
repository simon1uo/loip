import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    UnoCSS(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      staticImport: true,
    }),
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
