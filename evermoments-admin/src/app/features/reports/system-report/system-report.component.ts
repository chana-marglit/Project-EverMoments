// src/app/features/reports/system-report/system-report.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-system-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="system-report">
      <h2>דוח מערכת</h2>
      
      <div class="report-filters">
        <div class="form-group">
          <label for="dateRange">טווח תאריכים</label>
          <select id="dateRange" class="form-control" [(ngModel)]="dateRange">
            <option value="today">היום</option>
            <option value="week">שבוע אחרון</option>
            <option value="month" selected>חודש אחרון</option>
            <option value="year">שנה אחרונה</option>
          </select>
        </div>
        <button class="btn btn-primary" (click)="generateReport()">הפק דוח</button>
      </div>
      
      <div class="stats-cards">
        <div class="row">
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">משתמשים</h5>
                <p class="card-text display-4">{{ systemStats.totalUsers }}</p>
                <p class="card-text text-success">+{{ systemStats.newUsersToday }} היום</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">אלבומים</h5>
                <p class="card-text display-4">{{ systemStats.totalAlbums }}</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">תמונות</h5>
                <p class="card-text display-4">{{ systemStats.totalImages }}</p>
                <p class="card-text text-success">+{{ systemStats.newImagesThisWeek }} השבוע</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">אחסון</h5>
                <p class="card-text display-4">{{ formatBytes(systemStats.totalStorage) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-section">
        <h3>פעילות מערכת</h3>
        <div class="chart-placeholder">
          גרף פעילות מערכת (יוצג כאשר תוסיף ספריית גרפים)
        </div>
      </div>
    </div>
  `,
  styles: [`
    .system-report {
      padding: 1.5rem;
    }
    
    h2 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .report-filters {
      display: flex;
      align-items: flex-end;
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    
    .form-group {
      flex: 1;
      min-width: 200px;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
      border: none;
    }
    
    .btn-primary {
      background-color: #3f51b5;
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #303f9f;
    }
    
    .stats-cards {
      margin-bottom: 1.5rem;
    }
    
    .row {
      display: flex;
      flex-wrap: wrap;
      margin: -0.75rem;
    }
    
    .col-md-3 {
      flex: 0 0 25%;
      max-width: 25%;
      padding: 0.75rem;
    }
    
    .card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      height: 100%;
    }
    
    .card-body {
      padding: 1.5rem;
    }
    
    .card-title {
      margin-bottom: 1rem;
      color: #666;
      font-size: 1rem;
    }
    
    .display-4 {
      font-size: 2.5rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    .text-success {
      color: #4caf50;
    }
    
    .chart-section {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
    }
    
    .chart-section h3 {
      margin-bottom: 1rem;
      color: #555;
      font-size: 1.25rem;
    }
    
    .chart-placeholder {
      height: 300px;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      color: #666;
    }
    
    @media (max-width: 992px) {
      .col-md-3 {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }
    
    @media (max-width: 768px) {
      .col-md-3 {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
  `]
})
export class SystemReportComponent implements OnInit {
  dateRange = 'month';
  systemStats = {
    totalUsers: 120,
    totalAlbums: 450,
    totalImages: 1250,
    totalStorage: 25 * 1024 * 1024 * 1024, // 25GB in bytes
    newUsersToday: 3,
    newImagesThisWeek: 85
  };

  constructor() {}

  ngOnInit(): void {}

  generateReport(): void {
    console.log('מפיק דוח לטווח:', this.dateRange);
    // כאן תוכל להוסיף לוגיקה להפקת הדוח
  }
  
  formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}