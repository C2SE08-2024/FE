import { Instructor } from "../Account/Instructor";
import { Student } from "../Account/Student";

export interface Course {
  id: any;
  // id: any;
  courseId: number;
  courseName: string;
  coursePrice: number;
  image: string;
  status: boolean;
  instructor: Instructor;
  students: Student[];
  lessonCount?: number;
  testCount?: number;
}
