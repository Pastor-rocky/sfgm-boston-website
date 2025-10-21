import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  SectionHeading,
  BlueSection,
  GreenSection,
  PurpleSection,
  RedSection,
  OrangeSection,
  YellowSection,
  BulletList,
  BulletItem,
  HighlightText
} from '@/components/audio-player-text-template';

const ActsAudioPlayerCh4: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioSrc = '/uploads/textbook-audio/acts-in-action-cp4.mp3';
  const localStorageKey = 'audio_progress_acts_ch4';

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      setCurrentTime(parseFloat(saved));
    }
  }, [localStorageKey]);

  // Audio controls
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

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value[0];
    setVolume(value[0]);
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
            <h1 className="text-xl font-bold text-white">Acts in Action - Chapter 4</h1>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Audio Player (Jonah-style) */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/acts-in-action-cover.png" 
                alt="Acts in Action Cover"
                className="w-24 h-auto rounded shadow-sm flex-shrink-0"
              />
              <div>
                <h3 className="text-white text-2xl font-bold"><span className="text-3xl align-text-top mr-1">🎶</span> <span className="align-middle">Acts in Action</span></h3>
                <p className="text-white/90 text-xl font-semibold"><span className="align-middle">Chapter 4</span> <span className="text-2xl align-text-top ml-1">🎬</span></p>
              </div>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-white mr-3" />
                <span className="text-white text-lg">Loading audio player...</span>
              </div>
            ) : (
              <>
                {/* Main Controls */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Button
                    onClick={() => handleSkip(-15)}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    onClick={handlePlayPause}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  
                  <Button
                    onClick={() => handleSkip(15)}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                {/* Progress Bar */}
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

                {/* Volume */}
                <div className="flex items-center gap-3 justify-center mt-4">
                  <Volume2 className="h-4 w-4 text-white" />
                  <Slider value={[volume]} max={1} step={0.1} onValueChange={([v]) => handleVolumeChange([v])} className="w-24" />
                </div>

                {/* Inline audio element */}
                <audio
                  ref={audioRef}
                  src={audioSrc}
                  preload="auto"
                  onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                  onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                  onEnded={() => setIsPlaying(false)}
                />
              </>
            )}
          </CardContent>
        </Card>

        {/* Text Content */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              CHAPTER 4: EXPANSION AND CONVERSION
            </CardTitle>
            <p className="text-center text-purple-200 text-lg">
              Acts 8–9 — "If We Expand Like They Did …"
            </p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <SectionHeading>WHAT THEY FACED</SectionHeading>
              <RedSection title="⚡">
                <p>Stephen's martyrdom was not the end of the movement—it was the beginning of a new phase. "On that day a great persecution broke out against the church in Jerusalem, and all except the apostles were scattered throughout Judea and Samaria" (Acts 8:1). The new reality was stark:</p>
                <BulletList>
                  <BulletItem>Believers were forcibly displaced and fled for their lives</BulletItem>
                  <BulletItem>Saul began a ruthless campaign: "Saul began to destroy the church. Going from house to house, he dragged off both men and women and put them in prison" (Acts 8:3)</BulletItem>
                  <BulletItem>The movement was suddenly spread across new geography, demanding new strategies</BulletItem>
                  <BulletItem>Cultural barriers loomed large as the gospel confronted Samaritan and Gentile contexts</BulletItem>
                  <BulletItem>Leadership gaps emerged because the apostles remained in Jerusalem while others pioneered new territory</BulletItem>
                </BulletList>
                <p>The test was clear. Would persecution stop the movement or spread it? Would barriers become walls or bridges? Maxwell notes, <HighlightText color="red">"Every great movement of God has been birthed in the womb of opposition"</HighlightText> (Leadership Bible Commentary).</p>
              </RedSection>

              <SectionHeading>WHAT THEY DID: TURN SETBACKS INTO BREAKTHROUGHS</SectionHeading>

              <GreenSection title="PHASE 1: PHILIP'S SAMARITAN BREAKTHROUGH (Acts 8:4–25)">
                <p>Those who were scattered did not go silent. "Those who had been scattered preached the word wherever they went. Philip went down to a city in Samaria and proclaimed the Messiah there" (vv. 4–5). Philip's strategy was simple and courageous:</p>
                <BulletList>
                  <BulletItem>He crossed entrenched cultural barriers—Jews did not associate with Samaritans</BulletItem>
                  <BulletItem>He proclaimed Christ, keeping the message centered on Jesus</BulletItem>
                  <BulletItem>He demonstrated God's power as impure spirits were driven out and the paralyzed and lame were healed (v. 7)</BulletItem>
                </BulletList>
                <p>The result was tangible: <HighlightText color="green">"So there was great joy in that city"</HighlightText> (v. 8). Maxwell's Law of the Catalyst applies: activity is not the same as accomplishment, but without activity, there is no accomplishment (The 17 Indisputable Laws of Teamwork, p. 67).</p>
                <p>The work was tested by the Simon challenge. Simon the sorcerer believed and was baptized, but when he saw the apostles lay hands on believers and the Holy Spirit come upon them, he offered money to buy this power. Peter replied, "May your money perish with you, because you thought you could buy the gift of God with money!" (v. 20). Great leaders distinguish genuine conversion from religious opportunism. The apostles in Jerusalem sent Peter and John to Samaria to confirm the work and pray that the believers receive the Holy Spirit (vv. 14–17). This was not control for control's sake; it was unity, ensuring that the Samaritan church remained connected to the Jerusalem church.</p>
              </GreenSection>

              <GreenSection title="PHASE 2: PHILIP'S PERSONAL EVANGELISM (Acts 8:26–40)">
                <p>God then redirected Philip to a divine appointment. "Now an angel of the Lord said to Philip, 'Go south to the road—the desert road—that goes down from Jerusalem to Gaza'" (v. 26). On that road he met an Ethiopian eunuch, a high official of Queen Candace, who was reading Isaiah 53 in his chariot. Philip asked, "Do you understand what you are reading?" (v. 30). The eunuch answered, "How can I, unless someone explains it to me?" (v. 31). Philip began where the man was—"beginning with that very passage of Scripture" (v. 35)—and told him the good news about Jesus. The response was immediate: "What can stand in the way of my being baptized?" (v. 36). Philip baptized him, and "the eunuch went on his way rejoicing" (v. 39).</p>
                <p>Maxwell observes, <HighlightText color="green">"Great leaders are available for divine appointments"</HighlightText> (The 21 Most Powerful Minutes in a Leader's Day, p. 45). Yielded to the Spirit's leading, Philip experienced a transportation miracle: "The Spirit of the Lord suddenly took Philip away … Philip appeared at Azotus and traveled about, preaching the gospel in all the towns until he reached Caesarea" (vv. 39–40). He was so surrendered to God's direction that supernatural movement became a normal means of ministry.</p>
              </GreenSection>

              <GreenSection title="PHASE 3: SAUL'S DRAMATIC CONVERSION (Acts 9:1–31)">
                <p>Saul, "still breathing out murderous threats against the Lord's disciples," sought authority to arrest followers of the Way in Damascus (vv. 1–2). On the road, a light from heaven flashed around him, and he heard a voice: "Saul, Saul, why do you persecute me?" (v. 4). "Who are you, Lord?" he asked. "I am Jesus, whom you are persecuting … Get up and go into the city, and you will be told what you must do" (vv. 5–6). Blinded for three days, Saul fasted and prayed (vv. 8–9).</p>
                <p>God called Ananias to minister to Saul, though he was understandably reluctant. "Lord, I have heard many reports about this man and all the harm he has done to your holy people in Jerusalem" (v. 13). The Lord answered, <HighlightText color="green">"Go! This man is my chosen instrument to proclaim my name to the Gentiles and their kings and to the people of Israel"</HighlightText> (v. 15). Ananias obeyed. Saul received his sight, was filled with the Holy Spirit, and was baptized. Maxwell's Law of Process reminds us, "Leadership develops daily, not in a day" (The 21 Irrefutable Laws of Leadership, p. 23). Even Saul's dramatic conversion unfolded within a Spirit-led process of development.</p>
                <p>"At once he began to preach in the synagogues that Jesus is the Son of God … Saul grew more and more powerful and baffled the Jews living in Damascus by proving that Jesus is the Messiah" (vv. 20–22). When a plot formed to kill him, his followers lowered him in a basket through an opening in the wall by night (vv. 23–25). Back in Jerusalem, the disciples feared him until Barnabas advocated, telling the apostles how Saul had seen the Lord and preached boldly (v. 27). The outcome of this season was profound. "So the church throughout Judea, Galilee and Samaria enjoyed a time of peace and was strengthened. Living in the fear of the Lord and encouraged by the Holy Spirit, it increased in numbers" (v. 31).</p>
              </GreenSection>

              <SectionHeading>WHAT THEY GOT: EXPONENTIAL EXPANSION</SectionHeading>
              
              <BlueSection title="🌍 Geographic & Cross-Cultural Impact">
                <p>Persecution did not paralyze the church; it propelled it:</p>
                <BulletList>
                  <BulletItem>The movement expanded beyond Jerusalem into Judea and Samaria</BulletItem>
                  <BulletItem>Cross-cultural ministry unfolded as Jews brought the gospel to Samaritans</BulletItem>
                  <BulletItem>International impact began as the Ethiopian eunuch carried the message toward Africa</BulletItem>
                </BulletList>
              </BlueSection>

              <PurpleSection title="👥 Leadership Multiplication">
                <BulletList>
                  <BulletItem>Philip emerged—from deacon to evangelist</BulletItem>
                  <BulletItem>Scattered believers became scattered missionaries</BulletItem>
                  <BulletItem>New churches were planted wherever believers went</BulletItem>
                </BulletList>
              </PurpleSection>

              <YellowSection title="✨ The Ultimate Turnaround">
                <p>From conversion came transformation:</p>
                <BulletList>
                  <BulletItem>The movement's greatest enemy became its greatest advocate as Saul became Paul</BulletItem>
                  <BulletItem>His persecution expertise was redirected from hunting Christians to planting churches</BulletItem>
                  <BulletItem>The Gentile mission was launched as God's chosen instrument took shape for global expansion</BulletItem>
                </BulletList>
              </YellowSection>

              <GreenSection title="📈 Church Strengthening">
                <BulletList>
                  <BulletItem>Peace followed persecution as God provided a season of consolidation</BulletItem>
                  <BulletItem>Spiritual growth deepened as believers lived in the fear of the Lord</BulletItem>
                  <BulletItem>Numbers increased as the Holy Spirit continued to encourage and empower</BulletItem>
                </BulletList>
                <p>Maxwell writes, <HighlightText color="green">"God's greatest leaders often emerge from God's greatest opposition"</HighlightText> (Sometimes You Win, Sometimes You Learn, p. 123).</p>
              </GreenSection>

              <SectionHeading>STRATEGIC OUTCOMES</SectionHeading>
              
              <BlueSection title="🗺️ Mission Expansion Phases">
                <BulletList>
                  <BulletItem><strong>Phase 1—Jerusalem:</strong> Effectively complete</BulletItem>
                  <BulletItem><strong>Phase 2—Judea and Samaria:</strong> Launched</BulletItem>
                  <BulletItem><strong>Phase 3—The ends of the earth:</strong> Prepared through Paul's calling</BulletItem>
                </BulletList>
              </BlueSection>

              <PurpleSection title="👥 Leadership Pipeline">
                <BulletList>
                  <BulletItem>Philip pioneered cross-cultural evangelism</BulletItem>
                  <BulletItem>Ananias modeled courageous obedience</BulletItem>
                  <BulletItem>Barnabas demonstrated the power of encouragement and advocacy</BulletItem>
                  <BulletItem>Paul emerged as the architect of global missions</BulletItem>
                </BulletList>
              </PurpleSection>

              <OrangeSection title="🔥 Methodological Breakthroughs">
                <BulletList>
                  <BulletItem>Personal evangelism modeled by Philip and the Ethiopian</BulletItem>
                  <BulletItem>Power evangelism—signs and wonders—opened hearts in Samaria</BulletItem>
                  <BulletItem>Confrontational conversion marked Saul's Damascus Road encounter</BulletItem>
                  <BulletItem>Relational integration shone as Barnabas brought Paul to the apostles for acceptance and alignment</BulletItem>
                </BulletList>
              </OrangeSection>

              <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
              <YellowSection title="📚">
                <BulletList>
                  <BulletItem><strong>The Law of Navigation</strong> (The 21 Irrefutable Laws of Leadership, ch. 3): Philip navigated cultural barriers and geographic challenges under divine guidance</BulletItem>
                  <BulletItem><strong>The Law of Addition and Multiplication</strong> (ch. 19): Persecution scattered believers who multiplied the church wherever they went</BulletItem>
                  <BulletItem><strong>The Law of Transformation</strong> (The 15 Invaluable Laws of Growth, ch. 15): Saul's radical conversion</BulletItem>
                  <BulletItem><strong>The Law of Connection</strong> (The 21 Irrefutable Laws of Leadership, ch. 10): Ananias and Barnabas connected with difficult people others feared or avoided</BulletItem>
                </BulletList>
              </YellowSection>

              <SectionHeading>MODERN APPLICATION: THE EXPANSION PRINCIPLES</SectionHeading>
              
              <GreenSection title="🔄 Turning Setbacks into Comebacks">
                <p>When facing persecution or opposition:</p>
                <BulletList>
                  <BulletItem>Scatter strategically—treat displacement as deployment</BulletItem>
                  <BulletItem>Preach everywhere—every new location becomes a mission field</BulletItem>
                  <BulletItem>Cross barriers boldly—opposition often opens new territory</BulletItem>
                  <BulletItem>Maintain joy—there was "great joy in that city" despite hardship</BulletItem>
                </BulletList>
              </GreenSection>

              <BlueSection title="🌉 Encountering Cultural Barriers">
                <BulletList>
                  <BulletItem>Start with common ground—Philip began with Isaiah 53</BulletItem>
                  <BulletItem>Demonstrate God's power—signs and wonders open hard hearts</BulletItem>
                  <BulletItem>Build bridges—do not let prejudice block ministry opportunity</BulletItem>
                  <BulletItem>Seek apostolic validation—maintain unity with existing leadership as you pioneer</BulletItem>
                </BulletList>
              </BlueSection>

              <PurpleSection title="💫 Conversion and Development">
                <p>When God brings unlikely converts:</p>
                <BulletList>
                  <BulletItem>Do not judge by the past—Saul seemed impossible</BulletItem>
                  <BulletItem>Obey divine instructions—Ananias overcame fear</BulletItem>
                  <BulletItem>Provide mentorship—Barnabas invested in Paul</BulletItem>
                  <BulletItem>Give opportunities to prove change—let new believers serve quickly and appropriately</BulletItem>
                </BulletList>
              </PurpleSection>

              <OrangeSection title="🚀 Leadership Pipelines">
                <BulletList>
                  <BulletItem>Recognize emerging leaders—Philip stepped up during crisis</BulletItem>
                  <BulletItem>Develop people in their strengths—Philip excelled in evangelism more than administration</BulletItem>
                  <BulletItem>Create development opportunities—scattered believers became scattered missionaries</BulletItem>
                  <BulletItem>Connect people strategically—Barnabas knew how to open doors for others</BulletItem>
                </BulletList>
                <p>Maxwell observes, <HighlightText color="orange">"The greatest leaders see opportunities others miss"</HighlightText> (Leadership Gold, p. 67).</p>
              </OrangeSection>

              <YellowSection title="✅ Best Practices for Expansion">
                <BulletList>
                  <BulletItem>Follow divine direction as Philip did</BulletItem>
                  <BulletItem>Adapt methods to context—one approach for Samaritans, another for an Ethiopian official</BulletItem>
                  <BulletItem>Build on small successes—one convert can influence a continent</BulletItem>
                  <BulletItem>Maintain connection with the sending base to preserve unity</BulletItem>
                  <BulletItem>Identify natural leaders who surface in crisis</BulletItem>
                  <BulletItem>Invest in unlikely candidates—your fiercest opponent may become your greatest ally</BulletItem>
                  <BulletItem>Create mentorship relationships that accelerate growth</BulletItem>
                  <BulletItem>Trust God's sovereignty—He can reach anyone, anywhere, at any time</BulletItem>
                </BulletList>
              </YellowSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActsAudioPlayerCh4;

