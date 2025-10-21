import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh7() {
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
                  <span className="align-middle">Chapter 7: Illustrated Sermons</span>
                  <span className="text-2xl align-text-top ml-1">🎨</span>
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
                  <SkipBack className="h-5 w-5" />
                  <span className="ml-1 text-xs">15</span>
                </Button>
                
                <Button
                  onClick={togglePlayPause}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-full h-14 w-14"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-1" />
                  )}
                </Button>
                
                <Button
                  onClick={() => handleSkip(15)}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <span className="mr-1 text-xs">15</span>
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={1}
                  onValueChange={([value]) => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = value;
                      setCurrentTime(value);
                    }
                  }}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-white/90 text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 justify-center">
                <Volume2 className="h-4 w-4 text-white" />
                <Slider
                  value={[volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={([value]) => setVolume(value / 100)}
                  className="w-24"
                />
              </div>
            </div>

            <audio
              ref={audioRef}
              src="/studying-for-service-ch7.mp3"
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
              🎨 CHAPTER 7: ILLUSTRATED SERMONS
            </h2>

            <p className="mb-4 text-lg">
              In this chapter I want to just encourage you to sometimes take time to try to connect literal illustrations into your sermons. I also want to give you some ideas.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">👁️ THE POWER OF VISUAL AIDS</p>
              <p className="text-gray-800 mb-2">
                Last chapter you read about me at the baseball game. When I ministered that Word I brought the ball I caught to church and as I was preaching I was holding the ball. You might not think it was a big deal, but it gives the people a visual and they get more connected with the sermon.
              </p>
              <p className="text-gray-800 font-semibold">
                It's basically "eye candy" to the crowd.
              </p>
            </div>

            <p className="mb-4">
              I found this statistic on the Internet: People remember 10% of what they read, 20% of what they hear, 30% of what they see, 50% of what they hear and see, 75% of what they discuss with others, and 90% of what they explain to others. So with that said, here are some ideas.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">📊 LEARNING RETENTION STATISTICS</p>
              <ul className="list-disc ml-6 space-y-1 text-gray-800">
                <li><strong>10%</strong> of what they read</li>
                <li><strong>20%</strong> of what they hear</li>
                <li><strong>30%</strong> of what they see</li>
                <li><strong>50%</strong> of what they hear and see</li>
                <li><strong>75%</strong> of what they discuss with others</li>
                <li><strong>90%</strong> of what they explain to others</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🏈 ILLUSTRATION 1: TEAM GOD (SUPER BOWL SUNDAY)
            </h3>

            <p className="mb-4">
              I recently did an illustration with a football jersey and a football on Superbowl Sunday. I explained that God's the owner of the team, Jesus is the coach, and the quarterback is the pastor, the Holy Spirit is the one that gives the ball to the quarterback and the ball is the Word. The congregation is the receiver and the frontline is the prayer warriors and the people that help the pastor (quarterback). The sermon title was "Team God".
            </p>

            <p className="mb-6">
              I told the people that the church is practice where we go through some plays in the play book (the Bible). The real game is on the outside where the opposing team, the enemy, tries to steal the ball and tries to makes us fumble it and fall.
            </p>

            <p className="mb-4 font-semibold text-green-800">
              I used the following scriptures.
            </p>

            <p className="mb-4">
              Hebrews 12:11–13: "No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it. Therefore, strengthen your feeble arms and weak knees."
            </p>

            <p className="mb-4">
              1 Corinthians 9:25–27: "All athletes are disciplined in their training. They do it to win a prize that will fade away, but we do it for an eternal prize. So I run with purpose in every step. I am not just shadowboxing. I discipline my body like an athlete, training it to do what it should. Otherwise, I fear that after preaching to others I myself might be disqualified." (NLT)
            </p>

            <p className="mb-4">
              1 Corinthians 6:19–20: "Do you not know that your body is a temple of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your body." (NIV)
            </p>

            <p className="mb-6">
              2 Timothy 2:5–7: "If anyone competes as an athlete, he does not receive the victor's crown unless he competes according to the rules. The hardworking farmer should be the first to receive a share of the crops. Reflect on what I am saying, for the Lord will give you insight into all this." (NIV)
            </p>

            <p className="mb-4 font-semibold text-green-800">
              In these Scriptures I gave a few points such as these below:
            </p>

            <p className="mb-4">
              If you want to be on team God and be successful you have to:
            </p>

            <p className="mb-2">1. Know the play book (the Bible).</p>
            <p className="mb-2">2. Get along with the team (show love, be in unity).</p>
            <p className="mb-2">3. Hold on to the ball no matter what (the word you received).</p>
            <p className="mb-6">4. If you've been hit get back up! (don't allow the enemy to keep you down)</p>

            <p className="mb-6">
              I explained how the touchdown is their blessing so do what you have to do to receive what God has for you. I also said how the Superbowl is when we get to heaven and the crowns are going to be passed out. Also, I threw five foam footballs to people in the congregation and explained hold on to the Word you need for your life whatever it is and don't allow the enemy to steal this word from you!
            </p>

            <p className="mb-6">
              Remember you don't have to wait for the Superbowl. But it is a really good way for the people to show up and get involved. The Sunday before the Superbowl I told everyone to come casual and put football jerseys on and I said we're going to be doing an illustration and we're going to pass the ball around.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-5 my-6 rounded">
              <p className="font-bold text-green-900 mb-3">🏆 The Setup</p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>Props:</strong> Football jersey and football
              </p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>The Team:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1 text-gray-800 text-sm">
                <li><strong>Owner:</strong> God</li>
                <li><strong>Coach:</strong> Jesus</li>
                <li><strong>Quarterback:</strong> The Pastor</li>
                <li><strong>The Ball:</strong> The Word</li>
                <li><strong>Holy Spirit:</strong> Gives the ball to the quarterback</li>
                <li><strong>Receivers:</strong> The Congregation</li>
                <li><strong>Frontline:</strong> Prayer warriors and helpers</li>
                <li><strong>Practice:</strong> Church (plays from the playbook/Bible)</li>
                <li><strong>Real Game:</strong> Outside world (opposing team = enemy)</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg my-6">
              <p className="font-bold text-blue-900 mb-2">📖 Key Scriptures:</p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-800">• Hebrews 12:11–13 - Discipline and training</p>
                <p className="text-gray-800">• 1 Corinthians 9:25–27 - Running with purpose</p>
                <p className="text-gray-800">• 1 Corinthians 6:19–20 - Body is a temple</p>
                <p className="text-gray-800">• 2 Timothy 2:5–7 - Competing by the rules</p>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎯 5 POINTS FOR SUCCESS:</p>
              <ol className="list-decimal ml-6 space-y-2 text-gray-800">
                <li>Know the play book (the Bible)</li>
                <li>Get along with the team (show love, be in unity)</li>
                <li>Hold on to the ball no matter what (the word you received)</li>
                <li>If you've been hit get back up! (don't allow the enemy to keep you down)</li>
                <li>The touchdown is your blessing—do what you have to do to receive it!</li>
              </ol>
            </div>

            <p className="mb-4 text-gray-700 italic text-sm">
              <strong>Bonus:</strong> I threw five foam footballs to people in the congregation and explained "hold on to the Word you need for your life!"
            </p>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              💪 ILLUSTRATION 2: GOD'S GYM
            </h3>

            <p className="mb-4">
              Another illustration I did was called "God's Gym". I brought exercise equipment in the church like a treadmill, workout bench, barbells and free weights. I was dressed in a hooded gym sweater and I explained how church is the gym and the pastor is the trainer and how he explains how to grow spiritual muscle. I also said how when we go on a diet and join a gym we get so into it at first and then it just dies down. This is what happens in church we get excited and we watch what we do but then the excitement dies down.
            </p>

            <p className="mb-4 font-semibold text-orange-800">
              I used scriptures like:
            </p>

            <p className="mb-4">
              1 Timothy 4:8: "For while bodily training is of some value, godliness is of value in every way, as it holds promise for the present life and also for the life to come."
            </p>

            <p className="mb-4">
              1 Corinthians 6:19–20: "Or do you not know that your body is a temple of the Holy Spirit within you, whom you have from God? You are not your own, for you were bought with a price. So glorify God in your body."
            </p>

            <p className="mb-4">
              3 John 1:2: "Beloved, I pray that all may go well with you and that you may be in good health, as it goes well with your soul."
            </p>

            <p className="mb-4">
              1 Corinthians 9:27: "But I discipline my body and keep it under control, lest after preaching to others I myself should be disqualified."
            </p>

            <p className="mb-4">
              1 Corinthians 9:24: "Do you not know that in a race all the runners run, but only one receives the prize? So run that you may obtain it."
            </p>

            <p className="mb-6">
              Philippians 4:13: "I can do all things through him who strengthens me."
            </p>

            <p className="mb-4">
              You can use the following points:
            </p>

            <p className="mb-2">1. Watch what you eat (stay away from sin it brings weight)</p>
            <p className="mb-2">2. Discipline your body and workout every day (make time to read the Bible and pray everyday)</p>
            <p className="mb-2">3. Work it out! (No matter if you messed up get back in it).</p>
            <p className="mb-2">4. Listen to the trainer (the pastor).</p>
            <p className="mb-2">5. Never stop going to the gym (the church).</p>
            <p className="mb-6">6. Remember you have a spotter when you can't take the weight (the Holy Spirit)</p>

            <p className="mb-6 text-sm text-gray-700">
              This sermon is on YouTube, type in Pastor Anthony Chicago God's Gym.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-5 my-6 rounded">
              <p className="font-bold text-orange-900 mb-3">🏋️ The Setup</p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>Props:</strong> Treadmill, workout bench, barbells, free weights, hooded gym sweater
              </p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>The Analogy:</strong>
              </p>
              <ul className="list-disc ml-6 space-y-1 text-gray-800 text-sm">
                <li><strong>The Gym:</strong> The Church</li>
                <li><strong>The Trainer:</strong> The Pastor</li>
                <li><strong>Goal:</strong> Grow spiritual muscle</li>
                <li><strong>Problem:</strong> Excitement dies down (like gym memberships!)</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg my-6">
              <p className="font-bold text-blue-900 mb-2">📖 Key Scriptures:</p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-800">• 1 Timothy 4:8 - Bodily training vs godliness</p>
                <p className="text-gray-800">• 1 Corinthians 6:19–20 - Body is a temple</p>
                <p className="text-gray-800">• 3 John 1:2 - Good health and soul prosperity</p>
                <p className="text-gray-800">• 1 Corinthians 9:27 - Discipline your body</p>
                <p className="text-gray-800">• 1 Corinthians 9:24 - Run to win the prize</p>
                <p className="text-gray-800">• Philippians 4:13 - Strength through Christ</p>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-2">🎯 6 WORKOUT POINTS:</p>
              <ol className="list-decimal ml-6 space-y-2 text-gray-800">
                <li>Watch what you eat (stay away from sin—it brings weight)</li>
                <li>Discipline your body and workout every day (read Bible and pray daily)</li>
                <li>Work it out! (If you messed up, get back in it)</li>
                <li>Listen to the trainer (the pastor)</li>
                <li>Never stop going to the gym (the church)</li>
                <li>Remember you have a spotter when you can't take the weight (the Holy Spirit)</li>
              </ol>
            </div>

            <p className="mb-4 text-gray-700 italic text-sm">
              <strong>📺 YouTube:</strong> Search "Pastor Anthony Chicago God's Gym"
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              😡 ILLUSTRATION 3: ANGER - CAIN & ABEL
            </h3>

            <p className="mb-4">
              Another illustration I did was based on Cain and Abel. How God told Cain he must rule his anger and rage before it rules him (Genesis 4). The sermon was based on not allowing anger to get the best of you because it's a demon on a mission to trip you up and hurt your witness and the people closest to you. For the illustration part I had one of my guys dress up in a black hooded costume that represented a demon and he had chains that he put around me and I began to explain how when anger comes we get real heavy and anxious and we want to blow up and when we blow up, scream, curse, hit something, or someone the heaviness and anxiousness goes away. I asked the question why does the heaviness and anxiousness go away when we never prayed and asked God to take it away? It's because the enemy came and burdened you and his mission was to make you blow up and when you do he leaves because he has fulfilled his mission.
            </p>

            <p className="mb-4 font-semibold text-red-800">
              You can use scriptures like this to make the point:
            </p>

            <p className="mb-4">
              Ephesians 6:12–13: "For we do not wrestle against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this age, against spiritual hosts of wickedness in the heavenly places. Therefore take up the whole armor of God, that you may be able to withstand in the evil day, and having done all, to stand."
            </p>

            <p className="mb-4">
              Ephesians 4:26–27, 31–32: "Be angry and do not sin; do not let the sun go down on your anger, and give no opportunity to the devil. Let all bitterness and wrath and anger and clamor and slander be put away from you, along with all malice. Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you."
            </p>

            <p className="mb-4">
              Matthew 5:22: "But I say to you that everyone who is angry with his brother will be liable to judgment; whoever insults his brother will be liable to the council; and whoever says, 'You fool!' will be liable to the hell of fire."
            </p>

            <p className="mb-4">
              Colossians 3:8: "But now you must put them all away: anger, wrath, malice, slander, and obscene talk from your mouth."
            </p>

            <p className="mb-6">
              James 1:19–20: "Know this, my beloved brothers: let every person be quick to hear, slow to speak, slow to anger; for the anger of man does not produce the righteousness of God."
            </p>

            <p className="mb-4">
              You can tell the people a few ways to prevent anger is:
            </p>

            <p className="mb-2">1. Pray that God takes it away.</p>
            <p className="mb-2">2. Don't set yourself up to fail, don't put yourself around things and people that make you upset.</p>
            <p className="mb-2">3. Read the Word of God because it's seed and it grows the fruit of the Spirit of God and the characteristic of the fruit is temperance, patience, long-suffering, love, self control (Gal 5:22).</p>
            <p className="mb-2">4. Listen to the Holy Spirit, don't do what Cain did.</p>
            <p className="mb-6">5. Remember when your face starts to change like Cain (Gen. 4) apply what you just read.</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-5 my-6 rounded">
              <p className="font-bold text-red-900 mb-3">⛓️ The Setup</p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>Props:</strong> Person dressed in black hooded costume (demon) with chains
              </p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>The Demonstration:</strong> The "demon" put chains around the preacher to show how anger burdens and binds us. When we blow up, scream, curse, or hit something, the heaviness goes away—because the demon fulfilled his mission and leaves!
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                Based on Genesis 4: God told Cain he must rule his anger before it rules him.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg my-6">
              <p className="font-bold text-blue-900 mb-2">📖 Key Scriptures:</p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-800">• Ephesians 6:12–13 - Wrestling against spiritual wickedness</p>
                <p className="text-gray-800">• Ephesians 4:26–27, 31–32 - Don't give opportunity to devil</p>
                <p className="text-gray-800">• Matthew 5:22 - Anger leads to judgment</p>
                <p className="text-gray-800">• Colossians 3:8 - Put away anger and wrath</p>
                <p className="text-gray-800">• James 1:19–20 - Slow to anger</p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">🛡️ 5 WAYS TO PREVENT ANGER:</p>
              <ol className="list-decimal ml-6 space-y-2 text-gray-800">
                <li>Pray that God takes it away</li>
                <li>Don't set yourself up to fail—avoid things and people that upset you</li>
                <li>Read the Word (it grows fruit of the Spirit: temperance, patience, love, self-control - Gal 5:22)</li>
                <li>Listen to the Holy Spirit, don't do what Cain did</li>
                <li>When your face starts to change like Cain (Gen. 4), apply what you just read</li>
              </ol>
            </div>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              🔥 ILLUSTRATION 4: THE GOLDEN IDOL (DANIEL 3)
            </h3>

            <p className="mb-4">
              Another illustration I did was based on Daniel chapter three, the story of Shadrach, Meshack, and Abed-nego. It was about not bowing down to your idols. I made a wooden box about 8ft long and 2ft wide all the way around and painted it gold based on the gold idol in Daniel three. We made the front and back of it with hinges so it could open and shut both ways. Then we pasted on the box Tarot cards, pictures of girls, cars, houses, fake money, fake drugs, and all kinds of things. We set it up on the stage. I preached about when we bow down to idols we are giving in to the enemy and we don't realize what's behind it. So after the message I had everyone close their eyes and pray with me; as I was praying I had the two guys dressed up as demons get in the box. After I was done praying I said, "Remember, if we bow down to these idols we can't see what's behind it is demonic spirits." Then I opened the box and the boys came out and walked from the pulpit to the back of the church looking at the people in an evil way to make the people realize the seriousness of their sin and it's consequences.
            </p>

            <p className="mb-4 font-semibold text-purple-800">
              Here are some scriptures to connect with:
            </p>

            <p className="mb-4">
              Idol definition: The worship of idols or an excessive attachment or devotion to anything.
            </p>

            <p className="mb-4">
              Colossians 3:5: "Mortify therefore your members which are upon the earth; fornication, uncleanness, inordinate affection, evil concupiscence, and covetousness, which is idolatry."
            </p>

            <p className="mb-4">
              1 Samuel 15:23: "For rebellion is as the sin of witchcraft, and stubbornness is as iniquity and idolatry. Because thou hast rejected the word of the LORD, he hath also rejected thee from being king."
            </p>

            <p className="mb-6">
              1 Corinthians 6:9–10: "Know ye not that the unrighteous shall not inherit the kingdom of God? Be not deceived: neither fornicators, nor idolaters, nor adulterers, nor effeminate, nor abusers of themselves with mankind, Nor thieves, nor covetous, nor drunkards, nor revilers, nor extortioners, shall inherit the kingdom of God."
            </p>

            <p className="mb-4">
              The points you can use are if we don't bow down to idols:
            </p>

            <p className="mb-2">1. The enemy that tries to come against us will be destroyed.</p>
            <p className="mb-2">2. The bonds that used to bind us will be gone and we will be free.</p>
            <p className="mb-2">3. People will see God in our lives.</p>
            <p className="mb-6">4. We will get promoted. This is all in Daniel three.</p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-5 my-6 rounded">
              <p className="font-bold text-purple-900 mb-3">📦 The Setup</p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>Props:</strong> 8ft x 2ft wooden box painted gold with hinges on front and back
              </p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>Decorations:</strong> Pasted Tarot cards, pictures of girls, cars, houses, fake money, fake drugs, and all kinds of idols on the box
              </p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>The Reveal:</strong> After preaching, had everyone close their eyes and pray. Two guys dressed as demons got inside the box. After prayer, opened the box and the demons walked through the church!
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                Message: When we bow to idols, we can't see what's behind them—demonic spirits!
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">📚 IDOL DEFINITION</p>
              <p className="text-gray-800">
                The worship of idols or an <strong>excessive attachment or devotion to anything</strong>.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg my-6">
              <p className="font-bold text-blue-900 mb-2">📖 Key Scriptures:</p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-800">• Colossians 3:5 - Covetousness is idolatry</p>
                <p className="text-gray-800">• 1 Samuel 15:23 - Rebellion and stubbornness</p>
                <p className="text-gray-800">• 1 Corinthians 6:9–10 - Idolaters won't inherit kingdom</p>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">✅ IF WE DON'T BOW TO IDOLS:</p>
              <ol className="list-decimal ml-6 space-y-2 text-gray-800">
                <li>The enemy that tries to come against us will be destroyed</li>
                <li>The bonds that used to bind us will be gone and we will be free</li>
                <li>People will see God in our lives</li>
                <li>We will get promoted (This is all in Daniel 3!)</li>
              </ol>
            </div>

            <h3 className="text-2xl font-bold text-pink-900 mt-8 mb-4">
              🍷 ILLUSTRATION 5: THE MIRACLE OF WINE (JOHN 2)
            </h3>

            <p className="mb-4">
              Another example that may be useful. I did an illustration based on the miracle of the wine in John 2. I got a burgundy-brownish colored pitcher, I poured three packs of grape Kool-Aid and three packs of cherry Kool-Aid into the pitcher. Mixed it around and let the dust settle. Then I got a larger clear pitcher and filled it up with water, then I got a wine glass and a large bowl.
            </p>

            <p className="mb-4">
              How I worked this illustration in was I preached how wine in the Bible represents joy, celebration, the blood of Jesus and salvation. I explained if we truly want that in our lives we have to do what the servants did in the story:
            </p>

            <p className="mb-2">1. Fill our lives with water (the Word)</p>
            <p className="mb-2">2. Walk by faith (as they was walking in to the wedding ceremony the water became wine)</p>
            <p className="mb-6">3. Don't wait and save the best for last when you can have all of what God has for you now! (the man in the story said "you've saved the best until now").</p>

            <p className="mb-6">
              After the sermon I took the pitcher with the Kool-Aid and showed the people that nothing was in it. Then I started pouring the water in the pitcher that had the Kool-Aid and as I was slowly pouring it in I was saying things like, "When you get religion out and relationship in through the Word of God and when you walk by faith not by sight and are faithful to Jesus, don't wait, receive the miracle of wine in your life now!" Then I took the wine glass and put it on top of the big bowl and then I took the pitcher that I just poured the water in which became a beautiful burgundy wine color because the water mixed it as I was pouring it in. I start pouring it in the wine glass and explained when you do those things then you will receive the miracle of wine in your life which represents joy, celebration, the blood of Jesus and salvation! Then your cup will overflow with those things. I was allowing the wine cup to overflow into the bowl.
            </p>

            <p className="mb-6 text-sm text-gray-700">
              Some of this sermon is on YouTube type in Pastor Anthony miracle gypsy.
            </p>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-5 my-6 rounded">
              <p className="font-bold text-pink-900 mb-3">🍇 The Setup</p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>Props:</strong> Burgundy pitcher with 3 packs grape Kool-Aid + 3 packs cherry Kool-Aid (let dust settle), large clear pitcher with water, wine glass, large bowl
              </p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>The Demonstration:</strong> Show empty burgundy pitcher. Pour water from clear pitcher into the Kool-Aid pitcher—it becomes "wine"! Pour into wine glass over bowl, letting it overflow!
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                Wine represents: joy, celebration, the blood of Jesus, and salvation!
              </p>
            </div>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-4 my-6 rounded">
              <p className="font-bold text-pink-900 mb-2">🎯 3 STEPS TO THE MIRACLE:</p>
              <ol className="list-decimal ml-6 space-y-2 text-gray-800">
                <li>Fill our lives with water (the Word)</li>
                <li>Walk by faith (as they walked in, water became wine)</li>
                <li>Don't wait and save the best for last—receive all God has for you NOW!</li>
              </ol>
            </div>

            <p className="mb-4 text-gray-700 italic text-sm">
              <strong>📺 YouTube:</strong> Search "Pastor Anthony miracle gypsy"
            </p>

            <h3 className="text-2xl font-bold text-teal-900 mt-8 mb-4">
              🎣 ILLUSTRATION 6: THE BAIT OF SATAN
            </h3>

            <p className="mb-6">
              One final example. I preached a message about how Satan is like a fisherman. The sermon was entitled The Bait of Satan. I dressed up like a fisherman with full rubber waders and a fishing hat with hooks, and completed the look with a fishing pole and tackle box. I explained how all fish don't go for the same bait just how all people don't go for the same sin. I explained that Satan knows the bait you fall for. He wants to get you hooked or addicted to that certain sin. Once he does, he has you. Just like a fish that is pulled out of the water, he wants to pull you out of the Word of God and godly fellowship to kill you spiritually. Once he has done this, just like a fish, you are either stuffed and mounted as a trophy or cooked in the frying pan and eaten. In the same way, this is what happens when people fall out of God's will. They become the enemy's trophy and if they don't get off the hook and repent they'll end up in hell.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-5 my-6 rounded">
              <p className="font-bold text-teal-900 mb-3">🐟 The Setup</p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>Props:</strong> Full rubber waders, fishing hat with hooks, fishing pole, tackle box
              </p>
              <p className="text-gray-800 mb-2 text-sm">
                <strong>The Message:</strong> All fish don't go for the same bait—just like all people don't go for the same sin. Satan knows the bait YOU fall for!
              </p>
              <p className="text-gray-800 mb-2 text-sm">
                Once hooked/addicted, Satan pulls you out of the Word and godly fellowship to kill you spiritually.
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                Like a fish, you're either stuffed and mounted as a trophy or cooked and eaten. This is what happens when people fall out of God's will—they become the enemy's trophy. If they don't get off the hook and repent, they'll end up in hell.
              </p>
            </div>

            <p className="mb-6">
              You might never use the illustrations I just shared but I encourage you to try to fit them in every couple of months in a sermon. People will always remember a good illustrated sermon.
            </p>

            <p className="mb-4 font-semibold text-orange-800 text-lg">
              ALWAYS REMEMBER:
            </p>

            <p className="mb-4">
              1. The illustration should be directly related to the main point you're trying to illustrate. It is never a good idea to force an illustration that doesn't fit well just to use the illustration, no matter how good it is.
            </p>

            <p className="mb-6">
              2. The most powerful illustrations are those that come from your own experience. Is there something in your own experiences that might work here? Keep in mind that people appreciate a pastor who is open and transparent with their own struggles and problems, but use wisdom and discernment about what to share and how much.
            </p>

            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-lg mt-8">
              <p className="text-2xl font-bold mb-3 text-center">
                ⚠️ ALWAYS REMEMBER
              </p>
              <div className="space-y-3">
                <div className="bg-white/20 p-3 rounded">
                  <p className="font-bold mb-1">1. STAY RELEVANT</p>
                  <p className="text-sm">The illustration should be directly related to the main point you're trying to illustrate. Never force an illustration that doesn't fit well just to use it, no matter how good it is.</p>
                </div>
                <div className="bg-white/20 p-3 rounded">
                  <p className="font-bold mb-1">2. USE YOUR EXPERIENCES</p>
                  <p className="text-sm">The most powerful illustrations are those that come from your own experience. People appreciate a pastor who is open and transparent with their own struggles and problems, but use wisdom and discernment about what to share and how much.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

