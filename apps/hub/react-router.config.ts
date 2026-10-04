import type { Config } from '@react-router/dev/config'

export default {
  ssr: false,
  prerender: ['/', '/about', '/work-with-us', '/404'],
} satisfies Config
