export interface SubjectGrade {
  subjectId: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  semester: number;
  totalMarksObtained: number;
  totalMaxMarks: number;
  percentage: number;
  letterGrade: string;
  gradePoint: number;
}

export interface SemesterGpa {
  semester: number;
  gpa: number;
  totalCredits: number;
  subjectGrades: SubjectGrade[];
}

export interface StudentCgpaSummary {
  studentId: number;
  studentName: string;
  rollNumber: string;
  departmentName: string;
  overallCGPA: number;
  totalEarnedCredits: number;
  semesterGPAs: SemesterGpa[];
}
