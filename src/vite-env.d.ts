/// <reference types="vite/client" />

// Only CSS needs explicit declaration — all images/assets covered by vite/client above
declare module '*.css' {
  const content: Record<string, string>
  export default content
}