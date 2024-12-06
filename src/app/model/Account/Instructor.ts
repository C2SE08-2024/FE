import { Account } from "./account";


export interface Instructor {
  instructorId?: number;          
  instructorCode?: string;        
  instructorName: string;         
  instructorEmail: string;        
  instructorPhone: string;        
  instructorGender: boolean;     
  dateOfBirth: Date;              
  idCard: string;                 
  instructorAddress: string;      
  instructorImg?: string;         
  isEnable?: boolean;             
  specialization?: string;        
  experienceYear?: number;        
  bio?: string;                   
  
  account?: Account;              
}
