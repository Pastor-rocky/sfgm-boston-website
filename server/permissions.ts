// Role-based permission system for SFGM Bible School

export interface User {
  id: string;
  username?: string;
  email?: string;
  role: 'student' | 'instructor' | 'admin' | 'dean';
  primaryRole?: 'student' | 'instructor' | 'admin' | 'dean';
  roles?: string[];
  isDean?: boolean;
  is_dean?: boolean;
}

// Permission definitions
export const PERMISSIONS = {
  // Student permissions - READ ONLY
  STUDENT: {
    VIEW_COURSES: 'view_courses',
    ENROLL_COURSES: 'enroll_courses', 
    TAKE_QUIZ: 'take_quiz',
    VIEW_PROGRESS: 'view_progress',
    ACCESS_BIBLE_AI: 'access_bible_ai',
    VIEW_DISCUSSION: 'view_discussion',
    POST_DISCUSSION: 'post_discussion',
    VIEW_READINGS: 'view_readings'
  },
  
  // Instructor permissions - CREATE/EDIT CONTENT
  INSTRUCTOR: {
    CREATE_COURSE: 'create_course',
    EDIT_COURSE: 'edit_course',
    DELETE_COURSE: 'delete_course',
    MANAGE_VIDEOS: 'manage_videos',
    MANAGE_READINGS: 'manage_readings',
    MANAGE_QUIZZES: 'manage_quizzes',
    VIEW_STUDENT_PROGRESS: 'view_student_progress',
    GRADE_ASSIGNMENTS: 'grade_assignments',
    PUBLISH_CONTENT: 'publish_content'
  },
  
  // Admin permissions - SYSTEM MANAGEMENT
  ADMIN: {
    MANAGE_USERS: 'manage_users',
    PROMOTE_INSTRUCTOR: 'promote_instructor',
    SYSTEM_TEST: 'system_test',
    MODERATE_CONTENT: 'moderate_content',
    DELETE_ANY_CONTENT: 'delete_any_content'
  },
  
  // Dean permissions - FULL SYSTEM CONTROL (Pastor Rocky only)
  DEAN: {
    DELETE_ANY_CONTENT: 'delete_any_content',
    MODIFY_GRADES: 'modify_grades',
    CHANGE_QUIZ_ANSWERS: 'change_quiz_answers',
    OVERRIDE_PERMISSIONS: 'override_permissions',
    FULL_SYSTEM_ACCESS: 'full_system_access',
    APPROVE_INSTRUCTORS: 'approve_instructors',
    GRANT_DELETE_PERMISSIONS: 'grant_delete_permissions',
    SKELETON_KEY_ACCESS: 'skeleton_key_access'
  }
} as const;

// Role-based permission mapping
const ROLE_PERMISSIONS = {
  student: [
    PERMISSIONS.STUDENT.VIEW_COURSES,
    PERMISSIONS.STUDENT.ENROLL_COURSES,
    PERMISSIONS.STUDENT.TAKE_QUIZ,
    PERMISSIONS.STUDENT.VIEW_PROGRESS,
    PERMISSIONS.STUDENT.ACCESS_BIBLE_AI,
    PERMISSIONS.STUDENT.VIEW_DISCUSSION,
    PERMISSIONS.STUDENT.POST_DISCUSSION,
    PERMISSIONS.STUDENT.VIEW_READINGS
  ],
  instructor: [
    // Instructors get ALL student permissions plus instructor permissions
    ...Object.values(PERMISSIONS.STUDENT),
    ...Object.values(PERMISSIONS.INSTRUCTOR)
  ],
  admin: [
    // Admins get ALL permissions except dean-specific ones
    ...Object.values(PERMISSIONS.STUDENT),
    ...Object.values(PERMISSIONS.INSTRUCTOR), 
    ...Object.values(PERMISSIONS.ADMIN)
  ],
  dean: [
    // Deans get ALL permissions including dean-specific ones
    ...Object.values(PERMISSIONS.STUDENT),
    ...Object.values(PERMISSIONS.INSTRUCTOR),
    ...Object.values(PERMISSIONS.ADMIN),
    ...Object.values(PERMISSIONS.DEAN)
  ]
};

/**
 * Check if user has a specific permission
 */
