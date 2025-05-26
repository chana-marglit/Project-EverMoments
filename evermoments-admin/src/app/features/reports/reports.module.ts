import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReportsComponent } from './reports/reports.component';
import { SystemReportComponent } from './system-report/system-report.component';
import { UserReportComponent } from './user-report/user-report.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'system', component: SystemReportComponent },
  { path: 'users', component: UserReportComponent }
];

@NgModule({
  declarations: [
    ReportsComponent,
    SystemReportComponent,
    UserReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }