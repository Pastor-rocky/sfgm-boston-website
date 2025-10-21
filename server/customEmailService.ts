/**
 * Custom EmailJS Service for Admin Communications
 * Uses template_yqzlyhj for all admin messaging while keeping welcome emails separate
 */

import emailjs from '@emailjs/nodejs';

// EmailJS Configuration for custom admin messages
const CUSTOM_EMAIL_CONFIG = {
  SERVICE_ID: 'service_bsk1yqi',
  CUSTOM_TEMPLATE_ID: 'template_yqzlyhj', // Your custom template for admin messages
  WELCOME_TEMPLATE_ID: 'template_7aa3jen', // Separate welcome template
  PUBLIC_KEY: 'UPTEDM8MNxgzaRzV3'
};

interface CustomEmailData {
  recipientName: string;
  recipientEmail: string;
  subject: string;
  content: string;
  senderName?: string;
}

interface WelcomeEmailData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  churchPosition?: string;
}

/**
 * Sends custom admin messages using template_yqzlyhj
 */
export async function sendCustomAdminEmail(emailData: CustomEmailData): Promise<boolean> {
  try {
    console.log(`📧 Sending custom admin email to ${emailData.recipientName} at ${emailData.recipientEmail}`);

    // Template parameters for custom admin messages
    const templateParams = {
      email: emailData.recipientEmail,              // For "To Email" field
      recipient_name: emailData.recipientName,      // For "Hi {{recipient_name}}"
      message_subject: emailData.subject,           // For subject and content
      message_content: emailData.content            // For message body
    };

    // Send email via EmailJS using custom template
    const response = await emailjs.send(
      CUSTOM_EMAIL_CONFIG.SERVICE_ID,
      CUSTOM_EMAIL_CONFIG.CUSTOM_TEMPLATE_ID,
      templateParams,
      {
        publicKey: CUSTOM_EMAIL_CONFIG.PUBLIC_KEY,
      }
    );

    console.log('✅ Custom admin email sent successfully:', response.text);
    return true;

  } catch (error) {
    console.error('❌ Failed to send custom admin email:', error);
    return false;
  }
}

/**
 * Sends welcome email to new students (keeps using template_7aa3jen)
 */
export async function sendWelcomeEmail(studentData: WelcomeEmailData): Promise<boolean> {
  try {
    console.log(`📧 Sending welcome email to ${studentData.firstName} ${studentData.lastName} at ${studentData.email}`);

    // Template parameters for welcome emails
    const templateParams = {
      to_name: `${studentData.firstName} ${studentData.lastName}`,
      to_email: studentData.email,
      student_first_name: studentData.firstName,
      student_last_name: studentData.lastName,
      student_username: studentData.username,
      student_position: studentData.churchPosition || 'Member',
      school_name: 'SFGM Boston Bible School',
      login_url: 'https://sfgmboston.com/login',
      reply_to: 'pastor_rocky@sfgmboston.com'
    };

    // Send email via EmailJS using welcome template
    const response = await emailjs.send(
      CUSTOM_EMAIL_CONFIG.SERVICE_ID,
      CUSTOM_EMAIL_CONFIG.WELCOME_TEMPLATE_ID,
      templateParams,
      {
        publicKey: CUSTOM_EMAIL_CONFIG.PUBLIC_KEY,
      }
    );

    console.log('✅ Welcome email sent successfully:', response.text);
    return true;

  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    return false;
  }
}

/**
 * Sends registration notification to Pastor Rocky using custom template
 */
export async function sendRegistrationNotificationEmail(studentData: WelcomeEmailData): Promise<boolean> {
  try {
    console.log(`📧 Sending registration notification for ${studentData.firstName} ${studentData.lastName}`);

    const notificationContent = `New student registration:

Name: ${studentData.firstName} ${studentData.lastName}
Email: ${studentData.email}
Username: ${studentData.username}
Position: ${studentData.churchPosition || 'Member'}

The student has been registered and can now access the Bible School platform.

Admin Dashboard: https://sfgmboston.com/admin`;

    // Use custom template for admin notifications
    return await sendCustomAdminEmail({
      recipientName: 'Pastor Rocky',
      recipientEmail: 'pastor_rocky@sfgmboston.com',
      subject: `New Student Registration: ${studentData.firstName} ${studentData.lastName}`,
      content: notificationContent,
      senderName: 'SFGM Bible School System'
    });

  } catch (error) {
    console.error('❌ Failed to send registration notification:', error);
    return false;
  }
}

/**
 * Sends course completion notification using custom template
 */
export async function sendCourseCompletionNotification(studentData: {
  studentName: string;
  studentEmail: string;
  courseName: string;
  adminEmail?: string;
}): Promise<boolean> {
  try {
    const notificationContent = `Course completion notification:

Student: ${studentData.studentName}
Email: ${studentData.studentEmail}
Course: ${studentData.courseName}

The student has successfully completed this course and may need certificate processing.

Admin Dashboard: https://sfgmboston.com/admin`;

    return await sendCustomAdminEmail({
      recipientName: 'Pastor Rocky',
      recipientEmail: studentData.adminEmail || 'pastor_rocky@sfgmboston.com',
      subject: `Course Completion: ${studentData.courseName} - ${studentData.studentName}`,
      content: notificationContent,
      senderName: 'SFGM Bible School System'
    });

  } catch (error) {
    console.error('❌ Failed to send course completion notification:', error);
    return false;
  }
}

/**
 * Sends essay submission notification using custom template
 */
export async function sendEssaySubmissionNotification(essayData: {
  studentName: string;
  studentEmail: string;
  courseName: string;
  essayTitle: string;
  adminEmail?: string;
}): Promise<boolean> {
  try {
    const notificationContent = `New essay submission for review:

Student: ${essayData.studentName}
Email: ${essayData.studentEmail}
Course: ${essayData.courseName}
Essay: ${essayData.essayTitle}

The essay is ready for review and approval in the Dean dashboard.

Review Essays: https://sfgmboston.com/dean/essays`;

    return await sendCustomAdminEmail({
      recipientName: 'Pastor Rocky',
      recipientEmail: essayData.adminEmail || 'pastor_rocky@sfgmboston.com',
      subject: `Essay Submission: ${essayData.essayTitle} - ${essayData.studentName}`,
      content: notificationContent,
      senderName: 'SFGM Bible School System'
    });

  } catch (error) {
    console.error('❌ Failed to send essay submission notification:', error);
    return false;
  }
}

/**
 * Sends general admin notification using custom template
 */
export async function sendAdminNotification(notificationData: {
  adminName: string;
  adminEmail: string;
  subject: string;
  content: string;
  senderName?: string;
}): Promise<boolean> {
  return await sendCustomAdminEmail({
    recipientName: notificationData.adminName,
    recipientEmail: notificationData.adminEmail,
    subject: notificationData.subject,
    content: notificationData.content,
    senderName: notificationData.senderName || 'SFGM Bible School System'
  });
}

export const customEmailService = {
  sendCustomAdminEmail,
  sendWelcomeEmail,
  sendRegistrationNotificationEmail,
  sendCourseCompletionNotification,
  sendEssaySubmissionNotification,
  sendAdminNotification
};