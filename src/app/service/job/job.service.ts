import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDTO } from 'src/app/model/Job/job';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/v1/jobs';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

  private createHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
    }
    throw new Error('Unauthorized: Token is required.');
  }

  createJob(jobDTO: JobDTO): Observable<JobDTO> {
    const headers = this.createHeaders();
    return this.http.post<JobDTO>(this.apiUrl, jobDTO, { headers });
  }

  updateJob(jobId: number, jobDTO: JobDTO): Observable<JobDTO> {
    const headers = this.createHeaders();
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.put<JobDTO>(url, jobDTO, { headers });
  }

  deleteJob(jobId: number): Observable<void> {
    const headers = this.createHeaders();
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.delete<void>(url, { headers });
  }

  getJobById(jobId: number): Observable<JobDTO> {
    return this.http.get<JobDTO>(`${this.apiUrl}/${jobId}`);
  }

  getAllJobs(): Observable<JobDTO[]> {
    return this.http.get<JobDTO[]>(this.apiUrl);
  }

  getJobsByBusinessId(businessId: number): Observable<JobDTO[]> {
    return this.http.get<JobDTO[]>(`${this.apiUrl}/business/${businessId}`);
  }

  searchJobsByTitle(title: string): Observable<JobDTO[]> {
    const url = `${this.apiUrl}/search?title=${title}`;
    return this.http.get<JobDTO[]>(url);
  }
}
