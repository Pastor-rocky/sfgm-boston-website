/**
 * Comprehensive Email Service for SFGM Boston Bible School
 * Handles: Welcome emails, Event notifications, Essay submissions, Admin notifications
 */

import emailjs from '@emailjs/nodejs';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_bhhbgpr',
  PUBLIC_KEY: 'UPTEDM8MNxgzaRzV3',
  TEMPLATES: {
    WELCOME: 'template_7aa3jen',
    EVENTS: 'template_events', // You'll need to create this template
    ESSAYS: 'template_essays', // You'll need to create this template
    ADMIN_NOTIFICATION: 'template_admin' // You'll need to create this template
  }
};

// Base interfaces
interface BaseEmailData {
  firstName: string;
  lastName: string;
  email: string;
}

interface WelcomeEmailData extends BaseEmailData {
  username: string;
  password: string;
}

interface EventEmailData extends BaseEmailData {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventDescription: string;
  eventUrl?: string;
}

interface EssayEmailData extends BaseEmailData {
  courseName: string;
  essayQuestion: string;
  studentResponse: string;
  submissionDate: string;
}

interface AdminNotificationData extends BaseEmailData {
  notificationType: 'registration' | 'essay_submission' | 'course_completion';
  details: string;
  additionalInfo?: any;
}

/**
 * Sends welcome email to new students
 */
export async function sendWelcomeEmail(studentData: WelcomeEmailData): Promise<boolean> {
  try {
    console.log(`📧 Sending welcome email to ${studentData.firstName} ${studentData.lastName}`);

    const templateParams = {
      to_name: `${studentData.firstName} ${studentData.lastName}`,
      to_email: studentData.email,
      student_first_name: studentData.firstName,
      student_last_name: studentData.lastName,
      student_username: studentData.username,
      student_password: studentData.password,
      school_name: 'SFGM Boston Bible School',
      login_url: 'https://sfgmboston.com/login',
      reply_to: 'pastor_rocky@sfgmboston.com'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.WELCOME,
      templateParams,
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
    );

    console.log('✅ Welcome email sent successfully:', response.text);
    return true;

  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    return false;
  }
}

/**
 * Sends event notification emails to students
 */
export async function sendEventNotification(eventData: EventEmailData): Promise<boolean> {
  try {
    console.log(`📧 Sending event notification to ${eventData.firstName} ${eventData.lastName}`);

    const templateParams = {
      to_name: `${eventData.firstName} ${eventData.lastName}`,
      to_email: eventData.email,
      student_first_name: eventData.firstName,
      student_last_name: eventData.lastName,
      event_title: eventData.eventTitle,
      event_date: eventData.eventDate,
      event_time: eventData.eventTime,
      event_location: eventData.eventLocation,
      event_description: eventData.eventDescription,
      event_url: eventData.eventUrl || 'https://sfgmboston.com/events',
      school_name: 'SFGM Boston Bible School',
      reply_to: 'pastor_rocky@sfgmboston.com'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.EVENTS,
      templateParams,
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
    );

    console.log('✅ Event notification sent successfully:', response.text);
    return true;

  } catch (error) {
    console.error('❌ Failed to send event notification:', error);
    return false;
  }
}

/**
 * Sends essay submission to admin email
 */
export async function sendEssaySubmission(essayData: EssayEmailData): Promise<boolean> {
  try {
    console.log(`📧 Sending essay submission from ${essayData.firstName} ${essayData.lastName}`);

    const templateParams = {
      to_name: 'Pastor Rocky',
      to_email: 'pastor_rocky@sfgmboston.com',
      student_first_name: essayData.firstName,
      student_last_name: essayData.lastName,
      student_email: essayData.email,
      course_name: essayData.courseName,
      essay_question: essayData.essayQuestion,
      student_response: essayData.studentResponse,
      submission_date: essayData.submissionDate,
      school_name: 'SFGM Boston Bible School',
      reply_to: essayData.email
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.ESSAYS,
      templateParams,
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
    );

    console.log('✅ Essay submission sent successfully:', response.text);
    return true;

  } catch (error) {
    console.error('❌ Failed to send essay submission:', error);
    return false;
  }
}

/**
 * Sends admin notifications
 */
export async function sendAdminNotification(notificationData: AdminNotificationData): Promise<boolean> {
  try {
    console.log(`📧 Sending admin notification: ${notificationData.notificationType}`);

    const templateParams = {
      to_name: 'Pastor Rocky',
      to_email: 'pastor_rocky@sfgmboston.com',
      notification_type: notificationData.notificationType,
      student_first_name: notificationData.firstName,
      student_last_name: notificationData.lastName,
      student_email: notificationData.email,
      details: notificationData.details,
      additional_info: JSON.stringify(notificationData.additionalInfo || {}),
      school_name: 'SFGM Boston Bible School',
      reply_to: notificationData.email
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.ADMIN_NOTIFICATION,
      templateParams,
      { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
    );

    console.log('✅ Admin notification sent successfully:', response.text);
    return true;

  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
    return false;
  }
}

/**
 * Bulk email function for events (sends to multiple students)
 */
export async function sendBulkEventNotifications(students: BaseEmailData[], eventData: Omit<EventEmailData, keyof BaseEmailData>): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  console.log(`📧 Sending bulk event notifications to ${students.length} students`);

  for (const student of students) {
    const result = await sendEventNotification({
      ...student,
      ...eventData
    });

    if (result) {
      sent++;
    } else {
      failed++;
    }

    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`📧 Bulk email complete: ${sent} sent, ${failed} failed`);
  return { sent, failed };
}

export default {
  sendWelcomeEmail,
  sendEventNotification,
  sendEssaySubmission,
  sendAdminNotification,
  sendBulkEventNotifications
};
