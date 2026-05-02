import CodeBlock from '../../components/CodeBlock';
import PostDetail from '../../components/PostDetail';
import RelatedPosts from '../../components/RelatedPosts';

const discriminatedUnionCode = `type ButtonProps =
  | { variant: 'primary'; icon?: never }
  | { variant: 'icon'; icon: React.ReactNode };

function Button(props: ButtonProps) {
  if (props.variant === 'icon') {
    return <button>{props.icon}</button>;
  }
  return <button className="primary">Click me</button>;
}`;

const genericComponentCode = `type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
};

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}`;

const polymorphicCode = `type AsProps<C extends React.ElementType> = {
  as?: C;
} & React.ComponentPropsWithoutRef<C>;

function Text<C extends React.ElementType = 'span'>({
  as,
  ...props
}: AsProps<C>) {
  const Component = as || 'span';
  return <Component {...props} />;
}

// Usage:
<Text as="h1">Title</Text>        // renders <h1>
<Text as="a" href="/about">Link</Text>  // renders <a>`;

const content = {
  en: {
    title: 'TypeScript Patterns for React 19',
    readingTime: 4,
    body: (
      <>
        <p>React 19 combined with TypeScript offers powerful patterns for building type-safe components. Here are the most useful patterns that improve developer experience and catch bugs at compile time.</p>

        <h2>Discriminated Unions</h2>
        <p>Discriminated unions let you model component props where certain combinations of props are valid while others are not. This prevents impossible states at the type level.</p>
        <CodeBlock code={discriminatedUnionCode} lang="typescript" filename="components/Button.tsx" />
        <p>With this pattern, TypeScript will error if you try to pass an <code>icon</code> prop when <code>variant</code> is <code>&quot;primary&quot;</code>, eliminating a whole class of runtime bugs.</p>

        <h2>Generic Components</h2>
        <p>Generic components preserve type information through the component boundary, making reusable components fully type-safe.</p>

        <h3>The List Pattern</h3>
        <p>A generic list component infers the item type from the <code>items</code> array and carries it through to <code>renderItem</code>:</p>
        <CodeBlock code={genericComponentCode} lang="typescript" filename="components/List.tsx" />

        <h2>Polymorphic Components</h2>
        <p>Polymorphic components render as different HTML elements while maintaining proper type safety for each element&apos;s props.</p>

        <h3>The &quot;as&quot; Prop Pattern</h3>
        <p>By using constrained generics, the component accepts props specific to whichever element it renders as:</p>
        <CodeBlock code={polymorphicCode} lang="typescript" filename="components/Text.tsx" />

        <h2>Key Takeaways</h2>
        <p>These patterns share a common theme: leveraging TypeScript&apos;s type system to make invalid states unrepresentable. Discriminated unions prevent impossible prop combinations, generics preserve type flow, and polymorphic components ensure element-specific prop safety.</p>
      </>
    ),
  },
  fr: {
    title: 'Patterns TypeScript pour React 19',
    readingTime: 4,
    body: (
      <>
        <p>React 19 combiné avec TypeScript offre des patterns puissants pour construire des composants type-safe. Voici les patterns les plus utiles qui améliorent l&apos;expérience développeur et détectent les bugs à la compilation.</p>

        <h2>Unions discriminées</h2>
        <p>Les unions discriminées permettent de modéliser des props de composants où certaines combinaisons de props sont valides tandis que d&apos;autres ne le sont pas. Cela prévient les états impossibles au niveau du type.</p>
        <CodeBlock code={discriminatedUnionCode} lang="typescript" filename="components/Button.tsx" />
        <p>Avec ce pattern, TypeScript affichera une erreur si vous essayez de passer une prop <code>icon</code> quand <code>variant</code> est <code>&quot;primary&quot;</code>, éliminant toute une classe de bugs runtime.</p>

        <h2>Composants génériques</h2>
        <p>Les composants génériques préservent les informations de type à travers la frontière du composant, rendant les composants réutilisables entièrement type-safe.</p>

        <h3>Le pattern List</h3>
        <p>Un composant de liste générique infère le type de l&apos;élément à partir du tableau <code>items</code> et le transmet à <code>renderItem</code> :</p>
        <CodeBlock code={genericComponentCode} lang="typescript" filename="components/List.tsx" />

        <h2>Composants polymorphiques</h2>
        <p>Les composants polymorphiques se rendent en tant qu&apos;éléments HTML différents tout en maintenant une sécurité de type correcte pour les props de chaque élément.</p>

        <h3>Le pattern &quot;as&quot;</h3>
        <p>En utilisant des génériques contraints, le composant accepte les props spécifiques à l&apos;élément sous lequel il se rend :</p>
        <CodeBlock code={polymorphicCode} lang="typescript" filename="components/Text.tsx" />

        <h2>Points clés</h2>
        <p>Ces patterns partagent un thème commun : exploiter le système de types de TypeScript pour rendre les états invalides irreprésentables. Les unions discriminées empêchent les combinaisons de props impossibles, les génériques préservent le flux de types, et les composants polymorphiques assurent la sécurité des props spécifiques aux éléments.</p>
      </>
    ),
  },
  de: {
    title: 'TypeScript-Patterns für React 19',
    readingTime: 4,
    body: (
      <>
        <p>React 19 in Kombination mit TypeScript bietet leistungsstarke Patterns für die Erstellung typsicherer Komponenten. Hier sind die nützlichsten Patterns, die die Entwicklererfahrung verbessern und Fehler zur Kompilierzeit erkennen.</p>

        <h2>Diskriminierte Unions</h2>
        <p>Diskriminierte Unions ermöglichen es, Komponenten-Props zu modellieren, bei denen bestimmte Kombinationen von Props gültig sind, während andere es nicht sind. Dies verhindert unmögliche Zustände auf Typebene.</p>
        <CodeBlock code={discriminatedUnionCode} lang="typescript" filename="components/Button.tsx" />
        <p>Mit diesem Pattern zeigt TypeScript einen Fehler an, wenn Sie versuchen, eine <code>icon</code>-Prop zu übergeben, wenn <code>variant</code> den Wert <code>&quot;primary&quot;</code> hat, und eliminiert so eine ganze Klasse von Laufzeitfehlern.</p>

        <h2>Generische Komponenten</h2>
        <p>Generische Komponenten bewahren Typinformationen über die Komponentengrenze hinweg und machen wiederverwendbare Komponenten vollständig typsicher.</p>

        <h3>Das List-Pattern</h3>
        <p>Eine generische Listenkomponente leitet den Elementtyp aus dem <code>items</code>-Array ab und überträgt ihn an <code>renderItem</code>:</p>
        <CodeBlock code={genericComponentCode} lang="typescript" filename="components/List.tsx" />

        <h2>Polymorphe Komponenten</h2>
        <p>Polymorphe Komponenten rendern als verschiedene HTML-Elemente und gewährleisten dabei die richtige Typsicherheit für die Props jedes Elements.</p>

        <h3>Das &quot;as&quot;-Prop-Pattern</h3>
        <p>Durch die Verwendung eingeschränkter Generics akzeptiert die Komponente Props, die spezifisch für das jeweilige Element sind, als das sie gerendert wird:</p>
        <CodeBlock code={polymorphicCode} lang="typescript" filename="components/Text.tsx" />

        <h2>Wichtige Erkenntnisse</h2>
        <p>Diese Patterns teilen ein gemeinsames Thema: die Nutzung des TypeScript-Typsystems, um ungültige Zustände undarstellbar zu machen. Diskriminierte Unions verhindern unmögliche Prop-Kombinationen, Generics bewahren den Typfluss, und polymorphe Komponenten gewährleisten elementspezifische Prop-Sicherheit.</p>
      </>
    ),
  },
  es: {
    title: 'Patrones TypeScript para React 19',
    readingTime: 4,
    body: (
      <>
        <p>React 19 combinado con TypeScript ofrece patrones poderosos para construir componentes con tipado seguro. Aquí están los patrones más útiles que mejoran la experiencia del desarrollador y detectan errores en tiempo de compilación.</p>

        <h2>Uniones discriminadas</h2>
        <p>Las uniones discriminadas permiten modelar props de componentes donde ciertas combinaciones de props son válidas mientras que otras no lo son. Esto previene estados imposibles a nivel de tipo.</p>
        <CodeBlock code={discriminatedUnionCode} lang="typescript" filename="components/Button.tsx" />
        <p>Con este patrón, TypeScript mostrará un error si intentas pasar una prop <code>icon</code> cuando <code>variant</code> es <code>&quot;primary&quot;</code>, eliminando toda una clase de errores en tiempo de ejecución.</p>

        <h2>Componentes genéricos</h2>
        <p>Los componentes genéricos preservan la información de tipo a través del límite del componente, haciendo que los componentes reutilizables sean completamente type-safe.</p>

        <h3>El patrón List</h3>
        <p>Un componente de lista genérico infiere el tipo del elemento del array <code>items</code> y lo transmite a <code>renderItem</code>:</p>
        <CodeBlock code={genericComponentCode} lang="typescript" filename="components/List.tsx" />

        <h2>Componentes polimórficos</h2>
        <p>Los componentes polimórficos se renderizan como diferentes elementos HTML mientras mantienen la seguridad de tipo adecuada para las props de cada elemento.</p>

        <h3>El patrón &quot;as&quot;</h3>
        <p>Usando genéricos restringidos, el componente acepta props específicas para cualquier elemento como el que se renderiza:</p>
        <CodeBlock code={polymorphicCode} lang="typescript" filename="components/Text.tsx" />

        <h2>Conclusiones clave</h2>
        <p>Estos patrones comparten un tema común: aprovechar el sistema de tipos de TypeScript para hacer que los estados inválidos sean irrepresentables. Las uniones discriminadas previenen combinaciones de props imposibles, los genéricos preservan el flujo de tipos, y los componentes polimórficos aseguran la seguridad de props específicas de cada elemento.</p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function TypeScriptReactPatternsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <PostDetail
        postIndex="02"
        title={t.title}
        date="2026-03-10"
        readingMinutes={t.readingTime}
        body={t.body}
      />
      <div style={{maxWidth: 720, margin: '0 auto', padding: '0 36px 60px'}}>
        <RelatedPosts postId="typescript-react-patterns" locale={locale} />
      </div>
    </>
  );
}
