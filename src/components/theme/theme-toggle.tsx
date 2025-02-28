'use client';
import { MoonStar, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@ui';

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (!!localTheme || !systemTheme) return;
    setTheme(systemTheme as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemTheme]);

  if (!mounted) return null;

  const Icon = () => {
    return theme === 'light' ? <Sun className="h-6 w-6" /> : <MoonStar className="h-6 w-6" />;
  };

  return (
    <Button
      MainIcon={Icon}
      className="flex h-full w-full cursor-pointer items-center justify-center rounded-full text-alta-gray-500 border-gray-600/50 duration-200 hover:bg-gray-400/20"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    />
  );
}
