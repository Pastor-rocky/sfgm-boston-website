import { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function BibleStudyTools() {
  const [inputs, setInputs] = useState({
    word: "",
    passage: "",
    verse: "",
    keyword: ""
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [points, setPoints] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("research");
  const [prayerEntry, setPrayerEntry] = useState("");
  const [readingPlanProgress, setReadingPlanProgress] = useState(25);
  const [studyNotes, setStudyNotes] = useState("");
  const [favoriteVerses, setFavoriteVerses] = useState<string[]>([]);
  const { toast } = useToast();

  // Sample data for new features
  const bibleReadingPlans = [
    { id: 1, name: "New Testament in 90 Days", duration: "90 days", progress: 25, description: "Read through the entire New Testament in 90 days with daily readings and reflections", difficulty: "Intermediate" },
    { id: 2, name: "Psalms & Proverbs", duration: "60 days", progress: 45, description: "Daily wisdom from Psalms and Proverbs with guided study questions", difficulty: "Beginner" },
    { id: 3, name: "Genesis to Revelation", duration: "365 days", progress: 15, description: "Complete Bible reading plan covering every book in one year", difficulty: "Advanced" },
    { id: 4, name: "Gospels Deep Dive", duration: "30 days", progress: 80, description: "Study Matthew, Mark, Luke, and John with historical context", difficulty: "Intermediate" }
  ];

  const studyGuides = [
    { title: "How to Study the Bible Effectively", topics: ["Observation", "Interpretation", "Application"], difficulty: "Beginner" },
    { title: "Understanding Biblical Genres", topics: ["Historical", "Poetry", "Prophecy", "Wisdom"], difficulty: "Intermediate" },
    { title: "Cross-Reference Study Method", topics: ["Word Studies", "Theological Themes", "Parallel Passages"], difficulty: "Advanced" },
    { title: "Inductive Bible Study", topics: ["Observation", "Interpretation", "Application", "Correlation"], difficulty: "Intermediate" }
  ];

  const dailyVerses = [
    { verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", reference: "John 3:16", theme: "Salvation" },
    { verse: "I can do all this through him who gives me strength.", reference: "Philippians 4:13", theme: "Strength" },
    { verse: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5", theme: "Trust" }
  ];

  const [selectedVerse, setSelectedVerse] = useState(dailyVerses[0]);

  useEffect(() => {
    refreshPoints();
    // Rotate daily verse every 10 seconds
    const interval = setInterval(() => {
      setSelectedVerse(prev => {
        const currentIndex = dailyVerses.findIndex(v => v.reference === prev.reference);
        return dailyVerses[(currentIndex + 1) % dailyVerses.length];
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const awardPoints = async (action: string) => {
    try {
      const res = await apiRequest('POST', '/api/points/award', { action });
      const data = await res.json();
      if (data?.points !== undefined) setPoints(data.points);
    } catch {}
  };

  const refreshPoints = async () => {
    try {
      const res = await apiRequest('GET', '/api/points/session');
      const data = await res.json();
      if (data?.points !== undefined) setPoints(data.points);
    } catch {}
  };

  const performAnalysis = async (type: string, endpoint: string, bodyField: string, award: string) => {
    const inputValue = inputs[bodyField as keyof typeof inputs];
    if (!inputValue.trim()) {
      toast({ 
        title: "Error", 
        description: `Please enter a ${bodyField} to analyze`,
        variant: "destructive" 
      });
      return;
    }
    setLoading(true);
    try {
      const response = await apiRequest(
        "POST",
        endpoint,
        { [bodyField]: inputValue.trim() }
      );
      const data = await response.json();
      setResults({ type, data });
      await awardPoints(award);
      toast({ title: "Success", description: "Analysis completed! Points awarded." });
    } catch (error) {
      console.error('Bible Study Analysis Error:', error);
      const errorMessage = error instanceof Error ? error.message : "Analysis failed. Please try again.";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const savePrayerEntry = () => {
    if (!prayerEntry.trim()) {
      toast({ title: "Error", description: "Please enter a prayer before saving", variant: "destructive" });
      return;
    }
    // In a real app, this would save to a database
    toast({ title: "Prayer Saved", description: "Your prayer has been saved to your journal" });
    setPrayerEntry("");
  };

  const addToFavorites = (verse: string) => {
    if (!favoriteVerses.includes(verse)) {
      setFavoriteVerses([...favoriteVerses, verse]);
      toast({ title: "Added to Favorites", description: "Verse added to your favorites" });
    }
  };

  const renderGreekSearch = (data: any) => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
          <i className="fas fa-language mr-2"></i>
          Greek Word Analysis: {data.word}
        </h3>
        {data.strongsNumber && (
          <p className="text-lg font-semibold text-blue-700 mb-2">
            Strong's Number: {data.strongsNumber}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Greek Transliteration:</strong> {data.transliteration}</p>
            <p><strong>Pronunciation:</strong> {data.pronunciation}</p>
            <p><strong>Definition:</strong> {data.definition}</p>
          </div>
          <div>
            {data.gematria && (
              <>
                <p><strong>Gematria Value:</strong> {data.gematria}</p>
                <p><strong>Numerical Meaning:</strong> {data.numericalMeaning}</p>
              </>
            )}
          </div>
        </div>
        {data.usage && (
          <div className="mt-4">
            <h4 className="font-bold text-blue-800 mb-2">Biblical Usage:</h4>
            <p>{data.usage}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderHistoricalContext = (data: any) => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-500">
        <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
          <i className="fas fa-landmark mr-2"></i>
          Historical Context: {data.passage}
        </h3>
        <div className="space-y-4">
          {data.historicalBackground && (
            <div>
              <h4 className="font-bold text-green-800 mb-2">Historical Background:</h4>
              <p>{data.historicalBackground}</p>
            </div>
          )}
          {data.culturalContext && (
            <div>
              <h4 className="font-bold text-green-800 mb-2">Cultural Context:</h4>
              <p>{data.culturalContext}</p>
            </div>
          )}
          {data.authorInfo && (
            <div>
              <h4 className="font-bold text-green-800 mb-2">Author Information:</h4>
              <p>{data.authorInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommentary = (data: any) => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-lg border-l-4 border-purple-500">
        <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center">
          <i className="fas fa-book mr-2"></i>
          Commentary: {data.verse}
        </h3>
        <div className="space-y-4">
          {data.interpretation && (
            <div>
              <h4 className="font-bold text-purple-800 mb-2">Interpretation:</h4>
              <p>{data.interpretation}</p>
            </div>
          )}
          {data.application && (
            <div>
              <h4 className="font-bold text-purple-800 mb-2">Application:</h4>
              <p>{data.application}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCrossReferences = (data: any) => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-orange-500">
        <h3 className="text-2xl font-bold text-orange-900 mb-4 flex items-center">
          <i className="fas fa-link mr-2"></i>
          Cross References: {data.verse}
        </h3>
        <div className="space-y-4">
          {data.parallelPassages && data.parallelPassages.length > 0 && (
            <div>
              <h4 className="font-bold text-orange-800 mb-2">Parallel Passages:</h4>
              <ul className="list-disc list-inside space-y-1">
                {data.parallelPassages.map((passage: string, index: number) => (
                  <li key={index} className="cursor-pointer hover:text-orange-700" 
                      onClick={() => addToFavorites(passage)}>
                    {passage}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.theologicalThemes && (
            <div>
              <h4 className="font-bold text-orange-800 mb-2">Theological Themes:</h4>
              <p>{data.theologicalThemes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderConcordance = (data: any) => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border-l-4 border-teal-500">
        <h3 className="text-2xl font-bold text-teal-900 mb-4 flex items-center">
          <i className="fas fa-search mr-2"></i>
          Concordance Results: {data.keyword}
        </h3>
        <div className="space-y-4">
          {data.references && data.references.length > 0 && (
            <div>
              <h4 className="font-bold text-teal-800 mb-2">Scripture References:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {data.references.map((ref: string, index: number) => (
                  <div key={index} className="p-2 bg-white rounded border cursor-pointer hover:bg-teal-50"
                       onClick={() => addToFavorites(ref)}>
                    {ref}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!results) return null;

    switch (results.type) {
      case 'greek_hebrew':
        return renderGreekSearch(results.data);
      case 'historical':
        return renderHistoricalContext(results.data);
      case 'commentary':
        return renderCommentary(results.data);
      case 'cross_references':
        return renderCrossReferences(results.data);
      case 'concordance':
        return renderConcordance(results.data);
      default:
        return <div className="text-gray-900">Results loaded successfully!</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-pulse">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                <i className="fas fa-bible mr-4 text-yellow-300"></i>
                Bible Study Tools
              </h1>
            </div>
            
            {/* Daily Verse Display */}
            <div className="max-w-4xl mx-auto mb-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-white">
                    <div className="flex items-center justify-center mb-4">
                      <i className="fas fa-quote-left text-yellow-300 text-2xl mr-3"></i>
                      <Badge variant="secondary" className="bg-yellow-300 text-yellow-900">
                        Daily Verse
                      </Badge>
                    </div>
                    <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed mb-4">
                      "{selectedVerse.verse}"
                    </blockquote>
                    <footer className="flex items-center justify-between">
                      <cite className="text-yellow-200 font-medium text-lg">{selectedVerse.reference}</cite>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-yellow-300 text-yellow-200">
                          {selectedVerse.theme}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-yellow-300 hover:text-yellow-200"
                          onClick={() => addToFavorites(selectedVerse.verse)}
                        >
                          <i className="fas fa-heart"></i>
                        </Button>
                      </div>
                    </footer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Scripture Quote */}
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-xl text-blue-100 italic leading-relaxed mb-4">
                "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, 
                rightly dividing the word of truth."
              </blockquote>
              <cite className="text-blue-300 font-medium">2 Timothy 2:15 NLT</cite>
            </div>
            
            {/* Description */}
            <div className="max-w-3xl mx-auto mt-8">
              <p className="text-lg text-gray-900 leading-relaxed mb-6 font-medium">
                Dive deep into God's Word with powerful biblical research tools. Explore Greek and Hebrew origins, 
                discover historical contexts, and gain biblical insights powered by comprehensive online resources.
              </p>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="flex items-center justify-center space-x-2 text-white">
                  <i className="fas fa-language text-2xl text-yellow-300"></i>
                  <span className="font-medium">Greek & Hebrew</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white">
                  <i className="fas fa-history text-2xl text-yellow-300"></i>
                  <span className="font-medium">Historical Context</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-white">
                  <i className="fas fa-link text-2xl text-yellow-300"></i>
                  <span className="font-medium">Cross References</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-lg">
            <TabsTrigger value="research" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <i className="fas fa-search mr-2"></i>Research
            </TabsTrigger>
            <TabsTrigger value="reading" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <i className="fas fa-book-open mr-2"></i>Reading Plans
            </TabsTrigger>
            <TabsTrigger value="guides" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <i className="fas fa-compass mr-2"></i>Study Guides
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <i className="fas fa-globe mr-2"></i>Resources
            </TabsTrigger>
            <TabsTrigger value="prayer" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              <i className="fas fa-praying-hands mr-2"></i>Prayer Journal
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <i className="fas fa-heart mr-2"></i>Favorites
            </TabsTrigger>
          </TabsList>

          {/* Research Tools Tab */}
          <TabsContent value="research" className="space-y-8">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <i className="fas fa-tools mr-3"></i>
                    Biblical Research Tools
                  </CardTitle>
                  <button 
                    onClick={refreshPoints}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  >
                    <i className="fas fa-coins text-yellow-300"></i>
                    <span className="font-medium">Session Points: {points}</span>
                  </button>
                </div>
              </CardHeader>
              <CardContent className="text-gray-900 space-y-6 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-900 font-medium text-lg">Greek/Hebrew Word</Label>
                      <Input
                        value={inputs.word}
                        onChange={(e) => handleInputChange('word', e.target.value)}
                        placeholder="e.g., love / agape / ahab"
                        className="mt-2 bg-gray-50 border-2 border-gray-200 focus:border-blue-500 text-gray-900"
                      />
                      <div className="mt-3 flex gap-2">
                        <Button 
                          disabled={loading} 
                          onClick={() => performAnalysis('greek_hebrew', '/api/bible/greek-hebrew', 'word', 'ai_greek_hebrew')}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-language'} mr-2`}></i>
                          Analyze Word
                        </Button>
                        <Button 
                          variant="outline" 
                          disabled={loading} 
                          onClick={() => performAnalysis('concordance', '/api/bible/concordance', 'keyword', 'ai_concordance')}
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-search'} mr-2`}></i>
                          Concordance
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-900 font-medium text-lg">Passage (Historical Context)</Label>
                      <Input
                        value={inputs.passage}
                        onChange={(e) => handleInputChange('passage', e.target.value)}
                        placeholder="e.g., John 3:16"
                        className="mt-2 bg-gray-50 border-2 border-gray-200 focus:border-green-500 text-gray-900"
                      />
                      <div className="mt-3">
                        <Button 
                          disabled={loading} 
                          onClick={() => performAnalysis('historical', '/api/bible/historical-context', 'passage', 'ai_historical')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-landmark'} mr-2`}></i>
                          Historical Context
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-900 font-medium text-lg">Verse (Cross References)</Label>
                      <Input
                        value={inputs.verse}
                        onChange={(e) => handleInputChange('verse', e.target.value)}
                        placeholder="e.g., John 3:16"
                        className="mt-2 bg-gray-50 border-2 border-gray-200 focus:border-purple-500 text-gray-900"
                      />
                      <div className="mt-3 flex gap-2">
                        <Button 
                          disabled={loading} 
                          onClick={() => performAnalysis('commentary', '/api/bible/commentary', 'verse', 'ai_commentary')}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-book'} mr-2`}></i>
                          Commentary
                        </Button>
                        <Button 
                          variant="outline" 
                          disabled={loading} 
                          onClick={() => performAnalysis('cross_references', '/api/bible/cross-references', 'verse', 'ai_cross_refs')}
                          className="border-orange-600 text-orange-600 hover:bg-orange-50"
                        >
                          <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-link'} mr-2`}></i>
                          Cross References
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Study Notes Section */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <Label className="text-gray-900 font-medium text-lg mb-3 block">
                    <i className="fas fa-sticky-note mr-2"></i>
                    Study Notes
                  </Label>
                  <Textarea
                    value={studyNotes}
                    onChange={(e) => setStudyNotes(e.target.value)}
                    placeholder="Record your insights, questions, and reflections here..."
                    className="bg-white border-2 border-gray-200 focus:border-blue-500 text-gray-900 min-h-[120px]"
                  />
                  <Button 
                    onClick={() => {
                      toast({ title: "Notes Saved", description: "Your study notes have been saved" });
                    }}
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <i className="fas fa-save mr-2"></i>
                    Save Notes
                  </Button>
                </div>

                {/* Results Section */}
                {loading && (
                  <div className="text-center py-8">
                    <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p className="text-gray-900 font-medium">Analyzing Scripture...</p>
                  </div>
                )}

                {results && !loading && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <i className="fas fa-lightbulb mr-2 text-yellow-500"></i>
                      Analysis Results
                    </h3>
                    {renderResults()}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reading Plans Tab */}
          <TabsContent value="reading" className="space-y-6">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <i className="fas fa-book-open mr-3"></i>
                  Bible Reading Plans
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bibleReadingPlans.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className="border-2 border-gray-200 hover:border-green-500 transition-all duration-200 hover:shadow-lg cursor-pointer hover:scale-105"
                      onClick={() => {
                        if (plan.name === "New Testament in 90 Days") {
                          window.open('https://www.bible.com/reading-plans/40-new-testament-in-90-days', '_blank');
                        } else if (plan.name === "Psalms & Proverbs") {
                          window.open('https://www.bible.com/reading-plans/3-psalms-proverbs', '_blank');
                        } else if (plan.name === "Genesis to Revelation") {
                          window.open('https://www.bible.com/reading-plans/1-bible-in-one-year', '_blank');
                        } else if (plan.name === "Gospels Deep Dive") {
                          window.open('https://www.bible.com/reading-plans/9-gospels-in-30-days', '_blank');
                        }
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl text-gray-900 flex items-center justify-between">
                          <span>{plan.name}</span>
                          <Badge variant="outline" className="border-green-500 text-green-600">
                            {plan.difficulty || 'Beginner'}
                          </Badge>
                        </CardTitle>
                        <p className="text-gray-600">{plan.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-900 font-medium">Progress</span>
                            <span className="text-gray-900 font-medium">{plan.progress}%</span>
                          </div>
                          <Progress value={plan.progress} className="h-3" />
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm">Duration: {plan.duration}</span>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => {
                                if (plan.name === "New Testament in 90 Days") {
                                  window.open('https://www.bible.com/reading-plans/40-new-testament-in-90-days', '_blank');
                                } else if (plan.name === "Psalms & Proverbs") {
                                  window.open('https://www.bible.com/reading-plans/3-psalms-proverbs', '_blank');
                                } else if (plan.name === "Genesis to Revelation") {
                                  window.open('https://www.bible.com/reading-plans/1-bible-in-one-year', '_blank');
                                } else if (plan.name === "Gospels Deep Dive") {
                                  window.open('https://www.bible.com/reading-plans/9-gospels-in-30-days', '_blank');
                                }
                              }}
                            >
                              <i className="fas fa-external-link-alt mr-2"></i>
                              Start Plan
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <i className="fas fa-compass mr-3"></i>
                  Study Guides
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {studyGuides.map((guide, index) => (
                    <Card 
                      key={index} 
                      className="border-2 border-gray-200 hover:border-purple-500 transition-all duration-200 hover:shadow-lg cursor-pointer hover:scale-105"
                      onClick={() => {
                        if (guide.title === "How to Study the Bible Effectively") {
                          window.open('https://www.biblestudy.org/beginner/bible-study-methods.html', '_blank');
                        } else if (guide.title === "Understanding Biblical Genres") {
                          window.open('https://www.biblestudy.org/beginner/biblical-genres.html', '_blank');
                        } else if (guide.title === "Cross-Reference Study Method") {
                          window.open('https://www.blueletterbible.org/study/parallel/index.cfm', '_blank');
                        } else if (guide.title === "Inductive Bible Study") {
                          window.open('https://www.biblestudy.org/beginner/inductive-study.html', '_blank');
                        }
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl text-gray-900 flex items-center justify-between">
                          <span>{guide.title}</span>
                          <Badge 
                            variant="outline" 
                            className={`${
                              guide.difficulty === 'Beginner' ? 'border-green-500 text-green-600' :
                              guide.difficulty === 'Intermediate' ? 'border-yellow-500 text-yellow-600' :
                              'border-red-500 text-red-600'
                            }`}
                          >
                            {guide.difficulty}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-gray-900 font-medium mb-2">Topics Covered:</h4>
                            <div className="flex flex-wrap gap-2">
                              {guide.topics.map((topic, topicIndex) => (
                                <Badge key={topicIndex} variant="secondary" className="bg-purple-100 text-purple-800">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => {
                              if (guide.title === "How to Study the Bible Effectively") {
                                window.open('https://www.biblestudy.org/beginner/bible-study-methods.html', '_blank');
                              } else if (guide.title === "Understanding Biblical Genres") {
                                window.open('https://www.biblestudy.org/beginner/biblical-genres.html', '_blank');
                              } else if (guide.title === "Cross-Reference Study Method") {
                                window.open('https://www.blueletterbible.org/study/parallel/index.cfm', '_blank');
                              } else if (guide.title === "Inductive Bible Study") {
                                window.open('https://www.biblestudy.org/beginner/inductive-study.html', '_blank');
                              }
                            }}
                          >
                            <i className="fas fa-arrow-right mr-2"></i>
                            Start Guide
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <i className="fas fa-globe mr-3"></i>
                  Study Resources & Websites
                </CardTitle>
                <p className="text-indigo-100 mt-2">Curated collection of trusted biblical study websites and tools</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Sermon Illustrations */}
                  <Card className="border-2 border-blue-200 hover:border-blue-500 transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        <i className="fas fa-lightbulb text-blue-600 mr-2"></i>
                        Sermon Illustrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-3">
                        Find illustrations by clicking the first letter of your word. Perfect for sermon preparation and teaching.
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">
                          <strong>Usage:</strong> Click on the first letter of your illustrated word
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Example:</strong> For "love" stories, click "L"
                        </p>
                      </div>
                      <Button 
                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => window.open('https://www.sermonillustrations.com', '_blank')}
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Sermon Central */}
                  <Card className="border-2 border-green-200 hover:border-green-500 transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        <i className="fas fa-church text-green-600 mr-2"></i>
                        Sermon Central
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-3">
                        Extensive collection of sermon illustrations. Search by keyword for relevant stories and examples.
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">
                          <strong>Usage:</strong> Click Illustrations, then type your keyword
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Features:</strong> Keyword search, categorized content
                        </p>
                      </div>
                      <Button 
                        className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => window.open('https://www.sermoncentral.com', '_blank')}
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Bible Study.org */}
                  <Card className="border-2 border-purple-200 hover:border-purple-500 transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        <i className="fas fa-book-bible text-purple-600 mr-2"></i>
                        Bible Study.org
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-3">
                        Complete online reference books including "What Do Numbers Mean?" and other helpful resources.
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">
                          <strong>Usage:</strong> Click Bible Reference Books
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Features:</strong> Complete books online, number meanings
                        </p>
                      </div>
                      <Button 
                        className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => window.open('https://www.biblestudy.org', '_blank')}
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Blue Letter Bible */}
                  <Card className="border-2 border-red-200 hover:border-red-500 transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="bg-red-50">
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        <i className="fas fa-mobile-alt text-red-600 mr-2"></i>
                        Blue Letter Bible
                        <Badge className="ml-2 bg-red-100 text-red-800">Highly Recommended</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-3">
                        Comprehensive Bible study tool with Greek/Hebrew lexicons, commentaries, and more. Available as smartphone app.
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">
                          <strong>Features:</strong> Greek/Hebrew, commentaries, concordance
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Platform:</strong> Web + Mobile App
                        </p>
                      </div>
                      <Button 
                        className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => window.open('https://www.blueletterbible.org', '_blank')}
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>


                  {/* E-Sword */}
                  <Card className="border-2 border-indigo-200 hover:border-indigo-500 transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="bg-indigo-50">
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        <i className="fas fa-download text-indigo-600 mr-2"></i>
                        E-Sword
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-3">
                        Downloadable Bible software. Add commentaries, dictionaries, and Bibles. Check original languages.
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">
                          <strong>Type:</strong> Downloadable software
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Features:</strong> Commentaries, dictionaries, original languages
                        </p>
                      </div>
                      <Button 
                        className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={() => window.open('https://www.e-sword.net', '_blank')}
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Google */}
                  <Card className="border-2 border-gray-200 hover:border-gray-500 transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        <i className="fab fa-google text-gray-600 mr-2"></i>
                        Google Search
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-3">
                        Search for specific topics like "the Greek word for Jesus" to find multiple resources and definitions.
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">
                          <strong>Usage:</strong> Type in what you're looking for
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Example:</strong> "Greek word for Jesus"
                        </p>
                      </div>
                      <Button 
                        className="w-full mt-3 bg-gray-600 hover:bg-gray-700 text-white"
                        onClick={() => window.open('https://www.google.com', '_blank')}
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Wikipedia */}
                  <Card className="border-2 border-teal-200 hover:border-teal-500 transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="bg-teal-50">
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        <i className="fab fa-wikipedia-w text-teal-600 mr-2"></i>
                        Wikipedia
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-3">
                        Comprehensive encyclopedia with articles on biblical topics, historical figures, and theological concepts.
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">
                          <strong>Usage:</strong> Search for any biblical topic
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Content:</strong> Historical context, background info
                        </p>
                      </div>
                      <Button 
                        className="w-full mt-3 bg-teal-600 hover:bg-teal-700 text-white"
                        onClick={() => window.open('https://www.wikipedia.org', '_blank')}
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Dictionary.com */}
                  <Card className="border-2 border-pink-200 hover:border-pink-500 transition-all duration-200 hover:shadow-lg">
                    <CardHeader className="bg-pink-50">
                      <CardTitle className="text-lg text-gray-900 flex items-center">
                        <i className="fas fa-book text-pink-600 mr-2"></i>
                        Dictionary.com
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-3">
                        Look up definitions for any word. Helpful for understanding biblical terms and their meanings.
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">
                          <strong>Usage:</strong> Type in any word for definition
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Helpful for:</strong> Understanding biblical terms
                        </p>
                      </div>
                      <Button 
                        className="w-full mt-3 bg-pink-600 hover:bg-pink-700 text-white"
                        onClick={() => window.open('https://www.dictionary.com', '_blank')}
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Visit Site
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Access Panel */}
                <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border-2 border-indigo-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <i className="fas fa-bolt text-indigo-600 mr-2"></i>
                    Quick Access
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button 
                      variant="outline" 
                      className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                      onClick={() => window.open('https://www.blueletterbible.org', '_blank')}
                    >
                      <i className="fas fa-star mr-2"></i>
                      Blue Letter Bible
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-green-300 text-green-700 hover:bg-green-50"
                      onClick={() => window.open('https://www.sermoncentral.com', '_blank')}
                    >
                      <i className="fas fa-church mr-2"></i>
                      Sermon Central
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-purple-300 text-purple-700 hover:bg-purple-50"
                      onClick={() => window.open('https://www.biblestudy.org', '_blank')}
                    >
                      <i className="fas fa-book-bible mr-2"></i>
                      Bible Study.org
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                      onClick={() => window.open('https://www.e-sword.net', '_blank')}
                    >
                      <i className="fas fa-download mr-2"></i>
                      E-Sword
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prayer Journal Tab */}
          <TabsContent value="prayer" className="space-y-6">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <i className="fas fa-praying-hands mr-3"></i>
                  Prayer Journal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                    <Label className="text-gray-900 font-medium text-lg mb-3 block">
                      <i className="fas fa-pen mr-2"></i>
                      Today's Prayer
                    </Label>
                    <Textarea
                      value={prayerEntry}
                      onChange={(e) => setPrayerEntry(e.target.value)}
                      placeholder="Share your heart with God... write your prayer, thanksgiving, or requests here..."
                      className="bg-white border-2 border-gray-200 focus:border-orange-500 text-gray-900 min-h-[200px]"
                    />
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-gray-600 text-sm">
                        {prayerEntry.length} characters
                      </span>
                      <Button 
                        onClick={savePrayerEntry}
                        className="bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <i className="fas fa-save mr-2"></i>
                        Save Prayer
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-2 border-orange-200 bg-orange-50">
                      <CardContent className="p-4 text-center">
                        <i className="fas fa-calendar-day text-3xl text-orange-600 mb-2"></i>
                        <h3 className="font-bold text-gray-900">Daily Prayers</h3>
                        <p className="text-2xl font-bold text-orange-600">7</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-green-200 bg-green-50">
                      <CardContent className="p-4 text-center">
                        <i className="fas fa-check-circle text-3xl text-green-600 mb-2"></i>
                        <h3 className="font-bold text-gray-900">Answered</h3>
                        <p className="text-2xl font-bold text-green-600">3</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-blue-200 bg-blue-50">
                      <CardContent className="p-4 text-center">
                        <i className="fas fa-clock text-3xl text-blue-600 mb-2"></i>
                        <h3 className="font-bold text-gray-900">This Week</h3>
                        <p className="text-2xl font-bold text-blue-600">12</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <i className="fas fa-heart mr-3"></i>
                  Favorite Verses
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {favoriteVerses.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="fas fa-heart text-6xl text-gray-300 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Favorites Yet</h3>
                    <p className="text-gray-600">Start exploring Scripture and add verses to your favorites!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favoriteVerses.map((verse, index) => (
                      <Card key={index} className="border-2 border-red-200 bg-red-50">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-gray-900 font-medium leading-relaxed mb-2">
                                "{verse}"
                              </p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setFavoriteVerses(favoriteVerses.filter((_, i) => i !== index))}
                              className="text-red-600 hover:text-red-700"
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}