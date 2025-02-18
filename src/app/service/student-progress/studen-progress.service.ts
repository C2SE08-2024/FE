import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StudentProgress } from 'src/app/model/Student-Progress/studentProgress';
import { TokenStorageService } from '../token/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class StudentProgressService {
  private apiUrl = 'http://localhost:8080/api/v1/student-progress';

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService
  ) {}

  private createHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
    }
    throw new Error('Unauthorized: Token is required.');
  }

  /**
   * Update the progress of a student in a course.
   * @param studentId ID of the student
   * @param courseId ID of the course
   * @returns Observable of updated StudentProgress
   */
  updateProgress(studentId: number, courseId: number): Observable<StudentProgress> {
    const url = `${this.apiUrl}/update/${studentId}/${courseId}`;
    return this.http.put<StudentProgress>(url, null, { headers: this.createHeaders() });
  }

  /**
   * Get the progress of a student in a course.
   * @param studentId ID of the student
   * @param courseId ID of the course
   * @returns Observable of StudentProgress
   */
  getProgress(studentId: number, courseId: number): Observable<StudentProgress> {
    const url = `${this.apiUrl}/${studentId}/${courseId}`;
    return this.http.get<StudentProgress>(url, { headers: this.createHeaders() })
  }

}
