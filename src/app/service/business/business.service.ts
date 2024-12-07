import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private apiUrl = 'assets/data-business.json';
  constructor(private http: HttpClient) { }

  getAllBusinesses(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getBusinessById(businessId: number): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((businesses) => businesses.find(business => business.business_id === businessId))
    );
  }

  getJobById(jobId: number): Observable<any> {
    return this.getAllBusinesses().pipe(
      map(jobs => jobs.flatMap(business => business.jobs).find(job => job.job_id === jobId))
    );
  }
}
