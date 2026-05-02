import ProjectCard from '../../components/ProjectCard';
import TiltCard from '../../components/TiltCard';

const projects = [
  {
    id: 'ft_transcendence',
    github: 'https://github.com/lienardale/ft_transcendence',
    live: 'https://roland-garrong.fr',
    tech: ['TypeScript', 'React', 'NestJS', 'Postgres', 'Docker', 'Nginx'],
    stats: {contributors: 5, lines: 11702, commits: 926},
  },
  {
    id: 'webserv',
    github: 'https://github.com/lienardale/webserv',
    tech: ['C++', 'PHP'],
    stats: {contributors: 3, lines: 6604, commits: 405},
  },
  {
    id: 'mini_rt',
    github: 'https://github.com/lienardale/mini_rt',
    tech: ['C', 'minilibX'],
    stats: {contributors: 1, lines: 2253, commits: 53},
  },
  {
    id: 'minishell',
    github: 'https://github.com/lienardale/minishell',
    tech: ['C', 'Bash'],
    stats: {contributors: 2, lines: 6061, commits: 357},
  },
] as const;

const projectNames: Record<string, Record<string, string>> = {
  ft_transcendence: {
    en: 'Multiplayer Online Pong',
    fr: 'Pong multijoueurs en ligne',
    de: 'Online Multiplayer Pong',
    es: 'Pong multijugador en línea',
  },
  webserv: {
    en: 'Web Server',
    fr: 'Serveur Web',
    de: 'Webserver',
    es: 'Servidor Web',
  },
  mini_rt: {
    en: 'Ray Tracer',
    fr: 'Ray Tracer',
    de: 'Ray Tracer',
    es: 'Ray Tracer',
  },
  minishell: {
    en: 'Shell',
    fr: 'Shell',
    de: 'Shell',
    es: 'Shell',
  },
};

const projectDescriptions: Record<string, Record<string, string>> = {
  ft_transcendence: {
    en: 'Full-stack web platform with game, chat, authentication, and friend requests.',
    fr: 'Plateforme web full-stack avec jeu, chat, identification et système d\'amis.',
    de: 'Full-Stack-Webplattform mit Spiel, Chat, Authentifizierung und Freundschaftsanfragen.',
    es: 'Plataforma web full-stack con juego, chat, autenticación y solicitudes de amistad.',
  },
  webserv: {
    en: 'HTTP web server built from scratch with headers, body, CGI, and file handling.',
    fr: 'Serveur web HTTP construit de zéro avec en-têtes, corps, CGI et gestion de fichiers.',
    de: 'HTTP-Webserver von Grund auf mit Headern, Body, CGI und Dateiverarbeitung.',
    es: 'Servidor web HTTP construido desde cero con cabeceras, cuerpo, CGI y manejo de archivos.',
  },
  mini_rt: {
    en: 'Ray tracer implementing basic shapes, lights, and shadows.',
    fr: 'Ray tracer avec formes de base, lumières et ombres.',
    de: 'Ray Tracer mit Grundformen, Licht und Schatten.',
    es: 'Ray tracer con formas básicas, luces y sombras.',
  },
  minishell: {
    en: 'Shell with pipes, redirections, environment variables, and built-in commands.',
    fr: 'Shell avec pipes, redirections, variables d\'environnement et commandes intégrées.',
    de: 'Shell mit Pipes, Umleitungen, Umgebungsvariablen und eingebauten Befehlen.',
    es: 'Shell con tuberías, redirecciones, variables de entorno y comandos integrados.',
  },
};

const pageTitle: Record<string, string> = {
  en: 'Projects',
  fr: 'Projets',
  de: 'Projekte',
  es: 'Proyectos',
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: pageTitle[locale] ?? pageTitle.en};
}

export default async function ProjectsPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;

  return (
    <>      <article>
        <h1 className="text-3xl font-extrabold tracking-tight my-4">
          {pageTitle[locale] ?? pageTitle.en}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <TiltCard key={p.id}>
              <ProjectCard
                project={{
                  name: projectNames[p.id]?.[locale] ?? projectNames[p.id]?.en ?? p.id,
                  description: projectDescriptions[p.id]?.[locale] ?? projectDescriptions[p.id]?.en ?? '',
                  github: p.github,
                  live: 'live' in p ? p.live : undefined,
                  tech: [...p.tech],
                  stats: {...p.stats},
                }}
              />
            </TiltCard>
          ))}
        </div>
      </article>
    </>
  );
}
