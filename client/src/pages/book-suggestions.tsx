import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Clock, User, Plus, Check } from "lucide-react";
// import libraryImage from "@assets/image_1753290560182.png";
// import maxwellLaws21Cover from "@assets/image_1753291709866.png";
// import maxwellLevels5Cover from "@assets/image_1753291790731.png";
// import bevereBaitCover from "@assets/image_1753291944592.png";
// import bevereAweCover from "@assets/image_1753291987894.png";
// import warrenPurposeCover from "@assets/image_1753292039331.png";
// import tenBoomHidingCover from "@assets/image_1753292081654.png";
// import evansPreachingCover from "@assets/image_1753292126929.png";
// import robinsonLarsonCover from "@assets/image_1753292155323.png";
// import larkinDispensationalCover from "@assets/image_1753292214279.png";
// import lewisScrewtapeCover from "@assets/image_1753292248699.png";

// Amazon URL mapping for direct product links
const getAmazonUrl = (title: string, author: string) => {
  const amazonMappings: { [key: string]: string } = {
    'The Screwtape Letters': 'https://www.amazon.com/dp/0060652934/?bestFormat=true&k=screw%20tape%20letters%20cs%20lewis&ref_=nb_sb_ss_w_scx-ent-pd-bk-d_k1_1_10_de&crid=F1ZP7W1MOPWG&sprefix=scriw%20tape',
    'The Purpose Driven Life': 'https://www.amazon.com/What-Earth-Expanded-Purpose-Driven/dp/031032906X',
    'Jesus Calling': 'https://www.amazon.com/Jesus-Calling-Sarah-Young/dp/1400322359',
    'Mere Christianity': 'https://www.amazon.com/Mere-Christianity-C-S-Lewis/dp/0060652926',
    'The Hiding Place': 'https://www.amazon.com/Hiding-Place-Triumphant-Story-Corrie/dp/0553256696',
    'Wild at Heart': 'https://www.amazon.com/Wild-Heart-Revised-Updated-Discovering/dp/1400200393',
    'Battlefield of the Mind': 'https://www.amazon.com/Battlefield-Mind-Winning-Battle-Your/dp/0446691097',
    'The Power of a Praying Woman': 'https://www.amazon.com/Power-Praying%C2%AE-Woman-Stormie-Omartian/dp/0736957766',
    'Dispensational Truth': 'https://www.amazon.com/Greatest-Book-Dispensational-Truth-World/dp/0001473727',
    'The 21 Irrefutable Laws of Leadership': 'https://www.amazon.com/21-Irrefutable-Laws-Leadership-Follow/dp/0785288376',
    'The Five Levels of Leadership': 'https://www.amazon.com/Levels-Leadership-Proven-Maximize-Potential/dp/1599953633',
    'The Bait of Satan': 'https://www.amazon.com/Bait-Satan-Living-Free-Deadly/dp/1629991570',
    'The Awe of God': 'https://www.amazon.com/Awe-God-Astounding-Healthy-Changes/dp/1641238291',
    'The Art and Craft of Biblical Preaching': 'https://www.amazon.com/Art-Craft-Biblical-Preaching-Comprehensive/dp/0310252989'
  };
  return amazonMappings[title] || `https://www.amazon.com/s?k=${encodeURIComponent(title + ' ' + author)}&tag=sfgmboston-20`;
};

const getPdfUrl = (title: string) => {
  const pdfMappings: { [key: string]: string } = {
    'The Screwtape Letters': 'https://www.preachershelp.net/wp-content/uploads/2014/11/lewis-screwtape-letters.pdf',
    'The Purpose Driven Life': 'https://dn720003.ca.archive.org/0/items/the-purpose-driven-life/The%20Purpose%20Driven%20Life.pdf',
    'The Hiding Place': 'https://activeonlineducation.co.za/wp-content/uploads/2021/09/The-Hiding-Place-by-Boom-Corrie-ten-z-lib.org_.epub_.pdf',
    'The 21 Irrefutable Laws of Leadership': 'https://gthinkers.org/business_books/the_21_irrefutable_laws_of_leadership.pdf',
    'The Five Levels of Leadership': 'https://hoacsf.org/files/The%20Civil%20Society%20Organizations%20Leadership%20Training/Leadership%20Styles%20and%20building%20trust/The%205%20Levels%20of%20Lead...%20by%20John%20Maxwell%20%28z-lib.org%29.pdf',
    'The Bait of Satan': 'https://d2fahduf2624mg.cloudfront.net/pre_purchase_docs/BK_OASI_000643/2020-06-23-08-01-44/bk_oasi_000643.pdf',
    'The Awe of God': 'https://www.dirzon.com/file/telegram/Christianallebooks/the-awe-of-god-the-astounding-way-a-healthy-fear.pdf',
    'The Art and Craft of Biblical Preaching': 'https://static1.squarespace.com/static/5f35296bf3f3956a94e094bb/t/62b97148697843480b54240d/1656320339277/The+Art++Craft+of+Biblical+Preaching.pdf',
    'Dispensational Truth': 'https://www.crcnh.org/downloads/bible-study-tools/larkin/Dispensational-Truth.pdf'
  };
  return pdfMappings[title] || null;
};

