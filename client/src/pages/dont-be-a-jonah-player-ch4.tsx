import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";
import chapter4Text from "./content/dont-be-a-jonah-ch4.txt?raw";

export default function DontBeAJonahPlayerCh4() {
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
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 4</h1>
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
                <p className="text-white/90 text-xl font-semibold">Chapter 4 🐋</p>
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
                src="/uploads/textbook-audio/dont-be-a-jonah-ch4.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 4: The Isolation Trap</h2>
              
              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-red-300">🚨 The Danger of Isolation</h3>
                <p>I want to spend just a few moments in this chapter discussing the dangers of being isolated.</p>
                
                <p className="text-lg font-semibold mb-4 text-red-300">Jonah was always by himself, alone in the ship, alone on the mountain. He was always alone.</p>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">⚠️ Why?</p>
                  <p>Because the enemy wants to get you alone to speak his lies and make you feel like you are by yourself and no one cares.</p>
                </div>
                
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>"A man who isolates himself seeks his own desire; He rages against all wise judgment."</p>
                  <p className="text-sm text-gray-300 mt-2">— Proverbs 18:1</p>
                </blockquote>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-300">📖 The Hebrew Word for Isolation</h3>
                <p>The Hebrew word for isolation here is the word parad. It means to:</p>
                <ul className="list-disc list-inside ml-6 mb-4 space-y-1">
                  <li>Separate</li>
                  <li>Break into pieces</li>
                  <li>To divide</li>
                  <li>To make a division</li>
                  <li>Be out of joint</li>
                  <li>And to break</li>
                </ul>
                <p className="text-sm text-gray-300">(BLB Lexicon)</p>
                
                <p className="mt-4">When you search the Bible you will see it is often when people were alone when the enemy attacked them with discouragement and temptation the most. This caused them to be separated from the people that cared for them. It lead to divisions and even caused people to break God's law—breaking covenant with God!</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-purple-300">🔥 Example 1: Elijah's Isolation</h3>
                <p>For instance, look at what took place with Elijah in the book of 1 Kings. We see that he just experienced a major victory from the Lord, defeating the 850 false prophets of the evil Queen Jezebel. He had help killing all these false prophets because the people of Israel helped him.</p>
                
                <div className="bg-gray-800/30 p-4 rounded border border-gray-600/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">💥 After the Victory:</p>
                  <p>Something happened after the victory, though—Jezebel found out and sent messengers to threaten Elijah. This is what she said:</p>
                </div>
                
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Then Jezebel sent a messenger to Elijah, saying, 'So may the gods do to me and even more, if I do not make your life as the life of one of them by tomorrow about this time.' And he was afraid and arose and ran for his life and came to Beersheba, which belongs to Judah, and left his servant there. But he himself went a day's journey into the wilderness, and came and sat down under a juniper tree; and he requested for himself that he might die, and said, 'It is enough; now, O LORD, take my life, for I am not better than my fathers.'"</p>
                  <p className="text-sm text-gray-300 mt-2">— 1 Kings 19:2-4 NASB</p>
                </blockquote>
                
                <div className="bg-red-900/20 p-4 rounded border border-red-400/30 mb-4">
                  <p className="font-semibold text-red-300 mb-2">⚠️ The Result:</p>
                  <p>This caused Elijah to run away from Jezebel, resulting in him being alone, driven by fear and isolated from everyone. While Elijah was with his people and they were unified in taking out the enemy he had victory, but as soon as the enemy isolated him, he began expressing his desire to just die!</p>
                  
                  <p className="mt-3">He also exaggerated about how he was the "only" one left out of God's people. God reassured him that there were still 7000 people left that didn't bow down to the idolatry Israel had fallen into. (1 Kings 19:18)</p>
                </div>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-orange-300">🎯 The Enemy's Strategy</h3>
                <p className="text-lg font-semibold mb-4 text-orange-300">This is why the enemy wants to get you alone—to feel like you're the "only" one going through this, you're the "only" one suffering.</p>
                
                <p>Then you begin to exaggerate your situation, even though God took you through your biggest battles and you knew you were not alone. You end up running from the lie of the enemy because he has isolated you and such despair has set it that you no longer even want to be around people that can encourage you and lift you up!</p>
                
                <p className="text-lg font-semibold text-center text-red-300 mt-4">Because of this, like Elijah we sometimes feel like giving up and saying well we might as well die! We give up hope.</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-green-300">👑 Example 2: King David's Isolation</h3>
                <p>Another Example is King David. One time while David was king of Israel, he stayed home from a battle instead of leading his army. Kings were supposed to be on the battle field with their men. David felt like his men could take care of the battle, and besides he wanted to be lazy and he slept in that day.</p>
                
                <div className="bg-red-900/20 p-4 rounded border border-red-400/30 mb-4">
                  <p className="font-semibold text-red-300 mb-2">🔍 The Enemy's Trap:</p>
                  <p>The enemy got him by himself, and led David out onto the balcony of his palace where he saw a woman named Bathsheba taking a bath. The enemy got him isolated! David fell for the lust of the eye and ended up committing adultery and even had Bathsheba's husband Uriah murdered to cover up his sin. (2 Samuel 11)</p>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30 mb-4">
                  <p className="font-semibold text-blue-300 mb-2">👁️ God's Revelation:</p>
                  <p>We find out through the prophet Nathan that David wasn't alone in the spirit realm; the enemy was there with him! The prophet illustrates God's point about how he feels about David's sinful actions. Nathan uses a story about a man that had many sheep and was rich, but took a poor man's one and only sheep that he loved and cared for to prepare it for a "visitor" that visited this rich man.</p>
                  
                  <p className="mt-3"><strong className="text-blue-300">Who was the visitor? The enemy!</strong></p>
                </div>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Nathan then said to David, 'You are the man! Thus says the LORD God of Israel, 'It is I who anointed you king over Israel and it is I who delivered you from the hand of Saul. I also gave you your master's house and your master's wives into your care, and I gave you the house of Israel and Judah; and if that had been too little, I would have added to you many more things like these! Why have you despised the word of the LORD by doing evil in His sight? You have struck down Uriah the Hittite with the sword, have taken his wife to be your wife, and have killed him with the sword of the sons of Ammon. Now therefore, the sword shall never depart from your house, because you have despised Me and have taken the wife of Uriah the Hittite to be your wife.''"</p>
                  <p className="text-sm text-gray-300 mt-2">— 2 Samuel 12:7-10 NASB</p>
                </blockquote>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">💥 The Consequences:</p>
                  <p>This all started when isolation and laziness came into David's life. David condemns himself, hurts his people, loses the first baby that he has with Bathsheba, and because he had blood on his hands due to the murder of Uriah he was not able to build the temple! (1 Chronicles 28:3)</p>
                  
                  <p className="mt-3 text-lg font-semibold text-yellow-300">How did it all start? The isolation trap!</p>
                </div>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-300">📖 Biblical Foundation for Fellowship</h3>
                <p>Look at these Bible verses about the importance and benefits of staying connected to fellow believers...</p>
                
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Again I say to you, that if two of you agree on earth about anything that they may ask, it shall be done for them by My Father who is in heaven. For where two or three have gathered together in My name, I am there in their midst."</p>
                  <p className="text-sm text-gray-300 mt-2">— Matthew 18:19-20 NASB</p>
                </blockquote>
                
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Two are better than one because they have a good return for their labor. For if either of them falls, the one will lift up his companion. But woe to the one who falls when there is not another to lift him up. Furthermore, if two lie down together they keep warm, but how can one be warm alone? And if one can overpower him who is alone, two can resist him. A cord of three strands is not quickly torn apart."</p>
                  <p className="text-sm text-gray-300 mt-2">— Ecclesiastes 4:9-12 NASB</p>
                </blockquote>
                
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"And let us consider how to stimulate one another to love and good deeds, not forsaking our own assembling together, as is the habit of some, but encouraging one another; and all the more as you see the day drawing near."</p>
                  <p className="text-sm text-gray-300 mt-2">— Hebrews 10:24-25 NASB</p>
                </blockquote>
                
                <p className="text-lg font-semibold text-center text-blue-300 mt-4">You can see how these scriptures show us that it is very important to have fellowship and relationships with people of faith to strengthen our own faith and help our walk with Christ.</p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-red-300">💔 Personal Testimony: Breaking Free from Isolation</h3>
                <p>I was in a certain city ministering about Jonah. I was talking about all the information that's in this book, like when you're running from God you will start fighting against God, grow bitter, become depressed and isolated, and go through unnecessary storms.</p>
                
                <div className="bg-gray-800/30 p-4 rounded border border-gray-600/30 mb-4">
                  <p className="font-semibold text-yellow-300 mb-2">🙏 After the Altar Call:</p>
                  <p>After the altar call a person came up to me and said, "Pastor, you don't know how bad I needed to hear this message." She said for three days I've been depressed, mad at everyone, not wanting to be around anyone, and staying in my room in the dark with a knife wanting to kill myself!</p>
                  
                  <p className="mt-3">Then she said, "But now I know it's the enemy and I will stop and do what God wants me to do!" God used that preaching to break her free from the isolation trap!</p>
                </div>
                
                <div className="bg-blue-900/20 p-4 rounded border border-blue-400/30 mb-4">
                  <p className="font-semibold text-blue-300 mb-2">🎭 The Deception:</p>
                  <p>See, we think it's just that we don't want to be around anyone. You might find yourself saying, "I just want to be alone for a little bit and not deal with anything." Or we may say "Everyone's fake—I'd rather just do my own thing." But what you need to understand is the enemy is whispering that in our ear to get us trapped!</p>
                </div>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-purple-300">🤝 The Solution: Get Connected</h3>
                <p className="text-lg font-semibold mb-4 text-purple-300">If you are isolated, you need to get connected to the body of Christ and get under a man of God that can pour into you, and people of God that will care for you.</p>
                
                <p className="text-lg font-semibold text-center text-red-300 mb-4">Don't allow the enemy to trick you into falling into the isolation trap!</p>
                
                <p>Stop allowing the enemy to isolate you, because as we found out it can destroy us and the people around us that we love.</p>
                
                <div className="bg-green-900/20 p-4 rounded border border-green-400/30 mb-4">
                  <p className="font-semibold text-green-300 mb-2">💡 How to Help Others:</p>
                  <p>Do you know someone that's isolated? Go encourage them—call them to a fellowship dinner or invite them to just hang out. Go to them and show them what this chapter says. In doing this you can rescue them from the isolation trap. Don't give up on them!</p>
                  
                  <p className="mt-3 text-lg font-semibold text-green-300">Why? Because Jesus never gave up on you!</p>
                </div>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-300">✝️ Jesus in the Isolation Trap</h3>
                <p>When I was in Israel in 2018 we went to a location where Jesus was placed in a pit for the night before they put him on trial. I was in this pit—it is cold, dark, with no windows, and you feel all alone with no hope.</p>
                
                <p>The psalmist prophesies the Messiah's thoughts and prayer regarding his time in this pit. All of Psalms 88 has this prayer but here's just some of it:</p>
                
                <blockquote className="border-l-4 border-gray-400 pl-4 mb-4 italic text-gray-200">
                  <p>"I am as good as dead, like a strong man with no strength left. They have left me among the dead, and I lie like a corpse in a grave. I am forgotten, cut off from your care. You have thrown me into the lowest pit, into the darkest depths. Your anger weighs me down; with wave after wave you have engulfed me. Interlude You have driven my friends away by making me repulsive to them. I am in a trap with no way of escape."</p>
                  <p className="text-sm text-gray-300 mt-2">— Psalms 88:4-8 NLT (emphasis mine)</p>
                </blockquote>
                
                <div className="bg-red-900/20 p-4 rounded border border-red-400/30 mb-4">
                  <p className="font-semibold text-red-300 mb-2">💝 The Ultimate Sacrifice:</p>
                  <p>Jesus was in the isolation trap of the enemy during the passion of Christ. Why? So you will never have to be! He did it for you so you can be set free of the pity party and be connected to Him and His fellow believers in Jesus' name.</p>
                </div>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 text-center">
                <h3 className="text-xl font-bold mb-4 text-green-300">🎯 Final Call to Action</h3>
                <p className="text-2xl font-bold text-center text-green-300 mb-4">The trap has been open—it's time for you get out!</p>
                
                <p className="text-lg font-semibold mb-4 text-green-300">So don't allow the enemy to make you fall for the isolation trap. Get out, stay out, and help others get out by accepting them for who they are and showing them the love of Christ.</p>
                
                <div className="bg-yellow-900/20 p-4 rounded border border-yellow-400/30">
                  <p className="font-semibold text-yellow-300 mb-2">⚠️ Don't Allow the Enemy:</p>
                  <p>Don't allow the enemy to come and "visit" you and cause you to be isolated. Wake up to it and realize the trap of the enemy!</p>
                  
                  <p className="mt-3">Jonah was just another person caught in the isolation trap and because of this he experienced many negative things he didn't have to.</p>
                </div>
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
                onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+4&version=NLT', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📖 Read 1 Timothy 4 (NLT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


