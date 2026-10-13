import React from 'react';
import {render, screen} from '@testing-library/react';
import ProjectCard from '../../app/[locale]/components/ProjectCard';

const mockProject = {
  name: 'Multiplayer Pong',
  description: 'Full-stack web platform with game and chat.',
  github: 'https://github.com/lienardale/ft_transcendence',
  live: 'https://roland-garrong.fr',
  tech: ['TypeScript', 'React', 'NestJS', 'Postgres'],
  stats: {contributors: 5, lines: 11702, commits: 926},
};

describe('ProjectCard', () => {
  it('renders project name', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Multiplayer Pong')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Full-stack web platform with game and chat.')).toBeInTheDocument();
  });

  it('renders tech badges', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('NestJS')).toBeInTheDocument();
    expect(screen.getByText('Postgres')).toBeInTheDocument();
  });

  it('renders GitHub link with correct href', () => {
    render(<ProjectCard project={mockProject} />);
    const ghLink = screen.getByLabelText('Multiplayer Pong on GitHub');
    expect(ghLink).toHaveAttribute('href', 'https://github.com/lienardale/ft_transcendence');
    expect(ghLink).toHaveAttribute('target', '_blank');
  });

  it('renders live link when provided', () => {
    render(<ProjectCard project={mockProject} />);
    const liveLink = screen.getByLabelText('Multiplayer Pong live site');
    expect(liveLink).toHaveAttribute('href', 'https://roland-garrong.fr');
  });

  it('does not render live link when absent', () => {
    const {live, ...projectWithoutLive} = mockProject;
    render(<ProjectCard project={projectWithoutLive} />);
    expect(screen.queryByLabelText('Multiplayer Pong live site')).not.toBeInTheDocument();
  });

  it('renders contributor count', () => {
    render(<ProjectCard project={mockProject} />);
    const stat = screen.getByTestId('stat-contributors');
    expect(stat).toHaveTextContent('5');
  });

  it('renders line count formatted', () => {
    render(<ProjectCard project={mockProject} />);
    const stat = screen.getByTestId('stat-lines');
    expect(stat).toHaveTextContent('11,702 lines');
  });

  it('renders commit count', () => {
    render(<ProjectCard project={mockProject} />);
    const stat = screen.getByTestId('stat-commits');
    expect(stat).toHaveTextContent('926 commits');
  });

  it('shows the contributor stamp in place of the raw count when given', () => {
    render(<ProjectCard project={{...mockProject, stamp: '5 contrib'}} />);
    expect(screen.getByTestId('stat-contributors')).toHaveTextContent('5 contrib');
  });

  it('renders the repository name under the display name', () => {
    render(<ProjectCard project={{...mockProject, title: 'ft_transcendence'}} />);
    expect(screen.getByText('ft_transcendence')).toBeInTheDocument();
  });

  it('uses the labels it is given', () => {
    render(
      <ProjectCard
        project={mockProject}
        labels={{live: 'En ligne', lines: 'lignes', commits: 'commits'}}
      />
    );
    expect(screen.getByLabelText('Multiplayer Pong live site')).toHaveTextContent('En ligne');
    expect(screen.getByTestId('stat-lines')).toHaveTextContent('11,702 lignes');
  });

  it('renders the screenshot only when an image is provided', () => {
    const {container, rerender} = render(<ProjectCard project={mockProject} />);
    expect(container.querySelector('img')).toBeNull();

    rerender(<ProjectCard project={{...mockProject, image: '/images/projects/pong.png'}} />);
    expect(screen.getByAltText('Multiplayer Pong screenshot')).toHaveAttribute('src', '/images/projects/pong.png');
  });

  it('renders a bordered card with no shadow', () => {
    const {container} = render(<ProjectCard project={mockProject} />);
    const card = container.firstElementChild!;
    expect(card).toHaveClass('border', 'border-rule', 'rounded-lg');
    expect(card.className).not.toMatch(/shadow/);
  });
});
