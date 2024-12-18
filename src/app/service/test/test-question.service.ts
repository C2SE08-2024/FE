import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TestQuestion } from 'src/app/model/Test/test-question';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TestQuestionService {

  private API_URL = 'http://localhost:8080/api/v1/test-questions';

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
    return this.http.get<TestQuestion[]>(`${this.API_URL}/test/${testId}`,{ headers: headers });
    }
  }
}
