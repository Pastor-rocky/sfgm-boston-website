import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh9() {
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
                  <span className="align-middle">Chapter 9: Putting the Sermon Together</span>
                  <span className="text-2xl align-text-top ml-1">📝</span>
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
              src="/studying-for-service-ch9.mp3"
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
              📝 CHAPTER 9: PUTTING THE SERMON TOGETHER
            </h2>

            <p className="mb-6">
              Before you plan your sermon remember the time. According to a few studies, the average attention span is around 20 minutes. After that the mind may still retain some information, but a lot of it is lost. In the first 20 minutes, most of the information can be processed more readily and stored into memory by the brain.
            </p>

            <p className="mb-6">
              Don't get me wrong, when I first started preaching I preached for one and a half hours on Christmas Day. It was crazy, but I've learned from my mistakes that a good preaching should be about 20–30 minutes and if you're in a teaching setting it should be 30–45 minutes.
            </p>

            <p className="mb-6">
              What I have done is I've placed a clock directly in front of me above the front entrance of the church where I can see the time before I preach and figure out where I have to stop. The reason I do this is because you can have a really good word and drag it out and the people get uneasy and restless because they can only take so much information in. One thing you don't want is people to start yawning as you're preaching. Of course be led by the Holy Spirit but remember you don't have to drag it out.
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⏰ REMEMBER THE TIME!
            </h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">📊 ATTENTION SPAN RESEARCH</p>
              <p className="text-gray-800 mb-2">
                According to studies, the average attention span is around <strong>20 minutes</strong>. After that the mind may still retain some information, but a lot of it is lost.
              </p>
              <p className="text-gray-800 font-semibold">
                In the first 20 minutes, most information can be processed more readily and stored into memory by the brain.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">⏱️ RECOMMENDED TIME LIMITS</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-800">
                <li><strong>Preaching:</strong> 20–30 minutes</li>
                <li><strong>Teaching:</strong> 30–45 minutes</li>
              </ul>
              <p className="text-gray-800 mt-3 italic text-sm">
                (When I first started preaching I preached for one and a half hours on Christmas Day. It was crazy, but I've learned from my mistakes!)
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">💡 PRACTICAL TIP</p>
              <p className="text-gray-800">
                I've placed a clock directly in front of me above the front entrance of the church where I can see the time before I preach and figure out where I have to stop. You can have a really good word and drag it out and the people get uneasy and restless. One thing you don't want is people to start yawning as you're preaching!
              </p>
            </div>

            <p className="mb-6">
              The first thing you should start off with is your introduction, which is your foundation for the sermon. In school they teach you that a sermon is basically done in three parts:
            </p>

            <p className="mb-2">1) Introduction: Tell them what you are about to tell them.</p>
            <p className="mb-2">2) The sermon: Tell them what you want to tell them.</p>
            <p className="mb-6">3) The closing: Tell them what you have just told them.</p>

            <p className="mb-6">
              So you're basically introducing the sermon you're about to preach. If I was going to preach about Lazarus in John chapter 11, I would do the sermon outline as follows.
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              🏗️ THE THREE-PART STRUCTURE
            </h3>

            <div className="bg-purple-50 p-5 rounded-lg my-6">
              <p className="font-bold text-purple-900 mb-3 text-center text-xl">📐 SERMON STRUCTURE</p>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                  <p className="font-bold text-blue-900 mb-1">1. INTRODUCTION</p>
                  <p className="text-gray-700 text-sm">Tell them what you are about to tell them.</p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900 mb-1">2. THE SERMON</p>
                  <p className="text-gray-700 text-sm">Tell them what you want to tell them.</p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                  <p className="font-bold text-orange-900 mb-1">3. THE CLOSING</p>
                  <p className="text-gray-700 text-sm">Tell them what you have just told them.</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              📋 COMPLETE SERMON OUTLINE EXAMPLE
            </h3>

            <p className="mb-4 font-semibold text-gray-800">
              Example: Lazarus (John 11) - The Resurrecting Power of Jesus
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="font-bold text-blue-900 mb-2">INTRODUCTION</p>
                <p className="text-gray-800 text-sm mb-2">
                  Today we are going to look at the story of Lazarus found in John chapter eleven. I want to show you how you can have resurrecting power in your lives through Jesus and how He can raise up the dead situations in your life! Today who wants the dead situations in their lives resurrected for God's glory? Let's bow our heads and pray.
                </p>
                <p className="text-gray-800 text-sm font-semibold">Pray.</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="font-bold text-green-900 mb-2">SET UP TEXT</p>
                <p className="text-gray-800 text-sm mb-2">Explain what's happening in the text then read the verses you have chosen to read.</p>
              </div>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded">
                <p className="font-bold text-teal-900 mb-2">TEXT</p>
                <p className="text-gray-800 text-sm italic">
                  "Then, when Mary came where Jesus was, and saw Him, she fell down at His feet, saying to Him, 'Lord, if You had been here, my brother would not have died.' Therefore, when Jesus saw her weeping, and the Jews who came with her weeping, He groaned in the spirit and was troubled. And He said, 'Where have you laid him?' They said to Him, 'Lord, come and see.' Then the Jews said, 'See how He loved him!' And some of them said, 'Could not this Man, who opened the eyes of the blind, also have kept this man from dying?' Then Jesus, again groaning in Himself, came to the tomb. It was a cave, and a stone lay against it. Jesus said, 'Take away the stone.' Martha, the sister of him who was dead, said to Him, 'Lord, by this time there is a stench, for he has been dead four days.' Jesus said to her, 'Did I not say to you that if you would believe you would see the glory of God?' Then they took away the stone from the place where the dead man was lying. And Jesus lifted up His eyes and said, 'Father, I thank You that You have heard Me. And I know that You always hear Me, but because of the people who are standing by I said this, that they may believe that You sent Me.' Now when He had said these things, He cried with a loud voice, 'Lazarus, come forth!'" (John 11:32–34, 36–43 NKJV)
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <p className="font-bold text-purple-900 mb-2">EXPLAIN TEXT IN YOUR WORDS</p>
                <p className="text-gray-800 text-sm mb-3">
                  Mary and Martha, the sisters of Lazarus, were grieving the death of their brother but then Jesus shows up on the scene and He tells them that, "He is the resurrection and the life," but they are still doubting and not understanding that He can help them. Jesus purposely shows up late to show His power through Lazarus. Lazarus has been dead for four days.
                </p>
                <p className="text-gray-800 text-sm mb-2">
                  Four represents the world. Mary's and Martha's names represent bitterness and rebelliousness. Bethany means "house of misery" and "house of dates." Lazarus means "the Lord helps."
                </p>
                <p className="text-gray-800 text-sm font-semibold">You can say something like:</p>
                <p className="text-gray-800 text-sm italic mt-2">
                  In this story Lazarus has been dead for four days and on the fourth day Jesus shows up to resurrect him from the dead. After Lazarus rises from the dead, many people believe in Jesus, so Lazarus became a witness to and for the resurrecting power of Jesus. Also, I have learned that back in those days because of the heat and moisture plus the insects the dead body would be exposed to, the body would start to decompose. In other words, it would begin to rot and it would start on the fourth day. No matter how bad you think your life is falling apart and no matter how bad it is, if you roll the stone away, allow God to remove the things that are blocking you from the resurrecting power of God, He will put the pieces back together. Because before you can see and experience the resurrecting power upon you and your house you have to die to the things of the world—then you will rise up to be the witness God has called you to be. Jesus entered into a miserable situation and changed the atmosphere by resurrecting a dead situation! And He wants to do the same for you. Why? So you can be a witness and bear fruit for His glory [house of dates].
                </p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="font-bold text-orange-900 mb-2">APPLICATION</p>
                <p className="text-gray-800 text-sm mb-2">To live a resurrected life and for God to raise up the dead things in your life you have to allow Him to change your bitter and rebellious situation by doing the following:</p>
                <ol className="list-decimal ml-6 text-gray-800 text-sm space-y-1">
                  <li>Don't just believe He can do it for others but believe He can do it for you! Talk about truly believing and having faith that Jesus can do it for them.</li>
                  <li>Remove the stone. Talk about how the stone represents the sin, stubbornness, rebelliousness and pride in their lives. And how they have to willingly get rid of it because that is what's stopping the resurrection from happening.</li>
                  <li>Listen to and apply His Word. When Jesus said "Lazarus arise" Lazarus arose. Basically teach about how important God's Word is and how we have to read it and apply it because His Word is like a hammer that breaks the rock.</li>
                </ol>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="font-bold text-red-900 mb-2">BRING THEM TO THE CROSS</p>
                <p className="text-gray-800 text-sm mb-2 font-semibold">Every sermon you should find a way to bring them to the cross, especially if you're preaching about a story in the Old Testament. Connect it to Jesus. You can say something like this:</p>
                <p className="text-gray-800 italic text-sm">
                  Even though Lazarus was resurrected, one day he died again. But because Jesus Himself died and was raised three days later, Lazarus was able to rise up again, this time in heaven for all eternity—and we have eternal life through Him as well because of the cross.
                </p>
                <p className="text-gray-800 text-sm mt-2 italic">
                  "Greater love has no one than this, than to lay down one's life for his friends. You are My friends if you do whatever I command you." (John 15:13–14 NKJV)
                </p>
                <p className="text-gray-800 text-sm mt-2 font-semibold">
                  Today, obey what you have heard and you too can live a resurrected life here on earth and then for all eternity!
                </p>
              </div>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded">
                <p className="font-bold text-teal-900 mb-2">ILLUSTRATED STORY</p>
                <p className="text-gray-800 text-sm mb-2 font-semibold">Perfect time to tell a story to connect it to your sermon.</p>
                <p className="text-gray-800 text-sm mb-3">
                  A man during the Civil War was sitting on a park bench in Washington, D.C., crying. His son, under great distress, had deserted his post in battle and was to be shot by a firing squad soon. The father had come to the capitol to see President Abraham Lincoln but couldn't get past the front gates. People passed by, but nobody stopped to listen. Finally, a little boy paused and asked the man why he was crying. In his emotional distress, he told his story. He ended by saying that if he could talk to the president, he knew his son would be pardoned. The young boy asked the man to follow him. When they came to the front gate of the White House, the little boy said to the soldiers, "It's all right, he's with me." The man followed in amazement. They came to the room where President Lincoln was conferring with his generals and cabinet members, guarded by yet another detachment of soldiers. The young boy pushed inside and jumped up on the president's lap. Conversation stopped as the boy said, "Daddy, there's a man I want you to meet. He needs your help." The man was brought in to talk with the president. His son received the presidential pardon because the son of the president took an interest in his plight.
                </p>
                <p className="text-gray-800 text-sm italic">
                  Through Jesus we have access to God—what an incredible truth. We, who are in our old nature corrupt and rebellious and sinful and objects of God's wrath, are suddenly, miraculously, invited. God has pardoned us because His Son Jesus intervened on our behalf.
                </p>
                <p className="text-gray-800 text-sm mt-2 font-semibold">You can say something like:</p>
                <p className="text-gray-800 text-sm italic mt-1">
                  Like Lazarus was saved from death and the man's son was, Jesus is the same yesterday, today, and forever; if He did it for them He can do it for you! Because Jesus is interceding for you and me. Jesus would tell you today remove the stone and let Me raise up all those dead situations in your life! You can't do it just like the man in the story couldn't, just like Mary and Martha couldn't, but there's a Son that can!
                </p>
              </div>

              <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded">
                <p className="font-bold text-pink-900 mb-2">ALTAR CALL</p>
                <p className="text-gray-800 text-sm mb-2 font-semibold">Tell the people to stand and then you can say something like this:</p>
                <p className="text-gray-800 text-sm italic">
                  If you believe that the Son's calling you out and wants to raise those dead situations, get to this altar now! Jesus is calling you out of your situation. If you believe it, get here right now by faith!
                </p>
              </div>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              At the altar call you should remember a few things.
            </p>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              🎤 ALTAR CALL BEST PRACTICES
            </h3>

            <p className="mb-2">1) As you're winding down to the last five minutes of your preaching call up the choir by saying, "As the choir comes up," get the choir to remember that cue. It's always good for the choir to sing a song that connects someway with the preaching. Connect with the choir director and let him know what song he should sing and if you don't know a song tell him the theme of your sermon—he should figure it out.</p>

            <p className="mb-2">2) The altar call should be very smooth because this is where people make a decision, this is where lives change. What's good about the altar call is no matter how bad you think your preaching went, you can make it up at the altar call.</p>

            <p className="mb-2">3) Don't over-preach at the altar. This is a time for them to connect with God and God to connect with them.</p>

            <p className="mb-6">4) Remember to offer a prayer of rededication and the sinner's prayer.</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">✅ 4 KEY REMINDERS:</p>
              <ol className="list-decimal ml-6 space-y-3 text-gray-800">
                <li>
                  <strong>Cue the choir:</strong> As you're winding down to the last 5 minutes say, "As the choir comes up." Connect with the choir director about a song that matches your sermon theme.
                </li>
                <li>
                  <strong>Keep it smooth:</strong> This is where people make a decision, this is where lives change. No matter how bad you think your preaching went, you can make it up at the altar call.
                </li>
                <li>
                  <strong>Don't over-preach:</strong> This is a time for them to connect with God and God to connect with them.
                </li>
                <li>
                  <strong>Offer prayers:</strong> Remember to offer a prayer of rededication and the sinner's prayer.
                </li>
              </ol>
            </div>

            <p className="mb-6 font-semibold text-green-800 text-lg">
              Sermon Outline
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              📋 BLANK SERMON OUTLINE TEMPLATE
            </h3>

            <div className="bg-green-50 p-5 rounded-lg my-6 border-2 border-green-300">
              <div className="space-y-3">
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-green-900">Introduction:</p>
                  <p className="text-gray-400 text-sm">_______________________________</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-blue-900">Pray:</p>
                  <p className="text-gray-400 text-sm">_______________________________</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-purple-900">Set Up Text:</p>
                  <p className="text-gray-400 text-sm">_______________________________</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-orange-900">Text:</p>
                  <p className="text-gray-400 text-sm">_______________________________</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-teal-900">Explain Text in Your Words:</p>
                  <p className="text-gray-400 text-sm">_______________________________</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-pink-900">Application:</p>
                  <p className="text-gray-400 text-sm">_______________________________</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-red-900">Bring Them to the Cross:</p>
                  <p className="text-gray-400 text-sm">_______________________________</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-indigo-900">Illustrated Story:</p>
                  <p className="text-gray-400 text-sm">_______________________________</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-green-900">Altar Call:</p>
                  <p className="text-gray-400 text-sm">_______________________________</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-blue-900">Pray:</p>
                  <p className="text-gray-400 text-sm">_______________________________</p>
                </div>
              </div>
            </div>

            <p className="mb-6">
              Watch your repetitive words that you might use as fillers after every other word like... Amen, praise God, hallelujah, glory to God.
            </p>

            <p className="mb-6">
              There are so many other ways to set up a sermon outline. I just wanted to teach you one of the ways I usually do it. The purpose of an outline is to keep you from going all over the place in your sermon. As a matter of fact me and a close minister friend I know were in a city ministering. Before I could go up the pastor of that church called up one of the ministers from another church and as he was preaching I noticed he had no theme. He had Scriptures but he was all over the place with no foundation, no structure, and no application.
            </p>

            <p className="mb-6 font-semibold text-orange-800">
              Right there God ministered to me to write this book you're reading. As God was ministering this to me, my other minister friend turned to me and said, "At the next minister's meeting make a note we are going to teach the ministers how to preach better." I said, "Confirmation. God was just telling me to write a book about how to teach ministers to preach more effectively." This book is going to be a teaching guide for a lot of ministers because God has confirmed it and God has given the vision and the wisdom. So hopefully this will help you in your ministry as well.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">⚠️ WATCH YOUR FILLER WORDS</p>
              <p className="text-gray-800">
                Be aware of repetitive words you might use as fillers after every other word like: Amen, praise God, hallelujah, glory to God.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              🎯 THE PURPOSE OF AN OUTLINE
            </h3>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-2">📌 WHY USE AN OUTLINE?</p>
              <p className="text-gray-800 mb-3">
                The purpose of an outline is to keep you from going all over the place in your sermon. I've seen ministers with Scriptures but no theme, no foundation, no structure, and no application—they were all over the place!
              </p>
              <p className="text-gray-800 font-semibold">
                An outline keeps you organized and focused on your message!
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">✨ THE BIRTH OF THIS BOOK</p>
              <p className="text-gray-800 mb-2">
                I was at a ministry event and saw a preacher with no structure—all over the place. Right there God ministered to me to write this book you're reading.
              </p>
              <p className="text-gray-800 mb-2">
                At the same moment, my minister friend turned to me and said, "At the next minister's meeting we need to teach ministers how to preach better."
              </p>
              <p className="text-gray-800 font-semibold">
                I said, "Confirmation! God was just telling me to write a book about how to teach ministers to preach more effectively." God has confirmed it and given the vision and wisdom.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-teal-900 mt-8 mb-4">
              📖 COMPLETE LAZARUS SERMON FLOW
            </h3>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-5 my-6 rounded">
              <p className="font-bold text-teal-900 mb-3">🎤 BRINGING IT ALL TOGETHER</p>
              
              <div className="space-y-4">
                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-blue-900 mb-1">Introduction & Prayer</p>
                  <p className="text-gray-700 text-sm">Set the expectation for resurrection power!</p>
                </div>

                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-green-900 mb-1">Text & Explanation</p>
                  <p className="text-gray-700 text-sm">Share the story with name meanings, numbers, and context</p>
                </div>

                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-purple-900 mb-1">Application (3 Points)</p>
                  <p className="text-gray-700 text-sm">Believe, Remove the stone, Apply His Word</p>
                </div>

                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-red-900 mb-1">Connect to the Cross</p>
                  <p className="text-gray-700 text-sm">Show how Jesus' resurrection gives us eternal life</p>
                </div>

                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-orange-900 mb-1">Story</p>
                  <p className="text-gray-700 text-sm">President's pardon (access to God through Jesus)</p>
                </div>

                <div className="bg-white p-3 rounded">
                  <p className="font-semibold text-pink-900 mb-1">Altar Call</p>
                  <p className="text-gray-700 text-sm">Call people to receive resurrection power by faith</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-2xl font-bold mb-3">
                📝 PUT IT ALL TOGETHER! 🎯
              </p>
              <p className="text-lg">
                There are many ways to set up a sermon outline. This is one proven method that keeps you organized, focused, and effective!
              </p>
              <p className="text-lg mt-2 font-semibold">
                Hopefully this will help you in your ministry as well.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

