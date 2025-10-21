import React, { useRef, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";

export default function DeaconCourseCh4() {
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
                  <span className="align-middle">Chapter 4: The Spiritual Battlefield</span>
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

            <audio ref={audioRef} src="/deacon-course-ch4.mp3" onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl mb-8">
          <CardContent className="p-8 prose max-w-none">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
