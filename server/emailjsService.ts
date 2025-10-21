/**
 * EmailJS Integration for SFGM Bible School
 * Sends welcome emails to new students upon registration
 */

import emailjs from '@emailjs/nodejs';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_bhhbgpr',
  TEMPLATE_ID: 'template_7aa3jen', 
  PUBLIC_KEY: 'UPTEDM8MNxgzaRzV3'
};

interface WelcomeEmailData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  churchPosition?: string;
}

/**
 * Sends a welcome email to newly registered students
 */
export async function sendWelcomeEmail(studentData: WelcomeEmailData): Promise<boolean> {
  try {
    console.log(`📧 Sending welcome email to ${studentData.firstName} ${studentData.lastName} at ${studentData.email}`);

    // Template parameters for EmailJS
    const templateParams = {
      to_name: `${studentData.firstName} ${studentData.lastName}`,
      to_email: studentData.email,
      student_first_name: studentData.firstName,
      student_last_name: studentData.lastName,
      student_username: studentData.username,
      student_password: studentData.password || '[Password will be provided separately]',
      student_position: studentData.churchPosition || 'Member',
      school_name: 'SFGM Boston Bible School',
      login_url: 'https://sfgmboston.com/login',
      reply_to: 'pastor_rocky@sfgmboston.com'
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      {
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
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
 * Sends registration notification to Pastor Rocky
 */
export async function sendRegistrationNotificationEmail(studentData: WelcomeEmailData): Promise<boolean> {
  try {
    console.log(`📧 Sending registration notification for ${studentData.firstName} ${studentData.lastName}`);

    // Template parameters for admin notification
    const templateParams = {
      to_name: 'Pastor Rocky',
      to_email: 'pastor_rocky@sfgmboston.com',
      student_first_name: studentData.firstName,
      student_last_name: studentData.lastName,
      student_email: studentData.email,
      student_username: studentData.username,
      student_position: studentData.churchPosition || 'Member',
      notification_type: 'New Student Registration',
      admin_dashboard_url: 'https://sfgmboston.com/admin',
      reply_to: 'noreply@sfgmboston.com'
    };

    // Send notification email
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID, // Using same template, can be customized later
      templateParams,
      {
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
      }
    );

    console.log('✅ Registration notification sent successfully:', response.text);
    return true;

  } catch (error) {
    console.error('❌ Failed to send registration notification:', error);
    return false;
  }
}

export const emailjsService = {
  sendWelcomeEmail,
  sendRegistrationNotificationEmail
};