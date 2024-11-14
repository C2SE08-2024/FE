import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginRequest } from '../../model/Request/login';
import { JwtResponse } from '../../model/Request/jwt-response';
import { SignupRequest } from '../../model/Request/SignupRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8080/api/v1/public';
  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<JwtResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<JwtResponse>(this.API_URL + '/login', loginRequest, { headers })
  }

  signupStudent(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(this.API_URL + '/signup', signupRequest);
  }
}
