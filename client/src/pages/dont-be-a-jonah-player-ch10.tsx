import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";
import chapter10Text from "./content/dont-be-a-jonah-ch10.txt?raw";

export default function DontBeAJonahPlayerCh10() {
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
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 10</h1>
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
                <p className="text-white/90 text-xl font-semibold">Chapter 10 🐋</p>
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
                src="/uploads/textbook-audio/dont-be-a-jonah-ch10.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 10: Where is Your Nineveh?</h2>
              
              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">❓ The Question That Changed Everything</p>
                <p>I heard a certain pastor ministered a message about Jonah that caused a man sitting in the congregation of the church to ask the question, <span className="text-blue-300 font-semibold">"Where is my Nineveh?"</span></p>
                
                <p>Before we get into trying to answer that, let's first look at what an ambassador is, because the Bible says we are called ambassadors for Christ.</p>
                
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Now then, we are ambassadors for Christ, as though God were pleading through us: we implore you on Christ's behalf, be reconciled to God." II Corinthians 5:20 NKJV</p>
                </blockquote>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-gray-300">🏛️ What is an Ambassador?</p>
                <p>The original word for ambassador in America was minister; at least five presidents of the United States were ambassadors before becoming president. An ambassador is a person that resides in another country while representing their own country. They stay in an embassy, and from there they conduct the business of representing their country and its citizens in that foreign country.</p>
                
                <p>They also grant immunity to people. Immunity is the act of stopping prosecution or penalties to be charged against a person by the government of a foreign country. If an individual is found guilty of certain crimes, they sometimes faces expulsion from the foreign country—sent back to their own country with no charges applied. Some ambassadors have been assassinated while on foreign ground because they were trying to represent their country and defend their people.</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">✝️ Jesus: Our Ultimate Ambassador</p>
                <p>What's the point? Jesus came down from heaven to this earth to grant immunity to the world that was guilty and deserved death and hell, but He pleaded for us and won the case. He had to pay the penalty of our sin by dying the ultimate death of a thief and a rebel, even though He was innocent. Now all who call upon Him will be saved from death, hell and the grave.</p>
                
                <p>He also came to represent heaven on earth to us so we can learn how to represent heaven on earth to others. Now He calls us His ambassadors; now we are citizens of heaven.</p>
                
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                  <p>"Now, therefore, you are no longer strangers and foreigners, but fellow citizens with the saints and members of the household of God." Ephesians 2:19 NKJV</p>
                </blockquote>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">🎯 God Chooses Your Assignment</p>
                <p>An ambassador doesn't get to pick the foreign country he wants to go to as a representative of his home country. As a matter of fact, in America the president chooses the ambassador and chooses his location.</p>
                
                <p>Jesus chose you to be a representative of the Kingdom of heaven to this world.</p>
                
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-200">
                  <p>"You did not choose Me, but I chose you and appointed you that you should go and bear fruit, and that your fruit should remain, that whatever you ask the Father in My name He may give you. These things I command you, that you love one another." John 15:16-17 NKJV</p>
                </blockquote>
                
                <p>Also, in the same way you don't choose where you will represent Him—He chooses. It's obvious we are to represent Him wherever we go, but to every one of us He has appointed to us our own <span className="text-purple-300 font-semibold">"Nineveh."</span></p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">🏠 Jonah's Hometown vs. Nineveh</p>
                <p>Whether it be your home town amongst your own people, or whether it be in a foreign land in a different city or a different country—will you go?</p>
                
                <p>Jonah had no problem being submissive to God when it was His own home town and amongst his own people.</p>
                
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"He restored the territory of Israel from the entrance of Hamath to the Sea of the Arabah, according to the word of the LORD God of Israel, which He had spoken through His servant Jonah the son of Amittai, the prophet who was from Gath Hepher." II Kings 14:25 NKJV</p>
                </blockquote>
                
                <p>The town Jonah was from was called Gath Hepher, which means in Hebrew "the winepress." Wine in many places in the Bible represents joy, celebration, salvation, and the New Covenant. <span className="text-blue-300 font-semibold">You see, it's easy to preach the Gospel of the New Covenant in a place where you have joy, where you're celebrated amongst family and friends, where your received and not rejected.</span></p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">🏙️ What is Nineveh?</p>
                <p>But when God told Jonah to go to Nineveh, Jonah had to go through so much discipline and many unnecessary storms before he submitted to God's will and destination for his life.</p>
                
                <p>A few of the definitions for the word Nineveh are <span className="text-red-300 font-semibold">"refuge, a fleeing one and fugitive."</span> It's not always easy to go to places that are dark, dirty, and disgusting—filled with sin and shame of this world, where the people don't celebrate you but hate you. Places where there is no joy, but depression and discouragement and the people don't want to hear about the Gospel or Jesus. <span className="text-red-300 font-semibold">That's Nineveh!</span></p>
                
                <p>Many ministers want to go to the suburbs and the clean comfortable places, but Nineveh is more like the inner cities and ghettos near you. Nineveh is the place where you probably don't want to go and no one else wants to go either. Nineveh is the people that get on your nerves, the people that are addicted, bound, and rebellious towards everything that stands for God. Nineveh is where the outcasts live.</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">💡 Where Jesus Would Go</p>
                <p>The Nineveh's of this world need a Christ ambassador to represent His light in the darkest of places. <span className="text-green-300 font-semibold">Nineveh is where Jesus would have gone.</span> Jesus was always ministering to notorious sinners like the tax collectors, prostitutes, drunks, and adulterers. Nineveh is where God needs you the most.</p>
                
                <p>The Bible says to be friends with the world makes you an enemy of God (James 4:4). There are people trying to run from God and run from the plan God has for them. God wants to use us to go after these enemies so that they can become friends—sons and daughters of God. Jesus said in Matthew 5:9: <span className="text-green-300 font-semibold">"Blessed are the peacemakers, for they shall be called sons of God"</span> (NKJV).</p>
                
                <p>We are called to go after the ones that are an enemy of God because of their rebellious attitude toward Jesus. We need to do everything we can to bring them—no matter how bad they are or where they are from—and minister to them the saving knowledge of Christ. When they accept Him, we have just brought peace between them and God. That's a true peacemaker. When Jonah finally repented and accepted his Nineveh assignment, people got saved, a nation was spared, and people found out who the one true God really was.</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">🏠 My Chicago Story</p>
                <p>I never had true peace and fulfillment until I accepted the Nineveh in my life, and you will not have peace and fulfillment until you accept your Nineveh. As we have learned in this book, Jonah couldn't become right with God until he accepted his Nineveh.</p>
                
                <p>For me, the place I started to minister was my hometown of Chicago. I was the most worst person—a real chief sinner before my born-again experience. So when God called me to minister, I thought he wanted me to go to a completely different city where no one knew me, because I felt there was no way that the people where I grew up were going to take me seriously. I hurt a lot of people. I was in trouble with five of the biggest families in Chicago for a lot of different reasons. I thought there was no way that God would tell me to start a ministry in Chicago. But He did; He truly used all my past as the testimony of His saving and changing Grace. In Chicago is where Soldiers for God Ministry (SFGM) started.</p>
                
                <p>Many of the same people that I had trouble with and hurt, God allowed me to be used to minister to them and help them in their walk with Jesus. Thank God, because the Bible says, <span className="text-purple-300 font-semibold">"When the Lord takes pleasure in anyone's way, he causes their enemies to make peace with them"</span> (Pro 16:7). I have seen this in my life and He can do it for you as well.</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📈 The Growth of SFGM Chicago</p>
                <p>The ministry started in 2007 and immediately began to grow in amazing ways, with many new converts changed by the Gospel and the love of Jesus. About three years later the Church of God, the denomination I serve in, gave us our own building with a house that was connected to it. The best part was that it was the same church I attended for fifteen years of my life. A few years later we paid it off and remodeled both buildings. God was truly pouring out His favor on us. Many ministers were raised up in that church, five of whom planted their own ministries. Many families were raised up to serve the Lord and over fifteen marriages were established from the direct connection of the church. We raised hundreds of thousands of dollars for missions, for homeless ministry and events to bring people to Christ.</p>
                
                <p>There were many trials and attacks on the ministry as well, some of which were my fault for stupid choices I made and pride that crept in, it was because the enemy had seen that God was using us to impact our city. Many times I wanted to leave my "Nineveh" because of the pressure, hurt, discouragement, anger, frustration, temptation, tribulation, and attacks of the enemy. But God! God wouldn't let me and gave me the grace, mercy and the strength of the Lord to go forward.</p>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-orange-300">✈️ The Orlando Calling</p>
                <p>I ministered in Chicago from 2007 until something happened in 2016. I was on vacation in Orlando, Florida, where I usually would take my family on vacation, but this time destiny began to reveal itself like never before. Let me explain. For over a year I kept feeling like God wanted me to do an outreach in Orlando. I thought that God wanted me to plant a church like before. It never occurred to me what God was about to do.</p>
                
                <p>While on vacation in Orlando, one of my guys that lived there asked me to do a Church service while I was there. I told him I was on vacation and I would come back and do a service—I randomly said November 3rd, or so I thought it was a random date. I flew back home from Orlando to Chicago on a Sunday morning. When I got home, I began to pray before our evening service and I told God, "I'm sorry for telling the people of Orlando I was going to come there without asking you first, so I will not go to Orlando unless you confirm it."</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🙏 Divine Confirmation</p>
                <p>Three hours later the service started. While it was going on, I noticed an American man and woman walk into the service, so at the end of the service I greeted them. They explained how they grew up in that church, and I told them I did too. Then I realized they left the church right around the same time I started attending there. Then he shared how he had just gotten off a plane from Orlando hours before he walked into the church. I told him I just got off a plane from Orlando, too. He said he was on vacation and wanted to visit the church he grew up in, and then said God sent him to Orlando, Florida, and he has a thriving ministry there.</p>
                
                <p>It completely blew me away because I knew this was the confirmation I needed to start an outreach in Orlando. Although it was more than that.</p>
                
                <p>I had family and friends set up a banquet hall in Orlando for November 3rd. Also, I had one of my guys from Dallas, Texas fly out and one of my guys from Chicago go with me, thinking maybe they would be potential candidates for the church in Orlando.</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">⚰️ The Funeral Connection</p>
                <p>On October 30th, I get a phone call that my grandmother in New Jersey passed away. I began to worry because I would have to cancel the service in Orlando to go to the funeral in New Jersey. My family told me something that shocked me—they said the funeral would be November 2nd and the burial on the 3rd, and it would be all done in Orlando!</p>
                
                <p>I questioned my family why would they bury my grandmother in Orlando if we didn't have any other family buried there. They explained how she wanted to be put to rest in Florida. I felt great about it because I could still honor my grandmother and not have to cancel the service. It worked out perfectly—I thought maybe it was too perfect, not knowing it was all by God's divine design.</p>
                
                <p>When we got to Orlando I conducted the funeral, and then on November 3rd we go to the burial ground to lay my grandmother to rest. While they were finishing up the burial, I noticed her last name Lee was on the head stone and I thought about when I was born I was named by my mothers last name of Lee. Why does this matter? God placed in my mind something that represented a Biblical principle that had to do with burial.</p>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-gray-300">🗿 The Biblical Principle of Burial</p>
                <p>Burial location was very important in Biblical days, and even now for Jewish people—something the gypsy people have in common with them. One reason the burial place was so important is it has to do with God's promise of the land. God had promised that Abraham's descendants would possess the land where he had been buried (Genesis 12:1-3). Also, Jacob knew that if he was buried in Canaan, his tomb would forever remain within the Promised Land. The fact that Abraham, Isaac, and Jacob would all be buried there—three generations—emphasized their belief in God's promise to give this land to their family.</p>
                
                <p>Burial was a mark of land ownership. The gypsy community also lay claim to a city by claiming their dead are buried there. So as I was thinking of all this, I said, "Lord, what are you doing?" Then God revealed to me that every Gypsy pastor that has ever ministered in Orlando never had any dead buried there. But I just thought it was just me and I'm always trying to connect things Biblically.</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">🔥 The Amazing Service</p>
                <p>That night we had an amazing service in Orlando with about sixty-five people. The anointing was strong and I ministered a message I had preached in Chicago weeks before about how your past doesn't determine your future. It was about Jephthah from the book of Judges chapter eleven. A person in the Bible that was rejected by his family and friends because they were ashamed of him, but later begged him for his help to fight against the enemy that was coming against them. They wanted his help because he was a mighty warrior and soldier.</p>
                
                <p>Then I called up the guys that I brought with me to say something for a few minutes. After they were done, God told me, "It isn't for them it's for you!" Then He showed me the people in the crowd, many were from Chicago but now live in Orlando. Like Jephthah, they rejected me and wanted nothing to do with me but God was about to make me their leader to help them fight against the enemy.</p>
                
                <p>He also showed me that just like a shepherd goes after the lost sheep, He was sending me to the lost sheep from Chicago now living in Orlando—which were at least one hundred people. They were not serving God and many were hurt and let down by other pastors and leaders in the past.</p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">🤔 The Confusion</p>
                <p>Again I thought maybe this is the enemy trying to confuse me, and trying to get me to leave a blessed people and a ministry that was in the midst of revival back in Chicago. At this time we were experiencing a mighty outpouring from God—there were five consecutive Sundays where we had to pull out extra chairs because there was no room. Most importantly, God was gracing us with His presence like never before and lives where changing. Also, we were raising up leaders that were about to start their own ministries.</p>
                
                <p>So I left Orlando very confused, trying to understand if this was the enemy or God? When I got back home I told Gina my wife what I thought God was telling me, and she told me I was crazy and that she's not leaving. I told her she was right and she walked out of the room. Then she came back and reminded me about when we were in Orlando in the winter of 2009 on vacation. I was outside next to the van we were about to get into, praying on the ground for the city of Orlando because I felt a heaviness for the people in the city. I got back in the car and I told her that, <span className="text-red-300 font-semibold">"I believe God wants me to be a pastor here one day."</span> I was blown away because I totally forgot about that statement. This made her think maybe it is God bringing this to pass now. But both of us were still confused and scared thinking about whether this was God.</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🌙 Dreams and Confirmations</p>
                <p>Then, over the course of a couple weeks, people began to come up to me saying they were having dreams that I was a minister in Florida and they were worried I was going to leave. At the same time, people were calling and saying that God was showing them that He was sending me to Orlando. I began to feel pressured and even depressed, wondering how I was going to leave my congregation, my family, my daughter, and granddaughter, my church and house that's paid off and a city and people that loves me—well, most of them. Not to mention a very good salary.</p>
                
                <p>I mean, pastors leave when things are bad not when things are good, right? Believe me, I wanted to leave many times but God always got me through my little pity parties. This was a time in the ministry that Gina and I definitely didn't want to leave; everything was going so well and we felt like we were in harvest season. I called my Administrative Bishop and explained what I was feeling and told him that I thought it might be the enemy trying to confuse me to get me out of my position.</p>
                
                <p>He responded with something that made me shift my thinking. He said, <span className="text-green-300 font-semibold">"Let me get this straight—you think the enemy is trying to get you to open up a ministry where people need it so they get saved and set free?"</span> It made me look at this whole thing from a different perspective.</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">⏰ The Tenth Year Prophecy</p>
                <p>I began to lose sleep, getting up in the middle of the night, thinking God if you want me to go I'll go. Then the heaviness would lift, but when I would wake up in the morning I would say no way, I can't leave—and then the heaviness would come back. Then I began to think about how around the second year of the ministry in Chicago I was explaining how I believed at the tenth year of the ministry God was going to send me somewhere else. I remember the guys getting upset with me and me telling them I would only leave if God put a burden upon me that I couldn't handle and gave me confirmations that I couldn't deny. All these things God was reminding me of I had totally forgotten, but God was showing me He had this planned from the beginning. It was no coincidence my ministry in Chicago was months away from its tenth-year anniversary.</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📞 The Prophetic Confirmation</p>
                <p>Gina and I began to pray and fast, asking for more confirmation. Then Gina recommended that I call a pastor friend of mine that truly works in the prophetic to come preach on a Wednesday night. I did, but I didn't call—I texted him because I didn't want him to hear the burden and hurt in my voice. If this was God He would use Him without me saying anything. So I text him and said, "Hey man, need a word." That's it. He didn't reply back until the next day, because he was on vacation, but God told him get off his vacation and come preach for me. I was excited for him to come because he prophesied many things for me and our church that God fulfilled.</p>
                
                <p>So right before the fast was over, I felt a warm circular feeling around my heart that I have never felt before with my walk with God. I felt God say to me, <span className="text-blue-300 font-semibold">"As Abraham left everything, I am telling you to do the same."</span> Because I kept complaining to God and questioning Him, asking how He could expect me to leave everything and everybody I have in Chicago. So I told Gina, "The pastor that's coming, he has to preach about how Abraham left everything—that's how I will know this is really God." Then she told me that God told her there's going to be a shift in the church, and that's what the pastor had to say too.</p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">🎯 The Perfect Message</p>
                <p>Wednesday came and we purposely went to church late. We didn't want to talk to anyone, especially the pastor. We wanted to see if this was really God. I gave him the mic and acted like everything was ok. He started off by saying how he felt a sorrowful spirit in the church; it was obviously me and Gina. He then began to explain how he wanted to preach another message, but God changed his message and he had to be sensitive to the Holy Spirit and needed to preach what God told him.</p>
                
                <p>Then he said, <span className="text-red-300 font-semibold">"I need to let you know that there is going to be a shift in this church!"</span> Gina looked at me and began to cry. Then He said turn to the book of Genesis chapter twelve which says:</p>
                
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>"The Lord had said to Abram, "Leave your native country, your relatives, and your father's family, and go to the land that I will show you. I will make you into a great nation. I will bless you and make you famous, and you will be a blessing to others. I will bless those who bless you and curse those who treat you with contempt. All the families on earth will be blessed through you." Genesis 12:1-3 NLT</p>
                </blockquote>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-400">👆 The Direct Confrontation</p>
                <p>He then began to preach how Abraham left everything and that God wants us to step out of our comfort zone and walk in faith and do what He has called us to do. I was blown away, but then after preaching for fifteen minutes about listening to God's voice and doing what He tells you by faith he began to explain how there's a blessing on my life. He said God wants to use me to save many people from hell and that the church cannot be selfish and hold on to me because God wants to use me.</p>
                
                <p>Then the pastor came up to me, straight to my face, pointed at me and said, <span className="text-green-300 font-semibold">"If God told you to go you have got to go!"</span> I couldn't believe what was happening, and people in the church knew too. At the altar call everyone began to weep, knowing God was moving me and about to do something new.</p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">💭 The Final Dream</p>
                <p>Right after the service, one of the servants of the church that I was truly concerned about approached me. He was there for only a short time, and his life had changed so dramatically and I was worried he would be hurt and leave the church. He explained how he would have been upset with me leaving, but God had to tell him first. I asked what do you mean? He said he had a dream the night before and God told him that Pastor Anthony will only be happy if I'm happy, and I won't be happy if Pastor Anthony stays in Chicago.</p>
                
                <p>Now I knew this was obviously God and not my emotions, feelings, and flesh. So I had a decision to make. Was I going to stay in my hometown where I was comfortable and everything was easy or was I going to be a Jonah and reject the Nineveh that God told me to go minister to?</p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📚 The Book Confirmation</p>
                <p>I told Gina afterward that we have to go right away. As all this was going on, I was writing this very book that you're reading—which was more confirmation to me. Precisely at the exact time God was calling me to go to unfamiliar territory, I was writing a book about a man of God that rejected the word of the Lord and went through a lot of unnecessary storms because of it.</p>
                
                <p>Long story short, we end up listening to the voice of God. Thank God that when we left a month or so later, after visiting and counseling with people and making sure the transition of my assistant pastor to senior pastor was ready to be filled we went forward. Also, after I left, my choir leader and armor bearer opened up another location in Chicago; I didn't know if it was God at the time or not, but I told him we would see in a year and then I would support him. Well, praise God—both churches just celebrated their second anniversary. They are doing an amazing job for the Lord. Also, I helped one of my other guys who was lead by the Lord to go to Canada to plant a church in Toronto because God lead me to tell him I felt like that was the city for him. He thought I was crazy at the start, but then he too received conformation from the Lord.</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-400">🏆 SFGM Orlando Success</p>
                <p>Thank God, SFGM Orlando is doing great. We thank God the Lord is moving in an awesome way. Sixty people have already been baptized in the first two years, there are hundreds of people in attendance, and God is raising up an army to impact the next generation for the glory of God.</p>
                
                <p>When I got to Orlando and the shipper was taking the cars off the truck, they placed my burgundy Chevy Cruz on the road. As I was looking at the scene, God reminded me of a dream I had years ago. I was in Florida and I got out of a burgundy car and walked into the house of a minister that used to be in Orlando but fell away from serving the Lord. In the dream I was rebuking him and encouraging him to stop being a bad witness and start serving the Lord again. In the background on a radio in the house was playing a preaching called a call you can't ignore—the message was about Jonah. In the dream I'm telling the minister you have to repent. At the time he was upset, but after I told him that he got up, started crying, and fell on me as his tears began to hit my face.</p>
                
                <p>Well right there God showed me outside of my Florida house looking at my burgundy car. By the way I didn't have this car when I had the dream years ago. God showed me the dream meant that He was going to use me to minister to this minister, which a few weeks ago I just did. Also, the compassion for the people that was on him now fell on me (tears) for the people.</p>
              </div>

              <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 text-center">
                <p className="text-lg font-semibold mb-4 text-yellow-300">🎯 The Final Question</p>
                <p>My question to you after you read all of this is when God speaks to you, will you listen? Maybe He's already speaking. Maybe you know where your Nineveh is and maybe you don't. Then start where you are—just like Jonah did, he started in his own hometown. Then he went to his Nineveh.</p>
                
                <p>If you're a minister, don't just go where the weather is nice and there are palm trees and it's comfortable. You might say yeah, but pastor you're in Florida. There's a difference—I was called here, I didn't come without God approving it first. I mentioned a lot of the confirmations because you shouldn't go anywhere without real Spirit lead confirmation like the word of God, signs, dreams, and most importantly the peace of the Lord. <span className="text-yellow-300 font-semibold">There's a difference between just going somewhere and being sent somewhere!</span></p>
                
                <p>Many people want to open up ministries in their own hometown because they're comfortable. I didn't start a ministry in Chicago because it was convenient; I did it because I was called and confirmed. And when I left, there were hundreds of people, money in the bank, and a person to take over leadership. Glory to God. <span className="text-yellow-300 font-semibold">Wherever you are and wherever you go, make sure it's where God has called you to be!</span></p>
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


