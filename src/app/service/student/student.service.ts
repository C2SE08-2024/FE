import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../token/token-storage.service';
import { Observable } from 'rxjs/internal/Observable';
import { StudentDTO } from 'src/app/model/DTO/StudentDTO';
import { Student } from 'src/app/model/Account/Student';

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private apiUrl = "http://localhost:8080/api/v1/student";
  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService
  ) {}

  getAllStudents(): Observable<Student[]> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<Student[]>(this.apiUrl, {headers: headers});
    }
  }

  // Lấy kết quả bài kiểm tra của học sinh theo ID học sinh
  getStudentTestResults(studentId: number): Observable<any[]> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
      const url = `${this.apiUrl}/${studentId}/test-results`;
      return this.http.get<any[]>(url, { headers: headers });
    }
  }

  // Lấy kết quả bài kiểm tra cho học sinh cụ thể và bài kiểm tra cụ thể
  getResultByStudentAndTest(studentId: number,testId: number): Observable<any> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<any>(`${this.apiUrl}/${studentId}/test/${testId}/result`, { headers: headers });
    }
  }

  // Lấy danh sách sinh viên với phân trang
  // getStudentsWithPagination(page: number, size: number): Observable<StudentDTO[]> {
  //   const params = new HttpParams().set('page', page).set('size', size);
  //   return this.http.get<StudentDTO[]>(`${this.apiUrl}/page`, { params });
  // }

  // Tìm kiếm sinh viên theo mã
  getStudentByCode(studentCode: string): Observable<StudentDTO> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<StudentDTO>(`${this.apiUrl}/${studentCode}`, { headers: headers });
    }
  }

  // Lấy thông tin sinh viên theo ID
  getStudentById(studentId: number): Observable<StudentDTO> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<StudentDTO>(`${this.apiUrl}/id/${studentId}`, { headers: headers });
    }
  }

  // Tạo mới sinh viên
  createStudent(studentDTO: StudentDTO): Observable<StudentDTO> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.post<StudentDTO>(this.apiUrl, studentDTO, { headers: headers });
    }
  }

  // Cập nhật thông tin sinh viên
  updateStudent(studentId: number,studentDTO: StudentDTO): Observable<StudentDTO> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.put<StudentDTO>(`${this.apiUrl}/${studentId}`, studentDTO, { headers: headers });
    }
  }

  // Xóa sinh viên
  deleteStudent(studentId: number): Observable<void> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.delete<void>(`${this.apiUrl}/${studentId}`, { headers: headers });
    }
  }

  // Lấy danh sách sinh viên tham gia khóa học
  getStudentsInCourse(courseId: number): Observable<StudentDTO[]> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<StudentDTO[]>(`${this.apiUrl}/course/${courseId}`, { headers: headers });
    }
  }

  // Lấy danh sách sinh viên tham gia bài kiểm tra
  getStudentsByTest(testId: number): Observable<StudentDTO[]> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<StudentDTO[]>(`${this.apiUrl}/test/${testId}`, { headers: headers });
    }
  }

  // Lấy sinh viên cuối cùng (theo student_code)
  getLastStudent(): Observable<StudentDTO> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<StudentDTO>(`${this.apiUrl}/limit`, { headers: headers });
    }
  }

  // Lấy chi tiết sinh viên theo authentication
  getStudentDetail(): Observable<any> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    return this.http.get<any>(`${this.apiUrl}/detail`, { headers: headers });
    }
  }
}