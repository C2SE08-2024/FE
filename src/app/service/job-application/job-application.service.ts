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
  submitCv(studentId: number, businessId: number, cvId: number, jobId: number): Observable<string> {
    const headers = this.createHeaders();
    return this.http.post<string>(
      `${this.apiUrl}/submit`,
      null,
      {
        headers,
        params: {
          studentId: studentId.toString(),
          businessId: businessId.toString(),
          cvId: cvId.toString(),
          jobId: jobId.toString(),
        },
      }
    );
  }
}
