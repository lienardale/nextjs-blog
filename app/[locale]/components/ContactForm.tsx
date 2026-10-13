'use client';

import {useState, type FormEvent} from 'react';
import {useTranslations} from 'next-intl';

const CONTACT_EMAIL = 'alienard.dev@gmail.com';

type Status = 'idle' | 'opened';

const fieldClass =
  'w-full rounded-lg border border-rule bg-transparent px-3 py-[9px] text-[14px] text-ink outline-none transition-colors duration-[180ms] focus:border-accent';
const labelClass = 'flex flex-col gap-1.5 text-[13px] text-ink-soft';

// No backend: submitting hands the message to the visitor's own mail app as
// a prefilled email. We can't know whether they then send it, so the
// confirmation says what happened rather than claiming it was delivered.
export default function ContactForm() {
  const t = useTranslations();
  const [status, setStatus] = useState<Status>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const subject = t('contact_mail_subject', {name});
    const body = `${message}\n\n— ${name} <${email}>`;
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(href, '_self');
    setStatus('opened');
  }

  return (
    <div data-testid="contact-form">
      {status === 'opened' ? (
        <div
          className="flex flex-col items-start gap-2.5 rounded-lg border border-rule p-4 text-[14px]"
          role="status"
        >
          <span>{t('contact_mail_opened', {email: CONTACT_EMAIL})}</span>
          <button type="button" className="link-muted text-[13px]" onClick={() => setStatus('idle')}>
            {t('contact_back')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
          <label htmlFor="contact-name" className={labelClass}>
            <span>{t('contact_name')}</span>
            <input id="contact-name" name="name" type="text" required className={fieldClass} />
          </label>

          <label htmlFor="contact-email" className={labelClass}>
            <span>{t('contact_email')}</span>
            <input id="contact-email" name="email" type="email" required className={fieldClass} />
          </label>

          <label htmlFor="contact-message" className={labelClass}>
            <span>{t('contact_message')}</span>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              className={`${fieldClass} resize-y`}
            />
          </label>

          <button
            type="submit"
            className="self-start rounded-lg border border-ink bg-ink px-[18px] py-[9px] text-[14px] text-bg transition-opacity duration-[180ms] hover:opacity-85"
          >
            {t('contact_send')}
          </button>
        </form>
      )}
    </div>
  );
}
