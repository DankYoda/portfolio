import { Component, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { profile } from '../profile';
// Written by scripts/fetch-repos.mjs before every build (see package.json and deploy.yml)
import repoData from './repos.generated.json';

interface Repo {
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Rust: '#dea584',
  Go: '#00add8',
  Python: '#3572a5',
  PHP: '#4f5d95',
  'C#': '#178600',
  HTML: '#e34c26',
  SCSS: '#c6538c',
};

@Component({
  selector: 'app-projects',
  imports: [DatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly githubUrl = `https://github.com/${profile.githubUser}`;

  // Baked in at build time, so visitors never hit the GitHub API (or its rate limit)
  protected readonly shown = computed(() => {
    const { featured, hidden } = profile.repos;
    const rank = (r: Repo) => {
      const i = featured.indexOf(r.name);
      return i === -1 ? featured.length : i;
    };
    return (repoData as Repo[])
      .filter((r) => !r.fork && !r.name.startsWith('skills-') && !hidden.includes(r.name))
      .sort((a, b) => rank(a) - rank(b));
  });

  protected languageColor(lang: string) {
    return languageColors[lang] ?? 'var(--muted)';
  }
}
