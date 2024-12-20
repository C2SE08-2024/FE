export interface InstructorUserDetailDto {
  instructorId: number;
  instructorCode: string;
  instructorName: string;
  instructorEmail: string;
  instructorPhone: string;
  instructorGender: boolean;
  dateOfBirth: string; // ISO format date
  idCard: string;
  instructorAddress: string;
  instructorImg: string;
  specialization: string;
  experienceYear: number;
  bio: string;
  username: string;
  accountEmail: string;
}
