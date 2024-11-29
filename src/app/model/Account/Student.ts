import { Account } from "./account";

export class Student {
    studentId?: number;
    studentCode: string;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    studentGender: boolean;
    dateOfBirth: Date;
    idCard: string;
    studentAddress: string;
    studentImg?: string;
    isEnable: boolean;
    major?: string;
    graduationYear?: number;
}