/**
 * SimpleTexting API Integration for SFGM Bible School
 * Provides reliable SMS messaging capabilities for student communications
 */

interface SimpleTextingConfig {
  apiToken: string;
  baseUrl: string;
  accountId?: string;
}

interface SendSMSParams {
  phone: string;
  message: string;
  keyword?: string;
}

interface SMSResponse {
  success: boolean;
  smsId?: string;
  error?: string;
  message?: string;
}

export class SimpleTextingService {
  private config: SimpleTextingConfig;

  constructor() {
    this.config = {
      apiToken: process.env.SIMPLETEXTING_API_TOKEN || '',
      baseUrl: 'https://app2.simpletexting.com/v1',
      accountId: process.env.SIMPLETEXTING_ACCOUNT_ID || ''
    };
  }

  /**
   * Send SMS message to a single recipient
   */
  async sendSMS(params: SendSMSParams): Promise<SMSResponse> {
    try {
      if (!this.config.apiToken) {
        return {
          success: false,
          error: 'SimpleTexting API token not configured'
        };
      }

      // Clean phone number - remove all non-digits and ensure US format
      const cleanPhone = this.formatPhoneNumber(params.phone);
      if (!cleanPhone) {
        return {
          success: false,
          error: 'Invalid phone number format'
        };
      }

      const requestBody = {
        token: this.config.apiToken,
        phone: cleanPhone,
        message: params.message,
        ...(params.keyword && { keyword: params.keyword })
      };

      console.log(`📱 Sending SMS via SimpleTexting to ${cleanPhone}`);
      console.log(`📱 Message preview: ${params.message.substring(0, 50)}...`);

      const response = await fetch(`${this.config.baseUrl}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiToken}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ SimpleTexting API error: ${response.status} - ${errorText}`);
        return {
          success: false,
          error: `API error: ${response.status} - ${errorText}`
        };
      }

      const result = await response.json();
      
      if (result.success) {
        console.log(`✅ SMS sent successfully via SimpleTexting - ID: ${result.id}`);
        return {
          success: true,
          smsId: result.id,
          message: 'SMS sent successfully'
        };
      } else {
        console.error(`❌ SimpleTexting send failed: ${result.error || 'Unknown error'}`);
        return {
          success: false,
          error: result.error || 'Failed to send SMS'
        };
      }

    } catch (error) {
      console.error('❌ SimpleTexting service error:', error);
      return {
        success: false,
        error: `Service error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Send SMS to multiple recipients
   */
  async sendBulkSMS(recipients: Array<{phone: string, name: string}>, message: string): Promise<Array<{phone: string, name: string, success: boolean, smsId?: string, error?: string}>> {
    const results = [];

    for (const recipient of recipients) {
      const result = await this.sendSMS({
        phone: recipient.phone,
        message: message
      });

      results.push({
        phone: recipient.phone,
        name: recipient.name,
        success: result.success,
        smsId: result.smsId,
        error: result.error
      });

      // Add small delay between messages to respect rate limits
      await this.delay(100);
    }

    return results;
  }

  /**
   * Send welcome SMS to new student
   */
  async sendWelcomeSMS(studentData: {
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
  }): Promise<SMSResponse> {
    const message = `Welcome to SFGM Boston Bible School, ${studentData.firstName}! Your account has been created successfully. Username: ${studentData.username}. Login at our website to begin your spiritual journey. Blessings, Pastor Rocky`;

    return await this.sendSMS({
      phone: studentData.phone,
      message: message
    });
  }

  /**
   * Send course reminder SMS
   */
  async sendCourseReminderSMS(studentData: {
    firstName: string;
    phone: string;
    courseName: string;
  }): Promise<SMSResponse> {
    const message = `Hi ${studentData.firstName}, this is a reminder to continue your "${studentData.courseName}" course at SFGM Boston Bible School. Your spiritual growth is important to us! Blessings, Pastor Rocky`;

    return await this.sendSMS({
      phone: studentData.phone,
      message: message
    });
  }

  /**
   * Send custom admin SMS
   */
  async sendAdminSMS(recipientData: {
    name: string;
    phone: string;
  }, content: string): Promise<SMSResponse> {
    const message = `Hi ${recipientData.name}, ${content} - SFGM Boston Bible School`;

    return await this.sendSMS({
      phone: recipientData.phone,
      message: message
    });
  }

  /**
   * Format phone number for SimpleTexting API
   */
  private formatPhoneNumber(phone: string): string | null {
    if (!phone) return null;

    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');

    // Handle US phone numbers
    if (digits.length === 10) {
      return `1${digits}`; // Add country code
    } else if (digits.length === 11 && digits.startsWith('1')) {
      return digits; // Already has country code
    }

    return null; // Invalid format
  }

  /**
   * Add delay between API calls
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check if SMS service is configured
   */
  isConfigured(): boolean {
    return !!this.config.apiToken;
  }

  /**
   * Get service status
   */
  getStatus(): {configured: boolean, baseUrl: string} {
    return {
      configured: this.isConfigured(),
      baseUrl: this.config.baseUrl
    };
  }
}

// Export singleton instance
export const simpleTextingService = new SimpleTextingService();