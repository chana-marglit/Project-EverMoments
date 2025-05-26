// src/app/features/settings/settings/settings.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="settings-container">
      <h2>הגדרות מערכת</h2>
      
      <div class="settings-nav">
        <a routerLink="/settings" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">הגדרות כלליות</a>
        <a routerLink="/settings/system" routerLinkActive="active">הגדרות מערכת</a>
        <a routerLink="/settings/backup" routerLinkActive="active">גיבוי ושחזור</a>
      </div>
      
      <div class="settings-content">
        <p>בחר באחת מאפשרויות ההגדרה מהתפריט למעלה.</p>
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
    }
    
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    
    .settings-nav {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }
    
    .settings-nav a {
      padding: 10px 15px;
      margin-right: 10px;
      text-decoration: none;
      color: #333;
    }
    
    .settings-nav a.active {
      border-bottom: 2px solid #3f51b5;
      color: #3f51b5;
      font-weight: 500;
    }
    
    .settings-content {
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 4px;
    }
  `]
})
export class SettingsComponent {}