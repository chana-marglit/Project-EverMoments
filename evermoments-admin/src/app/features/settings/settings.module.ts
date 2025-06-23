import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { SystemSettingsComponent } from './system-settings/system-settings.component';
import { BackupSettingsComponent } from './backup-settings/backup-settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'system', component: SystemSettingsComponent },
  { path: 'backup', component: BackupSettingsComponent }
];

@NgModule({
  declarations: [
    SettingsComponent,
    SystemSettingsComponent,
    BackupSettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }