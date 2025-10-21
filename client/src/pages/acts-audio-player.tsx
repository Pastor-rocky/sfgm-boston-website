import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  SectionHeading,
  BlueSection,
  GreenSection,
  PurpleSection,
  YellowSection,
  BulletList,
  BulletItem,
  HighlightText
} from '@/components/audio-player-text-template';

const ActsAudioPlayer: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('audio_progress_acts_intro');
    if (saved) {
      setCurrentTime(parseFloat(saved));
    }
  }, []);


  // Jonah-style handlers
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSkip = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(Math.max(0, audio.currentTime + delta), duration || audio.duration || 0);
    audio.currentTime = next;
    setCurrentTime(next);
  };

  // Audio controls
  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value[0];
    setVolume(value[0]);
  };

  // Persist progress (optional)
  const saveProgress = () => {
    localStorage.setItem('audio_progress_acts_intro', currentTime.toString());
    toast({ title: 'Progress Saved', description: 'Your listening progress has been saved.' });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setLocation('/course/1')}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
            <h1 className="text-xl font-bold text-white">Acts in Action Audio Player</h1>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Audio Player */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-4">
            {/* Cover + Titles (Jonah-style header inside player) */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/acts-in-action-cover.png"
                alt="Acts in Action Cover"
                className="w-24 h-auto rounded shadow-sm flex-shrink-0"
              />
              <div>
                <h3 className="text-white text-2xl font-bold">🎶 Acts in Action</h3>
                <p className="text-white/90 text-xl font-semibold">Intro 🎬</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Button onClick={() => handleSkip(-15)} variant="ghost" className="text-white hover:bg-white/10" size="sm">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button onClick={handlePlayPause} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button onClick={() => handleSkip(15)} variant="ghost" className="text-white hover:bg-white/10" size="sm">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="px-2">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={([value]) => {
                    const audio = audioRef.current;
                    if (!audio) return;
                    audio.currentTime = value;
                    setCurrentTime(value);
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-white/70 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Volume2 className="h-4 w-4 text-white" />
                <Slider value={[volume]} max={1} step={0.1} onValueChange={([v]) => handleVolumeChange([v])} className="w-24" />
              </div>

              <audio
                ref={audioRef}
                src="/uploads/textbook-audio/acts-in-action-intro.mp3"
                preload="auto"
                onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Text Content */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              ACTS IN ACTION: A Leadership Study Guide
            </CardTitle>
            <p className="text-center text-purple-200 text-lg">
              "If We Do What They Did, We'll Get What They Got"
            </p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <SectionHeading>THE FIRST CHURCH SUCCESS CODE</SectionHeading>
              <BlueSection title="💡">
                <p>The promise is simple and bold: <HighlightText color="blue">"If we do what they did, we'll get what they got."</HighlightText> This book will help you understand what the early church did to receive the power of the Holy Spirit and what they achieved through that empowerment. By studying their methods, we can apply the same principles that led to their extraordinary success.</p>
                <p>This study also incorporates key leadership principles from John Maxwell, using commentary from the Maxwell Leadership Bible alongside insights from his broader leadership library. Our hope is that this book will help you grow into the servant leader God has called you to be.</p>
              </BlueSection>

              <SectionHeading>WHAT THEY GOT: THE RESULTS THAT CHANGED HISTORY</SectionHeading>
              <GreenSection title="📈">
                <p>The outcomes recorded in Acts are staggering. In a single day, three thousand people believed and were baptized (Acts 2:41). Daily growth followed and never stopped (Acts 2:47). Ordinary people operated in supernatural power and boldness (Acts 4:13). The movement spread across the known world, reaching all the way to Rome (Acts 28:31). Churches were planted in every major city (Romans 15:19). The impact outlasted persecution and opposition, even scattering believers who preached wherever they went (Acts 8:4). The bottom line is that they started with 120 people in an upper room and, by God's power, changed the world forever.</p>
              </GreenSection>

              <SectionHeading>WHAT THEY DID: THE BLUEPRINT WE CAN FOLLOW</SectionHeading>
              <PurpleSection title="📘">
                <p>The early church's success was not accidental. They followed specific principles that any church can apply today:</p>
                <BulletList>
                  <BulletItem>They prepared thoroughly before launching publicly</BulletItem>
                  <BulletItem>They operated in supernatural power rather than human strength</BulletItem>
                  <BulletItem>They maintained unity while embracing cultural and social diversity</BulletItem>
                  <BulletItem>They faced opposition with courage and wisdom</BulletItem>
                  <BulletItem>They adapted their methods while keeping their message pure</BulletItem>
                  <BulletItem>They developed leaders at every level of the organization</BulletItem>
                  <BulletItem>They multiplied disciples, not merely converts</BulletItem>
                  <BulletItem>They planted churches rather than simply growing attendance in one place</BulletItem>
                </BulletList>
              </PurpleSection>

              <SectionHeading>WHY JOHN MAXWELL?</SectionHeading>
              <YellowSection title="📚">
                <p>John C. Maxwell is recognized globally as a foremost voice on leadership development. His insights help us understand how the early church leaders operated with such effectiveness and clarity.</p>
                <p>Maxwell's contribution is extensive. He has spent more than forty years studying leadership principles and has sold more than thirty-one million books worldwide. His biblical commentary in the Maxwell Leadership Bible, paired with practical application from his broader work, offers a unique bridge between timeless truth and modern leadership practice. Maxwell often identifies principles others miss. Acts displays these principles in the most successful spiritual movement in history. Together, they provide both a biblical foundation and practical application. His approach helps us see that the early church's success followed proven leadership principles that still work. When we combine biblical truth with practical leadership wisdom, we position ourselves to experience similar results in our ministries.</p>
              </YellowSection>

              <SectionHeading>THE ACTS ADVANTAGE</SectionHeading>
              <BlueSection title="🎯">
                <p>Why study the first church? They had no advantages we do not already have. There were no church buildings or facilities, no sound systems or technology, no marketing budgets or programs, no seminary-trained staff, no denominational support, and no government backing. Yet they had the results we desperately want: explosive, sustainable growth; supernatural demonstrations of power; unity across cultural and social barriers; impact that transformed entire communities; courage under extreme persecution; and leadership development at every level. The conclusion is inescapable. <HighlightText color="blue">If they could do it with less, we can do it with more—if we follow their methods.</HighlightText></p>
              </BlueSection>

              <SectionHeading>YOUR 11-WEEK JOURNEY</SectionHeading>
              <GreenSection title="📅">
                <p>This study is designed for eleven weeks of learning and practice:</p>
                <BulletList>
                  <BulletItem>Week 1: Introduction and overview</BulletItem>
                  <BulletItem>Week 2: Preparation and Launch (Acts 1–2)</BulletItem>
                  <BulletItem>Week 3: Power and Opposition (Acts 3–5)</BulletItem>
                  <BulletItem>Week 4: Crisis and Growth (Acts 6–7)</BulletItem>
                  <BulletItem>Week 5: Expansion and Conversion (Acts 8–9)</BulletItem>
                  <BulletItem>Week 6: Breaking Barriers (Acts 10–12)</BulletItem>
                  <BulletItem>Week 7: First Missionary Journey (Acts 13–15)</BulletItem>
                  <BulletItem>Week 8: European Expansion (Acts 16–18)</BulletItem>
                  <BulletItem>Week 9: Ephesian Ministry (Acts 19–21)</BulletItem>
                  <BulletItem>Week 10: Trials and Testimony (Acts 22–26)</BulletItem>
                  <BulletItem>Week 11: Rome and Beyond (Acts 27–28)</BulletItem>
                </BulletList>
                <p>Each week includes clear applications designed to help you "do what they did" in your context.</p>
              </GreenSection>

              <SectionHeading>HOW TO USE THIS STUDY</SectionHeading>
              <PurpleSection title="🔧">
                <p>Each chapter includes:</p>
                <BulletList>
                  <BulletItem><HighlightText color="purple">What they faced</HighlightText> — the challenges and opportunities of the moment</BulletItem>
                  <BulletItem><HighlightText color="purple">What they did</HighlightText> — their specific methods and strategies</BulletItem>
                  <BulletItem><HighlightText color="purple">What they got</HighlightText> — the measurable results they achieved</BulletItem>
                  <BulletItem><HighlightText color="purple">Maxwell's insights</HighlightText> — leadership principles with book references</BulletItem>
                  <BulletItem><HighlightText color="purple">Your weekly challenge</HighlightText> — practical steps to apply their methods</BulletItem>
                  <BulletItem><HighlightText color="purple">Reflection questions</HighlightText> — for personal growth and group discussion</BulletItem>
                </BulletList>
              </PurpleSection>

              <SectionHeading>THE ACTS LEADERSHIP DNA</SectionHeading>
              <YellowSection title="⭐">
                <p>Maxwell identifies five characteristics that made the early church leaders so effective:</p>
                <BulletList>
                  <BulletItem><strong>Vision-driven:</strong> They knew exactly where they were going: "To the ends of the earth" (Acts 1:8)</BulletItem>
                  <BulletItem><strong>Spirit-empowered:</strong> They operated in supernatural power, not human ability (Acts 1:8; 2:4)</BulletItem>
                  <BulletItem><strong>People-focused:</strong> They prioritized relationships and community over programs (Acts 2:42–47)</BulletItem>
                  <BulletItem><strong>Mission-minded:</strong> Everything they did served their primary purpose of making disciples (Acts 2:47)</BulletItem>
                  <BulletItem><strong>Multiplication-oriented:</strong> They developed leaders who developed other leaders, strengthening and expanding churches (Acts 14:21–23)</BulletItem>
                </BulletList>
              </YellowSection>

              <SectionHeading>THE CORE PRINCIPLE</SectionHeading>
              <BlueSection title="💎">
                <p><HighlightText color="blue">"If we do what they did, we'll get what they got."</HighlightText> This is not about copying their exact methods; it is about applying their timeless principles in our modern context. The early church used first-century methods, but their principles were timeless. We must use twenty-first-century methods built on those same timeless principles. As Maxwell writes, "Leadership principles are timeless, but leadership methods must be timely" (Leadership 101, p. 45).</p>
              </BlueSection>

              <SectionHeading>YOUR PREPARATION FOR THE JOURNEY</SectionHeading>
              <PurpleSection title="❓">
                <p>Before beginning Week 2, consider a few critical questions:</p>
                <BulletList>
                  <BulletItem>What results do you want to see in your church or ministry?</BulletItem>
                  <BulletItem>What methods are you currently using to achieve those results?</BulletItem>
                  <BulletItem>How open are you to changing your approach if needed?</BulletItem>
                  <BulletItem>What would happen if your church grew like the early church grew?</BulletItem>
                  <BulletItem>Are you prepared to do what they did to get what they got?</BulletItem>
                </BulletList>
              </PurpleSection>

              <SectionHeading>THE PROMISE AND THE CHALLENGE</SectionHeading>
              <GreenSection title="🎁">
                <p>The promise is that God's power has not diminished. His methods still work. If we follow the early church's blueprint, we can expect similar results. The challenge is that their methods required sacrifice, courage, and complete dependence on God. Are we willing to pay the same price for the same results? Maxwell reminds us, "Everything worthwhile is uphill" (The 15 Invaluable Laws of Growth, p. 89). The early church understood this. They climbed every hill, faced every challenge, and overcame every obstacle because they knew their mission was worth any sacrifice.</p>
              </GreenSection>

              <SectionHeading>READY TO BEGIN?</SectionHeading>
              <YellowSection title="🚀">
                <p>The next ten weeks will challenge much of what you think you know about church growth, leadership, and ministry effectiveness. You will discover methods that seem too simple to work and principles that appear too demanding to follow. But remember: <HighlightText color="yellow">"If we do what they did, we'll get what they got."</HighlightText> The question is not whether their methods work—the Book of Acts proves they do. The question is whether we are willing to apply them. Let's find out.</p>
              </YellowSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActsAudioPlayer;