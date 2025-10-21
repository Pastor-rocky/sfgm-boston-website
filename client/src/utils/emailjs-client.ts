/**
 * Client-side EmailJS integration for automatic welcome emails
 * Used during student registration process
 */

// EmailJS Configuration - Fetched from backend to access secrets
let EMAILJS_CONFIG = {
  SERVICE_ID: 'service_bhhbgpr',
  TEMPLATE_ID: 'template_7aa3jen',
  PUBLIC_KEY: 'UPTEDM8MNxgzaRzV3'
};

// Fetch EmailJS config from backend
const getEmailJSConfig = async () => {
  try {
    const response = await fetch('/api/emailjs/config');
    if (response.ok) {
      const config = await response.json();
      EMAILJS_CONFIG = config;
      console.log('📧 EmailJS config loaded from backend');
    } else {
      console.warn('⚠️ Using fallback EmailJS config');
    }
  } catch (error) {
    console.warn('⚠️ Failed to load EmailJS config from backend, using fallback');
  }
};

// EmailJS types for v4 SDK
declare global {
  interface Window {
    emailjs: {
      send: (serviceId: string, templateId: string, templateParams: any) => Promise<any>;
      init: (options: { publicKey: string }) => void;
    };
  }
}

// Load EmailJS SDK v4 - Updated to latest version
const loadEmailJS = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (window.emailjs) {
      resolve(window.emailjs);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
      console.log('📧 EmailJS v4 SDK loaded');
      window.emailjs.init({
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY
      });
      console.log('📧 EmailJS initialized with public key');
      resolve(window.emailjs);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

interface WelcomeEmailData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  churchPosition?: string;
}

/**
 * Automatically sends welcome email during registration
 * This runs in the browser after successful registration
 */
export async function sendAutomaticWelcomeEmail(studentData: WelcomeEmailData): Promise<boolean> {
  try {
    console.log(`📧 Sending automatic welcome email to ${studentData.firstName} ${studentData.lastName}`);
    
    // Get updated EmailJS config from backend
    await getEmailJSConfig();
    
    // Load EmailJS dynamically
    await loadEmailJS();
    
    // Template parameters for the welcome email
    const templateParams = {
      to_name: `${studentData.firstName} ${studentData.lastName}`,
      to_email: studentData.email,
      student_first_name: studentData.firstName,
      student_last_name: studentData.lastName,
      student_username: studentData.username,
      student_position: studentData.churchPosition || 'Member',
      school_name: 'SFGM Boston Bible School',
      login_url: `${window.location.origin}/login`,
      reply_to: 'pastor_rocky@sfgmboston.com'
    };

    // Send the welcome email
    console.log('📧 Using EmailJS config:', {
      serviceId: EMAILJS_CONFIG.SERVICE_ID,
      templateId: EMAILJS_CONFIG.TEMPLATE_ID,
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY ? '***' + EMAILJS_CONFIG.PUBLIC_KEY.slice(-4) : 'missing'
    });
    
    const response = await window.emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Welcome email sent successfully:', response.text);
    return true;

  } catch (error) {
    console.error('❌ Failed to send automatic welcome email:', error);
    // Don't throw error - registration should still succeed even if email fails
    return false;
  }
}

/**
 * Sends registration notification to Pastor Rocky
 */
export async function sendAutomaticAdminNotification(studentData: WelcomeEmailData): Promise<boolean> {
  try {
    console.log(`📧 Sending admin notification for ${studentData.firstName} ${studentData.lastName}`);
    
    // Get updated EmailJS config from backend
    await getEmailJSConfig();
    
    // Load EmailJS if not already loaded
    await loadEmailJS();
    
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
      admin_dashboard_url: `${window.location.origin}/admin`,
      reply_to: 'noreply@sfgmboston.com'
    };

    // Send admin notification
    const response = await window.emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Admin notification sent successfully:', response.text);
    return true;

  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
    return false;
  }
}