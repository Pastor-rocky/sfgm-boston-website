import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";
import chapter8Text from "./content/dont-be-a-jonah-ch8.txt?raw";

export default function DontBeAJonahPlayerCh8() {
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
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 8</h1>
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
                <p className="text-white/90 text-xl font-semibold">Chapter 8 🐋</p>
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
                src="/uploads/textbook-audio/dont-be-a-jonah-ch8.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 8: Your Mess is a Message</h2>
              
              <div className="mb-6">
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"And we know that God causes everything to work together for the good of those who love God and are called according to his purpose for them." Romans 8:28 NLT</p>
                </blockquote>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-gray-300">🏛️ The Assyrians of Nineveh</p>
                <p>When you would think about the Assyrians living in Nineveh, you would have never associated them with a being a kind, compassionate, and loving people. You would have been much more likely to think the exact opposite. The Assyrians of Jonah's day were a ruthless and evil people. They had a reputation for showing no mercy to their enemies, and committing atrocities such as decapitating prisoners. So the question is, why would they listen to the prophet Jonah? And not just listen—the king of Nineveh got off his throne, put on sackcloth, and sat down in ashes. Many people in the city copied the king's behavior. The king called for citywide fasting, repentance, and prayer in hopes that the Lord would show mercy to them.</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">🌙 Signs and Wonders in the Heavens</p>
                <p>There could have been a couple reasons why Nineveh would repent like they did when they heard the warning of Jonah. One of those reasons could have been because there were signs and wonders in the heavens, like a solar eclipse which they have never seen; this is confirmed by astronomers in the same time period in which Jonah was warning the city of Nineveh. The eclipse would have lasted for hours, which may have struck fear and confusion in them.</p>
                
                <p>Consider the basic facts of an eclipse—the sun is blocked by the moon while it is in rotation, which causes the light to be shut out and darkness to affect the land. God is saying, through Jonah, that this is what the people of Nineveh did; they shut out the light and allowed evil to overtake the land and bring darkness and disaster on themselves. <span className="text-blue-300 font-semibold">But God brought the light to shine on them again through Jonah and the Word of the Lord.</span> Jesus said we are the light of the world (Matthew 5:18).</p>
                
                <p>I'm here to remind you that no matter how bad the darkness takes over a person's life, they can still be used for the glory of God. All they need is someone to shine the light in the midst of their darkness. They can be affected by the light you shine and can be redirected in the life God wants them to live. <span className="text-blue-300 font-semibold">Remember, no matter how dark a person's life may seem, don't count them out. All they need is someone to shine in the midst of their darkness so they can see the way to go—and God wants that person to be you!</span></p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">🐋 The Fish Connection</p>
                <p>You might say, "If you only knew how bad I was. There's no way anyone will take me seriously; there's no way I can be light with all the darkness I'm in and was involved in."</p>
                
                <p>If that's you, think about this:</p>
                
                <p>The second reason why Nineveh may have repented is that at the time of Jonah going to Nineveh, there was a false god they would worship named Dagon who was half man and half fish (pictured).</p>
                
                <p>That's right, imagine it—the people of Nineveh are already wondering what's going on in the heavens and now they see a large fish, possibly a whale, pull up on their shores. They see this fish open its mouth and out comes a man—possibly bleached white from the acid in the fish's stomach. I imagine whoever saw this ran to the city to tell others, and it spreads like wild fire so by the time Jonah began to minister about repentance they were ready to do whatever this man who came out of the fish said. <span className="text-red-300 font-semibold">God used what the enemy meant for bad—a rebellious man of God running from the Lord's will because of bitterness—and used the fish as a vehicle to get Jonah from where he was to where he needed to be.</span> God used Jonah and the fish to reveal that He alone is the one true God and that they needed to turn from their idols like Dagon.</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">✨ Your Mess is a Message</p>
                <p>God used all of it to show the man of God His mercy and how a sinful people were able to repent. It only takes someone willing to tell them about the true God so they could turn away from their false gods and receive God's mercy and grace.</p>
                
                <p>Whether you're a minister, a man or woman of God on the run, or a rebellious person involved in all kinds of evil—if you come to God with a repentant heart and start doing what God has called you to do, God will use all the good, bad, and ugly things that have happened to you for His glory.</p>
                
                <p className="text-center text-lg font-semibold text-green-300">In short, He will take your mess and turn it into a message!</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">📜 The Genealogy of Christ</p>
                <p>Look no further than the genealogy of Christ in the opening verse of Matthew's Gospel to see examples that God can use people's messes and turn them into messages for His glory.</p>
                
                <p>Some people in this genealogy of Christ are people you would never think would be associated with Christ. The family tree of Jesus is filled with liars, thieves, prostitutes, adulteresses, fornicators, pagan worshippers, murderers, rebellious, and immoral people. <span className="text-purple-300 font-semibold">God used all of these men and women of God that rebelled against Him—what an incredible way to show us that no matter how rebellious you may be, God can use your past as a place of hope for someone's future.</span></p>
                
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-200">
                  <p>"For I know the plans I have for you," says the Lord. "They are plans for good and not for disaster, to give you a future and a hope. In those days when you pray, I will listen. If you look for me wholeheartedly, you will find me." Jeremiah 29:11-13 NLT</p>
                </blockquote>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">🎯 Your Testimony Matters</p>
                <p>Allow God to help your story to be heard by others, so they will know that God can turn a mess into His message of hope for their future, as they call upon the true God of the world—Jesus Christ of Nazareth, the living Son of God. The true messenger of Salvation wants to use your message to help others overcome as Jonah helped the people of Nineveh overcome. <span className="text-blue-300 font-semibold">You Have a testimony!</span></p>
                
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Then I heard a loud voice saying in heaven, "Now salvation, and strength, and the kingdom of our God, and the power of His Christ have come, for the accuser of our brethren, who accused them before our God day and night, has been cast down. And they overcame him by the blood of the Lamb and by the word of their testimony, and they did not love their lives to the death." Revelation 12:10-11 NKJV</p>
                </blockquote>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-orange-300">💪 The Power of Shared Struggles</p>
                <p>A lot of people that are locked in their problems don't listen to people who are preaching the Word to them because the people trying to minister to them have never experienced what they're dealing with. They write them off and say that the people trying to minister don't know what they're going through.</p>
                
                <p>Sometimes the greatest affect of the Gospel doesn't take place in people's lives until they meet someone preaching the gospel who struggled with what they're struggling with. It might be an addiction, a bondage, hurt, pain, sorrow, shame, sickness, depression, condemnation, un-forgiveness, adultery, immorality, fornication, drunkenness, perversion, abuse, abandonment, suicidal thoughts, church offense, and hurt. <span className="text-orange-300 font-semibold">Whatever it is that you're dealing with or have dealt with, let it be your message you share to others so they will know that if God did it for you, then God can do it for them!</span></p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🚕 Turning Whales into Taxi Cabs</p>
                <p>The rest of this chapter was written By Pastor Skippy Martin, SFGM</p>
                
                <p>When we decide that we are going to be obedient to the will and the Word of God, that's when God begins to turn our whale into a taxi cab! This is the kind of prayer that turns whales into taxi cabs. I'm sure by now you're wondering what does that word mean. I'll show you.</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"So the LORD spoke to the fish, and it vomited Jonah onto dry land." Jonah 2:10 NKJV</p>
                </blockquote>
                
                <p>After Jonah prays a prayer of repentance, God speaks to the fish and it spits him out on dry land. Here's where it gets interesting—the whale spits him out on the shores of Nineveh. The very place where Jonah was meant to go preach. <span className="text-green-300 font-semibold">The very thing that had swallowed Jonah up, the very thing that should have destroyed him, was the very thing that took him right into the center of God's will for His life.</span> And the same applies even to this very day. You're reading this book right now, and you too can turn your whale into a taxi cab. It's no accident. God can use what should have been your setback to become your setup for your comeback. God can take what should have been your tombstone and turn it into your steppingstone on the path to God's destiny for your life.</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">🎭 The Perfect Timing</p>
                <p>Remember, the people of Nineveh worshipped a half-fish, half-man God named Dagon. So it was only natural that when they saw Jonah, a man being spit out by a giant fish onto the shore with a message from God, that they listened and obeyed. All of Nineveh repented of their sin and the will of God was done. The story truly is a story of repentance. God used the whale as the means by which Jonah reached his destination. God used the whale as the means by which the attention of the Ninevites was captured. The whale was the stage for Jonah's sermon.</p>
                
                <p>And that's what God can do with your whale. He'll use your failing marriage. Your failing ministry. Your poverty. Your drug addiction. Your barrenness. Your family problems. If you'll put it in God's hands, He can take these things and use them as the stage from which to preach the message God has for you. Maybe not a message of words, but a message of your life—your story of what God has brought you through. Your testimony of what God has done for you. <span className="text-purple-300 font-semibold">What you went through can become the thing that opens people up to receive what God is speaking through you.</span> The whale wasn't meant to kill Jonah, it was meant to help him do God's will and save people.</p>
                
                <p>Your whale wasn't meant to destroy you, it was meant to help you accomplish God's will in the earth. A taxi cab takes you where you need to go, never to be seen again. Let God use your mess and turn it into a message. You'll never have to go through it again when God gets done. Let Him turn your trial into a triumph. <span className="text-purple-300 font-semibold">Let Him turn your whales into taxi cabs!</span></p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 text-center">
                <p className="text-lg font-semibold mb-4 text-red-300">🎯 The Final Challenge</p>
                <p>Think of the worst sin or problem you are facing right now. Now think of the verse we started off this chapter with—Romans 8:28, <span className="text-red-300 font-semibold">"God uses EVERYTHING to work together for His good"</span> (emphasis mine).</p>
                
                <p>If you will give it to God, the mess you're in now can become your message of hope to the hopeless!</p>
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
                onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Timothy+2&version=NLT', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📖 Read 2 Timothy 2 (NLT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


