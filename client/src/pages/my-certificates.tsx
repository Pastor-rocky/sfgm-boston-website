import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Certificate from '@/components/certificate';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface CertificateData {
  id: number;
  userId: string;
  courseId: number;
  certificateNumber: string;
  issueDate: string;
  studentName: string;
  courseTitle: string;
  completionDate: string;
  finalGrade?: string;
  instructorName: string;
  certificateType: string;
}

export default function MyCertificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const { data: certificates = [], isLoading } = useQuery<CertificateData[]>({
    queryKey: ['/api/certificates'],
  });

  const handleViewCertificate = (cert: CertificateData) => {
    setSelectedCertificate(cert);
    setShowCertificate(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
          <p>Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <i className="fas fa-certificate text-gold-500"></i>
            My Certificates
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and download your earned certificates
          </p>
        </div>

        {certificates.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <i className="fas fa-graduation-cap text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Certificates Yet</h3>
              <p className="text-gray-500">
                Complete your courses to earn certificates
              </p>
              <Button 
                onClick={() => window.location.href = '/bible-school'}
                className="mt-4"
              >
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{cert.courseTitle}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Certificate #{cert.certificateNumber}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <i className="fas fa-check-circle mr-1"></i>
                      Earned
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Completion Date</p>
                      <p className="font-medium">
                        {new Date(cert.completionDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    {cert.finalGrade && (
                      <div>
                        <p className="text-sm text-gray-500">Final Grade</p>
                        <p className="font-medium">{cert.finalGrade}%</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Issued By</p>
                      <p className="font-medium">{cert.instructorName}</p>
                    </div>
                    <Button 
                      onClick={() => handleViewCertificate(cert)}
                      className="w-full mt-4"
                    >
                      <i className="fas fa-eye mr-2"></i>
                      View Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Dialog */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-4xl p-0">
          {selectedCertificate && (
            <Certificate
              studentName={selectedCertificate.studentName}
              courseName={selectedCertificate.courseTitle}
              completionDate={new Date(selectedCertificate.completionDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              instructorName={selectedCertificate.instructorName}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}