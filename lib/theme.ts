export type Theme = 'light' | 'dark';

export const THEME_KEY = 'al-theme';

// Inlined into <head> by ThemeScript so the palette is set before first
// paint. Plain ES5, no dependencies: stored choice first, else the OS
// preference.
export const THEME_SCRIPT = `(function(){var d=document.documentElement,s=null;try{s=localStorage.getItem('${THEME_KEY}')}catch(e){}var k=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);d.setAttribute('data-palette',k?'b':'a')})()`;

const ANIM_CLASS = 'theme-anim';
const ANIM_MS = 250;

// The choice made in this tab. Lets a toggle stick even when localStorage
// is unavailable (private mode, blocked storage).
let chosen: Theme | null = null;
const listeners = new Set<() => void>();

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): Theme {
  return typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function apply(theme: Theme) {
  document.documentElement.dataset.palette = theme === 'dark' ? 'b' : 'a';
}

export function getTheme(): Theme {
  return chosen ?? storedTheme() ?? systemTheme();
}

export function getServerTheme(): Theme {
  return 'light';
}

/** Put the current theme back on <html>. */
export function syncTheme() {
  apply(getTheme());
}

export function setTheme(theme: Theme) {
  chosen = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage unavailable: `chosen` still carries the choice for this tab.
  }

  const root = document.documentElement;
  root.classList.add(ANIM_CLASS);
  apply(theme);
  window.setTimeout(() => root.classList.remove(ANIM_CLASS), ANIM_MS);

  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);

  // Follow the OS setting and other tabs. Both are no-ops once this tab has
  // an explicit choice, because getTheme() prefers it.
  const onExternalChange = () => {
    syncTheme();
    listener();
  };
  const media =
    typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;
  media?.addEventListener('change', onExternalChange);
  window.addEventListener('storage', onExternalChange);

  return () => {
    listeners.delete(listener);
    media?.removeEventListener('change', onExternalChange);
    window.removeEventListener('storage', onExternalChange);
  };
}
