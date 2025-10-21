import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";
import chapter6Text from "./content/dont-be-a-jonah-ch6.txt?raw";

export default function DontBeAJonahPlayerCh6() {
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
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 6</h1>
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
                <p className="text-white/90 text-xl font-semibold">Chapter 6 🐋</p>
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
                src="/uploads/textbook-audio/dont-be-a-jonah-ch6.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 6: Hell? No, Let Go!</h2>
              
              <p>I was initially going to incorporate this information in the previous chapter, but I feel this is a specific word that deserves its own chapter. I want to talk about going through what people sometimes refer to as a <span className="text-red-300 font-semibold">"hell experience."</span> This goes beyond an unnecessary storm; this is where you're drowning from the storm and all hell is breaking loose around you and it causes you to cry out to God like never before. Many times people have to go a through a breaking of self in order for them to come to their senses. This is the case with Jonah.</p>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">🐋 Jonah's Prayer from the Fish</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Then Jonah prayed unto the Lord his God out of the fish's belly, And said, I cried by reason of mine affliction unto the Lord, and he heard me; out of the belly of hell cried I, and thou heardest my voice. For thou hadst cast me into the deep, in the midst of the seas; and the floods compassed me about: all thy billows and thy waves passed over me. Then I said, I am cast out of thy sight; yet I will look again toward thy holy temple. The waters compassed me about, even to the soul: the depth closed me round about, the weeds were wrapped about my head. I went down to the bottoms of the mountains; the earth with her bars was about me for ever: yet hast thou brought up my life from corruption, O Lord my God." Jonah 2:1-6 KJV</p>
                </blockquote>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">💔 Breaking Points That Lead to Freedom</p>
                <p>We all have heard the stories of people who had to experience jail in order to come to their freedom in Christ. A sickness came upon them or their family member and then they experienced the healing power of Jesus for their souls. Maybe the loss of a loved one to cause them to draw closer to God to experience true life in Christ. Or maybe a family hurt by a child that has rebelled, or by unfaithfulness in the marriage, to experience the true faithfulness of Jesus.</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🙏 God's Wake-Up Call</p>
                <p>The Bible says:</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Then the Lord appeared to Solomon in the night and said to him: "I have heard your prayer and have chosen this place for myself as a house of sacrifice. When I shut up the heavens so that there is no rain, or command the locust to devour the land, or send pestilence among my people, if my people who are called by my name humble themselves, and pray and seek my face and turn from their wicked ways, then I will hear from heaven and will forgive their sin and heal their land. Now my eyes will be open and my ears attentive to the prayer that is made in this place." 2 Chronicles 7:12-15 ESV</p>
                </blockquote>
                
                <p>This verse shows us that God allows what we have to be taken from us—the locusts are commanded to devour the land. God will sometimes even stop his blessings—the rain—and even allow sickness or pestilence to come upon us! Why would a loving God want to do that to His people? <span className="text-green-300 font-semibold">To give them a wake up call here on earth so they wont have to face true hell for all eternity!</span> The next verse says, essentially, "If my people call upon me, then I will hear, heal and restore!"</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">🔥 The Definition of Hell (Sheol)</p>
                <p>This is what Jonah did; he cried out to the Lord because of "his affliction," not because he felt like it. However, he had to experience that which he referred to as hell. The original Hebrew definition is Sheol, defined as follows: sheol, underworld, grave, hell, hades, or the world of the dead. It is a pit, a place without praise, a place where the wicked are sent, a devastating storm.</p>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-orange-300">⏰ Three Days of Hell</p>
                <p>If you noticed it took him three days to come to his senses. Talk about stubborn—many people think that his skin was bleached white because of all the acid in the stomach of the fish. So think about this; he just went through a storm, and now he gets swallowed by a great fish. Many people believe it was a whale. It's hot and smelly, and acid is burning your skin, while water keeps coming in and out of the stomach of the fish and each time you almost drown. He's tired, weary, exhausted, can't fight off sleep any longer, and the pressure of being deep down in the depths of the sea is now making him delirious. He begins to realize if he dies, not only is he going through a hell of an experience, but he just might enter into hell if he dies. All this and more is going on for three days and he finally comes to understand <span className="text-orange-300 font-semibold">you can't beat God!</span></p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">🙏 Jonah's Desperate Prayer</p>
                <p>In desperation, he calls out unto God because of his affliction and says:</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>"As my life was slipping away, I remembered the Lord. And my earnest prayer went out to you in your holy Temple. Those who worship false gods turn their backs on all God's mercies. But I will offer sacrifices to you with songs of praise, and I will fulfill all my vows. For my salvation comes from the Lord alone." Then the Lord ordered the fish to spit Jonah out onto the beach." Jonah 2:7-10 NLT</p>
                </blockquote>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">💡 The Revelation: Remember Jehovah</p>
                <p>He remembered Jehovah! Isn't it time for us to do the same? Isn't it time that we remember that when we confessed Christ as Lord that automatically made us His servants! God wants us to serve Him in the way He wants, not how we want. We cannot pick and choose the things we want to obey and then say no to the things we don't want to do. Jonah learned that the hard way, and so do the people that are not willing to obey the Lord in whatever He has chosen for them to do. <span className="text-blue-300 font-semibold">We need to say whatever He has called us to say and go wherever He has called us to go!</span></p>
                
                <p>He realized that if he held on to his stubborn, rebellious, and bitter ways he would eventually have died in his rebellion. God would have still gotten His way because God could have used someone else.</p>
              </div>

              <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-yellow-300">⚠️ The Danger of Lying Vanities</p>
                <p>He says something that really made me think. He said, <span className="text-yellow-300 font-semibold">"Those who hold on to lying vanities, or idols forsake their own mercy!"</span></p>
                
                <p>Like Jonah, if we hold on to the empty lies of the enemy, and the idols—which are anything or anyone we put before God—we forsake God's grace and the mercy He died for us to have! It's not that God leaves us, but it's that we leave God; we forsake Him! The prophet Isaiah teaches us how sinful choices bind us in our iniquity and we forsake our God.</p>
                
                <blockquote className="border-l-4 border-yellow-400 pl-4 mt-4 italic text-gray-200">
                  <p>"Ah sinful nation, a people laden with iniquity, a seed of evildoers, children that are corrupters: they have forsaken the Lord, they have provoked the Holy One of Israel unto anger, they are gone away backward." Isaiah 1:4 KJV</p>
                </blockquote>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-gray-300">🎯 Jonah's Bitterness and Rebellion</p>
                <p>Jonah was a man of God who knew the word of God but ran away from God. Why? He was bitter and wanted them to perish, because he felt they needed judgment instead of mercy! When he finally realized he couldn't hold on to it anymore he gave us an amazing revelation. If we hold onto the things God has commanded us to let go of, we will end up living a life of rebellion against God. When we are not willing to change then we forsake grace and mercy—it doesn't forsake us! <span className="text-gray-300 font-semibold">We make the decision to walk away and leave!</span></p>
                
                <blockquote className="border-l-4 border-gray-400 pl-4 mt-4 italic text-gray-200">
                  <p>"But I have this against you, that you have left your first love. Therefore remember from where you have fallen, and repent and do the deeds you did at first; or else I am coming to you and will remove your lampstand out of its place-unless you repent." Revelation 2:4-5 NASB</p>
                </blockquote>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">💝 Understanding Grace and Mercy</p>
                <p>When you truly understand what God has done for you and the grace He has given you, it changes you. Grace is something we didn't deserve but was given to us anyway by Jesus. We didn't deserve heaven, we didn't deserve a second chance, we didn't deserve the ultimate sacrifice of the Son of God, and we didn't deserve to be able to serve Jesus, but it was given to us anyway!</p>
                
                <p>Mercy is stopping the punishment we deserve because of what we all have done. We did deserve death, hell, and the grave. We did deserve the lashes on our backs and the cross that Jesus took for us. Jesus loved us so much that He gave us the grace we didn't deserve and stopped the hell we did deserve. <span className="text-green-300 font-semibold">That's mercy!</span></p>
                
                <p>Why would you not want to serve Jesus? Once you truly understand mercy and grace would you actually want to walk away? Look what the Bible says grace teaches us.</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📚 What Grace Teaches Us</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"For the grace of God that bringeth salvation hath appeared to all men, Teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly, in this present world; Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ; Who gave himself for us, that he might redeem us from all iniquity, and purify unto himself a peculiar people, zealous of good works. These things speak, and exhort, and rebuke with all authority. Let no man despise thee." Titus 2:11-15 KJV</p>
                </blockquote>
                
                <p>Grace is also a gift that we receive and that we should give others as well.</p>
                
                <blockquote className="border-l-4 border-blue-400 pl-4 mt-4 italic text-gray-200">
                  <p>"For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast. For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them." Ephesians 2:8-10 KJV</p>
                </blockquote>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">🔄 Grace's Teaching Power</p>
                <p>Because it's a free gift and because it has been given to us at the cost of the blood of God's Son Jesus, it teaches us to turn away from sin rather than turning away from the Son! It teaches us to turn away from ungodliness, not turn away from Godliness. It teaches us to turn away from lust, not turn to lust. It teaches us to turn to righteousness, not turn to unrighteousness. It teaches us to live soberly, not turn to drunkenness! <span className="text-purple-300 font-semibold">Grace should teach you to walk away from hell and walk towards heaven!</span></p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">🎉 Jonah's Decision to Let Go</p>
                <p>Jonah realized this after a hell experience in the fish. This is why he said,</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>"But I will sacrifice unto thee with the voice of thanksgiving; I will pay that that I have vowed. Salvation is of the Lord." Jonah 2:9 KJV</p>
                </blockquote>
                
                <p>When Jonah decided to let go of the lying vanities and the idols he was holding onto, look what happened: <span className="text-red-300 font-semibold">"And the Lord spake unto the fish, and it vomited out Jonah upon the dry land"</span> (Jonah 2:10 KJV). That means as soon as Jonah let his rebellious attitude go, God commanded the fish to let Him go!</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">✨ The Choice: Let Go or Hold On</p>
                <p>Instead of hanging onto the things that bring God's judgment, anger, and discipline—painful positions that will eventually lead to a breaking point—wouldn't it be better to just let it go? So many people wait until they're in a situation like Jonah, with all hell breaking out around them. Then they make God their last resort when God should have been their first priority!</p>
                
                <p>I believe we all have done this a time or two in our life but we should not live a lifestyle like this. So often we allow the thing we hold onto to create stubbornness in our heart until we start justifying, excusing, and blaming everyone else for how our life has ended up and for the person we have become.</p>
              </div>

              <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 text-center">
                <p className="text-lg font-semibold mb-4 text-yellow-300">🎯 The Final Challenge</p>
                <p>Let's learn a lesson from this chapter of Jonah's life, that things that hold us from God like the fish held Jonah will not let us go until we let our rebellious attitude go. Decide today to let it go and you'll see how it will allow a release in your life and freedom to serve the Lord like never before so you can get back to what you vowed.</p>
                
                <p>To serve the Lord because He first served us. Think about it today, do you want to go through a breaking in such a way you feel like all hell is breaking out around you and your house? Of course not, so let's have an attitude that says: <span className="text-yellow-300 font-semibold text-xl">hell? no, I'm letting go!</span></p>
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
                onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+6&version=NLT', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📖 Read 1 Timothy 6 (NLT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


