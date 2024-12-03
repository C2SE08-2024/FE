import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Test } from 'src/app/model/Test/test';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private API_URL = 'http://localhost:8080/api/v1/tests';

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService
  ) { }

  getTestsByCourse(courseId: number): Observable<Test[]> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        const url = `${this.API_URL}/course/${courseId}`;
      return this.http.get<Test[]>(url,{ headers: headers });
    }
  }
}
