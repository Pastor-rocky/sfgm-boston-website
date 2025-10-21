import { useMemo, useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Eye, MessageCircle } from "lucide-react";

export default function CrossCarriersBlog() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const blogPosts = [
    {
      id: 1,
      title: "Why Does God Allow Suffering? A Biblical Perspective",
      date: "July 25, 2025",
      author: "Deacon Robert",
      category: "Tough Questions",
      excerpt: "One of the most challenging questions believers face: If God is good and all-powerful, why does He allow suffering? Deacon Robert addresses this difficult topic with biblical wisdom and practical insights.",
      content: "This is one of the oldest questions in human history. In this video, we explore what Scripture says about suffering, God's sovereignty, and how we can find hope in the midst of trials...",
      readTime: "12 min video",
      views: 542,
      comments: 28,
      featured: true,
      videoUrl: "https://youtube.com/watch?v=example1",
      isVideo: true
    },
    {
      id: 2,
      title: "Can Christians Lose Their Salvation? Eternal Security Explained",
      date: "July 22, 2025",
      author: "Youth Ministry Staff",
      category: "Tough Questions",
      excerpt: "A question that troubles many believers: Can you lose your salvation once you're saved? Our youth ministry staff examines what Scripture teaches about eternal security and the perseverance of the saints.",
      content: "This theological question has divided Christians for centuries. In this video, we dive deep into biblical passages that address salvation security...",
      readTime: "15 min video",
      views: 387,
      comments: 19,
      featured: false,
      videoUrl: "https://youtube.com/watch?v=example2",
      isVideo: true
    },
    {
      id: 3,
      title: "How Should Christians Handle Politics and Government?",
      date: "July 19, 2025",
      author: "Deacon Robert",
      category: "Tough Questions",
      excerpt: "In today's polarized political climate, how should Christians engage with politics? Deacon Robert addresses this sensitive topic with biblical balance and practical wisdom.",
      content: "Politics can be divisive, even in the church. This video explores what the Bible teaches about our relationship with government and political engagement...",
      readTime: "18 min video",
      views: 298,
      comments: 22,
      featured: false,
      videoUrl: "https://youtube.com/watch?v=example3",
      isVideo: true
    },
    {
      id: 4,
      title: "The Power of Surrender: Letting Go to Gain Everything",
      date: "July 16, 2025",
      author: "Pastor Rocky",
      category: "Spiritual Growth",
      excerpt: "True cross carrying begins with surrender. When we let go of our plans, desires, and control, we open ourselves to receive God's best for our lives.",
      content: "Matthew 16:25 tells us that whoever wants to save their life will lose it, but whoever loses their life for Jesus will find it. This paradox is at the heart of cross carrying...",
      readTime: "4 min read",
      views: 256,
      comments: 9,
      featured: false
    },
    {
      id: 5,
      title: "Building Kingdom Community: Unity in the Body",
      date: "July 13, 2025",
      author: "Pastor Rocky",
      category: "Community",
      excerpt: "Cross carriers don't walk alone. We're part of a greater community, the body of Christ. Learn how to build authentic relationships that reflect God's love and support one another in the journey.",
      content: "Ecclesiastes 4:12 reminds us that a cord of three strands is not quickly broken. As cross carriers, we need community - fellow believers who will encourage us, challenge us, and walk alongside us...",
      readTime: "5 min read",
      views: 223,
      comments: 11,
      featured: false
    },
    {
      id: 6,
      title: "Walking in Faith When You Can't See the Path",
      date: "July 10, 2025",
      author: "Pastor Rocky",
      category: "Faith",
      excerpt: "Sometimes the path ahead is unclear, and we must walk by faith, not by sight. Discover how to trust God's leading even when you can't see where He's taking you.",
      content: "Proverbs 3:5-6 instructs us to trust in the Lord with all our heart and lean not on our own understanding. As cross carriers, we often find ourselves in seasons where the way forward isn't clear...",
      readTime: "4 min read",
      views: 189,
      comments: 7,
      featured: false
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Tough Questions': 'bg-red-500',
      'Biblical Answers': 'bg-blue-500',
      'Life Issues': 'bg-green-500',
      'Theology': 'bg-purple-500',
      'Relationships': 'bg-amber-500',
      'Spiritual Warfare': 'bg-indigo-500',
      'End Times': 'bg-pink-500',
      'Christian Living': 'bg-teal-500'
    };
    return colors[category] || 'bg-slate-500';
  };

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    blogPosts.forEach(p => p.category && set.add(p.category));
    return Array.from(set);
  }, [blogPosts]);

  const normalized = (v: string) => v.toLowerCase();
  const matchesSearch = (post: any) => {
    if (!search.trim()) return true;
    const q = normalized(search);
    return [post.title, post.author, post.category, post.excerpt]
      .filter(Boolean)
      .some((s: string) => normalized(s).includes(q));
  };

  const matchesCategory = (post: any) => selectedCategory === "All" || post.category === selectedCategory;

  const featuredPosts = blogPosts
    .filter((p) => p.featured)
    .filter(matchesCategory)
    .filter(matchesSearch);

  const otherPosts = blogPosts
    .filter((p) => !p.featured)
    .filter(matchesCategory)
    .filter(matchesSearch);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back to Home Link */}
        <div className="mb-6">
          <a 
            href="/" 
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center w-fit backdrop-blur-sm border border-white/20"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Main Page
          </a>
        </div>
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-gradient-to-r from-red-400 via-amber-400 to-purple-400 bg-clip-text drop-shadow-2xl mb-6 tracking-wide">
              <i className="fas fa-video mr-6 text-red-500 drop-shadow-lg"></i>
              CROSS CARRIERS
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4 tracking-wider">
              📹 VIDEO BLOG
            </h2>
            <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 via-amber-600/20 to-purple-600/20 blur-xl rounded-full"></div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="https://youtube.com/@sfgmboston" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <i className="fab fa-youtube mr-2"></i>
              Subscribe on YouTube
            </a>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              <i className="fas fa-question-circle mr-2"></i>
              Submit Your Question
            </button>
          </div>
          {/* Controls */}
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              <div className="md:col-span-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, author, or topic..."
                  className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-white border-amber-400'
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Blog Information Card */}
        <div className="text-center mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-3xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-white text-lg font-semibold mb-4">
                <i className="fas fa-play-circle mr-2 text-red-400"></i>
                About Cross Carriers Video Blog
              </h3>
              <p className="text-gray-300 mb-4">
                This video blog is dedicated to answering tough questions that believers face in their daily walk with Christ. 
                Deacon Robert and our youth ministry staff address challenging topics with biblical wisdom, providing clear guidance for complex life situations, 
                spiritual struggles, and faith-based decision making.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <i className="fas fa-question-circle text-2xl text-blue-400 mb-2"></i>
                  <p className="text-sm text-gray-300">Tough Questions</p>
                </div>
                <div className="text-center">
                  <i className="fas fa-bible text-2xl text-amber-400 mb-2"></i>
                  <p className="text-sm text-gray-300">Biblical Answers</p>
                </div>
                <div className="text-center">
                  <i className="fas fa-video text-2xl text-red-400 mb-2"></i>
                  <p className="text-sm text-gray-300">Video Format</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <a 
                  href="tel:617-512-7451"
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  <i className="fas fa-phone mr-2"></i>
                  617-512-7451
                </a>
                <a 
                  href="mailto:pastor_rocky@sfgmboston.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  pastor_rocky@sfgmboston.com
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Post */}
        {featuredPosts.map((post) => (
          <div key={post.id} className="mb-12">
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/30 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-amber-500 text-white border-0">
                    <i className="fas fa-star mr-1"></i>
                    Featured Post
                  </Badge>
                  <Badge className={`${getCategoryColor(post.category)} text-white border-0`}>
                    {post.category}
                  </Badge>
                </div>
                <CardTitle className="text-white text-2xl md:text-3xl mb-2">
                  {post.title}
                </CardTitle>
                <div className="flex items-center text-gray-300 text-sm gap-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{post.views} views</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                  {post.isVideo && post.videoUrl ? (
                    <a
                      href={post.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <i className="fas fa-play mr-2"></i>
                      Watch Video
                    </a>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {otherPosts.map((post) => (
            <Card key={post.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getCategoryColor(post.category)} text-white border-0 text-xs`}>
                    {post.category}
                  </Badge>
                  <span className="text-gray-400 text-xs">{post.readTime}</span>
                </div>
                <CardTitle className="text-white text-lg leading-tight mb-2">
                  {post.title}
                </CardTitle>
                <div className="flex items-center text-gray-400 text-sm gap-3">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3 text-gray-400 text-xs">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  
                  {post.isVideo && post.videoUrl ? (
                    <a
                      href={post.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                    >
                      <i className="fas fa-play mr-1"></i>
                      Watch
                    </a>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscription and Interaction */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-red-900/50 to-purple-900/50 backdrop-blur-sm border-red-500/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-white text-2xl font-bold mb-4">
                <i className="fab fa-youtube mr-2 text-red-400"></i>
                Subscribe to Our YouTube Channel
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Never miss our latest videos with Deacon Robert and our youth ministry staff answering tough biblical questions. Subscribe to our YouTube channel 
                and submit your own questions to be featured in upcoming videos. Join a community seeking deeper understanding of God's Word.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                <a 
                  href="https://youtube.com/@sfgmboston" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
                >
                  <i className="fab fa-youtube mr-2"></i>
                  Subscribe on YouTube
                </a>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  <i className="fas fa-question-circle mr-2"></i>
                  Submit Your Question
                </button>
                <a 
                  href="/bible-school"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Join Bible School
                </a>
              </div>
              <div className="border-t border-white/20 pt-4">
                <p className="text-gray-400 text-sm mb-2">Have a tough question that needs biblical answers? Your question could be featured in our next YouTube video!</p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <a 
                    href="tel:617-512-7451"
                    className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Call 617-512-7451
                  </a>
                  <a 
                    href="mailto:pastor_rocky@sfgmboston.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Email Your Question
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}