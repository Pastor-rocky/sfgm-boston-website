import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

export default function LevelUpLeadershipWeek3() {
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
                Week 3: Production Leadership
              </h2>
              <p className="text-white/80 mt-2">
                Achieving results and demonstrating leadership through productivity
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
                  <strong>Read pages 133-178:</strong> Level 3 - Production Leadership
                </p>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-sm text-purple-700 mb-2">
                    <strong>Key Topics to Focus On:</strong>
                  </p>
                  <ul className="text-sm text-purple-700 space-y-1 ml-4">
                    <li>• Leading by example through results</li>
                    <li>• Building momentum through productivity</li>
                    <li>• Creating a culture of excellence</li>
                    <li>• The connection between performance and influence</li>
                  </ul>
                </div>
              </div>

              {/* Bible Reading */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  📖 Bible Reading Assignment (NLT)
                </h4>
                <p className="text-blue-800 mb-3">
                  Study these passages to understand biblical principles of productive leadership:
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Exodus+17%3A8-16&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Exodus 17:8-16 - Moses Leading in Battle
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Joshua+1%3A1-18&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Joshua 1:1-18 - Joshua's Commission to Lead
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Joshua+6%3A1-27&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Joshua 6:1-27 - The Battle of Jericho
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Psalm+108%3A8&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Psalm 108:8 - God's Victory
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Matthew+6%3A1-34&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Matthew 6:1-34 - Seeking God's Kingdom First
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=John+12%3A23-33&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    John 12:23-33 - Jesus' Mission and Purpose
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=John+15%3A1-9&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    John 15:1-9 - The Vine and Branches
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=John+15%3A16-17&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    John 15:16-17 - Chosen to Bear Fruit
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=Galatians+5%3A16-26&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Galatians 5:16-26 - Walking in the Spirit
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Peter+1%3A22-25&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    1 Peter 1:22-25 - Living Through God's Word
                  </Button>
                  <Button
                    onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+John+3%3A1-10&version=NLT', '_blank')}
                    variant="outline"
                    className="w-full justify-start text-blue-700 border-blue-300 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    1 John 3:1-10 - Children of God
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
                  ✅ Production Leadership Principles
                </h4>
                <ul className="text-green-800 space-y-2">
                  <li>• <strong>Results Matter:</strong> People follow leaders who produce results</li>
                  <li>• <strong>Leading by Example:</strong> Productivity sets the standard for others</li>
                  <li>• <strong>Momentum Building:</strong> Success attracts more success and followers</li>
                  <li>• <strong>Problem Solving:</strong> Productive leaders solve problems and overcome obstacles</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                  💭 Reflection Questions
                </h4>
                <ul className="text-yellow-800 space-y-2">
                  <li>• What results are you currently producing in your area of leadership?</li>
                  <li>• How does your personal productivity influence those around you?</li>
                  <li>• What obstacles do you need to overcome to increase your effectiveness?</li>
                  <li>• How can you create a culture of excellence in your sphere of influence?</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                <h4 className="text-lg font-semibold text-orange-900 mb-2">
                  🚀 Application Challenge
                </h4>
                <p className="text-orange-800">
                  This week, identify one key result or goal you want to achieve in your area of leadership. 
                  Develop a specific plan to accomplish it and lead by example in the process. 
                  Document your progress and share your approach with your team or those you influence.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Card */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-none shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Ready for Week 4?</h3>
              <p className="text-white/90 mb-4">
                Next week we'll explore People Development Leadership - reproducing other leaders
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
