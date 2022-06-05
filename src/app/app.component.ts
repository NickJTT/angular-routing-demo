import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink='/departments' routerLinkActive='active'>Departments</a>
      <a routerLink='/employees' routerLinkActive='active'>Employees</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav a {
      text-decoration: none;
      color: black;
      padding: 4px;
    }

    nav a.active {
      color: lightblue;
    }
  `]
})
export class AppComponent {}
