import {
  users,
  courses,
  courseModules,
  enrollments,
  quizzes,
  quizQuestions,
  quizAttempts,
  quizRetakePermissions,
  assignments,
  assignmentSubmissions,
  progress,
  contentProgress,
  courseVideos,
  courseReadings,
  authTokens,
  instructorPermissions,
  instructorApplications,

  readingProgress,
  textbookChapters,
  courseInstructionsViewed,
  type User,
  type UpsertUser,
  type Course,
  type InsertCourse,
  type CourseModule,
  type Enrollment,
  type InsertEnrollment,
  type Quiz,
  type QuizQuestion,
  type QuizAttempt,
  type InsertQuizAttempt,
  type Assignment,
  type AssignmentSubmission,
  type InsertAssignmentSubmission,
  type Progress,
  type ContentProgress,
  type InsertContentProgress,
  type CourseVideo,
  type InsertCourseVideo,
  type CourseReading,
  type InstructorPermission,
  type InsertInstructorPermission,
  type InstructorApplication,
  type InsertInstructorApplication,
  type ReadingProgress,
  type InsertReadingProgress,
  type CourseInstructionsViewed,
  type InsertCourseInstructionsViewed,
  miniCourses,
  miniCourseContent,
  miniCourseProgress,
  growCourseProgress,
  personalLibrary,
  type MiniCourse,
  type InsertMiniCourse,
  type MiniCourseContent,
  type InsertMiniCourseContent,
  type MiniCourseProgress,
  type InsertMiniCourseProgress,
  certificates,
} from "../shared/schema";
import { db } from "./db";
import { eq, and, or, desc, asc, avg, count, lt, gte, sql, ilike, like, isNotNull, inArray } from "drizzle-orm";

// Interface for CourseReading now imported from schema

export interface IStorage {
  // User operations (mandatory for OAuth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserProfile(id: string, profileData: Partial<UpsertUser>): Promise<User>;
  incrementModerationWarning(id: string): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  getUserByNickname(nickname: string): Promise<User | undefined>;
  getUserByToken(token: string): Promise<User | undefined>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;
  verifyUserEmail(userId: string): Promise<User>;
  setUserToken(userId: string, token: string, expirationDays?: number): Promise<void>;
  updateUserActivity(userId: string, token: string): Promise<void>;
  cleanupExpiredTokens(): Promise<void>;
  createUser(user: UpsertUser): Promise<User>;
  storeAuthToken(userId: string, token: string, expiresAt: Date): Promise<void>;
  
  // Dean dashboard data methods
  getMinistryOverviewStats(): Promise<any>;
  getStudentManagementData(): Promise<any>;
  
  // Course operations
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course>;
  updateCourseDuration(id: number, duration: number): Promise<Course | undefined>;
  
  // Course modules
  getCourseModules(courseId: number): Promise<CourseModule[]>;
  createCourseModule(module: Omit<CourseModule, 'id' | 'createdAt'>): Promise<CourseModule>;
  
  // Enrollment operations
  enrollStudent(enrollment: InsertEnrollment): Promise<Enrollment>;
  unenrollStudent(studentId: string, courseId: number): Promise<{success: boolean, deletedItems?: any}>;
  getStudentEnrollments(studentId: string): Promise<Enrollment[]>;
  getCourseEnrollments(courseId: number): Promise<Enrollment[]>;
  
  // Quiz operations
  getQuiz(id: number): Promise<Quiz | undefined>;
  getQuizQuestions(quizId: number): Promise<QuizQuestion[]>;
  submitQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  getQuizAttempts(studentId: string, quizId: number): Promise<QuizAttempt[]>;
  publishQuiz(quizId: number, isPublished: boolean): Promise<Quiz>;
  publishWeekContent(courseId: number, weekNumber: number, isPublished: boolean): Promise<void>;
  
  // Assignment operations
  getAssignment(id: number): Promise<Assignment | undefined>;
  submitAssignment(submission: InsertAssignmentSubmission): Promise<AssignmentSubmission>;
  
  // Progress tracking
  updateProgress(studentId: string, moduleId: number, completed: boolean): Promise<Progress>;
  getStudentProgress(studentId: string, courseId: number): Promise<Progress[]>;
  
  // Content progress tracking
  updateContentProgress(studentId: string, courseId: number, contentType: 'video' | 'reading' | 'quiz', contentId: number, completed: boolean): Promise<void>;
  getContentProgress(studentId: string, courseId: number): Promise<ContentProgress[]>;
  
  // Analytics
  getStudentGPA(studentId: string): Promise<number>;
  getCoursesWithEnrollmentCount(): Promise<Array<Course & { enrollmentCount: number }>>;
  getInstructors(): Promise<User[]>;
  
  // Instructor Portal Operations
  isDeanOrHasPermission(instructorId: string, courseId?: number): Promise<boolean>;
  getCourseVideos(courseId: number): Promise<CourseVideo[]>;
  getCourseReadings(courseId: number): Promise<CourseReading[]>;
  getCourseReading(id: number): Promise<CourseReading | undefined>;
  getMaxOrderIndex(courseId: number): Promise<number | null>;
  createCourseVideo(video: InsertCourseVideo): Promise<CourseVideo>;
  createCourseReading(reading: any): Promise<any>;
  updateCourseVideo(id: number, video: Partial<InsertCourseVideo>): Promise<CourseVideo>;
  updateCourseReading(id: number, reading: any): Promise<any>;
  deleteCourseVideo(id: number): Promise<void>;
  deleteCourseReading(id: number): Promise<void>;
  grantInstructorPermission(permission: InsertInstructorPermission): Promise<InstructorPermission>;
  revokeInstructorPermission(instructorId: string, courseId: number): Promise<void>;
  getInstructorPermissions(instructorId: string): Promise<InstructorPermission[]>;
  setUserAsDean(userId: string): Promise<User>;
  
  // Instructor application operations
  submitInstructorApplication(application: InsertInstructorApplication): Promise<InstructorApplication>;
  getInstructorApplications(status?: string): Promise<InstructorApplication[]>;
  getInstructorApplication(id: number): Promise<InstructorApplication | undefined>;
  reviewInstructorApplication(id: number, status: string, adminNotes?: string, reviewerId?: string): Promise<InstructorApplication>;
  promoteToInstructor(userId: string): Promise<User>;
  
  // Course instructions tracking
  hasViewedCourseInstructions(userId: string, courseId: number): Promise<boolean>;
  markCourseInstructionsViewed(userId: string, courseId: number): Promise<CourseInstructionsViewed>;
  
  // Mini Courses System
  getMiniCourses(): Promise<MiniCourse[]>;
  getMiniCourse(id: number): Promise<MiniCourse | undefined>;
  getMiniCourseContent(miniCourseId: number): Promise<MiniCourseContent[]>;
  getMiniCourseContentById(id: number): Promise<MiniCourseContent | undefined>;
  createMiniCourse(course: InsertMiniCourse): Promise<MiniCourse>;
  createMiniCourseContent(content: InsertMiniCourseContent): Promise<MiniCourseContent>;
  updateMiniCourseProgress(studentId: string, contentId: number, completed: boolean): Promise<void>;
  getMiniCourseProgress(studentId: string, miniCourseId?: number): Promise<MiniCourseProgress[]>;
  getStudentMiniCourseProgress(studentId: string): Promise<Array<MiniCourse & { completedContent: number; totalContent: number; progressPercentage: number }>>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // First try to find existing user by id or email
    const existingUser = await db.select().from(users).where(
      or(
        eq(users.id, userData.id),
        (userData as any).email ? eq(users.email, (userData as any).email) : undefined
      )
    ).limit(1);

