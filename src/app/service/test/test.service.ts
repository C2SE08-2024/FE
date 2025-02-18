import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Test } from 'src/app/model/Test/test';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apiURL = 'http://localhost:8080/api/v1/tests';

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
        const url = `${this.apiURL}/course/${courseId}`;
      return this.http.get<Test[]>(url,{ headers: headers });
    }
  }

  getAllTests(): Observable<Test[]> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.get<Test[]>(this.apiURL,{ headers: headers });
    }
  }

  // Lấy bài test theo ID
  getTestById(id: number): Observable<Test> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.get<Test>(`${this.apiURL}/${id}`,{ headers: headers });
    }
  }

  // Thêm bài test mới
  addTest(test: Test): Observable<Test> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.post<Test>(`${this.apiURL}/add`, test,{ headers: headers })
    }
  }

  // Cập nhật bài test
  updateTest(id: number, test: Test): Observable<Test> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.put<Test>(`${this.apiURL}/${id}`, test,{ headers: headers })
    }
  }

  // Xóa bài test
  deleteTest(id: number): Observable<void> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
    return this.http.delete<void>(`${this.apiURL}/${id}`,{ headers: headers });
    }
  }
}
