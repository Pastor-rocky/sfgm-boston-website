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

const ActsAudioPlayerCh9: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioSrc = '/uploads/textbook-audio/acts-in-action-cp9.mp3';
  const localStorageKey = 'audio_progress_acts_ch9';

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
            <h1 className="text-xl font-bold text-white">Acts in Action - Chapter 9</h1>
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
                <p className="text-white/90 text-xl font-semibold"><span className="align-middle">Chapter 9</span> <span className="text-2xl align-text-top ml-1">🎬</span></p>
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
            <CardTitle className="text-2xl font-bold text-white text-center">CHAPTER 9: TRIALS AND TESTIMONY</CardTitle>
            <p className="text-center text-purple-200 text-lg">Acts 22–26 — "If We Endure Like They Did ..."</p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <SectionHeading>WHAT THEY FACED</SectionHeading>
              <RedSection title="⚖️">
                <p>Paul entered the ultimate leadership test. Over roughly five years of hearings, imprisonments, and legal maneuvers that could have ended his ministry, he turned every courtroom into a pulpit and every chain into a platform for gospel advance. The challenges mounted:</p>
                <BulletList>
                  <BulletItem>False accusations charged him as "a troublemaker, stirring up riots among the Jews all over the world" (Acts 24:5)</BulletItem>
                  <BulletItem>Political manipulation meant governors cared more about favor than justice</BulletItem>
                  <BulletItem>Prolonged imprisonment kept him in Caesarea for two years awaiting resolution (Acts 24:27)</BulletItem>
                  <BulletItem>Assassination plots formed, with more than forty men vowing not to eat or drink until they had killed him (Acts 23:12–13)</BulletItem>
                  <BulletItem>His future remained uncertain; appealing to Caesar would carry him to Rome—and to possible execution</BulletItem>
                </BulletList>
                <p>Would his faith crack under pressure, or would these trials become his greatest testimony? As Maxwell writes, <HighlightText color="red">"Adversity causes some men to break; others to break records"</HighlightText> (Failing Forward, p. 89).</p>
              </RedSection>

              <SectionHeading>WHAT THEY DID: TRANSFORM OBSTACLES INTO OPPORTUNITIES</SectionHeading>

              <GreenSection title="PHASE 1: THE JERUSALEM DEFENSE (Acts 22:1–29)">
                <p>Dragged from the temple and nearly killed by a mob, Paul was rescued by the Roman commander, Claudius Lysias (Acts 21:30–36). He requested permission to speak and addressed the crowd in Hebrew—their heart language—using his testimony as his framework:</p>
                <BulletList>
                  <BulletItem>He established credibility: "I am a Jew, born in Tarsus of Cilicia, but brought up in this city. I studied under Gamaliel and was thoroughly trained in the law of our ancestors" (22:3)</BulletItem>
                  <BulletItem>He confessed his persecution of the Way</BulletItem>
                  <BulletItem>He recounted his Damascus road encounter with Jesus</BulletItem>
                  <BulletItem>He revealed his calling: "Go; I will send you far away to the Gentiles" (22:21)</BulletItem>
                </BulletList>
                <p>The crowd listened until he said this; then they shouted, "Rid the earth of him! He's not fit to live!" (22:22–23). When officials prepared to flog him, he calmly asserted his Roman citizenship: "Is it legal for you to flog a Roman citizen who hasn't even been found guilty?" (22:25). He used a hostile platform to share his story and advanced his mission while securing lawful protection.</p>
              </GreenSection>

              <GreenSection title="PHASE 2: THE SANHEDRIN STRATEGY (Acts 22:30–23:35)">
                <p>Before the Sanhedrin, Paul read the room with precision. "My brothers, I am a Pharisee, descended from Pharisees. I stand on trial because of the hope of the resurrection of the dead" (23:6). Knowing the council was divided—Pharisees affirming resurrection, Sadducees denying it—he shifted the battle line from himself to their theological split. The council erupted, and the commander intervened to prevent violence. That night, the Lord stood near Paul and said, <HighlightText color="green">"Take courage! As you have testified about me in Jerusalem, so you must also testify in Rome"</HighlightText> (23:11). When more than forty conspirators vowed to kill him, Paul's nephew uncovered the plot and alerted authorities. Commander Lysias organized an armed escort—two hundred soldiers, seventy horsemen, and two hundred spearmen—to transfer Paul safely to Governor Felix in Caesarea (23:23–35). As Maxwell observes, "God's protection often comes through human preparation" (Leadership Gold, p. 134).</p>
              </GreenSection>

              <BlueSection title="PHASE 3: THE FELIX ENCOUNTERS (Acts 24:1–27)">
                <p>In Caesarea, the high priest Ananias arrived with the lawyer Tertullus, who accused Paul of inciting riots and desecrating the temple (24:5–6). Paul's defense was factual, principled, and missional:</p>
                <BulletList>
                  <BulletItem>He noted the short timeframe in Jerusalem</BulletItem>
                  <BulletItem>He challenged the absence of evidence for any disturbance</BulletItem>
                  <BulletItem>He affirmed his faith as worship of the God of their ancestors according to the Law and the Prophets</BulletItem>
                  <BulletItem>He stated his mission of bringing gifts to the poor and offerings in Jerusalem (24:11–20)</BulletItem>
                </BulletList>
                <p>Felix, familiar with the Way, delayed judgment, yet allowed Paul some freedoms and frequent visitors. Over two years, Paul repeatedly spoke with Felix and Drusilla about faith in Christ, righteousness, self-control, and the coming judgment; Felix grew afraid and postponed decisions while secretly hoping for a bribe (24:24–27). Paul turned incarceration into an extended evangelistic appointment with the governor.</p>
              </BlueSection>

              <PurpleSection title="PHASE 4: THE FESTUS APPEAL (Acts 25:1–12)">
                <p>When Festus replaced Felix, Jewish leaders immediately pressed for Paul's transfer to Jerusalem, plotting an ambush. Festus kept the proceedings in Caesarea. Sensing the risk of a Jerusalem hearing and aiming at his Rome assignment, Paul made a decisive move: <HighlightText color="purple">"I am now standing before Caesar's court, where I ought to be tried... I appeal to Caesar!"</HighlightText> (25:10–11). Festus conferred and replied, "You have appealed to Caesar. To Caesar you will go!" (25:12). Paul navigated the system to align process with calling. As Maxwell's Law of Navigation puts it, "Anyone can steer the ship, but it takes a leader to chart the course" (The 21 Irrefutable Laws of Leadership, p. 17).</p>
              </PurpleSection>

              <YellowSection title="PHASE 5: THE AGRIPPA OPPORTUNITY (Acts 25:13–26:32)">
                <p>King Agrippa and Bernice visited Festus, who explained Paul's case and his Roman appeal, admitting, "I found he had done nothing deserving of death" (25:25). The next day, with great pomp, Agrippa, Bernice, military officers, and city leaders assembled, and Paul was brought in (25:23). Given permission to speak, Paul delivered his masterpiece:</p>
                <BulletList>
                  <BulletItem>He began with personal testimony: his life known among the Jews from childhood, his former zeal opposing the name of Jesus of Nazareth (26:4–11)</BulletItem>
                  <BulletItem>He detailed the Damascus encounter and the commission of Jesus: "I am sending you to them to open their eyes and turn them from darkness to light, and from the power of Satan to God" (26:17–18)</BulletItem>
                  <BulletItem>He described his obedient response: "I was not disobedient to the vision from heaven... I preached that they should repent and turn to God and demonstrate their repentance by their deeds" (26:19–20)</BulletItem>
                </BulletList>
                <p>When Festus interrupted, calling him insane, Paul answered with calm reason, "I am not insane, most excellent Festus. What I am saying is true and reasonable" (26:25). Then he turned to Agrippa with a direct challenge: "King Agrippa, do you believe the prophets? I know you do" (26:27). Agrippa replied, "Do you think that in such a short time you can persuade me to be a Christian?" Paul answered, <HighlightText color="yellow">"Short time or long—I pray to God that not only you but all who are listening to me today may become what I am, except for these chains"</HighlightText> (26:28–29). After private consultation, the dignitaries concluded, "This man is not doing anything that deserves death or imprisonment... This man could have been set free if he had not appealed to Caesar" (26:31–32). As Maxwell writes, "Great leaders find a way to make their mess their message" (Sometimes You Win, Sometimes You Learn, p. 67).</p>
              </YellowSection>

              <SectionHeading>WHAT THEY GOT: TRIALS BECAME TESTIMONIES</SectionHeading>

              <GreenSection title="🎤 Opposition Multiplied Paul's Platforms">
                <BulletList>
                  <BulletItem>A Jerusalem crowd heard his story in Hebrew</BulletItem>
                  <BulletItem>A Roman commander encountered a credible account of Christian faith</BulletItem>
                  <BulletItem>The Sanhedrin was forced to reckon with the resurrection</BulletItem>
                  <BulletItem>Governors Felix and Festus heard a clear, reasoned gospel; Felix heard it for two years in private conversation</BulletItem>
                  <BulletItem>King Agrippa and the city's elite listened to a full proclamation of Christ</BulletItem>
                  <BulletItem>Even the Roman legal system became a stage to set precedent and secure protection for a growing movement</BulletItem>
                </BulletList>
              </GreenSection>

              <BlueSection title="📈 The Gospel Advanced">
                <BulletList>
                  <BulletItem>Paul's Gentile mission gained official recognition</BulletItem>
                  <BulletItem>Roman intervention shielded him from mob violence</BulletItem>
                  <BulletItem>Persecution transformed into opportunity</BulletItem>
                  <BulletItem>Witness spread to audiences the early church could not have planned to reach</BulletItem>
                </BulletList>
              </BlueSection>

              <PurpleSection title="💪 Leadership Grew Under Pressure">
                <p>Paul displayed:</p>
                <BulletList>
                  <BulletItem>Courage without compromise</BulletItem>
                  <BulletItem>Strategic thinking in the use of rights and process</BulletItem>
                  <BulletItem>Skill in recognizing opportunity within hostility</BulletItem>
                  <BulletItem>Relentless focus on his Rome calling</BulletItem>
                </BulletList>
              </PurpleSection>

              <OrangeSection title="⛪ Christianity Demonstrated">
                <BulletList>
                  <BulletItem>Legal respectability and civic loyalty while maintaining spiritual integrity</BulletItem>
                  <BulletItem>Patient hearing in the empire's courts</BulletItem>
                  <BulletItem>It was not mindless fanaticism</BulletItem>
                  <BulletItem>Proved compelling even to royalty</BulletItem>
                </BulletList>
              </OrangeSection>

              <YellowSection title="🗣️ Paul's Evangelistic Method">
                <BulletList>
                  <BulletItem>Personal testimony as persuasive witness</BulletItem>
                  <BulletItem>Cultural adaptation in language and tone</BulletItem>
                  <BulletItem>A logical case presented alongside divine revelation</BulletItem>
                  <BulletItem>A direct call for personal decision</BulletItem>
                </BulletList>
                <p>As Maxwell observes, <HighlightText color="yellow">"Every test is a testimony waiting to happen"</HighlightText> (The Difference Maker, p. 89).</p>
              </YellowSection>

              <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
              <BlueSection title="📚">
                <BulletList>
                  <BulletItem><strong>The Law of the Test:</strong> Trials revealed and developed Paul's character (The 21 Most Powerful Minutes in a Leader's Day, p. 156)</BulletItem>
                  <BulletItem><strong>The Law of Solid Ground:</strong> Integrity under interrogation built trust with soldiers, governors, and kings (The 21 Irrefutable Laws of Leadership, ch. 6)</BulletItem>
                  <BulletItem><strong>The Law of Sacrifice:</strong> His willingness to surrender freedom for the sake of the mission (ch. 18)</BulletItem>
                  <BulletItem><strong>The Law of Legacy:</strong> His courtroom testimonies inspired generations of leaders to turn adversity into advance (ch. 21)</BulletItem>
                </BulletList>
              </BlueSection>

              <SectionHeading>MODERN APPLICATION: THE TRIAL-TO-TESTIMONY MODEL</SectionHeading>

              <GreenSection title="🔄 Transform Opposition into Opportunity">
                <p><strong>Stay calm under pressure:</strong></p>
                <BulletList>
                  <BulletItem>Refuse emotional reactions</BulletItem>
                  <BulletItem>Treat criticism and crisis as God-given stages to witness</BulletItem>
                  <BulletItem>Speak the audience's language—relationally, culturally, and clearly</BulletItem>
                  <BulletItem>Establish credibility before presenting controversial truth</BulletItem>
                </BulletList>
                <p><strong>Present your case strategically:</strong></p>
                <BulletList>
                  <BulletItem>Stick to facts, invite evidence, and tell your story</BulletItem>
                  <BulletItem>Find common ground where you can—shared values, shared authorities</BulletItem>
                  <BulletItem>Call for a decision rather than settling for discussion</BulletItem>
                </BulletList>
                <p><strong>Use legal and social systems wisely:</strong></p>
                <BulletList>
                  <BulletItem>Know your rights and exercise them ethically</BulletItem>
                  <BulletItem>Work within established channels</BulletItem>
                  <BulletItem>Cultivate principled allies</BulletItem>
                  <BulletItem>Make long-term moves that align with the mission; Paul's appeal to Caesar served his Rome objective</BulletItem>
                </BulletList>
                <p><strong>Maintain mission focus:</strong></p>
                <BulletList>
                  <BulletItem>See the bigger picture in hardship</BulletItem>
                  <BulletItem>Accept God's timing</BulletItem>
                  <BulletItem>Stay aligned with your ultimate assignment—your "Rome"</BulletItem>
                  <BulletItem>Trust the Lord's word, "You must also testify in Rome"</BulletItem>
                </BulletList>
              </GreenSection>

              <RedSection title="⚠️ When Falsely Accused">
                <p>Expect:</p>
                <BulletList>
                  <BulletItem>Character attacks</BulletItem>
                  <BulletItem>Mission distortion</BulletItem>
                  <BulletItem>Political manipulation</BulletItem>
                  <BulletItem>Legal challenges</BulletItem>
                </BulletList>
                <p>Respond by:</p>
                <BulletList>
                  <BulletItem>Documenting your work carefully</BulletItem>
                  <BulletItem>Responding strategically on selected platforms</BulletItem>
                  <BulletItem>Using every defense moment to point to Christ</BulletItem>
                  <BulletItem>Trusting the process without idolizing it</BulletItem>
                  <BulletItem>Letting your integrity, patience, and clarity show</BulletItem>
                  <BulletItem>Keeping the mission central so opposition does not define your agenda</BulletItem>
                </BulletList>
                <p>Remember, <HighlightText color="red">"Your reputation is what people think you are; your character is what you really are"</HighlightText> (The 21 Indispensable Qualities of a Leader, p. 28).</p>
              </RedSection>

              <OrangeSection title="🎯 Maximize Your Platforms for Witness">
                <p>As Paul did:</p>
                <BulletList>
                  <BulletItem>Hostile crowds can become listening audiences when you answer wisely</BulletItem>
                  <BulletItem>Legal proceedings can reveal Christian character and truth under scrutiny</BulletItem>
                  <BulletItem>Private meetings with influential people can open surprising doors for the gospel</BulletItem>
                  <BulletItem>High-profile settings can multiply impact when humility and courage are held together</BulletItem>
                </BulletList>
              </OrangeSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActsAudioPlayerCh9;

