import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";
import chapter5Text from "./content/dont-be-a-jonah-ch5.txt?raw";

export default function DontBeAJonahPlayerCh5() {
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
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 5</h1>
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
                <p className="text-white/90 text-xl font-semibold">Chapter 5 🐋</p>
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
                src="/uploads/textbook-audio/dont-be-a-jonah-ch5.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 5: Unnecessary Storms</h2>
              
              <div className="mb-6">
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>"But the Lord hurled a powerful wind over the sea, causing a violent storm that threatened to break the ship apart." Jonah 1:4 NLT</p>
                </blockquote>
              </div>

              <p>The Bible says that the storm that was coming against the boat was <span className="text-red-300 font-semibold">because of Jonah!</span> People today are going through things they don't have to because of their rebellious attitude towards God. One of the reasons may be because they have no proper knowledge of God's word. They find themselves thinking they are going through trials or tests, or even think that God is doing it to them. All the while it's not a trial, it's not a test, and it's not God—<span className="text-red-300 font-semibold">it's them!</span> It is discipline for what they are doing and for not being willing to stop!</p>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📖 Suffering for the Right Reasons</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"If you suffer, however, it must not be for murder, stealing, making trouble, or prying into other people's affairs. But it is no shame to suffer for being a Christian. Praise God for the privilege of being called by his name! For the time has come for judgment, and it must begin with God's household. And if judgment begins with us, what terrible fate awaits those who have never obeyed God's Good News? And also, "If the righteous are barely saved, what will happen to godless sinners?" So if you are suffering in a manner that pleases God, keep on doing what is right, and trust your lives to the God who created you, for he will never fail you." 1 Peter 4:15-19 NLT</p>
                </blockquote>
              </div>

              <p>So if you're going through something and you're not doing the will of God, it's not a test, it's not a trial, and sometimes it's not even the enemy. <span className="text-yellow-300 font-semibold">It is God disciplining you to get you back to the place you need to be.</span></p>

              <p>People fail to realize the choices they make become the future they didn't want. The Bible says:</p>
              
              <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                <p>"This day I call heaven and earth as witnesses against you that I have set before you life and death, blessings and curses. Now choose life, so that you and your children may live" (Deuteronomy 20:19).</p>
              </blockquote>

              <p>Scripture also tells us that the Lord knows the plans he has for you (Jeremiah 29:11).</p>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">⚖️ The Law of Sowing and Reaping</p>
                <p>What you do in your present will affect your future for good or for bad. God will not be mocked—what we sow, we will reap.</p>
                
                <blockquote className="border-l-4 border-red-400 pl-4 mt-4 italic text-gray-200">
                  <p>"Don't be misled—you cannot mock the justice of God. You will always harvest what you plant. Those who live only to satisfy their own sinful nature will harvest decay and death from that sinful nature. But those who live to please the Spirit will harvest everlasting life from the Spirit. So let's not get tired of doing what is good. At just the right time we will reap a harvest of blessing if we don't give up." Galatians 6:7-9 NLT</p>
                </blockquote>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-orange-300">🌪️ Why God Sends Storms</p>
                <p>Don't you want to change what you have been receiving? Then change what you have been doing! Why would God send storms to His people? The psalmist gives us insight on this question.</p>
                
                <blockquote className="border-l-4 border-orange-400 pl-4 mt-4 italic text-gray-200">
                  <p>"Chase them with your fierce storm; terrify them with your tempest. Utterly disgrace them until they submit to your name, O Lord." Psalms 83:15-16 NLT</p>
                </blockquote>
                
                <p>It's a wake up call such as Jonah got in the midst of the storm, so that he would submit to God's will for his life.</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">👨‍👩‍👧‍👦 Storms Affect Everyone Around You</p>
                <p>The hard part of unnecessary storms is that they don't only affect you; they affect everyone around you. Think about it—the sailors did nothing to bring this storm on them; if anything they thought they were doing a good thing by trying to help Jonah get to where he needed to go.</p>
                
                <p>When we run from the calling and service that God has created us, our families are affected, our marriages suffer, and our lives are chaotic. A spirit of confusion and an emptiness that we cannot shake can oppress us constantly. Because of this, we lash out at God and others and become bitter. We have bad attitudes toward those we love, and anyone that comes close to us, because of the storm that is raging inside of us. We are unpredictable. We're calm one minute and then the next minute we're unstable and out of control, not concerned about who we hurt or the disaster we leave behind!</p>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-gray-300">📚 Biblical Examples of Unnecessary Storms</p>
                <p>Look at some people in the Bible that went through things they didn't have to because they failed to listen to God's word.</p>

                <div className="mt-6 space-y-6">
                  <div className="bg-red-900/20 p-4 rounded border border-red-400/30">
                    <p className="font-semibold text-red-300 mb-2">🍎 Adam and Eve</p>
                    <p>Adam and Eve were given everything they could have ever wanted. They were only told not to eat the fruit of the one tree that was in the middle of the garden of Eden. They were warned that if they ate the fruit they would surely die (Genesis 2:17).</p>
                    <p className="mt-2">Well, we all know what happened—they failed to listen to God's voice and instead listened to the enemy. As a result, they were kicked out of the garden, which in turn made their life harder. <span className="text-red-300 font-semibold">Unnecessary storms.</span></p>
                  </div>

                  <div className="bg-red-900/20 p-4 rounded border border-red-400/30">
                    <p className="font-semibold text-red-300 mb-2">⚔️ Cain and Abel</p>
                    <p>Cain failed to learn from his mother's and father's mistake. When His offering wasn't accepted by God, Cain grew jealous and angry with his brother Abel and in a fit of rage he killed him. Before Cain lured his brother to the field to kill him, God spoke to him and said:</p>
                    <blockquote className="border-l-4 border-red-400 pl-4 mt-2 italic text-gray-200">
                      <p>"If you do well, will not your countenance be lifted up? And if you do not do well, sin is crouching at the door; and its desire is for you, but you must master it." Genesis 4:7 NASB</p>
                    </blockquote>
                    <p className="mt-2">Cain failed to listen and let the enemy rule him—instead of him ruling the enemy—and committed the first murder! Cain became a wanderer for the rest of his life. <span className="text-red-300 font-semibold">Unnecessary storm.</span></p>
                  </div>

                  <div className="bg-red-900/20 p-4 rounded border border-red-400/30">
                    <p className="font-semibold text-red-300 mb-2">👑 King David and Bathsheba</p>
                    <p>King David had everything he wanted. God prospered him in every area of his life. He had a big family, a loving wife, and a nation that faithfully served him. It wasn't good enough for David—he wanted what he knew he shouldn't have and committed adultery with Bathsheba and then murdered her husband Uriah to cover it up. The penalty was the baby he had with Bathsheba had to die.</p>
                    <p className="mt-2">The prophet Nathan told King David after he confessed his sin:</p>
                    <blockquote className="border-l-4 border-red-400 pl-4 mt-2 italic text-gray-200">
                      <p>"Now therefore, the sword shall never depart from your house, because you have despised Me and have taken the wife of Uriah the Hittite to be your wife.' Thus says the LORD, 'Behold, I will raise up evil against you from your own household; I will even take your wives before your eyes and give them to your companion, and he will lie with your wives in broad daylight. Indeed you did it secretly, but I will do this thing before all Israel, and under the sun.'" Then David said to Nathan, "I have sinned against the LORD." And Nathan said to David, "The LORD also has taken away your sin; you shall not die. However, because by this deed you have given occasion to the enemies of the LORD to blaspheme, the child also that is born to you shall surely die."" 2 Samuel 12:10-14 NASB</p>
                    </blockquote>
                    <p className="mt-2">King David, even though he was forgiven, still had to go through a lot of unnecessary storms because of his disobedience. Believe me, we could look at hundreds of more stories about people in the Bible that had to go through unnecessary storms because of their disobedience, rebelliousness and wickedness. But you get the point.</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">✝️ The Prophetic Connection to Jesus</p>
                <p>In the stories of Adam and Eve, Cain and Abel, and King David and Bathsheba, you will see a prophetic word in each story pointing towards the one who came to calm the storms in our lives through His ultimate sacrifice. His Name? Jesus! In Genesis chapter three we read the first prophecy concerning the future coming of Jesus, when Adam and Eve sinned (Genesis 3:15).</p>
                
                <p><span className="text-green-300 font-semibold">Abel's blood cried out!</span> The Bible says:</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mt-2 italic text-gray-200">
                  <p>"You have come to Jesus, the one who mediates the new covenant between God and people, and to the sprinkled blood, which speaks of forgiveness instead of crying out for vengeance like the blood of Abel." Hebrews 12:24 NLT</p>
                </blockquote>
                
                <p>The prophet Nathan said the sword will never leave your house to King David (2 Samuel chapter 12).</p>
                
                <p>Jesus was a descendant of King David from the tribe of Judah. Jesus was on the cross and when he died they stuck a spear in His side and we know the cross took away all curses!</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mt-2 italic text-gray-200">
                  <p>"But Christ has rescued us from the curse pronounced by the law. When he was hung on the cross, he took upon himself the curse for our wrongdoing. For it is written in the Scriptures, "Cursed is everyone who is hung on a tree."" Galatians 3:13 NLT</p>
                </blockquote>
                
                <p>Although Jesus takes away the curse and forgives sin, Jesus also sends the storms to wake us up and strengthen our faith. He also has the power to calm those storms!</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">🚢 The Lesson from the Sailors</p>
                <p>We have to repent of the things we have allowed in our boat—our life—that have been causing unnecessary storms and toss them overboard! We can learn a valuable lesson from the sailors and what they did in the story in regards to Jonah. You see, Jonah acknowledged it was his fault for the storm and he told them that they had to throw him out of the ship in order for the storm to stop.</p>
                
                <blockquote className="border-l-4 border-blue-400 pl-4 mt-4 italic text-gray-200">
                  <p>"The sailors were terrified when they heard this, for he had already told them he was running away from the Lord. "Oh, why did you do it?" they groaned. And since the storm was getting worse all the time, they asked him, "What should we do to you to stop this storm?" "Throw me into the sea," Jonah said, "and it will become calm again. I know that this terrible storm is all my fault." Instead, the sailors rowed even harder to get the ship to the land. But the stormy sea was too violent for them, and they couldn't make it. Then they cried out to the Lord, Jonah's God. "O Lord," they pleaded, "don't make us die for this man's sin. And don't hold us responsible for his death. O Lord, you have sent this storm upon him for your own good reasons." Then the sailors picked Jonah up and threw him into the raging sea, and the storm stopped at once!" Jonah 1:10-15 NLT</p>
                </blockquote>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">⚠️ The Problem: Picking and Choosing</p>
                <p>The sailors tried to throw out the cargo that was on the ship instead. This is our problem nowadays—we think we can pick and choose what cargo (sin) we let go of and we think God will be happy with us. The Bible says obedience is better than sacrifice (1 Samuel 15:22). <span className="text-red-300 font-semibold">You cannot pick and choose; God wants it all out!</span></p>
                
                <div className="mt-4 space-y-2">
                  <p>You might say:</p>
                  <ul className="list-disc list-inside ml-6 space-y-1">
                    <li>well, I gave up drugs but I drink a little. <span className="text-red-300 font-semibold">God wants it out!</span></li>
                    <li>I stopped cursing but I still gossip a lot. <span className="text-red-300 font-semibold">God wants it all out!</span></li>
                    <li>I stopped adultery but I still look a little. <span className="text-red-300 font-semibold">God wants it all out!</span></li>
                    <li>I stopped the business that wasn't right, but I steal scam and deceive in my other business. <span className="text-red-300 font-semibold">God wants it all out!</span></li>
                    <li>I stopped fighting and arguing with people, but I still have bitterness or unforgiveness for certain people. <span className="text-red-300 font-semibold">God wants it all out!</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🌊 The Great Calm</p>
                <p>God wants you to repent of the Jonah (rebellious life) you have let in your boat (life) and throw it overboard. When the sailors threw Jonah off the boat, that's when the storms stopped and then there was a great calm! Then the sailors worshipped God.</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mt-4 italic text-gray-200">
                  <p>"Then the sailors picked Jonah up and threw him into the raging sea, and the storm stopped at once! The sailors were awestruck by the Lord's great power, and they offered him a sacrifice and vowed to serve him." Jonah 1:15-16 NLT</p>
                </blockquote>
                
                <p>What kind of unnecessary storms are you going through because of something you have allowed in your boat? Maybe it's something you have been doing wrong, or something you're avoiding that God is telling you to do?</p>
                
                <p>It's time to allow God to take the Jonah mentality out of your life and allow God to move in your life once again. That is, if you want a great calm like the sailors experienced? The sailors were actually idol worshippers; they didn't serve Jonah's God until they saw what Jonah's God could do! So in essence, Jonah was used to save the sailors and bring them to the true God. Think about how many times God used you even in your rebellion towards Him. Now think how much more He will use you when you become obedient to His will for you! Ask God to remove the unnecessary cargo of sin so you can live a life free from unnecessary storms! Then you can help others live a life without unnecessary storms.</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">🏖️ The Sea of Galilee Experience</p>
                <p>On my 2018 Israel trip I was on a boat on the Sea of Galilee in Israel. This is where Jesus walked on water and calmed the storm for the disciples. When Peter was walking on water with Jesus in one of the storms, he started focusing on the storm instead of Jesus and began to sink. Peter prayed the shortest prayer in the Bible.</p>
                
                <blockquote className="border-l-4 border-blue-400 pl-4 mt-4 italic text-gray-200">
                  <p>"But when he saw the wind boisterous, he was afraid; and beginning to sink, he cried, saying, Lord, save me." Matthew 14:30 KJV (emphasis mine)</p>
                </blockquote>
                
                <p>Why don't you take a moment and pray the same prayer about whatever is going on in your life. Maybe you were serving God at one point in your life, but you looked back at all the problems and it caused you to fall. Today, like Jesus did for Peter, He wants to save you and bring you back to the heart of worship to serve Him again like never before in Jesus' name. It doesn't take a lot of words—it just takes a heart of sincere faith in the midst of life's storms that truly cries out, <span className="text-blue-300 font-semibold">"Lord, save me!"</span></p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">⚓ The Father's Sacrifice</p>
                <p>I close this chapter with a story.</p>
                
                <p>After a few of the usual Sunday evening hymns, the church's pastor once again slowly stood up, walked over to the pulpit, and gave a very brief introduction of his childhood friend. With that, an elderly man stepped up to the pulpit to speak. "A father, his son, and a friend of his son were sailing off the Pacific Coast," he began, "when a fast approaching storm blocked any attempt to get back to shore. The waves were so high, that even though the father was an experienced sailor, he could not keep the boat upright, and the three were swept into the ocean."</p>
                
                <p>The old man hesitated for a moment, making eye contact with two teenagers who were, for the first time since the service began, looking somewhat interested in his story. He continued, "Grabbing a rescue line, the father had to make the most excruciating decision of his life: to which boy he would throw the other end of the line. He only had seconds to make the decision. The father knew that his son was a Christian, and he also knew that his son's friend was not. The agony of his decision could not be matched by the torrent of waves. As the father yelled out, 'I love you, son!' he threw the line to his son's friend."</p>
                
                <p>"By the time he pulled the friend back to the capsized boat, his son had disappeared beyond the raging swells into the black of night. His body was never recovered."</p>
                
                <p>By this time, the two teenagers were sitting straighter in the pew, waiting for the next words to come out of the old man's mouth. "The father," he continued, "knew his son would step into eternity with Jesus, and he could not bear the thought of his son's friend stepping into an eternity without Jesus. Therefore, he sacrificed his son. How great is the love of God that He should do the same for us." With that, the old man turned and sat back down in his chair as silence filled the room.</p>
                
                <p>Within minutes after the service ended, the two teenagers were at the old man's side. "That was a nice story," politely started one of the boys, "but I don't think it was very realistic for a father to give up his son's life in hopes that the other boy would become a Christian."</p>
                
                <p>"Well, you've got a point there," the old man replied, glancing down at his worn Bible. A big smile broadened his narrow face, and he once again looked up at the boys and said, "It sure isn't very realistic, is it? But I'm standing here today to tell you that THAT story gives me a glimpse of what it must have been like for God to give up His son for me. You see . . . I was the son's friend."</p>
                
                <p>God the Father gave His Son to the storm of sin so we can be saved by the Father through the death of His Son. We can be saved from the storm of sin so we can make a difference and serve God like the son's friend did because he was grateful for the friend's sacrifice.</p>
                
                <blockquote className="border-l-4 border-purple-400 pl-4 mt-4 italic text-gray-200">
                  <p>"Greater love hath no man than this, that a man lay down his life for his friends. Ye are my friends, if ye do whatsoever I command you." John 15:13-14 KJV</p>
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
                onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+5&version=NLT', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📖 Read 1 Timothy 5 (NLT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


