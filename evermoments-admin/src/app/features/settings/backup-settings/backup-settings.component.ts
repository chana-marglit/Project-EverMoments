// src/app/features/settings/backup-settings/backup-settings.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-backup-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="backup-settings">
      <h2>גיבוי ושחזור</h2>
      
      <div class="backup-section">
        <h3>גיבוי מערכת</h3>
        <p>צור גיבוי מלא של נתוני המערכת.</p>
        <button class="btn btn-primary" (click)="createBackup()">צור גיבוי</button>
      </div>
      
      <div class="restore-section">
        <h3>שחזור מגיבוי</h3>
        <p>שחזר את המערכת מקובץ גיבוי קיים.</p>
        <input type="file" class="form-control" (change)="onFileSelected($event)">
        <button class="btn btn-warning" [disabled]="!selectedFile" (click)="restoreBackup()">שחזר מגיבוי</button>
      </div>
      
      <div class="schedule-section">
        <h3>גיבוי אוטומטי</h3>
        <form [formGroup]="scheduleForm">
          <div class="form-check">
            <input type="checkbox" id="enableAutoBackup" formControlName="enableAutoBackup" class="form-check-input">
            <label for="enableAutoBackup" class="form-check-label">הפעל גיבוי אוטומטי</label>
          </div>
          
          <div class="form-group" *ngIf="scheduleForm.get('enableAutoBackup')?.value">
            <label for="backupFrequency">תדירות גיבוי</label>
            <select id="backupFrequency" formControlName="backupFrequency" class="form-control">
              <option value="daily">יומי</option>
              <option value="weekly">שבועי</option>
              <option value="monthly">חודשי</option>
            </select>
          </div>
          
          <button class="btn btn-primary" (click)="saveSchedule()">שמור הגדרות</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .backup-settings {
      padding: 1.5rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    h3 {
      color: #555;
      margin-bottom: 0.75rem;
    }
    
    .backup-section, .restore-section, .schedule-section {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #eee;
    }
    
    p {
      margin-bottom: 1rem;
      color: #666;
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    .form-check {
      margin-bottom: 1rem;
    }
    
    .form-check-input {
      margin-left: 0.5rem;
    }
    
    .form-check-label {
      font-weight: normal;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
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
    
    .btn-warning {
      background-color: #ff9800;
      color: white;
      margin-top: 0.5rem;
    }
    
    .btn-warning:hover {
      background-color: #f57c00;
    }
    
    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `]
})
export class BackupSettingsComponent implements OnInit {
  scheduleForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.scheduleForm = this.fb.group({
      enableAutoBackup: [false],
      backupFrequency: ['weekly']
    });
  }

  ngOnInit(): void {}

  createBackup(): void {
    console.log('יוצר גיבוי...');
    // כאן תוכל להוסיף לוגיקה ליצירת גיבוי
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  restoreBackup(): void {
    if (this.selectedFile) {
      console.log('משחזר מגיבוי:', this.selectedFile.name);
      // כאן תוכל להוסיף לוגיקה לשחזור מגיבוי
    }
  }

  saveSchedule(): void {
    console.log('הגדרות גיבוי אוטומטי:', this.scheduleForm.value);
    // כאן תוכל לשלוח את הגדרות הגיבוי האוטומטי לשרת
  }
}