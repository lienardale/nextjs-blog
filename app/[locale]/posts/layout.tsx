import {getNavItems} from '../../../lib/registry';
import CategoryNav from '../components/CategoryNav';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function PostsLayout({children, params}: Props) {
  const {locale} = await params;
  const items = getNavItems('posts', locale);

  return (
    <>
      <CategoryNav items={items} baseDir="posts" />
      {children}
    </>
  );
}
