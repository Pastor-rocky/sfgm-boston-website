import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

export default function LevelUpLeadershipWeek4() {
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
                Week 4: People Development Leadership
              </h2>
              <p className="text-white/80 mt-2">
                Multiplying your influence by developing and reproducing other leaders
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
                  <strong>Read pages 181-228:</strong> Level 4 - People Development Leadership
                </p>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-sm text-purple-700 mb-2">
                    <strong>Key Topics to Focus On:</strong>
                  </p>
                  <ul className="text-sm text-purple-700 space-y-1 ml-4">
                    <li>• Investing in others to reproduce leadership</li>
                    <li>• The multiplication effect of developing leaders</li>
                    <li>• Creating a leadership culture</li>
                    <li>• Building lasting legacy through people</li>
                  </ul>
                </div>
              </div>

              {/* Bible Reading */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  📖 Bible Reading Assignment (NKJV)
                </h4>
                <p className="text-blue-800 mb-3">
                  Study these passages to understand biblical principles of developing people:
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Genesis+1%3A26-28&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Genesis 1:26-28 - God's Image and Dominion
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Deuteronomy+6%3A6-25&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Deuteronomy 6:6-25 - Teaching the Next Generation
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Judges+2%3A7-19&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Judges 2:7-19 - Generational Leadership Transition
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Matthew+28%3A18-20&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Matthew 28:18-20 - The Great Commission
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Luke+5%3A8-11&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Luke 5:8-11 - Calling the Disciples
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Peter+5%3A12-14&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    1 Peter 5:12-14 - Developing Fellow Workers
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Acts+2%3A1-6&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Acts 2:1-6 - The Day of Pentecost
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Acts+4%3A13-22&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Acts 4:13-22 - Boldness Through Training
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Acts+9%3A1-22&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Acts 9:1-22 - Saul's Transformation
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Acts+11%3A19-26&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Acts 11:19-26 - Barnabas Mentoring Saul
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Timothy+2%3A1-2&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    2 Timothy 2:1-2 - Multiplying Teachers
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Timothy+3%3A1-7&version=NKJV', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    2 Timothy 3:1-7 - Characteristics of the Last Days
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
                  ✅ People Development Principles
                </h4>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Investment in Others:</strong> Great leaders invest in developing other leaders</li>
                  <li>• <strong>Multiplication Effect:</strong> Your influence multiplies through those you develop</li>
                  <li>• <strong>Legacy Building:</strong> True leadership creates lasting impact through people</li>
                  <li>• <strong>Empowerment:</strong> Developing others requires giving away power and responsibility</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                  💭 Reflection Questions
                </h4>
                <ul className="text-yellow-800 space-y-2">
                  <li>• Who are you currently investing in to develop their leadership potential?</li>
                  <li>• What systems do you have in place to reproduce leadership in others?</li>
                  <li>• How are you creating a culture that values people development?</li>
                  <li>• What legacy do you want to leave through the people you develop?</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-orange-900 mb-2">
                  🚀 Application Challenge
                </h4>
                <p className="text-orange-800">
                  This week, identify one person in your sphere of influence who has leadership potential. 
                  Create a specific development plan for them, including mentoring sessions, 
                  opportunities for growth, and ways to give them increasing responsibility. 
                  Commit to investing at least 2 hours this week in their development.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Ready for Week 5?</h3>
              <p className="text-white/90 mb-4">
                Next week we'll explore Pinnacle Leadership - the highest level of influence
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