const bookSuggestions = [
  {
    id: 1,
    title: "The 21 Irrefutable Laws of Leadership",
    author: "John C. Maxwell",
    category: "Leadership",
    description: "Maxwell's definitive guide to leadership principles that stand the test of time. Essential reading for ministry leaders and anyone seeking to develop their leadership capacity.",
    difficulty: "Intermediate",
    estimatedReadingTime: "300 pages",
    rating: 5,
    coverImage: null,
    coverColor: "bg-blue-500",
    pdfUrl: getPdfUrl("The 21 Irrefutable Laws of Leadership")
  },
  {
    id: 2,
    title: "The Five Levels of Leadership",
    author: "John C. Maxwell",
    category: "Leadership",
    description: "A progressive approach to leadership development, from positional authority to pinnacle leadership. Perfect for understanding the journey of leadership growth.",
    difficulty: "Intermediate",
    estimatedReadingTime: "320 pages",
    rating: 5,
    coverImage: null,
    coverColor: "bg-green-500",
    pdfUrl: getPdfUrl("The Five Levels of Leadership")
  },
  {
    id: 3,
    title: "The Bait of Satan",
    author: "John Bevere",
    category: "Spiritual Warfare",
    description: "Bevere's powerful teaching on overcoming offense and the traps that Satan sets through unforgiveness. A must-read for spiritual maturity and freedom.",
    difficulty: "Intermediate",
    estimatedReadingTime: "240 pages",
    rating: 5,
    coverImage: null,
    coverColor: "bg-red-500",
    pdfUrl: getPdfUrl("The Bait of Satan")
  },
  {
    id: 4,
    title: "The Awe of God",
    author: "John Bevere",
    category: "Spiritual Growth",
    description: "Rediscovering the fear of the Lord and developing a deeper reverence for God's holiness. Essential for cultivating intimate relationship with the Almighty.",
    difficulty: "Intermediate",
    estimatedReadingTime: "272 pages",
    rating: 5,
    coverImage: null,
    coverColor: "bg-purple-500",
    pdfUrl: getPdfUrl("The Awe of God")
  },
  {
    id: 5,
    title: "The Purpose Driven Life",
    author: "Rick Warren",
    category: "Spiritual Growth",
    description: "Warren's transformational 40-day spiritual journey to discover your purpose in God's plan. One of the best-selling Christian books of all time.",
    difficulty: "Beginner",
    estimatedReadingTime: "334 pages",
    rating: 5,
    coverImage: null,
    coverColor: "bg-orange-500",
    pdfUrl: getPdfUrl("The Purpose Driven Life")
  },
  {
    id: 6,
    title: "The Hiding Place",
    author: "Corrie ten Boom",
    category: "Biography",
    description: "Ten Boom's incredible true story of faith, forgiveness, and God's faithfulness during the Holocaust. A powerful testimony of God's grace in the darkest circumstances.",
    difficulty: "Intermediate",
    estimatedReadingTime: "241 pages",
    rating: 5,
    coverImage: null,
    coverColor: "bg-indigo-500",
    pdfUrl: getPdfUrl("The Hiding Place")
  },
  {
    id: 7,
    title: "The Power of Preaching",
    author: "Tony Evans",
    category: "Preaching",
    description: "Evans' comprehensive guide to biblical preaching with practical tools for sermon preparation and delivery. Essential for pastors and ministry leaders.",
    difficulty: "Advanced",
    estimatedReadingTime: "224 pages",
    rating: 4,
    coverImage: null,
    coverColor: "bg-cyan-500",
    pdfUrl: getPdfUrl("The Power of Preaching")
  },
  {
    id: 8,
    title: "The Art and Craft of Biblical Preaching",
    author: "Robinson & Larson",
    category: "Preaching",
    description: "A comprehensive guide to biblical preaching that combines theological depth with practical application for effective sermon preparation and delivery.",
    difficulty: "Advanced",
    estimatedReadingTime: "736 pages",
    rating: 4,
    coverImage: null,
    coverColor: "bg-gray-500",
    pdfUrl: getPdfUrl("The Art and Craft of Biblical Preaching")
  },
  {
    id: 9,
    title: "Dispensational Truth",
    author: "Clarence Larkin",
    category: "Theology",
    description: "Larkin's comprehensive study of dispensational theology with detailed charts and biblical analysis of God's plan throughout the ages.",
    difficulty: "Advanced",
    estimatedReadingTime: "192 pages",
    rating: 4,
    coverImage: null,
    coverColor: "bg-yellow-500",
    pdfUrl: getPdfUrl("Dispensational Truth")
  },
  {
    id: 10,
    title: "The Screwtape Letters",
    author: "C.S. Lewis",
    category: "Fiction",
    description: "A satirical novel about a senior demon instructing his nephew on the art of temptation. A brilliant examination of human nature and our spiritual battles.",
    difficulty: "Intermediate",
    estimatedReadingTime: "160 pages",
    rating: 5,
    coverImage: null,
    coverColor: "bg-pink-500",
    pdfUrl: getPdfUrl("The Screwtape Letters")
  }
];

