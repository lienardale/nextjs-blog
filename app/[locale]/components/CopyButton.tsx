'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

const COPIED_MS = 1400;

export default function CopyButton({code}: {code: string}) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_MS);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md border border-rule bg-transparent px-2 py-0.5 font-mono text-[11px] text-ink-muted transition-colors duration-[180ms] hover:border-ink-muted hover:text-ink"
    >
      <span aria-live="polite">{copied ? t('code_copied') : t('code_copy')}</span>
    </button>
  );
}
