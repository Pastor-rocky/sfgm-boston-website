import React, { useRef, useState, useEffect } from "react";
import chapter2Text from "./content/dont-be-a-jonah-ch2.txt?raw";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";

export default function DontBeAJonahPlayerCh2() {
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
            <div className="flex gap-2">
              <Button onClick={() => setLocation("/course/3")} variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Course
              </Button>
              <Button onClick={() => setLocation("/dont-be-a-jonah-complete-book")} variant="outline" className="text-white border-white/20 hover:bg-white/10">
                📖 Full Book
              </Button>
            </div>
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 2</h1>
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
                <p className="text-white/90 text-xl font-semibold">Chapter 2 🐋</p>
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
                src="/uploads/textbook-audio/dont-be-a-jonah-ch2.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 2: The Bitter Root</h2>
              
              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-300">📖 Scripture Foundation</h3>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Work at living in peace with everyone, and work at living a holy life, for those who are not holy will not see the Lord. Look after each other so that none of you fails to receive the grace of God. Watch out that no poisonous root of bitterness grows up to trouble you, corrupting many."</p>
                  <p className="text-sm text-gray-300 mt-2">— Hebrews 12:14-15 NLT</p>
                </blockquote>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-red-300">🤔 Why Was Jonah Against God's Mission?</h3>
                <p>The people of Nineveh were Assyrians, and the Assyrians were enemies of the Jewish people. Theologians and scholars believe that the Assyrians killed Jonah's family and friends. I believe this is confirmed as truth because we see that when God showed mercy to the people of Nineveh, Jonah was angry about it.</p>
                
                <blockquote className="border-l-4 border-red-400 pl-4 mt-4 italic text-gray-200">
                  <p>"So he complained to the Lord about it: 'Didn't I say before I left home that you would do this, Lord? That is why I ran away to Tarshish! I knew that you are a merciful and compassionate God, slow to get angry and filled with unfailing love. You are eager to turn back from destroying people.'"</p>
                  <p className="text-sm text-gray-300 mt-2">— Jonah 4:2 NLT</p>
                </blockquote>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-purple-300">🌱 The Root of the Problem</h3>
                <p className="text-lg font-semibold mb-4 text-purple-300">The root of the problem was bitterness; he allowed a bitter root to set in his heart.</p>
                
                <p className="mb-4">I guess he had a good reason to be bitter. What do I mean?</p>
                
                <div className="bg-gray-800/30 p-4 rounded border border-gray-600/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">💀 Think about modern day ISIS:</p>
                  <p>This terrorist group targets Christians and they are very cruel to the people they fight against; they are known for:</p>
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>Amputating their victim's body parts</li>
                    <li>Cutting their heads off</li>
                    <li>Parading their victim's dead bodies in the streets</li>
                    <li>Killing men, women, and children without remorse or regret</li>
                  </ul>
                  <p className="mt-3 font-semibold text-red-300">Many of the ISIS terrorists are from Assyria!</p>
                </div>
                
                <p>The Assyrians in Jonah's day were the modern day ISIS. They were very cruel to the Jewish people and they had no mercy for anyone; they brought terror and destruction wherever they went. I'm sure Jonah thought about all this when God told him to help the very people that were hurting Jonah's family and friends, and because of this he ran from his calling.</p>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-orange-300">⚠️ The Problem of Bitterness</h3>
                <p>So the reason why Jonah was so against what God wanted him to do is because he was bitter. One of the biggest problems in the world in general and even in the church is bitterness. A bitter root doesn't just develop in a person's life over night; it all starts with a person being offended. Jesus even told us in the end times many people will be offended.</p>
                
                <blockquote className="border-l-4 border-orange-400 pl-4 mt-4 italic text-gray-200">
                  <p>"And then shall many be offended, and shall betray one another, and shall hate one another."</p>
                  <p className="text-sm text-gray-300 mt-2">— Matthew 24:10 KJV</p>
                </blockquote>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-300">🎣 The Bait of Satan</h3>
                <p>I read a book called "The Bait of Satan" by John Bevere. In this book the author explains the dangers of being offended and allowing the enemy to instill bitterness in a person's heart. The word for "offense" found in Matthew 24:10 is the greek word skandalon. It is where we get our English word for scandal. The word skandalon was also the name of a lever that sets off a trap and catches the victim in its claws because they fell for the bait that was connected to the lever.</p>
                
                <div className="bg-red-900/20 p-4 rounded border border-red-400/30 mt-4">
                  <p className="font-semibold text-red-300 mb-2">🚨 Warning:</p>
                  <p>People today don't realize that the enemy is trapping them in offense, which leads to bitterness because they keep falling for the bait of Satan.</p>
                </div>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-300">💔 Forms of Offense</h3>
                <p>This comes in many forms, like maybe:</p>
                <ul className="list-disc list-inside ml-6 mb-4 space-y-2">
                  <li>God didn't answer your prayer so now you're bitter at God</li>
                  <li>A certain person didn't acknowledge you or didn't show you the affection you thought they should</li>
                  <li>A pastor that didn't do what you expected him to do</li>
                  <li>A family member that didn't come through</li>
                  <li>A friend that let you down</li>
                  <li>Someone who hurt you or someone close to you</li>
                </ul>
                
                <p>Whatever it is that offended you it then becomes a scandal! You start complaining about it and telling others how you were done wrong. The people that you tell don't know both sides of the story fully, so they side with you and then that makes you feel justified as if you are in the right about the wrong that was done to you.</p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-red-300">😡 The Progression: Hurt → Anger → Bitterness</h3>
                <p>Then the hurt sets in and you start having a pity party. How they did you wrong and how you don't deserve this treatment, and because of this you start getting angry. You're angry because it's not resolved and they haven't said they are sorry, and they feel that they're right and you're wrong.</p>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30 mt-4">
                  <p className="font-semibold text-yellow-300 mb-2">⚠️ Critical Warning:</p>
                  <p>Anger then gives a foothold to the enemy: <em>"for anger gives a foothold to the devil"</em> (Ephesians 4:27 NLT). Always remember, if someone is controlling your feet they are also controlling your direction!</p>
                </div>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-300">👥 The Story of Cain and Abel</h3>
                <p>Think about Cain and Abel. Cain got so angry because he was offended that God didn't receive his offering, and because of this he took it out on his brother because Abel's offering was accepted and his offering was rejected.</p>
                
                <p>God warned Cain that the enemy was at the door and wanted to rule over him. God tried to get him to control his anger but Cain didn't listen.</p>
                
                <blockquote className="border-l-4 border-red-400 pl-4 mt-4 italic text-gray-200">
                  <p>"Why are you so angry?" the Lord asked Cain. "Why do you look so dejected? You will be accepted if you do what is right. But if you refuse to do what is right, then watch out! Sin is crouching at the door, eager to control you. But you must subdue it and be its master."</p>
                  <p className="text-sm text-gray-300 mt-2">— Genesis 4:6-7 NLT</p>
                </blockquote>
                
                <div className="bg-red-900/20 p-4 rounded border border-red-400/30 mt-4">
                  <p className="font-semibold text-red-300 mb-2">💀 The Result:</p>
                  <p>His anger controlled him, resulting in the first murder. Cain's anger became a bitterness in his heart, and like Hebrews says a bitter root will defile many around you. His bitterness killed his brother. Your bitterness will also spiritually kill you and those around you.</p>
                </div>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-green-300">💚 The Truth About Love and Forgiveness</h3>
                <p>You might say yes, but even though I have anger and bitterness God knows in my heart I still love Him? The Bible says otherwise:</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mt-4 italic text-gray-200">
                  <p>"If a man say, I love God, and hateth his brother, he is a liar: for he that loveth not his brother whom he hath seen, how can he love God whom he hath not seen? And this commandment have we from him, That he who loveth God love his brother also."</p>
                  <p className="text-sm text-gray-300 mt-2">— 1 John 4:20-21 KJV</p>
                </blockquote>
                
                <p className="mt-4 text-lg font-semibold text-center text-green-300">No matter what people have done to you and have done to the people around you, we have to forgive them no matter what.</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-purple-300">📖 The Parable of the Unforgiving Servant</h3>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Then Peter came to him and asked, 'Lord, how often should I forgive someone who sins against me? Seven times?' 'No, not seven times,' Jesus replied, 'but seventy times seven!'"</p>
                  <p className="text-sm text-gray-300 mt-2">— Matthew 18:21-35 NLT</p>
                </blockquote>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30 mt-4">
                  <p className="font-semibold text-blue-300 mb-2">📝 Key Points from the Parable:</p>
                  <ul className="list-disc list-inside ml-6 space-y-1">
                    <li>The master forgave a huge debt (millions of dollars)</li>
                    <li>The forgiven servant refused to forgive a small debt (few thousand dollars)</li>
                    <li>The master was angry and sent the unforgiving servant to prison</li>
                    <li>Jesus said: "That's what my heavenly Father will do to you if you refuse to forgive your brothers and sisters from your heart."</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">🔓 The Prison of Unforgiveness</h3>
                <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-200">
                  <p>"I tell you, you can pray for anything, and if you believe that you've received it, it will be yours. But when you are praying, first forgive anyone you are holding a grudge against, so that your Father in heaven will forgive your sins, too."</p>
                  <p className="text-sm text-gray-300 mt-2">— Mark 11:24-25 NLT</p>
                </blockquote>
                
                <p className="text-lg font-semibold text-center text-yellow-300 mb-4">"Un-forgiveness is a prison and when you forgive you let the prisoner go—and then you realize the prisoner was you!"</p>
                
                <p>No matter how bad the people of Nineveh were, God wanted Jonah to minister His word so the people could repent and receive His love and mercy. Because of the bitter root Jonah had he was running from the very reason he was created and called to serve God.</p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-red-300">⚠️ Personal Testimony: A Mother's Murder</h3>
                <div className="bg-gray-800/30 p-4 rounded border border-gray-600/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">💔 My Personal Story:</p>
                  <p>About two years before I answered the call to become a minister, one of the hardest things in my life happened to me. That was the enemy's way to try to make me become offended at God, angry at a person, and bitter because of what happened.</p>
                  
                  <p className="mt-3"><strong>My mother was murdered and it was her husband, my stepfather that did it!</strong></p>
                  
                  <p className="mt-3">He was a cruel, evil man that had accusations against him of murdering others in the past before he ever murdered my mother. I tried to tell my mother not to marry him and I even tried to tell her to leave him weeks before she was murdered by him, but she wouldn't listen.</p>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30 mb-4">
                  <p className="font-semibold text-blue-300 mb-2">🏥 The Hospital Experience:</p>
                  <p>One day I got a phone call that she was on life support from a head injury. I took the next flight out from Chicago to New York. When I finally got to the hospital, I thought I was going to fight with this man that did this to my mother.</p>
                  
                  <p className="mt-3">I entered the hospital room and I saw my mother, who was only forty-one years old at the time, filled with hoses and connected to machines. There were scars on her arms and neck from what looked like a fight she was in from a few weeks before when I spoke to her about leaving him.</p>
                </div>
                
                <div className="bg-green-900/20 p-4 rounded border border-green-400/30 mb-4">
                  <p className="font-semibold text-green-300 mb-2">✝️ God's Intervention:</p>
                  <p>I soon began to pray and ask God to help my mother and take her out of the coma she was in. After I finished praying I sat down and began to read the Bible. As I was reading the Bible, moments later the man that put my mother in a coma and murdered her walked in!</p>
                  
                  <p className="mt-3">I got off my chair and stood up thinking I'm gonna fight with this man, but something happened—<strong className="text-green-300">God filled me with peace and love; I couldn't believe it!</strong></p>
                  
                  <p className="mt-3">I began to tell him about Jesus and how only Jesus could help my mother, because he told me he prays to a saint called Guadalupe. I told him how Jesus was the one true God.</p>
                </div>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-purple-300">🤝 The Power of Forgiveness</h3>
                <p>The day I had to sign the papers to pull the plug on the life support that was keeping my mother in a comatose state, I was in the room with my mother and he walked in. When I saw him I began to argue with him and told him I wasn't crazy and told him to get out of the room.</p>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">🙏 God's Instruction:</p>
                  <p>As soon as he left the room, God began to minister to me to go and tell him I was sorry! I said, "God, why would you want me to do this? You know what he did." God told me, <em>"I'm going to use you to display my love through your forgiveness and obedience."</em></p>
                  
                  <p className="mt-3">I shook my head in amazement; I then walked out of the room, went up to him, and said I'm sorry!</p>
                </div>
                
                <p className="text-lg font-semibold text-center text-purple-300 mb-4">If God gave me the strength to forgive and show love in a tragedy I believe He can give you the same strength as well. Ask and you will receive!</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-green-300">✝️ Jesus Took Our Bitterness</h3>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"They gave him vinegar to drink mingled with gall: and when he had tasted thereof, he would not drink."</p>
                  <p className="text-sm text-gray-300 mt-2">— Matthew 27:34 KJV</p>
                </blockquote>
                
                <p>The Greek word here for "gall" is chole; it translates to bitterness! It's a word that means to greedily devour. Basically, <strong className="text-green-300">Jesus ate bitterness so bitterness won't eat away at you!</strong></p>
                
                <p className="mt-4 text-lg font-semibold text-center text-green-300">Jesus taking bitterness on the cross is a picture of prophetic fulfillment of Exodus chapter fifteen!</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-300">🌊 The Story of Marah</h3>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"And when they came to Marah, they could not drink of the waters of Marah, for they were bitter: therefore the name of it was called Marah... And he cried unto the Lord; and the Lord shewed him a tree, which when he had cast into the waters, the waters were made sweet... And said, If thou wilt diligently hearken to the voice of the Lord thy God, and wilt do that which is right in his sight... I am the Lord that healeth thee."</p>
                  <p className="text-sm text-gray-300 mt-2">— Exodus 15:23-26 KJV</p>
                </blockquote>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">🏥 God as Healer:</p>
                  <p>Think about this. The first time God ever reveals His character as a healer—"I am The Lord that healeth"—he is not opening deaf ears or blind eyes or even raising up a lame man or any other form of physical sickness. Nope, it was a representation that He wants to heal you from your bitterness because bitterness is a cancer to the soul!</p>
                </div>
                
                <div className="bg-red-900/20 p-4 rounded border border-red-400/30 mb-4">
                  <p className="font-semibold text-red-300 mb-2">⚠️ Medical Warning:</p>
                  <p>Doctors are even reporting that a person that holds on to grudges and has bitterness actually is more likely to develop cancer! It's not worth it; it's time to let it GO!</p>
                </div>
                
                <p>The tree they threw in the water was a representation of the cross and the bitterness Jesus took! It's time to start putting Jesus in your life again and then the bitterness will be gone and life will be sweet again.</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 text-center">
                <h3 className="text-xl font-bold mb-4 text-purple-300">🎯 Final Challenge</h3>
                <p className="text-lg font-semibold mb-4 text-purple-300">Maybe without realizing it you are running from God's call and purpose for your life because you have been hurt and you are not willing to resolve the problem by forgiving and forgetting?</p>
                
                <p className="mb-4">If that's the case it's time to let it go and release the person(s) that have hurt and hindered you from the call that is on your life. Don't let it happen; stop holding onto something Jesus died to forgive!</p>
                
                <div className="bg-red-900/20 p-4 rounded border border-red-400/30 mb-4">
                  <p className="font-semibold text-red-300 mb-2">🚨 DON'T ALLOW BITTERNESS TO:</p>
                  <ul className="list-disc list-inside ml-6 space-y-1">
                    <li>Stop your prayers from being answered</li>
                    <li>Stop your gift of worship for Jesus</li>
                    <li>Give the enemy control of your life</li>
                    <li>Allow demonic tormentors to hinder you</li>
                    <li>Break your relationship with your Heavenly Father</li>
                  </ul>
                </div>
                
                <p className="text-2xl font-bold text-center text-yellow-300 mb-4">NO ONE IS WORTH LOSING ALL THAT! LET IT GO!</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 italic text-gray-200">
                  <p>"Blessed are the merciful: for they shall obtain mercy."</p>
                  <p className="text-sm text-gray-300 mt-2">— Matthew 5:7 KJV</p>
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
                onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+2&version=NLT', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📖 Read 1 Timothy 2 (NLT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


