// src/app/features/reports/reports/reports.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="reports-container">
      <h1>דוחות וסטטיסטיקות</h1>
      
      <div class="reports-nav">
        <a routerLink="/reports" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">סקירה כללית</a>
        <a routerLink="/reports/system" routerLinkActive="active">דוח מערכת</a>
        <a routerLink="/reports/users" routerLinkActive="active">דוח משתמשים</a>
      </div>
      
      <div class="reports-overview">
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">סיכום משתמשים</h5>
                <p class="card-text">סך הכל: 120 משתמשים</p>
                <p class="card-text">חדשים החודש: 15</p>
                <a routerLink="/reports/users" class="btn btn-primary">צפה בדוח מלא</a>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">סיכום תמונות</h5>
                <p class="card-text">סך הכל: 1,250 תמונות</p>
                <p class="card-text">הועלו החודש: 320</p>
                <a routerLink="/reports/system" class="btn btn-primary">צפה בדוח מלא</a>
              </div>
            </div>
          </div>
          
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">ניצול אחסון</h5>
                <p class="card-text">נוצל: 25GB מתוך 100GB</p>
                <p class="card-text">אחוז ניצול: 25%</p>
                <a routerLink="/reports/system" class="btn btn-primary">צפה בדוח מלא</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 1.5rem;
    }
    
    h1 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    .reports-nav {
      display: flex;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #ddd;
    }
    
    .reports-nav a {
      padding: 0.5rem 1rem;
      margin-right: 0.5rem;
      text-decoration: none;
      color: #333;
    }
    
    .reports-nav a.active {
      border-bottom: 2px solid #3f51b5;
      color: #3f51b5;
      font-weight: 500;
    }
    
    .reports-overview {
      margin-top: 1.5rem;
    }
    
    .row {
      display: flex;
      flex-wrap: wrap;
      margin: -0.75rem;
    }
    
    .col-md-4 {
      flex: 0 0 33.333333%;
      max-width: 33.333333%;
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
      color: #333;
      font-size: 1.25rem;
    }
    
    .card-text {
      margin-bottom: 0.5rem;
      color: #666;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;
      border: none;
      display: inline-block;
      margin-top: 1rem;
    }
    
    .btn-primary {
      background-color: #3f51b5;
      color: white;
    }
    
    .btn-primary:hover {
      background-color: #303f9f;
    }
    
    @media (max-width: 992px) {
      .col-md-4 {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }
    
    @media (max-width: 768px) {
      .col-md-4 {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
  `]
})
export class ReportsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}