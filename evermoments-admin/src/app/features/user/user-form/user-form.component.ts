import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  userId: number | null = null;
  isEditMode = false;
  loading = false;
  submitting = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    // בדיקה אם אנחנו במצב עריכה
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.userId = +idParam;
      this.isEditMode = true;
      this.loadUserData();
    }
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', [Validators.required]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]]
    });
  }

  loadUserData(): void {
    if (!this.userId) return;
    
    this.loading = true;
    this.userService.getUserById(this.userId)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (user) => {
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          });
          // לא מציגים את הסיסמה בעריכה
          this.userForm.get('password')?.setValidators([]); 
          this.userForm.get('password')?.updateValueAndValidity();
        },
        error: (err) => {
          this.error = 'שגיאה בטעינת פרטי המשתמש. אנא נסה שוב מאוחר יותר.';
          console.error('Error loading user:', err);
        }
      });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      // סימון כל השדות כנגועים כדי להציג שגיאות
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    this.error = '';

    const userData = this.userForm.value;
    
    // אם הסיסמה ריקה במצב עריכה, לא שולחים אותה
    if (this.isEditMode && !userData.password) {
      delete userData.password;
    }

    if (this.isEditMode && this.userId) {
      // עדכון משתמש קיים
      this.userService.updateUser({ id: this.userId, ...userData })
        .pipe(finalize(() => this.submitting = false))
        .subscribe({
          next: () => {
            this.router.navigate(['/users']);
          },
          error: (err) => {
            this.error = 'שגיאה בעדכון המשתמש. אנא נסה שוב מאוחר יותר.';
            console.error('Error updating user:', err);
          }
        });
    } else {
      // יצירת משתמש חדש
      this.userService.createUser(userData)
        .pipe(finalize(() => this.submitting = false))
        .subscribe({
          next: () => {
            this.router.navigate(['/users']);
          },
          error: (err) => {
            this.error = 'שגיאה ביצירת המשתמש. אנא נסה שוב מאוחר יותר.';
            console.error('Error creating user:', err);
          }
        });
    }
  }
}
