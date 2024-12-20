import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Lesson } from 'src/app/model/Lesson/lesson';
import { TokenStorageService } from '../token/token-storage.service';
import { LessonDTO } from 'src/app/model/DTO/lesson-dto';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiUrl = 'http://localhost:8080/api/v1/lessons';

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService,
  ) {}

  getLessonsByCourseId(courseId: number): Observable<Lesson[]> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
    const url = `${this.apiUrl}/course/${courseId}`;  
    return this.http.get<Lesson[]>(url, { headers: headers }); 
    } 
  }

  getLessonByLessonId(lessonId: number): Observable<Lesson> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
    const url = `${this.apiUrl}/${lessonId}`;  
    return this.http.get<Lesson>(url, { headers: headers }); 
    } 
  }

  createLesson(lessonDTO: LessonDTO): Observable<LessonDTO> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
      return this.http.post<LessonDTO>(this.apiUrl, lessonDTO, { headers: headers });
    }
  }

  updateLessonStatus(lessonId: number, isCompleted: boolean): Observable<any> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
    return this.http.patch(`${this.apiUrl}/${lessonId}`, { isCompleted },{ headers: headers });
      }
  }

  updateLesson(lessonId: number, lessonDTO: LessonDTO): Observable<Lesson> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
    return this.http.put<Lesson>(`${this.apiUrl}/${lessonId}`, lessonDTO,{ headers: headers });
      }
  }

  deleteLesson(lessonId: number): Observable<void> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
    return this.http.delete<void>(`${this.apiUrl}/${lessonId}`,{ headers: headers });
      }
  }


  getAllLessons(): Observable<Lesson[]> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
    return this.http.get<Lesson[]>(this.apiUrl, { headers: headers });
      }
  }

  getLessonById(lessonId: number): Observable<Lesson> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
    return this.http.get<Lesson>(`${this.apiUrl}/${lessonId}`,{ headers: headers });
      }
  }


  getCompletedStudentsByLessonId(lessonId: number): Observable<number[]> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
    return this.http.get<number[]>(`${this.apiUrl}/${lessonId}/completed-students`,{ headers: headers });
      }
  }

}



