import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { FaBook, FaEye, FaUser, FaCalendar, FaGraduationCap, FaTimes, FaBookmark, FaCheck, FaPlus, FaDownload, FaBookOpen } from "react-icons/fa";
// import growCover from "@assets/image_1753296696582.png";
// import studyingForServiceCover from "@assets/Image 2_1753137106145.jpg";
// import dontBeAJonahCover from "@assets/Image_1753137060328.jpg";
// import levelUpLeadershipCover from "@assets/IMG_71A7B1E06669-1_1753328914119.jpeg";
// import fireStarterCover from "@assets/IMG_3701_1753137083261.jpeg";
// import powerOfPreachingCover from "@assets/81bGwIcnEHL_1753329077040.jpg";
// import newWatchmenProjectCover from "@assets/image_1753329726336.png";
// import newProphecyCover from "@assets/image_1753330427185.png";
// import newTheologyCover from "@assets/image_1753330614352.png";
// import newManOfGodCover from "@assets/image_1753330714244.png";
// import manOfGodCourseCover from "/man-of-god-course-cover.webp";
// import watchmenProjectCover from "/watchmen-project-cover.webp";
// import theology101Cover from "/theology-101-cover.webp";
// import introProphecyCover from "/introduction-to-prophecy-cover.jpg";

interface Textbook {
  id: number;
  title: string;
  author: string;
  description: string;
  bookCoverUrl?: string;
  category: string;
  difficulty: string;
  chapterCount: number;
  estimatedReadingTime: string;
  isComplete: boolean;
  courseId: number;
  courseName: string;
  isUpdated?: boolean;
}

