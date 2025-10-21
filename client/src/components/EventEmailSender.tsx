import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

interface EventEmailData {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventDescription: string;
  eventUrl?: string;
}

export default function EventEmailSender() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState<EventEmailData>({
    eventTitle: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    eventDescription: '',
    eventUrl: ''
  });

  // Fetch all students with email consent
  const { data: students = [], isLoading: studentsLoading } = useQuery({
    queryKey: ['/api/admin/users'],
    queryFn: async () => {
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      // Filter students with email consent
      return data.filter((user: any) => user.emailConsent && user.email);
    }
  });

  const handleSendEventEmails = async () => {
    if (!eventData.eventTitle || !eventData.eventDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in event title and date",
        variant: "destructive",
      });
      return;
    }

    if (students.length === 0) {
      toast({
        title: "No Students",
        description: "No students with email consent found",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/email/send-event-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          students: students.map((student: any) => ({
            firstName: student.firstName || 'Student',
            lastName: student.lastName || 'User',
            email: student.email
          })),
          eventData
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Event Emails Sent",
          description: `Successfully sent to ${result.results.sent} students`,
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send event emails",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send event emails",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <i className="fas fa-calendar-alt text-blue-600"></i>
          Send Event Notification Emails
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="eventTitle">Event Title *</Label>
            <Input
              id="eventTitle"
              value={eventData.eventTitle}
              onChange={(e) => setEventData({...eventData, eventTitle: e.target.value})}
              placeholder="e.g., Sunday Service"
            />
          </div>
          <div>
            <Label htmlFor="eventDate">Event Date *</Label>
            <Input
              id="eventDate"
              type="date"
              value={eventData.eventDate}
              onChange={(e) => setEventData({...eventData, eventDate: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="eventTime">Event Time</Label>
            <Input
              id="eventTime"
              value={eventData.eventTime}
              onChange={(e) => setEventData({...eventData, eventTime: e.target.value})}
              placeholder="e.g., 11:00 AM"
            />
          </div>
          <div>
            <Label htmlFor="eventLocation">Event Location</Label>
            <Input
              id="eventLocation"
              value={eventData.eventLocation}
              onChange={(e) => setEventData({...eventData, eventLocation: e.target.value})}
              placeholder="e.g., SFGM Boston Campus"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="eventDescription">Event Description</Label>
          <Textarea
            id="eventDescription"
            value={eventData.eventDescription}
            onChange={(e) => setEventData({...eventData, eventDescription: e.target.value})}
            placeholder="Describe the event details..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="eventUrl">Event URL (Optional)</Label>
          <Input
            id="eventUrl"
            value={eventData.eventUrl}
            onChange={(e) => setEventData({...eventData, eventUrl: e.target.value})}
            placeholder="https://sfgmboston.com/events"
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <i className="fas fa-info-circle mr-2"></i>
            This will send event notifications to <strong>{students.length}</strong> students with email consent.
          </p>
        </div>

        <Button 
          onClick={handleSendEventEmails}
          disabled={isLoading || studentsLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Sending Emails...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane mr-2"></i>
              Send Event Emails ({students.length} students)
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
