import CodeBlock from '../../components/CodeBlock';
import PostDetail from '../../components/PostDetail';
import RelatedPosts from '../../components/RelatedPosts';

const dualWriteCode = `// Phase 2 — both stores get every write, monolith still owns reads
async function placeOrder(order: Order) {
  // Old path stays load-bearing until Phase 4
  const orderId = await monolith.orders.insert(order);

  // New service writes the same data, return value ignored on this path
  await ordersService.create({...order, legacyId: orderId})
    .catch((err) => log.warn('shadow write failed', {err, orderId}));

  return orderId;
}`;

const contractCode = `// Pinned API contract — versioned, stored alongside the consumer
// Breaking changes require a v2 endpoint, never an in-place edit.
interface OrderEvent {
  schema: 'orders.v1';
  id: string;
  customerId: string;
  total: { amount: number; currency: 'EUR' | 'USD' };
  occurredAt: string; // ISO 8601
}`;

const reconciliationCode = `# Daily job — emits a Prometheus gauge per discrepancy
SELECT
  m.id, m.total_cents, s.total_cents,
  (m.total_cents - s.total_cents) AS drift_cents
FROM monolith.orders m
JOIN service.orders s ON s.legacy_id = m.id
WHERE m.created_at > now() - interval '24 hours'
  AND m.total_cents IS DISTINCT FROM s.total_cents;`;

