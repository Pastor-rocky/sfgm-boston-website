import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, CheckCircle, Target } from "lucide-react";

export default function LevelUpLeadershipWeek6() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={() => setLocation("/course/7")}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </div>

        {/* Course Header */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none shadow-2xl mb-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">
                <span className="text-5xl mr-2">⬆️</span>
                Level Up Leadership
              </h1>
              <h2 className="text-2xl font-semibold text-white/90">
                Week 6: Integration & Application
              </h2>
              <p className="text-white/80 mt-2">
                Combining all five levels and creating your personal leadership development plan
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Integration Overview Card */}
        <Card className="bg-white shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-6 w-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-purple-900">Leadership Integration</h3>
            </div>
            
            <div className="space-y-6">
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-purple-900 mb-2">
                  🔄 The Five Levels Working Together
                </h4>
                <p className="text-purple-800 mb-3">
                  True leadership effectiveness comes from operating at multiple levels simultaneously:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <h5 className="font-semibold text-purple-800 mb-2">Level 1: Position</h5>
                    <p className="text-sm text-purple-700">Foundation - Your starting point and authority base</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <h5 className="font-semibold text-purple-800 mb-2">Level 2: Permission</h5>
                    <p className="text-sm text-purple-700">Relationships - People follow because they want to</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <h5 className="font-semibold text-purple-800 mb-2">Level 3: Production</h5>
                    <p className="text-sm text-purple-700">Results - People follow because of what you've done</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-purple-200">
                    <h5 className="font-semibold text-purple-800 mb-2">Level 4: People Development</h5>
                    <p className="text-sm text-purple-700">Reproduction - People follow because of what you've done for them</p>
                  </div>
                </div>
                <div className="mt-4 bg-white p-3 rounded border border-purple-200">
                  <h5 className="font-semibold text-purple-800 mb-2">Level 5: Pinnacle</h5>
                  <p className="text-sm text-purple-700">Respect - People follow because of who you are and what you represent</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Self-Assessment Card */}
        <Card className="bg-white shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">📊 Personal Leadership Assessment</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-green-900 mb-2">
                  ✅ Self-Evaluation Questions
                </h4>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Level 1:</strong> How well do you use your position to serve others?</li>
                  <li>• <strong>Level 2:</strong> Do people follow you because they want to or because they have to?</li>
                  <li>• <strong>Level 3:</strong> What significant results have you achieved in your area of leadership?</li>
                  <li>• <strong>Level 4:</strong> Who are you currently developing as a leader?</li>
                  <li>• <strong>Level 5:</strong> What kind of reputation and legacy are you building?</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                  🎯 Growth Areas
                </h4>
                <p className="text-yellow-800 mb-3">
                  Identify your strongest and weakest leadership levels:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border border-yellow-200">
                    <h5 className="font-semibold text-yellow-800 mb-2">Your Strongest Level:</h5>
                    <p className="text-sm text-yellow-700">Which level do you operate most effectively in?</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-yellow-200">
                    <h5 className="font-semibold text-yellow-800 mb-2">Your Growth Area:</h5>
                    <p className="text-sm text-yellow-700">Which level needs the most development?</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-orange-900 mb-2">
                  🚀 Development Plan
                </h4>
                <p className="text-orange-800">
                  Create a specific action plan for developing your weakest leadership level. 
                  Include concrete steps, timelines, and accountability measures.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Biblical Integration Card */}
        <Card className="bg-white shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-purple-900">Biblical Leadership Integration</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  📖 Scripture Reflection
                </h4>
                <p className="text-blue-800 mb-3">
                  Consider how Jesus demonstrated all five levels of leadership:
                </p>
                <ul className="text-blue-700 space-y-1 ml-4">
                  <li>• <strong>Position:</strong> Son of God, Messiah (Matthew 16:16)</li>
                  <li>• <strong>Permission:</strong> "Follow me" relationships (Matthew 4:19)</li>
                  <li>• <strong>Production:</strong> Miracles, teaching, transformation (John 21:25)</li>
                  <li>• <strong>People Development:</strong> Training the twelve disciples (Mark 3:14)</li>
                  <li>• <strong>Pinnacle:</strong> "All authority in heaven and earth" (Matthew 28:18)</li>
                </ul>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-purple-900 mb-2">
                  💭 Application Questions
                </h4>
                <ul className="text-purple-800 space-y-2">
                  <li>• How can you serve others in your position rather than using it for personal gain?</li>
                  <li>• What relationships do you need to invest in to build permission-based leadership?</li>
                  <li>• What results can you focus on achieving that will benefit others?</li>
                  <li>• Who is God calling you to develop as a leader?</li>
                  <li>• What kind of legacy do you want to leave for God's kingdom?</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Exam Preparation Card */}
        <Card className="bg-white shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-purple-900">Final Exam Preparation</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-red-900 mb-2">
                  📝 Final Examination Details
                </h4>
                <ul className="text-red-800 space-y-2">
                  <li>• <strong>50 Multiple Choice Questions</strong> (10 questions per leadership level)</li>
                  <li>• <strong>200-word Essay Question</strong> on leadership application</li>
                  <li>• <strong>65% Minimum Passing Score</strong></li>
                  <li>• <strong>1 Hour Time Limit</strong></li>
                  <li>• <strong>Must complete all weekly quizzes first</strong></li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-green-900 mb-2">
                  ✅ Study Guide
                </h4>
                <p className="text-green-800 mb-3">
                  Review these key areas for the final exam:
                </p>
                <ul className="text-green-700 space-y-1 ml-4">
                  <li>• Characteristics and limitations of each leadership level</li>
                  <li>• Biblical examples of leadership at each level</li>
                  <li>• Key principles from John Maxwell's "Five Levels of Leadership"</li>
                  <li>• Practical application of leadership concepts</li>
                  <li>• Integration of all five levels for maximum effectiveness</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Steps Card */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Ready for the Final Exam?</h3>
              <p className="text-white/90 mb-4">
                Complete your preparation and take the comprehensive final examination
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => setLocation("/quiz/level-up-leadership-final-exam")}
                  className="bg-white text-purple-600 hover:bg-white/90 w-full"
                >
                  Take Final Exam
                </Button>
                <Button
                  onClick={() => setLocation("/course/7")}
                  variant="ghost"
                  className="text-white hover:bg-white/20 w-full"
                >
                  Return to Course Overview
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
