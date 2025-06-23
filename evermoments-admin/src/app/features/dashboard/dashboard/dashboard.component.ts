<<<<<<< HEAD
// // // src/app/features/dashboard/dashboard/dashboard.component.ts
// // import { Component } from '@angular/core';
// // import { CommonModule } from '@angular/common';

// // @Component({
// //   selector: 'app-dashboard',
// //   standalone: true,
// //   imports: [CommonModule],
// //   template: `
// //     <div class="dashboard">
// //       <h2>דשבורד</h2>
// //       <p>ברוכים הבאים למערכת הניהול של EverMoments!</p>
      
// //       <div class="dashboard-stats">
// //         <div class="stat-card">
// //           <h3>משתמשים</h3>
// //           <p class="stat-value">120</p>
// //         </div>
        
// //         <div class="stat-card">
// //           <h3>תמונות</h3>
// //           <p class="stat-value">1,250</p>
// //         </div>
        
// //         <div class="stat-card">
// //           <h3>אלבומים</h3>
// //           <p class="stat-value">450</p>
// //         </div>
// //       </div>
// //     </div>
// //   `,
// //   styles: [`
// //     .dashboard {
// //       padding: 20px;
// //     }
    
// //     h2 {
// //       color: #333;
// //       margin-bottom: 20px;
// //     }
    
// //     .dashboard-stats {
// //       display: flex;
// //       gap: 20px;
// //       margin-top: 20px;
// //     }
    
// //     .stat-card {
// //       background-color: #f5f5f5;
// //       padding: 20px;
// //       border-radius: 8px;
// //       min-width: 150px;
// //       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// //     }
    
// //     .stat-value {
// //       font-size: 24px;
// //       font-weight: bold;
// //       margin-top: 10px;
// //       color: #3f51b5;
// //     }
// //   `]
// // })
// // export class DashboardComponent {}
// import { Component, type OnInit } from "@angular/core"
// import { CommonModule } from "@angular/common"


// @Component({
//   selector: "app-dashboard",
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: "./dashboard.component.html",
//   styleUrls: ["./dashboard.component.scss"],
// })
// export class DashboardComponent implements OnInit {
//   stats: SystemStats | null = null
//   activityData: any[] = []
//   storageData: any[] = []
//   loading = true
//   error = ""

//   constructor(private statsService: StatsService) {}

//   ngOnInit(): void {
//     this.loadDashboardData()
//   }

//   loadDashboardData(): void {
//     this.loading = true
//     this.error = ""

//     this.statsService.getSystemStats().subscribe({
//       next: (data: SystemStats) => {
//         this.stats = data
//         this.loadActivityData()
//         this.loadStorageData()
//       },
//       error: (err: any) => {
//         this.error = "שגיאה בטעינת נתוני המערכת. אנא נסה שוב מאוחר יותר."
//         console.error("Error loading system stats:", err)
//         this.loading = false
//       },
//     })
//   }

//   loadActivityData(): void {
//     this.statsService.getActivityTimeline(30).subscribe({
//       next: (data: any[]) => {
//         this.activityData = data
//         this.loading = false
//       },
//       error: (err: any) => {
//         console.error("Error loading activity data:", err)
//         this.loading = false
//       },
//     })
//   }

//   loadStorageData(): void {
//     this.statsService.getStorageUsage().subscribe({
//       next: (data: any[]) => {
//         this.storageData = data
//       },
//       error: (err: any) => {
//         console.error("Error loading storage data:", err)
//       },
//     })
//   }

//   formatBytes(bytes: number, decimals = 2): string {
//     if (bytes === 0) return "0 Bytes"

//     const k = 1024
//     const dm = decimals < 0 ? 0 : decimals
//     const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

//     const i = Math.floor(Math.log(bytes) / Math.log(k))

//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
//   }

//   refreshData(): void {
//     this.loadDashboardData()
//   }
// }
=======
// src/app/features/dashboard/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2>דשבורד</h2>
      <p>ברוכים הבאים למערכת הניהול של EverMoments!</p>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>משתמשים</h3>
          <p class="stat-value">120</p>
        </div>
        
        <div class="stat-card">
          <h3>תמונות</h3>
          <p class="stat-value">1,250</p>
        </div>
        
        <div class="stat-card">
          <h3>אלבומים</h3>
          <p class="stat-value">450</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
    
    h2 {
      color: #333;
      margin-bottom: 20px;
    }
    
    .dashboard-stats {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
    
    .stat-card {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      min-width: 150px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      margin-top: 10px;
      color: #3f51b5;
    }
  `]
})
export class DashboardComponent {}
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
