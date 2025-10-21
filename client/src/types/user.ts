// User type definition for the application
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  username: string;
  email?: string;
  role: 'student' | 'instructor' | 'admin';
  churchPosition?: string;
  profileImageUrl?: string;
  bio?: string;
  phone?: string;
  isDean?: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Extended user type for authenticated users
export interface AuthenticatedUser extends User {
  // Additional properties that might be present for authenticated users
  redirectUrl?: string;
}


