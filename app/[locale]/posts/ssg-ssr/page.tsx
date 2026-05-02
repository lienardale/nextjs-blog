import CodeBlock from '../../components/CodeBlock';
import PostDetail from '../../components/PostDetail';
import RelatedPosts from '../../components/RelatedPosts';

const hybridCode = `// Static page (default)
export default function About() {
  return <h1>About Us</h1>;
}

// Dynamic page (opt-in SSR)
export const dynamic = 'force-dynamic';
export default async function Feed() {
  const posts = await db.posts.findMany();
  return <PostList posts={posts} />;
}`;

const content = {
  en: {
    title: 'When to Use Static Generation v.s. Server-side Rendering',
    readingTime: 2,
    body: (
      <>
        <p>We recommend using <strong>Static Generation</strong> (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.</p>
        <p className="mt-4">You can use Static Generation for many types of pages, including:</p>
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>Marketing pages</li>
          <li>Blog posts</li>
          <li>E-commerce product listings</li>
          <li>Help and documentation</li>
        </ul>
        <p>You should ask yourself: &ldquo;Can I pre-render this page <strong>ahead</strong> of a user&apos;s request?&rdquo; If the answer is yes, then you should choose Static Generation.</p>
        <p className="mt-4">On the other hand, Static Generation is <strong>not</strong> a good idea if you cannot pre-render a page ahead of a user&apos;s request. Maybe your page shows frequently updated data, and the page content changes on every request.</p>
        <p className="mt-4">In that case, you can use <strong>Server-Side Rendering</strong>. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.</p>
        <p className="mt-4">Here is how you can mix both approaches in the same app:</p>
        <CodeBlock code={hybridCode} lang="typescript" filename="Hybrid approach" />
      </>
    ),
  },
  fr: {
    title: 'Quand utiliser la génération statique ou le rendu côté serveur ?',
    readingTime: 2,
    body: (
      <>
        <p>Nous recommandons d&apos;utiliser la <strong>Génération statique</strong> (avec et sans données) chaque fois que cela est possible, car votre page peut être construite une fois et servie par le CDN, ce qui la rend beaucoup plus rapide que si un serveur devait rendre la page à chaque requête.</p>
        <p className="mt-4">Vous pouvez utiliser la génération statique pour de nombreux types de pages, notamment :</p>
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>les pages de marketing</li>
          <li>les articles de blog</li>
          <li>les listes de produits de commerce électronique</li>
          <li>Aide et documentation</li>
        </ul>
        <p>Vous devez vous demander : &laquo;Puis-je pré-rendre cette page <strong>avant</strong> la demande d&apos;un utilisateur ?&raquo; Si la réponse est oui, alors vous devriez choisir la génération statique.</p>
        <p className="mt-4">En revanche, la génération statique n&apos;est <strong>pas</strong> une bonne idée si vous ne pouvez pas effectuer le rendu préalable d&apos;une page avant la demande de l&apos;utilisateur.</p>
        <p className="mt-4">Dans ce cas, vous pouvez utiliser le <strong>Rendu côté serveur</strong>. Ce sera plus lent, mais la page pré-rendue sera toujours à jour. Vous pouvez également ignorer le rendu préalable et utiliser le JavaScript côté client pour remplir les données.</p>
        <p className="mt-4">Voici comment combiner les deux approches dans la même application :</p>
        <CodeBlock code={hybridCode} lang="typescript" filename="Approche hybride" />
      </>
    ),
  },
  de: {
    title: 'Wann sollte man statische Generierung und wann serverseitiges Rendering verwenden?',
    readingTime: 2,
    body: (
      <>
        <p>Wir empfehlen die <strong>Statische Generierung</strong> (mit und ohne Daten), wann immer dies möglich ist, da Ihre Seite einmal erstellt und über das CDN bereitgestellt werden kann, was viel schneller ist, als wenn ein Server die Seite bei jeder Anfrage rendert.</p>
        <p className="mt-4">Sie können die statische Generierung für viele Arten von Seiten verwenden, darunter:</p>
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>Marketing-Seiten</li>
          <li>Blog-Beiträge</li>
          <li>E-Commerce-Produktauflistungen</li>
          <li>Hilfe und Dokumentation</li>
        </ul>
        <p>Sie sollten sich fragen: &bdquo;Kann ich diese Seite <strong>vor</strong> der Anfrage eines Benutzers rendern?&ldquo; Wenn die Antwort ja lautet, sollten Sie sich für die statische Generierung entscheiden.</p>
        <p className="mt-4">Andererseits ist die statische Generierung <strong>keine</strong> gute Idee, wenn Sie eine Seite nicht vor der Anfrage eines Benutzers rendern können.</p>
        <p className="mt-4">In diesem Fall können Sie <strong>Server-Side Rendering</strong> verwenden. Das ist zwar langsamer, aber die vorgerenderte Seite ist dann immer auf dem neuesten Stand. Oder Sie können das Pre-Rendering überspringen und Client-seitiges JavaScript zum Auffüllen der Daten verwenden.</p>
        <p className="mt-4">So können Sie beide Ansätze in derselben App kombinieren:</p>
        <CodeBlock code={hybridCode} lang="typescript" filename="Hybrider Ansatz" />
      </>
    ),
  },
  es: {
    title: 'Cuándo utilizar la generación estática frente a la renderización del lado del servidor',
    readingTime: 2,
    body: (
      <>
        <p>Recomendamos usar <strong>Generación Estática</strong> (con y sin datos) siempre que sea posible porque su página puede ser construida una vez y servida por CDN, lo que hace que sea mucho más rápido que tener un servidor renderizando la página en cada petición.</p>
        <p className="mt-4">Puede utilizar la Generación Estática para muchos tipos de páginas, incluyendo:</p>
        <ul className="list-disc pl-6 my-4 space-y-1">
          <li>Páginas de marketing</li>
          <li>Entradas de blog</li>
          <li>Listados de productos de comercio electrónico</li>
          <li>Ayuda y documentación</li>
        </ul>
        <p>Debería preguntarse: &ldquo;¿Puedo pre-renderizar esta página <strong>antes</strong> de la solicitud de un usuario?&rdquo; Si la respuesta es afirmativa, entonces debería elegir la Generación Estática.</p>
        <p className="mt-4">Por otro lado, la Generación Estática no es una buena idea si no puede pre-renderizar una página antes de que el usuario la solicite.</p>
        <p className="mt-4">En ese caso, puede utilizar el <strong>Renderizado del lado del servidor</strong>. Será más lento, pero la página pre-renderizada estará siempre actualizada. O puede omitir el pre-renderizado y utilizar JavaScript del lado del cliente para rellenar los datos.</p>
        <p className="mt-4">Así es como puede combinar ambos enfoques en la misma aplicación:</p>
        <CodeBlock code={hybridCode} lang="typescript" filename="Enfoque híbrido" />
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function SsgSsrPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <PostDetail
        postIndex="04"
        title={t.title}
        date="2020-01-02"
        readingMinutes={t.readingTime}
        body={t.body}
      />
      <div style={{maxWidth: 720, margin: '0 auto', padding: '0 36px 60px'}}>
        <RelatedPosts postId="ssg-ssr" locale={locale} />
      </div>
    </>
  );
}
