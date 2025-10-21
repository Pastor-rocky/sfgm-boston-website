import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { User } from "@/types/user";

export default function MessageStudent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("email");

  // Get student ID from URL params if provided
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('studentId');
    if (studentId) {
      setSelectedStudent(studentId);
    }
  }, []);

  const { data: students = [], isLoading: studentsLoading } = useQuery<User[]>({
    queryKey: ['/api/students'],
    enabled: isAuthenticated,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: any) => {
      const response = await apiRequest('POST', '/api/messages/send', messageData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully!",
      });
      setSubject("");
      setMessage("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !subject || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    sendMessageMutation.mutate({
      studentId: selectedStudent,
      subject,
      message,
      type: messageType,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">You need to be logged in to send messages.</p>
            <Link href="/login">
              <Button className="w-full">Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedStudentData = students?.find((s: any) => s.id.toString() === selectedStudent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Message Student</h1>
          <p className="text-xl text-gray-300">Send messages to your students via email or SMS</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl text-center">
                <i className="fas fa-envelope mr-3"></i>
                Compose Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Selection */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Select Student *
                  </label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Choose a student..." />
                    </SelectTrigger>
                    <SelectContent>
                      {studentsLoading ? (
                        <SelectItem value="">Loading students...</SelectItem>
                      ) : students?.length === 0 ? (
                        <SelectItem value="">No students found</SelectItem>
                      ) : (
                        students?.map((student: any) => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.firstName} {student.lastName} - {student.email}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Selected Student Info */}
                {selectedStudentData && (
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h3 className="text-white font-medium mb-2">Student Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-300">Name:</span>
                        <span className="text-white ml-2">
                          {selectedStudentData.firstName} {selectedStudentData.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-300">Email:</span>
                        <span className="text-white ml-2">{selectedStudentData.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-300">Phone:</span>
                        <span className="text-white ml-2">{selectedStudentData.phone || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-300">Role:</span>
                        <Badge variant="secondary" className="ml-2 bg-blue-600 text-white">
                          {selectedStudentData.role || 'Student'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message Type */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Message Type
                  </label>
                  <Select value={messageType} onValueChange={setMessageType}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">
                        <i className="fas fa-envelope mr-2"></i>Email
                      </SelectItem>
                      <SelectItem value="sms">
                        <i className="fas fa-sms mr-2"></i>SMS
                      </SelectItem>
                      <SelectItem value="both">
                        <i className="fas fa-paper-plane mr-2"></i>Both Email & SMS
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter message subject..."
                    className="bg-white/10 border-white/20 text-white placeholder-white/60"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 min-h-[120px]"
                    required
                  />
                  <p className="text-gray-400 text-sm mt-1">
                    {message.length} characters
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Link href="/instructor-dashboard">
                    <Button type="button" variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">
                      <i className="fas fa-arrow-left mr-2"></i>
                      Back to Dashboard
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={sendMessageMutation.isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {sendMessageMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}