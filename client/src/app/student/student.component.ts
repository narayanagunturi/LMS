import { Component, OnInit } from '@angular/core';
import {Student} from '../student'
import { Router } from '@angular/router';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  router = Router
  param1:string
  studentModel = new Student('20176020')
  constructor(private route: Router) { }

  ngOnInit() {
  }

  redirect(){
    /*note this below is a client side i.e Angular Server */
    this.route.navigateByUrl('/student/'+this.studentModel.id)
  }

}