export default function TextbookCatalog() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [selectedTextbook, setSelectedTextbook] = useState<Textbook | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("course");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Get user's personal library to check which books are already added
  const { data: personalLibraryResponse } = useQuery<{ books: any[] }>({
    queryKey: ['/api/personal-library'],
    enabled: isAuthenticated,
  });

  const personalLibrary = personalLibraryResponse?.books || [];

  // Add book to personal library mutation
  const addToLibraryMutation = useMutation({
    mutationFn: async (bookData: any) => {
      const response = await apiRequest('POST', '/api/personal-library', {
        bookData: {
          title: bookData.title,
          author: bookData.author,
          category: bookData.category,
          description: bookData.description,
          difficulty: bookData.difficulty,
          estimatedReadingTime: bookData.estimatedReadingTime,
          rating: bookData.rating,
          coverColor: bookData.coverColor,
          readingStatus: bookData.readingStatus,
          priority: bookData.priority,
          coverUrl: bookData.bookCoverUrl
        }
      });
      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/personal-library'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add book to library",
        variant: "destructive",
      });
    },
  });

  // Fetch all available textbooks
  const { data: textbooks, isLoading, error } = useQuery({
    queryKey: ['/api/textbooks'],
    queryFn: async () => {
      // For now, we'll use the known textbooks from the database
      const response = await fetch('/api/courses');
      const courses = await response.json();
      
      // Create ordered textbooks array - display in course ID order 0, 1-10
      const completeTextbooks: Textbook[] = [];
      
      // Course 1: "Acts In Action Course" textbook
      const actsCourse = courses.find((c: any) => c.id === 1);
      if (actsCourse) {
        completeTextbooks.push({
          id: 1, // Display order 1
          title: "Acts In Action Course",
          author: "Anthony Lee",
          description: "A comprehensive study of the Book of Acts focusing on how the early church received power and acted on faith. Learn how to receive the same power that transformed the disciples and discover how to put your faith into action for the Kingdom of God.",
          bookCoverUrl: "/acts-in-action-cover.png",
          category: "Bible Study",
          difficulty: "Intermediate",
          chapterCount: actsCourse.duration || 8,
          estimatedReadingTime: "3-4 hours",
          isComplete: true, // Content available
          courseId: 1, // Maps to courseId = 1 for complete-book-reader
          courseName: "Acts In Action Course",
          isUpdated: actsCourse.isUpdated || false
        });
      }

      // Course 2: "Becoming a Fire Starter" textbook
      const fireStarterCourse = courses.find((c: any) => c.id === 2);
      if (fireStarterCourse) {
        completeTextbooks.push({
          id: 2, // Display order 2
          title: "Becoming a Fire Starter",
          author: "Anthony Lee",
          description: "If you are tired of burning low and burning out, this is the book for you. Becoming a Fire Starter will instill in your walk of discipleship seven powerful principles that will enable you to not only be filled with the fire of the Holy Spirit, but to remain burning with passion for the Gospel of Jesus Christ and lost people. You should only read this book if you want your life changed by the fire of God!",
          bookCoverUrl: "/becoming-a-fire-starter-cover.jpeg",
          category: "Ministry",
          difficulty: "Intermediate",
          chapterCount: fireStarterCourse.duration || 11,
          estimatedReadingTime: "2-3 hours",
          isComplete: true, // All 11 chapters complete and functional
          courseId: 2, // Maps to courseId = 2 for complete-book-reader
          courseName: "Becoming a Fire Starter",
          isUpdated: fireStarterCourse.isUpdated || false
        });
      }
      
      // Course 3: "Don't Be A Jonah" textbook (project_id = 3, courseId = 3)
      const jonahCourse = courses.find((c: any) => c.id === 3);
      if (jonahCourse) {
        completeTextbooks.push({
          id: 3, // Display order 3
          title: "Don't Be A Jonah",
          author: "Bishop Anthony Lee",
          description: "Bishop Anthony Lee's sixth book is filled with compassion and urgency to encourage all those who are running from the call that God has for their life, so they would submit to the plans God has for them and no longer deal with the unnecessary storms that plague us when we rebel against the will of God. He uses the story of the famous character of Jonah to bring about practical life applications for God's people so they won't be swallowed up by the deception of this world. He also incorporates real life events that have been happening in modern-day times regarding the terrorist group Isis blowing up the tomb of Jonah and what some people called the Jonah eclipse.",
          bookCoverUrl: "/dont-be-a-jonah-cover.jpg",
          category: "Biblical Studies",
          difficulty: "Intermediate",
          chapterCount: jonahCourse.duration || 11,
          estimatedReadingTime: "3-4 hours",
          isComplete: false, // Content to be added manually
          courseId: 3, // Maps to courseId = 3 for complete-book-reader
          courseName: "Don't Be A Jonah",
          isUpdated: jonahCourse.isUpdated || false
        });
      }

      // Course 4: G.R.O.W Beginner Course textbook (project_id = 4, courseId = 4)
      const growCourse = courses.find((c: any) => c.id === 4); // G.R.O.W is courseId 4
      if (growCourse) {
        completeTextbooks.push({
          id: 4, // Display order 4
          title: "G.R.O.W Conference Materials",
          author: "SFGM Ministry",
          description: "GROWing ourselves, to READ the Word, to obey God's calling, to win souls for the Kingdom. 4-week conference materials covering GIVE (Time, Talents, Treasure), READ (Daily Devotions), OBEY (Biblical Obedience), and WIN SOULS (Evangelism). Essential foundation for ministry leadership and spiritual growth.",
          bookCoverUrl: "/grow-cover.png",
          category: "Ministry Leadership",
          difficulty: "Beginner",
          chapterCount: 4,
          estimatedReadingTime: "1-2 hours",
          isComplete: true, // All 4 weeks complete and functional
          courseId: 4, // Maps to courseId = 4 for complete-book-reader
          courseName: "G.R.O.W Conference Materials",
          isUpdated: true
        });
      }

      // Course 5: "Studying for Service" textbook
      const studyingCourse = courses.find((c: any) => c.id === 5);
      if (studyingCourse) {
        completeTextbooks.push({
          id: 5, // Display order 5
          title: "Studying for Service",
          author: "Anthony Lee",
          description: "The More You Know Your Text, The More People Will Know Their God. Master effective Bible study methods and develop skills for lifelong spiritual growth and ministry preparation.",
          bookCoverUrl: "/studying-for-service-cover.jpg",
          category: "Biblical Studies",
          difficulty: "Intermediate",
          chapterCount: 14, // 14 complete chapters: Dedication + Introduction + Chapters 1-11 + Conclusion
          estimatedReadingTime: "4-5 hours",
          isComplete: true, // All 14 chapters restored and complete
          courseId: 5, // Maps to courseId = 5 for complete-book-reader
          courseName: "Studying for Service",
          isUpdated: studyingCourse.isUpdated || false
        });
      }

      // Course 6: "Deaconship Course" textbook
      const deaconCourse = courses.find((c: any) => c.id === 6);
      if (deaconCourse) {
        completeTextbooks.push({
          id: 6, // Display order 6
          title: "Deaconship Course: Answering the Call",
          author: "SFGM Boston Ministry",
          description: "A Spirit-appointed, servant-hearted leadership training course. This comprehensive 5-week course equips you to execute the practical ministry of the church, acting as a conduit of God's love and provision to His people. Learn to discern your calling, build a biblical foundation, serve in power, stand firm in spiritual warfare, and step into lifelong commissioned impact.",
          bookCoverUrl: "/deacon-course-cover.png",
          category: "Ministry Leadership",
          difficulty: "Intermediate",
          chapterCount: 5,
          estimatedReadingTime: "3-4 hours",
          isComplete: true, // All 5 chapters complete with audio and complete e-book
          courseId: 6, // Maps to courseId = 6 for complete-book-reader
          courseName: "Deaconship Course",
          isUpdated: deaconCourse.isUpdated || false
        });
      }

      // Course 8: "The Watchmen Project" textbook (Coming Soon)
      const watchmenCourse = courses.find((c: any) => c.id === 8);
      if (watchmenCourse) {
        completeTextbooks.push({
          id: 8, // Display order 8
          title: "The Watchmen Project",
          author: "Nickalas Kaslov",
          description: "An advanced study of end times prophecy and spiritual vigilance. Equips believers to be watchmen on the wall, understanding the signs of the times and preparing the church for Christ's return through detailed biblical analysis.",
          bookCoverUrl: "/the-watchmen-project-cover.png",
          category: "Prophecy",
          difficulty: "Advanced",
          chapterCount: watchmenCourse.duration || 10,
          estimatedReadingTime: "6-8 hours",
          isComplete: true, // Content available
          courseId: 8, // Maps to courseId = 8 for complete-book-reader
          courseName: "The Watchmen Project",
          isUpdated: watchmenCourse.isUpdated || false
        });
      }

      // Course 7: "Introduction to Prophecy" textbook (content coming soon)
      const introProphecyCourse = courses.find((c: any) => c.id === 7);
      if (introProphecyCourse) {
        completeTextbooks.push({
          id: 7, // Display order 7
          title: "Introduction to Prophecy",
          author: "Larry Kaslov",
          description: "A foundational course exploring biblical prophecy and end times. Students will study various prophetic perspectives and their biblical foundations with practical applications for modern ministry.",
          bookCoverUrl: undefined,
          category: "Prophecy",
          difficulty: "Intermediate",
          chapterCount: introProphecyCourse.duration || 5,
          estimatedReadingTime: "3-4 hours",
          isComplete: false, // Content coming soon
          courseId: 7,
          courseName: "Introduction to Prophecy",
          isUpdated: introProphecyCourse.isUpdated || false
        });
      }


      // Course 9: "Theology 101" textbook (switched from courseId 6 to 9)
      const theologyCourse = courses.find((c: any) => c.id === 9);
      if (theologyCourse) {
        completeTextbooks.push({
          id: 9, // Display order 9
          title: "Theology 101",
          author: "Anthony Lee",
          description: "Welcome to our 10-week theology semester! Within this course we'll dive into various aspects of theology, each teaching will explore multiple topics and subjects, which will bring us to the conclusions of Why we believe What we believe, as outlined by the Word of God.",
          bookCoverUrl: undefined,
          category: "Theology",
          difficulty: "Beginner",
          chapterCount: theologyCourse.duration || 10,
          estimatedReadingTime: "5-6 hours",
          isComplete: false, // Content coming soon
          courseId: 9, // Now courseId 9
          courseName: "Theology 101",
          isUpdated: theologyCourse.isUpdated || false
        });
      }

      // Add "SFGM Man of God Course" textbook (content coming soon)
      const manOfGodCourse = courses.find((c: any) => c.id === 16);
      if (manOfGodCourse) {
        completeTextbooks.push({
          id: 16,
          title: "SFGM Man of God Course",
          author: "Pastor Kevin & Bishop Anthony Lee",
          description: "The Man of God course is an 8-week Bible study designed to challenge, equip, and empower men to walk boldly in their God-given purpose. This course is taught by two pastors from different SFGM locations, each bringing unique insights to help you grow spiritually and practically. Weeks 1–4: Led by Pastor Kevin from SFGM Columbus. Weeks 5–8: Led by Bishop Anthony Lee from SFGM Orlando. Each week focuses on key biblical principles that build your identity, character, and leadership as a man of God. Lessons cover vital topics such as God's glory, honoring relationships, faithful stewardship, and using your spiritual gifts with humility.",
          bookCoverUrl: undefined,
          category: "Character Development",
          difficulty: "Intermediate",
          chapterCount: manOfGodCourse.duration || 8,
          estimatedReadingTime: "5-6 hours",
          isComplete: false, // Content coming soon
          courseId: 16,
          courseName: "SFGM Man of God Course",
          isUpdated: manOfGodCourse.isUpdated || false
        });
      }


      
      // Add "Coming Soon" textbooks that don't exist in the database yet
      const comingSoonTextbooks = [
        {
          id: 8,
          title: "Youth Ministry Course",
          author: "SFGM Boston University",
          description: "A 5-chapter foundational course for youth ministry development and discipleship. Learn the calling, requirements, responsibilities, accountability, and disciple-making strategies needed for effective youth ministry.",
          bookCoverUrl: "/sfgm-youth-ministry-cover.png",
          category: "Ministry Leadership",
          difficulty: "Beginner",
          chapterCount: 5,
          estimatedReadingTime: "2-3 hours",
          isComplete: true,
          courseId: 8,
          courseName: "Youth Ministry Course",
          isUpdated: false
        },
        {
          id: 101, // Display order 101
          title: "Level Up Leadership",
          author: "John Maxwell & Bishop Anthony Lee",
          description: "The SFGM Level Up leadership class is an in depth 5 week course that will teach you how to lead better by serving more. This course will be taught by Bishop Anthony Lee as he breaks down each level of leadership with all its biblical principles, application and truths.",
          bookCoverUrl: "/level-up-leadership-cover.png",
          category: "Leadership Development",
          difficulty: "Intermediate",
          chapterCount: 5,
          estimatedReadingTime: "6-8 hours",
          isComplete: false,
          courseId: 101,
          courseName: "Level Up Leadership",
          isUpdated: false
        },
        {
          id: 102, // Display order 102
          title: "The Watchmen Series",
          author: "Bishop Anthony Lee",
          description: "A comprehensive study on spiritual warfare and watchfulness. Learn to stand guard over your family, community, and faith through biblical principles of spiritual watchfulness and discernment.",
          bookCoverUrl: "/the-watchmen-project-cover.png",
          category: "Spiritual Warfare",
          difficulty: "Advanced",
          chapterCount: 8,
          estimatedReadingTime: "10-12 hours",
          isComplete: false,
          courseId: 102,
          courseName: "The Watchmen Series",
          isUpdated: false
        },
        {
          id: 103, // Display order 103
          title: "Introduction to Prophecy",
          author: "Larry Kaslov",
          description: "A foundational course exploring biblical prophecy and end times. Students will study various prophetic perspectives and their biblical foundations with practical applications for modern ministry.",
          bookCoverUrl: "/introduction-to-prophecy-cover.png",
          category: "Prophecy",
          difficulty: "Intermediate",
          chapterCount: 5,
          estimatedReadingTime: "3-4 hours",
          isComplete: false,
          courseId: 103,
          courseName: "Introduction to Prophecy",
          isUpdated: false
        },
        {
          id: 104, // Display order 104
          title: "Theology 101",
          author: "Anthony Lee",
          description: "Welcome to our 10-week theology semester! Within this course we'll dive into various aspects of theology, each teaching will explore multiple topics and subjects, which will bring us to the conclusions of Why we believe What we believe, as outlined by the Word of God.",
          bookCoverUrl: "/theology-101-cover.png",
          category: "Theology",
          difficulty: "Beginner",
          chapterCount: 10,
          estimatedReadingTime: "5-6 hours",
          isComplete: false,
          courseId: 104,
          courseName: "Theology 101",
          isUpdated: false
        },
        {
          id: 105, // Display order 105
          title: "Men of God",
          author: "Pastor Kevin & Bishop Anthony Lee",
          description: "The Man of God course is an 8-week Bible study designed to challenge, equip, and empower men to walk boldly in their God-given purpose. This course is taught by two pastors from different SFGM locations, each bringing unique insights to help you grow spiritually and practically.",
          bookCoverUrl: "/man-of-god-course-cover.webp",
          category: "Character Development",
          difficulty: "Intermediate",
          chapterCount: 8,
          estimatedReadingTime: "5-6 hours",
          isComplete: false,
          courseId: 105,
          courseName: "Men of God",
          isUpdated: false
        }
      ];

      // Add the coming soon textbooks to the array
      completeTextbooks.push(...comingSoonTextbooks);

      return completeTextbooks;
    }
  });

  const handleReadTextbook = (textbook: Textbook) => {
    // For "Acts in Action" (courseId 1), navigate to the complete e-book
    if (textbook.courseId === 1) {
      setLocation('/acts-in-action-ebook');
      return;
    }
    
    // For "Don't Be a Jonah" (courseId 3), navigate to the complete e-book
    if (textbook.courseId === 3) {
      setLocation('/dont-be-a-jonah-complete-book');
      return;
    }
    
    // For "Becoming a Fire Starter" (courseId 2), navigate to the complete e-book
    if (textbook.courseId === 2) {
      setLocation('/becoming-a-firestarter-complete-ebook');
      return;
    }
    
    // For "Studying for Service" (courseId 5), navigate to the complete e-book
    if (textbook.courseId === 5) {
      setLocation('/studying-for-service-complete-ebook');
      return;
    }
    
    // For "G.R.O.W" (courseId 4), navigate to the complete e-book
    if (textbook.courseId === 4) {
      setLocation('/grow-complete-ebook');
      return;
    }
    
    if (textbook.courseId === 6) {
      setLocation('/deacon-course-complete-ebook');
      return;
    }
    
    // For Youth Ministry Course (courseId 8), navigate to the complete e-book
    if (textbook.courseId === 8) {
      setLocation('/youth-ministry-complete-ebook');
      return;
    }
    
    // For coming soon courses (courseId 16, 7, 9), show locked modal
    if (textbook.courseId === 16 || textbook.courseId === 7 || textbook.courseId === 9) {
      setSelectedTextbook(textbook);
      setShowModal(true);
      return;
    }
    
    // For content coming soon, show centered modal
    if (textbook.bookCoverUrl === 'content-coming-soon') {
      setSelectedTextbook(textbook);
      setShowModal(true);
      return;
    }
    
    // For The Power of Preaching (courseId 6), link to authorized source
    if (textbook.courseId === 6) {
      window.open('https://www.amazon.com/Power-Preaching-Crafting-Creative-Expository/dp/0802418309', '_blank');
      return;
    }
    
    // For The 5 Levels of Leadership, link to John Maxwell's book
    if (textbook.courseId === 5) {
      window.open('https://www.amazon.com/Levels-Leadership-Proven-Maximize-Potential/dp/1599953633', '_blank');
      return;
    }
    
    // For other textbooks, navigate to the complete book reader
    setLocation(`/pdf-download?courseId=${textbook.courseId}`);
  };

  const handleViewCourse = (courseId: number) => {
    setLocation(`/bible-school?courseId=${courseId}`);
  };

  const handleAddToLibrary = (textbook: Textbook) => {
    // Convert textbook to book format for personal library (matching the expected fields)
    const bookData = {
      title: textbook.title,
      author: textbook.author,
      category: textbook.category,
      description: textbook.description,
      difficulty: textbook.difficulty,
      estimatedReadingTime: textbook.estimatedReadingTime,
      rating: 5, // Default rating for textbooks
      coverColor: "bg-blue-500", // Default color
      readingStatus: "want_to_read", // Default status
      priority: 1, // Default priority
    };
    addToLibraryMutation.mutate(bookData);
  };

  const isBookInLibrary = (bookTitle: string, bookAuthor: string) => {
    if (!personalLibrary || !Array.isArray(personalLibrary)) return false;
    return personalLibrary.some((book: any) => 
      book.bookTitle === bookTitle && book.bookAuthor === bookAuthor
    );
  };




  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
        <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header + Controls */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FaBook className="text-4xl text-blue-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SFGM Textbook Catalog
              </h1>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Browse and read textbooks connected to our Bible School courses. Filter, search, and sort to find what you need.
            </p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, or course..."
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              {["All", ...(Array.from(new Set((textbooks||[]).map(tb => tb.category).filter(Boolean))) as string[])]
                .map(c => (<option key={c} value={c}>{c}</option>))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              {(["All", "Beginner", "Intermediate", "Advanced"] as string[])
                .map(d => (<option key={d} value={d}>{d}</option>))}
            </select>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <option value="course">Sort: Course #</option>
                <option value="title">Sort: Title</option>
                <option value="author">Sort: Author</option>
                <option value="chapters">Sort: Chapters</option>
                <option value="difficulty">Sort: Difficulty</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700"
                aria-label="Toggle sort order"
              >
                {sortOrder === 'asc' ? '⬆️' : '⬇️'}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Badge variant="outline" className="px-3 py-1">
              <FaGraduationCap className="mr-2" />
              {(textbooks || []).filter(tb => {
                const q = search.trim().toLowerCase();
                const matchesQuery = !q || [tb.title, tb.author, tb.category, tb.courseName]
                  .filter(Boolean)
                  .some(s => String(s).toLowerCase().includes(q));
                const matchesCategory = selectedCategory === 'All' || tb.category === selectedCategory;
                const matchesDifficulty = selectedDifficulty === 'All' || tb.difficulty === selectedDifficulty;
                return matchesQuery && matchesCategory && matchesDifficulty;
              }).length} Showing Now
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <FaUser className="mr-2" />
              Ministry Leadership Authors
            </Badge>
          </div>
        </div>

        {/* Textbooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(textbooks || [])
            .filter(tb => {
              const q = search.trim().toLowerCase();
              const matchesQuery = !q || [tb.title, tb.author, tb.category, tb.courseName]
                .filter(Boolean)
                .some(s => String(s).toLowerCase().includes(q));
              const matchesCategory = selectedCategory === 'All' || tb.category === selectedCategory;
              const matchesDifficulty = selectedDifficulty === 'All' || tb.difficulty === selectedDifficulty;
              return matchesQuery && matchesCategory && matchesDifficulty;
            })
            .sort((a, b) => {
              const dir = sortOrder === 'asc' ? 1 : -1;
              if (sortBy === 'course') return (a.id - b.id) * dir;
              if (sortBy === 'title') return a.title.localeCompare(b.title) * dir;
              if (sortBy === 'author') return a.author.localeCompare(b.author) * dir;
              if (sortBy === 'chapters') return ((a.chapterCount || 0) - (b.chapterCount || 0)) * dir;
              if (sortBy === 'difficulty') return a.difficulty.localeCompare(b.difficulty) * dir;
              return 0;
            })
            .map((textbook) => (
                <Card key={textbook.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col h-full max-w-sm mx-auto">
              <CardHeader className="pb-4">
                {/* Book Cover */}
                <div className="relative mb-3" id={`card-${textbook.id}`}>
                  {isAuthenticated && isBookInLibrary(textbook.title, textbook.author) ? (
                    <div className="absolute top-2 left-2 z-40">
                      <span className="text-[10px] bg-green-600 text-white px-2 py-1 rounded-full font-semibold shadow">IN LIBRARY</span>
                    </div>
                  ) : null}
                  {/* Coming Soon Badge Overlay for Coming Soon courses */}
                  {(textbook.courseId >= 101 && textbook.courseId <= 106) && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1 z-40 shadow-lg">
                      <i className="fas fa-clock"></i>
                      COMING SOON
                    </div>
                  )}
                  <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg overflow-hidden">
                    {textbook.bookCoverUrl && !textbook.bookCoverUrl.includes('placeholder') && textbook.bookCoverUrl !== 'content-coming-soon' ? (
                      <img 
                        src={textbook.bookCoverUrl} 
                        alt={textbook.title}
                        className="w-full h-full object-contain"
                      />
                    ) : textbook.bookCoverUrl === 'content-coming-soon' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                        <FaBook className="text-3xl text-gray-400 mb-2" />
                        <div className="text-center px-2">
                          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">CONTENT</div>
                          <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">COMING SOON</div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaBook className="text-4xl text-blue-500 opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Modal positioned exactly in the center of the card image */}
                  {showModal && selectedTextbook?.id === textbook.id && (
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                      <div 
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"
                        onClick={() => setShowModal(false)}
                      />
                      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-2xl max-w-sm mx-4 border border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => setShowModal(false)}
                          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                          <FaTimes className="text-lg" />
                        </button>
                        <div className="text-center">
                          {(selectedTextbook?.courseId === 5 || selectedTextbook?.courseId === 16 || selectedTextbook?.courseId === 7 || selectedTextbook?.courseId === 8 || selectedTextbook?.courseId === 9) ? (
                            <>
                              <i className="fas fa-lock text-4xl text-orange-600 mb-4"></i>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                Read Book - Locked
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4">
                                The textbook content for {selectedTextbook?.title} is currently locked. Please check back later when the content becomes available.
                              </p>
                              <Button 
                                onClick={() => setShowModal(false)}
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                              >
                                Understood
                              </Button>
                            </>
                          ) : (
                            <>
                              <FaBook className="text-4xl text-blue-600 mb-4 mx-auto" />
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {selectedTextbook?.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Content is coming soon! Please check back later for updates.
                              </p>
                              <Button 
                                onClick={() => setShowModal(false)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                Got it!
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Title and Author */}
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {textbook.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                  <FaUser className="text-xs" />
                  <span className="text-xs font-medium">{textbook.author}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">

                {/* Book Details */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-600">{textbook.chapterCount}</div>
                    <div className="text-xs text-gray-500">Chapters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-purple-600">{textbook.estimatedReadingTime}</div>
                    <div className="text-xs text-gray-500">Reading Time</div>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                    {textbook.category}
                  </span>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                    {textbook.difficulty}
                  </span>
                </div>

                {/* Action Buttons - Hidden for Coming Soon courses */}
                {!(textbook.courseId >= 101 && textbook.courseId <= 106) && (
                  <div className="space-y-2 mt-auto">
                    {/* Read E-Book Button */}
                    <Button 
                      onClick={() => {
                        if (textbook.courseId === 1) {
                          // Navigate to the complete e-book for Acts in Action
                          setLocation('/acts-in-action-ebook');
                        } else if (textbook.courseId === 3) {
                          // Navigate to the complete e-book for Don't Be a Jonah
                          setLocation('/dont-be-a-jonah-complete-book');
                        } else if (textbook.courseId === 2) {
                          // Navigate to the complete e-book for Becoming a Fire Starter
                          setLocation('/becoming-a-firestarter-complete-ebook');
                        } else if (textbook.courseId === 5) {
                          // Navigate to the complete e-book for Studying for Service
                          setLocation('/studying-for-service-complete-ebook');
                        } else if (textbook.courseId === 4) {
                          // Navigate to the complete e-book for G.R.O.W
                          setLocation('/grow-complete-ebook');
                        } else if (textbook.courseId === 6) {
                          // Navigate to the complete e-book for Deacon Course
                          setLocation('/deacon-course-complete-ebook');
                        } else if (textbook.courseId === 8) {
                          // Navigate to the complete e-book for Youth Ministry Course
                          setLocation('/youth-ministry-complete-ebook');
                        } else {
                          setLocation(`/pdf-download?courseId=${textbook.courseId}`);
                        }
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-7 text-xs"
                      size="sm"
                    >
                      <FaBookOpen className="mr-1" />
                      Read E-Book
                    </Button>
                    
                    {/* Download PDF Button */}
                    <Button 
                      onClick={() => {
                        if (textbook.courseId === 3) {
                          window.open('/pdfs/Dont%20Be%20A%20Jonah%20Book.pdf', '_blank');
                        } else if (textbook.courseId === 4) {
                          window.open('/pdfs/SFGM%20GROW%20CONFRENCE.pdf', '_blank');
                        } else if (textbook.courseId === 2) {
                          window.open('/pdfs/Becoming%20A%20Fire%20Starter.pdf', '_blank');
                        } else if (textbook.courseId === 5) {
                          window.open('/pdfs/Studying%20For%20Service.pdf', '_blank');
                        } else if (textbook.courseId === 6) {
                          window.open('/pdfs/Deacon%20Course.pdf', '_blank');
                        } else {
                          setLocation(`/pdf-download?courseId=${textbook.courseId}`);
                        }
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white h-7 text-xs"
                      size="sm"
                    >
                      <FaDownload className="mr-1" />
                      Download PDF
                    </Button>
                    
                    {/* Add to Library Button */}
                    <Button 
                      variant={isAuthenticated && isBookInLibrary(textbook.title, textbook.author) ? "secondary" : "outline"}
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast({
                            title: "Login Required",
                            description: "Please login to add books to your personal library",
                            variant: "destructive",
                          });
                          return;
                        }
                        const textbookData = {
                          ...textbook,
                          readingStatus: "want_to_read",
                          priority: "high",
                          rating: 5,
                          coverColor: "blue"
                        };
                        handleAddToLibrary(textbookData);
                      }}
                      className="w-full h-7 text-xs"
                      size="sm"
                      disabled={isAuthenticated && (isBookInLibrary(textbook.title, textbook.author) || addToLibraryMutation.isPending)}
                    >
                      {isAuthenticated && addToLibraryMutation.isPending ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1"></div>
                      ) : isAuthenticated && isBookInLibrary(textbook.title, textbook.author) ? (
                        <>
                          <FaCheck className="mr-1" />
                          In Library
                        </>
                      ) : (
                        <>
                          <FaBookmark className="mr-1" />
                          Add to Library
                        </>
                      )}
                    </Button>
                    
                    {/* Take Course Button */}
                    <Button 
                      variant="outline" 
                      onClick={() => handleViewCourse(textbook.courseId)}
                      className="w-full h-7 text-xs"
                      size="sm"
                    >
                      <FaGraduationCap className="mr-1" />
                      Take Course
                    </Button>
                  </div>
                )}

                {/* Course Connection */}
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FaCalendar className="text-xs" />
                    <span className="text-xs">{textbook.courseName}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {!textbooks || textbooks.length === 0 ? (
          <div className="text-center py-12">
            <FaBook className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              No Textbooks Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Complete textbooks will appear here as they are added to the catalog.
            </p>
          </div>
        ) : null}

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About SFGM Textbooks
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              All textbooks in the SFGM catalog are authored by Bishop Anthony Lee and designed to provide 
              comprehensive spiritual education for ministry students. Each textbook is integrated with 
              corresponding Bible School courses featuring quizzes, discussions, and practical applications.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      </div>
    </TooltipProvider>
  );
}