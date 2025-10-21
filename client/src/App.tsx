import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "@/pages/landing";
import BibleSchool from "@/pages/bible-school";
import BibleUniversity from "@/pages/bible-university";
import SFGMOrlando from "@/pages/sfgm-orlando";
import StatementOfFaith from "@/pages/statement-of-faith";
import Music from "@/pages/music";
import Contact from "@/pages/contact";
import StudentDashboard from "@/pages/student-dashboard";
import StudentProfile from "@/pages/student-profile";
import StudentProgress from "@/pages/student-progress";

import DiscussionForum from "@/pages/discussion-forum";
import ActsAudioPlayer from "@/pages/acts-audio-player";
import ActsAudioPlayerCh1 from "@/pages/acts-audio-player-ch1";
import ActsAudioPlayerCh2 from "@/pages/acts-audio-player-ch2";
import ActsAudioPlayerCh3 from "@/pages/acts-audio-player-ch3";
import ActsAudioPlayerCh4 from "@/pages/acts-audio-player-ch4";
import ActsAudioPlayerCh5 from "@/pages/acts-audio-player-ch5";
import ActsAudioPlayerCh6 from "@/pages/acts-audio-player-ch6";
import ActsAudioPlayerCh7 from "@/pages/acts-audio-player-ch7";
import ActsAudioPlayerCh8 from "@/pages/acts-audio-player-ch8";
import ActsAudioPlayerCh9 from "@/pages/acts-audio-player-ch9";
import ActsAudioPlayerCh10 from "@/pages/acts-audio-player-ch10";
import ActsInActionEbook from "@/pages/acts-in-action-ebook";
import DontBeAJonahPlayerCh1 from "@/pages/dont-be-a-jonah-player-ch1";
import DontBeAJonahPlayerCh2 from "@/pages/dont-be-a-jonah-player-ch2";
import DontBeAJonahPlayerCh3 from "@/pages/dont-be-a-jonah-player-ch3";
import DontBeAJonahPlayerCh4 from "@/pages/dont-be-a-jonah-player-ch4";
import DontBeAJonahCompleteBook from "@/pages/dont-be-a-jonah-complete-book";
import DontBeAJonahPlayerCh5 from "@/pages/dont-be-a-jonah-player-ch5";
import DontBeAJonahPlayerCh6 from "@/pages/dont-be-a-jonah-player-ch6";
import DontBeAJonahPlayerCh7 from "@/pages/dont-be-a-jonah-player-ch7";
import DontBeAJonahPlayerCh8 from "@/pages/dont-be-a-jonah-player-ch8";
import DontBeAJonahPlayerCh9 from "@/pages/dont-be-a-jonah-player-ch9";
import DontBeAJonahPlayerCh10 from "@/pages/dont-be-a-jonah-player-ch10";
import DontBeAJonahPlayerCh11 from "@/pages/dont-be-a-jonah-player-ch11";
import BecomingAFireStarterCh1 from "@/pages/becoming-a-firestarter-ch1";
import BecomingAFireStarterCh2 from "@/pages/becoming-a-firestarter-ch2";
import BecomingAFireStarterCh3 from "@/pages/becoming-a-firestarter-ch3";
import BecomingAFireStarterCh4 from "@/pages/becoming-a-firestarter-ch4";
import BecomingAFireStarterCh5 from "@/pages/becoming-a-firestarter-ch5";
import BecomingAFireStarterCh6 from "@/pages/becoming-a-firestarter-ch6";
import BecomingAFireStarterCh7 from "@/pages/becoming-a-firestarter-ch7";
import BecomingAFireStarterCh8 from "@/pages/becoming-a-firestarter-ch8";
import BecomingAFireStarterCh9 from "@/pages/becoming-a-firestarter-ch9";
import BecomingAFireStarterCh10 from "@/pages/becoming-a-firestarter-ch10";
import BecomingAFireStarterCompleteEbook from "@/pages/becoming-a-firestarter-complete-ebook";
import StudyingForServiceCh1 from "@/pages/studying-for-service-ch1";
import StudyingForServiceCh2 from "@/pages/studying-for-service-ch2";
import StudyingForServiceCh3 from "@/pages/studying-for-service-ch3";
import StudyingForServiceCh4 from "@/pages/studying-for-service-ch4";
import StudyingForServiceCh5 from "@/pages/studying-for-service-ch5";
import StudyingForServiceCh6 from "@/pages/studying-for-service-ch6";
import StudyingForServiceCh7 from "@/pages/studying-for-service-ch7";
import StudyingForServiceCh8 from "@/pages/studying-for-service-ch8";
import StudyingForServiceCh9 from "@/pages/studying-for-service-ch9";
import StudyingForServiceCh10 from "@/pages/studying-for-service-ch10";
import StudyingForServiceCh11 from "@/pages/studying-for-service-ch11";
import StudyingForServiceCh12 from "@/pages/studying-for-service-ch12";
import StudyingForServiceCompleteEbook from "@/pages/studying-for-service-complete-ebook";
import GrowCh1 from "@/pages/grow-ch1";
import GrowCh2 from "@/pages/grow-ch2";
import GrowCh3 from "@/pages/grow-ch3";
import GrowCh4 from "@/pages/grow-ch4";
import GrowCompleteEbook from "@/pages/grow-complete-ebook";
import DeaconCourseCh1 from "@/pages/deacon-course-ch1";
import DeaconCourseCh2 from "@/pages/deacon-course-ch2";
import DeaconCourseCh3 from "@/pages/deacon-course-ch3";
import DeaconCourseCh4 from "@/pages/deacon-course-ch4";
import DeaconCourseCh5 from "@/pages/deacon-course-ch5";
import DeaconCourseCompleteEbook from "@/pages/deacon-course-complete-ebook";
import LevelUpLeadershipWeek1 from "@/pages/level-up-leadership-week1";
import LevelUpLeadershipWeek2 from "@/pages/level-up-leadership-week2";
import LevelUpLeadershipWeek3 from "@/pages/level-up-leadership-week3";
import LevelUpLeadershipWeek4 from "@/pages/level-up-leadership-week4";
import LevelUpLeadershipWeek5 from "@/pages/level-up-leadership-week5";
import LevelUpLeadershipWeek6 from "@/pages/level-up-leadership-week6";
import YouthMinistryCourseCh1 from "@/pages/youth-ministry-course-ch1";
import YouthMinistryCourseCh2 from "@/pages/youth-ministry-course-ch2";
import YouthMinistryCourseCh3 from "@/pages/youth-ministry-course-ch3";
import YouthMinistryCourseCh4 from "@/pages/youth-ministry-course-ch4";
import YouthMinistryCourseCh5 from "@/pages/youth-ministry-course-ch5";
import YouthMinistryCompleteEbook from "@/pages/youth-ministry-complete-ebook";
import CourseDetail from "@/pages/course-detail";
import QuizTake from "@/pages/quiz-take";
import Profile from "@/pages/profile";
import Login from "@/pages/login";
import Register from "@/pages/register";
// Removed old instructor portal import
import BibleStudyTools from "@/pages/bible-study-tools-new";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsAndConditions from "@/pages/terms-and-conditions";
import InstructorApplication from "@/pages/instructor-application";
// Removed TextbookMaker import (AI Book Creator removed)
import StudentGrades from "@/pages/student-grades";
import MessageStudent from "@/pages/message-student";


