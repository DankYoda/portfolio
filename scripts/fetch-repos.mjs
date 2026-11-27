// Fetches the public GitHub repo list at build time and writes it to
// src/app/projects/repos.generated.json, which the Projects section imports.
//
// In CI this fails the build if the API errors (rate limit, outage) or returns
// no repos, so a bad weekly run never replaces the live site with an empty list:
// the deploy job is skipped and the previous deploy stays up.
//
// Locally a failure only warns and writes an empty list, so `ng serve` still works offline.
// Set GITHUB_TOKEN to raise the rate limit (the workflow passes the Actions token).

import { readFile, writeFile } from 'node:fs/promises';

const out = new URL('../src/app/projects/repos.generated.json', import.meta.url);
const profileSrc = await readFile(new URL('../src/app/profile.ts', import.meta.url), 'utf8');
const user = profileSrc.match(/githubUser:\s*'([^']+)'/)?.[1];
const strict = !!process.env.CI;

function fail(message) {
  if (strict) {
    console.error(`fetch-repos: ${message}`);
    process.exit(1);
  }
  console.warn(`fetch-repos: ${message} (writing an empty list; set CI=1 to make this an error)`);
  return writeFile(out, '[]\n');
}

async function main() {
  if (!user) return fail('could not find githubUser in src/app/profile.ts');

  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-build' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  let res;
  try {
    res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, { headers });
  } catch (err) {
    return fail(`request failed: ${err.message}`);
  }
  if (!res.ok) {
    const remaining = res.headers.get('x-ratelimit-remaining');
    const hint = remaining === '0' ? ' (rate limited)' : '';
    return fail(`GitHub API returned ${res.status}${hint}: ${(await res.text()).slice(0, 200)}`);
  }

  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return fail('GitHub API returned no repositories');

  // Keep only the fields the page uses, so the bundle stays small
  const repos = data.map((r) => ({
    name: r.name,
    html_url: r.html_url,
    homepage: r.homepage || null,
    description: r.description,
    language: r.language,
    topics: r.topics ?? [],
    stargazers_count: r.stargazers_count,
    forks_count: r.forks_count,
    pushed_at: r.pushed_at,
    fork: r.fork,
    archived: r.archived,
  }));

  await writeFile(out, JSON.stringify(repos, null, 2) + '\n');
  console.log(`fetch-repos: wrote ${repos.length} repos for ${user}`);
}

await main();
