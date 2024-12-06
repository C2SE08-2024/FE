import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/model/Course/course';
import { CourseDetailDTO } from 'src/app/model/DTO/course-detail-dto';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private API_URL = 'http://localhost:8080/api/v1/course';
  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API_URL);
  }

  getFreeCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/free');
  }

  getPaidCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/paid');
  }

  createCourse(courseDetailDTO: CourseDetailDTO): Observable<Course> {
    return this.http.post<Course>(this.API_URL, courseDetailDTO);
  }

  updateCourse(id: number, courseDetailDTO: CourseDetailDTO): Observable<Course> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<Course>(url, courseDetailDTO);
  }

  deleteCourse(id: number): Observable<void> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<void>(url);
  }

 // getCourseById(id: number): Observable<Course> {
  //  const url = `${this.API_URL}/${id}`;
 //   return this.http.get<Course>(url);
 // }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.API_URL}/${id}`);
  }
}
