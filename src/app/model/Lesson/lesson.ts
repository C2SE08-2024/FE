import { Student } from "../Account/Student";
import { Course } from "../Course/course";
import { Test } from "../Test/test";

export interface Lesson {
    lessonId: number;                
    lessonName: string;              
    lessonContent: string;           
    video: string;                   
    lessonDuration: string;          
    course: Course;
    test: Test;
    completedByStudentIds: Student[]; 
}