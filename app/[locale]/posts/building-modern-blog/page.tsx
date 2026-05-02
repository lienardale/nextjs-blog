import CodeBlock from '../../components/CodeBlock';
import PostDetail from '../../components/PostDetail';
import RelatedPosts from '../../components/RelatedPosts';

const layoutCode = `// app/[locale]/layout.tsx
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}`;

const serverComponentCode = `// Server Component — runs on the server, zero client JS
export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}`;

const metadataCode = `// Dynamic metadata per page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.coverImage] },
  };
}`;

const content = {
  en: {
    title: 'Building a Modern Blog with Next.js App Router',
    readingTime: 5,
    body: (
      <>
        <p>The Next.js App Router fundamentally changes how we build web applications. With server components as the default, layouts that persist across navigation, and streaming built in, it provides a powerful foundation for content-rich sites like blogs.</p>

        <h2>Why the App Router?</h2>
        <p>The App Router introduces a file-system based routing model with nested layouts, loading states, and error boundaries. Each route segment can be a server component by default, meaning zero JavaScript is shipped to the client unless explicitly needed.</p>

        <h3>Server Components by Default</h3>
        <p>Server components run exclusively on the server. They can directly access databases, file systems, and environment variables without exposing anything to the client bundle.</p>
        <CodeBlock code={serverComponentCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />

        <h2>Route Structure</h2>
        <p>A blog built with the App Router uses a clean folder structure. Each route is a directory with a <code>page.tsx</code> file, and shared UI goes into <code>layout.tsx</code> files.</p>
        <CodeBlock code={layoutCode} lang="typescript" filename="app/[locale]/layout.tsx" />

        <h3>Dynamic Metadata</h3>
        <p>Each page can export a <code>generateMetadata</code> function for SEO-friendly titles and descriptions that are resolved at request time.</p>
        <CodeBlock code={metadataCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />

        <h2>Performance Benefits</h2>
        <p>By keeping components on the server by default, the App Router significantly reduces the client-side JavaScript bundle. Only interactive components marked with <code>&apos;use client&apos;</code> are sent to the browser, resulting in faster initial page loads and better Core Web Vitals.</p>
      </>
    ),
  },
  fr: {
    title: 'Construire un blog moderne avec le App Router de Next.js',
    readingTime: 5,
    body: (
      <>
        <p>Le App Router de Next.js change fondamentalement la manière dont nous construisons des applications web. Avec les composants serveur par défaut, des layouts persistants entre les navigations, et le streaming intégré, il fournit une base puissante pour les sites riches en contenu comme les blogs.</p>

        <h2>Pourquoi le App Router ?</h2>
        <p>Le App Router introduit un modèle de routage basé sur le système de fichiers avec des layouts imbriqués, des états de chargement et des limites d&apos;erreur. Chaque segment de route peut être un composant serveur par défaut, ce qui signifie qu&apos;aucun JavaScript n&apos;est envoyé au client sauf si c&apos;est explicitement nécessaire.</p>

        <h3>Composants serveur par défaut</h3>
        <p>Les composants serveur s&apos;exécutent exclusivement sur le serveur. Ils peuvent accéder directement aux bases de données, systèmes de fichiers et variables d&apos;environnement sans rien exposer au bundle client.</p>
        <CodeBlock code={serverComponentCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />

        <h2>Structure des routes</h2>
        <p>Un blog construit avec le App Router utilise une structure de dossiers propre. Chaque route est un répertoire avec un fichier <code>page.tsx</code>, et l&apos;UI partagée va dans les fichiers <code>layout.tsx</code>.</p>
        <CodeBlock code={layoutCode} lang="typescript" filename="app/[locale]/layout.tsx" />

        <h3>Métadonnées dynamiques</h3>
        <p>Chaque page peut exporter une fonction <code>generateMetadata</code> pour des titres et descriptions SEO-friendly résolus au moment de la requête.</p>
        <CodeBlock code={metadataCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />

        <h2>Avantages en performance</h2>
        <p>En gardant les composants côté serveur par défaut, le App Router réduit significativement le bundle JavaScript côté client. Seuls les composants interactifs marqués avec <code>&apos;use client&apos;</code> sont envoyés au navigateur, résultant en des chargements initiaux plus rapides et de meilleurs Core Web Vitals.</p>
      </>
    ),
  },
  de: {
    title: 'Einen modernen Blog mit dem Next.js App Router erstellen',
    readingTime: 5,
    body: (
      <>
        <p>Der Next.js App Router verändert grundlegend, wie wir Webanwendungen erstellen. Mit Server-Komponenten als Standard, Layouts die zwischen Navigationen bestehen bleiben, und integriertem Streaming bietet er eine leistungsstarke Grundlage für inhaltsreiche Seiten wie Blogs.</p>

        <h2>Warum der App Router?</h2>
        <p>Der App Router führt ein dateisystembasiertes Routing-Modell mit verschachtelten Layouts, Ladezuständen und Fehlergrenzen ein. Jedes Routensegment kann standardmäßig eine Server-Komponente sein, was bedeutet, dass kein JavaScript an den Client gesendet wird, es sei denn, es wird ausdrücklich benötigt.</p>

        <h3>Server-Komponenten als Standard</h3>
        <p>Server-Komponenten laufen ausschließlich auf dem Server. Sie können direkt auf Datenbanken, Dateisysteme und Umgebungsvariablen zugreifen, ohne etwas im Client-Bundle offenzulegen.</p>
        <CodeBlock code={serverComponentCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />

        <h2>Routenstruktur</h2>
        <p>Ein mit dem App Router erstellter Blog verwendet eine saubere Ordnerstruktur. Jede Route ist ein Verzeichnis mit einer <code>page.tsx</code>-Datei, und gemeinsam genutzte UI kommt in <code>layout.tsx</code>-Dateien.</p>
        <CodeBlock code={layoutCode} lang="typescript" filename="app/[locale]/layout.tsx" />

        <h3>Dynamische Metadaten</h3>
        <p>Jede Seite kann eine <code>generateMetadata</code>-Funktion exportieren für SEO-freundliche Titel und Beschreibungen, die zur Anfragezeit aufgelöst werden.</p>
        <CodeBlock code={metadataCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />

        <h2>Performance-Vorteile</h2>
        <p>Durch das standardmäßige Beibehalten von Komponenten auf dem Server reduziert der App Router das clientseitige JavaScript-Bundle erheblich. Nur interaktive Komponenten, die mit <code>&apos;use client&apos;</code> markiert sind, werden an den Browser gesendet, was zu schnelleren initialen Seitenladungen und besseren Core Web Vitals führt.</p>
      </>
    ),
  },
  es: {
    title: 'Construyendo un blog moderno con el App Router de Next.js',
    readingTime: 5,
    body: (
      <>
        <p>El App Router de Next.js cambia fundamentalmente cómo construimos aplicaciones web. Con componentes de servidor por defecto, layouts que persisten entre navegaciones, y streaming integrado, proporciona una base poderosa para sitios ricos en contenido como blogs.</p>

        <h2>¿Por qué el App Router?</h2>
        <p>El App Router introduce un modelo de enrutamiento basado en el sistema de archivos con layouts anidados, estados de carga y límites de error. Cada segmento de ruta puede ser un componente de servidor por defecto, lo que significa que no se envía JavaScript al cliente a menos que sea explícitamente necesario.</p>

        <h3>Componentes de servidor por defecto</h3>
        <p>Los componentes de servidor se ejecutan exclusivamente en el servidor. Pueden acceder directamente a bases de datos, sistemas de archivos y variables de entorno sin exponer nada al bundle del cliente.</p>
        <CodeBlock code={serverComponentCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />

        <h2>Estructura de rutas</h2>
        <p>Un blog construido con el App Router utiliza una estructura de carpetas limpia. Cada ruta es un directorio con un archivo <code>page.tsx</code>, y la UI compartida va en archivos <code>layout.tsx</code>.</p>
        <CodeBlock code={layoutCode} lang="typescript" filename="app/[locale]/layout.tsx" />

        <h3>Metadatos dinámicos</h3>
        <p>Cada página puede exportar una función <code>generateMetadata</code> para títulos y descripciones amigables con el SEO que se resuelven en tiempo de solicitud.</p>
        <CodeBlock code={metadataCode} lang="typescript" filename="app/posts/[slug]/page.tsx" />

        <h2>Beneficios de rendimiento</h2>
        <p>Al mantener los componentes en el servidor por defecto, el App Router reduce significativamente el bundle de JavaScript del lado del cliente. Solo los componentes interactivos marcados con <code>&apos;use client&apos;</code> se envían al navegador, resultando en cargas iniciales más rápidas y mejores Core Web Vitals.</p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function BuildingModernBlogPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <PostDetail
        postIndex="01"
        title={t.title}
        date="2026-03-15"
        readingMinutes={t.readingTime}
        body={t.body}
      />
      <div style={{maxWidth: 720, margin: '0 auto', padding: '0 36px 60px'}}>
        <RelatedPosts postId="building-modern-blog" locale={locale} />
      </div>
    </>
  );
}