// Optional cover overrides served from client/public
const coverOverrides: { [key: string]: string } = {
  'The 21 Irrefutable Laws of Leadership': 'https://m.media-amazon.com/images/I/71X80jyO-4L._UF1000,1000_QL80_.jpg',
  'The Five Levels of Leadership': 'https://m.media-amazon.com/images/I/81+L-SrW92L._UF1000,1000_QL80_.jpg',
  'The Bait of Satan': 'https://m.media-amazon.com/images/I/61pfCoraMSL._UF1000,1000_QL80_.jpg',
  'The Awe of God': 'https://m.media-amazon.com/images/I/51vsitdNprL._UF1000,1000_QL80_.jpg',
  'The Purpose Driven Life': 'https://m.media-amazon.com/images/I/81g5wWEnukL._UF1000,1000_QL80_.jpg',
  'The Hiding Place': 'https://m.media-amazon.com/images/I/71BZ0mBmVdL._UF1000,1000_QL80_.jpg',
  'The Power of Preaching': 'https://m.media-amazon.com/images/I/81bGwIcnEHL._UF1000,1000_QL80_.jpg',
  'The Art and Craft of Biblical Preaching': 'https://m.media-amazon.com/images/I/71NYn9qkLML._UF1000,1000_QL80_.jpg',
  'Dispensational Truth': 'https://m.media-amazon.com/images/I/81lyMKWIq4L._UF1000,1000_QL80_.jpg',
  'The Screwtape Letters': 'https://m.media-amazon.com/images/I/71W-XT7Ls1L._UF1000,1000_QL80_.jpg',
};

