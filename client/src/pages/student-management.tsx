import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { User } from "@/types/user";

export default function StudentManagement() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("email");
  const [selectedAction, setSelectedAction] = useState<'delete' | 'block' | 'unblock' | null>(null);

  const { data: students = [], isLoading: studentsLoading } = useQuery<User[]>({
    queryKey: ['/api/students/grades'],
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
      setMessageDialogOpen(false);
      setSelectedStudent(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: async (studentId: string) => {
      const response = await apiRequest('DELETE', `/api/students/${studentId}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Student Deleted",
        description: "Student has been permanently removed from the system.",
      });
      setDeleteDialogOpen(false);
      setSelectedStudent(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete student. Please try again.",
        variant: "destructive",
      });
    },
  });

  const blockStudentMutation = useMutation({
    mutationFn: async ({ studentId, action }: { studentId: string, action: 'block' | 'unblock' }) => {
      const response = await apiRequest('PATCH', `/api/students/${studentId}/status`, { action });
      return response.json();
    },
    onSuccess: (data, variables) => {
      toast({
        title: variables.action === 'block' ? "Student Blocked" : "Student Unblocked",
        description: variables.action === 'block' 
          ? "Student has been blocked from accessing the system." 
          : "Student can now access the system again.",
      });
      setBlockDialogOpen(false);
      setSelectedStudent(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update student status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
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
      studentId: selectedStudent.id,
      subject,
      message,
      type: messageType,
    });
  };

  const openMessageDialog = (student: any) => {
    setSelectedStudent(student);
    setMessageDialogOpen(true);
  };

  const openDeleteDialog = (student: any) => {
    setSelectedStudent(student);
    setSelectedAction('delete');
    setDeleteDialogOpen(true);
  };

  const openBlockDialog = (student: any, action: 'block' | 'unblock') => {
    setSelectedStudent(student);
    setSelectedAction(action);
    setBlockDialogOpen(true);
  };

  const openProgressDialog = (student: any) => {
    setSelectedStudent(student);
    setProgressDialogOpen(true);
  };

  const handleDeleteStudent = () => {
    if (selectedStudent) {
      deleteStudentMutation.mutate(selectedStudent.id);
    }
  };

  const handleBlockStudent = () => {
    if (selectedStudent && selectedAction) {
      blockStudentMutation.mutate({ 
        studentId: selectedStudent.id, 
        action: selectedAction as 'block' | 'unblock' 
      });
    }
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
            <p className="text-gray-600 mb-6">You need to be logged in to access student management.</p>
            <Link href="/login">
              <Button className="w-full">Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredStudents = students?.filter((student: any) =>
    student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Student Management</h1>
          <p className="text-xl text-gray-300">View grades, progress, and message your students</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-md mx-auto">
          <Input
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder-white/60"
          />
        </div>

        {/* Students Grid */}
        {studentsLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading students...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <i className="fas fa-users text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-600">
                {searchTerm ? "Try adjusting your search terms." : "No students are currently enrolled."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student: any) => (
              <Card key={student.id} className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">
                        {student.firstName} {student.lastName}
                      </CardTitle>
                      <p className="text-gray-300 text-sm">{student.email}</p>
                      {student.phone && (
                        <p className="text-gray-400 text-xs">{student.phone}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        {student.role || 'Student'}
                      </Badge>
                      {student.isBlocked && (
                        <Badge variant="destructive" className="bg-red-600 text-white">
                          <i className="fas fa-ban mr-1"></i>
                          Blocked
                        </Badge>
                      )}
                      {student.lastLogin && (
                        <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                          Active
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="grades" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/10">
                      <TabsTrigger value="grades" className="text-white data-[state=active]:bg-white/20">
                        Grades
                      </TabsTrigger>
                      <TabsTrigger value="courses" className="text-white data-[state=active]:bg-white/20">
                        Courses
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="grades" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Overall GPA:</span>
                        <span className="text-white font-bold text-lg">
                          {student.gpa ? student.gpa.toFixed(2) : 'N/A'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Courses:</span>
                        <span className="text-white font-medium">
                          {student.enrolledCourses?.length || 0}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Completed:</span>
                        <span className="text-green-400 font-medium">
                          {student.completedCourses || 0}
                        </span>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="courses" className="space-y-2">
                      {student.enrolledCourses?.map((course: any) => (
                        <div key={course.id} className="flex justify-between items-center text-sm">
                          <span className="text-white truncate">{course.name}</span>
                          <Badge variant="outline" className="text-xs border-white/30 text-white">
                            {course.grade || 'In Progress'}
                          </Badge>
                        </div>
                      )) || (
                        <p className="text-gray-400 text-sm">No courses enrolled</p>
                      )}
                    </TabsContent>
                  </Tabs>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-4 mt-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => openMessageDialog(student)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <i className="fas fa-envelope mr-2"></i>
                        Message
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openProgressDialog(student)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        <i className="fas fa-chart-line mr-2"></i>
                        Progress
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => openBlockDialog(student, student.isBlocked ? 'unblock' : 'block')}
                        className={`flex-1 ${student.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'}`}
                      >
                        <i className={`fas ${student.isBlocked ? 'fa-unlock' : 'fa-ban'} mr-2`}></i>
                        {student.isBlocked ? 'Unblock' : 'Block'}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openDeleteDialog(student)}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        <i className="fas fa-trash mr-2"></i>
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Message Dialog */}
        <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
          <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                <i className="fas fa-envelope mr-3"></i>
                Message Student
              </DialogTitle>
            </DialogHeader>
            
            {selectedStudent && (
              <div className="space-y-6">
                {/* Student Info */}
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h3 className="text-white font-medium mb-2">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-300">Name:</span>
                      <span className="text-white ml-2">
                        {selectedStudent.firstName} {selectedStudent.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-300">Email:</span>
                      <span className="text-white ml-2">{selectedStudent.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-300">Phone:</span>
                      <span className="text-white ml-2">{selectedStudent.phone || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-gray-300">GPA:</span>
                      <span className="text-white ml-2">
                        {selectedStudent.gpa ? selectedStudent.gpa.toFixed(2) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-4">
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
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setMessageDialogOpen(false)}
                      className="flex-1 border-white/30 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
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
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Student Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="bg-slate-900 border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl text-red-400">
                <i className="fas fa-exclamation-triangle mr-3"></i>
                Delete Student
              </DialogTitle>
            </DialogHeader>
            
            {selectedStudent && (
              <div className="space-y-4">
                <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                  <p className="text-white mb-2">
                    <strong>Warning:</strong> This action cannot be undone.
                  </p>
                  <p className="text-gray-300">
                    You are about to permanently delete <strong>{selectedStudent.firstName} {selectedStudent.lastName}</strong> from the system. 
                    This will remove all their data, grades, and progress.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(false)}
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDeleteStudent}
                    disabled={deleteStudentMutation.isPending}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    {deleteStudentMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-trash mr-2"></i>
                        Delete Student
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Block/Unblock Student Dialog */}
        <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
          <DialogContent className="bg-slate-900 border-white/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                <i className={`fas ${selectedAction === 'block' ? 'fa-ban' : 'fa-unlock'} mr-3`}></i>
                {selectedAction === 'block' ? 'Block' : 'Unblock'} Student
              </DialogTitle>
            </DialogHeader>
            
            {selectedStudent && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${selectedAction === 'block' ? 'bg-yellow-900/20 border-yellow-500/30' : 'bg-green-900/20 border-green-500/30'}`}>
                  <p className="text-white mb-2">
                    {selectedAction === 'block' 
                      ? `Block ${selectedStudent.firstName} ${selectedStudent.lastName}?`
                      : `Unblock ${selectedStudent.firstName} ${selectedStudent.lastName}?`
                    }
                  </p>
                  <p className="text-gray-300">
                    {selectedAction === 'block' 
                      ? 'This student will not be able to access their account or any course materials.'
                      : 'This student will regain access to their account and course materials.'
                    }
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setBlockDialogOpen(false)}
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBlockStudent}
                    disabled={blockStudentMutation.isPending}
                    className={`flex-1 ${selectedAction === 'block' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    {blockStudentMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {selectedAction === 'block' ? 'Blocking...' : 'Unblocking...'}
                      </>
                    ) : (
                      <>
                        <i className={`fas ${selectedAction === 'block' ? 'fa-ban' : 'fa-unlock'} mr-2`}></i>
                        {selectedAction === 'block' ? 'Block Student' : 'Unblock Student'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Progress Dialog */}
        <Dialog open={progressDialogOpen} onOpenChange={setProgressDialogOpen}>
          <DialogContent className="bg-slate-900 border-white/20 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                <i className="fas fa-chart-line mr-3"></i>
                Student Progress Report
              </DialogTitle>
            </DialogHeader>
            
            {selectedStudent && (
              <div className="space-y-6">
                {/* Student Summary */}
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{selectedStudent.gpa?.toFixed(2) || 'N/A'}</div>
                      <div className="text-sm text-gray-400">Overall GPA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{selectedStudent.enrolledCourses?.length || 0}</div>
                      <div className="text-sm text-gray-400">Enrolled Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{selectedStudent.completedCourses || 0}</div>
                      <div className="text-sm text-gray-400">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">
                        {selectedStudent.enrolledCourses?.length ? 
                          Math.round(((selectedStudent.completedCourses || 0) / selectedStudent.enrolledCourses.length) * 100) : 0}%
                      </div>
                      <div className="text-sm text-gray-400">Completion Rate</div>
                    </div>
                  </div>
                </div>

                {/* Course Progress */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Course Progress</h3>
                  {selectedStudent.enrolledCourses?.map((course: any) => (
                    <div key={course.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-white">{course.name}</h4>
                          <p className="text-sm text-gray-400">{course.description}</p>
                        </div>
                        <Badge variant="outline" className="border-white/30 text-white">
                          {course.grade || 'In Progress'}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.progress || 0}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-400">
                        <span>{course.progress || 0}% Complete</span>
                        <span>Last Activity: {course.lastActivity || 'N/A'}</span>
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-400 text-center py-8">No courses enrolled</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setProgressDialogOpen(false)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <Link href="/instructor-dashboard">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}