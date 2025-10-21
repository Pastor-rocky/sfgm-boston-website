import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";
import chapter9Text from "./content/dont-be-a-jonah-ch9.txt?raw";

export default function DontBeAJonahPlayerCh9() {
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
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 9</h1>
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
                <p className="text-white/90 text-xl font-semibold">Chapter 9 🐋</p>
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
                src="/uploads/textbook-audio/dont-be-a-jonah-ch9.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 9: The Signs of Jonah</h2>
              
              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">✈️ Writing from Israel</p>
                <p>I'm writing this chapter as I'm on a plane flying home from Israel. I was there on a tour, filming a DVD teaching series we are putting together. We believe people will be encouraged and inspired as they watch footage of us teaching the truths explored in this book, captured right at the very locations where these events took place in the Bible. The final location was Joppa.</p>
                
                <p>That's right—the very location where Jonah had to decide to either go his own way or follow the Lord's way. Modern-day Joppa is a night time party scene, filled with lights and glitz and glamor. It's actually one of the biggest party spots in Israel. <span className="text-blue-300 font-semibold">We have to choose between the glamor of the world and the calling of God.</span> While I was there I couldn't help think about the decision he made and the price he paid for it. There is always a price to pay to go against God—it comes due just like any other bill, and Jonah had to pay a steep price.</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">🕊️ The Dual Meaning of Jonah</p>
                <p>When you look at the name Jonah, you will discover that his name has a dual meaning. Jonah means both dove or destruction. Think about that—the dove in the Bible is a symbol of the Holy Spirit. Destruction is a representation of the devil, because this is what he wants to do to people; he wants to steal, kill, and destroy.</p>
                
                <p>When Jonah didn't listen to God, and instead tried to do what he wanted to do, everything that could have gone wrong did go wrong. Destruction followed Jonah wherever he went and it affected whoever he was around. When he finally came to his senses, and did what God wanted him to do, and listened to the Holy Spirit—people got saved and delivered.</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-400">🌾 The Law of Sowing and Reaping</p>
                <p>Look at what Galatians chapter six says, and reflect on the dual meaning of Jonah's name:</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Do not be deceived, God is not mocked; for whatever a man sows, that he will also reap. For he who sows to his flesh will of the flesh reap corruption, but he who sows to the Spirit will of the Spirit reap everlasting life. And let us not grow weary while doing good, for in due season we shall reap if we do not lose heart." Galatians 6:7-9 NKJV</p>
                </blockquote>
                
                <p>There is a Biblical principle that when you follow your flesh, you are sowing corruption and destruction—and that which you sow is what you will reap. On the other hand, if you follow the Holy Spirit and do what God wants, you are sowing everlasting life and you will reap what you sow. You'll have everlasting life, and those who you sow the Word of God into will reap everlasting life as well. Just like Jonah gave in to the Spirit of God and sowed the incorruptible seed—which is the Word of God (1 Peter1:23). And because of his ultimate obedience, the people of Nineveh got saved and delivered from the destruction that was about to come upon them.</p>
              </div>

              <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-yellow-300">🌟 The Choice: Dove or Destruction</p>
                <p>The reason I put the picture of modern-day Joppa on the cover of the book is as a symbol of what we have to decide between. Do we want the glitz, glamour, and bright lights of this world, or do we give in to the Holy Spirit? Knowing that we are in this world but we're not of this world—we are, like the Bible says, aliens just passing through.</p>
                
                <p>Remember, every decision you'll ever make will be a choice that represents one of the definitions of Jonah's name, either dove or destruction. <span className="text-yellow-300 font-semibold">Let's choose wisely, because we know we have very little time before our Lord and Savior comes back.</span> He's going to be looking for people who are obedient and faithful, but those who are lazy and wicked he will cast away.</p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">⏰ The Signs of the Times</p>
                <p>It's time to get serious about the signs of the times that are all around us. Jesus said you will know the seasons:</p>
                
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>"He answered and said to them, "When it is evening you say, ' It will be fair weather, for the sky is red'; and in the morning, ' It will be foul weather today, for the sky is red and threatening.' Hypocrites! You know how to discern the face of the sky, but you cannot discern the signs of the times. A wicked and adulterous generation seeks after a sign, and no sign shall be given to it except the sign of the prophet Jonah." And He left them and departed." Matthew 16:2-4 NKJV</p>
                </blockquote>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">🌙 Blood Moons and Heavenly Signs</p>
                <p>Between 2016-2018 we have seen blood moons and Bethlehem start to reappear. Why does this matter?</p>
                
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-200">
                  <p>"And also on My menservants and on My maidservants I will pour out My Spirit in those days. "And I will show wonders in the heavens and in the earth: Blood and fire and pillars of smoke. The sun shall be turned into darkness, And the moon into blood, Before the coming of the great and awesome day of the LORD." Joel 2:29-31 NKJV</p>
                </blockquote>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">🐋 The Sign of Jonah</p>
                <p>What was the sign of Jonah? Many people believe it was the simple fact that as Jonah was in the belly of the fish in the sea for three days and on the third day came back, Jesus was going to die and be buried in the earth and on the third day return, and I believe this as well. There was something else that happened in the days of preaching to the people of Nineveh—this eclipse that made the city of Nineveh go dark for a time.</p>
                
                <p>When Jesus was dying on the cross, the Bible says that the whole land went dark for a time; from twelve to three in the afternoon darkness covered the land (Luke 23:44).</p>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-gray-300">📊 Historical Evidence</p>
                <p>I recently read an article from pathos.com regarding what happened in the days of Jonah:</p>
                
                <p className="italic text-gray-300 mb-4">"Did you know that a total solar eclipse appears to have played a role in the story of the Biblical prophet Jonah? First, of course, we have to decide whether Jonah was a fictional character or a real, historical person. If you've read my three-part article "Historicity: Does It Matter?" you'll know what I think. Taking Jonah to be historical as I do, the Bible's one specific clue as to when he lived was during the reign of Jeroboam II, or around 786-746 BCE, if we take 2 Kings 14:25 as evidence of the latest that he could have prophesied.</p>
                
                <p className="italic text-gray-300 mb-4">A total solar eclipse over Nineveh in northern Iraq on June 15, 763 BCE fits this time frame for the life and career of Jonah. Assyriologist Donald Wiseman, a former curator at the British Museum, and editor of Chronicles of Chaldean Kings and The Alalakh Tablets, published a lecture in the Tyndale Bulletin in 1979 where he argued persuasively that this eclipse would help explain the dramatic reaction to Jonah's preaching. To the Assyrian writings cited by Wiseman, here's what a solar eclipse would have meant to them: "the king will be deposed and killed, and a worthless fellow will seize the throne...rain from heaven will flood the land...the city walls will be destroyed.""</p>
                
                <p>I believe that Jonah was in Nineveh in June of 763 BC during the total eclipse of the sun, which would help explain the remarkable response of the people of Nineveh. Jonah preaches at exactly the right time for the people of Nineveh to listen to him. The Assyrian nation was weak and in chaos in the decade around 760 BCE. They had one earthquake (one sign of divine wrath). There was a famine from 765-758 BCE. Assyria was losing battles and losing territory to its enemies. There were domestic riots. With all the trouble they already had going on, they could have easily believed that Jonah's warning would come to pass. Now was a perfect time for a prophet from far away to arrive on the scene and command a response.</p>
                
                <p><span className="text-gray-300 font-semibold">That's right, that which happened to Nineveh happened in Jerusalem!</span></p>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-orange-300">🌍 The 2017 Eclipse</p>
                <p>What does that have to do with you and me? In 2017, we had an eclipse similar to the one in the time of Jonah and just like in the time of Jesus. This is from a report where an astronomer backtracked and discovered this amazing fact. The point is, can this be a sign that we are in the last days? Can this be a sign that Jesus is about to bring judgment unless our nations repent? Can this be a sign that we have to get ready for the coming of the Son of Man? <span className="text-orange-300 font-semibold">I believe the answer to all these questions is yes.</span> The Bible says God gives us signs concerning the stars and the moon and even the sun.</p>
                
                <blockquote className="border-l-4 border-orange-400 pl-4 mb-4 italic text-gray-200">
                  <p>"And there will be signs in the sun, in the moon, and in the stars; and on the earth distress of nations, with perplexity, the sea and the waves roaring; men's hearts failing them from fear and the expectation of those things which are coming on the earth, for the powers of the heavens will be shaken. Then they will see the Son of Man coming in a cloud with power and great glory. Now when these things begin to happen, look up and lift up your heads, because your redemption draws near."" Luke 21:25-28 NKJV</p>
                </blockquote>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">⚔️ ISIS and Jonah's Tomb</p>
                <p>Even if none of this was true, shouldn't we be getting ready and helping others do the same? Of course we should—before Jesus left this was the church's mission. It's called the Great Commission to go out and save that which is lost!</p>
                
                <p>Think about this—the evil Assyrians in Jonah's day are like the same people in our present day called ISIS. A few years ago back I was watching the news and they was reporting on how the terrorists called ISIS are an Assyrian based group and they bombed the tomb of Jonah. When I saw this it was a confirmation for me to write this book. The reason why they bombed Jonah's tomb was because he brought the Word of the Lord first to the city of Nineveh. I believe we have many signs of Jonah in our lifetime appearing and it's time to stop running from the call and start running to the call that God has placed on our life.</p>
                
                <p>The reason why ISIS destroyed the tomb of Jonah was because they despised the Word of the Lord and the man that brought the word. Just like the enemy wants to destroy us because Jesus gave us an assignment to spread the word of The Lord—but I'm here to remind you that greater is He who lives in us than he who lives in the world (1st John 4:4).</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">💡 What Will You Do?</p>
                <p>So we know we have the signs all around us, so the question is what are we going to do about it? We can like every sign, ignore it, or yield to it and follow it. What will you do with the sign that has been given to you?</p>
                
                <p>It's time to destroy the kingdom of darkness by serving the Kingdom of light! Let's shine the light to a world that's not paying attention to the signs around them. The only way we can do that is becoming a sign for them, pointing people to Christ Jesus by our words, thoughts, actions, and deeds.</p>
                
                <p>You might say well, isn't that for the servants of the church to do? Look what Paul the apostle told ALL Christians that their ministry was:</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new. Now all things are of God, who has reconciled us to Himself through Jesus Christ, and has given us the ministry of reconciliation, that is, that God was in Christ reconciling the world to Himself, not imputing their trespasses to them, and has committed to us the word of reconciliation. Now then, we are ambassadors for Christ, as though God were pleading through us: we implore you on Christ's behalf, be reconciled to God. For He made Him who knew no sin to be sin for us, that we might become the righteousness of God in Him."" II Corinthians 5:17-21 NKJV</p>
                </blockquote>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 text-center">
                <p className="text-lg font-semibold mb-4 text-purple-300">🎯 The Call to Action</p>
                <p>One of the definitions for reconciliation is "The restoration of friendly relations." The Bible says to be friends with the world makes you an enemy with God (James 4:4).</p>
                
                <p>If you call yourself a Christian, every one of us has this ministry that God has given us. He expects us to walk in it—to help those who are in the world, participating in evil activity, and have befriended the world. To plead with them to come back to God and be a sign to them, pointing them to the true friend that sticks closer than a brother—Jesus! <span className="text-purple-300 font-semibold">In short, become the Jonah to your Nineveh!</span></p>
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
                onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Timothy+3-4&version=NLT', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📖 Read 2 Timothy 3–4 (NLT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


