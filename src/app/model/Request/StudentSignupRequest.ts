export interface StudentSignupRequest {
    studentCode?: string;
    name: string;
    username: string;
    gender: boolean;
    dateOfBirth: Date;
    address: string;
    phone: string;
    idCard: string;
    email: string;
    password: string;
  }