export function hasPermission(user: User, permission: string): boolean {
  // Dean (Pastor Rocky) has ALL permissions - skeleton key access
  if (isDean(user)) {
    return true; // Dean can do anything
  }
  
  // Get user roles (fallback to primary role if roles array is empty)
  const userRoles = user.roles && user.roles.length > 0 ? user.roles : [user.role];
  
  // Check all user roles for permission
  return userRoles.some(role => 
    ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS]?.includes(permission as any)
  );
}

/**
 * Check if user is the Dean (Pastor Rocky)
 */
export function isDean(user: User): boolean {
  return user.isDean === true || 
         user.is_dean === true ||
         user.username === 'pastorrocky' || 
         user.username === 'pastorrocky-dean' || 
         user.role === 'dean' ||
         user.email === 'thebostonchurchthor@icloud.com' ||
         user.email === 'dean@sfgmboston.com';
}

/**
 * Check if user has any instructor role
 */
export function isInstructor(user: User): boolean {
  const userRoles = user.roles && user.roles.length > 0 ? user.roles : [user.role];
  return userRoles.includes('instructor' as any) || userRoles.includes('admin' as any);
}

/**
 * Check if user has student role
 */
export function isStudent(user: User): boolean {
  const userRoles = user.roles && user.roles.length > 0 ? user.roles : [user.role];
  return userRoles.includes('student' as any);
}

/**
 * Check if user can modify course content
 */
export function canModifyCourse(user: User, courseId?: string): boolean {
  return hasPermission(user, PERMISSIONS.INSTRUCTOR.EDIT_COURSE) || 
         hasPermission(user, PERMISSIONS.ADMIN.DELETE_ANY_CONTENT);
}

/**
 * Check if user can delete content (Dean only)
 */
export function canDeleteContent(user: User): boolean {
  return isDean(user);
}

/**
 * Check if user can modify grades (Dean only)
 */
export function canModifyGrades(user: User): boolean {
  return isDean(user);
}

/**
 * Check if user can approve instructors (Dean only)
 */
export function canApproveInstructors(user: User): boolean {
  return isDean(user);
}

/**
 * Get user's dashboard redirect URL based on role
 */
export function getDashboardUrl(user: User): string {
  // Dean accounts go directly to dean dashboard
  if (isDean(user)) {
    return '/dean';
  }
  
  // Admin accounts go to admin dashboard  
  if (user.role === 'admin' || (user.username && user.username.includes('admin'))) {
    return '/admin';
  }
  
  // Student accounts go to student dashboard
  if (user.role === 'student') {
    return '/dashboard';
  }
  
  // Legacy instructor support
  if (user.role === 'instructor') {
    return '/instructor-home';
  }
  
  // Default fallback redirects to landing page for login
  return '/';
}

/**
 * Add role to user
 */
export function addUserRole(user: User, newRole: 'student' | 'instructor' | 'admin'): User {
  const currentRoles = user.roles || [];
  if (!currentRoles.includes(newRole)) {
    return {
      ...user,
      roles: [...currentRoles, newRole],
      // Update primary role if it's a higher privilege
      primaryRole: newRole === 'admin' ? 'admin' : 
                  newRole === 'instructor' && user.primaryRole === 'student' ? 'instructor' : 
                  user.primaryRole
    };
  }
  return user;
}

/**
 * Remove role from user
 */
export function removeUserRole(user: User, roleToRemove: 'student' | 'instructor' | 'admin'): User {
  const currentRoles = user.roles || [];
  const newRoles = currentRoles.filter(role => role !== roleToRemove);
  
  // If removing primary role, set new primary role
  let newPrimaryRole = user.primaryRole;
  if (user.primaryRole === roleToRemove) {
    newPrimaryRole = newRoles.includes('admin') ? 'admin' :
                    newRoles.includes('instructor') ? 'instructor' : 'student';
  }
  
  return {
    ...user,
    roles: newRoles,
    primaryRole: newPrimaryRole as 'student' | 'instructor' | 'admin'
  };
}

/**
 * Middleware function to check permissions
 */
export function requirePermission(permission: string) {
  return (req: any, res: any, next: any) => {
    const user = req.user || req.instructorUser;
    
    if (!user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    if (!hasPermission(user, permission)) {
      return res.status(403).json({ 
        message: "Insufficient permissions",
        required: permission,
        userRoles: user.roles 
      });
    }
    
    next();
  };
}

export default {
  PERMISSIONS,
  hasPermission,
  isInstructor,
  isStudent,
  canModifyCourse,
  canDeleteContent,
  getDashboardUrl,
  addUserRole,
  removeUserRole,
  requirePermission
};