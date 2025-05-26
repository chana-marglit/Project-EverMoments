// src/app/features/dashboard/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2>דשבורד</h2>
      <p>ברוכים הבאים למערכת הניהול של EverMoments!</p>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>משתמשים</h3>
          <p class="stat-value">120</p>
        </div>
        
        <div class="stat-card">
          <h3>תמונות</h3>
          <p class="stat-value">1,250</p>
        </div>
        
        <div class="stat-card">
          <h3>אלבומים</h3>
          <p class="stat-value">450</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
    
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    
    .dashboard-stats {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
    
    .stat-card {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      min-width: 150px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      margin-top: 10px;
      color: #3f51b5;
    }
  `]
})
export class DashboardComponent {}