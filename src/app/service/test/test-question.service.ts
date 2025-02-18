import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TestQuestion } from 'src/app/model/Test/test-question';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TestQuestionService {

  private apiUrl = 'http://localhost:8080/api/v1/test-questions';

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService
  ) { }

  getQuestionsByTestId(testId: number): Observable<TestQuestion[]> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.get<TestQuestion[]>(`${this.apiUrl}/test/${testId}`,{ headers: headers });
    }
  }

  getAllTestQuestions(): Observable<TestQuestion[]> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.get<TestQuestion[]>(`${this.apiUrl}`,{ headers: headers });
    }
  }

  // Get TestQuestions by test ID
  getQuestionsByTest(testId: number): Observable<TestQuestion[]> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.get<TestQuestion[]>(`${this.apiUrl}/test/${testId}`,{ headers: headers });
      }
  }

  // Get TestQuestion by ID
  getTestQuestionById(id: number): Observable<TestQuestion> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.get<TestQuestion>(`${this.apiUrl}/${id}`,{ headers: headers });
      }
  }

  // Add a new TestQuestion
  addTestQuestion(testQuestion: TestQuestion): Observable<TestQuestion> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.post<TestQuestion>(`${this.apiUrl}/add`, testQuestion,{ headers: headers })
    }   
    
  }

  // Update a TestQuestion
  updateTestQuestion(id: number, testQuestion: TestQuestion): Observable<TestQuestion> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.put<TestQuestion>(`${this.apiUrl}/${id}`, testQuestion,{ headers: headers }) 
  }
  }

  // Delete a TestQuestion
  deleteTestQuestion(id: number): Observable<void> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers: headers });
      }
  }
}
