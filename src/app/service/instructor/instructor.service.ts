import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstructorUserDetailDto } from 'src/app/model/DTO/instructorUserDetailDto';
import { Instructor } from 'src/app/model/Account/Instructor';
import { InstructorDTO } from 'src/app/model/DTO/InstructorDTO';
import { TokenStorageService } from '../token/token-storage.service';



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
    return this.http.get<InstructorUserDetailDto>(`${this.apiUrl}/detail`);
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
    return this.http.get<Instructor>(`${this.apiUrl}/${id}`);
  }

  // Thêm mới một instructor
  addInstructor(instructorDTO: InstructorDTO): Observable<Instructor> {
    return this.http.post<Instructor>(this.apiUrl, instructorDTO);
  }

  // Cập nhật thông tin instructor theo ID
  updateInstructor(id: number, instructorDTO: InstructorDTO): Observable<Instructor> {
    return this.http.put<Instructor>(`${this.apiUrl}/${id}`, instructorDTO);
  }

  // Xóa một instructor theo ID
  deleteInstructor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Lấy instructor mới nhất (theo instructorCode)
  getLatestInstructor(): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.apiUrl}/latest`);
  }
}
