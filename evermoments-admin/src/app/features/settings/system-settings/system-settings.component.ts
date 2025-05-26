// src/app/features/settings/system-settings/system-settings.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-system-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="system-settings">
      <h2>הגדרות מערכת</h2>
      
      <form [formGroup]="settingsForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="storageLimit">מגבלת אחסון (GB)</label>
          <input type="number" id="storageLimit" formControlName="storageLimit" class="form-control">
          <div *ngIf="settingsForm.get('storageLimit')?.invalid && settingsForm.get('storageLimit')?.touched" class="error-message">
            ערך לא תקין
          </div>
        </div>
        
        <div class="form-group">
          <label for="maxUsers">מספר משתמשים מקסימלי</label>
          <input type="number" id="maxUsers" formControlName="maxUsers" class="form-control">
          <div *ngIf="settingsForm.get('maxUsers')?.invalid && settingsForm.get('maxUsers')?.touched" class="error-message">
            ערך לא תקין
          </div>
        </div>
        
        <div class="form-group">
          <label for="maxAlbumsPerUser">מספר אלבומים מקסימלי למשתמש</label>
          <input type="number" id="maxAlbumsPerUser" formControlName="maxAlbumsPerUser" class="form-control">
          <div *ngIf="settingsForm.get('maxAlbumsPerUser')?.invalid && settingsForm.get('maxAlbumsPerUser')?.touched" class="error-message">
            ערך לא תקין
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary" [disabled]="settingsForm.invalid">שמור הגדרות</button>
      </form>
    </div>
  `,
  styles: [`
    .system-settings {
      padding: 1.5rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      margin-bottom: 1.5rem;
      color: #333;
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
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .form-control:focus {
      outline: none;
      border-color: #3f51b5;
      box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
    }
    
    .error-message {
      color: #d32f2f;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    
    .btn-primary {
      background-color: #3f51b5;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .btn-primary:hover {
      background-color: #303f9f;
    }
    
    .btn-primary:disabled {
      background-color: #c5cae9;
      cursor: not-allowed;
    }
  `]
})
export class SystemSettingsComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      storageLimit: [10, [Validators.required, Validators.min(1)]],
      maxUsers: [100, [Validators.required, Validators.min(1)]],
      maxAlbumsPerUser: [20, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.settingsForm.valid) {
      console.log('הגדרות מערכת:', this.settingsForm.value);
      // כאן תוכל לשלוח את ההגדרות לשרת
    }
  }
}