import projectStats from './project-stats.json';

type ContentItem = {
  id: string;
  date: string;
  title: Record<string, string>;
  tags?: string[];
  description?: Record<string, string>;
  startDate?: string;
  endDate?: string;
  // Posts-only field: archived posts keep their /posts/<slug> route but are
  // hidden from the listing and from related-post results.
  archived?: boolean;
  // Project-only fields (used by the `projects` category):
  github?: string;
  live?: string;
  tech?: string[];
  name?: Record<string, string>;       // card title in /skills/projects (e.g. "Multiplayer Online Pong")
  tagline?: Record<string, string>;     // home rail subtitle (e.g. "multiplayer online Pong")
  stamp?: string;                        // home/skills rail stamp (e.g. "5 contrib", "solo")
  stack?: string;                        // /skills spec line (e.g. "TS · React · NestJS")
};

type ProjectStats = {contributors: number; lines: number; commits: number};

const stats = projectStats as Record<string, ProjectStats>;

const registry: Record<string, ContentItem[]> = {
  experience: [
    {id: 'Wiremind', date: '2026-05-02', title: {en: 'Wiremind', fr: 'Wiremind', de: 'Wiremind', es: 'Wiremind'}, startDate: '2022-09', endDate: 'present'},
    {id: 'Junior-42-Paris', date: '2022-05-12', title: {en: 'Junior 42 Paris', fr: 'Junior 42 Paris', de: 'Junior 42 Paris', es: 'Junior 42 Paris'}, startDate: '2020-09', endDate: '2022-05'},
    {id: 'ESF-Sciences-Humaines', date: '2019-09-01', title: {en: 'ESF Sciences Humaines', fr: 'ESF Sciences Humaines', de: 'ESF Sciences Humaines', es: 'ESF Sciences Humaines'}, startDate: '2018-09', endDate: '2019-06'},
    {id: 'Editions-Denoel', date: '2017-09-01', title: {en: 'Editions Denoël', fr: 'Editions Denoël', de: 'Editions Denoël', es: 'Editions Denoël'}, startDate: '2015-09', endDate: '2017-06'},
    {id: 'Flammarion', date: '2015-09-01', title: {en: 'Flammarion', fr: 'Flammarion', de: 'Flammarion', es: 'Flammarion'}, startDate: '2015-02', endDate: '2015-07'},
  ],
  education: [
    {id: '42-Paris', date: '2022-05-12', title: {en: '42 Paris', fr: '42 Paris', de: '42 Paris', es: '42 Paris'}, startDate: '2019-09', endDate: '2022-05'},
    {id: 'IAE-Lille', date: '2017-09-01', title: {en: 'IAE Lille', fr: 'IAE Lille', de: 'IAE Lille', es: 'IAE Lille'}, startDate: '2014-09', endDate: '2017-06'},
    {id: 'CPGE_BL', date: '2014-09-01', title: {en: 'CPGE BL', fr: 'CPGE BL', de: 'CPGE BL', es: 'CPGE BL'}, startDate: '2012-09', endDate: '2014-06'},
  ],
  skills: [
    {id: 'projects', date: '2022-05-12', title: {en: 'Projects', fr: 'Projets', de: 'Projekte', es: 'Projects'}},
    {id: 'soft-skills', date: '2022-05-12', title: {en: 'Soft skills', fr: 'Soft skills', de: 'Soft skills', es: 'Soft skills'}},
    {id: 'stack', date: '2022-05-12', title: {en: 'Stack', fr: 'Stack', de: 'Stack', es: 'Stack'}},
  ],
  about_me: [
    {id: 'infos', date: '2022-05-12', title: {en: 'My infos', fr: 'Mes infos', de: 'Meine Infos', es: 'Mis informaciones'}},
    {id: 'languages', date: '2022-05-12', title: {en: 'Languages', fr: 'Langues', de: 'Sprachen', es: 'Idiomas'}},
    {id: 'cv', date: '2022-05-12', title: {en: 'CV', fr: 'CV', de: 'Lebenslauf', es: 'Currículum'}},
  ],
  hobbies: [
    {id: 'biking', date: '2022-05-12', title: {en: 'Biking', fr: 'Vélo', de: 'Radfahren', es: 'Ciclismo'}},
    {id: 'graphic-novels', date: '2022-05-12', title: {en: 'Graphic Novels', fr: 'Romans graphiques', de: 'Graphic Novels', es: 'Novelas gráficas'}},
    {id: 'podcasts', date: '2022-05-12', title: {en: 'Podcasts', fr: 'Podcasts', de: 'Podcasts', es: 'Podcasts'}},
  ],
  posts: [
    {id: 'monolith-to-microservice', date: '2026-05-03', title: {en: 'Decoupling a Critical Service from a Monolith', fr: 'Découper un service critique d’un monolithe', de: 'Einen kritischen Dienst aus einem Monolithen herauslösen', es: 'Desacoplar un servicio crítico de un monolito'}, tags: ['architecture', 'microservices', 'migrations'], description: {en: 'Schema split, contract design, dual-write migration, cutover — a real-world extraction without downtime.', fr: 'Split de schéma, design de contrat, migration en double-écriture, bascule — une extraction réelle sans coupure.', de: 'Schema-Split, Vertragsdesign, Dual-Write-Migration, Cutover — eine reale Extraktion ohne Ausfallzeit.', es: 'Split de esquema, diseño de contrato, migración con doble escritura, cutover — una extracción real sin downtime.'}},
    {id: 'deploy-process-rework', date: '2026-05-03', title: {en: 'Reworking a Deploy Process for a Whole Team', fr: 'Refondre le processus de déploiement d’une équipe entière', de: 'Ein Deploy-Prozess für ein ganzes Team neu denken', es: 'Rehacer el proceso de despliegue para todo un equipo'}, tags: ['devops', 'gitlab-ci', 'deploy'], description: {en: 'From ad-hoc CLIs to a shared GitLab CI workflow — what broke, what we measured, what changed.', fr: 'Des CLIs ad-hoc à un workflow GitLab CI partagé — ce qui a cassé, ce qu’on a mesuré, ce qui a changé.', de: 'Von ad-hoc-CLIs zu einem gemeinsamen GitLab-CI-Workflow — was kaputtging, was wir gemessen haben, was sich änderte.', es: 'De CLIs ad-hoc a un workflow GitLab CI compartido — lo que se rompió, lo que medimos, lo que cambió.'}},
    {id: 'memory-tests-memlab', date: '2026-05-03', title: {en: 'Memory Tests with memlab — What They Catch, What They Don’t', fr: 'Tests mémoire avec memlab — ce qu’ils attrapent, ce qu’ils ratent', de: 'Memory-Tests mit memlab — was sie finden und was nicht', es: 'Tests de memoria con memlab — lo que detectan y lo que no'}, tags: ['testing', 'performance', 'memlab'], description: {en: 'A pragmatic look at memlab — what it actually catches, what it misses, and where it belongs in CI.', fr: 'Un regard pragmatique sur memlab — ce qu’il attrape réellement, ce qu’il rate, et sa place dans la CI.', de: 'Ein pragmatischer Blick auf memlab — was es wirklich findet, was es übersieht und wo es in die CI gehört.', es: 'Una mirada pragmática a memlab — qué detecta de verdad, qué se le escapa y dónde encaja en CI.'}},
    {id: 'ai-augmented-dev', date: '2026-05-03', title: {en: 'A Year of AI-Augmented Development', fr: 'Une année de développement augmenté par l’IA', de: 'Ein Jahr KI-gestützte Entwicklung', es: 'Un año de desarrollo aumentado por IA'}, tags: ['ai', 'tooling', 'productivity'], description: {en: 'An honest take on Claude Code and GPT Codex after a year of daily use — wins, traps, and where the score really sits.', fr: 'Un retour honnête sur Claude Code et GPT Codex après un an d’usage quotidien — gains, pièges, et où se situe vraiment le score.', de: 'Eine ehrliche Einschätzung zu Claude Code und GPT Codex nach einem Jahr täglicher Nutzung — Gewinne, Fallen und wo der Score wirklich steht.', es: 'Una opinión honesta sobre Claude Code y GPT Codex tras un año de uso diario — logros, trampas y dónde se sitúa de verdad la puntuación.'}},
    {id: 'building-modern-blog', date: '2026-03-15', title: {en: 'Building a Modern Blog with Next.js App Router', fr: 'Construire un blog moderne avec le App Router de Next.js', de: 'Einen modernen Blog mit dem Next.js App Router erstellen', es: 'Construyendo un blog moderno con el App Router de Next.js'}, tags: ['nextjs', 'app-router', 'react'], description: {en: 'A guide to building a performant blog using the Next.js App Router with server components.', fr: 'Un guide pour construire un blog performant avec le App Router de Next.js et les composants serveur.', de: 'Eine Anleitung zum Erstellen eines performanten Blogs mit dem Next.js App Router und Server-Komponenten.', es: 'Una guia para construir un blog eficiente usando el App Router de Next.js con componentes de servidor.'}},
    {id: 'typescript-react-patterns', date: '2026-03-10', title: {en: 'TypeScript Patterns for React 19', fr: 'Patterns TypeScript pour React 19', de: 'TypeScript-Patterns für React 19', es: 'Patrones TypeScript para React 19'}, tags: ['typescript', 'react', 'patterns'], description: {en: 'Essential TypeScript patterns for writing type-safe React 19 components.', fr: 'Les patterns TypeScript essentiels pour des composants React 19 type-safe.', de: 'Essentielle TypeScript-Patterns für typsichere React 19-Komponenten.', es: 'Patrones TypeScript esenciales para componentes React 19 con tipado seguro.'}},
    {id: 'next-intl-guide', date: '2026-03-05', title: {en: 'Internationalization with next-intl', fr: 'Internationalisation avec next-intl', de: 'Internationalisierung mit next-intl', es: 'Internacionalización con next-intl'}, tags: ['nextjs', 'i18n', 'next-intl'], description: {en: 'How to add multi-language support to your Next.js app using next-intl.', fr: 'Comment ajouter le support multilingue à votre application Next.js avec next-intl.', de: 'Wie Sie mit next-intl mehrsprachige Unterstützung zu Ihrer Next.js-App hinzufügen.', es: 'Cómo agregar soporte multilingüe a tu aplicación Next.js usando next-intl.'}},
    {id: 'ssg-ssr', date: '2020-01-02', archived: true, title: {en: 'When to Use Static Generation v.s. Server-side Rendering', fr: 'Quand utiliser la génération statique ou le rendu côté serveur ?', de: 'Wann sollte man statische Generierung und wann serverseitiges Rendering verwenden?', es: 'Cuándo utilizar la generación estática frente a la renderización del lado del servidor'}, tags: ['nextjs', 'ssg', 'ssr'], description: {en: 'Learn when to choose Static Generation vs Server-side Rendering in Next.js.', fr: 'Apprenez quand choisir la Génération Statique ou le Rendu Côté Serveur dans Next.js.', de: 'Erfahren Sie, wann Sie Statische Generierung oder Serverseitiges Rendering in Next.js wählen sollten.', es: 'Aprende cuándo elegir Generación Estática frente a Renderización del Lado del Servidor en Next.js.'}},
    {id: 'pre-rendering', date: '2020-01-01', archived: true, title: {en: 'Two Forms of Pre-rendering', fr: 'Deux formes de pré-rendering', de: 'Zwei Formen des Pre-Rendering', es: 'Dos formas de pre-renderización'}, tags: ['nextjs', 'ssg', 'ssr', 'react'], description: {en: 'Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering.', fr: 'Next.js propose deux formes de pré-rendu : Génération Statique et Rendu Côté Serveur.', de: 'Next.js hat zwei Formen des Pre-Rendering: Statische Generierung und Serverseitiges Rendering.', es: 'Next.js tiene dos formas de pre-renderización: Generación Estática y Renderización del Lado del Servidor.'}},
  ],
  projects: [
    {
      id: 'gpx_to_video',
      date: '2026-05-04',
      title: {en: 'gpx-to-video', fr: 'gpx-to-video', de: 'gpx-to-video', es: 'gpx-to-video'},
      name: {en: 'Road-trip Planner', fr: 'Planificateur de roadtrip', de: 'Roadtrip-Planer', es: 'Planificador de viajes'},
      tagline: {en: 'GPS traces → road-trip videos', fr: 'traces GPS → vidéos de roadtrip', de: 'GPS-Spuren → Roadtrip-Videos', es: 'trazas GPS → vídeos de viajes'},
      description: {
        en: 'Dockerized tool that turns GPX traces into preview videos by stitching Mapillary street-level imagery with Google fallback — built for road-trip planning.',
        fr: 'Outil dockerisé qui transforme les traces GPX en vidéos de prévisualisation en assemblant l’imagerie street-level de Mapillary avec Google en secours — conçu pour la préparation de roadtrips.',
        de: 'Dockerisiertes Tool, das GPX-Spuren in Vorschauvideos verwandelt, indem es Mapillary-Straßenbilder mit Google als Fallback zusammenfügt — für die Roadtrip-Planung gebaut.',
        es: 'Herramienta dockerizada que convierte trazas GPX en vídeos de previsualización combinando imágenes de Mapillary con Google como respaldo — pensada para planificar viajes por carretera.',
      },
      github: 'https://github.com/lienardale/gpx-to-video',
      tech: ['Next.js', 'TypeScript', 'Docker', 'Mapillary API', 'Google Maps API'],
      tags: ['nextjs', 'typescript', 'docker', 'mapillary', 'google-maps'],
      stack: 'Next.js · Docker',
    },
    {
      id: 'nextjs_blog',
      date: '2026-04-25',
      title: {en: 'nextjs-blog', fr: 'nextjs-blog', de: 'nextjs-blog', es: 'nextjs-blog'},
      name: {en: 'Personal Portfolio', fr: 'Portfolio personnel', de: 'Persönliches Portfolio', es: 'Portafolio personal'},
      tagline: {en: 'this very portfolio', fr: 'ce portfolio même', de: 'genau dieses Portfolio', es: 'este mismo portafolio'},
      description: {
        en: 'This site. Multilingual (en/fr/de/es) personal portfolio with Markdown content, custom Paper & Ink design system and an editorial detail layout.',
        fr: 'Ce site. Portfolio personnel multilingue (en/fr/de/es) avec contenu en Markdown, design system Paper & Ink sur mesure et mise en page éditoriale.',
        de: 'Diese Seite. Mehrsprachiges (en/fr/de/es) persönliches Portfolio mit Markdown-Inhalten, eigenem Paper-&-Ink-Design-System und editorialem Detail-Layout.',
        es: 'Este sitio. Portafolio personal multilingüe (en/fr/de/es) con contenido en Markdown, sistema de diseño Paper & Ink propio y maquetación editorial.',
      },
      github: 'https://github.com/lienardale/nextjs-blog',
      live: 'https://nextjs-blog-lienardale.vercel.app',
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'next-intl'],
      tags: ['nextjs', 'typescript', 'react', 'next-intl', 'editorial'],
      stack: 'Next.js · React 19',
    },
    {
      id: 'bdi_2023',
      date: '2023-10-29',
      title: {en: 'bdi_2023', fr: 'bdi_2023', de: 'bdi_2023', es: 'bdi_2023'},
      name: {en: 'Comic Festival Platform', fr: 'Plateforme festival BD', de: 'Comic-Festival-Plattform', es: 'Plataforma de festival de cómics'},
      tagline: {en: 'comic festival platform', fr: 'plateforme festival BD', de: 'Comic-Festival-Plattform', es: 'plataforma festival de cómics'},
      description: {
        en: 'Multi-brand Next.js 16 platform powering two French comic-book event sites (BDI · CMBD) from a single codebase, with Prisma, Postgres and Google OAuth.',
        fr: 'Plateforme Next.js 16 multi-marques alimentant deux sites d’événements BD français (BDI · CMBD) depuis une seule base de code, avec Prisma, Postgres et Google OAuth.',
        de: 'Multi-Brand-Next.js-16-Plattform, die zwei französische Comic-Event-Sites (BDI · CMBD) aus einer einzigen Codebasis betreibt — mit Prisma, Postgres und Google OAuth.',
        es: 'Plataforma multi-marca Next.js 16 que alimenta dos sitios de eventos de cómic franceses (BDI · CMBD) desde una sola base de código, con Prisma, Postgres y Google OAuth.',
      },
      github: 'https://github.com/lienardale/bdi_2023',
      live: 'https://bdi-2023.vercel.app',
      tech: ['Next.js 16', 'TypeScript', 'Prisma', 'Postgres', 'NextAuth', 'Tailwind'],
      tags: ['nextjs', 'typescript', 'prisma', 'postgres', 'nextauth'],
      stack: 'Next.js · Prisma · Postgres',
    },
    {
      id: 'ft_transcendence',
      date: '2022-06-23',
      title: {en: 'ft_transcendence', fr: 'ft_transcendence', de: 'ft_transcendence', es: 'ft_transcendence'},
      name: {en: 'Multiplayer Online Pong', fr: 'Pong multijoueurs en ligne', de: 'Online Multiplayer Pong', es: 'Pong multijugador en línea'},
      tagline: {en: 'multiplayer online Pong', fr: 'Pong multijoueur en ligne', de: 'Multiplayer-Online-Pong', es: 'Pong multijugador en línea'},
      description: {
        en: 'Full-stack web platform with game, chat, authentication, and friend requests. Multiplayer online Pong.',
        fr: 'Plateforme web full-stack avec jeu, chat, authentification et demandes d’ami. Pong multijoueur en ligne.',
        de: 'Full-Stack-Webplattform mit Spiel, Chat, Authentifizierung und Freundschaftsanfragen. Multiplayer-Online-Pong.',
        es: 'Plataforma web full-stack con juego, chat, autenticación y solicitudes de amistad. Pong multijugador en línea.',
      },
      github: 'https://github.com/lienardale/ft_transcendence',
      live: 'https://roland-garrong.fr',
      tech: ['TypeScript', 'React', 'NestJS', 'Postgres', 'Docker', 'Nginx'],
      tags: ['typescript', 'react', 'nestjs', 'postgres', 'docker', 'nginx'],
      stack: 'TS · React · NestJS',
    },
    {
      id: 'webserv',
      date: '2022-03-15',
      title: {en: 'webserv', fr: 'webserv', de: 'webserv', es: 'webserv'},
      name: {en: 'Web Server', fr: 'Serveur Web', de: 'Webserver', es: 'Servidor Web'},
      tagline: {en: 'HTTP server in C++', fr: 'serveur HTTP en C++', de: 'HTTP-Server in C++', es: 'servidor HTTP en C++'},
      description: {
        en: 'HTTP web server built from scratch with headers, body, CGI, and file handling.',
        fr: 'Serveur web HTTP écrit depuis zéro — headers, body, CGI, gestion des fichiers.',
        de: 'HTTP-Webserver, von Grund auf gebaut — mit Headern, Body, CGI und Dateiverarbeitung.',
        es: 'Servidor HTTP hecho desde cero con cabeceras, body, CGI y manejo de archivos.',
      },
      github: 'https://github.com/lienardale/webserv',
      tech: ['C++', 'PHP'],
      tags: ['c++', 'php', 'cgi'],
      stack: 'C++ · PHP',
    },
    {
      id: 'minishell',
      date: '2021-12-01',
      title: {en: 'minishell', fr: 'minishell', de: 'minishell', es: 'minishell'},
      name: {en: 'Shell', fr: 'Shell', de: 'Shell', es: 'Shell'},
      tagline: {en: 'shell with pipes & redirections', fr: 'shell avec pipes et redirections', de: 'Shell mit Pipes & Umleitungen', es: 'shell con pipes y redirecciones'},
      description: {
        en: 'Shell with pipes, redirections, environment variables, and built-in commands.',
        fr: 'Shell avec pipes, redirections, variables d’environnement et commandes intégrées.',
        de: 'Shell mit Pipes, Umleitungen, Umgebungsvariablen und eingebauten Befehlen.',
        es: 'Shell con pipes, redirecciones, variables de entorno y comandos integrados.',
      },
      github: 'https://github.com/lienardale/minishell',
      tech: ['C', 'Bash'],
      tags: ['c', 'bash', 'parsing'],
      stack: 'C · Bash',
    },
    {
      id: 'mini_rt',
      date: '2021-09-01',
      title: {en: 'mini_rt', fr: 'mini_rt', de: 'mini_rt', es: 'mini_rt'},
      name: {en: 'Ray Tracer', fr: 'Ray Tracer', de: 'Ray Tracer', es: 'Ray Tracer'},
      tagline: {en: 'ray tracer in C', fr: 'ray tracer en C', de: 'Raytracer in C', es: 'ray tracer en C'},
      description: {
        en: 'Ray tracer implementing basic shapes, lights, and shadows.',
        fr: 'Ray tracer avec formes de base, lumières et ombres.',
        de: 'Raytracer mit grundlegenden Formen, Lichtern und Schatten.',
        es: 'Ray tracer con formas básicas, luces y sombras.',
      },
      github: 'https://github.com/lienardale/mini_rt',
      tech: ['C', 'minilibX'],
      tags: ['c', 'minilibx', 'graphics'],
      stack: 'C · minilibX',
    },
  ],
};

