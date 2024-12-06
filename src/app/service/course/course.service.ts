import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/model/Course/course';
import { TokenStorageService } from '../token/token-storage.service';
import { CourseDetailDTO } from 'src/app/model/DTO/course-detail-dto';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private API_URL = 'http://localhost:8080/api/v1/course';
  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService,
  ) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API_URL);
  }

  getFreeCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/free');
  }

  getPaidCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/paid');
  }


  createCourse(course: Course): Observable<Course> {
    const token = this.tokenStorageService.getToken();
      if (token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Course>(this.API_URL, course,{ headers: headers });
    }
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    const token = this.tokenStorageService.getToken();  
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
      const url = `${this.API_URL}/${id}`;
      return this.http.put<Course>(url, course,{ headers: headers });
    }
  }

  deleteCourse(id: number): Observable<void> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      const url = `${this.API_URL}/${id}`;
      return this.http.delete<void>(url, { headers: headers });
    }
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/${id}`);
  }

}
