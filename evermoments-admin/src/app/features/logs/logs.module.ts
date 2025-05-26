import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LogListComponent } from './log-list/log-list.component';
import { LogDetailsComponent } from './log-details/log-details.component';

const routes: Routes = [
  { path: '', component: LogListComponent },
  { path: ':id', component: LogDetailsComponent }
];

@NgModule({
  declarations: [
    LogListComponent,
    LogDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LogsModule { }