import { Instructor } from "../Account/Instructor";
import { Category } from "../Category/category";
import { Student } from '../Account/Student';

export interface Course {
    courseId?: number;           
    courseName: string;          
    coursePrice: number;         
    description?: string;        
    duration?: string;           
    image?: string;              
    status?: boolean;            
    level?: number;              
    language?: string;           
    createAt?: Date;             
    updateAt?: Date;             
    category?: Category;
    instructor?: Instructor;
    students?: Student[];  
  }
  