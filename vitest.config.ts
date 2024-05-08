import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import { config } from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    setupFiles: './__tests__/setup.ts',
    env: {
      ...config({ path: './.env.test' }).parsed,
    },
  },
  resolve: {
    alias: {
      '@/__tests__': fileURLToPath(new URL('./__tests__', import.meta.url)),
    },
  },
})
