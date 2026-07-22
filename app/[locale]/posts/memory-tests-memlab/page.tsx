import {notFound} from 'next/navigation';
import {draftsVisible} from '../../../../lib/drafts';
import CodeBlock from '../../components/CodeBlock';
import PostDetail from '../../components/PostDetail';
import RelatedPosts from '../../components/RelatedPosts';

const memlabScenario = `// scenarios/list-then-back.ts
export async function action(page) {
  // navigate to the list, click into a row, navigate back
  await page.click('a[data-testid="row-0"]');
  await page.waitForSelector('[data-testid="detail-loaded"]');
  await page.goBack();
  await page.waitForSelector('[data-testid="list-loaded"]');
}

// run: memlab run --scenario scenarios/list-then-back.ts`;

const ciYaml = `# .gitlab-ci.yml — nightly only, not on every PR
memlab:
  stage: smoke
  image: node:20
  rules:
    - if: '$CI_PIPELINE_SOURCE == "schedule"'
  script:
    - npx memlab run --scenario scenarios/*.ts --work-dir tmp/memlab
    - npx memlab analyze leak --work-dir tmp/memlab > leak-report.txt
  artifacts:
    paths: [leak-report.txt, tmp/memlab/]
    when: always`;

const content = {
  en: {
    title: 'Memory Tests with memlab — What They Catch, What They Don’t',
    readingTime: 5,
    body: (
      <>
        <p>memlab is a tool from Meta that takes heap snapshots before and after a scripted browser interaction, then diffs them to flag objects that should have been garbage-collected but weren’t. On paper, that sounds like exactly the thing you want for catching React leaks before they hit production.</p>
        <p>I’ve had it in a CI pipeline for about a year. Here’s the honest take: it caught two real bugs, generated a lot of noise, and only earned its place once we stopped treating it like a unit test.</p>

        <h2>What it actually catches well</h2>
        <p>memlab shines on one specific failure mode: <strong>objects retained across a route change</strong>. The classic example is a chart component that subscribes to a websocket on mount and never unsubscribes — navigate away, the listener keeps the component (and its props, and its closures) alive forever. memlab will catch that and tell you which retainer chain is holding the reference.</p>
        <CodeBlock code={memlabScenario} lang="typescript" filename="scenarios/list-then-back.ts" />
        <p>The two real bugs we caught were both in this category: a stale subscription, and a debug overlay that registered a global keydown handler in <code>useEffect</code> without a cleanup. Both went undetected for months because they only matter on long sessions, and our manual QA always tested in fresh tabs.</p>

        <h2>What it doesn’t catch</h2>
        <p>The headline list:</p>
        <ul>
          <li><strong>Slow growth.</strong> A leak that adds 50 KB per navigation and only matters after 100 navigations won’t show up in a 3-step scenario. memlab compares before/after a single interaction; long-tail growth is invisible to it.</li>
          <li><strong>External-library retention.</strong> If a chart library leaks internally, the retainer chain points into minified vendor code. The signal is real, but acting on it requires patching a dependency you don’t own.</li>
          <li><strong>Worker memory.</strong> Web workers have their own heap. memlab snapshots the main thread.</li>
          <li><strong>Server-side leaks.</strong> Obvious, but worth saying — memlab is browser-only. Node leaks need <code>--inspect</code> + Chrome DevTools, or <code>clinic.js</code>.</li>
        </ul>

        <h2>Where it belongs in CI</h2>
        <p>Not on every PR. The runs are slow (30–90 seconds per scenario), the snapshots are large, and the false-positive rate on a code change in unrelated areas is too high to gate a merge on.</p>
        <p>What worked for us: <strong>nightly schedule, full scenario suite, leak report posted to a dedicated Slack channel</strong>. When the same leak shows up two nights running, somebody investigates. Transient leaks (heap snapshot timing, GC raciness) self-clear.</p>
        <CodeBlock code={ciYaml} lang="yaml" filename=".gitlab-ci.yml" />

        <h2>The trap</h2>
        <p>The biggest mistake I made early was treating memlab output as a list of bugs to fix. It’s not — it’s a list of <em>objects retained longer than expected</em>, and "expected" is doing a lot of work in that sentence. Plenty of legitimate caches, design-system singletons, and i18n bundles will show up as "leaks". You learn to read the retainer chain and triage; you don’t learn that from the docs.</p>
        <p>Allow-listing is essential. memlab supports a <code>leakFilter</code> hook — use it. Otherwise every framework upgrade will look like a regression.</p>

        <h2>Verdict</h2>
        <p>Worth the setup if your app has long sessions and route changes. Probably not worth it if your users land, do one thing, and leave. The two bugs it caught for us paid for the year of integration in a single afternoon. The other 363 days, it ran quietly and gave us a baseline we could trust.</p>
        <p>That, more than anything, is the value: a number that doesn’t move when nothing’s wrong, and an alarm when it does.</p>
      </>
    ),
  },
  fr: {
    title: 'Tests mémoire avec memlab — ce qu’ils attrapent, ce qu’ils ratent',
    readingTime: 5,
    body: (
      <>
        <p>memlab est un outil de Meta qui prend des snapshots du heap avant et après une interaction browser scriptée, puis les compare pour signaler les objets qui auraient dû être garbage-collectés mais ne l’ont pas été. Sur le papier, c’est exactement ce qu’on veut pour attraper les fuites React avant la prod.</p>
        <p>Je l’ai en CI depuis environ un an. Le retour honnête : il a attrapé deux vrais bugs, généré pas mal de bruit, et il n’a vraiment trouvé sa place que quand on a arrêté de le traiter comme un test unitaire.</p>

        <h2>Ce qu’il attrape bien</h2>
        <p>memlab brille sur un mode de défaillance précis : <strong>les objets retenus à travers un changement de route</strong>. L’exemple classique : un composant graphique qui s’abonne à un websocket au mount et ne se désabonne jamais — on navigue ailleurs, le listener garde le composant (et ses props, et ses closures) vivant pour toujours. memlab attrape ça et te dit quelle chaîne de retention tient la référence.</p>
        <CodeBlock code={memlabScenario} lang="typescript" filename="scenarios/list-then-back.ts" />
        <p>Les deux vrais bugs qu’on a attrapés étaient tous les deux de cette famille : une souscription périmée, et un overlay de debug qui enregistrait un handler keydown global dans <code>useEffect</code> sans cleanup. Les deux passaient inaperçus depuis des mois parce qu’ils ne se voient que sur des longues sessions, et notre QA manuelle testait toujours dans des onglets frais.</p>

        <h2>Ce qu’il n’attrape pas</h2>
        <p>La liste qui compte :</p>
        <ul>
          <li><strong>La croissance lente.</strong> Une fuite qui ajoute 50 Ko par navigation et qui ne devient un problème qu’après 100 navigations n’apparaîtra pas dans un scénario à 3 étapes. memlab compare avant/après une interaction ; la croissance de longue traîne lui est invisible.</li>
          <li><strong>La rétention dans des libs externes.</strong> Si une lib de graph fuit en interne, la chaîne de retention pointe dans du code vendor minifié. Le signal est réel, mais agir dessus demande de patcher une dépendance qui n’est pas la tienne.</li>
          <li><strong>La mémoire des workers.</strong> Les web workers ont leur propre heap. memlab capture le thread principal.</li>
          <li><strong>Les fuites côté serveur.</strong> Évident, mais à dire — memlab est browser-only. Les fuites Node passent par <code>--inspect</code> + Chrome DevTools, ou <code>clinic.js</code>.</li>
        </ul>

        <h2>Sa place dans la CI</h2>
        <p>Pas sur chaque PR. Les runs sont lents (30–90 secondes par scénario), les snapshots sont gros, et le taux de faux positifs sur un changement dans un autre coin du code est trop élevé pour gater un merge.</p>
        <p>Ce qui marche : <strong>schedule nocturne, suite complète de scénarios, rapport de fuites posté sur un canal Slack dédié</strong>. Quand la même fuite réapparaît deux nuits de suite, quelqu’un investigue. Les fuites transitoires (timing de snapshot, races du GC) s’auto-effacent.</p>
        <CodeBlock code={ciYaml} lang="yaml" filename=".gitlab-ci.yml" />

        <h2>Le piège</h2>
        <p>La plus grosse erreur du début, c’est d’avoir traité la sortie de memlab comme une liste de bugs à corriger. Ça ne l’est pas — c’est une liste d’<em>objets retenus plus longtemps que prévu</em>, et "prévu" porte beaucoup de poids dans cette phrase. Pas mal de caches légitimes, de singletons du design system, de bundles i18n vont apparaître comme des "fuites". On apprend à lire la chaîne de retention et à trier ; ça ne s’apprend pas dans la doc.</p>
        <p>Le filtrage est essentiel. memlab a un hook <code>leakFilter</code> — utilise-le. Sinon chaque mise à jour de framework ressemblera à une régression.</p>

        <h2>Verdict</h2>
        <p>Vaut la mise en place si l’appli a des sessions longues et des changements de route. Probablement pas si les utilisateurs arrivent, font une chose, et partent. Les deux bugs qu’il a attrapés ont payé l’année d’intégration en un après-midi. Les 363 autres jours, il a tourné silencieusement et nous a donné une baseline à laquelle se fier.</p>
        <p>C’est ça, plus que tout, la valeur : un chiffre qui ne bouge pas quand tout va bien, et une alarme quand ça ne va plus.</p>
      </>
    ),
  },
  de: {
    title: 'Memory-Tests mit memlab — was sie finden und was nicht',
    readingTime: 5,
    body: (
      <>
        <p>memlab ist ein Tool von Meta, das Heap-Snapshots vor und nach einer skriptgesteuerten Browser-Interaktion macht und sie dann diffed, um Objekte zu finden, die hätten garbage-collected werden sollen, es aber nicht wurden. Auf dem Papier klingt das genau nach dem Werkzeug, das man will, um React-Leaks vor Produktion zu erwischen.</p>
        <p>Ich habe es seit etwa einem Jahr in der CI. Die ehrliche Einschätzung: Es hat zwei echte Bugs gefunden, viel Rauschen erzeugt und seinen Platz erst verdient, als wir aufgehört haben, es wie einen Unit-Test zu behandeln.</p>

        <h2>Was es gut findet</h2>
        <p>memlab glänzt bei einem Fehlerbild: <strong>Objekte, die über einen Route-Wechsel hinweg gehalten werden</strong>. Klassisches Beispiel: eine Chart-Komponente, die sich beim Mount auf einen WebSocket abonniert und nie unsubscribt — man navigiert weg, der Listener hält die Komponente (und ihre Props und Closures) für immer am Leben. memlab erwischt das und zeigt die Retainer-Chain.</p>
        <CodeBlock code={memlabScenario} lang="typescript" filename="scenarios/list-then-back.ts" />
        <p>Die beiden echten Bugs, die wir fanden, waren beide aus dieser Familie: eine veraltete Subscription und ein Debug-Overlay, das in <code>useEffect</code> einen globalen Keydown-Handler registrierte, ohne Cleanup. Beide blieben monatelang unentdeckt, weil sie nur in langen Sessions zählen und unser manuelles QA immer in frischen Tabs testete.</p>

        <h2>Was es nicht findet</h2>
        <p>Die Liste, auf die es ankommt:</p>
        <ul>
          <li><strong>Langsames Wachstum.</strong> Ein Leck, das pro Navigation 50 KB hinzufügt und erst nach 100 Navigationen relevant wird, taucht in einem 3-Schritt-Szenario nicht auf. memlab vergleicht vor/nach einer Interaktion; Long-Tail-Wachstum bleibt unsichtbar.</li>
          <li><strong>Retention in externen Libs.</strong> Wenn eine Chart-Lib intern leakt, zeigt die Retainer-Chain in minifizierten Vendor-Code. Das Signal ist echt, das Handeln verlangt aber, eine Dependency zu patchen, die einem nicht gehört.</li>
          <li><strong>Worker-Speicher.</strong> Web Workers haben ihren eigenen Heap. memlab snapshotet den Main Thread.</li>
          <li><strong>Server-seitige Lecks.</strong> Offensichtlich, aber gesagt — memlab ist Browser-only. Node-Lecks brauchen <code>--inspect</code> + Chrome DevTools oder <code>clinic.js</code>.</li>
        </ul>

        <h2>Wohin in die CI</h2>
        <p>Nicht in jede PR. Die Runs sind langsam (30–90 Sekunden pro Szenario), die Snapshots sind groß, und die Falsch-Positiv-Rate bei einer Änderung in unverwandten Bereichen ist zu hoch, um einen Merge daran zu blockieren.</p>
        <p>Was bei uns funktionierte: <strong>nächtlicher Schedule, voller Szenarien-Satz, Leak-Report in einem dedizierten Slack-Kanal</strong>. Taucht dasselbe Leck zwei Nächte in Folge auf, kümmert sich jemand. Transiente Lecks (Snapshot-Timing, GC-Races) löschen sich selbst.</p>
        <CodeBlock code={ciYaml} lang="yaml" filename=".gitlab-ci.yml" />

        <h2>Die Falle</h2>
        <p>Mein größter Fehler am Anfang war, die memlab-Ausgabe als Liste von Bugs zur Behebung zu behandeln. Ist sie nicht — sie ist eine Liste von <em>Objekten, die länger gehalten werden als erwartet</em>, und „erwartet“ trägt in diesem Satz viel Last. Jede Menge legitime Caches, Design-System-Singletons und i18n-Bundles werden als „Leaks“ erscheinen. Man lernt, die Retainer-Chain zu lesen und zu triagieren; aus der Doku lernt man das nicht.</p>
        <p>Allow-Listing ist essentiell. memlab hat einen <code>leakFilter</code>-Hook — benutze ihn. Sonst sieht jedes Framework-Upgrade nach einer Regression aus.</p>

        <h2>Urteil</h2>
        <p>Lohnt das Setup, wenn deine App lange Sessions und Route-Wechsel hat. Wahrscheinlich nicht, wenn Nutzer landen, eine Sache tun und gehen. Die zwei Bugs, die es bei uns fand, haben das Jahr Integration an einem Nachmittag bezahlt. Die anderen 363 Tage lief es leise und gab uns eine Baseline, der wir trauen konnten.</p>
        <p>Das ist, mehr als alles andere, der Wert: eine Zahl, die sich nicht bewegt, wenn alles in Ordnung ist, und ein Alarm, wenn nicht.</p>
      </>
    ),
  },
  es: {
    title: 'Tests de memoria con memlab — lo que detectan y lo que no',
    readingTime: 5,
    body: (
      <>
        <p>memlab es una herramienta de Meta que toma snapshots del heap antes y después de una interacción browser scripteada y luego los diffea para señalar objetos que debían haber sido garbage-collecteados pero no lo fueron. Sobre el papel, es justo lo que quieres para cazar fugas de React antes de producción.</p>
        <p>Lo tengo en CI desde hace un año. La opinión honesta: cazó dos bugs reales, generó bastante ruido y solo se ganó su sitio cuando dejamos de tratarlo como un test unitario.</p>

        <h2>Lo que detecta bien</h2>
        <p>memlab brilla en un modo de fallo concreto: <strong>objetos retenidos a través de un cambio de ruta</strong>. El ejemplo clásico: un componente de gráfico que se suscribe a un websocket en el mount y nunca se desuscribe — navegas a otra parte, el listener mantiene vivo el componente (y sus props, y sus closures) para siempre. memlab lo caza y te dice qué cadena de retención sostiene la referencia.</p>
        <CodeBlock code={memlabScenario} lang="typescript" filename="scenarios/list-then-back.ts" />
        <p>Los dos bugs reales que cazamos eran de esa familia: una suscripción caduca y un overlay de debug que registraba un handler global de keydown en <code>useEffect</code> sin cleanup. Los dos pasaban desapercibidos hace meses porque solo importan en sesiones largas, y nuestro QA manual siempre probaba en pestañas frescas.</p>

        <h2>Lo que no detecta</h2>
        <p>La lista que cuenta:</p>
        <ul>
          <li><strong>Crecimiento lento.</strong> Una fuga que añade 50 KB por navegación y que solo importa tras 100 navegaciones no aparece en un escenario de 3 pasos. memlab compara antes/después de una interacción; el crecimiento de cola larga le es invisible.</li>
          <li><strong>Retención en libs externas.</strong> Si una lib de gráficos fuga internamente, la cadena de retención apunta a código vendor minificado. La señal es real, pero actuar implica parchear una dependencia que no es tuya.</li>
          <li><strong>Memoria de workers.</strong> Los web workers tienen su propio heap. memlab snapshotea el hilo principal.</li>
          <li><strong>Fugas en servidor.</strong> Obvio, pero conviene decirlo — memlab es solo navegador. Las fugas de Node piden <code>--inspect</code> + Chrome DevTools, o <code>clinic.js</code>.</li>
        </ul>

        <h2>Su sitio en la CI</h2>
        <p>No en cada PR. Las ejecuciones son lentas (30–90 s por escenario), los snapshots son grandes y la tasa de falsos positivos ante un cambio en zonas no relacionadas es demasiado alta para gatear un merge.</p>
        <p>Lo que funcionó: <strong>schedule nocturno, batería completa de escenarios, informe de fugas a un canal de Slack dedicado</strong>. Cuando la misma fuga aparece dos noches seguidas, alguien investiga. Las fugas transitorias (timing de snapshot, races del GC) se autoaclaran.</p>
        <CodeBlock code={ciYaml} lang="yaml" filename=".gitlab-ci.yml" />

        <h2>La trampa</h2>
        <p>El mayor error al principio fue tratar la salida de memlab como una lista de bugs que arreglar. No lo es — es una lista de <em>objetos retenidos más tiempo del esperado</em>, y "esperado" carga mucho peso en esa frase. Muchos caches legítimos, singletons de design system y bundles i18n aparecerán como "fugas". Se aprende a leer la cadena de retención y a triajear; eso no está en la doc.</p>
        <p>El allow-listing es esencial. memlab tiene un hook <code>leakFilter</code> — úsalo. Si no, cada upgrade de framework parecerá una regresión.</p>

        <h2>Veredicto</h2>
        <p>Vale la pena montarlo si tu app tiene sesiones largas y cambios de ruta. Probablemente no si tus usuarios entran, hacen una cosa y se van. Los dos bugs que cazó pagaron el año de integración en una tarde. Los otros 363 días corrió en silencio y nos dio una baseline en la que confiar.</p>
        <p>Eso, más que cualquier cosa, es el valor: un número que no se mueve cuando todo va bien, y una alarma cuando no.</p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  if (!draftsVisible) notFound(); // draft — see lib/drafts.ts
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function MemoryTestsMemlabPage({params}: {params: Promise<{locale: string}>}) {
  if (!draftsVisible) notFound(); // draft — see lib/drafts.ts
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <PostDetail
        postIndex="03"
        title={t.title}
        date="2026-05-03"
        readingMinutes={t.readingTime}
        body={t.body}
      />
      <div style={{maxWidth: 720, margin: '0 auto', padding: '0 36px 60px'}}>
        <RelatedPosts postId="memory-tests-memlab" locale={locale} />
      </div>
    </>
  );
}
