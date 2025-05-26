// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-container">
      <h1>EverMoments Admin</h1>
      
      <nav>
        <ul>
          <li><a [routerLink]="['/']" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">דף הבית</a></li>
          <li><a [routerLink]="['/dashboard']" routerLinkActive="active">דשבורד</a></li>
          <li><a [routerLink]="['/users']" routerLinkActive="active">משתמשים</a></li>
          <li><a [routerLink]="['/reports']" routerLinkActive="active">דוחות</a></li>
          <li><a [routerLink]="['/logs']" routerLinkActive="active">יומן פעילות</a></li>
          <li><a [routerLink]="['/settings']" routerLinkActive="active">הגדרות</a></li>
        </ul>
      </nav>
      
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    h1 {
      color: #3f51b5;
    }
    
    nav {
      margin: 20px 0;
    }
    
    nav ul {
      display: flex;
      list-style: none;
      padding: 0;
      gap: 15px;
    }
    
    nav li a {
      text-decoration: none;
      padding: 8px 15px;
      border-radius: 4px;
      background-color: #f0f0f0;
      color: #333;
      display: block;
      cursor: pointer;
    }
    
    nav li a:hover {
      background-color: #e0e0e0;
    }
    
    nav li a.active {
      background-color: #3f51b5;
      color: white;
    }
    
    .content {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-height: 300px;
    }
  `]
})
export class AppComponent {
  title = 'evermoments-admin';
}