import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {HttpClient} from '@angular/common/http'

// export interface StudentDetail {
//   courseId: string,
//   studentId:string,
//   mentor:string,
//   grade:string
// }

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  StudentDetails;
  constructor(private http:HttpClient, private activatedRoute:ActivatedRoute) {
    
   }
  
  
  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap.get("id"))
    this.getDetails(this.activatedRoute.snapshot.paramMap.get("id"))
  }

  getDetails(id: string){
    this.http.get('http://localhost:8000/grades/' + id).subscribe(data => {
      console.log(data);
      // console.log("prasanna");
      this.StudentDetails = data
      console.log(this.StudentDetails)
  },
    (err) => {
      if (err) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
;
  }


}
