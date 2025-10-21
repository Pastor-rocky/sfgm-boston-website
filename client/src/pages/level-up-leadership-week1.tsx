import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

export default function LevelUpLeadershipWeek1() {
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
                Week 1: Position Leadership
              </h2>
              <p className="text-white/80 mt-2">
                Understanding the foundation of leadership through positional authority
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Required Reading Card */}
        <Card className="bg-white shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-purple-900">Required Reading</h3>
            </div>
            
            <div className="space-y-6">
              {/* Textbook Reading */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-purple-900 mb-2">
                  📖 Five Levels of Leadership Textbook
                </h4>
                <p className="text-purple-800 mb-3">
                  <strong>Read pages 1-81:</strong> Introduction and Level 1 - Position Leadership
                </p>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-sm text-purple-700 mb-2">
                    <strong>Key Topics to Focus On:</strong>
                  </p>
                  <ul className="text-sm text-purple-700 space-y-1 ml-4">
                    <li>• Understanding positional authority</li>
                    <li>• The limitations of title-based leadership</li>
                    <li>• Building credibility and influence</li>
                    <li>• The foundation for all other leadership levels</li>
                  </ul>
                </div>
              </div>

              {/* Bible Reading */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  📖 Bible Reading Assignment (NIV)
                </h4>
                <p className="text-blue-800 mb-3">
                  Study these passages to understand biblical principles of positional leadership:
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Chronicles+9%3A31&version=NIV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    2 Chronicles 9:31 - Solomon's Reign
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Chronicles+10%3A1-19&version=NIV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    2 Chronicles 10:1-19 - Rehoboam's Leadership
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Mark+10%3A35-45&version=NIV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Mark 10:35-45 - True Greatness in Leadership
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=John+13%3A1-17&version=NIV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    John 13:1-17 - Jesus Washes Disciples' Feet
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Philippians+2%3A1-11&version=NIV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Philippians 2:1-11 - Christ's Example of Humility
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Concepts Card */}
        <Card className="bg-white shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">🎯 Key Concepts & Reflection</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-green-900 mb-2">
                  ✅ Position Leadership Principles
                </h4>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Authority vs. Influence:</strong> Position gives you authority, but influence comes from character</li>
                  <li>• <strong>Foundation Building:</strong> Level 1 is the starting point, not the destination</li>
                  <li>• <strong>Responsibility:</strong> With position comes great responsibility to serve others</li>
                  <li>• <strong>Limitations:</strong> Position alone cannot create lasting change or loyalty</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                  💭 Reflection Questions
                </h4>
                <ul className="text-yellow-800 space-y-2">
                  <li>• How do you currently use your position to serve others?</li>
                  <li>• What are the limitations you've experienced with positional authority?</li>
                  <li>• How can you build credibility beyond your title or role?</li>
                  <li>• What biblical examples of positional leadership inspire you most?</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-orange-900 mb-2">
                  🚀 Application Challenge
                </h4>
                <p className="text-orange-800">
                  This week, identify one area where you can use your position to serve others rather than exercise power. 
                  Look for opportunities to lead by example and build trust through your actions, not just your title.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Ready for Week 2?</h3>
              <p className="text-white/90 mb-4">
                Next week we'll explore Permission Leadership - building relationships and trust
              </p>
              <Button
                onClick={() => setLocation("/course/7")}
                className="bg-white text-purple-600 hover:bg-white/90"
              >
                Return to Course Overview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
