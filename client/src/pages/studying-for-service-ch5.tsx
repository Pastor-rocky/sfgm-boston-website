import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh5() {
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
                  <span className="align-middle">Chapter 5: The Original Language</span>
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
              src="/studying-for-service-ch5.mp3"
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
              📖 CHAPTER 5: THE ORIGINAL LANGUAGE
            </h2>

            <p className="mb-4 text-lg">
              In this chapter I want to talk about the power behind the original language. We have seen the importance of names and cities, but in this chapter I want to look at common words and objects in the Bible we pass up, not realizing that they could add so much more application to the sermon. Let's look at some famous verses and some stories in the Bible and learn how to connect them to a sermon.
            </p>

            <p className="mb-4">
              Jesus said something in Luke chapter 14 that if you didn't study the word "hate" in this text you would have totally ministered this verse wrong. Let's read: "If anyone comes to Me and does not hate his father and mother, wife and children, brothers and sisters, yes, and his own life also, he cannot be My disciple" (Luke 14:26). The word hate in the original means to hate, to detest and to love less.
            </p>

            <p className="mb-4">
              You can say something like this in reference to this verse: "If you do not hate and detest the things that your family and friends do in the world you cannot serve God. Also, the love you have to have for Jesus should be greater than the love you have for your own family and friends. It's about loving God more than anything else and anyone else in this world and when you can say that, you are truly a follower and witness of Jesus."
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ❤️ HATE - LUKE 14:26
            </h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">📚 GREEK WORD: "HATE"</p>
              <p className="text-gray-800">
                <strong>Meaning:</strong> To hate, to detest, and <strong>to love less</strong>
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 HOW TO PREACH IT:</p>
              <p className="text-gray-800 italic">
                "If you do not hate and detest the things that your family and friends do in the world you cannot serve God. Also, the love you have to have for Jesus should be greater than the love you have for your own family and friends. It's about loving God more than anything else and anyone else in this world and when you can say that, you are truly a follower and witness of Jesus."
              </p>
            </div>

            <p className="mb-4">
              Jesus said we are to be witnesses for Him in this world; this is our mission. In fact, it's the Great Commission. In Acts 1:8 Jesus said, "But you shall receive power when the Holy Spirit has come upon you; and you shall be witnesses to Me in Jerusalem, and in all Judea and Samaria, and to the end of the earth." The Greek word for witness is mär-tüs: a witness, those who after his example have proved the strength and genuineness of their faith in Christ by undergoing a violent death. It's where we get our English word for martyr, meaning a person ready to die for their beliefs. So in essence when you called yourself a witness for Jesus, you were saying you were ready to be locked up, whipped, mocked, persecuted, stoned and killed for Jesus! Also, the word "power" in Acts 1:8 is where we get our English word dynamite.
            </p>

            <p className="mb-4">
              You can connect it and say something like this: "The early Christians were ready to go through intense persecution and even death for Jesus. They would rather die than betray and denounce their belief in Him. The question is, are you ready to give up the things that are in your lives that are showing you betray Him in your actions and are you ready to not give up on God no matter the trial, tribulation, and test? Because you might not have to die physically for Jesus but you definitely have to die to the things of the world. If you're ready to apply this then you'll be ready to be an effective witness for Jesus that demonstrates the explosive, atmosphere changing, mountain moving power of the Holy Spirit."
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              ⚡ WITNESS - ACTS 1:8
            </h3>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-3">📚 GREEK WORD: "WITNESS"</p>
              <p className="text-gray-800 mb-2">
                <strong>Greek:</strong> mär-tüs (μάρτυς)
              </p>
              <p className="text-gray-800 mb-2">
                <strong>Meaning:</strong> A witness, those who after his example have proved the strength and genuineness of their faith in Christ by undergoing a violent death.
              </p>
              <p className="text-gray-800 font-semibold">
                It's where we get our English word for <strong>martyr</strong>, meaning a person ready to die for their beliefs.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-2">💥 THE WORD "POWER"</p>
              <p className="text-gray-800">
                The word "power" in Acts 1:8 is where we get our English word <strong>dynamite</strong>.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 HOW TO APPLY IT:</p>
              <p className="text-gray-800 italic">
                "The early Christians were ready to go through intense persecution and even death for Jesus. They would rather die than betray and denounce their belief in Him. The question is, are you ready to give up the things that are in your lives that are showing you betray Him in your actions and are you ready to not give up on God no matter the trial, tribulation, and test? Because you might not have to die physically for Jesus but you definitely have to die to the things of the world. If you're ready to apply this then you'll be ready to be an effective witness for Jesus that demonstrates the explosive, atmosphere changing, mountain moving power of the Holy Spirit."
              </p>
            </div>

            <p className="mb-4">
              John 3:16; millions of people know this verse of Scripture by heart. But I guarantee only a few have studied it. Let's read: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life" (John 3:16 NKJV). I've seen people do weeks of teaching on this one verse; as a matter of fact a man by the name of Max Lucado wrote an entire book about this famous verse. I encourage you to study this verse more than you ever have. What I want to show you in this verse is the Greek word for "believe", and I want you to see the fullness of this word we so easily pass up.
            </p>

            <p className="mb-4">
              The Bible says even the demons believe there's a God and they tremble at His name (James 2:19). We know they will not have a chance to enter the Kingdom of God, so there has to be something more to this text, and that is we can't just say we believe, we actually have to apply what we say we believe. I'll show you what I mean. Let's look at the original Greek word for the word "believes".
            </p>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              💙 BELIEVE - JOHN 3:16
            </h3>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-3">📚 GREEK WORD: "BELIEVES"</p>
              <p className="text-gray-800 mb-2">
                <strong>Greek:</strong> pisteuō (πιστεύω)
              </p>
              <p className="text-gray-800 mb-2">
                <strong>Pronunciation:</strong> pē-styü'-ō
              </p>
              <p className="text-gray-800">
                <strong>Meaning:</strong> believe, commit unto, commit to (one's) trust, be committed unto, be put in trust with, be commit to one's trust, believer. Also it's another word for <strong>respect</strong>.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg my-6">
              <p className="font-bold text-green-900 mb-3">✅ WHAT IT MEANS:</p>
              <ol className="list-decimal ml-6 space-y-3 text-gray-800">
                <li className="font-semibold">If you stay <strong>committed</strong> to God without giving up you will be saved.</li>
                <li className="font-semibold">If you <strong>entrust</strong> God with your life and allow Him to have His way in your life you will be saved.</li>
                <li className="font-semibold">If you <strong>respect</strong> the things of God and respect Him in word, thought, action and deed you will be saved.</li>
              </ol>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">📖 ALSO IN ROMANS 10:9</p>
              <blockquote className="text-gray-800 italic">
                "that if you confess with your mouth the Lord Jesus and believe in your heart that God has raised Him from the dead, you will be saved."
              </blockquote>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 APPLICATION:</p>
              <p className="text-gray-800 italic">
                "Now it's one thing to confess your belief in God but it's an entirely different thing to believe in your heart that Jesus is Lord. Because it's not about just saying it, it's about showing your commitment, trust, and respect towards God in your heart, because God looks at the heart!"
              </p>
            </div>

            <p className="mb-4">
              Let's look at a story about the lame man at the pool of Bethesda. I want to show you something that I've passed over so many times and when I finally checked it up it added to the sermon of the lame man at the pool of Bethesda. A guy from our church heard the preaching and said to me, "It was the greatest anointed preaching I ever heard you preach."
            </p>

            <p className="mb-4 font-semibold text-teal-800">
              Let's look at the story:
            </p>

            <p className="mb-4">
              "After this there was a feast of the Jews, and Jesus went up to Jerusalem. Now there is in Jerusalem by the Sheep Gate a pool, which is called in Hebrew, Bethesda, having five porches. In these lay a great multitude of sick people, blind, lame, paralyzed, waiting for the moving of the water. For an angel went down at a certain time into the pool and stirred up the water; then whoever stepped in first, after the stirring of the water, was made well of whatever disease he had. Now a certain man was there who had an infirmity thirty-eight years. When Jesus saw him lying there, and knew that he already had been in that condition a long time, He said to him, Do you want to be made whole? The sick man answered Him, Sir, I have no man to put me into the pool when the water is stirred up; but while I am coming, another steps down before me. Jesus said to him, Rise, take up your bed and walk. And immediately the man was made well, took up his bed, and walked" (John 5:1–9 NKJV).
            </p>

            <p className="mb-4">
              Before I tell you the main Greek word let me give you a few good nuggets. The number 38 represents slavery. There were five porches, the number five represents grace. This is confirmed by the name Bethesda. The word Bethesda means "house of mercy". Also, when I was in Israel I went to this pool. There is no more water in this pool, but thank God Jesus is the living water and He can stir up the blessing anytime in us!
            </p>

            <p className="mb-4">
              Jesus asked the man, "Do you want to be made whole?", representing your entire life made right—not just some of it but the whole package. The man responds to the question with complaints and excuses. Jesus didn't ask him why are you not healed but do you want to be healed or made whole. Sometimes we can't hear God right because we are negative and bitter about our situations.
            </p>

            <p className="mb-4 font-semibold text-gray-800">
              Now let's look at the original word for "infirmity". The Greek word infirmity is where we get our English word anesthesia. Anesthesia does a few things: one, it numbs the senses; two, it makes you forget; three, it covers the pain; and four, it puts you to sleep.
            </p>

            <h3 className="text-2xl font-bold text-teal-900 mt-8 mb-4">
              🏊 THE LAME MAN AT THE POOL OF BETHESDA
            </h3>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="font-bold text-purple-900">🔢 38 YEARS</p>
                <p className="text-sm text-gray-700">Represents <strong>slavery</strong></p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="font-bold text-green-900">5️⃣ FIVE PORCHES</p>
                <p className="text-sm text-gray-700">Number five represents <strong>grace</strong></p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-bold text-blue-900">🏛️ BETHESDA</p>
                <p className="text-sm text-gray-700">Means "house of mercy"</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                <p className="font-bold text-teal-900">💧 THE POOL</p>
                <p className="text-sm text-gray-700">No more water, but Jesus is the <strong>living water</strong>!</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">💡 KEY INSIGHT</p>
              <p className="text-gray-800">
                Jesus asked the man, "Do you want to be made <strong>whole</strong>?", representing your entire life made right—not just some of it but the whole package. The man responds to the question with complaints and excuses. Jesus didn't ask him why are you not healed but do you want to be healed or made whole. Sometimes we can't hear God right because we are negative and bitter about our situations.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-3">📚 GREEK WORD: "INFIRMITY"</p>
              <p className="text-gray-800 mb-2">
                The Greek word infirmity is where we get our English word <strong>anesthesia</strong>.
              </p>
              <p className="text-gray-800 font-semibold">Anesthesia does a few things:</p>
              <ol className="list-decimal ml-6 mt-2 space-y-1 text-gray-800">
                <li>It <strong>numbs the senses</strong></li>
                <li>It makes you <strong>forget</strong></li>
                <li>It <strong>covers the pain</strong></li>
                <li>It <strong>puts you to sleep</strong></li>
              </ol>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 HOW TO PREACH IT:</p>
              <p className="text-gray-800 italic">
                "The enemy wants you to forget the blessings and the Word of God and he wants you to be numb to the convicting power of the Holy Spirit. Because of this we try to cover the pain with the things of the world, but we don't realize we are sleeping and dead spiritually. This is why we are in slavery to the things of the devil. But God wants to show you grace, so if you're tired of making excuses and blaming people, rise up and wake up, oh sleeper, and let the light of God shine upon you! Pick up your mat which represents your problem, because the problem has been controlling you long enough—it's time for you to control your problem! This man did and the prodigal son came to his senses and he rose up and came back to God. It's time for you to do the same."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              🔥 DILIGENTLY - HEBREWS 11:6
            </h3>

            <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-800 my-6 bg-orange-50 p-4 rounded">
              <p className="font-semibold text-orange-900">"But without faith it is impossible to please Him, for he who comes to God must believe that He is, and that He is a rewarder of those who diligently seek Him"</p>
              <p className="text-sm mt-2 text-orange-700">— Hebrews 11:6</p>
            </blockquote>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-3">📚 GREEK WORD: "DILIGENTLY"</p>
              <p className="text-gray-800 mb-2">
                <strong>Pronunciation:</strong> ek-zā-te'-ō
              </p>
              <p className="text-gray-800 font-semibold mb-2">Outline of Biblical Usage:</p>
              <ol className="list-decimal ml-6 space-y-1 text-gray-800">
                <li>To seek out, search for</li>
                <li>To seek out, i.e. <strong>investigate, scrutinize</strong></li>
                <li>To seek out for one's self, <strong>beg, crave</strong></li>
                <li>To <strong>demand back, require</strong></li>
              </ol>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-3">🎤 FOUR POINT SERMON:</p>
              <p className="text-gray-800 mb-3">If we truly are diligently seeking after God we will do the following things:</p>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                  <p className="font-bold text-blue-900">1. INVESTIGATE</p>
                  <p className="text-sm text-gray-700">When we have a problem in our lives we will not handle it our way, we will investigate what the Bible has to say and when we find the answer to our problem in the Bible we will apply the Word of God to that problem.</p>
                </div>
                
                <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                  <p className="font-bold text-purple-900">2. SEEK</p>
                  <p className="text-sm text-gray-700">When we have questions or if we are in doubt and in need of direction we will seek God through prayer, the Word and Godly council from the people of God. Then when we receive it we will apply it.</p>
                </div>
                
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">3. CRAVE</p>
                  <p className="text-sm text-gray-700">When a person is hungry for food they usually crave a certain food. If you truly are hungry for the things of God you will crave His Word, His presence, and His approval.</p>
                </div>
                
                <div className="bg-white p-3 rounded border-l-4 border-red-500">
                  <p className="font-bold text-red-900">4. DEMAND IT BACK</p>
                  <p className="text-sm text-gray-700">When the enemy comes in and we allow him to take something like our joy, or our contentment, we will not just stand there and have a pity party, we will demand it back and take back what the enemy took from us!</p>
                </div>
              </div>
              
              <p className="text-gray-800 font-semibold mt-3 italic">
                This is what it means to be diligent, this is what it means to please God, and then the blessed rewards will come!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-yellow-900 mt-8 mb-4">
              🐂 THE GOLDEN CALF - EXODUS 32
            </h3>

            <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-800 my-6 bg-yellow-50 p-4 rounded">
              <p className="font-semibold text-yellow-900">"So it was, as soon as he came near the camp, that he saw the calf and the dancing. So Moses' anger became hot, and he cast the tablets out of his hands and broke them at the foot of the mountain."</p>
              <p className="text-sm mt-2 text-yellow-700">— Exodus 32:19</p>
            </blockquote>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-3">📚 HEBREW WORD: "CALF"</p>
              <p className="text-gray-800 mb-2">
                <strong>Hebrew:</strong> ā•ghel
              </p>
              <p className="text-gray-800 mb-2">
                <strong>Meaning:</strong> calf, bull-calf
              </p>
              <p className="text-gray-800 font-semibold">
                Also the root word for this Hebrew word is <strong>revolve</strong>.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 APPLICATION:</p>
              <p className="text-gray-800 italic">
                "When we bow down to the things of the world we break God's laws and we rebel against God. So my question to you is this, what does your world revolve around—money, materialism, people, sin, or does it revolve around God? If it doesn't revolve around God it's time to pick up the broken pieces, give them to God, and allow Him to bring you back to Himself because God's world revolves around you" (John 3:16).
              </p>
            </div>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              📜 THE TEN COMMANDMENTS - HIDDEN TRUTH
            </h3>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">🤔 STOP AND THINK</p>
              <p className="text-gray-800">
                Right now I want you to picture in your mind and think about the two stone tablets which we know as the Ten Commandments. Ok now that you thought of them and you pictured them in your mind read the following Scripture.
              </p>
            </div>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-900">"So the LORD relented from the harm which He said He would do to His people. And Moses turned and went down from the mountain, and the two tablets of the Testimony were in his hand. The tablets were written on both sides; on the one side and on the other they were written. Now the tablets were the work of God, and the writing was the writing of God engraved on the tablets."</p>
              <p className="text-sm mt-2 text-blue-700">— Exodus 32:14–16</p>
            </blockquote>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">🔥 DID YOU CATCH THAT?</p>
              <p className="text-gray-800 mb-2 font-semibold text-lg">
                The commandments were written on the <strong>front AND the back</strong> of the two stone tablets!
              </p>
              <p className="text-gray-800">
                We have always seen them in pictures on one side. We have passed this very important information up. What does this have to do with anything?
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">💡 THE LESSON:</p>
              <p className="text-gray-800 mb-2">Think about it like this:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-800">
                <li>Don't just read God's Word on the top, see what's on the bottom as well.</li>
                <li>Don't just look at the front, look at the back.</li>
                <li>Don't just read it, <strong>study it</strong>.</li>
                <li>Don't just let people tell you what it means because God wants to tell you what it means for your life!</li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              ✨ REVELATION - UNVEILING THE TRUTH
            </h3>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-3">📚 GREEK WORD: "REVELATION"</p>
              <p className="text-gray-800 mb-2">
                <strong>Greek:</strong> apokalyptō (ä-po-kä-lü'p-tō)
              </p>
              <p className="text-gray-800 mb-2">
                <strong>Meaning:</strong> To uncover, lay open what has been veiled or covered up
              </p>
              <p className="text-gray-800 font-semibold">
                Basically it means something that has always been there but has been covered with a veil. But then it's uncovered and revealed.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-2xl font-bold mb-3">
                📖 UNLOCK THE WORD 🔓
              </p>
              <p className="text-lg mb-2">
                It's time to start studying the names, cities, objects, and certain words in the Bible because when you do you will unlock so much of the Word of God that has always been there and always will be there.
              </p>
              <p className="text-lg">
                Always pray and ask God to show you and He will guide your eyes, your heart, and mind toward the revelation He wants to show you in the Scriptures. This happens when you diligently seek Him.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">📚 RESOURCE TIP</p>
              <p className="text-gray-800">
                To find out how to search the original languages in the Bible, check the resource page in the back of this book.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

