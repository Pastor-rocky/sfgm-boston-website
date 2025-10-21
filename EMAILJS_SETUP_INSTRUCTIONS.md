# 📧 EmailJS Setup Instructions for SFGM Boston

## Current Configuration
- **Service ID**: `service_tbjkat8`
- **Template ID**: `template_7aa3jen`
- **Public Key**: `UPTEDM8MNxgzaRzV3`

## EmailJS Template Variables Required

Your EmailJS template (`template_7aa3jen`) should include these variables:

### Welcome Email Template Variables:
- `{{to_name}}` - Student's full name (e.g., "John Doe")
- `{{to_email}}` - Student's email address
- `{{student_first_name}}` - Student's first name
- `{{student_last_name}}` - Student's last name
- `{{student_username}}` - Student's username for login
- `{{student_password}}` - Student's password for login
- `{{student_position}}` - Student's church position (e.g., "Member")
- `{{school_name}}` - "SFGM Boston Bible School"
- `{{login_url}}` - Login page URL (https://sfgmboston.com/login)
- `{{reply_to}}` - Reply-to email address

### Sample Email Template Content:

```
Subject: Welcome to SFGM Boston Bible School!

Dear {{to_name}},

Welcome to SFGM Boston Bible School! We're excited to have you join our community of learners.

Your Login Information:
- Username: {{student_username}}
- Password: {{student_password}}
- Login URL: {{login_url}}

Your Profile:
- Name: {{student_first_name}} {{student_last_name}}
- Position: {{student_position}}

We look forward to supporting your spiritual growth and ministry development.

Blessings,
SFGM Boston Bible School Team

Reply to: {{reply_to}}
```

## How It Works

1. **User registers** on the website with email consent
2. **System automatically sends** welcome email with login credentials
3. **Admin notification** is sent to Pastor Rocky
4. **Registration succeeds** even if email fails (graceful error handling)

## Testing

To test the email system:
1. Register a new user with email consent enabled
2. Check the server logs for email sending status
3. Verify emails are received

## Troubleshooting

- Check EmailJS dashboard for delivery status
- Verify template variables match exactly
- Ensure service is active in EmailJS
- Check server logs for error messages
