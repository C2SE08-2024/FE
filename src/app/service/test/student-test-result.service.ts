import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StudentTestResult } from 'src/app/model/Test/studentTestResult';
import { TokenStorageService } from '../token/token-storage.service';
import { SubmitTestDTO } from 'src/app/model/Test/submitTest';
import { TestResultDTO } from 'src/app/model/DTO/testResultDTO';

@Injectable({
  providedIn: 'root'
})
export class StudentTestResultService {

  private apiUrl = 'http://localhost:8080/api/v1/student-test-result';  

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService,
  ) { }


  private createHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  submitTest(submitTestDTO: SubmitTestDTO): Observable<TestResultDTO> {
    return this.http.post<TestResultDTO>(`${this.apiUrl}/submit-test`, submitTestDTO, { headers: this.createHeaders() });
  }

  getResultsByStudentId(studentId: number): Observable<StudentTestResult[]> {
    const url = `${this.apiUrl}/student/${studentId}`;
    return this.http.get<StudentTestResult[]>(url,{ headers: this.createHeaders() });
  }

  /**
   * Get all results for a specific test.
   * @param testId ID of the test
   */
  getResultsByTestId(testId: number): Observable<StudentTestResult[]> {
    const url = `${this.apiUrl}/test/${testId}`;
    return this.http.get<StudentTestResult[]>(url,{ headers: this.createHeaders() });
  }

  /**
   * Get result of a specific student for a specific test.
   * @param studentId ID of the student
   * @param testId ID of the test
   */
  getResultByStudentAndTest(studentId: number, testId: number): Observable<StudentTestResult> {
    const url = `${this.apiUrl}/student/${studentId}/test/${testId}`;
    return this.http.get<StudentTestResult>(url,{ headers: this.createHeaders() });
  }

  /**
   * Update test result for a specific student and test.
   * @param studentId ID of the student
   * @param testId ID of the test
   * @param score Updated score
   * @param isPassed Whether the test was passed
   */
  updateTestResult(studentId: number, testId: number, score: number, isPassed: boolean): Observable<string> {
    const params = new HttpParams()
      .set('studentId', studentId.toString())
      .set('testId', testId.toString())
      .set('score', score.toString())
      .set('isPassed', isPassed.toString());

    return this.http.put<string>(`${this.apiUrl}/update`, null, { params });
  }

  /**
   * Delete test result for a specific student and test.
   * @param studentId ID of the student
   * @param testId ID of the test
   */
  deleteResult(studentId: number, testId: number): Observable<string> {
    const params = new HttpParams()
      .set('studentId', studentId.toString())
      .set('testId', testId.toString());

    return this.http.delete<string>(`${this.apiUrl}/delete`, { params });
  }
}



