import {getTranslations} from 'next-intl/server';
import DetailPage from '../../components/DetailPage';

const content = {
  en: {
    title: 'Wiremind',
    summary: (
      <p>
        Senior Fullstack Software Engineer on the <em>Cayzn</em> product — a B2B SaaS Revenue
        Management System for the passenger industry. Clients include rail (SNCF, Trenitalia),
        airlines (Transavia) and coach operators (BlaBlaBus).
      </p>
    ),
    body: (
      <>
        <p>
          <a href="https://www.wiremind.io/" target="_blank" rel="noopener noreferrer">Wiremind</a>{' '}
          is a Paris-based company building <strong>Cayzn</strong>, a Revenue Management System
          for passenger transport operators. The product helps them set fares, allocate capacity
          and forecast demand across thousands of departures a day. It runs in production for
          rail (SNCF, Trenitalia), airlines (Transavia) and coach networks (BlaBlaBus).
        </p>
        <h2>Day-to-day</h2>
        <p>
          I work as a <strong>Senior Fullstack Software Engineer</strong> across the whole stack:
          Angular on the front end, Python / Flask on the back end, Postgres for transactional
          data, Redis as cache, RabbitMQ for async jobs, Keycloak for authn/authz, and
          Elasticsearch for search and analytics.
        </p>
        <h2>What I <em>own</em></h2>
        <ul>
          <li>
            <strong>Feature development</strong> through agile sprints — fullstack work from
            schema and API design down to the Angular components and end-to-end tests.
          </li>
          <li>
            <strong>Configuration and technical onboarding</strong> for new clients: plugging
            them into the platform, mapping their data, and shipping go-lives.
          </li>
          <li>
            <strong>Technical support and maintenance</strong> — monitoring and alerting via
            Kibana, Grafana, alert.io and PagerDuty; driving incidents to root cause.
          </li>
          <li>
            <strong>End-to-end test pipeline</strong> — extending the suite, adding memory tests
            with <a href="https://facebook.github.io/memlab/" target="_blank" rel="noopener noreferrer">memlab</a>,
            and keeping the gating signal honest as the product grows.
          </li>
          <li>
            <strong>Recruitment and intern management</strong> — interviewing, onboarding and
            mentoring interns and junior engineers.
          </li>
          <li>
            <strong>Production deployments and hotfixes</strong> via GitLab CI and a set of
            in-house CLIs. I led a rework of the deploy process into a workflow the whole
            engineering team could own — fewer foot-guns, clearer rollback path.
          </li>
          <li>
            <strong>Decoupling work</strong> on a critical part of the monolith into a standalone
            microservice — schema split, contract design, dual-write migration, and cutover.
          </li>
        </ul>
        <h2>Stack <em>shipped</em></h2>
        <p>
          Angular · TypeScript · Python · Flask · Postgres · Redis · RabbitMQ · Keycloak ·
          Elasticsearch · Docker · GitLab CI · Kibana · Grafana · PagerDuty · memlab.
        </p>
      </>
    ),
  },
  fr: {
    title: 'Wiremind',
    summary: (
      <p>
        Ingénieur logiciel senior fullstack sur le produit <em>Cayzn</em> — un SaaS B2B de
        Revenue Management pour le transport de passagers. Clients : ferroviaire (SNCF,
        Trenitalia), aérien (Transavia), autocars (BlaBlaBus).
      </p>
    ),
    body: (
      <>
        <p>
          <a href="https://www.wiremind.io/" target="_blank" rel="noopener noreferrer">Wiremind</a>{' '}
          est une entreprise parisienne qui édite <strong>Cayzn</strong>, un système de Revenue
          Management pour les opérateurs de transport de passagers. Le produit aide à fixer les
          tarifs, allouer la capacité et prévoir la demande sur des milliers de départs par jour.
          Il tourne en production chez des opérateurs ferroviaires (SNCF, Trenitalia), aériens
          (Transavia) et d’autocars (BlaBlaBus).
        </p>
        <h2>Au quotidien</h2>
        <p>
          Je travaille comme <strong>ingénieur logiciel senior fullstack</strong> sur l’ensemble
          de la stack : Angular côté front, Python / Flask côté back, Postgres pour les données
          transactionnelles, Redis en cache, RabbitMQ pour l’asynchrone, Keycloak pour l’authn/
          authz, et Elasticsearch pour la recherche et l’analytique.
        </p>
        <h2>Ce dont je <em>suis responsable</em></h2>
        <ul>
          <li>
            <strong>Développement de nouvelles features</strong> en sprint agile — du schéma et
            de l’API jusqu’aux composants Angular et aux tests end-to-end.
          </li>
          <li>
            <strong>Configuration et onboarding technique</strong> des nouveaux clients : plug
            sur la plateforme, mapping des données, mise en production.
          </li>
          <li>
            <strong>Support technique et maintenance</strong> — monitoring et alerting via
            Kibana, Grafana, alert.io et PagerDuty ; gestion des incidents jusqu’au root cause.
          </li>
          <li>
            <strong>Pipeline de tests end-to-end</strong> — extension de la suite, ajout des
            tests mémoire avec <a href="https://facebook.github.io/memlab/" target="_blank" rel="noopener noreferrer">memlab</a>,
            maintien d’un signal de gating fiable au fil de la croissance du produit.
          </li>
          <li>
            <strong>Recrutement et management des stagiaires</strong> — entretiens, onboarding,
            mentoring.
          </li>
          <li>
            <strong>Déploiements de production et hotfixes</strong> via GitLab CI et des CLIs
            internes. J’ai mené la refonte du process de déploiement en un workflow accessible à
            toute l’équipe — moins de pièges, rollback plus clair.
          </li>
          <li>
            <strong>Découplage</strong> d’une partie critique du monolithe en micro-service —
            split du schéma, conception du contrat, migration en dual-write, bascule.
          </li>
        </ul>
        <h2>Stack <em>livrée</em></h2>
        <p>
          Angular · TypeScript · Python · Flask · Postgres · Redis · RabbitMQ · Keycloak ·
          Elasticsearch · Docker · GitLab CI · Kibana · Grafana · PagerDuty · memlab.
        </p>
      </>
    ),
  },
  de: {
    title: 'Wiremind',
    summary: (
      <p>
        Senior Fullstack Software Engineer am Produkt <em>Cayzn</em> — ein B2B-SaaS-Revenue-
        Management-System für die Passagierbranche. Kunden: Bahn (SNCF, Trenitalia), Airlines
        (Transavia), Fernbusse (BlaBlaBus).
      </p>
    ),
    body: (
      <>
        <p>
          <a href="https://www.wiremind.io/" target="_blank" rel="noopener noreferrer">Wiremind</a>{' '}
          ist ein Pariser Unternehmen und entwickelt <strong>Cayzn</strong>, ein Revenue-
          Management-System für Personenverkehrsbetriebe. Das Produkt hilft dabei, Tarife zu
          setzen, Kapazitäten zu verteilen und Nachfrage über Tausende Abfahrten pro Tag zu
          prognostizieren. Es läuft produktiv bei Bahn (SNCF, Trenitalia), Airlines (Transavia)
          und Fernbus-Netzen (BlaBlaBus).
        </p>
        <h2>Im Alltag</h2>
        <p>
          Ich arbeite als <strong>Senior Fullstack Software Engineer</strong> über den gesamten
          Stack: Angular im Frontend, Python / Flask im Backend, Postgres für transaktionale
          Daten, Redis als Cache, RabbitMQ für Async-Jobs, Keycloak für authn/authz und
          Elasticsearch für Suche und Analytik.
        </p>
        <h2>Was ich <em>verantworte</em></h2>
        <ul>
          <li>
            <strong>Feature-Entwicklung</strong> in agilen Sprints — fullstack vom Schema- und
            API-Design bis zu den Angular-Komponenten und End-to-End-Tests.
          </li>
          <li>
            <strong>Konfiguration und technisches Onboarding</strong> neuer Kunden: Anbindung an
            die Plattform, Daten-Mapping, Go-Live-Begleitung.
          </li>
          <li>
            <strong>Technischer Support und Wartung</strong> — Monitoring und Alerting über
            Kibana, Grafana, alert.io und PagerDuty; Incidents bis zum Root Cause.
          </li>
          <li>
            <strong>End-to-End-Test-Pipeline</strong> — Ausbau der Suite, Memory-Tests mit{' '}
            <a href="https://facebook.github.io/memlab/" target="_blank" rel="noopener noreferrer">memlab</a>,
            ein verlässliches Gating-Signal mit dem Produkt mitwachsen lassen.
          </li>
          <li>
            <strong>Recruiting und Praktikanten-Management</strong> — Interviews, Onboarding,
            Mentoring.
          </li>
          <li>
            <strong>Produktions-Deployments und Hotfixes</strong> über GitLab CI und hauseigene
            CLIs. Ich habe den Deploy-Prozess in einen Workflow überführt, den das ganze Team
            tragen kann — weniger Stolperfallen, klarer Rollback-Pfad.
          </li>
          <li>
            <strong>Entkopplung</strong> eines kritischen Teils des Monolithen in einen Micro-
            service — Schema-Split, Contract Design, Dual-Write-Migration, Cutover.
          </li>
        </ul>
        <h2>Stack <em>im Einsatz</em></h2>
        <p>
          Angular · TypeScript · Python · Flask · Postgres · Redis · RabbitMQ · Keycloak ·
          Elasticsearch · Docker · GitLab CI · Kibana · Grafana · PagerDuty · memlab.
        </p>
      </>
    ),
  },
  es: {
    title: 'Wiremind',
    summary: (
      <p>
        Ingeniero fullstack senior en el producto <em>Cayzn</em> — un SaaS B2B de Revenue
        Management para el transporte de pasajeros. Clientes: ferrocarril (SNCF, Trenitalia),
        aerolíneas (Transavia) y autobuses (BlaBlaBus).
      </p>
    ),
    body: (
      <>
        <p>
          <a href="https://www.wiremind.io/" target="_blank" rel="noopener noreferrer">Wiremind</a>{' '}
          es una empresa parisina que desarrolla <strong>Cayzn</strong>, un sistema de Revenue
          Management para operadores de transporte de pasajeros. El producto ayuda a fijar
          tarifas, asignar capacidad y predecir demanda en miles de salidas al día. Está en
          producción en operadores ferroviarios (SNCF, Trenitalia), aerolíneas (Transavia) y
          redes de autobuses (BlaBlaBus).
        </p>
        <h2>En el día a día</h2>
        <p>
          Trabajo como <strong>ingeniero fullstack senior</strong> en toda la stack: Angular en
          el front, Python / Flask en el back, Postgres para datos transaccionales, Redis como
          caché, RabbitMQ para jobs asíncronos, Keycloak para authn/authz y Elasticsearch para
          búsqueda y analítica.
        </p>
        <h2>De qué <em>me encargo</em></h2>
        <ul>
          <li>
            <strong>Desarrollo de funcionalidades</strong> en sprints agile — fullstack desde el
            esquema y la API hasta los componentes Angular y los tests end-to-end.
          </li>
          <li>
            <strong>Configuración y onboarding técnico</strong> de nuevos clientes: enchufe a la
            plataforma, mapeo de datos, puesta en producción.
          </li>
          <li>
            <strong>Soporte técnico y mantenimiento</strong> — monitorización y alertas con
            Kibana, Grafana, alert.io y PagerDuty; gestión de incidencias hasta la causa raíz.
          </li>
          <li>
            <strong>Pipeline de tests end-to-end</strong> — ampliación de la suite, tests de
            memoria con <a href="https://facebook.github.io/memlab/" target="_blank" rel="noopener noreferrer">memlab</a>,
            manteniendo una señal de gating fiable a medida que crece el producto.
          </li>
          <li>
            <strong>Reclutamiento y gestión de prácticas</strong> — entrevistas, onboarding,
            mentoring.
          </li>
          <li>
            <strong>Despliegues de producción y hotfixes</strong> con GitLab CI y CLIs internos.
            Lideré la reorganización del proceso de despliegue en un flujo manejable por todo el
            equipo — menos trampas, rollback más claro.
          </li>
          <li>
            <strong>Desacoplamiento</strong> de una parte crítica del monolito en un
            microservicio — split del esquema, diseño del contrato, migración en dual-write,
            cutover.
          </li>
        </ul>
        <h2>Stack <em>en producción</em></h2>
        <p>
          Angular · TypeScript · Python · Flask · Postgres · Redis · RabbitMQ · Keycloak ·
          Elasticsearch · Docker · GitLab CI · Kibana · Grafana · PagerDuty · memlab.
        </p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function WiremindPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;
  const tr = await getTranslations({locale});
  return (
    <DetailPage
      section="experience"
      sectionLabel={tr('nav.experience')}
      indexLabel={tr('nav.index')}
      eyebrow="// 2022 → present · Paris"
      title={`${t.title}<em>.</em>`}
      meta="01 / Experience"
      summary={t.summary}
      body={t.body}
      footerLabel="01 / Experience"
    />
  );
}
