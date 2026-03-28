import {getTranslations} from 'next-intl/server';
import {getSortedItems} from '../../lib/registry';
import Header from './components/Header';
import ParallaxBackground from './components/ParallaxBackground';
import Section from './components/Section';
import TypingText from './components/TypingText';

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  const sections = [
    {id: '0', data: getSortedItems('experience', locale), title: t('categ0'), dir: 'experience'},
    {id: '1', data: getSortedItems('education', locale), title: t('categ1'), dir: 'education'},
    {id: '2', data: getSortedItems('skills', locale), title: t('categ2'), dir: 'skills'},
    {id: '3', data: getSortedItems('about_me', locale), title: t('categ3'), dir: 'about_me'},
    {id: '4', data: getSortedItems('hobbies', locale), title: t('categ4'), dir: 'hobbies'},
    {id: '5', data: getSortedItems('posts', locale), title: t('categ5'), dir: 'posts'},
  ];

  return (
    <>
      <Header home />
      <ParallaxBackground as="header" className="flex items-center justify-center h-30 mb-5">
        <div className="p-5 h-15 text-2xl text-white rounded-xl">
          <TypingText text={t('title')} />
        </div>
      </ParallaxBackground>
      <section className="text-lg leading-relaxed">
        <p>{t('intro')}</p>
        <p>
          {t.rich('intro1', {
            link: (chunks) => (
              <a href="https://nextjs.org/learn" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{chunks}</a>
            ),
          })}
        </p>
        <br />
        <p>{t('intro2')}</p>
        <br />
      </section>
      {sections.map(({id, data, title, dir}) => (
        <ul className="mb-5" key={id}>
          <Section data={data} title={title} dir={dir} />
        </ul>
      ))}
    </>
  );
}
