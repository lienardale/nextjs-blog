import ContactForm from '../../components/ContactForm';

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

  return (
    <>      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        <p>{t.intro}</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            email : <a href="mailto:alienard.dev@gmail.com" className="text-blue-600 hover:underline">alienard.dev@gmail.com</a>
          </li>
          <li>
            <a href="https://lienardale.github.io/markdown-cv/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">CV</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/alienard/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
        </ul>

        <h2 className="text-xl font-bold mt-10 mb-4">{t.contact_heading}</h2>
        <div className="max-w-md">
          <ContactForm />
        </div>
      </article>
    </>
  );
}
