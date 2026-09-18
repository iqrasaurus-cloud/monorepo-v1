import type { Config } from '@react-router/dev/config'

export default {
  ssr: false,
  prerender: ['/', '/journal', '/chat', '/404'],
} satisfies Config
