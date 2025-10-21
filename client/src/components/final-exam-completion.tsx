import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, BookOpen, PenTool } from 'lucide-react';
import { EssaySubmission } from './essay-submission';

interface FinalExamCompletionProps {
  courseName: string;
  courseId: number;
  quizId: number;
  studentId: string;
  mcScore: number;
  totalMcQuestions: number;
  essayQuestion: {
    id: number;
    question: string;
  };
  onEssaySubmissionComplete: () => void;
}

export function FinalExamCompletion({ 
  courseName, 
  courseId,
  quizId, 
  studentId, 
  mcScore, 
  totalMcQuestions, 
  essayQuestion,
  onEssaySubmissionComplete 
}: FinalExamCompletionProps) {
  const [showEssay, setShowEssay] = useState(false);
  
  const percentage = Math.round((mcScore / totalMcQuestions) * 100);

  // Course-specific congratulatory messages
  const getCourseMessage = (courseName: string) => {
    switch (courseName.toLowerCase()) {
      case "don't be a jonah":
        return {
          congratsMessage: "You've completed the transformational journey through Jonah's story! Your study of obedience, God's mercy, and being His messenger will guide you for life.",
          essayPrompt: "Now tell us what this course did for you and what you got out of studying God's call to be faithful messengers rather than running to our own 'Tarshish.'"
        };
      case "deacon course":
        return {
          congratsMessage: "You've completed your preparation for servant leadership in the local church! Your study of the deacon's calling, biblical qualifications, and practical ministry will equip you to serve faithfully.",
          essayPrompt: "Now tell us what this course did for you and what you got out of studying the biblical foundation and practical application of deacon ministry."
        };
      case "studying for service":
        return {
          congratsMessage: "Congratulations on completing your comprehensive ministry training! You now have the tools to know your text, preach with power, and serve God's people effectively.",
          essayPrompt: "Now tell us what this course did for you and what you got out of learning to be a faithful minister of God's Word."
        };
      case "becoming a fire starter":
        return {
          congratsMessage: "You've completed the journey to get on fire, stay on fire, and spread the fire! May God's holy fire continue to burn brightly in your life and ministry.",
          essayPrompt: "Now tell us what this course did for you and what you got out of learning to be ignited by God's fire and spread it to others."
        };
      case "act in action":
      case "acts in action course":
        return {
          congratsMessage: "You've completed your journey through the book of Acts! You've witnessed the Holy Spirit's power, the early church's growth, and the Gospel's spread.",
          essayPrompt: "Now tell us what this course did for you and what you got out of studying the Holy Spirit's work through the early church."
        };
      default:
        return {
          congratsMessage: "Congratulations on completing this comprehensive Bible school course! Your dedication to studying God's Word will bear fruit in your spiritual journey.",
          essayPrompt: "Now tell us what this course did for you and what you got out of this transformational study."
        };
    }
  };

  const { congratsMessage, essayPrompt } = getCourseMessage(courseName);

  if (showEssay) {
    return (
      <EssaySubmission
        quizId={quizId}
        essayQuestion={essayQuestion}
        studentId={studentId}
        onSubmissionComplete={onEssaySubmissionComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-2 border-green-200 dark:border-green-800">
          <CardHeader className="text-center border-b bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">🎉 Congratulations! 🎉</CardTitle>
            <p className="text-green-100 text-lg">You've completed the multiple choice portion of your final exam</p>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* Course Completion Message */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                "{courseName}" Final Exam
              </h2>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <p className="text-lg text-green-800 dark:text-green-200 leading-relaxed">
                  {congratsMessage}
                </p>
              </div>
            </div>

            {/* Score Display */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Your Multiple Choice Score
                </h3>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {mcScore} / {totalMcQuestions}
                </div>
                <div className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                  {percentage}%
                </div>
              </div>
            </div>

            {/* Essay Transition */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200">
                    One More Step: Your Personal Reflection
                  </h3>
                  <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                    {essayPrompt}
                  </p>
                  <div className="bg-amber-100 dark:bg-amber-800/30 rounded-md p-4 text-sm text-amber-700 dark:text-amber-300">
                    <strong>Essay Requirements:</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• Minimum 100 words</li>
                      <li>• Reflect on your personal spiritual growth</li>
                      <li>• Share what specific insights impacted you most</li>
                      <li>• Explain how you'll apply these lessons</li>
                      <li>• Speech-to-text available for dictation</li>
                      <li>• Essay will be sent to pastor_rocky@sfgmboston.com for review</li>
                      <li>• You will receive your course completion certificate via email after review</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={() => setShowEssay(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-3 text-lg font-semibold shadow-lg"
              >
                <PenTool className="w-5 h-5 mr-3" />
                Continue to Essay
              </Button>
            </div>

            {/* Encouragement Footer */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t pt-4">
              <p>Your dedication to studying God's Word is commendable. Complete your essay to finish the final exam!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}