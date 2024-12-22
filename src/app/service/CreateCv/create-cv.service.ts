import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CreateCvService {
  private apiUrl = 'http://localhost:8080/api/v1/cvs';

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

  createCv(cvData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(`${this.apiUrl}/create`, cvData, { headers });
  }
}
