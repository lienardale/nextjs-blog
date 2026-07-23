'use client';

import {useEffect, useState, useRef} from 'react';
import {useTranslations} from 'next-intl';

type Heading = {id: string; text: string; level: number};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function TableOfContents() {
  const t = useTranslations();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3');
    if (elements.length === 0) return;

    const items: Heading[] = [];
    elements.forEach((el) => {
      if (!el.id) {
        el.id = slugify(el.textContent || '');
      }
      items.push({
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      });
    });
    setHeadings(items);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {rootMargin: '-80px 0px -60% 0px', threshold: 0}
    );

    elements.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <nav
        className="hidden xl:block fixed top-24 w-56"
        style={{left: 'calc(50% + 20rem)'}}
        aria-label={t('toc')}
      >
        <p className="text-sm font-semibold text-ink mb-3">
          {t('toc')}
        </p>
        <ul className="space-y-1.5 text-sm border-l-2 border-rule">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block py-0.5 transition-colors ${
                  h.level === 3 ? 'pl-6' : 'pl-3'
                } ${
                  activeId === h.id
                    ? 'text-accent border-l-2 border-accent -ml-[2px]'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: collapsible panel */}
      <div className="xl:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
          aria-expanded={isOpen}
        >
          <svg
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {t('toc_toggle')}
        </button>
        {isOpen && (
          <nav className="mt-2 ml-2" aria-label={t('toc')}>
            <ul className="space-y-1 text-sm border-l-2 border-rule">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block py-0.5 transition-colors ${
                      h.level === 3 ? 'pl-6' : 'pl-3'
                    } ${
                      activeId === h.id
                        ? 'text-accent'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}
