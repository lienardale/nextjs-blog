import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import ContactForm from '../../app/[locale]/components/ContactForm';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      contact_name: 'Name',
      contact_email: 'Email',
      contact_message: 'Message',
      contact_send: 'Send message',
      contact_sending: 'Sending...',
      contact_success: 'Message sent! Thank you.',
      contact_error: 'Something went wrong.',
    };
    return map[key] ?? key;
  },
}));

describe('ContactForm', () => {
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

  it('renders envelope icon', () => {
    render(<ContactForm />);
    expect(screen.getByTestId('envelope-icon')).toBeInTheDocument();
  });

  it('shows sending state on submit', async () => {
    // Mock fetch to hang
    global.fetch = jest.fn(() => new Promise(() => {})) as any;

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), {target: {value: 'Test'}});
    fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'test@test.com'}});
    fireEvent.change(screen.getByLabelText('Message'), {target: {value: 'Hello'}});
    fireEvent.submit(screen.getByRole('button', {name: 'Send message'}));

    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument();
    });

    (global.fetch as jest.Mock).mockRestore();
  });

  it('shows success message after successful submit', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ok: true})
    ) as any;

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), {target: {value: 'Test'}});
    fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'test@test.com'}});
    fireEvent.change(screen.getByLabelText('Message'), {target: {value: 'Hello'}});
    fireEvent.submit(screen.getByRole('button', {name: 'Send message'}));

    await waitFor(() => {
      expect(screen.getByText('Message sent! Thank you.')).toBeInTheDocument();
    });

    (global.fetch as jest.Mock).mockRestore();
  });

  it('shows error message on failed submit', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ok: false})
    ) as any;

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Name'), {target: {value: 'Test'}});
    fireEvent.change(screen.getByLabelText('Email'), {target: {value: 'test@test.com'}});
    fireEvent.change(screen.getByLabelText('Message'), {target: {value: 'Hello'}});
    fireEvent.submit(screen.getByRole('button', {name: 'Send message'}));

    await waitFor(() => {
      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    });

    (global.fetch as jest.Mock).mockRestore();
  });
});
