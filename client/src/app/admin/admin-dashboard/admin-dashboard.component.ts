import { Component, OnInit } from '@angular/core';
// import {Date} from './date'
import {Course} from './course';

import { UploadService } from '../upload.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
// import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
 
})
export class AdminDashboardComponent implements OnInit {
  public fileList: Array<File> = [];
  progress;
  canBeClosed = true; 
  primaryButtonText = 'Upload';
  // showCancelButton = true; 

  CourseDate = new Course(new Date())
  uploading = false;
  uploadSuccessful = false;
  
  // courseModel = new Course("CSPP-1");/*2 WAY BINDING :Default input field shows CSPP1 ,if we change in backend while submitting it takes input field entered*/
  public isFileThere = false;
  constructor(public uploadService: UploadService) { }
  
   fileChange(e){
    this.fileList = e.target.files;
    this.isFileThere = true
  }

  courseSelected:string='CSPP-1';
     // Date:Date='25-NOV-18';
  selectChangeHandler(event:any){
    this.courseSelected = event.target.value;
  }

  course=[
      {Name:"CSPP-1"},
      {Name:"CSPP-2"},
      {Name:"ADS-1"},
      {Name:"ADS-2"},
      {Name:"DBMS"},
  ]
  

  ngOnInit() {
       
  }




  uploadCSV(){
    if (this.uploadSuccessful) {
      window.location.reload();
    }
    else{
      if(this.fileList.length>0){
        let file: File = this.fileList[0];
        // this.progress = this.uploadService.upload(file, this.courseModel.id);
          this.progress = this.uploadService.upload(file, this.courseSelected,this.CourseDate.StartDate);
        console.log("progress variable",this.progress);
        let allProgressObservables = [];
        for (let key in this.progress) {
          allProgressObservables.push(this.progress[key].progress);
        }

        this.primaryButtonText = 'Finish';
  
        // The dialog should not be closed while uploading
        this.canBeClosed = false;
      
        // When all progress-observables are completed...
        forkJoin(allProgressObservables).subscribe(end => {
          // ... the upload was successful...
          this.uploadSuccessful = true;
      
          // ... and the component is no longer uploading
          this.uploading = false;
        });

      }
      
    }
}


}
