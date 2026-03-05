import {getNavItems} from '../../../lib/registry';
import CategoryNav from '../components/CategoryNav';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function AboutMeLayout({children, params}: Props) {
  const {locale} = await params;
  const items = getNavItems('about_me', locale);

  return (
    <>
      <CategoryNav items={items} baseDir="about_me" />
      {children}
    </>
  );
}
