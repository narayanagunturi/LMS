import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms'
import {AdminModule} from './admin/admin.module'
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailsComponent } from './student-details/student-details.component'
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker'
import { MaterialModule } from './material.module';
@NgModule({
  declarations: [AppComponent, StudentComponent, StudentComponent, StudentDetailsComponent],
  imports: [BrowserModule, FormsModule,AdminModule, BsDatepickerModule.forRoot(),  MaterialModule,RouterModule.forRoot(
    [
      {
        path:'student/:id', component:StudentDetailsComponent
      },
      {
        path:'student', component:StudentComponent
      },
      {
        path:'admin', component:AdminDashboardComponent
      },

    ],
    { enableTracing: true } // <-- debugging purposes only
  )
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}