'use client';

import {useState, type FormEvent} from 'react';
import {useTranslations} from 'next-intl';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations();
  const [status, setStatus] = useState<Status>('idle');
  const [hovered, setHovered] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/placeholder', {
        method: 'POST',
        body: data,
        headers: {Accept: 'application/json'},
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div data-testid="contact-form">
      {/* Animated envelope */}
      <div
        className="flex justify-center mb-6"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <svg
          viewBox="0 0 64 48"
          className="w-20 h-16 text-blue-500 dark:text-blue-400"
          data-testid="envelope-icon"
        >
          {/* Envelope body */}
          <rect
            x="2"
            y="12"
            width="60"
            height="34"
            rx="3"
            fill="currentColor"
            opacity={0.2}
            stroke="currentColor"
            strokeWidth={2}
          />
          {/* Envelope flap */}
          <path
            d="M2 12 L32 32 L62 12"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className={`transition-transform duration-300 origin-top ${
              hovered ? '[transform:rotateX(180deg)]' : ''
            }`}
            data-testid="envelope-flap"
          />
          {/* Envelope flap top */}
          <path
            d={hovered ? 'M2 12 L32 -4 L62 12' : 'M2 12 L32 0 L62 12'}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
      </div>

      {status === 'success' ? (
        <div className="text-center p-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <svg className="w-10 h-10 mx-auto mb-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-green-700 dark:text-green-300 font-medium">{t('contact_success')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium mb-1">
              {t('contact_name')}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium mb-1">
              {t('contact_email')}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium mb-1">
              {t('contact_message')}
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-600 dark:text-red-400 text-sm">{t('contact_error')}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            {status === 'sending' ? t('contact_sending') : t('contact_send')}
          </button>
        </form>
      )}
    </div>
  );
}
