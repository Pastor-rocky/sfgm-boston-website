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

export default function BecomingAFireStarterCh3() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/uploads/textbook-audio/fire-starter-cp3.mp3";

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
                  <span className="align-middle">Chapter 3</span>
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
                <h2 className="text-2xl font-bold mb-6 text-orange-900">🔥 CHAPTER 3: FUEL FOR THE FIRE</h2>
                
                <Paragraph>
                  I was in the east coast in May of 2011 on a six day crusade, and on one of those 
                  days I was scheduled to preach in Washington, D.C., for a pastor friend of mine, 
                  Pastor Frank. I was actually going to preach a sermon on how to get on fire for 
                  God, and on the way there my van ran out of gas. I was so frustrated; we were only 
                  blocks from the church when it ran out of gas. The church service had to start 
                  without us, we were 30 minutes late. I was upset at one of my guys that was on the 
                  trip with me because he was driving and he didn't pay attention to the gas gauge.
                </Paragraph>

                <InfoBox>
                  <p className="font-semibold mb-2">💡 God's Lesson from Running Out of Gas</p>
                  <Paragraph>
                    I start walking in frustration, and then God ministered to me and said, <strong>"I'm going to 
                    use this in the sermon tonight so calm down."</strong> So I did; we got some gas and went 
                    to church and the fire of God fell on that place like I haven't seen in a long time!
                  </Paragraph>
                </InfoBox>

                <Paragraph>
                  The point God gave me about the gas is this: <strong>to have fire you need fuel.</strong> You're 
                  responsible to make sure you have the fuel. No one else is to blame, you have to 
                  constantly watch your spiritual gauge and can never allow yourself to run out 
                  because you might be close to where God wants you, but it's not about being 
                  close it's about being right on for the glory of God!
                </Paragraph>

                <Paragraph>
                  Don't get me wrong, I'm a person who runs out of gas a lot. I just don't pay attention or sometimes I think I 
                  can stretch the gas longer than it can go. We will not be perfect in this life with 
                  God, but God sure does want us to try. The word <em>perfect</em> in the Greek means 
                  "mature"; it is time to grow up and put gas in the car and make sure it never gets 
                  low.
                </Paragraph>
              </OrangeSection>

              {/* What is the Fuel? */}
              <BlueSection>
                <h2 className="text-2xl font-bold mb-6 text-blue-900">📖 WHAT IS THE FUEL?</h2>
                
                <CenterText>
                  <p className="text-2xl font-bold text-blue-700 mb-4">The Word of God! 🔥</p>
                </CenterText>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-blue-900">Matthew 4:4</p>
                  <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "The Scripture says, 'Human beings cannot live on bread alone, but need every word that God 
                      speaks.'"
                    </p>
                  </blockquote>
                </div>

                <Paragraph>
                  Like my mother-in-law told me, <strong>"you can pray, go to church, fast and be 
                  in the choir, but if you're not in the Word of God it's all for no reason!"</strong>
                </Paragraph>

                <InfoBox>
                  <p className="font-semibold mb-2">🌱 The Word is Seed</p>
                  <Paragraph>
                    You need to realize the Word is seed. <strong>1 Peter 1:23 says, "Being born again, not of corruptible 
                    seed, but of incorruptible, by the word of God, which liveth and abideth for ever."</strong>
                  </Paragraph>
                </InfoBox>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-blue-900">John 3:3, 5</p>
                  <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      Jesus said in John 3:3: "You must be born again to <strong>SEE</strong> the kingdom of God," and 
                      in John 3:5 Jesus said, "Verily, verily, I say unto thee, Except a man be born of 
                      water and of the Spirit, he cannot <strong>ENTER</strong> into the kingdom of God."
                    </p>
                  </blockquote>
                </div>

                <Paragraph>
                  The water in this text represents the Word as well so when you get seed and water something is 
                  going to grow! It produces the fruit of the Spirit!
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-blue-900">Galatians 5:22-23</p>
                  <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, 
                      Meekness, temperance: against such there is no law."
                    </p>
                  </blockquote>
                </div>

                <Paragraph>
                  Then you will <strong>SEE</strong> God's Kingdom move in your life here and then when it's all done you will 
                  <strong>ENTER</strong> God's kingdom in Heaven later.
                </Paragraph>
              </BlueSection>

              {/* Destroying the Works of the Devil */}
              <RedSection>
                <h2 className="text-2xl font-bold mb-6 text-red-900">⚔️ DESTROYING THE WORKS OF THE DEVIL</h2>
                
                <Paragraph>Look what the book of 1 John says in chapter 3, verses eight and nine:</Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-red-900">1 John 3:8-9</p>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "He that committeth sin is of the devil; for the devil sinneth from the beginning. For this 
                      purpose the Son of God was manifested, that he might destroy the works of the 
                      devil. Whosoever is born of God doth not commit sin; for his seed remaineth in 
                      him: and he cannot sin, because he is born of God."
                    </p>
                  </blockquote>
                </div>

                <CenterText>
                  <p className="text-xl font-bold text-red-700">
                    Jesus the Word was manifested to us for this very reason, to destroy the devil and to bring forth the 
                    Word of God for us so we can have fuel to be on fire for God! 🔥
                  </p>
                </CenterText>
              </RedSection>

              {/* The Parable of the Sower */}
              <GreenSection>
                <h2 className="text-2xl font-bold mb-6 text-green-900">🌾 THE PARABLE OF THE SOWER</h2>
                
                <Paragraph>
                  Sometimes you see people and they look like they are on fire for God but then the 
                  fire dies down. Why is this? The answer is found in In Luke chapter eight. Jesus 
                  gave an illustration about a man that sowed some seed on four different types of 
                  ground, then later He explained the story to the disciples more clearly.
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-green-900">Luke 8:11-16</p>
                  <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Now the parable is this: The seed is the word of God. Those by the way 
                      side are they that hear; then cometh the devil, and taketh away the word out of 
                      their hearts, lest they should believe and be saved. They on the rock are they, 
                      which, when they hear, receive the word with joy; and these have no root, which 
                      for a while believe, and in time of temptation fall away. And that which fell among 
                      thorns are they, which, when they have heard, go forth, and are choked with cares 
                      and riches and pleasures of this life, and bring no fruit to perfection. But that on 
                      the good ground are they, which in an honest and good heart, having heard the 
                      word, keep it, and bring forth fruit with patience. No man, when he hath lighted a 
                      candle, covereth it with a vessel, or putteth it under a bed; but setteth it on a 
                      candlestick, that they which enter in may see the light."
                    </p>
                  </blockquote>
                </div>

                <WarningBox>
                  <p className="font-semibold mb-3">⚠️ Three Reasons Why People's Fire Dies Out:</p>
                  <BulletList>
                    <BulletItem><strong>One</strong>, their hearts are hardened</BulletItem>
                    <BulletItem><strong>Two</strong>, they have no Word in their daily life, only in church (they have no root in themselves, that's why when temptation 
                      comes they are too weak to fight it off)</BulletItem>
                    <BulletItem><strong>Three</strong>, those who are worried about the cares and riches and pleasures of this world</BulletItem>
                  </BulletList>
                </WarningBox>

                <Paragraph>
                  Notice the person that had the good ground received the seed and produced fruit (see Gal. 5:22), then right after 
                  that Jesus talks about the sower and the seed He immediately starts talking about 
                  a lit candle being displayed, not hidden.
                </Paragraph>

                <CenterText>
                  <p className="text-xl font-bold text-green-700">
                    The Word is the Fuel for the FIRE so all can see! 🔥
                  </p>
                </CenterText>
              </GreenSection>

              {/* The Burning Bush */}
              <PurpleSection>
                <h2 className="text-2xl font-bold mb-6 text-purple-900">🔥 THE BURNING BUSH</h2>
                
                <Paragraph>
                  I love this quote from John Wesley: <strong>"If we get on fire for God people will come 
                  watch us burn."</strong> That is what it is all about, showing God's glory!
                </Paragraph>

                <Paragraph>
                  This quote reminds me of a story about Moses. In the book of Exodus chapter three Moses, 
                  after forty years of being gone from Egypt, gets called by God to help bring His 
                  people out of bondage and slavery. The way God did it is what amazes me.
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-purple-900">Exodus 3:1-4</p>
                  <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      Moses is tending His father-in-law's sheep when something happened... One day while 
                      Moses was taking care of the sheep and goats of his father-in-law Jethro, the 
                      priest of Midian, he led the flock across the desert and came to Sinai, the holy 
                      mountain. There the angel of the LORD appeared to him as a flame coming from 
                      the middle of a bush. Moses saw that the bush was on fire but that it was not 
                      burning up. "This is strange," he thought. "Why isn't the bush burning up? I will go 
                      closer and see." When the LORD saw that Moses was coming closer, he called to 
                      him from the middle of the bush and said, "Moses! Moses!" He answered, "Yes, 
                      here I am."
                    </p>
                  </blockquote>
                </div>

                <InfoBox>
                  <p className="font-semibold mb-2">💡 The Bush That Didn't Burn Out</p>
                  <Paragraph>
                    Moses probably saw many burning bushes in the desert but there was something 
                    strange about this bush––<strong>it wasn't burning out!</strong> So Moses gets curious. He never 
                    saw a bush on fire that did not burn out, so he leaves what he is doing to check it 
                    out. When He gets there it is the Lord Himself! The LORD gives Moses a mission to 
                    go back to Egypt and bring the people out of bondage.
                  </Paragraph>
                </InfoBox>

                <Paragraph>
                  I want to connect it to the church. People have seen their share of burnouts in the 
                  church, but when people start hearing and seeing people on fire for God that don't 
                  burn out but keep on burning for the Lord what will happen is people will stop what 
                  they are doing to talk to you. They will stop what they're doing and they will come 
                  to your church. They will see the the light from the fire in you and your ministry 
                  and they will be drawn to you to hear what you have to say (Moses' name actually 
                  means drawn out), what your church leader has to say, and when they do they will 
                  get a Word from you because when you are on fire for God you will always have a 
                  Word.
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-purple-900">Jeremiah 20:9</p>
                  <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      Jeremiah said "But when I say, 'I will forget the LORD and no longer speak in his name,' 
                      then your message is like a fire burning deep within me. I try my best to hold it in, 
                      but can no longer keep it back."
                    </p>
                  </blockquote>
                </div>

                <Paragraph>
                  When they get this Word they need for their life they might be stubborn at first. 
                  Moses was hesitant to go, but God kept on encouraging Him. He finally gave in 
                  and accepted the mission that forever changed his life and helped millions of 
                  Hebrews be delivered from the hands of the Egyptians and the bondage they were 
                  in.
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-purple-900">Jeremiah 23:29</p>
                  <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "My message is like a fire and like a hammer that breaks rocks in pieces."
                    </p>
                  </blockquote>
                </div>

                <InfoBox>
                  <p className="font-semibold mb-2">🎯 Our Mission</p>
                  <Paragraph>
                    This is our mission as well––to be fired up for God so people can come watch us burn, 
                    so that they can see the hope in God in our lives through our testimony, so they can be delivered from the 
                    bondage of the world and set on fire as well!
                  </Paragraph>
                  <Paragraph>
                    Remember, <strong>we are the bush, God is in the center. He's the source of the fire.</strong> The Gospel of John says Jesus is the Word 
                    and the Word came down and dwelt among us (John 1) so when you have the fuel 
                    always in the center you'll always be on fire!
                  </Paragraph>
                </InfoBox>
              </PurpleSection>

              {/* Joshua's Command */}
              <YellowSection>
                <h2 className="text-2xl font-bold mb-6 text-yellow-900">📜 JOSHUA'S COMMAND</h2>
                
                <Paragraph>
                  Moses' right hand guy was Joshua. After Moses died and Joshua took over the 
                  leadership position, God told Joshua something that is actually what I live by as 
                  well:
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-yellow-900">Joshua 1:8-9</p>
                  <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Be sure that the book of the Law is always read in your worship. Study it day 
                      and night, and make sure that you obey everything written in it. Then you will be 
                      prosperous and successful. Remember that I have commanded you to be 
                      determined and confident! Do not be afraid or discouraged, for I, the LORD your 
                      God, am with you wherever you go."
                    </p>
                  </blockquote>
                </div>

                <CenterText>
                  <p className="text-xl font-bold text-yellow-700">
                    It is time to get in the Word every day––then you will be successful and prosperous. 🔥
                  </p>
                </CenterText>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-yellow-900">John 8:31-32</p>
                  <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      Jesus told the people: "If you keep on obeying what I have said, you truly are my disciples. 
                      You will know the truth, and the truth will set you free."
                    </p>
                  </blockquote>
                </div>

                <WarningBox>
                  <p className="font-semibold mb-2">⚠️ Why People Stay in Bondage</p>
                  <Paragraph>
                    If you keep on continuing in the truth and obeying it you'll be set free. 
                    <strong>People don't continue in the Word, that's why they are still in bondage.</strong>
                  </Paragraph>
                </WarningBox>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-yellow-900">Psalm 1:1-3</p>
                  <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Happy are those who reject the advice of evil people, who do not follow the 
                      example of sinners or join those who have no use for God. Instead, they find joy in 
                      obeying the Law of the LORD, and they study it day and night. They are like trees 
                      that grow beside a stream, that bear fruit at the right time, and whose leaves do 
                      not dry up. They succeed in everything they do."
                    </p>
                  </blockquote>
                </div>

                <Paragraph>
                  The word of God gets you through your trials and makes you succeed when you're 
                  in it every day.
                </Paragraph>
              </YellowSection>

              {/* Summary of Benefits */}
              <BlueSection>
                <h2 className="text-2xl font-bold mb-6 text-blue-900">💎 WHAT THE WORD OF GOD DOES</h2>
                
                <Paragraph>
                  This chapter should have taught you the Word of God is your fuel for the Fire of 
                  God and this fuel allows you to:
                </Paragraph>

                <BulletList>
                  <BulletItem>Destroy the work of the enemy (Matt. 4:4)</BulletItem>
                  <BulletItem>Makes you successful and prosperous (Josh. 1:8)</BulletItem>
                  <BulletItem>It sets you free (John 8:31-32)</BulletItem>
                  <BulletItem>It gets you through trials and tribulations (Psalm 1:1-3)</BulletItem>
                  <BulletItem>It makes you produce fruit (Gal. 5:22)</BulletItem>
                  <BulletItem>It's the fuel for the fire of God (Luke 8:16)</BulletItem>
                  <BulletItem><strong>Most importantly it makes you born again (1 Peter 1:23)</strong></BulletItem>
                </BulletList>

                <CenterText>
                  <p className="text-2xl font-bold text-blue-700 mt-4">
                    Show me a person on fire for God and I will show you a person that is in the Word! 🔥
                  </p>
                </CenterText>
              </BlueSection>

              {/* Practical Reading Plan */}
              <GreenSection>
                <h2 className="text-2xl font-bold mb-6 text-green-900">📅 PRACTICAL READING PLAN</h2>
                
                <InfoBox>
                  <p className="font-semibold mb-2">✅ Read the Bible in One Year</p>
                  <Paragraph>
                    If you read three chapters a day and four chapters on Sunday, you will read the 
                    Bible in one year! Start in the book of John then go right around.
                  </Paragraph>
                </InfoBox>

                <Paragraph>
                  Since 2004 until now (June 2011) I have read the entire Bible three times and the New Testament 
                  over 10 times. I'm presently going through the Bible again for the fourth time, 
                  reading a Bible with a commentary edition, reading one chapter and all the 
                  commentary with that chapter. Why am I telling you this? Because <strong>I need to fuel up 
                  everyday to keep the fire of God strong in my life. I need my daily bread.</strong> However 
                  you plan to read the Bible, just start reading the Bible.
                </Paragraph>

                <InfoBox>
                  <p className="font-semibold mb-2">💿 The Bible is Available in Many Formats</p>
                  <Paragraph>
                    There might be people who cannot read in your family; tell them the Bible is 
                    available on CD, DVD and mp3 nowadays, so they can still get in the Word!
                  </Paragraph>
                </InfoBox>
              </GreenSection>

              {/* The Basket Story */}
              <PurpleSection>
                <h2 className="text-2xl font-bold mb-6 text-purple-900">🧺 THE BASKET STORY</h2>
                
                <Paragraph>
                  You might say I don't understand the Bible, what's the use? Let me tell you a story that 
                  I found on the Internet one day; this is exactly how I read it:
                </Paragraph>

                <div className="bg-purple-100 p-6 rounded-lg mb-4 border-l-4 border-purple-400">
                  <Paragraph>
                    There was an old man that lived in the mountains of eastern Kentucky. The old 
                    man had a big family. One day one of the old man's grandsons approached him 
                    with a problem. The Grandson said, "Pap, I read the Bible and I don't understand 
                    it, and what I understand I forget as soon as I close the Bible covers. What's the 
                    use of reading the Bible!"
                  </Paragraph>
                  
                  <Paragraph>
                    The Grandfather ordered the grandson to get the basket 
                    they used to carry the heating coal into the house and run down to the river and 
                    bring back a basket of water to the house. To please his grandfather, the lad 
                    grabbed the basket, ran to the river and got a basket of water. The lad ran back to 
                    the house with the water. By the time the lad reached the house the basket was 
                    empty.
                  </Paragraph>

                  <Paragraph>
                    The grandfather chided the young boy, "Hurry and go bring me a basket of water. 
                    DO IT NOW!" The lad ran quickly from the river. The basket was full when he left 
                    the river, but by the time he arrived at the house the basket of water was dry. After 
                    his third trip, the boy told his granddad, "It is no use, I cannot retain the water in 
                    the basket until I get here. It is useless."
                  </Paragraph>

                  <Paragraph>
                    The grandfather looked at the disgusted young boy and said, "So you think it is useless?" "Yes! Pap it is useless to try!" the 
                    boy replied. The Grandfather said to the boy, <strong>"BUT LOOK AT THE BASKET, CAN'T 
                    YOU SEE SOMETHING?"</strong>
                  </Paragraph>

                  <Paragraph className="font-bold text-purple-900">
                    THE SMALL BOY WAS AMAZED, AFTER THREE TRIPS TO THE RIVER, THE DIRTY COAL BASKET WAS CLEAN.
                  </Paragraph>

                  <Paragraph className="font-bold text-purple-900">
                    Pap said, "See, that is what the Word of God does to you. As you read, you say you don't retain and 
                    understand it, it's no use but your basket is cleaned. THE WORD OF GOD DOES 
                    THE WORK OF GOD!"
                  </Paragraph>
                </div>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-purple-900">Ephesians 5:26</p>
                  <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "That he might sanctify it, having cleansed it by the washing of water with the word."
                    </p>
                  </blockquote>
                </div>

                <InfoBox>
                  <p className="font-semibold mb-2">💡 Focus on What You Understand</p>
                  <Paragraph>
                    Don't focus on what you don't understand in the Bible. <strong>Focus 
                    instead on what you do understand, and apply that.</strong> In time, the Holy Spirit will 
                    lead you into deeper truths, and you will continually understand more as you grow 
                    deeper in the Lord.
                  </Paragraph>
                </InfoBox>
              </PurpleSection>

              {/* Conclusion */}
              <OrangeSection>
                <h2 className="text-2xl font-bold mb-6 text-orange-900">🎯 CONCLUSION</h2>
                
                <CenterText>
                  <p className="text-3xl font-bold text-orange-700 mb-6">
                    Always remember: 🔥
                  </p>
                  <p className="text-2xl font-bold text-orange-700">
                    Keep fueling up and you will keep burning up!
                  </p>
                </CenterText>
              </OrangeSection>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

