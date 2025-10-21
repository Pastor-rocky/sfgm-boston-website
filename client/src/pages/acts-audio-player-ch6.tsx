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

const ActsAudioPlayerCh6: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioSrc = '/uploads/textbook-audio/acts-in-action-cp6.mp3';
  const localStorageKey = 'audio_progress_acts_ch6';

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
            <h1 className="text-xl font-bold text-white">Acts in Action - Chapter 6</h1>
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
                <p className="text-white/90 text-xl font-semibold"><span className="align-middle">Chapter 6</span> <span className="text-2xl align-text-top ml-1">🎬</span></p>
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
              CHAPTER 6: FIRST MISSIONARY JOURNEY
            </CardTitle>
            <p className="text-center text-purple-200 text-lg">
              Acts 13–15 — "If We Go Global Like They Did …"
            </p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <SectionHeading>WHAT THEY FACED</SectionHeading>
              <BlueSection title="🌍">
                <p>The barrier-breaking breakthrough with Gentiles created a new question: How do you systematically reach the unreached world? The church at Antioch emerged as a launch pad—a diverse community ready to send missionaries into uncharted territory. The challenges were significant:</p>
                <BulletList>
                  <BulletItem>There was no roadmap for cross-cultural church planting</BulletItem>
                  <BulletItem>Cultural complexity was real: How much should Gentiles adopt Jewish customs?</BulletItem>
                  <BulletItem>Opposition waited in every direction, from both Jewish and pagan communities</BulletItem>
                  <BulletItem>Leadership questions pressed in: Who leads? Who sends? Who decides policy?</BulletItem>
                </BulletList>
                <p>Could they develop a reproducible strategy for global missions that would work in any culture? As Maxwell writes, <HighlightText color="blue">"Vision without a strategy remains an illusion"</HighlightText> (The 21 Irrefutable Laws of Leadership, p. 45).</p>
              </BlueSection>

              <SectionHeading>WHAT THEY DID: THE STRATEGIC MISSIONS BLUEPRINT</SectionHeading>

              <GreenSection title="PHASE 1: DIVINE SENDING (Acts 13:1–3)">
                <p>The leadership team at Antioch included Barnabas, Simeon called Niger, Lucius of Cyrene, Manaen (who had been brought up with Herod the tetrarch), and Saul (v. 1). Their diversity was itself a statement of the gospel's reach:</p>
                <BulletList>
                  <BulletItem>Barnabas, a Jewish Levite from Cyprus</BulletItem>
                  <BulletItem>Simeon called Niger, likely African (Niger means "black")</BulletItem>
                  <BulletItem>Lucius from Cyrene in North Africa</BulletItem>
                  <BulletItem>Manaen, connected to political power</BulletItem>
                  <BulletItem>Saul, a former Pharisee and Roman citizen</BulletItem>
                </BulletList>
                <p>While they were worshiping the Lord and fasting, the Holy Spirit spoke clearly: <HighlightText color="green">"Set apart for me Barnabas and Saul for the work to which I have called them"</HighlightText> (v. 2). So, after further fasting and prayer, the church laid hands on them and sent them off (v. 3).</p>
                <p>Notice the order and principles at work:</p>
                <BulletList>
                  <BulletItem>Worship preceded work; the call came in the context of worship</BulletItem>
                  <BulletItem>Prayer confirmed direction; fasting and prayer preceded sending</BulletItem>
                  <BulletItem>The team validated the calling; there was corporate confirmation of an individual call</BulletItem>
                  <BulletItem>Authority transferred through the laying on of hands, signaling official authorization</BulletItem>
                </BulletList>
                <p>As Maxwell's Law of Process reminds us, "Leadership develops daily, not in a day" (The 21 Irrefutable Laws of Leadership, p. 23).</p>
              </GreenSection>

              <GreenSection title="PHASE 2: THE REPRODUCIBLE METHOD (Acts 13:4–14:28)">
                <p><strong>Cyprus (13:4–12):</strong> Strategically, they began with Barnabas's homeland—familiar territory first. Opposition arose quickly. Bar-Jesus, a sorcerer, tried to turn the proconsul away from the faith. Paul confronted him: "You are a child of the devil and an enemy of everything that is right!" (v. 10), and the sorcerer was struck blind. The result was powerful: "When the proconsul saw what had happened, he believed, for he was amazed at the teaching about the Lord" (v. 12). From there, a leadership shift becomes evident: "From Paphos, Paul and his companions sailed to Perga in Pamphylia" (v. 13). It is now "Paul and his companions," not "Barnabas and Saul."</p>
                <p><strong>Pisidian Antioch (13:13–52):</strong> They entered the synagogue on the Sabbath and sat down (v. 14). Paul's method was consistent and wise:</p>
                <BulletList>
                  <BulletItem>He started with Scripture, using the Old Testament as a foundation</BulletItem>
                  <BulletItem>He connected the promises to Christ: "What God promised our ancestors he has fulfilled for us, their children, by raising up Jesus" (vv. 32–33)</BulletItem>
                  <BulletItem>He called for decision: "Through Jesus the forgiveness of sins is proclaimed to you" (v. 38)</BulletItem>
                </BulletList>
                <p>The audience response moved through a familiar arc—initial interest as many Jews and devout converts followed Paul and Barnabas (v. 43), swelling crowds until almost the whole city gathered to hear the word of the Lord (v. 44), and rising religious opposition as jealousy took root (v. 45). This led to a pivotal decision: <HighlightText color="green">"We had to speak the word of God to you first. Since you reject it and do not consider yourselves worthy of eternal life, we now turn to the Gentiles"</HighlightText> (vv. 46–47). The Gentiles received the message with joy, honored the word, and those appointed to eternal life believed, as the word spread through the whole region (vv. 48–49). Persecution was organized against the missionaries, and they were expelled, but they shook the dust from their feet and went to Iconium. The disciples, nevertheless, were filled with joy and with the Holy Spirit (vv. 50–52).</p>
                <p><strong>Iconium and Lystra (14:1–20):</strong> The same pattern unfolded. They began in the synagogue, met a mixed response, and ministered with signs and wonders as the Lord confirmed the message of His grace (14:3). Opposition intensified, with plots to stone them. In Lystra, Paul healed a man lame from birth, and the crowd cried, "The gods have come down to us in human form!" They called Barnabas Zeus and Paul Hermes. Paul's response was humble and clear: "Friends, why are you doing this? We too are only human, like you. We are bringing you good news, telling you to turn from these worthless things to the living God" (v. 15). Soon after, opponents from Antioch and Iconium turned the crowd, and Paul was stoned and dragged outside the city, thought to be dead. But when the disciples gathered around him, he rose and went back into the city (vv. 19–20). As Maxwell observes, <HighlightText color="green">"The measure of a leader is not what he does in moments of comfort and convenience, but what he does in times of challenge and controversy"</HighlightText> (The 21 Indispensable Qualities of a Leader, p. 67).</p>
              </GreenSection>

              <GreenSection title="PHASE 3: CHURCH ESTABLISHMENT (Acts 14:21–28)">
                <p>On the return journey, their strategy was intentional:</p>
                <BulletList>
                  <BulletItem>They made disciples—"They preached the gospel in that city and won a large number of disciples"</BulletItem>
                  <BulletItem>They strengthened churches—returning to Lystra, Iconium, and Antioch to strengthen the disciples</BulletItem>
                  <BulletItem>They appointed leaders—elders in every church</BulletItem>
                  <BulletItem>They committed these leaders and churches to the Lord with prayer and fasting (vv. 21–23)</BulletItem>
                </BulletList>
                <p>The model was reproducible: <strong>evangelize</strong> by preaching the gospel, <strong>establish</strong> by planting churches, <strong>equip</strong> by appointing local leaders, <strong>encourage</strong> by returning to strengthen, and <strong>entrust</strong> by committing the work to God's care. Finally, they sailed back to Antioch, gathered the church, and reported "all that God had done through them and how he had opened a door of faith to the Gentiles" (vv. 24–28).</p>
              </GreenSection>

              <RedSection title="PHASE 4: THE GENTILE CONTROVERSY (Acts 15:1–35)">
                <p>A crisis arose in Antioch when some taught, "Unless you are circumcised, according to the custom taught by Moses, you cannot be saved" (v. 1). This was not a small matter. It touched the very heart of the gospel and the future of the movement. Would Christianity remain a Jewish sect or become a global faith?</p>
                <p>At the Jerusalem Council, Peter reminded the assembly that God had already shown His will by giving the Holy Spirit to Gentiles, just as He had to Jews. <HighlightText color="red">"We believe it is through the grace of our Lord Jesus that we are saved, just as they are"</HighlightText> (vv. 7–11). Paul and Barnabas recounted the signs and wonders God had done among the Gentiles through their ministry (v. 12). Then James, leading the church in Jerusalem, rendered judgment: "We should not make it difficult for the Gentiles who are turning to God. Instead we should write to them, telling them to abstain from food polluted by idols, from sexual immorality, from the meat of strangled animals, and from blood" (vv. 19–20). An official letter was sent, affirming that Gentiles did not need circumcision, but should abstain from practices that would unnecessarily offend Jewish believers (vv. 22–29). The result was joy and encouragement as the believers received the decision and were strengthened (vv. 30–35). As Maxwell's Law of Navigation says, "Anyone can steer the ship, but it takes a leader to chart the course" (The 21 Irrefutable Laws of Leadership, p. 17). The Jerusalem Council charted the course for global Christianity.</p>
              </RedSection>

              <SectionHeading>WHAT THEY GOT: THE GLOBAL CHURCH BLUEPRINT</SectionHeading>

              <PurpleSection title="🗺️ Strategic Methodology">
                <p>From these labors emerged a strategic, reproducible methodology:</p>
                <BulletList>
                  <BulletItem>The pattern was systematic—begin in the synagogue, then turn to the Gentiles, plant a church, appoint leaders, and move on, trusting God with ongoing growth</BulletItem>
                  <BulletItem>The message remained the same, while methods flexed to fit culture</BulletItem>
                  <BulletItem>Indigenous leadership was the default, with local believers leading from day one</BulletItem>
                  <BulletItem>Ongoing support came through return visits that strengthened and encouraged</BulletItem>
                </BulletList>
              </PurpleSection>

              <BlueSection title="⛪ Theological Clarity">
                <p>The church clarified essential truths:</p>
                <BulletList>
                  <BulletItem>Salvation is by grace through faith alone—not faith plus works</BulletItem>
                  <BulletItem>Gentiles did not need to become Jews to become Christians</BulletItem>
                  <BulletItem>Unity was defined by gospel essentials, while cultural diversity was honored</BulletItem>
                  <BulletItem>The vision expanded toward every nation, tribe, and tongue</BulletItem>
                </BulletList>
              </BlueSection>

              <YellowSection title="🏗️ Organizational Structure">
                <BulletList>
                  <BulletItem>Sending churches commissioned missionaries</BulletItem>
                  <BulletItem>Ministry was done in teams, not solo</BulletItem>
                  <BulletItem>Accountability was practiced through reports back to sending churches</BulletItem>
                  <BulletItem>Leadership development was immediate, with a clear focus on raising up local leaders</BulletItem>
                </BulletList>
              </YellowSection>

              <GreenSection title="📈 Measurable Results">
                <p><strong>Geographic expansion:</strong></p>
                <BulletList>
                  <BulletItem>The gospel advanced through Cyprus and Galatia</BulletItem>
                  <BulletItem>Foundations were laid across Asia Minor</BulletItem>
                  <BulletItem>The strategy was proven and ready for replication</BulletItem>
                </BulletList>
                <p><strong>Leadership multiplication:</strong></p>
                <BulletList>
                  <BulletItem>Paul emerged as a primary missionary</BulletItem>
                  <BulletItem>Elders were appointed locally</BulletItem>
                  <BulletItem>Team members like Silas and Timothy were recruited</BulletItem>
                </BulletList>
                <p><strong>Church planting:</strong></p>
                <BulletList>
                  <BulletItem>Every stop resulted in new congregations</BulletItem>
                </BulletList>
                <p><strong>Cultural integration:</strong></p>
                <BulletList>
                  <BulletItem>Gentile inclusion was affirmed by official policy</BulletItem>
                  <BulletItem>Jewish–Gentile unity was modeled through practical solutions</BulletItem>
                  <BulletItem>A global identity crystallized around the name "Christian," born in the diversity of Antioch</BulletItem>
                  <BulletItem>Missional DNA took root: every church became a sending church</BulletItem>
                </BulletList>
              </GreenSection>

              <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
              <OrangeSection title="📚">
                <BulletList>
                  <BulletItem><strong>The Law of Legacy:</strong> Building systems that would outlast them</BulletItem>
                  <BulletItem><strong>The Law of Explosive Growth:</strong> Multiplying leaders for exponential expansion</BulletItem>
                  <BulletItem><strong>The Law of Navigation:</strong> The Jerusalem Council guided the church through its most crucial decision</BulletItem>
                  <BulletItem><strong>The Law of Sacrifice:</strong> Paul endured stoning and relentless opposition for the sake of the mission</BulletItem>
                </BulletList>
              </OrangeSection>

              <SectionHeading>MODERN APPLICATION: THE GLOBAL MISSIONS MODEL</SectionHeading>

              <PurpleSection title="🚀 Before You Go: Strategic Sending">
                <BulletList>
                  <BulletItem>Worship and fast, seeking God's direction through spiritual disciplines</BulletItem>
                  <BulletItem>Confirm calling through corporate validation, not merely personal conviction</BulletItem>
                  <BulletItem>Build diverse teams that bring multiple perspectives and cultural strengths</BulletItem>
                  <BulletItem>Establish clear lines of accountability and communication with the sending church</BulletItem>
                </BulletList>
              </PurpleSection>

              <GreenSection title="🌱 Follow Paul's Church Planting Method">
                <p><strong>Entry strategy:</strong></p>
                <BulletList>
                  <BulletItem>Start with existing connections and natural cultural bridges</BulletItem>
                  <BulletItem>Seek out receptive people—those already leaning toward truth</BulletItem>
                  <BulletItem>Demonstrate authenticity so your character speaks before your message</BulletItem>
                  <BulletItem>Expect opposition and plan for resistance from established systems</BulletItem>
                </BulletList>
                <p><strong>Gospel presentation:</strong></p>
                <BulletList>
                  <BulletItem>Use familiar foundations</BulletItem>
                  <BulletItem>Connect everything to Christ</BulletItem>
                  <BulletItem>Call for a clear decision</BulletItem>
                  <BulletItem>Form community immediately by integrating new believers into fellowship</BulletItem>
                </BulletList>
                <p><strong>Church establishment:</strong></p>
                <BulletList>
                  <BulletItem>Develop leaders quickly without waiting for "perfect" candidates</BulletItem>
                  <BulletItem>Create systems that can function without you</BulletItem>
                  <BulletItem>Address cultural issues wisely where traditions conflict with faith</BulletItem>
                  <BulletItem>Plan your exit from day one, working yourself out of a job</BulletItem>
                </BulletList>
              </GreenSection>

              <BlueSection title="🤝 When Cultural Controversies Arise">
                <p>Use the Jerusalem Council model:</p>
                <BulletList>
                  <BulletItem>Listen to all sides</BulletItem>
                  <BulletItem>Look for where the Holy Spirit is already working</BulletItem>
                  <BulletItem>Focus on essentials, separating the core of the gospel from cultural preferences</BulletItem>
                  <BulletItem>Create practical solutions that address real concerns without compromising truth</BulletItem>
                  <BulletItem>Communicate clearly so all are strengthened</BulletItem>
                </BulletList>
                <p>As Maxwell notes, <HighlightText color="blue">"Great leaders ask great questions"</HighlightText> (Good Leaders Ask Great Questions, p. 23). Ask:</p>
                <BulletList>
                  <BulletItem>What is essential to the gospel and what is cultural preference?</BulletItem>
                  <BulletItem>How do we maintain unity while allowing diversity?</BulletItem>
                  <BulletItem>What barriers have we created that God never intended?</BulletItem>
                  <BulletItem>How can we honor multiple cultures while serving Christ together?</BulletItem>
                </BulletList>
              </BlueSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActsAudioPlayerCh6;

