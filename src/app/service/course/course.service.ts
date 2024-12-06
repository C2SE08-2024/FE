import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/model/Course/course';
import { TokenStorageService } from '../token/token-storage.service';

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

<<<<<<< HEAD
  getFreeCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/free');
  }

  getPaidCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/paid');
  }

  createCourse(courseDetailDTO: CourseDetailDTO): Observable<Course> {
    return this.http.post<Course>(this.API_URL, courseDetailDTO);
=======
  createCourse(course: Course): Observable<Course> {
    const token = this.tokenStorageService.getToken();
      if (token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Course>(this.API_URL, course,{ headers: headers });
    }
>>>>>>> e8bc27e44734575d3ddcddfcc4199f2add1db076
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

<<<<<<< HEAD
 // getCourseById(id: number): Observable<Course> {
  //  const url = `${this.API_URL}/${id}`;
 //   return this.http.get<Course>(url);
 // }
=======
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/${id}`);
  }
>>>>>>> e8bc27e44734575d3ddcddfcc4199f2add1db076

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/${id}`);
  }
}
