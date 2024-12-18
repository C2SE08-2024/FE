import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private API_URL = 'http://localhost:8080/api/v1/payment';  
  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) { }

  // Lấy chi tiết thanh toán
  getPaymentDetails(tnxRef: string): Observable<any> {
    return this.http.get(`${this.API_URL}/transaction/${tnxRef}`);
  }

   // Create payment request
   createPayment(cartDetails: any): Observable<any> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.put<any>(`${this.API_URL}`, cartDetails, { headers });
    }
    return new Observable<any>();
  }
  
  checkout(cartDetails: any): Observable<any> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.put<any>(`${this.API_URL}/checkout`, cartDetails, { headers });
    }
    return new Observable<any>();
  }
}
