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

export default function BecomingAFireStarterCh4() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/uploads/textbook-audio/fire-starter-cp4.mp3";

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
                  <span className="align-middle">Chapter 4</span>
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
              
              
              {/* Introduction */}
              <RedSection>
                <h2 className="text-2xl font-bold mb-6 text-red-900">👁️ CHAPTER 4: KEEP YOUR EYES ON THE FIRE</h2>
                
                <Paragraph>
                  When you hear the names King David, King Solomon, and Samson, what comes to 
                  mind? Mighty men of God, famous men of God, good-looking men of God? All of 
                  that is true. But they share one more thing in common: <strong>they all fell to the lust of 
                  the eyes.</strong>
                </Paragraph>

                <Paragraph>
                  King David was known as a shepherd, an armor-bearer, a poet, a prophet, the 
                  ultimate king, a warrior, and a man after God's own heart. King Solomon was 
                  known as the wisest, richest, most famous king; he built the temple of the Lord 
                  and saw fire come down from heaven. He saw God twice in visions and was so 
                  loved by the Lord that God gave him another name—Jedidiah—which means 
                  "beloved of Jehovah." Then there was Samson, one of Israel's most famous 
                  judges, the strongest man who ever lived. What happened to these mighty men 
                  beloved by God?
                </Paragraph>

                <Paragraph>
                  King David fell for Bathsheba (2 Samuel 11:3). King Solomon fell for hundreds of 
                  pagan women whom God strictly forbade—he had 1,000 women altogether, 
                  including wives and concubines—and he even burned incense to his wives' false 
                  gods (1 Kings 11:7–9). Samson fell for Delilah and other pagan women (Judges 
                  16:6).
                </Paragraph>

                <WarningBox>
                  <p className="font-semibold mb-2">⚠️ The Quickest Way to Extinguish the Fire</p>
                  <Paragraph>
                    The quickest way the fire is extinguished in believers' lives is falling to the lust of 
                    the eyes.
                  </Paragraph>
                </WarningBox>
              </RedSection>

              {/* They Knew the Word */}
              <BlueSection>
                <h2 className="text-2xl font-bold mb-6 text-blue-900">📖 THEY KNEW THE WORD BUT STOPPED OBEYING IT</h2>
                
                <Paragraph>
                  Remember from the previous chapter that the fuel for the fire is the Word. Every 
                  one of these men heard the voice of God and knew the Word of God. King David 
                  said, "I have hidden thy Word in my heart that I might not sin against you" (Psalm 
                  119). The point is, <strong>they stopped looking to the Word for help; they didn't look to 
                  the Word for strength; they stopped obeying the Word of the Lord.</strong> And they all 
                  paid the consequences for their sin.
                </Paragraph>

                <WarningBox>
                  <p className="font-semibold mb-3">⚠️ The Consequences Were Severe:</p>
                  <BulletList>
                    <BulletItem>
                      <strong>David's consequences</strong> included the death of three of his children and the rape of 
                      his daughter by her half-brother; his own son also lay with his concubines in broad 
                      daylight (2 Samuel 12:1–23).
                    </BulletItem>
                    <BulletItem>
                      <strong>For Solomon</strong>, one consequence was the division of 
                      the kingdom into a northern and a southern kingdom (1 Kings 11:11–13).
                    </BulletItem>
                    <BulletItem>
                      <strong>Samson's consequence</strong> was being beaten, mocked by the enemy, and having his eyes 
                      gouged out (Judges 16:21).
                    </BulletItem>
                  </BulletList>
                </WarningBox>

                <InfoBox>
                  <p className="font-semibold mb-2">💡 Grace Doesn't Remove All Consequences</p>
                  <Paragraph>
                    Even when we repent and receive God's mercy and grace, sometimes our sins still 
                    have a negative impact on our lives (2 Samuel 12:12–13). God forgives and forgets 
                    the sin, but some consequences do not go away.
                  </Paragraph>
                </InfoBox>
              </BlueSection>

              {/* Nathan's Parable */}
              <PurpleSection>
                <h2 className="text-2xl font-bold mb-6 text-purple-900">📖 NATHAN'S PARABLE TO DAVID</h2>
                
                <Paragraph>
                  I want to show you why they all fell into the lust of the eyes by looking at a story Nathan the prophet told King 
                  David to illustrate his sin. It is found in 2 Samuel 12:1–10:
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-purple-900">2 Samuel 12:1-10</p>
                  <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "The Lord sent the prophet Nathan to David. Nathan went to him and said, 'There 
                      were two men who lived in the same town; one was rich and the other poor. The 
                      rich man had many cattle and sheep, while the poor man had only one lamb, which 
                      he had bought. He took care of it, and it grew up in his home with his children. He 
                      would feed it some of his own food, let it drink from his cup, and hold it in his lap. 
                      The lamb was like a daughter to him.
                    </p>
                    <p className="mt-2">
                      "'One day a visitor arrived at the rich man's home. The rich man didn't want to kill 
                      one of his own animals to fix a meal for him; instead, he took the poor man's lamb 
                      and prepared a meal for his guest.'
                    </p>
                    <p className="mt-2">
                      "David became very angry at the rich man and said, 'I swear by the living Lord that 
                      the man who did this ought to die! For having done such a cruel thing, he must pay 
                      back four times as much as he took.' <strong>"'You are that man,' Nathan said to David.</strong>
                    </p>
                    <p className="mt-2">
                      'And this is what the Lord God of Israel says: I made you king of Israel and rescued 
                      you from Saul. I gave you his kingdom and his wives; I made you king over Israel 
                      and Judah. If this had not been enough, I would have given you twice as much. 
                      Why, then, have you disobeyed my commands? Why did you do this evil thing? You 
                      had Uriah killed in battle; you let the Ammonites kill him, and then you took his 
                      wife! Now, in every generation some of your descendants will die a violent death 
                      because you have disobeyed me and have taken Uriah's wife.'"
                    </p>
                  </blockquote>
                </div>

                <WarningBox>
                  <p className="font-semibold mb-2">⚠️ The Visitor is the Devil</p>
                  <Paragraph>
                    The "visitor" in the story is the devil. He wants to come to your house to destroy 
                    you by making you lazy and leading you to lust. When David fell into the lust of the 
                    eyes, he was supposed to be on the battlefield fighting with his soldiers, but he 
                    stayed home and saw Bathsheba taking a bath (2 Samuel 11). That sin gave birth 
                    to more sin. He had Bathsheba's husband Uriah killed to cover up his sin of a love 
                    child and to take Bathsheba as his wife.
                  </Paragraph>
                </WarningBox>
              </PurpleSection>

              {/* Killing Uriah = Killing the Fire */}
              <RedSection>
                <h2 className="text-2xl font-bold mb-6 text-red-900">🔥 KILLING URIAH = KILLING THE FIRE</h2>
                
                <InfoBox>
                  <p className="font-semibold mb-2">💡 The Meaning of Uriah's Name</p>
                  <Paragraph>
                    When you fall into the lust of the eyes, the lust of the flesh, and the pride of life, 
                    you "kill Uriah" in your life. What do I mean? <strong>Uriah, in Hebrew, means "the fire of 
                    Jehovah."</strong> When you take your eyes off God's fire and put them where they 
                    shouldn't be, you end up killing the fire of God in your life.
                  </Paragraph>
                </InfoBox>
              </RedSection>

              {/* The First Sin */}
              <OrangeSection>
                <h2 className="text-2xl font-bold mb-6 text-orange-900">🍎 THE FIRST SIN IN THE GARDEN</h2>
                
                <Paragraph>Look at the first sin in the garden in Genesis 3:</Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-orange-900">Genesis 3:6</p>
                  <blockquote className="border-l-4 border-orange-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "The woman saw how beautiful the tree was and how good its fruit would be to 
                      eat, and she thought how wonderful it would be to become wise. So she took 
                      some of the fruit and ate it. Then she gave some to her husband, and he also ate 
                      it."
                    </p>
                  </blockquote>
                </div>

                <Paragraph>
                  Satan came as a snake and deceived Eve by first getting her to lust with her eyes 
                  for the fruit. Then, after she lusted with her eyes, she lusted in the flesh, saying it 
                  would be good to eat. Third, she wanted to be wise like God—the pride of life.
                </Paragraph>

                <WarningBox>
                  <p className="font-semibold mb-2">⚠️ The Pattern of All Sin</p>
                  <Paragraph>
                    Every sin in the world falls into one of these three categories: the lust of the eyes, 
                    the lust of the flesh, or the pride of life. <strong>It always starts with the lust of the eyes.</strong>
                  </Paragraph>
                </WarningBox>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-orange-900">1 John 2:14–17</p>
                  <blockquote className="border-l-4 border-orange-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "I have written unto you, fathers, because ye know him who is from the beginning. 
                      I have written unto you, young men, because ye are strong, and the word of God 
                      abideth in you, and ye have overcome the evil one. Love not the world, neither the 
                      things that are in the world. If any man love the world, the love of the Father is not 
                      in him. For all that is in the world, the lust of the flesh and the lust of the eyes and 
                      the vain glory of life, is not of the Father, but is of the world. And the world passeth 
                      away, and the lust thereof: but he that doeth the will of God abideth for ever."
                    </p>
                  </blockquote>
                </div>

                <CenterText>
                  <p className="text-xl font-bold text-orange-700">
                    The Word is the key—not only reading it or saying amen to it, but actually holding 
                    onto it. 🔥
                  </p>
                </CenterText>

                <Paragraph>
                  Don't let it go; if you do, you'll extinguish the fire in your life. If you hold on, 
                  you will overcome the evil one. Let's learn from these mighty men. They fell; let's 
                  learn from their mistakes so we won't repeat them. The only way we can overcome 
                  where they failed is by listening to the Word of God and to the convicting and 
                  leading power of the Holy Spirit.
                </Paragraph>
              </OrangeSection>

              {/* Scriptures on Purity */}
              <GreenSection>
                <h2 className="text-2xl font-bold mb-6 text-green-900">📜 SCRIPTURES TO MEDITATE ON</h2>
                
                <Paragraph>
                  Here are some verses to meditate on as we seek to remain free from the 
                  corrupting power of lustful thoughts:
                </Paragraph>

                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2 text-green-900">Matthew 5:27–28</p>
                    <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                      <p>
                        "You have heard that it was said, 'Do not commit adultery.' But I tell you that 
                        anyone who looks at a woman lustfully has already committed adultery with her in 
                        his heart."
                      </p>
                    </blockquote>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-green-900">James 4:4</p>
                    <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                      <p>
                        "You adulterous people, don't you know that 
                        friendship with the world is hatred toward God? Anyone who chooses to be a 
                        friend of the world becomes an enemy of God."
                      </p>
                    </blockquote>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-green-900">James 1:13</p>
                    <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                      <p>
                        "When tempted, no one should say, 'God is tempting me.' For God cannot be 
                        tempted by evil, nor does he tempt anyone."
                      </p>
                    </blockquote>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-green-900">Proverbs 6:25</p>
                    <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                      <p>
                        "Do not lust in your heart after her beauty or let her captivate you with her eyes."
                      </p>
                    </blockquote>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-green-900">Proverbs 5:1–16 (Excerpt)</p>
                    <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                      <p>
                        "My child, pay attention and listen to my wisdom and insight. Then you will know 
                        how to behave properly, and your words will show that you have knowledge. The 
                        lips of another man's wife may be as sweet as honey and her kisses as smooth as 
                        olive oil, but when it is all over, she leaves you nothing but bitterness and pain... 
                        Keep away from such a woman! Don't even go near her door!... Be 
                        faithful to your own wife and give your love to her alone."
                      </p>
                    </blockquote>
                  </div>
                </div>
              </GreenSection>

              {/* The Danger of Hell */}
              <RedSection>
                <h2 className="text-2xl font-bold mb-6 text-red-900">⚠️ THE DANGER OF HELL'S FIRE</h2>
                
                <Paragraph>
                  Satan wants not only to kill the fire in your life by the lust of the eyes but also to 
                  have you spend eternity in the fires of hell.
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-red-900">Galatians 5:19, 21</p>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Now the works of the flesh are manifest, which are these: adultery, fornication, uncleanness, 
                      lasciviousness ... they which do such things shall not inherit the kingdom of God."
                    </p>
                  </blockquote>
                </div>

                <Paragraph className="italic">
                  The Greek word for "fornication" here is <strong>porneia</strong>—the root of 
                  our English word "pornography."
                </Paragraph>

                <WarningBox>
                  <p className="font-semibold mb-2">⚠️ A Sobering Reality</p>
                  <Paragraph>
                    According to a CBS special, at several major hotel chains—Hilton, Marriott, Hyatt, 
                    Sheraton, and Holiday Inn—50 percent of guests view adult films on in-room pay-per-view television systems. Fifty percent. Another report notes that hotel adult 
                    rentals increase during ministry conventions. That means some pastors are 
                    viewing hotel adult movies at a higher rate than the general public. This is one 
                    reason fire has been missing in some churches: leaders have fallen to the lust of 
                    the eyes.
                  </Paragraph>
                </WarningBox>
              </RedSection>

              {/* Jesus' Teaching on Cutting Out Sin */}
              <OrangeSection>
                <h2 className="text-2xl font-bold mb-6 text-orange-900">✂️ CUT IT OUT!</h2>
                
                <Paragraph>You might say you don't watch dirty movies... Jesus said:</Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-orange-900">Matthew 18:8–9</p>
                  <blockquote className="border-l-4 border-orange-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "If your hand or foot causes you to sin, chop it off and throw it away! You would be 
                      better off to go into life crippled or lame than to have two hands or two feet and be 
                      thrown into the fire that never goes out. If your eye causes you to sin, poke it out 
                      and get rid of it. You would be better off to go into life with only one eye than to 
                      have two eyes and be thrown into the fires of hell."
                    </p>
                  </blockquote>
                </div>

                <InfoBox>
                  <p className="font-semibold mb-2">💡 What Jesus Really Means</p>
                  <Paragraph>
                    Even if the movie isn't an adult film—say it's rated R with a racy scene—it can still 
                    cause you to lust. Do what Jesus said: cut it out. He didn't mean literally cut off 
                    your hand or foot or pluck out your eye. He means <strong>if anything is causing you to sin, 
                    remove it from your life.</strong> Don't set yourself up to fail. If cable is a problem, cut it 
                    off. If the Internet is a problem, cut it off or put blocks on it.
                  </Paragraph>
                </InfoBox>

                <Paragraph>
                  I personally don't watch anything over PG-13; sometimes I can't even watch those. 
                  You might say that's overdoing it. Ask yourself: How badly do you want the fire of 
                  God in your life?
                </Paragraph>
              </OrangeSection>

              {/* Job's Covenant */}
              <PurpleSection>
                <h2 className="text-2xl font-bold mb-6 text-purple-900">🤝 JOB'S COVENANT</h2>
                
                <Paragraph>I love what Job said:</Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-purple-900">Job 31:1</p>
                  <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "I have made a solemn promise never to look with lust at a woman."
                    </p>
                  </blockquote>
                </div>

                <CenterText>
                  <p className="text-xl font-bold text-purple-700">
                    I've made that same covenant with God. I will not lust after a woman because I want 
                    the fire of God more than the fire of passion and lust. 🔥
                  </p>
                </CenterText>
              </PurpleSection>

              {/* Jesus' Victory */}
              <YellowSection>
                <h2 className="text-2xl font-bold mb-6 text-yellow-900">✝️ JESUS' VICTORY OVER TEMPTATION</h2>
                
                <Paragraph>
                  You can fight it off by the power of Christ Jesus. In Matthew 4, Satan tempted 
                  Jesus with the same categories as Adam and Eve: the lust of the flesh, the lust of 
                  the eyes, and the pride of life. Where the first man, Adam, failed, the second 
                  Adam, Jesus, succeeded (1 Corinthians 15:47).
                </Paragraph>

                <InfoBox>
                  <p className="font-semibold mb-2">💡 How Jesus Overcame</p>
                  <Paragraph>
                    Jesus overcame by quoting Scripture from Deuteronomy 6 and 8. <strong>Deuteronomy means "repeat the word."</strong> 
                    That's exactly what Jesus did in every temptation. He openly quoted the Word of 
                    God and defeated the enemy—to show us how to overcome temptation.
                  </Paragraph>
                </InfoBox>

                <Paragraph>
                  When I'm tempted, I ask God to help me, and He does. I also quote Scriptures like 
                  Romans 6: "I am not a slave to sin anymore," or Isaiah 54:17: "No weapon formed 
                  against you will prosper." Jesus didn't "think" Satan away; He openly rebuked him 
                  by verbally quoting Scripture. If you do this and ask for His help, He will help you.
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-yellow-900">1 Corinthians 10:13</p>
                  <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "God is faithful; He will not let you be tempted beyond what you can bear. But 
                      when you are tempted, He will also provide a way out."
                    </p>
                  </blockquote>
                </div>

                <Paragraph>
                  That way out is Jesus. Also, don't set yourself up to fail. If you're tempted by someone 
                  or something, don't put yourself around them and don't give in or watch it.
                </Paragraph>
              </YellowSection>

              {/* Your Eyes Are Lamps */}
              <BlueSection>
                <h2 className="text-2xl font-bold mb-6 text-blue-900">💡 YOUR EYES ARE LAMPS</h2>
                
                <Paragraph>
                  Jesus said something that woke me up to keeping my eyes on the fire of God. This 
                  Scripture shows that if we set our eyes on the darkness of the world, we will kill 
                  the light—the fire—of God in our lives:
                </Paragraph>

                <div className="mb-6">
                  <p className="font-semibold mb-2 text-blue-900">Luke 11:33–36 (NLT)</p>
                  <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "No one lights a lamp and then hides it or puts it under a basket. Instead, a lamp is 
                      placed on a stand, where its light can be seen by all who enter the house.
                    </p>
                    <p className="mt-2 font-bold">
                      "Your eye is a lamp that provides light [FIRE] for your body. When your eye is 
                      good, your whole body is filled with light [FIRE]. But when it is bad, your body is 
                      filled with darkness. Make sure that the light you think you have is not actually 
                      darkness. If you are filled with light, with no dark corners, then your whole life will 
                      be radiant, as though a floodlight were filling you with light."
                    </p>
                  </blockquote>
                </div>

                <InfoBox>
                  <p className="font-semibold mb-3">🔦 The Floodlight Effect</p>
                  <Paragraph>
                    Here's the takeaway: when your eyes are on God—God is good (Mark 10), and 
                    Jesus is the Light (John 8:12)—your whole life will be consumed with God's 
                    presence, and the fire of God will be evident in your life for all to see, like a 
                    floodlight. Floodlights come on during storms and blackouts—during darkness. 
                    You will be used to help people come out of the darkness of the world and to 
                    encourage those going through trials when you keep your eyes on the fire and 
                    don't hide anything from God—no dark corners—and allow Him to move in every 
                    area of your life.
                  </Paragraph>
                </InfoBox>

                <WarningBox>
                  <p className="font-semibold mb-2">⚠️ Light and Darkness Have Nothing in Common</p>
                  <Paragraph>
                    Just make sure the light (fire) you think you have is not actually darkness. What do 
                    light and darkness have in common? Nothing.
                  </Paragraph>
                </WarningBox>
              </BlueSection>

              {/* Conclusion */}
              <OrangeSection>
                <h2 className="text-2xl font-bold mb-6 text-orange-900">🎯 CONCLUSION</h2>
                
                <CenterText>
                  <p className="text-3xl font-bold text-orange-700 mb-6">
                    👁️ 🔥
                  </p>
                  <p className="text-2xl font-bold text-orange-700">
                    If you keep your eyes on the fire, you'll be something special for God.
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

