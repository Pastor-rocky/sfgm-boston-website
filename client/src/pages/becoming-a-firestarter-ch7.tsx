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

export default function BecomingAFireStarterCh7() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/uploads/firestarter-audio/fire-starter-cp7.mp3";

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
                  <span className="align-middle">Chapter 7</span>
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

            {/* Chapter 7: Fasting for Fire */}
            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">🔥 CHAPTER 7: FASTING FOR FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Matthew 6:16–18</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "And when you fast, do not put on a sad face as the hypocrites do. They neglect their appearance so that everyone will see that they are fasting. I assure you, they have already been paid in full. When you go without food, wash your face and comb your hair, so that others cannot know that you are fasting—only your Father, who is unseen, will know. And your Father, who sees what you do in private, will reward you."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Jesus expects us to pray—and He also expects us to fast. He said, <strong>"When you fast."</strong> Prayer and fasting go hand in hand. Jesus also said:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Matthew 9:14–15</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Then the followers of John the Baptist came to Jesus, asking, 'Why is it that we and the Pharisees fast often, but your disciples don't fast at all?' Jesus answered, 'Do you expect the guests at a wedding party to be sad as long as the bridegroom is with them? Of course not! But the day will come when the bridegroom will be taken away from them, and then they will fast.'"
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">📖 What is Biblical Fasting?</p>
                <Paragraph>
                  Fasting means to abstain from food (to "cover the mouth"). Some people also set aside TV, radio, or negative inputs—that's helpful self-denial, but <strong>biblical fasting is abstaining from food</strong> so you deny the flesh and feed the Spirit by spending time with God, becoming more sensitive to His voice and leading. Elijah fasted forty days and heard the still, small voice of God (1 Kings 19:12).
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Fasting is not twisting God's arm to get what you want; it is <strong>bringing your body into discipline to find out what God wants for your life.</strong>
              </Paragraph>
            </RedSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">⛰️ MOSES' SHINING FACE</h2>
              
              <Paragraph>
                In Exodus, Moses went up the mountain fasting forty days to receive God's will for His people:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">Exodus 34:27–35</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "The Lord said to Moses, 'Write these words down, because it is on the basis of these words that I am making a covenant with you and with Israel.' Moses stayed there with the Lord forty days and nights, eating and drinking nothing. He wrote on the tablets the words of the covenant—the Ten Commandments. When Moses went down from Mount Sinai carrying the Ten Commandments, his face was shining because he had been speaking with the Lord; but he did not know it. Aaron and all the people looked at Moses and saw that his face was shining, and they were afraid to go near him."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                As Moses fasted and met with God, he received instructions (the Law, tabernacle details, and history by revelation). When he returned, <strong>his face shone—the light of God, His fire—so intensely that people were afraid.</strong> Our flesh cannot bear the unveiled glory of God; that's why the corruptible must put on the incorruptible before entering heaven (1 Corinthians 15).
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">✨ Putting to Death the Flesh</p>
                <Paragraph>
                  Every time we fast, we "put to death" the flesh so we can be sensitive to the Spirit. The fire of God rests on us to hear His instruction—and, like Moses, to share it.
                </Paragraph>
              </InfoBox>
            </GreenSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">⚔️ FASTING AND SPIRITUAL WARFARE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">Daniel 10:10–14</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Then a hand took hold of me and raised me to my hands and knees; I was still trembling. The angel said to me, 'Daniel, God loves you. Stand up and listen carefully to what I am going to say. I have been sent to you.' When he had said this, I stood up, still trembling. Then he said, 'Daniel, don't be afraid. God has heard your prayers ever since the first day you decided to humble [fast] yourself in order to gain understanding. I have come in answer to your prayer. The angel prince of the kingdom of Persia opposed me for twenty-one days. Then Michael, one of the chief angels, came to help me, because I had been left there alone in Persia. I have come to make you understand what will happen to your people in the future. This is a vision about the future.'"
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Daniel fasted twenty-one days for understanding. The angel explained a spiritual conflict delayed the answer. Our battle is not against flesh and blood but against spiritual forces (Ephesians 6:12).
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">👼 Angels: Ministers of Fire</p>
                <Paragraph>
                  Fasting strengthens our prayer life and diligence; the enemy's grip weakens. God sends help—His angels, ministers of fire—to give understanding and break opposition (Hebrews 1:14).
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Another example: a father brought his tormented son to Jesus. The disciples had tried and failed. Jesus rebuked the demon and set the boy free. When the disciples asked why they couldn't do it, Jesus said, <strong>"This kind goes not out except by prayer and fasting"</strong> (see Matthew 17:14–21). Sometimes opposition is stronger; fasting breaks through.
              </Paragraph>
            </BlueSection>

            <OrangeSection>
              <h2 className="text-2xl font-bold mb-6 text-orange-900">🙏 A TESTIMONY: DELIVERANCE IN INDIANAPOLIS</h2>
              
              <Paragraph>
                On Christmas 2009, a father from Indianapolis called weeping. His son had been acting strangely, calling himself "the dark lord," seizing, and watching demonic content. I asked a brother to fast with me, and we drove from Chicago to Indianapolis praying and fasting.
              </Paragraph>

              <Paragraph>
                At the house, God's peace was present. In the basement (where manifestations had been strongest), I led the boy to repent and pray, anointed him with oil, and declared Scripture (Colossians 2:15; 1 John 4:4; Luke 10:19).
              </Paragraph>

              <Paragraph>
                He collapsed, convulsed, sighed deeply, and then came to—<strong>free.</strong> Later, the Lord led me to the garage where occult symbols were posted; we removed and destroyed them. The house had been used for satanic activity. Through prayer and fasting, Jesus delivered that young man.
              </Paragraph>

              <WarningBox>
                <p className="font-semibold mb-2">⚠️ Oppression vs. Possession</p>
                <Paragraph>
                  Christians cannot be possessed, but those who claim Christ while living in rebellion can be oppressed and harassed (see Luke 11:24–26).
                </Paragraph>
              </WarningBox>

              <Paragraph>
                If a bondage keeps pulling you back—habits of action, words, thoughts, attitudes—pray and fast. I fasted weekly (sometimes twice a week) for a year for deliverance from anger. God worked deeply. Temptations may still knock, but <strong>prayer and fasting make a real difference.</strong>
              </Paragraph>
            </OrangeSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">👑 FASTING FOR OTHERS: ESTHER'S COURAGE</h2>
              
              <Paragraph>
                In Esther, all Jews faced annihilation by Haman's plot. Esther, a Jew and queen of Persia, risked her life to intercede—but first she called a fast.
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Esther 4:11–17</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "'If anyone, man or woman, goes to the inner courtyard and sees the king without being summoned, that person must die. That is the law... There is only one way around this law: if the king holds out his gold scepter... But it has been a month since the king sent for me.' When Mordecai received Esther's message, he sent this warning: 'Don't imagine that you are safer than any other Jew just because you are in the royal palace... If you keep quiet... help will come from heaven to the Jews... Yet who knows—maybe it was for a time like this that you were made queen!' Esther sent Mordecai this reply: 'Go and get all the Jews in Susa together; hold a fast and pray for me. Don't eat or drink anything for three days and nights. My servant women and I will be doing the same. After that, I will go to the king, even though it is against the law. If I must die for doing it, I will die.'"
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                The king received her, the Jews were spared, and Haman was hanged. <strong>When we fast, we find favor with the King of kings.</strong> Perhaps you were placed where you are "for such a time as this." Fast and pray for those who are lost.
              </Paragraph>
            </PurpleSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">🛡️ FASTING SHOWS DEPENDENCE ON GOD</h2>
              
              <Paragraph>
                In 2 Chronicles 20, multiple enemies marched against Judah.
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">2 Chronicles 20:3–4</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Jehoshaphat was frightened and prayed to the Lord for guidance. Then he gave orders for a fast to be observed throughout the country. From every city of Judah people hurried to Jerusalem to ask the Lord for guidance."
                  </p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">2 Chronicles 20:14–15</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "The Spirit of the Lord came upon... Jahaziel... and he said, 'Your Majesty and all you people of Judah and Jerusalem, the Lord says that you must not be discouraged or be afraid to face this large army; for the battle is not yours, but God's.'"
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">⚔️ The Battle is the Lord's</p>
                <Paragraph>
                  Fasting declares, "The battle is the Lord's." Judah obeyed—sending singers ahead in praise. God turned their enemies against each other. When Judah arrived, they found only fallen foes and spent three days gathering plunder (2 Chronicles 20:24–26).
                </Paragraph>
              </InfoBox>

              <Paragraph>
                I preached this in Chicago for Pastor Leo when his wife, Tonya, was diagnosed with cancer. I wrote "You are healed of cancer" on a chalkboard (hidden), told the church to praise God in advance, then turned the board around. The church prayed, fasted, and worshiped. A week later, doctors declared her cancer free. <strong>Hallelujah.</strong>
              </Paragraph>
            </GreenSection>

            <YellowSection>
              <h2 className="text-2xl font-bold mb-6 text-yellow-900">🏢 MORE TESTIMONIES: GOD MOVES THROUGH FASTING</h2>
              
              <Paragraph>
                My wife, Gina, and I have seen God move through fasting. When our church needed a permanent building, we entered a 21-day Daniel fast for three things: God's blessing on the ministry, our immediate family, and salvation for our loved ones.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🏛️ God Gave Us a Church Building</p>
                <Paragraph>
                  Soon after, the Church of God (Great Lakes Region) gave us a church property—the one I grew up in—with a connected parsonage. It saved us $4,300 a month in rent and left only $15,000 owed on a property worth over $600,000. Family began attending because it was closer. We kept praying for more.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                We then held a 40-day revival—full services every day—with many guest pastors; I preached 15 of them. A few of us fasted the full 40 days (21 as a Daniel fast, then without meat). God's presence was powerful, we raised over $5,000 to help build a church in Armenia, and many preached for the first time.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">4️⃣0️⃣ Forty Marks Life Change</p>
                <Paragraph>
                  Forty in Scripture often marks life change. Prayer and fasting change you forever.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                I also did a three-day water-only fast while my mother was dying. It was hard, but God sustained me, and He turned that pain into a testimony that helped others.
              </Paragraph>
            </YellowSection>

            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">⚠️ WHY SOME FASTS SEEM INEFFECTIVE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Isaiah 58:3–14</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "You wonder why the Lord pays no attention when you go without eating and act humble. But on those same days that you give up eating, you think only of yourselves and abuse your workers. You even get angry and ready to fight. No wonder God won't listen to your prayers! Do you think the Lord wants you to give up eating and to act as humble as a bent-over bush? Or to dress in sackcloth and sit in ashes? Is this really what he wants on a day of worship?
                  </p>
                  <p>
                    "I'll tell you what it really means to worship the Lord. Remove the chains of prisoners who are chained unjustly. Free those who are abused! Share your food with everyone who is hungry; share your home with the poor and homeless. Give clothes to those in need; don't turn away your relatives.
                  </p>
                  <p>
                    "Then your light will shine (fire) like the dawning sun, and you will quickly be healed. Your honesty will protect you as you advance, and the glory of the Lord will defend you from behind. When you beg the Lord for help, he will answer, 'Here I am!' Don't mistreat others or falsely accuse them or say something cruel. Give your food to the hungry and care for the homeless. Then your light will shine (fire) in the dark; your darkest hour will be like the noonday sun.
                  </p>
                  <p>
                    "The Lord will always guide you and provide good things to eat when you are in the desert. He will make you healthy. You will be like a garden that has plenty of water or like a stream that never runs dry. You will rebuild those houses left in ruins for years; you will be known as a builder and repairer of city walls and streets."
                  </p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Isaiah 58:12 (ASV)</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "And they that shall be of thee shall build the old waste places; thou shalt raise up the foundations of many generations; and thou shalt be called The repairer of the breach, The restorer of paths to dwell in."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">🔥 Your Fire Will Shine</p>
                <Paragraph>
                  When you fast with right motives, God will bless you, your light (fire) will shine, and He will use you to rebuild lives—restoring people to paths of righteousness.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Remember: Jesus fasted forty days and nights in the wilderness (Matthew 4). He destroyed the enemy's works and launched His ministry. If we are Christians—imitators of Christ—we should do what Jesus did. He said, <strong>"When you fast."</strong> It's time to fast for fire.
              </Paragraph>
            </RedSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">📋 HOW TO FAST</h2>
              
              <Paragraph>
                God sees the heart. If you fast with right motives for His glory, He will give you strength. Always check with a doctor if you have health conditions that may prevent certain fasts.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🥤 Full Fast</p>
                <BulletList>
                  <BulletItem>Liquids only (you set the number of days)</BulletItem>
                </BulletList>
              </InfoBox>

              <InfoBox>
                <p className="font-semibold mb-2">🥗 Daniel Fast</p>
                <BulletList>
                  <BulletItem>No meat, no sweets, no bread</BulletItem>
                  <BulletItem>Drink water and juice</BulletItem>
                  <BulletItem>Eat fruits and vegetables</BulletItem>
                  <BulletItem>Traditionally 21 days, but you can set the duration</BulletItem>
                </BulletList>
              </InfoBox>

              <InfoBox>
                <p className="font-semibold mb-2">3️⃣ Three-Day Fast</p>
                <BulletList>
                  <BulletItem>Can be a full fast, a Daniel fast, or give up at least one significant item of food</BulletItem>
                </BulletList>
              </InfoBox>

              <InfoBox>
                <p className="font-semibold mb-2">☀️ Partial Fast (Half Day)</p>
                <BulletList>
                  <BulletItem>From 6:00 a.m. to 3:00 p.m., or from sunrise to sundown</BulletItem>
                  <BulletItem>Choose a full fast, Daniel fast, or give up at least one item of food during those hours</BulletItem>
                </BulletList>
              </InfoBox>

              <Paragraph>
                Remember: God responds to a sincere heart (Isaiah 58; Jeremiah 14:12; 1 Corinthians 8:8). May God greatly bless you as you fast.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">📖 Scripture References for Fasting</p>
                <BulletList>
                  <BulletItem><strong>Personal fasting:</strong> Matthew 6:16–18; Matthew 9:14–15; Luke 18:9–14</BulletItem>
                  <BulletItem><strong>Corporate fasting:</strong> 1 Samuel 7:5–6; Ezra 8:21–23; Nehemiah 9:1–3; Joel 2:15–16; Jonah 3:5–10; Acts 27:33–37</BulletItem>
                  <BulletItem><strong>Relation to prayer and the Word:</strong> 1 Samuel 1:6–8, 17–18; Nehemiah 1:4; Daniel 9:3, 20; Joel 2:12; Luke 2:37; Acts 10:30; Acts 13:2</BulletItem>
                </BulletList>
              </InfoBox>

              <InfoBox>
                <p className="font-semibold mb-2">📚 Recommended Resource</p>
                <Paragraph>
                  Jentezen Franklin, "Fasting."
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

