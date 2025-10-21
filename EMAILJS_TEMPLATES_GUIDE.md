# 📧 EmailJS Templates Configuration Guide for SFGM Boston

## Overview
You need to create multiple EmailJS templates to support the comprehensive email system. Here are the exact templates you need:

## Template 1: Welcome Email (`template_7aa3jen`)

**Subject:** Welcome to SFGM Boston Bible School - Your Login Information

**Content:**
```
Dear {{to_name}},

Thank you for joining SFGM BOSTON Bible school "study to show yourself approved"

Here is your login information don't lose it:

Username: {{student_username}}
Password: {{student_password}}

Login URL: {{login_url}}

Welcome to our community of learners!

Blessings,
SFGM Boston Bible School Team

Reply to: {{reply_to}}
```

**Template Variables:**
- `{{to_name}}` - Student's full name
- `{{to_email}}` - Student's email address
- `{{student_first_name}}` - Student's first name
- `{{student_last_name}}` - Student's last name
- `{{student_username}}` - Student's username
- `{{student_password}}` - Student's password
- `{{school_name}}` - "SFGM Boston Bible School"
- `{{login_url}}` - Login page URL
- `{{reply_to}}` - Reply-to email address

## Template 2: Event Notifications (Create new template: `template_events`)

**Subject:** SFGM Boston Event: {{event_title}}

**Content:**
```
Dear {{student_first_name}},

We're excited to invite you to an upcoming event at SFGM Boston Bible School!

Event Details:
- Title: {{event_title}}
- Date: {{event_date}}
- Time: {{event_time}}
- Location: {{event_location}}

{{event_description}}

{% if event_url %}For more information, visit: {{event_url}}{% endif %}

We look forward to seeing you there!

Blessings,
SFGM Boston Bible School Team

Reply to: {{reply_to}}
```

**Template Variables:**
- `{{to_name}}` - Student's full name
- `{{to_email}}` - Student's email address
- `{{student_first_name}}` - Student's first name
- `{{student_last_name}}` - Student's last name
- `{{event_title}}` - Event title
- `{{event_date}}` - Event date
- `{{event_time}}` - Event time
- `{{event_location}}` - Event location
- `{{event_description}}` - Event description
- `{{event_url}}` - Event URL (optional)
- `{{school_name}}` - "SFGM Boston Bible School"
- `{{reply_to}}` - Reply-to email address

## Template 3: Essay Submissions (Create new template: `template_essays`)

**Subject:** Essay Submission: {{course_name}} - {{student_first_name}} {{student_last_name}}

**Content:**
```
Dear Pastor Rocky,

A new essay submission has been received for review.

Student Information:
- Name: {{student_first_name}} {{student_last_name}}
- Email: {{student_email}}
- Course: {{course_name}}

Essay Details:
- Question: {{essay_question}}
- Submission Date: {{submission_date}}

Student Response:
{{student_response}}

Please review this essay and provide feedback to the student.

Blessings,
SFGM Boston Bible School System

Reply to: {{reply_to}}
```

**Template Variables:**
- `{{to_name}}` - "Pastor Rocky"
- `{{to_email}}` - "pastor_rocky@sfgmboston.com"
- `{{student_first_name}}` - Student's first name
- `{{student_last_name}}` - Student's last name
- `{{student_email}}` - Student's email address
- `{{course_name}}` - Course name
- `{{essay_question}}` - Essay question
- `{{student_response}}` - Student's essay response
- `{{submission_date}}` - Submission date
- `{{school_name}}` - "SFGM Boston Bible School"
- `{{reply_to}}` - Student's email address

## Template 4: Admin Notifications (Create new template: `template_admin`)

**Subject:** SFGM Boston Admin Notification: {{notification_type}}

**Content:**
```
Dear Pastor Rocky,

You have received a new {{notification_type}} notification.

Student Information:
- Name: {{student_first_name}} {{student_last_name}}
- Email: {{student_email}}

Details:
{{details}}

Additional Information:
{{additional_info}}

Blessings,
SFGM Boston Bible School System

Reply to: {{reply_to}}
```

**Template Variables:**
- `{{to_name}}` - "Pastor Rocky"
- `{{to_email}}` - "pastor_rocky@sfgmboston.com"
- `{{notification_type}}` - Type of notification
- `{{student_first_name}}` - Student's first name
- `{{student_last_name}}` - Student's last name
- `{{student_email}}` - Student's email address
- `{{details}}` - Notification details
- `{{additional_info}}` - Additional information (JSON)
- `{{school_name}}` - "SFGM Boston Bible School"
- `{{reply_to}}` - Student's email address

## How to Create Templates in EmailJS

1. **Log into EmailJS Dashboard**
2. **Go to Email Templates**
3. **Click "Create New Template"**
4. **Copy the content from above for each template**
5. **Set the Template ID to match the configuration**
6. **Test each template with sample data**

## Testing Your Templates

Use the test scripts provided:
- `test-welcome-email.js` - Test welcome emails
- `test-emailjs-setup.js` - Test overall EmailJS setup

## Current Configuration

- **Service ID**: `service_tbjkat8`
- **Public Key**: `UPTEDM8MNxgzaRzV3`
- **Welcome Template**: `template_7aa3jen` (existing)
- **Events Template**: `template_events` (needs to be created)
- **Essays Template**: `template_essays` (needs to be created)
- **Admin Template**: `template_admin` (needs to be created)
