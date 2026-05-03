import CodeBlock from '../../components/CodeBlock';
import PostDetail from '../../components/PostDetail';
import RelatedPosts from '../../components/RelatedPosts';

const beforeScript = `# What you'd type, if you remembered the flags
$ ./deploy.sh --env=staging --service=billing --skip-migrate
# Then SSH in and run the migration manually
$ ssh ops@deploy "cd /srv/billing && ./migrate.sh"
# Hope nobody else is mid-deploy on the same host`;

const ciYaml = `# .gitlab-ci.yml — single source of truth
stages: [test, build, deploy]

deploy:staging:
  stage: deploy
  environment: { name: staging, url: https://staging.example.com }
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
  script:
    - ./scripts/deploy.sh staging $CI_COMMIT_SHA
  resource_group: deploy-staging  # one deploy at a time, queued`;

const guardrailCode = `# scripts/deploy.sh — fails loud, fails early
set -euo pipefail
ENV="$1"
SHA="$2"

# 1. Refuse if migrations need review
./scripts/check-migrations.sh "$ENV" || exit 1

# 2. Health check before flipping traffic
./scripts/wait-healthy.sh "$ENV-canary" --timeout=300

# 3. Tag the deploy in Grafana for postmortems
curl -sX POST "$GRAFANA_URL/api/annotations" \\
  -d "{\\"text\\":\\"deploy $SHA\\",\\"tags\\":[\\"$ENV\\"]}"`;

