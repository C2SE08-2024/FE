import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StudentTestResult } from 'src/app/model/Test/studentTestResult';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StudentTestResultService {

  private apiUrl = 'http://localhost:8080/';  

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService,
  ) { }


  submitTest(studentId: number, testId: number, studentAnswers: string[]): Observable<StudentTestResult> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    return this.http.post<StudentTestResult>(`${this.apiUrl}/submit/${studentId}/${testId}`, studentAnswers);
    }
  }
}

