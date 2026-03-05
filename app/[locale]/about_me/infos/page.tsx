import Header from '../../components/Header';

const content = {
  en: {
    title: 'My infos',
    intro: 'all you need to know to contact me :',
  },
  fr: {
    title: 'Mes infos',
    intro: 'tout ce dont vous avez besoin pour me contacter :',
  },
  de: {
    title: 'Meine Infos',
    intro: 'Alles, was Sie wissen müssen, um mich zu kontaktieren:',
  },
  es: {
    title: 'Mis informaciones',
    intro: 'todo lo que necesitas saber para contactar conmigo :',
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
    <>
      <Header />
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        <div className="text-gray-500 mb-4">2022-05-12</div>
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
      </article>
    </>
  );
}
