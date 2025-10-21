import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh8() {
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
                  <span className="align-middle">Chapter 8: Application Applied</span>
                  <span className="text-2xl align-text-top ml-1">✅</span>
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
              src="/studying-for-service-ch8.mp3"
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
              ✅ CHAPTER 8: APPLICATION APPLIED
            </h2>

            <p className="mb-4 text-lg">
              In this chapter I want to teach you how to bring people from hearing to applying what you have shared with them. A lot of ministers minister a word without teaching the people how to apply the information they have given them. Like if I was to say to a person, "If you give in to the devil you're going to live a miserable life and eventually go to hell." That's true but we should show them how not to give in to the enemy and how to live a blessed life and how to make it to heaven.
            </p>

            <p className="mb-6">
              In this chapter this is what you're about to learn, because when you teach them how to apply the information, and they do what you have taught them then they will see Jesus manifest in their lives because application brings manifestation!
            </p>

            <p className="mb-6 font-semibold text-blue-800 text-lg">
              APPLICATION BRINGS MANIFESTATION!
            </p>

            <p className="mb-4">
              Let me share with you why this is so important. I evangelize and go to a lot of churches to minister and at one of these churches I was doing a revival service. After I was done preaching one of the people from the crowd came to me and was encouraging me about the word that I just ministered. So I told him you should really get involved at the church; I said this because he was visiting that church for the second time. He began to explain the reason why he didn't attend the church is because he felt like the pastor doesn't teach them how to apply the information. Then he said how he comes to hear me preach when I'm in that city because I teach people how to apply the information that is ministered. I was encouraged and hurt at the same time. I began to think about how many people aren't going to church because of this same reason. Ask yourself this, do you teach people how to apply the information you have given them? If not let's find out how.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">❌ THE PROBLEM</p>
              <p className="text-gray-800 mb-2">
                Example: If I say to a person, "If you give in to the devil you're going to live a miserable life and eventually go to hell."
              </p>
              <p className="text-gray-800 font-semibold">
                That's true but we should show them <strong>HOW not to give in</strong> to the enemy and <strong>HOW to live a blessed life</strong> and <strong>HOW to make it to heaven</strong>.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg my-6 text-center">
              <p className="text-2xl font-bold">
                APPLICATION BRINGS MANIFESTATION!
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">💔 A PAINFUL REALITY</p>
              <p className="text-gray-800 mb-2">
                I was at a revival and a man told me: "I don't attend this church because the pastor doesn't teach us how to apply the information. But I come to hear you preach because you teach people how to apply it."
              </p>
              <p className="text-gray-800 font-semibold">
                How many people aren't going to church because of this same reason? Ask yourself: Do you teach people how to apply the information?
              </p>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              Let's look at a few stories we have already discussed in the book and learn how to connect the application points. Think about the story of Lazarus in John chapter eleven. How would we teach them to live a resurrected life based on that text? The application can be connected like this:
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              ⚰️ EXAMPLE 1: LAZARUS (JOHN 11)
            </h3>

            <p className="mb-4">
              To live a resurrected life and for God to raise up the dead things of your life you have to:
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">✅ APPLICATION - TO LIVE A RESURRECTED LIFE:</p>
              <ol className="list-decimal ml-6 space-y-3 text-gray-800">
                <li>
                  <strong>Believe He can do it for YOU!</strong> Don't just believe He can do it for others but believe He can do it for you. Talk about truly believing and having faith that Jesus can do it for them.
                </li>
                <li>
                  <strong>Remove the stone.</strong> The stone represents the sin, stubbornness, rebelliousness and pride in their lives. They have to willingly get rid of it because that is what's stopping the resurrection from happening.
                </li>
                <li>
                  <strong>Listen to and apply His Word.</strong> When Jesus said "Lazarus arise," Lazarus arose. Teach about how important God's Word is and how we have to read it and apply it because His Word is like a hammer that breaks the rock.
                </li>
              </ol>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              Another example is the man at the pool of Bethesda in John chapter five. To show the people how to get up out of their problems and how to stay out of their problems you can teach them how to apply it by doing the following:
            </p>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              🏊 EXAMPLE 2: THE POOL OF BETHESDA (JOHN 5)
            </h3>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">✅ APPLICATION - 3 STEPS TO FREEDOM:</p>
              <ol className="list-decimal ml-6 space-y-3 text-gray-800">
                <li>
                  <strong>Rise up. Repent.</strong> Explain how you have to make a decision to repent and get up out of the mess you're in.
                </li>
                <li>
                  <strong>Walk. Start walking in His Word.</strong> Explain the importance of the Word and how it teaches us how to walk like Jesus wants us to walk. Start walking by faith no matter what happens.
                </li>
                <li>
                  <strong>Take up your mat.</strong> The mat was ugly, disgusting; it was with him for a long time. This represents not allowing your problems to control you but you control them by the power of the Holy Spirit.
                </li>
              </ol>
            </div>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              👑 EXAMPLE 3: JOSEPH (GENESIS 37-50)
            </h3>

            <p className="mb-4">
              Look at the story of Joseph in the book of Genesis chapters 37–50. Joseph's story was longer than any other story in the Old Testament. If you were to preach a sermon or a series of sermons like I did a few years ago on the story of Joseph, you will see a lot of application points you can take out of Joseph's story, but what I want to do is show you five major points I have seen in this awesome story full of faith and endurance.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">✅ 5 LIFE LESSONS FROM JOSEPH:</p>
              <ol className="list-decimal ml-6 space-y-3 text-gray-800">
                <li>
                  <strong>Don't let go of your dreams/visions.</strong> Joseph remembered the dream no matter what he went through.
                </li>
                <li>
                  <strong>Don't complain or blame.</strong> Joseph could have blamed his brothers and others but he chose to forgive and let go.
                </li>
                <li>
                  <strong>Make the best out of your situation.</strong> Joseph was always second everywhere (father's house, Potiphar's house, jail, Pharaoh's house). The number two means "witness"—when you make the best of your situation people will see your witness for God.
                </li>
                <li>
                  <strong>Always help people no matter what.</strong> He helped his father, brothers (before and after they hurt him), Potiphar, the jailer, prisoners, Pharaoh, Egypt, and millions through the famine.
                </li>
                <li>
                  <strong>Put God in front.</strong> "I can't interpret dreams, only God can." "What you meant for evil God meant for good." He gave God all the glory!
                </li>
              </ol>
            </div>

            <p className="mb-6">
              When you do these things you will be moved from the pit to the palace. Just remember through it all, don't have a pity party have a praise party in advance.
            </p>

            <p className="mb-6 font-semibold text-gray-800">
              The final example is a sermon outline based on a sermon I ministered. The sermon was called "Living on the Edge." I want to give this example for you to see how you make the transition from the text to the application part and then the closing.
            </p>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              🪟 EXAMPLE 4: LIVING ON THE EDGE (ACTS 20:7-12)
            </h3>

            <p className="mb-4 font-semibold text-orange-800">
              Living on the Edge
            </p>

            <p className="mb-6">
              Acts 20:7–12: On the first day of the week we came together to break bread. Paul spoke to the people and, because he intended to leave the next day, kept on talking until midnight. There were many lamps in the upstairs room where we were meeting. Seated in a window was a young man named Eutychus, who was sinking into a deep sleep as Paul talked on and on. When he was sound asleep, he fell to the ground from the third story and was picked up dead. Paul went down, threw himself on the young man and put his arms around him. "Don't be alarmed," he said. "He's alive!" Then he went upstairs again and broke bread and ate. After talking until daylight, he left. The people took the young man home alive and were greatly comforted.
            </p>

            <p className="mb-6">
              If you notice they started on the Lord's day but shortly after midnight, early Monday morning, he fell! This is what happens to a lot of people because they are living on the edge, meaning one foot in the church and one foot in the world.
            </p>

            <p className="mb-4">
              Eutychus = fortunate.
            </p>

            <p className="mb-4">
              1) to hit the mark 2) to be well off, fare well, prosper, acting well, well done, good
            </p>

            <p className="mb-6">
              God has a plan for you. He wants you to prosper and He wants you to hit the mark of his Word and blessing every time and He wants to tell you, "Well done my good and faithful servant," when you enter Heaven! But the devil wants you to fail and forsake everything God has planned for you. The definition for sin means to miss the mark. How does the enemy get you to mess up the plan and blessings God has for you? In this text you notice a couple things.
            </p>

            <p className="mb-2">1. This happens because one eye is on the world and one eye is on Christ; a part of the body is in the world and one part is in church. Living on the edge!</p>
            <p className="mb-6">2. We allow the enemy to take over when we get lazy and comfortable.</p>

            <p className="mb-4">
              The word sleep is the Greek word transliterated hypnos.
            </p>

            <p className="mb-4">
              Pronunciation: hü'p-nos
            </p>

            <p className="mb-6">
              It's our English word hypnosis: The induction of a state of consciousness in which a person apparently loses the power of voluntary action and is highly responsive to suggestion or direction.
            </p>

            <p className="mb-4">
              We get like this when we are disobedient to God. Ephesians chapter two shows us this:
            </p>

            <p className="mb-6">
              "Once you were dead because of your disobedience and your many sins. You used to live in sin, just like the rest of the world, obeying the devil—the commander of the powers in the unseen world. He is the spirit at work in the hearts of those who refuse to obey God." (Ephesians 2:1–2 NLT)
            </p>

            <p className="mb-4 font-semibold text-orange-800">
              How do we get out of living a dead life?
            </p>

            <p className="mb-4 font-semibold text-orange-800">
              Here comes the application!
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-2">📚 THE NAME: EUTYCHUS</p>
              <p className="text-gray-800 mb-2">
                <strong>Meaning:</strong> Fortunate - to hit the mark, to be well off, prosper, acting well, good
              </p>
              <p className="text-gray-800 font-semibold">
                God wants you to prosper and hit the mark every time! But the devil wants you to fail. The definition for <strong>sin</strong> means to <strong>miss the mark</strong>.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">⚠️ THE PROBLEM - LIVING ON THE EDGE</p>
              <p className="text-gray-800">
                Notice: They started on the Lord's day but shortly after midnight (early Monday morning) he fell! This is what happens when people are living on the edge, meaning <strong>one foot in the church and one foot in the world</strong>.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">😴 THE WORD "SLEEP"</p>
              <p className="text-gray-800 mb-2">
                <strong>Greek:</strong> hypnos (hü'p-nos)
              </p>
              <p className="text-gray-800 mb-2">
                <strong>English word:</strong> Hypnosis
              </p>
              <p className="text-gray-800 font-semibold">
                The induction of a state of consciousness in which a person apparently loses the power of voluntary action and is highly responsive to suggestion or direction.
              </p>
            </div>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-900">"Once you were dead because of your disobedience and your many sins. You used to live in sin, just like the rest of the world, obeying the devil—the commander of the powers in the unseen world. He is the spirit at work in the hearts of those who refuse to obey God."</p>
              <p className="text-sm mt-2 text-blue-700">— Ephesians 2:1–2 NLT</p>
            </blockquote>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🆙 HOW TO GET OUT OF LIVING A DEAD LIFE
            </h3>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-3">✅ APPLICATION - 3 STEPS:</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <p className="font-bold text-red-900 mb-2">1. RECOGNIZE YOU'VE BEEN DECEIVED</p>
                  <blockquote className="text-sm text-gray-700 italic">
                    "You foolish Galatians! Who has bewitched you? Before your very eyes Jesus Christ was clearly portrayed as crucified. Are you so foolish? After beginning with the Spirit, are you now trying to attain your goal by human effort?" (Galatians 3:1–4)
                  </blockquote>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                  <p className="font-bold text-orange-900 mb-2">2. WAKE UP OUT OF YOUR SIN</p>
                  <blockquote className="text-sm text-gray-700 italic mb-2">
                    "Wake up, O sleeper, rise from the dead, and Christ will shine on you. Be very careful, then, how you live—not as unwise but as wise, making the most of every opportunity, because the days are evil." (Ephesians 5:13–16)
                  </blockquote>
                  <blockquote className="text-sm text-gray-700 italic">
                    "I know your works, that you have a name that you are alive, but you are dead. Be watchful, and strengthen the things which remain, that are ready to die... Remember therefore how you have received and heard; hold fast and repent..." (Revelation 3:1–3)
                  </blockquote>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900 mb-2">3. LIVE A RESURRECTED LIFE!</p>
                  <p className="text-sm text-gray-700">
                    As soon as he was raised from the dead he went right back into the house. Explain how we need to get back in the Word, fellowship, get off the edge.
                  </p>
                </div>
              </div>
            </div>

            <p className="mb-4">
              When you do this people will be blessed by your life! Then we like Paul can help raise up other people who have died spiritually. The Bible says in verse 10, Paul went down, threw himself on the young man and put his arms around him. "Don't be alarmed," he said. "He's alive!"
            </p>

            <p className="mb-4">
              The word threw. The root word of that Greek word means to comfort.
            </p>

            <p className="mb-4">
              The word comforted means:
            </p>

            <p className="mb-2">1) to receive consolation, be comforted</p>
            <p className="mb-2">2) to encourage, strengthen</p>
            <p className="mb-2">3) exhorting and comforting and encouraging</p>
            <p className="mb-2">4) to instruct, teach</p>
            <p className="mb-2">5) to descend from a higher place to a lower</p>
            <p className="mb-6">6) to fall (either from or upon)</p>

            <p className="mb-6">
              Meaning we can be a people who can comfort, encourage, strengthen, and teach others to rise up and stop living on the edge. Don't think of yourselves as too great to get out of your position and help those that are dying. James 5:19–20: "My brothers, if one of you should wander from the truth and someone should bring him back, remember this: Whoever turns a sinner from the error of his way will save him from death and cover over a multitude of sin."
            </p>

            <p className="mb-4 font-semibold text-green-800 text-lg">
              Get off the edge and get in—
            </p>

            <p className="mb-2">The Word</p>
            <p className="mb-2">Fellowship</p>
            <p className="mb-6">Start living a resurrected life</p>

            <p className="mb-6">
              Get off the edge and you can help others do the same. Let's pray.
            </p>

            <p className="mb-6 font-semibold text-gray-800">
              Altar call.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">💙 PAUL'S COMFORT</p>
              <p className="text-gray-800 mb-2">
                Paul went down, threw himself on the young man and put his arms around him. "Don't be alarmed," he said. "He's alive!"
              </p>
              <p className="text-gray-800 mb-2">
                <strong>The word "threw":</strong> Root word means <strong>to comfort</strong>
              </p>
              <p className="text-gray-800 font-semibold">
                <strong>Comforted means:</strong> to receive consolation, encourage, strengthen, exhort, instruct, teach, descend from higher to lower, to fall upon
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">🎯 THE APPLICATION:</p>
              <p className="text-gray-800 mb-3">
                We can be people who comfort, encourage, strengthen, and teach others to rise up and stop living on the edge. Don't think of yourselves as too great to get out of your position and help those that are dying.
              </p>
              <blockquote className="text-gray-800 italic text-sm">
                "My brothers, if one of you should wander from the truth and someone should bring him back, remember this: Whoever turns a sinner from the error of his way will save him from death and cover over a multitude of sin." (James 5:19–20)
              </blockquote>
            </div>

            <div className="bg-green-50 p-4 rounded-lg my-6">
              <p className="font-bold text-green-900 mb-2 text-center text-xl">🔑 GET OFF THE EDGE AND GET IN:</p>
              <div className="grid md:grid-cols-3 gap-3 mt-3">
                <div className="bg-white p-3 rounded text-center border-2 border-blue-400">
                  <p className="font-bold text-blue-900">The Word</p>
                </div>
                <div className="bg-white p-3 rounded text-center border-2 border-purple-400">
                  <p className="font-bold text-purple-900">Fellowship</p>
                </div>
                <div className="bg-white p-3 rounded text-center border-2 border-green-400">
                  <p className="font-bold text-green-900">Resurrected Life</p>
                </div>
              </div>
            </div>

            <p className="mb-4">
              Hopefully that helps you to understand that in every text or story in the Bible you can pull out application points that people can apply. We have to give them a way out. Give them some way of applying the information given to them. If you're a teacher go through some of your old teachings and see if you can find some application points you can pull out and apply.
            </p>

            <p className="mb-6">
              When you do give application points, a good number is usually three to five application points so the people can remember. One of the biggest application points you can make is the importance of the Word of God. This point is in every sermon I have preached. The people need to get in the Word because the Word is the most important thing for their lives because they need to learn how to apply the Word out of church not just in church.
            </p>

            <p className="mb-6 font-semibold text-blue-800 text-lg">
              In every sermon you preach remember to add application, because application brings manifestation!
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">💡 PRACTICAL TIPS</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-800">
                <li>When you give application points, a good number is usually <strong>3 to 5 points</strong> so people can remember</li>
                <li>One of the biggest application points is the <strong>importance of the Word of God</strong> - include this in every sermon!</li>
                <li>People need to learn how to apply the Word <strong>outside of church</strong>, not just inside</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">🔍 ASSIGNMENT</p>
              <p className="text-gray-800">
                If you're a teacher, go through some of your old teachings and see if you can find application points you can pull out and apply. Look for ways to show people <strong>HOW</strong> to live out the truth you're teaching.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-3xl font-bold mb-3">
                ✅ APPLICATION BRINGS MANIFESTATION! ✨
              </p>
              <p className="text-lg">
                In every sermon you preach remember to add application, because when people apply what they hear, they will see Jesus manifest in their lives!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

