import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:8080/api/v1/lessons';  // Địa chỉ API backend

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService,) 
              { }

  // Gọi API để lấy bài học theo courseId
  getLessonsByCourseId(courseId: number): Observable<any[]> {
    const token = this.tokenStorageService.getToken();
      if (token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(`${this.apiUrl}/course/${courseId}`,{ headers: headers });
  }
}

updateLessonStatus(lessonId: number, isCompleted: boolean): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${lessonId}`, { isCompleted });
}
}