import StudentManagement from "@/pages/student-management";

// Removed AI Book Creator import (AI Book Creator removed)
import TextbookCatalog from "@/pages/textbook-catalog";
import PDFDownload from "@/pages/pdf-download";

import CourseInstructions from "@/pages/course-instructions";
import CourseCatalog from "@/pages/course-catalog";
import MiniCourses from "@/pages/mini-courses";
// import BibleCourses from "@/pages/bible-courses";
import DailySharpening from "@/pages/daily-sharpening";



import OnlineServices from "@/pages/online-services";
import NotFound from "@/pages/not-found";
import GenesisToRevelation from "@/pages/genesis-to-revelation";
import LiveService from "@/pages/live-service";
import PastServices from "@/pages/past-services";
// Removed old streaming dashboard

import MyCertificates from "@/pages/my-certificates";
import BookSuggestions from "@/pages/book-suggestions";
import MyPersonalLibrary from "@/pages/my-personal-library";
import Events from "@/pages/events";
import CrossCarriersBlog from "@/pages/cross-carriers-blog";
// import ClickSendSetupGuide from "@/pages/clicksend-setup-guide";

import Logout from "@/pages/logout";

function Router() {
  return (
    <Switch>
      {/* Main website routes */}
      <Route path="/" component={Landing} />
      <Route path="/bible-school" component={BibleSchool} />
      <Route path="/bible-university" component={BibleUniversity} />
      <Route path="/sfgm-orlando" component={SFGMOrlando} />
      <Route path="/statement-of-faith" component={StatementOfFaith} />
      
      <Route path="/music" component={Music} />
      <Route path="/contact" component={Contact} />
      <Route path="/discussion-forum" component={DiscussionForum} />
      <Route path="/instructor-application" component={InstructorApplication} />
      <Route path="/online-services" component={OnlineServices} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/genesis-to-revelation" component={GenesisToRevelation} />
      <Route path="/live-service" component={LiveService} />
      <Route path="/past-services" component={PastServices} />
      
      <Route path="/textbook-catalog" component={TextbookCatalog} />
      <Route path="/book-suggestions" component={BookSuggestions} />
      <Route path="/events" component={Events} />
      <Route path="/cross-carriers-blog" component={CrossCarriersBlog} />
      <Route path="/pdf-download" component={PDFDownload} />
      <Route path="/course-catalog" component={CourseCatalog} />
      <Route path="/mini-courses" component={MiniCourses} />
      <Route path="/bible-courses" component={BibleSchool} />
      <Route path="/daily-sharpening" component={DailySharpening} />
      
      {/* Student and User pages - always accessible */}
      <Route path="/dashboard" component={StudentDashboard} />
      <Route path="/student-profile" component={StudentProfile} />
      <Route path="/student-progress" component={StudentProgress} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/course-instructions/:courseId" component={CourseInstructions} />
      <Route path="/course/:id" component={CourseDetail} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route path="/quiz/:id" component={QuizTake} />
      <Route path="/dont-be-a-jonah-complete-book" component={DontBeAJonahCompleteBook} />
      <Route path="/dont-be-a-jonah-player-ch1" component={DontBeAJonahPlayerCh1} />
      <Route path="/dont-be-a-jonah-player-ch2" component={DontBeAJonahPlayerCh2} />
      <Route path="/dont-be-a-jonah-player-ch3" component={DontBeAJonahPlayerCh3} />
      <Route path="/dont-be-a-jonah-player-ch4" component={DontBeAJonahPlayerCh4} />
      <Route path="/dont-be-a-jonah-player-ch5" component={DontBeAJonahPlayerCh5} />
      <Route path="/dont-be-a-jonah-player-ch6" component={DontBeAJonahPlayerCh6} />
      <Route path="/dont-be-a-jonah-player-ch7" component={DontBeAJonahPlayerCh7} />
      <Route path="/dont-be-a-jonah-player-ch8" component={DontBeAJonahPlayerCh8} />
      <Route path="/dont-be-a-jonah-player-ch9" component={DontBeAJonahPlayerCh9} />
      <Route path="/dont-be-a-jonah-player-ch10" component={DontBeAJonahPlayerCh10} />
      <Route path="/dont-be-a-jonah-player-ch11" component={DontBeAJonahPlayerCh11} />
      <Route path="/becoming-a-firestarter-ch1" component={BecomingAFireStarterCh1} />
      <Route path="/becoming-a-firestarter-ch2" component={BecomingAFireStarterCh2} />
      <Route path="/becoming-a-firestarter-ch3" component={BecomingAFireStarterCh3} />
      <Route path="/becoming-a-firestarter-ch4" component={BecomingAFireStarterCh4} />
      <Route path="/becoming-a-firestarter-ch5" component={BecomingAFireStarterCh5} />
      <Route path="/becoming-a-firestarter-ch6" component={BecomingAFireStarterCh6} />
      <Route path="/becoming-a-firestarter-ch7" component={BecomingAFireStarterCh7} />
      <Route path="/becoming-a-firestarter-ch8" component={BecomingAFireStarterCh8} />
      <Route path="/becoming-a-firestarter-ch9" component={BecomingAFireStarterCh9} />
      <Route path="/becoming-a-firestarter-ch10" component={BecomingAFireStarterCh10} />
      <Route path="/becoming-a-firestarter-complete-ebook" component={BecomingAFireStarterCompleteEbook} />
      <Route path="/studying-for-service-ch1" component={StudyingForServiceCh1} />
      <Route path="/studying-for-service-ch2" component={StudyingForServiceCh2} />
      <Route path="/studying-for-service-ch3" component={StudyingForServiceCh3} />
      <Route path="/studying-for-service-ch4" component={StudyingForServiceCh4} />
      <Route path="/studying-for-service-ch5" component={StudyingForServiceCh5} />
      <Route path="/studying-for-service-ch6" component={StudyingForServiceCh6} />
      <Route path="/studying-for-service-ch7" component={StudyingForServiceCh7} />
      <Route path="/studying-for-service-ch8" component={StudyingForServiceCh8} />
      <Route path="/studying-for-service-ch9" component={StudyingForServiceCh9} />
      <Route path="/studying-for-service-ch10" component={StudyingForServiceCh10} />
      <Route path="/studying-for-service-ch11" component={StudyingForServiceCh11} />
      <Route path="/studying-for-service-ch12" component={StudyingForServiceCh12} />
      <Route path="/studying-for-service-complete-ebook" component={StudyingForServiceCompleteEbook} />
      <Route path="/grow-ch1" component={GrowCh1} />
      <Route path="/grow-ch2" component={GrowCh2} />
      <Route path="/grow-ch3" component={GrowCh3} />
      <Route path="/grow-ch4" component={GrowCh4} />
      <Route path="/grow-complete-ebook" component={GrowCompleteEbook} />
      <Route path="/deacon-course-ch1" component={DeaconCourseCh1} />
      <Route path="/deacon-course-ch2" component={DeaconCourseCh2} />
      <Route path="/deacon-course-ch3" component={DeaconCourseCh3} />
      <Route path="/deacon-course-ch4" component={DeaconCourseCh4} />
      <Route path="/deacon-course-ch5" component={DeaconCourseCh5} />
      <Route path="/deacon-course-complete-ebook" component={DeaconCourseCompleteEbook} />
      <Route path="/youth-ministry-course-ch1" component={YouthMinistryCourseCh1} />
      <Route path="/youth-ministry-course-ch2" component={YouthMinistryCourseCh2} />
      <Route path="/youth-ministry-course-ch3" component={YouthMinistryCourseCh3} />
      <Route path="/youth-ministry-course-ch4" component={YouthMinistryCourseCh4} />
      <Route path="/youth-ministry-course-ch5" component={YouthMinistryCourseCh5} />
      <Route path="/youth-ministry-complete-ebook" component={YouthMinistryCompleteEbook} />
      <Route path="/level-up-leadership-week1" component={LevelUpLeadershipWeek1} />
      <Route path="/level-up-leadership-week2" component={LevelUpLeadershipWeek2} />
      <Route path="/level-up-leadership-week3" component={LevelUpLeadershipWeek3} />
      <Route path="/level-up-leadership-week4" component={LevelUpLeadershipWeek4} />
      <Route path="/level-up-leadership-week5" component={LevelUpLeadershipWeek5} />
      <Route path="/level-up-leadership-week6" component={LevelUpLeadershipWeek6} />
      <Route path="/bible-study-tools" component={BibleStudyTools} />
      <Route path="/my-certificates" component={MyCertificates} />
      <Route path="/my-personal-library" component={MyPersonalLibrary} />
      
      {/* Course content routes */}
        <Route path="/acts-audio-player" component={ActsAudioPlayer} />
        <Route path="/acts-audio-player-ch1" component={ActsAudioPlayerCh1} />
        <Route path="/acts-audio-player-ch2" component={ActsAudioPlayerCh2} />
        <Route path="/acts-audio-player-ch3" component={ActsAudioPlayerCh3} />
        <Route path="/acts-audio-player-ch4" component={ActsAudioPlayerCh4} />
        <Route path="/acts-audio-player-ch5" component={ActsAudioPlayerCh5} />
        <Route path="/acts-audio-player-ch6" component={ActsAudioPlayerCh6} />
        <Route path="/acts-audio-player-ch7" component={ActsAudioPlayerCh7} />
        <Route path="/acts-audio-player-ch8" component={ActsAudioPlayerCh8} />
        <Route path="/acts-audio-player-ch9" component={ActsAudioPlayerCh9} />
        <Route path="/acts-audio-player-ch10" component={ActsAudioPlayerCh10} />
        <Route path="/acts-in-action-ebook" component={ActsInActionEbook} />
      
      {/* Additional routes */}
      <Route path="/logout" component={Logout} />
      <Route path="/student-grades" component={StudentGrades} />
      <Route path="/message-student" component={MessageStudent} />
      <Route path="/student-management" component={StudentManagement} />
      {/* <Route path="/clicksend-setup-guide" component={ClickSendSetupGuide} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
          <div className="max-w-md mx-auto text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <h1 className="text-2xl font-bold text-white mb-4">SFGM Boston Bible School</h1>
            <p className="text-gray-300 mb-6">We're experiencing a temporary issue. Please refresh the page to continue.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Refresh Page
            </button>
            <div className="mt-4">
              <a href="/" className="text-blue-300 hover:text-blue-200 underline">
                Return to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
