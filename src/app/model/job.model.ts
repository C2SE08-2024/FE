export interface Job {
    jobId: number;
    jobTitle: string;
    jobDescription: string;
    location: string;
    industry: string;
    requirement: string;
    status: string;
    salaryRange: string;
    jobType: string;
    posterDate: Date;
    expiryDate: Date;
    business: {
      businessId: number;
      businessName: string;
    };
  }
  