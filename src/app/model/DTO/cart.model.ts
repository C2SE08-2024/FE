import { Student } from "../Account/Student";

export interface Cart {
    cartId: number;
    receiverName: string;
    receiverAddress: string;
    receiverEmail: string;
    receiverPhone: string;
    Student: Student;
  }
  