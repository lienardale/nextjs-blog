import {getTranslations} from 'next-intl/server';
import AboutHeader from '../../components/AboutHeader';
import ContactForm from '../../components/ContactForm';
import SectionLabel from '../../components/SectionLabel';

const content = {
  en: {
    title: 'My infos',
    intro: 'all you need to know to contact me :',
    contact_heading: 'Get in touch',
  },
  fr: {
    title: 'Mes infos',
    intro: 'tout ce dont vous avez besoin pour me contacter :',
    contact_heading: 'Me contacter',
  },
  de: {
    title: 'Meine Infos',
    intro: 'Alles, was Sie wissen müssen, um mich zu kontaktieren:',
    contact_heading: 'Kontakt aufnehmen',
  },
  es: {
    title: 'Mis informaciones',
    intro: 'todo lo que necesitas saber para contactar conmigo :',
    contact_heading: 'Contacto',
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function InfosPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;
  const tr = await getTranslations({locale});

  const rows = [
    {label: tr('contact_email'), value: 'alienard.dev@gmail.com', href: 'mailto:alienard.dev@gmail.com'},
    {label: tr('contact.cv_lb'), value: 'lienardale.github.io/markdown-cv', href: 'https://lienardale.github.io/markdown-cv/'},
    {label: 'LinkedIn', value: 'linkedin.com/in/alienard', href: 'https://www.linkedin.com/in/alienard/'},
  ];

  return (
    <div className="flex flex-col gap-8">
      <AboutHeader active="infos" t={tr} />

      <div className="flex flex-col gap-10 pt-2">
        <div>
          <p className="lede mb-3">{t.intro}</p>
          {rows.map((row) => {
            const external = row.href.startsWith('http');
            return (
              <a
                key={row.href}
                href={row.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="row grid-cols-[96px_minmax(0,1fr)_auto] py-3 text-[14px]"
              >
                <span className="text-[13px] text-ink-muted">{row.label}</span>
                <span className="break-words">{row.value}</span>
                <span className="text-ink-muted" aria-hidden="true">↗</span>
              </a>
            );
          })}
        </div>

        <div className="max-w-[440px]">
          <SectionLabel>{t.contact_heading}</SectionLabel>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
