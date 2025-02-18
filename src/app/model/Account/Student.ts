import { Account } from "./account";

export interface Student {
  studentId?: number;             
  studentCode?: string;           
  studentName: string;            
  studentEmail: string;           
  studentPhone: string;           
  studentGender: boolean;         
  dateOfBirth: Date;              
  idCard: string;                 
  studentAddress: string;         
  studentImg?: string;            
  isEnable?: boolean;             
  major?: string;                
  graduationYear?: number;        
  account?: Account;              
}
