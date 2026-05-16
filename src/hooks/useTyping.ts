import { useState, useEffect } from 'react'

const ROLES: string[] = [
  'Full Stack Developer',
  'React & Spring Boot Engineer',
  'React Native Developer',
  'Java Backend Architect',
  'System Designer & Builder',
]

export function useTyping(): string {
  const [idx, setIdx]   = useState<number>(0)
  const [text, setText] = useState<string>('')
  const [del, setDel]   = useState<boolean>(false)

  useEffect(() => {
    const role = ROLES[idx]
    let t: ReturnType<typeof setTimeout>

    if (!del && text.length < role.length)
      t = setTimeout(() => setText(role.slice(0, text.length + 1)), 68)
    else if (!del && text.length === role.length)
      t = setTimeout(() => setDel(true), 2600)
    else if (del && text.length > 0)
      t = setTimeout(() => setText(role.slice(0, text.length - 1)), 32)
    else if (del && text.length === 0) {
      setDel(false)
      setIdx((i) => (i + 1) % ROLES.length)
    }

    return () => clearTimeout(t)
  }, [text, del, idx])

  return text
}