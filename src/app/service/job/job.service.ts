import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDTO } from 'src/app/model/Job/job';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/v1/job';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

  private createHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createJob(jobDTO: JobDTO): Observable<JobDTO> {
    return this.http.post<JobDTO>(this.apiUrl, jobDTO, { headers: this.createHeaders() });
  }

  updateJob(jobId: number, jobDTO: JobDTO): Observable<JobDTO> {
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.put<JobDTO>(url, jobDTO, { headers: this.createHeaders() });
  }

  deleteJob(jobId: number): Observable<void> {
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.delete<void>(url, { headers: this.createHeaders() });
  }

  getJobById(jobId: number): Observable<JobDTO> {
    return this.http.get<JobDTO>(`${this.apiUrl}/${jobId}`,{ headers: this.createHeaders() });
  }

  getAllJobs(): Observable<JobDTO[]> {
    return this.http.get<JobDTO[]>(this.apiUrl, { headers: this.createHeaders()});
  }

  getJobsByBusinessId(businessId: number): Observable<JobDTO[]> {
    return this.http.get<JobDTO[]>(`${this.apiUrl}/business/${businessId}`,{ headers: this.createHeaders() });
  }

  searchJobsByTitle(title: string): Observable<JobDTO[]> {
    const url = `${this.apiUrl}/search?title=${title}`;
    return this.http.get<JobDTO[]>(url, { headers: this.createHeaders() });
  }
}
