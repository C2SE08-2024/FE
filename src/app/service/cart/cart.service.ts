import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private API_URL = 'http://localhost:8080/api/v1/cart'; // URL của API giỏ hàng

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  // Lấy giỏ hàng của người dùng
  getCart(): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.API_URL, { headers });
  }

  // Thêm khóa học vào giỏ hàng
  addCourseToCart(courseId: number): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const username = this.tokenStorageService.getUser();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    console.log('Adding course to cart with ID:', courseId); // Thêm log để kiểm tra
    return this.http.get<any>(`${this.API_URL}/add/${courseId}`, { headers });
  }

  // Cập nhật giỏ hàng (thêm hoặc xóa các chi tiết giỏ hàng)
  updateCart(cartWithDetail: any): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.API_URL}/update`, cartWithDetail, { headers });
  }

  // Thanh toán giỏ hàng
  checkout(cartWithDetail: any): Observable<any> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.API_URL}/checkout`, cartWithDetail, { headers });
  }
}
