import { Component } from '@angular/core';
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
}
