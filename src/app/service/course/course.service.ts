import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/model/Course/course';
import { TokenStorageService } from '../token/token-storage.service';
import { CourseDetailDTO } from 'src/app/model/DTO/course-detail-dto';
import { PaymentService } from '../payment/payment.service';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  getCourse(courseId: number) {
    throw new Error('Method not implemented.');
  }

  private API_URL = 'http://localhost:8080/api/v1/course';
  
  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService,
              private paymentService: PaymentService ,
  ) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API_URL);
  }

  getFreeCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/free');
  }

  getPaidCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/paid');
  }

  getMostPopularCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL + '/popular');
  }

  createCourse(course: Course): Observable<Course> {
    const token = this.tokenStorageService.getToken();
      if (token) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Course>(this.API_URL, course,{ headers: headers });
    }
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    const token = this.tokenStorageService.getToken();  
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
      const url = `${this.API_URL}/${id}`;
      return this.http.put<Course>(url, course,{ headers: headers });
    }
  }

  deleteCourse(id: number): Observable<void> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      const url = `${this.API_URL}/${id}`;
      return this.http.delete<void>(url, { headers: headers });
    }
  }

   getCourseById(id: number): Observable<Course> {
     return this.http.get<Course>(`${this.API_URL}/${id}`);
   }
  
   isRegistered(courseId: number): Observable<string> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      const url = `${this.API_URL}/register/${courseId}`;
      return this.http.post<string>(url, {}, { headers });
    }
    throw new Error('Token is not available');
  }
  
  
  // addToCart(courseId: number): Observable<any> {
  //   return this.http.get(`http://localhost:8080/api/v1/cart/add/${courseId}`);
  // }

  // registerCourse(courseId: number): Observable<any> {
  //   return this.paymentService.checkout(courseId); // Assuming `checkout` handles registration
  // }

  // // Checkout - process payment and register
  // checkout(cartDetails: any): Observable<any> {
  //   return this.paymentService.checkout(cartDetails);
  // }
  
}

