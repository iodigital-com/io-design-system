import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav aria-label="Playground navigation">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Index</a>
      <a routerLink="/modal" routerLinkActive="active">io-modal</a>
      <a routerLink="/form" routerLinkActive="active">Forms (FACE)</a>
      <a routerLink="/button" routerLinkActive="active">io-button</a>
      <a routerLink="/select" routerLinkActive="active">io-select</a>
    </nav>
    <router-outlet />
  `,
})
export class AppComponent {}
