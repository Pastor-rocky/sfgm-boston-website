import React, { useRef, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";

export default function DeaconCourseCh3() {
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
                  <span className="align-middle">Chapter 3: The Servant in Motion</span>
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

            <audio ref={audioRef} src="/deacon-course-ch3.mp3" onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl mb-8">
          <CardContent className="p-8 prose max-w-none">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