const categories = ["All", "Leadership", "Spiritual Warfare", "Spiritual Growth", "Biography", "Preaching", "Theology", "Fiction"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function BookSuggestions() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'title' | 'author' | 'category' | 'difficulty' | 'default'>('default');

  // Get user's personal library to check which books are already added
  const { data: personalLibrary } = useQuery({
    queryKey: ['/api/personal-library'],
    enabled: isAuthenticated,
  });

  // Add book to personal library mutation
  const addToLibraryMutation = useMutation({
    mutationFn: async (bookData: any) => {
      const response = await apiRequest('POST', '/api/personal-library', {
        bookData: {
          title: bookData.title,
          author: bookData.author,
          category: bookData.category,
          description: bookData.description,
          estimatedReadingTime: bookData.estimatedReadingTime,
          coverColor: bookData.coverColor,
          readingStatus: "want_to_read",
          pdfUrl: bookData.pdfUrl,
          coverUrl: bookData.coverImage
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

  const handleAddToLibrary = (book: any) => {
    addToLibraryMutation.mutate(book);
  };

  const isBookInLibrary = (bookTitle: string, bookAuthor: string) => {
    if (!personalLibrary || !(personalLibrary as any)?.books || !Array.isArray((personalLibrary as any).books)) return false;
    return (personalLibrary as any).books.some((book: any) => 
      book.bookTitle === bookTitle && book.bookAuthor === bookAuthor
    );
  };

  // Filter books based on selected category and difficulty, then search + sort
  const filteredBooks = bookSuggestions
    .filter(book => {
      const categoryMatch = selectedCategory === "All" || book.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === "All" || book.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    })
    .filter(book => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'difficulty') return a.difficulty.localeCompare(b.difficulty);
      return 0;
    });

  // Redirect non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8">
            <BookOpen className="mx-auto h-16 w-16 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
            <p className="text-gray-600 mb-6">
              Please log in to access the Book Suggestions page. This resource is available to registered SFGM Boston Bible School students.
            </p>
            <a 
              href="/login" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log In to Continue
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-rose-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="relative mb-12 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
          <div className="h-64 relative bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 flex items-center justify-center h-full px-4">
              <div className="text-center text-white max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4 drop-shadow">Book Suggestions</h1>
                <p className="text-lg md:text-xl mb-6 text-blue-100">Curated Reading List for SFGM Boston Bible School</p>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow">
                  <h2 className="text-lg font-semibold mb-3">📚 Supplemental Reading Collection</h2>
                  <p className="text-sm leading-relaxed text-blue-100">
                    Enhance your Bible School education with these supplemental books. Add to your personal library or purchase from Amazon. These are not required course materials but are highly recommended for spiritual growth, leadership development, and ministry preparation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Legal Notice</h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>
                  <strong>SFGM Boston Bible School does not own the rights to these suggested reading materials.</strong> These books are recommended for educational and spiritual growth purposes only. We encourage students to purchase these books through legitimate retailers. All book covers, titles, and content remain the property of their respective authors and publishers. This page serves as an educational resource to guide students toward quality Christian literature that complements our Bible school curriculum.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls: Search, Filters, Sort */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm ring-1 ring-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Search</h3>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or description..."
                className="w-full px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    variant={category === selectedCategory ? "default" : "outline"}
                    className="cursor-pointer hover:bg-slate-100 rounded-full transition-transform hover:-translate-y-0.5"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Filter by Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Badge 
                    key={difficulty}
                    variant={difficulty === selectedDifficulty ? "default" : "outline"}
                    className="cursor-pointer hover:bg-slate-100 rounded-full transition-transform hover:-translate-y-0.5"
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Sort</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              >
                <option value="default">Default</option>
                <option value="title">Title (A–Z)</option>
                <option value="author">Author (A–Z)</option>
                <option value="category">Category (A–Z)</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const inLibrary = isBookInLibrary(book.title, book.author);
            const coverOverride = coverOverrides[book.title];
            return (
              <Card key={book.id} className="flex flex-col h-full group rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="pb-3">
                  {/* Book Cover */}
                  <div className="relative rounded-xl h-64 flex items-center justify-center mb-4 overflow-hidden bg-slate-50">
                    {(coverOverride || book.coverImage) ? (
                      <img 
                        src={coverOverride ?? (book.coverImage ?? undefined)} 
                        alt={`Cover of ${book.title}`}
                        className="w-full h-full object-contain rounded-xl drop-shadow-sm"
                      />
                    ) : (
                      <div className={`${book.coverColor} rounded-xl h-64 w-full flex items-center justify-center`}>
                        <BookOpen className="h-20 w-20 text-white drop-shadow" />
                      </div>
                    )}
                    {isBookInLibrary(book.title, book.author) && (
                      <span className="absolute top-2 right-2 bg-emerald-600/95 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full shadow">
                        In Library
                      </span>
                    )}
                  </div>
                  
                  <CardTitle className="text-lg font-semibold tracking-tight line-clamp-2 mb-1">
                    {book.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <User className="h-4 w-4" />
                    <span>{book.author}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs rounded-full">
                      {book.category}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs rounded-full ${
                        book.difficulty === 'Beginner' ? 'border-green-500 text-green-700' :
                        book.difficulty === 'Intermediate' ? 'border-yellow-500 text-yellow-700' :
                        'border-red-500 text-red-700'
                      }`}
                    >
                      {book.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 drop-shadow ${
                          i < book.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                        }`} 
                      />
                    ))}
                    <span className="text-sm text-slate-600 ml-2">({book.rating}/5)</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                    <Clock className="h-4 w-4" />
                    <span>{book.estimatedReadingTime}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 pb-4 flex flex-col flex-grow">
                  <div className="text-sm text-slate-700 mb-3 flex-grow overflow-y-auto max-h-24 pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                    {book.description}
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-auto">
                    {/* PDF Button - For books with available PDFs */}
                    {(book.title === "The Screwtape Letters" || book.title === "The Purpose Driven Life" || book.title === "The Hiding Place" || book.title === "The 21 Irrefutable Laws of Leadership" || book.title === "The Five Levels of Leadership" || book.title === "The Bait of Satan" || book.title === "The Awe of God" || book.title === "The Art and Craft of Biblical Preaching" || book.title === "Dispensational Truth") && (
                      <Button 
                        size="sm" 
                        variant="default"
                        className="w-full h-8 text-xs rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                        asChild
                      >
                        <a 
                          href={
                            book.title === "The Screwtape Letters" 
                              ? "https://www.preachershelp.net/wp-content/uploads/2014/11/lewis-screwtape-letters.pdf"
                              : book.title === "The Purpose Driven Life"
                              ? "https://dn720003.ca.archive.org/0/items/the-purpose-driven-life/The%20Purpose%20Driven%20Life.pdf"
                              : book.title === "The Hiding Place"
                              ? "https://activeonlineducation.co.za/wp-content/uploads/2021/09/The-Hiding-Place-by-Boom-Corrie-ten-z-lib.org_.epub_.pdf"
                              : book.title === "The 21 Irrefutable Laws of Leadership"
                              ? "https://gthinkers.org/business_books/the_21_irrefutable_laws_of_leadership.pdf"
                              : book.title === "The Five Levels of Leadership"
                              ? "https://hoacsf.org/files/The%20Civil%20Society%20Organizations%20Leadership%20Training/Leadership%20Styles%20and%20building%20trust/The%205%20Levels%20of%20Lead...%20by%20John%20Maxwell%20%28z-lib.org%29.pdf"
                              : book.title === "The Bait of Satan"
                              ? "https://d2fahduf2624mg.cloudfront.net/pre_purchase_docs/BK_OASI_000643/2020-06-23-08-01-44/bk_oasi_000643.pdf"
                              : book.title === "The Awe of God"
                              ? "https://www.dirzon.com/file/telegram/Christianallebooks/the-awe-of-god-the-astounding-way-a-healthy-fear.pdf"
                              : book.title === "The Art and Craft of Biblical Preaching"
                              ? "https://static1.squarespace.com/static/5f35296bf3f3956a94e094bb/t/62b97148697843480b54240d/1656320339277/The+Art++Craft+of+Biblical+Preaching.pdf"
                              : "https://www.crcnh.org/downloads/bible-study-tools/larkin/Dispensational-Truth.pdf"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-file-pdf mr-1 text-xs"></i>
                          Read PDF
                        </a>
                      </Button>
                    )}
                    
                    {/* Amazon Button */}
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full h-8 text-xs rounded-full"
                      asChild
                    >
                      <a 
                        href={getAmazonUrl(book.title, book.author)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-amazon text-orange-500 mr-1 text-xs"></i>
                        Buy on Amazon
                      </a>
                    </Button>
                    
                    {/* Library Button */}
                    <Button 
                      size="sm" 
                      variant={inLibrary ? "secondary" : "outline"} 
                      className="w-full h-8 text-xs rounded-full"
                      onClick={() => handleAddToLibrary(book)}
                      disabled={inLibrary || addToLibraryMutation.isPending}
                    >
                      {addToLibraryMutation.isPending ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-slate-600"></div>
                      ) : inLibrary ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          In Library
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3 mr-1" />
                          Add to Library
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Additional Reading Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Christian Book Stores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Lifeway Christian Store</li>
                  <li>• Family Christian Stores</li>
                  <li>• Mardel Christian & Education</li>
                  <li>• Local church bookstores</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Online Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• ChristianBook.com</li>
                  <li>• Audible.com (audiobooks)</li>
                  <li>• Kindle Store</li>
                  <li>• Apple Books</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Study Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• SFGM Boston Book Club</li>
                  <li>• Sunday School Classes</li>
                  <li>• Small Group Bible Studies</li>
                  <li>• Ministry Training Sessions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}