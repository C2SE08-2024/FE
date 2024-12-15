import { Job } from "./job.model";

export interface JobApplication {
    jobApplicationId: number;
    jobApplicationDate: Date;
    status: string;
    student: {
      studentId: number;
      studentName: string;
    };
    business: {
      businessId: number;
      businessName: string;
    };
    job: Job;
    studentCv: {
      studentCvId: number;
      fileName: string;
    };
  }
  