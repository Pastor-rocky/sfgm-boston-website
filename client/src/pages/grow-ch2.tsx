import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function GrowCh2() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Audio Player Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 border-none shadow-2xl">
          <CardContent className="p-6">
            {/* Cover and Title */}
            <div className="flex items-start gap-4 mb-6">
              <img 
                src="/grow-cover.png" 
                alt="G.R.O.W" 
                className="w-24 h-auto rounded shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-1">
                  <span className="text-3xl align-text-top mr-1">🌱</span>
                  <span className="align-middle">G.R.O.W</span>
                </h3>
                <p className="text-white/90 text-xl font-semibold">
                  <span className="align-middle">Chapter 2: Read - Feed Daily on God's Word</span>
                  <span className="text-2xl align-text-top ml-1">📖</span>
                </p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="space-y-4">
              {/* Main Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={() => handleSkip(-15)}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="h-5 w-5 mr-1" />
                  15s
                </Button>
                <Button
                  onClick={togglePlayPause}
                  size="lg"
                  className="h-16 w-16 rounded-full bg-white text-green-600 hover:bg-white/90 shadow-lg"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                </Button>
                <Button
                  onClick={() => handleSkip(15)}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  15s
                  <SkipForward className="h-5 w-5 ml-1" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
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
                <div className="flex justify-between text-sm text-white/80">
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
                  className="w-32"
                />
              </div>
            </div>

            <audio
              ref={audioRef}
              src="/grow-ch2.mp3"
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          </CardContent>
        </Card>

        {/* Content Card */}
        <Card className="bg-white shadow-xl mb-8">
          <CardContent className="p-8 prose max-w-none">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              📖 CHAPTER 2: READ
            </h2>

            <p className="mb-4">
              In this section we will discuss the importance of a daily devotion, reading program and the importance of reading the Bible and leadership books for our personal growth to help others do the same.
            </p>

            <p className="mb-4">
              The following verse is what God told Joshua as he was about to take his leadership role to lead the Israelites into the promised land and receive what was promised. If we are to lead this generation into the promised land blessing and the promise of heaven, we should take the same advice!
            </p>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-900 mb-2">Joshua 1:7-8</p>
              <p>
                Be strong and very courageous. Be careful to obey all the instructions Moses gave you. Do not deviate from them, turning either to the right or to the left. Then you will be successful in everything you do. Study this Book of Instruction continually. Meditate on it day and night so you will be sure to obey everything written in it. Only then will you prosper and succeed in all you do.
              </p>
            </blockquote>

            <p className="mb-4">
              The following verses show what God told the kings of the Bible to do so that they may lead God's people and be good, humble leaders.
            </p>

            <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-800 my-6 bg-purple-50 p-4 rounded">
              <p className="font-semibold text-purple-900 mb-2">Deuteronomy 17:18-20</p>
              <p>
                When he sits on the throne as king, he must copy for himself this body of instruction on a scroll in the presence of the Levitical priests. He must always keep that copy with him and read it daily as long as he lives. That way he will learn to fear the LORD his God by obeying all the terms of these instructions and decrees. This regular reading will prevent him from becoming proud and acting as if he is above his fellow citizens. It will also prevent him from turning away from these commands in the smallest way. And it will ensure that he and his descendants will reign for many generations in Israel.
              </p>
            </blockquote>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🌱 Fed by God's Word
            </h3>

            <p className="mb-4">
              When we read the Bible, we're fed by God's Word and supplied for our Christian life. Jesus mentioned this in Matthew 4:4 when He said...
            </p>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p>"Man shall not live on bread alone, but on every word that proceeds out through the mouth of God."</p>
            </blockquote>

            <p className="mb-4">
              Other verses in the Bible also make it clear that God's Word is nourishment to us. For example...
            </p>

            <div className="space-y-4">
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>1 Peter 2:2</strong> says, "As newborn babes, long for the guileless milk of the word in order that by it you may grow unto salvation."</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p>And in the Old Testament, <strong>Jeremiah 15:16</strong> says... "Your words were found and I ate them, and Your word became to me the gladness and joy of my heart."</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p>The Word is also seed! <strong>1 Peter 1:23</strong> For you have been born again, not of perishable seed, but of imperishable seed through the living and enduring word of God.</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Hosea 10:12</strong> Sow for yourselves righteousness; reap steadfast love; break up your fallow (unsown) ground, for it is the time to seek the Lord, that he may come and rain righteousness upon you.</p>
              </blockquote>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="text-gray-800">
                With just those few verses we see the importance of reading the Bible. It's our fuel that keeps the fire, zeal, hunger and thirst for God fresh and the favor of God always active in you and the ministry.
              </p>
            </div>

            <p className="mb-4">
              Also reading devotional books like leadership books that teach biblical principles. This is good for you because it gives you a word and builds you up because you're constantly ministering to people but there's usually no one ministering to the minister!
            </p>

            <p className="mb-4">
              Another great reason reading biblical books are so good for you and the ministry is because it will give you a different perspective and fresh new way to minister and even do teachings based on what you have learned from the author.
            </p>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              💡 Some Devotional Ideas
            </h3>

            <div className="space-y-4">
              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-orange-900 mb-2">📖 Start a daily reading</h4>
                <p className="text-gray-800">
                  This should be the start of your day before you do anything—this is truly giving God your first fruits! Start from Genesis or Matthew and start reading at least a chapter a day and meditate on it. Read the Bible through; don't go back and forth—read the next chapter every day from wherever you decide to start. (No phones, no noise, no distractions during this time! This is your time to pray and read God's Word, so you can seek The Lord.)
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-900 mb-2">📝 Sermon Study time</h4>
                <p className="text-gray-800">
                  You should have one day set aside to put your sermon together for your preaching. (Usually it should be the day before the sermon or teaching, but through the week you should meditate on and even put small notations down on what you want to share.)
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-900 mb-2">📚 Biblical book reading</h4>
                <p className="text-gray-800">
                  Buy a book written by a sound doctrine teacher and set aside a little time at night before you sleep—at least 5 to 10 minutes. This is a blessing because you go to sleep with the word of God and ideas about the teaching you just read.
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-900 mb-2">📢 Challenge your congregation to read</h4>
                <p className="text-gray-800 mb-3">
                  Every sermon you should bring up how important the word of God is. When you have personal and group fellowships with your people, challenge them to start reading the Bible at least a chapter a day. Also follow up and challenge them to be consistent in reading.
                </p>
                <p className="text-gray-800">
                  Here's why this is so important... Jesus said you must be born again to see and enter the Kingdom of God! (John 3). The book of Peter as we read earlier teaches us how to become born again... 1 Peter 1:23 "For you have been born again, not of perishable seed, but of imperishable seed through the living and enduring word of God." <strong>GET THEM TO PLANT THE SEED THAT WILL BEAR THE FRUIT!</strong> (Galatians 5:21)
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="text-gray-800">
                <strong className="text-blue-900">Recommended Translation:</strong> New Living Translation Bible is a great version to recommend because it is easy to understand. (NLT)
              </p>
            </div>

            <p className="mb-4 font-semibold text-green-800 text-lg">
              This section has covered the importance of the word of God and how it can benefit you and the ones you lead!
            </p>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 p-6 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-900">
                Remember: Readers are Leaders! 📚
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
