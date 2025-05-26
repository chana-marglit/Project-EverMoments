import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';

// הוסף את כל הקומפוננטות שיצרת
import { SettingsComponent } from './features/settings/settings/settings.component';
import { SystemSettingsComponent } from './features/settings/system-settings/system-settings.component';
import { BackupSettingsComponent } from './features/settings/backup-settings/backup-settings.component';
import { LogListComponent } from './features/logs/log-list/log-list.component';
import { LogDetailsComponent } from './features/logs/log-details/log-details.component';
import { ReportsComponent } from './features/reports/reports/reports.component';
import { SystemReportComponent } from './features/reports/system-report/system-report.component';
import { UserReportComponent } from './features/reports/user-report/user-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    DashboardComponent,
    SettingsComponent,
    SystemSettingsComponent,
    BackupSettingsComponent,
    LogListComponent,
    LogDetailsComponent,
    ReportsComponent,
    SystemReportComponent,
    UserReportComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }