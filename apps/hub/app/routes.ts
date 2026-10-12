import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('work-with-us', 'routes/work-with-us.tsx'),
  route('journal', 'routes/journal.tsx'),
  route('journal/:slug', 'routes/journal-post.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
