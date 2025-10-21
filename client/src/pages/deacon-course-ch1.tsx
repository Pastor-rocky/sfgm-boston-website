import React, { useRef, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";

export default function DeaconCourseCh1() {
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
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 border-none shadow-2xl mb-8">
          <CardContent className="p-4 sm:p-6">
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
                  <span className="align-middle">Introduction: The Unignorable Nudge</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
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
              src="/deacon-course-ch1.mp3"
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="bg-white shadow-xl mb-8">
          <CardContent className="p-8 prose max-w-none">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