export function getNavItems(category: string, locale: string) {
  const items = registry[category] ?? [];
  return items.map((item) => ({
    id: item.id,
    label: item.title[locale] ?? item.title.en,
  }));
}

export function getSortedItems(category: string, locale: string) {
  const items = registry[category] ?? [];
  return items
    .filter((item) => !item.archived)
    .map((item) => ({
      id: item.id,
      date: item.date,
      title: item.title[locale] ?? item.title.en,
      startDate: item.startDate,
      endDate: item.endDate,
      tags: item.tags,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getRelatedPosts(postId: string, locale: string, limit = 3) {
  const posts = registry.posts ?? [];
  const current = posts.find((p) => p.id === postId);
  if (!current?.tags?.length) return [];

  const currentTags = new Set(current.tags);

  return posts
    .filter((p) => p.id !== postId && !p.archived && p.tags?.length)
    .map((p) => {
      const matchCount = p.tags!.filter((tag) => currentTags.has(tag)).length;
      return {
        id: p.id,
        date: p.date,
        title: p.title[locale] ?? p.title.en,
        description: p.description?.[locale] ?? p.description?.en ?? '',
        tags: p.tags!,
        matchCount,
      };
    })
    .filter((p) => p.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount || (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

export type Project = {
  id: string;
  date: string;
  title: string;
  name: string;
  tagline: string;
  description: string;
  github: string;
  live?: string;
  tech: string[];
  tags: string[];
  stack: string;
  stamp: string;
  stats: ProjectStats;
};

function deriveStamp(contributors: number): string {
  return contributors <= 1 ? 'solo' : `${contributors} contrib`;
}

export function getProjects(locale: string): Project[] {
  const items = registry.projects ?? [];
  return items
    .map((p) => {
      const s = stats[p.id] ?? {contributors: 1, lines: 0, commits: 0};
      return {
        id: p.id,
        date: p.date,
        title: p.title[locale] ?? p.title.en,
        name: p.name?.[locale] ?? p.name?.en ?? p.id,
        tagline: p.tagline?.[locale] ?? p.tagline?.en ?? '',
        description: p.description?.[locale] ?? p.description?.en ?? '',
        github: p.github ?? '',
        live: p.live,
        tech: p.tech ?? [],
        tags: p.tags ?? [],
        stack: p.stack ?? (p.tech ?? []).slice(0, 3).join(' · '),
        stamp: deriveStamp(s.contributors),
        stats: s,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getProjectById(id: string, locale: string): Project | undefined {
  return getProjects(locale).find((p) => p.id === id);
}
