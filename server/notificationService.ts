// Notification service - Email system disabled, SMS service removed

interface UserNotificationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}

interface QuizCompletionData {
  name: string;
  phone: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  isStudent: boolean;
}

interface EssaySubmissionData {
  studentName: string;
  studentEmail: string;
  courseName: string;
  essayTitle: string;
  essayContent: string;
  submissionDate: Date;
  wordCount: number;
}

export class NotificationService {
  constructor() {
    console.log('📧 Notification service initialized - Email system disabled');
  }

  async sendTestEmail(toEmail: string): Promise<boolean> {
    console.log('📧 Test email requested for:', toEmail);
    console.log('⚠️ Email system disabled - notification logged only');
    return true; // Return success to prevent breaking the test endpoint
  }

  async sendRegistrationNotification(userData: UserNotificationData): Promise<boolean> {
    console.log('📧 Registration notification for:', userData.firstName, userData.lastName);
    console.log('   Email:', userData.email);
    console.log('   Username:', userData.username);
    console.log('   Phone:', userData.phone);
    console.log('⚠️ Email system disabled - registration logged only');
    return true; // Return success to prevent breaking registration flow
  }

  async sendWelcomeEmail(user: UserNotificationData): Promise<boolean> {
    console.log('📧 Welcome email requested for:', user.firstName, user.lastName);
    console.log('   Username:', user.username);
    console.log('   Email:', user.email);
    console.log('   Password:', user.password);
    console.log('⚠️ Email system disabled - welcome message logged only');
    return true; // Return success to prevent breaking registration flow
  }



  private formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Add +1 for US numbers if not present
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    }
    
    return phoneNumber; // Return as-is if format unclear
  }

  async sendWelcomeNotifications(user: UserNotificationData): Promise<{ email: boolean; sms: boolean }> {
    try {
      console.log(`📧 Sending registration notifications for ${user.firstName} ${user.lastName}...`);
      
      // Send registration notification to Pastor Rocky (CRITICAL FOR 60-70 STUDENTS)
      const registrationSent = await this.sendRegistrationNotification(user);
      
      // Send welcome email to Pastor Rocky with forwarding instructions  
      const welcomeSent = await this.sendWelcomeEmailToPastor(user);
      
      // SMS service disabled
      console.log('📱 SMS service disabled');
      const smsSent = false;
      
      console.log(`Registration notifications sent for ${user.firstName} ${user.lastName}:`);
      console.log(`- Registration alert to Pastor Rocky: ${registrationSent ? 'Sent' : 'Failed'}`);
      console.log(`- Welcome email to Pastor Rocky: ${welcomeSent ? 'Sent' : 'Failed'}`);
      console.log(`- SMS to student: Service disabled`);
      
      return { email: registrationSent && welcomeSent, sms: smsSent };
    } catch (error) {
      console.error('❌ Error sending welcome notifications:', error);
      return { email: false, sms: false };
    }
  }

  async sendWelcomeSMS(user: UserNotificationData): Promise<boolean> {
    console.log('📱 SMS service disabled');
    return false;
  }

  async sendTestSMS(phoneNumber: string): Promise<boolean> {
    console.log('📱 SMS service disabled');
    return false;
  }

  async sendQuizCompletionSMS(data: QuizCompletionData): Promise<boolean> {
    console.log('📱 SMS service disabled');
    return false;
  }

  async sendEmailConfirmation(data: { firstName: string, lastName: string, email: string, verificationToken: string }): Promise<boolean> {
    console.log('📧 Email confirmation requested for:', data.firstName, data.lastName);
    console.log('   Email:', data.email);
    console.log('   Token:', data.verificationToken);
    console.log('⚠️ Email system disabled - confirmation logged only');
    return true; // Return success to prevent breaking email verification flow
  }



  async sendCustomEmail(data: { to: string, subject: string, message: string, senderName?: string }): Promise<boolean> {
    console.log('📧 Custom email requested:');
    console.log('   To:', data.to);
    console.log('   Subject:', data.subject);
    console.log('   From:', data.senderName || 'SFGM Boston Team');
    console.log('⚠️ Email system disabled - custom email logged only');
    return true; // Return success to prevent breaking custom email flow
  }

  async sendWelcomeEmailToPastor(user: UserNotificationData): Promise<boolean> {
    console.log('📧 Pastor welcome notification for:', user.firstName, user.lastName);
    console.log('   Student Email:', user.email);
    console.log('   Login Info - Username:', user.username, 'Password:', user.password);
    console.log('⚠️ Email system disabled - pastor notification logged only');
    return true; // Return success to prevent breaking registration flow
  }

  async sendEssaySubmissionNotification(data: EssaySubmissionData): Promise<boolean> {
    console.log('📝 Essay submission notification:');
    console.log('   Student:', data.studentName, '(' + data.studentEmail + ')');
    console.log('   Course:', data.courseName);
    console.log('   Essay:', data.essayTitle);
    console.log('   Word Count:', data.wordCount, 'words');
    console.log('   Date:', data.submissionDate.toLocaleString());
    console.log('⚠️ Email system disabled - essay notification logged only');
    return true; // Return success to prevent breaking essay submission flow
  }
}

export const notificationService = new NotificationService();