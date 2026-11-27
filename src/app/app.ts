import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Hero } from './hero/hero';
import { Experience } from './experience/experience';
import { Projects } from './projects/projects';
import { Skills } from './skills/skills';
import { profile } from './profile';

@Component({
  imports: [Hero, Experience, Projects, Skills],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly profile = profile;
  protected readonly year = new Date().getFullYear();

  constructor() {
    // Rendered into the prerendered HTML, which is what search engines and link-preview bots read
    const { name, title, description, siteUrl, previewImage } = profile;
    const pageTitle = `${name} · ${title}`;
    const image = new URL(previewImage, siteUrl).href;

    inject(Title).setTitle(pageTitle);
    const meta = inject(Meta);
    meta.updateTag({ name: 'description', content: description });
    for (const [property, content] of Object.entries({
      'og:type': 'website',
      'og:site_name': name,
      'og:title': pageTitle,
      'og:description': description,
      'og:url': siteUrl,
      'og:image': image,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': `${name}, ${title}`,
    })) {
      meta.updateTag({ property, content });
    }
    for (const [key, content] of Object.entries({
      'twitter:card': 'summary_large_image',
      'twitter:title': pageTitle,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:alt': `${name}, ${title}`,
    })) {
      meta.updateTag({ name: key, content });
    }
  }
}
