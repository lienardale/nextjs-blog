import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ContactForm from '../../app/[locale]/components/ContactForm';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, values?: Record<string, string>) => {
    const map: Record<string, string> = {
      contact_name: 'Name',
      contact_email: 'Email',
      contact_message: 'Message',
      contact_send: 'Send message',
      contact_back: '← Back',
      contact_mail_subject: `Message from ${values?.name}`,
      contact_mail_opened: `Your email app should have opened. If nothing happened, write to ${values?.email}.`,
    };
    return map[key] ?? key;
  },
}));

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText('Name'), {target: {value: 'Ada Lovelace'}});
  fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'ada@test.com'}});
  fireEvent.change(screen.getByLabelText('Message'), {target: {value: 'Hello & welcome\nSecond line'}});
  fireEvent.submit(screen.getByRole('button', {name: 'Send message'}));
}

describe('ContactForm', () => {
  let openMock: jest.Mock;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    openMock = jest.fn();
    window.open = openMock;
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it('renders form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders send button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', {name: 'Send message'})).toBeInTheDocument();
  });

  it('has required attributes on fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
  });

  it('email field has type email', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('has data-testid="contact-form"', () => {
    render(<ContactForm />);
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  });

  it('opens a prefilled email to the site owner on submit', () => {
    render(<ContactForm />);
    fillAndSubmit();

    expect(openMock).toHaveBeenCalledTimes(1);
    const [href, target] = openMock.mock.calls[0];
    expect(target).toBe('_self');

    const url = new URL(href);
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe('alienard.dev@gmail.com');
    expect(url.searchParams.get('subject')).toBe('Message from Ada Lovelace');
    expect(url.searchParams.get('body')).toBe('Hello & welcome\nSecond line\n\n— Ada Lovelace <ada@test.com>');
  });

  it('posts nothing to a third party', () => {
    render(<ContactForm />);
    fillAndSubmit();

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('says the mail app was opened, without claiming the message was sent', () => {
    render(<ContactForm />);
    fillAndSubmit();

    expect(screen.getByRole('status')).toHaveTextContent(
      'Your email app should have opened. If nothing happened, write to alienard.dev@gmail.com.'
    );
    expect(screen.queryByRole('button', {name: 'Send message'})).not.toBeInTheDocument();
  });

  it('returns to an empty form with "← Back"', () => {
    render(<ContactForm />);
    fillAndSubmit();

    fireEvent.click(screen.getByRole('button', {name: '← Back'}));

    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByRole('button', {name: 'Send message'})).toBeInTheDocument();
  });
});
