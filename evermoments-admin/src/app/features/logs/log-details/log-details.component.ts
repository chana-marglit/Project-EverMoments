// src/app/features/logs/log-details/log-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="log-details">
      <h1>פרטי רשומת יומן #{{ logId }}</h1>
      
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <p><strong>מזהה:</strong> {{ log.id }}</p>
              <p><strong>משתמש:</strong> {{ log.userName }} (ID: {{ log.userId }})</p>
              <p><strong>פעולה:</strong> {{ log.action }}</p>
              <p><strong>תיאור:</strong> {{ log.description }}</p>
            </div>
            <div class="col-md-6">
              <p><strong>תאריך:</strong> {{ log.createdAt | date:'dd/MM/yyyy HH:mm:ss' }}</p>
              <p><strong>כתובת IP:</strong> {{ log.ipAddress }}</p>
              <p><strong>דפדפן:</strong> {{ log.userAgent }}</p>
            </div>
          </div>
          
          <div class="additional-data">
            <h3>מידע נוסף</h3>
            <pre>{{ log.additionalData | json }}</pre>
          </div>
        </div>
      </div>
      
      <div class="actions">
        <button class="btn btn-primary" routerLink="/logs">חזרה לרשימה</button>
      </div>
    </div>
  `,
  styles: [`
    .log-details {
      padding: 1.5rem;
    }
    
    h1 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
    }
    
    .card-body {
      padding: 1.5rem;
    }
    
    .row {
      display: flex;
      flex-wrap: wrap;
      margin: -0.75rem;
    }
    
    .col-md-6 {
      flex: 0 0 50%;
      max-width: 50%;
      padding: 0.75rem;
    }
    
    p {
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }
    
    strong {
      font-weight: 600;
      color: #555;
    }
    
    .additional-data {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #eee;
    }
    
    .additional-data h3 {
      margin-bottom: 1rem;
      color: #555;
      font-size: 1.25rem;
    }
    
    pre {
      background-color: #f5f5f5;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 0.875rem;
      line-height: 1.5;
    }
    
    .actions {
      margin-top: 1.5rem;
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
    
    @media (max-width: 768px) {
      .col-md-6 {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
  `]
})
export class LogDetailsComponent implements OnInit {
  logId: number = 0;
  log = {
    id: 1,
    userId: 1,
    userName: 'משתמש 1',
    action: 'התחברות',
    description: 'התחברות למערכת',
    createdAt: new Date(),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    additionalData: { browser: 'Chrome', os: 'Windows', device: 'Desktop' }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.logId = Number(this.route.snapshot.paramMap.get('id') || 0);
    // כאן בדרך כלל תטען את פרטי הלוג מהשרת
  }
}