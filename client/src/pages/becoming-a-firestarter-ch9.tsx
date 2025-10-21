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

export default function BecomingAFireStarterCh9() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/uploads/firestarter-audio/fire-starter-cp9.mp3";

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
                  <span className="align-middle">Chapter 9</span>
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

            {/* Chapter 9: Fan the Fire */}
            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">🔥 CHAPTER 9: FAN THE FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">2 Timothy 1:5–8</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "I remember your genuine faith, for you share the faith that first filled your grandmother Lois and your mother, Eunice. And I know that same faith continues strong in you. This is why I remind you to fan into flames the spiritual gift God gave you when I laid my hands on you. For God has not given us a spirit of fear and timidity, but of power, love, and self-discipline. So never be ashamed to tell others about our Lord. And don't be ashamed of me, either, even though I'm in prison for him. With the strength God gives you, be ready to suffer with me for the sake of the Good News."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                In his final letter (2 Timothy), Paul encourages Timothy about his sincere faith, nurtured by godly women who taught him the Word. Then he urges him to <strong>"fan into flame"</strong> the gift God gave him and to face persecution, trial, and tribulation without fear—by boldly spreading the gospel.
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Matthew 28:18–20</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "And Jesus came to them and spake unto them, saying, All authority hath been given unto me in heaven and on earth. Go ye therefore, and make disciples of all the nations, baptizing them into the name of the Father and of the Son and of the Holy Spirit: teaching them to observe all things whatsoever I commanded you: and lo, I am with you always, even unto the end of the world."
                  </p>
                </blockquote>
              </div>

              <WarningBox>
                <p className="font-semibold mb-2">⚠️ The Last Thing Jesus Said Should Be the First Thing We Do</p>
                <Paragraph>
                  Shouldn't the last thing Jesus said be the first thing we do? <strong>Go. Make disciples. Baptize. Teach obedience.</strong> Paul's charge to Timothy—fan the flames—echoes this.
                </Paragraph>
              </WarningBox>

              <Paragraph>
                "Go" is a verb. Too often we talk about witnessing, even pray about it, but never go—and then wonder why the fire dies down. <strong>We must fan the fire by ministering to people.</strong>
              </Paragraph>
            </RedSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">🚶 DON'T WAIT TO BE INVITED - JUST GO</h2>
              
              <Paragraph>
                I once took an eight-week witnessing course, <em>The Way of the Master</em>. The plan was to hit downtown Chicago afterward. We prayed for boldness (Romans 1:16). But we never went out together. God showed me we shouldn't wait to be invited or organized; <strong>going should be normal for believers—and a priority if you want to get and stay on fire.</strong>
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🛁 Billy Sunday's Response</p>
                <Paragraph>
                  A woman once asked evangelist Billy Sunday, "Why do you keep doing revivals when they don't last?" He replied, <strong>"Why do you keep taking baths?"</strong> Fire, like a relationship, must be maintained.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Think about charcoal. When it burns low, you fan it to rekindle the flame. Spiritually, many start hot—witnessing, serving, fellowshipping—then stop and later say, "Remember when we were on fire?" <strong>They didn't keep fanning the flame.</strong>
              </Paragraph>

              <Paragraph>
                Jesus told a parable about three servants entrusted with talents (Matthew 25:14ff). Two invested and were rewarded; the third made excuses. The master called him "wicked and lazy." God has entrusted us with the most precious thing—His Son and His message. We cannot be lazy. We don't know when Jesus will return. Be found faithful.
              </Paragraph>

              <WarningBox>
                <p className="font-semibold mb-2">⚠️ Witness So Others Won't Go to Hell</p>
                <Paragraph>
                  I'm not saying you'll go to hell if you don't witness; I'm saying <strong>witness so others won't.</strong>
                </Paragraph>
              </WarningBox>
            </BlueSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">💪 YOU DON'T HAVE TO KNOW EVERYTHING</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">Romans 1:16</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "For I am not ashamed of the gospel: for it is the power of God unto salvation to everyone that believeth."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                You don't have to wait until you know everything. Yes, study and be ready to give an answer—but you can witness as you grow. Paul wrote:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">1 Corinthians 2:1–2</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "I... came not with excellency of speech or of wisdom... For I determined not to know anything among you, save Jesus Christ, and Him crucified."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">💬 Just Tell Your Story</p>
                <Paragraph>
                  Tell people what Jesus did for you—how He saved you and brought peace—and that He wants to do the same for them. It's the Holy Spirit who convicts; your job is to share the Good News.
                </Paragraph>
              </InfoBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">Romans 10:14–15</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "How can they believe if they have not heard the message?... How wonderful is the coming of messengers who bring good news!"
                  </p>
                </blockquote>
              </div>
            </GreenSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">💡 DON'T HIDE YOUR LIGHT</h2>
              
              <Paragraph>
                After the Holy Spirit and fire came at Pentecost (Acts 2), the disciples witnessed. Think of the six things we covered to get and stay on fire: the Word; eyes free from lust; passing tests; prayer; fasting; right fellowship. The disciples did these—and spread the fire.
              </Paragraph>

              <Paragraph>
                This is number 7: <strong>spread the Word.</strong> Sometimes you can be doing 1–6, but the flame still dims because you're hiding your light.
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Matthew 5:14–16</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "No one lights a lamp and puts it under a bowl... In the same way your light must shine before people."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Jeremiah tried to quit:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Jeremiah 20:9</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "I will forget the Lord... But your message is like a fire burning deep within me... I can no longer keep it back."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">🔥 The Spirit Must Have Us</p>
                <Paragraph>
                  We must move from us "having" the Spirit to the Spirit having us. Church is not a building; it's <em>ekklēsia</em>—"the called-out ones." Called out of darkness into light—and called out to go bring others to the light.
                </Paragraph>
              </InfoBox>
            </PurpleSection>

            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">⚔️ WITNESSES ARE MARTYRS</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Acts 1:8</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "But ye shall receive power, when the Holy Spirit is come upon you: and ye shall be my witnesses..."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">💀 Greek Word: Martus (Witness)</p>
                <Paragraph>
                  The Greek for witness is <em>martus</em>—the root of martyr. The first martyr, Stephen, was witnessing when he was killed (Acts 7). In the early church, being a "witness" meant you were willing to die for Christ. That's why Paul told Timothy, "God has not given us a spirit of fear." (2 Timothy 1:7)
                </Paragraph>
              </InfoBox>

              <Paragraph>
                The early church suffered brutal persecution—burned at the stake, fed to lions, scourged, stoned, imprisoned, crucified. Many of us face far less and yet stop witnessing over bills or pressure. <strong>The apostles crossed land and sea to win souls; many won't go down the street.</strong> Then we ask, "Where is the fire?"
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Mark 8:34–35</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "'If any of you want to come with me,' he told them, 'you must forget yourself, carry your cross, and follow me. For if you want to save your own life, you will lose it; but if you lose your life for me and for the gospel, you will save it.'"
                  </p>
                </blockquote>
              </div>

              <WarningBox>
                <p className="font-semibold mb-2">✝️ It's Time to Be True Witnesses</p>
                <Paragraph>
                  Press toward the goal—winning others to Christ and entering eternal life. Often when I don't feel like witnessing, if I encourage others anyway, I get encouraged. <strong>Life is about faith, not feelings.</strong>
                </Paragraph>
              </WarningBox>

              <Paragraph>
                Even on the cross, Jesus witnessed to the thief who repented: "Today you will be with me in paradise." He didn't let suffering stop Him from saving one more soul. When you feel weak or discouraged, pray as Jesus prayed, "Not my will but Yours be done," and go.
              </Paragraph>
            </RedSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">💝 BE AN ENCOURAGER</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">Romans 1:11–12</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "I want very much to see you, in order to share a spiritual blessing with you to make you strong... both you and I will be helped at the same time, you by my faith and I by yours."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Be an encourager; bless others with your faith. <strong>When you go, you are in God's will—and His presence and fire will rest on you.</strong>
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">Mark 16:17–18</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "And these signs shall accompany them that believe... they shall cast out demons... they shall speak with new tongues... they shall lay hands on the sick, and they shall recover."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">✨ Signs Follow When You Go</p>
                <Paragraph>
                  Signs accompany those who go. First go—then the Spirit shows.
                </Paragraph>
              </InfoBox>
            </GreenSection>

            <YellowSection>
              <h2 className="text-2xl font-bold mb-6 text-yellow-900">🙏 TESTIMONIES: SIGNS THAT FOLLOWED</h2>
              
              <InfoBox>
                <p className="font-semibold mb-2">🏥 Cancer Healed</p>
                <Paragraph>
                  A man in our church asked me to join his uncle's oncology appointment. I shared about relationship with Jesus, repentance (2 Chronicles 7:13–14), and James 5:14. We anointed and prayed. Two hours later, the doctors reported he was cancer free. <strong>Signs follow when you go.</strong>
                </Paragraph>
              </InfoBox>

              <InfoBox>
                <p className="font-semibold mb-2">👻 Deliverance by Holy Ghost Fire</p>
                <Paragraph>
                  Another time, I went to pray over a family and their new house. Their son had returned to rebellion after prior deliverance (see Matthew 12:43–45). We shared Scripture, prayed, and he was freed. Then the Lord led me to the kitchen; his mother manifested. We declared Colossians 2:15; she collapsed, saw a vision of a Man in white, reached toward His feet, felt fire move through her, and the spirit left. <strong>Jesus delivered her by the Holy Ghost fire.</strong>
                </Paragraph>
              </InfoBox>

              <InfoBox>
                <p className="font-semibold mb-2">💔 Suicide Prevented</p>
                <Paragraph>
                  One night I shared about Jonah running from God—depression, isolation, trying to sleep through storms, even suicidal thoughts. A young woman said she had been locking herself in her room and had recently attempted suicide. We prayed. God met her. <strong>The fire was fanned.</strong>
                </Paragraph>
              </InfoBox>

              <Paragraph>
                I'm not telling you to chase demons or be reckless. God has not given us a spirit of fear, but of love, power, and a sound mind (2 Timothy 1:7). When you go to witness, God will give the signs needed for the situation.
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-yellow-900">Mark 13:11</p>
                <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "When you are arrested and brought to trial, do not worry beforehand about what to say... the Holy Spirit will speak."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                You never know who you'll reach and who they'll become.
              </Paragraph>
            </YellowSection>

            <OrangeSection>
              <h2 className="text-2xl font-bold mb-6 text-orange-900">👞 THE EDWARD KIMBALL STORY</h2>
              
              <Paragraph>
                Consider this story (paraphrased from Christian Biography Resources): D. L. Moody, at 18, was a shoe clerk in Boston. His Sunday school teacher, Edward Kimball, prayed and went to the store to speak with him. Nervous about interrupting business, Kimball nearly passed by, but turned back, went in, and briefly told Moody of Christ's love. Moody was ready; he yielded to Christ there in the stockroom. Forty years later, Moody described the joy that flooded his life that day.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🎯 What If He Had Walked Away?</p>
                <Paragraph>
                  What if Kimball had walked away? Millions have heard of Moody—schools, radio, evangelism—yet it started with a faithful witness.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Years later, Moody's ministry became mechanical. Two ladies prayed for him to receive the baptism of the Holy Spirit and fire. He began to seek God earnestly. After the Great Chicago Fire of 1871 destroyed his work, walking the streets of New York, the Holy Spirit fell on him. He hid in a friend's room for hours, overwhelmed with God's presence, until he cried out for God to stay His hand. <strong>He rose in the power of the Spirit, and the fire marked his life.</strong>
              </Paragraph>
            </OrangeSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">🎣 ANDREW: THE BACKGROUND DISCIPLE</h2>
              
              <Paragraph>
                Think of Andrew, the first disciple to follow Jesus. He brought his brother Simon (Peter) to Jesus. Peter became a foundational leader. <strong>Andrew didn't need the spotlight; he wanted the job done.</strong> You may become a Moody or a Peter—or you may be an Edward Kimball or an Andrew. All of them helped change the world.
              </Paragraph>

              <Paragraph>
                And Peter wasn't fully the man God called him to be until the Holy Ghost and fire fell at Pentecost (Acts 2).
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🔥 Seek the Holy Spirit and Fire</p>
                <Paragraph>
                  When God called me to host Bible studies, I was still being freed from habits. As I sought the baptism of the Holy Spirit and applied what you're reading, the Spirit fell, and I spoke in new tongues. I used to say, "If God wants to give me that gift, He will." Then I realized I want every gift God wants to give (see 1 Corinthians 12:10). But don't just seek a gift—<strong>seek the Holy Spirit and fire to consume your whole life.</strong> One key way to receive is to witness.
                </Paragraph>
              </InfoBox>
            </BlueSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">✈️ EVANGELISM TRIPS: FANNING THE FIRE</h2>
              
              <Paragraph>
                As I witnessed and hosted studies, God poured out His fire. When my flame wanes, I fan it by witnessing and taking evangelism trips. Since June 2007 to June 2011, I've ministered in multiple cities and churches.
              </Paragraph>

              <Paragraph>
                Before one trip, a choir member asked if we should do our workers' retreat first. I said I wanted to be fired up before the retreat, and this trip would help. We saw people repent from drugs, witchcraft, and other sins. A man even gifted me a watch as a love offering, saying, "You've never quit." It was an awesome time in the Lord.
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Mark 10:29–30</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Those who leave home or brothers or sisters or mother or father or children or fields for me and for the gospel, will receive much more in this present age... and in the age to come... eternal life."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                I'm not a prosperity preacher, but God does provide as He wills. Even if you never receive a thing for preaching on earth, <strong>hearing "Well done, good and faithful servant" will be worth it.</strong>
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">📖 How This Book Was Born</p>
                <Paragraph>
                  That trip fired me up. On the Day of Pentecost (Sunday, June 12, 2011), God woke me with the idea for this book. I started writing the next day and could hardly step away. Seventeen hours later, the first draft of this message poured out. The fire fell to write this as a tool to help people get set on fire and spread it. We'll be using this at our workers' retreat next week.
                </Paragraph>
              </InfoBox>
            </PurpleSection>

            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">⏰ THE URGENCY: PEOPLE ARE DYING</h2>
              
              <Paragraph>
                Why this urgency? According to the U.S. Census Bureau (2009), roughly 1.8 people die every second worldwide—over 100 per minute, more than 150,000 per day, over 55 million per year. <strong>More than 6,000 people die every hour.</strong>
              </Paragraph>

              <WarningBox>
                <p className="font-semibold mb-2">🔥 Our Mission: So Fewer Go to Hell's Fire</p>
                <Paragraph>
                  How many enter eternity without Christ? Our mission is to get on fire and fan the fire by witnessing—<strong>so fewer go to hell's fire.</strong>
                </Paragraph>
              </WarningBox>

              <Paragraph>
                John Wesley said, <strong>"Give me ten men that hate nothing but sin and love nothing but God and we will change the world."</strong> Will you be one?
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🙏 Prayer from Amy Carmichael</p>
                <Paragraph>
                  Pray: "Give me the love that leads the way, the faith that nothing can dismay, the hope no disappointments tire, the passion that will burn like fire. Let me not sink to be a clod: <strong>make me Thy fuel, flame of God.</strong>"
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Remember: <strong>when the fire feels like it's going out—fan the fire.</strong>
              </Paragraph>
            </RedSection>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

