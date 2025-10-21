import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  decimal,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for OAuth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for OAuth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  username: varchar("username").unique(),
  password: varchar("password"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  bio: text("bio"),
  favoriteScripture: text("favorite_scripture"),
  favoriteScriptureBook: varchar("favorite_scripture_book"),
  favoriteScriptureChapter: varchar("favorite_scripture_chapter"),
  favoriteScriptureVerse: varchar("favorite_scripture_verse"),
  bibleTranslation: varchar("bible_translation").default("NLT"),
  phone: varchar("phone"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role", { enum: ["student", "instructor", "admin", "dean"] }).default("student").notNull(),
  churchPosition: varchar("church_position", { enum: ["member", "elder", "deacon", "choir_member", "choir_director", "assistant_pastor", "youth_leader", "usher", "trustee", "sound_engineer", "committee_member"] }).default("member"),
  gender: varchar("gender", { enum: ["Male", "Female"] }).notNull(),
  profileCompleted: boolean("profile_completed").default(false),
  moderationWarnings: integer("moderation_warnings").default(0),
  // Removed isDean - role field now handles this
  isBlocked: boolean("is_blocked").default(false),
  // Removed instructorPermissions - simplified role system
  emailVerified: boolean("email_verified").default(false),
  emailVerificationToken: varchar("email_verification_token"),
  registrationMethod: varchar("registration_method", { enum: ["email", "google", "facebook", "apple", "sfgmboston"] }).default("email"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Removed userRoles table - simplified to single role per user

// Auth Tokens table for token management (single unified system)
export const authTokens = pgTable("auth_tokens", {
  id: serial("id").primaryKey(),
  token: varchar("token").notNull().unique(),
  userId: varchar("user_id").notNull().references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Course Readings table (legacy support)
export const courseReadings = pgTable("course_readings", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  readingType: varchar("reading_type", { length: 50 }).default("textbook"),
  content: text("content"),
  bookTitle: varchar("book_title", { length: 255 }),
  bookAuthor: varchar("book_author", { length: 255 }),
  bookCoverUrl: varchar("book_cover_url", { length: 500 }),
  chapterNumber: integer("chapter_number"),
  orderIndex: integer("order_index").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  duration: integer("duration").notNull(), // in weeks
  instructorId: varchar("instructor_id").references(() => users.id),
  isActive: boolean("is_active").default(true),
  isUpdated: boolean("is_updated").default(false), // Track if course has been updated
  // Prerequisite system columns
  isPrerequisite: boolean("is_prerequisite").default(false),
  prerequisiteOrder: integer("prerequisite_order"),
  prerequisiteMessage: text("prerequisite_message"),
  // Course categories and metadata
  category: varchar("category"),
  difficulty: varchar("difficulty"),
  points: integer("points"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const courseModules = pgTable("course_modules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  videoUrl: varchar("video_url"),
  readingMaterial: text("reading_material"),
  orderIndex: integer("order_index").notNull(),
  weekNumber: integer("week_number"), // Add week tracking
  moduleType: varchar("module_type", { enum: ["video", "reading", "quiz", "textbook"] }), // Add type tracking
  isRequired: boolean("is_required").default(true),
  externalUrl: varchar("external_url"), // For linking to textbook reader
  createdAt: timestamp("created_at").defaultNow(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  grade: decimal("grade", { precision: 3, scale: 2 }),
  status: varchar("status", { enum: ["active", "completed", "dropped"] }).default("active"),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => courseModules.id),
  title: varchar("title", { length: 255 }).notNull(),
  timeLimit: integer("time_limit"), // in minutes
  passingScore: integer("passing_score").default(60),
  isFinalExam: boolean("is_final_exam").default(false),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").references(() => quizzes.id),
  question: text("question").notNull(),
  type: varchar("type", { enum: ["multiple_choice", "true_false", "fill_blank", "yes_no_with_text"] }).notNull(),
  options: jsonb("options"), // for multiple choice questions
  correctAnswer: text("correct_answer").notNull(),
  points: integer("points").default(1),
  orderIndex: integer("order_index").notNull(),
  isBonus: boolean("is_bonus").default(false),
  parentQuestionId: integer("parent_question_id"),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id").references(() => users.id),
  quizId: integer("quiz_id").references(() => quizzes.id),
  answers: jsonb("answers").notNull(),
  score: decimal("score", { precision: 5, scale: 2 }),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  timeSpent: integer("time_spent"), // in minutes
  essay: text("essay"), // For final exam essay requirement
  essayGraded: boolean("essay_graded").default(false),
  instructorFeedback: text("instructor_feedback"),
  finalGrade: decimal("final_grade", { precision: 5, scale: 2 }),
  certificateApproved: boolean("certificate_approved").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const quizRetakePermissions = pgTable("quiz_retake_permissions", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id").references(() => users.id),
  quizId: integer("quiz_id").references(() => quizzes.id),
  instructorId: varchar("instructor_id").references(() => users.id),
  reason: text("reason").notNull(),
  requestedAt: timestamp("requested_at").defaultNow(),
  approvedAt: timestamp("approved_at"),
  isApproved: boolean("is_approved").default(false),
  instructorNotes: text("instructor_notes"),
  attemptsAllowed: integer("attempts_allowed").default(1),
  attemptsUsed: integer("attempts_used").default(0),
});

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => courseModules.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  maxPoints: integer("max_points").default(100),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assignmentSubmissions = pgTable("assignment_submissions", {
  id: serial("id").primaryKey(),
  assignmentId: integer("assignment_id").references(() => assignments.id),
  studentId: varchar("student_id").references(() => users.id),
  content: text("content"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  grade: decimal("grade", { precision: 5, scale: 2 }),
  feedback: text("feedback"),
  gradedAt: timestamp("graded_at"),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id").references(() => users.id),
  moduleId: integer("module_id").references(() => courseModules.id),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

// Track completion of individual content items (videos, readings, quizzes)
export const contentProgress = pgTable("content_progress", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  contentType: varchar("content_type").$type<"video" | "reading" | "quiz">(),
  contentId: integer("content_id"), // ID of the video, reading, or quiz
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow()
});

// Course content tables for instructor portal
export const courseVideos = pgTable("course_videos", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  moduleId: integer("module_id").references(() => courseModules.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  videoUrl: varchar("video_url", { length: 500 }),
  duration: integer("duration"), // in minutes
  orderIndex: integer("order_index").notNull(),
  isRequired: boolean("is_required").default(true),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  isDeleted: boolean("is_deleted").default(false),
  deletedAt: timestamp("deleted_at"),
  deletedBy: varchar("deleted_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// courseReadings table removed - textbook content now stored in textbook_chapters table only

export const instructorPermissions = pgTable("instructor_permissions", {
  id: serial("id").primaryKey(),
  instructorId: varchar("instructor_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  grantedById: varchar("granted_by_id").references(() => users.id),
  permissions: text("permissions").array(), // ['view', 'edit', 'create_content', 'manage_students']
  grantedAt: timestamp("granted_at").defaultNow(),
  revokedAt: timestamp("revoked_at"),
  isActive: boolean("is_active").default(true),
});

export const instructorApplications = pgTable("instructor_applications", {
  id: serial("id").primaryKey(),
  applicantId: varchar("applicant_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  qualifications: text("qualifications").notNull(),
  experience: text("experience").notNull(),
  ministry: text("ministry").notNull(),
  motivation: text("motivation").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, approved, rejected
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: varchar("reviewed_by").references(() => users.id),
  adminNotes: text("admin_notes"),
});

// Textbook Maker Tables
export const textbookProjects = pgTable("textbook_projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  topic: varchar("topic", { length: 255 }).notNull(),
  description: text("description"),
  chapters: integer("chapters").notNull(),
  includeTests: boolean("include_tests").default(true),
  includeIntroduction: boolean("include_introduction").default(true),
  includeConclusion: boolean("include_conclusion").default(true),
  targetAudience: varchar("target_audience", { length: 255 }).notNull(),
  difficulty: varchar("difficulty", { enum: ["beginner", "intermediate", "advanced"] }).notNull(),
  status: varchar("status", { enum: ["draft", "generating", "completed", "failed"] }).default("draft"),
  progress: integer("progress").default(0),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  generatedContent: jsonb("generated_content"), // Store full book content
  coverImageUrl: varchar("cover_image_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const textbookChapters = pgTable("textbook_chapters", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => textbookProjects.id),
  chapterNumber: integer("chapter_number").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  isIntroduction: boolean("is_introduction").default(false),
  isConclusion: boolean("is_conclusion").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const textbookChapterTests = pgTable("textbook_chapter_tests", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").notNull().references(() => textbookChapters.id),
  questions: jsonb("questions").notNull(), // Array of question objects
  createdAt: timestamp("created_at").defaultNow(),
});

// Course completion tracking
export const courseCompletions = pgTable("course_completions", {
  userId: text("user_id").notNull(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  completedAt: timestamp("completed_at").defaultNow(),
  finalGrade: decimal("final_grade", { precision: 5, scale: 2 }),
  certificateIssued: boolean("certificate_issued").default(false),
  certificateNumber: text("certificate_number").unique(),
}, (table) => ({
  uniqueUserCourse: primaryKey({ columns: [table.userId, table.courseId] }),
}));

// Certificates table
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  certificateNumber: text("certificate_number").unique().notNull(),
  issueDate: timestamp("issue_date").defaultNow(),
  studentName: text("student_name").notNull(),
  courseTitle: text("course_title").notNull(),
  completionDate: timestamp("completion_date").notNull(),
  finalGrade: decimal("final_grade", { precision: 5, scale: 2 }),
  instructorName: text("instructor_name").default("Pastor Rocky"),
  certificateType: text("certificate_type").default("Course Completion"),
});

// Reading Progress tracking table
export const readingProgress = pgTable("reading_progress", {
  userId: varchar("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  chapterIndex: integer("chapter_index").notNull().default(0),
  pageIndex: integer("page_index").notNull().default(0),
  totalPages: integer("total_pages"),
  completionPercentage: decimal("completion_percentage", { precision: 5, scale: 2 }).default("0.00"),
  lastReadAt: timestamp("last_read_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  // Unique constraint: one progress record per user per course
  uniqueUserCourse: primaryKey({ columns: [table.userId, table.courseId] }),
}));

// Course Instructions Viewed - tracks if user has seen instructions for a course
export const courseInstructionsViewed = pgTable("course_instructions_viewed", {
  userId: varchar("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
}, (table) => ({
  // Unique constraint: one record per user per course
  uniqueUserCourse: primaryKey({ columns: [table.userId, table.courseId] }),
}));

// Essays table for separate essay submissions (final exams)
export const essays = pgTable("essays", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
  questionId: integer("question_id").notNull().references(() => quizQuestions.id, { onDelete: "cascade" }),
  studentId: varchar("student_id").notNull().references(() => users.id),
  essayText: text("essay_text").notNull(),
  wordCount: integer("word_count").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
  instructorFeedback: text("instructor_feedback"),
  instructorScore: integer("instructor_score"),
  gradedAt: timestamp("graded_at"),
  gradedBy: varchar("graded_by").references(() => users.id),
});

// External Books table for PDF books and suggested reading
export const externalBooks = pgTable("external_books", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  author: varchar("author").notNull(),
  isbn: varchar("isbn"),
  category: varchar("category").notNull(),
  description: text("description"),
  difficulty: varchar("difficulty", { enum: ["Beginner", "Intermediate", "Advanced"] }).default("Beginner"),
  estimatedReadingTime: varchar("estimated_reading_time"),
  rating: integer("rating").default(5),
  coverImageUrl: varchar("cover_image_url"),
  coverColor: varchar("cover_color").default("bg-blue-500"),
  pdfFilePath: varchar("pdf_file_path"), // Path to uploaded PDF
  hasContent: boolean("has_content").default(false), // Whether text content has been extracted
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Book Chapters table for extracted PDF content
export const bookChapters = pgTable("book_chapters", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").notNull().references(() => externalBooks.id, { onDelete: "cascade" }),
  chapterNumber: integer("chapter_number").notNull(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  pageStart: integer("page_start"),
  pageEnd: integer("page_end"),
  wordCount: integer("word_count"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type CourseInstructionsViewed = typeof courseInstructionsViewed.$inferSelect;
export type InsertCourseInstructionsViewed = typeof courseInstructionsViewed.$inferInsert;
export type Essay = typeof essays.$inferSelect;
export type InsertEssay = typeof essays.$inferInsert;
export type ExternalBook = typeof externalBooks.$inferSelect;
export type InsertExternalBook = typeof externalBooks.$inferInsert;
export type BookChapter = typeof bookChapters.$inferSelect;
export type InsertBookChapter = typeof bookChapters.$inferInsert;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  enrollments: many(enrollments),
  quizAttempts: many(quizAttempts),
  assignmentSubmissions: many(assignmentSubmissions),
  progress: many(progress),
  coursesInstructed: many(courses),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  modules: many(courseModules),
  enrollments: many(enrollments),
}));

export const courseModulesRelations = relations(courseModules, ({ one, many }) => ({
  course: one(courses, {
    fields: [courseModules.courseId],
    references: [courses.id],
  }),
  quizzes: many(quizzes),
  assignments: many(assignments),
  progress: many(progress),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  student: one(users, {
    fields: [enrollments.studentId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
  module: one(courseModules, {
    fields: [quizzes.moduleId],
    references: [courseModules.id],
  }),
  questions: many(quizQuestions),
  attempts: many(quizAttempts),
}));

export const quizQuestionsRelations = relations(quizQuestions, ({ one }) => ({
  quiz: one(quizzes, {
    fields: [quizQuestions.quizId],
    references: [quizzes.id],
  }),
}));

export const quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
  student: one(users, {
    fields: [quizAttempts.studentId],
    references: [users.id],
  }),
  quiz: one(quizzes, {
    fields: [quizAttempts.quizId],
    references: [quizzes.id],
  }),
}));

export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
  module: one(courseModules, {
    fields: [assignments.moduleId],
    references: [courseModules.id],
  }),
  submissions: many(assignmentSubmissions),
}));

export const assignmentSubmissionsRelations = relations(assignmentSubmissions, ({ one }) => ({
  assignment: one(assignments, {
    fields: [assignmentSubmissions.assignmentId],
    references: [assignments.id],
  }),
  student: one(users, {
    fields: [assignmentSubmissions.studentId],
    references: [users.id],
  }),
}));

export const progressRelations = relations(progress, ({ one }) => ({
  student: one(users, {
    fields: [progress.studentId],
    references: [users.id],
  }),
  module: one(courseModules, {
    fields: [progress.moduleId],
    references: [courseModules.id],
  }),
}));

export const contentProgressRelations = relations(contentProgress, ({ one }) => ({
  student: one(users, {
    fields: [contentProgress.studentId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [contentProgress.courseId],
    references: [courses.id],
  }),
}));

export const courseCompletionsRelations = relations(courseCompletions, ({ one }) => ({
  course: one(courses, {
    fields: [courseCompletions.courseId],
    references: [courses.id],
  }),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
  course: one(courses, {
    fields: [certificates.courseId],
    references: [courses.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  enrolledAt: true,
});

export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({
  id: true,
  startedAt: true,
});

export const insertAssignmentSubmissionSchema = createInsertSchema(assignmentSubmissions).omit({
  id: true,
  submittedAt: true,
});

export const insertInstructorApplicationSchema = createInsertSchema(instructorApplications).omit({
  id: true,
  appliedAt: true,
  reviewedAt: true,
});

export const insertTextbookProjectSchema = createInsertSchema(textbookProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  progress: true,
  status: true,
});

export const insertTextbookChapterSchema = createInsertSchema(textbookChapters).omit({
  id: true,
  createdAt: true,
});

export const insertCourseCompletionSchema = createInsertSchema(courseCompletions).omit({
  completedAt: true,
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  issueDate: true,
});

export const insertReadingProgressSchema = createInsertSchema(readingProgress).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertCourseInstructionsViewedSchema = createInsertSchema(courseInstructionsViewed).omit({
  viewedAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Mini Courses System - Optional courses for all users
export const miniCourses = pgTable("mini_courses", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).default("Bible Study"),
  coverImageUrl: varchar("cover_image_url", { length: 500 }),
  difficulty: varchar("difficulty", { length: 20 }).default("Beginner"), // Beginner, Intermediate, Advanced
  estimatedDuration: varchar("estimated_duration", { length: 50 }), // "4 weeks", "6 sessions", etc.
  isActive: boolean("is_active").default(true),
  orderIndex: integer("order_index").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Mini Course Content (lessons/sessions)
export const miniCourseContent = pgTable("mini_course_content", {
  id: serial("id").primaryKey(),
  miniCourseId: integer("mini_course_id").references(() => miniCourses.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content"), // Main lesson content
  contentType: varchar("content_type", { length: 50 }).default("reading"), // reading, video, audio
  videoUrl: varchar("video_url", { length: 500 }),
  audioUrl: varchar("audio_url", { length: 500 }),
  externalUrl: varchar("external_url", { length: 500 }),
  bibleReferences: text("bible_references"), // JSON array of scripture references
  orderIndex: integer("order_index").default(0),
  estimatedTime: integer("estimated_time"), // minutes
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Track student progress in mini courses (only for authenticated students)
export const miniCourseProgress = pgTable("mini_course_progress", {
  id: serial("id").primaryKey(),
  studentId: varchar("student_id").references(() => users.id, { onDelete: "cascade" }),
  miniCourseId: integer("mini_course_id").references(() => miniCourses.id, { onDelete: "cascade" }),
  contentId: integer("content_id").references(() => miniCourseContent.id, { onDelete: "cascade" }),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  timeSpent: integer("time_spent").default(0), // minutes
  createdAt: timestamp("created_at").defaultNow(),
});

// Personal Library - User's saved book suggestions
export const personalLibrary = pgTable("personal_library", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  bookTitle: varchar("book_title", { length: 255 }).notNull(),
  bookAuthor: varchar("book_author", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description"),
  difficulty: varchar("difficulty", { length: 20 }).notNull(),
  estimatedReadingTime: varchar("estimated_reading_time", { length: 100 }),
  rating: integer("rating").default(0),
  coverColor: varchar("cover_color", { length: 50 }),
  dateAdded: timestamp("date_added").defaultNow(),
  notes: text("notes"), // Personal notes from the user
  readingStatus: varchar("reading_status", { enum: ["want_to_read", "currently_reading", "completed"] }).default("want_to_read"),
  priority: integer("priority").default(0), // User's reading priority
  pdfUrl: text("pdf_url"), // URL to PDF version if available
  coverUrl: text("cover_url"), // URL to book cover image
});

// GROW Course Progress tracking for sequential flow
export const growCourseProgress = pgTable("grow_course_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  currentWeek: integer("current_week").default(1),
  weeksCompleted: integer("weeks_completed").default(0),
  courseCompleted: boolean("course_completed").default(false),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Mini course types
export type MiniCourse = typeof miniCourses.$inferSelect;
export type InsertMiniCourse = typeof miniCourses.$inferInsert;
export type MiniCourseContent = typeof miniCourseContent.$inferSelect;
export type InsertMiniCourseContent = typeof miniCourseContent.$inferInsert;
export type MiniCourseProgress = typeof miniCourseProgress.$inferSelect;
export type InsertMiniCourseProgress = typeof miniCourseProgress.$inferInsert;
export type GrowCourseProgress = typeof growCourseProgress.$inferSelect;
export type InsertGrowCourseProgress = typeof growCourseProgress.$inferInsert;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type CourseModule = typeof courseModules.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type TextbookProject = typeof textbookProjects.$inferSelect;
export type InsertTextbookProject = z.infer<typeof insertTextbookProjectSchema>;
export type TextbookChapter = typeof textbookChapters.$inferSelect;
export type InsertTextbookChapter = z.infer<typeof insertTextbookChapterSchema>;
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type Assignment = typeof assignments.$inferSelect;
export type AssignmentSubmission = typeof assignmentSubmissions.$inferSelect;
export type ReadingProgress = typeof readingProgress.$inferSelect;
export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;
export type InsertAssignmentSubmission = z.infer<typeof insertAssignmentSubmissionSchema>;
export type Progress = typeof progress.$inferSelect;
export type CourseVideo = typeof courseVideos.$inferSelect;
export type InsertCourseVideo = typeof courseVideos.$inferInsert;
export type CourseReading = typeof courseReadings.$inferSelect;
export type InsertCourseReading = typeof courseReadings.$inferInsert;
export type InstructorPermission = typeof instructorPermissions.$inferSelect;
export type InsertInstructorPermission = typeof instructorPermissions.$inferInsert;
export type InstructorApplication = typeof instructorApplications.$inferSelect;
export type InsertInstructorApplication = typeof instructorApplications.$inferInsert;
export type ContentProgress = typeof contentProgress.$inferSelect;
export type InsertContentProgress = typeof contentProgress.$inferInsert;
export type CourseCompletion = typeof courseCompletions.$inferSelect;
export type InsertCourseCompletion = z.infer<typeof insertCourseCompletionSchema>;
export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;

// Dean-specific tables for permission management
export const instructorApprovals = pgTable('instructor_approvals', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull().references(() => users.id),
  requestedBy: varchar('requested_by').references(() => users.id),
  approvedBy: varchar('approved_by').references(() => users.id),
  status: varchar('status').default('pending').notNull(),
  requestMessage: text('request_message'),
  deanNotes: text('dean_notes'),
  createdAt: timestamp('created_at').defaultNow(),
  approvedAt: timestamp('approved_at'),
});

export const gradeModifications = pgTable('grade_modifications', {
  id: serial('id').primaryKey(),
  studentId: varchar('student_id').notNull().references(() => users.id),
  quizAttemptId: integer('quiz_attempt_id').references(() => quizAttempts.id),
  courseId: integer('course_id').references(() => courses.id),
  modifiedBy: varchar('modified_by').notNull().references(() => users.id),
  oldScore: integer('old_score'),
  newScore: integer('new_score'),
  modificationReason: text('modification_reason'),
  modifiedAt: timestamp('modified_at').defaultNow(),
});

export type InstructorApproval = typeof instructorApprovals.$inferSelect;
export type InsertInstructorApproval = typeof instructorApprovals.$inferInsert;

export type GradeModification = typeof gradeModifications.$inferSelect;
export type InsertGradeModification = typeof gradeModifications.$inferInsert;

export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  type: text('type').notNull().default('info'), // welcome, event, urgent, info
  isActive: boolean('is_active').default(true),
  showUntil: timestamp('show_until'),
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const genesisVideos = pgTable('genesis_videos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  videoUrl: text('video_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  scriptureReference: text('scripture_reference'),
  sessionNumber: integer('session_number'),
  duration: integer('duration'), // in minutes
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
});

export const sundayMessages = pgTable('sunday_messages', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  videoUrl: text('video_url').notNull(),
  thumbnailUrl: text('thumbnail_url'),
  scriptureReference: text('scripture_reference'),
  sermonDate: timestamp('sermon_date').notNull(),
  duration: integer('duration'), // in minutes
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
});

export const genesisQuizzes = pgTable('genesis_quizzes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  sessionNumber: integer('session_number'),
  questions: text('questions').notNull(), // JSON string
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
});

export const genesisGuestRegistrations = pgTable('genesis_guest_registrations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  email: text('email'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const genesisQuizAttempts = pgTable('genesis_quiz_attempts', {
  id: serial('id').primaryKey(),
  quizId: integer('quiz_id').references(() => genesisQuizzes.id).notNull(),
  userId: text('user_id'), // null for guests
  guestRegistrationId: integer('guest_registration_id').references(() => genesisGuestRegistrations.id),
  participantName: text('participant_name').notNull(),
  score: integer('score').notNull(),
  totalQuestions: integer('total_questions').notNull(),
  answers: text('answers').notNull(), // JSON string
  completedAt: timestamp('completed_at').defaultNow().notNull(),
  sessionNumber: integer('session_number'),
});

export const miniCourseEnrollments = pgTable('mini_course_enrollments', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull().references(() => users.id),
  courseId: integer('course_id').notNull(), // 1 for Genesis to Revelation, 2 for Power of Preaching
  enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type MiniCourseEnrollment = typeof miniCourseEnrollments.$inferSelect;
export type InsertMiniCourseEnrollment = typeof miniCourseEnrollments.$inferInsert;

export type GenesisVideo = typeof genesisVideos.$inferSelect;
export type InsertGenesisVideo = typeof genesisVideos.$inferInsert;

export type SundayMessage = typeof sundayMessages.$inferSelect;
export type InsertSundayMessage = typeof sundayMessages.$inferInsert;

export type GenesisQuiz = typeof genesisQuizzes.$inferSelect;
export type InsertGenesisQuiz = typeof genesisQuizzes.$inferInsert;

export type GenesisGuestRegistration = typeof genesisGuestRegistrations.$inferSelect;
export type InsertGenesisGuestRegistration = typeof genesisGuestRegistrations.$inferInsert;

export type GenesisQuizAttempt = typeof genesisQuizAttempts.$inferSelect;
export type InsertGenesisQuizAttempt = typeof genesisQuizAttempts.$inferInsert;

export const insertPersonalLibrarySchema = createInsertSchema(personalLibrary).omit({
  id: true,
  dateAdded: true,
});

export type PersonalLibrary = typeof personalLibrary.$inferSelect;
export type InsertPersonalLibrary = z.infer<typeof insertPersonalLibrarySchema>;

export type Image = typeof images.$inferSelect;
export type InsertImage = typeof images.$inferInsert;

// Streaming Platforms Management
// streamingPlatforms table removed - streaming functionality consolidated

// liveStreams table removed - streaming functionality consolidated

// Images table for storing image metadata and file paths
export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  filePath: varchar("file_path", { length: 500 }).notNull(),
  altText: text("alt_text"),
  category: varchar("category", { length: 100 }),
  description: text("description"),
  fileSize: integer("file_size"),
  width: integer("width"),
  height: integer("height"),
  mimeType: varchar("mime_type", { length: 100 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Essay submissions table for final exam essays
export const essaySubmissions = pgTable("essay_submissions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull(),
  questionId: integer("question_id").notNull(),
  studentId: varchar("student_id", { length: 255 }).notNull(),
  essayText: text("essay_text").notNull(),
  wordCount: integer("word_count").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  status: varchar("status", { length: 50 }).default("submitted").notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewerId: varchar("reviewer_id", { length: 255 }),
  feedback: text("feedback"),
  grade: decimal("grade", { precision: 5, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// StreamingPlatform and LiveStream types removed - streaming functionality consolidated
