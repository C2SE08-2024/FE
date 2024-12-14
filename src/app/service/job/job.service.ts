import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { JobDTO } from 'src/app/model/Job/job';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:8080/api/v1/job';
  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService,
  ) {}

  createJob(jobDTO: JobDTO): Observable<JobDTO> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
    return this.http.post<JobDTO>(this.apiUrl, jobDTO, {headers});
    }
  }

  updateJob(jobId: number, jobDTO: JobDTO): Observable<JobDTO> {
    const token = this.tokenStorageService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.put<JobDTO>(url, jobDTO, {headers});
    }
  }

  deleteJob(jobId: number): Observable<void> {
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.delete<void>(url);
  }

  getJobById(jobId: number): Observable<JobDTO> {
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.get<JobDTO>(url);
  }


  getAllJobs(): Observable<JobDTO[]> {
    return this.http.get<JobDTO[]>(this.apiUrl);
  }


  searchJobsByTitle(title: string): Observable<JobDTO[]> {
    const url = `${this.apiUrl}/search?title=${title}`;
    return this.http.get<JobDTO[]>(url);
  }
}