const content = {
  en: {
    title: 'Reworking a Deploy Process for a Whole Team',
    readingTime: 6,
    body: (
      <>
        <p>The team had a deploy process. It was a 200-line bash script, three slightly-different flags depending on the service, an SSH step in the middle, and a tribal-knowledge layer that lived in Slack threads. It worked. It also burned 90 minutes per deploy, deferred to one engineer who held all the context, and broke whenever two people pushed at the same time.</p>
        <p>This is how we replaced it. Not the prettiest version — the one that actually shipped.</p>

        <h2>The brief</h2>
        <p>Three goals, in order:</p>
        <ol>
          <li><strong>One way to deploy</strong>, not three.</li>
          <li><strong>Anyone on the team can run it</strong>, not just the on-call.</li>
          <li><strong>Reversible</strong> — the rollback path has to be the same path, run with a different argument.</li>
        </ol>
        <p>What we explicitly did <em>not</em> chase: zero-touch CD on every PR, blue-green every service, fancy Argo dashboards. Those would have been nice. None of them were the actual problem.</p>

        <h2>What it looked like before</h2>
        <CodeBlock code={beforeScript} lang="bash" filename="deploy.sh (the old way)" />
        <p>The script wasn’t bad — it was undocumented, and the docs that did exist were 11 months stale. New joiners learned by pairing for 90 minutes with whoever had time. The bus factor was conspicuous.</p>

        <h2>What it looks like now</h2>
        <p>Everything goes through a GitLab CI pipeline that lives next to the code. The pipeline owns the deploy. Engineers own the merge. There is no SSH step.</p>
        <CodeBlock code={ciYaml} lang="yaml" filename=".gitlab-ci.yml" />
        <p>The <code>resource_group</code> directive is the single biggest win. It serializes deploys per environment without us having to write a lock. No more two-people-at-once chaos.</p>

        <h2>Guardrails before fancy</h2>
        <p>The deploy script is shorter than the old one. It does fewer things, and refuses to do the dangerous ones.</p>
        <CodeBlock code={guardrailCode} lang="bash" filename="scripts/deploy.sh" />
        <p>The Grafana annotation is the cheapest, highest-ROI addition we made. Every deploy is now a vertical line on every dashboard. Postmortems went from "when did this start?" guesswork to a 30-second visual lookup.</p>

        <h2>What broke during the rollout</h2>
        <p>Three things, all worth their lessons.</p>
        <p><strong>Cache stampede on the first canary.</strong> The new deploy was faster, the canary came up too fast, and a cold cache hit production all at once. Fixed with a 60-second warm-up curl in the script.</p>
        <p><strong>Migration timing.</strong> Our old script ran migrations after the deploy. The new one ran them before. Two services briefly had code that referenced columns that didn’t exist yet. Fixed by enforcing the "additive migrations only, deploy first, then drop" pattern in CI.</p>
        <p><strong>Rollback didn’t roll back data.</strong> Obvious in hindsight. We made it explicit in the runbook: code rollback is one command, data rollback is a conversation.</p>

        <h2>What we measured</h2>
        <p>We tracked four numbers from week 0:</p>
        <ul>
          <li>Time-to-deploy (PR merged → live): <strong>92 min → 11 min</strong></li>
          <li>Deploys/week: <strong>3 → 14</strong></li>
          <li>Failed deploys/week: same (≈1), but mean-time-to-rollback dropped from ~25 min to under 4</li>
          <li>People who can deploy without help: <strong>1 → 9</strong></li>
        </ul>
        <p>The last one is the only one that matters long-term. The rest are byproducts.</p>

        <h2>What I’d do earlier next time</h2>
        <p>Start with the runbook, not the YAML. The runbook forced the conversations — what counts as a rollback, who owns the decision, what we do at 3am — and the YAML basically wrote itself once we agreed on those. Doing it the other way around (writing the pipeline first, documenting it after) would have left the pipeline holding implicit decisions nobody had actually made.</p>
      </>
    ),
  },
  fr: {
    title: 'Refondre le processus de déploiement d’une équipe entière',
    readingTime: 6,
    body: (
      <>
        <p>L’équipe avait un processus de déploiement. C’était un script bash de 200 lignes, trois flags légèrement différents selon le service, une étape SSH au milieu, et une couche de savoir tribal qui vivait dans des threads Slack. Ça marchait. Ça brûlait aussi 90 minutes par déploiement, ça reposait sur un ingénieur qui portait tout le contexte, et ça cassait dès que deux personnes poussaient en même temps.</p>
        <p>Voici comment on l’a remplacé. Pas la version la plus jolie — celle qui a vraiment été livrée.</p>

        <h2>Le brief</h2>
        <p>Trois objectifs, dans l’ordre :</p>
        <ol>
          <li><strong>Une seule façon de déployer</strong>, pas trois.</li>
          <li><strong>N’importe qui dans l’équipe peut le lancer</strong>, pas seulement l’astreinte.</li>
          <li><strong>Réversible</strong> — le chemin de rollback est le même, avec un argument différent.</li>
        </ol>
        <p>Ce qu’on n’a explicitement <em>pas</em> couru : du CD zero-touch sur chaque PR, du blue-green pour chaque service, des dashboards Argo classes. Ça aurait été agréable. Ce n’était pas le vrai problème.</p>

        <h2>Avant</h2>
        <CodeBlock code={beforeScript} lang="bash" filename="deploy.sh (l’ancienne version)" />
        <p>Le script n’était pas mauvais — il était sans doc, et celle qui existait avait 11 mois de retard. Les nouveaux apprenaient en pair-programmant 90 minutes avec qui avait du temps. Le bus factor était voyant.</p>

        <h2>Maintenant</h2>
        <p>Tout passe par un pipeline GitLab CI qui vit à côté du code. Le pipeline porte le déploiement. Les ingés portent le merge. Il n’y a plus de SSH.</p>
        <CodeBlock code={ciYaml} lang="yaml" filename=".gitlab-ci.yml" />
        <p>La directive <code>resource_group</code> est le gain le plus gros. Elle sérialise les déploiements par environnement sans qu’on ait à écrire un verrou. Plus de chaos à deux.</p>

        <h2>Garde-fous avant fioritures</h2>
        <p>Le script de déploiement est plus court que l’ancien. Il fait moins, et il refuse de faire les choses dangereuses.</p>
        <CodeBlock code={guardrailCode} lang="bash" filename="scripts/deploy.sh" />
        <p>L’annotation Grafana est le plus petit ajout au plus gros ROI qu’on ait fait. Chaque déploiement est maintenant une ligne verticale sur chaque dashboard. Les postmortems sont passés de "quand ça a commencé ?" à 30 secondes de visuel.</p>

        <h2>Ce qui a cassé pendant la transition</h2>
        <p>Trois choses, toutes utiles.</p>
        <p><strong>Cache stampede sur la première canary.</strong> Le nouveau déploiement était plus rapide, la canary remontait trop vite, et un cache froid a pris la prod en pleine face. Réglé avec un curl de chauffe de 60 secondes dans le script.</p>
        <p><strong>Ordre des migrations.</strong> L’ancien script jouait les migrations après le déploiement. Le nouveau les jouait avant. Deux services ont brièvement référencé des colonnes qui n’existaient pas encore. Réglé en imposant le pattern "migrations additives uniquement, déployer d’abord, dropper plus tard" dans la CI.</p>
        <p><strong>Le rollback ne rollback pas les données.</strong> Évident a posteriori. On l’a écrit en clair dans le runbook : rollback de code, une commande ; rollback de données, une discussion.</p>

        <h2>Ce qu’on a mesuré</h2>
        <p>On a suivi quatre chiffres depuis la semaine 0 :</p>
        <ul>
          <li>Temps de déploiement (PR mergée → en ligne) : <strong>92 min → 11 min</strong></li>
          <li>Déploiements / semaine : <strong>3 → 14</strong></li>
          <li>Déploiements ratés / semaine : pareil (≈1), mais le temps moyen de rollback est passé de ~25 min à moins de 4</li>
          <li>Personnes capables de déployer sans aide : <strong>1 → 9</strong></li>
        </ul>
        <p>Le dernier est le seul qui compte sur la durée. Les autres en découlent.</p>

        <h2>Ce que je commencerais plus tôt</h2>
        <p>Commencer par le runbook, pas par le YAML. Le runbook a forcé les conversations — ce qui compte comme un rollback, qui décide, ce qu’on fait à 3h du matin — et le YAML a quasi écrit lui-même une fois ces points accordés. Dans l’autre sens (pipeline d’abord, doc après), on se serait retrouvés avec un pipeline portant des décisions implicites que personne n’avait vraiment prises.</p>
      </>
    ),
  },
  de: {
    title: 'Den Deploy-Prozess für ein ganzes Team neu denken',
    readingTime: 6,
    body: (
      <>
        <p>Das Team hatte einen Deploy-Prozess. Ein 200-Zeilen-Bash-Skript, drei leicht unterschiedliche Flags je nach Service, ein SSH-Schritt in der Mitte und eine Schicht aus Stammeswissen, die in Slack-Threads lebte. Es funktionierte. Es verbrannte aber auch 90 Minuten pro Deploy, hing an einem Engineer, der den gesamten Kontext kannte, und brach immer dann, wenn zwei Leute gleichzeitig pushten.</p>
        <p>So haben wir es ersetzt. Nicht die schönste Version — die, die wirklich live ging.</p>

        <h2>Das Briefing</h2>
        <p>Drei Ziele, in dieser Reihenfolge:</p>
        <ol>
          <li><strong>Ein einziger Weg zu deployen</strong>, nicht drei.</li>
          <li><strong>Jeder im Team kann ihn ausführen</strong>, nicht nur der On-Call.</li>
          <li><strong>Reversibel</strong> — der Rollback-Pfad ist derselbe Pfad, nur mit anderem Argument.</li>
        </ol>
        <p>Was wir explizit <em>nicht</em> verfolgt haben: Zero-Touch-CD bei jeder PR, Blue-Green pro Service, hübsche Argo-Dashboards. Wäre nett gewesen. War nicht das eigentliche Problem.</p>

        <h2>Vorher</h2>
        <CodeBlock code={beforeScript} lang="bash" filename="deploy.sh (alt)" />
        <p>Das Skript war nicht schlecht — es war undokumentiert, und die Doku, die es gab, war 11 Monate veraltet. Neue lernten durch 90 Minuten Pairing mit dem, der gerade Zeit hatte. Der Bus-Faktor war augenfällig.</p>

        <h2>Heute</h2>
        <p>Alles läuft durch eine GitLab-CI-Pipeline, die neben dem Code liegt. Die Pipeline besitzt den Deploy. Engineers besitzen den Merge. Keinen SSH-Schritt mehr.</p>
        <CodeBlock code={ciYaml} lang="yaml" filename=".gitlab-ci.yml" />
        <p>Die <code>resource_group</code>-Direktive ist der größte Einzelgewinn. Sie serialisiert Deploys pro Environment, ohne dass wir einen Lock schreiben mussten. Kein Zwei-Personen-Chaos mehr.</p>

        <h2>Leitplanken vor Schnickschnack</h2>
        <p>Das Deploy-Skript ist kürzer als das alte. Es tut weniger und weigert sich, die gefährlichen Dinge zu tun.</p>
        <CodeBlock code={guardrailCode} lang="bash" filename="scripts/deploy.sh" />
        <p>Die Grafana-Annotation ist die billigste, am stärksten zurückzahlende Ergänzung, die wir gemacht haben. Jeder Deploy ist jetzt eine vertikale Linie auf jedem Dashboard. Postmortems gingen von „Wann hat das begonnen?“ zu 30 Sekunden Sichtprüfung.</p>

        <h2>Was während der Umstellung kaputtging</h2>
        <p>Drei Dinge, alle ihre Lektion wert.</p>
        <p><strong>Cache-Stampede beim ersten Canary.</strong> Der neue Deploy war schneller, der Canary kam zu schnell hoch, und ein kalter Cache schlug die Produktion auf einen Schlag. Behoben mit einem 60-Sekunden-Warm-up-Curl im Skript.</p>
        <p><strong>Migrations-Reihenfolge.</strong> Das alte Skript spielte Migrationen nach dem Deploy. Das neue davor. Zwei Services referenzierten kurz Spalten, die noch nicht existierten. Behoben, indem wir das Muster „nur additive Migrationen, erst deployen, später droppen“ in der CI erzwangen.</p>
        <p><strong>Rollback rollte keine Daten zurück.</strong> Im Nachhinein offensichtlich. Wir haben es im Runbook explizit gemacht: Code-Rollback ist ein Befehl, Daten-Rollback ist ein Gespräch.</p>

        <h2>Was wir gemessen haben</h2>
        <p>Vier Zahlen seit Woche 0:</p>
        <ul>
          <li>Time-to-deploy (PR gemerged → live): <strong>92 min → 11 min</strong></li>
          <li>Deploys/Woche: <strong>3 → 14</strong></li>
          <li>Fehlgeschlagene Deploys/Woche: gleich (≈1), aber die mittlere Rollback-Zeit fiel von ~25 min auf unter 4</li>
          <li>Leute, die ohne Hilfe deployen können: <strong>1 → 9</strong></li>
        </ul>
        <p>Die letzte Zahl ist die einzige, die langfristig zählt. Die anderen sind Nebenprodukte.</p>

        <h2>Was ich beim nächsten Mal früher tun würde</h2>
        <p>Mit dem Runbook anfangen, nicht mit dem YAML. Das Runbook hat die Gespräche erzwungen — was als Rollback zählt, wer entscheidet, was wir um 3 Uhr morgens tun — und das YAML hat sich danach quasi selbst geschrieben. Andersrum (zuerst die Pipeline, danach die Doku) hätte uns mit einer Pipeline zurückgelassen, die implizite Entscheidungen trägt, die niemand wirklich getroffen hatte.</p>
      </>
    ),
  },
  es: {
    title: 'Rehacer el proceso de despliegue para todo un equipo',
    readingTime: 6,
    body: (
      <>
        <p>El equipo tenía un proceso de despliegue. Un script bash de 200 líneas, tres flags ligeramente distintos según el servicio, un paso SSH en medio y una capa de conocimiento tribal que vivía en hilos de Slack. Funcionaba. También quemaba 90 minutos por despliegue, dependía de un ingeniero que cargaba todo el contexto y se rompía en cuanto dos personas pusheaban a la vez.</p>
        <p>Así lo reemplazamos. No la versión más bonita — la que de verdad fue a producción.</p>

        <h2>El brief</h2>
        <p>Tres objetivos, en este orden:</p>
        <ol>
          <li><strong>Una sola forma de desplegar</strong>, no tres.</li>
          <li><strong>Cualquiera del equipo puede ejecutarla</strong>, no solo la guardia.</li>
          <li><strong>Reversible</strong> — el camino de rollback es el mismo camino, con otro argumento.</li>
        </ol>
        <p>Lo que explícitamente <em>no</em> perseguimos: CD zero-touch en cada PR, blue-green por servicio, dashboards de Argo elegantes. Habría estado bien. No era el problema.</p>

        <h2>Antes</h2>
        <CodeBlock code={beforeScript} lang="bash" filename="deploy.sh (la forma vieja)" />
        <p>El script no era malo — estaba sin documentar, y la doc que había llevaba 11 meses obsoleta. Los nuevos aprendían pair-programmeando 90 minutos con quien tenía hueco. El bus factor saltaba a la vista.</p>

        <h2>Hoy</h2>
        <p>Todo pasa por un pipeline de GitLab CI que vive junto al código. El pipeline es dueño del despliegue. Los ingenieros son dueños del merge. No hay paso SSH.</p>
        <CodeBlock code={ciYaml} lang="yaml" filename=".gitlab-ci.yml" />
        <p>La directiva <code>resource_group</code> es la mayor victoria individual. Serializa los despliegues por entorno sin que tengamos que escribir un lock. Se acabó el caos a dos.</p>

        <h2>Salvaguardas antes que florituras</h2>
        <p>El script de despliegue es más corto que el viejo. Hace menos y se niega a hacer las cosas peligrosas.</p>
        <CodeBlock code={guardrailCode} lang="bash" filename="scripts/deploy.sh" />
        <p>La anotación de Grafana es la incorporación más barata y de mayor ROI que hicimos. Cada despliegue es ahora una línea vertical en cada dashboard. Los postmortems pasaron de "¿cuándo empezó esto?" a 30 segundos de inspección visual.</p>

        <h2>Lo que se rompió durante la transición</h2>
        <p>Tres cosas, todas con su lección.</p>
        <p><strong>Cache stampede en el primer canary.</strong> El nuevo despliegue era más rápido, el canary subía demasiado pronto y un cache frío golpeó producción de golpe. Arreglado con un curl de calentamiento de 60 segundos en el script.</p>
        <p><strong>Orden de las migraciones.</strong> El script viejo corría migraciones después del despliegue. El nuevo, antes. Dos servicios referenciaron por un instante columnas que aún no existían. Arreglado imponiendo en CI el patrón "solo migraciones aditivas, desplegar primero, dropear después".</p>
        <p><strong>El rollback no rollbackeaba datos.</strong> Obvio a posteriori. Lo dejamos explícito en el runbook: rollback de código es un comando; rollback de datos es una conversación.</p>

        <h2>Lo que medimos</h2>
        <p>Seguimos cuatro números desde la semana 0:</p>
        <ul>
          <li>Tiempo de despliegue (PR mergeada → en producción): <strong>92 min → 11 min</strong></li>
          <li>Despliegues/semana: <strong>3 → 14</strong></li>
          <li>Despliegues fallidos/semana: igual (≈1), pero el tiempo medio de rollback bajó de ~25 min a menos de 4</li>
          <li>Personas que pueden desplegar sin ayuda: <strong>1 → 9</strong></li>
        </ul>
        <p>El último es el único que importa a largo plazo. El resto son subproductos.</p>

        <h2>Lo que empezaría antes la próxima vez</h2>
        <p>Empezar por el runbook, no por el YAML. El runbook forzó las conversaciones — qué cuenta como rollback, quién decide, qué hacemos a las 3 de la mañana — y el YAML prácticamente se escribió solo una vez acordados esos puntos. Al revés (pipeline primero, doc después) nos habría dejado con un pipeline cargando decisiones implícitas que nadie había tomado realmente.</p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function DeployProcessReworkPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  return (
    <>
      <PostDetail
        postIndex="02"
        title={t.title}
        date="2026-05-03"
        readingMinutes={t.readingTime}
        body={t.body}
      />
      <div style={{maxWidth: 720, margin: '0 auto', padding: '0 36px 60px'}}>
        <RelatedPosts postId="deploy-process-rework" locale={locale} />
      </div>
    </>
  );
}
