import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";
import chapter3Text from "./content/dont-be-a-jonah-ch3.txt?raw";

export default function DontBeAJonahPlayerCh3() {
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
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 3</h1>
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
                <p className="text-white/90 text-xl font-semibold">Chapter 3 🐋</p>
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
                src="/uploads/textbook-audio/dont-be-a-jonah-ch3.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 3: Deep Depression</h2>
              
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-300">📖 Understanding Depression</h3>
                <p>I recently read part of an article describing depression as follows:</p>
                <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30 mt-4">
                  <p className="text-sm italic">Depression, in psychology, a mood or emotional state that is marked by feelings of low self-worth or guilt and a reduced ability to enjoy life. A person who is depressed usually experiences several of the following symptoms:</p>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-sm">
                    <li>Feelings of sadness, hopelessness, or pessimism</li>
                    <li>Lowered self-esteem and heightened self-depreciation</li>
                    <li>A decrease or loss of ability to take pleasure in ordinary activities</li>
                    <li>Reduced energy and vitality</li>
                    <li>Slowness of thought or action</li>
                    <li>Loss of appetite</li>
                    <li>Disturbed sleep or insomnia</li>
                  </ul>
                </div>
                <p className="mt-4">The world tries to fix depression in many ways such as psychiatrists, drugs, drinking, relationships with people, and even suicide.</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-300">📖 Jonah's Downward Spiral</h3>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"But Jonah rose up to flee unto Tarshish from the presence of the Lord, and went down to Joppa; and he found a ship going to Tarshish: so he paid the fare thereof, and went down into it, to go with them unto Tarshish from the presence of the Lord. But the Lord sent out a great wind into the sea, and there was a mighty tempest in the sea, so that the ship was like to be broken. Then the mariners were afraid, and cried every man unto his god, and cast forth the wares that were in the ship into the sea, to lighten it of them. But Jonah was gone down into the sides of the ship; and he lay, and was fast asleep."</p>
                  <p className="text-sm text-gray-300 mt-2">— Jonah 1:3-5 KJV</p>
                </blockquote>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-red-300">😴 The Sleep of Depression</h3>
                <p className="text-lg font-semibold mb-4 text-red-300">One of the most common clinical sicknesses around the world is depression! One of the most common side effects of depression is wanting to sleep.</p>
                
                <p className="mb-4">Why? You don't want to face the day—you would rather sleep your life away than face it. As soon as Jonah gets on the boat he goes to sleep. Many of us are trying to sleep through our lives because we don't want to face the things that come against us.</p>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">⚠️ Spiritual Warning:</p>
                  <p>The worst thing about depression is that it causes a spiritual sleep in the believer that brings them to a place where they don't want to do anything for the Lord any more.</p>
                </div>
                
                <blockquote className="border-l-4 border-red-400 pl-4 mt-4 italic text-gray-200">
                  <p>"But their evil intentions will be exposed when the light shines on them, for the light makes everything visible. This is why it is said, 'Awake, O sleeper, rise up from the dead, and Christ will give you light.' So be careful how you live. Don't live like fools, but like those who are wise. Make the most of every opportunity in these evil days."</p>
                  <p className="text-sm text-gray-300 mt-2">— Ephesians 5:13-16 NLT</p>
                </blockquote>
                
                <p className="mt-4 text-lg font-semibold text-center text-green-300">Hopefully this chapter will wake you up to this attack of depression.</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-purple-300">📉 The Downward Spiral</h3>
                <p>Jonah begins a spiral downwards as soon as he runs from the call God placed on his life. Think about it—he goes down to Joppa, down in the boat, and he ends up going down in the belly of the fish!</p>
                
                <p className="text-lg font-semibold text-center text-purple-300 mb-4">When you're not accepting God's call on your life you will be brought down low!</p>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30 mb-4">
                  <p className="font-semibold text-blue-300 mb-2">🏔️ Hills and Valleys:</p>
                  <p>Think about hills and valleys. A valley always comes between two hills. Another word for valley is depression. When a person is depressed they are in a spiritual valley! This is why the enemy wants to bring you down low.</p>
                </div>
                
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-200">
                  <p>"I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the Lord, which made heaven and earth. He will not suffer thy foot to be moved: he that keepeth thee will not slumber. Behold, he that keepeth Israel shall neither slumber nor sleep."</p>
                  <p className="text-sm text-gray-300 mt-2">— Psalms 121:1-4 KJV</p>
                </blockquote>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-orange-300">⛰️ The Valley Experience</h3>
                <p>There is always one hill behind and one hill in front of a valley. When a person is in a spiritual valley, they look back to the hill of blessing where they were and they feel regret and condemnation because they were in a place of blessing but something made them fall. They look to the hill in front of them and think it's too hard to get where they need to be, so they just end up settling in the valley.</p>
                
                <p className="text-lg font-semibold text-center text-red-300 mb-4">It is a sad truth that many people never make it out because they never obey the call to get out and help others do the same.</p>
                
                <div className="bg-green-900/20 p-4 rounded border border-green-400/30 mb-4">
                  <p className="font-semibold text-green-300 mb-2">💀 The Valley of Dry Bones:</p>
                  <p>You kind of see the consequences of those who do not make a decision to get out of a valley illustrated in the book of Ezekiel in chapter 37. God takes Ezekiel and shows him an entire valley of dry bones! But the prophet Ezekiel listened to God and prophesied to those bones and they got out of that valley!</p>
                  
                  <p className="mt-3 text-lg font-semibold text-green-300">I'm prophesying in the name of Jesus you'll get out of yours too! Say Amen!</p>
                </div>
                
                <p>In Psalms 23 the psalmist said, "though I walk through the valley I will fear no evil because I'm with the shepherd."</p>
                
                <p className="text-lg font-semibold text-center text-orange-300">Jonah wasn't willing to obey the shepherd's voice. He was like the sheep that wandered rebelliously and refused to answer the call, so he was brought down low in a spiritual valley!</p>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-300">👁️ God's Revelation: The Spirit of Heaviness</h3>
                <p>God showed me the spirit that is at work in the hearts of the people that are dealing with depression. You see our battle isn't against flesh and blood but against spiritual forces. He showed me this when I was eating at a restaurant one day and I noticed a man I knew in the restaurant that attended our church but was missing regular church attendance for months.</p>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30 mb-4">
                  <p className="font-semibold text-blue-300 mb-2">🍽️ The Restaurant Experience:</p>
                  <p>So I went up to him, shook his hand and greeted him, and asked how he was doing. He said he was fine. We talked for a few minutes, then we both went back to our tables and a few moments later some people with me at the table asked if I was ok. They asked this because I looked discouraged and was very quiet. I told them I was fine, but they were right; I felt discouraged and depressed.</p>
                  
                  <p className="mt-3">I wasn't earlier, so I began to ask God what was going on with me. He ministered to me that the feelings and emotions I was feeling of depression and hopelessness were because the man that was in the restaurant with me was feeling the same mixed emotions!</p>
                </div>
                
                <div className="bg-red-900/20 p-4 rounded border border-red-400/30 mb-4">
                  <p className="font-semibold text-red-300 mb-2">🔍 The Spirit of Heaviness:</p>
                  <p>God revealed to me the spirit that was bothering him was the spirit of heaviness. We read about this spirit in the book of Isaiah 61:3, when God says he turn beauty into ashes and provide a garment of praise in exchange for a spirit of heaviness.</p>
                  
                  <p className="mt-3">I began to read up and study about the spirit of heaviness right there in the restaurant and found out that this spirit makes you feel:</p>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Hopeless</li>
                    <li>Discouraged</li>
                    <li>Robs your faith</li>
                    <li>Makes you think no one cares</li>
                    <li>Like no one loves you</li>
                    <li>Stops your praise because you don't feel good enough to serve God</li>
                    <li>Brings thoughts of suicide!</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-green-300">🙏 The Power of Prayer and Truth</h3>
                <p>So after finding all this out I went back to the man's table and asked if I can speak to him privately. He agreed and I asked him if he felt any of these things I just mentioned. He said, "Pastor, how do you know all this? I feel every one of these things you just described."</p>
                
                <p className="mb-4">I began to tell him that God allowed me to feel what he was feeling to minister the truth to him and to expose the lies of the enemy! We began to pray right there in the restaurant against the attack of the spirit of heaviness.</p>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">⚠️ The Root Cause:</p>
                  <p>The reason this man was able to be attacked, and for this attack to work on him, was because he was living a lifestyle of sin and rebelliousness towards God. He was running from His call!</p>
                </div>
                
                <p className="text-lg font-semibold text-center text-green-300">The Bible tells us in God's presence there is fullness of joy (Psalms 16:11), and where the Spirit of the Lord is there is freedom! (2 Corinthians 3:17)</p>
                
                <p className="mt-4">But remember, the Bible tells us Jonah was running from the presence of God! When you run from your call you run from God's presence! Outside His presence it's the opposite of joy—it's depression! Outside of His presence is bondage and burdens!</p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-red-300">💀 The Ultimate Consequence: Suicide</h3>
                <p>When depression isn't taken care of it gets to a point of thoughts of suicide. Jonah comes to a point of telling the people to throw him overboard. He even tells God at one point it's better for him to die. He would rather die than do what God has called him to do.</p>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30 mb-4">
                  <p className="font-semibold text-blue-300 mb-2">📖 Hebrew Definition:</p>
                  <p>One of the Hebrew definitions for depression is dĕ'agah, which means anxiety, fear, heaviness, or sorrow.</p>
                </div>
                
                <div className="bg-green-900/20 p-4 rounded border border-green-400/30 mb-4">
                  <p className="font-semibold text-green-300 mb-2">🙏 The Solution:</p>
                  <p>How do you deal with anxiety? Simply submit your life to God's will and instead of trying to deal with your problems alone and complain about them, pray about them and put it before the Lord.</p>
                </div>
                
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>"In nothing be anxious; but in everything by prayer and supplication with thanksgiving let your requests be made known unto God."</p>
                  <p className="text-sm text-gray-300 mt-2">— Philippians 4:6 ASV</p>
                </blockquote>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-purple-300">✨ God's Promise Through Isaiah</h3>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-200">
                  <p>"The Spirit of the Lord God is upon me; because the Lord hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound; To proclaim the acceptable year of the Lord, and the day of vengeance of our God; to comfort all that mourn; To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they might be called trees of righteousness, the planting of the Lord, that he might be glorified."</p>
                  <p className="text-sm text-gray-300 mt-2">— Isaiah 61:1-7 KJV</p>
                </blockquote>
                
                <p className="text-lg font-semibold text-center text-purple-300">Look at the beautiful promise proclaimed through the prophet Isaiah regarding the Messiah. It's a promise that Jesus will fulfill for those who receive Him.</p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-red-300">⚠️ Personal Testimony: My Battle with Depression</h3>
                <div className="bg-gray-800/30 p-4 rounded border border-gray-600/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">💔 My Story:</p>
                  <p>Before I accepted the call that God placed on my life I was very rebellious and disobedient. I went to church, worshipped God, gave in the offering, and even told people about how good God was; however, secretly I was fighting depression because no matter what I accomplished and what I tried to do to be happy, it didn't work.</p>
                  
                  <p className="mt-3">It's because I had religion but not a true relationship with God. I wasn't willing to obey God and repent of my sinful and rebellious lifestyle. The depression got so bad that <strong className="text-red-300">twice I tried committing suicide.</strong></p>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30 mb-4">
                  <p className="font-semibold text-blue-300 mb-2">💊 The Final Attempt:</p>
                  <p>The last time I tried I took a whole bottle of pills and fell asleep, but an hour later I got up out of my sleep throwing up. My cousin that was in the house called my uncle, and when he saw me he knew there was something wrong. I wouldn't tell them what I did, and at this point I was delusional and talking crazy.</p>
                  
                  <p className="mt-3">So they forced me in a car, drove me to the emergency room, and the doctors found out what I had done and immediately began the process to help me. Three days later a doctor came in and told me <strong className="text-blue-300">if the pills would have been in my system for another hour or so I would have been dead!</strong></p>
                </div>
                
                <p className="text-lg font-semibold text-center text-green-300 mb-4">I thank God because he allowed me to live and not die so I can warn people about not running from their calling and start serving God so they can receive the fullness of joy and help others do the same.</p>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">💡 Warning Signs:</p>
                  <p>I also have personal friends that have committed suicide. The sad part is I never knew they were dealing with suicidal thoughts. I never knew they were being attacked with depression. If I had known then what I know now, I would have known how to help them. <strong className="text-yellow-300">The biggest sign of a person that's dealing with depression is a person running from serving God!</strong></p>
                </div>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-green-300">🤝 Helping Others</h3>
                <p>Maybe you're not dealing with the spirit of heaviness but maybe you know someone who isn't willing to serve God and obey the calling that God has placed on their life. Allow them to read this chapter. After you're done reading this book, give it to a person that needs a word of hope in the midst of their depression—you never know, you might just save a life!</p>
                
                <p>God comforts the depressed and He also uses people to help others who are depressed. Titus, a companion of Paul the apostle, was used to encourage Paul and others by just being there for them:</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mt-4 italic text-gray-200">
                  <p>"For even when we arrived in Macedonia our bodies had no rest, but we were oppressed at every turn--conflicts and disputes without, fears and dread within. But God, who comforts and encourages the depressed and the disquieted, comforted us by the arrival of Titus."</p>
                  <p className="text-sm text-gray-300 mt-2">— 2 Corinthians 7:5-6 AMP</p>
                </blockquote>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 text-center">
                <h3 className="text-xl font-bold mb-4 text-purple-300">🎯 Final Encouragement</h3>
                <p className="text-lg font-semibold mb-4 text-purple-300">Don't allow depression to get the best of you; deal with it and allow God to remove the spirit of heaviness and place on you the garment of praise.</p>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">👕 Put On Your Praise:</p>
                  <p>Just like a garment, you have to put it on! Start putting your praise on again—get your prayer life back and get in His word, for it's the medicine for the soul and it's the only medicine you need for fighting deep depression in Jesus' name!</p>
                </div>
                
                <p className="text-2xl font-bold text-center text-green-300">You are not alone! God is with you and He will bring you through!</p>
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
                onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+3&version=NLT', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📖 Read 1 Timothy 3 (NLT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


