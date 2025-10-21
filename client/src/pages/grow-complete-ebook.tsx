import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";

export default function GrowCompleteEbook() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    { id: 1, title: "Introduction & Chapter 1: Give - Time, Talents, Treasure", audioUrl: "/grow-ch1.mp3" },
    { id: 2, title: "Chapter 2: Read - Feed Daily on God's Word", audioUrl: "/grow-ch2.mp3" },
    { id: 3, title: "Chapter 3: Obey - Listen and Apply God's Word", audioUrl: "/grow-ch3.mp3" },
    { id: 4, title: "Chapter 4: Win - Go, Witness, Make Disciples", audioUrl: "/grow-ch4.mp3" }
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
            <h2 className="text-3xl font-bold text-green-900 mb-6">
              🌱 G.R.O.W - INTRODUCTION
            </h2>

            <p className="mb-4">
              Jesus grows His Kingdom by growing His people. He gives leaders "to equip God's people to do His work and build up the church" so that together we mature into Christ and become "healthy and growing and full of love" (Ephesians 4:11–16).
            </p>

            <p className="mb-4">
              Growth is not accidental. It is a Spirit-led, Scripture-shaped journey that every believer can walk and every church can reproduce. Our pathway is simple and biblical: <strong>G.R.O.W.</strong>
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6 rounded">
              <h3 className="text-xl font-bold text-green-900 mb-4">🌱 The G.R.O.W Pathway</h3>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                  <p className="font-bold text-green-900 mb-1">💚 GIVE: Offer your time, talents, and treasure to build people.</p>
                  <p className="text-gray-700">Discipleship is scheduled love—showing up, serving, and investing.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                  <p className="font-bold text-blue-900 mb-1">📖 READ: Feed daily on God's Word.</p>
                  <p className="text-gray-700">Read, study, and meditate until you obey.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                  <p className="font-bold text-purple-900 mb-1">✅ OBEY: Listen to the Lord and apply His Word first in your own life.</p>
                  <p className="text-gray-700">Obedience is better than sacrifice.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                  <p className="font-bold text-orange-900 mb-1">🎯 WIN: Go, witness, and make disciples who make disciples.</p>
                  <p className="text-gray-700">Take the gospel to the world.</p>
                </div>
              </div>
            </div>

            <p className="mb-4 font-semibold text-green-800">
              As we grow ourselves in these four practices, we will be able to grow others—and God will grow His Kingdom through us. Open your Bible, open your schedule, and open your heart. Let's G.R.O.W.
            </p>

            <h2 className="text-3xl font-bold text-green-900 mt-8 mb-6">
              💚 CHAPTER 1: GIVE — TIME, TALENTS, TREASURE
            </h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">🎯 MISSION STATEMENT</p>
              <p className="text-gray-800 font-semibold">
                "Growing ourselves, to Grow others, to Grow the Kingdom"
              </p>
            </div>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p className="font-semibold text-green-900 mb-3">Ephesians 4:11-16</p>
              <p>
                Now these are the gifts Christ gave to the church: the apostles, the prophets, the evangelists, and the pastors and teachers. Their responsibility is to equip God's people to do his work and build up the church, the body of Christ. This will continue until we all come to such unity in our faith and knowledge of God's Son that we will be mature in the Lord, measuring up to the full and complete standard of Christ. Then we will no longer be immature like children. We won't be tossed and blown about by every wind of new teaching. We will not be influenced when people try to trick us with lies so clever they sound like the truth. Instead, we will speak the truth in love, growing in every way more and more like Christ, who is the head of his body, the church. He makes the whole body fit together perfectly. As each part does its own special work, it helps the other parts grow, so that the whole body is healthy and growing and full of love.
              </p>
            </blockquote>

            <p className="mb-4">
              We will learn how to grow the church and ourselves by looking at the word G.R.O.W. as an acronym.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-2"><strong className="text-blue-900">Give:</strong> time, talents and treasure.</p>
              <p className="text-gray-700 text-sm">This section will talk about making the best use of your time for other people through discipleship programs.</p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-2"><strong className="text-purple-900">Read:</strong> read, study and meditate.</p>
              <p className="text-gray-700 text-sm">This section will talk about setting aside daily devotions and sticking to them, also doing series based on daily readings so people will follow along.</p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-2"><strong className="text-orange-900">Obey:</strong> listen, learn and apply.</p>
              <p className="text-gray-700 text-sm">This section will talk about being obedient to The Word for ourselves first because obedience is better than sacrifice—a lesson King Saul learned the hard way.</p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-2"><strong className="text-red-900">Win souls:</strong> witnessing, evangelizing and winning souls.</p>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              💚 Give
            </h3>

            <p className="mb-4">
              In this section we will talk about the importance of discipleship and ways to help others do the same, by using our time, talents and treasure.
            </p>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              📚 Biblical Foundation for Giving
            </h3>

            <div className="space-y-4">
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Deuteronomy 15:10</strong> – "Give generously to him and do so without a grudging heart; then because of this the Lord your God will bless you in all your work and in everything you put your hand to."</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Proverbs 22:9</strong> – "He who is generous will be blessed, for he gives some of his food to the poor."</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Luke 6:38</strong> – "Give, and it will be given to you. They will pour into your lap a good measure, pressed down, shaken together, and running over. For by your standard of measure it will be measured to you in return."</p>
              </blockquote>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              ⏰ Give in Time, Talents and Treasure
            </h3>

            <p className="mb-4 font-semibold text-green-800">
              Making time for others with your talents (gifts).
            </p>

            <div className="space-y-4">
              <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800 bg-green-50 p-3 rounded">
                <p><strong>Colossians 4:5</strong> "Walk in wisdom toward outsiders, making the best use of the time."</p>
              </blockquote>

              <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800 bg-green-50 p-3 rounded">
                <p><strong>1 Peter 4:10 NIV</strong> "Each one should use whatever gift he has received to serve others, faithfully administering God's grace in its various forms."</p>
              </blockquote>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <h4 className="font-bold text-purple-900 mb-3">💡 Rick Warren Says It Best: Making the Most of Your Talents</h4>
              <p className="text-gray-800 mb-3">
                "If you think your talents are simply for you to make a lot of money, retire, and die, you've missed the point of your life. God gave you talents to benefit others, not yourself. And God gave other people talents that benefit you. We're all a part of the body of Christ, and each part matters. There are no insignificant people in the family of God.
              </p>
              <p className="text-gray-800 mb-3">
                You are shaped to serve God, and he is testing you to see how you are going to use the talents he gave you. Whether you are a musician or an accountant, a teacher or a cook, God gave you those abilities to serve others.
              </p>
              <p className="text-gray-800 mb-3">
                Today's verse says, "Each of you should use whatever gift he has received to serve others, faithfully administering God's grace in its various forms" (1 Peter 4:10 NIV).
              </p>
              <p className="text-gray-800 mb-3">
                You are a manager of the gifts God has given to you. They may be great or small in your eyes, but they matter to God. "Now it is required that those who have been given a trust must prove faithful" (1 Corinthians 4:2 NIV). When God made you, he made an investment in you, and he expects a return on that investment.
              </p>
              <p className="text-gray-800 mb-3">
                Are you using what He's given you for the benefit of others to make the world a better place? Or are you just using those talents to benefit yourself?
              </p>
              <p className="text-gray-800 mb-3">
                When God gives you a talent, he expects you to use it. It's like a muscle. If you use it, it will grow. If you don't, you'll lose it. If you have a talent but are afraid to use it, or if you get lazy and don't use it to benefit others, you're going to lose it. Like the parable of the ten talents in Luke 19, if you don't use what God has given you, he will take it away and give it to someone else who will.
              </p>
              <p className="text-gray-800 font-semibold">
                But if you use your talents wisely, God will give you more. If you use your time wisely, God will give you more time. If you use your energy wisely, God will give you more energy. If you use your influence wisely, God will increase your influence. God will bless your level of faithfulness."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⚠️ What Are We Doing in Our Churches That Will Produce Disciples?
            </h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2 text-lg">
                "A church without discipleship is a church without Christ."
              </p>
              <p className="text-gray-800">
                Jesus preached to thousands, left many to minister to one, but when the public ministry was done for the day, privately He discipled the twelve.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              💡 Some Ideas About Discipleship Programs
            </h3>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-bold text-blue-900 mb-2">📚 Leadership Classes</p>
                <p className="text-gray-800">Teaching the people to become leaders.</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="font-bold text-purple-900 mb-2">📖 Bible School</p>
                <p className="text-gray-800">Teaching the people to read and properly study the Bible (with test papers and homework assignments—this is key to get them in the Bible).</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <p className="font-bold text-pink-900 mb-2">👩 Women's Ministry</p>
                <p className="text-gray-800">This is very important because the Bible says the women are the weaker vessel (even if it's for prayer, worship, food and fellowship).</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <p className="font-bold text-orange-900 mb-2">🎮 Youth Programs</p>
                <p className="text-gray-800">Teenagers and young adults classes with teachings geared towards what they're struggling with (make sure it's a person that the youth will be comfortable with).</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="font-bold text-yellow-900 mb-2">👶 Kids Class</p>
                <p className="text-gray-800">This is very important to a ministry. Have fun with it and use teachings geared towards what they need. Find someone that has a heart for kids and don't be afraid to have food and fun on certain days. <strong>(THIS GETS THE KIDS TO BRING THEIR FAMILIES!)</strong></p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🤝 Some Ideas About Spending Time One on One or in Groups
            </h3>

            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="font-bold text-green-900 mb-2">📞 Phone Calls Daily</p>
                <p className="text-gray-800">Schedule at least three people you can call and just check up on, encourage, and pray with on a daily basis. Think about people that you know who are going through something and even people that have been faithful—you just want to say thank you and keep up the good work. (Change the people you call daily; even make a list.)</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-bold text-blue-900 mb-2">☕ Personal Meetings</p>
                <p className="text-gray-800">Schedule lunch or dinner meetings with people to just hang out and minister on a personal level where they will be able to open up to you and you can give them the Word they need for their personal situation. (Just you and them.)</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="font-bold text-purple-900 mb-2">🍽️ Fellowship Meetings</p>
                <p className="text-gray-800">Schedule times just to hang out with groups of people to show love and care to those you lead. It can be leaders, congregation and unbelievers. Make time to spend time with them and fellowship, then minister a short word with prayer at the end of the time together.</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">📝 Note</p>
              <p className="text-gray-800">
                It's always good to make a schedule the night before so you can have goals of who you want to call and/or visit.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              💰 Some Ideas About Giving Gifts (Treasure) as in Finances or Material Things
            </h3>

            <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-800 my-6 bg-red-50 p-4 rounded">
              <p className="font-semibold text-red-900 mb-3">James 2:1-7</p>
              <p className="mb-2">
                My brothers and sisters, believers in our glorious Lord Jesus Christ must not show favoritism. Suppose a man comes into your meeting wearing a gold ring and fine clothes, and a poor man in filthy old clothes also comes in. If you show special attention to the man wearing fine clothes and say, "Here's a good seat for you," but say to the poor man "You stand there" or "Sit on the floor by my feet," have you not discriminated among yourselves and become judges with evil thoughts?
              </p>
              <p>
                Listen, my dear brothers and sisters: Has not God chosen those who are poor in the eyes of the world to be rich in faith and to inherit the kingdom he promised those who love him? But you have dishonored the poor. Is it not the rich who are exploiting you? Are they not the ones who are dragging you into court? Are they not the ones who are blaspheming the noble name of him to whom you belong?
              </p>
            </blockquote>

            <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-800 my-6 bg-red-50 p-4 rounded">
              <p className="font-semibold text-red-900 mb-3">James 2:14-17</p>
              <p>
                What good is it, my brothers and sisters, if someone claims to have faith but has no deeds? Can such faith save them? Suppose a brother or a sister is without clothes and daily food. If one of you says to them, "Go in peace; keep warm and well fed," but does nothing about their physical needs, what good is it? In the same way, faith by itself, if it is not accompanied by action, is dead.
              </p>
            </blockquote>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <h4 className="font-bold text-green-900 mb-3">💚 Practical Ways to Give</h4>
              
              <div className="space-y-3">
                <p className="text-gray-800">
                  <strong>• Look for those who are in need.</strong> You can personally help and/or the church can help as well. (Don't always look for a love offering and blessing if you're not willing to do the same for others. What you sow you will reap.)
                </p>

                <p className="text-gray-800">
                  <strong>• Sow into ministries in need.</strong> It's always good to help other ministries. Paul the apostle was always getting the churches to help the other churches that were in need. (Explain Philippians 4:19—they were provided for because they were a giving church!)
                </p>

                <p className="text-gray-800">
                  <strong>• Be a tithing Church.</strong> A church that gives out will receive in.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">❓ Reflection Question</p>
              <p className="text-gray-800 font-semibold">
                Have you noticed a difference since your church has been tithing? YES OR NO.
              </p>
            </div>

            <p className="mb-4 font-semibold text-green-800 text-lg">
              This section has covered some ways to help you always be a giver of time, talents and treasure. There are so many other ways to do this; always look for ways your ministry can GROW by giving!
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              📖 CHAPTER 2: READ
            </h2>

            <p className="mb-4">
              In this section we will discuss the importance of a daily devotion, reading program and the importance of reading the Bible and leadership books for our personal growth to help others do the same.
            </p>

            <p className="mb-4">
              The following verse is what God told Joshua as he was about to take his leadership role to lead the Israelites into the promised land and receive what was promised. If we are to lead this generation into the promised land blessing and the promise of heaven, we should take the same advice!
            </p>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-900 mb-2">Joshua 1:7-8</p>
              <p>
                Be strong and very courageous. Be careful to obey all the instructions Moses gave you. Do not deviate from them, turning either to the right or to the left. Then you will be successful in everything you do. Study this Book of Instruction continually. Meditate on it day and night so you will be sure to obey everything written in it. Only then will you prosper and succeed in all you do.
              </p>
            </blockquote>

            <p className="mb-4">
              The following verses show what God told the kings of the Bible to do so that they may lead God's people and be good, humble leaders.
            </p>

            <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-800 my-6 bg-purple-50 p-4 rounded">
              <p className="font-semibold text-purple-900 mb-2">Deuteronomy 17:18-20</p>
              <p>
                When he sits on the throne as king, he must copy for himself this body of instruction on a scroll in the presence of the Levitical priests. He must always keep that copy with him and read it daily as long as he lives. That way he will learn to fear the LORD his God by obeying all the terms of these instructions and decrees. This regular reading will prevent him from becoming proud and acting as if he is above his fellow citizens. It will also prevent him from turning away from these commands in the smallest way. And it will ensure that he and his descendants will reign for many generations in Israel.
              </p>
            </blockquote>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🌱 Fed by God's Word
            </h3>

            <p className="mb-4">
              When we read the Bible, we're fed by God's Word and supplied for our Christian life. Jesus mentioned this in Matthew 4:4 when He said...
            </p>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p>"Man shall not live on bread alone, but on every word that proceeds out through the mouth of God."</p>
            </blockquote>

            <p className="mb-4">
              Other verses in the Bible also make it clear that God's Word is nourishment to us. For example...
            </p>

            <div className="space-y-4">
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>1 Peter 2:2</strong> says, "As newborn babes, long for the guileless milk of the word in order that by it you may grow unto salvation."</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p>And in the Old Testament, <strong>Jeremiah 15:16</strong> says... "Your words were found and I ate them, and Your word became to me the gladness and joy of my heart."</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p>The Word is also seed! <strong>1 Peter 1:23</strong> For you have been born again, not of perishable seed, but of imperishable seed through the living and enduring word of God.</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Hosea 10:12</strong> Sow for yourselves righteousness; reap steadfast love; break up your fallow (unsown) ground, for it is the time to seek the Lord, that he may come and rain righteousness upon you.</p>
              </blockquote>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="text-gray-800">
                With just those few verses we see the importance of reading the Bible. It's our fuel that keeps the fire, zeal, hunger and thirst for God fresh and the favor of God always active in you and the ministry.
              </p>
            </div>

            <p className="mb-4">
              Also reading devotional books like leadership books that teach biblical principles. This is good for you because it gives you a word and builds you up because you're constantly ministering to people but there's usually no one ministering to the minister!
            </p>

            <p className="mb-4">
              Another great reason reading biblical books are so good for you and the ministry is because it will give you a different perspective and fresh new way to minister and even do teachings based on what you have learned from the author.
            </p>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              💡 Some Devotional Ideas
            </h3>

            <div className="space-y-4">
              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-orange-900 mb-2">📖 Start a daily reading</h4>
                <p className="text-gray-800">
                  This should be the start of your day before you do anything—this is truly giving God your first fruits! Start from Genesis or Matthew and start reading at least a chapter a day and meditate on it. Read the Bible through; don't go back and forth—read the next chapter every day from wherever you decide to start. (No phones, no noise, no distractions during this time! This is your time to pray and read God's Word, so you can seek The Lord.)
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-900 mb-2">📝 Sermon Study time</h4>
                <p className="text-gray-800">
                  You should have one day set aside to put your sermon together for your preaching. (Usually it should be the day before the sermon or teaching, but through the week you should meditate on and even put small notations down on what you want to share.)
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-900 mb-2">📚 Biblical book reading</h4>
                <p className="text-gray-800">
                  Buy a book written by a sound doctrine teacher and set aside a little time at night before you sleep—at least 5 to 10 minutes. This is a blessing because you go to sleep with the word of God and ideas about the teaching you just read.
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-900 mb-2">📢 Challenge your congregation to read</h4>
                <p className="text-gray-800 mb-3">
                  Every sermon you should bring up how important the word of God is. When you have personal and group fellowships with your people, challenge them to start reading the Bible at least a chapter a day. Also follow up and challenge them to be consistent in reading.
                </p>
                <p className="text-gray-800">
                  Here's why this is so important... Jesus said you must be born again to see and enter the Kingdom of God! (John 3). The book of Peter as we read earlier teaches us how to become born again... 1 Peter 1:23 "For you have been born again, not of perishable seed, but of imperishable seed through the living and enduring word of God." <strong>GET THEM TO PLANT THE SEED THAT WILL BEAR THE FRUIT!</strong> (Galatians 5:21)
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="text-gray-800">
                <strong className="text-blue-900">Recommended Translation:</strong> New Living Translation Bible is a great version to recommend because it is easy to understand. (NLT)
              </p>
            </div>

            <p className="mb-4 font-semibold text-green-800 text-lg">
              This section has covered the importance of the word of God and how it can benefit you and the ones you lead!
            </p>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 p-6 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-900">
                Remember: Readers are Leaders! 📚
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">
              ✅ CHAPTER 3: OBEY
            </h2>

            <p className="mb-4">
              In this section we will cover the importance of Obeying God and teaching others to do the same.
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⚠️ The Consequence of Disobedience: King Saul's Fall
            </h3>

            <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-800 my-6 bg-red-50 p-4 rounded">
              <p className="font-semibold text-red-900 mb-3">1 Samuel 15:10-23</p>
              <p className="mb-2">
                Then the LORD said to Samuel, "I am sorry that I ever made Saul king, for he has not been loyal to me and has refused to obey my command." Samuel was so deeply moved when he heard this that he cried out to the LORD all night.
              </p>
              <p className="mb-2">
                Early the next morning Samuel went to find Saul. Someone told him, "Saul went to the town of Carmel to set up a monument to himself; then he went on to Gilgal."
              </p>
              <p className="mb-2">
                When Samuel finally found him, Saul greeted him cheerfully. "May the LORD bless you," he said. "I have carried out the LORD's command!"
              </p>
              <p className="mb-2">
                "Then what is all the bleating of sheep and goats and the lowing of cattle I hear?" Samuel demanded.
              </p>
              <p className="mb-2">
                "It's true that the army spared the best of the sheep, goats, and cattle," Saul admitted. "But they are going to sacrifice them to the LORD your God. We have destroyed everything else."
              </p>
              <p className="mb-2">
                Then Samuel said to Saul, "Stop! Listen to what the LORD told me last night!" "What did he tell you?" Saul asked.
              </p>
              <p className="mb-2">
                And Samuel told him, "Although you may think little of yourself, are you not the leader of the tribes of Israel? The LORD has anointed you king of Israel. And the LORD sent you on a mission and told you, 'Go and completely destroy the sinners, the Amalekites, until they are all dead.' Why haven't you obeyed the LORD? Why did you rush for the plunder and do what was evil in the LORD's sight?"
              </p>
              <p className="mb-2">
                "But I did obey the LORD," Saul insisted. "I carried out the mission he gave me. I brought back King Agag, but I destroyed everyone else. Then my troops brought in the best of the sheep, goats, cattle, and plunder to sacrifice to the LORD your God in Gilgal."
              </p>
              <p className="mb-3">
                But Samuel replied,
              </p>
              <p className="font-semibold text-red-900 ml-4">
                "What is more pleasing to the LORD:<br/>
                your burnt offerings and sacrifices<br/>
                or your obedience to his voice?<br/>
                Listen! Obedience is better than sacrifice,<br/>
                and submission is better than offering the fat of rams.<br/>
                Rebellion is as sinful as witchcraft,<br/>
                and stubbornness as bad as worshiping idols.<br/>
                So because you have rejected the command of the LORD,<br/>
                he has rejected you as king."
              </p>
            </blockquote>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-2">🔍 What is the bleating that's stopping your blessing?</p>
              <p className="text-gray-800 italic">
                "Then what is all the bleating of sheep and goats and the lowing of cattle I hear?" Samuel demanded.
              </p>
            </div>

            <h4 className="text-xl font-bold text-purple-900 mt-6 mb-3">
              Discussion Point: Saul's Disobedience and Love to Please the People
            </h4>

            <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800 bg-purple-50 p-3 rounded">
              <p><strong>1 Samuel 15:30-31</strong> - Saul said, "I did sin, but please honor me in front of the leaders of the army and the people of Israel. Come back with me, so I can worship the Lord your God." Samuel followed Saul back, and Saul worshiped the Lord.</p>
            </blockquote>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">🎯 "Growing ourselves, to Grow others, to Grow the Kingdom"</p>
              <p className="text-gray-800 font-semibold">
                Just because you worship God does not mean it's accepted, if you have disobedience in your life and care about what the people think more than God!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              🏛️ David's Mistake: The Wrong Way to Bring God's Presence
            </h3>

            <p className="mb-4">
              King David takes the Kingdom after Saul and one of the first things he does is bring the ark of the covenant back to Jerusalem. But something happens in the midst of what looked like one of the greatest revivals in Israel with 30,000 people in attendance and every instrument known at that time playing accompanied by singing and dancing. It all came to a stop because of disobedience which led to someone's death!
            </p>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-900 mb-3">2 Samuel 6:6-11</p>
              <p className="mb-2">
                But when they arrived at the threshing floor of Nacon, the oxen stumbled, and Uzzah reached out his hand and steadied the Ark of God. Then the LORD's anger was aroused against Uzzah, and God struck him dead because of this. So Uzzah died right there beside the Ark of God.
              </p>
              <p className="mb-2">
                David was angry because the LORD's anger had burst out against Uzzah. He named that place Perez-uzzah (which means "to burst out against Uzzah"), as it is still called today.
              </p>
              <p>
                David was now afraid of the LORD, and he asked, "How can I ever bring the Ark of the LORD back into my care?" So David decided not to move the Ark of the LORD into the City of David. Instead, he took it to the house of Obed-edom of Gath. The Ark of the LORD remained there in Obed-edom's house for three months, and the LORD blessed Obed-edom and his entire household.
              </p>
            </blockquote>

            <h4 className="text-xl font-bold text-red-900 mt-6 mb-3">
              Why did God allow this?
            </h4>

            <p className="mb-4">
              The Bible says that the ark of the covenant was supposed to be carried by the poles that were attached to the ark and then placed on the shoulders of the priest (Deuteronomy 10:8). No one was supposed to touch the ark of the covenant because it represents God's Glory and presence.
            </p>

            <p className="mb-4">
              Why did David carry the ark on a new cart? The Bible says the Philistines when they stole the ark, years before they placed the ark on a cart (1 Samuel 6:10). <strong className="text-red-900">David tried to bring God's presence in the city the world's way!</strong>
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-3">
                When we try to change our cities with God's Presence we have to do it God's way, not the world's way. Because it does not matter how small or how big the congregation and it's not how many servants you have and how great your choir is, if you are not obeying God and His word we will experience the same thing David did:
              </p>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                <li>Disappointment</li>
                <li>Anger</li>
                <li>Frustration</li>
                <li>Hurt</li>
              </ul>
              <p className="text-gray-800 mt-3">
                Also the people will die spiritually, celebration and rejoicing will cease and the blessing of God's presence will go to another house (church/Obed-edom).
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">🎯 "Growing ourselves, to Grow others, to Grow the Kingdom"</p>
              <p className="text-gray-800 font-semibold">
                Also remember this happened before King David's adulterous affair and before he murdered and fell into pride! Meaning small disobedience is still disobedience!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              ✨ David's Redemption: Learning from Mistakes
            </h3>

            <p className="mb-4">
              David went home, learned from his mistakes, found out through the Word what he did wrong and corrected it.
            </p>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p className="font-semibold text-green-900 mb-3">2 Samuel 6:12-15</p>
              <p className="mb-2">
                Then King David was told, "The LORD has blessed Obed-edom's household and everything he has because of the Ark of God." So David went there and brought the Ark of God from the house of Obed-edom to the City of David with a great celebration. After the men who were carrying the Ark of the LORD had gone six steps, David sacrificed a bull and a fattened calf. And David danced before the LORD with all his might, wearing a priestly garment. So David and all the people of Israel brought up the Ark of the LORD with shouts of joy and the blowing of rams' horns.
              </p>
            </blockquote>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="text-gray-800 font-semibold">
                That's why we are here today... To learn what's wrong, to correct the wrong and to go back and lead others to do the same. So together we will rejoice again with shouts of Joy!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              📚 Biblical Commands for Obedience
            </h3>

            <div className="space-y-4">
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Jeremiah 42:6</strong> - "Whether we like it or not, we will obey the LORD our God to whom we are sending you with our plea. For if we obey him, everything will turn out well for us."</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Jeremiah 7:23</strong> - "But this is what I commanded them, saying, 'Obey My voice, and I will be your God, and you will be My people; and you will walk in all the way which I command you, that it may be well with you.'"</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Exodus 23:21</strong> - "Be on your guard before him and obey his voice; do not be rebellious toward him, for he will not pardon your transgression, since My name is in him."</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>2 Corinthians 10:5</strong> - "We are destroying speculations and every lofty thing raised up against the knowledge of God, and we are taking every thought captive to the obedience of Christ."</p>
              </blockquote>
            </div>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              👥 Teaching Others to Obey
            </h3>

            <p className="mb-4">
              We are also taught to teach others to obey as well.
            </p>

            <div className="space-y-4">
              <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800 bg-purple-50 p-3 rounded">
                <p><strong>Romans 1:5</strong> - "Through whom we have received grace and apostleship to bring about the obedience of faith among all the Gentiles for His name's sake."</p>
              </blockquote>

              <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800 bg-purple-50 p-3 rounded">
                <p><strong>Joshua 1:7-8</strong> - "Be strong and very courageous. Be careful to obey all the instructions Moses gave you. Do not deviate from them, turning either to the right or to the left. Then you will be successful in everything you do. Study this Book of Instruction continually. Meditate on it day and night so you will be sure to obey everything written in it. Only then will you prosper and succeed in all you do."</p>
              </blockquote>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🎯 Practical Ideas to Help You Obey
            </h3>

            <div className="space-y-4">
              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-900 mb-2">1️⃣ Apply God's Word No Matter What</h4>
                <p className="text-gray-800">
                  Whatever situation you find yourself in whether it be trial, test or temptation do what the Word says no matter what! Think on the word. (If you don't know what it says in regards to your situation, find out and obey it!)
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-900 mb-2">2️⃣ Don't Set Yourself Up to Fail</h4>
                <p className="text-gray-800 mb-2">
                  If you know you're struggling in a certain area, don't allow yourself to be tempted by going there, watching it, listening to it, and hanging out with certain people and stay away from certain places.
                </p>
                <p className="text-gray-800">
                  Romans 13:14 says... "But put ye on the Lord Jesus Christ, and make not provision for the flesh, to fulfil the lusts thereof". <strong>IN SHORT DON'T SET YOURSELF UP TO FAIL!</strong>
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-900 mb-2">3️⃣ Read God's Word Daily</h4>
                <p className="text-gray-800">
                  I know we covered this in the last section but I can't stress it enough, because the more you read the more you're led to obey that which you have read!
                </p>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-orange-900 mb-2">4️⃣ Teach Obedience</h4>
                <p className="text-gray-800">
                  Don't get so caught up in preaching the people happy you forget to teach them to obey God in their daily living. You can do this by incorporating application points in your message. (Like if I was teaching people about obeying God I would give them the application points I just gave you! 1. Apply God's Word. 2. Don't set yourself up to fail. 3. Teach others to obey 4. Read the Word daily)
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              🔥 Conclusion
            </h3>

            <div className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-500 p-6 rounded-lg">
              <p className="text-lg font-bold text-red-900 text-center mb-2">
                REMEMBER: OBEDIENCE IS BETTER THAN SACRIFICE
              </p>
              <p className="text-gray-800 text-center">
                BUT TRULY YOU CAN'T HAVE OBEDIENCE IF YOU'RE NOT WILLING TO SACRIFICE OR CRUCIFY THE FLESH TO OBEY. BUT IT'S WELL WORTH THE BLESSING SO GET RID OF THE BLEATING!
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-orange-900 mb-6">
              🎯 CHAPTER 4: WIN
            </h2>

            <p className="mb-4">
              In this section we will discuss the importance of carrying out the church's mission—the great commission! It's time for the church to Win souls for the Kingdom of God.
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🌍 The Great Commission: Our Foundation
            </h3>

            <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-800 my-6 bg-orange-50 p-4 rounded">
              <p className="font-semibold text-orange-900 mb-2">Matthew 28:18-20</p>
              <p>
                Jesus came and told his disciples, "I have been given all authority in heaven and on earth. Therefore, go and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit. Teach these new disciples to obey all the commands I have given you. And be sure of this: I am with you always, even to the end of the age."
              </p>
            </blockquote>

            <p className="mb-4 text-lg font-semibold text-gray-800">
              We all know that verse by heart but are we doing it?
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⚠️ The Problem: Churches Growing Without Evangelizing
            </h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-3">
                I read an article about evangelism and it said the following statement...
              </p>
              <p className="text-gray-800 italic">
                "Some churches are growing. Others are adding members without significant numerical growth. But many in both categories are growing at the expense of other churches. Some may be reaching unchurched Christians. That's good, but that's not evangelism. We can fool ourselves into thinking we are evangelistic when we are simply recycling the saints."
              </p>
              <p className="text-gray-800 mt-3 font-semibold">
                We are seeing more than ever that the world is winning more people than the church. This is a problem!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              📊 Startling Statistics
            </h3>

            <p className="mb-4">
              I read some very interesting statistics on a website about missionaries. You can find a lot of these statistics at www.aboutmissions.org:
            </p>

            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-800">
                  <strong className="text-blue-900">Despite Christ's command to evangelize, 67% of all humans from AD 30 to the present day have never even heard the name of Jesus Christ.</strong> (Baxter 2007, 12)
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="text-gray-800">
                  <strong className="text-purple-900">91% of all Christian outreach/evangelism does not target non-Christians, but targets other Christians.</strong> (Baxter 2007, 12)
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="text-gray-800">
                  In the last 40 years, over 1 billion people have died who have never heard of Jesus, and around 30 million people this year will perish without hearing the message of salvation. (Baxter 2007, 12)
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <p className="text-gray-800">
                  <strong className="text-orange-900">70,000+ people die every day in the unreached world without Jesus.</strong> (Baxter 2007, 12)
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              ✨ The Solution: Following the Acts 2 Model
            </h3>

            <p className="mb-4">
              I believe if we do what we have discussed in the previous pages of this teaching of growth like leadership classes, challenging our people to read daily, discipleship programs, giving in time-talents and treasure, meeting with our people on a one-to-one and group fellowship meals and obeying above all, then God will add to the church His people and open up new doors of favor to go out and bring people to Christ and His church!
            </p>

            <p className="mb-4">
              Look what the Bible says in the book of Acts chapter two. You will see what we learned is what the disciples did! Then and only then God added to the church...
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2 text-center">🎯 "Growing ourselves, to Grow others, to Grow the Kingdom"</p>
            </div>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p className="font-semibold text-green-900 mb-3">Acts 2:42-47</p>
              <p>
                All the believers devoted themselves to the apostles' teaching, and to fellowship, and to sharing in meals (including the Lord's Supper), and to prayer.
                A deep sense of awe came over them all, and the apostles performed many miraculous signs and wonders. And all the believers met together in one place and shared everything they had. They sold their property and possessions and shared the money with those in need. They worshiped together at the Temple each day, met in homes for the Lord's Supper, and shared their meals with great joy and generosity—all the while praising God and enjoying the goodwill of all the people. And each day the Lord added to their fellowship those who were being saved.
              </p>
            </blockquote>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              🚶 It's Time to GO!
            </h3>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-2">
                That word "go" in Matthew 28, is a verb not a noun word. A verb is an action meaning. It's time we start acting on what God has said to do.
              </p>
              <p className="text-gray-800 font-semibold">
                Jesus' last word before He ascended into heaven should be the first thing we, the church should do!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⚠️ Faith Without Action Is Dead
            </h3>

            <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-800 my-6 bg-red-50 p-4 rounded">
              <p className="font-semibold text-red-900 mb-3">James 2:14-20 (NKJV)</p>
              <p>
                What does it profit, my brethren, if someone says he has faith but does not have works? Can faith save him? If a brother or sister is naked and destitute of daily food, and one of you says to them, "Depart in peace, be warmed and filled," but you do not give them the things which are needed for the body, what does it profit? Thus also faith by itself, if it does not have works, is dead.
                But someone will say, "You have faith, and I have works." Show me your faith without your works, and I will show you my faith by my works. You believe that there is one God. You do well. Even the demons believe—and tremble! But do you want to know, O foolish man, that faith without works is dead?
              </p>
            </blockquote>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              💡 What Can We Do to Put Faith in Action?
            </h3>

            <h4 className="text-xl font-bold text-green-900 mt-6 mb-4">
              Practical Ideas to Help You Win People Over to The Lord
            </h4>

            <div className="space-y-4">
              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-900 mb-2">1️⃣ Call 3 and Visit 2</h4>
                <p className="text-gray-800">
                  We can start with something I call the 3-2 rule. It's something God showed me to do every day: call three people that haven't been in church to check up on and share a word and prayer. Also every day visit at least two houses of people that haven't been in church or are not in church. I usually go to another house to check up and encourage those who have been faithful to just let them know I appreciate them.
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-900 mb-2">2️⃣ Outreach Programs</h4>
                <p className="text-gray-800">
                  Look for opportunities to impact the cities around you. Start by getting connected to people in the area that have influence over a few people and then start doing Bible studies with them and give them the vision of what you're planning. Then have them help you evangelize and bring people. Schedule a GO date you will start the outreach and then start advertising—give at least a month notice. Even if you don't establish a church in this city you would have at least ministered the gospel and it might add members to your church. Also you can even pray about doing outreaches further from your city, let The Spirit lead.
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-900 mb-2">3️⃣ Schedule Special Events</h4>
                <p className="text-gray-800">
                  You can put on a golf tournament, a baseball game, a BBQ in the park, Food and Fellowship in the church and put on biblical plays. These types of events attract non-believers, because really they're coming to have fun, but during the event you can show them love and after the event have a time of worship and Word. Then check up on them and invite them to church. Stay on them!
                </p>
              </div>

              <div className="bg-pink-50 p-5 rounded-lg border-l-4 border-pink-500">
                <h4 className="font-bold text-pink-900 mb-2">4️⃣ Make Sure the Church is a Church of Love!</h4>
                <p className="text-gray-800 mb-3">
                  One of the biggest complaints is the servants and people who represent the church do not show love and make people comfortable. Sometimes the people love the Pastor but hate the servants. And because of this people don't come to the church and most importantly they don't come to God! Look at this true story to illustrate the point further...
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-5 my-6 rounded">
              <h4 className="font-bold text-red-900 mb-3 text-lg">🙏 Gandhi's Story</h4>
              <p className="text-gray-800 mb-3">
                Gandhi says that one Sunday morning, Gandhi decided he would visit one of the Christian churches in Calcutta, India. Upon seeking entrance to the church sanctuary, he was stopped at the door by the ushers. He was told he was not welcome, nor would he be permitted to attend this particular church as it was for high-caste Indians and whites only. He was neither high caste nor white. Because of the rejection, the Mahatma turned his back on Christianity.
              </p>
              <p className="text-gray-800 mb-3">
                With this act, Gandhi rejected the Christian faith, never again to consider the claims of Christ. He was turned off by the sin of segregation practiced by the church. It was because of this experience that Gandhi later declared, <strong>"I'd be a Christian if it were not for the Christians."</strong>
              </p>
              <p className="text-gray-800 font-semibold">
                Because of this one usher's bad example of Christ this man Gandhi turned away from Christ and His church. Now millions of people are gonna go to hell following Gandhi's Buddhism beliefs!
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-2">
                Let's learn from this story and teach the servants to show love, shake hands and welcome everyone the same way because the Bible says...
              </p>
              <blockquote className="mt-3 italic text-gray-700">
                <p><strong>Matthew 18:6</strong> - "But if you cause one of these little ones who trusts in me to fall into sin, it would be better for you to have a large millstone tied around your neck and be drowned in the depths of the sea."</p>
              </blockquote>
            </div>

            <div className="space-y-4 mt-6">
              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-orange-900 mb-2">5️⃣ Change It Up</h4>
                <p className="text-gray-800">
                  I read somewhere, where it said that sheep never eat in the same place twice—that's why they are always grazing in the field. They have to eat in different places every time they eat. They're always looking for something new! The church can get very religious sometimes. That's why people leave the church cause they get bored. Let's be sensitive to The Spirit's leading and let's be shepherds that help the sheep eat by changing it up. Invite different ministers, have a Worship service with prayer and intercession, think of doing things outside the "box".
                </p>
              </div>

              <div className="bg-teal-50 p-5 rounded-lg border-l-4 border-teal-500">
                <h4 className="font-bold text-teal-900 mb-2">6️⃣ Schedule 3 Sunday Events</h4>
                <p className="text-gray-800 mb-2">
                  I was in a leadership class with Bryan Cutshall and he said that <strong>85% of people that come for Sunday service 3 times in a row end up becoming members of the church.</strong>
                </p>
                <p className="text-gray-800">
                  A great time to do this is over the Easter holiday. On Palm Sunday do a baptism, Easter do a Special baby dedication service then the Sunday after Easter do a food and fellowship service. Remember to announce these special services a month before to get people to invite their families. These types of services will always attract non-believers because they will come and support their families that are getting baptized and dedicated.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">🎯 "Growing ourselves, to Grow others, to Grow the Kingdom"</p>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🌟 Final Thoughts
            </h3>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 p-6 my-6 rounded-lg">
              <p className="text-gray-800 mb-3">
                The Great Commission is not a suggestion—it's a command. Jesus' final words before ascending to heaven should be our first priority as the church. We cannot afford to be comfortable while 70,000+ people die every day without hearing the name of Jesus.
              </p>
              <p className="text-gray-800 mb-3">
                The statistics are sobering: 91% of Christian outreach targets other Christians instead of the lost. We're recycling saints instead of rescuing souls. But there's hope! When we follow the Acts 2 model—devoting ourselves to teaching, fellowship, prayer, and genuine love—God adds to the church those who are being saved.
              </p>
              <p className="text-gray-800 mb-3">
                It's time to move from knowing the Great Commission to doing it. Faith without works is dead. Whether through the 3-2 rule, outreach programs, special events, or simply showing Christ's love to every person who walks through our doors, we must GO!
              </p>
              <p className="text-gray-800 mb-3">
                Remember Gandhi's tragic story—one usher's lack of love turned away a man whose influence affected millions. Let's ensure that our churches are known for love, not legalism; for welcoming, not walls; for reaching out, not turning away.
              </p>
              <p className="text-gray-800 font-semibold">
                The harvest is ready. The workers are few. But with Christ's authority backing us and His presence with us always, we can and must WIN souls for the Kingdom of God.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded text-center">
              <p className="font-bold text-yellow-900 text-xl">
                🎯 "Growing ourselves, to Grow others, to Grow the Kingdom"
              </p>
            </div>
          </div>
        );
      default:
        return <div>Chapter not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={() => setLocation("/course/4")}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </div>

        {/* Audio Player */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-none shadow-2xl">
            <CardContent className="p-4 sm:p-6">
              {/* Cover and Title */}
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/grow-cover.png" 
                  alt="G.R.O.W" 
                  className="w-20 h-auto rounded shadow-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
                    <span className="text-2xl sm:text-3xl align-text-top mr-1">🌱</span>
                    <span className="align-middle">G.R.O.W</span>
                  </h3>
                  <p className="text-white/90 text-base sm:text-xl font-semibold">
                    <span className="align-middle">{currentChapterData.title}</span>
                  </p>
                </div>
              </div>

              {/* Chapter Selector */}
              <div className="mb-4">
                <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
                  <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chapters.map((ch) => (
                      <SelectItem key={ch.id} value={ch.id.toString()}>
                        {ch.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Playback Controls */}
              <div className="space-y-3">
                {/* Main Controls */}
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={() => handleSkip(-15)}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <SkipBack className="h-4 w-4 mr-1" />
                    15s
                  </Button>
                  <Button
                    onClick={handlePlayPause}
                    size="lg"
                    className="h-14 w-14 rounded-full bg-white text-green-600 hover:bg-white/90 shadow-lg"
                  >
                    {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
                  </Button>
                  <Button
                    onClick={() => handleSkip(15)}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    15s
                    <SkipForward className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={0.1}
                    onValueChange={([value]) => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = value;
                        setCurrentTime(value);
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-white/80">
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
                    onValueChange={([value]) => setVolume(value / 100)}
                    className="w-24 sm:w-32"
                  />
                </div>
              </div>

              <audio
                ref={audioRef}
                src={currentChapterData.audioUrl}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <Card className="bg-white shadow-xl">
          <CardContent className="p-6 sm:p-8 prose max-w-none">
            {getChapterContent(currentChapter)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
