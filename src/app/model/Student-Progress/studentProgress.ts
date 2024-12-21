import { Student } from "../Account/Student";
import { Course } from "../Course/course";

export interface StudentProgress {
    progressId: number;
    progressStatus: boolean;
    lastAccessed: Date;
    completedLessons: number;
    totalLesson: number;
    progressPercentage: number;
    course: Course; 
    student: Student; 
  }
  