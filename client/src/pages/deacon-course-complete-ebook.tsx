import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";

export default function DeaconCourseCompleteEbook() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    { id: 1, title: "Introduction & Chapter 1: The Unignorable Nudge", audioUrl: "/deacon-course-ch1.mp3" },
    { id: 2, title: "Chapter 2: Laying the Foundation", audioUrl: "/deacon-course-ch2.mp3" },
    { id: 3, title: "Chapter 3: The Servant in Motion", audioUrl: "/deacon-course-ch3.mp3" },
    { id: 4, title: "Chapter 4: The Spiritual Battlefield", audioUrl: "/deacon-course-ch4.mp3" },
    { id: 5, title: "Chapter 5: Commissioned for Impact", audioUrl: "/deacon-course-ch5.mp3" }
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
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                🔥✨ DEACONSHIP COURSE: ANSWERING THE CALL ✨🔥
              </h1>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4">INTRODUCTION</h2>
            <p className="text-lg italic text-center text-purple-800 mb-6">To the faithful and the called</p>

            <p className="mb-6 text-lg font-semibold">Before we begin,</p>

            <h3 className="text-xl font-bold text-purple-900 mb-4">WHAT IS A DEACON? Unveiling the Heart of the Calling ❤️‍🔥</h3>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h4 className="text-lg font-bold text-purple-900 mb-3">1. The Greek Definition: More Than a Helper</h4>
              <p className="mb-3">The English word "Deacon" comes directly from the Greek word:</p>
              <p className="text-2xl font-bold text-purple-900 text-center mb-3">Διάκονος (pronounced: dee-ah-kon-os)</p>
              <p className="mb-3">While this word is often translated simply as "servant" or "minister," its root meaning is far more powerful and specific.</p>
              <p className="mb-3">It doesn't just refer to a general helper (that would be the Greek word <em>doulos</em>). Instead, <strong>Διάκονος</strong> implies:</p>
              <ul className="list-disc list-inside space-y-1 mb-3">
                <li>A trusted attendant</li>
                <li>A designated messenger</li>
                <li>One who executes the commands of another</li>
              </ul>
              <p>In ancient times, a diakonos was not a lowly slave but a respected intermediary who acted with the authority of the person they served. They were a conduit of will and provision.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h4 className="text-lg font-bold text-blue-900 mb-3">2. The Spiritual Definition: Identity in Action</h4>
              <p className="mb-3">Spiritually, this transforms the role from a task into a sacred trust.</p>
              <p className="font-bold text-blue-900 mb-2">A Deacon is:</p>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-blue-900">Heaven's Distributor:</p>
                  <p className="text-blue-800">They are entrusted to distribute God's grace, mercy, and practical provision to the body of Christ. They are the hands that deliver God's goodness.</p>
                </div>

                <div>
                  <p className="font-semibold text-blue-900">A Representative of Christ's Heart:</p>
                  <p className="text-blue-800">Jesus defined His own mission through this word: <em>"For even the Son of Man did not come to be served, but to serve [diakonēsai]"</em> (Mark 10:45). When you serve as a deacon, you are quite literally enacting the ministry of Jesus on earth.</p>
                </div>

                <div>
                  <p className="font-semibold text-blue-900">A Catalyst for Unity:</p>
                  <p className="text-blue-800">When the first deacons were appointed in Acts 6, their service (diakonia) solved a crisis of neglect and allowed the Word of God to spread "and the number of disciples multiplied greatly" (Acts 6:7). Their practical service unlocked spiritual multiplication.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-bold text-green-900 mb-3">3. The Concise Definition:</h4>
              <p className="text-green-900">A Deacon is a <strong>Spirit-appointed, servant-hearted leader 🤲 who is trusted with executing the practical ministry of the church</strong>, acting as a conduit of God's love and provision to His people, thereby freeing the church to worship in unity and advancing the Gospel through tangible acts of service.</p>
              <p className="text-center font-bold text-xl text-green-900 mt-4">In a nutshell: Your service is your ministry. Your ministry is your message. ✨</p>
            </div>

            <p className="mb-6">This is the weight and the wonder of the calling. It is a high and holy charge. Now, with this understanding cemented in our hearts, we are ready to explore what this looks like in practice.</p>

            <p className="mb-4">This course wasn't written from a place of theory—it was written from the fire of experience. 🙌 I've walked the path you're now considering, and it's my passion to help you walk it boldly and effectively.</p>

            <p className="mb-4">Birthed out of the vision of <strong>SFGM Boston | The House of Restoration Ministries (HRM)</strong>, this journey is built on three pillars:</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <ul className="list-none space-y-2">
                <li className="text-yellow-900">✅ <strong>Service</strong></li>
                <li className="text-yellow-900">✅ <strong>Spirit-led power</strong></li>
                <li className="text-yellow-900">✅ <strong>Tangible grace</strong></li>
              </ul>
            </div>

            <p className="mb-4">This isn't about joining a committee. This is a sacred summons to step into a higher level of commitment within the body of Christ. It's about your character being refined in the fires of obedience 🔥 long before any title is ever placed on you.</p>

            <p className="mb-4">I've been through the battles—the spiritual attacks, the setbacks, the breakthroughs. And I've learned this: God's call is irrevocable, and His grace is more than enough for every step—and every stumble.</p>

            <p className="mb-6">My prayer is that this course doesn't just inform you—it activates you. May it stir up the gift inside you 🕊️, equip you for real ministry, and remind you that you're not alone. We're in this together.</p>

            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-lg text-center mb-8">
              <p className="text-xl font-bold text-red-900 mb-2">This is more than a manual.</p>
              <p className="text-2xl font-bold text-orange-900">This is your call to arms. ⚔️</p>
              <p className="text-lg text-orange-800 mt-3">Let's begin in Jesus' name.</p>
            </div>

            <hr className="my-8 border-purple-300" />

            <h1 className="text-3xl font-bold text-purple-900 mb-4">CHAPTER 1: THE UNIGNORABLE NUDGE</h1>
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">Is This Your Call to Serve?</h2>

            <p className="text-lg leading-relaxed mb-6">
              Life is loud. Between work, family, social demands, and the endless scroll through your phone, it's easy to miss it—that quiet, persistent whisper of the Holy Spirit.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-900 font-medium">This isn't a voice of guilt.</p>
              <p className="text-blue-900 font-medium">It's not a voice of religious pressure. It's an invitation.</p>
            </div>

            <p className="mb-4">Maybe you feel it during worship—when the presence of God is thick and your spirit feels awake.</p>
            <p className="mb-4">Maybe it hits when you see a practical need at church and something in you says, "I should do something about that."</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-yellow-900 font-bold">That nudge? It matters.</p>
              <p className="text-yellow-800">It might be the first sign of a divine assignment.</p>
            </div>

            <p className="mb-4">This chapter is all about tuning out the noise so you can clearly hear that whisper—and having the boldness to ask:</p>
            <p className="text-center text-xl font-bold text-purple-900 mb-6">"Holy Spirit… is this You?" 🙏</p>

            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg mb-6">
              <p className="text-center text-lg font-semibold text-purple-900 mb-2">At SFGM Boston (HRM), we live by a powerful truth:</p>
              <p className="text-center text-2xl font-bold text-purple-900">✨ True ministry begins LONG before a title does. ✨</p>
              <p className="text-center text-lg font-medium text-purple-800 mt-2">It starts with a heart that says "YES" and hands that are ready to work.</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">THE BLUEPRINT: WHAT IS A DEACON? 🧩</h2>

            <p className="mb-4">This isn't some man-made role. It's a Spirit-orchestrated assignment designed to bring order, power, and grace to the local church.</p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
              <p className="text-purple-900">The first deacons were appointed in Acts 6—"full of the Holy Spirit and wisdom"—to handle practical needs so the apostles could focus on prayer and preaching the Word. Their anointed service brought UNITY and caused the Word of God to multiply.</p>
            </div>

            <p className="font-semibold text-lg mb-4">A deacon is, at its core, a Spirit-empowered servant. That means:</p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <h3 className="text-green-900 font-bold mb-2">🔹 PRACTICAL ANOINTING:</h3>
              <p className="text-green-800">You're the hands and feet of the church—doing good works that bring God glory. It's faith in action.</p>
              <p className="text-green-900 italic mt-2">"I will show you my faith by my good deeds." (James 2:18 NLT)</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h3 className="text-blue-900 font-bold mb-2">🔹 A BRIDGE OF COMPASSION:</h3>
              <p className="text-blue-800">You connect truth with need. You're love in motion—not just in words, but in action.</p>
              <p className="text-blue-900 italic mt-2">"Let us not love with words or speech, but with actions and in truth." (1 John 3:18 NLT)</p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h3 className="text-red-900 font-bold mb-2">🔹 A STANDARD OF HOLINESS:</h3>
              <p className="text-red-800 mb-2">The bar is high. Deacons must be:</p>
              <p className="text-red-800">worthy of respect • sincere • not heavy drinkers • not greedy • holding to the faith with a clear conscience</p>
              <p className="text-red-900 italic mt-2">(See 1 Timothy 3:8–9 NLT)</p>
            </div>

            <p className="text-center font-bold text-lg text-purple-900 mb-8">This calling is about radical obedience—not personal elevation.</p>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">DISCERNING THE CALL: IS THIS THE SPIRIT? 🧭</h2>

            <p className="mb-4">How do you know if this pull is from God? The Holy Spirit gives WITNESSES. Here's what to look for:</p>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-4 mb-4">
              <h3 className="text-pink-900 font-bold mb-2">❤️ AN INCLINED HEART:</h3>
              <p className="text-pink-800">Do you feel a deep desire to meet the needs of others? That's often your first clue.</p>
              <p className="text-pink-900 italic mt-2">"God has given each of you a gift. Use it well to serve one another." (1 Peter 4:10 NLT)</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <h3 className="text-green-900 font-bold mb-2">☮️ THE WITNESS OF PEACE:</h3>
              <p className="text-green-800">As you pray about this, does God's peace—which "exceeds anything we can understand" (Philippians 4:7 NLT)—guard your heart?</p>
              <p className="text-green-900 font-bold mt-2">Fear and confusion are from the enemy. Peace is from God.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 className="text-blue-900 font-bold mb-2">👥 GODLY CONFIRMATION:</h3>
              <p className="text-blue-800">This is non-negotiable. You MUST talk to your spiritual leaders.</p>
              <p className="text-blue-900 italic mt-2">"Without wise leadership, a nation falls; but with many counselors, there is safety." (Proverbs 11:14 NLT)</p>
              <p className="text-blue-900 font-bold mt-2">Submitting to leadership isn't a suggestion—it's protection.</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">TAKING THE FIRST STEP 🚶‍♂️</h2>

            <p className="mb-4">You don't need full clarity to take the first step. You just need to respond to what God is showing you now.</p>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
              <p className="text-lg mb-4">Approach your pastor or a leader and say something like:</p>
              <p className="text-xl font-semibold text-indigo-900 italic">"I've been praying, and I feel the Holy Spirit might be calling me to serve more deeply. Can we talk and pray about this together?" 🙏</p>
              <p className="text-lg mt-4">That's it. That simple act of humility and faith opens the door for God to bring greater clarity—and for your leaders to stand with you.</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">A TESTIMONY OF GRACE & CALLING</h2>

            <p className="mb-4">Let me keep it real with you.</p>

            <p className="mb-4">Long before I was a pastor, I felt that Holy Spirit nudge. I didn't wait for a title—I just started SERVING. Setting up chairs, helping families, doing whatever was needed. I learned that the anointing to serve is a real and powerful gift.</p>

            <p className="mb-4">But my journey wasn't all smooth. I hit a rough season. Took a wrong turn. Stepped away from church. For a while, I thought I'd lost my chance—and my calling.</p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <p className="text-orange-900 font-bold text-lg">But even in that wilderness, I found out something undeniable:</p>
              <p className="text-orange-900 italic text-xl mt-2">God's gifts and His call can never be withdrawn. (Romans 11:29 NLT)</p>
            </div>

            <p className="mb-4">Even when I wasn't in church, I was still helping people. Still praying for people. I was a deacon in the desert—and God never let go of me.</p>

            <p className="mb-4">My comeback wasn't based on my performance—but on God's mercy and faithfulness. When I returned, I got back into serving. I was ordained as a deacon. Then God promoted me to elder. And eventually, to pastor.</p>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg mb-6">
              <p className="text-xl font-bold text-purple-900 text-center mb-2">Your past doesn't disqualify you—it equips you.</p>
              <p className="text-xl font-bold text-purple-900 text-center">God doesn't call the qualified. He qualifies the called.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-blue-900 italic text-lg">"For I know the plans I have for you," says the Lord. "They are plans for good and not for disaster, to give you a future and a hope." (Jeremiah 29:11 NLT)</p>
              <p className="text-blue-900 font-semibold mt-2">That future includes your service.</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg text-center">
              <p className="text-xl font-bold text-orange-900 mb-2">If you feel that nudge—don't ignore it.</p>
              <p className="text-lg text-orange-800 mb-2">Bring it to God.</p>
              <p className="text-lg text-orange-800 mb-4">Then bring it to your leaders.</p>
              <p className="text-xl font-bold text-orange-900 mb-2">Let's seek God together.</p>
              <p className="text-xl font-bold text-purple-900 mb-4">This could be your next powerful chapter. 📖</p>
              <p className="text-2xl font-bold text-purple-900">Your assignment is waiting.</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-purple-900 mb-4">CHAPTER 2: LAYING THE FOUNDATION</h1>
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">Building a Life That Can Hold the Weight of Your Calling</h2>

            <p className="text-lg leading-relaxed mb-4">You said "yes" to the nudge. You acknowledged the whisper of the Holy Spirit. That's powerful. But what happens next? How do you move from a stirring in your spirit to a life fully prepared to walk in the authority, responsibility, and anointing of a deacon?</p>
            
            <p className="mb-4">This chapter is where we get real about preparation.</p>

            <p className="mb-4">This isn't just about completing a checklist or jumping through religious hoops. This is about building a spiritual, moral, and practical foundation so strong that when God promotes you, you won't crack under the pressure. You won't just hold the title—you'll embody the calling.</p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
              <p className="text-purple-900 font-semibold">We believe the preparation process is holy. It's not a barrier; it's a divine safeguard. It's where God transforms your potential into His proven vessel.</p>
            </div>

            <p className="text-xl font-bold text-purple-900 mb-6">Let's build.</p>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">PART 1: THE NON-NEGOTIABLES – GOD'S BLUEPRINT FOR SERVANT-LEADERS</h2>

            <p className="mb-4">Before you look at applications, timelines, or ministry descriptions, you must first look into the mirror of Scripture. God's standards are not up for debate. They're the framework for faithfulness.</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="text-blue-900 font-bold text-lg mb-3">1 Timothy 3:8-13 (NLT)</h3>
              <p className="text-blue-900 italic leading-relaxed">"In the same way, deacons must be well respected and have integrity. They must not be heavy drinkers or dishonest with money. They must be committed to the mystery of the faith now revealed and must live with a clear conscience. Before they are appointed as deacons, let them be closely examined. If they pass the test, then let them serve as deacons. In the same way, their wives must be respected and must not slander others. They must exercise self-control and be faithful in everything they do. A deacon must be faithful to his wife, and he must manage his children and household well. Those who do well as deacons will be rewarded with respect from others and will have increased confidence in their faith in Christ Jesus."</p>
            </div>

            <p className="font-semibold text-lg mb-6">Let's break down 1 Timothy 3:8-13 (NLT) – the deacon and his wife. Point by point. Scripture by scripture.</p>

            <div className="space-y-6">
              {/* Point 1 */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="text-lg font-bold text-green-900 mb-2">1. MUST BE RESPECTED</h3>
                <p className="text-green-900 italic mb-2">"They must be respected" (1 Timothy 3:8 NLT)</p>
                <p className="text-green-800 mb-2">This isn't about being popular. It's about earning trust through consistency.</p>
                <ul className="list-disc list-inside text-green-800 space-y-1">
                  <li>Do you keep your word?</li>
                  <li>Are you punctual?</li>
                  <li>Do people confidently rely on you?</li>
                  <li>Is your character solid in public and private?</li>
                </ul>
                <p className="text-green-900 font-semibold mt-2">Respect isn't demanded. It's cultivated through integrity.</p>
              </div>

              {/* Point 2 */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-blue-900 mb-2">2. MUST HAVE INTEGRITY</h3>
                <p className="text-blue-900 italic mb-2">"Sincere" (1 Timothy 3:8 NLT)</p>
                <p className="text-blue-800 mb-2">Integrity means you're the same person in the dark as you are in the light.</p>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  <li>No hidden lives.</li>
                  <li>No double-mindedness.</li>
                  <li>What you preach on Sunday is what you live on Monday.</li>
                </ul>
                <p className="text-blue-900 font-semibold mt-2">People follow leaders they trust. Trust is built on raw, unwavering authenticity.</p>
              </div>

              {/* Point 3 */}
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border-l-4 border-red-500">
                <h3 className="text-lg font-bold text-red-900 mb-2">3. CAN'T BE A HEAVY DRINKER</h3>
                <p className="text-red-900 italic mb-2">"Not a heavy drinker" (1 Timothy 3:8 NLT)</p>
                <p className="text-red-800 mb-2">This isn't about legalism—it's about clarity and self-control.</p>
                <p className="text-red-800 mb-2">Anything that clouds your judgment, alters your behavior, or damages your witness has no place in your life.</p>
                <ul className="list-disc list-inside text-red-800 space-y-1">
                  <li>Drinking</li>
                  <li>Drugs</li>
                  <li>Gambling</li>
                </ul>
                <p className="text-red-900 font-semibold mt-2">You must be Spirit-controlled, not substance-influenced. Your mind must be sharp, your spirit alert. ⚡</p>
              </div>

              {/* Point 4 */}
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">4. CAN'T BE DISHONEST WITH MONEY</h3>
                <p className="text-yellow-900 italic mb-2">"Not pursuing dishonest gain" (1 Timothy 3:8 NLT)</p>
                <p className="text-yellow-800 mb-2">You can't serve God and money.</p>
                <ul className="list-disc list-inside text-yellow-800 space-y-1">
                  <li>No shady side deals.</li>
                  <li>No exploiting your role for personal benefit.</li>
                  <li>You handle church funds, offerings, and resources with terrifying honesty.</li>
                </ul>
                <p className="text-yellow-900 font-bold mt-2">Money tests the heart. Pass the test.</p>
              </div>

              {/* Point 5 */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-purple-900 mb-2">5. MUST BE COMMITTED TO THE FAITH</h3>
                <p className="text-purple-900 italic mb-2">"Cling to the mystery of the faith..." (1 Timothy 3:9 NLT)</p>
                <p className="text-purple-800 mb-2">This is about doctrinal faithfulness and spiritual loyalty.</p>
                <ul className="list-disc list-inside text-purple-800 space-y-1">
                  <li>You know what you believe and why you believe it.</li>
                  <li>You're committed to the truth of God's Word, not the trends of culture.</li>
                  <li>You're all in. No wavering. No compromise.</li>
                </ul>
                <p className="text-purple-900 font-semibold mt-2">Your foundation is the Word, and you stand on it—no matter what.</p>
              </div>

              {/* Point 6 */}
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg border-l-4 border-indigo-500">
                <h3 className="text-lg font-bold text-indigo-900 mb-2">6. MUST HAVE A CLEAR CONSCIENCE</h3>
                <p className="text-indigo-900 italic mb-2">"With a clear conscience" (1 Timothy 3:9 NLT)</p>
                <p className="text-indigo-800 mb-2">No guilt. No unconfessed sin. No unresolved relationships.</p>
                <ul className="list-disc list-inside text-indigo-800 space-y-1">
                  <li>You keep short accounts with God and people.</li>
                  <li>You repent quickly. You forgive deeply.</li>
                  <li>You walk in freedom, not condemnation.</li>
                </ul>
                <p className="text-indigo-900 font-semibold mt-2">Your inner world must be clean so your outer ministry can be powerful.</p>
              </div>

              {/* Point 7 */}
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-lg border-l-4 border-pink-500">
                <h3 className="text-lg font-bold text-pink-900 mb-2">7. MUST GO THROUGH TESTING</h3>
                <p className="text-pink-900 italic mb-2">"They must first be tested" (1 Timothy 3:10 NLT)</p>
                <p className="text-pink-800 mb-2">You don't start at the top. You prove yourself faithful in the small things first.</p>
                <ul className="list-disc list-inside text-pink-800 space-y-1">
                  <li>Can you serve when no one sees?</li>
                  <li>Can you follow before you lead?</li>
                  <li>Can you handle criticism, delay, and spiritual attack without quitting?</li>
                </ul>
                <p className="text-pink-900 font-bold mt-2 text-xl">Testing isn't punishment. It's preparation.</p>
              </div>

              {/* Point 8 */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-lg font-bold text-orange-900 mb-2">8. THE HUSBAND MUST BE FAITHFUL TO HIS WIFE</h3>
                <p className="text-orange-900 italic mb-2">"He must be faithful to his wife" (1 Timothy 3:12 NLT)</p>
                <p className="text-orange-800 mb-2">Your marriage is a mirror of your ministry.</p>
                <ul className="list-disc list-inside text-orange-800 space-y-1">
                  <li>Emotional and physical faithfulness are non-negotiable.</li>
                  <li>You honor, cherish, and protect your covenant.</li>
                  <li>Your love for your wife reflects Christ's love for the church.</li>
                </ul>
                <p className="text-orange-900 font-bold mt-2">If you can't lead at home, you can't lead in the church.</p>
              </div>

              {/* Point 9 */}
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg border-l-4 border-teal-500">
                <h3 className="text-lg font-bold text-teal-900 mb-2">9. MUST MANAGE CHILDREN & HOUSEHOLD WELL</h3>
                <p className="text-teal-900 italic mb-2">"Manage his children and his household well." (1 Timothy 3:12 NLT)</p>
                <p className="text-teal-800 mb-2">Leadership starts at home.</p>
                <ul className="list-disc list-inside text-teal-800 space-y-1">
                  <li>Your kids respect you—not because they fear you, but because they trust you.</li>
                  <li>Your home is a place of peace, prayer, and purpose—not chaos or compromise.</li>
                  <li>You don't sacrifice your family on the altar of ministry.</li>
                </ul>
                <p className="text-teal-900 font-bold mt-2">Your first ministry is your household.</p>
              </div>

              {/* Point 10 */}
              <div className="bg-gradient-to-r from-rose-50 to-rose-100 p-4 rounded-lg border-l-4 border-rose-500">
                <h3 className="text-lg font-bold text-rose-900 mb-2">10. HIS WIFE MUST BE RESPECTED</h3>
                <p className="text-rose-900 italic mb-2">"Their wives must be respected" (1 Timothy 3:11 NLT)</p>
                <p className="text-rose-800 mb-2">She's not an accessory. She's a partner.</p>
                <ul className="list-disc list-inside text-rose-800 space-y-1">
                  <li>Her character matters. Her reputation is clean.</li>
                  <li>She carries herself with grace, wisdom, and strength.</li>
                </ul>
                <p className="text-rose-900 font-semibold mt-2">She is honored not because of who she's married to—but because of who she is.</p>
              </div>

              {/* Point 11 */}
              <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-lg font-bold text-cyan-900 mb-2">11. SHE MUST NOT BE A SLANDERER</h3>
                <p className="text-cyan-900 italic mb-2">"Must not slander others" (1 Timothy 3:11 NLT)</p>
                <p className="text-cyan-800 mb-2">She builds up—never tears down.</p>
                <ul className="list-disc list-inside text-cyan-800 space-y-1">
                  <li>No gossip. No trash-talking. No hidden criticisms.</li>
                  <li>Her words bring life, healing, and unity.</li>
                </ul>
                <p className="text-cyan-900 font-semibold mt-2">She guards her tongue like she guards her heart.</p>
              </div>

              {/* Point 12 */}
              <div className="bg-gradient-to-r from-lime-50 to-lime-100 p-4 rounded-lg border-l-4 border-lime-500">
                <h3 className="text-lg font-bold text-lime-900 mb-2">12. SHE MUST HAVE SELF-CONTROL</h3>
                <p className="text-lime-900 italic mb-2">"Exercise self-control" (1 Timothy 3:11 NLT)</p>
                <p className="text-lime-800 mb-2">She is emotionally and spiritually disciplined.</p>
                <ul className="list-disc list-inside text-lime-800 space-y-1">
                  <li>She doesn't react—she responds.</li>
                  <li>She isn't controlled by moods or impulses.</li>
                </ul>
                <p className="text-lime-900 font-semibold mt-2">She walks in the Spirit, not the flesh.</p>
              </div>

              {/* Point 13 */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border-l-4 border-amber-500">
                <h3 className="text-lg font-bold text-amber-900 mb-2">13. SHE MUST BE FAITHFUL IN EVERYTHING</h3>
                <p className="text-amber-900 italic mb-2">"Be faithful in everything she does" (1 Timothy 3:11 NLT)</p>
                <p className="text-amber-800 font-bold text-xl mb-2">Total trustworthiness.</p>
                <ul className="list-disc list-inside text-amber-800 space-y-1">
                  <li>She is dependable.</li>
                  <li>Her yes means yes. Her no means no.</li>
                  <li>In public, in private, in ministry, in friendship—she is consistently faithful.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg my-8">
              <h3 className="text-2xl font-bold text-purple-900 text-center mb-4">BOTTOM LINE:</h3>
              <p className="text-lg text-purple-900 text-center mb-2">God isn't looking for perfect people.</p>
              <p className="text-lg text-purple-900 text-center font-bold mb-4">He's looking for trustworthy people.</p>
              <p className="text-purple-800 text-center mb-2">You don't have to have it all together right now. But you do have to be willing to grow.</p>
              <p className="text-purple-900 text-center leading-relaxed">This isn't a list of rules to restrict you—It's a picture of a life so free, so full of integrity, so saturated with the Spirit... that people see Jesus when they see you.</p>
            </div>

            <p className="mb-6 text-gray-700">If this strips you, challenges you, or even intimidates you—good. That means the Holy Spirit is speaking.</p>
            <p className="text-xl font-bold text-purple-900 mb-6">Now... let's get to work.</p>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">PART 3: BEYOND THE PROCESS – CULTIVATING A DEACON'S HEART</h2>

            <p className="mb-4">The steps above are important, but if you only do the outward steps without letting God work on your heart, you'll become a hollow leader. Here's how to cultivate the inner life of a deacon:</p>

            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="text-blue-900 font-bold mb-2">Your Private Prayer Life Determines Your Public Spiritual Authority</h3>
                <p className="text-blue-800">You can't give what you don't have. If you're not spending consistent, authentic time with Jesus, you'll minister out of memory, not presence.</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <h3 className="text-green-900 font-bold mb-2">Serve When No One Is Watching</h3>
                <p className="text-green-800">Anyone can serve on Sunday morning. True servants also serve on Tuesday afternoon when no one applauds. That's where God does His deepest work.</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                <h3 className="text-purple-900 font-bold mb-2">Become a Student of the Word—Not Just a Reader</h3>
                <p className="text-purple-800">"Let the word of Christ dwell in you richly" (Colossians 3:16). Let it change you. Confront you. Shape your thoughts, words, and reactions.</p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h3 className="text-red-900 font-bold mb-2">Guard Your Heart Above All Else</h3>
                <p className="text-red-800">"Above all else, guard your heart, for everything you do flows from it." (Proverbs 4:23 NIV). Your greatest responsibility is to protect your inner world from bitterness, offense, pride, and compromise.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">PART 4: TESTIMONY – WHEN GOD BUILDS YOUR CHARACTER BEFORE YOUR PLATFORM</h2>

            <p className="mb-4">My own preparation season was humbling. I thought I was ready. I'd been serving. I knew the Bible. I loved Jesus.</p>

            <p className="mb-4">But I had areas of pride, pockets of immaturity. There were moments I felt frustrated, because I thought I had all the answers.</p>

            <p className="mb-4 font-bold text-purple-900">So I needed to be humbled.</p>

            <p className="mb-4">But God was merciful. He didn't let me step into a space I wasn't ready to hold.</p>

            <p className="mb-4">During that season, I learned to follow before I could lead. I learned that spiritual authority isn't taken—it's earned through faithfulness, humility, and trust.</p>

            <p className="mb-4">That season of preparation became the most important part of my journey. It wasn't what I did—it was what God did in me.</p>

            <p className="mb-6">He taught me to lead by example and it was one of the most important lessons of my life.</p>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg text-center my-8">
              <p className="text-2xl font-bold text-orange-900 mb-2">Your preparation is your protection.</p>
              <p className="text-2xl font-bold text-purple-900 mb-2">Your process is your promise.</p>
              <p className="text-2xl font-bold text-indigo-900">Your faithfulness is your foundation. ⚡</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">YOUR CHAPTER 2 ASSIGNMENT</h2>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
              <p className="font-semibold mb-3">Don't just read this—engage with it.</p>
              
              <div className="mb-4">
                <p className="font-bold text-purple-900 mb-2">Pray Over 1 Timothy 3:8-13</p>
                <p className="text-purple-800">Ask the Holy Spirit: "Which of these areas are You highlighting in my life right now? What needs to change?" Write down what He says.</p>
              </div>

              <div className="mb-4">
                <p className="font-bold text-purple-900 mb-2">Have the Conversation</p>
                <p className="text-purple-800">If you haven't already, go to your pastor or a leader at HRM this week. Say, "I believe God is calling me into deeper service. I want to start the process. What is my next step?"</p>
              </div>

              <div>
                <p className="font-bold text-purple-900 mb-2">Find a Secret Place to Serve</p>
                <p className="text-purple-800">This week, do something kind, helpful, or generous for someone at church—and tell no one. Let it be between you and God. That's where pure ministry begins.</p>
              </div>

              <p className="text-center font-bold text-xl text-purple-900 mt-6 mb-2">You are not earning your calling.</p>
              <p className="text-center font-bold text-xl text-purple-900 mb-2">You are building your capacity to carry it.</p>
              <p className="text-center font-semibold text-lg text-purple-900">He who called you is faithful. He will do it.</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-purple-900 mb-4">CHAPTER 3: THE SERVANT IN MOTION</h1>
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">Where Your Calling Meets the Crowd</h2>

            <p className="text-lg leading-relaxed mb-4">You've felt the nudge. You've built the foundation.</p>
            <p className="text-2xl font-bold text-purple-900 mb-6">Now... it's time to MOVE.</p>

            <p className="mb-4">This chapter is where your character meets your calling. Where preparation meets purpose. This is about what deacons DO—not out of duty, but out of a Spirit-filled overflow of love and power.</p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
              <p className="text-purple-900 font-semibold">We believe true ministry happens not just in the pulpit, but in the parking lot. Not just during the sermon, but during the setup. Not just in prayer, but in practical acts of love that make God's presence tangible.</p>
            </div>

            <p className="text-xl font-bold text-purple-900 mb-6">Ready to serve? Let's go.</p>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">1. THE MINISTRY OF COMPASSION: HANDS THAT HEAL</h2>

            <p className="mb-4 font-semibold">This is the heart of the diaconate. It's not paperwork—it's people-work.</p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <h3 className="text-green-900 font-bold mb-2">Visiting the Sick & Hurting:</h3>
              <p className="text-green-800 mb-2">You're the one bringing prayer, presence, and practical help to hospital rooms and homes.</p>
              <p className="text-green-900 italic mb-2">"Is anyone among you sick? Let them call the elders of the church to pray over them..." (James 5:14 NLT).</p>
              <p className="text-green-800">Often, you are the first responder—the hands and heart of Jesus in moments of crisis.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h3 className="text-blue-900 font-bold mb-2">Benevolence & Practical Care:</h3>
              <p className="text-blue-800 mb-2">You help coordinate food, resources, and financial assistance for those in temporary need.</p>
              <p className="text-blue-900 italic mb-2">This is living out "If one of you says, 'Go in peace; stay warm and eat well,' but does not provide for their physical needs, what good is it?" (James 2:16 NLT).</p>
              <p className="text-blue-800">You turn empathy into action.</p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
              <h3 className="text-purple-900 font-bold mb-2">Funeral & Grief Support:</h3>
              <p className="text-purple-800 mb-2">You walk with families through loss—helping with services, offering comfort, and being a stable, compassionate presence.</p>
              <p className="text-purple-900 italic">You embody "He comforts us in all our troubles so that we can comfort others..." (2 Corinthians 1:4 NLT).</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">2. THE MINISTRY OF THE HOUSE: BEHIND-THE-SCENES EXCELLENCE</h2>

            <p className="mb-4 font-semibold">Sunday morning doesn't happen by magic. It happens by anointed administration.</p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
              <h3 className="text-orange-900 font-bold mb-2">Facilities & Logistics:</h3>
              <p className="text-orange-800 mb-2">You ensure the house of God is clean, functional, and welcoming. Setting up chairs, checking sound systems, managing overflow rooms—it's all worship when done unto the Lord.</p>
              <p className="text-orange-900 italic">"God is not a God of disorder but of peace..." (1 Corinthians 14:33 NLT). Your service brings order so the Spirit can flow in peace.</p>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
              <h3 className="text-indigo-900 font-bold mb-2">Service Coordination:</h3>
              <p className="text-indigo-800 mb-2">You help with baptisms, communion, offerings, and greeting. You're not just doing tasks—you're facilitating encounters with God.</p>
              <p className="text-indigo-900 italic">You help "everything be done in a fitting and orderly way" (1 Corinthians 14:40 NLT).</p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <h3 className="text-red-900 font-bold mb-2">Security & Safety:</h3>
              <p className="text-red-800 mb-2">You protect the flock. Watching the doors, monitoring the crowd, being aware—you create a safe space for people to worship without fear.</p>
              <p className="text-red-900 font-bold">You are a guardian of the atmosphere.</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">3. THE MINISTRY OF THE WORD: WHEN DEACONS SPEAK</h2>

            <p className="mb-4">Yes, deacons serve—but sometimes, that service includes declaring truth.</p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mb-4">
              <h3 className="text-teal-900 font-bold mb-2">Reading Scripture Publicly:</h3>
              <p className="text-teal-800 mb-2">You may be called to read God's Word during service. This isn't just reciting words—it's releasing revelation.</p>
              <p className="text-teal-900 italic">"Faith comes from hearing, that is, hearing the Good News about Christ" (Romans 10:17 NLT). Your voice helps carry that faith.</p>
            </div>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-4 mb-4">
              <h3 className="text-pink-900 font-bold mb-2">Testifying & Witnessing:</h3>
              <p className="text-pink-800 mb-2">Sharing your story isn't just encouraged—it's essential. Your testimony of God's grace, especially through your own journey of restoration, has power.</p>
              <p className="text-pink-900 italic">"They triumphed over him by the blood of the Lamb and by the word of their testimony..." (Revelation 12:11 NLT).</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <h3 className="text-yellow-900 font-bold mb-2">Assisting in Teaching & Discipleship:</h3>
              <p className="text-yellow-800 mb-2">You may help lead small groups, mentor new believers, or teach foundational classes.</p>
              <p className="text-yellow-900 italic">This is where you "equip God's people to do his work" (Ephesians 4:12 NLT).</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">4. THE HEART BEHIND THE HANDS: WHY IT ALL MATTERS</h2>

            <p className="mb-4 font-bold text-lg">Don't ever think setting up a chair is less spiritual than preaching a sermon.</p>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg mb-4">
              <h3 className="text-green-900 font-bold mb-2">It's All Worship:</h3>
              <p className="text-green-800 mb-2">When you serve with a heart of love, you are worshiping. "Whatever you do, work at it with all your heart, as working for the Lord..." (Colossians 3:23 NLT).</p>
              <p className="text-green-800">That includes stacking chairs and passing microphones.</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg mb-4">
              <h3 className="text-blue-900 font-bold mb-2">You Are an Atmosphere Shifter:</h3>
              <p className="text-blue-800 mb-2">Your attitude sets the tone. When you serve with joy, peace, and excellence, you literally shift the spiritual atmosphere of the house.</p>
              <p className="text-blue-800">People feel the difference when love is in the details.</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg mb-6">
              <h3 className="text-purple-900 font-bold mb-2">You Make Ministry Multiplication Possible:</h3>
              <p className="text-purple-800 mb-2">Just like in Acts 6, your practical service frees up pastors and teachers to focus on prayer and the Word.</p>
              <p className="text-purple-900 font-bold">You are a force multiplier in the kingdom.</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">A TESTIMONY: FROM SET-UP TO SENDING</h2>

            <p className="mb-4">I'll never forget the first time I was asked to help with communion. It seemed simple—pass the tray, collect the cups. But that day, as I served the body and blood of Jesus to His people, the Holy Spirit hit me.</p>

            <p className="mb-4 font-bold text-purple-900">I wasn't just handing out bread and juice. I was facilitating an encounter with the living God.</p>

            <p className="mb-4">In that moment, serving felt as sacred as preaching.</p>

            <p className="mb-4">That's the beauty of this calling. There are no small roles—only sacred opportunities.</p>

            <p className="mb-6">Whether you're visiting a shut-in, running a cable, or praying with a newcomer, you are Jesus' hands and feet. You're not working for God—you're working with Him.</p>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">YOUR CHAPTER 3 CHALLENGE</h2>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg">
              <p className="mb-4 font-semibold">This week, find one practical way to serve at your church—and do it with all your heart.</p>
              
              <ul className="list-disc list-inside mb-4 text-orange-900 space-y-1">
                <li>Help park cars.</li>
                <li>Greet people at the door.</li>
                <li>Ask your pastor where a need exists behind the scenes.</li>
              </ul>

              <p className="mb-4 text-orange-800">Do it quietly. Do it joyfully. Do it as unto the Lord.</p>
              
              <p className="text-center font-bold text-xl text-purple-900 mb-2">That's where your ministry begins.</p>
              <p className="text-center font-bold text-2xl text-purple-900">Now go—serve in power.</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-purple-900 mb-4">CHAPTER 4: THE SPIRITUAL BATTLEFIELD</h1>
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">Standing Firm When Warfare Hits Your Calling</h2>

            <p className="text-lg leading-relaxed mb-4">Let's keep it real: the moment you step into your purpose, you step onto a spiritual battlefield.</p>

            <p className="mb-4">This isn't meant to scare you—it's meant to prepare you. The enemy doesn't attack empty vessels; he attacks anointed assignments. If you're facing resistance, confusion, or opposition right now—it might just be confirmation that you're on the right track.</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-900 font-semibold">We believe in teaching spiritual awareness. You're not just serving—you're advancing the Kingdom, and that means you'll face pushback. But you won't face it alone.</p>
            </div>

            <p className="text-xl font-bold text-purple-900 mb-6">Ready to stand firm? Let's gear up.</p>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">1. RECOGNIZE THE ATTACKS: HOW THE ENEMY TARGETS DEACONS</h2>

            <p className="mb-4">The devil doesn't play fair. He attacks where you're most vulnerable. Here's what to watch for:</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <h3 className="text-yellow-900 font-bold mb-2">Distraction:</h3>
              <p className="text-yellow-800 mb-2">Suddenly, everything gets busy. Your phone blows up. Your schedule overwhelms you. Your time with God gets squeezed.</p>
              <p className="text-yellow-900 italic">"The seed that fell among the thorns represents others who hear God's word, but all too quickly the message is crowded out by the worries of this life..." (Mark 4:18–19 NLT).</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h3 className="text-blue-900 font-bold mb-2">Discouragement:</h3>
              <p className="text-blue-800 mb-2">You start feeling like your service doesn't matter. Comparison creeps in. You feel unqualified, unseen, or unappreciated.</p>
              <p className="text-blue-900 font-bold">This is a lie. Your faithfulness is fruitful, even when you can't see it.</p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <h3 className="text-red-900 font-bold mb-2">Division:</h3>
              <p className="text-red-800 mb-2">The enemy loves to twist conversations, stir misunderstandings, and breed offense—especially among serving teams.</p>
              <p className="text-red-900 italic">"Watch out for people who cause divisions..." (Romans 16:17 NLT).</p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="text-orange-900 font-bold mb-2">Disqualification Shame:</h3>
              <p className="text-orange-800 mb-2">He'll remind you of your past. Your mistakes. Your seasons of wandering. He'll whisper: "Who do you think you are? God can't use you."</p>
              <p className="text-orange-900 font-bold">Don't believe it. Your testimony of redemption is your greatest weapon.</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">2. YOUR SPIRITUAL ARMOR: HOW TO FIGHT BACK</h2>

            <p className="mb-4">You're not defenseless. God has given you real tools for this fight.</p>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <h3 className="text-green-900 font-bold mb-2">The Belt of Truth:</h3>
                <p className="text-green-800">Combat lies with God's Word. When the enemy says, "You're not enough," you say: "I can do all things through Christ who strengthens me" (Philippians 4:13 NLT).</p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <h3 className="text-blue-900 font-bold mb-2">The Shield of Faith:</h3>
                <p className="text-blue-800">Your trust in God extinguishes the enemy's attacks. Don't focus on the problem—focus on the Problem-Solver.</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                <h3 className="text-purple-900 font-bold mb-2">The Sword of the Spirit:</h3>
                <p className="text-purple-800 mb-2">That's the Word of God—spoken out loud. Declare Scripture over your life, your family, and your ministry.</p>
                <p className="text-purple-900 italic">"Take the sword of the Spirit, which is the word of God" (Ephesians 6:17 NLT).</p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg">
                <h3 className="text-indigo-900 font-bold mb-2">Prayer in the Spirit:</h3>
                <p className="text-indigo-800 mb-2">This isn't optional—it's essential. Pray in tongues. Pray with clarity. Pray persistently.</p>
                <p className="text-indigo-900 italic">"Pray in the Spirit at all times and on every occasion" (Ephesians 6:18 NLT).</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">3. YOU'RE NOT FIGHTING ALONE: THE POWER OF COVERING</h2>

            <p className="mb-4">This is why spiritual authority matters. You don't do this solo.</p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mb-4">
              <h3 className="text-teal-900 font-bold mb-2">Submit to Your Leaders:</h3>
              <p className="text-teal-800 mb-2">When you feel attacked, don't isolate. Run toward your pastors, mentors, and serving team.</p>
              <p className="text-teal-900 italic">"Obey your spiritual leaders, and do what they say. Their work is to watch over your souls..." (Hebrews 13:17 NLT).</p>
            </div>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-4 mb-4">
              <h3 className="text-pink-900 font-bold mb-2">Stand in Unity:</h3>
              <p className="text-pink-800 mb-2">The enemy wants you divided. Refuse to gossip. Refuse to take offense. Choose love even when it's hard.</p>
              <p className="text-pink-900 italic">"How wonderful and pleasant it is when brothers live together in harmony!" (Psalm 133:1 NLT).</p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <h3 className="text-orange-900 font-bold mb-2">Wear Your Identity:</h3>
              <p className="text-orange-800">You are not a victim. You are a son or daughter of God. You are anointed. You are called. You are equipped.</p>
              <p className="text-orange-900 font-bold mt-2">Walk in that truth every single day.</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">A TESTIMONY: HOW GOD USED MY WILDERNESS TO TRAIN ME FOR WAR</h2>

            <p className="mb-4">I've been there. I've felt the attacks—the doubt, the fatigue, the spiritual oppression that makes you want to quit.</p>

            <p className="mb-4">There was a season not long after I recommitted to serving where everything felt like it was falling apart. My car broke down. My family faced unexpected pressure. I felt spiritually dry. The enemy whispered: "See? You stepped up, and things got worse. God's not with you in this."</p>

            <p className="mb-4">But in that wilderness, I learned to fight. I learned to pray not just from my lips, but from my spirit. I learned to lean on my leaders instead of hiding my struggle. I learned that sometimes God allows the battle not to break you, but to make you.</p>

            <p className="mb-6">That season didn't disqualify me—it activated my spiritual authority.</p>

            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-lg text-center mb-6">
              <p className="text-2xl font-bold text-red-900 mb-2">Your battle is not a sign of failure.</p>
              <p className="text-2xl font-bold text-orange-900 mb-2">It's a sign of favor.</p>
              <p className="text-xl text-orange-800 mb-2">The enemy doesn't fight what's ineffective.</p>
              <p className="text-xl font-bold text-purple-900">He fights what's anointed.</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">YOUR CHAPTER 4 ASSIGNMENT:</h2>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
              <p className="font-semibold mb-4">This week:</p>
              
              <div className="mb-4">
                <p className="font-bold text-purple-900 mb-2">Name Your Battle:</p>
                <p className="text-purple-800">Write down one area where you're facing spiritual opposition. Is it distraction? Discouragement? Shame? Name it.</p>
              </div>

              <div className="mb-4">
                <p className="font-bold text-purple-900 mb-2">Claim a Verse:</p>
                <p className="text-purple-800">Find one Scripture that speaks truth into that area. Write it down. Say it out loud every morning this week.</p>
              </div>

              <div className="mb-4">
                <p className="font-bold text-purple-900 mb-2">Cover Yourself in Prayer:</p>
                <p className="text-purple-800">Pray over your mind, your emotions, your serving area, and your family every day. Use your armor!</p>
              </div>

              <p className="text-center font-bold text-xl text-purple-900 mt-6 mb-2">You are called. You are anointed. You are covered.</p>
              <p className="text-center font-bold text-2xl text-purple-900">Now stand.</p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-purple-900 mb-4">CHAPTER 5: COMMISSIONED FOR IMPACT</h1>
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">Stepping Into Your Lifelong Assignment</h2>

            <p className="text-lg leading-relaxed mb-4">You've discerned the call. You've built the foundation. You've served faithfully. You've stood in spiritual warfare.</p>

            <p className="text-2xl font-bold text-purple-900 mb-6">Now... it's time to step fully into why God called you.</p>

            <p className="mb-4">This chapter isn't about finishing—it's about fulfilling. Ordination isn't a graduation ceremony; it's a deployment. It's where you move from preparation to purpose, from training to transformation.</p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
              <p className="text-purple-900 font-semibold">We don't see ordination as the end of a process. We see it as the beginning of your legacy.</p>
            </div>

            <p className="text-xl font-bold text-purple-900 mb-6">Let's step into your commissioning.</p>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">1. WHAT ORDINATION REALLY MEANS: MORE THAN A TITLE</h2>

            <p className="mb-4 font-semibold">This moment is spiritual before it's ceremonial.</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h3 className="text-blue-900 font-bold mb-2">A Public Affirmation of a Private Calling:</h3>
              <p className="text-blue-800 mb-2">This is where your pastors and spiritual family stand up and say, "We see God in you. We confirm what Heaven has already spoken."</p>
              <p className="text-blue-900 italic">"Do not neglect the spiritual gift you received through the prophecy spoken over you when the elders of the church laid their hands on you" (1 Timothy 4:14 NLT).</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <h3 className="text-green-900 font-bold mb-2">An Impartation of Grace and Authority:</h3>
              <p className="text-green-800 mb-2">When hands are laid on you, something supernatural happens. There's a transfer—of grace, covering, and spiritual authority to walk in your calling.</p>
              <p className="text-green-900 font-bold">You're not just approved by people; you're anointed by God.</p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
              <h3 className="text-purple-900 font-bold mb-2">A Covenant Moment:</h3>
              <p className="text-purple-800 mb-2">You're not just committing to a role; you're entering a covenant with God and His church. This is a sacred trust.</p>
              <p className="text-purple-900 font-bold">You're saying "yes" to a lifetime of representing Jesus well.</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">2. YOUR FIRST YEAR: STAYING HUMBLE, STAYING POWERFUL</h2>

            <p className="mb-4">Your first year as an ordained deacon will set the tone for decades to come.</p>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                <h3 className="text-orange-900 font-bold mb-2">Serve, Don't Strive:</h3>
                <p className="text-orange-800">You don't have to prove anything. You've already been approved. Now, serve from a place of restful confidence, not nervous performance.</p>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg">
                <h3 className="text-teal-900 font-bold mb-2">Keep Learning:</h3>
                <p className="text-teal-800">You never graduate from being a student of Jesus. Stay hungry. Sit under teaching. Ask questions. Let your pastors and mentors continue to shape you.</p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
                <h3 className="text-red-900 font-bold mb-2">Protect Your Heart:</h3>
                <p className="text-red-800 mb-2">Promotion can bring pride. Stay accountable. Stay repentant. Stay close to Jesus.</p>
                <p className="text-red-900 italic">"Pride goes before destruction, and haughtiness before a fall" (Proverbs 16:18 NLT).</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">3. LIFELONG MINISTRY: HOW TO FINISH FAITHFULLY</h2>

            <p className="mb-4 font-semibold">This isn't a short-term assignment. This is a lifetime legacy.</p>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-4 mb-4">
              <h3 className="text-pink-900 font-bold mb-2">Leave a Mark, Not a Title:</h3>
              <p className="text-pink-800">People may forget your name, but they'll never forget how you made them feel—seen, loved, served, and valued.</p>
              <p className="text-pink-900 font-semibold mt-2">That's how you turn service into eternal impact.</p>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
              <h3 className="text-indigo-900 font-bold mb-2">Multiply Yourself:</h3>
              <p className="text-indigo-800">Your greatest legacy won't be what you did—it will be who you raised up.</p>
              <p className="text-indigo-900 font-semibold mt-2">Train others. Empower the next generation. Don't build your kingdom—build His.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <h3 className="text-yellow-900 font-bold mb-2">Never Stop Worshiping:</h3>
              <p className="text-yellow-800">It's easy to serve God and forget to love God. Stay in awe of Him. Let your private worship fuel your public service.</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">4. BEYOND THE DEACONATE: WHERE GOD MAY TAKE YOU</h2>

            <p className="mb-4">Your faithfulness here opens doors you can't imagine.</p>

            <p className="mb-4">For some, the deaconate is a lifelong assignment. For others, it's a divine training ground for what's next.</p>

            <p className="mb-4">I never thought serving as a deacon would lead me to pastoring. But God used every act of service—every chair set up, every prayer prayed, every need met—to prepare me for more.</p>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg mb-6">
              <p className="text-purple-900 font-bold text-lg mb-2">Your obedience in this season doesn't limit your future—it launches it.</p>
              <p className="text-purple-800 italic">"If you are faithful in little things, you will be faithful in large ones..." (Luke 16:10 NLT).</p>
            </div>

            <h2 className="text-2xl font-bold text-purple-900 mb-4 mt-8">A FINAL CHARGE: YOUR STORY IS JUST BEGINNING</h2>

            <p className="mb-4">When I walked back into that church after my season of wandering, I had no idea what God had in store. I just knew I was saying "yes" again.</p>

            <p className="mb-2">That "yes" led to serving.</p>
            <p className="mb-2">That serving led to ordination.</p>
            <p className="mb-2">That ordination led to greater trust.</p>
            <p className="mb-2">That trust led to pastoring.</p>
            <p className="mb-6 font-bold text-purple-900">And it all started with a nudge.</p>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg mb-6">
              <p className="text-xl text-orange-900 text-center mb-2">Your story is still being written.</p>
              <p className="text-xl text-orange-900 text-center mb-2">Your greatest moments of ministry are still ahead.</p>
              <p className="text-xl font-bold text-purple-900 text-center">Your obedience today is shaping your legacy tomorrow.</p>
            </div>

            <p className="mb-2">So go—set up the chairs.</p>
            <p className="mb-2">Visit the sick.</p>
            <p className="mb-2">Pray with the hurting.</p>
            <p className="mb-2">Lead with love.</p>
            <p className="mb-4">Serve with joy.</p>
            <p className="mb-6 font-bold text-purple-900 text-xl">Do it all for Jesus.</p>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg text-center mb-8">
              <p className="text-2xl font-bold text-purple-900 mb-2">You are called.</p>
              <p className="text-2xl font-bold text-indigo-900 mb-2">You are anointed.</p>
              <p className="text-2xl font-bold text-pink-900 mb-4">You are commissioned.</p>
              <p className="text-3xl font-bold text-purple-900">Now go change your world.</p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <p className="text-blue-900 italic text-lg mb-2">"Now may the God of peace... equip you with all you need for doing his will. May he produce in you, through the power of Jesus Christ, every good thing that is pleasing to him. All glory to him forever and ever! Amen."</p>
              <p className="text-blue-900 font-semibold">— Hebrews 13:20–21 NLT</p>
            </div>
          </div>
        );

      default:
        return <div>Chapter not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={() => setLocation("/course/6")}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </div>

        {/* Audio Player */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none shadow-2xl">
            <CardContent className="p-4 sm:p-6">
              {/* Cover and Title */}
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/deacon-course-cover.png" 
                  alt="Deacon Course" 
                  className="w-20 h-auto rounded shadow-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
                    <span className="text-2xl sm:text-3xl align-text-top mr-1">⚡</span>
                    <span className="align-middle">Deacon Course</span>
                  </h3>
                  <p className="text-white/90 text-base sm:text-xl font-semibold">
                    <span className="align-middle">{currentChapterData.title}</span>
                  </p>
                </div>
              </div>

              {/* Chapter Selector */}
              <div className="mb-4">
                <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
                  <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chapters.map((ch) => (
                      <SelectItem key={ch.id} value={ch.id.toString()}>
                        {ch.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Playback Controls */}
              <div className="space-y-3">
                {/* Main Controls */}
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={() => handleSkip(-15)}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <SkipBack className="h-4 w-4 mr-1" />
                    15s
                  </Button>
                  <Button
                    onClick={handlePlayPause}
                    size="lg"
                    className="h-14 w-14 rounded-full bg-white text-purple-600 hover:bg-white/90 shadow-lg"
                  >
                    {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
                  </Button>
                  <Button
                    onClick={() => handleSkip(15)}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    15s
                    <SkipForward className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={0.1}
                    onValueChange={([value]) => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = value;
                        setCurrentTime(value);
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-white/80">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2 justify-center">
                  <Volume2 className="h-4 w-4 text-white/70" />
                  <Slider
                    value={[volume * 100]}
                    max={100}
                    step={1}
                    onValueChange={([value]) => setVolume(value / 100)}
                    className="w-24 sm:w-32"
                  />
                </div>
              </div>

              <audio
                ref={audioRef}
                src={currentChapterData.audioUrl}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <Card className="bg-white shadow-xl">
          <CardContent className="p-6 sm:p-8 prose max-w-none">
            {getChapterContent(currentChapter)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
