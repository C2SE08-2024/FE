import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Lesson } from 'src/app/model/Lesson/lesson';
import { TokenStorageService } from '../token/token-storage.service';
import { Token } from '@angular/compiler';
import { LessonDTO } from 'src/app/model/DTO/lesson-dto';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private API_URL = 'http://localhost:8080/api/v1/lessons';

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
    const url = `${this.API_URL}/course/${courseId}`;  
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
    const url = `${this.API_URL}/${lessonId}`;  
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
      return this.http.post<LessonDTO>(this.API_URL, lessonDTO, { headers: headers });
    }
  }
}
