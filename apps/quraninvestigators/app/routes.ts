import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('journal', 'routes/journal.tsx'),
  route('journal/:slug', 'routes/journal-post.tsx'),
  route('chat', 'routes/chat.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