    if (existingUser.length > 0) {
      // Update existing user - exclude id field to avoid foreign key constraint violation
      const { id, ...updateData } = userData;
      const [user] = await db
        .update(users)
        .set({
          ...updateData,
          updatedAt: new Date(),
        } as any)
        .where(eq(users.id, existingUser[0].id))
        .returning();
      return user;
    } else {
      // Insert new user
      const [user] = await db
        .insert(users)
        .values(userData)
        .returning();
      return user;
    }
  }

  async updateUserProfile(id: string, profileData: Partial<UpsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
        .set({
          ...profileData,
          updatedAt: new Date(),
        } as any)
      .where(eq(users.id, id))
      .returning();
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return user;
  }

  async incrementModerationWarning(id: string): Promise<User> {
    // First get the current user to get their warning count
    const currentUser = await this.getUser(id);
    if (!currentUser) {
      throw new Error("User not found");
    }
    
    const [user] = await db
      .update(users)
        .set({
          moderationWarnings: (currentUser.moderationWarnings || 0) + 1,
          updatedAt: new Date(),
        } as any)
      .where(eq(users.id, id))
      .returning();
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Try exact match first
    const [user] = await db.select().from(users).where(eq(users.username, username));
    if (user) return user;
    
    // Try case-insensitive match
    const [userCaseInsensitive] = await db.select().from(users).where(ilike(users.username, username));
    return userCaseInsensitive;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.phone, phone));
    return user;
  }

  async getUserByNickname(nickname: string): Promise<User | undefined> {
    // Note: nickname column doesn't exist in users table, using username instead
    const [user] = await db.select().from(users).where(eq(users.username, nickname));
    return user;
  }

  // Token-based authentication methods

  async getUserByToken(token: string): Promise<User | undefined> {
    try {
      // First check if token exists and is not expired
      const [tokenRecord] = await db.select()
        .from(authTokens)
        .where(eq(authTokens.token, token));
      
      if (!tokenRecord) return undefined;
      
      // Check if token is expired
      if (new Date() > tokenRecord.expiresAt) {
        // Clean up expired token
        await db.delete(authTokens).where(eq(authTokens.token, token));
        return undefined;
      }
      
      // Get user by ID
      return await this.getUser(tokenRecord.userId);
    } catch (error) {
      console.error("Error getting user by token:", error);
      return undefined;
    }
  }

  async setUserToken(userId: string, token: string, expirationDays: number = 30): Promise<void> {
    try {
      // Set token to expire in specified days
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expirationDays);
      
      // Clean up any existing tokens for this user
      await db.delete(authTokens).where(eq(authTokens.userId, userId));
      
      // Insert new token into authTokens table (our primary system)
      await db.insert(authTokens).values({
        token,
        userId,
        expiresAt
      });
    } catch (error) {
      console.error("Error setting user token:", error);
    }
  }

  async updateUserActivity(userId: string, token: string): Promise<void> {
    try {
      // Update the user's last activity timestamp
      await db
        .update(users)
        .set({
          updatedAt: new Date(),
        } as any)
        .where(eq(users.id, userId));
        
      // Log the activity
      console.log(`User activity updated: ${userId} with token ${token} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error("Error updating user activity:", error);
    }
  }

  async cleanupExpiredTokens(): Promise<void> {
    try {
      const now = new Date();
      // Clean up expired tokens
      await db.delete(authTokens).where(lt(authTokens.expiresAt, now));
        
      console.log(`Cleaned up expired tokens at ${now.toISOString()}`);
    } catch (error) {
      console.error("Error cleaning up expired tokens:", error);
    }
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.emailVerificationToken, token));
      
      return user || undefined;
    } catch (error) {
      console.error("Error getting user by verification token:", error);
      return undefined;
    }
  }

  async verifyUserEmail(userId: string): Promise<User> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set({
          emailVerified: true,
          emailVerificationToken: null,
          updatedAt: new Date()
        } as any)
        .where(eq(users.id, userId))
        .returning();
      
      return updatedUser;
    } catch (error) {
      console.error("Error verifying user email:", error);
      throw error;
    }
  }

  async createUser(user: any): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async storeAuthToken(token: string, userId: string, expiresAt: Date): Promise<void> {
    try {
      // Clean up any existing auth tokens for this user
      await db.delete(authTokens).where(eq(authTokens.userId, userId));
      
      // Insert new auth token
      await db.insert(authTokens).values({
        token,
        userId,
        expiresAt
      });
    } catch (error) {
      console.error("Error storing auth token:", error);
      throw error;
    }
  }

  // Course operations
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isActive, true)).orderBy(asc(courses.name));
  }



  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course as any).returning();
    return newCourse;
  }

  async updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course> {
    const [updatedCourse] = await db
      .update(courses)
      .set({ ...course, updatedAt: new Date() } as any)
      .where(eq(courses.id, id))
      .returning();
    return updatedCourse;
  }

  async updateCourseDuration(id: number, duration: number): Promise<Course | undefined> {
    // Get current course info
    const currentCourse = await this.getCourse(id);
    if (!currentCourse) return undefined;
    
    const originalDuration = currentCourse.duration;
    
    // Update course duration and mark as updated
    const [updatedCourse] = await db
      .update(courses)
      .set({ 
        duration: duration,
        isUpdated: true,
        updatedAt: new Date() 
      } as any)
      .where(eq(courses.id, id))
      .returning();
    
    // If duration increased, create new textbook chapters
    if (duration > originalDuration) {
      for (let week = originalDuration + 1; week <= duration; week++) {
        await this.createCourseReading({
          courseId: id,
          title: `Chapter ${week}: Updated Content`,
          content: `This is the new Chapter ${week} added when the course was extended. This chapter contains updated content and materials for the extended curriculum.

**Welcome to the Updated Chapter ${week}**

This chapter has been added as part of the course extension and contains important new material for your spiritual growth and understanding.

**Key Learning Objectives:**
• Understand new concepts introduced in this extended chapter
• Apply the lessons learned to your spiritual walk
• Prepare for upcoming assessments and discussions
• Engage with the updated curriculum materials

**Chapter Overview:**
This chapter builds upon the foundation established in previous chapters while introducing new concepts and deeper spiritual insights. The content has been carefully crafted to enhance your learning experience and spiritual development.

**Study Notes:**
Please read through this chapter carefully and take notes on the key concepts presented. This material will be covered in upcoming quizzes and discussions.

**Prayer and Reflection:**
Take time to pray and reflect on the lessons presented in this chapter. Consider how these teachings apply to your daily life and spiritual journey.

**Next Steps:**
After completing this chapter, proceed to the next module or assessment as directed by your instructor.

---

*This chapter was automatically generated as part of the course extension process. Additional content may be added by your instructor.*`,
          orderIndex: week,
          isPublished: true,
          estimatedTime: 30,
          // chapterTitle: `Updated Content - Week ${week}`, // Field doesn't exist in schema
          readingType: 'textbook'
        });
      }
    }
    
    return updatedCourse;
  }

  // Course modules
  async getCourseModules(courseId: number): Promise<CourseModule[]> {
    const modules = await db
      .select()
      .from(courseModules)
      .where(eq(courseModules.courseId, courseId))
      .orderBy(asc(courseModules.orderIndex));
    
    // Filter out any null or invalid modules
    return modules.filter(module => module && module.id && module.title);
  }

  async createCourseModule(module: Omit<CourseModule, 'id' | 'createdAt'>): Promise<CourseModule> {
    const [newModule] = await db.insert(courseModules).values(module).returning();
    return newModule;
  }

  // Enrollment operations
  async enrollStudent(enrollment: InsertEnrollment): Promise<Enrollment> {
    // No prerequisite checks - all courses are freely accessible
    const [newEnrollment] = await db.insert(enrollments).values(enrollment).returning();
    return newEnrollment;
  }

  async unenrollStudent(studentId: string, courseId: number): Promise<{success: boolean, deletedItems?: any}> {
    try {
      // Check if enrollment exists
      const [enrollment] = await db
        .select()
        .from(enrollments)
        .where(and(
          eq(enrollments.studentId, studentId),
          eq(enrollments.courseId, courseId)
        ));

      if (!enrollment) {
        return { success: false };
      }

      // Delete all associated progress data
      const deletedItems = {
        enrollment: 0,
        quizAttempts: 0,
        contentProgress: 0,
        assignments: 0,
        readingProgress: 0
      };

      // Delete quiz attempts (join with quizzes through course_modules)
      const quizAttemptsResult = await db
        .delete(quizAttempts)
        .where(and(
          eq(quizAttempts.studentId, studentId),
          sql`quiz_id IN (
            SELECT q.id 
            FROM quizzes q 
            JOIN course_modules cm ON q.module_id = cm.id 
            WHERE cm.course_id = ${courseId}
          )`
        ));
      
      // Delete content progress
      const contentProgressResult = await db
        .delete(contentProgress)
        .where(and(
          eq(contentProgress.studentId, studentId),
          eq(contentProgress.courseId, courseId)
        ));

      // Delete assignment submissions (join with assignments through course_modules)
      const assignmentSubmissionsResult = await db
        .delete(assignmentSubmissions)
        .where(and(
          eq(assignmentSubmissions.studentId, studentId),
          sql`assignment_id IN (
            SELECT a.id 
            FROM assignments a 
            JOIN course_modules cm ON a.module_id = cm.id 
            WHERE cm.course_id = ${courseId}
          )`
        ));

      // Delete reading progress
      const readingProgressResult = await db
        .delete(readingProgress)
        .where(and(
          eq(readingProgress.userId, studentId),
          eq(readingProgress.courseId, courseId)
        ));

      // Finally delete the enrollment
      const enrollmentResult = await db
        .delete(enrollments)
        .where(and(
          eq(enrollments.studentId, studentId),
          eq(enrollments.courseId, courseId)
        ));

      deletedItems.enrollment = 1;

      return { 
        success: true, 
        deletedItems 
      };
    } catch (error) {
      console.error("Error unenrolling student:", error);
      throw error;
    }
  }

  async getStudentEnrollments(studentId: string): Promise<any[]> {
    const enrollmentData = await db.query.enrollments.findMany({
      where: eq(enrollments.studentId, studentId),
      with: {
        course: {
          with: {
            instructor: true
          }
        }
      },
      orderBy: desc(enrollments.enrolledAt),
    });

    // Calculate progress for each enrollment
    const enrollmentsWithProgress = await Promise.all(
      enrollmentData.map(async (enrollment) => {
        const progress = enrollment.courseId ? await this.calculateCourseProgress(studentId, enrollment.courseId) : 0;
        return {
          ...enrollment,
          progress: Math.round(progress)
        };
      })
    );

    return enrollmentsWithProgress;
  }

  async calculateCourseProgress(studentId: string, courseId: number): Promise<number> {
    try {
      // Simplified progress calculation focusing on quiz completion for now
      let completedQuizzes = 0;
      let totalQuizzes = 0;
      
      if (courseId === 0) {
        // For G.R.O.W course - simplified accurate calculation
        
        // Count completed quizzes (all 5 G.R.O.W quizzes: 100-104)
        const completedQuizAttempts = await db.select()
          .from(quizAttempts)
          .where(and(
            eq(quizAttempts.studentId, studentId),
            sql`quiz_id IN (100, 101, 102, 103, 104)`,
            isNotNull(quizAttempts.completedAt),
            gte(quizAttempts.score as any, 70)
          ));
        
        completedQuizzes = completedQuizAttempts.length;
        totalQuizzes = 5; // Total G.R.O.W quizzes
        
        // Check reading progress - if completion_percentage >= 100, consider reading complete
        const readingProgressData = await db.select()
          .from(readingProgress)
          .where(and(
            eq(readingProgress.userId, studentId),
            eq(readingProgress.courseId, courseId),
            gte(readingProgress.completionPercentage as any, 100)
          ));
        
        const completedReadings = readingProgressData.length > 0 ? 1 : 0; // Reading section complete if any record shows 100%+
        const totalReadings = 1; // G.R.O.W has one unified reading component
        
        const totalContent = totalQuizzes + totalReadings; // 5 quizzes + 1 reading = 6 total
        const totalCompleted = completedQuizzes + completedReadings;
        
        console.log(`G.R.O.W Progress for ${studentId}: ${completedQuizzes}/${totalQuizzes} quizzes, ${completedReadings}/${totalReadings} reading. Total: ${totalCompleted}/${totalContent}`);
        
        const progressPercentage = (totalCompleted / totalContent) * 100;
        return Math.min(progressPercentage, 100);
      } else if (courseId === 1) {
        // Acts in Action course - calculate based on content completion
        let completedContent = 0;
        let totalContent = 0;
        
        // Count completed quizzes (10 weekly quizzes + 1 final exam = 11 total)
        // Since quizzes aren't linked to courses, we need to get all quiz attempts
        // and then filter by quiz titles that match Acts in Action
        const allQuizAttempts = await db.select()
          .from(quizAttempts)
          .where(and(
            eq(quizAttempts.studentId, studentId),
            isNotNull(quizAttempts.completedAt),
            gte(quizAttempts.score as any, 0.7) // 70% passing score (0.7 as decimal)
          ));
        
        // Get quiz details to filter by title
        const quizIds = allQuizAttempts.map(a => a.quizId).filter(id => id !== null) as number[];
        const quizDetails = await db.select()
          .from(quizzes)
          .where(inArray(quizzes.id, quizIds));
        
        // Filter for Acts in Action quizzes
        const actsQuizAttempts = allQuizAttempts.filter(attempt => {
          const quiz = quizDetails.find(q => q.id === attempt.quizId);
          return quiz && (quiz.title.includes('Acts in Action') || quiz.title.includes('Acts Week'));
        });
        
        // Count unique quizzes passed (not attempts)
        const passedQuizIds = new Set(actsQuizAttempts.map(attempt => attempt.quizId));
        const completedQuizzes = passedQuizIds.size;
        const totalQuizzes = 11; // 10 weekly + 1 final exam
        
        // Count completed readings (Course 1 uses contentProgress, not readingProgress)
        const readingProgressData = await db.select()
          .from(contentProgress)
          .where(and(
            eq(contentProgress.studentId, studentId),
            eq(contentProgress.courseId, courseId),
            eq(contentProgress.contentType, 'reading'),
            eq(contentProgress.completed, true)
          ));
        
        // For Course 1, count completed reading weeks (not individual readings)
        // Each week has 3 readings, so we group by week
        const readingWeeksCompleted = new Set();
        readingProgressData.forEach(reading => {
          // Map reading IDs to weeks based on hardcoded structure
          const weekMapping = {
            1: 1, 2: 1, 3: 1,    // Week 1: IDs 1, 2, 3
            4: 2, 5: 2,           // Week 2: IDs 4, 5
            6: 3, 7: 3,           // Week 3: IDs 6, 7
            8: 4, 9: 4,           // Week 4: IDs 8, 9
            10: 5, 11: 5,         // Week 5: IDs 10, 11
            12: 6, 13: 6,         // Week 6: IDs 12, 13
            14: 7, 15: 7,         // Week 7: IDs 14, 15
            16: 8, 17: 8,         // Week 8: IDs 16, 17
            18: 9, 19: 9,         // Week 9: IDs 18, 19
            20: 10, 21: 10        // Week 10: IDs 20, 21
          };
          const week = reading.contentId && reading.contentId in weekMapping ? weekMapping[reading.contentId as keyof typeof weekMapping] : null;
          if (week) {
            readingWeeksCompleted.add(week);
          }
        });
        
        const completedReadings = readingWeeksCompleted.size;
        const totalReadings = 10; // 10 weeks of Bible readings
        
        // Count completed videos (if any)
        const videoProgressData = await db.select()
          .from(contentProgress)
          .where(and(
            eq(contentProgress.studentId, studentId),
            eq(contentProgress.courseId, courseId),
            eq(contentProgress.contentType, 'video'),
            eq(contentProgress.completed, true)
          ));
        
        const completedVideos = videoProgressData.length;
        const totalVideos = 0; // Acts in Action doesn't have videos currently
        
        totalContent = totalQuizzes + totalReadings + totalVideos;
        completedContent = completedQuizzes + completedReadings + completedVideos;
        
        console.log(`Acts in Action Progress for ${studentId}: ${completedQuizzes}/${totalQuizzes} quizzes, ${completedReadings}/${totalReadings} readings, ${completedVideos}/${totalVideos} videos. Total: ${completedContent}/${totalContent}`);
        console.log('Quiz attempts found:', actsQuizAttempts.length);
        console.log('Quiz attempts details:', actsQuizAttempts.map(a => ({ quizId: a.quizId, score: a.score, studentId: a.studentId })));
        
        const progressPercentage = totalContent > 0 ? (completedContent / totalContent) * 100 : 0;
        console.log(`Calculated progress percentage: ${progressPercentage}%`);
        return Math.min(progressPercentage, 100);
      } else {
        // For other courses, return 0 for now to avoid SQL errors
        return 0;
      }
    } catch (error) {
      console.error('Error calculating course progress:', error);
      return 0;
    }
  }

  async getCourseEnrollments(courseId: number): Promise<Enrollment[]> {
    return await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.courseId, courseId))
      .orderBy(desc(enrollments.enrolledAt));
  }

  // Quiz operations
  async getQuiz(id: number): Promise<Quiz | undefined> {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id));
    if (!quiz) return undefined;

    // Fetch quiz questions
    const questions = await db
      .select()
      .from(quizQuestions)
      .where(eq(quizQuestions.quizId, id))
      .orderBy(quizQuestions.orderIndex);

    return {
      ...quiz,
      questions
    } as any;
  }

  async getQuizQuestions(quizId: number): Promise<QuizQuestion[]> {
    return await db
      .select()
      .from(quizQuestions)
      .where(eq(quizQuestions.quizId, quizId))
      .orderBy(asc(quizQuestions.orderIndex));
  }

  async submitQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt> {
    try {
      console.log('Submitting quiz attempt with data:', attempt);
      
      // Get the quiz questions to calculate the real score
      const actualQuizId = attempt.quizId || 13;
      console.log('Attempting to get quiz questions for quizId:', actualQuizId);
      const questions = await this.getQuizQuestions(actualQuizId);
      console.log('Quiz questions for scoring:', questions);
      console.log('Number of questions found:', questions.length);
      
      // Calculate the actual score
      let correctAnswers = 0;
      let totalQuestions = 0;
      
      for (const question of questions) {
        if (question.type === 'multiple_choice' && question.correctAnswer) {
          totalQuestions++;
          const userAnswer = attempt.answers && typeof attempt.answers === 'object' ? (attempt.answers as any)[question.id] : null;
          console.log(`Question ${question.id}: User answered "${userAnswer}", Correct answer is "${question.correctAnswer}"`);
          
          if (userAnswer === question.correctAnswer) {
            correctAnswers++;
            console.log(`✓ Correct!`);
          } else {
            console.log(`✗ Incorrect`);
          }
        }
      }
      
      const score = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;
      console.log(`Scoring: ${correctAnswers}/${totalQuestions} = ${score} (${Math.round(score * 100)}%)`);
      
      // Insert the quiz attempt into the database
      const [newAttempt] = await db
        .insert(quizAttempts)
        .values({
          studentId: attempt.studentId?.toString() || 'test-user',
          quizId: actualQuizId,
          answers: attempt.answers,
          score: score?.toString(),
          startedAt: new Date(),
          completedAt: attempt.completedAt ? new Date(attempt.completedAt) : new Date(),
          submittedAt: new Date(),
          timeSpent: attempt.timeSpent || 0,
          essay: null,
          essayGraded: false,
          instructorFeedback: null,
          finalGrade: null,
          certificateApproved: false,
          updatedAt: new Date()
        })
        .returning();
      
      console.log('Quiz attempt submitted successfully with real score:', newAttempt);
      return newAttempt as QuizAttempt;
    } catch (error) {
      console.error('Error in submitQuizAttempt:', error);
      throw error;
    }
  }

  async getQuizAttempts(studentId: string, quizId: number): Promise<QuizAttempt[]> {
    return await db
      .select()
      .from(quizAttempts)
      .where(and(eq(quizAttempts.studentId, studentId), eq(quizAttempts.quizId, quizId)))
      .orderBy(desc(quizAttempts.startedAt));
  }

  async getCourseQuizzes(courseId: number): Promise<Quiz[]> {
    const result = await db
      .select({
        id: quizzes.id,
        title: quizzes.title,
        timeLimit: quizzes.timeLimit,
        passingScore: quizzes.passingScore,
        isFinalExam: quizzes.isFinalExam,
        isPublished: quizzes.isPublished,
        moduleId: quizzes.moduleId,
        weekNumber: courseModules.orderIndex,
        createdAt: quizzes.createdAt,
        publishedAt: quizzes.publishedAt,
      })
      .from(quizzes)
      .innerJoin(courseModules, eq(quizzes.moduleId, courseModules.id))
      .where(eq(courseModules.courseId, courseId))
      .orderBy(asc(courseModules.orderIndex));
    
    return result as Quiz[];
  }

  async publishQuiz(quizId: number, isPublished: boolean): Promise<Quiz> {
    const [quiz] = await db
      .update(quizzes)
      .set({
        isPublished,
        publishedAt: isPublished ? new Date() : null,
      } as any)
      .where(eq(quizzes.id, quizId))
      .returning();
    return quiz;
  }

  async publishWeekContent(courseId: number, weekNumber: number, isPublished: boolean): Promise<void> {
    const publishDate = isPublished ? new Date() : null;
    
    // Update ALL videos for this course
    await db
      .update(courseVideos)
      .set({
        isPublished,
        publishedAt: publishDate,
        updatedAt: new Date(),
      } as any)
      .where(eq(courseVideos.courseId, courseId));

    // Note: courseReadings table was removed - reading content now handled through textbook_chapters

    // Update ALL quizzes for this course
    const courseModulesList = await db
      .select({ id: courseModules.id })
      .from(courseModules)
      .where(eq(courseModules.courseId, courseId));

    for (const module of courseModulesList) {
      await db
        .update(quizzes)
        .set({
          isPublished,
          publishedAt: publishDate,
        } as any)
        .where(eq(quizzes.moduleId, module.id));
    }
  }

  // Assignment operations
  async getAssignment(id: number): Promise<Assignment | undefined> {
    const [assignment] = await db.select().from(assignments).where(eq(assignments.id, id));
    return assignment;
  }

  async submitAssignment(submission: InsertAssignmentSubmission): Promise<AssignmentSubmission> {
    const [newSubmission] = await db.insert(assignmentSubmissions).values(submission).returning();
    return newSubmission;
  }

  // Progress tracking
  async updateProgress(studentId: string, moduleId: number, completed: boolean): Promise<Progress> {
    const [existingProgress] = await db
      .select()
      .from(progress)
      .where(and(eq(progress.studentId, studentId), eq(progress.moduleId, moduleId)));

    if (existingProgress) {
      const [updatedProgress] = await db
        .update(progress)
        .set({ completed, completedAt: completed ? new Date() : null })
        .where(eq(progress.id, existingProgress.id))
        .returning();
      return updatedProgress;
    } else {
      const [newProgress] = await db
        .insert(progress)
        .values({
          studentId,
          moduleId,
          completed,
          completedAt: completed ? new Date() : null,
        })
        .returning();
      return newProgress;
    }
  }

  async getStudentProgress(studentId: string, courseId: number): Promise<Progress[]> {
    const result = await db
      .select({
        id: progress.id,
        studentId: progress.studentId,
        moduleId: progress.moduleId,
        completed: progress.completed,
        completedAt: progress.completedAt,
      })
      .from(progress)
      .innerJoin(courseModules, eq(progress.moduleId, courseModules.id))
      .where(and(eq(progress.studentId, studentId), eq(courseModules.courseId, courseId)));
    
    return result;
  }

  // Analytics
  async getStudentGPA(studentId: string): Promise<number> {
    // Get all quiz attempts for the student
    const attempts = await db
      .select({ score: quizAttempts.score })
      .from(quizAttempts)
      .where(eq(quizAttempts.studentId, studentId));
    
    if (attempts.length === 0) return 0;
    
    // Calculate average score manually since score is stored as text
    const totalScore = attempts.reduce((sum, attempt) => {
      return sum + parseFloat(attempt.score || '0');
    }, 0);
    
    const avgScore = totalScore / attempts.length;
    
    // Convert percentage to 4.0 GPA scale
    // 90-100% = 4.0, 80-89% = 3.0, 70-79% = 2.0, 60-69% = 1.0, Below 60% = 0.0
    if (avgScore >= 90) return 4.0;
    if (avgScore >= 80) return 3.0;
    if (avgScore >= 70) return 2.0;
    if (avgScore >= 60) return 1.0;
    return 0.0;
  }

  async getStudentById(studentId: string): Promise<any> {
    const [student] = await db
      .select()
      .from(users)
      .where(eq(users.id, studentId));
    
    if (!student) return null;

    return {
      id: student.id,
      fullName: `${student.firstName} ${student.lastName}`,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      username: student.username,
      phone: student.phone,
      createdAt: student.createdAt
    };
  }

  async getStudentEnrollmentsWithProgress(studentId: string): Promise<any[]> {
    try {
      const enrollmentData = await db
        .select()
        .from(enrollments)
        .innerJoin(courses, eq(enrollments.courseId, courses.id))
        .where(eq(enrollments.studentId, studentId));

      return enrollmentData.map((row: any) => ({
        id: row.enrollments.id,
        courseId: row.enrollments.courseId,
        status: row.enrollments.status,
        enrolledAt: row.enrollments.enrolledAt,
        completedAt: row.enrollments.completedAt,
        currentWeek: row.enrollments.currentWeek,
        course: {
          id: row.courses.id,
          name: row.courses.name,
          description: row.courses.description
        },
        progressPercentage: row.enrollments.status === 'completed' ? 100 : 
          row.enrollments.currentWeek ? (row.enrollments.currentWeek / 4) * 100 : 0
      }));
    } catch (error) {
      console.log('Error fetching enrollments:', error);
      return [];
    }
  }

  async getAllStudentQuizAttempts(studentId: string): Promise<any[]> {
    try {
      const attempts = await db
        .select()
        .from(quizAttempts)
        .where(eq(quizAttempts.studentId, studentId))
        .orderBy(desc(quizAttempts.completedAt));

      // Get quiz details separately
      const attemptsWithQuizData = [];
      for (const attempt of attempts) {
        const [quiz] = await db
          .select()
          .from(quizzes)
          .where(eq(quizzes.id, attempt.quizId!))
          .limit(1);

        attemptsWithQuizData.push({
          id: attempt.id,
          quizId: attempt.quizId,
          score: parseFloat(attempt.score || '0'),
          passingScore: quiz?.passingScore || 70,
          completedAt: attempt.completedAt,
          timeSpent: attempt.timeSpent,
          quizTitle: quiz?.title || 'Unknown Quiz'
        });
      }

      return attemptsWithQuizData;
    } catch (error) {
      console.log('Error fetching quiz attempts:', error);
      return [];
    }
  }

  async getStudentCertificates(studentId: string): Promise<any[]> {
    try {
      // For now, return empty array since certificates table may not exist or have issues
      // This can be implemented when certificate system is fully set up
      return [];
    } catch (error) {
      console.log('Error fetching certificates:', error);
      return [];
    }
  }

  async getCoursesWithEnrollmentCount(): Promise<Array<Course & { enrollmentCount: number }>> {
    try {
      // First get all active courses
      const activeCourses = await db
        .select()
        .from(courses)
        .where(eq(courses.isActive, true))
        .orderBy(asc(courses.name));

      // Then get enrollment counts for each course
      const coursesWithCounts = await Promise.all(
        activeCourses.map(async (course) => {
          const enrollmentResult = await db
            .select({ count: count() })
            .from(enrollments)
            .where(eq(enrollments.courseId, course.id));
          
          return {
            ...course,
            enrollmentCount: enrollmentResult[0]?.count || 0,
          };
        })
      );

      return coursesWithCounts;
    } catch (error) {
      console.error("Error in getCoursesWithEnrollmentCount:", error);
      console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
      throw error;
    }
  }

  async getInstructors(): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(eq(users.role, "instructor"))
      .orderBy(asc(users.firstName), asc(users.lastName));
  }
  
  // Instructor Portal Operations
  async isDeanOrHasPermission(instructorId: string, courseId?: number): Promise<boolean> {
    const user = await this.getUser(instructorId);
    if (!user) return false;
    
    // Check if user is dean
    if (user.role === 'dean' || user.email === 'pastor_rocky@sfgmboston.com') return true;
    
    // If no specific course, check if user is an instructor
    if (!courseId) return user.role === 'instructor';
    
    // Check if user has permission for specific course
    const [permission] = await db
      .select()
      .from(instructorPermissions)
      .where(
        and(
          eq(instructorPermissions.instructorId, instructorId),
          eq(instructorPermissions.courseId, courseId),
          eq(instructorPermissions.isActive, true)
        )
      );
    
    return !!permission;
  }
  
  async getCourseVideos(courseId: number): Promise<CourseVideo[]> {
    return await db
      .select()
      .from(courseVideos)
      .where(and(eq(courseVideos.courseId, courseId), eq(courseVideos.isDeleted, false)))
      .orderBy(courseVideos.orderIndex);
  }
  
  async getCourseReadings(courseId: number): Promise<CourseReading[]> {
    // Special handling for Acts in Action course (courseId = 4) - Bible readings only
    if (courseId === 4) {
      const bibleReadings: CourseReading[] = [
        {
          id: 1001,
          courseId: 4,
          title: "Week 1: Acts Chapters 1-2",
          description: "Read the beginning of the church with the ascension of Jesus and Pentecost",
          readingType: 'bible_chapter' as const,
          content: "This week we begin our journey through the book of Acts by reading about Jesus' ascension and the birth of the church at Pentecost.",
          bookTitle: "Book of Acts",
          bookAuthor: "Luke",
          bookCoverUrl: null,
          chapterNumber: 1,
          // chapterTitle: "Week 1: Acts Chapters 1-2", // Field doesn't exist in schema
          pageRange: null as any,
          externalUrl: "https://www.biblegateway.com/passage/?search=Acts%201-2&version=NLT",
          pdfUrl: null as any,
          hasAudioOption: false,
          audioUrl: null as any,
          estimatedTime: 30,
          orderIndex: 0,
          isRequired: true,
          isPublished: true,
          isDeleted: false
        } as any,
        {
          id: 1002,
          courseId: 4,
          title: "Week 2: Acts Chapters 3-5",
          description: "The early church's growth, miracles, and persecution",
          readingType: 'bible_chapter' as const,
          content: "This week covers the healing of the lame man, Peter's sermon, and the early church's unity and challenges.",
          bookTitle: "Book of Acts",
          bookAuthor: "Luke",
          bookCoverUrl: null,
          chapterNumber: 2,
          // chapterTitle: "Week 2: Acts Chapters 3-5", // Field doesn't exist in schema
          pageRange: null as any,
          externalUrl: "https://www.biblegateway.com/passage/?search=Acts%203-5&version=NLT",
          pdfUrl: null as any,
          hasAudioOption: false,
          audioUrl: null as any,
          estimatedTime: 30,
          orderIndex: 1,
          isRequired: true,
          isPublished: true,
          isDeleted: false
        } as any,
        {
          id: 1003,
          courseId: 4,
          title: "Week 3: Acts Chapters 6-8",
          description: "Stephen's martyrdom and the spread of the Gospel",
          readingType: 'bible_chapter' as const,
          content: "This week focuses on Stephen's powerful testimony, his martyrdom, and Philip's ministry in Samaria.",
          bookTitle: "Book of Acts",
          bookAuthor: "Luke",
          bookCoverUrl: null,
          chapterNumber: 3,
          // chapterTitle: "Week 3: Acts Chapters 6-8", // Field doesn't exist in schema
          pageRange: null as any,
          externalUrl: "https://www.biblegateway.com/passage/?search=Acts%206-8&version=NLT",
          pdfUrl: null as any,
          hasAudioOption: false,
          audioUrl: null as any,
          estimatedTime: 30,
          orderIndex: 2,
          isRequired: true,
          isPublished: true,
          isDeleted: false
        } as any,
        {
          id: 1004,
          courseId: 4,
          title: "Week 4: Acts Chapters 11 & 12",
          description: "Paul's conversion and Peter's vision",
          readingType: 'bible_chapter' as const,
          content: "This week covers Saul's dramatic conversion to Paul and Peter's vision about reaching the Gentiles.",
          bookTitle: "Book of Acts",
          bookAuthor: "Luke",
          bookCoverUrl: null,
          chapterNumber: 4,
          // chapterTitle: "Week 4: Acts Chapters 11 & 12", // Field doesn't exist in schema
          pageRange: null as any,
          externalUrl: "https://www.biblegateway.com/passage/?search=Acts%2011&version=NLT",
          pdfUrl: null as any,
          hasAudioOption: false,
          audioUrl: null as any,
          estimatedTime: 30,
          orderIndex: 3,
          isRequired: true,
          isPublished: true,
          isDeleted: false
        } as any,
        {
          id: 1005,
          courseId: 4,
          title: "Week 5: Acts Chapters 12-14",
          description: "Persecution, deliverance, and Paul's first missionary journey",
          readingType: 'bible_chapter' as const,
          content: "This week covers James's martyrdom, Peter's miraculous escape, and Paul's first missionary journey.",
          bookTitle: "Book of Acts",
          bookAuthor: "Luke",
          bookCoverUrl: null,
          chapterNumber: 5,
          // chapterTitle: "Week 5: Acts Chapters 12-14", // Field doesn't exist in schema
          pageRange: null as any,
          externalUrl: "https://www.biblegateway.com/passage/?search=Acts%2012-14&version=NLT",
          pdfUrl: null as any,
          hasAudioOption: false,
          audioUrl: null as any,
          estimatedTime: 30,
          orderIndex: 4,
          isRequired: true,
          isPublished: true,
          isDeleted: false
        } as any,
        {
          id: 1006,
          courseId: 4,
          title: "Week 6: Acts Chapters 15-17",
          description: "The Jerusalem Council and Paul's second missionary journey",
          readingType: 'bible_chapter' as const,
          content: "This week focuses on the Jerusalem Council's decision about Gentile believers and Paul's ministry in Europe.",
          bookTitle: "Book of Acts",
          bookAuthor: "Luke",
          bookCoverUrl: null,
          chapterNumber: 6,
          // chapterTitle: "Week 6: Acts Chapters 15-17", // Field doesn't exist in schema
          pageRange: null as any,
          externalUrl: "https://www.biblegateway.com/passage/?search=Acts%2015-17&version=NLT",
          pdfUrl: null as any,
          hasAudioOption: false,
          audioUrl: null as any,
          estimatedTime: 30,
          orderIndex: 5,
          isRequired: true,
          isPublished: true,
          isDeleted: false
        } as any,
        {
          id: 1007,
          courseId: 4,
          title: "Week 7: Acts Chapters 18-20",
          description: "Paul's ministry in Ephesus and farewell to the elders",
          readingType: 'bible_chapter' as const,
          content: "This week covers Paul's extended ministry in Ephesus and his emotional farewell to the Ephesian elders.",
          bookTitle: "Book of Acts",
          bookAuthor: "Luke",
          bookCoverUrl: null,
          chapterNumber: 7,
          // chapterTitle: "Week 7: Acts Chapters 18-20", // Field doesn't exist in schema
          pageRange: null as any,
          externalUrl: "https://www.biblegateway.com/passage/?search=Acts%2018-20&version=NLT",
          pdfUrl: null as any,
          hasAudioOption: false,
          audioUrl: null as any,
          estimatedTime: 30,
          orderIndex: 6,
          isRequired: true,
          isPublished: true,
          isDeleted: false
        } as any,
        {
          id: 1008,
          courseId: 4,
          title: "Week 8: Acts Chapters 21-23",
          description: "Paul's arrest in Jerusalem and defense before the council",
          readingType: 'bible_chapter' as const,
          content: "This week follows Paul's arrest in Jerusalem and his defense before the Jewish council.",
          bookTitle: "Book of Acts",
          bookAuthor: "Luke",
          bookCoverUrl: null,
          chapterNumber: 8,
          // chapterTitle: "Week 8: Acts Chapters 21-23", // Field doesn't exist in schema
          pageRange: null as any,
          externalUrl: "https://www.biblegateway.com/passage/?search=Acts%2021-23&version=NLT",
          pdfUrl: null as any,
          hasAudioOption: false,
          audioUrl: null as any,
          estimatedTime: 30,
          orderIndex: 7,
          isRequired: true,
          isPublished: true,
          isDeleted: false
        } as any,
        {
          id: 1009,
          courseId: 4,
          title: "Week 9: Acts Chapters 24-26",
          description: "Paul's trials before Felix, Festus, and Agrippa",
          readingType: 'bible_chapter' as const,
          content: "This week covers Paul's defense before Roman governors and King Agrippa.",
          bookTitle: "Book of Acts",
          bookAuthor: "Luke",
          bookCoverUrl: null,
          chapterNumber: 9,
          // chapterTitle: "Week 9: Acts Chapters 24-26", // Field doesn't exist in schema
          pageRange: null as any,
          externalUrl: "https://www.biblegateway.com/passage/?search=Acts%2024-26&version=NLT",
          pdfUrl: null as any,
          hasAudioOption: false,
          audioUrl: null as any,
          estimatedTime: 30,
          orderIndex: 8,
          isRequired: true,
          isPublished: true,
          isDeleted: false
        } as any,
        {
          id: 1010,
          courseId: 4,
          title: "Week 10: Acts Chapters 27-28",
          description: "Paul's journey to Rome and ministry under house arrest",
          readingType: 'bible_chapter' as const,
          content: "This final week covers Paul's shipwreck and his ministry in Rome under house arrest.",
          bookTitle: "Book of Acts",
          bookAuthor: "Luke",
          bookCoverUrl: null,
          chapterNumber: 10,
          // chapterTitle: "Week 10: Acts Chapters 27-28", // Field doesn't exist in schema
          pageRange: null as any,
          externalUrl: "https://www.biblegateway.com/passage/?search=Acts%2027-28&version=NLT",
          pdfUrl: null as any,
          hasAudioOption: false,
          audioUrl: null as any,
          estimatedTime: 30,
          orderIndex: 9,
          isRequired: true,
          isPublished: true,
          isDeleted: false
        }
      ];
      
      return bibleReadings;
    }

    // For other courses, use textbook chapters
    const courseToTextbookMapping: Record<number, number> = {
      1: 2,  // Acts in Action -> project 2
      2: 2,  // Studying for Service -> project 2
      3: 3,  // Becoming a Fire Starter -> project 3  
      5: 4,  // Level Up Leadership -> project 4 fallback
      6: 4,  // Theology 101 -> project 4 fallback
      7: 4,  // Introduction to Prophecy -> project 4 fallback
      8: 4,  // The Watchmen Project -> project 4 fallback
      9: 4,  // The Power of Preaching -> project 4 fallback
      11: 4, // Fallback -> project 4
      14: 4, // The 5 Levels of Leadership -> project 4 fallback
      16: 4, // SFGM Man of God Course -> project 4 fallback
    };

    const textbookProjectId = courseToTextbookMapping[courseId] || 4; // Default to project 4

    // Get textbook chapters for this course's mapped textbook project
    const chapters = await db
      .select()
      .from(textbookChapters)
      .where(eq(textbookChapters.projectId, textbookProjectId))
      .orderBy(textbookChapters.chapterNumber);
    
    // Convert textbook chapters to CourseReading format
    return chapters.map((chapter, index) => ({
      id: chapter.id,
      courseId: courseId,
      title: chapter.title,
      description: null,
      readingType: 'book_chapter' as const,
      content: chapter.content,
      bookTitle: null,
      bookAuthor: null,
      bookCoverUrl: null,
      chapterNumber: chapter.chapterNumber,
      // chapterTitle: chapter.title, // Field doesn't exist in schema
      pageRange: null,
          externalUrl: null as any,
      pdfUrl: null,
      hasAudioOption: false,
      audioUrl: null,
      estimatedTime: null,
      orderIndex: index,
      isRequired: true,
      isPublished: true,
      isDeleted: false
    } as any));
  }

  async getCourseReading(id: number): Promise<CourseReading | undefined> {
    // courseReadings table was removed - reading content now handled through textbook_chapters
    return undefined;
  }

  async getDeletedCourseVideos(courseId: number): Promise<CourseVideo[]> {
    return await db
      .select()
      .from(courseVideos)
      .where(and(eq(courseVideos.courseId, courseId), eq(courseVideos.isDeleted, true)))
      .orderBy(courseVideos.deletedAt);
  }

  async getDeletedCourseReadings(courseId: number): Promise<CourseReading[]> {
    // courseReadings table was removed - return empty array
    return [];
  }
  
  async createCourseVideo(video: InsertCourseVideo): Promise<CourseVideo> {
    const [newVideo] = await db
      .insert(courseVideos)
      .values(video)
      .returning();
    return newVideo;
  }
  
  async getMaxOrderIndex(courseId: number): Promise<number | null> {
    // courseReadings table was removed - return null
    return null;
  }

  async createCourseReading(reading: any): Promise<any> {
    // courseReadings table was removed - readings now handled through textbook_chapters
    throw new Error("Course readings functionality moved to textbook_chapters");
  }
  
  async updateCourseVideo(id: number, video: Partial<InsertCourseVideo>): Promise<CourseVideo> {
    const [updatedVideo] = await db
      .update(courseVideos)
      .set({ ...video, updatedAt: new Date() } as any)
      .where(eq(courseVideos.id, id))
      .returning();
    return updatedVideo;
  }
  
  async updateCourseReading(id: number, reading: any): Promise<any> {
    // courseReadings table was removed - readings now handled through textbook_chapters
    throw new Error("Course readings functionality moved to textbook_chapters");
  }
  
  async deleteCourseVideo(id: number, deletedBy?: string): Promise<void> {
    await db
      .update(courseVideos)
      .set({ 
        isDeleted: true, 
        deletedAt: new Date(),
        deletedBy: deletedBy 
      } as any)
      .where(eq(courseVideos.id, id));
  }
  
  async deleteCourseReading(id: number, deletedBy?: string): Promise<void> {
    // courseReadings table was removed - readings now handled through textbook_chapters
    throw new Error("Course readings functionality moved to textbook_chapters");
  }

  async restoreCourseVideo(id: number): Promise<void> {
    await db
      .update(courseVideos)
      .set({ 
        isDeleted: false, 
        deletedAt: null,
        deletedBy: null 
      } as any)
      .where(eq(courseVideos.id, id));
  }
  
  async restoreCourseReading(id: number): Promise<void> {
    // courseReadings table was removed - readings now handled through textbook_chapters
    throw new Error("Course readings functionality moved to textbook_chapters");
  }

  async permanentlyDeleteCourseVideo(id: number): Promise<void> {
    await db.delete(courseVideos).where(eq(courseVideos.id, id));
  }
  
  async permanentlyDeleteCourseReading(id: number): Promise<void> {
    // courseReadings table was removed - readings now handled through textbook_chapters
    throw new Error("Course readings functionality moved to textbook_chapters");
  }

  async cleanupExpiredDeletedItems(): Promise<void> {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    // Permanently delete videos older than 3 days
    await db
      .delete(courseVideos)
      .where(
        and(
          eq(courseVideos.isDeleted, true),
          lt(courseVideos.deletedAt, threeDaysAgo)
        )
      );

    // courseReadings table was removed - cleanup not needed
  }
  
  async grantInstructorPermission(permission: InsertInstructorPermission): Promise<InstructorPermission> {
    const [newPermission] = await db
      .insert(instructorPermissions)
      .values(permission)
      .returning();
    return newPermission;
  }
  
  async revokeInstructorPermission(instructorId: string, courseId: number): Promise<void> {
    await db
      .update(instructorPermissions)
      .set({ isActive: false, revokedAt: new Date() })
      .where(
        and(
          eq(instructorPermissions.instructorId, instructorId),
          eq(instructorPermissions.courseId, courseId)
        )
      );
  }
  
  async getInstructorPermissions(instructorId: string): Promise<InstructorPermission[]> {
    return await db
      .select()
      .from(instructorPermissions)
      .where(
        and(
          eq(instructorPermissions.instructorId, instructorId),
          eq(instructorPermissions.isActive, true)
        )
      );
  }
  
  async setUserAsDean(userId: string): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({ role: 'dean', updatedAt: new Date() } as any)
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  // Instructor application operations
  async submitInstructorApplication(application: InsertInstructorApplication): Promise<InstructorApplication> {
    const [newApplication] = await db
      .insert(instructorApplications)
      .values(application)
      .returning();
    return newApplication;
  }

  async getInstructorApplications(status?: string): Promise<InstructorApplication[]> {
    const query = db.select().from(instructorApplications);
    
    if (status) {
      return await query.where(eq(instructorApplications.status, status));
    }
    
    return await query.orderBy(desc(instructorApplications.appliedAt));
  }

  async getInstructorApplication(id: number): Promise<InstructorApplication | undefined> {
    const [application] = await db
      .select()
      .from(instructorApplications)
      .where(eq(instructorApplications.id, id));
    return application;
  }

  async reviewInstructorApplication(id: number, status: string, adminNotes?: string, reviewerId?: string): Promise<InstructorApplication> {
    const [updatedApplication] = await db
      .update(instructorApplications)
      .set({ 
        status, 
        adminNotes, 
        reviewedBy: reviewerId,
        reviewedAt: new Date() 
      } as any)
      .where(eq(instructorApplications.id, id))
      .returning();
    return updatedApplication;
  }

  // Role Management Methods
  async promoteToInstructor(userId: string): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error('User not found');
    
    const [updatedUser] = await db
      .update(users)
      .set({ 
        role: 'instructor',
        updatedAt: new Date() 
      } as any)
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  async addUserRole(userId: string, newRole: 'student' | 'instructor' | 'admin'): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error('User not found');
    
    if (user.role === newRole) {
      return user; // Already has this role
    }
    
    const [updatedUser] = await db
      .update(users)
      .set({ 
        role: newRole,
        updatedAt: new Date() 
      } as any)
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  async removeUserRole(userId: string, roleToRemove: 'student' | 'instructor' | 'admin'): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error('User not found');
    
    if (user.role !== roleToRemove) {
      return user; // Doesn't have this role to remove
    }
    
    // Default back to student role when removing other roles
    const [updatedUser] = await db
      .update(users)
      .set({ 
        role: 'student',
        updatedAt: new Date() 
      } as any)
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  // Content progress tracking methods
  async updateContentProgress(studentId: string, courseId: number, contentType: 'video' | 'reading' | 'quiz', contentId: number, completed: boolean): Promise<void> {
    const existingProgress = await db
      .select()
      .from(contentProgress)
      .where(
        and(
          eq(contentProgress.studentId, studentId),
          eq(contentProgress.courseId, courseId),
          eq(contentProgress.contentType, contentType),
          eq(contentProgress.contentId, contentId)
        )
      );

    if (existingProgress.length > 0) {
      await db
        .update(contentProgress)
        .set({ 
          completed, 
          completedAt: completed ? new Date() : null 
        })
        .where(eq(contentProgress.id, existingProgress[0].id));
    } else {
      await db
        .insert(contentProgress)
        .values({
          studentId,
          courseId,
          contentType,
          contentId,
          completed,
          completedAt: completed ? new Date() : null,
        });
    }
  }

  async getContentProgress(studentId: string, courseId: number): Promise<ContentProgress[]> {
    return db
      .select()
      .from(contentProgress)
      .where(
        and(
          eq(contentProgress.studentId, studentId),
          eq(contentProgress.courseId, courseId)
        )
      );
  }

  async checkPrerequisites(studentId: string, courseId: number, contentType: 'quiz'): Promise<boolean> {
    // No prerequisite checks - all content is freely accessible
    return true;
  }

  async checkWeekPrerequisites(studentId: string, courseId: number, weekNumber: number): Promise<boolean> {
    // No prerequisite checks - all weeks are freely accessible
    return true;
  }

  // Reading Progress Methods
  async saveReadingProgress(
    userId: string, 
    courseId: number, 
    chapterIndex: number, 
    pageIndex: number, 
    totalPages?: number
  ): Promise<void> {
    // Fix percentage calculation - should be current page / total pages * 100
    const completionPercentage = totalPages ? 
      Math.min(100, ((chapterIndex + pageIndex) / totalPages) * 100) : 0;

    // Check if progress record exists
    const existingProgress = await this.getReadingProgress(userId, courseId);
    
    if (existingProgress) {
      // Update existing record
      await db
        .update(readingProgress)
        .set({
          chapterIndex,
          pageIndex,
          totalPages,
          completionPercentage: Math.min(100, completionPercentage).toFixed(2),
          lastReadAt: new Date(),
          updatedAt: new Date(),
        } as any)
        .where(
          and(
            eq(readingProgress.userId, userId),
            eq(readingProgress.courseId, courseId)
          )
        );
    } else {
      // Insert new record
      await db
        .insert(readingProgress)
        .values({
          userId,
          courseId,
          chapterIndex,
          pageIndex,
          totalPages,
          completionPercentage: Math.min(100, completionPercentage).toFixed(2),
          lastReadAt: new Date(),
          updatedAt: new Date(),
        } as any);
    }
  }

  async getReadingProgress(userId: string, courseId: number): Promise<ReadingProgress | null> {
    const [progress] = await db
      .select()
      .from(readingProgress)
      .where(
        and(
          eq(readingProgress.userId, userId),
          eq(readingProgress.courseId, courseId)
        )
      );
    return progress || null;
  }

  async getAllUserReadingProgress(userId: string): Promise<ReadingProgress[]> {
    return db
      .select()
      .from(readingProgress)
      .where(eq(readingProgress.userId, userId))
      .orderBy(readingProgress.lastReadAt);
  }



  // Course instructions tracking methods
  async hasViewedCourseInstructions(userId: string, courseId: number): Promise<boolean> {
    const [viewed] = await db
      .select()
      .from(courseInstructionsViewed)
      .where(
        and(
          eq(courseInstructionsViewed.userId, userId),
          eq(courseInstructionsViewed.courseId, courseId)
        )
      );
    return !!viewed;
  }

  async markCourseInstructionsViewed(userId: string, courseId: number): Promise<CourseInstructionsViewed> {
    const [viewed] = await db
      .insert(courseInstructionsViewed)
      .values({
        userId,
        courseId,
      })
      .onConflictDoNothing()
      .returning();
    
    if (!viewed) {
      // If already exists, return the existing record
      const [existing] = await db
        .select()
        .from(courseInstructionsViewed)
        .where(
          and(
            eq(courseInstructionsViewed.userId, userId),
            eq(courseInstructionsViewed.courseId, courseId)
          )
        );
      return existing;
    }
    
    return viewed;
  }
  // Quiz retake permission methods
  async getRetakePermission(studentId: string, quizId: number) {
    const [permission] = await db.select()
      .from(quizRetakePermissions)
      .where(
        and(
          eq(quizRetakePermissions.studentId, studentId),
          eq(quizRetakePermissions.quizId, quizId),
          eq(quizRetakePermissions.isApproved, true)
        )
      )
      .orderBy(desc(quizRetakePermissions.approvedAt))
      .limit(1);
    return permission;
  }

  async incrementRetakeAttempts(permissionId: number) {
    await db.update(quizRetakePermissions)
      .set({
        attemptsUsed: sql`${quizRetakePermissions.attemptsUsed} + 1`
      } as any)
      .where(eq(quizRetakePermissions.id, permissionId));
  }

  async requestRetakePermission(studentId: string, quizId: number, reason: string) {
    const [permission] = await db.insert(quizRetakePermissions)
      .values({
        studentId,
        quizId,
        instructorId: 'system', // Will be updated when instructor responds
        reason,
        requestedAt: new Date(),
        isApproved: false,
        attemptsAllowed: 1,
        attemptsUsed: 0
      } as any)
      .returning();
    return permission;
  }

  async approveRetakePermission(permissionId: number, instructorId: string, instructorNotes?: string, attemptsAllowed: number = 1) {
    const [permission] = await db.update(quizRetakePermissions)
      .set({
        instructorId,
        isApproved: true,
        approvedAt: new Date(),
        instructorNotes,
        attemptsAllowed
      } as any)
      .where(eq(quizRetakePermissions.id, permissionId))
      .returning();
    return permission;
  }

  async getRetakeRequests(instructorId?: string) {
    const query = db.select({
      id: quizRetakePermissions.id,
      studentId: quizRetakePermissions.studentId,
      quizId: quizRetakePermissions.quizId,
      reason: quizRetakePermissions.reason,
      requestedAt: quizRetakePermissions.requestedAt,
      isApproved: quizRetakePermissions.isApproved,
      studentName: sql<string>`${users.firstName} || ' ' || ${users.lastName}`,
      quizTitle: quizzes.title,
      courseName: courses.name
    })
    .from(quizRetakePermissions)
    .leftJoin(users, eq(quizRetakePermissions.studentId, users.id))
    .leftJoin(quizzes, eq(quizRetakePermissions.quizId, quizzes.id))
    .leftJoin(courseModules, eq(quizzes.moduleId, courseModules.id))
    .leftJoin(courses, eq(courseModules.courseId, courses.id))
    .where(eq(quizRetakePermissions.isApproved, false))
    .orderBy(desc(quizRetakePermissions.requestedAt));

    return await query;
  }

  // Mini Courses System Implementation
  async getMiniCourses(): Promise<MiniCourse[]> {
    return await db
      .select()
      .from(miniCourses)
      .where(eq(miniCourses.isActive, true))
      .orderBy(miniCourses.orderIndex, miniCourses.title);
  }

  async getMiniCourse(id: number): Promise<MiniCourse | undefined> {
    const [course] = await db
      .select()
      .from(miniCourses)
      .where(and(eq(miniCourses.id, id), eq(miniCourses.isActive, true)));
    return course;
  }

  async getMiniCourseContent(miniCourseId: number): Promise<MiniCourseContent[]> {
    return await db
      .select()
      .from(miniCourseContent)
      .where(and(
        eq(miniCourseContent.miniCourseId, miniCourseId),
        eq(miniCourseContent.isPublished, true)
      ))
      .orderBy(miniCourseContent.orderIndex);
  }

  async getMiniCourseContentById(id: number): Promise<MiniCourseContent | undefined> {
    const [content] = await db
      .select()
      .from(miniCourseContent)
      .where(eq(miniCourseContent.id, id));
    return content;
  }

  async createMiniCourse(course: InsertMiniCourse): Promise<MiniCourse> {
    const [newCourse] = await db
      .insert(miniCourses)
      .values(course)
      .returning();
    return newCourse;
  }

  async createMiniCourseContent(content: InsertMiniCourseContent): Promise<MiniCourseContent> {
    const [newContent] = await db
      .insert(miniCourseContent)
      .values(content)
      .returning();
    return newContent;
  }

  async updateMiniCourseProgress(studentId: string, contentId: number, completed: boolean): Promise<void> {
    await db
      .insert(miniCourseProgress)
      .values({
        studentId,
        contentId,
        completed,
        completedAt: completed ? new Date() : null,
      })
      .onConflictDoUpdate({
        target: [miniCourseProgress.studentId, miniCourseProgress.contentId],
        set: {
          completed,
          completedAt: completed ? new Date() : null,
        },
      });
  }

  async getMiniCourseProgress(studentId: string, miniCourseId?: number): Promise<MiniCourseProgress[]> {
    let query = db
      .select()
      .from(miniCourseProgress)
      .where(eq(miniCourseProgress.studentId, studentId));

    if (miniCourseId) {
      return await db
        .select()
        .from(miniCourseProgress)
        .innerJoin(miniCourseContent, eq(miniCourseProgress.contentId, miniCourseContent.id))
        .where(and(
          eq(miniCourseProgress.studentId, studentId),
          eq(miniCourseContent.miniCourseId, miniCourseId)
        )) as any;
    }

    return await query;
  }

  async getStudentMiniCourseProgress(studentId: string): Promise<Array<MiniCourse & { completedContent: number; totalContent: number; progressPercentage: number }>> {
    const courses = await this.getMiniCourses();
    const result = [];

    for (const course of courses) {
      const totalContent = await db
        .select({ count: sql<number>`count(*)` })
        .from(miniCourseContent)
        .where(and(
          eq(miniCourseContent.miniCourseId, course.id),
          eq(miniCourseContent.isPublished, true)
        ));

      const completedContent = await db
        .select({ count: sql<number>`count(*)` })
        .from(miniCourseProgress)
        .innerJoin(miniCourseContent, eq(miniCourseProgress.contentId, miniCourseContent.id))
        .where(and(
          eq(miniCourseProgress.studentId, studentId),
          eq(miniCourseProgress.completed, true),
          eq(miniCourseContent.miniCourseId, course.id)
        ));

      const total = totalContent[0]?.count || 0;
      const completed = completedContent[0]?.count || 0;
      const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      result.push({
        ...course,
        completedContent: completed,
        totalContent: total,
        progressPercentage,
      });
    }

    return result;
  }

  // GROW Course Progress Management for Sequential Flow
  async getOrCreateGrowProgress(userId: string): Promise<any> {
    const [existing] = await db.select().from(growCourseProgress)
      .where(eq(growCourseProgress.userId, userId));
    
    if (existing) {
      // Update last accessed time
      const [updated] = await db.update(growCourseProgress)
        .set({ lastAccessedAt: new Date() } as any)
        .where(eq(growCourseProgress.userId, userId))
        .returning();
      return updated;
    }

    // Create new progress entry
    const [newProgress] = await db.insert(growCourseProgress)
      .values({ userId })
      .returning();
    return newProgress;
  }

  async updateGrowProgress(userId: string, updates: any) {
    const [updated] = await db.update(growCourseProgress)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(growCourseProgress.userId, userId))
      .returning();
    return updated;
  }

  async completeGrowWeek(userId: string, weekNumber: number) {
    const current = await this.getOrCreateGrowProgress(userId);
    const newWeeksCompleted = Math.max(current.weeksCompleted, weekNumber);
    const newCurrentWeek = weekNumber < 4 ? weekNumber + 1 : 4;
    const courseCompleted = weekNumber === 4;

    // If course is completed (week 4), check if enrollment should be marked as completed
    if (courseCompleted) {
      await this.checkAndUpdateEnrollmentCompletion(userId, 0); // Course ID 0 for G.R.O.W
    }

    return this.updateGrowProgress(userId, {
      currentWeek: newCurrentWeek,
      weeksCompleted: newWeeksCompleted,
      courseCompleted
    });
  }

  // Check if a student has completed all course requirements and update enrollment status
  async checkAndUpdateEnrollmentCompletion(studentId: string, courseId: number) {
    try {
      // Get all quiz attempts for this student and course
      const quizAttemptsData = await db.select()
        .from(quizAttempts)
        .innerJoin(quizzes, eq(quizAttempts.quizId, quizzes.id))
        .innerJoin(courseModules, eq(quizzes.moduleId, courseModules.id))
        .where(and(
          eq(quizAttempts.studentId, studentId),
          eq(courseModules.courseId, courseId),
          isNotNull(quizAttempts.completedAt)
        ));

      // Count completed regular quizzes and final essays
      const regularQuizzes = quizAttemptsData.filter(qa => !qa.quizzes.isFinalExam);
      const finalEssays = quizAttemptsData.filter(qa => 
        qa.quizzes.isFinalExam && qa.quiz_attempts.essay && qa.quiz_attempts.essay.length > 50
      );

      // For G.R.O.W course: 4 regular quizzes + 1 final essay
      // For other courses: adjust requirements as needed
      const requiredQuizzes = courseId === 0 ? 4 : 4; // Can be customized per course
      const requiredEssays = 1;

      if (regularQuizzes.length >= requiredQuizzes && finalEssays.length >= requiredEssays) {
        // Calculate average score for grade
        const avgScore = quizAttemptsData.reduce((sum, qa) => sum + (parseFloat(qa.quiz_attempts.score as string) || 0), 0) / quizAttemptsData.length;
        const gradeScale = Math.min(avgScore / 10, 9.99); // Convert to 4.0 scale, max 9.99

        // Get completion date from the latest quiz/essay
        const completionDate = new Date(Math.max(
          ...quizAttemptsData.map(qa => new Date(qa.quiz_attempts.completedAt!).getTime())
        ));

        // Update enrollment status
        await db.update(enrollments)
          .set({
            status: 'completed',
            completedAt: completionDate,
            grade: (Math.round(gradeScale * 100) / 100).toString() // Round to 2 decimal places
          })
          .where(and(
            eq(enrollments.studentId, studentId),
            eq(enrollments.courseId, courseId),
            eq(enrollments.status, 'active')
          ));

        console.log(`✅ Auto-completed enrollment for student ${studentId} in course ${courseId}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking enrollment completion:', error);
      return false;
    }
  }

  // Run completion check for all active enrollments (maintenance function)
  async checkAllEnrollmentCompletions() {
    try {
      const activeEnrollments = await db.select()
        .from(enrollments)
        .where(eq(enrollments.status, 'active'));

      let updatedCount = 0;
      for (const enrollment of activeEnrollments) {
        const wasUpdated = await this.checkAndUpdateEnrollmentCompletion(
          enrollment.studentId!, 
          enrollment.courseId!
        );
        if (wasUpdated) updatedCount++;
      }

      console.log(`🔧 Completion check complete: ${updatedCount} enrollments updated`);
      return updatedCount;
    } catch (error) {
      console.error('Error checking all enrollments:', error);
      return 0;
    }
  }


  // Personal Library Methods
  async addBookToPersonalLibrary(userId: string, bookData: any) {
    const [book] = await db.insert(personalLibrary)
      .values({
        userId,
        bookTitle: bookData.title,
        bookAuthor: bookData.author,
        category: bookData.category,
        description: bookData.description,
        estimatedReadingTime: bookData.estimatedReadingTime,
        coverColor: bookData.coverColor,
        readingStatus: bookData.readingStatus || "want_to_read",
        pdfUrl: bookData.pdfUrl || null,
        coverUrl: bookData.coverUrl || null,
      } as any)
      .returning();
    return book;
  }

  async getUserPersonalLibrary(userId: string) {
    const books = await db.select().from(personalLibrary)
      .where(eq(personalLibrary.userId, userId))
      .orderBy(desc(personalLibrary.dateAdded));
    return books;
  }

  async removeBookFromPersonalLibrary(userId: string, bookId: number) {
    await db.delete(personalLibrary)
      .where(and(
        eq(personalLibrary.id, bookId),
        eq(personalLibrary.userId, userId)
      ));
  }

  async updateBookInPersonalLibrary(userId: string, bookId: number, updates: any) {
    const [updated] = await db.update(personalLibrary)
      .set(updates)
      .where(and(
        eq(personalLibrary.id, bookId),
        eq(personalLibrary.userId, userId)
      ))
      .returning();
    return updated;
  }

  async checkBookInPersonalLibrary(userId: string, bookTitle: string, bookAuthor: string) {
    const [existing] = await db.select().from(personalLibrary)
      .where(and(
        eq(personalLibrary.userId, userId),
        eq(personalLibrary.bookTitle, bookTitle),
        eq(personalLibrary.bookAuthor, bookAuthor)
      ));
    return existing;
  }

  // Student Management Data - Using raw SQL to avoid ORM issues
  async getStudentManagementData() {
    try {
      // Get all students with basic details using raw SQL
      const studentsResult = await db.execute(sql`
        SELECT 
          id, 
          first_name, 
          last_name, 
          username, 
          email, 
          created_at, 
          gender, 
          role
        FROM users 
        WHERE role = 'student'
        ORDER BY created_at DESC
      `);

      const students = studentsResult.rows;
      const totalStudents = students.length;

      // Get enrollment count per student
      const enrollmentResult = await db.execute(sql`
        SELECT 
          student_id,
          COUNT(*) as enrollment_count
        FROM enrollments 
        GROUP BY student_id
      `);

      const enrollmentMap = new Map();
      enrollmentResult.rows.forEach((row: any) => {
        enrollmentMap.set(row.student_id, parseInt(row.enrollment_count));
      });

      // Get GPA data using raw SQL with proper numeric conversion
      const gpaResult = await db.execute(sql`
        SELECT 
          student_id,
          ROUND(AVG(score::numeric * 4.0 / 100), 2) as gpa
        FROM quiz_attempts 
        WHERE score IS NOT NULL AND score > 0
        GROUP BY student_id
      `);

      const gpaMap = new Map();
      gpaResult.rows.forEach((row: any) => {
        gpaMap.set(row.student_id, parseFloat(row.gpa) || 0);
      });

      // Combine data
      const studentList = students.map((student: any) => ({
        id: student.id,
        firstName: student.first_name,
        lastName: student.last_name,
        username: student.username,
        email: student.email,
        createdAt: student.created_at,
        gender: student.gender,
        fullName: `${student.first_name || ''} ${student.last_name || ''}`.trim() || 'Anonymous',
        enrolledCourses: enrollmentMap.get(student.id) || 0,
        gpa: gpaMap.get(student.id) || 0,
        isActive: true
      }));

      const avgGPA = studentList.reduce((sum, s) => sum + (s.gpa || 0), 0) / (totalStudents || 1);
      const studentsOnDeansList = studentList.filter(s => (s.gpa || 0) >= 3.5).length;

      return {
        totalStudents,
        activeStudents: totalStudents,
        avgGPA: avgGPA.toFixed(2),
        studentsOnDeansList,
        recentRegistrations: studentList.slice(0, 10),
        topPerformers: studentList
          .filter(s => s.gpa && s.gpa > 0)
          .sort((a, b) => (b.gpa || 0) - (a.gpa || 0))
          .slice(0, 10),
        studentList: studentList,
        activitySummary: {
          activeInLast30Days: totalStudents,
          inactiveStudents: 0,
          averageEnrollments: studentList.reduce((sum, s) => sum + s.enrolledCourses, 0) / (totalStudents || 1)
        }
      };
    } catch (error) {
      console.error('Error fetching student management data:', error);
      throw error;
    }
  }

  // Dean Ministry Overview Statistics
  async getMinistryOverviewStats() {
    try {
      // Get total active students
      const totalStudentsResult = await db.select({ count: count() }).from(users).where(eq(users.role, 'student'));
      const totalStudents = totalStudentsResult[0]?.count || 0;
      
      // Get new students this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const newStudentsResult = await db.select({ count: count() })
        .from(users)
        .where(and(
          eq(users.role, 'student'),
          sql`${users.createdAt} >= ${oneWeekAgo}`
        ));
      const newStudentsThisWeek = newStudentsResult[0]?.count || 0;

      // Get total courses
      const totalCoursesResult = await db.select({ count: count() }).from(courses);
      const totalCourses = totalCoursesResult[0]?.count || 0;

      // Get average GPA using raw SQL for proper numeric conversion
      const avgGPAResult = await db.execute(sql`
        SELECT COALESCE(ROUND(AVG(score::numeric * 4.0 / 100), 2), 0) as avg_gpa
        FROM quiz_attempts 
        WHERE score IS NOT NULL AND score > 0
      `);
      const avgGPA = parseFloat(avgGPAResult.rows[0]?.avg_gpa as string) || 0;

      // Get students on Dean's List using raw SQL
      const deansListResult = await db.execute(sql`
        SELECT COUNT(DISTINCT student_id) as count
        FROM quiz_attempts 
        WHERE score IS NOT NULL AND score::numeric * 4.0 / 100 >= 3.5
      `);
      const studentsOnDeansList = parseInt(deansListResult.rows[0]?.count as string) || 0;

      // Get gender breakdown of students
      const genderStatsResult = await db.select({
        gender: users.gender,
        count: count()
      })
      .from(users)
      .where(eq(users.role, 'student'))
      .groupBy(users.gender);
      
      const genderStats = {
        male: genderStatsResult.find(g => g.gender === 'Male')?.count || 0,
        female: genderStatsResult.find(g => g.gender === 'Female')?.count || 0
      };

      // Get recent students (last 10) with gender
      const recentStudents = await db.select({
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt,
        email: users.email,
        gender: users.gender
      })
      .from(users)
      .where(eq(users.role, 'student'))
      .orderBy(desc(users.createdAt))
      .limit(10);

      // Get top performing students using raw SQL
      const topStudentsResult = await db.execute(sql`
        SELECT 
          qa.student_id as user_id,
          u.first_name,
          u.last_name,
          u.gender,
          ROUND(AVG(qa.score::numeric * 4.0 / 100), 2) as gpa
        FROM quiz_attempts qa
        JOIN users u ON u.id = qa.student_id
        WHERE u.role = 'student' AND qa.score IS NOT NULL AND qa.score > 0
        GROUP BY qa.student_id, u.first_name, u.last_name, u.gender
        ORDER BY AVG(qa.score::numeric) DESC
        LIMIT 5
      `);
      const topStudents = topStudentsResult.rows;

      // Get course statistics
      const courseStats = await db.select({
        courseId: courses.id,
        title: courses.name,
        enrollments: sql<number>`COUNT(DISTINCT ${enrollments.studentId})`,
        completedEnrollments: sql<number>`COUNT(DISTINCT CASE WHEN ${enrollments.completedAt} IS NOT NULL THEN ${enrollments.studentId} END)`,
        completionRate: sql<number>`COALESCE(ROUND(
          (COUNT(DISTINCT CASE WHEN ${enrollments.completedAt} IS NOT NULL THEN ${enrollments.studentId} END) * 100.0) / 
          NULLIF(COUNT(DISTINCT ${enrollments.studentId}), 0)
        ), 0)`
      })
      .from(courses)
      .leftJoin(enrollments, eq(enrollments.courseId, courses.id))
      .groupBy(courses.id, courses.name)
      .orderBy(desc(sql`COUNT(DISTINCT ${enrollments.studentId})`));

      // Calculate overall completion rate
      const totalEnrollmentsResult = await db.select({ count: count() }).from(enrollments);
      const completedEnrollmentsResult = await db.select({ count: count() }).from(enrollments).where(isNotNull(enrollments.completedAt));
      
      const totalEnrollmentsCount = totalEnrollmentsResult[0]?.count || 0;
      const completedEnrollmentsCount = completedEnrollmentsResult[0]?.count || 0;
      
      const avgCompletionRate = totalEnrollmentsCount > 0 
        ? Math.round((completedEnrollmentsCount / totalEnrollmentsCount) * 100)
        : 0;

      return {
        totalStudents,
        newStudentsThisWeek,
        totalCourses,
        avgGPA,
        avgCompletionRate,
        studentsOnDeansList,
        genderStats,
        recentStudents: recentStudents.map(s => ({
          fullName: `${s.firstName || ''} ${s.lastName || ''}`.trim() || 'Anonymous',
          createdAt: s.createdAt,
          email: s.email,
          gender: s.gender || 'Not Specified'
        })),
        topStudents: topStudents.map((s: any) => ({
          userId: s.user_id,
          fullName: `${s.first_name || ''} ${s.last_name || ''}`.trim() || 'Anonymous',
          gpa: parseFloat(s.gpa) || 0,
          gender: s.gender || 'Not Specified'
        })),
        courseStats
      };
    } catch (error) {
      console.error('Error fetching ministry overview stats:', error);
      // Return safe defaults instead of throwing
      return {
        totalStudents: 0,
        newStudentsThisWeek: 0,
        totalCourses: 0,
        avgGPA: 0,
        avgCompletionRate: 0,
        studentsOnDeansList: 0,
        genderStats: { male: 0, female: 0 },
        recentStudents: [],
        topStudents: [],
        courseStats: []
      };
    }
  }

  async getAllQuizzes(): Promise<any[]> {
    try {
      return await db.select().from(quizzes);
    } catch (error) {
      console.error('Error fetching all quizzes:', error);
      return [];
    }
  }

  async getAllQuizAttempts(studentId: string): Promise<QuizAttempt[]> {
    try {
      return await db
        .select()
        .from(quizAttempts)
        .where(eq(quizAttempts.studentId, studentId))
        .orderBy(desc(quizAttempts.startedAt));
    } catch (error) {
      console.error('Error fetching all quiz attempts:', error);
      return [];
    }
  }
}

export const storage = new DatabaseStorage();
