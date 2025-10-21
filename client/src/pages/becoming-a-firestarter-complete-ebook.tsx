import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2, Download } from "lucide-react";
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

export default function BecomingAFireStarterCompleteEbook() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const downloadPDF = () => {
    // Open the PDF for Becoming a Fire Starter
    window.open('/pdfs/Becoming%20A%20Fire%20Starter.pdf', '_blank');
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    { id: 1, title: "Chapter 1: When God Answers with Fire", audioUrl: "/uploads/textbook-audio/fire-starter-cp1.mp3" },
    { id: 2, title: "Chapter 2: It's Fire or Nothing!", audioUrl: "/uploads/textbook-audio/fire-starter-cp2.mp3" },
    { id: 3, title: "Chapter 3: Fuel for the Fire", audioUrl: "/uploads/textbook-audio/fire-starter-cp3.mp3" },
    { id: 4, title: "Chapter 4: Keep Your Eyes on the Fire", audioUrl: "/uploads/textbook-audio/fire-starter-cp4.mp3" },
    { id: 5, title: "Chapter 5: Tested by Fire", audioUrl: "/uploads/firestarter-audio/fire-starter-cp5.mp3" },
    { id: 6, title: "Chapter 6: The Consuming Fire", audioUrl: "/uploads/firestarter-audio/fire-starter-cp6.mp3" },
    { id: 7, title: "Chapter 7: Fasting for Fire", audioUrl: "/uploads/firestarter-audio/fire-starter-cp7.mp3" },
    { id: 8, title: "Chapter 8: Fellowship of Fire", audioUrl: "/uploads/firestarter-audio/fire-starter-cp8.mp3" },
    { id: 9, title: "Chapter 9: Fan the Fire", audioUrl: "/uploads/firestarter-audio/fire-starter-cp9.mp3" },
    { id: 10, title: "Chapter 10: Conclusion", audioUrl: "/uploads/firestarter-audio/fire-starter-cp10.mp3" }
  ];

  const currentChapterData = chapters[currentChapter - 1];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.src = currentChapterData.audioUrl;
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
  }, [volume, currentChapter]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSkip = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(Math.max(0, audio.currentTime + delta), duration || audio.duration || 0);
    audio.currentTime = next;
    setCurrentTime(next);
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleChapterChange = (chapterId: string) => {
    setCurrentChapter(parseInt(chapterId));
  };

  const getChapterContent = (chapterId: number) => {
    switch (chapterId) {
      case 1:
        return (
          <div className="space-y-6">
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
        );
        
      case 2:
        return (
          <div className="space-y-6">
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
        );

      case 3:
        return (
          <div className="space-y-6">
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
        );

      case 4:
        return (
          <div className="space-y-6">
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
        );

      case 5:
        return (
          <div className="space-y-6">
            {/* Introduction */}
            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">🔥 CHAPTER 5: TESTED BY FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Mark 9:47–50 (KJV)</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "And if thine eye offend thee, pluck it out: it is better for thee to enter into the kingdom of God with one eye, than having two eyes to be cast into hell fire: where their worm dieth not, and the fire is not quenched. For every one shall be salted with fire, and every sacrifice shall be salted with salt. Salt is good: but if the salt have lost his saltness, wherewith will ye season it? Have salt in yourselves, and have peace one with another."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                The Good News Translation renders Mark 9:49 this way: "Everyone will be purified (tested) by fire as a sacrifice is purified by salt."
              </Paragraph>
              
              <Paragraph>
                In these verses Jesus first warns about what we let our eyes look upon, then He moves to how a believer is tested. We just discussed guarding our eyes in the previous chapter; now let's look at how believers are tested by God's fire for His glory.
              </Paragraph>
              
              <Paragraph>
                <strong>Why are believers tested in the first place?</strong>
              </Paragraph>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">1 Peter 1:6–7</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Be glad about this, even though it may now be necessary for you to be sad for a while because of the many kinds of trials you suffer. Their purpose is to prove that your faith is genuine. Even gold, which can be destroyed, is tested by fire; and so your faith, which is much more precious than gold, must also be tested, so that it may endure. Then you will receive praise and glory and honor on the Day when Jesus Christ is revealed."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">💡 The Greek Word for Trials</p>
                <Paragraph>
                  The Greek word for trials here is <em>peirasmos</em>. Thayer's definitions include: trial, proving integrity, virtue, constancy adversity, affliction, trouble sent by God and serving to test or prove one's character, faith, and holiness.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                In Mark 9, Jesus also speaks of salt—our witness for Christ. Why must a person be tested? <strong>So our witness shines.</strong> As Peter says, just as gold is tested by fire to purify it, our lives before God must be purified. The more fire, the more purity is revealed—in the gold and in us. The result is integrity, virtue, faith, and holiness. God wants you to be the real deal.
              </Paragraph>

              <WarningBox>
                <p className="font-semibold mb-2">⚠️ Don't Bail When Things Get Hard</p>
                <Paragraph>
                  Too many so-called Christians bless the Lord when all is well, but bail when things get hard, and that's why the fire burns out in their lives.
                </Paragraph>
              </WarningBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Luke 8:13</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "The seeds that fell on rocky ground stand for those who hear the message and receive it gladly. But it does not sink deep into them; they believe only for a while, but when the time of testing comes, they fall away."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                We need to <strong>embrace the fire, not run from it.</strong> The book of Malachi gives us an awesome example:
              </Paragraph>
            </RedSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">🪙 THE REFINER'S FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">Malachi 3:2–3</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "But who can abide the day of his coming? and who shall stand when he appeareth? for he is like a refiner's fire, and like fullers' soap: and he will sit as a refiner and purifier of silver, and he will purify the sons of Levi, and refine them as gold and silver; and they shall offer unto Jehovah offerings in righteousness."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Notice it says He will <strong>"sit"</strong> as a refiner. A refiner sits to ensure two things happen:
              </Paragraph>

              <BulletList>
                <BulletItem>
                  <strong>First</strong>, he uses a screen-like tool to skim away dross (impurities) as heat brings them to the surface, setting apart what is bad from what is good. When the fires of trial rise in your life, words may come out that shouldn't, thoughts may arise that aren't right, actions or habits may surface that aren't pleasing to God. He wants you to see them, bring them to Him, and let Him remove them so you can live a sanctified life.
                </BulletItem>
                <BulletItem>
                  <strong>Second</strong>, the refiner sits to make sure the gold or silver isn't ruined.
                </BulletItem>
              </BulletList>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">1 Corinthians 10:12–13</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "If you think you are standing firm you had better be careful that you do not fall. Every test that you have experienced is the kind that normally comes to people. But God keeps his promise, and he will not allow you to be tested beyond your power to remain firm; at the time you are put to the test, he will give you the strength to endure it, and so provide you with a way out."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">💪 God Wants You to Succeed</p>
                <Paragraph>
                  God does not want you to fail. He wants you to succeed, and He will help you.
                </Paragraph>
              </InfoBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">Isaiah 43:1–2</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Israel, the Lord who created you says, Do not be afraid—I will save you. I have called you by name—you are mine. When you pass through deep waters, I will be with you; your troubles will not overwhelm you. When you pass through fire, you will not be burned; the hard trials that come will not hurt you."
                  </p>
                </blockquote>
              </div>
              
              <WarningBox>
                <p className="font-semibold mb-2">⚖️ Test vs. Discipline - Know the Difference</p>
                <Paragraph>
                  You might say, I've been tested too much. Keep believing and waiting—God will get you through. But make sure it's a test and not discipline. Many confuse the two: they commit adultery, lie, cheat, live according to the flesh, and then say, "I'm going through some trials." <strong>No—that's discipline.</strong> Repent, and God will stop the discipline.
                </Paragraph>
              </WarningBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">1 Peter 4:15–16</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "For let none of you suffer as a murderer, or a thief, or an evil-doer, or as a meddler in other men's matters: but if a man suffers as a Christian, let him not be ashamed; but let him glorify God in this name."
                  </p>
                </blockquote>
              </div>
            </BlueSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">👨‍🏭 THE SILVERSMITH STORY</h2>
              <Paragraph>
                Here's a story that brings the refiner's picture to life:
              </Paragraph>

              <Paragraph>
                There was a group of women in a Bible study on Malachi. As they studied chapter 3, they came across verse 3: "He will sit as a refiner and purifier of silver." The statement puzzled them. One woman offered to find out more about refining silver and report back.
              </Paragraph>

              <Paragraph>
                She visited a silversmith and watched him at work. Without explaining her reason, she observed as he held a piece of silver over the fire, letting it heat up. He explained that to refine silver, he must hold it in the middle of the fire where the flames are hottest to burn away all impurities.
              </Paragraph>

              <Paragraph>
                She thought about God holding us in such a hot spot—and then about the verse that says He sits as a refiner. She asked if he really had to sit the entire time the silver was in the fire. "Yes," he said. He not only had to sit and hold the silver, but he had to keep his eyes on it the whole time. If left even a moment too long, the silver would be destroyed.
              </Paragraph>

              <Paragraph>
                She asked, "How do you know when the silver is fully refined?" He smiled: <strong>"Oh, that's easy—when I see my image in it."</strong>
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">✨ God's Eyes Are Fixed on You</p>
                <Paragraph>
                  This is especially meaningful for those in the hottest part of the flame right now. God's eyes are fixed on those He is refining. Nothing in your life goes unnoticed by the Father. He is aware of all—and He is for you. Jesus will allow strong fires of testing until He—and everyone else—sees His image, His character, in your life.
                </Paragraph>
              </InfoBox>
            </GreenSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">🔥 THE FIERY FURNACE</h2>
              
              <Paragraph>
                There's a story in Daniel that shows people seeing Jesus in your life through trials. Three Hebrew men were carried to Babylon and taught its ways. The king made a golden idol and commanded all to bow when the music sounded. The three refused, because it was against God's law. Summoned before the king, they still would not bow. Then Shadrach, Meshach, and Abed-nego said:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Daniel 3:16–18</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "O Nebuchadnezzar, we have no need to answer thee in this matter. If it be so, our God whom we serve is able to deliver us from the burning fiery furnace; and he will deliver us out of thy hand, O king. But if not, be it known unto thee, O king, that we will not serve thy gods, nor worship the golden image which thou hast set up."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                In fury, the king ordered the furnace heated seven times hotter and had the three bound and thrown in. The fire was so hot it killed the men who threw them in. But then:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Daniel 3:24–26</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Did not we cast three men bound into the midst of the fire?" They answered, "True, O king." He said, "Lo, I see four men loose, walking in the midst of the fire, and they have no hurt; and the aspect of the fourth is like a son of the gods." Then he called them out, and Shadrach, Meshach, and Abed-nego came forth from the fire.
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                They came out unharmed and loosed. <strong>The only thing that burned was the ropes</strong>—and the ones who threw them in. When you go through a test of fire without bowing to the world or giving in to the enemy—even if God doesn't change the situation—and you can say like they did, "Even if God doesn't deliver me, I will not give in, I will not let go, I will not bow," then the only thing that will burn are the bondages that tried to hold you. The enemy won't touch you because you submitted to God through testing by fire. You will go through the fire without being burned. And like the refiner's fire, people will see Jesus in you. The people saw a visitation of Jesus in the middle of the fire, protecting them with His holy fire.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🙏 The Meaning of Their Names</p>
                <Paragraph>
                  Many don't realize that Shadrach, Meshach, and Abed-nego's Hebrew names were Hananiah, Mishael, and Azariah (see Daniel 2:17).
                </Paragraph>
                <BulletList>
                  <BulletItem><strong>Hananiah</strong> means "favor"</BulletItem>
                  <BulletItem><strong>Mishael</strong> means "like God"</BulletItem>
                  <BulletItem><strong>Azariah</strong> means "the Lord helps"</BulletItem>
                </BulletList>
                <Paragraph>
                  The king gave them Babylonian names after Babylon's gods. Their character stood firm. They had God's favor—right after they came out, the king promoted them. He also declared that no other god could save like the God of the Hebrews. God helped them—and because of this, people saw the Son of God in their lives.
                </Paragraph>
              </InfoBox>

              <WarningBox>
                <p className="font-semibold mb-2">🎯 Your Setback Might Be a Set-Up</p>
                <Paragraph>
                  Another reason God allows tests of fire is to promote you. <strong>Don't be discouraged—your setback might be a set-up.</strong>
                </Paragraph>
              </WarningBox>
            </PurpleSection>

            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">💔 A PERSONAL TESTIMONY OF FIRE</h2>
              <Paragraph>
                Here is the biggest test I've gone through. In August 2005, I received a call that my mother was brain-dead in the hospital, and people said her husband did it. I flew to New York. I saw my mother full of tubes, with cuts and scrapes on her arms and neck. I remembered two weeks earlier she told me, "Anthony, this man is going to kill me; he put a knife to my throat and cut me." I was looking at those scars. She had asked me for money, and I had said no because I was upset she stayed with him, even though I warned her.
              </Paragraph>

              <Paragraph>
                I prayed and fasted for days, asking God for strength not to lose it, because her husband was at the hospital the whole time. One day he came into the room. I stood up, and God put such peace on me. He talked about praying to some saint, and I told him the only way to the Father is Jesus. As days passed, God worked on me. One day, reading Jeremiah—"vengeance is the Lord's"—I knew what God wanted me to do.
              </Paragraph>

              <Paragraph>
                Days later my family decided to remove life support. God gave me peace about it. The doctors said there was no way she would recover, even though I knew God could raise the dead. If it was His will, He could have raised my mother.
              </Paragraph>

              <Paragraph>
                I told them to take the machines off. If it was God's will for her to live, the machine wouldn't stop it. The Lord's will came to pass, and He took her to heaven. Shortly after, we buried her, and God gave me grace to forgive and forget. I told her husband I wasn't crazy—I knew he did it—but I shook his hand and forgave him by God's grace.
              </Paragraph>

              <Paragraph>
                You might ask how I know he killed my mother. My wife's aunt was married to his son. When my wife asked her aunt what happened, she said, "I can't tell you because they will kill me too." He had been accused of more than one murder and never charged. The Bible says God directs government officials (Romans 13:1) and that vengeance is the Lord's. I would rather he be transformed and serve Christ—like Saul, who persecuted Christians but turned to Jesus and became Paul the apostle (Acts 9). Whatever God has planned for him, I pray for mercy on his soul.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🙏 From Anger to Peace</p>
                <Paragraph>
                  God gave me strength to get through the test. If you remember my testimony, I was very angry. I fought anyone who gave me attitude. I beat my wife and even threw my father through a wall. But in Christ, the old is gone and the new has come (2 Corinthians 5:17). <strong>If God got me through that test, He can get you through yours.</strong>
                </Paragraph>
              </InfoBox>

              <Paragraph>
                I believe God used that time to purify me from rage and anger. The enemy still tries to attack me with anger sometimes, but I give it to the Sanctifier, who purifies me more and more through tests of fire.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">📖 Test into Testimony</p>
                <Paragraph>
                  God also turned that test into a testimony. I wrote a book about it—<em>How God Moves</em>—about how God moved during that trial. The book ended up in the hands of a young girl whose mother was also murdered. She held unforgiveness toward the killer, was upset at God, and had stopped going to church. Someone from a church where I used to do outreach in Indianapolis gave her the book. She read it, and praise God, she returned to church.
                </Paragraph>
              </InfoBox>
              
              <WarningBox>
                <p className="font-semibold mb-2">💰 Lies About Following Christ</p>
                <Paragraph>
                  Some say, "I don't want to become a Christian because I'll be broke." That's a lie from Satan. If He does pull your wealth, it's either because you made money your god or because He wants you to show you will serve Him no matter what, like Job—and like Job, if you remain faithful, you'll be blessed double.
                </Paragraph>
                <Paragraph>
                  Others say, "I'll go through too much." God allows trials, but they are for our good. <strong>I'd rather go through hard things with God than without Him.</strong> God allowed me to go through a lot because otherwise I couldn't minister and connect with people in their pain. <strong>You can't give what you don't have.</strong> Get through the tests, and God will turn your test into a testimony—there's glory in the stories of God's people.
                </Paragraph>
              </WarningBox>
            </RedSection>

            <YellowSection>
              <h2 className="text-2xl font-bold mb-6 text-yellow-900">💎 THE SILVER FIRE - A MOTHER'S DREAM</h2>
              
              <Paragraph>
                I'll close with this: I recently learned my mother had a dream in August 2003. In it, she stood in a huge room full of stained glass with a bright light she couldn't look at shining through—she said the light looked like silver. She saw many people rushing to an open wooden doorway with no door, people from all nations. She rushed to go through too, but a woman at a desk stopped her: "Where are you going?" "Through the door," my mother said. The woman opened a huge book, searched the pages, and said, "Your name's not in the book."
              </Paragraph>

              <Paragraph>
                My mother asked, "Why does my name need to be in the book to go through the doorway?" The woman replied, <strong>"You have two years to turn Christian; then your name will be in this book and you can go through the doorway."</strong> Then my mother woke up.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🙏 Praise God, She Made Heaven</p>
                <Paragraph>
                  Two years later, in August 2005, my mother died. <strong>Praise God, she made heaven.</strong>
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Why mention the dream? She saw the light—God, a consuming fire. Why did the light look silver? I studied this. Our fires shine orange, blue, and purple because of impurities. But a fire without impurities shines bright white—like silver. <strong>Each test of fire you pass purifies you. The more purified you are, the more you shine like Jesus.</strong>
              </Paragraph>
              
              <InfoBox>
                <p className="font-semibold mb-2">🔥 Final Word from John Maxwell</p>
                <Paragraph>
                  <em>"Don't allow the fire of adversity to make you a skeptic. Allow it to purify you."</em>
                </Paragraph>
              </InfoBox>
            </YellowSection>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
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
                  Daniel fasted twenty-one days for understanding. The angel explained a spiritual conflict delayed the answer. Our battle is not against flesh and blood but against spiritual forces (Ephesians 6:12).
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
        );

      case 7:
        return (
          <div className="space-y-6">
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
        );

      case 8:
        return (
          <div className="space-y-6">
            {/* Chapter 8: Fellowship of Fire */}
            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">🔥 CHAPTER 8: FELLOWSHIP OF FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Acts 2:1–4</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "And when the day of Pentecost was fully come, they were all with one accord in one place. And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting. And there appeared unto them cloven tongues like as of fire, and it sat upon each of them. And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Fire came upon the disciples when they were in one accord. The Greek word for accord (<em>homothumadon</em>) helps define the kind of people we should fellowship with.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">💡 Greek Word: Homothumadon (One Accord)</p>
                <BulletList>
                  <BulletItem><strong>Thayer:</strong> with one mind, with one accord, with one passion</BulletItem>
                  <BulletItem><strong>Strong:</strong> unanimously; with entire agreement of minds</BulletItem>
                </BulletList>
              </InfoBox>

              <Paragraph>
                The people who want the fire of God should surround themselves with those of the same mind (Philippians 2:5)—<strong>people passionate about saving the lost, serving, and obeying Jesus no matter what.</strong>
              </Paragraph>

              <Paragraph>
                We cannot hang out with the double-minded; it will hinder your walk and fire. Paul illustrates the seriousness:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">1 Corinthians 5:9–13 (CEV)</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "In my other letter I told you not to have anything to do with immoral people. But I wasn't talking about the people of this world. You would have to leave this world to get away from everyone who is immoral or greedy or who cheats or worships idols. I was talking about your own people who are immoral or greedy or worship idols or curse others or get drunk or cheat people. Don't even eat with them! Why should I judge outsiders? Aren't we supposed to judge only church members? God judges everyone else. The Scriptures say, 'Chase away any of your own people who are evil.'"
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Like Paul, I am not saying avoid unbelievers altogether—we must reach them. I am saying <strong>do not fellowship with people who claim to be Christians yet live contrary to the gospel.</strong> Paul says don't even sit down and eat with them.
              </Paragraph>
            </RedSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">⚠️ WHY APPLY THIS?</h2>
              
              <InfoBox>
                <p className="font-semibold mb-2">📖 It's a Command</p>
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-blue-900">2 Corinthians 6:14</p>
                  <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Be ye not unequally yoked together with unbelievers: for what fellowship hath righteousness with unrighteousness? And what communion hath light with darkness?"
                    </p>
                  </blockquote>
                </div>
                <Paragraph>
                  The Greek word for believe (<em>pisteuō</em>) speaks of a true believer—one who respects, entrusts, and commits their life to God. Those who claim Christ but do not respect, entrust, or commit themselves to Him live like unbelievers. <strong>If you want the light (fire) of God to rest on your life, do not fellowship that way.</strong>
                </Paragraph>
              </InfoBox>

              <WarningBox>
                <p className="font-semibold mb-2">⚠️ Their Ways Can Rub Off</p>
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-red-900">1 Corinthians 15:33 (CEV)</p>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Don't fool yourselves. Bad friends will destroy you."
                    </p>
                  </blockquote>
                </div>
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-red-900">Proverbs 12:26</p>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "A righteous man is cautious in friendship, but the way of the wicked leads them astray."
                    </p>
                  </blockquote>
                </div>
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-red-900">Proverbs 22:24–25</p>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Don't make friends with people who have hot, violent tempers. You might learn their habits and not be able to change."
                    </p>
                  </blockquote>
                </div>
              </WarningBox>
            </BlueSection>

            <OrangeSection>
              <h2 className="text-2xl font-bold mb-6 text-orange-900">💔 PERSONAL TESTIMONY: WHEN SPIRITS RUB OFF</h2>
              
              <Paragraph>
                I once stopped by a family member's dinner with out-of-town guests. They were drinking, cursing, and claiming to be Christians (see 1 Corinthians 5:9–13). I stayed to witness, but the old drinking friend grew prideful and gave me attitude; I responded in the flesh and condemned him. <strong>His spirit rubbed off on me.</strong>
              </Paragraph>

              <Paragraph>
                While writing about this, I thought, "I need to call and apologize." Just then he called me—while trying to reach a drug dealer. I apologized, told him God had a plan, and that this "wrong number" was God's intervention. He said he was coming to church that night.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">👥 Go Two by Two</p>
                <Paragraph>
                  If I had gone with a brother, as Jesus modeled (Mark 6:7; Ecclesiastes 4:9–10), he could have corrected me in the moment.
                </Paragraph>
              </InfoBox>

              <WarningBox>
                <p className="font-semibold mb-2">🚨 You Could Fall Away</p>
                <Paragraph>
                  If you witness to unbelievers or rebellious "believers," take a solid, born-again believer with you. Jesus sent them two by two (Mark 6:7). I knew an usher once on fire for God. He began to hang with someone living in open rebellion. I warned him, but he insisted he'd be fine. <strong>Within two months he was no longer serving or on fire.</strong>
                </Paragraph>
              </WarningBox>

              <Paragraph>
                Please take the warning. Many have lost their fire because of who they chose to keep close.
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-orange-900">Luke 14:26–27</p>
                <blockquote className="border-l-4 border-orange-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "If any man cometh unto me, and hateth not his own father, and mother, and wife, and children, and brethren, and sisters, yea, and his own life also, he cannot be my disciple. Whosoever doth not bear his own cross, and come after me, cannot be my disciple."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">💡 Love Jesus More Than All</p>
                <Paragraph>
                  "Hate" here means to love less. We must put everyone and everything in second place to Him (Proverbs 18:24). Crucify the flesh and refuse the pull of relationships that dishonor God.
                </Paragraph>
              </InfoBox>
            </OrangeSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">🤝 TRUE FELLOWSHIP: WALKING IN THE LIGHT</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">1 John 1:6–7</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "If we say that we have fellowship with him and walk in the darkness, we lie, and do not the truth: but if we walk in the light, as he is in the light, we have fellowship one with another, and the blood of Jesus his Son cleanseth us from all sin."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">🤝 Greek Word: Koinonia (Fellowship)</p>
                <Paragraph>
                  The Greek for fellowship is <em>koinonia</em>—partnership, sharing, joint participation. In Luke 5:10, James, John, and Simon are called partners (<em>koinonoi</em>) in a fishing business. Then they left everything to partner with Jesus:
                </Paragraph>
              </InfoBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">Mark 1:16–20</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "As Jesus walked along the shore of Lake Galilee, he saw two fishermen, Simon and his brother Andrew, catching fish with a net. Jesus said to them, 'Come with me, and I will teach you to catch people.' At once they left their nets and went with him. He went a little farther on and saw two other brothers, James and John, the sons of Zebedee. They were in their boat getting their nets ready. As soon as Jesus saw them, he called them; they left their father Zebedee in the boat with the hired men and went with Jesus."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Peter, James, and John formed Jesus' inner circle and saw what others didn't.
              </Paragraph>
            </GreenSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">👧 JAIRUS' DAUGHTER: THREE KEYS</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Mark 5:35–42</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    Jesus allowed only Peter, James, John, and the girl's parents into the room. He put out the mourners (hired wailers who mocked Him). He took the girl by the hand and said, "Talitha koum" ("Little girl, get up!"), and she rose.
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">🔑 Three Keys from This Story</p>
                <BulletList>
                  <BulletItem><strong>Wise counsel:</strong> Jairus listened to Jesus over the messenger of death</BulletItem>
                  <BulletItem><strong>Good fellowship:</strong> Jesus kept the mockers out and brought faithful companions in</BulletItem>
                  <BulletItem><strong>The Word of God:</strong> Jesus' command brought life</BulletItem>
                </BulletList>
                <Paragraph>
                  Follow wise counsel and good fellowship, and you will see God resurrect "dead" areas of your life.
                </Paragraph>
              </InfoBox>
            </PurpleSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">⛰️ THE TRANSFIGURATION: FELLOWSHIP WITH FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">Matthew 17:1–8</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    Jesus took Peter, James, and John up a high mountain. His face shone like the sun; His clothes became dazzling white. Moses (the Law) and Elijah (the Prophets) appeared and talked with Him. A bright cloud overshadowed them and the Father said, "This is my beloved Son... listen to Him."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Moses' face once shone with glory (Exodus 34:29). Elijah called down fire (2 Kings 1:10), saw fire consume sacrifice (1 Kings 18), and departed in a chariot of fire (2 Kings 2:11). <strong>Jesus—the Son—is the source of natural and divine fire;</strong> the fullness of the Word spoken by Moses and the prophets is fulfilled in Him.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">✨ The Fellowship of Fire</p>
                <Paragraph>
                  Again: wise counsel (God), good fellowship (Moses, Elijah, Jesus), and obedience to the Word. This is the fellowship of fire.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Will you, like those three, leave lesser things and call those around you to seriousness about Jesus? If they refuse, will you still follow Him no matter what?
              </Paragraph>
            </BlueSection>

            <YellowSection>
              <h2 className="text-2xl font-bold mb-6 text-yellow-900">🚢 YOUR COMPANIONS DETERMINE YOUR DIRECTION</h2>
              
              <InfoBox>
                <p className="font-semibold mb-2">🔍 Break Down "Fellowship"</p>
                <Paragraph>
                  Break "fellowship" into "fellow" (companion) and "ship" (a vessel moving you from point A to point B). <strong>Your companions determine your direction.</strong> Choose fellowship that's on fire, and you'll see what others don't and move from where you are to where God wants you—on fire for Him.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Expect persecution from those you disconnect from:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-yellow-900">1 Peter 4:3–5</p>
                <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "You have spent enough time in the past doing what the heathen like to do. Your lives were spent in indecency, lust, drunkenness, orgies, drinking parties, and the disgusting worship of idols. And now the heathen are surprised when you do not join them in the same wild and reckless living, and so they insult you. But they will have to give an account of themselves to God, who is ready to judge the living and the dead."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Keep praying for those who insult you. Pray for unbelievers and for professing believers living against God's Word—that they would be consumed by His presence and live set on fire by God.
              </Paragraph>
            </YellowSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">🙏 WHERE TWO OR THREE AGREE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Matthew 18:19–20</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Again I say unto you, that if two of you shall agree on earth as touching anything that they shall ask, it shall be done for them of my Father who is in heaven. For where two or three are gathered together in my name, there am I in the midst of them."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                The Greek for "agree" here (<em>symphōneō</em>) parallels the idea of accord. When the disciples were in one accord, God sent fire and the Holy Spirit.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🔥 A Testimony: Ring of Fire</p>
                <Paragraph>
                  At a men's retreat in Houston, a friend took a photo of a group praying. In the photo, <strong>a ring of fire encircled the group.</strong> God allowed the camera to capture what was happening spiritually: the consuming fire was in their midst. Fellowship with the world brings demonic activity; fellowship in the light (fire) brings God's presence.
                </Paragraph>
              </InfoBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Joshua 24:15</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "As for me and my house, we will serve the Lord."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Make your stand, as Joshua did. <strong>Connect to people passionately serving Christ, and get ready for the fire to fall as it did on the Day of Pentecost.</strong>
              </Paragraph>
            </PurpleSection>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
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
        );

      case 10:
        return (
          <div className="space-y-6">
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
        );

      default:
        return <div>Chapter content for {chapterId} coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button onClick={() => setLocation("/textbook-catalog")} variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to catalog
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <img 
                src="/src/assets/sfgm-shield.png" 
                alt="SFGM Logo" 
                className="h-8 w-8"
              />
              <h1 className="text-xl font-bold text-white">Becoming a Fire Starter</h1>
              <Button onClick={downloadPDF} variant="ghost" className="text-white hover:bg-white/10">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Audio Player Card */}
        <Card className="bg-gradient-to-r from-orange-600 to-red-600 border-none shadow-2xl mb-8">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/fire-starter-cover.jpg"
                alt="Fire Starter Cover"
                className="w-24 h-auto rounded shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-1">
                  <span className="text-3xl align-text-top mr-1">🔥</span>
                  <span className="align-middle">Fire Starter</span>
                </h3>
                <p className="text-white/90 text-xl font-semibold">
                  <span className="align-middle">{currentChapterData.title}</span>
                  <span className="text-2xl align-text-top ml-1">🔥</span>
                </p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Button onClick={() => handleSkip(-15)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <SkipBack className="h-5 w-5" />
                  <span className="ml-1 text-xs">15</span>
                </Button>
                <Button onClick={handlePlayPause} size="lg" className="bg-white text-orange-600 hover:bg-white/90 rounded-full h-14 w-14">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button>
                <Button onClick={() => handleSkip(15)} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <span className="mr-1 text-xs">15</span>
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-2">
                <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={([v]) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = v;
                    setCurrentTime(v);
                  }
                }} className="cursor-pointer" />
                <div className="flex justify-between text-white/90 text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Volume2 className="h-4 w-4 text-white" />
                <Slider value={[volume]} max={1} step={0.1} onValueChange={([v]) => setVolume(v)} className="w-24" />
              </div>

              {/* Chapter Navigation Dropdown */}
              <div className="flex justify-center mt-6">
                <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
                  <SelectTrigger className="w-80 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select a chapter" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {chapters.map((chapter) => (
                      <SelectItem 
                        key={chapter.id} 
                        value={chapter.id.toString()}
                        className="text-white hover:bg-gray-700"
                      >
                        {chapter.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <audio
                ref={audioRef}
                preload="auto"
                onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Card */}
        <Card className="shadow-xl border-orange-200">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              {getChapterContent(currentChapter)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

