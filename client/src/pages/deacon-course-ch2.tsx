import React, { useRef, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";

export default function DeaconCourseCh2() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={() => setLocation("/course/6")} variant="ghost" className="text-white hover:bg-white/20">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </div>

        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none shadow-2xl mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-4 mb-4">
              <img src="/deacon-course-cover.png" alt="Deacon Course" className="w-20 h-auto rounded shadow-lg" />
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
                  <span className="text-2xl sm:text-3xl align-text-top mr-1">⚡</span>
                  <span className="align-middle">Deacon Course</span>
                </h3>
                <p className="text-white/90 text-base sm:text-xl font-semibold">
                  <span className="align-middle">Chapter 2: Laying the Foundation</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Button onClick={() => handleSkip(-15)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <SkipBack className="h-4 w-4 mr-1" />15s
                </Button>
                <Button onClick={handlePlayPause} size="lg" className="h-14 w-14 rounded-full bg-white text-purple-600 hover:bg-white/90 shadow-lg">
                  {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
                </Button>
                <Button onClick={() => handleSkip(15)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  15s<SkipForward className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-1">
                <Slider value={[currentTime]} max={duration || 100} step={0.1} onValueChange={([value]) => { if (audioRef.current) { audioRef.current.currentTime = value; setCurrentTime(value); } }} className="cursor-pointer" />
                <div className="flex justify-between text-xs sm:text-sm text-white/80">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center">
                <Volume2 className="h-4 w-4 text-white/70" />
                <Slider value={[volume * 100]} max={100} step={1} onValueChange={([value]) => setVolume(value / 100)} className="w-24 sm:w-32" />
              </div>
            </div>

            <audio ref={audioRef} src="/deacon-course-ch2.mp3" onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl mb-8">
          <CardContent className="p-8 prose max-w-none">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
