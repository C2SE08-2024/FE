import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
  private apiUrl = 'http://localhost:8080/api/v1/job-applications';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

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

  // Nộp CV
  submitCv(
    studentId: number | string,
    businessId: number | string,
    cvId: number | string,
    jobId: number | string
  ): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}/submit`, null, {
      headers,
      params: {
        studentId: studentId.toString(),    // Chuyển thành chuỗi
        businessId: businessId.toString(), // Chuyển thành chuỗi
        cvId: cvId.toString(),             // Chuyển thành chuỗi
        jobId: jobId.toString(),           // Chuyển thành chuỗi
      },
    });
  }
  
  
}
