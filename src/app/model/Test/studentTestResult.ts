import { Student } from "../Account/Student";
import { Test } from "./test";

export interface StudentTestResult {
  resultId: number;
  score: number;
  isPassed: boolean;
  student: Student;
  test: Test;
}