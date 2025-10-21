// Enrollment types for the application
export interface Enrollment {
  id: number;
  userId: string;
  courseId: number;
  enrolledAt: Date;
  progress?: number;
  completedAt?: Date;
  isCompleted?: boolean;
}

export interface CourseEnrollment {
  courseId: number;
  enrolledAt: Date;
  progress: number;
  isCompleted: boolean;
}

