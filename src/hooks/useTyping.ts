import { useState, useEffect } from 'react';

export function useTyping(roles: string[]): string {
  const [idx, setIdx] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [del, setDel] = useState<boolean>(false);

  // Reset when roles change (e.g. language switch)
  useEffect(() => {
    setText('');
    setIdx(0);
    setDel(false);
  }, [roles[0]]);

  useEffect(() => {
    const role = roles[idx] ?? roles[0];
    let t: ReturnType<typeof setTimeout>;

    if (!del && text.length < role.length) {
      t = setTimeout(() => setText(role.slice(0, text.length + 1)), 68);
    } else if (!del && text.length === role.length) {
      t = setTimeout(() => setDel(true), 2600);
    } else if (del && text.length > 0) {
      t = setTimeout(() => setText(role.slice(0, text.length - 1)), 32);
    } else if (del && text.length === 0) {
      setDel(false);
      setIdx((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(t);
  }, [text, del, idx, roles]);

  return text;
}