import React, { useRef, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";

export default function DeaconCourseCh5() {
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
                  <span className="align-middle">Chapter 5: Commissioned for Impact</span>
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

            <audio ref={audioRef} src="/deacon-course-ch5.mp3" onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl mb-8">
          <CardContent className="p-8 prose max-w-none">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
