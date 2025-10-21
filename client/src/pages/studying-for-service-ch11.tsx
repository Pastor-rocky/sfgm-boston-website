import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh11() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Audio Player Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 border-none shadow-2xl">
          <CardContent className="p-6">
            {/* Cover and Title */}
            <div className="flex items-start gap-4 mb-6">
              <img 
                src="/studying-for-service-cover-new.jpg" 
                alt="Studying for Service" 
                className="w-24 h-auto rounded shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-1">
                  <span className="text-3xl align-text-top mr-1">📚</span>
                  <span className="align-middle">Studying for Service</span>
                </h3>
                <p className="text-white/90 text-xl font-semibold">
                  <span className="align-middle">Chapter 11: Being a Man of the Word</span>
                  <span className="text-2xl align-text-top ml-1">📖</span>
                </p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="space-y-4">
              {/* Main Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={() => handleSkip(-15)}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="h-5 w-5 mr-1" />
                  15s
                </Button>
                <Button
                  onClick={togglePlayPause}
                  size="lg"
                  className="h-16 w-16 rounded-full bg-white text-blue-600 hover:bg-white/90 shadow-lg"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                </Button>
                <Button
                  onClick={() => handleSkip(15)}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  15s
                  <SkipForward className="h-5 w-5 ml-1" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={(value) => {
                    const audio = audioRef.current;
                    if (audio) {
                      audio.currentTime = value[0];
                      setCurrentTime(value[0]);
                    }
                  }}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-sm text-white/80">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2 justify-center">
                <Volume2 className="h-4 w-4 text-white/70" />
                <Slider
                  value={[volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0] / 100)}
                  className="w-32"
                />
              </div>
            </div>

            <audio
              ref={audioRef}
              src="/studying-for-service-ch11.mp3"
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          </CardContent>
        </Card>

        {/* Content Card */}
        <Card className="bg-white shadow-xl mb-8">
          <CardContent className="p-8 prose max-w-none">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              📖 CHAPTER 11: BEING A MAN OF THE WORD
            </h2>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">⚠️ MY TESTIMONY: 18 YEARS VS. 7 YEARS</p>
              <p className="text-gray-800 mb-3">
                I can tell you that I've been a Christian for 18 years of my life but I've truly been a Christian for seven years. Why would I say that? Well, I was baptized and said the sinner's prayer many times but I was living a life that totally contradicted the Bible, like adultery, lust, drugs, drinking, gambling, scamming, stealing, lying, pride, anger, bitterness, and hate.
              </p>
              <p className="text-gray-800 font-semibold">
                If I died in that unrepentant sin I would have gone straight to hell (Galatians 5:19) even though I was in church every other Sunday and claiming Christianity—it didn't matter because God called us to be imitators not impersonators! And I was definitely not an imitator of Jesus.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              💝 THE DIVINE APPOINTMENT: 2004
            </h3>

            <p className="mb-6">
              But something happened in 2004 when my mother-in-law came in town for a visit. Really I believe it was by divine appointment because she told me something that day that forever changed my life. She said, "Anthony, you can go to church, you can pray and you can fast and you can sing in choir but if you're not in the Word of God it's all for no reason." It impacted me because she was a woman of God that showed it in action. I always said she preached Christianity with her mouth shut! Why do I say that? Because I used to cheat on her daughter and physically abuse her by beating her up and my mother-in-law never said not one negative word to me—she would only pray for me.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">📅 OCTOBER 28, 2004: MY FIRST BIBLE</p>
              <p className="text-gray-800 mb-2">
                So I listened to her that day and she gave me the address to a Bible bookstore next to my house. That day I bought my first Bible. It was on October 28, 2004. It was a New Living Translation Bible. I started reading the Bible that day. I started in the book of John and my life was never the same after that.
              </p>
            </div>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p className="font-semibold text-green-900">"This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success."</p>
              <p className="text-sm mt-2 text-green-700">— Joshua 1:8</p>
            </blockquote>

            <p className="mb-6">
              A couple months later God told me through prayer one day to read Joshua 1:8. I didn't know that Scripture really because I was still reading in the New Testament, so I went and checked the Scripture out. That day God also told me to start doing Bible studies. I received confirmation the following week at a church I used to visit other than my home church from Pastor Walter Johns. He was preaching on Joshua 1:8. Praise God I started the Bible studies in the basement of my house with about 15 guys. A year later I finished my first Bible cover to cover. It delivered me from all the previous sins I listed above—I was set free and born again (1 Peter 1:23). And in May, 2007, I became a pastor in Chicago, IL, with Soldiers for God Ministry. It went from 15 to 150 in three years.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">📊 MY BIBLE READING STATS</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-800">
                <li>New Testament: Over 10 times</li>
                <li>Entire Bible: 3 times completed</li>
                <li>Currently: Going through 4th time</li>
              </ul>
              <p className="text-gray-800 mt-3 font-semibold">
                I do this because the Word sets you free. The Word delivers you, the Word directs you, and the Word makes you born again!
              </p>
            </div>

            <p className="mb-6">
              My point for telling you my testimony is simply to share how the Word of God changed my life. And it has made me successful and prosperous in the ministry for the glory of God! And it can change yours, too. Since then until now I have been continually in the Word. So I'm constantly in the Word because remember what Joshua 1:8 said: "IF you continue in the Word day and night and obey THEN you'll be successful and prosperous."
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              📚 PAUL: A MAN OF THE WORD
            </h3>

            <p className="mb-6">
              Every successful and faithful man was a man of the Word of God. If you're not a man that reads the Word on a daily basis you will never receive the fullness of what God has for you and your ministry. Paul the apostle said to Timothy, "When you come, be sure to bring the coat I left with Carpus at Troas. Also bring my books, and especially my papers" (2 Timothy 4:13 NLT). This was a man that ministered as soon as he was converted and now he was about to die. What was he worried about? His papers, his books, the Word of God! We can never say we know enough of God's Word; we should read His Word not just to find something to preach on but to learn how to practice what we preach and to teach others to do the same. Also, so we can have a word always to give to God's people.
            </p>

            <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-800 my-6 bg-purple-50 p-4 rounded">
              <p className="font-semibold text-purple-900">"But sanctify the Lord God in your hearts, and always be ready to give a defense to everyone who asks you a reason for the hope that is in you, with meekness and fear."</p>
              <p className="text-sm mt-2 text-purple-700">— 1 Peter 3:15 NKJV</p>
            </blockquote>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              👑 KING DAVID'S HEART FOR THE WORD
            </h3>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded text-sm">
              <p className="mb-2">"How can a young man cleanse his way? By taking heed according to Your word. With my whole heart I have sought You; Oh, let me not wander from Your commandments! Your word I have hidden in my heart, that I might not sin against You. Blessed are You, O Lord! Teach me Your statutes. With my lips I have declared all the judgments of Your mouth. I have rejoiced in the way of Your testimonies, as much as in all riches. I will meditate on Your precepts, and contemplate Your ways. I will delight myself in Your statutes; I will not forget Your word. Deal bountifully with Your servant, That I may live and keep Your word. Open my eyes, that I may see wondrous things from Your law."</p>
              <p className="text-sm mt-2 text-blue-700">— Psalm 119:9–18 NKJV</p>
            </blockquote>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              🍞 DAILY BREAD: THE FRESH WORD
            </h3>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-2">🥖 MATTHEW 4:4</p>
              <p className="text-gray-800 mb-2">
                I'm also in my Word every day because I need my daily bread. Jesus said, "Man shall not live by bread and bread alone but by EVERY word that proceeds out of the mouth of God" (Matthew 4:4).
              </p>
              <p className="text-gray-800 font-semibold">
                Most importantly you need to receive a fresh word every day.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-teal-900 mt-8 mb-4">
              ✨ THE TABLE OF SHEWBREAD
            </h3>

            <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-800 my-6 bg-teal-50 p-4 rounded text-sm">
              <p className="mb-2">"And you shall take fine flour and bake twelve cakes with it. Two-tenths of an ephah shall be in each cake. You shall set them in two rows, six in a row, on the pure gold table before the LORD."</p>
              <p className="text-sm mt-2 text-teal-700">— Leviticus 24:5–6</p>
            </blockquote>

            <p className="mb-6">
              The table of shewbread was referred to as the table of the Presence. God's light forever shines on His people. The 12 baked cakes of bread spoke of God's people who were one with Him as the priests joined together for the fellowship of eating the bread and becoming one. Jesus referred to Himself as the bread of life and said if we eat this bread we will live forever. The very nature of bread is to provide physical sustenance and as you eat the bread and digest it, it becomes part of you. The very nature of the Word of God is to provide spiritual sustenance and as it is received it becomes part of our very nature. Just as the table always speaks of fellowship and communion, so the table of the shewbread points to Jesus who has made a covenant built on better promises and provided a blood covenant meal for us to partake that we might all be one in the Spirit.
            </p>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p className="font-semibold text-green-900">"And Jesus said to them, 'I am the bread of life. He who comes to Me shall never hunger, and he who believes in Me shall never thirst.'"</p>
              <p className="text-sm mt-2 text-green-700">— John 6:35</p>
            </blockquote>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">🙏 DAILY DEVOTION = FRESH BREAD</p>
              <p className="text-gray-800 mb-2">
                When we sit down and read God's Word every day we commune and fellowship with God and because of this we take on the nature of God, the more we do this the more we will take on the characteristics of God.
              </p>
              <p className="text-gray-800 font-semibold">
                Also the priests were told to replace the bread daily. Do you want a fresh word for God's people or do you want a stale one? Well then you need to understand the importance of daily devoting yourself to a disciplined devotion every day meeting God and spending time in His Word!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              🔥 AUGUST 2011: THE REVIVAL THAT CHANGED EVERYTHING
            </h3>

            <p className="mb-6">
              In August of 2011 there was a pastor's meeting for all Power Ministry ministers. It was held in Chicago at the church I pastor. In this meeting we discussed the importance of the Word of God and we soon discovered that a lot of the ministers were not reading their Bibles on a daily basis, they were only reading to get a message to preach. So we resolved to make a covenant to read the Bible on a daily basis. The way we planned to do this is at least three to four chapters a day. The reason why we planned it this way is because if you read three chapters a day and four on Sunday you will read the entire Bible in a year. It's been seven months since the meeting and the following testimonies are from a few of the pastors that were at the pastor's meeting.
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-blue-900 mb-2">🙏 PASTOR FRANK DEMITRO</p>
                <p className="text-gray-800 text-sm italic">
                  Overseer of Power Ministry, Pastor of Washington, D.C. church
                </p>
                <p className="text-gray-800 text-sm mt-2">
                  "In August of 2011 we had an amazing revival in Chicago hosted by Pastor Anthony and his staff. The main emphasis of the meeting was concentrated on 'the word'. We were amazed to find out that most of the ministers were not spending daily time in the word of God. I found that even I was only studying for sermons only and not on a daily basis. Thank God that revival turned my life upside down and since then I have been reading 3–4 chapters per day, I started in the book of Genesis and as we speak I am in the book of Psalms, if you are not on a daily devotional I recommend that you would begin one. If it changed my life it will change yours too."
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-bold text-green-900 mb-2">🙏 PASTOR COCO</p>
                <p className="text-gray-800 text-sm italic">
                  Power Ministries church of Los Angeles
                </p>
                <p className="text-gray-800 text-sm mt-2">
                  "The revival that we had changed my life. I began a daily devotional and since then my walk with God has not been the same. We feel the effects of it in the worship, in the preaching, and even in my daily walk."
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="font-bold text-orange-900 mb-2">🙏 PASTOR WALLY</p>
                <p className="text-gray-800 text-sm italic">
                  Church of Edison, New Jersey
                </p>
                <p className="text-gray-800 text-sm mt-2">
                  "The revival in Chicago was the best meeting that Power Ministries has ever had, it's changed the way I breathe, walk, and talk. Since I began my daily devotional, my life has been forever changed because of the Word."
                </p>
              </div>
            </div>

            <p className="mb-6 mt-6">
              There you go, you have heard what the men of the Bible say and some of the ministers of Power Ministry, including myself. If God has done it for us He can do it for you because He's the same yesterday, today, and forever! The whole purpose of this book is to get you excited for the holy book that's alive and active (Hebrews 4).
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              🎯 THE CHALLENGE: START YOUR DAILY DEVOTION
            </h3>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">📅 READING PLAN OPTIONS</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-800">
                <li><strong>Option 1:</strong> Read 3 chapters a day, 4 on Sunday = Finish Bible in 1 year</li>
                <li><strong>Option 2:</strong> Read 2 chapters a day = Finish Bible in less than 2 years</li>
              </ul>
              <p className="text-gray-800 mt-3 font-semibold">
                Believe me it's a great accomplishment, and after you are done, read it again, and again. We should never stop reading God's Word, the more seed (1 Peter 1:23) the more fruit (Galatians 5:22) in you and in your ministry.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">⚡ THE KEY FORMULA</p>
              <p className="text-gray-800 font-semibold text-lg text-center">
                INFORMATION → INSPIRATION → REVELATION
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-2xl font-bold mb-3">
                📖 REMEMBER 📖
              </p>
              <p className="text-lg mb-2">
                GET THE WORD INSIDE YOU AND BECOME A MAN OF THE WORD
              </p>
              <p className="text-lg mb-2">
                BECAUSE JESUS CAN'T WORK THROUGH YOU UNTIL YOU ALLOW HIM TO WORK IN YOU!
              </p>
              <p className="text-lg mb-2">
                THE BEST PREACHING WE WILL EVER DO IS LIVING A LIFE THAT EXEMPLIFIES THE WORD.
              </p>
              <p className="text-lg font-semibold mt-4">
                AS JOHN MAXWELL SAID: "WE PREACH WHO WE ARE, NOT WHAT WE KNOW."
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

