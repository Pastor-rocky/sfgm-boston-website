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

const ActsAudioPlayerCh8: React.FC = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioSrc = '/uploads/textbook-audio/acts-in-action-cp8.mp3';
  const localStorageKey = 'audio_progress_acts_ch8';

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
            <h1 className="text-xl font-bold text-white">Acts in Action - Chapter 8</h1>
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
                <p className="text-white/90 text-xl font-semibold"><span className="align-middle">Chapter 8</span> <span className="text-2xl align-text-top ml-1">🎬</span></p>
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
            <CardTitle className="text-2xl font-bold text-white text-center">CHAPTER 8: EPHESIAN MINISTRY</CardTitle>
            <p className="text-center text-purple-200 text-lg">Acts 19–21 — "If We Build Like They Did ..."</p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <SectionHeading>WHAT THEY FACED</SectionHeading>
              <BlueSection title="🏛️">
                <p>Ephesus was the crossroads of the ancient world—a major port, commercial hub, and religious center. If they could establish a strong base here, they could influence all of Asia. The challenges, however, were complex:</p>
                <BulletList>
                  <BulletItem>Some disciples were incomplete, believing in repentance through John but unaware of the Holy Spirit (Acts 19:1–7)</BulletItem>
                  <BulletItem>Religious competition emerged as Jewish exorcists tried to copy apostolic methods without relationship (Acts 19:13–16)</BulletItem>
                  <BulletItem>Economic resistance loomed large because the temple of Artemis generated massive revenue and civic pride (Acts 19:23–41)</BulletItem>
                  <BulletItem>Spiritual warfare was real and pervasive; evil spirits and occult practices saturated the city (Acts 19:11–20)</BulletItem>
                  <BulletItem>Leadership transition was inevitable; Paul knew he would leave and had to prepare elders to continue the work (Acts 20:17–38)</BulletItem>
                </BulletList>
                <p>The test was clear: Could they build something sustainable in the most challenging environment they had faced? As Maxwell writes, <HighlightText color="blue">"The ultimate test of leadership is not the exit, but what happens after the exit"</HighlightText> (Leadership Gold, p. 156).</p>
              </BlueSection>

              <SectionHeading>WHAT THEY DID: BUILD THE ULTIMATE MINISTRY BASE</SectionHeading>

              <GreenSection title="PHASE 1: FOUNDATION BUILDING (Acts 19:1–22)">
                <p>Paul first addressed the incomplete disciples. He found about twelve men who had believed but had never heard of the Holy Spirit; they had received John's baptism but not been baptized into Christ. He clarified, "John's baptism was a baptism of repentance. He told the people to believe in the one coming after him, that is, in Jesus" (v. 4). When Paul laid his hands on them, "the Holy Spirit came on them, and they spoke in tongues and prophesied" (v. 6). Wise leaders do not assume understanding; they verify and complete what is missing.</p>
                <p>He then followed his proven synagogue strategy: "Paul entered the synagogue and spoke boldly there for three months, arguing persuasively about the kingdom of God. But some of them became obstinate; they refused to believe and publicly maligned the Way" (vv. 8–9a). So he made a strategic pivot. "Paul left them. He took the disciples with him and had discussions daily in the lecture hall of Tyrannus" (v. 9b). This continued for two years "so that all the Jews and Greeks who lived in the province of Asia heard the word of the Lord" (v. 10). As Maxwell's Law of Process reminds us, "Leadership develops daily, not in a day" (The 21 Irrefutable Laws of Leadership, p. 23). During this season "God did extraordinary miracles through Paul, so that even handkerchiefs and aprons that had touched him were taken to the sick, and their illnesses were cured and the evil spirits left them" (vv. 11–12). The foundation combined doctrinal clarity, systematic teaching, and authentic spiritual power.</p>
              </GreenSection>

              <PurpleSection title="PHASE 2: SPIRITUAL WARFARE (Acts 19:13–20)">
                <p>Copycats attempted to use Jesus' name without knowing Jesus. Some Jewish exorcists declared, "In the name of the Jesus whom Paul preaches, I command you to come out" (v. 13). The demon replied, <HighlightText color="purple">"Jesus I know, and Paul I know about, but who are you?"</HighlightText> (v. 15). The man possessed by the evil spirit overpowered them, and they fled naked and bleeding. The city took notice. "When this became known to the Jews and Greeks living in Ephesus, they were all seized with fear, and the name of the Lord Jesus was held in high honor" (v. 17). Many believers openly confessed their practices; "a number who had practiced sorcery brought their scrolls together and burned them publicly" (v. 19a). The value was enormous—"fifty thousand drachmas" (v. 19b), roughly fifty thousand days' wages. "In this way the word of the Lord spread widely and grew in power" (v. 20). Authentic authority cannot be counterfeited; it flows from genuine relationship with God.</p>
              </PurpleSection>

              <RedSection title="PHASE 3: ECONOMIC OPPOSITION (Acts 19:23–41)">
                <p>The gospel's advance threatened a lucrative idol industry. Demetrius, a silversmith, rallied the craftsmen: "You know, my friends, that we receive a good income from this business. And you see and hear how this fellow Paul has convinced and led astray large numbers of people here in Ephesus and in practically the whole province of Asia. He says that gods made by human hands are no gods at all" (vv. 25–26). He warned of economic loss and religious disgrace: "There is danger not only that our trade will lose its good name, but also that the temple of the great goddess Artemis will be discredited" (v. 27). Fury erupted into a riot as the crowd shouted, "Great is Artemis of the Ephesians!" and surged into the theater. Paul wanted to speak, but "the disciples would not let him," and even provincial officials who were his friends urged him not to enter the theater (vv. 30–31). The assembly descended into confusion; "most of the people did not even know why they had come together" (v. 32). Finally, the city clerk calmed the crowd and warned against unlawful assembly, then dismissed them (vv. 35–41). Sometimes the best leadership decision is restraint. As Maxwell observes, <HighlightText color="red">"Sometimes the best leadership decision is not to lead"</HighlightText> (The 21 Irrefutable Laws of Leadership, p. 89).</p>
              </RedSection>

              <OrangeSection title="PHASE 4: LEADERSHIP TRANSITION (Acts 20:1–38)">
                <p>After the uproar, Paul encouraged the disciples and set out, eventually calling the Ephesian elders to meet him at Miletus for a farewell charged with legacy. He reminded them of his example: "You know how I lived the whole time I was with you, from the first day I came into the province of Asia. I served the Lord with great humility and with tears and in the midst of severe testing by the plots of the Jews. You know that I have not hesitated to preach anything that would be helpful to you but have proclaimed it to you publicly and from house to house" (vv. 18–20). He charged them with stewardship: <HighlightText color="orange">"Keep watch over yourselves and all the flock of which the Holy Spirit has made you overseers. Be shepherds of the church of God, which he bought with his own blood"</HighlightText> (v. 28). He warned of danger: "I know that after I leave, savage wolves will come in among you and will not spare the flock. Even from your own number men will arise and distort the truth" (vv. 29–30). He entrusted them to God and to the word of His grace, reminded them of his own hard work to help the weak, and cited Jesus' words: "It is more blessed to give than to receive" (vv. 32–35). They wept together, knowing they would not see his face again, then accompanied him to the ship (vv. 36–38). Maxwell writes, "A leader's lasting value is measured by succession" (The 21 Irrefutable Laws of Leadership, p. 279).</p>
              </OrangeSection>

              <YellowSection title="PHASE 5: JERUSALEM DETERMINATION (Acts 21:1–36)">
                <p>On the way to Jerusalem, prophetic warnings intensified. Agabus took Paul's belt, bound his own hands and feet, and declared, "The Holy Spirit says, 'In this way the Jewish leaders in Jerusalem will bind the owner of this belt and will hand him over to the Gentiles'" (Acts 21:11). Paul answered, <HighlightText color="yellow">"Why are you weeping and breaking my heart? I am ready not only to be bound, but also to die in Jerusalem for the name of the Lord Jesus"</HighlightText> (v. 13). When he would not be dissuaded, the disciples concluded, "The Lord's will be done" (v. 14). In Jerusalem, opponents from Asia stirred up a mob, shouting, "This is the man who teaches everyone everywhere against our people and our law and this place" (v. 28). They seized Paul and attempted to kill him until Roman soldiers intervened (vv. 31–36). Great leaders accept necessary risks for the sake of the mission, even when others try to protect them from those risks.</p>
              </YellowSection>

              <SectionHeading>WHAT THEY GOT: THE ASIAN CHURCH NETWORK</SectionHeading>

              <GreenSection title="🌏 Regional Saturation">
                <p>The region was saturated with the gospel. Scripture records that <HighlightText color="green">"all the Jews and Greeks who lived in the province of Asia heard the word of the Lord"</HighlightText> (Acts 19:10):</p>
                <BulletList>
                  <BulletItem>Spiritual authority was established as real miracles contrasted with counterfeit attempts</BulletItem>
                  <BulletItem>Occult practices were openly renounced with costly repentance</BulletItem>
                  <BulletItem>God's providence shielded the work during civic unrest</BulletItem>
                </BulletList>
              </GreenSection>

              <BlueSection title="💰 Economic Impact">
                <BulletList>
                  <BulletItem>Idol-making trade was threatened</BulletItem>
                  <BulletItem>Profitable but ungodly practices were abandoned</BulletItem>
                  <BulletItem>A new economy of generosity took root as leaders modeled that it is "more blessed to give than to receive"</BulletItem>
                </BulletList>
              </BlueSection>

              <PurpleSection title="👥 Leadership Multiplication">
                <BulletList>
                  <BulletItem>Ephesian elders were trained for long-term oversight</BulletItem>
                  <BulletItem>Regional churches were established—including those addressed later in Revelation</BulletItem>
                  <BulletItem>Two years of daily training produced systems that sustained growth after Paul's departure</BulletItem>
                </BulletList>
              </PurpleSection>

              <YellowSection title="🎓 Methodological Innovations">
                <p>The School of Tyrannus model demonstrated:</p>
                <BulletList>
                  <BulletItem>The power of daily engagement over weekly events</BulletItem>
                  <BulletItem>Systematic teaching over sporadic instruction</BulletItem>
                  <BulletItem>An intentional training center that developed leaders who could develop others</BulletItem>
                </BulletList>
                <p>A multi-front approach took shape:</p>
                <BulletList>
                  <BulletItem>Public ministry in synagogue and lecture hall</BulletItem>
                  <BulletItem>Personal ministry from house to house</BulletItem>
                  <BulletItem>Power ministry through extraordinary miracles and deliverance</BulletItem>
                  <BulletItem>Practical ministry that met physical and economic needs</BulletItem>
                </BulletList>
                <p>As Maxwell observes, <HighlightText color="yellow">"Leaders who develop people add; leaders who develop leaders multiply"</HighlightText> (Developing the Leaders Around You, p. 156).</p>
              </YellowSection>

              <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
              <OrangeSection title="📚">
                <BulletList>
                  <BulletItem><strong>The Law of Legacy:</strong> Paul's focus was on what would happen after he left, not on what he had achieved</BulletItem>
                  <BulletItem><strong>The Law of Sacrifice:</strong> His determined march toward Jerusalem, ready to suffer and even die for the mission</BulletItem>
                  <BulletItem><strong>The Law of Empowerment:</strong> Giving the Ephesian elders real responsibility for the flock's future</BulletItem>
                  <BulletItem><strong>The Law of the Inner Circle:</strong> Spending two years daily with leaders to forge a team capable of sustaining and multiplying the work</BulletItem>
                </BulletList>
              </OrangeSection>

              <SectionHeading>MODERN APPLICATION: THE EPHESIAN BUILD MODEL</SectionHeading>

              <GreenSection title="🏗️ Begin with the Foundation">
                <BulletList>
                  <BulletItem>Complete what is incomplete by verifying understanding and leading people into the fullness of the gospel and the Spirit's power</BulletItem>
                  <BulletItem>Establish systematic teaching that meets daily, not merely weekly, so discipleship becomes a rhythm rather than an event</BulletItem>
                  <BulletItem>Create training centers—formal or informal—that develop leaders who can train other leaders</BulletItem>
                  <BulletItem>Plan from the start for multiplication so every investment reproduces</BulletItem>
                </BulletList>
              </GreenSection>

              <PurpleSection title="⚡ Engage the Power Phase">
                <BulletList>
                  <BulletItem>Demonstrate authentic spiritual authority that cannot be counterfeited</BulletItem>
                  <BulletItem>Confront false spirituality clearly and pastorally</BulletItem>
                  <BulletItem>Expect economic opposition as transformed lives disrupt established interests</BulletItem>
                  <BulletItem>When confrontation erupts, exercise strategic restraint and let God fight battles through providence, processes, and principled allies</BulletItem>
                </BulletList>
              </PurpleSection>

              <OrangeSection title="🔄 Lead Through Transition">
                <BulletList>
                  <BulletItem>Prepare for your absence by building systems that work without you</BulletItem>
                  <BulletItem>Warn emerging leaders about future challenges so they are not surprised by wolves from outside or distortions from within</BulletItem>
                  <BulletItem>Transfer real authority with clear responsibility and accountability</BulletItem>
                  <BulletItem>Keep character central, trusting that competence grows best in the soil of humility, integrity, and service</BulletItem>
                </BulletList>
              </OrangeSection>

              <BlueSection title="📋 Paul's Leadership Development Strategy">
                <p>With the Ephesian elders, Paul demonstrated:</p>
                <BulletList>
                  <BulletItem><strong>Form character:</strong> "You know how I lived ... I served the Lord with great humility and with tears" (Acts 20:18–19)</BulletItem>
                  <BulletItem><strong>Provide comprehensive training:</strong> "I have not hesitated to preach anything that would be helpful ... publicly and from house to house" (v. 20)</BulletItem>
                  <BulletItem><strong>Clarify responsibility:</strong> "Keep watch over yourselves and all the flock ... be shepherds of the church of God" (v. 28)</BulletItem>
                  <BulletItem><strong>Set a future focus:</strong> Warning of "savage wolves" and internal threats (vv. 29–31)</BulletItem>
                  <BulletItem><strong>Resource them:</strong> "Now I commit you to God and to the word of his grace, which can build you up" (v. 32)</BulletItem>
                </BulletList>
                <p>As Maxwell writes, <HighlightText color="blue">"People don't care how much you know until they know how much you care"</HighlightText> (Winning with People, p. 67).</p>
              </BlueSection>

              <RedSection title="⚠️ When Ministry Threatens Economic Interests">
                <BulletList>
                  <BulletItem>Expect organized resistance</BulletItem>
                  <BulletItem>Do not take the bait of public brawls; like Paul, avoid needless theater confrontations</BulletItem>
                  <BulletItem>Allow credible voices and lawful systems to speak on behalf of justice</BulletItem>
                  <BulletItem>Stay focused on the mission, resist distraction</BulletItem>
                  <BulletItem>Trust appropriate legal processes to de-escalate civic unrest</BulletItem>
                </BulletList>
                <p>The same pattern applies when modern ministries face pressure from gambling interests in a community, business pushback against moral stands, political heat over justice issues, or economic threats when transformation impacts local commerce.</p>
              </RedSection>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActsAudioPlayerCh8;

