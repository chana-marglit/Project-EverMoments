<<<<<<< HEAD
// // src/app/app.routes.ts
// import { Routes } from '@angular/router';
// import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
// import { SettingsComponent } from './features/settings/settings/settings.component';
// import { SystemSettingsComponent } from './features/settings/system-settings/system-settings.component';
// import { BackupSettingsComponent } from './features/settings/backup-settings/backup-settings.component';
// import { LogListComponent } from './features/logs/log-list/log-list.component';
// import { LogDetailsComponent } from './features/logs/log-details/log-details.component';
// import { ReportsComponent } from './features/reports/reports/reports.component';
// import { SystemReportComponent } from './features/reports/system-report/system-report.component';
// import { UserReportComponent } from './features/reports/user-report/user-report.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'settings', component: SettingsComponent },
//   { path: 'settings/system', component: SystemSettingsComponent },
//   { path: 'settings/backup', component: BackupSettingsComponent },
//   { path: 'logs', component: LogListComponent },
//   { path: 'logs/:id', component: LogDetailsComponent },
//   { path: 'reports', component: ReportsComponent },
//   { path: 'reports/system', component: SystemReportComponent },
//   { path: 'reports/users', component: UserReportComponent },
//   { path: '**', redirectTo: 'dashboard' }
// ];
import type { Routes } from "@angular/router"
import { LoginComponent } from "./features/auth/login/login.component"
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component"
import { DashboardComponent } from "./features/dashboard/dashboard/dashboard.component"
import { AuthGuard } from "./core/auth/auth.guard"

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      // נוסיף עוד routes בהמשך
    ],
  },
  { path: "**", redirectTo: "dashboard" },
]
=======
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { SettingsComponent } from './features/settings/settings/settings.component';
import { SystemSettingsComponent } from './features/settings/system-settings/system-settings.component';
import { BackupSettingsComponent } from './features/settings/backup-settings/backup-settings.component';
import { LogListComponent } from './features/logs/log-list/log-list.component';
import { LogDetailsComponent } from './features/logs/log-details/log-details.component';
import { ReportsComponent } from './features/reports/reports/reports.component';
import { SystemReportComponent } from './features/reports/system-report/system-report.component';
import { UserReportComponent } from './features/reports/user-report/user-report.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'settings/system', component: SystemSettingsComponent },
  { path: 'settings/backup', component: BackupSettingsComponent },
  { path: 'logs', component: LogListComponent },
  { path: 'logs/:id', component: LogDetailsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'reports/system', component: SystemReportComponent },
  { path: 'reports/users', component: UserReportComponent },
  { path: '**', redirectTo: 'dashboard' }
];
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
