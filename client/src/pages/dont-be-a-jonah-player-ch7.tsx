import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";
import chapter7Text from "./content/dont-be-a-jonah-ch7.txt?raw";

export default function DontBeAJonahPlayerCh7() {
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
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 7</h1>
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
                <p className="text-white/90 text-xl font-semibold">Chapter 7 🐋</p>
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
                src="/uploads/textbook-audio/dont-be-a-jonah-ch7.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 7: God of Second Chances</h2>
              
              <div className="mb-6">
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"And the word of the Lord came unto Jonah the second time, saying, Arise, go unto Nineveh, that great city, and preach unto it the preaching that I bid thee. So Jonah arose, and went unto Nineveh, according to the word of the Lord. Now Nineveh was an exceeding great city of three days' journey. And Jonah began to enter into the city a day's journey, and he cried, and said, Yet forty days, and Nineveh shall be overthrown. So the people of Nineveh believed God, and proclaimed a fast, and put on sackcloth, from the greatest of them even to the least of them. For word came unto the king of Nineveh, and he arose from his throne, and he laid his robe from him, and covered him with sackcloth, and sat in ashes. And he caused it to be proclaimed and published through Nineveh by the decree of the king and his nobles, saying, Let neither man nor beast, herd nor flock, taste any thing: let them not feed, nor drink water: But let man and beast be covered with sackcloth, and cry mightily unto God: yea, let them turn every one from his evil way, and from the violence that is in their hands. Who can tell if God will turn and repent, and turn away from his fierce anger, that we perish not? And God saw their works, that they turned from their evil way; and God repented of the evil, that he had said that he would do unto them; and he did it not." Jonah 3:1-10 KJV</p>
                </blockquote>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🔄 God of Second Chances</p>
                <p>Here's the good news: <span className="text-green-300 font-semibold">God is a God of second chances.</span> The Bible says that the word of the Lord came to Jonah a second time. Throughout the Bible you see the stories of great men and women of God who fell but came back stronger and greater for the Glory of God. Too many people feel condemned and think they can't come back to God because they wandered too far away and did too much to hurt God. Sadly, they fall for the lie of the enemy that tells them they're too far gone to get back to who God has called them to be. <span className="text-red-300 font-semibold">The devil is a liar!</span></p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">💡 Hope for Two Types of People</p>
                <p>This story gives hope to two different types of people. The first are people like Jonah—servants of God who ran from their call or fell away from it. If that's you, <span className="text-blue-300 font-semibold">you can come back!</span></p>
                
                <p>Every chapter we just covered shows you the consequences of running from God's call on your life. If you have been experiencing any of this you can do what Jonah did. Admit it, submit to God, and He will forgive you, restore you, and use you right where you are at the very moment you let go and let God move in your life. He did it for King David, Jacob, Sampson, Naomi, Peter, and many more, and He can do it for you. <span className="text-blue-300 font-semibold">He is the same God yesterday, today, and forever! He has no favoritism.</span></p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">📖 Biblical Promises for Restoration</p>
                <p>The Bible says:</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Look how far you have fallen! Turn back to me and do the works you did at first. If you don't repent, I will come and remove your lampstand from its place among the churches." Revelation 2:5 NLT</p>
                </blockquote>
                
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-200">
                  <p>"This I recall to my mind, Therefore I have hope. Through the LORD's mercies we are not consumed, Because His compassions fail not. They are new every morning; Great is Your faithfulness. Lamentations 3:21-23 NKJV</p>
                </blockquote>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">🌟 Hope for Nonbelievers</p>
                <p>The second type of people the story of Jonah gives hope are those who never served the Lord and are in dwelling in all kinds of evil and wickedness like the people of Nineveh. If that is you, the Bible tells us:</p>
                
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Come now, let's settle this," says the Lord. "Though your sins are like scarlet, I will make them as white as snow. Though they are red like crimson, I will make them as white as wool. If you will only obey me, you will have plenty to eat. But if you turn away and refuse to listen, you will be devoured by the sword of your enemies. I, the Lord, have spoken!" Isaiah 1:18-20 NLT</p>
                </blockquote>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-orange-300">🔴 The Meaning of Scarlet</p>
                <p>The Hebrew word for reason or settle Isaiah uses here is a word that means <span className="text-orange-300 font-semibold">"redo," meaning a second chance!</span> Also, the way that people would get the deep beautiful red color scarlet will shock you. They would take a bunch of maggots and squish them and then take the blood and use that as the dye for the color scarlet.</p>
                
                <p>It was a very deep red unlike you could get anywhere else. It was nearly impossible to wash the stain of the scarlet color away that was made with the maggots' blood.</p>
                
                <p>So God is showing us that even though your sins are that deep and that disgusting He is willing to let it go and forgive it and wash it all away. <span className="text-orange-300 font-semibold">You can receive His second chance and allow Him to offer a redo, restart, and renew your life because of what the Son did for us!</span></p>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-gray-300">🐛 Jesus: The Worm Who Became Our Savior</p>
                <p>In the book of Psalms chapter twenty two we read that King David prophesies about some of the thoughts and words that Jesus would express on the cross that day. Look at one of those thoughts:</p>
                
                <blockquote className="border-l-4 border-gray-400 pl-4 mb-4 italic text-gray-200">
                  <p>"But I am a worm and not a man. I am scorned and despised by all! Everyone who sees me mocks me. They sneer and shake their heads, saying, "Is this the one who relies on the Lord? Then let the Lord save him! If the Lord loves him so much, let the Lord rescue him!" Psalms 22:6-8 NLT</p>
                </blockquote>
                
                <p>What does that mean? Well, first it represents that for Jesus to come down from heaven and leave all His glory, majesty, and splendor and take on a human body it would be compared to a man turning into a worm, a maggot! More importantly it illustrates what Jesus did for us so we can have our second chance.</p>
                
                <p>When it says scarlet it makes reference to a silk worm! You see, a silk worm is a worm that's very interesting when it comes to the birth process. The silk worm would attach itself to a tree when it was about to give birth, and as it gives birth it dies on the tree to give life to its children. After the birth is complete, and the worm falls from the tree after it dies, all that remains is a bloodstained tree from a worm!</p>
                
                <p>Jesus came down to take all our disgusting sin no matter how bad and how deep. God wants to take it from us and He has already done it! <span className="text-gray-300 font-semibold">The bloodstained cross of Calvary's hill is the evidence of His love for His children, so they have the opportunity to be born again!</span> His death brought those who turn to Him life!</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">💝 God's Great Love</p>
                <p>The Bible says:</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"But God showed his great love for us by sending Christ to die for us while we were still sinners. And since we have been made right in God's sight by the blood of Christ, he will certainly save us from God's condemnation. For since our friendship with God was restored by the death of his Son while we were still his enemies, we will certainly be saved through the life of his Son. So now we can rejoice in our wonderful new relationship with God because our Lord Jesus Christ has made us friends of God." Romans 5:8-11 NLT</p>
                </blockquote>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📋 Biblical Examples of God's Grace</p>
                <p>You might say, "I believe God can forgive me, but I think I've done too much for Him to use me. People won't take me seriously because I just messed up too bad." If that's you, think about this list before you doubt God can use you.</p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <ul className="list-disc list-inside space-y-1">
                    <li><span className="text-blue-300 font-semibold">NOAH</span> was a drunk</li>
                    <li><span className="text-blue-300 font-semibold">ABRAHAM</span> was too old</li>
                    <li><span className="text-blue-300 font-semibold">ISAAC</span> was a daydreamer</li>
                    <li><span className="text-blue-300 font-semibold">JACOB</span> was a liar</li>
                    <li><span className="text-blue-300 font-semibold">LEAH</span> was ugly</li>
                    <li><span className="text-blue-300 font-semibold">JOSEPH</span> was abused</li>
                    <li><span className="text-blue-300 font-semibold">MOSES</span> stuttered</li>
                    <li><span className="text-blue-300 font-semibold">GIDEON</span> was afraid</li>
                    <li><span className="text-blue-300 font-semibold">SAMSON</span> had long hair, and was a womanizer</li>
                    <li><span className="text-blue-300 font-semibold">RAHAB</span> was a prostitute</li>
                    <li><span className="text-blue-300 font-semibold">JEREMIAH</span> and <span className="text-blue-300 font-semibold">TIMOTHY</span> were too young</li>
                    <li><span className="text-blue-300 font-semibold">DAVID</span> had an affair and was a murderer</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-1">
                    <li><span className="text-blue-300 font-semibold">ELIJAH</span> was suicidal</li>
                    <li><span className="text-blue-300 font-semibold">ISAIAH</span> preached naked</li>
                    <li><span className="text-blue-300 font-semibold">JONAH</span> ran from God</li>
                    <li><span className="text-blue-300 font-semibold">NAOMI</span> was a widow</li>
                    <li><span className="text-blue-300 font-semibold">JOB</span> went bankrupt</li>
                    <li><span className="text-blue-300 font-semibold">JOHN</span> the Baptist ate bugs</li>
                    <li><span className="text-blue-300 font-semibold">PETER</span> denied Christ</li>
                    <li><span className="text-blue-300 font-semibold">THE DISCIPLES</span> fell asleep while praying</li>
                    <li><span className="text-blue-300 font-semibold">MARTHA</span> worried about everything</li>
                    <li><span className="text-blue-300 font-semibold">MARY MAGDALENE</span> was demon possessed</li>
                    <li><span className="text-blue-300 font-semibold">THE SAMARITAN WOMAN</span> was divorced—more than once</li>
                    <li><span className="text-blue-300 font-semibold">ZACCHEUS</span> was too small</li>
                    <li><span className="text-blue-300 font-semibold">PAUL</span> was too religious</li>
                    <li><span className="text-blue-300 font-semibold">TIMOTHY</span> had an ulcer</li>
                    <li><span className="text-blue-300 font-semibold">AND LAZARUS WAS DEAD!</span></li>
                  </ul>
                </div>
                
                <p className="mt-4 text-center text-lg font-semibold text-blue-300">No more excuses! It's time to stop running and start serving!</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">🌿 Jonah's Lack of Compassion</p>
                <p>Also, remember not to look down on people that are living a life of wickedness, whether they served God at one point and fell away or are nonbelievers or wretched sinners. We will discuss this more in the next chapter, but for now let's look at what Jonah did after he preached the message of repentance to the people.</p>
                
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Then Jonah went out to the east side of the city and made a shelter to sit under as he waited to see what would happen to the city. And the Lord God arranged for a leafy plant to grow there, and soon it spread its broad leaves over Jonah's head, shading him from the sun. This eased his discomfort, and Jonah was very grateful for the plant. But God also arranged for a worm! The next morning at dawn the worm ate through the stem of the plant so that it withered away. And as the sun grew hot, God arranged for a scorching east wind to blow on Jonah. The sun beat down on his head until he grew faint and wished to die. "Death is certainly better than living like this!" he exclaimed. Then God said to Jonah, "Is it right for you to be angry because the plant died?" "Yes," Jonah retorted, "even angry enough to die!" Then the Lord said, "You feel sorry about the plant, though you did nothing to put it there. It came quickly and died quickly. But Nineveh has more than 120,000 people living in spiritual darkness, not to mention all the animals. Shouldn't I feel sorry for such a great city?" Jonah 4:5-11 NLT</p>
                </blockquote>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">🔥 God's Personal Illustration</p>
                <p>God gives Jonah a personal illustration using a very hot wind, a plant, and a worm! Jonah preached the message of repentance, but he still had no compassion for the people. He was actually upset that God showed mercy on the people of Nineveh, so God shows him an illustration that represents a few things. First of all, it was so hot Jonah wished he was dead. The heat illustrated hell, where the people of Nineveh deserved to go for their wickedness. The plant can represent life. In the Gospel of John, Jesus said we are like branches and He is the vine. The worm represents the disgusting consequences of our sin. The Bible says hell is where the worm never dies (Mark 9:48).</p>
                
                <p>Jonah was more concerned about the plant that covered him and gave him rest than he was grateful about the people that were covered by God's mercy and grace. <span className="text-red-300 font-semibold">Let us learn a lesson from this and not be so caught up with selfish ambitions and our own comfort that we forget the reason why God put us on this world.</span> We are all called to help save souls by warning them of hell and eternal damnation, and to remind them of God's grace and mercy. No matter how bad they are, God wants to give them a second chance and cover them with His love!</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🌍 The Great Commission</p>
                <p>And just like God had to make Jonah uncomfortable to realize this, maybe God is making you uncomfortable so you can get back to the only mission that matters. <span className="text-green-300 font-semibold">The Great Commission is our only real mission!</span> This is what we should do with our second chance—tell others that they can have one too!</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Therefore, go and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit. Teach these new disciples to obey all the commands I have given you. And be sure of this: I am with you always, even to the end of the age." Matthew 28:19-20 NLT</p>
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
                onClick={() => window.open('https://www.biblegateway.com/passage/?search=2+Timothy+1&version=NLT', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📖 Read 2 Timothy 1 (NLT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


