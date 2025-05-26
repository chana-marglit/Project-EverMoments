import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { LogService } from '../../../core/services/log.service';
import { User } from '../../../shared/models/user.model';
import { Log } from '../../../shared/models/log.model';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  user: User | null = null;
  userStats: any | null = null;
  userLogs: Log[] = [];
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private logService: LogService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.router.navigate(['/users']);
      return;
    }

    this.userId = +idParam;
    this.loadUserData();
  }

  loadUserData(): void {
    this.loading = true;
    this.error = '';

    // טעינת נתוני המשתמש, סטטיסטיקות ויומן פעילות במקביל
    forkJoin({
      user: this.userService.getUserById(this.userId),
      stats: this.userService.getUserStats(this.userId),
      logs: this.logService.getUserLogs(this.userId, 1, 10)
    })
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (data) => {
        this.user = data.user;
        this.userStats = data.stats;
        this.userLogs = data.logs.logs;
      },
      error: (err) => {
        this.error = 'שגיאה בטעינת פרטי המשתמש. אנא נסה שוב מאוחר יותר.';
        console.error('Error loading user details:', err);
      }
    });
  }

  deleteUser(): void {
    if (!this.user) return;
    
    if (confirm(`האם אתה בטוח שברצונך למחוק את המשתמש ${this.user.firstName} ${this.user.lastName}?`)) {
      this.loading = true;
      this.userService.deleteUser(this.userId)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.router.navigate(['/users']);
          },
          error: (err) => {
            this.error = 'שגיאה במחיקת המשתמש. אנא נסה שוב מאוחר יותר.';
            console.error('Error deleting user:', err);
          }
        });
    }
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
