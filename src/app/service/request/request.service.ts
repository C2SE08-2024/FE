import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TokenStorageService } from '../token/token-storage.service';
import { Request } from 'src/app/model/Request/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'http://localhost:8080/api/v1/requests'; // URL của API

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService
  ) {}


  private createHeaders(): HttpHeaders {
      const token = this.tokenStorageService.getToken();
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }
    
  
  sendRequestToViewStudentInfo(businessId: number, courseId: number): Observable<string> {
    const url = `${this.apiUrl}/send-request`;
    const options = {
      params: { 
          businessId: businessId.toString(), 
          courseId: courseId.toString() 
      },
      headers: this.createHeaders(),
      responseType: 'text' as 'json'
  };

  return this.http.post<string>(url, null, options);
    // return this.http.post(url, null, { params: { businessId: businessId.toString(), courseId: courseId.toString() },responseType: 'text'}, { headers: this.createHeaders() });
  }



  // Lấy danh sách yêu cầu của một doanh nghiệp
  getRequestsByBusiness(businessId: number): Observable<Request[]> {
    const url = `${this.apiUrl}/business/${businessId}`;
    return this.http.get<Request[]>(url,{ headers: this.createHeaders() });
  }

  getRequestsByStudent(studentId: number): Observable<Request[]> {
    const url = `${this.apiUrl}/student/${studentId}`;
    return this.http.get<Request[]>(url, { headers: this.createHeaders() });
  }

  // Chấp nhận yêu cầu
  acceptRequest(requestId: number): Observable<string> {
    const url = `${this.apiUrl}/accept-request/${requestId}`;
    return this.http.put(url, {}, { headers: this.createHeaders(), responseType: 'text' });
  }

  // Từ chối yêu cầu
  rejectRequest(requestId: number): Observable<string> {
    const url = `${this.apiUrl}/reject-request/${requestId}`;
    return this.http.put<string>(url, { headers: this.createHeaders() });
  }
}