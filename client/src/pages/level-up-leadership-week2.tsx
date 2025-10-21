import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

export default function LevelUpLeadershipWeek2() {
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
                Week 2: Permission Leadership
              </h2>
              <p className="text-white/80 mt-2">
                Building relationships and earning the right to influence others
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
                  <strong>Read pages 85-129:</strong> Level 2 - Permission Leadership
                </p>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-sm text-purple-700 mb-2">
                    <strong>Key Topics to Focus On:</strong>
                  </p>
                  <ul className="text-sm text-purple-700 space-y-1 ml-4">
                    <li>• Building relationships and trust</li>
                    <li>• People follow because they want to, not because they have to</li>
                    <li>• The power of connection and understanding</li>
                    <li>• Moving from authority to influence</li>
                  </ul>
                </div>
              </div>

              {/* Bible Reading */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  📖 Bible Reading Assignment (NLT)
                </h4>
                <p className="text-blue-800 mb-3">
                  Study these passages to understand biblical principles of relationship-based leadership:
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Samuel+18%3A1-30&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    1 Samuel 18:1-30 - David and Jonathan's Friendship
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Samuel+20%3A1-42&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    1 Samuel 20:1-42 - Covenant Friendship
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Samuel+23%3A15-18&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    1 Samuel 23:15-18 - Mutual Encouragement
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Isaiah+41%3A8-10&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Isaiah 41:8-10 - God's Friendship with Abraham
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=John+15%3A9-17&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    John 15:9-17 - Jesus' Friendship with Disciples
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=James+2%3A21-24&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    James 2:21-24 - Faith and Friendship with God
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=James+4%3A1-7&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    James 4:1-7 - Drawing Near to God
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
                  ✅ Permission Leadership Principles
                </h4>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Relationship First:</strong> People must like you before they will follow you</li>
                  <li>• <strong>Trust Building:</strong> Permission is earned through consistent character and care</li>
                  <li>• <strong>Mutual Respect:</strong> Leadership becomes a two-way street of influence</li>
                  <li>• <strong>Emotional Connection:</strong> People follow leaders they connect with personally</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                  💭 Reflection Questions
                </h4>
                <ul className="text-yellow-800 space-y-2">
                  <li>• What relationships in your life demonstrate the power of permission leadership?</li>
                  <li>• How do you currently build trust and connection with those you lead?</li>
                  <li>• What barriers prevent you from giving permission to others?</li>
                  <li>• How can you show genuine care for those under your influence?</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-orange-900 mb-2">
                  🚀 Application Challenge
                </h4>
                <p className="text-orange-800">
                  This week, intentionally invest in one relationship where you have positional authority. 
                  Focus on understanding their needs, showing genuine care, and building trust through your actions. 
                  Look for opportunities to serve them rather than just directing them.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Ready for Week 3?</h3>
              <p className="text-white/90 mb-4">
                Next week we'll explore Production Leadership - achieving results through influence
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
