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

const ActsAudioPlayerCh5: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioSrc = '/uploads/textbook-audio/acts-in-action-cp5.mp3';
  const localStorageKey = 'audio_progress_acts_ch5';

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
            <h1 className="text-xl font-bold text-white">Acts in Action - Chapter 5</h1>
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
                <p className="text-white/90 text-xl font-semibold"><span className="align-middle">Chapter 5</span> <span className="text-2xl align-text-top ml-1">🎬</span></p>
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
              CHAPTER 5: BREAKING BARRIERS
            </CardTitle>
            <p className="text-center text-purple-200 text-lg">
              Acts 10–12 — "If We Break Barriers Like They Did …"
            </p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <SectionHeading>WHAT THEY FACED</SectionHeading>
              <RedSection title="🚧">
                <p>They were standing before the ultimate barrier. For 1,500 years, Jews had been taught that Gentiles were unclean, unreachable, and unwelcome in God's covenant. Now God was about to shatter that barrier forever. The leadership challenge was complex:</p>
                <BulletList>
                  <BulletItem>Peter's own prejudice surfaced in his confession, "I have never eaten anything impure or unclean" (Acts 10:14)</BulletItem>
                  <BulletItem>Jewish expectations had long assumed the Messiah would restore Israel, not include the nations</BulletItem>
                  <BulletItem>Church unity was at stake—how do you integrate people with completely different backgrounds?</BulletItem>
                  <BulletItem>A doctrinal question pressed for clarity: Must Gentiles become Jews first to become Christians?</BulletItem>
                </BulletList>
                <p>The stakes could not have been higher. This decision would determine whether Christianity remained a Jewish sect or became a global movement. Maxwell writes, <HighlightText color="red">"The biggest barriers to breakthrough are often in our own minds"</HighlightText> (Thinking for a Change, p. 89).</p>
              </RedSection>

              <SectionHeading>WHAT THEY DID: DIVINE VISION MEETS HUMAN OBEDIENCE</SectionHeading>

              <GreenSection title="PHASE 1: PETER'S PARADIGM SHIFT (Acts 10:1–23)">
                <p>God began the breakthrough with two visions and one Spirit-led meeting. Cornelius, a Roman centurion described as devout and God-fearing, received angelic instruction: "Send men to Joppa to bring back a man named Simon who is called Peter" (vv. 1–8, esp. v. 5). Meanwhile, on a rooftop in Joppa, Peter fell into a trance and saw a sheet filled with unclean animals. He heard the voice of God: "Get up, Peter. Kill and eat" (v. 13). Peter resisted: "Surely not, Lord! I have never eaten anything impure or unclean" (v. 14). God replied, <HighlightText color="green">"Do not call anything impure that God has made clean"</HighlightText> (v. 15). The vision repeated three times. God was insisting on a paradigm shift. As Maxwell's Law of Process reminds us, "Leadership develops daily, not in a day" (The 21 Irrefutable Laws of Leadership, p. 23). Even Peter needed time and repetition to grasp the magnitude of this change.</p>
                <p>While Peter pondered the vision, Cornelius's messengers arrived. The Holy Spirit said, "Do not hesitate to go with them, for I have sent them" (v. 20). Peter obeyed at once, inviting the Gentile messengers into the house—breaking Jewish custom—and left with them the next day (vv. 21–23).</p>
              </GreenSection>

              <GreenSection title="PHASE 2: THE CAESAREA BREAKTHROUGH (Acts 10:24–48)">
                <p>In Caesarea, Cornelius had gathered family and friends. When Peter entered, Cornelius fell at his feet, but Peter lifted him up. "Stand up; I am only a human being" (v. 26). Then Peter declared the new paradigm: <HighlightText color="green">"You are well aware that it is against our law for a Jew to associate with or visit a Gentile. But God has shown me that I should not call anyone impure or unclean. So when I was sent for, I came without raising any objection"</HighlightText> (vv. 28–29). Cornelius explained his vision and concluded, "Now we are all here in the presence of God to listen to everything the Lord has commanded you to tell us" (vv. 30–33).</p>
                <p>Peter's sermon was revolutionary. "I now realize how true it is that God does not show favoritism but accepts from every nation the one who fears him and does what is right" (vv. 34–35). He preached Jesus—His life and ministry, "doing good and healing all who were under the power of the devil" (v. 38), His death and resurrection, "They killed him by hanging him on a cross. But God raised him from the dead" (vv. 39–40), and His universal offer of forgiveness: "Everyone who believes in him receives forgiveness of sins through his name" (v. 43).</p>
                <p>God interrupted the sermon with the Holy Spirit. "While Peter was still speaking these words, the Holy Spirit came on all who heard the message. The circumcised believers … were astonished that the gift of the Holy Spirit had been poured out even on Gentiles, for they heard them speaking in tongues and praising God" (vv. 44–46). Peter responded decisively: "Surely no one can stand in the way of their being baptized with water. They have received the Holy Spirit just as we have." He ordered that they be baptized in the name of Jesus Christ (vv. 47–48). Leadership learns this lesson well: when God moves, great leaders adapt their methods to align with His purposes. As Maxwell observes, <HighlightText color="green">"Leaders must be quick to adapt but slow to abandon their core values"</HighlightText> (Leadership Gold, p. 134).</p>
              </GreenSection>

              <GreenSection title="PHASE 3: THE JERUSALEM CONFRONTATION (Acts 11:1–18)">
                <p>News spread quickly. "The apostles and the believers throughout Judea heard that the Gentiles also had received the word of God." When Peter returned to Jerusalem, some criticized, "You went into the house of uncircumcised men and ate with them" (vv. 1–3). Peter did not react defensively. He "began and explained everything … precisely as it had happened" (v. 4). He recounted the vision and God's command, described the Spirit's direction—"The Spirit told me to have no hesitation about going with them"—and reported the parallel experience—"The Holy Spirit came on them as he had come on us at the beginning" (vv. 12, 15). His conclusion was unassailable: <HighlightText color="green">"So if God gave them the same gift he gave us who believed in the Lord Jesus Christ, who was I to think that I could stand in God's way?"</HighlightText> (v. 17). The church fell silent, then praised God. "So then, even to Gentiles God has granted repentance that leads to life" (v. 18). Maxwell's Law of Buy-In applies: "People buy into the leader, then the vision" (The 21 Irrefutable Laws of Leadership, p. 137). Peter's credibility carried the day.</p>
              </GreenSection>

              <GreenSection title="PHASE 4: THE ANTIOCH EXPLOSION (Acts 11:19–30)">
                <p>The persecution that followed Stephen's death had scattered believers far and wide. Many spoke only to Jews, but some from Cyprus and Cyrene went to Antioch and preached to Greeks as well (vv. 19–20). "The Lord's hand was with them, and a great number of people believed and turned to the Lord" (v. 21). Jerusalem sent Barnabas to investigate. "When he arrived and saw what the grace of God had done, he was glad and encouraged them all to remain true to the Lord with all their hearts" (v. 23). Barnabas proved an encourager, "a good man, full of the Holy Spirit and faith," and the church grew even more (v. 24). He showed his skill as a recruiter and developer by going to Tarsus to find Saul and bringing him to Antioch. For a full year, they taught great numbers (vv. 25–26). The impact was seismic. <HighlightText color="green">"The disciples were called Christians first at Antioch"</HighlightText> (v. 26). A new identity formed around Christ, not ethnicity or prior religious affiliation.</p>
              </GreenSection>

              <RedSection title="PHASE 5: THE PERSECUTION CYCLE (Acts 12:1–25)">
                <p>Meanwhile, persecution surged. King Herod arrested believers, executed James the brother of John, and then seized Peter (vv. 1–3). "So Peter was kept in prison, but the church was earnestly praying to God for him" (v. 5). God sent an angel; chains fell, guards slept, iron gates opened, and Peter walked free. "Now I know without a doubt that the Lord has sent his angel and rescued me from Herod's clutches" (v. 11). Peter went to the prayer meeting at Mary's house, where believers struggled to believe their prayer had been answered—"You're out of your mind!" they told Rhoda when she reported Peter at the door (v. 15). It is a sobering leadership insight: sometimes the church prays for miracles but struggles to believe when they happen.</p>
                <p>Herod's pride proved fatal. After accepting the crowd's worship as if he were a god, "immediately, because Herod did not give praise to God, an angel of the Lord struck him down, and he was eaten by worms and died. But the word of God continued to spread and flourish" (vv. 23–24). Maxwell warns, <HighlightText color="red">"Pride goes before destruction, and leadership without humility is leadership without longevity"</HighlightText> (The 21 Indispensable Qualities of a Leader, p. 78).</p>
              </RedSection>

              <SectionHeading>WHAT THEY GOT: THE GLOBAL CHURCH</SectionHeading>

              <BlueSection title="⛪ Theological Breakthroughs">
                <BulletList>
                  <BulletItem>God's people embraced Gentile inclusion—"God does not show favoritism" (Acts 10:34)</BulletItem>
                  <BulletItem>Salvation was proclaimed as universal in scope—"Everyone who believes in him receives forgiveness" (Acts 10:43)</BulletItem>
                  <BulletItem>Equal access was confirmed as Gentiles received the Holy Spirit just as Jews had</BulletItem>
                  <BulletItem>A new identity emerged—"Christians"—followers of Christ, not converts to Judaism</BulletItem>
                </BulletList>
              </BlueSection>

              <PurpleSection title="🌍 Geographic Expansion">
                <p>The gospel advanced into:</p>
                <BulletList>
                  <BulletItem>Caesarea, a Roman military center</BulletItem>
                  <BulletItem>Antioch, a major commercial hub that became a mission base</BulletItem>
                  <BulletItem>Beyond, as evangelists from Cyprus and Cyrene pioneered cross-cultural work</BulletItem>
                  <BulletItem>The foundation for worldwide missions was laid</BulletItem>
                </BulletList>
              </PurpleSection>

              <YellowSection title="👥 Leadership Development">
                <BulletList>
                  <BulletItem>Peter grew from a prejudiced fisherman into a barrier-breaking apostle</BulletItem>
                  <BulletItem>Barnabas encouraged, recruited, and developed leaders</BulletItem>
                  <BulletItem>Paul was brought from Tarsus to Antioch for preparation</BulletItem>
                  <BulletItem>Local Gentile believers were quickly integrated into ministry</BulletItem>
                </BulletList>
              </YellowSection>

              <GreenSection title="🏗️ Organizational Maturity">
                <p>Structures flexed without fracturing:</p>
                <BulletList>
                  <BulletItem>Jerusalem remained a center but no longer the sole authority</BulletItem>
                  <BulletItem>Antioch became a launch pad for future missions</BulletItem>
                  <BulletItem>Diversity was celebrated as Jews and Gentiles worshiped together</BulletItem>
                  <BulletItem>Unity was maintained despite cultural differences</BulletItem>
                </BulletList>
              </GreenSection>

              <OrangeSection title="🎯 Mission Strategy Evolution">
                <BulletList>
                  <BulletItem>The church learned cross-cultural competence—adapting methods while maintaining the message</BulletItem>
                  <BulletItem>God validated the barrier-breaking with signs and wonders</BulletItem>
                  <BulletItem>Local ownership grew as new believers took immediate leadership</BulletItem>
                  <BulletItem>A multiplication mindset took root—every barrier broken opened new territory</BulletItem>
                </BulletList>
              </OrangeSection>

              <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
              <BlueSection title="📚">
                <BulletList>
                  <BulletItem><strong>The Law of Navigation</strong>: Peter's journey through cultural prejudice toward God's global vision (The 21 Irrefutable Laws of Leadership, ch. 3)</BulletItem>
                  <BulletItem><strong>The Law of Solid Ground</strong>: Peter's integrity enabled the Jerusalem church to trust his controversial decisions (ch. 6)</BulletItem>
                  <BulletItem><strong>The Law of Connection</strong>: Barnabas bridged Jewish and Gentile believers (ch. 10)</BulletItem>
                  <BulletItem><strong>The Law of Explosive Growth</strong>: Breaking barriers led to multiplication, not mere addition (ch. 19)</BulletItem>
                </BulletList>
              </BlueSection>

              <SectionHeading>MODERN APPLICATION: THE BARRIER-BREAKING BLUEPRINT</SectionHeading>

              <PurpleSection title="🔍 Identify Barriers to Break">
                <p><strong>Cultural barriers:</strong></p>
                <BulletList>
                  <BulletItem>Racial prejudice</BulletItem>
                  <BulletItem>Class divides</BulletItem>
                  <BulletItem>Generational gaps</BulletItem>
                  <BulletItem>Language limitations</BulletItem>
                </BulletList>
                <p><strong>Religious barriers:</strong></p>
                <BulletList>
                  <BulletItem>Denominational walls</BulletItem>
                  <BulletItem>Theological prejudices</BulletItem>
                  <BulletItem>Lifestyle judgments</BulletItem>
                  <BulletItem>Painful past experiences that block new relationships</BulletItem>
                </BulletList>
                <p>Ask: Who cannot access your ministry and why? Name them honestly.</p>
              </PurpleSection>

              <GreenSection title="🎯 Follow the Peter Process">
                <p><strong>Step 1: Divine Vision (Acts 10:9–16)</strong></p>
                <BulletList>
                  <BulletItem>Pray regularly, and stay open to God challenging your assumptions</BulletItem>
                  <BulletItem>Listen carefully—He may repeat crucial messages</BulletItem>
                  <BulletItem>Be willing to move from "I have never …" to "I will now …"</BulletItem>
                </BulletList>
                <p><strong>Step 2: Courageous Obedience (Acts 10:17–23)</strong></p>
                <BulletList>
                  <BulletItem>Act despite uncertainty; Peter did not fully understand yet obeyed</BulletItem>
                  <BulletItem>Break your own rules when love requires stepping beyond comfort</BulletItem>
                  <BulletItem>Bring others along as witnesses and partners</BulletItem>
                  <BulletItem>Move quickly—do not let fear talk you out of God's direction</BulletItem>
                </BulletList>
                <p><strong>Step 3: Authentic Connection (Acts 10:24–43)</strong></p>
                <BulletList>
                  <BulletItem>Start with humility—"I am only a human being"</BulletItem>
                  <BulletItem>Share your growth—"God has shown me …"</BulletItem>
                  <BulletItem>Keep the gospel central across cultures</BulletItem>
                  <BulletItem>Expect God to move; be ready for supernatural confirmation</BulletItem>
                </BulletList>
                <p><strong>Step 4: Defend Your Actions (Acts 11:1–18)</strong></p>
                <BulletList>
                  <BulletItem>Tell the whole story—do not merely defend conclusions; explain God's process</BulletItem>
                  <BulletItem>Point to His activity—"Who was I to think that I could stand in God's way?"</BulletItem>
                  <BulletItem>Stay united by helping others see what God is doing</BulletItem>
                  <BulletItem>Praise Him together when breakthroughs come</BulletItem>
                </BulletList>
              </GreenSection>

              <OrangeSection title="🌉 Build a Barrier-Breaking Culture">
                <BulletList>
                  <BulletItem>Develop leaders who are natural bridge-builders—find your Barnabases</BulletItem>
                  <BulletItem>Train your team for cultural competence</BulletItem>
                  <BulletItem>Create diverse leadership that reflects the people you aim to reach</BulletItem>
                  <BulletItem>Celebrate and share stories of barriers falling</BulletItem>
                  <BulletItem>Align organizational systems with your mission</BulletItem>
                  <BulletItem>Audit for hidden barriers that keep some from feeling welcome</BulletItem>
                  <BulletItem>Adapt communication to how different groups receive information</BulletItem>
                  <BulletItem>Keep the message while changing the methods</BulletItem>
                  <BulletItem>Measure inclusion so you know whether diversity is real or imagined</BulletItem>
                </BulletList>
                <p>Maxwell observes, <HighlightText color="orange">"Diversity is not about political correctness; it's about kingdom effectiveness"</HighlightText> (Everyone Communicates, Few Connect, p. 89).</p>
              </OrangeSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActsAudioPlayerCh5;

