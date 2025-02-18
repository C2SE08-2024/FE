import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';
import { PaymentResponse } from 'src/app/model/DTO/payment-response';
import { CartWithDetail } from 'src/app/model/DTO/cart-with-detail';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private API_URL = 'http://localhost:8080/api/v1/payment';  

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) { }

  getPaid(cartWithDetail: CartWithDetail): Observable<PaymentResponse> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<PaymentResponse>(`${this.API_URL}`, cartWithDetail, {headers});
  }

  transactionSuccess(txnRef: string): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.API_URL}/transaction/${txnRef}`, {headers});
  }

  transactionFail(txnRef: string): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.API_URL}/fail/${txnRef}`, {headers});
  }
}
