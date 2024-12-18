import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Business } from "src/app/model/Business/business";
import { BusinessUserDetailDto } from "src/app/model/Business/businessUserDetail";
import { TokenStorageService } from "../token/token-storage.service";
import { CourseProposalDTO } from "src/app/model/Course/CourseProposalDTO";


@Injectable({
  providedIn: "root",
})
export class BusinessService {
  private apiUrl = "http://localhost:8080/api/v1/business";

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService
  ) {}

  getAllBusinesses(): Observable<Business[]> {
    return this.http.get<Business[]>(this.apiUrl);
  }

  getBusinessById(businessId: number): Observable<Business> {
    return this.http.get<Business>(`${this.apiUrl}/id/${businessId}`);
  }

  getBusinessUserDetail(): Observable<BusinessUserDetailDto> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
      const url = `${this.apiUrl}/managers/detail`;
      return this.http.get<BusinessUserDetailDto>(url, { headers });
    }
  }

  createCourseProposal(courseProposalDTO: CourseProposalDTO): Observable<any> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
      const url = `${this.apiUrl}/managers/course-proposals`;
      return this.http.post(url, courseProposalDTO, { headers });
    }
  }


  approveCourseProposal(proposalId: number, instructorProposalDTO: any): Observable<any> {
    const token = this.tokenStorageService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
      const url = `${this.apiUrl}/admin/course-proposals/${proposalId}/approve`;
      return this.http.post(url, instructorProposalDTO, { headers });
    }
  }
}
