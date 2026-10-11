import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { runtimeThemePlugin } from './scripts/theme-config.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), runtimeThemePlugin()],
})
