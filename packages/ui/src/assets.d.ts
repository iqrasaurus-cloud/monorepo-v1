// Image imports resolve to a URL string through Vite (the apps get this from vite/client).
declare module '*.webp' {
  const src: string
  export default src
}
