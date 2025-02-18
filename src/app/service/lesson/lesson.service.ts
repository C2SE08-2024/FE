import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Lesson } from "src/app/model/Lesson/lesson";
import { TokenStorageService } from "../token/token-storage.service";
import { LessonDTO } from "src/app/model/DTO/lesson-dto";

@Injectable({
  providedIn: "root",
})
export class LessonService {
  private apiUrl = "http://localhost:8080/api/v1/lessons";

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) { }

  private createHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
  }

  getLessonsByCourseId(courseId: number): Observable<Lesson[]> {
    const url = `${this.apiUrl}/course/${courseId}`;
    return this.http.get<Lesson[]>(url, { headers: this.createHeaders() });
  }

  getLessonByLessonId(lessonId: number): Observable<Lesson> {
    const url = `${this.apiUrl}/${lessonId}`;
    return this.http.get<Lesson>(url, { headers: this.createHeaders() });
  }

  createLesson(lessonDTO: LessonDTO): Observable<LessonDTO> {
    return this.http.post<LessonDTO>(this.apiUrl, lessonDTO, {
      headers: this.createHeaders(),
    });
  }

  updateLessonStatus(lessonId: number, isCompleted: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${lessonId}`,{ isCompleted },{ headers: this.createHeaders()});
  }

  updateLesson(lessonId: number, lessonDTO: LessonDTO): Observable<Lesson> {
    return this.http.put<Lesson>(`${this.apiUrl}/${lessonId}`, lessonDTO, {headers: this.createHeaders()});
  }

  deleteLesson(lessonId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${lessonId}`, {headers: this.createHeaders()});
  }

  getAllLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiUrl, {headers: this.createHeaders()});
  }

  getLessonById(lessonId: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${lessonId}`, { headers: this.createHeaders()});
  }

  getCompletedStudentsByLessonId(lessonId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/${lessonId}/completed-students`, {headers: this.createHeaders()});
  }
}
