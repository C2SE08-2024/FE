import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})

export class UploadService {

  private CLOUDINARY_URL ='https://api.cloudinary.com/v1_1/dhth53ukn/';


  constructor(private http: HttpClient) { }

  uploadImage(vals): Observable<any> {
    let data = vals;
    return this.http.post(this.CLOUDINARY_URL+'image/upload', data);
  }

  uploadVideo(vals): Observable<any> {
    return this.http.post(this.CLOUDINARY_URL+'video/upload', vals);
  }
}

