import { Account } from "../Account/account";

export interface InstructorDTO {
  instructorId: number;
  instructorCode: string;
  instructorName: string;
  instructorEmail: string;
  instructorPhone: string;
  instructorGender: boolean;
  dateOfBirth: string; 
  idCard: string;
  instructorAddress: string;
  instructorImg: string;
  isEnable: boolean;
  account: Account; 
}
