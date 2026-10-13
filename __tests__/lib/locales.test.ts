import en from '../../locales/en/common.json';
import fr from '../../locales/fr/common.json';
import de from '../../locales/de/common.json';
import es from '../../locales/es/common.json';

type Messages = {[key: string]: string | Messages};

const locales: Record<string, Messages> = {en, fr, de, es};

function flatten(messages: Messages, prefix = ''): Record<string, string> {
  return Object.entries(messages).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') acc[path] = value;
    else Object.assign(acc, flatten(value, path));
    return acc;
  }, {});
}

const flat = Object.fromEntries(
  Object.entries(locales).map(([locale, messages]) => [locale, flatten(messages)])
);

// ICU arguments: {count}, {minutes}, {count, plural, …}
const argNames = (value: string) =>
  [...value.matchAll(/\{\s*([a-zA-Z_]+)\s*[,}]/g)].map((m) => m[1]).sort();

describe('locale files', () => {
  const reference = Object.keys(flat.en).sort();

  it.each(['fr', 'de', 'es'])('%s has exactly the same keys as en', (locale) => {
    expect(Object.keys(flat[locale]).sort()).toEqual(reference);
  });

  it.each(['fr', 'de', 'es'])('%s uses the same ICU arguments as en', (locale) => {
    const mismatched = reference.filter(
      (key) => argNames(flat[locale][key] ?? '').join() !== argNames(flat.en[key]).join()
    );
    expect(mismatched).toEqual([]);
  });

  // Strings are rendered as plain text with t(); only these may carry tags,
  // and only the rich-text tags their t.rich() call site handles.
  const RICH_TAGS: Record<string, string[]> = {'home.builtWith': ['link']};

  it.each(Object.keys(locales))('%s has no markup outside the rich-text allowlist', (locale) => {
    const offenders = Object.entries(flat[locale])
      .filter(([key, value]) => {
        const allowed = RICH_TAGS[key] ?? [];
        const tags = [...value.matchAll(/<\/?([a-zA-Z][\w-]*)[^>]*>/g)].map((m) => m[1]);
        const hasEntity = /&(#\d+|[a-zA-Z]+);/.test(value);
        return hasEntity || tags.some((tag) => !allowed.includes(tag));
      })
      .map(([key]) => key);
    expect(offenders).toEqual([]);
  });

  it.each(Object.keys(locales))('%s has no empty strings', (locale) => {
    const empty = Object.entries(flat[locale])
      .filter(([, value]) => value.trim() === '')
      .map(([key]) => key);
    expect(empty).toEqual([]);
  });
});
