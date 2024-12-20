import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstructorUserDetailDto } from 'src/app/model/DTO/instructorUserDetailDto';
import { Instructor } from 'src/app/model/Account/Instructor';

import { TokenStorageService } from '../token/token-storage.service';
import { InstructorDTO } from 'src/app/model/DTO/InstructorDTO';
import { Course } from 'src/app/model/Course/course';



@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private apiUrl = "http://localhost:8080/api/v1/instructor";

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService
  ) {}

  // Lấy thông tin chi tiết instructor dựa trên Authentication
  getInstructorDetail(): Observable<InstructorUserDetailDto> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<InstructorUserDetailDto>(`${this.apiUrl}/detail`,{ headers: headers });
    }
  }

  // Lấy tất cả instructors (phân trang)
  getAllInstructors(): Observable<Instructor[]> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
      return this.http.get<Instructor[]>(this.apiUrl, { headers: headers });
    }
  }


  // Tìm kiếm instructors theo tên hoặc email (phân trang)
  // searchInstructors(name: string, email: string, page: number = 0, size: number = 10): Observable<Page<Instructor>> {
  //   const params = new HttpParams()
  //     .set('name', name)
  //     .set('email', email)
  //     .set('page', page)
  //     .set('size', size);
  //   return this.http.get<Page<Instructor>>(`${this.apiUrl}/search`, { params });
  // }

  // Lấy instructor theo ID
  getInstructorById(id: number): Observable<Instructor> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<Instructor>(`${this.apiUrl}/${id}`,{ headers: headers });
    }
  }

  // Thêm mới một instructor
  addInstructor(instructorDTO: InstructorDTO): Observable<Instructor> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.post<Instructor>(this.apiUrl, instructorDTO,{ headers: headers });
    }
  }

  // Cập nhật thông tin instructor theo ID
  updateInstructor(id: number, instructorDTO: InstructorDTO): Observable<Instructor> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.put<Instructor>(`${this.apiUrl}/${id}`, instructorDTO,{ headers: headers });
    }
  }

  // Xóa một instructor theo ID
  deleteInstructor(id: number): Observable<void> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers: headers });
    }
  }

  // Lấy instructor mới nhất (theo instructorCode)
  getLatestInstructor(): Observable<Instructor> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<Instructor>(`${this.apiUrl}/latest`,{ headers: headers });
    }
  }

  getCoursesByInstructorId(instructorId: number): Observable<Course[]> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    const url = `${this.apiUrl}/${instructorId}/courses`;
    return this.http.get<Course[]>(url, { headers: headers})
    }
  }
}
