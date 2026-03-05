import {getNavItems} from '../../../lib/registry';
import CategoryNav from '../components/CategoryNav';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function HobbiesLayout({children, params}: Props) {
  const {locale} = await params;
  const items = getNavItems('hobbies', locale);

  return (
    <>
      <CategoryNav items={items} baseDir="hobbies" />
      {children}
    </>
  );
}
