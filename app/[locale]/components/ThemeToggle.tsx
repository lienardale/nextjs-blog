'use client';

import {MoonIcon, SunIcon} from '@heroicons/react/24/outline';
import {useTranslations} from 'next-intl';
import {useLayoutEffect, useSyncExternalStore} from 'react';
import {getServerTheme, getTheme, setTheme, subscribe, syncTheme} from '../../../lib/theme';

export default function ThemeToggle() {
  const t = useTranslations('theme');
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  // Switching locale remounts the root layout, and React then resets <html>
  // to the attributes in its JSX — dropping data-palette. Put it back before
  // the browser paints.
  useLayoutEffect(() => {
    syncTheme();
  }, []);

  const label = theme === 'dark' ? t('to_light') : t('to_dark');

  return (
    <button
      type="button"
      className="theme-toggle flex size-[30px] shrink-0 items-center justify-center rounded-full border border-rule bg-transparent text-ink-soft transition-colors duration-[180ms] hover:border-ink-muted hover:text-ink"
      aria-label={label}
      title={label}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="icon-sun size-[15px]" strokeWidth={1.75} aria-hidden="true" />
      <MoonIcon className="icon-moon size-[15px]" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
