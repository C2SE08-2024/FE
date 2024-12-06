import { Instructor } from "../Account/Instructor";
import { Student } from '../Account/Student';

export interface Course {
    courseId?: number;           
    courseName: string;          
    coursePrice: number;             
    duration?: string;           
    image?: string;              
    status?: boolean;            
    instructor?: Instructor;
    students?: Student[];  
  }
  