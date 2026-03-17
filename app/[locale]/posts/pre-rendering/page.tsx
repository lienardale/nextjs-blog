import Header from '../../components/Header';
import CodeBlock from '../../components/CodeBlock';
import ReadingTime from '../../components/ReadingTime';
import TableOfContents from '../../components/TableOfContents';
import RelatedPosts from '../../components/RelatedPosts';

const ssgCode = `// Static Generation: HTML is generated at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}`;

const ssrCode = `// Server-side Rendering: HTML is generated on each request
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const data = await fetchLiveData();
  return <div>{data.map(item => <Card key={item.id} {...item} />)}</div>;
}`;

const content = {
  en: {
    title: 'Two Forms of Pre-rendering',
    readingTime: 2,
    body: (
      <>
        <p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li>
          <li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li>
        </ul>
        <p>Here is an example of Static Generation with the App Router:</p>
        <CodeBlock code={ssgCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />
        <p>And here is how Server-side Rendering looks:</p>
        <CodeBlock code={ssrCode} lang="typescript" filename="app/dashboard/page.tsx" />
        <p>Importantly, Next.js lets you <strong>choose</strong> which pre-rendering form to use for each page. You can create a &ldquo;hybrid&rdquo; Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>
      </>
    ),
  },
  fr: {
    title: 'Deux formes de pré-rendering',
    readingTime: 2,
    body: (
      <>
        <p>Next.js propose deux formes de pré-rendu : <strong>Génération statique</strong> et <strong>Rendu côté serveur</strong>. La différence réside dans le <strong>quand</strong> il génère le HTML d&apos;une page.</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>La <strong>Génération statique</strong> est la méthode de prérendu qui génère le HTML au <strong>temps de construction</strong>. Le HTML pré-rendu est ensuite <em>réutilisé</em> à chaque requête.</li>
          <li><strong>Rendu côté serveur</strong> est la méthode de pré-rendu qui génère le HTML à <strong>chaque requête</strong>.</li>
        </ul>
        <p>Voici un exemple de génération statique avec l&apos;App Router :</p>
        <CodeBlock code={ssgCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />
        <p>Et voici le rendu côté serveur :</p>
        <CodeBlock code={ssrCode} lang="typescript" filename="app/dashboard/page.tsx" />
        <p>Il est important de noter que Next.js vous permet de <strong>choisir</strong> la forme de pré-rendu à utiliser pour chaque page. Vous pouvez créer une application Next.js &laquo;hybride&raquo; en utilisant la génération statique pour la plupart des pages et le rendu côté serveur pour les autres.</p>
      </>
    ),
  },
  de: {
    title: 'Zwei Formen des Pre-Rendering',
    readingTime: 2,
    body: (
      <>
        <p>Next.js verfügt über zwei Formen des Pre-Rendering: <strong>Statische Generierung</strong> und <strong>Server-seitiges Rendering</strong>. Der Unterschied liegt darin, <strong>wann</strong> das HTML für eine Seite generiert wird.</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li><strong>Statische Generierung</strong> ist die Pre-Rendering-Methode, die das HTML zur <strong>Erstellungszeit</strong> generiert. Das vorgerenderte HTML wird dann bei jeder Anfrage <em>wiederverwendet</em>.</li>
          <li><strong>Server-side Rendering</strong> ist die Vor-Rendering-Methode, die das HTML bei <strong>jeder Anfrage</strong> generiert.</li>
        </ul>
        <p>Hier ist ein Beispiel für statische Generierung mit dem App Router:</p>
        <CodeBlock code={ssgCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />
        <p>Und so sieht Server-side Rendering aus:</p>
        <CodeBlock code={ssrCode} lang="typescript" filename="app/dashboard/page.tsx" />
        <p>Wichtig ist, dass Sie mit Next.js <strong>wählen</strong> können, welche Form des Pre-Rendering Sie für jede Seite verwenden möchten. Sie können eine &bdquo;hybride&ldquo; Next.js-Anwendung erstellen, indem Sie für die meisten Seiten die statische Generierung und für andere das serverseitige Rendering verwenden.</p>
      </>
    ),
  },
  es: {
    title: 'Dos formas de pre-renderización',
    readingTime: 2,
    body: (
      <>
        <p>Next.js tiene dos formas de pre-renderización: <strong>Generación estática</strong> y <strong>Renderización del lado del servidor</strong>. La diferencia está en <strong>cuándo</strong> se genera el HTML de una página.</p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>La <strong>Generación Estática</strong> es el método de pre-renderización que genera el HTML en <strong>tiempo de construcción</strong>. El HTML pre-renderizado es entonces <em>reutilizado</em> en cada petición.</li>
          <li><strong>Renderizado del lado del servidor</strong> es el método de pre-renderizado que genera el HTML en <strong>cada petición</strong>.</li>
        </ul>
        <p>Aquí hay un ejemplo de Generación Estática con el App Router:</p>
        <CodeBlock code={ssgCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />
        <p>Y así es como se ve la Renderización del Lado del Servidor:</p>
        <CodeBlock code={ssrCode} lang="typescript" filename="app/dashboard/page.tsx" />
        <p>Es importante destacar que Next.js te permite <strong>elegir</strong> qué forma de pre-renderización utilizar para cada página. Puedes crear una aplicación Next.js &ldquo;híbrida&rdquo; utilizando Generación Estática para la mayoría de las páginas y utilizando Renderización del Lado del Servidor para otras.</p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function PreRenderingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <Header />
      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">{t.title}</h1>
        <div className="flex items-center gap-3 text-gray-500 mb-6">
          <span>2020-01-01</span>
          <ReadingTime minutes={t.readingTime} />
        </div>
        <TableOfContents />
        <div className="prose">{t.body}</div>
      </article>
      <RelatedPosts postId="pre-rendering" locale={locale} />
    </>
  );
}
