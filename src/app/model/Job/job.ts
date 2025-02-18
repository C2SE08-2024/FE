export interface JobDTO {
  id(studentId: number, businessId: number, cvId: number, id: any): unknown;
  jobId: number;
  jobTitle: string;
  jobDescription: string;
  location: string;
  industry: string;
  requirement: string;
  status: string;
  salaryRange: string;
  jobType: string;
  posterDate: string; 
  expiryDate: string; 
  businessId: number; 
}
