// src/app/features/logs/log-list/log-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="logs-container">
      <h1>יומן פעילות</h1>
      
      <div class="filters">
        <div class="form-group">
          <input type="text" placeholder="חיפוש..." class="form-control" [(ngModel)]="searchTerm">
        </div>
        <div class="form-group">
          <select class="form-control" [(ngModel)]="actionFilter">
            <option value="">כל הפעולות</option>
            <option value="login">התחברות</option>
            <option value="upload">העלאת תמונה</option>
            <option value="create">יצירת אלבום</option>
          </select>
        </div>
        <button class="btn btn-primary" (click)="applyFilters()">סנן</button>
      </div>
      
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>מזהה</th>
              <th>משתמש</th>
              <th>פעולה</th>
              <th>תיאור</th>
              <th>תאריך</th>
              <th>פעולות</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let log of logs">
              <td>{{ log.id }}</td>
              <td>{{ log.userName }}</td>
              <td>{{ log.action }}</td>
              <td>{{ log.description }}</td>
              <td>{{ log.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
              <td>
                <a [routerLink]="['/logs', log.id]" class="btn btn-sm btn-info">פרטים</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="pagination">
        <button class="btn btn-sm btn-outline-primary" [disabled]="currentPage === 1" (click)="prevPage()">הקודם</button>
        <span class="mx-2">עמוד {{ currentPage }} מתוך {{ totalPages }}</span>
        <button class="btn btn-sm btn-outline-primary" [disabled]="currentPage === totalPages" (click)="nextPage()">הבא</button>
      </div>
    </div>
  `,
  styles: [`
    .logs-container {
      padding: 1.5rem;
    }
    
    h1 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .filters {
      display: flex;
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
    
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1.5rem;
    }
    
    .btn-outline-primary {
      background-color: transparent;
      border: 1px solid #3f51b5;
      color: #3f51b5;
    }
    
    .btn-outline-primary:hover:not(:disabled) {
      background-color: #3f51b5;
      color: white;
    }
    
    .mx-2 {
      margin: 0 0.5rem;
    }
    
    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `]
})
export class LogListComponent implements OnInit {
  logs = [
    { id: 1, userId: 1, userName: 'משתמש 1', action: 'התחברות', description: 'התחברות למערכת', createdAt: new Date() },
    { id: 2, userId: 2, userName: 'משתמש 2', action: 'העלאת תמונה', description: 'העלאת תמונה לאלבום', createdAt: new Date() },
    { id: 3, userId: 1, userName: 'משתמש 1', action: 'יצירת אלבום', description: 'יצירת אלבום חדש', createdAt: new Date() }
  ];
  
  searchTerm = '';
  actionFilter = '';
  currentPage = 1;
  totalPages = 5;

  constructor() {}

  ngOnInit(): void {}

  applyFilters(): void {
    console.log('מחפש:', this.searchTerm, 'פעולה:', this.actionFilter);
    // כאן תוכל להוסיף לוגיקה לסינון הרשומות
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}