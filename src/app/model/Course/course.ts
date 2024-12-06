import { Instructor } from "../Account/Instructor";
<<<<<<< HEAD
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
  
=======
import { Student } from "../Account/Student";

export interface Course {
  courseId: number;
  courseName: string;
  coursePrice: number;
  image: string;
  status: boolean;
  instructor: Instructor;
  students: Student[];
}
>>>>>>> e8bc27e44734575d3ddcddfcc4199f2add1db076
