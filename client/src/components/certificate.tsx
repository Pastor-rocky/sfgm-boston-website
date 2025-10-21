import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import sfgmLogo from '@/assets/sfgm-logo.png';
import sfgmShield from '@/assets/sfgm-shield.png';
import bishopSignature from '@/assets/bishop-signature.png';

interface CertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  instructorName?: string;
}

export default function Certificate({ 
  studentName, 
  courseName, 
  completionDate, 
  instructorName = "Bishop Anthony Lee" 
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (certificateRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Certificate - ${courseName}</title>
              <style>
                body { 
                  margin: 0; 
                  padding: 20px; 
                  font-family: 'Arial', sans-serif;
                  background: white;
                }
                .certificate {
                  width: 800px;
                  height: 600px;
                  margin: 0 auto;
                  padding: 40px;
                  background: #f8f8f8;
                  position: relative;
                  box-shadow: 0 0 20px rgba(0,0,0,0.1);
                }
                .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  margin-bottom: 40px;
                }
                .left-logo {
                  display: flex;
                  align-items: center;
                }

                .ministry-name {
                  display: flex;
                  flex-direction: column;
                }
                .soldiers-text {
                  font-size: 36px;
                  font-weight: bold;
                  color: #000;
                  letter-spacing: 8px;
                  margin: 0;
                }
                .for-god-text {
                  font-size: 12px;
                  color: #c41e3a;
                  font-weight: bold;
                  letter-spacing: 4px;
                  margin: 0;
                  text-align: center;
                }
                .right-seal {
                  width: 80px;
                  height: 80px;
                  border: 4px solid #d4af37;
                  border-radius: 50%;
                  background: #1e5d3e;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #d4af37;
                  font-size: 8px;
                  font-weight: bold;
                  text-align: center;
                  position: relative;
                }
                .seal-cross {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: #d4af37;
                  font-size: 20px;
                }
                .seal-crown {
                  position: absolute;
                  top: 15%;
                  left: 50%;
                  transform: translateX(-50%);
                  color: #d4af37;
                  font-size: 12px;
                }
                .main-content {
                  text-align: center;
                  margin-top: 60px;
                }
                .bible-school-title {
                  font-size: 28px;
                  font-weight: bold;
                  color: #000;
                  letter-spacing: 2px;
                  margin-bottom: 10px;
                }
                .course-subtitle {
                  font-size: 18px;
                  color: #000;
                  margin-bottom: 8px;
                }
                .course-description {
                  font-size: 16px;
                  color: #000;
                  margin-bottom: 40px;
                  font-style: italic;
                }
                .certificate-title {
                  font-size: 48px;
                  color: #000;
                  margin-bottom: 40px;
                  font-family: 'Brush Script MT', cursive;
                  font-style: italic;
                }
                .completion-line {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-bottom: 60px;
                }
                .name-line {
                  border-bottom: 2px solid #000;
                  width: 300px;
                  height: 30px;
                  display: flex;
                  align-items: flex-end;
                  justify-content: center;
                  padding-bottom: 5px;
                  font-size: 18px;
                  font-weight: bold;
                }
                .completion-text {
                  font-size: 16px;
                  color: #000;
                  font-weight: bold;
                  margin-bottom: 80px;
                }
                .instructor-signature {
                  text-align: left;
                  margin-left: 60px;
                  font-size: 24px;
                  font-family: 'Brush Script MT', cursive;
                  font-style: italic;
                  color: #000;
                }
                @media print {
                  body { margin: 0; padding: 0; }
                  .certificate { margin: 0; box-shadow: none; }
                }
              </style>
            </head>
            <body>
              <div class="certificate">
                <div class="header">
                  <div class="left-logo">
                    <div style="width: 90px; height: 90px; margin-right: 20px;">
                      <img src="${sfgmShield}" alt="SFGM Shield" style="width: 100%; height: 100%; object-fit: contain;" />
                    </div>
                    <div class="ministry-name">
                      <div class="soldiers-text">SOLDIERS</div>
                      <div class="for-god-text">FOR GOD MINISTRIES</div>
                    </div>
                  </div>
                  <div style="width: 100px; height: 100px;">
                    <img src="${sfgmLogo}" alt="SFGM Ministry Seal" style="width: 100%; height: 100%; object-fit: contain;" />
                  </div>
                </div>
                
                <div class="main-content">
                  <div class="bible-school-title">SFGM BIBLE SCHOOL</div>
                  <div class="course-subtitle">${courseName}:</div>
                  <div class="course-description">An in depth study of the entire book of Acts of the Apostles</div>
                  
                  <div class="certificate-title">Certificate of Completion</div>
                  
                  <div class="completion-line">
                    <div class="name-line">${studentName}</div>
                  </div>
                  
                  <div class="completion-text">has completed the above assignment and has completed their first semester.</div>
                  
                  <div class="instructor-signature">${instructorName}</div>
                </div>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Certificate Preview */}
      <div 
        ref={certificateRef}
        className="w-full max-w-4xl mx-auto bg-gray-100 shadow-lg relative"
        style={{ aspectRatio: '4/3' }}
      >
        {/* Header with logos */}
        <div className="flex justify-between items-start p-8">
          {/* Left side - SFGM Shield */}
          <div className="flex items-center">
            <div className="w-24 h-24 mr-4">
              <img 
                src={sfgmShield} 
                alt="SFGM Shield" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black tracking-widest">SOLDIERS</h1>
              <p className="text-xs text-red-600 font-bold tracking-wider text-center">FOR GOD MINISTRIES</p>
            </div>
          </div>
          
          {/* Right side - Ministry Seal */}
          <div className="w-28 h-28">
            <img 
              src={sfgmLogo} 
              alt="SFGM Ministry Seal" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center px-8">
          <h2 className="text-3xl font-bold text-black tracking-wide mb-2">SFGM BIBLE SCHOOL</h2>
          <h3 className="text-lg text-black mb-2">{courseName}:</h3>
          <p className="text-base text-black mb-8 italic">An in depth study of the entire book of Acts of the Apostles</p>
          
          {/* Certificate Title */}
          <h1 className="text-4xl text-black mb-8 font-serif italic">
            Certificate of Completion
          </h1>
          
          {/* Student Name Line */}
          <div className="flex justify-center mb-12">
            <div className="border-b-2 border-black w-80 pb-2 text-center">
              <span className="text-lg font-bold text-black">{studentName}</span>
            </div>
          </div>
          
          <p className="text-base text-black font-bold mb-16">
            has completed the above assignment and has completed their first semester.
          </p>
          
          {/* Instructor Signature */}
          <div className="text-left ml-12">
            <p className="text-2xl text-black font-serif italic">
              {instructorName}
            </p>
          </div>
        </div>
      </div>
      
      {/* Download Button */}
      <div className="text-center mt-6">
        <Button onClick={handleDownload} className="bg-green-800 hover:bg-green-700 text-white">
          <i className="fas fa-download mr-2"></i>
          Download & Print Certificate
        </Button>
      </div>
    </div>
  );
}