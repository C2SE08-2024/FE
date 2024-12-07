import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8080/api/v1/payment';  
  constructor(private http: HttpClient) { }

  // Lấy chi tiết thanh toán
  getPaymentDetails(cartId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detail/${cartId}`);
  }

  // Tạo một yêu cầu thanh toán
  createPayment(cartWithDetails: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, cartWithDetails);
  }
}
