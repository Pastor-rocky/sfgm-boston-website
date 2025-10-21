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

export default function BecomingAFireStarterCh10() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/uploads/firestarter-audio/fire-starter-cp10.mp3";

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
                  <span className="align-middle">Chapter 10</span>
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

            {/* Chapter 10: Conclusion */}
            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">🔥 CHAPTER 10: CONCLUSION</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Zechariah 4:6</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Then he answered and spake unto me, saying, This is the word of Jehovah unto Zerubbabel, saying, Not by might, nor by power, but by my Spirit, saith Jehovah of hosts."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Zerubbabel was helping restore the temple but faced opposition. God gave Zechariah a vision of a golden lampstand fed directly by two olive trees—oil flowing straight into the lamps—then said, <strong>"Not by might, nor by power, but by my Spirit."</strong>
              </Paragraph>

              <Paragraph>
                In the temple, priests kept the lamps filled with oil so the fire would continually burn. The vision shows that God can supply His own oil and His own fire; yet He invites us to serve. <strong>Today we are the temple, the priesthood, and the living sacrifice.</strong> Our part is to maintain the anointing through obedience.
              </Paragraph>
            </PurpleSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">🔑 THE SEVEN KEYS TO KEEPING THE FLAME BURNING</h2>
              
              <Paragraph>
                If you apply the seven keys from this book, you will find it far easier to keep the flame burning:
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🔥 The Seven Keys</p>
                <BulletList>
                  <BulletItem><strong>1.</strong> The Word of God daily</BulletItem>
                  <BulletItem><strong>2.</strong> Eyes free from lust</BulletItem>
                  <BulletItem><strong>3.</strong> Passing the tests</BulletItem>
                  <BulletItem><strong>4.</strong> Time in prayer</BulletItem>
                  <BulletItem><strong>5.</strong> Time in fasting</BulletItem>
                  <BulletItem><strong>6.</strong> Godly fellowship</BulletItem>
                  <BulletItem><strong>7.</strong> Spreading the Word by witnessing</BulletItem>
                </BulletList>
              </InfoBox>

              <Paragraph>
                God does not need us—He could set two olive trees beside every lamp—but He wants to use us. <strong>We must submit.</strong>
              </Paragraph>
            </BlueSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">🕊️ THE BROKEN ALABASTER JAR</h2>
              
              <Paragraph>
                Recently, during a two-day revival at our church, the choir sang, "Lord, I am broken in pieces, but your strength is perfect in all of my weakness." As we worshiped, a bottle of anointing oil fell from the pulpit and shattered. No one touched it. The fragrance filled the sanctuary, reminding me of the woman who broke the alabaster jar to anoint Jesus (John 12).
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">💎 When We Allow God to Break Us</p>
                <Paragraph>
                  I believe the Lord illustrated this truth: when we allow Him to break us and rely on His strength, the anointing flows, and a beautiful fragrance rises to Him—and to the world.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                In the days that followed, testimonies came:
              </Paragraph>

              <BulletList>
                <BulletItem>An eye surgery was canceled because it was no longer needed</BulletItem>
                <BulletItem>A cancer was found contained and removed without spread</BulletItem>
                <BulletItem>A servant received the gift of tongues</BulletItem>
                <BulletItem>Many rededicated their lives and were set on fire</BulletItem>
              </BulletList>
            </GreenSection>

            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">🪰 GET THE FLIES OUT</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Ecclesiastes 10:1</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Dead flies cause the oil of the perfumer to send forth an evil odor; so doth a little folly outweigh wisdom and honor."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                If we refuse to be broken, we hinder the anointing and give off a foul odor. In Moses' day, the apothecary compounded the holy anointing oil used to consecrate the tabernacle and priests (Exodus 30:25). If flies fell into the jars, the perfume spoiled.
              </Paragraph>

              <WarningBox>
                <p className="font-semibold mb-2">⚠️ Jesus Called Satan "Beelzebub" (Lord of the Flies)</p>
                <Paragraph>
                  If we cling to "flies" like gossip, slander, unforgiveness, anger, offenses, bitterness, lust, adultery, pornography, greed, lies, addictions, and the like, we will never burn brightly.
                </Paragraph>
              </WarningBox>

              <Paragraph>
                Get the flies out and yield to the Spirit: <strong>"Not by might, nor by power, but by my Spirit, saith the Lord of hosts."</strong> God wants to use you to spread His fire; if you truly seek Him, He will set you on fire—so people will come watch you burn.
              </Paragraph>
            </RedSection>

            <OrangeSection>
              <h2 className="text-2xl font-bold mb-6 text-orange-900">🏛️ AZUSA STREET: HISTORY BEARS WITNESS</h2>
              
              <Paragraph>
                In 1906, at Azusa Street in Los Angeles, a great awakening erupted. Pastors and leaders came from around the world; they carried the flame home, kindling Pentecostal fires in their nations. Today, hundreds of millions trace their spiritual heritage to that move, with tens of thousands coming to Christ daily.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🔥 They Saw the Fire</p>
                <Paragraph>
                  During one Azusa meeting, firemen reportedly arrived because onlookers saw flames atop the building. There was no natural fire—God allowed them to glimpse the spiritual blaze.
                </Paragraph>
              </InfoBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-orange-900">Hebrews 13:8</p>
                <blockquote className="border-l-4 border-orange-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Jesus Christ is the same yesterday, today, and forever."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                If He sent fire on the disciples in the upper room and at Azusa Street, <strong>He can and will do it for you.</strong>
              </Paragraph>
            </OrangeSection>

            <YellowSection>
              <h2 className="text-2xl font-bold mb-6 text-yellow-900">💡 LIGHTHOUSES JUST SHINE</h2>
              
              <Paragraph>
                Everyone who truly gets on fire and stays on fire spreads that fire for God's glory.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🕯️ D.L. Moody on Shining</p>
                <Paragraph>
                  D. L. Moody said, "We are told to let our light shine, and if it does, we won't need to tell anybody it does. <strong>Lighthouses don't fire cannons to call attention to their shining—they just shine.</strong>"
                </Paragraph>
              </InfoBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-yellow-900">Psalm 104:4</p>
                <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "The winds are your messengers, and flames of fire are your servants."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Allow God to break and anoint your life so you can get set on fire, stay on fire, and spread the fire of God.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🔥 Final Charge</p>
                <Paragraph>
                  <strong>Go start some fires!</strong>
                </Paragraph>
              </InfoBox>
            </YellowSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">📚 ADDITIONAL RESOURCES</h2>
              
              <Paragraph>
                If this book has blessed you and you would like additional copies or other resources from Pastor Anthony—such as CDs and other books—please contact:
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">📧 Contact Information</p>
                <BulletList>
                  <BulletItem><strong>Email:</strong> anthonysfgm@gmail.com</BulletItem>
                  <BulletItem><strong>Phone:</strong> 708-296-7663</BulletItem>
                </BulletList>
              </InfoBox>

              <InfoBox>
                <p className="font-semibold mb-2">📱 Daily Devotions</p>
                <Paragraph>
                  You can receive Pastor Anthony's two-minute daily devotions via cell phone. Text the number above to subscribe. Type "add me" with your name and number to begin receiving these free messages.
                </Paragraph>
              </InfoBox>

              <InfoBox>
                <p className="font-semibold mb-2">🎤 Speaking Requests</p>
                <Paragraph>
                  Pastor Anthony Lee is available to minister at your church, small group, or retreat. Contact him at the email or phone above to schedule.
                </Paragraph>
              </InfoBox>
            </GreenSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">👤 ABOUT THE AUTHOR</h2>
              
              <Paragraph>
                Pastor Anthony is the senior pastor of Soldiers for God Ministry in Chicago, IL. He ministers to a Roma Gypsy congregation and evangelizes across the city and country. He carries a powerful testimony of God's transformative power and shares it in the power of the Holy Spirit. God has used this testimony to deliver many from the bonds of sin.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">📖 Third Book</p>
                <Paragraph>
                  <em>Becoming a Fire Starter</em> is Pastor Anthony's third book.
                </Paragraph>
              </InfoBox>
            </BlueSection>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

