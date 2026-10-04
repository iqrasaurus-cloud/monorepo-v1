import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [reactRouter()],
  server: { port: Number(process.env.PORT) || 5173 },
  // Workspace packages are source-only; pre-rendering must compile them.
  ssr: { noExternal: ['@iqra/ui', '@iqra/config'] },
})
