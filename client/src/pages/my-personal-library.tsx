import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import BookshelfView from '@/components/bookshelf-view';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

// Book cover images - using existing covers from attached assets
// import screwtapeLettersNewCover from "@assets/image_1753558737534.png";
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

// Textbook covers - Complete set from textbook catalog
// import growCover from "@assets/image_1753296696582.png";
// import studyingForServiceCover from "@assets/Image 2_1753137106145.jpg";
// import dontBeAJonahCover from "@assets/Image_1753137060328.jpg";
// import fireStarterCover from "@assets/IMG_3701_1753137083261.jpeg";
// import levelUpLeadershipCover from "@assets/IMG_71A7B1E06669-1_1753328914119.jpeg";
// import actsCover from "@assets/IMG_3751_1753328106169.jpg";
// import powerOfPreachingCover from "@assets/81bGwIcnEHL_1753329077040.jpg";
// import newWatchmenProjectCover from "@assets/image_1753329726336.png";
// import newProphecyCover from "@assets/image_1753330427185.png";
// import newTheologyCover from "@assets/image_1753330614352.png";
// import newManOfGodCover from "@assets/image_1753330714244.png";

interface LibraryBook {
  id: number;
  userId: string;
  bookId: string;
  title: string;
  bookTitle?: string;
  author: string;
  description: string;
  coverUrl: string;
  category: string;
  addedAt: string;
}

