CREATE TABLE "announcements" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"type" text DEFAULT 'info' NOT NULL,
	"is_active" boolean DEFAULT true,
	"show_until" timestamp,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assignment_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"assignment_id" integer,
	"student_id" varchar,
	"content" text,
	"submitted_at" timestamp DEFAULT now(),
	"grade" numeric(5, 2),
	"feedback" text,
	"graded_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"module_id" integer,
	"title" varchar(255) NOT NULL,
	"description" text,
	"due_date" timestamp,
	"max_points" integer DEFAULT 100,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "auth_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "auth_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "certificates" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" integer NOT NULL,
	"certificate_number" text NOT NULL,
	"issue_date" timestamp DEFAULT now(),
	"student_name" text NOT NULL,
	"course_title" text NOT NULL,
	"completion_date" timestamp NOT NULL,
	"final_grade" numeric(5, 2),
	"instructor_name" text DEFAULT 'Pastor Rocky',
	"certificate_type" text DEFAULT 'Course Completion',
	CONSTRAINT "certificates_certificate_number_unique" UNIQUE("certificate_number")
);
--> statement-breakpoint
CREATE TABLE "content_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" varchar,
	"course_id" integer,
	"content_type" varchar,
	"content_id" integer,
	"completed" boolean DEFAULT false,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "course_completions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" integer NOT NULL,
	"completed_at" timestamp DEFAULT now(),
	"final_grade" numeric(5, 2),
	"certificate_issued" boolean DEFAULT false,
	"certificate_number" text,
	CONSTRAINT "course_completions_user_id_course_id_pk" PRIMARY KEY("user_id","course_id"),
	CONSTRAINT "course_completions_certificate_number_unique" UNIQUE("certificate_number")
);
--> statement-breakpoint
CREATE TABLE "course_instructions_viewed" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"course_id" integer NOT NULL,
	"viewed_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "course_instructions_viewed_user_id_course_id_pk" PRIMARY KEY("user_id","course_id")
);
--> statement-breakpoint
CREATE TABLE "course_modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer,
	"title" varchar(255) NOT NULL,
	"description" text,
	"video_url" varchar,
	"reading_material" text,
	"order_index" integer NOT NULL,
	"week_number" integer,
	"module_type" varchar,
	"is_required" boolean DEFAULT true,
	"external_url" varchar,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "course_readings" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"reading_type" varchar(50) DEFAULT 'textbook',
	"content" text,
	"book_title" varchar(255),
	"book_author" varchar(255),
	"book_cover_url" varchar(500),
	"chapter_number" integer,
	"order_index" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "course_videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id" integer,
	"module_id" integer,
	"title" varchar(255) NOT NULL,
	"description" text,
	"video_url" varchar(500),
	"duration" integer,
	"order_index" integer NOT NULL,
	"is_required" boolean DEFAULT true,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp,
	"is_deleted" boolean DEFAULT false,
	"deleted_at" timestamp,
	"deleted_by" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"duration" integer NOT NULL,
	"instructor_id" varchar,
	"is_active" boolean DEFAULT true,
	"is_updated" boolean DEFAULT false,
	"is_prerequisite" boolean DEFAULT false,
	"prerequisite_order" integer,
	"prerequisite_message" text,
	"category" varchar,
	"difficulty" varchar,
	"points" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" varchar,
	"course_id" integer,
	"enrolled_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	"grade" numeric(3, 2),
	"status" varchar DEFAULT 'active'
);
--> statement-breakpoint
CREATE TABLE "essays" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"student_id" varchar NOT NULL,
	"essay_text" text NOT NULL,
	"word_count" integer NOT NULL,
	"submitted_at" timestamp DEFAULT now(),
	"instructor_feedback" text,
	"instructor_score" integer,
	"graded_at" timestamp,
	"graded_by" varchar
);
--> statement-breakpoint
CREATE TABLE "genesis_guest_registrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone_number" text NOT NULL,
	"email" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genesis_quiz_attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer NOT NULL,
	"user_id" text,
	"guest_registration_id" integer,
	"participant_name" text NOT NULL,
	"score" integer NOT NULL,
	"total_questions" integer NOT NULL,
	"answers" text NOT NULL,
	"completed_at" timestamp DEFAULT now() NOT NULL,
	"session_number" integer
);
--> statement-breakpoint
CREATE TABLE "genesis_quizzes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"session_number" integer,
	"questions" text NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "genesis_videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"video_url" text NOT NULL,
	"thumbnail_url" text,
	"scripture_reference" text,
	"session_number" integer,
	"duration" integer,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "grade_modifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" varchar NOT NULL,
	"quiz_attempt_id" integer,
	"course_id" integer,
	"modified_by" varchar NOT NULL,
	"old_score" integer,
	"new_score" integer,
	"modification_reason" text,
	"modified_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "grow_course_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"current_week" integer DEFAULT 1,
	"weeks_completed" integer DEFAULT 0,
	"course_completed" boolean DEFAULT false,
	"last_accessed_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "grow_course_progress_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "instructor_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"applicant_id" varchar NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"qualifications" text NOT NULL,
	"experience" text NOT NULL,
	"ministry" text NOT NULL,
	"motivation" text NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"applied_at" timestamp DEFAULT now() NOT NULL,
	"reviewed_at" timestamp,
	"reviewed_by" varchar,
	"admin_notes" text
);
--> statement-breakpoint
CREATE TABLE "instructor_approvals" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"requested_by" varchar,
	"approved_by" varchar,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"request_message" text,
	"dean_notes" text,
	"created_at" timestamp DEFAULT now(),
	"approved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "instructor_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"instructor_id" varchar,
	"course_id" integer,
	"granted_by_id" varchar,
	"permissions" text[],
	"granted_at" timestamp DEFAULT now(),
	"revoked_at" timestamp,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "mini_course_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"mini_course_id" integer,
	"title" varchar(255) NOT NULL,
	"description" text,
	"content" text,
	"content_type" varchar(50) DEFAULT 'reading',
	"video_url" varchar(500),
	"audio_url" varchar(500),
	"external_url" varchar(500),
	"bible_references" text,
	"order_index" integer DEFAULT 0,
	"estimated_time" integer,
	"is_published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "mini_course_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" varchar,
	"mini_course_id" integer,
	"content_id" integer,
	"completed" boolean DEFAULT false,
	"completed_at" timestamp,
	"time_spent" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "mini_courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"category" varchar(100) DEFAULT 'Bible Study',
	"cover_image_url" varchar(500),
	"difficulty" varchar(20) DEFAULT 'Beginner',
	"estimated_duration" varchar(50),
	"is_active" boolean DEFAULT true,
	"order_index" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "personal_library" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"book_title" varchar(255) NOT NULL,
	"book_author" varchar(255) NOT NULL,
	"category" varchar(100) NOT NULL,
	"description" text,
	"difficulty" varchar(20) NOT NULL,
	"estimated_reading_time" varchar(100),
	"rating" integer DEFAULT 0,
	"cover_color" varchar(50),
	"date_added" timestamp DEFAULT now(),
	"notes" text,
	"reading_status" varchar DEFAULT 'want_to_read',
	"priority" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" varchar,
	"module_id" integer,
	"completed" boolean DEFAULT false,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "quiz_attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" varchar,
	"quiz_id" integer,
	"answers" jsonb NOT NULL,
	"score" numeric(5, 2),
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	"time_spent" integer,
	"essay" text,
	"essay_graded" boolean DEFAULT false,
	"instructor_feedback" text,
	"final_grade" numeric(5, 2)
);
--> statement-breakpoint
CREATE TABLE "quiz_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer,
	"question" text NOT NULL,
	"type" varchar NOT NULL,
	"options" jsonb,
	"correct_answer" text NOT NULL,
	"points" integer DEFAULT 1,
	"order_index" integer NOT NULL,
	"is_bonus" boolean DEFAULT false,
	"parent_question_id" integer
);
--> statement-breakpoint
CREATE TABLE "quiz_retake_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" varchar,
	"quiz_id" integer,
	"instructor_id" varchar,
	"reason" text NOT NULL,
	"requested_at" timestamp DEFAULT now(),
	"approved_at" timestamp,
	"is_approved" boolean DEFAULT false,
	"instructor_notes" text,
	"attempts_allowed" integer DEFAULT 1,
	"attempts_used" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "quizzes" (
	"id" serial PRIMARY KEY NOT NULL,
	"module_id" integer,
	"title" varchar(255) NOT NULL,
	"time_limit" integer,
	"passing_score" integer DEFAULT 60,
	"is_final_exam" boolean DEFAULT false,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reading_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"course_id" integer NOT NULL,
	"chapter_index" integer DEFAULT 0 NOT NULL,
	"page_index" integer DEFAULT 0 NOT NULL,
	"total_pages" integer,
	"completion_percentage" numeric(5, 2) DEFAULT '0.00',
	"last_read_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "reading_progress_user_id_course_id_pk" PRIMARY KEY("user_id","course_id")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sunday_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"video_url" text NOT NULL,
	"thumbnail_url" text,
	"scripture_reference" text,
	"sermon_date" timestamp NOT NULL,
	"duration" integer,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "textbook_chapter_tests" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_id" integer NOT NULL,
	"questions" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "textbook_chapters" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"chapter_number" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text,
	"is_introduction" boolean DEFAULT false,
	"is_conclusion" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "textbook_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"topic" varchar(255) NOT NULL,
	"description" text,
	"chapters" integer NOT NULL,
	"include_tests" boolean DEFAULT true,
	"include_introduction" boolean DEFAULT true,
	"include_conclusion" boolean DEFAULT true,
	"target_audience" varchar(255) NOT NULL,
	"difficulty" varchar NOT NULL,
	"status" varchar DEFAULT 'draft',
	"progress" integer DEFAULT 0,
	"created_by" varchar NOT NULL,
	"generated_content" jsonb,
	"cover_image_url" varchar(500),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"role" varchar NOT NULL,
	"granted_by" varchar,
	"granted_at" timestamp DEFAULT now(),
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "user_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar,
	"username" varchar,
	"password" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"nickname" varchar,
	"bio" text,
	"favorite_scripture" text,
	"phone" varchar,
	"profile_image_url" varchar,
	"role" varchar DEFAULT 'student' NOT NULL,
	"primary_role" varchar DEFAULT 'student' NOT NULL,
	"roles" text[] DEFAULT '{"student"}' NOT NULL,
	"church_position" varchar DEFAULT 'member',
	"profile_completed" boolean DEFAULT false,
	"moderation_warnings" integer DEFAULT 0,
	"is_dean" boolean DEFAULT false NOT NULL,
	"is_blocked" boolean DEFAULT false,
	"instructor_permissions" text[],
	"email_verified" boolean DEFAULT false,
	"email_verification_token" varchar,
	"registration_method" varchar DEFAULT 'email',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "assignment_submissions" ADD CONSTRAINT "assignment_submissions_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment_submissions" ADD CONSTRAINT "assignment_submissions_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_module_id_course_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_progress" ADD CONSTRAINT "content_progress_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_progress" ADD CONSTRAINT "content_progress_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_completions" ADD CONSTRAINT "course_completions_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_instructions_viewed" ADD CONSTRAINT "course_instructions_viewed_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_instructions_viewed" ADD CONSTRAINT "course_instructions_viewed_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_modules" ADD CONSTRAINT "course_modules_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_readings" ADD CONSTRAINT "course_readings_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_videos" ADD CONSTRAINT "course_videos_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_videos" ADD CONSTRAINT "course_videos_module_id_course_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_videos" ADD CONSTRAINT "course_videos_deleted_by_users_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_users_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "essays" ADD CONSTRAINT "essays_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "essays" ADD CONSTRAINT "essays_question_id_quiz_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "essays" ADD CONSTRAINT "essays_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "essays" ADD CONSTRAINT "essays_graded_by_users_id_fk" FOREIGN KEY ("graded_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genesis_quiz_attempts" ADD CONSTRAINT "genesis_quiz_attempts_quiz_id_genesis_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."genesis_quizzes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "genesis_quiz_attempts" ADD CONSTRAINT "genesis_quiz_attempts_guest_registration_id_genesis_guest_registrations_id_fk" FOREIGN KEY ("guest_registration_id") REFERENCES "public"."genesis_guest_registrations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade_modifications" ADD CONSTRAINT "grade_modifications_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade_modifications" ADD CONSTRAINT "grade_modifications_quiz_attempt_id_quiz_attempts_id_fk" FOREIGN KEY ("quiz_attempt_id") REFERENCES "public"."quiz_attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade_modifications" ADD CONSTRAINT "grade_modifications_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade_modifications" ADD CONSTRAINT "grade_modifications_modified_by_users_id_fk" FOREIGN KEY ("modified_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grow_course_progress" ADD CONSTRAINT "grow_course_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instructor_applications" ADD CONSTRAINT "instructor_applications_applicant_id_users_id_fk" FOREIGN KEY ("applicant_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instructor_applications" ADD CONSTRAINT "instructor_applications_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instructor_approvals" ADD CONSTRAINT "instructor_approvals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instructor_approvals" ADD CONSTRAINT "instructor_approvals_requested_by_users_id_fk" FOREIGN KEY ("requested_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instructor_approvals" ADD CONSTRAINT "instructor_approvals_approved_by_users_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instructor_permissions" ADD CONSTRAINT "instructor_permissions_instructor_id_users_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instructor_permissions" ADD CONSTRAINT "instructor_permissions_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instructor_permissions" ADD CONSTRAINT "instructor_permissions_granted_by_id_users_id_fk" FOREIGN KEY ("granted_by_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mini_course_content" ADD CONSTRAINT "mini_course_content_mini_course_id_mini_courses_id_fk" FOREIGN KEY ("mini_course_id") REFERENCES "public"."mini_courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mini_course_progress" ADD CONSTRAINT "mini_course_progress_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mini_course_progress" ADD CONSTRAINT "mini_course_progress_mini_course_id_mini_courses_id_fk" FOREIGN KEY ("mini_course_id") REFERENCES "public"."mini_courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mini_course_progress" ADD CONSTRAINT "mini_course_progress_content_id_mini_course_content_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."mini_course_content"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_library" ADD CONSTRAINT "personal_library_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_module_id_course_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_retake_permissions" ADD CONSTRAINT "quiz_retake_permissions_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_retake_permissions" ADD CONSTRAINT "quiz_retake_permissions_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_retake_permissions" ADD CONSTRAINT "quiz_retake_permissions_instructor_id_users_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_module_id_course_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."course_modules"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_progress" ADD CONSTRAINT "reading_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_progress" ADD CONSTRAINT "reading_progress_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "textbook_chapter_tests" ADD CONSTRAINT "textbook_chapter_tests_chapter_id_textbook_chapters_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."textbook_chapters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "textbook_chapters" ADD CONSTRAINT "textbook_chapters_project_id_textbook_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."textbook_projects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "textbook_projects" ADD CONSTRAINT "textbook_projects_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_granted_by_users_id_fk" FOREIGN KEY ("granted_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "IDX_session_expire" ON "sessions" USING btree ("expire");