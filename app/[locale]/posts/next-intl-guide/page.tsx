import CodeBlock from '../../components/CodeBlock';
import PostDetail from '../../components/PostDetail';
import RelatedPosts from '../../components/RelatedPosts';

const routingCode = `// lib/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'de', 'es'],
  defaultLocale: 'en',
});`;

const middlewareCode = `// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|fr|de|es)/:path*'],
};`;

const translationCode = `// locales/en/common.json
{
  "greeting": "Hello, {name}!",
  "items_count": "You have {count, plural, =0 {no items} one {# item} other {# items}}"
}

// In a component:
import { useTranslations } from 'next-intl';

export default function Dashboard() {
  const t = useTranslations();
  return (
    <div>
      <h1>{t('greeting', { name: 'Alex' })}</h1>
      <p>{t('items_count', { count: 5 })}</p>
    </div>
  );
}`;

const serverCode = `// Server component — access translations without hooks
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title') };
}`;

const content = {
  en: {
    title: 'Internationalization with next-intl',
    readingTime: 5,
    body: (
      <>
        <p>Adding multi-language support to a Next.js application is straightforward with next-intl. It provides a complete solution for both server and client components, with built-in support for ICU message formatting, pluralization, and date/number formatting.</p>

        <h2>Setting Up Routing</h2>
        <p>The first step is defining your supported locales and the default locale. next-intl provides a <code>defineRouting</code> helper that centralizes this configuration:</p>
        <CodeBlock code={routingCode} lang="typescript" filename="lib/i18n/routing.ts" />

        <h3>Middleware Configuration</h3>
        <p>The middleware handles locale detection from the URL, browser preferences, or cookies, and redirects users accordingly:</p>
        <CodeBlock code={middlewareCode} lang="typescript" filename="middleware.ts" />

        <h2>Translation Files</h2>
        <p>Translations are stored as JSON files organized by locale. next-intl supports ICU message syntax, which enables powerful formatting features like pluralization:</p>
        <CodeBlock code={translationCode} lang="typescript" filename="Using translations" />

        <h2>Server vs Client Components</h2>
        <p>next-intl works seamlessly with both server and client components. Client components use the <code>useTranslations</code> hook, while server components use <code>getTranslations</code>.</p>

        <h3>Server Component Usage</h3>
        <p>In server components, you use the async <code>getTranslations</code> function, which is perfect for generating metadata:</p>
        <CodeBlock code={serverCode} lang="typescript" filename="app/[locale]/page.tsx" />

        <h2>Best Practices</h2>
        <p>Keep your translation keys organized by feature or page. Use ICU message syntax for complex strings with variables, plurals, or gender. Always add translations for all supported locales at the same time to avoid missing translations in production.</p>
      </>
    ),
  },
  fr: {
    title: 'Internationalisation avec next-intl',
    readingTime: 5,
    body: (
      <>
        <p>Ajouter le support multilingue à une application Next.js est simple avec next-intl. Il fournit une solution complète pour les composants serveur et client, avec un support intégré pour le formatage de messages ICU, la pluralisation et le formatage des dates et nombres.</p>

        <h2>Configuration du routage</h2>
        <p>La première étape consiste à définir vos locales supportées et la locale par défaut. next-intl fournit un helper <code>defineRouting</code> qui centralise cette configuration :</p>
        <CodeBlock code={routingCode} lang="typescript" filename="lib/i18n/routing.ts" />

        <h3>Configuration du middleware</h3>
        <p>Le middleware gère la détection de la locale à partir de l&apos;URL, des préférences du navigateur ou des cookies, et redirige les utilisateurs en conséquence :</p>
        <CodeBlock code={middlewareCode} lang="typescript" filename="middleware.ts" />

        <h2>Fichiers de traduction</h2>
        <p>Les traductions sont stockées sous forme de fichiers JSON organisés par locale. next-intl supporte la syntaxe de messages ICU, qui permet des fonctionnalités de formatage puissantes comme la pluralisation :</p>
        <CodeBlock code={translationCode} lang="typescript" filename="Utilisation des traductions" />

        <h2>Composants serveur vs client</h2>
        <p>next-intl fonctionne parfaitement avec les composants serveur et client. Les composants client utilisent le hook <code>useTranslations</code>, tandis que les composants serveur utilisent <code>getTranslations</code>.</p>

        <h3>Utilisation dans les composants serveur</h3>
        <p>Dans les composants serveur, vous utilisez la fonction asynchrone <code>getTranslations</code>, parfaite pour générer des métadonnées :</p>
        <CodeBlock code={serverCode} lang="typescript" filename="app/[locale]/page.tsx" />

        <h2>Bonnes pratiques</h2>
        <p>Gardez vos clés de traduction organisées par fonctionnalité ou page. Utilisez la syntaxe de messages ICU pour les chaînes complexes avec des variables, des pluriels ou du genre. Ajoutez toujours les traductions pour toutes les locales supportées en même temps pour éviter les traductions manquantes en production.</p>
      </>
    ),
  },
  de: {
    title: 'Internationalisierung mit next-intl',
    readingTime: 5,
    body: (
      <>
        <p>Das Hinzufügen von Mehrsprachunterstützung zu einer Next.js-Anwendung ist mit next-intl unkompliziert. Es bietet eine vollständige Lösung für Server- und Client-Komponenten mit integrierter Unterstützung für ICU-Nachrichtenformatierung, Pluralisierung und Datums-/Zahlenformatierung.</p>

        <h2>Routing einrichten</h2>
        <p>Der erste Schritt besteht darin, Ihre unterstützten Locales und die Standard-Locale zu definieren. next-intl bietet einen <code>defineRouting</code>-Helper, der diese Konfiguration zentralisiert:</p>
        <CodeBlock code={routingCode} lang="typescript" filename="lib/i18n/routing.ts" />

        <h3>Middleware-Konfiguration</h3>
        <p>Die Middleware übernimmt die Locale-Erkennung aus der URL, Browsereinstellungen oder Cookies und leitet Benutzer entsprechend weiter:</p>
        <CodeBlock code={middlewareCode} lang="typescript" filename="middleware.ts" />

        <h2>Übersetzungsdateien</h2>
        <p>Übersetzungen werden als JSON-Dateien organisiert nach Locale gespeichert. next-intl unterstützt die ICU-Nachrichtensyntax, die leistungsstarke Formatierungsfunktionen wie Pluralisierung ermöglicht:</p>
        <CodeBlock code={translationCode} lang="typescript" filename="Übersetzungen verwenden" />

        <h2>Server- vs. Client-Komponenten</h2>
        <p>next-intl funktioniert nahtlos mit Server- und Client-Komponenten. Client-Komponenten verwenden den <code>useTranslations</code>-Hook, während Server-Komponenten <code>getTranslations</code> verwenden.</p>

        <h3>Verwendung in Server-Komponenten</h3>
        <p>In Server-Komponenten verwenden Sie die asynchrone <code>getTranslations</code>-Funktion, die sich perfekt für die Generierung von Metadaten eignet:</p>
        <CodeBlock code={serverCode} lang="typescript" filename="app/[locale]/page.tsx" />

        <h2>Best Practices</h2>
        <p>Halten Sie Ihre Übersetzungsschlüssel nach Feature oder Seite organisiert. Verwenden Sie die ICU-Nachrichtensyntax für komplexe Zeichenketten mit Variablen, Pluralen oder Geschlecht. Fügen Sie Übersetzungen immer für alle unterstützten Locales gleichzeitig hinzu, um fehlende Übersetzungen in der Produktion zu vermeiden.</p>
      </>
    ),
  },
  es: {
    title: 'Internacionalización con next-intl',
    readingTime: 5,
    body: (
      <>
        <p>Agregar soporte multilingüe a una aplicación Next.js es sencillo con next-intl. Proporciona una solución completa para componentes de servidor y cliente, con soporte integrado para formateo de mensajes ICU, pluralización y formateo de fechas y números.</p>

        <h2>Configuración del enrutamiento</h2>
        <p>El primer paso es definir tus locales soportados y el locale por defecto. next-intl proporciona un helper <code>defineRouting</code> que centraliza esta configuración:</p>
        <CodeBlock code={routingCode} lang="typescript" filename="lib/i18n/routing.ts" />

        <h3>Configuración del middleware</h3>
        <p>El middleware maneja la detección del locale desde la URL, preferencias del navegador o cookies, y redirige a los usuarios según corresponda:</p>
        <CodeBlock code={middlewareCode} lang="typescript" filename="middleware.ts" />

        <h2>Archivos de traducción</h2>
        <p>Las traducciones se almacenan como archivos JSON organizados por locale. next-intl soporta la sintaxis de mensajes ICU, que habilita características de formateo poderosas como la pluralización:</p>
        <CodeBlock code={translationCode} lang="typescript" filename="Usando traducciones" />

        <h2>Componentes servidor vs cliente</h2>
        <p>next-intl funciona perfectamente con componentes de servidor y cliente. Los componentes cliente usan el hook <code>useTranslations</code>, mientras que los componentes de servidor usan <code>getTranslations</code>.</p>

        <h3>Uso en componentes de servidor</h3>
        <p>En componentes de servidor, usas la función asíncrona <code>getTranslations</code>, que es perfecta para generar metadatos:</p>
        <CodeBlock code={serverCode} lang="typescript" filename="app/[locale]/page.tsx" />

        <h2>Mejores prácticas</h2>
        <p>Mantén tus claves de traducción organizadas por funcionalidad o página. Usa la sintaxis de mensajes ICU para cadenas complejas con variables, plurales o género. Siempre agrega traducciones para todos los locales soportados al mismo tiempo para evitar traducciones faltantes en producción.</p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function NextIntlGuidePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <PostDetail
        postIndex="03"
        title={t.title}
        date="2026-03-05"
        readingMinutes={t.readingTime}
        body={t.body}
      />
      <div style={{maxWidth: 720, margin: '0 auto', padding: '0 36px 60px'}}>
        <RelatedPosts postId="next-intl-guide" locale={locale} />
      </div>
    </>
  );
}
