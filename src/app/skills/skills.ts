import { Component } from '@angular/core';
import { profile } from '../profile';

@Component({
  selector: 'app-skills',
  template: `
    <section id="skills" class="container">
      <h2 class="section-title">Skills</h2>
      <dl>
        @for (group of groups; track group.name) {
          <div class="group">
            <dt>{{ group.name }}</dt>
            <dd>
              <ul class="chips">
                @for (item of group.items; track item) {
                  <li class="chip">{{ item }}</li>
                }
              </ul>
            </dd>
          </div>
        }
      </dl>
    </section>
  `,
  styles: `
    dl {
      display: grid;
      gap: 1.25rem;
      margin: 0;
    }
    .group {
      display: grid;
      grid-template-columns: 10rem 1fr;
      gap: 1.5rem;
      align-items: baseline;

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
    }
    dt {
      font-family: var(--mono);
      font-size: 0.85rem;
      color: var(--muted);
    }
    dd {
      margin: 0;
    }
  `,
})
export class Skills {
  protected readonly groups = profile.skills;
}