export default function MyPersonalLibrary() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'author'>('recent');
  const [bookToRemove, setBookToRemove] = useState<{ id: string; title: string } | null>(null);

  // SVG placeholder for books without covers
  const placeholderBookImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRhNWU4MCIvPjxwYXRoIGQ9Ik04MCAxMjBoNDBtLTIwLTIwdjQwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJvb2s8L3RleHQ+PC9zdmc+';

  // Fetch personal library
  const { data: libraryData, isLoading } = useQuery({
    queryKey: ['/api/personal-library'],
  });

  const library = (libraryData as any)?.books || [];

  // Helper functions - defined before use
  const isTextbookCategory = (category: string) => {
    // Only SFGM textbook categories - exclude suggested reading categories
    const textbookCategories = [
      'Textbook'
    ];
    return textbookCategories.includes(category);
  };

  const isSFGMTextbook = (title: string) => {
    // Specific SFGM textbook titles only - case insensitive matching
    const sfgmTextbooks = [
      'G.R.O.W Conference Materials',
      "Don't Be A Jonah",
      'Studying for Service',
      'Becoming a Fire Starter',
      'Acts in Action Course',
      'Acts In Action Course', // Handle both case variations
      'Level Up Leadership',
      'Power of Preaching',
      'Introduction to Prophecy',
      'The Watchmen Project',
      'Theology 101',
      'SFGM Man of God Course'
    ];
    return sfgmTextbooks.some(textbook => 
      textbook.toLowerCase() === title.toLowerCase()
    );
  };
  const getCoverColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Textbook': 'bg-blue-600',
      'Ministry Leadership': 'bg-blue-600', // For G.R.O.W textbook
      'Biblical Studies': 'bg-amber-600', // For Don't Be A Jonah, Studying for Service
      'Ministry': 'bg-green-600', // For Becoming a Fire Starter
      'Leadership': 'bg-purple-600', // For Level Up Leadership
      'Practical Ministry': 'bg-teal-600', // For Acts in Action
      'Preaching': 'bg-orange-600', // For Power of Preaching
      'Prophecy': 'bg-red-600', // For Introduction to Prophecy
      'Spiritual Warfare': 'bg-red-600', // For The Watchmen Project
      'Theology': 'bg-indigo-600', // For Theology 101
      'Character Development': 'bg-gray-600', // For SFGM Man of God Course
      'Spiritual Growth': 'bg-green-600',
      'Biblical Study': 'bg-amber-600',
      'Fiction': 'bg-gradient-to-b from-amber-800 to-amber-900 border-amber-700'
    };
    return colors[category] || 'bg-gray-600';
  };

  const getTextbookCourseId = (title: string) => {
    const textbookMappings: { [key: string]: number } = {
      'G.R.O.W Conference Materials': 0,
      "Don't Be A Jonah": 1,
      'Studying for Service': 2,
      'Becoming a Fire Starter': 3,
      'Acts in Action Course': 4,
      'Level Up Leadership': 5,
      'Power of Preaching': 6,
      'Introduction to Prophecy': 7,
      'The Watchmen Project': 8,
      'Theology 101': 9,
      'SFGM Man of God Course': 16
    };
    return textbookMappings[title] || 0;
  };

  const getPdfUrl = (title: string) => {
    // PDF mappings for available books
    const pdfMappings: { [key: string]: string } = {
      'The Screwtape Letters': 'https://www.preachershelp.net/wp-content/uploads/2014/11/lewis-screwtape-letters.pdf',
      'Screwtape Letters': 'https://www.preachershelp.net/wp-content/uploads/2014/11/lewis-screwtape-letters.pdf',
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

  const getCoverImage = (title: string) => {
    // Automatic cover image mapping for books - Complete list including textbooks
    const coverMappings: { [key: string]: string } = {
      // Book suggestions covers
      'The Screwtape Letters': 'https://m.media-amazon.com/images/I/71W-XT7Ls1L._UF1000,1000_QL80_.jpg',
      'Screwtape Letters': 'https://m.media-amazon.com/images/I/71W-XT7Ls1L._UF1000,1000_QL80_.jpg',
      'The 21 Irrefutable Laws of Leadership': 'https://m.media-amazon.com/images/I/71X80jyO-4L._UF1000,1000_QL80_.jpg',
      'The Five Levels of Leadership': 'https://m.media-amazon.com/images/I/81+L-SrW92L._UF1000,1000_QL80_.jpg',
      'The Bait of Satan': 'https://m.media-amazon.com/images/I/61pfCoraMSL._UF1000,1000_QL80_.jpg',
      'The Awe of God': 'https://m.media-amazon.com/images/I/51vsitdNprL._UF1000,1000_QL80_.jpg',
      'The Purpose Driven Life': 'https://m.media-amazon.com/images/I/81g5wWEnukL._UF1000,1000_QL80_.jpg',
      'The Hiding Place': 'https://m.media-amazon.com/images/I/71BZ0mBmVdL._UF1000,1000_QL80_.jpg',
      'The Power of Preaching': 'https://m.media-amazon.com/images/I/81bGwIcnEHL._UF1000,1000_QL80_.jpg',
      'The Art and Craft of Biblical Preaching': 'https://m.media-amazon.com/images/I/71NYn9qkLML._UF1000,1000_QL80_.jpg',
      'Dispensational Truth': 'https://m.media-amazon.com/images/I/81lyMKWIq4L._UF1000,1000_QL80_.jpg',
      // Textbook covers - SFGM Course Materials
      'G.R.O.W Conference Materials': '/grow-cover.png',
      "Don't Be A Jonah": '/dont-be-a-jonah-cover.jpg',
      'Studying for Service': '/studying-for-service-cover.jpg',
      'Becoming a Fire Starter': '/fire-starter-cover.jpg',
      'Acts in Action Course': '/acts-in-action-cover.png',
    };
    // Case-insensitive lookup
    const normalizedTitle = title.toLowerCase();
    const matchingKey = Object.keys(coverMappings).find(key => 
      key.toLowerCase() === normalizedTitle
    );
    return matchingKey ? coverMappings[matchingKey] : null;
  };

  const getAmazonUrl = (title: string) => {
    // Direct Amazon product links for books - Updated with real Amazon links
    const amazonMappings: { [key: string]: string } = {
      'The Screwtape Letters': 'https://www.amazon.com/dp/0060652934/?bestFormat=true&k=screw%20tape%20letters%20cs%20lewis&ref_=nb_sb_ss_w_scx-ent-pd-bk-d_k1_1_10_de&crid=F1ZP7W1MOPWG&sprefix=scriw%20tape',
      'Screwtape Letters': 'https://www.amazon.com/dp/0060652934/?bestFormat=true&k=screw%20tape%20letters%20cs%20lewis&ref_=nb_sb_ss_w_scx-ent-pd-bk-d_k1_1_10_de&crid=F1ZP7W1MOPWG&sprefix=scriw%20tape',
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
    return amazonMappings[title] || `https://www.amazon.com/s?k=${encodeURIComponent(title)}`;
  };

  // Convert library books to bookshelf format
  const bookshelfBooks = library.map((book: any) => {
    const bookTitle = book.bookTitle || book.title || 'Unknown Title';
    const isTextbook = isSFGMTextbook(bookTitle);
    const pdfUrl = book.pdfUrl || getPdfUrl(bookTitle);
    const bookType = isTextbook ? 'textbook' : 
            (pdfUrl ? 'pdf' : 'external');
    
    // Debug logging to help identify the issue
    console.log(`Book: "${bookTitle}", isTextbook: ${isTextbook}, pdfUrl: ${pdfUrl ? 'exists' : 'none'}, type: ${bookType}`);
    
    return {
      id: book.id?.toString() || `${book.bookTitle || 'unknown'}-${book.bookAuthor || 'unknown'}`,
      title: bookTitle,
      author: book.bookAuthor || book.author || 'Unknown Author',
      category: book.category || 'Unknown Category',
      coverColor: getCoverColor(book.category || 'Unknown Category'),
      coverImage: book.coverUrl || getCoverImage(bookTitle),
      type: bookType,
      courseId: isTextbook ? getTextbookCourseId(bookTitle) : undefined,
      pdfUrl: !isTextbook ? pdfUrl : undefined,
      bookId: book.id?.toString() || book.bookId
    };
  });

  // Handle book click in bookshelf
  const handleBookClick = (book: any) => {
    console.log(`Clicked book: "${book.title}", type: ${book.type}, pdfUrl: ${book.pdfUrl}`);
    
    if (book.type === 'textbook') {
      // Special handling for Acts in Action - navigate to complete e-book
      if (book.title.toLowerCase() === 'acts in action course') {
        window.location.href = '/acts-in-action-ebook';
        return;
      }
      // Special handling for Becoming a Fire Starter - navigate to complete e-book
      if (book.title === 'Becoming a Fire Starter') {
        window.location.href = '/becoming-a-firestarter-complete-ebook';
        return;
      }
      // Special handling for Don't Be a Jonah - navigate to complete e-book
      if (book.title === "Don't Be A Jonah") {
        window.location.href = '/dont-be-a-jonah-complete-book';
        return;
      }
      // Special handling for Studying for Service - navigate to complete e-book
      if (book.title === 'Studying for Service') {
        window.location.href = '/studying-for-service-complete-ebook';
        return;
      }
      // Special handling for G.R.O.W - navigate to complete e-book
      if (book.title === 'G.R.O.W Conference Materials') {
        window.location.href = '/grow-complete-ebook';
        return;
      }
      // Open textbook reader
      window.location.href = `/complete-book-reader?courseId=${book.courseId}`;
    } else if (book.type === 'pdf' && book.pdfUrl) {
      // Open PDF in new tab
      window.open(book.pdfUrl, '_blank');
    } else {
      // For external books without PDFs, open direct Amazon link
      window.open(getAmazonUrl(book.title), '_blank');
    }
  };

  // Remove book from library mutation
  const removeBookMutation = useMutation({
    mutationFn: (bookId: string) => apiRequest('DELETE', `/api/personal-library/${bookId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/personal-library'] });
      setBookToRemove(null);
      toast({
        title: "Book Removed Successfully",
        description: "The book has been permanently removed from your personal library.",
      });
    },
    onError: () => {
      setBookToRemove(null);
      toast({
        title: "Remove Failed",
        description: "Unable to remove book from library. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle remove book confirmation
  const handleRemoveBook = (bookId: string, bookTitle: string) => {
    setBookToRemove({ id: bookId, title: bookTitle });
  };

  // Confirm remove book
  const confirmRemoveBook = () => {
    if (bookToRemove) {
      removeBookMutation.mutate(bookToRemove.id);
    }
  };

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(library.map((book: any) => book.category).filter(Boolean)))] as string[];

  // Filter + search + sort pipeline
  const filteredByCategory = selectedCategory === 'all'
    ? library
    : library.filter((book: LibraryBook) => book.category === selectedCategory);

  const filteredBySearch = filteredByCategory.filter((book: any) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (book.title || '').toLowerCase().includes(q) ||
      (book.bookTitle || '').toLowerCase().includes(q) ||
      (book.author || '').toLowerCase().includes(q) ||
      (book as any).bookAuthor?.toLowerCase?.().includes(q)
    );
  });

  const displayedBooks = [...filteredBySearch].sort((a: any, b: any) => {
    if (sortBy === 'recent') {
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    }
    if (sortBy === 'title') {
      const at = (a.bookTitle || a.title || '').toLowerCase();
      const bt = (b.bookTitle || b.title || '').toLowerCase();
      return at.localeCompare(bt);
    }
    // author
    const aa = (a.bookAuthor || a.author || '').toLowerCase();
    const ba = (b.bookAuthor || b.author || '').toLowerCase();
    return aa.localeCompare(ba);
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <Navigation />
        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading your personal library...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <i className="fas fa-book-reader text-teal-400"></i>
            My Personal Library
          </h1>
          <p className="text-xl text-blue-200">
            Your saved collection of textbooks and recommended reading
          </p>
        </div>

        {/* Add More Books + Controls */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Add More Books</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => window.location.href = '/book-suggestions'}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 h-auto"
              >
                <div className="text-center">
                  <i className="fas fa-bookmark text-2xl mb-2 block"></i>
                  <div className="font-medium">Suggested Reading</div>
                  <div className="text-sm opacity-90">Curated spiritual growth books</div>
                </div>
              </Button>
              <Button
                onClick={() => window.location.href = '/textbook-catalog'}
                className="bg-purple-600 hover:bg-purple-700 text-white p-4 h-auto"
              >
                <div className="text-center">
                  <i className="fas fa-book text-2xl mb-2 block"></i>
                  <div className="font-medium">Course Textbooks</div>
                  <div className="text-sm opacity-90">Ministry training materials</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Controls Row: Search, Category Filter, Sort */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
            {/* Search */}
            <div>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or author..."
                className="w-full px-3 py-2 rounded bg-white/80 text-slate-800 placeholder-slate-500 focus:outline-none"
              />
            </div>
            {/* Category quick chips */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded text-sm ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                >
                  {cat}
                </button>
              ))}
              {categories.length > 5 && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded text-sm ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
                >
                  All
                </button>
              )}
            </div>
            {/* Sort */}
            <div className="justify-self-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded bg-white/80 text-slate-800 focus:outline-none"
              >
                <option value="recent">Sort: Recently Added</option>
                <option value="title">Sort: Title (A–Z)</option>
                <option value="author">Sort: Author (A–Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-amber-50/90 backdrop-blur-sm border border-amber-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
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
                  <strong>SFGM Boston Bible School does not own the rights to suggested reading materials in this library.</strong> These books are recommended for educational and spiritual growth purposes only. We encourage students to purchase these books through legitimate retailers. All book covers, titles, and content remain the property of their respective authors and publishers. This library serves as an educational resource to guide students toward quality Christian literature that complements our Bible school curriculum.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-white">{library.length}</div>
            <div className="text-blue-200 text-sm">Total Books</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-white">
              {library.filter((book: LibraryBook) => isTextbookCategory(book.category)).length}
            </div>
            <div className="text-blue-200 text-sm">Course Textbooks</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-white">{displayedBooks.length}</div>
            <div className="text-blue-200 text-sm">Showing Now</div>
          </div>
        </div>



        {/* Books Display with Tabs */}
        {displayedBooks.length > 0 ? (
          <Tabs defaultValue="bookshelf" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm mb-6">
              <TabsTrigger value="bookshelf" className="text-white data-[state=active]:bg-white/20">
                <i className="fas fa-books mr-2"></i>
                Bookshelf View
              </TabsTrigger>
              <TabsTrigger value="cards" className="text-white data-[state=active]:bg-white/20">
                <i className="fas fa-th-large mr-2"></i>
                Card View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookshelf">
              <BookshelfView 
                books={bookshelfBooks}
                onBookClick={handleBookClick}
                onRemoveBook={(bookId) => {
                  const book = bookshelfBooks.find((b: any) => b.id === bookId);
                  if (book) {
                    handleRemoveBook(bookId, book.title);
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="cards">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {displayedBooks.map((book: LibraryBook) => (
              <Card key={book.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 rounded-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-20 h-28 rounded-md overflow-hidden bg-gray-200">
                      <img
                        src={getCoverImage(book.bookTitle || book.title) || book.coverUrl || placeholderBookImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = placeholderBookImage;
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-white text-base line-clamp-2">
                        {book.title}
                      </CardTitle>
                      <p className="text-blue-200 text-xs mb-1">{book.author}</p>
                      <p className="text-gray-300 text-xs line-clamp-3">
                        {book.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    {isSFGMTextbook(book.bookTitle || book.title) ? (
                      <Button
                        size="sm"
                        className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          const title = book.bookTitle || book.title;
                          // Special handling for Acts in Action - case insensitive
                          if (title.toLowerCase() === 'acts in action course') {
                            window.location.href = '/acts-in-action-ebook';
                          } else if (title === 'Becoming a Fire Starter') {
                            window.location.href = '/becoming-a-firestarter-complete-ebook';
                          } else if (title === "Don't Be A Jonah") {
                            window.location.href = '/dont-be-a-jonah-complete-book';
                          } else if (title === 'Studying for Service') {
                            window.location.href = '/studying-for-service-complete-ebook';
                          } else {
                            window.location.href = `/complete-book-reader?courseId=${getTextbookCourseId(title)}`;
                          }
                        }}
                      >
                        <i className="fas fa-book-open mr-2"></i>
                        Read Book
                      </Button>
                    ) : getPdfUrl(book.bookTitle || book.title) ? (
                      <Button
                        size="sm"
                        className="flex-1 h-8 text-xs bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          const pdfUrl = getPdfUrl(book.bookTitle || book.title);
                          if (pdfUrl) {
                            window.open(pdfUrl, '_blank');
                          }
                        }}
                      >
                        <i className="fas fa-file-pdf mr-2"></i>
                        Read PDF
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 h-8 text-xs bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => {
                          window.open(getAmazonUrl(book.bookTitle || book.title), '_blank');
                        }}
                      >
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Buy on Amazon
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Use the original database ID from the library data
                        const originalBook = library.find((b: LibraryBook) => 
                          (b.bookTitle || b.title) === (book.bookTitle || book.title)
                        );
                        if (originalBook) {
                          handleRemoveBook(originalBook.id.toString(), originalBook.bookTitle || originalBook.title);
                        }
                      }}
                      disabled={removeBookMutation.isPending}
                      className="h-8 w-8 p-0 bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-500/50"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-2">
                    Added: {new Date(book.addedAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
              <i className="fas fa-book-open text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-white mb-2">Your Library is Empty</h3>
              <p className="text-gray-300 mb-6">
                Start building your personal library by adding books from our suggested reading list or course textbooks.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => window.location.href = '/book-suggestions'}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <i className="fas fa-bookmark mr-2"></i>
                  Browse Suggested Reading
                </Button>
                <Button
                  onClick={() => window.location.href = '/textbook-catalog'}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <i className="fas fa-book mr-2"></i>
                  Browse Textbooks
                </Button>
              </div>
            </div>
          </div>
        )}


      </main>

      <Footer />

      {/* Book Removal Confirmation Dialog */}
      <AlertDialog open={!!bookToRemove} onOpenChange={() => setBookToRemove(null)}>
        <AlertDialogContent className="bg-white dark:bg-gray-800 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 dark:text-red-400 flex items-center">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Remove Book from Library
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p className="font-medium">
                  Are you sure you want to remove "{bookToRemove?.title}" from your personal library?
                </p>
                
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <div className="text-sm">
                    <p className="font-medium text-red-800 dark:text-red-300 mb-2">
                      This action will permanently:
                    </p>
                    <ul className="text-red-700 dark:text-red-400 space-y-1 text-xs">
                      <li>• Remove the book from your personal library</li>
                      <li>• Delete any bookmarks or notes associated with this book</li>
                      <li>• Cannot be undone - you'll need to re-add the book manually</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You can always re-add this book later from the Book Suggestions or Textbook Catalog pages.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setBookToRemove(null)}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveBook}
              disabled={removeBookMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {removeBookMutation.isPending ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Removing...
                </>
              ) : (
                <>
                  <i className="fas fa-trash mr-2"></i>
                  Remove Book
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}