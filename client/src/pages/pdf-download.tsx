import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaDownload, FaFilePdf, FaArrowLeft, FaBookOpen } from 'react-icons/fa';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

interface PDFInfo {
  courseId: number;
  title: string;
  description: string;
  filename: string;
  size: string;
  pages: number;
}

const pdfCourses: PDFInfo[] = [
  {
    courseId: 0,
    title: "SFGM GROW Conference",
    description: "A comprehensive study of spiritual growth and development",
    filename: "SFGM GROW CONFRENCE.pdf",
    size: "296 KB",
    pages: 16
  },
  {
    courseId: 3,
    title: "Don't Be A Jonah",
    description: "A study on obedience and God's calling",
    filename: "Dont Be A Jonah Book.pdf",
    size: "570 KB",
    pages: 10
  },
  {
    courseId: 2,
    title: "Studying For Service",
    description: "A comprehensive study for Christian service and ministry",
    filename: "Studying For Service.pdf",
    size: "454 KB",
    pages: 20
  },
  {
    courseId: 3,
    title: "Becoming A Fire Starter",
    description: "A comprehensive study on becoming a spiritual fire starter for God",
    filename: "Becoming A Fire Starter.pdf",
    size: "1.3 MB",
    pages: 168
  },
  {
    courseId: 4,
    title: "Acts In Action Course",
    description: "A comprehensive study of the Book of Acts",
    filename: "Acts In Action Course.pdf",
    size: "183 KB",
    pages: 47
  }
];

export default function PDFDownload() {
  const [location, setLocation] = useLocation();
  
  // Get courseId from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const courseIdParam = urlParams.get('courseId');
  const courseId = courseIdParam ? parseInt(courseIdParam) : 0;
  
  const course = pdfCourses.find(c => c.courseId === courseId) || pdfCourses[0];
  
  const handleDownload = () => {
    // Create a download link with proper URL encoding for PDFs
    const encodedFilename = encodeURIComponent(course.filename);
    const link = document.createElement('a');
    link.href = `/pdfs/${encodedFilename}`;
    link.download = course.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleBack = () => {
    setLocation('/courses');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            onClick={handleBack}
            variant="outline"
            className="mb-6 flex items-center gap-2"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Courses
          </Button>
          
          {/* PDF Download Card */}
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <FaFilePdf className="w-12 h-12 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                {course.title}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {course.description}
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Textbook Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">File Size:</span>
                      <p className="text-gray-900 dark:text-white">{course.size}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Chapters:</span>
                      <p className="text-gray-900 dark:text-white">{course.pages}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">Format:</span>
                      <p className="text-gray-900 dark:text-white">PDF</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button
                    onClick={handleDownload}
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium"
                  >
                    <FaDownload className="w-5 h-5 mr-2" />
                    Download PDF
                  </Button>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click the button above to download the complete textbook as a PDF file.
                    You can read it on any device with a PDF viewer.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    📱 Reading Tips
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 text-left">
                    <li>• Use your device's built-in PDF viewer for best experience</li>
                    <li>• Pinch to zoom for better readability on mobile devices</li>
                    <li>• Use bookmarks to save your reading progress</li>
                    <li>• Print specific pages if you prefer physical copies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
