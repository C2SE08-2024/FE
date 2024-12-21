import { Student } from "../Account/Student";
import { Business } from "../Business/business";

export interface Request {
    requestId: number;            
    requestDate: string;          
    isAccepted: boolean | null;   
    canView: boolean;             
    business: Business;           
    student: Student;             
}