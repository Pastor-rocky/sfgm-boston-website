import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2, Download } from "lucide-react";
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
  InfoBox,
  WarningBox,
  CenterText,
} from "@/components/audio-player-text-template";

export default function ActsInActionEbook() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const downloadPDF = () => {
    // Open the PDF for Acts in Action
    window.open('/pdfs/Acts in Action.pdf', '_blank');
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    { id: 1, title: "Chapter 1: Preparation and Launch", audioUrl: "/uploads/textbook-audio/acts-in-action-cp1.mp3" },
    { id: 2, title: "Chapter 2: Power and Opposition", audioUrl: "/uploads/textbook-audio/acts-in-action-cp2.mp3" },
    { id: 3, title: "Chapter 3: Crisis and Growth", audioUrl: "/uploads/textbook-audio/acts-in-action-cp3.mp3" },
    { id: 4, title: "Chapter 4: Expansion and Conversion", audioUrl: "/uploads/textbook-audio/acts-in-action-cp4.mp3" },
    { id: 5, title: "Chapter 5: Breaking Barriers", audioUrl: "/uploads/textbook-audio/acts-in-action-cp5.mp3" },
    { id: 6, title: "Chapter 6: The First Missionary Journey", audioUrl: "/uploads/textbook-audio/acts-in-action-cp6.mp3" },
    { id: 7, title: "Chapter 7: European Expansion", audioUrl: "/uploads/textbook-audio/acts-in-action-cp7.mp3" },
    { id: 8, title: "Chapter 8: Ephesian Ministry", audioUrl: "/uploads/textbook-audio/acts-in-action-cp8.mp3" },
    { id: 9, title: "Chapter 9: Trials and Testimony", audioUrl: "/uploads/textbook-audio/acts-in-action-cp9.mp3" },
    { id: 10, title: "Chapter 10: Rome and Beyond", audioUrl: "/uploads/textbook-audio/acts-in-action-cp10.mp3" }
  ];

  const currentChapterData = chapters[currentChapter - 1];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.src = currentChapterData.audioUrl;
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
  }, [volume, currentChapter]);

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

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleChapterChange = (chapterId: string) => {
    setCurrentChapter(parseInt(chapterId));
  };

  const getChapterContent = (chapterId: number) => {
    switch (chapterId) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">CHAPTER 1: PREPARATION AND LAUNCH</h1>
              <p className="text-xl text-purple-200">Acts 1–2 — "If We Prepare and Launch Like They Did …"</p>
            </div>

            <SectionHeading>WHAT THEY FACED</SectionHeading>
            <BlueSection>
              <p>The Ultimate Leadership Challenge was upon them. Their founder had just left. Their team was confused about timing and strategy. They had no resources, no facilities, and no organizational structure. Their enemies thought they were finished. The pressure was immense. Jesus had given them an impossible mission—reach the entire world—with no clear plan for how to accomplish it. The stakes could not have been higher. If they failed, Christianity would die with Jesus. If they succeeded, they would change history forever.</p>
            </BlueSection>

            <SectionHeading>WHAT THEY DID: THE TWO-PHASE SUCCESS STRATEGY</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 1: STRATEGIC PREPARATION (Acts 1:1–26)</h3>
              
              <h4 className="text-lg font-semibold mb-3 text-blue-200">Step 1: Vision Clarification (vv. 6–8)</h4>
              <p>When the disciples asked about timing—"Lord, are you at this time going to restore the kingdom?"—Jesus redirected them from speculation to purpose and power. "You will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth" (v. 8). The vision formula was clear: local in Jerusalem, where they were; regional in Judea and Samaria, their nation; and global to the ends of the earth, everywhere else. As Maxwell's Law of Navigation says, "Anyone can steer the ship, but it takes a leader to chart the course" (The 21 Irrefutable Laws of Leadership, p. 17).</p>

              <h4 className="text-lg font-semibold mb-3 mt-6 text-blue-200">Step 2: Power Connection (vv. 4–5, 8a)</h4>
              <p>Jesus instructed them, "Wait for the gift my Father promised … you will receive power when the Holy Spirit comes on you." Their waiting strategy was not passive, for they prayed and organized. It was not permanent, for the waiting had a specific purpose. It was not optional, because Jesus commanded it. And it was not wasted, since they used the time to prepare. Maxwell writes, "You cannot give what you do not have" (The 15 Invaluable Laws of Growth, p. 89).</p>

              <h4 className="text-lg font-semibold mb-3 mt-6 text-blue-200">Step 3: Unity Building (vv. 12–14)</h4>
              <p>"They all joined together constantly in prayer" (v. 14). Their unity had four elements. It included all; every person participated, about 120 in total. They joined together; this was corporate, not merely individual prayer. They did so constantly; it was ongoing, not occasional. And it was prayer that formed their primary preparation activity. Those included were the eleven apostles, women disciples including Mary the mother of Jesus, Jesus' brothers, and other faithful followers. As Maxwell's Law of Significance reminds us, "One is too small a number to achieve greatness" (The 17 Indisputable Laws of Teamwork, p. 45).</p>

              <h4 className="text-lg font-semibold mb-3 mt-6 text-blue-200">Step 4: Leadership Development (vv. 15–26)</h4>
              <p>Peter immediately addressed the leadership gap left by Judas's betrayal. Their selection process stood on a biblical foundation in fulfillment of Old Testament prophecy. The criteria were clear; the candidate had to be with them from the beginning. Their focus was on character and faithfulness rather than talent and fame. The decision involved the entire team, and the process invited divine guidance as they prayed for God's choice. The result was that Matthias was chosen and "added to the eleven apostles" (v. 26). As Maxwell says, "Everything rises and falls on leadership" (The 21 Irrefutable Laws of Leadership, p. 1).</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 2: EXPLOSIVE LAUNCH (Acts 2:1–47)</h3>
              
              <h4 className="text-lg font-semibold mb-3 text-blue-200">Step 1: Supernatural Empowerment (vv. 1–4)</h4>
              <p>"When the day of Pentecost came, they were all together in one place." The empowerment experience engaged every sense. There was a sound like the blowing of a violent wind. There was a sight as tongues of fire came to rest on each of them. There was speech as they began to speak in other tongues. The multiplication principle was unmistakable. Instead of one person with supernatural power—Jesus—there were now 120 people supernaturally empowered. Maxwell's Law of Empowerment states, "Only secure leaders give power to others" (The 21 Irrefutable Laws of Leadership, p. 189).</p>

              <h4 className="text-lg font-semibold mb-3 mt-6 text-blue-200">Step 2: Magnetic Attraction (vv. 5–13)</h4>
              <p>"When they heard this sound, a crowd came together in bewilderment" (v. 6). The crowd was massive, numbering in the thousands, and diverse, "from every nation under heaven" (v. 5). Their response mixed amazement with perplexity. The communication miracle was that each person heard the disciples speaking in their own native language about "the wonders of God" (v. 11). Languages represented included Parthians, Medes, Elamites, Mesopotamians, and at least twelve other distinct groups. Maxwell notes in Everyone Communicates, Few Connect, "Connecting is the ability to identify with people and relate to them in a way that increases your influence with them" (p. 23).</p>

              <h4 className="text-lg font-semibold mb-3 mt-6 text-blue-200">Step 3: Crisis Leadership (vv. 14–36)</h4>
              <p>When critics accused them of being drunk, Peter seized the moment for one of the greatest sermons in church history. His response strategy was deliberate. He addressed the criticism directly (vv. 14–15), provided biblical context (vv. 16–21), presented the gospel clearly (vv. 22–36), and called for an immediate decision (v. 36). The message focused on Jesus—His life, death, resurrection, and lordship. Maxwell's Law of the Moment says, "Great leaders recognize a crucial moment and know how to seize it" (Leadership Gold, p. 89).</p>

              <h4 className="text-lg font-semibold mb-3 mt-6 text-blue-200">Step 4: Massive Response (vv. 37–41)</h4>
              <p>"When the people heard this, they were cut to the heart and said, 'What shall we do?'" (v. 37). Peter's action plan was straightforward. Repent, changing your mind about Jesus. Be baptized, making a public declaration of faith. Receive the Holy Spirit, trusting God for personal empowerment. Accept the promise, which is for you and your children. The result was breathtaking: "About three thousand were added to their number that day" (v. 41).</p>

              <h4 className="text-lg font-semibold mb-3 mt-6 text-blue-200">Step 5: Sustainable Systems (vv. 42–47)</h4>
              <p>They did not merely add 3,000 people. They integrated them immediately. Four pillars sustained their growth. They devoted themselves to the apostles' teaching, absorbing truth and doctrine (v. 42a). They embraced fellowship and the breaking of bread, forming deep relational bonds (v. 42b). They committed to prayer, seeking God together (v. 42c). And they practiced generosity, holding their possessions loosely, sharing freely, and giving to anyone who had need (vv. 44–45). Maxwell writes, "To add growth, lead followers—to multiply, lead leaders" (The 21 Irrefutable Laws of Leadership, p. 251).</p>
            </GreenSection>

            <SectionHeading>WHAT THEY GOT: UNPRECEDENTED RESULTS</SectionHeading>
            <PurpleSection>
              <p>The immediate results were astonishing. There were 3,000 new believers in a single day. There were zero dropouts recorded. New believers were completely integrated into church life. Supernatural signs and wonders multiplied (v. 43). And they enjoyed favor with all the people (v. 47a). The ongoing results showed sustained health. Daily growth continued as "the Lord added to their number daily those who were being saved" (v. 47b). They functioned as a unified community with no recorded divisions or factions. Their culture of generosity led many to sell possessions to help others. The atmosphere was joyful, marked by "glad and sincere hearts" (v. 46). The entire city took notice, and the church had favor with all the people.</p>
            </PurpleSection>

            <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
            <BlueSection>
              <p>The Law of Legacy was evident as Jesus prepared successors who exceeded His immediate impact. The Law of Explosive Growth was on display as they multiplied leaders, not just followers, producing exponential growth. The Law of the Big Mo became a reality as Pentecost created unstoppable momentum that carried them through future challenges.</p>
            </BlueSection>

            <SectionHeading>MODERN APPLICATION: THE PREPARATION–LAUNCH MODEL</SectionHeading>
            <YellowSection>
              <p>Phase 1 is Preparation, the season before going public. Clarify your vision until everyone can repeat it. Build team unity through extended prayer and planning. Develop your leaders using character-based criteria. Wait for empowerment rather than rushing into activity.</p>
              <p className="mt-4">Phase 2 is Launch, when God opens the door. Seize the moment as opportunities arise. Communicate clearly across cultural and generational barriers. Have systems ready to handle rapid growth. Focus on multiplication, not mere addition. Maxwell observes, "The secret to successful launching is successful preparation" (Leadership Gold, p. 156).</p>
            </YellowSection>

            <SectionHeading>COMMON LAUNCH MISTAKES TO AVOID</SectionHeading>
            <RedSection>
              <BulletList>
                <BulletItem>Mistake 1: Launching without adequate preparation — Acts 1–2 shows ten days of intensive preparation before public launch.</BulletItem>
                <BulletItem>Mistake 2: Operating in human strength alone — they waited for supernatural empowerment.</BulletItem>
                <BulletItem>Mistake 3: Having no systems for growth — four pillars were ready to receive and disciple 3,000 new people.</BulletItem>
                <BulletItem>Mistake 4: Focusing on events instead of processes — they cultivated daily growth through sustainable systems.</BulletItem>
              </BulletList>
            </RedSection>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">CHAPTER 2: POWER AND OPPOSITION</h1>
              <p className="text-xl text-purple-200">Acts 3–5 — "If We Handle Opposition Like They Did ..."</p>
            </div>

            <SectionHeading>WHAT THEY FACED</SectionHeading>
            <BlueSection>
              <p>The honeymoon was over. After the explosive success of Pentecost, reality hit. The religious establishment wasn't celebrating—they were scheming. The same leaders who crucified Jesus now turned their attention to His followers. New challenges emerged on every front. There was religious opposition from the Sanhedrin (Acts 4:1–22). There was internal deception through Ananias and Sapphira (Acts 5:1–11). There was overwhelming growth that created logistical pressures (Acts 5:12–16). And there was escalating persecution, including imprisonment (Acts 5:17–42). The test was simple and searching: Would they compromise their message to reduce opposition, or maintain boldness despite increasing pressure?</p>
            </BlueSection>

            <SectionHeading>WHAT THEY DID: THE POWER–OPPOSITION CYCLE</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 1: POWER DEMONSTRATION (Acts 3:1–26)</h3>
              <p>Peter and John were on their way to the temple for afternoon prayers—a routine activity that became extraordinary. At the gate sat a man lame from birth, more than forty years old, who asked for money to survive. Peter replied, "Silver or gold I do not have, but what I do have I give you. In the name of Jesus Christ of Nazareth, walk" (v. 6). Instantly, the man was healed, "walking and jumping, and praising God" (v. 8). As Maxwell writes, "Leadership is not about having all the resources; it's about using what you have effectively" (The 21 Irrefutable Laws of Leadership, p. 156).</p>
              <p className="mt-4">A crowd gathered in amazement, and Peter immediately seized the teachable moment, turning wonder into witness. He redirected attention away from himself and John—"Why do you stare at us as if by our own power we had made this man walk?" (v. 12)—and pointed them to Jesus: "The God of Abraham, Isaac and Jacob ... has glorified his servant Jesus" (v. 13). He then called for repentance: "Repent, then, and turn to God, so that your sins may be wiped out" (v. 19). The principle is timeless. Great leaders do not take credit for God's work; they use success to point people to the source.</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 2: OPPOSITION RESPONSE (Acts 4:1–22)</h3>
              <p>The temple guard, Sadducees, and priests arrested Peter and John because they were teaching the people and proclaiming Jesus. Yet even in the midst of opposition, fruit remained. "Many who heard the message believed; so the number of men who believed grew to about five thousand" (v. 4).</p>
              <p className="mt-4">Brought before the same Sanhedrin that condemned Jesus, Peter—filled with the Holy Spirit—delivered a clear and courageous defense. He answered directly: "If we are being called to account today for an act of kindness ..." (v. 9). He proclaimed Christ: "It is by the name of Jesus Christ of Nazareth ... that this man stands before you healed" (v. 10). And he made the truth exclusive and unmistakable: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved" (v. 12). Maxwell's Law of Courage reminds us, "Courage is fear that has said its prayers" (The 21 Indispensable Qualities of a Leader, p. 45).</p>
              <p className="mt-4">The leaders faced a dilemma. They recognized that the apostles had been with Jesus (v. 13). They could not deny the miracle—the man stood there healed (v. 14). They could not stop the public momentum (v. 16). And they dared not punish the apostles without risking a riot (vv. 17–21). Peter and John's response captured the heart of spiritual leadership: "Which is right in God's eyes: to listen to you, or to him? You be the judges! As for us, we cannot help speaking about what we have seen and heard" (vv. 19–20). The leadership principle is clear. When faced with opposition, great leaders stay focused on their mission rather than their critics.</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 3: POWER MULTIPLICATION (Acts 4:23–37)</h3>
              <p>Released from custody, the apostles did not convene a strategy session or launch a public relations campaign. They prayed. Their prayer focused on God's sovereignty: "Sovereign Lord, you made the heavens and the earth" (v. 24). They framed their situation with Scripture, quoting Psalm 2 about opposition to God's anointed (vv. 25–26). They acknowledged current realities: "Indeed Herod and Pontius Pilate met together ... to conspire against your holy servant Jesus" (vv. 27–28). And they asked boldly: "Enable your servants to speak your word with great boldness" (v. 29). God answered in power. "After they prayed, the place where they were meeting was shaken. And they were all filled with the Holy Spirit and spoke the word of God boldly" (v. 31). Maxwell observes, "The best leaders respond to pressure by going to their source of strength" (Leadership Gold, p. 78).</p>
              <p className="mt-4">Opposition did not divide the church. It unified them. With one heart and mind, no one claimed that any possession was their own (v. 32). With great power, the apostles continued to testify to the resurrection (v. 33). Generosity marked the community: "There were no needy persons among them" (vv. 34–35). Barnabas modeled leadership by selling a field and giving the proceeds (vv. 36–37).</p>
            </GreenSection>

            <RedSection>
              <h3 className="text-xl font-bold mb-4 text-red-200">PHASE 4: INTERNAL CRISIS (Acts 5:1–16)</h3>
              <p>The greatest threats are not always external. Ananias and Sapphira sold property but secretly kept back part of the money while pretending to give it all. Peter confronted the deception, identifying the real enemy—"Satan has filled your heart to lie to the Holy Spirit" (v. 3)—and clarifying the issue. The problem was not the amount given but the lie itself (v. 4). God's judgment fell, and both died immediately (vv. 5, 10). "Great fear seized the whole church and all who heard about these events" (v. 11). Maxwell's Law of Solid Ground declares, "Trust is the foundation of leadership" (The 21 Irrefutable Laws of Leadership, p. 67).</p>
              <p className="mt-4">Far from damaging the church, this discipline increased credibility. Many signs and wonders were done among the people (v. 12). Respect grew—"No one else dared join them, even though they were highly regarded" (v. 13). Yet the church continued to grow explosively—"More and more men and women believed in the Lord and were added to their number" (v. 14). The impact spread regionally as crowds gathered from towns around Jerusalem (v. 16).</p>
            </RedSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">PHASE 5: ESCALATING PERSECUTION (Acts 5:17–42)</h3>
              <p>The high priest and the Sadducees arrested all the apostles and put them in public jail (vv. 17–18). During the night, an angel opened the doors and sent them back to their post with a simple command: "Go, stand in the temple courts and tell the people all about this new life" (vv. 19–21a). At daybreak, they obeyed, teaching the people as instructed (v. 21b). The authorities were bewildered. The jail was secure and empty, while the "prisoners" were preaching in the temple (vv. 22–26).</p>
              <p className="mt-4">Once again before the Sanhedrin, the apostles faced a direct accusation: "We gave you strict orders not to teach in this name ... yet you have filled Jerusalem with your teaching" (v. 28). Peter answered with the creed of courageous obedience: "We must obey God rather than human beings!" (v. 29). He preached the gospel again and concluded, "We are witnesses of these things, and so is the Holy Spirit, whom God has given to those who obey him" (v. 32). When the Sanhedrin wanted to kill them, Gamaliel—Paul's future teacher—offered wise counsel: "Leave these men alone! Let them go! For if their purpose or activity is of human origin, it will fail. But if it is from God, you will not be able to stop these men; you will only find yourselves fighting against God" (vv. 38–39).</p>
              <p className="mt-4">The final outcome was sobering and inspiring. The apostles were flogged for defying orders, yet they rejoiced "because they had been counted worthy of suffering disgrace for the Name" (v. 41). They did not retreat. They continued daily, in the temple and from house to house, teaching and proclaiming Jesus as the Messiah (v. 42). Maxwell writes, "The ultimate measure of a man is not where he stands in moments of comfort and convenience, but where he stands at times of challenge and controversy" (The 21 Indispensable Qualities of a Leader, p. 67).</p>
            </OrangeSection>

            <SectionHeading>WHAT THEY GOT: VICTORY THROUGH OPPOSITION</SectionHeading>
            <PurpleSection>
              <p>Numbers grew despite pressure. The church moved from 3,000 (Acts 2:41) to 5,000 men (Acts 4:4), and "more and more men and women believed" (Acts 5:14). The impact expanded regionally beyond Jerusalem (Acts 5:16). Spiritual maturity deepened. They showed boldness under pressure as they spoke truth to power. Unity strengthened in crisis. Joy flourished in suffering as they rejoiced in persecution (Acts 5:41). Integrity was protected as they dealt decisively with internal sin. Leadership developed rapidly. Peter was transformed from denier to defender of the faith. The apostles stood in solidarity. They used every crisis as an opportunity and relied on God's power rather than human wisdom. Public impact increased. They were highly regarded by the people (Acts 5:13). Holy fear gripped the church (Acts 5:11). They enjoyed favor that continued to fuel growth. Their influence filled the city—"You have filled Jerusalem with your teaching" (Acts 5:28).</p>
            </PurpleSection>

            <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
            <BlueSection>
              <p>They faced the Law of the Test—"Every leader faces tests that reveal character" (The 21 Most Powerful Minutes in a Leader's Day, p. 89). They proved the Law of Solid Ground as integrity under pressure built unshakeable trust (The 21 Irrefutable Laws of Leadership, ch. 6). They embraced the Law of Sacrifice by giving up comfort and safety for the mission (ch. 18). And they lived the Law of Victory by finding ways to win even when circumstances looked impossible (ch. 15).</p>
            </BlueSection>

            <SectionHeading>MODERN APPLICATION: THE OPPOSITION–OPPORTUNITY PRINCIPLE</SectionHeading>
            <YellowSection>
              <p>When you face religious opposition, stay focused on your mission, not your critics. Respond with boldness rather than defensiveness. Point to God's power, not your own abilities. Guard unity under pressure so your team remains one heart and mind.</p>
              <p className="mt-4">When experiencing rapid growth, never compromise integrity for the sake of numbers. Address internal issues quickly and decisively. Keep your systems aligned with your values. Use success to point people to God rather than to yourself.</p>
              <p className="mt-4">When dealing with persecution, respond with prayer before strategy. Choose joy in being counted worthy to suffer for His Name. Continue your mission regardless of the consequences. Trust God's sovereignty over human opposition. Maxwell observes, "Every problem introduces a person to himself" (Failing Forward, p. 156)</p>
            </YellowSection>

            <SectionHeading>SUMMARY</SectionHeading>
            <PurpleSection>
              <h3 className="text-lg font-bold mb-3 text-purple-200">📌 Key Takeaways</h3>
              <BulletList>
                <BulletItem>Opposition clarified mission and produced boldness, not retreat.</BulletItem>
                <BulletItem>Prayer first, power next—bold witness flowed from fresh filling.</BulletItem>
                <BulletItem>Integrity protected credibility; discipline guarded the church.</BulletItem>
                <BulletItem>Obedience under pressure multiplied impact across the region.</BulletItem>
                <BulletItem>Leaders leveraged every crisis to point people to Jesus.</BulletItem>
              </BulletList>
            </PurpleSection>

            <SectionHeading>REFLECTION</SectionHeading>
            <BlueSection>
              <h3 className="text-lg font-bold mb-3 text-blue-200">📝 This Week</h3>
              <BulletList>
                <BulletItem>Where am I facing opposition—and what mission focus must I restate?</BulletItem>
                <BulletItem>What integrity issue needs decisive action to protect credibility?</BulletItem>
                <BulletItem>When will I set aside time to pray first and ask for boldness?</BulletItem>
              </BulletList>
            </BlueSection>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">CHAPTER 3: CRISIS AND GROWTH</h1>
              <p className="text-xl text-purple-200">Acts 6–7 — "If We Manage Crisis Like They Did …"</p>
            </div>

            <SectionHeading>WHAT THEY FACED</SectionHeading>
            <RedSection>
              <p>Success brought its own challenges. The early church was growing so fast that what began as a blessing threatened to become a burden. A crisis surfaced: "The Hellenistic Jews among them complained against the Hebraic Jews because their widows were being overlooked in the daily distribution of food" (Acts 6:1). Beneath the complaint lay deeper issues:</p>
              <BulletList>
                <BulletItem>Cultural tensions simmered between Greek-speaking and Hebrew-speaking believers</BulletItem>
                <BulletItem>Leadership overload mounted as the apostles tried to do everything</BulletItem>
                <BulletItem>Resource management grew complicated as thousands needed daily care</BulletItem>
                <BulletItem>Priorities blurred as urgent needs competed with the church's essential mission</BulletItem>
              </BulletList>
              <p className="mt-4">The stakes were high. Mishandled, this internal conflict could fracture the church and halt growth. Maxwell writes, "Every level of growth brings new problems. The key is not avoiding problems but developing better problem-solving skills" (The 15 Invaluable Laws of Growth, p. 134).</p>
            </RedSection>

            <SectionHeading>WHAT THEY DID: THE DELEGATION REVOLUTION</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 1: PROBLEM IDENTIFICATION (Acts 6:1–2)</h3>
              <p>The complaint was specific: Greek-speaking widows were being neglected in the daily distribution, while Hebrew-speaking widows were cared for. The real issues included:</p>
              <BulletList>
                <BulletItem>Unconscious cultural bias favoring Hebrew speakers</BulletItem>
                <BulletItem>A system breakdown with no organized process for fair distribution</BulletItem>
                <BulletItem>A leadership bottleneck as the apostles were overwhelmed with administration</BulletItem>
                <BulletItem>Mission drift as prayer and preaching slipped behind food service</BulletItem>
              </BulletList>
              <p className="mt-4">The apostles responded with clarity: <span className="text-green-300 font-semibold">"It would not be right for us to neglect the ministry of the word of God in order to wait on tables"</span> (v. 2). Maxwell's Law of Priorities reminds us, "Leaders understand that activity is not necessarily accomplishment" (The 21 Irrefutable Laws of Leadership, p. 187). Great leaders distinguish between what only they can do and what others can do better.</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 2: STRATEGIC SOLUTION (Acts 6:3–6)</h3>
              <p>Their solution was delegation with discernment. "Brothers and sisters, choose seven men from among you who are known to be full of the Spirit and wisdom. We will turn this responsibility over to them and will give our attention to prayer and the ministry of the word" (vv. 3–4). The selection criteria emphasized:</p>
              <BulletList>
                <BulletItem><strong>Character</strong>—full of the Spirit</BulletItem>
                <BulletItem><strong>Competence</strong>—full of wisdom</BulletItem>
                <BulletItem><strong>Community endorsement</strong>—chosen from among them</BulletItem>
                <BulletItem><strong>Proven reputation</strong>—known to be</BulletItem>
              </BulletList>
              <p className="mt-4">The church chose Stephen, Philip, Procorus, Nicanor, Timon, Parmenas, and Nicolas, a convert from Antioch (v. 5). Significantly, all seven had Greek names, demonstrating that the apostles addressed cultural bias by empowering the neglected group. Maxwell observes, <span className="text-green-300 font-semibold">"The best leaders don't just solve problems; they empower others to solve problems"</span> (Developing the Leaders Around You, p. 78). The installation was public and prayerful. The seven were presented before the congregation; the apostles prayed and laid hands on them, officially authorizing them and clearly transferring responsibility (v. 6).</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 3: EXPLOSIVE RESULTS (Acts 6:7)</h3>
              <p>The outcome was immediate and dramatic: "So the word of God spread. The number of disciples in Jerusalem increased rapidly, and a large number of priests became obedient to the faith" (v. 7). Growth accelerated because:</p>
              <BulletList>
                <BulletItem>The apostles refocused on their primary calling</BulletItem>
                <BulletItem>New leaders handled practical needs with excellence</BulletItem>
                <BulletItem>Cultural barriers fell through inclusive leadership</BulletItem>
                <BulletItem>Systems were established for sustainable growth</BulletItem>
                <BulletItem>Even priests believed—the ultimate breakthrough</BulletItem>
              </BulletList>
              <p className="mt-4">Maxwell's Law of Empowerment rings true: "Only secure leaders give power to others" (The 21 Irrefutable Laws of Leadership, p. 189).</p>
            </GreenSection>

            <SectionHeading>STEPHEN'S COSTLY LEADERSHIP (Acts 6:8–7:60)</SectionHeading>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">PHASE 1: POWER AND OPPOSITION (Acts 6:8–15)</h3>
              <p>Stephen emerged as a powerful leader. "Now Stephen, a man full of God's grace and power, performed great wonders and signs among the people" (v. 8). Opposition gathered from various synagogues. They argued with Stephen, "but they could not stand up against the wisdom the Spirit gave him as he spoke" (vv. 9–10). When debate failed, deception followed. "They secretly persuaded some men to say, 'We have heard Stephen speak blasphemous words against Moses and against God'" (v. 11). The crowd was stirred. False witnesses accused him: "This fellow never stops speaking against this holy place and against the law" (v. 13), distorting his message to say, "Jesus of Nazareth will destroy this place and change the customs Moses handed down to us" (v. 14).</p>
              <p className="mt-4">In the midst of hostility, Stephen's composure was supernatural: "All who were sitting in the Sanhedrin looked intently at Stephen, and they saw that his face was like the face of an angel" (v. 15). Maxwell writes, <span className="text-orange-300 font-semibold">"Leadership is not about avoiding storms; it's about learning to dance in the rain"</span> (Leadership Gold, p. 67).</p>
            </OrangeSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">PHASE 2: THE ULTIMATE DEFENSE (Acts 7:1–53)</h3>
              <p>Asked, "Are these charges true?" (v. 1), Stephen did not react defensively. Instead, he delivered a masterful, Spirit-empowered history that indicted his accusers. He traced God's work through:</p>
              <BulletList>
                <BulletItem><strong>Abraham</strong> (vv. 2–8)—called out of his land</BulletItem>
                <BulletItem><strong>Joseph</strong> (vv. 9–16)—rejected by his brothers but used by God</BulletItem>
                <BulletItem><strong>Moses</strong> (vv. 17–44)—rejected by his people yet their deliverer</BulletItem>
                <BulletItem><strong>Solomon</strong> (vv. 45–50)—who built the temple, while insisting, "The Most High does not live in houses made by human hands"</BulletItem>
              </BulletList>
              <p className="mt-4">Then came the indictment: <span className="text-purple-300 font-semibold">"You always resist the Holy Spirit!"</span> (vv. 51–53). The strength of Stephen's defense lay in its biblical foundation, its honest reading of Israel's historical pattern of rejecting God's messengers, its present application—"Just as your ancestors did, so do you" (v. 51)—and its direct accusation—"You who have received the law … but have not obeyed it!" (v. 53). Maxwell's Law of Connection says, "Leaders touch a heart before they ask for a hand" (The 21 Irrefutable Laws of Leadership, p. 101). Stephen connected with their history before confronting their hypocrisy.</p>
            </PurpleSection>

            <RedSection>
              <h3 className="text-xl font-bold mb-4 text-red-200">PHASE 3: THE ULTIMATE SACRIFICE (Acts 7:54–60)</h3>
              <p>The council exploded with rage. "When the members of the Sanhedrin heard this, they were furious and gnashed their teeth at him" (v. 54). Stephen's eyes were lifted to heaven. "Full of the Holy Spirit, [he] looked up to heaven and saw the glory of God, and Jesus standing at the right hand of God. 'Look,' he said, 'I see heaven open and the Son of Man standing at the right hand of God'" (vv. 55–56). The mob covered their ears, rushed him, dragged him outside the city, and stoned him, while the witnesses laid their cloaks at Saul's feet (vv. 57–58).</p>
              <p className="mt-4">Stephen's final words echo his Lord's: "Lord Jesus, receive my spirit" (v. 59) and "Lord, do not hold this sin against them" (v. 60). He became the first Christian martyr, and in God's providence, his death accomplished more than his life.</p>
            </RedSection>

            <SectionHeading>WHAT THEY GOT: VICTORY THROUGH CRISIS AND SACRIFICE</SectionHeading>
            
            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">📈 From the Delegation Crisis</h3>
              <p><strong>Immediate results:</strong></p>
              <BulletList>
                <BulletItem>The problem was solved and complaints ceased</BulletItem>
                <BulletItem>Seven new leaders emerged</BulletItem>
                <BulletItem>Growth accelerated—"The number of disciples … increased rapidly" (Acts 6:7)</BulletItem>
                <BulletItem>Cultural barriers were addressed with wisdom and equity</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Long-term impact:</strong></p>
              <BulletList>
                <BulletItem>Philip became an evangelist and later led the Samaritan revival (Acts 8)</BulletItem>
                <BulletItem>Stephen's martyrdom catalyzed worldwide mission</BulletItem>
                <BulletItem>Delegation became the standard practice of the church</BulletItem>
                <BulletItem>"A large number of priests became obedient to the faith" (Acts 6:7)</BulletItem>
              </BulletList>
            </BlueSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">✨ From Stephen's Martyrdom</h3>
              <p><strong>Immediate impact:</strong></p>
              <BulletList>
                <BulletItem>Persecution intensified—"On that day a great persecution broke out" (Acts 8:1)</BulletItem>
                <BulletItem>The church scattered—"All except the apostles were scattered throughout Judea and Samaria" (Acts 8:1)</BulletItem>
                <BulletItem>The gospel spread—"Those who had been scattered preached the word wherever they went" (Acts 8:4)</BulletItem>
                <BulletItem>Saul was impacted deeply as he witnessed the stoning, a step on his journey to conversion</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Long-term harvest:</strong></p>
              <BulletList>
                <BulletItem>Worldwide missions expanded under the pressure of persecution</BulletItem>
                <BulletItem>Saul's conversion turned the church's greatest enemy into its greatest advocate</BulletItem>
                <BulletItem>A martyrdom model of costly discipleship took root</BulletItem>
                <BulletItem>Heaven's perspective broke in—apparent defeat on earth can be victory in heaven</BulletItem>
              </BulletList>
              <p className="mt-4">Maxwell observes, "Sometimes you win by losing" (Sometimes You Win, Sometimes You Learn, p. 89).</p>
            </YellowSection>

            <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
            <PurpleSection>
              <BulletList>
                <BulletItem><strong>The Law of Priorities</strong> (The 21 Irrefutable Laws of Leadership, ch. 17) guided the apostles to focus on what only they could do—prayer and preaching</BulletItem>
                <BulletItem><strong>The Law of Empowerment</strong> (ch. 18) was evident as they gave real authority, not just tasks, to the seven</BulletItem>
                <BulletItem><strong>The Law of Sacrifice</strong> (ch. 18) was embodied by Stephen, who paid the ultimate price for his convictions</BulletItem>
                <BulletItem><strong>The Law of Legacy</strong> (ch. 21) emerged as both the delegation system and Stephen's martyrdom produced lasting impact across generations and geographies</BulletItem>
              </BulletList>
            </PurpleSection>

            <SectionHeading>MODERN APPLICATION: THE CRISIS–GROWTH CONNECTION</SectionHeading>
            
            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🔧 When Growth Creates Problems</h3>
              <BulletList>
                <BulletItem>Identify the real issue—often cultural bias, not merely logistics</BulletItem>
                <BulletItem>Empower the affected group; don't solve for them, solve with them</BulletItem>
                <BulletItem>Establish clear criteria that prioritize character and competence over popularity</BulletItem>
                <BulletItem>Transfer real authority; give power, not just responsibility</BulletItem>
              </BulletList>
            </GreenSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">🎯 When Leaders Are Overwhelmed</h3>
              <BulletList>
                <BulletItem>Distinguish between what is essential and what is merely important</BulletItem>
                <BulletItem>Identify what only you can do versus what others can do better</BulletItem>
                <BulletItem>Develop others proactively so crisis does not force delegation</BulletItem>
                <BulletItem>Create systems for sustainability—build processes, not just one-off fixes</BulletItem>
                <BulletItem>Focus on your strengths, just as the apostles did with prayer and teaching while deacons handled administration</BulletItem>
              </BulletList>
            </BlueSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">💪 When Facing Opposition</h3>
              <BulletList>
                <BulletItem>Stay calm under pressure—remember Stephen's face "like the face of an angel"</BulletItem>
                <BulletItem>Use truth as your defense; a biblical foundation beats political maneuvering</BulletItem>
                <BulletItem>Keep an eternal perspective—"I see heaven open"</BulletItem>
                <BulletItem>Forgive your enemies—"Do not hold this sin against them"</BulletItem>
              </BulletList>
            </OrangeSection>

            <RedSection>
              <h3 className="text-xl font-bold mb-4 text-red-200">⚔️ When Making Sacrifices</h3>
              <BulletList>
                <BulletItem>Count the cost; leadership sometimes demands everything</BulletItem>
                <BulletItem>Trust God's purposes; what looks like defeat may be victory</BulletItem>
                <BulletItem>Focus on legacy; ask how your sacrifice will advance the mission</BulletItem>
                <BulletItem>Maintain integrity; do not compromise under pressure</BulletItem>
              </BulletList>
              <p className="mt-4">Maxwell writes, <span className="text-red-300 font-semibold">"The ultimate measure of leadership is influence, and sometimes influence requires sacrifice"</span> (The 21 Indispensable Qualities of a Leader, p. 156).</p>
            </RedSection>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">CHAPTER 4: EXPANSION AND CONVERSION</h1>
              <p className="text-xl text-purple-200">Acts 8–9 — "If We Expand Like They Did …"</p>
            </div>

            <SectionHeading>WHAT THEY FACED</SectionHeading>
            <RedSection>
              <p>Stephen's martyrdom was not the end of the movement—it was the beginning of a new phase. "On that day a great persecution broke out against the church in Jerusalem, and all except the apostles were scattered throughout Judea and Samaria" (Acts 8:1). The new reality was stark:</p>
              <BulletList>
                <BulletItem>Believers were forcibly displaced and fled for their lives</BulletItem>
                <BulletItem>Saul began a ruthless campaign: "Saul began to destroy the church. Going from house to house, he dragged off both men and women and put them in prison" (Acts 8:3)</BulletItem>
                <BulletItem>The movement was suddenly spread across new geography, demanding new strategies</BulletItem>
                <BulletItem>Cultural barriers loomed large as the gospel confronted Samaritan and Gentile contexts</BulletItem>
                <BulletItem>Leadership gaps emerged because the apostles remained in Jerusalem while others pioneered new territory</BulletItem>
              </BulletList>
              <p className="mt-4">The test was clear. Would persecution stop the movement or spread it? Would barriers become walls or bridges? Maxwell notes, <span className="text-red-300 font-semibold">"Every great movement of God has been birthed in the womb of opposition"</span> (Leadership Bible Commentary).</p>
            </RedSection>

            <SectionHeading>WHAT THEY DID: TURN SETBACKS INTO BREAKTHROUGHS</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 1: PHILIP'S SAMARITAN BREAKTHROUGH (Acts 8:4–25)</h3>
              <p>Those who were scattered did not go silent. "Those who had been scattered preached the word wherever they went. Philip went down to a city in Samaria and proclaimed the Messiah there" (vv. 4–5). Philip's strategy was simple and courageous:</p>
              <BulletList>
                <BulletItem>He crossed entrenched cultural barriers—Jews did not associate with Samaritans</BulletItem>
                <BulletItem>He proclaimed Christ, keeping the message centered on Jesus</BulletItem>
                <BulletItem>He demonstrated God's power as impure spirits were driven out and the paralyzed and lame were healed (v. 7)</BulletItem>
              </BulletList>
              <p className="mt-4">The result was tangible: <span className="text-green-300 font-semibold">"So there was great joy in that city"</span> (v. 8). Maxwell's Law of the Catalyst applies: activity is not the same as accomplishment, but without activity, there is no accomplishment (The 17 Indisputable Laws of Teamwork, p. 67).</p>
              <p className="mt-4">The work was tested by the Simon challenge. Simon the sorcerer believed and was baptized, but when he saw the apostles lay hands on believers and the Holy Spirit come upon them, he offered money to buy this power. Peter replied, "May your money perish with you, because you thought you could buy the gift of God with money!" (v. 20). Great leaders distinguish genuine conversion from religious opportunism. The apostles in Jerusalem sent Peter and John to Samaria to confirm the work and pray that the believers receive the Holy Spirit (vv. 14–17). This was not control for control's sake; it was unity, ensuring that the Samaritan church remained connected to the Jerusalem church.</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 2: PHILIP'S PERSONAL EVANGELISM (Acts 8:26–40)</h3>
              <p>God then redirected Philip to a divine appointment. "Now an angel of the Lord said to Philip, 'Go south to the road—the desert road—that goes down from Jerusalem to Gaza'" (v. 26). On that road he met an Ethiopian eunuch, a high official of Queen Candace, who was reading Isaiah 53 in his chariot. Philip asked, "Do you understand what you are reading?" (v. 30). The eunuch answered, "How can I, unless someone explains it to me?" (v. 31). Philip began where the man was—"beginning with that very passage of Scripture" (v. 35)—and told him the good news about Jesus. The response was immediate: "What can stand in the way of my being baptized?" (v. 36). Philip baptized him, and "the eunuch went on his way rejoicing" (v. 39).</p>
              <p className="mt-4">Maxwell observes, <span className="text-green-300 font-semibold">"Great leaders are available for divine appointments"</span> (The 21 Most Powerful Minutes in a Leader's Day, p. 45). Yielded to the Spirit's leading, Philip experienced a transportation miracle: "The Spirit of the Lord suddenly took Philip away … Philip appeared at Azotus and traveled about, preaching the gospel in all the towns until he reached Caesarea" (vv. 39–40). He was so surrendered to God's direction that supernatural movement became a normal means of ministry.</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 3: SAUL'S DRAMATIC CONVERSION (Acts 9:1–31)</h3>
              <p>Saul, "still breathing out murderous threats against the Lord's disciples," sought authority to arrest followers of the Way in Damascus (vv. 1–2). On the road, a light from heaven flashed around him, and he heard a voice: "Saul, Saul, why do you persecute me?" (v. 4). "Who are you, Lord?" he asked. "I am Jesus, whom you are persecuting … Get up and go into the city, and you will be told what you must do" (vv. 5–6). Blinded for three days, Saul fasted and prayed (vv. 8–9).</p>
              <p className="mt-4">God called Ananias to minister to Saul, though he was understandably reluctant. "Lord, I have heard many reports about this man and all the harm he has done to your holy people in Jerusalem" (v. 13). The Lord answered, <span className="text-green-300 font-semibold">"Go! This man is my chosen instrument to proclaim my name to the Gentiles and their kings and to the people of Israel"</span> (v. 15). Ananias obeyed. Saul received his sight, was filled with the Holy Spirit, and was baptized. Maxwell's Law of Process reminds us, "Leadership develops daily, not in a day" (The 21 Irrefutable Laws of Leadership, p. 23). Even Saul's dramatic conversion unfolded within a Spirit-led process of development.</p>
              <p className="mt-4">"At once he began to preach in the synagogues that Jesus is the Son of God … Saul grew more and more powerful and baffled the Jews living in Damascus by proving that Jesus is the Messiah" (vv. 20–22). When a plot formed to kill him, his followers lowered him in a basket through an opening in the wall by night (vv. 23–25). Back in Jerusalem, the disciples feared him until Barnabas advocated, telling the apostles how Saul had seen the Lord and preached boldly (v. 27). The outcome of this season was profound. "So the church throughout Judea, Galilee and Samaria enjoyed a time of peace and was strengthened. Living in the fear of the Lord and encouraged by the Holy Spirit, it increased in numbers" (v. 31).</p>
            </GreenSection>

            <SectionHeading>WHAT THEY GOT: EXPONENTIAL EXPANSION</SectionHeading>
            
            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">🌍 Geographic & Cross-Cultural Impact</h3>
              <p>Persecution did not paralyze the church; it propelled it:</p>
              <BulletList>
                <BulletItem>The movement expanded beyond Jerusalem into Judea and Samaria</BulletItem>
                <BulletItem>Cross-cultural ministry unfolded as Jews brought the gospel to Samaritans</BulletItem>
                <BulletItem>International impact began as the Ethiopian eunuch carried the message toward Africa</BulletItem>
              </BulletList>
            </BlueSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">👥 Leadership Multiplication</h3>
              <BulletList>
                <BulletItem>Philip emerged—from deacon to evangelist</BulletItem>
                <BulletItem>Scattered believers became scattered missionaries</BulletItem>
                <BulletItem>New churches were planted wherever believers went</BulletItem>
              </BulletList>
            </PurpleSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">✨ The Ultimate Turnaround</h3>
              <p>From conversion came transformation:</p>
              <BulletList>
                <BulletItem>The movement's greatest enemy became its greatest advocate as Saul became Paul</BulletItem>
                <BulletItem>His persecution expertise was redirected from hunting Christians to planting churches</BulletItem>
                <BulletItem>The Gentile mission was launched as God's chosen instrument took shape for global expansion</BulletItem>
              </BulletList>
            </YellowSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">📈 Church Strengthening</h3>
              <BulletList>
                <BulletItem>Peace followed persecution as God provided a season of consolidation</BulletItem>
                <BulletItem>Spiritual growth deepened as believers lived in the fear of the Lord</BulletItem>
                <BulletItem>Numbers increased as the Holy Spirit continued to encourage and empower</BulletItem>
              </BulletList>
              <p className="mt-4">Maxwell writes, <span className="text-green-300 font-semibold">"God's greatest leaders often emerge from God's greatest opposition"</span> (Sometimes You Win, Sometimes You Learn, p. 123).</p>
            </GreenSection>

            <SectionHeading>STRATEGIC OUTCOMES</SectionHeading>
            
            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">🗺️ Mission Expansion Phases</h3>
              <BulletList>
                <BulletItem><strong>Phase 1—Jerusalem:</strong> Effectively complete</BulletItem>
                <BulletItem><strong>Phase 2—Judea and Samaria:</strong> Launched</BulletItem>
                <BulletItem><strong>Phase 3—The ends of the earth:</strong> Prepared through Paul's calling</BulletItem>
              </BulletList>
            </BlueSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">👥 Leadership Pipeline</h3>
              <BulletList>
                <BulletItem>Philip pioneered cross-cultural evangelism</BulletItem>
                <BulletItem>Ananias modeled courageous obedience</BulletItem>
                <BulletItem>Barnabas demonstrated the power of encouragement and advocacy</BulletItem>
                <BulletItem>Paul emerged as the architect of global missions</BulletItem>
              </BulletList>
            </PurpleSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">🔥 Methodological Breakthroughs</h3>
              <BulletList>
                <BulletItem>Personal evangelism modeled by Philip and the Ethiopian</BulletItem>
                <BulletItem>Power evangelism—signs and wonders—opened hearts in Samaria</BulletItem>
                <BulletItem>Confrontational conversion marked Saul's Damascus Road encounter</BulletItem>
                <BulletItem>Relational integration shone as Barnabas brought Paul to the apostles for acceptance and alignment</BulletItem>
              </BulletList>
            </OrangeSection>

            <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
            <YellowSection>
              <BulletList>
                <BulletItem><strong>The Law of Navigation</strong> (The 21 Irrefutable Laws of Leadership, ch. 3): Philip navigated cultural barriers and geographic challenges under divine guidance</BulletItem>
                <BulletItem><strong>The Law of Addition and Multiplication</strong> (ch. 19): Persecution scattered believers who multiplied the church wherever they went</BulletItem>
                <BulletItem><strong>The Law of Transformation</strong> (The 15 Invaluable Laws of Growth, ch. 15): Saul's radical conversion</BulletItem>
                <BulletItem><strong>The Law of Connection</strong> (The 21 Irrefutable Laws of Leadership, ch. 10): Ananias and Barnabas connected with difficult people others feared or avoided</BulletItem>
              </BulletList>
            </YellowSection>

            <SectionHeading>MODERN APPLICATION: THE EXPANSION PRINCIPLES</SectionHeading>
            
            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🔄 Turning Setbacks into Comebacks</h3>
              <p>When facing persecution or opposition:</p>
              <BulletList>
                <BulletItem>Scatter strategically—treat displacement as deployment</BulletItem>
                <BulletItem>Preach everywhere—every new location becomes a mission field</BulletItem>
                <BulletItem>Cross barriers boldly—opposition often opens new territory</BulletItem>
                <BulletItem>Maintain joy—there was "great joy in that city" despite hardship</BulletItem>
              </BulletList>
            </GreenSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">🌉 Encountering Cultural Barriers</h3>
              <BulletList>
                <BulletItem>Start with common ground—Philip began with Isaiah 53</BulletItem>
                <BulletItem>Demonstrate God's power—signs and wonders open hard hearts</BulletItem>
                <BulletItem>Build bridges—do not let prejudice block ministry opportunity</BulletItem>
                <BulletItem>Seek apostolic validation—maintain unity with existing leadership as you pioneer</BulletItem>
              </BulletList>
            </BlueSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">💫 Conversion and Development</h3>
              <p>When God brings unlikely converts:</p>
              <BulletList>
                <BulletItem>Do not judge by the past—Saul seemed impossible</BulletItem>
                <BulletItem>Obey divine instructions—Ananias overcame fear</BulletItem>
                <BulletItem>Provide mentorship—Barnabas invested in Paul</BulletItem>
                <BulletItem>Give opportunities to prove change—let new believers serve quickly and appropriately</BulletItem>
              </BulletList>
            </PurpleSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">🚀 Leadership Pipelines</h3>
              <BulletList>
                <BulletItem>Recognize emerging leaders—Philip stepped up during crisis</BulletItem>
                <BulletItem>Develop people in their strengths—Philip excelled in evangelism more than administration</BulletItem>
                <BulletItem>Create development opportunities—scattered believers became scattered missionaries</BulletItem>
                <BulletItem>Connect people strategically—Barnabas knew how to open doors for others</BulletItem>
              </BulletList>
              <p className="mt-4">Maxwell observes, <span className="text-orange-300 font-semibold">"The greatest leaders see opportunities others miss"</span> (Leadership Gold, p. 67).</p>
            </OrangeSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">✅ Best Practices for Expansion</h3>
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
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">CHAPTER 5: BREAKING BARRIERS</h1>
              <p className="text-xl text-purple-200">Acts 10–12 — "If We Break Barriers Like They Did …"</p>
            </div>

            <SectionHeading>WHAT THEY FACED</SectionHeading>
            <RedSection>
              <p>They were standing before the ultimate barrier. For 1,500 years, Jews had been taught that Gentiles were unclean, unreachable, and unwelcome in God's covenant. Now God was about to shatter that barrier forever. The leadership challenge was complex:</p>
              <BulletList>
                <BulletItem>Peter's own prejudice surfaced in his confession, "I have never eaten anything impure or unclean" (Acts 10:14)</BulletItem>
                <BulletItem>Jewish expectations had long assumed the Messiah would restore Israel, not include the nations</BulletItem>
                <BulletItem>Church unity was at stake—how do you integrate people with completely different backgrounds?</BulletItem>
                <BulletItem>A doctrinal question pressed for clarity: Must Gentiles become Jews first to become Christians?</BulletItem>
              </BulletList>
              <p className="mt-4">The stakes could not have been higher. This decision would determine whether Christianity remained a Jewish sect or became a global movement. Maxwell writes, <span className="text-red-300 font-semibold">"The biggest barriers to breakthrough are often in our own minds"</span> (Thinking for a Change, p. 89).</p>
            </RedSection>

            <SectionHeading>WHAT THEY DID: DIVINE VISION MEETS HUMAN OBEDIENCE</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 1: PETER'S PARADIGM SHIFT (Acts 10:1–23)</h3>
              <p>God began the breakthrough with two visions and one Spirit-led meeting. Cornelius, a Roman centurion described as devout and God-fearing, received angelic instruction: "Send men to Joppa to bring back a man named Simon who is called Peter" (vv. 1–8, esp. v. 5). Meanwhile, on a rooftop in Joppa, Peter fell into a trance and saw a sheet filled with unclean animals. He heard the voice of God: "Get up, Peter. Kill and eat" (v. 13). Peter resisted: "Surely not, Lord! I have never eaten anything impure or unclean" (v. 14). God replied, <span className="text-green-300 font-semibold">"Do not call anything impure that God has made clean"</span> (v. 15). The vision repeated three times. God was insisting on a paradigm shift. As Maxwell's Law of Process reminds us, "Leadership develops daily, not in a day" (The 21 Irrefutable Laws of Leadership, p. 23). Even Peter needed time and repetition to grasp the magnitude of this change.</p>
              <p className="mt-4">While Peter pondered the vision, Cornelius's messengers arrived. The Holy Spirit said, "Do not hesitate to go with them, for I have sent them" (v. 20). Peter obeyed at once, inviting the Gentile messengers into the house—breaking Jewish custom—and left with them the next day (vv. 21–23).</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 2: THE CAESAREA BREAKTHROUGH (Acts 10:24–48)</h3>
              <p>In Caesarea, Cornelius had gathered family and friends. When Peter entered, Cornelius fell at his feet, but Peter lifted him up. "Stand up; I am only a human being" (v. 26). Then Peter declared the new paradigm: <span className="text-green-300 font-semibold">"You are well aware that it is against our law for a Jew to associate with or visit a Gentile. But God has shown me that I should not call anyone impure or unclean. So when I was sent for, I came without raising any objection"</span> (vv. 28–29). Cornelius explained his vision and concluded, "Now we are all here in the presence of God to listen to everything the Lord has commanded you to tell us" (vv. 30–33).</p>
              <p className="mt-4">Peter's sermon was revolutionary. "I now realize how true it is that God does not show favoritism but accepts from every nation the one who fears him and does what is right" (vv. 34–35). He preached Jesus—His life and ministry, "doing good and healing all who were under the power of the devil" (v. 38), His death and resurrection, "They killed him by hanging him on a cross. But God raised him from the dead" (vv. 39–40), and His universal offer of forgiveness: "Everyone who believes in him receives forgiveness of sins through his name" (v. 43).</p>
              <p className="mt-4">God interrupted the sermon with the Holy Spirit. "While Peter was still speaking these words, the Holy Spirit came on all who heard the message. The circumcised believers … were astonished that the gift of the Holy Spirit had been poured out even on Gentiles, for they heard them speaking in tongues and praising God" (vv. 44–46). Peter responded decisively: "Surely no one can stand in the way of their being baptized with water. They have received the Holy Spirit just as we have." He ordered that they be baptized in the name of Jesus Christ (vv. 47–48). Leadership learns this lesson well: when God moves, great leaders adapt their methods to align with His purposes. As Maxwell observes, <span className="text-green-300 font-semibold">"Leaders must be quick to adapt but slow to abandon their core values"</span> (Leadership Gold, p. 134).</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 3: THE JERUSALEM CONFRONTATION (Acts 11:1–18)</h3>
              <p>News spread quickly. "The apostles and the believers throughout Judea heard that the Gentiles also had received the word of God." When Peter returned to Jerusalem, some criticized, "You went into the house of uncircumcised men and ate with them" (vv. 1–3). Peter did not react defensively. He "began and explained everything … precisely as it had happened" (v. 4). He recounted the vision and God's command, described the Spirit's direction—"The Spirit told me to have no hesitation about going with them"—and reported the parallel experience—"The Holy Spirit came on them as he had come on us at the beginning" (vv. 12, 15). His conclusion was unassailable: <span className="text-green-300 font-semibold">"So if God gave them the same gift he gave us who believed in the Lord Jesus Christ, who was I to think that I could stand in God's way?"</span> (v. 17). The church fell silent, then praised God. "So then, even to Gentiles God has granted repentance that leads to life" (v. 18). Maxwell's Law of Buy-In applies: "People buy into the leader, then the vision" (The 21 Irrefutable Laws of Leadership, p. 137). Peter's credibility carried the day.</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 4: THE ANTIOCH EXPLOSION (Acts 11:19–30)</h3>
              <p>The persecution that followed Stephen's death had scattered believers far and wide. Many spoke only to Jews, but some from Cyprus and Cyrene went to Antioch and preached to Greeks as well (vv. 19–20). "The Lord's hand was with them, and a great number of people believed and turned to the Lord" (v. 21). Jerusalem sent Barnabas to investigate. "When he arrived and saw what the grace of God had done, he was glad and encouraged them all to remain true to the Lord with all their hearts" (v. 23). Barnabas proved an encourager, "a good man, full of the Holy Spirit and faith," and the church grew even more (v. 24). He showed his skill as a recruiter and developer by going to Tarsus to find Saul and bringing him to Antioch. For a full year, they taught great numbers (vv. 25–26). The impact was seismic. <span className="text-green-300 font-semibold">"The disciples were called Christians first at Antioch"</span> (v. 26). A new identity formed around Christ, not ethnicity or prior religious affiliation.</p>
            </GreenSection>

            <RedSection>
              <h3 className="text-xl font-bold mb-4 text-red-200">PHASE 5: THE PERSECUTION CYCLE (Acts 12:1–25)</h3>
              <p>Meanwhile, persecution surged. King Herod arrested believers, executed James the brother of John, and then seized Peter (vv. 1–3). "So Peter was kept in prison, but the church was earnestly praying to God for him" (v. 5). God sent an angel; chains fell, guards slept, iron gates opened, and Peter walked free. "Now I know without a doubt that the Lord has sent his angel and rescued me from Herod's clutches" (v. 11). Peter went to the prayer meeting at Mary's house, where believers struggled to believe their prayer had been answered—"You're out of your mind!" they told Rhoda when she reported Peter at the door (v. 15). It is a sobering leadership insight: sometimes the church prays for miracles but struggles to believe when they happen.</p>
              <p className="mt-4">Herod's pride proved fatal. After accepting the crowd's worship as if he were a god, "immediately, because Herod did not give praise to God, an angel of the Lord struck him down, and he was eaten by worms and died. But the word of God continued to spread and flourish" (vv. 23–24). Maxwell warns, <span className="text-red-300 font-semibold">"Pride goes before destruction, and leadership without humility is leadership without longevity"</span> (The 21 Indispensable Qualities of a Leader, p. 78).</p>
            </RedSection>

            <SectionHeading>WHAT THEY GOT: THE GLOBAL CHURCH</SectionHeading>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">⛪ Theological Breakthroughs</h3>
              <BulletList>
                <BulletItem>God's people embraced Gentile inclusion—"God does not show favoritism" (Acts 10:34)</BulletItem>
                <BulletItem>Salvation was proclaimed as universal in scope—"Everyone who believes in him receives forgiveness" (Acts 10:43)</BulletItem>
                <BulletItem>Equal access was confirmed as Gentiles received the Holy Spirit just as Jews had</BulletItem>
                <BulletItem>A new identity emerged—"Christians"—followers of Christ, not converts to Judaism</BulletItem>
              </BulletList>
            </BlueSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">🌍 Geographic Expansion</h3>
              <p>The gospel advanced into:</p>
              <BulletList>
                <BulletItem>Caesarea, a Roman military center</BulletItem>
                <BulletItem>Antioch, a major commercial hub that became a mission base</BulletItem>
                <BulletItem>Beyond, as evangelists from Cyprus and Cyrene pioneered cross-cultural work</BulletItem>
                <BulletItem>The foundation for worldwide missions was laid</BulletItem>
              </BulletList>
            </PurpleSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">👥 Leadership Development</h3>
              <BulletList>
                <BulletItem>Peter grew from a prejudiced fisherman into a barrier-breaking apostle</BulletItem>
                <BulletItem>Barnabas encouraged, recruited, and developed leaders</BulletItem>
                <BulletItem>Paul was brought from Tarsus to Antioch for preparation</BulletItem>
                <BulletItem>Local Gentile believers were quickly integrated into ministry</BulletItem>
              </BulletList>
            </YellowSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🏗️ Organizational Maturity</h3>
              <p>Structures flexed without fracturing:</p>
              <BulletList>
                <BulletItem>Jerusalem remained a center but no longer the sole authority</BulletItem>
                <BulletItem>Antioch became a launch pad for future missions</BulletItem>
                <BulletItem>Diversity was celebrated as Jews and Gentiles worshiped together</BulletItem>
                <BulletItem>Unity was maintained despite cultural differences</BulletItem>
              </BulletList>
            </GreenSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">🎯 Mission Strategy Evolution</h3>
              <BulletList>
                <BulletItem>The church learned cross-cultural competence—adapting methods while maintaining the message</BulletItem>
                <BulletItem>God validated the barrier-breaking with signs and wonders</BulletItem>
                <BulletItem>Local ownership grew as new believers took immediate leadership</BulletItem>
                <BulletItem>A multiplication mindset took root—every barrier broken opened new territory</BulletItem>
              </BulletList>
            </OrangeSection>

            <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
            <BlueSection>
              <BulletList>
                <BulletItem><strong>The Law of Navigation</strong>: Peter's journey through cultural prejudice toward God's global vision (The 21 Irrefutable Laws of Leadership, ch. 3)</BulletItem>
                <BulletItem><strong>The Law of Solid Ground</strong>: Peter's integrity enabled the Jerusalem church to trust his controversial decisions (ch. 6)</BulletItem>
                <BulletItem><strong>The Law of Connection</strong>: Barnabas bridged Jewish and Gentile believers (ch. 10)</BulletItem>
                <BulletItem><strong>The Law of Explosive Growth</strong>: Breaking barriers led to multiplication, not mere addition (ch. 19)</BulletItem>
              </BulletList>
            </BlueSection>

            <SectionHeading>MODERN APPLICATION: THE BARRIER-BREAKING BLUEPRINT</SectionHeading>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">🔍 Identify Barriers to Break</h3>
              <p><strong>Cultural barriers:</strong></p>
              <BulletList>
                <BulletItem>Racial prejudice</BulletItem>
                <BulletItem>Class divides</BulletItem>
                <BulletItem>Generational gaps</BulletItem>
                <BulletItem>Language limitations</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Religious barriers:</strong></p>
              <BulletList>
                <BulletItem>Denominational walls</BulletItem>
                <BulletItem>Theological prejudices</BulletItem>
                <BulletItem>Lifestyle judgments</BulletItem>
                <BulletItem>Painful past experiences that block new relationships</BulletItem>
              </BulletList>
              <p className="mt-4">Ask: Who cannot access your ministry and why? Name them honestly.</p>
            </PurpleSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🎯 Follow the Peter Process</h3>
              <p><strong>Step 1: Divine Vision (Acts 10:9–16)</strong></p>
              <BulletList>
                <BulletItem>Pray regularly, and stay open to God challenging your assumptions</BulletItem>
                <BulletItem>Listen carefully—He may repeat crucial messages</BulletItem>
                <BulletItem>Be willing to move from "I have never …" to "I will now …"</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Step 2: Courageous Obedience (Acts 10:17–23)</strong></p>
              <BulletList>
                <BulletItem>Act despite uncertainty; Peter did not fully understand yet obeyed</BulletItem>
                <BulletItem>Break your own rules when love requires stepping beyond comfort</BulletItem>
                <BulletItem>Bring others along as witnesses and partners</BulletItem>
                <BulletItem>Move quickly—do not let fear talk you out of God's direction</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Step 3: Authentic Connection (Acts 10:24–43)</strong></p>
              <BulletList>
                <BulletItem>Start with humility—"I am only a human being"</BulletItem>
                <BulletItem>Share your growth—"God has shown me …"</BulletItem>
                <BulletItem>Keep the gospel central across cultures</BulletItem>
                <BulletItem>Expect God to move; be ready for supernatural confirmation</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Step 4: Defend Your Actions (Acts 11:1–18)</strong></p>
              <BulletList>
                <BulletItem>Tell the whole story—do not merely defend conclusions; explain God's process</BulletItem>
                <BulletItem>Point to His activity—"Who was I to think that I could stand in God's way?"</BulletItem>
                <BulletItem>Stay united by helping others see what God is doing</BulletItem>
                <BulletItem>Praise Him together when breakthroughs come</BulletItem>
              </BulletList>
            </GreenSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">🌉 Build a Barrier-Breaking Culture</h3>
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
              <p className="mt-4">Maxwell observes, <span className="text-orange-300 font-semibold">"Diversity is not about political correctness; it's about kingdom effectiveness"</span> (Everyone Communicates, Few Connect, p. 89).</p>
            </OrangeSection>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">CHAPTER 6: FIRST MISSIONARY JOURNEY</h1>
              <p className="text-xl text-purple-200">Acts 13–15 — "If We Go Global Like They Did …"</p>
            </div>

            <SectionHeading>WHAT THEY FACED</SectionHeading>
            <BlueSection>
              <p>The barrier-breaking breakthrough with Gentiles created a new question: How do you systematically reach the unreached world? The church at Antioch emerged as a launch pad—a diverse community ready to send missionaries into uncharted territory. The challenges were significant:</p>
              <BulletList>
                <BulletItem>There was no roadmap for cross-cultural church planting</BulletItem>
                <BulletItem>Cultural complexity was real: How much should Gentiles adopt Jewish customs?</BulletItem>
                <BulletItem>Opposition waited in every direction, from both Jewish and pagan communities</BulletItem>
                <BulletItem>Leadership questions pressed in: Who leads? Who sends? Who decides policy?</BulletItem>
              </BulletList>
              <p className="mt-4">Could they develop a reproducible strategy for global missions that would work in any culture? As Maxwell writes, <span className="text-blue-300 font-semibold">"Vision without a strategy remains an illusion"</span> (The 21 Irrefutable Laws of Leadership, p. 45).</p>
            </BlueSection>

            <SectionHeading>WHAT THEY DID: THE STRATEGIC MISSIONS BLUEPRINT</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 1: DIVINE SENDING (Acts 13:1–3)</h3>
              <p>The leadership team at Antioch included Barnabas, Simeon called Niger, Lucius of Cyrene, Manaen (who had been brought up with Herod the tetrarch), and Saul (v. 1). Their diversity was itself a statement of the gospel's reach:</p>
              <BulletList>
                <BulletItem>Barnabas, a Jewish Levite from Cyprus</BulletItem>
                <BulletItem>Simeon called Niger, likely African (Niger means "black")</BulletItem>
                <BulletItem>Lucius from Cyrene in North Africa</BulletItem>
                <BulletItem>Manaen, connected to political power</BulletItem>
                <BulletItem>Saul, a former Pharisee and Roman citizen</BulletItem>
              </BulletList>
              <p className="mt-4">While they were worshiping the Lord and fasting, the Holy Spirit spoke clearly: <span className="text-green-300 font-semibold">"Set apart for me Barnabas and Saul for the work to which I have called them"</span> (v. 2). So, after further fasting and prayer, the church laid hands on them and sent them off (v. 3).</p>
              <p className="mt-4">Notice the order and principles at work:</p>
              <BulletList>
                <BulletItem>Worship preceded work; the call came in the context of worship</BulletItem>
                <BulletItem>Prayer confirmed direction; fasting and prayer preceded sending</BulletItem>
                <BulletItem>The team validated the calling; there was corporate confirmation of an individual call</BulletItem>
                <BulletItem>Authority transferred through the laying on of hands, signaling official authorization</BulletItem>
              </BulletList>
              <p className="mt-4">As Maxwell's Law of Process reminds us, "Leadership develops daily, not in a day" (The 21 Irrefutable Laws of Leadership, p. 23).</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 2: THE REPRODUCIBLE METHOD (Acts 13:4–14:28)</h3>
              <p><strong>Cyprus (13:4–12):</strong> Strategically, they began with Barnabas's homeland—familiar territory first. Opposition arose quickly. Bar-Jesus, a sorcerer, tried to turn the proconsul away from the faith. Paul confronted him: "You are a child of the devil and an enemy of everything that is right!" (v. 10), and the sorcerer was struck blind. The result was powerful: "When the proconsul saw what had happened, he believed, for he was amazed at the teaching about the Lord" (v. 12). From there, a leadership shift becomes evident: "From Paphos, Paul and his companions sailed to Perga in Pamphylia" (v. 13). It is now "Paul and his companions," not "Barnabas and Saul."</p>
              
              <p className="mt-4"><strong>Pisidian Antioch (13:13–52):</strong> They entered the synagogue on the Sabbath and sat down (v. 14). Paul's method was consistent and wise:</p>
              <BulletList>
                <BulletItem>He started with Scripture, using the Old Testament as a foundation</BulletItem>
                <BulletItem>He connected the promises to Christ: "What God promised our ancestors he has fulfilled for us, their children, by raising up Jesus" (vv. 32–33)</BulletItem>
                <BulletItem>He called for decision: "Through Jesus the forgiveness of sins is proclaimed to you" (v. 38)</BulletItem>
              </BulletList>
              
              <p className="mt-4">The audience response moved through a familiar arc—initial interest as many Jews and devout converts followed Paul and Barnabas (v. 43), swelling crowds until almost the whole city gathered to hear the word of the Lord (v. 44), and rising religious opposition as jealousy took root (v. 45). This led to a pivotal decision: <span className="text-green-300 font-semibold">"We had to speak the word of God to you first. Since you reject it and do not consider yourselves worthy of eternal life, we now turn to the Gentiles"</span> (vv. 46–47). The Gentiles received the message with joy, honored the word, and those appointed to eternal life believed, as the word spread through the whole region (vv. 48–49). Persecution was organized against the missionaries, and they were expelled, but they shook the dust from their feet and went to Iconium. The disciples, nevertheless, were filled with joy and with the Holy Spirit (vv. 50–52).</p>
              
              <p className="mt-4"><strong>Iconium and Lystra (14:1–20):</strong> The same pattern unfolded. They began in the synagogue, met a mixed response, and ministered with signs and wonders as the Lord confirmed the message of His grace (14:3). Opposition intensified, with plots to stone them. In Lystra, Paul healed a man lame from birth, and the crowd cried, "The gods have come down to us in human form!" They called Barnabas Zeus and Paul Hermes. Paul's response was humble and clear: "Friends, why are you doing this? We too are only human, like you. We are bringing you good news, telling you to turn from these worthless things to the living God" (v. 15). Soon after, opponents from Antioch and Iconium turned the crowd, and Paul was stoned and dragged outside the city, thought to be dead. But when the disciples gathered around him, he rose and went back into the city (vv. 19–20). As Maxwell observes, <span className="text-green-300 font-semibold">"The measure of a leader is not what he does in moments of comfort and convenience, but what he does in times of challenge and controversy"</span> (The 21 Indispensable Qualities of a Leader, p. 67).</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 3: CHURCH ESTABLISHMENT (Acts 14:21–28)</h3>
              <p>On the return journey, their strategy was intentional:</p>
              <BulletList>
                <BulletItem>They made disciples—"They preached the gospel in that city and won a large number of disciples"</BulletItem>
                <BulletItem>They strengthened churches—returning to Lystra, Iconium, and Antioch to strengthen the disciples</BulletItem>
                <BulletItem>They appointed leaders—elders in every church</BulletItem>
                <BulletItem>They committed these leaders and churches to the Lord with prayer and fasting (vv. 21–23)</BulletItem>
              </BulletList>
              <p className="mt-4">The model was reproducible: <strong>evangelize</strong> by preaching the gospel, <strong>establish</strong> by planting churches, <strong>equip</strong> by appointing local leaders, <strong>encourage</strong> by returning to strengthen, and <strong>entrust</strong> by committing the work to God's care. Finally, they sailed back to Antioch, gathered the church, and reported "all that God had done through them and how he had opened a door of faith to the Gentiles" (vv. 24–28).</p>
            </GreenSection>

            <RedSection>
              <h3 className="text-xl font-bold mb-4 text-red-200">PHASE 4: THE GENTILE CONTROVERSY (Acts 15:1–35)</h3>
              <p>A crisis arose in Antioch when some taught, "Unless you are circumcised, according to the custom taught by Moses, you cannot be saved" (v. 1). This was not a small matter. It touched the very heart of the gospel and the future of the movement. Would Christianity remain a Jewish sect or become a global faith?</p>
              <p className="mt-4">At the Jerusalem Council, Peter reminded the assembly that God had already shown His will by giving the Holy Spirit to Gentiles, just as He had to Jews. <span className="text-red-300 font-semibold">"We believe it is through the grace of our Lord Jesus that we are saved, just as they are"</span> (vv. 7–11). Paul and Barnabas recounted the signs and wonders God had done among the Gentiles through their ministry (v. 12). Then James, leading the church in Jerusalem, rendered judgment: "We should not make it difficult for the Gentiles who are turning to God. Instead we should write to them, telling them to abstain from food polluted by idols, from sexual immorality, from the meat of strangled animals, and from blood" (vv. 19–20). An official letter was sent, affirming that Gentiles did not need circumcision, but should abstain from practices that would unnecessarily offend Jewish believers (vv. 22–29). The result was joy and encouragement as the believers received the decision and were strengthened (vv. 30–35). As Maxwell's Law of Navigation says, "Anyone can steer the ship, but it takes a leader to chart the course" (The 21 Irrefutable Laws of Leadership, p. 17). The Jerusalem Council charted the course for global Christianity.</p>
            </RedSection>

            <SectionHeading>WHAT THEY GOT: THE GLOBAL CHURCH BLUEPRINT</SectionHeading>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">🗺️ Strategic Methodology</h3>
              <p>From these labors emerged a strategic, reproducible methodology:</p>
              <BulletList>
                <BulletItem>The pattern was systematic—begin in the synagogue, then turn to the Gentiles, plant a church, appoint leaders, and move on, trusting God with ongoing growth</BulletItem>
                <BulletItem>The message remained the same, while methods flexed to fit culture</BulletItem>
                <BulletItem>Indigenous leadership was the default, with local believers leading from day one</BulletItem>
                <BulletItem>Ongoing support came through return visits that strengthened and encouraged</BulletItem>
              </BulletList>
            </PurpleSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">⛪ Theological Clarity</h3>
              <p>The church clarified essential truths:</p>
              <BulletList>
                <BulletItem>Salvation is by grace through faith alone—not faith plus works</BulletItem>
                <BulletItem>Gentiles did not need to become Jews to become Christians</BulletItem>
                <BulletItem>Unity was defined by gospel essentials, while cultural diversity was honored</BulletItem>
                <BulletItem>The vision expanded toward every nation, tribe, and tongue</BulletItem>
              </BulletList>
            </BlueSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">🏗️ Organizational Structure</h3>
              <BulletList>
                <BulletItem>Sending churches commissioned missionaries</BulletItem>
                <BulletItem>Ministry was done in teams, not solo</BulletItem>
                <BulletItem>Accountability was practiced through reports back to sending churches</BulletItem>
                <BulletItem>Leadership development was immediate, with a clear focus on raising up local leaders</BulletItem>
              </BulletList>
            </YellowSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">📈 Measurable Results</h3>
              <p><strong>Geographic expansion:</strong></p>
              <BulletList>
                <BulletItem>The gospel advanced through Cyprus and Galatia</BulletItem>
                <BulletItem>Foundations were laid across Asia Minor</BulletItem>
                <BulletItem>The strategy was proven and ready for replication</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Leadership multiplication:</strong></p>
              <BulletList>
                <BulletItem>Paul emerged as a primary missionary</BulletItem>
                <BulletItem>Elders were appointed locally</BulletItem>
                <BulletItem>Team members like Silas and Timothy were recruited</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Church planting:</strong></p>
              <BulletList>
                <BulletItem>Every stop resulted in new congregations</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Cultural integration:</strong></p>
              <BulletList>
                <BulletItem>Gentile inclusion was affirmed by official policy</BulletItem>
                <BulletItem>Jewish–Gentile unity was modeled through practical solutions</BulletItem>
                <BulletItem>A global identity crystallized around the name "Christian," born in the diversity of Antioch</BulletItem>
                <BulletItem>Missional DNA took root: every church became a sending church</BulletItem>
              </BulletList>
            </GreenSection>

            <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
            <OrangeSection>
              <BulletList>
                <BulletItem><strong>The Law of Legacy:</strong> Building systems that would outlast them</BulletItem>
                <BulletItem><strong>The Law of Explosive Growth:</strong> Multiplying leaders for exponential expansion</BulletItem>
                <BulletItem><strong>The Law of Navigation:</strong> The Jerusalem Council guided the church through its most crucial decision</BulletItem>
                <BulletItem><strong>The Law of Sacrifice:</strong> Paul endured stoning and relentless opposition for the sake of the mission</BulletItem>
              </BulletList>
            </OrangeSection>

            <SectionHeading>MODERN APPLICATION: THE GLOBAL MISSIONS MODEL</SectionHeading>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">🚀 Before You Go: Strategic Sending</h3>
              <BulletList>
                <BulletItem>Worship and fast, seeking God's direction through spiritual disciplines</BulletItem>
                <BulletItem>Confirm calling through corporate validation, not merely personal conviction</BulletItem>
                <BulletItem>Build diverse teams that bring multiple perspectives and cultural strengths</BulletItem>
                <BulletItem>Establish clear lines of accountability and communication with the sending church</BulletItem>
              </BulletList>
            </PurpleSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🌱 Follow Paul's Church Planting Method</h3>
              <p><strong>Entry strategy:</strong></p>
              <BulletList>
                <BulletItem>Start with existing connections and natural cultural bridges</BulletItem>
                <BulletItem>Seek out receptive people—those already leaning toward truth</BulletItem>
                <BulletItem>Demonstrate authenticity so your character speaks before your message</BulletItem>
                <BulletItem>Expect opposition and plan for resistance from established systems</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Gospel presentation:</strong></p>
              <BulletList>
                <BulletItem>Use familiar foundations</BulletItem>
                <BulletItem>Connect everything to Christ</BulletItem>
                <BulletItem>Call for a clear decision</BulletItem>
                <BulletItem>Form community immediately by integrating new believers into fellowship</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Church establishment:</strong></p>
              <BulletList>
                <BulletItem>Develop leaders quickly without waiting for "perfect" candidates</BulletItem>
                <BulletItem>Create systems that can function without you</BulletItem>
                <BulletItem>Address cultural issues wisely where traditions conflict with faith</BulletItem>
                <BulletItem>Plan your exit from day one, working yourself out of a job</BulletItem>
              </BulletList>
            </GreenSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">🤝 When Cultural Controversies Arise</h3>
              <p>Use the Jerusalem Council model:</p>
              <BulletList>
                <BulletItem>Listen to all sides</BulletItem>
                <BulletItem>Look for where the Holy Spirit is already working</BulletItem>
                <BulletItem>Focus on essentials, separating the core of the gospel from cultural preferences</BulletItem>
                <BulletItem>Create practical solutions that address real concerns without compromising truth</BulletItem>
                <BulletItem>Communicate clearly so all are strengthened</BulletItem>
              </BulletList>
              <p className="mt-4">As Maxwell notes, <span className="text-blue-300 font-semibold">"Great leaders ask great questions"</span> (Good Leaders Ask Great Questions, p. 23). Ask:</p>
              <BulletList>
                <BulletItem>What is essential to the gospel and what is cultural preference?</BulletItem>
                <BulletItem>How do we maintain unity while allowing diversity?</BulletItem>
                <BulletItem>What barriers have we created that God never intended?</BulletItem>
                <BulletItem>How can we honor multiple cultures while serving Christ together?</BulletItem>
              </BulletList>
            </BlueSection>
          </div>
        );
      
      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">CHAPTER 7: EUROPEAN EXPANSION</h1>
              <p className="text-xl text-purple-200">Acts 16–18 — "If We Cross Into Europe Like They Did …"</p>
            </div>

            <SectionHeading>WHAT THEY FACED</SectionHeading>
            <BlueSection>
              <p>Closed doors forced fresh direction. The Holy Spirit forbade them to speak the word in Asia and Bithynia, then a night vision redirected them across the Aegean to Macedonia—a decisive leap from Asia to Europe (Acts 16:6–10). The challenges were significant:</p>
              <BulletList>
                <BulletItem>How do you plant the gospel in Roman colonies, philosophical centers, and commercial hubs with no prior foothold?</BulletItem>
                <BulletItem>Resistance would be legal in the hands of magistrates</BulletItem>
                <BulletItem>Spiritual in the clash with demonic powers</BulletItem>
                <BulletItem>Cultural in the world of Epicureans and Stoics</BulletItem>
                <BulletItem>Economic where transformed lives threatened trade</BulletItem>
              </BulletList>
              <p className="mt-4">Team composition was changing as well—Paul, Silas, Timothy, and now Luke entered the narrative—requiring clarity of roles and unity of purpose. Could they form an entry strategy for hard, secular cities and remain long enough to lay deep roots? As Maxwell reminds us, <span className="text-blue-300 font-semibold">"Vision without a strategy remains an illusion"</span> (The 21 Irrefutable Laws of Leadership, p. 45).</p>
            </BlueSection>

            <SectionHeading>WHAT THEY DID: THE EUROPE LAUNCH PLAYBOOK</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 1: GUIDED AND READY (Acts 16:1–10)</h3>
              <p>Paul added Timothy at Lystra, a young leader well spoken of by the believers. He circumcised him, not for salvation but for mission access among Jews (Acts 16:3), applying the Jerusalem Council's theology strategically on the ground. They delivered the decisions of the apostles to strengthen the churches (16:4–5). Twice the Spirit said "No," then the Macedonian vision said "Come over and help us." They concluded together that God had called them and moved immediately (16:10)—spiritual sensitivity joined to decisive execution. As Maxwell's Law of Navigation teaches, leaders chart the course before they steer it (The 21 Irrefutable Laws of Leadership, p. 17).</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 2: PHILIPPI—A CHURCH FROM A PRAYER MEETING (Acts 16:11–40)</h3>
              <p>Philippi, a proud Roman colony, lacked a synagogue, so they searched for a place of prayer by the river. Lydia, a dealer in purple, listened; <span className="text-green-300 font-semibold">"The Lord opened her heart,"</span> and her household was baptized (Acts 16:14–15). Her hospitality became gospel headquarters. Deliverance of a slave girl from a spirit of divination triggered economic backlash; Paul and Silas were beaten and jailed without trial. At midnight they prayed and sang; an earthquake opened doors, and the jailer, poised for suicide, heard, "Believe in the Lord Jesus, and you will be saved—you and your household" (16:31). He washed their wounds; they watched his sins washed away in baptism. By morning, Paul asserted Roman citizenship, securing public vindication and protection for the young church (16:37–39). The pattern is clear: begin with a spiritual beachhead, expect backlash, turn suffering into testimony, and use legal status wisely to guard the flock.</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 3: THESSALONICA AND BEREA—REASON AND READINESS (Acts 17:1–15)</h3>
              <p>In Thessalonica, Paul reasoned from the Scriptures for three Sabbaths, explaining that the Messiah had to suffer and rise and identifying Jesus as the Christ (Acts 17:2–3). Some Jews, many God-fearing Greeks, and leading women believed. Jealous opponents formed a mob, assaulted Jason's house, and accused the missionaries of "turning the world upside down" (17:6). In Berea, the posture shifted; they received the word with eagerness and examined the Scriptures daily to test the message (17:11). Many believed, yet opposition pursued Paul there as well. The method held: reason from shared authority, honor sincere inquiry, and anticipate organized resistance that follows momentum.</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 4: ATHENS—CONTEXTUALIZING FOR THE THINKERS (Acts 17:16–34)</h3>
              <p>Provoked by a city full of idols, Paul engaged both synagogue and marketplace until he was invited to the Areopagus. His approach was masterful:</p>
              <BulletList>
                <BulletItem>He connected with observed culture through the altar "to an unknown god"</BulletItem>
                <BulletItem>He affirmed common grace by presenting God as Creator, Giver, and Sustainer</BulletItem>
                <BulletItem>He confronted error by declaring God is not made by human hands</BulletItem>
                <BulletItem>He called for repentance in light of the appointed judgment</BulletItem>
                <BulletItem>He crowned Christ with resurrection authority (Acts 17:22–31)</BulletItem>
              </BulletList>
              <p className="mt-4">Responses ranged from mockery to curiosity to conversion—Dionysius, Damaris, and others believed. The lesson is simple: begin where people are, lead them to who God is, and bring them to what God has done in Christ. As Maxwell notes, leaders <span className="text-green-300 font-semibold">"must connect before they direct"</span> (Leadership 101, p. 45).</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 5: CORINTH—STAYING LONG ENOUGH FOR DEPTH (Acts 18:1–23)</h3>
              <p>In Corinth—commercial, immoral, and influential—Paul worked with Aquila and Priscilla as a tentmaker while teaching every Sabbath. When opposed, he shifted next door to Titius Justus's house; the synagogue ruler Crispus believed with his household (Acts 18:8). The Lord appeared by night with a strengthening word: <span className="text-green-300 font-semibold">"Do not be afraid; keep on speaking, do not be silent. For I am with you … I have many people in this city"</span> (18:9–10). Paul stayed eighteen months. A legal challenge before Gallio was dismissed, creating a favorable precedent that gave the movement breathing room (18:12–17). On departure, he took Aquila and Priscilla to Ephesus, reasoned briefly in the synagogue, and then returned to Antioch, completing the journey. Meanwhile Apollos, eloquent but limited, was discipled by Priscilla and Aquila for greater accuracy and impact (18:24–28). The principles surface: leverage marketplace vocation, plant in homes, receive courage to stay, use the courts when appropriate, and develop emerging leaders who will carry the work forward.</p>
            </GreenSection>

            <SectionHeading>WHAT THEY GOT: BEACHHEADS, PRECEDENTS, AND A CITY PLAYBOOK</SectionHeading>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">🏙️ Europe Opened</h3>
              <p>Real conversions took root:</p>
              <BulletList>
                <BulletItem>Households like Lydia's and the jailer's</BulletItem>
                <BulletItem>Hosts like Jason and Titius Justus</BulletItem>
                <BulletItem>Leaders like Crispus testified that God was establishing communities across social strata</BulletItem>
              </BulletList>
            </PurpleSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">🗺️ Coherent Strategy for Secular Cities</h3>
              <BulletList>
                <BulletItem>Enter through existing networks</BulletItem>
                <BulletItem>Start where seekers already gather</BulletItem>
                <BulletItem>Reason from shared foundations</BulletItem>
                <BulletItem>Contextualize without compromise</BulletItem>
                <BulletItem>Anchor congregations in homes that become mission hubs</BulletItem>
              </BulletList>
            </BlueSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🛡️ Endurance and Protection</h3>
              <BulletList>
                <BulletItem>Midnight songs turned to salvation</BulletItem>
                <BulletItem>Public vindication in Philippi protected the fledgling church</BulletItem>
                <BulletItem>Gallio's ruling in Corinth created legal space for growth</BulletItem>
              </BulletList>
            </GreenSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">👥 Teams Multiplied</h3>
              <BulletList>
                <BulletItem>Timothy was empowered</BulletItem>
                <BulletItem>Luke entered the story</BulletItem>
                <BulletItem>Priscilla and Aquila matured into disciple-makers</BulletItem>
                <BulletItem>Apollos was sharpened for greater effectiveness</BulletItem>
              </BulletList>
            </YellowSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">🎯 Reproducible Method for Hard Places</h3>
              <BulletList>
                <BulletItem>Pray and listen</BulletItem>
                <BulletItem>Move on divine timing</BulletItem>
                <BulletItem>Find persons of peace</BulletItem>
                <BulletItem>Expect spiritual and economic pushback</BulletItem>
                <BulletItem>Turn hardship into testimony</BulletItem>
                <BulletItem>Assert legal rights wisely to safeguard the mission</BulletItem>
              </BulletList>
              <p className="mt-4">Depth replaced drive-by ministry; they moved quickly where doors were narrow and stayed long where cities were strategic. As Maxwell reminds us, <span className="text-orange-300 font-semibold">"Leadership develops daily, not in a day"</span> (The 21 Irrefutable Laws of Leadership, p. 23).</p>
            </OrangeSection>

            <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
            <PurpleSection>
              <BulletList>
                <BulletItem><strong>The Law of Navigation:</strong> Discerning closed doors and charting a Spirit-led route to Macedonia</BulletItem>
                <BulletItem><strong>The Law of Connection:</strong> In Athens, starting where hearers were and building a bridge to Christ</BulletItem>
                <BulletItem><strong>The Law of Sacrifice:</strong> Enduring beating, imprisonment, and risk for the sake of the gospel</BulletItem>
                <BulletItem><strong>The Law of Process:</strong> Remaining eighteen months in Corinth to develop durable disciples</BulletItem>
                <BulletItem><strong>The Law of the Inner Circle:</strong> Raising Timothy, equipping Priscilla and Aquila, and sharpening Apollos—expanding capacity by developing leaders who could lead others</BulletItem>
              </BulletList>
            </PurpleSection>

            <SectionHeading>MODERN APPLICATION: HOW TO ENTER HARD, SECULAR CITIES</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🧭 Follow the Spirit with a Plan</h3>
              <BulletList>
                <BulletItem>Pray, fast, and test impressions in community</BulletItem>
                <BulletItem>Act decisively when God confirms direction</BulletItem>
                <BulletItem>Build diverse teams that strengthen one another on the way</BulletItem>
                <BulletItem>Value couples and marketplace leaders whose homes and vocations can become strategic platforms</BulletItem>
                <BulletItem>Seek persons of peace whose credibility and hospitality can host a gospel beachhead</BulletItem>
                <BulletItem>Let households catalyze congregations</BulletItem>
              </BulletList>
            </GreenSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">💬 Learn and Communicate</h3>
              <BulletList>
                <BulletItem>Learn the idols and ideas of your city</BulletItem>
                <BulletItem>Use shared language to lead people to the lordship and resurrection of Jesus</BulletItem>
                <BulletItem>Connect before you correct</BulletItem>
                <BulletItem>Call for a clear response</BulletItem>
              </BulletList>
            </BlueSection>

            <RedSection>
              <h3 className="text-xl font-bold mb-4 text-red-200">⚔️ Expect and Endure Opposition</h3>
              <BulletList>
                <BulletItem>Expect opposition—economic, ideological, and legal</BulletItem>
                <BulletItem>Prepare to suffer well; sing in the night</BulletItem>
                <BulletItem>Use appropriate legal avenues to protect the vulnerable and the work</BulletItem>
                <BulletItem>Blend vocation and mission so excellence at work commends your message and opens doors</BulletItem>
              </BulletList>
            </RedSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">⏳ Stay and Develop</h3>
              <BulletList>
                <BulletItem>Stay where God says stay; ask for Corinth-style courage to keep speaking in strategic places</BulletItem>
                <BulletItem>Develop leaders early; teach accurately, hand off ministry</BulletItem>
                <BulletItem>Like Priscilla and Aquila with Apollos, offer private, gracious coaching that multiplies impact</BulletItem>
              </BulletList>
              <p className="mt-4">As Maxwell notes, <span className="text-yellow-300 font-semibold">"Great leaders ask great questions"</span> (Good Leaders Ask Great Questions, p. 23).</p>
            </YellowSection>
          </div>
        );
      
      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">CHAPTER 8: EPHESIAN MINISTRY</h1>
              <p className="text-xl text-purple-200">Acts 19–21 — "If We Build Like They Did ..."</p>
            </div>

            <SectionHeading>WHAT THEY FACED</SectionHeading>
            <BlueSection>
              <p>Ephesus was the crossroads of the ancient world—a major port, commercial hub, and religious center. If they could establish a strong base here, they could influence all of Asia. The challenges, however, were complex:</p>
              <BulletList>
                <BulletItem>Some disciples were incomplete, believing in repentance through John but unaware of the Holy Spirit (Acts 19:1–7)</BulletItem>
                <BulletItem>Religious competition emerged as Jewish exorcists tried to copy apostolic methods without relationship (Acts 19:13–16)</BulletItem>
                <BulletItem>Economic resistance loomed large because the temple of Artemis generated massive revenue and civic pride (Acts 19:23–41)</BulletItem>
                <BulletItem>Spiritual warfare was real and pervasive; evil spirits and occult practices saturated the city (Acts 19:11–20)</BulletItem>
                <BulletItem>Leadership transition was inevitable; Paul knew he would leave and had to prepare elders to continue the work (Acts 20:17–38)</BulletItem>
              </BulletList>
              <p className="mt-4">The test was clear: Could they build something sustainable in the most challenging environment they had faced? As Maxwell writes, <span className="text-blue-300 font-semibold">"The ultimate test of leadership is not the exit, but what happens after the exit"</span> (Leadership Gold, p. 156).</p>
            </BlueSection>

            <SectionHeading>WHAT THEY DID: BUILD THE ULTIMATE MINISTRY BASE</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 1: FOUNDATION BUILDING (Acts 19:1–22)</h3>
              <p>Paul first addressed the incomplete disciples. He found about twelve men who had believed but had never heard of the Holy Spirit; they had received John's baptism but not been baptized into Christ. He clarified, "John's baptism was a baptism of repentance. He told the people to believe in the one coming after him, that is, in Jesus" (v. 4). When Paul laid his hands on them, "the Holy Spirit came on them, and they spoke in tongues and prophesied" (v. 6). Wise leaders do not assume understanding; they verify and complete what is missing.</p>
              <p className="mt-4">He then followed his proven synagogue strategy: "Paul entered the synagogue and spoke boldly there for three months, arguing persuasively about the kingdom of God. But some of them became obstinate; they refused to believe and publicly maligned the Way" (vv. 8–9a). So he made a strategic pivot. "Paul left them. He took the disciples with him and had discussions daily in the lecture hall of Tyrannus" (v. 9b). This continued for two years "so that all the Jews and Greeks who lived in the province of Asia heard the word of the Lord" (v. 10). As Maxwell's Law of Process reminds us, "Leadership develops daily, not in a day" (The 21 Irrefutable Laws of Leadership, p. 23). During this season "God did extraordinary miracles through Paul, so that even handkerchiefs and aprons that had touched him were taken to the sick, and their illnesses were cured and the evil spirits left them" (vv. 11–12). The foundation combined doctrinal clarity, systematic teaching, and authentic spiritual power.</p>
            </GreenSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">PHASE 2: SPIRITUAL WARFARE (Acts 19:13–20)</h3>
              <p>Copycats attempted to use Jesus' name without knowing Jesus. Some Jewish exorcists declared, "In the name of the Jesus whom Paul preaches, I command you to come out" (v. 13). The demon replied, <span className="text-purple-300 font-semibold">"Jesus I know, and Paul I know about, but who are you?"</span> (v. 15). The man possessed by the evil spirit overpowered them, and they fled naked and bleeding. The city took notice. "When this became known to the Jews and Greeks living in Ephesus, they were all seized with fear, and the name of the Lord Jesus was held in high honor" (v. 17). Many believers openly confessed their practices; "a number who had practiced sorcery brought their scrolls together and burned them publicly" (v. 19a). The value was enormous—"fifty thousand drachmas" (v. 19b), roughly fifty thousand days' wages. "In this way the word of the Lord spread widely and grew in power" (v. 20). Authentic authority cannot be counterfeited; it flows from genuine relationship with God.</p>
            </PurpleSection>

            <RedSection>
              <h3 className="text-xl font-bold mb-4 text-red-200">PHASE 3: ECONOMIC OPPOSITION (Acts 19:23–41)</h3>
              <p>The gospel's advance threatened a lucrative idol industry. Demetrius, a silversmith, rallied the craftsmen: "You know, my friends, that we receive a good income from this business. And you see and hear how this fellow Paul has convinced and led astray large numbers of people here in Ephesus and in practically the whole province of Asia. He says that gods made by human hands are no gods at all" (vv. 25–26). He warned of economic loss and religious disgrace: "There is danger not only that our trade will lose its good name, but also that the temple of the great goddess Artemis will be discredited" (v. 27). Fury erupted into a riot as the crowd shouted, "Great is Artemis of the Ephesians!" and surged into the theater. Paul wanted to speak, but "the disciples would not let him," and even provincial officials who were his friends urged him not to enter the theater (vv. 30–31). The assembly descended into confusion; "most of the people did not even know why they had come together" (v. 32). Finally, the city clerk calmed the crowd and warned against unlawful assembly, then dismissed them (vv. 35–41). Sometimes the best leadership decision is restraint. As Maxwell observes, <span className="text-red-300 font-semibold">"Sometimes the best leadership decision is not to lead"</span> (The 21 Irrefutable Laws of Leadership, p. 89).</p>
            </RedSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">PHASE 4: LEADERSHIP TRANSITION (Acts 20:1–38)</h3>
              <p>After the uproar, Paul encouraged the disciples and set out, eventually calling the Ephesian elders to meet him at Miletus for a farewell charged with legacy. He reminded them of his example: "You know how I lived the whole time I was with you, from the first day I came into the province of Asia. I served the Lord with great humility and with tears and in the midst of severe testing by the plots of the Jews. You know that I have not hesitated to preach anything that would be helpful to you but have proclaimed it to you publicly and from house to house" (vv. 18–20). He charged them with stewardship: <span className="text-orange-300 font-semibold">"Keep watch over yourselves and all the flock of which the Holy Spirit has made you overseers. Be shepherds of the church of God, which he bought with his own blood"</span> (v. 28). He warned of danger: "I know that after I leave, savage wolves will come in among you and will not spare the flock. Even from your own number men will arise and distort the truth" (vv. 29–30). He entrusted them to God and to the word of His grace, reminded them of his own hard work to help the weak, and cited Jesus' words: "It is more blessed to give than to receive" (vv. 32–35). They wept together, knowing they would not see his face again, then accompanied him to the ship (vv. 36–38). Maxwell writes, "A leader's lasting value is measured by succession" (The 21 Irrefutable Laws of Leadership, p. 279).</p>
            </OrangeSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">PHASE 5: JERUSALEM DETERMINATION (Acts 21:1–36)</h3>
              <p>On the way to Jerusalem, prophetic warnings intensified. Agabus took Paul's belt, bound his own hands and feet, and declared, "The Holy Spirit says, 'In this way the Jewish leaders in Jerusalem will bind the owner of this belt and will hand him over to the Gentiles'" (Acts 21:11). Paul answered, <span className="text-yellow-300 font-semibold">"Why are you weeping and breaking my heart? I am ready not only to be bound, but also to die in Jerusalem for the name of the Lord Jesus"</span> (v. 13). When he would not be dissuaded, the disciples concluded, "The Lord's will be done" (v. 14). In Jerusalem, opponents from Asia stirred up a mob, shouting, "This is the man who teaches everyone everywhere against our people and our law and this place" (v. 28). They seized Paul and attempted to kill him until Roman soldiers intervened (vv. 31–36). Great leaders accept necessary risks for the sake of the mission, even when others try to protect them from those risks.</p>
            </YellowSection>

            <SectionHeading>WHAT THEY GOT: THE ASIAN CHURCH NETWORK</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🌏 Regional Saturation</h3>
              <p>The region was saturated with the gospel. Scripture records that <span className="text-green-300 font-semibold">"all the Jews and Greeks who lived in the province of Asia heard the word of the Lord"</span> (Acts 19:10):</p>
              <BulletList>
                <BulletItem>Spiritual authority was established as real miracles contrasted with counterfeit attempts</BulletItem>
                <BulletItem>Occult practices were openly renounced with costly repentance</BulletItem>
                <BulletItem>God's providence shielded the work during civic unrest</BulletItem>
              </BulletList>
            </GreenSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">💰 Economic Impact</h3>
              <BulletList>
                <BulletItem>Idol-making trade was threatened</BulletItem>
                <BulletItem>Profitable but ungodly practices were abandoned</BulletItem>
                <BulletItem>A new economy of generosity took root as leaders modeled that it is "more blessed to give than to receive"</BulletItem>
              </BulletList>
            </BlueSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">👥 Leadership Multiplication</h3>
              <BulletList>
                <BulletItem>Ephesian elders were trained for long-term oversight</BulletItem>
                <BulletItem>Regional churches were established—including those addressed later in Revelation</BulletItem>
                <BulletItem>Two years of daily training produced systems that sustained growth after Paul's departure</BulletItem>
              </BulletList>
            </PurpleSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">🎓 Methodological Innovations</h3>
              <p>The School of Tyrannus model demonstrated:</p>
              <BulletList>
                <BulletItem>The power of daily engagement over weekly events</BulletItem>
                <BulletItem>Systematic teaching over sporadic instruction</BulletItem>
                <BulletItem>An intentional training center that developed leaders who could develop others</BulletItem>
              </BulletList>
              <p className="mt-4">A multi-front approach took shape:</p>
              <BulletList>
                <BulletItem>Public ministry in synagogue and lecture hall</BulletItem>
                <BulletItem>Personal ministry from house to house</BulletItem>
                <BulletItem>Power ministry through extraordinary miracles and deliverance</BulletItem>
                <BulletItem>Practical ministry that met physical and economic needs</BulletItem>
              </BulletList>
              <p className="mt-4">As Maxwell observes, <span className="text-yellow-300 font-semibold">"Leaders who develop people add; leaders who develop leaders multiply"</span> (Developing the Leaders Around You, p. 156).</p>
            </YellowSection>

            <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
            <OrangeSection>
              <BulletList>
                <BulletItem><strong>The Law of Legacy:</strong> Paul's focus was on what would happen after he left, not on what he had achieved</BulletItem>
                <BulletItem><strong>The Law of Sacrifice:</strong> His determined march toward Jerusalem, ready to suffer and even die for the mission</BulletItem>
                <BulletItem><strong>The Law of Empowerment:</strong> Giving the Ephesian elders real responsibility for the flock's future</BulletItem>
                <BulletItem><strong>The Law of the Inner Circle:</strong> Spending two years daily with leaders to forge a team capable of sustaining and multiplying the work</BulletItem>
              </BulletList>
            </OrangeSection>

            <SectionHeading>MODERN APPLICATION: THE EPHESIAN BUILD MODEL</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🏗️ Begin with the Foundation</h3>
              <BulletList>
                <BulletItem>Complete what is incomplete by verifying understanding and leading people into the fullness of the gospel and the Spirit's power</BulletItem>
                <BulletItem>Establish systematic teaching that meets daily, not merely weekly, so discipleship becomes a rhythm rather than an event</BulletItem>
                <BulletItem>Create training centers—formal or informal—that develop leaders who can train other leaders</BulletItem>
                <BulletItem>Plan from the start for multiplication so every investment reproduces</BulletItem>
              </BulletList>
            </GreenSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">⚡ Engage the Power Phase</h3>
              <BulletList>
                <BulletItem>Demonstrate authentic spiritual authority that cannot be counterfeited</BulletItem>
                <BulletItem>Confront false spirituality clearly and pastorally</BulletItem>
                <BulletItem>Expect economic opposition as transformed lives disrupt established interests</BulletItem>
                <BulletItem>When confrontation erupts, exercise strategic restraint and let God fight battles through providence, processes, and principled allies</BulletItem>
              </BulletList>
            </PurpleSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">🔄 Lead Through Transition</h3>
              <BulletList>
                <BulletItem>Prepare for your absence by building systems that work without you</BulletItem>
                <BulletItem>Warn emerging leaders about future challenges so they are not surprised by wolves from outside or distortions from within</BulletItem>
                <BulletItem>Transfer real authority with clear responsibility and accountability</BulletItem>
                <BulletItem>Keep character central, trusting that competence grows best in the soil of humility, integrity, and service</BulletItem>
              </BulletList>
            </OrangeSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">📋 Paul's Leadership Development Strategy</h3>
              <p>With the Ephesian elders, Paul demonstrated:</p>
              <BulletList>
                <BulletItem><strong>Form character:</strong> "You know how I lived ... I served the Lord with great humility and with tears" (Acts 20:18–19)</BulletItem>
                <BulletItem><strong>Provide comprehensive training:</strong> "I have not hesitated to preach anything that would be helpful ... publicly and from house to house" (v. 20)</BulletItem>
                <BulletItem><strong>Clarify responsibility:</strong> "Keep watch over yourselves and all the flock ... be shepherds of the church of God" (v. 28)</BulletItem>
                <BulletItem><strong>Set a future focus:</strong> Warning of "savage wolves" and internal threats (vv. 29–31)</BulletItem>
                <BulletItem><strong>Resource them:</strong> "Now I commit you to God and to the word of his grace, which can build you up" (v. 32)</BulletItem>
              </BulletList>
              <p className="mt-4">As Maxwell writes, <span className="text-blue-300 font-semibold">"People don't care how much you know until they know how much you care"</span> (Winning with People, p. 67).</p>
            </BlueSection>

            <RedSection>
              <h3 className="text-xl font-bold mb-4 text-red-200">⚠️ When Ministry Threatens Economic Interests</h3>
              <BulletList>
                <BulletItem>Expect organized resistance</BulletItem>
                <BulletItem>Do not take the bait of public brawls; like Paul, avoid needless theater confrontations</BulletItem>
                <BulletItem>Allow credible voices and lawful systems to speak on behalf of justice</BulletItem>
                <BulletItem>Stay focused on the mission, resist distraction</BulletItem>
                <BulletItem>Trust appropriate legal processes to de-escalate civic unrest</BulletItem>
              </BulletList>
              <p className="mt-4">The same pattern applies when modern ministries face pressure from gambling interests in a community, business pushback against moral stands, political heat over justice issues, or economic threats when transformation impacts local commerce.</p>
            </RedSection>
          </div>
        );
      
      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">CHAPTER 9: TRIALS AND TESTIMONY</h1>
              <p className="text-xl text-purple-200">Acts 22–26 — "If We Endure Like They Did ..."</p>
            </div>

            <SectionHeading>WHAT THEY FACED</SectionHeading>
            <RedSection>
              <p>Paul entered the ultimate leadership test. Over roughly five years of hearings, imprisonments, and legal maneuvers that could have ended his ministry, he turned every courtroom into a pulpit and every chain into a platform for gospel advance. The challenges mounted:</p>
              <BulletList>
                <BulletItem>False accusations charged him as "a troublemaker, stirring up riots among the Jews all over the world" (Acts 24:5)</BulletItem>
                <BulletItem>Political manipulation meant governors cared more about favor than justice</BulletItem>
                <BulletItem>Prolonged imprisonment kept him in Caesarea for two years awaiting resolution (Acts 24:27)</BulletItem>
                <BulletItem>Assassination plots formed, with more than forty men vowing not to eat or drink until they had killed him (Acts 23:12–13)</BulletItem>
                <BulletItem>His future remained uncertain; appealing to Caesar would carry him to Rome—and to possible execution</BulletItem>
              </BulletList>
              <p className="mt-4">Would his faith crack under pressure, or would these trials become his greatest testimony? As Maxwell writes, <span className="text-red-300 font-semibold">"Adversity causes some men to break; others to break records"</span> (Failing Forward, p. 89).</p>
            </RedSection>

            <SectionHeading>WHAT THEY DID: TRANSFORM OBSTACLES INTO OPPORTUNITIES</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 1: THE JERUSALEM DEFENSE (Acts 22:1–29)</h3>
              <p>Dragged from the temple and nearly killed by a mob, Paul was rescued by the Roman commander, Claudius Lysias (Acts 21:30–36). He requested permission to speak and addressed the crowd in Hebrew—their heart language—using his testimony as his framework:</p>
              <BulletList>
                <BulletItem>He established credibility: "I am a Jew, born in Tarsus of Cilicia, but brought up in this city. I studied under Gamaliel and was thoroughly trained in the law of our ancestors" (22:3)</BulletItem>
                <BulletItem>He confessed his persecution of the Way</BulletItem>
                <BulletItem>He recounted his Damascus road encounter with Jesus</BulletItem>
                <BulletItem>He revealed his calling: "Go; I will send you far away to the Gentiles" (22:21)</BulletItem>
              </BulletList>
              <p className="mt-4">The crowd listened until he said this; then they shouted, "Rid the earth of him! He's not fit to live!" (22:22–23). When officials prepared to flog him, he calmly asserted his Roman citizenship: "Is it legal for you to flog a Roman citizen who hasn't even been found guilty?" (22:25). He used a hostile platform to share his story and advanced his mission while securing lawful protection.</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 2: THE SANHEDRIN STRATEGY (Acts 22:30–23:35)</h3>
              <p>Before the Sanhedrin, Paul read the room with precision. "My brothers, I am a Pharisee, descended from Pharisees. I stand on trial because of the hope of the resurrection of the dead" (23:6). Knowing the council was divided—Pharisees affirming resurrection, Sadducees denying it—he shifted the battle line from himself to their theological split. The council erupted, and the commander intervened to prevent violence. That night, the Lord stood near Paul and said, <span className="text-green-300 font-semibold">"Take courage! As you have testified about me in Jerusalem, so you must also testify in Rome"</span> (23:11). When more than forty conspirators vowed to kill him, Paul's nephew uncovered the plot and alerted authorities. Commander Lysias organized an armed escort—two hundred soldiers, seventy horsemen, and two hundred spearmen—to transfer Paul safely to Governor Felix in Caesarea (23:23–35). As Maxwell observes, "God's protection often comes through human preparation" (Leadership Gold, p. 134).</p>
            </GreenSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">PHASE 3: THE FELIX ENCOUNTERS (Acts 24:1–27)</h3>
              <p>In Caesarea, the high priest Ananias arrived with the lawyer Tertullus, who accused Paul of inciting riots and desecrating the temple (24:5–6). Paul's defense was factual, principled, and missional:</p>
              <BulletList>
                <BulletItem>He noted the short timeframe in Jerusalem</BulletItem>
                <BulletItem>He challenged the absence of evidence for any disturbance</BulletItem>
                <BulletItem>He affirmed his faith as worship of the God of their ancestors according to the Law and the Prophets</BulletItem>
                <BulletItem>He stated his mission of bringing gifts to the poor and offerings in Jerusalem (24:11–20)</BulletItem>
              </BulletList>
              <p className="mt-4">Felix, familiar with the Way, delayed judgment, yet allowed Paul some freedoms and frequent visitors. Over two years, Paul repeatedly spoke with Felix and Drusilla about faith in Christ, righteousness, self-control, and the coming judgment; Felix grew afraid and postponed decisions while secretly hoping for a bribe (24:24–27). Paul turned incarceration into an extended evangelistic appointment with the governor.</p>
            </BlueSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">PHASE 4: THE FESTUS APPEAL (Acts 25:1–12)</h3>
              <p>When Festus replaced Felix, Jewish leaders immediately pressed for Paul's transfer to Jerusalem, plotting an ambush. Festus kept the proceedings in Caesarea. Sensing the risk of a Jerusalem hearing and aiming at his Rome assignment, Paul made a decisive move: <span className="text-purple-300 font-semibold">"I am now standing before Caesar's court, where I ought to be tried... I appeal to Caesar!"</span> (25:10–11). Festus conferred and replied, "You have appealed to Caesar. To Caesar you will go!" (25:12). Paul navigated the system to align process with calling. As Maxwell's Law of Navigation puts it, "Anyone can steer the ship, but it takes a leader to chart the course" (The 21 Irrefutable Laws of Leadership, p. 17).</p>
            </PurpleSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">PHASE 5: THE AGRIPPA OPPORTUNITY (Acts 25:13–26:32)</h3>
              <p>King Agrippa and Bernice visited Festus, who explained Paul's case and his Roman appeal, admitting, "I found he had done nothing deserving of death" (25:25). The next day, with great pomp, Agrippa, Bernice, military officers, and city leaders assembled, and Paul was brought in (25:23). Given permission to speak, Paul delivered his masterpiece:</p>
              <BulletList>
                <BulletItem>He began with personal testimony: his life known among the Jews from childhood, his former zeal opposing the name of Jesus of Nazareth (26:4–11)</BulletItem>
                <BulletItem>He detailed the Damascus encounter and the commission of Jesus: "I am sending you to them to open their eyes and turn them from darkness to light, and from the power of Satan to God" (26:17–18)</BulletItem>
                <BulletItem>He described his obedient response: "I was not disobedient to the vision from heaven... I preached that they should repent and turn to God and demonstrate their repentance by their deeds" (26:19–20)</BulletItem>
              </BulletList>
              <p className="mt-4">When Festus interrupted, calling him insane, Paul answered with calm reason, "I am not insane, most excellent Festus. What I am saying is true and reasonable" (26:25). Then he turned to Agrippa with a direct challenge: "King Agrippa, do you believe the prophets? I know you do" (26:27). Agrippa replied, "Do you think that in such a short time you can persuade me to be a Christian?" Paul answered, <span className="text-yellow-300 font-semibold">"Short time or long—I pray to God that not only you but all who are listening to me today may become what I am, except for these chains"</span> (26:28–29). After private consultation, the dignitaries concluded, "This man is not doing anything that deserves death or imprisonment... This man could have been set free if he had not appealed to Caesar" (26:31–32). As Maxwell writes, "Great leaders find a way to make their mess their message" (Sometimes You Win, Sometimes You Learn, p. 67).</p>
            </YellowSection>

            <SectionHeading>WHAT THEY GOT: TRIALS BECAME TESTIMONIES</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🎤 Opposition Multiplied Paul's Platforms</h3>
              <BulletList>
                <BulletItem>A Jerusalem crowd heard his story in Hebrew</BulletItem>
                <BulletItem>A Roman commander encountered a credible account of Christian faith</BulletItem>
                <BulletItem>The Sanhedrin was forced to reckon with the resurrection</BulletItem>
                <BulletItem>Governors Felix and Festus heard a clear, reasoned gospel; Felix heard it for two years in private conversation</BulletItem>
                <BulletItem>King Agrippa and the city's elite listened to a full proclamation of Christ</BulletItem>
                <BulletItem>Even the Roman legal system became a stage to set precedent and secure protection for a growing movement</BulletItem>
              </BulletList>
            </GreenSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">📈 The Gospel Advanced</h3>
              <BulletList>
                <BulletItem>Paul's Gentile mission gained official recognition</BulletItem>
                <BulletItem>Roman intervention shielded him from mob violence</BulletItem>
                <BulletItem>Persecution transformed into opportunity</BulletItem>
                <BulletItem>Witness spread to audiences the early church could not have planned to reach</BulletItem>
              </BulletList>
            </BlueSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">💪 Leadership Grew Under Pressure</h3>
              <p>Paul displayed:</p>
              <BulletList>
                <BulletItem>Courage without compromise</BulletItem>
                <BulletItem>Strategic thinking in the use of rights and process</BulletItem>
                <BulletItem>Skill in recognizing opportunity within hostility</BulletItem>
                <BulletItem>Relentless focus on his Rome calling</BulletItem>
              </BulletList>
            </PurpleSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">⛪ Christianity Demonstrated</h3>
              <BulletList>
                <BulletItem>Legal respectability and civic loyalty while maintaining spiritual integrity</BulletItem>
                <BulletItem>Patient hearing in the empire's courts</BulletItem>
                <BulletItem>It was not mindless fanaticism</BulletItem>
                <BulletItem>Proved compelling even to royalty</BulletItem>
              </BulletList>
            </OrangeSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">🗣️ Paul's Evangelistic Method</h3>
              <BulletList>
                <BulletItem>Personal testimony as persuasive witness</BulletItem>
                <BulletItem>Cultural adaptation in language and tone</BulletItem>
                <BulletItem>A logical case presented alongside divine revelation</BulletItem>
                <BulletItem>A direct call for personal decision</BulletItem>
              </BulletList>
              <p className="mt-4">As Maxwell observes, <span className="text-yellow-300 font-semibold">"Every test is a testimony waiting to happen"</span> (The Difference Maker, p. 89).</p>
            </YellowSection>

            <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
            <BlueSection>
              <BulletList>
                <BulletItem><strong>The Law of the Test:</strong> Trials revealed and developed Paul's character (The 21 Most Powerful Minutes in a Leader's Day, p. 156)</BulletItem>
                <BulletItem><strong>The Law of Solid Ground:</strong> Integrity under interrogation built trust with soldiers, governors, and kings (The 21 Irrefutable Laws of Leadership, ch. 6)</BulletItem>
                <BulletItem><strong>The Law of Sacrifice:</strong> His willingness to surrender freedom for the sake of the mission (ch. 18)</BulletItem>
                <BulletItem><strong>The Law of Legacy:</strong> His courtroom testimonies inspired generations of leaders to turn adversity into advance (ch. 21)</BulletItem>
              </BulletList>
            </BlueSection>

            <SectionHeading>MODERN APPLICATION: THE TRIAL-TO-TESTIMONY MODEL</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🔄 Transform Opposition into Opportunity</h3>
              <p><strong>Stay calm under pressure:</strong></p>
              <BulletList>
                <BulletItem>Refuse emotional reactions</BulletItem>
                <BulletItem>Treat criticism and crisis as God-given stages to witness</BulletItem>
                <BulletItem>Speak the audience's language—relationally, culturally, and clearly</BulletItem>
                <BulletItem>Establish credibility before presenting controversial truth</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Present your case strategically:</strong></p>
              <BulletList>
                <BulletItem>Stick to facts, invite evidence, and tell your story</BulletItem>
                <BulletItem>Find common ground where you can—shared values, shared authorities</BulletItem>
                <BulletItem>Call for a decision rather than settling for discussion</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Use legal and social systems wisely:</strong></p>
              <BulletList>
                <BulletItem>Know your rights and exercise them ethically</BulletItem>
                <BulletItem>Work within established channels</BulletItem>
                <BulletItem>Cultivate principled allies</BulletItem>
                <BulletItem>Make long-term moves that align with the mission; Paul's appeal to Caesar served his Rome objective</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Maintain mission focus:</strong></p>
              <BulletList>
                <BulletItem>See the bigger picture in hardship</BulletItem>
                <BulletItem>Accept God's timing</BulletItem>
                <BulletItem>Stay aligned with your ultimate assignment—your "Rome"</BulletItem>
                <BulletItem>Trust the Lord's word, "You must also testify in Rome"</BulletItem>
              </BulletList>
            </GreenSection>

            <RedSection>
              <h3 className="text-xl font-bold mb-4 text-red-200">⚠️ When Falsely Accused</h3>
              <p>Expect:</p>
              <BulletList>
                <BulletItem>Character attacks</BulletItem>
                <BulletItem>Mission distortion</BulletItem>
                <BulletItem>Political manipulation</BulletItem>
                <BulletItem>Legal challenges</BulletItem>
              </BulletList>
              <p className="mt-4">Respond by:</p>
              <BulletList>
                <BulletItem>Documenting your work carefully</BulletItem>
                <BulletItem>Responding strategically on selected platforms</BulletItem>
                <BulletItem>Using every defense moment to point to Christ</BulletItem>
                <BulletItem>Trusting the process without idolizing it</BulletItem>
                <BulletItem>Letting your integrity, patience, and clarity show</BulletItem>
                <BulletItem>Keeping the mission central so opposition does not define your agenda</BulletItem>
              </BulletList>
              <p className="mt-4">Remember, <span className="text-red-300 font-semibold">"Your reputation is what people think you are; your character is what you really are"</span> (The 21 Indispensable Qualities of a Leader, p. 28).</p>
            </RedSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">🎯 Maximize Your Platforms for Witness</h3>
              <p>As Paul did:</p>
              <BulletList>
                <BulletItem>Hostile crowds can become listening audiences when you answer wisely</BulletItem>
                <BulletItem>Legal proceedings can reveal Christian character and truth under scrutiny</BulletItem>
                <BulletItem>Private meetings with influential people can open surprising doors for the gospel</BulletItem>
                <BulletItem>High-profile settings can multiply impact when humility and courage are held together</BulletItem>
              </BulletList>
            </OrangeSection>
          </div>
        );
      
      case 10:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">CHAPTER 10: ROME AND BEYOND</h1>
              <p className="text-xl text-purple-200">Acts 27–28 — "If We Finish Like They Did ..."</p>
            </div>

            <SectionHeading>WHAT THEY FACED</SectionHeading>
            <BlueSection>
              <p>Paul's journey to Rome tested everything he had learned about leadership. A deadly storm, a shipwreck, a venomous snakebite, and two years of house arrest stood between him and his ultimate destination. Yet these obstacles carried him to the very heart of the empire where his mission would be completed:</p>
              <BulletList>
                <BulletItem>A life-threatening voyage where the ship "was caught by the storm and could not head into the wind" (Acts 27:15)</BulletItem>
                <BulletItem>Leadership responsibility in crisis with 276 people depending on his guidance</BulletItem>
                <BulletItem>The supernatural through divine interventions, miraculous healings, and protection in danger</BulletItem>
                <BulletItem>Restricted ministry under guard that limited, but did not stop, his influence</BulletItem>
              </BulletList>
              <p className="mt-4">The question was simple: Would he finish strong, or would the final obstacles defeat him just short of his goal? As Maxwell writes, <span className="text-blue-300 font-semibold">"How you finish is more important than how you start"</span> (Leadership Gold, p. 278).</p>
            </BlueSection>

            <SectionHeading>WHAT THEY DID: TURN EVERY SETBACK INTO A SETUP</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 1: LEADERSHIP DURING CRISIS (Acts 27:1–44)</h3>
              <p>Against Paul's counsel, the centurion chose to sail during dangerous weather. Paul warned plainly, "I can see that our voyage is going to be disastrous and bring great loss to ship and cargo, and to our own lives also" (27:9–10). A hurricane-force Northeaster seized the ship; for fourteen days they saw neither sun nor stars, and "all hope of being saved was given up" (27:14–20). Then Paul stood and led. He acknowledged the ignored warning, offered God-grounded hope, and relayed a promise: <span className="text-green-300 font-semibold">"Last night an angel of the God to whom I belong and whom I serve stood beside me and said, 'Do not be afraid, Paul. You must stand trial before Caesar; and God has graciously given you the lives of all who sail with you.' So keep up your courage... it will happen just as he told me"</span> (27:23–25). He coupled faith with practical leadership—preventing sailors from deserting, urging everyone to eat, giving thanks to God publicly, and restoring confidence. The ship broke apart, but "everyone reached land safely" (27:44), exactly as God had said. As Maxwell's Law of Navigation reminds us, "Anyone can steer the ship, but it takes a leader to chart the course" (The 21 Irrefutable Laws of Leadership, p. 17).</p>
            </GreenSection>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">PHASE 2: SUPERNATURAL ENCOUNTERS (Acts 28:1–10)</h3>
              <p>Washed ashore on Malta, they received "unusual kindness" from the islanders. While serving—gathering brushwood for the fire—a viper fastened on Paul's hand. The islanders expected him to die, but he shook it into the fire and suffered no ill effects (28:3–6). Doors opened for ministry as Paul healed Publius's father and then many others on the island. Honor replaced suspicion; the islanders supplied all that was needed for the journey (28:9–10). Paul's servant posture and God's supernatural power established credibility and created opportunity. As Maxwell notes, <span className="text-green-300 font-semibold">"People don't care how much you know until they know how much you care"</span> (Winning with People, p. 67).</p>
            </GreenSection>

            <BlueSection>
              <h3 className="text-xl font-bold mb-4 text-blue-200">PHASE 3: THE ROME ARRIVAL (Acts 28:11–16)</h3>
              <p>After three months, they sailed on toward Rome. Believers traveled out to meet Paul at the Forum of Appius and Three Taverns; "at the sight of these people Paul thanked God and was encouraged" (28:15). In Rome, he lived under house arrest, guarded by a soldier, but with room to receive visitors (28:16). Reputation and relationships paved the way for influence despite chains.</p>
            </BlueSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">PHASE 4: THE JEWISH OUTREACH (Acts 28:17–29)</h3>
              <p>Three days in, Paul summoned the local Jewish leaders, affirmed his loyalty to Israel's hope, and explained his chains: <span className="text-purple-300 font-semibold">"It is because of the hope of Israel that I am bound with this chain"</span> (28:20). They had heard no formal accusations from Judea but wanted to hear his views, acknowledging controversy surrounding "this sect." Paul arranged a large meeting and, from morning till evening, explained the kingdom of God and tried to persuade them about Jesus from the Law and the Prophets (28:23). Responses were mixed; some believed, others would not. Citing Isaiah 6, Paul concluded, "God's salvation has been sent to the Gentiles, and they will listen!" (28:28).</p>
            </PurpleSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">PHASE 5: THE ROMAN MINISTRY (Acts 28:30–31)</h3>
              <p>For two full years, Paul welcomed all who came to him and <span className="text-yellow-300 font-semibold">"proclaimed the kingdom of God and taught about the Lord Jesus Christ—with all boldness and without hindrance!"</span> He was restricted, but the gospel was not. As Maxwell writes, "Leadership is not about the position you hold but the influence you have" (The 360 Degree Leader, p. 89).</p>
            </YellowSection>

            <SectionHeading>WHAT THEY GOT: FINISHING STRONG IN THE HEART OF THE EMPIRE</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🏛️ Mission Accomplished</h3>
              <BulletList>
                <BulletItem>Paul reached Rome, the center of the known world, fulfilling a long-held calling</BulletItem>
                <BulletItem>Secured a strategic base for global expansion</BulletItem>
                <BulletItem>His influence under house arrest was paradoxically enlarged</BulletItem>
                <BulletItem>Officials and ordinary people alike heard the message</BulletItem>
                <BulletItem>The Gentile mission advanced as Jewish rejection continued and Gentile responsiveness grew</BulletItem>
              </BulletList>
            </GreenSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">💪 Leadership Legacy</h3>
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

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">🏠 Methodological Innovations</h3>
              <p><strong>House-church strategy flourished:</strong></p>
              <BulletList>
                <BulletItem>Intimate settings enabled deep conversation</BulletItem>
                <BulletItem>Ongoing access and natural relational networks that multiplied the message</BulletItem>
                <BulletItem>Two years of open-door teaching allowed Paul to address complex theological questions without time pressure</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Prison-ministry model emerged:</strong></p>
              <BulletList>
                <BulletItem>A captive audience of guards and officials heard the gospel</BulletItem>
                <BulletItem>Daily conduct validated the message</BulletItem>
                <BulletItem>Suffering authenticated the witness</BulletItem>
                <BulletItem>Divine interventions underscored God's power</BulletItem>
              </BulletList>
              <p className="mt-4">As Maxwell observes, <span className="text-orange-300 font-semibold">"Successful leaders see opportunity in every obstacle"</span> (The 15 Invaluable Laws of Growth, p. 134).</p>
            </OrangeSection>

            <SectionHeading>MAXWELL'S LEADERSHIP LAWS IN ACTION</SectionHeading>
            <BlueSection>
              <BulletList>
                <BulletItem><strong>The Law of Legacy:</strong> Paul's final years established a ministry that outlasted his life (The 21 Irrefutable Laws of Leadership, ch. 21)</BulletItem>
                <BulletItem><strong>The Law of Victory:</strong> He found ways to win under house arrest</BulletItem>
                <BulletItem><strong>The Law of Sacrifice:</strong> His willingness to lay down personal freedom to complete his mission (ch. 18)</BulletItem>
                <BulletItem><strong>The Law of the Test:</strong> Every storm, snake, and cell refined his character (The 21 Most Powerful Minutes in a Leader's Day, p. 156)</BulletItem>
              </BulletList>
            </BlueSection>

            <SectionHeading>MODERN APPLICATION: THE FINISHING STRONG PRINCIPLES</SectionHeading>

            <GreenSection>
              <h3 className="text-xl font-bold mb-4 text-green-200">🌊 Lead Through Storms</h3>
              <BulletList>
                <BulletItem>Name realities honestly</BulletItem>
                <BulletItem>Offer God-centered hope</BulletItem>
                <BulletItem>Prevent panic</BulletItem>
                <BulletItem>Meet basic needs</BulletItem>
                <BulletItem>Lead by example</BulletItem>
                <BulletItem>Refuse to abandon people when pressure mounts</BulletItem>
              </BulletList>
            </GreenSection>

            <PurpleSection>
              <h3 className="text-xl font-bold mb-4 text-purple-200">🎯 Keep Mission Focus</h3>
              <p>When everything tries to detour you:</p>
              <BulletList>
                <BulletItem>Remember your calling</BulletItem>
                <BulletItem>Trust divine timing</BulletItem>
                <BulletItem>Use crises as testimonies</BulletItem>
                <BulletItem>Expect God to keep His word</BulletItem>
              </BulletList>
            </PurpleSection>

            <OrangeSection>
              <h3 className="text-xl font-bold mb-4 text-orange-200">🔓 Turn Restrictions into Opportunities</h3>
              <BulletList>
                <BulletItem>Embrace forced focus</BulletItem>
                <BulletItem>Leverage intimate ministry</BulletItem>
                <BulletItem>Invest in sustained impact</BulletItem>
                <BulletItem>Build strategic networks as people come and go</BulletItem>
              </BulletList>
            </OrangeSection>

            <YellowSection>
              <h3 className="text-xl font-bold mb-4 text-yellow-200">⚡ Cultivate the Supernatural Dimension</h3>
              <BulletList>
                <BulletItem>Prayer, fasting, and spiritual discernment</BulletItem>
                <BulletItem>Follow God's guidance into calculated risks</BulletItem>
                <BulletItem>Pray for others as a public witness to God's power</BulletItem>
              </BulletList>
              <p className="mt-4">As Maxwell writes, <span className="text-yellow-300 font-semibold">"Spiritual leadership requires both natural ability and supernatural empowerment"</span> (Spiritual Leadership, p. 89).</p>
            </YellowSection>

            <SectionHeading>YOUR WEEK 11 CHALLENGE</SectionHeading>
            <RedSection>
              <BulletList>
                <BulletItem><strong>Monday:</strong> Assess the storms you face and plan how to provide hope and practical direction</BulletItem>
                <BulletItem><strong>Tuesday:</strong> Review your mission focus—are you still headed toward your original calling?</BulletItem>
                <BulletItem><strong>Wednesday:</strong> List current limitations and design ways to turn each constraint into an opportunity</BulletItem>
                <BulletItem><strong>Thursday:</strong> Strengthen supernatural dependence by scheduling regular times to seek God's direction</BulletItem>
                <BulletItem><strong>Friday:</strong> Plan your legacy—what would continue if your active ministry ended today?</BulletItem>
                <BulletItem><strong>Saturday:</strong> Evaluate your network and identify key relationships that could multiply your impact</BulletItem>
                <BulletItem><strong>Sunday:</strong> Make a finishing-strong commitment; teach about completing God's calling</BulletItem>
              </BulletList>
              <p className="mt-4"><strong>Week 11 Goal:</strong> Establish at least one system or relationship that will extend your ministry impact beyond your current limitations.</p>
            </RedSection>

            <SectionHeading>REFLECTION QUESTIONS</SectionHeading>
            <PurpleSection>
              <BulletList>
                <BulletItem>How do you respond when hope is gone—do you navigate or drift?</BulletItem>
                <BulletItem>What obstacles are threatening to derail your calling, and how will you persist?</BulletItem>
                <BulletItem>Are you treating limitations as barriers or as setups for new opportunities?</BulletItem>
                <BulletItem>Where are you relying more on human planning than on divine guidance?</BulletItem>
                <BulletItem>If your active ministry ended unexpectedly, what would continue—and what needs to be built so it can?</BulletItem>
              </BulletList>
              <p className="mt-4">The Acts 27–28 formula is clear: <span className="text-purple-300 font-semibold">crisis leadership + mission persistence + supernatural dependence + strategic networking = finishing strong.</span> Maxwell reminds us, "The secret to success is not starting strong but finishing strong" (Leadership Gold, p. 289). Paul's final chapters show that great leaders don't just begin well—they complete their mission despite obstacles, restrictions, and setbacks.</p>
            </PurpleSection>

            <SectionHeading>KEY TAKEAWAYS</SectionHeading>
            <GreenSection>
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
            <OrangeSection>
              <BulletList>
                <BulletItem>Clarify your "Rome" and align daily work to your ultimate purpose</BulletItem>
                <BulletItem>Prepare for crises so people look to you for hope and wise decisions</BulletItem>
                <BulletItem>Maintain a living connection to God's guidance and power</BulletItem>
                <BulletItem>Build relationships and partnerships that multiply your influence and continue your work</BulletItem>
                <BulletItem>Maximize opportunities within limits so effectiveness endures despite barriers</BulletItem>
                <BulletItem>Create systems and train successors so the mission outlasts you</BulletItem>
                <BulletItem>Guard your integrity under accusation and pressure so trials strengthen, not sour, your soul</BulletItem>
              </BulletList>
              <p className="mt-4">As Maxwell challenges, <span className="text-orange-300 font-semibold">"The test of a leader is not how well he or she functions in times of comfort and convenience, but how they lead under fire"</span> (The 21 Indispensable Qualities of a Leader, p. 67).</p>
            </OrangeSection>
          </div>
        );
      
      default:
        return <div>Select a chapter to begin reading</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Button onClick={() => setLocation("/textbook-catalog")} variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to catalog
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <img 
                src="/src/assets/sfgm-shield.png" 
                alt="SFGM Logo" 
                className="h-8 w-8"
              />
              <h1 className="text-xl font-bold text-white">Acts in Action</h1>
              <Button onClick={downloadPDF} variant="ghost" className="text-white hover:bg-white/10">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Audio Player Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl mb-8">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/acts-in-action-cover.png"
                alt="Acts in Action Cover"
                className="w-24 h-auto rounded shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-1">
                  <span className="text-3xl align-text-top mr-1">🎶</span>
                  <span className="align-middle">Acts in Action</span>
                </h3>
                <p className="text-white/90 text-xl font-semibold">
                  <span className="align-middle">{currentChapterData.title}</span>
                  <span className="text-2xl align-text-top ml-1">🎬</span>
                </p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Button onClick={() => handleSkip(-15)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <SkipBack className="h-5 w-5" />
                  <span className="ml-1 text-xs">15</span>
                </Button>
                <Button onClick={handlePlayPause} size="lg" className="bg-white text-blue-600 hover:bg-white/90 rounded-full h-14 w-14">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button>
                <Button onClick={() => handleSkip(15)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <span className="mr-1 text-xs">15</span>
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-2">
                <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={([v]) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = v;
                    setCurrentTime(v);
                  }
                }} className="cursor-pointer" />
                <div className="flex justify-between text-white/90 text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Volume2 className="h-4 w-4 text-white" />
                <Slider value={[volume]} max={1} step={0.1} onValueChange={([v]) => setVolume(v)} className="w-24" />
              </div>

              {/* Chapter Navigation Dropdown */}
              <div className="flex justify-center mt-6">
                <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
                  <SelectTrigger className="w-80 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select a chapter" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {chapters.map((chapter) => (
                      <SelectItem 
                        key={chapter.id} 
                        value={chapter.id.toString()}
                        className="text-white hover:bg-gray-700"
                      >
                        {chapter.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <audio
                ref={audioRef}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl">
          <CardContent className="p-8 prose prose-invert max-w-none">
            <div className="text-white leading-relaxed">
              {getChapterContent(currentChapter)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

