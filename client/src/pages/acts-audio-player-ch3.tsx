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

const ActsAudioPlayerCh3: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioSrc = '/uploads/textbook-audio/acts-in-action-cp3.mp3';
  const localStorageKey = 'audio_progress_acts_ch3';

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
            <h1 className="text-xl font-bold text-white">Acts in Action - Chapter 3</h1>
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
                <p className="text-white/90 text-xl font-semibold"><span className="align-middle">Chapter 3</span> <span className="text-2xl align-text-top ml-1">🎬</span></p>
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

                {/* Inline audio element like Jonah/Acts ch2 */}
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
              CHAPTER 3: CRISIS AND GROWTH
            </CardTitle>
            <p className="text-center text-purple-200 text-lg">
              Acts 6–7 — "If We Manage Crisis Like They Did …"
            </p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <SectionHeading>WHAT THEY FACED</SectionHeading>
              <RedSection title="⚠️">
                <p>Success brought its own challenges. The early church was growing so fast that what began as a blessing threatened to become a burden. A crisis surfaced: "The Hellenistic Jews among them complained against the Hebraic Jews because their widows were being overlooked in the daily distribution of food" (Acts 6:1). Beneath the complaint lay deeper issues:</p>
                <BulletList>
                  <BulletItem>Cultural tensions simmered between Greek-speaking and Hebrew-speaking believers</BulletItem>
                  <BulletItem>Leadership overload mounted as the apostles tried to do everything</BulletItem>
                  <BulletItem>Resource management grew complicated as thousands needed daily care</BulletItem>
                  <BulletItem>Priorities blurred as urgent needs competed with the church's essential mission</BulletItem>
                </BulletList>
                <p>The stakes were high. Mishandled, this internal conflict could fracture the church and halt growth. Maxwell writes, "Every level of growth brings new problems. The key is not avoiding problems but developing better problem-solving skills" (The 15 Invaluable Laws of Growth, p. 134).</p>
              </RedSection>

              <SectionHeading>WHAT THEY DID: THE DELEGATION REVOLUTION</SectionHeading>

              <GreenSection title="PHASE 1: PROBLEM IDENTIFICATION (Acts 6:1–2)">
                <p>The complaint was specific: Greek-speaking widows were being neglected in the daily distribution, while Hebrew-speaking widows were cared for. The real issues included:</p>
                <BulletList>
                  <BulletItem>Unconscious cultural bias favoring Hebrew speakers</BulletItem>
                  <BulletItem>A system breakdown with no organized process for fair distribution</BulletItem>
                  <BulletItem>A leadership bottleneck as the apostles were overwhelmed with administration</BulletItem>
                  <BulletItem>Mission drift as prayer and preaching slipped behind food service</BulletItem>
                </BulletList>
                <p>The apostles responded with clarity: <HighlightText color="green">"It would not be right for us to neglect the ministry of the word of God in order to wait on tables"</HighlightText> (v. 2). Maxwell's Law of Priorities reminds us, "Leaders understand that activity is not necessarily accomplishment" (The 21 Irrefutable Laws of Leadership, p. 187). Great leaders distinguish between what only they can do and what others can do better.</p>
              </GreenSection>

              <GreenSection title="PHASE 2: STRATEGIC SOLUTION (Acts 6:3–6)">
                <p>Their solution was delegation with discernment. "Brothers and sisters, choose seven men from among you who are known to be full of the Spirit and wisdom. We will turn this responsibility over to them and will give our attention to prayer and the ministry of the word" (vv. 3–4). The selection criteria emphasized:</p>
                <BulletList>
                  <BulletItem><strong>Character</strong>—full of the Spirit</BulletItem>
                  <BulletItem><strong>Competence</strong>—full of wisdom</BulletItem>
                  <BulletItem><strong>Community endorsement</strong>—chosen from among them</BulletItem>
                  <BulletItem><strong>Proven reputation</strong>—known to be</BulletItem>
                </BulletList>
                <p>The church chose Stephen, Philip, Procorus, Nicanor, Timon, Parmenas, and Nicolas, a convert from Antioch (v. 5). Significantly, all seven had Greek names, demonstrating that the apostles addressed cultural bias by empowering the neglected group. Maxwell observes, <HighlightText color="green">"The best leaders don't just solve problems; they empower others to solve problems"</HighlightText> (Developing the Leaders Around You, p. 78). The installation was public and prayerful. The seven were presented before the congregation; the apostles prayed and laid hands on them, officially authorizing them and clearly transferring responsibility (v. 6).</p>
              </GreenSection>

              <GreenSection title="PHASE 3: EXPLOSIVE RESULTS (Acts 6:7)">
                <p>The outcome was immediate and dramatic: "So the word of God spread. The number of disciples in Jerusalem increased rapidly, and a large number of priests became obedient to the faith" (v. 7). Growth accelerated because:</p>
                <BulletList>
                  <BulletItem>The apostles refocused on their primary calling</BulletItem>
                  <BulletItem>New leaders handled practical needs with excellence</BulletItem>
                  <BulletItem>Cultural barriers fell through inclusive leadership</BulletItem>
                  <BulletItem>Systems were established for sustainable growth</BulletItem>
                  <BulletItem>Even priests believed—the ultimate breakthrough</BulletItem>
                </BulletList>
                <p>Maxwell's Law of Empowerment rings true: "Only secure leaders give power to others" (The 21 Irrefutable Laws of Leadership, p. 189).</p>
              </GreenSection>

              <SectionHeading>STEPHEN'S COSTLY LEADERSHIP (Acts 6:8–7:60)</SectionHeading>

              <OrangeSection title="PHASE 1: POWER AND OPPOSITION (Acts 6:8–15)">
                <p>Stephen emerged as a powerful leader. "Now Stephen, a man full of God's grace and power, performed great wonders and signs among the people" (v. 8). Opposition gathered from various synagogues. They argued with Stephen, "but they could not stand up against the wisdom the Spirit gave him as he spoke" (vv. 9–10). When debate failed, deception followed. "They secretly persuaded some men to say, 'We have heard Stephen speak blasphemous words against Moses and against God'" (v. 11). The crowd was stirred. False witnesses accused him: "This fellow never stops speaking against this holy place and against the law" (v. 13), distorting his message to say, "Jesus of Nazareth will destroy this place and change the customs Moses handed down to us" (v. 14).</p>
                <p>In the midst of hostility, Stephen's composure was supernatural: "All who were sitting in the Sanhedrin looked intently at Stephen, and they saw that his face was like the face of an angel" (v. 15). Maxwell writes, <HighlightText color="orange">"Leadership is not about avoiding storms; it's about learning to dance in the rain"</HighlightText> (Leadership Gold, p. 67).</p>
              </OrangeSection>

              <PurpleSection title="PHASE 2: THE ULTIMATE DEFENSE (Acts 7:1–53)">
                <p>Asked, "Are these charges true?" (v. 1), Stephen did not react defensively. Instead, he delivered a masterful, Spirit-empowered history that indicted his accusers. He traced God's work through:</p>
                <BulletList>
                  <BulletItem><strong>Abraham</strong> (vv. 2–8)—called out of his land</BulletItem>
                  <BulletItem><strong>Joseph</strong> (vv. 9–16)—rejected by his brothers but used by God</BulletItem>
                  <BulletItem><strong>Moses</strong> (vv. 17–44)—rejected by his people yet their deliverer</BulletItem>
                  <BulletItem><strong>Solomon</strong> (vv. 45–50)—who built the temple, while insisting, "The Most High does not live in houses made by human hands"</BulletItem>
                </BulletList>
                <p>Then came the indictment: <HighlightText color="purple">"You always resist the Holy Spirit!"</HighlightText> (vv. 51–53). The strength of Stephen's defense lay in its biblical foundation, its honest reading of Israel's historical pattern of rejecting God's messengers, its present application—"Just as your ancestors did, so do you" (v. 51)—and its direct accusation—"You who have received the law … but have not obeyed it!" (v. 53). Maxwell's Law of Connection says, "Leaders touch a heart before they ask for a hand" (The 21 Irrefutable Laws of Leadership, p. 101). Stephen connected with their history before confronting their hypocrisy.</p>
              </PurpleSection>

              <RedSection title="PHASE 3: THE ULTIMATE SACRIFICE (Acts 7:54–60)">
                <p>The council exploded with rage. "When the members of the Sanhedrin heard this, they were furious and gnashed their teeth at him" (v. 54). Stephen's eyes were lifted to heaven. "Full of the Holy Spirit, [he] looked up to heaven and saw the glory of God, and Jesus standing at the right hand of God. 'Look,' he said, 'I see heaven open and the Son of Man standing at the right hand of God'" (vv. 55–56). The mob covered their ears, rushed him, dragged him outside the city, and stoned him, while the witnesses laid their cloaks at Saul's feet (vv. 57–58).</p>
                <p>Stephen's final words echo his Lord's: "Lord Jesus, receive my spirit" (v. 59) and "Lord, do not hold this sin against them" (v. 60). He became the first Christian martyr, and in God's providence, his death accomplished more than his life.</p>
              </RedSection>

              <SectionHeading>WHAT THEY GOT: VICTORY THROUGH CRISIS AND SACRIFICE</SectionHeading>
              
              <BlueSection title="📈 From the Delegation Crisis">
                <p><strong>Immediate results:</strong></p>
                <BulletList>
                  <BulletItem>The problem was solved and complaints ceased</BulletItem>
                  <BulletItem>Seven new leaders emerged</BulletItem>
                  <BulletItem>Growth accelerated—"The number of disciples … increased rapidly" (Acts 6:7)</BulletItem>
                  <BulletItem>Cultural barriers were addressed with wisdom and equity</BulletItem>
                </BulletList>
                <p><strong>Long-term impact:</strong></p>
                <BulletList>
                  <BulletItem>Philip became an evangelist and later led the Samaritan revival (Acts 8)</BulletItem>
                  <BulletItem>Stephen's martyrdom catalyzed worldwide mission</BulletItem>
                  <BulletItem>Delegation became the standard practice of the church</BulletItem>
                  <BulletItem>"A large number of priests became obedient to the faith" (Acts 6:7)</BulletItem>
                </BulletList>
              </BlueSection>

              <YellowSection title="✨ From Stephen's Martyrdom">
                <p><strong>Immediate impact:</strong></p>
                <BulletList>
                  <BulletItem>Persecution intensified—"On that day a great persecution broke out" (Acts 8:1)</BulletItem>
                  <BulletItem>The church scattered—"All except the apostles were scattered throughout Judea and Samaria" (Acts 8:1)</BulletItem>
                  <BulletItem>The gospel spread—"Those who had been scattered preached the word wherever they went" (Acts 8:4)</BulletItem>
                  <BulletItem>Saul was impacted deeply as he witnessed the stoning, a step on his journey to conversion</BulletItem>
                </BulletList>
                <p><strong>Long-term harvest:</strong></p>
                <BulletList>
                  <BulletItem>Worldwide missions expanded under the pressure of persecution</BulletItem>
                  <BulletItem>Saul's conversion turned the church's greatest enemy into its greatest advocate</BulletItem>
                  <BulletItem>A martyrdom model of costly discipleship took root</BulletItem>
                  <BulletItem>Heaven's perspective broke in—apparent defeat on earth can be victory in heaven</BulletItem>
                </BulletList>
                <p>Maxwell observes, "Sometimes you win by losing" (Sometimes You Win, Sometimes You Learn, p. 89).</p>
              </YellowSection>

              <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
              <PurpleSection title="📚">
                <BulletList>
                  <BulletItem><strong>The Law of Priorities</strong> (The 21 Irrefutable Laws of Leadership, ch. 17) guided the apostles to focus on what only they could do—prayer and preaching</BulletItem>
                  <BulletItem><strong>The Law of Empowerment</strong> (ch. 18) was evident as they gave real authority, not just tasks, to the seven</BulletItem>
                  <BulletItem><strong>The Law of Sacrifice</strong> (ch. 18) was embodied by Stephen, who paid the ultimate price for his convictions</BulletItem>
                  <BulletItem><strong>The Law of Legacy</strong> (ch. 21) emerged as both the delegation system and Stephen's martyrdom produced lasting impact across generations and geographies</BulletItem>
                </BulletList>
              </PurpleSection>

              <SectionHeading>MODERN APPLICATION: THE CRISIS–GROWTH CONNECTION</SectionHeading>
              
              <GreenSection title="🔧 When Growth Creates Problems">
                <BulletList>
                  <BulletItem>Identify the real issue—often cultural bias, not merely logistics</BulletItem>
                  <BulletItem>Empower the affected group; don't solve for them, solve with them</BulletItem>
                  <BulletItem>Establish clear criteria that prioritize character and competence over popularity</BulletItem>
                  <BulletItem>Transfer real authority; give power, not just responsibility</BulletItem>
                </BulletList>
              </GreenSection>

              <BlueSection title="🎯 When Leaders Are Overwhelmed">
                <BulletList>
                  <BulletItem>Distinguish between what is essential and what is merely important</BulletItem>
                  <BulletItem>Identify what only you can do versus what others can do better</BulletItem>
                  <BulletItem>Develop others proactively so crisis does not force delegation</BulletItem>
                  <BulletItem>Create systems for sustainability—build processes, not just one-off fixes</BulletItem>
                  <BulletItem>Focus on your strengths, just as the apostles did with prayer and teaching while deacons handled administration</BulletItem>
                </BulletList>
              </BlueSection>

              <OrangeSection title="💪 When Facing Opposition">
                <BulletList>
                  <BulletItem>Stay calm under pressure—remember Stephen's face "like the face of an angel"</BulletItem>
                  <BulletItem>Use truth as your defense; a biblical foundation beats political maneuvering</BulletItem>
                  <BulletItem>Keep an eternal perspective—"I see heaven open"</BulletItem>
                  <BulletItem>Forgive your enemies—"Do not hold this sin against them"</BulletItem>
                </BulletList>
              </OrangeSection>

              <RedSection title="⚔️ When Making Sacrifices">
                <BulletList>
                  <BulletItem>Count the cost; leadership sometimes demands everything</BulletItem>
                  <BulletItem>Trust God's purposes; what looks like defeat may be victory</BulletItem>
                  <BulletItem>Focus on legacy; ask how your sacrifice will advance the mission</BulletItem>
                  <BulletItem>Maintain integrity; do not compromise under pressure</BulletItem>
                </BulletList>
                <p>Maxwell writes, <HighlightText color="red">"The ultimate measure of leadership is influence, and sometimes influence requires sacrifice"</HighlightText> (The 21 Indispensable Qualities of a Leader, p. 156).</p>
              </RedSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActsAudioPlayerCh3;
