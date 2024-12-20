import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';
import { CartWithDetail } from 'src/app/model/DTO/cart-with-detail';
import { CartDetail } from 'src/app/model/DTO/cart-detail';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private API_URL = 'http://localhost:8080/api/v1/cart'; // URL của API giỏ hàng

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}


  getCart(): Observable<CartWithDetail> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CartWithDetail>(this.API_URL, {headers});
  }

  addToCart(courseId: number): Observable<CartDetail[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CartDetail[]>(`${this.API_URL}/add/${courseId}`, {headers});
  }

  updateCart(cartWithDetail: CartWithDetail): Observable<CartWithDetail> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<CartWithDetail>(`${this.API_URL}/update`, cartWithDetail, {headers});
  }

  checkout(cartWithDetail: CartWithDetail): Observable<CartWithDetail> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json').set('charset', 'utf-8');
    return this.http.put<CartWithDetail>(`${this.API_URL}/checkout`, cartWithDetail, {headers});
  }
}
