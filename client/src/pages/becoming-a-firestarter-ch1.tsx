import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import {
  SectionHeading,
  Paragraph,
  ScriptureQuote,
  BlueSection,
  GreenSection,
  PurpleSection,
  RedSection,
  OrangeSection,
  YellowSection,
  BulletList,
  BulletItem,
  InfoBox,
  WarningBox,
  CenterText,
} from "@/components/audio-player-text-template";

export default function BecomingAFireStarterCh1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/uploads/textbook-audio/fire-starter-cp1.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/course/2">
            <Button variant="ghost" className="mb-4">
              ← Back to Course
            </Button>
          </Link>
        </div>

        {/* Audio Player Card */}
        <Card className="mb-8 bg-gradient-to-r from-orange-600 to-red-600 border-none shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <img
                src="/fire-starter-cover.jpg"
                alt="Fire Starter"
                className="w-24 h-auto rounded shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-1">
                  <span className="text-3xl align-text-top mr-1">🔥</span>
                  <span className="align-middle">Fire Starter</span>
                </h3>
                <p className="text-white/90 text-xl font-semibold">
                  <span className="align-middle">Chapter 1</span>
                  <span className="text-2xl align-text-top ml-1">🔥</span>
                </p>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                onClick={() => skip(-15)}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <SkipBack className="h-5 w-5" />
                <span className="ml-1 text-xs">15</span>
              </Button>
              <Button
                onClick={togglePlayPause}
                size="lg"
                className="bg-white text-orange-600 hover:bg-white/90 rounded-full h-14 w-14"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
              <Button
                onClick={() => skip(15)}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <span className="mr-1 text-xs">15</span>
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress Slider */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-white/90 text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 mt-4">
              <Volume2 className="h-4 w-4 text-white" />
              <Slider
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-24 cursor-pointer"
              />
            </div>

            {/* Audio Element */}
            <audio ref={audioRef} src={audioSrc} preload="metadata" />
          </CardContent>
        </Card>

        {/* Text Content Card */}
        <Card className="shadow-xl border-orange-200">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              
              {/* Acknowledgments */}
              <BlueSection>
                <h2 className="text-2xl font-bold mb-6 text-blue-900">🙏 ACKNOWLEDGMENTS</h2>
                <Paragraph>
                  First, I would like to thank all the people that helped pray for the success of this 
                  book. Thanks to Pastor Tim Stege for helping me to edit this book. Finally, thanks 
                  and God bless to all those who support Soldiers for God ministry so that this book 
                  can be produced.
                </Paragraph>
              </BlueSection>

              {/* Dedication */}
              <PurpleSection>
                <h2 className="text-2xl font-bold mb-6 text-purple-900">💝 DEDICATION</h2>
                <Paragraph>
                  This book is dedicated to my Lord and Savior, Jesus Christ, for giving me the 
                  wisdom and knowledge to put in writing what he has shown me through my walk 
                  with Him. Thank you Jesus for saving me and setting me on fire with the baptism 
                  of Your Holy Spirit.
                </Paragraph>
              </PurpleSection>

              {/* Introduction */}
              <OrangeSection>
                <h2 className="text-2xl font-bold mb-6 text-orange-900">🔥 INTRODUCTION</h2>
                <Paragraph>
                  <strong>What is a fire starter?</strong> A fire starter is a person that's on fire for God and helps 
                  others catch on fire for God as well!
                </Paragraph>
                <Paragraph>
                  <strong>What does it mean to be on fire for God?</strong> It means to be totally consumed by God's 
                  presence in your life, where it's all about Him and nothing else matters except 
                  pleasing God through your words and deeds and helping others do the same.
                </Paragraph>
                <InfoBox>
                  <p className="font-semibold mb-2">Are you ready? 🔥</p>
                  <BulletList>
                    <BulletItem>Are you hungering after the fire of God in your life?</BulletItem>
                    <BulletItem>Are you attempting to be zealous and obedient to His Word?</BulletItem>
                    <BulletItem>Are you ready to be set on fire by the Holy Spirit?</BulletItem>
                  </BulletList>
                </InfoBox>
                <Paragraph>
                  If you are, get ready to be set on fire by the Holy Spirit and stay on fire by reading 
                  and applying the information that's in this book. Because there is one thing you 
                  don't want to happen in your life and that is getting on fire for God and then letting 
                  the fire die down.
                </Paragraph>
                <WarningBox>
                  <p className="font-semibold mb-2">⚠️ The Danger of Losing the Fire</p>
                  <Paragraph>
                    A lot of people say that someone is on fire for God only to find out later down the 
                    road the person they said was on fire for God fell back into their old ways even 
                    more than before. People also say they are on fire for God, but then something 
                    happens, whether it be trials or temptations, and they fall back into their old sinful 
                    lifestyle as well and now all they have is their memory of the past when they used 
                    to be on fire for God. Why is this happening to people in the church today?
                  </Paragraph>
                </WarningBox>
                <Paragraph>
                  This is what this book you are about to read is going to answer; it is also going to 
                  show you how to get on fire for God and stay on fire for God––as well as spread 
                  the fire you have to other people for the glory of God.
                </Paragraph>
              </OrangeSection>

              {/* Author's Testimony */}
              <RedSection>
                <h2 className="text-2xl font-bold mb-6 text-red-900">📖 THE AUTHOR'S TESTIMONY</h2>
                <Paragraph>
                  For fifteen years of my life I attended church off and on. At church I would go 
                  through the motions and even sing in the choir; however, outside of church I was a 
                  completely different person. I physically abused my wife, I cheated on her, I 
                  treated my kids horribly, I had five crooked businesses, and I was filled with pride 
                  and anger. I was violent, fighting anyone who even gave me a hint of attitude––
                  once I pushed my own father through a wall. I was a scammer, a liar, a thief, and an 
                  adulterous person who used to party several times a week, getting drunk out of my 
                  mind. My wife was a fortune teller and I often conspired with her to con her 
                  customers.
                </Paragraph>
                <Paragraph>
                  The worst part of all this is I thought I was a Christian because I used to go to 
                  church and put a little money in the offering. I used to look at people in church and 
                  say to myself, "man I want what they have"; I didn't understand it––I went to 
                  church, I believed in Jesus, but why wasn't I excited like they were, why couldn't I 
                  get involved in the worship like they did, why didn't I have the zeal they had, why 
                  am I not on fire for God like them?
                </Paragraph>
              </RedSection>

              {/* The Turning Point */}
              <GreenSection>
                <h2 className="text-2xl font-bold mb-6 text-green-900">💡 THE TURNING POINT</h2>
                <Paragraph>
                  I really thought I was a Christian so I should have had what they had. One day, in 
                  October of 2004, I started to realize why I didn't have what they had. My mother 
                  in-law came in town and she said to me "Anthony you can go to church, you can 
                  pray, you can fast, and you can sing in the choir but if you are not in the Word of 
                  God it is all meaningless."
                </Paragraph>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "You can go to church, you can pray, you can fast, and you can sing in the choir 
                    but if you are not in the Word of God it is all meaningless."
                  </p>
                </blockquote>
                <Paragraph>
                  Then she gave me a Bible book store address and told me to go and buy a bible, 
                  so I listened and respected what she said because she was a person that 
                  preached Christianity with her mouth shut. What do I mean by saying that? She 
                  lived Christianity––not just talked about it. I used to treat her daughter horribly but 
                  she never argued with me, she never said anything negative to me, the only thing 
                  she did was pray for me. So that day I went and bought my first Bible, a New Living 
                  Translation. It was a Bible that can be read through in a year and it was an easy to 
                  understand Bible.
                </Paragraph>
                <Paragraph>
                  That day I started reading. I started in the Gospel of John, and in a few days I 
                  realized that I really wasn't a Christian and if I was to die I would have gone to Hell 
                  (Galatians 5:19). I also realized God's grace and love for my life and for the world 
                  (John 3:16). I also realized why I wasn't like the other people in the church who 
                  appeared to be passionately on fire for God; it was because of my sinful lifestyle 
                  and my unwillingness to obey His Word.
                </Paragraph>
              </GreenSection>

              {/* The Transformation */}
              <YellowSection>
                <h2 className="text-2xl font-bold mb-6 text-yellow-900">✨ THE TRANSFORMATION</h2>
                <Paragraph>
                  I started reading the Bible every day and in one year I read the whole Bible cover 
                  to cover. In that year God delivered me from pride, anger, bitterness, adultery, lust, 
                  drinking, smoking, slander, gossiping, lying, scamming, witchcraft, and cheating. I 
                  gave up all the crooked businesses!
                </Paragraph>
                <InfoBox>
                  <p className="font-semibold mb-2">🔥 From Basement to Building</p>
                  <Paragraph>
                    In that year I started hosting Bible studies in the basement of my house. In 2004 it 
                    started with about 15 people. We were set on fire; it was like the day of Pentecost 
                    with the disciples in the upper room! Since then until now, 2011, it has grown into a 
                    full-blown ministry with the Church of God. The Church of God denomination has 
                    given us a building; the building they gave us is the church I grew up in. I am now 
                    the pastor of the church I grew up in! Only God can do that.
                  </Paragraph>
                </InfoBox>
                <Paragraph>
                  My point of telling you a part of my testimony is this––God can change anyone if 
                  they are willing to be changed. Jesus said "the spirit is willing but the flesh is 
                  weak" (Matthew 26:41). If God can change my life He can change anyone's; if you 
                  allow the Holy Spirit to move in your life through the Word of God that you are 
                  going to read in this book you will be set on fire by God and your life will never be 
                  the same!
                </Paragraph>
                <div className="mb-6">
                  <blockquote className="border-l-4 border-orange-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "I baptize you with water for repentance. But after me comes one who is more powerful 
                      than I, whose sandals I am not worthy to carry. He will baptize you with the Holy Spirit 
                      and fire." — Matthew 3:11
                    </p>
                  </blockquote>
                </div>
                <CenterText>
                  <p className="text-xl font-bold text-orange-600">
                    I am going to teach you through the Word of God how to be baptized by FIRE so 
                    you can become a FIRE starter in your family, in your friends' lives, and in your 
                    ministry! 🔥
                  </p>
                </CenterText>
              </YellowSection>

              {/* Chapter 1: When God Answers with Fire */}
              <BlueSection>
                <h2 className="text-2xl font-bold mb-6 text-blue-900">🔥 CHAPTER 1: WHEN GOD ANSWERS WITH FIRE</h2>
                <Paragraph>
                  When you look at the story of Cain and Abel you will discover the first offering 
                  unto the Lord. There were actually two offerings, but only one was acceptable to 
                  God.
                </Paragraph>
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-blue-900">Genesis 4:3-8</p>
                  <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      After some time Cain brought some of his harvest and gave it as an offering to the 
                      LORD. Then Abel brought the first lamb born to one of his sheep, killed it, and 
                      gave the best parts of it as an offering. The LORD was pleased with Abel and his 
                      offering, but he rejected Cain and his offering. Cain became furious, and he 
                      scowled in anger.
                    </p>
                    <p className="mt-2">
                      Then the LORD said to Cain, "Why are you angry? Why that scowl on your face? If 
                      you had done the right thing, you would be smiling; but because you have done 
                      evil, sin is crouching at your door. It wants to rule you, but you must overcome it."
                    </p>
                    <p className="mt-2">
                      Then Cain said to his brother Abel, "Let's go out in the fields." When they were out 
                      in the fields, Cain turned on his brother and killed him.
                    </p>
                  </blockquote>
                </div>
              </BlueSection>

              {/* The Difference Between Cain and Abel */}
              <PurpleSection>
                <h2 className="text-2xl font-bold mb-6 text-purple-900">⚖️ THE DIFFERENCE BETWEEN CAIN AND ABEL</h2>
                <Paragraph>
                  If you notice in the story, Cain brought some of his harvest while Abel brought the 
                  best he had. One was a farmer, one was a Shepherd; they each brought what they 
                  had from their labors, but one gave the best while the other merely gave some. 
                  Why didn't God accept it? The answer might be that God cursed the ground 
                  because Adam had disobeyed God's Word.
                </Paragraph>
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-purple-900">Genesis 3:17</p>
                  <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "And he said to the man, 'You listened to your wife and ate the fruit which I told you 
                      not to eat. Because of what you have done, the ground will be under a curse. You 
                      will have to work hard all your life to make it produce enough food for you.'"
                    </p>
                  </blockquote>
                </div>
                <WarningBox>
                  <p className="font-semibold mb-2">⚠️ Incomplete Obedience is Total Disobedience!</p>
                  <Paragraph>
                    This is just like us today. We try to give God some of our lives but not all and not 
                    the best. Incomplete obedience is total disobedience! Then we, like Cain, get 
                    upset at God and other people in the church because we are not receiving our 
                    blessings and we are not being used and we say things like, "I don't understand 
                    why God is doing this to me," or, "why is that person getting blessed and I'm not?".
                  </Paragraph>
                </WarningBox>
                <Paragraph>
                  Could it be that you are not giving your all to the Lord? See, Cain gave God 
                  something that was from the ground that was previously cursed and God didn't 
                  accept it. You cannot live a life of disobedience like I was living prior to my born 
                  again experience and expect God to answer your prayers, bless you and set you on 
                  fire. The Bible says when you live in disobedience you fall in to the curse of the 
                  world. (Deuteronomy 28:15-20). You might say Jesus took all the curses of the 
                  world and the curse of sin; He did (see Galatians 3:13), but if you are not abiding in 
                  Jesus, living for Him, and obeying Him, you disqualify yourself from this (John 15) 
                  and you, like Cain, open the door to Satan (Genesis 4:7) and allow him to destroy 
                  you. You end up living a cursed, miserable, angry life because of disobedience to 
                  God.
                </Paragraph>
              </PurpleSection>

              {/* Living Sacrifice */}
              <OrangeSection>
                <h2 className="text-2xl font-bold mb-6 text-orange-900">🙏 LIVING SACRIFICE</h2>
                <Paragraph>
                  Look what God says through the apostle Paul to the church:
                </Paragraph>
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-orange-900">Romans 12:1-2</p>
                  <blockquote className="border-l-4 border-orange-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      So then, my friends, because of God's great mercy to us I appeal to you: Offer 
                      yourselves as a living sacrifice to God, dedicated to his service and pleasing to 
                      him. This is the true worship that you should offer. Do not conform yourselves to 
                      the standards of this world, but let God transform you inwardly by a complete 
                      change of your mind. Then you will be able to know the will of God---what is good 
                      and is pleasing to him and is perfect.
                    </p>
                  </blockquote>
                </div>
                <InfoBox>
                  <p className="font-semibold mb-2">💡 The Meaning of Living Sacrifice</p>
                  <Paragraph>
                    If you were to bring a sacrifice back then to the temple the priest would take the 
                    animal and usually cut the neck, meaning the animal is not coming back. So to 
                    present yourself as a living sacrifice means to constantly die to self on an every 
                    day level––it means to constantly crucify the flesh and not give in to the lust of the 
                    flesh, lust of the eye and the pride of life (1 John 2:16-17).
                  </Paragraph>
                </InfoBox>
                <Paragraph>
                  When you want to live a life like that then you will know the will of God and then 
                  you will be pleasing to Him and then God will accept your offering which is your 
                  reasonable act of service!
                </Paragraph>
                <Paragraph>
                  What does the story have to do with fire? Well, when you would bring a sacrifice to 
                  the priests they would put it on the altar and burn it. Before the tabernacle or the 
                  temple was built and established God would accept people's offerings by sending 
                  fire from heaven to consume it. Some theologians and scholars believe the reason 
                  Cain knew God didn't accept His offering is because God didn't send fire from 
                  heaven to consume it. They believe God sent fire from heaven to consume Abel's 
                  offering and that is how Cain knew God did not accept his offering.
                </Paragraph>
              </OrangeSection>

              {/* Biblical Examples */}
              <GreenSection>
                <h2 className="text-2xl font-bold mb-6 text-green-900">📚 BIBLICAL EXAMPLES OF GOD'S FIRE</h2>
                
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-green-800 mb-3">🗡️ Gideon, the Mighty Man of Valor</h4>
                  <Paragraph>
                    His story is in the book of Judges. God called Gideon to go against the enemies of 
                    Israel. The problem was he was scared and in doubt but he soon realized God was 
                    with Him and He presented the Lord an offering:
                  </Paragraph>
                  <div className="mb-6">
                    <p className="font-semibold mb-2 text-green-900">Judges 6:19-22</p>
                    <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                      <p>
                        So Gideon went into his house and cooked a young goat and used a bushel of flour 
                        to make bread without any yeast. He put the meat in a basket and the broth in a 
                        pot, brought them to the LORD's angel under the oak tree, and gave them to him.
                      </p>
                      <p className="mt-2">
                        The angel told him, "Put the meat and the bread on this rock, and pour the broth 
                        over them." Gideon did so.
                      </p>
                      <p className="mt-2">
                        Then the LORD's angel reached out and touched the meat and the bread with the 
                        end of the stick he was holding. Fire came out of the rock and burned up the meat 
                        and the bread. Then the angel disappeared.
                      </p>
                      <p className="mt-2">
                        Gideon then realized that it was the LORD's angel he had seen, and he said in 
                        terror, "Sovereign LORD! I have seen your angel face-to-face!"
                      </p>
                    </blockquote>
                  </div>
                  <CenterText>
                    <p className="text-lg font-bold text-green-700">God accepted his offering with FIRE! 🔥</p>
                  </CenterText>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-green-800 mb-3">⚡ Elijah, the Powerful Man of God</h4>
                  <Paragraph>
                    In the story we are going to look at, Israel was living in idolatry, worshipping the 
                    false god called Baal. This god was worshipped because they believed he was a 
                    god of increase and plenty. Sometimes we get like the Israelites––we think we 
                    have to do our own thing to be provided for, so we scam, steal, and connive to get 
                    what we want, which is idolatry. We worship money, and Jesus said we have a 
                    choice––either serve God or money, you cannot serve both! The Israelites should 
                    have remembered that one of the names of God is Jehovah-jireh, the Lord our 
                    Provider (Genesis 22:14).
                  </Paragraph>
                  <WarningBox>
                    <p className="font-semibold">💰 Next time remember that name before you fall for idolatry and serve money!</p>
                  </WarningBox>
                  <Paragraph>
                    In the story, you have Elijah challenging the wicked Queen Jezebel's 450 false 
                    prophets of Baal in an old western-style showdown to see who is the true God:
                  </Paragraph>
                  <div className="mb-6">
                    <p className="font-semibold mb-2 text-green-900">1 Kings 18:21-24</p>
                    <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                      <p>
                        Elijah went up to the people and said, "How much longer will it take you to make 
                        up your minds? If the LORD is God, worship him; but if Baal is God, worship him!" 
                        But the people didn't say a word.
                      </p>
                      <p className="mt-2">
                        Then Elijah said, "I am the only prophet of the LORD still left, but there are 450 
                        prophets of Baal. Bring two bulls; let the prophets of Baal take one, kill it, cut it in 
                        pieces, and put it on the wood---but don't light the fire. I will do the same with the 
                        other bull. Then let the prophets of Baal pray to their god, and I will pray to the 
                        LORD, and the one who answers by sending fire---he is God." The people shouted 
                        their approval.
                      </p>
                    </blockquote>
                  </div>
                  <InfoBox>
                    <p className="mb-2">
                      I would really strongly suggest you read the whole chapter of 1 Kings 18, it is a 
                      really good story; but to get to the main point Elijah tells them "you built an altar I'll 
                      build an altar and whoever the true God is will send down fire to consume the 
                      offering." Elijah waits for them to get their offering and put it on the altar, then he 
                      starts taunting them, suggesting that their god is not home or is asleep. The 
                      people tried everything––they prayed to the false god, they danced, they cut 
                      themselves, they shouted––nothing happened. Then Elijah called to the people:
                    </p>
                  </InfoBox>
                  <div className="mb-6">
                    <p className="font-semibold mb-2 text-green-900">1 Kings 18:30-39</p>
                    <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                      <p>
                        Then Elijah said to the people, "Come closer to me," and they all gathered around 
                        him. He set about repairing the altar of the LORD which had been torn down. He 
                        took twelve stones, one for each of the twelve tribes named for the sons of Jacob, 
                        the man to whom the LORD had given the name Israel.
                      </p>
                      <p className="mt-2">
                        With these stones he rebuilt the altar for the worship of the LORD. He dug a trench 
                        around it, large enough to hold about four gallons of water.
                      </p>
                      <p className="mt-2">
                        Then he placed the wood on the altar, cut the bull in pieces, and laid it on the 
                        wood. He said, "Fill four jars with water and pour it on the offering and the wood." 
                        They did so, and he said, "Do it again"---and they did. "Do it once more," he 
                        said---and they did. The water ran down around the altar and filled the trench.
                      </p>
                      <p className="mt-2">
                        At the hour of the afternoon sacrifice the prophet Elijah approached the altar and 
                        prayed, "O LORD, the God of Abraham, Isaac, and Jacob, prove now that you are 
                        the God of Israel and that I am your servant and have done all this at your 
                        command. Answer me, LORD, answer me, so that this people will know that you, 
                        the LORD, are God and that you are bringing them back to yourself."
                      </p>
                      <p className="mt-2 font-bold">
                        The LORD sent fire down, and it burned up the sacrifice, the wood, and the stones, 
                        scorched the earth and dried up the water in the trench.
                      </p>
                      <p className="mt-2 font-bold">
                        When the people saw this, they threw themselves on the ground and exclaimed, 
                        "The LORD is God; the LORD alone is God!"
                      </p>
                    </blockquote>
                  </div>
                  <InfoBox>
                    <p className="font-semibold mb-2">🔥 Stand Out Like Elijah!</p>
                    <Paragraph>
                      You may notice in the story that Elijah rebuilt the altar of the LORD. It is time for us 
                      to realize it is not only about praying, dancing, and shouting– it is about rebuilding 
                      in your life what God wanted from the beginning, a person that will lay down their 
                      life and sacrifice all for Him! When you do that people will notice God's fire in your 
                      life and they will return to the LORD as the people in the story did. They also 
                      caught the false prophets and killed every one of them. It is time for us to stand 
                      out like Elijah did; God has not called us to blend in, He has called us to stand out!
                    </Paragraph>
                  </InfoBox>
                  <CenterText>
                    <p className="text-lg font-bold text-green-700">When you do this God will answer with FIRE! 🔥</p>
                  </CenterText>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-green-800 mb-3">👑 King Solomon</h4>
                  <Paragraph>
                    In this story King Solomon just finished building the temple of the LORD and he is 
                    dedicating it to God; this is where the offerings were to be brought. He prays in 
                    chapter six that God will live in the temple, that God will help His people, He will 
                    hear their prayers, and when the people mess up if they will repent He will forgive 
                    them and restore them.
                  </Paragraph>
                  <Paragraph>Look what happens when you get to chapter seven:</Paragraph>
                  <div className="mb-6">
                    <p className="font-semibold mb-2 text-green-900">2 Chronicles 7:1-5</p>
                    <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                      <p className="font-bold">
                        When King Solomon finished his prayer, fire came down from heaven and burned 
                        up the sacrifices that had been offered, and the dazzling light of the LORD's 
                        presence filled the Temple. Because the Temple was full of the dazzling light, the 
                        priests could not enter it.
                      </p>
                      <p className="mt-2">
                        When the people of Israel saw the fire fall from heaven and the light fill the Temple, 
                        they fell face downward on the pavement, worshiping God and praising him for his 
                        goodness and his eternal love. Then Solomon and all the people offered sacrifices 
                        to the LORD. He sacrificed 22,000 head of cattle and 120,000 sheep as fellowship 
                        offerings. And so he and all the people dedicated the Temple.
                      </p>
                    </blockquote>
                  </div>
                </div>
              </GreenSection>

              {/* We Are the Complete Worship System */}
              <BlueSection>
                <h2 className="text-2xl font-bold mb-6 text-blue-900">⛪ WE ARE THE COMPLETE WORSHIP SYSTEM</h2>
                <Paragraph>
                  If you keep reading you will see that the altar was not big enough to hold all the 
                  sacrifices that King Solomon gave to God, so they had to use the temple courts! 
                  This is what we need to realize: Solomon's temple no longer stands, but remember 
                  the Bible says we are the temple of God! Read the following passages:
                </Paragraph>
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-blue-900">1 Corinthians 6:19-20</p>
                  <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      Don't you know that your body is the temple of the Holy Spirit, who lives in you 
                      and who was given to you by God? You do not belong to yourselves but to God; he 
                      bought you for a price. So use your bodies for God's glory.
                    </p>
                  </blockquote>
                </div>
                <Paragraph>
                  There is no longer a Levitical priesthood to take our offerings of sacrifice, but the 
                  Bible says we are a royal Priesthood!
                </Paragraph>
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-blue-900">1 Peter 2:9-10</p>
                  <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      But ye are an elect race, a royal priesthood, a holy nation, a people for God's own 
                      possession, that ye may show forth the excellencies of him who called you out of 
                      darkness into his marvellous light: who in time past were no people, but now are 
                      the people of God: who had not obtained mercy, but now have obtained mercy.
                    </p>
                  </blockquote>
                </div>
                <InfoBox>
                  <p className="font-semibold mb-3">✨ The Complete Picture</p>
                  <BulletList>
                    <BulletItem><strong>We are the temple</strong></BulletItem>
                    <BulletItem><strong>We are the priest</strong></BulletItem>
                    <BulletItem><strong>We are the sacrifice</strong></BulletItem>
                  </BulletList>
                  <p className="mt-3 font-bold">We are the whole worship system!</p>
                </InfoBox>
                <Paragraph>
                  There is no more bringing your sacrifice to the temple because Jesus Christ was 
                  the supreme offering unto God! As Christ was a sacrifice we should also live a life 
                  of sacrifice because the Bible says we are the sacrifice, as the Apostle Paul writes: 
                  "So then, my friends, because of God's great mercy to us I appeal to you: Offer 
                  yourselves as a living sacrifice to God, dedicated to his service and pleasing to 
                  him. This is the true worship that you should offer" (Romans 12:1).
                </Paragraph>
                <CenterText>
                  <p className="text-xl font-bold text-blue-700 mb-2">So where is the fire? 🔥</p>
                  <p className="text-lg font-semibold text-blue-600">
                    Because there is no worship, if there isn't any fire!
                  </p>
                </CenterText>
                <Paragraph>
                  Like Solomon we should see fire and God's presence fill our temples. When 
                  Solomon presented his offering, God answered and accepted it with FIRE!
                </Paragraph>
              </BlueSection>

              {/* Conclusion */}
              <RedSection>
                <h2 className="text-2xl font-bold mb-6 text-red-900">🎯 CONCLUSION</h2>
                <Paragraph>
                  If you look at the stories of Abel, Gideon, Elijah, and King Solomon, you will notice 
                  their lives were pleasing unto God and God answered their prayers and accepted 
                  their offerings and He answered with FIRE! When your life is not pleasing to God 
                  you will not see the fire and praise in your life.
                </Paragraph>
                <CenterText>
                  <p className="text-xl font-bold text-red-700 mb-4">
                    So the question you need to ask yourself is are you pleasing unto God? 🔥
                  </p>
                </CenterText>
                <InfoBox>
                  <p className="font-semibold mb-2">✅ If you say no, well praise God! You're reading the right book!</p>
                  <Paragraph>
                    If you apply what you read you will become set on fire by God's presence and you too will become a fire 
                    starter. If you don't apply it you will live a life like Cain, unaccepted, destroyed by 
                    the enemy, angry and jealous of people who are on fire for God and you will live in 
                    regret! It is time for you to start living the life God called you to live––accepted, 
                    redeemed, set free and blessed!
                  </Paragraph>
                </InfoBox>
                <CenterText>
                  <p className="text-lg italic text-red-700 mt-6">
                    To a true Christian it shouldn't be a choice. Read the next chapter and I'll explain...
                  </p>
                </CenterText>
              </RedSection>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