const content = {
  en: {
    title: 'Decoupling a Critical Service from a Monolith',
    readingTime: 9,
    body: (
      <>
        <p>Pulling a load-bearing piece of a monolith into its own service is one of those projects where the fun parts — picking a stack, sketching the new schema — take 10% of the time. The other 90% is a careful, boring migration that nobody notices when it works.</p>
        <p>This is what we did, what we got wrong, and what I’d keep next time.</p>

        <h2>1. Find the seam, then defend it</h2>
        <p>The first decision is which lines to cut. Inside a mature monolith, every entity touches every other one — the schema graph is dense, foreign keys cross every domain, and a stored procedure somewhere reaches across half of it.</p>
        <p>We picked the seam by looking at the read/write ratios per table, not the conceptual domain. The candidate had a small write surface (a handful of mutating endpoints), a big read surface (dashboards everywhere), and well-defined inputs. That asymmetry is what made the dual-write phase tolerable.</p>

        <h2>2. Pin the contract before writing the service</h2>
        <p>Before any code, we wrote the contract — the events, the request payloads, the error shapes — and pinned it in a versioned file the consumers vendored in. Never an in-place edit; breaking changes get a <code>v2</code>.</p>
        <CodeBlock code={contractCode} lang="typescript" filename="contracts/orders.v1.ts" />
        <p>Treating the contract as the artifact, not the implementation, let two teams move in parallel without coupling their merge cadence.</p>

        <h2>3. Dual-write before dual-read</h2>
        <p>The cutover is four phases: shadow writes, shadow reads, primary reads, decommission. Most of the risk lives in shadow writes — the new service has to absorb the full production write rate while still being wrong about half the time.</p>
        <CodeBlock code={dualWriteCode} lang="typescript" filename="lib/place-order.ts" />
        <p>The <code>.catch</code> matters. A shadow-write failure must <em>never</em> fail the user-facing path. We learned that one the hard way during a flaky-network week.</p>

        <h2>4. Reconciliation is the migration</h2>
        <p>The thing that actually verifies the new service is correct is a daily job comparing the two stores row-by-row. Anything that drifts gets a Prometheus gauge incremented. We held the launch back twice because of small, persistent drifts neither team wanted to debug.</p>
        <CodeBlock code={reconciliationCode} lang="sql" filename="ops/reconcile-orders.sql" />
        <p>Drift you can’t explain is drift you can’t cut over.</p>

        <h2>5. Cutover is anticlimactic — by design</h2>
        <p>By the time we flipped reads, we’d had four weeks of zero-drift days, dashboards on the new service’s p99, and a tested rollback flag. The flip itself was a 3-line config change at 11am on a Tuesday.</p>
        <p>If your cutover is dramatic, your reconciliation wasn’t honest enough.</p>

        <h2>What I’d do differently</h2>
        <p>Two things. First, we underestimated how long it takes to retire the monolith path — the long tail of internal jobs, scripts, and ad-hoc queries that still poked the old tables outlived the cutover by months. Second, we should have defined success metrics for the migration itself (drift to zero, p99 unchanged, error budget unburned) and tracked them weekly. We tracked feature work; the migration drifted in the background until someone asked.</p>
      </>
    ),
  },
  fr: {
    title: 'Découper un service critique d’un monolithe',
    readingTime: 9,
    body: (
      <>
        <p>Extraire un morceau porteur d’un monolithe pour en faire un service à part, c’est typiquement le genre de projet où les parties amusantes — choisir une stack, dessiner le nouveau schéma — prennent 10% du temps. Les 90% restants, c’est une migration prudente et ennuyeuse que personne ne remarque quand ça marche.</p>
        <p>Voici ce qu’on a fait, ce qu’on a raté, et ce que je garderais.</p>

        <h2>1. Trouver la couture, puis la défendre</h2>
        <p>La première décision, c’est où couper. Dans un monolithe mature, chaque entité touche les autres — le graphe de schéma est dense, des clés étrangères traversent chaque domaine, et une stored procedure quelque part reprend la moitié du tout.</p>
        <p>On a choisi la couture en regardant les ratios lecture/écriture par table, pas le domaine conceptuel. Le candidat avait une petite surface d’écriture (quelques endpoints mutants), une grande surface de lecture (des dashboards partout), et des entrées bien définies. Cette asymétrie a rendu la phase de double-écriture tenable.</p>

        <h2>2. Figer le contrat avant d’écrire le service</h2>
        <p>Avant tout code, on a écrit le contrat — les événements, les payloads, les formes d’erreur — et on l’a figé dans un fichier versionné que les consommateurs vendorisent. Jamais d’édition en place ; un changement cassant, c’est une <code>v2</code>.</p>
        <CodeBlock code={contractCode} lang="typescript" filename="contracts/orders.v1.ts" />
        <p>Traiter le contrat comme l’artefact, pas l’implémentation, a permis à deux équipes d’avancer en parallèle sans coupler leurs cadences de merge.</p>

        <h2>3. Double-écriture avant double-lecture</h2>
        <p>La bascule, c’est quatre phases : écritures fantômes, lectures fantômes, lectures primaires, mise à la retraite. L’essentiel du risque vit dans les écritures fantômes — le nouveau service doit encaisser le débit d’écriture de prod tout en étant faux la moitié du temps.</p>
        <CodeBlock code={dualWriteCode} lang="typescript" filename="lib/place-order.ts" />
        <p>Le <code>.catch</code> compte. Un échec d’écriture fantôme ne doit <em>jamais</em> faire échouer le chemin utilisateur. On l’a appris à la dure pendant une semaine de réseau capricieux.</p>

        <h2>4. La réconciliation est la migration</h2>
        <p>Ce qui vérifie réellement la justesse du nouveau service, c’est un job quotidien qui compare les deux stores ligne par ligne. Toute dérive incrémente une gauge Prometheus. On a retardé le lancement deux fois à cause de petites dérives persistantes que personne ne voulait débugger.</p>
        <CodeBlock code={reconciliationCode} lang="sql" filename="ops/reconcile-orders.sql" />
        <p>Une dérive qu’on n’explique pas, c’est une dérive qu’on ne peut pas basculer.</p>

        <h2>5. La bascule est anticlimactique — par construction</h2>
        <p>Au moment de basculer les lectures, on avait quatre semaines de jours à zéro-dérive, des dashboards sur le p99 du nouveau service, et un flag de rollback testé. La bascule, c’était un changement de 3 lignes de config un mardi à 11h.</p>
        <p>Si votre bascule est dramatique, c’est que votre réconciliation n’a pas été assez honnête.</p>

        <h2>Ce que je referais autrement</h2>
        <p>Deux choses. D’abord, on a sous-estimé le temps qu’il faut pour mettre à la retraite le chemin monolithique — la longue traîne de jobs internes, scripts, et requêtes ad-hoc qui tapaient encore les vieilles tables a survécu à la bascule plusieurs mois. Ensuite, on aurait dû se fixer des métriques de succès pour la migration elle-même (dérive à zéro, p99 inchangé, budget d’erreur non consommé) et les suivre chaque semaine. On suivait le travail produit ; la migration a dérivé en arrière-plan jusqu’à ce qu’on pose la question.</p>
      </>
    ),
  },
  de: {
    title: 'Einen kritischen Dienst aus einem Monolithen herauslösen',
    readingTime: 9,
    body: (
      <>
        <p>Ein tragendes Stück aus einem Monolithen herauszulösen und in einen eigenen Dienst zu schieben, ist eines dieser Projekte, bei denen die schönen Teile — Stack auswählen, Schema skizzieren — 10% der Zeit kosten. Die anderen 90% sind eine vorsichtige, langweilige Migration, die niemand bemerkt, wenn sie klappt.</p>
        <p>Das hier ist, was wir getan haben, was schiefging und was ich behalten würde.</p>

        <h2>1. Die Naht finden — und verteidigen</h2>
        <p>Die erste Entscheidung ist, wo geschnitten wird. In einem reifen Monolithen berührt jede Entität jede andere — der Schema-Graph ist dicht, Fremdschlüssel laufen quer durch jede Domäne, und irgendwo greift eine stored procedure quer durch die Hälfte davon.</p>
        <p>Wir haben die Naht über die Read/Write-Verhältnisse pro Tabelle gewählt, nicht über die fachliche Domäne. Der Kandidat hatte eine kleine Schreib-Oberfläche (eine Handvoll mutierender Endpoints), eine große Leseoberfläche (Dashboards überall) und sauber definierte Eingaben. Diese Asymmetrie hat die Dual-Write-Phase erträglich gemacht.</p>

        <h2>2. Vertrag fixieren, bevor der Dienst geschrieben wird</h2>
        <p>Vor jedem Code haben wir den Vertrag aufgeschrieben — die Events, die Request-Payloads, die Fehlerformen — und ihn in einer versionierten Datei festgenagelt, die die Konsumenten ins Repo ziehen. Niemals eine In-place-Änderung; brechende Änderungen bekommen ein <code>v2</code>.</p>
        <CodeBlock code={contractCode} lang="typescript" filename="contracts/orders.v1.ts" />
        <p>Den Vertrag als Artefakt zu behandeln, nicht die Implementierung, hat zwei Teams parallel arbeiten lassen, ohne ihre Merge-Kadenzen zu koppeln.</p>

        <h2>3. Dual-Write vor Dual-Read</h2>
        <p>Der Cutover hat vier Phasen: Shadow-Writes, Shadow-Reads, Primary-Reads, Stilllegung. Das meiste Risiko sitzt in den Shadow-Writes — der neue Dienst muss die volle Produktions-Schreibrate aufnehmen, während er noch in der Hälfte der Fälle falsch liegt.</p>
        <CodeBlock code={dualWriteCode} lang="typescript" filename="lib/place-order.ts" />
        <p>Der <code>.catch</code> ist wichtig. Ein Shadow-Write-Fehler darf den Nutzerpfad <em>niemals</em> kippen. Das haben wir in einer flaky-Netz-Woche schmerzhaft gelernt.</p>

        <h2>4. Reconciliation ist die Migration</h2>
        <p>Was die Korrektheit des neuen Dienstes wirklich prüft, ist ein Tagesjob, der beide Stores Zeile für Zeile vergleicht. Jede Drift inkrementiert eine Prometheus-Gauge. Wir haben den Launch zweimal verschoben, weil kleine, beharrliche Drifts auftraten, die niemand debuggen wollte.</p>
        <CodeBlock code={reconciliationCode} lang="sql" filename="ops/reconcile-orders.sql" />
        <p>Drift, die du nicht erklären kannst, ist Drift, die du nicht umschalten kannst.</p>

        <h2>5. Der Cutover ist antiklimaktisch — by design</h2>
        <p>Als wir die Reads umschalteten, hatten wir vier Wochen Zero-Drift hinter uns, Dashboards auf dem p99 des neuen Dienstes und ein getestetes Rollback-Flag. Der Cutover war eine Drei-Zeilen-Config-Änderung an einem Dienstag um 11 Uhr.</p>
        <p>Wenn dein Cutover dramatisch ist, war deine Reconciliation nicht ehrlich genug.</p>

        <h2>Was ich anders machen würde</h2>
        <p>Zwei Dinge. Erstens haben wir unterschätzt, wie lange es dauert, den Monolithen-Pfad stillzulegen — der Long Tail aus internen Jobs, Skripten und Ad-hoc-Abfragen, die noch in die alten Tabellen griffen, hat den Cutover um Monate überlebt. Zweitens hätten wir Erfolgsmetriken für die Migration selbst definieren sollen (Drift gegen null, p99 unverändert, Error Budget unberührt) und sie wöchentlich verfolgen. Wir haben Feature-Arbeit verfolgt; die Migration ist im Hintergrund weggedriftet, bis jemand danach fragte.</p>
      </>
    ),
  },
  es: {
    title: 'Desacoplar un servicio crítico de un monolito',
    readingTime: 9,
    body: (
      <>
        <p>Sacar una pieza de carga de un monolito hacia su propio servicio es uno de esos proyectos en los que la parte divertida — elegir el stack, esbozar el esquema nuevo — se lleva el 10% del tiempo. El otro 90% es una migración cuidadosa y aburrida que nadie nota cuando funciona.</p>
        <p>Esto es lo que hicimos, lo que salió mal y lo que conservaría.</p>

        <h2>1. Encontrar la juntura, y defenderla</h2>
        <p>La primera decisión es por dónde cortar. En un monolito maduro, cada entidad toca a las demás — el grafo del esquema es denso, hay claves foráneas cruzando cada dominio y un stored procedure por ahí abarca la mitad de todo.</p>
        <p>Elegimos la juntura mirando ratios lectura/escritura por tabla, no el dominio conceptual. El candidato tenía una superficie pequeña de escritura (un puñado de endpoints mutantes), una superficie grande de lectura (dashboards en todas partes) y entradas bien definidas. Esa asimetría hizo soportable la fase de doble escritura.</p>

        <h2>2. Fijar el contrato antes de escribir el servicio</h2>
        <p>Antes de escribir código, escribimos el contrato — los eventos, los payloads, las formas de error — y lo fijamos en un archivo versionado que los consumidores vendorizan. Nunca una edición in situ; un cambio rompedor exige una <code>v2</code>.</p>
        <CodeBlock code={contractCode} lang="typescript" filename="contracts/orders.v1.ts" />
        <p>Tratar el contrato como el artefacto, no la implementación, permitió a dos equipos avanzar en paralelo sin acoplar sus cadencias de merge.</p>

        <h2>3. Doble escritura antes que doble lectura</h2>
        <p>El cutover son cuatro fases: shadow writes, shadow reads, lecturas primarias y baja. La mayor parte del riesgo vive en las shadow writes — el nuevo servicio tiene que absorber la tasa de escritura de producción mientras se equivoca la mitad del tiempo.</p>
        <CodeBlock code={dualWriteCode} lang="typescript" filename="lib/place-order.ts" />
        <p>El <code>.catch</code> importa. Un fallo de shadow write <em>nunca</em> debe romper el camino del usuario. Lo aprendimos a las malas en una semana de red inestable.</p>

        <h2>4. La reconciliación es la migración</h2>
        <p>Lo que de verdad verifica que el nuevo servicio es correcto es un job diario que compara los dos stores fila a fila. Cualquier drift incrementa un gauge en Prometheus. Retrasamos el lanzamiento dos veces por drifts pequeños y persistentes que nadie quería depurar.</p>
        <CodeBlock code={reconciliationCode} lang="sql" filename="ops/reconcile-orders.sql" />
        <p>Un drift que no puedes explicar es un drift que no puedes cutoverar.</p>

        <h2>5. El cutover es anticlimático — por diseño</h2>
        <p>Cuando volcamos las lecturas teníamos cuatro semanas de días con cero drift, dashboards sobre el p99 del nuevo servicio y un flag de rollback probado. El cambio en sí fueron tres líneas de configuración un martes a las once.</p>
        <p>Si tu cutover es dramático, tu reconciliación no fue lo bastante honesta.</p>

        <h2>Qué haría distinto</h2>
        <p>Dos cosas. Primera: subestimamos lo que cuesta retirar el camino monolítico — la cola larga de jobs internos, scripts y queries ad-hoc que seguían tocando las tablas viejas sobrevivió al cutover varios meses. Segunda: deberíamos haber definido métricas de éxito para la migración misma (drift a cero, p99 sin cambio, error budget intacto) y haberlas seguido semanalmente. Seguíamos el trabajo de feature; la migración fue desviándose en segundo plano hasta que alguien preguntó.</p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function MonolithToMicroservicePage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <PostDetail
        postIndex="01"
        title={t.title}
        date="2026-05-03"
        readingMinutes={t.readingTime}
        body={t.body}
      />
      <div style={{maxWidth: 720, margin: '0 auto', padding: '0 36px 60px'}}>
        <RelatedPosts postId="monolith-to-microservice" locale={locale} />
      </div>
    </>
  );
}
