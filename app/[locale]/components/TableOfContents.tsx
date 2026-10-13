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

// Inline, collapsible "On this page" box, open by default. Built from the
// h2/h3 headings of the page's <article>.
export default function TableOfContents() {
  const t = useTranslations();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);
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
      {rootMargin: '-24px 0px -60% 0px', threshold: 0}
    );

    elements.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-lg border border-rule px-4 py-3" aria-label={t('toc')}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="section-label flex w-full items-center justify-between"
        aria-expanded={isOpen}
      >
        {t('toc_toggle')}
        <span
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      {isOpen && (
        <ul className="flex flex-col gap-1.5 pt-2.5">
          {headings.map((h) => (
            <li key={h.id} data-level={h.level} className={h.level === 3 ? 'pl-[14px]' : undefined}>
              <a
                href={`#${h.id}`}
                className={`text-[13px] transition-colors duration-[180ms] hover:text-accent ${
                  activeId === h.id ? 'text-ink' : 'text-ink-soft'
                }`}
                aria-current={activeId === h.id ? 'location' : undefined}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
