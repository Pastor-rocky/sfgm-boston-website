import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function GrowCh1() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Audio Player Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 border-none shadow-2xl">
          <CardContent className="p-6">
            {/* Cover and Title */}
            <div className="flex items-start gap-4 mb-6">
              <img 
                src="/grow-cover.png" 
                alt="G.R.O.W" 
                className="w-24 h-auto rounded shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-1">
                  <span className="text-3xl align-text-top mr-1">🌱</span>
                  <span className="align-middle">G.R.O.W</span>
                </h3>
                <p className="text-white/90 text-xl font-semibold">
                  <span className="align-middle">Introduction & Chapter 1: Give - Time, Talents, Treasure</span>
                  <span className="text-2xl align-text-top ml-1">💚</span>
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
                  className="h-16 w-16 rounded-full bg-white text-green-600 hover:bg-white/90 shadow-lg"
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
                  onValueChange={([value]) => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = value;
                      setCurrentTime(value);
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
                  onValueChange={([value]) => setVolume(value / 100)}
                  className="w-32"
                />
              </div>
            </div>

            <audio
              ref={audioRef}
              src="/grow-ch1.mp3"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
