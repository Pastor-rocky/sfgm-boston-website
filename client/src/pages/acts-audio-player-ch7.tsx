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

const ActsAudioPlayerCh7: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioSrc = '/uploads/textbook-audio/acts-in-action-cp7.mp3';
  const localStorageKey = 'audio_progress_acts_ch7';

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
            <h1 className="text-xl font-bold text-white">Acts in Action - Chapter 7</h1>
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
                <p className="text-white/90 text-xl font-semibold"><span className="align-middle">Chapter 7</span> <span className="text-2xl align-text-top ml-1">🎬</span></p>
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
              CHAPTER 7: EUROPEAN EXPANSION
            </CardTitle>
            <p className="text-center text-purple-200 text-lg">
              Acts 16–18 — "If We Cross Into Europe Like They Did …"
            </p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <SectionHeading>WHAT THEY FACED</SectionHeading>
              <BlueSection title="🚪">
                <p>Closed doors forced fresh direction. The Holy Spirit forbade them to speak the word in Asia and Bithynia, then a night vision redirected them across the Aegean to Macedonia—a decisive leap from Asia to Europe (Acts 16:6–10). The challenges were significant:</p>
                <BulletList>
                  <BulletItem>How do you plant the gospel in Roman colonies, philosophical centers, and commercial hubs with no prior foothold?</BulletItem>
                  <BulletItem>Resistance would be legal in the hands of magistrates</BulletItem>
                  <BulletItem>Spiritual in the clash with demonic powers</BulletItem>
                  <BulletItem>Cultural in the world of Epicureans and Stoics</BulletItem>
                  <BulletItem>Economic where transformed lives threatened trade</BulletItem>
                </BulletList>
                <p>Team composition was changing as well—Paul, Silas, Timothy, and now Luke entered the narrative—requiring clarity of roles and unity of purpose. Could they form an entry strategy for hard, secular cities and remain long enough to lay deep roots? As Maxwell reminds us, <HighlightText color="blue">"Vision without a strategy remains an illusion"</HighlightText> (The 21 Irrefutable Laws of Leadership, p. 45).</p>
              </BlueSection>

              <SectionHeading>WHAT THEY DID: THE EUROPE LAUNCH PLAYBOOK</SectionHeading>

              <GreenSection title="PHASE 1: GUIDED AND READY (Acts 16:1–10)">
                <p>Paul added Timothy at Lystra, a young leader well spoken of by the believers. He circumcised him, not for salvation but for mission access among Jews (Acts 16:3), applying the Jerusalem Council's theology strategically on the ground. They delivered the decisions of the apostles to strengthen the churches (16:4–5). Twice the Spirit said "No," then the Macedonian vision said "Come over and help us." They concluded together that God had called them and moved immediately (16:10)—spiritual sensitivity joined to decisive execution. As Maxwell's Law of Navigation teaches, leaders chart the course before they steer it (The 21 Irrefutable Laws of Leadership, p. 17).</p>
              </GreenSection>

              <GreenSection title="PHASE 2: PHILIPPI—A CHURCH FROM A PRAYER MEETING (Acts 16:11–40)">
                <p>Philippi, a proud Roman colony, lacked a synagogue, so they searched for a place of prayer by the river. Lydia, a dealer in purple, listened; <HighlightText color="green">"The Lord opened her heart,"</HighlightText> and her household was baptized (Acts 16:14–15). Her hospitality became gospel headquarters. Deliverance of a slave girl from a spirit of divination triggered economic backlash; Paul and Silas were beaten and jailed without trial. At midnight they prayed and sang; an earthquake opened doors, and the jailer, poised for suicide, heard, "Believe in the Lord Jesus, and you will be saved—you and your household" (16:31). He washed their wounds; they watched his sins washed away in baptism. By morning, Paul asserted Roman citizenship, securing public vindication and protection for the young church (16:37–39). The pattern is clear: begin with a spiritual beachhead, expect backlash, turn suffering into testimony, and use legal status wisely to guard the flock.</p>
              </GreenSection>

              <GreenSection title="PHASE 3: THESSALONICA AND BEREA—REASON AND READINESS (Acts 17:1–15)">
                <p>In Thessalonica, Paul reasoned from the Scriptures for three Sabbaths, explaining that the Messiah had to suffer and rise and identifying Jesus as the Christ (Acts 17:2–3). Some Jews, many God-fearing Greeks, and leading women believed. Jealous opponents formed a mob, assaulted Jason's house, and accused the missionaries of "turning the world upside down" (17:6). In Berea, the posture shifted; they received the word with eagerness and examined the Scriptures daily to test the message (17:11). Many believed, yet opposition pursued Paul there as well. The method held: reason from shared authority, honor sincere inquiry, and anticipate organized resistance that follows momentum.</p>
              </GreenSection>

              <GreenSection title="PHASE 4: ATHENS—CONTEXTUALIZING FOR THE THINKERS (Acts 17:16–34)">
                <p>Provoked by a city full of idols, Paul engaged both synagogue and marketplace until he was invited to the Areopagus. His approach was masterful:</p>
                <BulletList>
                  <BulletItem>He connected with observed culture through the altar "to an unknown god"</BulletItem>
                  <BulletItem>He affirmed common grace by presenting God as Creator, Giver, and Sustainer</BulletItem>
                  <BulletItem>He confronted error by declaring God is not made by human hands</BulletItem>
                  <BulletItem>He called for repentance in light of the appointed judgment</BulletItem>
                  <BulletItem>He crowned Christ with resurrection authority (Acts 17:22–31)</BulletItem>
                </BulletList>
                <p>Responses ranged from mockery to curiosity to conversion—Dionysius, Damaris, and others believed. The lesson is simple: begin where people are, lead them to who God is, and bring them to what God has done in Christ. As Maxwell notes, leaders <HighlightText color="green">"must connect before they direct"</HighlightText> (Leadership 101, p. 45).</p>
              </GreenSection>

              <GreenSection title="PHASE 5: CORINTH—STAYING LONG ENOUGH FOR DEPTH (Acts 18:1–23)">
                <p>In Corinth—commercial, immoral, and influential—Paul worked with Aquila and Priscilla as a tentmaker while teaching every Sabbath. When opposed, he shifted next door to Titius Justus's house; the synagogue ruler Crispus believed with his household (Acts 18:8). The Lord appeared by night with a strengthening word: <HighlightText color="green">"Do not be afraid; keep on speaking, do not be silent. For I am with you … I have many people in this city"</HighlightText> (18:9–10). Paul stayed eighteen months. A legal challenge before Gallio was dismissed, creating a favorable precedent that gave the movement breathing room (18:12–17). On departure, he took Aquila and Priscilla to Ephesus, reasoned briefly in the synagogue, and then returned to Antioch, completing the journey. Meanwhile Apollos, eloquent but limited, was discipled by Priscilla and Aquila for greater accuracy and impact (18:24–28). The principles surface: leverage marketplace vocation, plant in homes, receive courage to stay, use the courts when appropriate, and develop emerging leaders who will carry the work forward.</p>
              </GreenSection>

              <SectionHeading>WHAT THEY GOT: BEACHHEADS, PRECEDENTS, AND A CITY PLAYBOOK</SectionHeading>

              <PurpleSection title="🏙️ Europe Opened">
                <p>Real conversions took root:</p>
                <BulletList>
                  <BulletItem>Households like Lydia's and the jailer's</BulletItem>
                  <BulletItem>Hosts like Jason and Titius Justus</BulletItem>
                  <BulletItem>Leaders like Crispus testified that God was establishing communities across social strata</BulletItem>
                </BulletList>
              </PurpleSection>

              <BlueSection title="🗺️ Coherent Strategy for Secular Cities">
                <BulletList>
                  <BulletItem>Enter through existing networks</BulletItem>
                  <BulletItem>Start where seekers already gather</BulletItem>
                  <BulletItem>Reason from shared foundations</BulletItem>
                  <BulletItem>Contextualize without compromise</BulletItem>
                  <BulletItem>Anchor congregations in homes that become mission hubs</BulletItem>
                </BulletList>
              </BlueSection>

              <GreenSection title="🛡️ Endurance and Protection">
                <BulletList>
                  <BulletItem>Midnight songs turned to salvation</BulletItem>
                  <BulletItem>Public vindication in Philippi protected the fledgling church</BulletItem>
                  <BulletItem>Gallio's ruling in Corinth created legal space for growth</BulletItem>
                </BulletList>
              </GreenSection>

              <YellowSection title="👥 Teams Multiplied">
                <BulletList>
                  <BulletItem>Timothy was empowered</BulletItem>
                  <BulletItem>Luke entered the story</BulletItem>
                  <BulletItem>Priscilla and Aquila matured into disciple-makers</BulletItem>
                  <BulletItem>Apollos was sharpened for greater effectiveness</BulletItem>
                </BulletList>
              </YellowSection>

              <OrangeSection title="🎯 Reproducible Method for Hard Places">
                <BulletList>
                  <BulletItem>Pray and listen</BulletItem>
                  <BulletItem>Move on divine timing</BulletItem>
                  <BulletItem>Find persons of peace</BulletItem>
                  <BulletItem>Expect spiritual and economic pushback</BulletItem>
                  <BulletItem>Turn hardship into testimony</BulletItem>
                  <BulletItem>Assert legal rights wisely to safeguard the mission</BulletItem>
                </BulletList>
                <p>Depth replaced drive-by ministry; they moved quickly where doors were narrow and stayed long where cities were strategic. As Maxwell reminds us, <HighlightText color="orange">"Leadership develops daily, not in a day"</HighlightText> (The 21 Irrefutable Laws of Leadership, p. 23).</p>
              </OrangeSection>

              <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
              <PurpleSection title="📚">
                <BulletList>
                  <BulletItem><strong>The Law of Navigation:</strong> Discerning closed doors and charting a Spirit-led route to Macedonia</BulletItem>
                  <BulletItem><strong>The Law of Connection:</strong> In Athens, starting where hearers were and building a bridge to Christ</BulletItem>
                  <BulletItem><strong>The Law of Sacrifice:</strong> Enduring beating, imprisonment, and risk for the sake of the gospel</BulletItem>
                  <BulletItem><strong>The Law of Process:</strong> Remaining eighteen months in Corinth to develop durable disciples</BulletItem>
                  <BulletItem><strong>The Law of the Inner Circle:</strong> Raising Timothy, equipping Priscilla and Aquila, and sharpening Apollos—expanding capacity by developing leaders who could lead others</BulletItem>
                </BulletList>
              </PurpleSection>

              <SectionHeading>MODERN APPLICATION: HOW TO ENTER HARD, SECULAR CITIES</SectionHeading>

              <GreenSection title="🧭 Follow the Spirit with a Plan">
                <BulletList>
                  <BulletItem>Pray, fast, and test impressions in community</BulletItem>
                  <BulletItem>Act decisively when God confirms direction</BulletItem>
                  <BulletItem>Build diverse teams that strengthen one another on the way</BulletItem>
                  <BulletItem>Value couples and marketplace leaders whose homes and vocations can become strategic platforms</BulletItem>
                  <BulletItem>Seek persons of peace whose credibility and hospitality can host a gospel beachhead</BulletItem>
                  <BulletItem>Let households catalyze congregations</BulletItem>
                </BulletList>
              </GreenSection>

              <BlueSection title="💬 Learn and Communicate">
                <BulletList>
                  <BulletItem>Learn the idols and ideas of your city</BulletItem>
                  <BulletItem>Use shared language to lead people to the lordship and resurrection of Jesus</BulletItem>
                  <BulletItem>Connect before you correct</BulletItem>
                  <BulletItem>Call for a clear response</BulletItem>
                </BulletList>
              </BlueSection>

              <RedSection title="⚔️ Expect and Endure Opposition">
                <BulletList>
                  <BulletItem>Expect opposition—economic, ideological, and legal</BulletItem>
                  <BulletItem>Prepare to suffer well; sing in the night</BulletItem>
                  <BulletItem>Use appropriate legal avenues to protect the vulnerable and the work</BulletItem>
                  <BulletItem>Blend vocation and mission so excellence at work commends your message and opens doors</BulletItem>
                </BulletList>
              </RedSection>

              <YellowSection title="⏳ Stay and Develop">
                <BulletList>
                  <BulletItem>Stay where God says stay; ask for Corinth-style courage to keep speaking in strategic places</BulletItem>
                  <BulletItem>Develop leaders early; teach accurately, hand off ministry</BulletItem>
                  <BulletItem>Like Priscilla and Aquila with Apollos, offer private, gracious coaching that multiplies impact</BulletItem>
                </BulletList>
                <p>As Maxwell notes, <HighlightText color="yellow">"Great leaders ask great questions"</HighlightText> (Good Leaders Ask Great Questions, p. 23).</p>
              </YellowSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActsAudioPlayerCh7;

