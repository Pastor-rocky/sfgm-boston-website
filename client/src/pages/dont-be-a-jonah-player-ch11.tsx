import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";
import chapter11Text from "./content/dont-be-a-jonah-ch11.txt?raw";

export default function DontBeAJonahPlayerCh11() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handlePlayPause = () => {
    const a = audioRef.current; if (!a) return;
    if (isPlaying) { a.pause(); setIsPlaying(false); } else { a.play(); setIsPlaying(true); }
  };

  const handleSkip = (d: number) => {
    const a = audioRef.current; if (!a) return;
    const next = Math.min(Math.max(0, a.currentTime + d), duration || a.duration || 0);
    a.currentTime = next; setCurrentTime(next);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60); const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={() => setLocation("/course/3")} variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 11</h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/dont-be-a-jonah-cover.jpg" 
                alt="Don't Be a Jonah Book Cover" 
                className="w-24 h-auto rounded shadow-sm flex-shrink-0"
              />
              <div>
                <h3 className="text-white text-2xl font-bold">🎶 Audiobook</h3>
                <p className="text-white/90 text-xl font-semibold">Chapter 11 🐋</p>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Button onClick={() => handleSkip(-15)} variant="ghost" className="text-white hover:bg-white/10" size="sm">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button onClick={handlePlayPause} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button onClick={() => handleSkip(15)} variant="ghost" className="text-white hover:bg-white/10" size="sm">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="px-2">
                <Slider value={[currentTime]} max={duration} step={1} onValueChange={([v]) => {
                  const a = audioRef.current; if (!a) return; a.currentTime = v; setCurrentTime(v);
                }} className="w-full" />
                <div className="flex justify-between text-sm text-white/70 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Volume2 className="h-4 w-4 text-white" />
                <Slider value={[volume]} max={1} step={0.1} onValueChange={([v]) => setVolume(v)} className="w-24" />
              </div>

              <audio
                ref={audioRef}
                src="/uploads/textbook-audio/dont-be-a-jonah-ch11.mp3"
                preload="auto"
                onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 11: Leaving a Legacy</h2>
              
              <div className="mb-6">
                <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-200">
                  <p>"The wise will inherit glory, but shame will be the legacy of fools." Proverbs 3:35 MEV</p>
                </blockquote>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📚 What is a Legacy?</p>
                <p>According to Collins English Dictionary, a legacy of an event or period of history is something which is a direct result of it and which continues to exist after it is over.</p>
                
                <p>When you look at the differences of Jonah's and Jesus' legacy, they are very different. Jonah's story ends with a question mark (see Jonah 4:11). Jesus' story actually never ends, obviously—but in the Bible before He ascends to heaven He commissioned His disciples to go and change the world (Matthew 28). Why did his disciples and millions after them suffer pain, humiliation, and even death for the cause of Christ? Simple—because of the legacy that Jesus left that inspired their lives even unto death</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">❓ The Ultimate Question</p>
                <p>My question is this: after you leave this earth, will you leave a legacy that inspires others to turn to Jesus or turn from Jesus? Personally, after God takes me home to be with the Lord, I want to know that even after my time is done here on earth that God will continue to use me. I pray that long after I am gone, the teachings God gave me to minister, the books He has allowed me to write, and the life He allowed me to live for His Glory, will still be shared, read, and talked about from generation to generation. Why? Simple, because I want God to use all that He allowed me to do for Him to point many more to Him even after I'm gone.</p>
                
                <p>I eagerly wait and serve Jesus here so that when I get there I will hear those amazing and humbling words from Jesus: <span className="text-green-300 font-semibold">"Welcome home, my good and faithful servant; enter into the joy of your rest."</span></p>
                
                <p>I feel sorry for the people that will hear, <span className="text-red-300 font-semibold">"Go away from me for I have never known you, you workers of iniquity"</span> (Matthew 7:21).</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">⏰ The Choice of Eternity</p>
                <p>The grace you receive and the life you live here will determine what you will hear in the life that truly matters, eternity. You will live an eternity somewhere, the question is—where will it be?</p>
                
                <p><span className="text-purple-300 font-semibold">Choose to live for Jesus here and live a life that after you're gone you will still point people to the resurrected Christ!</span> As I was preparing this chapter, I began to think about a story in the Bible about the prophet Elisha. Elisha was a prophet under the prophet Elijah, one of the most powerful and influential prophets ever. Elisha learned everything from his mentor Elijah's great examples concerning the things of God. Elisha was also a powerful man of God that received a double portion of Elisha's anointing on his life. Elisha lived and served God and he influenced many for the glory of God. The verse you are about to read actually has to do with what God did through the prophet Elisha—not while he was living but after he died.</p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">💀 The Prophet's Bones</p>
                <p>The prophet was dead and his bones laid in a burial site. Now, before the prophet Elisha took the place of his predecessor Elijah, he asked Elijah for a double portion of the anointing that was on Elijah's life (2 Kings 2:9). God ended up granting Elisha's request. The prophet Elijah was used by God to perform fourteen miracles, ranging from prophesies fulfilled, stopping the rain for a time, to raising the dead. The prophet Elisha died after performing twenty seven miracles, one short of the double portion blessing—or so we thought.</p>
                
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Once when some Israelites were burying a man, they spied a band of these raiders. So they hastily threw the corpse into the tomb of Elisha and fled. But as soon as the body touched Elisha's bones, the dead man revived and jumped to his feet!" 2 Kings 13:21 NLT</p>
                </blockquote>
                
                <p><span className="text-red-300 font-semibold">Praise God—number twenty eight. The fulfillment of the double portion happened after the prophet was dead. His legacy made the dead leap to life.</span> That just gets me excited every time I read that verse because it teaches us that after we're gone our testimony and life can still make people tap into the resurrecting power of Christ!</p>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-orange-300">❓ Question Mark vs. Exclamation Point</p>
                <p>Do you want your life to end with a question mark like Jonah's? When people pass away, we ask questions about their view of eternity and their loved ones place. Do you think they made it to heaven? Why did this happen to them? I wonder what's going to happen to their family? Do you think they had time to repent? If they only would have served the Lord, wouldn't it have been different?</p>
                
                <p><span className="text-orange-300 font-semibold">Instead of leaving this world with a question mark, leave it with an exclamation point!</span> Peoples' spirits should be raised in excitement about how we live for Christ. Even when we pass away, our testimony should help them mourn in joy after our death because they know we lived a life that pointed people to Christ and that we helped people experience the resurrection saving power of Jesus!</p>
                
                <p>So instead of being filled with doubtful questions, they can be filled with faith and inspiration and can make bold statements of the person's faith. I wish I could serve God like they did! They really inspired me to serve God! They led me to Christ! They helped my family to really know Christ! I want to follow in their footsteps! They really were an example of Christ! They really loved and had compassion for people!</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">⚖️ Jonah vs. Jesus</p>
                <p>Let's look at the life of Jonah when compared to Jesus.</p>
                
                <p>The following seven points are from an article I read about the parallels about Jonah and Jesus:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-3">
                    <div className="bg-gray-800/30 p-3 rounded border border-gray-600/30">
                      <p className="font-semibold text-blue-300 mb-1">1. Three Days</p>
                      <p className="text-sm">Jonah spent three days inside the belly of a great fish because of his own sinfulness and rebellion. Jesus spent three days inside the belly of the earth because of our sin and rebellion.</p>
                    </div>
                    <div className="bg-gray-800/30 p-3 rounded border border-gray-600/30">
                      <p className="font-semibold text-blue-300 mb-1">2. Obedience</p>
                      <p className="text-sm">Jonah ran from the difficult calling God gave Him (Jonah 1:3). Jesus perfectly obeyed the Father's will, coming to earth and dying on the cross</p>
                    </div>
                    <div className="bg-gray-800/30 p-3 rounded border border-gray-600/30">
                      <p className="font-semibold text-blue-300 mb-1">3. Storms</p>
                      <p className="text-sm">Jonah was asleep on the ship during a storm caused by his own disobedience (Jonah 1:4-12). Jesus slept on a boat during a storm, and "rebuked the wind and said to the waves, 'Quiet! Be still!' Then the wind died down and it was completely calm." (Mark 4:35-41). Jonah caused a storm. Jesus had authority over the storm.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-800/30 p-3 rounded border border-gray-600/30">
                      <p className="font-semibold text-blue-300 mb-1">4. Authority</p>
                      <p className="text-sm">Jonah feared the Creator who had authority on earth (Jonah 1:9). Jesus is the Creator with all authority over heaven and earth (John 1:3; Matthew 28:18).</p>
                    </div>
                    <div className="bg-gray-800/30 p-3 rounded border border-gray-600/30">
                      <p className="font-semibold text-blue-300 mb-1">5. Salvation</p>
                      <p className="text-sm">In the fish, Jonah knew that "Salvation belongs to the Lord" (Jonah 2:9). Jesus' name means "Yahweh saves." Jesus is the way of salvation (Hebrews 5:9; Acts 4:12).</p>
                    </div>
                    <div className="bg-gray-800/30 p-3 rounded border border-gray-600/30">
                      <p className="font-semibold text-blue-300 mb-1">6. Grace</p>
                      <p className="text-sm">Jonah became angry with God for showing grace toward repentant sinners (Jonah 4:2). Jesus modeled God's grace toward repentant sinners (Romans 3:24).</p>
                    </div>
                    <div className="bg-gray-800/30 p-3 rounded border border-gray-600/30">
                      <p className="font-semibold text-blue-300 mb-1">7. Love</p>
                      <p className="text-sm">Jonah was angry enough to die because of God's grace toward his enemies (Jonah 4:3). Jesus was compassionate enough to die because of His love for his enemies (Romans 5:10).</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🎯 The Final Challenge</p>
                <p>The question we must ask is, are we more like Jesus or Jonah? The prayer we must pray is, make me more like Jesus.</p>
                
                <p className="text-center text-2xl font-bold text-green-300 mb-4">Don't be a Jonah!</p>
                
                <p className="text-center text-lg font-semibold text-green-300">It's time to stop running like Jonah and start serving like Jesus so you can impact this generation and the next!</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">📖 Epilogue</p>
                <p>My prayer is that you've learned enough in this book to get you to say yes to the calling that God has for your life, and that you would start a daily reading of the book that truly matters—the Bible!</p>
                
                <p>I mentioned in the previous chapters how we are called to be like ambassadors for God. Ambassadors are experts in the laws of their land, and foreign lands as well. What's the point? Like ambassadors, we too need to know the law of the kingdom and the Word of God. Then we can help others in this foreign land to point them to our home in heaven.</p>
                
                <p><span className="text-purple-300 font-semibold">Start a daily devotional in the Word of God. Why? The subtitle to this book is, "Stop running like Jonah and start serving like Jesus." Well, the only way you can truly start serving like Jesus is to study the life of Jesus; study the Gospels that tell us of Jesus, and study the whole book that Jesus gave to us to learn to be like Him.</span> The Bible is what changed my life, the lives of many people I know, and millions more like us.</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">⏰ The Commitment</p>
                <p>Every man and women of God I know that is walking in their call are people of the Word who started a daily devotional in the Word of God and never stopped reading it. Why? Because they know that the Word is their bread, meat, water, and life. Please don't let this book be where it ends—let it be a beginning. Don't let this be the conclusion and just say, good book—and that's it. Let it actually be the start of you getting in the book that truly matters. The Bible.</p>
                
                <p>That's the only way you will learn how to serve Jesus and walk in your calling. If you read the Bible for fifteen minutes a day you can read it in a year. Fifteen minutes a day is actually only one percent of your day. <span className="text-blue-300 font-semibold">If we can't give God one percent, how do we expect one hundred percent from Him?</span></p>
                
                <p>If you read a chapter a day you can read it in about three and a half years, about the same time Jesus spent with his disciples.</p>
                
                <p className="text-center text-lg font-semibold text-blue-300">However you decide to read, just start reading!</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">📚 Start in the New Testament</p>
                <p>Start in the New Testament and continue through the Old Testament.</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Now the word of the Lord came unto Jonah the son of Amittai, saying," Jonah 1:1 KJV</p>
                </blockquote>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"And the word of the Lord came unto Jonah the second time, saying," Jonah 3:1 KJV</p>
                </blockquote>
                
                <p>Jonah was a man of God that knew the word of God and I believe the Word is what kept him and no matter how far he went off course the Word brought him back. <span className="text-green-300 font-semibold">This is why we need the word every day in our lives as well.</span></p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"In the beginning the Word already existed. The Word was with God, and the Word was God. He existed in the beginning with God. God created everything through him, and nothing was created except through him. The Word gave life to everything that was created, and his life brought light to everyone." John 1:1-4 NLT</p>
                </blockquote>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Required Bible Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.open('https://www.biblegateway.com/passage/?search=Titus+1&version=NLT', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📖 Read Titus 1 (NLT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


