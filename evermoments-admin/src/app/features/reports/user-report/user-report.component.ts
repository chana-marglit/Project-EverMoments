// src/app/features/reports/user-report/user-report.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-report',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="user-report">
      <h2>דוח משתמשים</h2>
      
      <div class="report-filters">
        <div class="form-group">
          <input type="text" placeholder="חיפוש משתמש..." class="form-control" [(ngModel)]="searchTerm">
        </div>
        <div class="form-group">
          <select class="form-control" [(ngModel)]="userStatus">
            <option value="all">כל המשתמשים</option>
            <option value="active">משתמשים פעילים</option>
            <option value="inactive">משתמשים לא פעילים</option>
          </select>
        </div>
        <button class="btn btn-primary" (click)="applyFilters()">סנן</button>
      </div>
      
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>מזהה</th>
              <th>שם משתמש</th>
              <th>מספר אלבומים</th>
              <th>מספר תמונות</th>
              <th>נפח אחסון</th>
              <th>פעילות אחרונה</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of userStats">
              <td>{{ user.userId }}</td>
              <td>{{ user.userName }}</td>
              <td>{{ user.albumCount }}</td>
              <td>{{ user.imageCount }}</td>
              <td>{{ formatBytes(user.storageUsed) }}</td>
              <td>{{ user.lastActive | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>
                <a [routerLink]="['/users', user.userId]" class="btn btn-sm btn-info">פרטים</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="chart-section">
        <h3>ניתוח פעילות משתמשים</h3>
        <div class="chart-placeholder">
          גרף פעילות משתמשים (יוצג כאשר תוסיף ספריית גרפים)
        </div>
      </div>
    </div>
  `,
  styles: [`
    .user-report {
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
    
    .btn-info {
      background-color: #2196f3;
      color: white;
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
    
    .btn-info:hover {
      background-color: #1976d2;
    }
    
    .table-responsive {
      overflow-x: auto;
    }
    
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1.5rem;
    }
    
    .table th, .table td {
      padding: 0.75rem;
      text-align: right;
      border-bottom: 1px solid #eee;
    }
    
    .table th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #555;
    }
    
    .chart-section {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      margin-top: 1.5rem;
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
  `]
})
export class UserReportComponent implements OnInit {
  searchTerm = '';
  userStatus = 'all';
  userStats = [
    { userId: 1, userName: 'משתמש 1', albumCount: 5, imageCount: 120, storageUsed: 500 * 1024 * 1024, lastActive: new Date() },
    { userId: 2, userName: 'משתמש 2', albumCount: 3, imageCount: 75, storageUsed: 300 * 1024 * 1024, lastActive: new Date(Date.now() - 86400000) },
    { userId: 3, userName: 'משתמש 3', albumCount: 8, imageCount: 210, storageUsed: 800 * 1024 * 1024, lastActive: new Date(Date.now() - 172800000) }
  ];

  constructor() {}

  ngOnInit(): void {}

  applyFilters(): void {
    console.log('מחפש:', this.searchTerm, 'סטטוס:', this.userStatus);
    // כאן תוכל להוסיף לוגיקה לסינון המשתמשים
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