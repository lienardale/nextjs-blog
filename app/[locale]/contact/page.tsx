import {getTranslations} from 'next-intl/server';
import {Link} from '../../../lib/i18n/navigation';
import ExternalRow from '../components/ExternalRow';
import PageHeader from '../components/PageHeader';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  return {title: t('contact.title_meta')};
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  const channels = [
    {label: t('contact_email'), value: 'alienard.dev@gmail.com', href: 'mailto:alienard.dev@gmail.com'},
    {label: 'LinkedIn', value: '/in/alienard', href: 'https://www.linkedin.com/in/alienard/'},
    {label: 'GitHub', value: '/lienardale', href: 'https://github.com/lienardale'},
    {label: t('contact.cv_lb'), value: 'markdown-cv', href: 'https://lienardale.github.io/markdown-cv/'},
    {label: 'Komoot', value: 'user/1617431265877', href: 'https://www.komoot.com/user/1617431265877'},
  ];

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title={t('nav.contact')} lede={t('contact.lede')} />

      <div>
        {channels.map((channel) => (
          <ExternalRow key={channel.href} href={channel.href} className="grid-cols-[96px_minmax(0,1fr)_auto]">
            <span className="text-[13px] text-ink-muted">{channel.label}</span>
            <span className="break-words">{channel.value}</span>
          </ExternalRow>
        ))}
      </div>

      <Link href="/about_me/infos" className="link-muted self-start text-[13px]">
        {t('contact.get_in_touch')} →
      </Link>
    </div>
  );
}
