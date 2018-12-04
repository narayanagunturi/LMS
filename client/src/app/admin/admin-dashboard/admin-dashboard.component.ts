import { Component, OnInit } from '@angular/core';
import {Course} from './course'
import { UploadService } from '../upload.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public fileList: Array<File> = []
  progress;
  canBeClosed = true; 
  primaryButtonText = 'Upload';
  showCancelButton = true; 
  uploading = false;
  uploadSuccessful = false;
  courseModel = new Course("CSPP-1", new Date(2017, 1, 1))
  public isFileThere = false
  constructor(public uploadService: UploadService) { }

  fileChange(e){
    console.log(e.target)
    this.fileList = e.target.files;
    this.isFileThere = true
  }

  uploadCSV(){
    if (this.uploadSuccessful) {
      window.location.reload();
    }
    else{
      if(this.fileList.length>0){
        console.log(this.courseModel.StartDate)
        let file: File = this.fileList[0];
        //var date = this.courseModel.StartDate.getDate().toString()+"/"+(this.courseModel.StartDate.getMonth()).toString()+"/"+this.courseModel.StartDate.getFullYear()
        this.progress = this.uploadService.upload(file, this.courseModel.id,this.courseModel.StartDate);
        console.log(this.progress);
        for (const key in this.progress) {
          this.progress[key].progress.subscribe(val => console.log(val));
        }
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

  ngOnInit() {
  }

}
