import { Student } from "../Account/Student";
import { Course } from "../Course/course";
import { LessonDTO } from "../DTO/lesson-dto";
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

export function mapLessonToLessonDTO(lesson: Lesson): LessonDTO {
    return {
      lessonId: lesson.lessonId,
      lessonName: lesson.lessonName,
      lessonContent: lesson.lessonContent,
      video: lesson.video,
      lessonDuration: lesson.lessonDuration, 
      courseId: lesson.course.courseId, 
      testId: lesson.test?.testId || null, 
    };
  }