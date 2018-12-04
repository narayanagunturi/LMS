import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { NgModel } from '@angular/forms';

const url = 'http://localhost:8000/upload';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload(file: File, courseId:string, startDate:Date): {[key:string]:Observable<number>} {
    // this will be the our resulting map
    const status = {};
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('courseId', courseId)
      formData.append('startDate', startDate.toString())
      console.log(startDate)
      formData.append('file', file, file.name);
      // create a http-post request and pass the form
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      const progress = new Subject<number>();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });
      status[file.name] = {
        progress: progress.asObservable()
      };
    

    // return the map of progress.observables
    return status;      
  }
}
