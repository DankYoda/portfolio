// Everything on the site that's about you lives here. Edit this file to update the page.

export interface Job {
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  start: string;
  end?: string; // leave out for "Present"
  summary?: string;
  highlights: string[];
  tech: string[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export const profile = {
  name: 'Dakota Feist',
  title: 'Software Developer',
  tagline:
    'TODO: one or two sentences about what you build and what you care about. ' +
    'This is the first thing a recruiter reads — make it specific.',
  location: '', // e.g. 'Denver, CO · Open to remote'
  openToWork: true,

  githubUser: 'DankYoda',
  email: '', // shown as a "Contact" button when set
  linkedin: '', // full URL
  resumeUrl: '', // full URL, or put a PDF in /public and use 'resume.pdf'

  experience: [
    {
      role: 'Software Engineering Manager',
      company: 'University of North Dakota IT',
      companyUrl: 'und.edu',
      location: 'Grand Forks, ND',
      start: 'June 2026',
      summary: 'TODO: one line on the team / product.',
      highlights: [
        'TODO: an accomplishment with an outcome — "Cut API latency 40% by…"',
        'TODO: another accomplishment',
      ],
      tech: ['GitLab', 'TypeScript', 'Angular'],
    },
    {
      role: 'Software Engineer',
      company: 'University of North Dakota IT',
      companyUrl: 'und.edu',
      location: 'Grand Forks, ND',
      start: 'Nov 2022',
      end: 'May 2026',
      summary: 'TODO: one line on the team / product.',
      highlights: ['TODO: what you shipped there'],
      tech: ['TypeScript', 'Angular', 'PHP', 'MySQL', 'Symfony', 'Red Hat', 'CSS', 'HTML', 'MariaDB'],
    },
  ] satisfies Job[],

  skills: [
    { name: 'Languages', items: ['TypeScript', 'Rust', 'Go', 'Python', 'PHP', 'C#'] },
    { name: 'Frontend', items: ['Angular', 'HTML', 'SCSS'] },
    { name: 'Tools', items: ['Git', 'GitHub Actions', 'Linux'] },
  ] satisfies SkillGroup[],

  repos: {
    // Shown first, in this order
    featured: ['caprice', 'Practiscore', 'cat_clone', 'GearGenerator'],
    // Never shown. Forks and GitHub Skills exercises (skills-*) are hidden automatically.
    hidden: ['portfolio'],
  },
};
