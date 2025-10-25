'use client';
import { useEffect, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState<string>('');      // render empty on server

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setTime(fmt());                                   // set after mount (client only)
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}