import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Business } from 'src/app/model/Business/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private apiUrl = 'http://localhost:8080/api/v1/business';
  constructor(private http: HttpClient) { }

  getAllBusinesses(): Observable<Business[]> {
    return this.http.get<Business[]>(this.apiUrl);
  }

  getBusinessById(businessId: number): Observable<Business> {
    return this.http.get<Business>(`${this.apiUrl}/id/${businessId}`);
  }

  
}
