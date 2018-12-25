import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import {UploadService} from './upload.service'
import { MaterialModule } from '../material.module';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [AdminDashboardComponent],
  
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule, 
    MatDialogModule, 
    MatListModule, 
    MatProgressBarModule,
    MaterialModule
  ]
})
export class AdminModule { }
