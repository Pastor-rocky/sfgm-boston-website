import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import {
  Paragraph,
  BlueSection,
  GreenSection,
  PurpleSection,
  RedSection,
  OrangeSection,
  YellowSection,
  InfoBox,
  WarningBox,
  BulletList,
  BulletItem,
} from "@/components/audio-player-text-template";

export default function BecomingAFireStarterCh6() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/uploads/firestarter-audio/fire-starter-cp6.mp3";

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
                  <span className="align-middle">Chapter 6</span>
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

            {/* Chapter 6: The Consuming Fire */}
            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">🔥 CHAPTER 6: THE CONSUMING FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Hebrews 12:28–29</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Wherefore we receiving a kingdom which cannot be moved, let us have grace, whereby we may serve God acceptably with reverence and godly fear: for our God is a consuming fire."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                I want to spend this chapter on the importance of prayer. Jesus said, "Abide in me, and I in you. As the branch cannot bear fruit of itself, except it abide in the vine; so neither can ye, except ye abide in me. I am the vine, ye are the branches: he that abideth in me, and I in him, the same beareth much fruit: for apart from me ye can do nothing." (John 15:4–5) The psalmist adds, "But it is good for me to draw near unto God: I have made the Lord Jehovah my refuge, that I may tell of all thy works." (Psalm 73:28) These verses show we must draw near—and stay near—to our Savior. Only then will our lives have lasting significance.
              </Paragraph>
              
              <Paragraph>
                Because God is a consuming fire, the more we abide in Him and draw near to Him, the more our lives will be set on fire and our character will become like Christ. One meaning of consume is to waste away or be exhausted. <strong>As we remain in His presence, the old nature slowly wastes away, and we become new in Christ.</strong>
              </Paragraph>
            </RedSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">📖 KEY SCRIPTURES ON PRAYER</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">Philippians 4:6</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Do not be anxious about anything, but in everything, by prayer and petition, with thanksgiving, present your requests to God."
                  </p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">Colossians 4:2</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Devote yourselves to prayer, being watchful and thankful."
                  </p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">1 Thessalonians 5:16–18</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Be joyful always; pray continually; give thanks in all circumstances, for this is God's will for you in Christ Jesus."
                  </p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">1 Timothy 2:1–4</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "I urge, then, first of all, that requests, prayers, intercession and thanksgiving be made for everyone—for kings and all those in authority, that we may live peaceful and quiet lives in all godliness and holiness. This is good, and pleases God our Savior, who wants all men to be saved and to come to a knowledge of the truth."
                  </p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">1 Timothy 2:8</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "I want men everywhere to lift up holy hands in prayer, without anger or disputing."
                  </p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">Hebrews 4:16</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Let us then approach the throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need."
                  </p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">James 1:6–7</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "But when he asks, he must believe and not doubt, because he who doubts is like a wave of the sea, blown and tossed by the wind. That man should not think he will receive anything from the Lord."
                  </p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">James 4:3</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "When you ask, you do not receive, because you ask with wrong motives, that you may spend what you get on your pleasures."
                  </p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">James 5:13–16</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Is any one of you in trouble? He should pray. Is anyone happy? Let him sing songs of praise. Is any one of you sick? He should call the elders of the church to pray over him and anoint him with oil in the name of the Lord. And the prayer offered in faith will make the sick person well; the Lord will raise him up. If he has sinned, he will be forgiven. Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous man is powerful and effective."
                  </p>
                </blockquote>
              </div>
            </BlueSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">🙏 JESUS' TEACHING ON PRAYER</h2>
              
              <Paragraph>
                Now listen closely to Jesus in Matthew 6:5–12:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Matthew 6:5–12</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "And when you pray, do not be like the hypocrites, for they love to pray standing in the synagogues and on the street corners to be seen by men. I tell you the truth, they have received their reward in full. But when you pray, go into your room, close the door and pray to your Father, who is unseen. Then your Father, who sees what is done in secret, will reward you. And when you pray, do not keep on babbling like pagans, for they think they will be heard because of their many words. Do not be like them, for your Father knows what you need before you ask him. This, then, is how you should pray: 'Our Father in heaven, hallowed be your name. Your kingdom come, your will be done on earth as it is in heaven. Give us today our daily bread. Forgive us our debts, as we also have forgiven our debtors.'"
                  </p>
                </blockquote>
              </div>

              <WarningBox>
                <p className="font-semibold mb-2">⚠️ "When You Pray" - Not "If" You Pray</p>
                <Paragraph>
                  Three times Jesus says, "When you pray." He expects us to pray. Not "if" you get around to it—but <strong>when you pray</strong>. It should be normal in a Christian's life, as it was for Jesus. His favorite place was the Mount of Olives.
                </Paragraph>
              </WarningBox>

              <Paragraph>
                Don't just want to pray in public or on request; do what Jesus said—go to your room, shut the door, and pray to your Father. Notice He didn't say, "God will hear you." He said, <strong>"Your Father... will see you."</strong> He will see your dedication and your hunger to be consumed by His fire, and He will reward you.
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Hebrews 11:6</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "But without faith it is impossible to please him: for he that cometh to God must believe that he is, and that he is a rewarder of them that diligently seek him."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">💡 The Greek Word for Diligently</p>
                <Paragraph>
                  The Greek word for diligently is <em>ekzēteō</em>, meaning:
                </Paragraph>
                <BulletList>
                  <BulletItem>to seek out, search for, investigate</BulletItem>
                  <BulletItem>to seek for oneself; to beg, crave</BulletItem>
                  <BulletItem>to demand back, require</BulletItem>
                </BulletList>
              </InfoBox>
            </PurpleSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">⛰️ MOSES AND THE DEVOURING FIRE</h2>
              
              <Paragraph>
                As you seek God's presence and investigate His Word—who He is and all He promises—you will begin to crave His fire, and you will require it by spending time with Him, like Moses did:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">Exodus 24:15–18</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "And Moses went up into the mount, and the cloud covered the mount. And the glory of Jehovah abode upon mount Sinai, and the cloud covered it six days: and the seventh day he called unto Moses out of the midst of the cloud. And the appearance of the glory of Jehovah was like devouring fire on the top of the mount in the eyes of the children of Israel. And Moses entered into the midst of the cloud, and went up into the mount: and Moses was in the mount forty days and forty nights."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">🔥 Hebrew Word Study: Devouring Fire</p>
                <Paragraph>
                  The Hebrew word for devouring here is <em>'akal</em>—"to eat, devour, burn up, consume." Like Moses, when we spend time with God, we are consumed by His fire and learn to hear His voice clearly so we can minister properly.
                </Paragraph>
              </InfoBox>

              <InfoBox>
                <p className="font-semibold mb-2">📅 The Significance of 40 Days</p>
                <Paragraph>
                  Moses stayed forty days and forty nights—the number forty in Scripture often points to <strong>life change</strong>. Our lives change when we develop a life of prayer.
                </Paragraph>
              </InfoBox>
            </GreenSection>

            <OrangeSection>
              <h2 className="text-2xl font-bold mb-6 text-orange-900">✈️ A PERSONAL TESTIMONY: THE ISRAEL TOUR</h2>
              
              <Paragraph>
                In 2007 I toured Israel, with a day in Athens. I stood on Mars Hill (Acts 17), visited Bethlehem, Nazareth, and the Sea of Galilee where Jesus walked on water, called His disciples, and delivered the demoniac. We worshiped at the Garden Tomb and I was baptized in the Jordan River. I even stood on the Mount of Olives—Jesus' favorite place to pray.
              </Paragraph>

              <Paragraph>
                People ask, "Did you feel different—closer to God?" It was a dream come true and deeply moving. But <strong>the strongest I ever felt God's presence wasn't in Israel.</strong>
              </Paragraph>

              <Paragraph>
                It was when I first got serious about Christ—when I shut down my crooked businesses, let go of the nice cars, and stopped scamming. I went broke. One day, oppressed and hopeless, with no money for the mortgage and no plan, I went into my office, shut the door, dropped to my knees, and cried, "God, please help me." As I lifted my hands, it felt like a thousand pounds lifted off my chest. I stayed there about seven hours—reading the Word, worshiping, and soaking in His presence—when a fragrance filled the room, like roses and cedar.
              </Paragraph>

              <Paragraph>
                My wife came in asking if I was burning incense. I wasn't. She returned with my mother-in-law; when she entered, her knees buckled and she said, <strong>"God is here."</strong> She added, "God's presence smells like this; Satan smells like garbage." Jesus called hell Gehenna—the garbage dump of His day.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">✨ God's Shekinah Glory</p>
                <Paragraph>
                  God's Shekinah glory filled that office. You don't have to go to Israel to experience God's presence. Do what Jesus said: go to your room and shut the door. When you pray, He will see you. He will take the garbage and fill your life with His glory—His fire—if you let Him.
                </Paragraph>
              </InfoBox>
            </OrangeSection>

            <YellowSection>
              <h2 className="text-2xl font-bold mb-6 text-yellow-900">⏰ DEVELOP A DAILY PRAYER TIME</h2>
              
              <Paragraph>
                We expect 100% from God—do we give Him even 1% of our day? One percent of a day is about 15 minutes. Do you spend at least that much with Him?
              </Paragraph>

              <WarningBox>
                <p className="font-semibold mb-2">⚠️ Many Want Everything But Give Nothing</p>
                <Paragraph>
                  Many want everything from God but won't give Him even that. Then they wonder why they're not on fire. <strong>Start spending time with God</strong>—not only in the prayer closet, but while driving, walking, working. Talk to Him. Fill your mind and heart with God, and you will be filled with God. You will never be consumed by His fire if you don't draw near to the consuming God.
                </Paragraph>
              </WarningBox>

              <Paragraph>
                On that 2007 tour, our guide told us about leading Neil Armstrong—the first man on the moon—to a site in Jerusalem that's unquestionably from Jesus' time. Standing in that same spot, he said Armstrong was like a kid in a candy store.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🌙 Neil Armstrong's Heart on Fire</p>
                <Paragraph>
                  Then Neil said, <strong>"For me to know I'm walking where my Lord Jesus Christ walked is better than me ever walking on the moon."</strong> His greatest earthly achievement couldn't compare to being where Jesus had been. That is a heart on fire for God.
                </Paragraph>
              </InfoBox>
            </YellowSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">⚡ GOD ANSWERS BY FIRE</h2>
              
              <Paragraph>
                Remember Chapter 1—when God answers with fire.
              </Paragraph>

              <Paragraph>
                When you are on fire for God, He answers by fire. When an evil king sent men to arrest Elijah:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">2 Kings 1:9–10</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Then he sent an officer with fifty men to get Elijah. The officer found him sitting on a hill and said to him, 'Man of God, the king orders you to come down.' 'If I am a man of God,' Elijah answered, 'may fire come down from heaven and kill you and your men!' At once fire came down and killed the officer and his men."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Prayer is spiritual warfare. <strong>God sends fire to destroy the enemy's works that hinder your life.</strong>
              </Paragraph>

              <Paragraph>
                Consider this: the earth's circumference is about 25,000 miles; the speed of light is about 186,282 miles per second. God is light, and His angels are often accompanied by light. When the church prayed for Peter, an angel appeared and "a light shone in the cell" (Acts 12:7). When Elisha prayed for his servant, "The Lord opened the servant's eyes, and he looked and saw the hills full of horses and chariots of fire all around Elisha." (2 Kings 6:17)
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">💫 Angels at the Speed of Light</p>
                <Paragraph>
                  If God is light and His angels are associated with light, then at the speed of light an angel could circle the earth more than seven times and still stand by your side in one second. <strong>Pray.</strong> I pray as Elisha did—may your eyes be opened to the fire of God.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                <strong>Nothing you can do or achieve will ever compare to the presence of our consuming God.</strong>
              </Paragraph>
            </PurpleSection>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

