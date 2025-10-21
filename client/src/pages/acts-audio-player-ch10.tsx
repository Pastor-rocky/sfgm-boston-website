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

const ActsAudioPlayerCh10: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioSrc = '/uploads/textbook-audio/acts-in-action-cp10.mp3';
  const localStorageKey = 'audio_progress_acts_ch10';

  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      setCurrentTime(parseFloat(saved));
    }
  }, [localStorageKey]);

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
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={() => setLocation('/course/1')} variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
            <h1 className="text-xl font-bold text-white">Acts in Action - Chapter 10</h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <img src="/acts-in-action-cover.png" alt="Acts in Action Cover" className="w-24 h-auto rounded shadow-sm flex-shrink-0" />
              <div>
                <h3 className="text-white text-2xl font-bold"><span className="text-3xl align-text-top mr-1">🎶</span> <span className="align-middle">Acts in Action</span></h3>
                <p className="text-white/90 text-xl font-semibold"><span className="align-middle">Chapter 10</span> <span className="text-2xl align-text-top ml-1">🎬</span></p>
              </div>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-white mr-3" />
                <span className="text-white text-lg">Loading audio player...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Button onClick={() => handleSkip(-15)} variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button onClick={handlePlayPause} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Button onClick={() => handleSkip(15)} variant="ghost" size="sm" className="text-white hover:bg-white/10">
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
                <div className="flex items-center gap-3 justify-center mt-4">
                  <Volume2 className="h-4 w-4 text-white" />
                  <Slider value={[volume]} max={1} step={0.1} onValueChange={([v]) => handleVolumeChange([v])} className="w-24" />
                </div>
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

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">CHAPTER 10: ROME AND BEYOND</CardTitle>
            <p className="text-center text-purple-200 text-lg">Acts 27–28 — "If We Finish Like They Did ..."</p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <SectionHeading>WHAT THEY FACED</SectionHeading>
              <BlueSection title="⛵">
                <p>Paul's journey to Rome tested everything he had learned about leadership. A deadly storm, a shipwreck, a venomous snakebite, and two years of house arrest stood between him and his ultimate destination. Yet these obstacles carried him to the very heart of the empire where his mission would be completed:</p>
                <BulletList>
                  <BulletItem>A life-threatening voyage where the ship "was caught by the storm and could not head into the wind" (Acts 27:15)</BulletItem>
                  <BulletItem>Leadership responsibility in crisis with 276 people depending on his guidance</BulletItem>
                  <BulletItem>The supernatural through divine interventions, miraculous healings, and protection in danger</BulletItem>
                  <BulletItem>Restricted ministry under guard that limited, but did not stop, his influence</BulletItem>
                </BulletList>
                <p>The question was simple: Would he finish strong, or would the final obstacles defeat him just short of his goal? As Maxwell writes, <HighlightText color="blue">"How you finish is more important than how you start"</HighlightText> (Leadership Gold, p. 278).</p>
              </BlueSection>

              <SectionHeading>WHAT THEY DID: TURN EVERY SETBACK INTO A SETUP</SectionHeading>

              <GreenSection title="PHASE 1: LEADERSHIP DURING CRISIS (Acts 27:1–44)">
                <p>Against Paul's counsel, the centurion chose to sail during dangerous weather. Paul warned plainly, "I can see that our voyage is going to be disastrous and bring great loss to ship and cargo, and to our own lives also" (27:9–10). A hurricane-force Northeaster seized the ship; for fourteen days they saw neither sun nor stars, and "all hope of being saved was given up" (27:14–20). Then Paul stood and led. He acknowledged the ignored warning, offered God-grounded hope, and relayed a promise: <HighlightText color="green">"Last night an angel of the God to whom I belong and whom I serve stood beside me and said, 'Do not be afraid, Paul. You must stand trial before Caesar; and God has graciously given you the lives of all who sail with you.' So keep up your courage... it will happen just as he told me"</HighlightText> (27:23–25). He coupled faith with practical leadership—preventing sailors from deserting, urging everyone to eat, giving thanks to God publicly, and restoring confidence. The ship broke apart, but "everyone reached land safely" (27:44), exactly as God had said. As Maxwell's Law of Navigation reminds us, "Anyone can steer the ship, but it takes a leader to chart the course" (The 21 Irrefutable Laws of Leadership, p. 17).</p>
              </GreenSection>

              <GreenSection title="PHASE 2: SUPERNATURAL ENCOUNTERS (Acts 28:1–10)">
                <p>Washed ashore on Malta, they received "unusual kindness" from the islanders. While serving—gathering brushwood for the fire—a viper fastened on Paul's hand. The islanders expected him to die, but he shook it into the fire and suffered no ill effects (28:3–6). Doors opened for ministry as Paul healed Publius's father and then many others on the island. Honor replaced suspicion; the islanders supplied all that was needed for the journey (28:9–10). Paul's servant posture and God's supernatural power established credibility and created opportunity. As Maxwell notes, <HighlightText color="green">"People don't care how much you know until they know how much you care"</HighlightText> (Winning with People, p. 67).</p>
              </GreenSection>

              <BlueSection title="PHASE 3: THE ROME ARRIVAL (Acts 28:11–16)">
                <p>After three months, they sailed on toward Rome. Believers traveled out to meet Paul at the Forum of Appius and Three Taverns; "at the sight of these people Paul thanked God and was encouraged" (28:15). In Rome, he lived under house arrest, guarded by a soldier, but with room to receive visitors (28:16). Reputation and relationships paved the way for influence despite chains.</p>
              </BlueSection>

              <PurpleSection title="PHASE 4: THE JEWISH OUTREACH (Acts 28:17–29)">
                <p>Three days in, Paul summoned the local Jewish leaders, affirmed his loyalty to Israel's hope, and explained his chains: <HighlightText color="purple">"It is because of the hope of Israel that I am bound with this chain"</HighlightText> (28:20). They had heard no formal accusations from Judea but wanted to hear his views, acknowledging controversy surrounding "this sect." Paul arranged a large meeting and, from morning till evening, explained the kingdom of God and tried to persuade them about Jesus from the Law and the Prophets (28:23). Responses were mixed; some believed, others would not. Citing Isaiah 6, Paul concluded, "God's salvation has been sent to the Gentiles, and they will listen!" (28:28).</p>
              </PurpleSection>

              <YellowSection title="PHASE 5: THE ROMAN MINISTRY (Acts 28:30–31)">
                <p>For two full years, Paul welcomed all who came to him and <HighlightText color="yellow">"proclaimed the kingdom of God and taught about the Lord Jesus Christ—with all boldness and without hindrance!"</HighlightText> He was restricted, but the gospel was not. As Maxwell writes, "Leadership is not about the position you hold but the influence you have" (The 360 Degree Leader, p. 89).</p>
              </YellowSection>

              <SectionHeading>WHAT THEY GOT: FINISHING STRONG IN THE HEART OF THE EMPIRE</SectionHeading>

              <GreenSection title="🏛️ Mission Accomplished">
                <BulletList>
                  <BulletItem>Paul reached Rome, the center of the known world, fulfilling a long-held calling</BulletItem>
                  <BulletItem>Secured a strategic base for global expansion</BulletItem>
                  <BulletItem>His influence under house arrest was paradoxically enlarged</BulletItem>
                  <BulletItem>Officials and ordinary people alike heard the message</BulletItem>
                  <BulletItem>The Gentile mission advanced as Jewish rejection continued and Gentile responsiveness grew</BulletItem>
                </BulletList>
              </GreenSection>

              <PurpleSection title="💪 Leadership Legacy">
                <BulletList>
                  <BulletItem>He saved lives through decisive crisis leadership</BulletItem>
                  <BulletItem>Demonstrated supernatural authority through divine protection and healings</BulletItem>
                  <BulletItem>Never wavered from his mission despite relentless obstacles</BulletItem>
                  <BulletItem>The church network now stretched from Jerusalem to Rome</BulletItem>
                  <BulletItem>Leaders like Timothy and Titus carried the work</BulletItem>
                  <BulletItem>Letters provided doctrinal foundations</BulletItem>
                  <BulletItem>A missionary model others could reproduce</BulletItem>
                </BulletList>
              </PurpleSection>

              <OrangeSection title="🏠 Methodological Innovations">
                <p><strong>House-church strategy flourished:</strong></p>
                <BulletList>
                  <BulletItem>Intimate settings enabled deep conversation</BulletItem>
                  <BulletItem>Ongoing access and natural relational networks that multiplied the message</BulletItem>
                  <BulletItem>Two years of open-door teaching allowed Paul to address complex theological questions without time pressure</BulletItem>
                </BulletList>
                <p><strong>Prison-ministry model emerged:</strong></p>
                <BulletList>
                  <BulletItem>A captive audience of guards and officials heard the gospel</BulletItem>
                  <BulletItem>Daily conduct validated the message</BulletItem>
                  <BulletItem>Suffering authenticated the witness</BulletItem>
                  <BulletItem>Divine interventions underscored God's power</BulletItem>
                </BulletList>
                <p>As Maxwell observes, <HighlightText color="orange">"Successful leaders see opportunity in every obstacle"</HighlightText> (The 15 Invaluable Laws of Growth, p. 134).</p>
              </OrangeSection>

              <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
              <BlueSection title="📚">
                <BulletList>
                  <BulletItem><strong>The Law of Legacy:</strong> Paul's final years established a ministry that outlasted his life (The 21 Irrefutable Laws of Leadership, ch. 21)</BulletItem>
                  <BulletItem><strong>The Law of Victory:</strong> He found ways to win under house arrest</BulletItem>
                  <BulletItem><strong>The Law of Sacrifice:</strong> His willingness to lay down personal freedom to complete his mission (ch. 18)</BulletItem>
                  <BulletItem><strong>The Law of the Test:</strong> Every storm, snake, and cell refined his character (The 21 Most Powerful Minutes in a Leader's Day, p. 156)</BulletItem>
                </BulletList>
              </BlueSection>

              <SectionHeading>MODERN APPLICATION: THE FINISHING STRONG PRINCIPLES</SectionHeading>

              <GreenSection title="🌊 Lead Through Storms">
                <BulletList>
                  <BulletItem>Name realities honestly</BulletItem>
                  <BulletItem>Offer God-centered hope</BulletItem>
                  <BulletItem>Prevent panic</BulletItem>
                  <BulletItem>Meet basic needs</BulletItem>
                  <BulletItem>Lead by example</BulletItem>
                  <BulletItem>Refuse to abandon people when pressure mounts</BulletItem>
                </BulletList>
              </GreenSection>

              <PurpleSection title="🎯 Keep Mission Focus">
                <p>When everything tries to detour you:</p>
                <BulletList>
                  <BulletItem>Remember your calling</BulletItem>
                  <BulletItem>Trust divine timing</BulletItem>
                  <BulletItem>Use crises as testimonies</BulletItem>
                  <BulletItem>Expect God to keep His word</BulletItem>
                </BulletList>
              </PurpleSection>

              <OrangeSection title="🔓 Turn Restrictions into Opportunities">
                <BulletList>
                  <BulletItem>Embrace forced focus</BulletItem>
                  <BulletItem>Leverage intimate ministry</BulletItem>
                  <BulletItem>Invest in sustained impact</BulletItem>
                  <BulletItem>Build strategic networks as people come and go</BulletItem>
                </BulletList>
              </OrangeSection>

              <YellowSection title="⚡ Cultivate the Supernatural Dimension">
                <BulletList>
                  <BulletItem>Prayer, fasting, and spiritual discernment</BulletItem>
                  <BulletItem>Follow God's guidance into calculated risks</BulletItem>
                  <BulletItem>Pray for others as a public witness to God's power</BulletItem>
                </BulletList>
                <p>As Maxwell writes, <HighlightText color="yellow">"Spiritual leadership requires both natural ability and supernatural empowerment"</HighlightText> (Spiritual Leadership, p. 89).</p>
              </YellowSection>

              <SectionHeading>YOUR WEEK 11 CHALLENGE</SectionHeading>
              <RedSection title="📅">
                <BulletList>
                  <BulletItem><strong>Monday:</strong> Assess the storms you face and plan how to provide hope and practical direction</BulletItem>
                  <BulletItem><strong>Tuesday:</strong> Review your mission focus—are you still headed toward your original calling?</BulletItem>
                  <BulletItem><strong>Wednesday:</strong> List current limitations and design ways to turn each constraint into an opportunity</BulletItem>
                  <BulletItem><strong>Thursday:</strong> Strengthen supernatural dependence by scheduling regular times to seek God's direction</BulletItem>
                  <BulletItem><strong>Friday:</strong> Plan your legacy—what would continue if your active ministry ended today?</BulletItem>
                  <BulletItem><strong>Saturday:</strong> Evaluate your network and identify key relationships that could multiply your impact</BulletItem>
                  <BulletItem><strong>Sunday:</strong> Make a finishing-strong commitment; teach about completing God's calling</BulletItem>
                </BulletList>
                <p><strong>Week 11 Goal:</strong> Establish at least one system or relationship that will extend your ministry impact beyond your current limitations.</p>
              </RedSection>

              <SectionHeading>REFLECTION QUESTIONS</SectionHeading>
              <PurpleSection title="❓">
                <BulletList>
                  <BulletItem>How do you respond when hope is gone—do you navigate or drift?</BulletItem>
                  <BulletItem>What obstacles are threatening to derail your calling, and how will you persist?</BulletItem>
                  <BulletItem>Are you treating limitations as barriers or as setups for new opportunities?</BulletItem>
                  <BulletItem>Where are you relying more on human planning than on divine guidance?</BulletItem>
                  <BulletItem>If your active ministry ended unexpectedly, what would continue—and what needs to be built so it can?</BulletItem>
                </BulletList>
                <p>The Acts 27–28 formula is clear: <HighlightText color="purple">crisis leadership + mission persistence + supernatural dependence + strategic networking = finishing strong.</HighlightText> Maxwell reminds us, "The secret to success is not starting strong but finishing strong" (Leadership Gold, p. 289). Paul's final chapters show that great leaders don't just begin well—they complete their mission despite obstacles, restrictions, and setbacks.</p>
              </PurpleSection>

              <SectionHeading>KEY TAKEAWAYS</SectionHeading>
              <GreenSection title="✨">
                <BulletList>
                  <BulletItem>Storms reveal real leaders</BulletItem>
                  <BulletItem>Mission focus overcomes obstacles</BulletItem>
                  <BulletItem>Restrictions can become opportunities</BulletItem>
                  <BulletItem>Supernatural power validates leadership</BulletItem>
                  <BulletItem>Character under pressure builds credibility</BulletItem>
                  <BulletItem>Strategic relationships multiply impact</BulletItem>
                  <BulletItem>Finishing strong defines legacy</BulletItem>
                </BulletList>
              </GreenSection>

              <SectionHeading>THE ACTS COMPLETION CHECKLIST</SectionHeading>
              <OrangeSection title="✅">
                <BulletList>
                  <BulletItem>Clarify your "Rome" and align daily work to your ultimate purpose</BulletItem>
                  <BulletItem>Prepare for crises so people look to you for hope and wise decisions</BulletItem>
                  <BulletItem>Maintain a living connection to God's guidance and power</BulletItem>
                  <BulletItem>Build relationships and partnerships that multiply your influence and continue your work</BulletItem>
                  <BulletItem>Maximize opportunities within limits so effectiveness endures despite barriers</BulletItem>
                  <BulletItem>Create systems and train successors so the mission outlasts you</BulletItem>
                  <BulletItem>Guard your integrity under accusation and pressure so trials strengthen, not sour, your soul</BulletItem>
                </BulletList>
                <p>As Maxwell challenges, <HighlightText color="orange">"The test of a leader is not how well he or she functions in times of comfort and convenience, but how they lead under fire"</HighlightText> (The 21 Indispensable Qualities of a Leader, p. 67).</p>
              </OrangeSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActsAudioPlayerCh10;

