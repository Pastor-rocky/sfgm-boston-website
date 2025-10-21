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
  BulletList,
  BulletItem,
  InfoBox,
  WarningBox,
  CenterText,
} from "@/components/audio-player-text-template";

export default function BecomingAFireStarterCh2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/uploads/textbook-audio/fire-starter-cp2.mp3";

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
                  <span className="align-middle">Chapter 2</span>
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
              
              {/* Chapter Title */}
              <OrangeSection>
                <h2 className="text-2xl font-bold mb-6 text-orange-900">🔥 CHAPTER 2: IT'S FIRE OR NOTHING!</h2>
                
                <Paragraph>
                  Jesus said something that really amazed me. First He begins in Luke 12 talking 
                  about whom people should fear––not man but God, who has the authority to throw 
                  you in Hell. Then He starts talking about a man that made his life all about his 
                  possessions and he didn't acknowledge God, and how God required his soul from 
                  him one night and he was not ready for God. Then Jesus explains not to worry 
                  about things of the world but please God and He will add to your life. He continues 
                  and says how if He comes back and faithful servants are serving Him they will be 
                  rewarded but if He comes back and the servants are not faithful they will be 
                  punished then He says this:
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-orange-900">Luke 12:49-52</p>
                  <blockquote className="border-l-4 border-orange-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "I came to set the earth on fire, and how I wish it were 
                      already kindled! I have a baptism to receive, and how distressed I am until it is 
                      over! Do you suppose that I came to bring peace to the world? No, not peace, but 
                      division. From now on a family of five will be divided, three against two and two 
                      against three."
                    </p>
                  </blockquote>
                </div>

                <Paragraph>
                  Jesus is saying that He came to set the world on Fire! Look at the context He says 
                  it in: talking about hell; a person who was living for himself, not worrying about life; 
                  then a faithful servant that gets rewarded; a servant that stops being faithful and 
                  gets punished; then he talks about how people are hypocritical.
                </Paragraph>

                <InfoBox>
                  <p className="font-semibold mb-2">💡 The Truth About Fire</p>
                  <Paragraph>
                    It is simple, Jesus came to bring fire upon this earth so we will not have to face 
                    Hell's fire. In our houses today there are people who are on fire for God and there 
                    are people who are not on fire for God and do not fully want to submit themselves 
                    unto God! That is what He was saying about division in the house.
                  </Paragraph>
                </InfoBox>
              </OrangeSection>

              {/* Definitions of Kindled */}
              <BlueSection>
                <h2 className="text-2xl font-bold mb-6 text-blue-900">💡 DEFINITIONS OF KINDLED</h2>
                <Paragraph>
                  <strong>KIN'DLE, v.t</strong> light or white, to shine.
                </Paragraph>
                <BulletList>
                  <BulletItem>To set on fire; to cause to burn with flame; to light</BulletItem>
                  <BulletItem>To inflame, as the passions; to exasperate; to rouse; to provoke; to excite to action; the flame of love, or love into a flame</BulletItem>
                </BulletList>
                
                <Paragraph>Take a look at Jesus' words in John 8:12:</Paragraph>
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-blue-900">John 8:12</p>
                  <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Jesus spoke to the Pharisees again. 'I am the light of the world,' he said. 'Whoever 
                      follows me will have the light of life and will never walk in darkness.'"
                    </p>
                  </blockquote>
                </div>

                <Paragraph>
                  So He is the light––remember, <strong>the source of light back then was Fire!</strong>
                </Paragraph>
              </BlueSection>

              {/* We Are the Light */}
              <GreenSection>
                <h2 className="text-2xl font-bold mb-6 text-green-900">✨ WE ARE THE LIGHT</h2>
                <Paragraph>Jesus also says in Matthew 5:14-16:</Paragraph>
                
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-green-900">Matthew 5:14-16</p>
                  <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "You are like light for the whole world. A city built on a hill cannot be hid. No one 
                      lights a lamp and puts it under a bowl; instead it is put on the lampstand, where it 
                      gives light for everyone in the house. In the same way your light must shine before 
                      people, so that they will see the good things you do and praise your Father in 
                      heaven."
                    </p>
                  </blockquote>
                </div>

                <CenterText>
                  <p className="text-xl font-bold text-green-700">So we are supposed to be light––FIRE! 🔥</p>
                </CenterText>
              </GreenSection>

              {/* The Day of Pentecost */}
              <PurpleSection>
                <h2 className="text-2xl font-bold mb-6 text-purple-900">🕊️ THE DAY OF PENTECOST</h2>
                <Paragraph>Remember what John the Baptist said in Matthew 3:11:</Paragraph>
                
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-purple-900">Matthew 3:11</p>
                  <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "I indeed baptize you with water unto repentance: but he that cometh after me is mightier 
                      than I, whose shoes I am not worthy to bear: he shall baptize you with the Holy Ghost, and 
                      with fire."
                    </p>
                  </blockquote>
                </div>

                <Paragraph>
                  This prophecy was fulfilled on the day of Pentecost when the Holy Spirit filled 
                  the place where they were meeting.
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-purple-900">Acts 2:1-4</p>
                  <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "And when the day of Pentecost was fully come, they were all with one accord in 
                      one place. And suddenly there came a sound from heaven as of a rushing mighty 
                      wind, and it filled the entire house where they were sitting. And there appeared 
                      unto them cloven tongues like as of fire, and it sat upon each of them. And they 
                      were all filled with the Holy Ghost, and began to speak with other tongues, as the 
                      Spirit gave them utterance."
                    </p>
                  </blockquote>
                </div>

                <InfoBox>
                  <p className="font-semibold mb-2">💧 Water vs. Fire Baptism</p>
                  <Paragraph>
                    Water baptism is awesome, it is a declaration of our faith, an outward sign that we 
                    follow Christ. The baptism that Jesus is truly concerned with in your life is the 
                    baptism of fire!
                  </Paragraph>
                </InfoBox>
              </PurpleSection>

              {/* Dunamis Power */}
              <RedSection>
                <h2 className="text-2xl font-bold mb-6 text-red-900">⚡ DUNAMIS POWER</h2>
                <Paragraph>Jesus said something in Acts chapter one I want to show you.</Paragraph>
                
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-red-900">Acts 1:8</p>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "But ye shall receive power, after that the Holy Ghost is come upon you: and ye 
                      shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, 
                      and unto the uttermost part of the earth."
                    </p>
                  </blockquote>
                </div>

                <Paragraph>The Thayer definition for the word <strong>power</strong> in Acts 1:8 is <strong>dunamis</strong>:</Paragraph>
                <BulletList>
                  <BulletItem>strength power, ability</BulletItem>
                  <BulletItem>inherent power, power residing in a thing by virtue of its nature, or which a person or thing exerts and puts forth</BulletItem>
                  <BulletItem>power for performing miracles</BulletItem>
                </BulletList>

                <Paragraph>The Strong's definition for the word power is dunamis:</Paragraph>
                <Paragraph className="italic">
                  doo'-nam-is - From G1410; force - ability, abundance, meaning, might (worker of) miracle (-s), 
                  power, strength, violence, mighty (wonderful) work.
                </Paragraph>

                <WarningBox>
                  <p className="font-semibold mb-2">💥 DYNAMITE!</p>
                  <Paragraph>
                    <strong>Dunamis is where we get our English word for dynamite!</strong> Yes, dynamite, the 
                    powerful explosive that is used to level mountains and buildings, to change the 
                    atmosphere wherever it is used.
                  </Paragraph>
                  <Paragraph>
                    So you see, if God is truly in our lives there is supposed to be evidence of change 
                    in our lives.
                  </Paragraph>
                </WarningBox>
              </RedSection>

              {/* The Napkin Illustration */}
              <YellowSection>
                <h2 className="text-2xl font-bold mb-6 text-yellow-900">🕯️ THE NAPKIN ILLUSTRATION</h2>
                <Paragraph>
                  Right now, I want you to think of a paper napkin and a lit candle. Now, if you were 
                  to put the paper into the fire of the candle, what would happen? The napkin would 
                  be set on fire and a few things would happen to the structure of the napkin in the 
                  process of its burning:
                </Paragraph>

                <BulletList>
                  <BulletItem><strong>One</strong>, the napkin would change from a napkin to ashes.</BulletItem>
                  <BulletItem><strong>Two</strong>, the napkin would have given off light because of the fire that was consuming it.</BulletItem>
                  <BulletItem><strong>Three</strong>, the napkin would have given off heat from the fire that was consuming it and it would have been warm around the napkin.</BulletItem>
                  <BulletItem><strong>Four</strong>, the fire would have spread from one end of the napkin to the other.</BulletItem>
                </BulletList>

                <InfoBox>
                  <p className="font-semibold mb-3">🔥 Four Questions to Ask Yourself:</p>
                  <BulletList>
                    <BulletItem>
                      <strong>#1:</strong> Is my life changed completely because of Christ? <em>2 Corinthians 5:17: "Anyone 
                      who is joined to Christ is a new being; the old is gone, the new has come."</em>
                    </BulletItem>
                    <BulletItem>
                      <strong>#2:</strong> Am I shining my light as a good witness for Jesus? <em>John 1:7: "The same came 
                      for witness, that he might bear witness of the light, that all might believe through 
                      him."</em> Like John the Baptist we are supposed to bear witness of the light, Jesus 
                      Christ. The way we do that is shining our light!
                    </BulletItem>
                    <BulletItem>
                      <strong>#3:</strong> Am I showing love for people (do I have a warm heart towards others)? <em>1 
                      Corinthians 13:1: "If I speak with the tongues of men and of angels, but have not 
                      love, I am become sounding brass, or a clanging cymbal."</em> <strong>IF YOU HAVE NO LOVE 
                      YOU HAVE NO JESUS!</strong>
                    </BulletItem>
                    <BulletItem>
                      <strong>#4:</strong> Am I spreading the Gospel of Jesus Christ, am I a person who goes out of their 
                      way to share Jesus with others? <em>Mark 16:15: "He said to them, 'Go throughout the 
                      whole world and preach the gospel to all people.'"</em>
                    </BulletItem>
                  </BulletList>
                </InfoBox>

                <WarningBox>
                  <p className="font-semibold mb-2">⚠️ A Sobering Truth</p>
                  <Paragraph>
                    If you are not doing these things you are not on fire for Jesus, and if you are not 
                    doing these things you are not truly serving Jesus, and if you are not serving 
                    Jesus you're working against Him! <strong>Matthew 12:30 says, "Anyone who is not for me 
                    is really against me; anyone who does not help me gather is really scattering."</strong>
                  </Paragraph>
                  <Paragraph>
                    If you are not truly a new person in Christ Jesus and if you are not shining your 
                    light for Jesus and if you are not showing love to Christ by obeying Him and loving 
                    His people, by helping and ministering to them the Gospel of our LORD, you are 
                    not baptized with fire! If you ever want to be effective for Jesus it is time to seek 
                    after the baptism of fire!
                  </Paragraph>
                </WarningBox>
              </YellowSection>

              {/* The Laodicean Church */}
              <RedSection>
                <h2 className="text-2xl font-bold mb-6 text-red-900">🌡️ HOT, COLD, OR LUKEWARM?</h2>
                <Paragraph>
                  The Laodicean church in Asia Minor thought they had everything. They had a 
                  booming city, a big congregation, lots of money in the bank––they thought they 
                  had it made. Jesus sent them this message:
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-red-900">Revelation 3:14-16</p>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "To the angel of the church in Laodicea write: "This is the message from the 
                      Amen, the faithful and true witness, who is the origin of all that God has created. I 
                      know what you have done; I know that you are neither cold nor hot. How I wish you 
                      were either one or the other! But because you are lukewarm, neither hot nor cold, I 
                      am going to spit you out of my mouth!"
                    </p>
                  </blockquote>
                </div>

                <WarningBox>
                  <p className="font-semibold mb-2">❌ A Common Misunderstanding</p>
                  <Paragraph>
                    A lot of people misunderstand this scripture. They say, "I can't be hot or on fire for 
                    God so I'm going to be cold, I'm not even going to try to go to church or read the 
                    bible and pray because I don't want to be a hypocrite because I'm still in the world 
                    and I don't want to be lukewarm"
                  </Paragraph>
                </WarningBox>

                <Paragraph>
                  When Jesus said I wish you were one or the other, hot or cold, <strong>cold represents an 
                  atheist, a non-believer</strong> and when He says <strong>hot it means a person that is on fire for 
                  God</strong>. So we don't have a choice of being cold because people that confess Jesus 
                  are believers and believers in Jesus can either be hot, on fire, or lukewarm, 
                  claiming Christ but living like a nonbeliever!
                </Paragraph>

                <InfoBox>
                  <p className="font-semibold mb-2">💡 Why Either Hot or Cold?</p>
                  <Paragraph>
                    So then, why would Jesus wish they were either hot or cold? Why didn't He just 
                    say I wish you were hot, on fire for God? Well, because if they were atheists or 
                    nonbelievers, God could send someone that is on fire for Jesus to show them a 
                    true witness of Jesus. That is why Jesus introduces himself as the Faithful and 
                    True Witness (Rev 3:14).
                  </Paragraph>
                  <Paragraph>
                    Too many people in this world are living like hell, expecting to go to heaven. Then people who are in the world start coming to 
                    church and they see these lukewarm so-called Christians and they think this is the 
                    normal way of being Christian. Especially because you have a lot of sugar-coating, 
                    water-diluting pastors out there that do not preach the full Gospel of Jesus! This is 
                    why people do not understand the judgment of God.
                  </Paragraph>
                </InfoBox>

                <Paragraph>
                  In the text of Revelation three, Jesus says because you are lukewarm I will spit you 
                  out of my mouth! Back then in the days of the Laodicean church they had a water 
                  problem in the city so they had to build an aqueduct (like a bridge/piping system) 
                  to bring in the water from a city six miles away. The water used to enter into the 
                  aqueduct ice cold, but by the time it traveled six miles to enter Laodicea the 
                  desert sun had been beaming on it so by the time it came out of the aqueduct it 
                  was lukewarm!
                </Paragraph>

                <Paragraph>
                  So Jesus was basically illustrating that <strong>the same way the lukewarm water is 
                  disgusting to you is the same way your lifestyle is disgusting to me!</strong> So if Jesus 
                  spits us out of His mouth it means to cast us out of His presence.
                </Paragraph>
              </RedSection>

              {/* Galatians 5 - Fruit of the Spirit */}
              <GreenSection>
                <h2 className="text-2xl font-bold mb-6 text-green-900">🍎 FRUIT OF THE SPIRIT VS. FRUIT OF THE FLESH</h2>
                <Paragraph>I want to share a scripture with you that changed my life.</Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-green-900">Galatians 5:19-25</p>
                  <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "People's desires make them give in to immoral ways, filthy thoughts, and 
                      shameful deeds. They worship idols, (practice witchcraft), hate others, and are 
                      hard to get along with. People become jealous, angry, and selfish. They not only 
                      argue and cause trouble, but they are envious. They get drunk, carry on at wild 
                      parties, and do other evil things as well. I told you before, and I am telling you 
                      again: No one who does these things will enter God's kingdom. God's Spirit makes 
                      us loving, happy, peaceful, patient, kind, good, faithful, gentle, and self-controlled. 
                      There is no law against behaving in any of these ways. And because we belong to 
                      Christ Jesus, we have killed our selfish feelings and desires. God's Spirit has given 
                      us life, and so we should follow the Spirit."
                    </p>
                  </blockquote>
                </div>

                <Paragraph className="italic">
                  "Practice witchcraft" translated from the Greek means drugs and fortunetelling.
                </Paragraph>

                <WarningBox>
                  <p className="font-semibold mb-2">⚠️ The Author's Confession</p>
                  <Paragraph>
                    I was going to church and doing pretty much every sin that is mentioned in this 
                    passage. If I was to die I would have gone straight to Hell; I would have been cast 
                    out of God's presence. I was lukewarm!
                  </Paragraph>
                </WarningBox>

                <InfoBox>
                  <p className="font-semibold mb-2">✅ Check Yourself</p>
                  <Paragraph>
                    Go over the list in Galatians and see if you are dealing with any of those sins.
                  </Paragraph>
                  <Paragraph>
                    We should have the fruit of the Spirit in our lives, not the fruit of the flesh!
                  </Paragraph>
                </InfoBox>

                <Paragraph>
                  How do we do that? To get fruit you need seed. <strong>The Bible is the seed that brings 
                  the fruit of the Spirit of God.</strong> I started reading the Bible in 2004 and I never 
                  stopped. The Word of God is the fuel for the fire. We will talk about this more in 
                  the next chapter.
                </Paragraph>
              </GreenSection>

              {/* Conclusion */}
              <OrangeSection>
                <h2 className="text-2xl font-bold mb-6 text-orange-900">🎯 IT'S FIRE OR NOTHING!</h2>
                <Paragraph>
                  Should we want the fire of God in our lives? We should not only want it, we should 
                  seek after it. We should tell people to seek after it. It should be our life mission to 
                  get on fire for God, stay on fire for God, and spread the fire of God, because:
                </Paragraph>

                <BulletList>
                  <BulletItem><strong>Without the fire of God</strong> in your life there is no release from the bondages in our 
                    lives because the Bible says where the Spirit of the Lord is there is freedom!</BulletItem>
                  <BulletItem><strong>If there is no fire</strong> there will never be true happiness and joy in our lives because the 
                    Bible says in His presence there is fullness of joy!</BulletItem>
                  <BulletItem><strong>And if there is no fire</strong> there is no Heaven because without allowing the Holy Spirit to work in your life you will never 
                    please God, and if you don't please God on earth you will not be allowed to serve 
                    Him in heaven!</BulletItem>
                </BulletList>

                <CenterText>
                  <p className="text-xl font-bold text-orange-700 mb-4">
                    This is the reason this chapter is called "It's Fire or Nothing!" 🔥
                  </p>
                </CenterText>

                <Paragraph>
                  I hope you realize the need for the baptism of the Holy Spirit with fire in your life. If you do, then get 
                  ready to learn how to receive it through looking at God's Word in the remainder of 
                  this book.
                </Paragraph>

                <InfoBox>
                  <p className="font-semibold mb-3">🔥 Seven Things We Need to Get On Fire and Stay On Fire:</p>
                  <BulletList>
                    <BulletItem>The Word of God</BulletItem>
                    <BulletItem>Eyes free from lust</BulletItem>
                    <BulletItem>Strength to get through trials</BulletItem>
                    <BulletItem>Prayer time</BulletItem>
                    <BulletItem>Fasting</BulletItem>
                    <BulletItem>Fellowship</BulletItem>
                    <BulletItem>Time of witnessing in our life</BulletItem>
                  </BulletList>
                </InfoBox>
              </OrangeSection>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

