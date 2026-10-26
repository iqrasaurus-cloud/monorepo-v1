import { index, prefix, route, type RouteConfig } from '@react-router/dev/routes'

// Every page twice: in English, and in Malay under /ms (owner decision 2026-10-12).
const pages = (id: string) => [
  index('routes/home.tsx', { id: `${id}home` }),
  route('about', 'routes/about.tsx', { id: `${id}about` }),
  route('work-with-us', 'routes/work-with-us.tsx', { id: `${id}work-with-us` }),
  route('ai', 'routes/ai.tsx', { id: `${id}ai` }),
  route('journal', 'routes/journal.tsx', { id: `${id}journal` }),
  route('journal/:slug', 'routes/journal-post.tsx', { id: `${id}journal-post` }),
  route('love', 'routes/love.tsx', { id: `${id}love` }),
]

export default [
  ...pages(''),
  ...prefix('ms', pages('ms-')),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
