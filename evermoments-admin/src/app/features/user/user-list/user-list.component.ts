import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';
  currentPage = 1;
  totalUsers = 0;
  pageSize = 10;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';

    this.userService.getUsers(this.currentPage, this.pageSize)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.users = data.users;
          this.totalUsers = data.total;
        },
        error: (err) => {
          this.error = 'שגיאה בטעינת משתמשים. אנא נסה שוב מאוחר יותר.';
          console.error('Error loading users:', err);
        }
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  deleteUser(id: number): void {
    if (confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) {
      this.userService.deleteUser(id)
        .subscribe({
          next: () => {
            this.users = this.users.filter(user => user.id !== id);
            this.loadUsers();
          },
          error: (err) => {
            console.error('Error deleting user:', err);
            alert('שגיאה במחיקת המשתמש. אנא נסה שוב מאוחר יותר.');
          }
        });
    }
  }
}
