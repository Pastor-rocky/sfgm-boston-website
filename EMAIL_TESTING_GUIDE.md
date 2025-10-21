# 📧 Email Testing Guide for SFGM Boston

## 🚨 IMPORTANT: EmailJS Server-Side Limitation

EmailJS does NOT work from server-side code (Node.js). It only works from browser/client-side code. This is a security feature of EmailJS.

## 🧪 How to Test Your Emails

### Option 1: Browser Test Page (RECOMMENDED)
I've created a test page that you can use to test all email types:

1. **Open the test page**: `test-emails-browser.html` (should be open in your browser)
2. **Click the test buttons** to send emails to:
   - `n1kaslov@gmail.com` (welcome email and event notification)
   - `pastor_rocky@sfgm.boston.com` (admin notification and essay submission)

### Option 2: Manual Testing via Registration
1. **Go to**: `http://localhost:56000/register`
2. **Register a new user** with email consent enabled
3. **Check emails** at both addresses

### Option 3: EmailJS Dashboard Testing
1. **Log into EmailJS Dashboard**
2. **Go to Email Templates**
3. **Test each template** with sample data

## 📋 EmailJS Templates You Need to Create

### Template 1: Welcome Email (`template_7aa3jen` - UPDATE EXISTING)
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

### Template 2: Event Notifications (`template_events` - CREATE NEW)
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

For more information, visit: {{event_url}}

We look forward to seeing you there!

Blessings,
SFGM Boston Bible School Team

Reply to: {{reply_to}}
```

### Template 3: Essay Submissions (`template_essays` - CREATE NEW)
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

### Template 4: Admin Notifications (`template_admin` - CREATE NEW)
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

## 🧪 Test Data for Manual Testing

### Welcome Email Test Data:
```json
{
  "to_name": "Test Student",
  "to_email": "n1kaslov@gmail.com",
  "student_first_name": "Test",
  "student_last_name": "Student",
  "student_username": "teststudent123",
  "student_password": "testpass456",
  "school_name": "SFGM Boston Bible School",
  "login_url": "https://sfgmboston.com/login",
  "reply_to": "pastor_rocky@sfgm.boston.com"
}
```

### Essay Submission Test Data:
```json
{
  "to_name": "Pastor Rocky",
  "to_email": "pastor_rocky@sfgm.boston.com",
  "student_first_name": "Test",
  "student_last_name": "Student",
  "student_email": "n1kaslov@gmail.com",
  "course_name": "Acts in Action",
  "essay_question": "What did you learn from studying the book of Acts?",
  "student_response": "This course has been transformative...",
  "submission_date": "2024-01-15 10:30 AM",
  "school_name": "SFGM Boston Bible School",
  "reply_to": "n1kaslov@gmail.com"
}
```

### Event Notification Test Data:
```json
{
  "to_name": "Test Student",
  "to_email": "n1kaslov@gmail.com",
  "student_first_name": "Test",
  "student_last_name": "Student",
  "event_title": "SFGM Boston Bible Study",
  "event_date": "2024-01-15",
  "event_time": "7:00 PM",
  "event_location": "SFGM Boston Campus",
  "event_description": "Join us for Bible study",
  "event_url": "https://sfgmboston.com/events",
  "school_name": "SFGM Boston Bible School",
  "reply_to": "pastor_rocky@sfgm.boston.com"
}
```

## 🔧 Current EmailJS Configuration

- **Service ID**: `service_tbjkat8`
- **Public Key**: `UPTEDM8MNxgzaRzV3`
- **Welcome Template**: `template_7aa3jen` (existing - needs update)
- **Events Template**: `template_events` (needs to be created)
- **Essays Template**: `template_essays` (needs to be created)
- **Admin Template**: `template_admin` (needs to be created)

## 📝 Next Steps

1. **Update/Create EmailJS Templates** using the content above
2. **Test using the browser page** (`test-emails-browser.html`)
3. **Verify emails are received** at both addresses
4. **Test the actual registration flow** to ensure automatic emails work

## 🚨 Important Notes

- **EmailJS only works from browser** - not from server-side code
- **Templates must be created** in EmailJS dashboard before emails will work
- **Test with the browser page first** before testing the full system
- **Check spam folders** if emails don't arrive immediately
