import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSwitcher from '../../app/[locale]/components/LanguageSwitcher';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
  useLocale: jest.fn(() => 'en'),
}));

// Mock i18n navigation
const mockReplace = jest.fn();
jest.mock('../../lib/i18n/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({replace: mockReplace})),
}));

// Mock @heroicons/react
jest.mock('@heroicons/react/24/solid', () => ({
  ChevronDownIcon: (props: any) => <svg data-testid="chevron-down" {...props} />,
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the translation button text', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('trad_button')).toBeInTheDocument();
  });

  it('renders the chevron down icon', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
  });

  it('opens the dropdown on click', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const button = screen.getByText('trad_button');
    await user.click(button);

    expect(screen.getByText('english')).toBeInTheDocument();
    expect(screen.getByText('francais')).toBeInTheDocument();
    expect(screen.getByText('espanol')).toBeInTheDocument();
    expect(screen.getByText('deutsch')).toBeInTheDocument();
  });

  it('calls router.replace when a language is selected', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByText('trad_button'));
    await user.click(screen.getByText('francais'));

    expect(mockReplace).toHaveBeenCalledWith('/', {locale: 'fr'});
  });

  it('calls router.replace with correct locale for each language', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByText('trad_button'));
    await user.click(screen.getByText('deutsch'));

    expect(mockReplace).toHaveBeenCalledWith('/', {locale: 'de'});
  });

  it('calls router.replace with es for espanol', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByText('trad_button'));
    await user.click(screen.getByText('espanol'));

    expect(mockReplace).toHaveBeenCalledWith('/', {locale: 'es'});
  });

  it('calls router.replace with en for english', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByText('trad_button'));
    await user.click(screen.getByText('english'));

    expect(mockReplace).toHaveBeenCalledWith('/', {locale: 'en'});
  });

  it('uses the current pathname when switching locale', async () => {
    const {usePathname} = require('../../lib/i18n/navigation');
    (usePathname as jest.Mock).mockReturnValue('/experience/some-job');

    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByText('trad_button'));
    await user.click(screen.getByText('francais'));

    expect(mockReplace).toHaveBeenCalledWith('/experience/some-job', {locale: 'fr'});
  });

  it('renders all 4 language options', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByText('trad_button'));

    expect(screen.getByText('english')).toBeInTheDocument();
    expect(screen.getByText('francais')).toBeInTheDocument();
    expect(screen.getByText('espanol')).toBeInTheDocument();
    expect(screen.getByText('deutsch')).toBeInTheDocument();
  });
});
