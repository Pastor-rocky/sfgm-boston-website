import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft, Loader2 } from 'lucide-react';
import {
  SectionHeading,
  BlueSection,
  GreenSection,
  PurpleSection,
  RedSection,
  OrangeSection,
  YellowSection,
  ScriptureQuote,
  BulletList,
  BulletItem,
  InfoBox,
  WarningBox,
  CenterText
} from '@/components/audio-player-text-template';
import { useToast } from '@/hooks/use-toast';

const ActsAudioPlayerCh2: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  // Single combined audio file
  const audioSrc = '/uploads/textbook-audio/acts-in-action-cp2.mp3';
  const localStorageKey = 'audio_progress_acts_ch2';
  const [isLoading, setIsLoading] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      setCurrentTime(parseFloat(saved));
    }
  }, [localStorageKey]);


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


  const saveProgress = () => {
    localStorage.setItem(localStorageKey, currentTime.toString());
    toast({
      title: "Progress Saved",
      description: "Your listening progress has been saved.",
    });
  };

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audioSrc;
    link.download = 'acts-in-action-chapter2.mp3';
    link.click();
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
            <h1 className="text-xl font-bold text-white">Acts in Action - Chapter 2</h1>
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
                <p className="text-white/90 text-xl font-semibold"><span className="align-middle">Chapter 2</span> <span className="text-2xl align-text-top ml-1">🎬</span></p>
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
                
                {/* Inline audio element like Jonah */}
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

        {/* Text Content using Beautiful Audio Player Text Template */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              CHAPTER 2: POWER AND OPPOSITION
            </CardTitle>
            <p className="text-center text-purple-200 text-lg">
              Acts 3–5 — “If We Handle Opposition Like They Did ...”
            </p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <SectionHeading>WHAT THEY FACED</SectionHeading>
              <BlueSection title="💡">
                <p>The honeymoon was over. After the explosive success of Pentecost, reality hit. The religious establishment wasn’t celebrating—they were scheming. The same leaders who crucified Jesus now turned their attention to His followers. New challenges emerged on every front. There was religious opposition from the Sanhedrin (Acts 4:1–22). There was internal deception through Ananias and Sapphira (Acts 5:1–11). There was overwhelming growth that created logistical pressures (Acts 5:12–16). And there was escalating persecution, including imprisonment (Acts 5:17–42). The test was simple and searching: Would they compromise their message to reduce opposition, or maintain boldness despite increasing pressure?</p>
              </BlueSection>

              <SectionHeading>WHAT THEY DID: THE POWER–OPPOSITION CYCLE</SectionHeading>

              <GreenSection title="PHASE 1: POWER DEMONSTRATION (Acts 3:1–26)">
                <p>Peter and John were on their way to the temple for afternoon prayers—a routine activity that became extraordinary. At the gate sat a man lame from birth, more than forty years old, who asked for money to survive. Peter replied, “Silver or gold I do not have, but what I do have I give you. In the name of Jesus Christ of Nazareth, walk” (v. 6). Instantly, the man was healed, “walking and jumping, and praising God” (v. 8). As Maxwell writes, “Leadership is not about having all the resources; it’s about using what you have effectively” (The 21 Irrefutable Laws of Leadership, p. 156).</p>
                <p>A crowd gathered in amazement, and Peter immediately seized the teachable moment, turning wonder into witness. He redirected attention away from himself and John—“Why do you stare at us as if by our own power we had made this man walk?” (v. 12)—and pointed them to Jesus: “The God of Abraham, Isaac and Jacob ... has glorified his servant Jesus” (v. 13). He then called for repentance: “Repent, then, and turn to God, so that your sins may be wiped out” (v. 19). The principle is timeless. Great leaders do not take credit for God’s work; they use success to point people to the source.</p>
              </GreenSection>

              <GreenSection title="PHASE 2: OPPOSITION RESPONSE (Acts 4:1–22)">
                <p>The temple guard, Sadducees, and priests arrested Peter and John because they were teaching the people and proclaiming Jesus. Yet even in the midst of opposition, fruit remained. “Many who heard the message believed; so the number of men who believed grew to about five thousand” (v. 4).</p>
                <p>Brought before the same Sanhedrin that condemned Jesus, Peter—filled with the Holy Spirit—delivered a clear and courageous defense. He answered directly: “If we are being called to account today for an act of kindness ...” (v. 9). He proclaimed Christ: “It is by the name of Jesus Christ of Nazareth ... that this man stands before you healed” (v. 10). And he made the truth exclusive and unmistakable: “Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved” (v. 12). Maxwell’s Law of Courage reminds us, “Courage is fear that has said its prayers” (The 21 Indispensable Qualities of a Leader, p. 45).</p>
                <p>The leaders faced a dilemma. They recognized that the apostles had been with Jesus (v. 13). They could not deny the miracle—the man stood there healed (v. 14). They could not stop the public momentum (v. 16). And they dared not punish the apostles without risking a riot (vv. 17–21). Peter and John’s response captured the heart of spiritual leadership: “Which is right in God’s eyes: to listen to you, or to him? You be the judges! As for us, we cannot help speaking about what we have seen and heard” (vv. 19–20). The leadership principle is clear. When faced with opposition, great leaders stay focused on their mission rather than their critics.</p>
              </GreenSection>

              <GreenSection title="PHASE 3: POWER MULTIPLICATION (Acts 4:23–37)">
                <p>Released from custody, the apostles did not convene a strategy session or launch a public relations campaign. They prayed. Their prayer focused on God’s sovereignty: “Sovereign Lord, you made the heavens and the earth” (v. 24). They framed their situation with Scripture, quoting Psalm 2 about opposition to God’s anointed (vv. 25–26). They acknowledged current realities: “Indeed Herod and Pontius Pilate met together ... to conspire against your holy servant Jesus” (vv. 27–28). And they asked boldly: “Enable your servants to speak your word with great boldness” (v. 29). God answered in power. “After they prayed, the place where they were meeting was shaken. And they were all filled with the Holy Spirit and spoke the word of God boldly” (v. 31). Maxwell observes, “The best leaders respond to pressure by going to their source of strength” (Leadership Gold, p. 78).</p>
                <p>Opposition did not divide the church. It unified them. With one heart and mind, no one claimed that any possession was their own (v. 32). With great power, the apostles continued to testify to the resurrection (v. 33). Generosity marked the community: “There were no needy persons among them” (vv. 34–35). Barnabas modeled leadership by selling a field and giving the proceeds (vv. 36–37).</p>
              </GreenSection>

              <RedSection title="PHASE 4: INTERNAL CRISIS (Acts 5:1–16)">
                <p>The greatest threats are not always external. Ananias and Sapphira sold property but secretly kept back part of the money while pretending to give it all. Peter confronted the deception, identifying the real enemy—“Satan has filled your heart to lie to the Holy Spirit” (v. 3)—and clarifying the issue. The problem was not the amount given but the lie itself (v. 4). God’s judgment fell, and both died immediately (vv. 5, 10). “Great fear seized the whole church and all who heard about these events” (v. 11). Maxwell’s Law of Solid Ground declares, “Trust is the foundation of leadership” (The 21 Irrefutable Laws of Leadership, p. 67).</p>
                <p>Far from damaging the church, this discipline increased credibility. Many signs and wonders were done among the people (v. 12). Respect grew—“No one else dared join them, even though they were highly regarded” (v. 13). Yet the church continued to grow explosively—“More and more men and women believed in the Lord and were added to their number” (v. 14). The impact spread regionally as crowds gathered from towns around Jerusalem (v. 16).</p>
              </RedSection>

              <OrangeSection title="PHASE 5: ESCALATING PERSECUTION (Acts 5:17–42)">
                <p>The high priest and the Sadducees arrested all the apostles and put them in public jail (vv. 17–18). During the night, an angel opened the doors and sent them back to their post with a simple command: “Go, stand in the temple courts and tell the people all about this new life” (vv. 19–21a). At daybreak, they obeyed, teaching the people as instructed (v. 21b). The authorities were bewildered. The jail was secure and empty, while the “prisoners” were preaching in the temple (vv. 22–26).</p>
                <p>Once again before the Sanhedrin, the apostles faced a direct accusation: “We gave you strict orders not to teach in this name ... yet you have filled Jerusalem with your teaching” (v. 28). Peter answered with the creed of courageous obedience: “We must obey God rather than human beings!” (v. 29). He preached the gospel again and concluded, “We are witnesses of these things, and so is the Holy Spirit, whom God has given to those who obey him” (v. 32). When the Sanhedrin wanted to kill them, Gamaliel—Paul’s future teacher—offered wise counsel: “Leave these men alone! Let them go! For if their purpose or activity is of human origin, it will fail. But if it is from God, you will not be able to stop these men; you will only find yourselves fighting against God” (vv. 38–39).</p>
                <p>The final outcome was sobering and inspiring. The apostles were flogged for defying orders, yet they rejoiced “because they had been counted worthy of suffering disgrace for the Name” (v. 41). They did not retreat. They continued daily, in the temple and from house to house, teaching and proclaiming Jesus as the Messiah (v. 42). Maxwell writes, “The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy” (The 21 Indispensable Qualities of a Leader, p. 67).</p>
              </OrangeSection>

              <SectionHeading>WHAT THEY GOT: VICTORY THROUGH OPPOSITION</SectionHeading>
              <PurpleSection title="📈">
                <p>Numbers grew despite pressure. The church moved from 3,000 (Acts 2:41) to 5,000 men (Acts 4:4), and “more and more men and women believed” (Acts 5:14). The impact expanded regionally beyond Jerusalem (Acts 5:16). Spiritual maturity deepened. They showed boldness under pressure as they spoke truth to power. Unity strengthened in crisis. Joy flourished in suffering as they rejoiced in persecution (Acts 5:41). Integrity was protected as they dealt decisively with internal sin. Leadership developed rapidly. Peter was transformed from denier to defender of the faith. The apostles stood in solidarity. They used every crisis as an opportunity and relied on God’s power rather than human wisdom. Public impact increased. They were highly regarded by the people (Acts 5:13). Holy fear gripped the church (Acts 5:11). They enjoyed favor that continued to fuel growth. Their influence filled the city—“You have filled Jerusalem with your teaching” (Acts 5:28).</p>
              </PurpleSection>

              <SectionHeading>MAXWELL’S LEADERSHIP LAWS IN ACTION</SectionHeading>
              <BlueSection title="📘">
                <p>They faced the Law of the Test—“Every leader faces tests that reveal character” (The 21 Most Powerful Minutes in a Leader’s Day, p. 89). They proved the Law of Solid Ground as integrity under pressure built unshakeable trust (The 21 Irrefutable Laws of Leadership, ch. 6). They embraced the Law of Sacrifice by giving up comfort and safety for the mission (ch. 18). And they lived the Law of Victory by finding ways to win even when circumstances looked impossible (ch. 15).</p>
              </BlueSection>

              <SectionHeading>MODERN APPLICATION: THE OPPOSITION–OPPORTUNITY PRINCIPLE</SectionHeading>
              <YellowSection title="🔧">
                <p>When you face religious opposition, stay focused on your mission, not your critics. Respond with boldness rather than defensiveness. Point to God’s power, not your own abilities. Guard unity under pressure so your team remains one heart and mind.</p>
                <p>When experiencing rapid growth, never compromise integrity for the sake of numbers. Address internal issues quickly and decisively. Keep your systems aligned with your values. Use success to point people to God rather than to yourself.</p>
                <p>When dealing with persecution, respond with prayer before strategy. Choose joy in being counted worthy to suffer for His Name. Continue your mission regardless of the consequences. Trust God’s sovereignty over human opposition. Maxwell observes, “Every problem introduces a person to himself” (Failing Forward, p. 156)</p>
              </YellowSection>

              <SectionHeading>SUMMARY</SectionHeading>
              <PurpleSection title="📌 Key Takeaways">
                <BulletList>
                  <BulletItem>Opposition clarified mission and produced boldness, not retreat.</BulletItem>
                  <BulletItem>Prayer first, power next—bold witness flowed from fresh filling.</BulletItem>
                  <BulletItem>Integrity protected credibility; discipline guarded the church.</BulletItem>
                  <BulletItem>Obedience under pressure multiplied impact across the region.</BulletItem>
                  <BulletItem>Leaders leveraged every crisis to point people to Jesus.</BulletItem>
                </BulletList>
              </PurpleSection>

              <SectionHeading>REFLECTION</SectionHeading>
              <BlueSection title="📝 This Week">
                <BulletList>
                  <BulletItem>Where am I facing opposition—and what mission focus must I restate?</BulletItem>
                  <BulletItem>What integrity issue needs decisive action to protect credibility?</BulletItem>
                  <BulletItem>When will I set aside time to pray first and ask for boldness?</BulletItem>
                </BulletList>
              </BlueSection>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Removed hidden audio element to match Jonah style */}
    </div>
  );
};

export default ActsAudioPlayerCh2;