import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Users, Clock, Star, BookOpen, Heart, Hand } from "lucide-react";

interface DiscussionPost {
  id: number;
  title: string;
  content: string;
  author: string;
  course: string;
  category: "Question" | "Prayer Request" | "Testimony" | "Study Note" | "Discussion";
  timestamp: string;
  replies: number;
  likes: number;
  isPinned?: boolean;
}

export default function DiscussionForum() {
  const { user, isAuthenticated } = useAuth();
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "Question" as const });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Discussion posts - empty initially, will be populated from database
  const [posts] = useState<DiscussionPost[]>([]);

  const categories = ["All", "Question", "Prayer Request", "Testimony", "Study Note", "Discussion"];

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Question": return <MessageCircle className="w-4 h-4" />;
      case "Prayer Request": return <Hand className="w-4 h-4" />;
      case "Testimony": return <Heart className="w-4 h-4" />;
      case "Study Note": return <BookOpen className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Question": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Prayer Request": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Testimony": return "bg-green-100 text-green-700 border-green-200";
      case "Study Note": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const handleSubmitPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    
    // This would integrate with your backend
    // TODO: Implement post submission to backend
    setNewPost({ title: "", content: "", category: "Question" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold">
                SFGM Study Circle
              </h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connect, Learn, and Grow Together in God's Word
            </p>
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>Ask Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Share Testimonies</span>
              </div>
              <div className="flex items-center gap-2">
                <Hand className="w-5 h-5" />
                <span>Prayer Requests</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-slate-900">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full justify-start gap-2 ${
                      selectedCategory === category 
                        ? "bg-primary text-white" 
                        : "hover:bg-slate-100"
                    }`}
                  >
                    {getCategoryIcon(category)}
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="mt-6 shadow-lg border-0 bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Active Students</span>
                  <span className="font-bold">127</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions Answered</span>
                  <span className="font-bold">1,243</span>
                </div>
                <div className="flex justify-between">
                  <span>Prayer Requests</span>
                  <span className="font-bold">89</span>
                </div>
                <div className="flex justify-between">
                  <span>Testimonies Shared</span>
                  <span className="font-bold">156</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Create New Post */}
            {isAuthenticated && (
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Share with the Community
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your post title..."
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="flex-1"
                    />
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value as any})}
                      className="px-3 py-2 border border-gray-300 rounded-md bg-white"
                    >
                      <option value="Question">Question</option>
                      <option value="Prayer Request">Prayer Request</option>
                      <option value="Testimony">Testimony</option>
                      <option value="Study Note">Study Note</option>
                      <option value="Discussion">Discussion</option>
                    </select>
                  </div>
                  <Textarea
                    placeholder="Share your thoughts, questions, or prayer requests..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows={4}
                  />
                  <Button onClick={handleSubmitPost} className="w-full bg-primary hover:bg-primary/90">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Share with Community
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Discussion Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className={`shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow ${post.isPinned ? 'ring-2 ring-yellow-400' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {post.isPinned && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                          <Badge className={`${getCategoryColor(post.category)} font-medium`}>
                            {getCategoryIcon(post.category)}
                            <span className="ml-1">{post.category}</span>
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {post.course}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-slate-900 hover:text-primary cursor-pointer">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                          <span className="font-medium">{post.author}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <div className="flex gap-4">
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-primary">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.replies} replies
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        Join Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center py-6">
              <Button variant="outline" className="px-8">
                Load More Discussions
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}