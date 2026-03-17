'use client';

import {useState} from 'react';
import {ClipboardIcon, CheckIcon} from '@heroicons/react/24/outline';

export default function CopyButton({code}: {code: string}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-green-500" />
      ) : (
        <ClipboardIcon className="h-4 w-4 text-gray-400" />
      )}
    </button>
  );
}
