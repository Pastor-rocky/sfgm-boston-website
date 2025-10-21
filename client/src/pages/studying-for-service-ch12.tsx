import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh12() {
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
                  <span className="align-middle">Chapter 12: Conclusion</span>
                  <span className="text-2xl align-text-top ml-1">🎓</span>
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
              src="/studying-for-service-ch12.mp3"
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
              🎓 CHAPTER 12: CONCLUSION
            </h2>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">🎤 MY BIBLE SCHOOL EXPERIENCE</p>
              <p className="text-gray-800 mb-3">
                I know there are so many other ways to lay a sermon down and study, but I felt led to at least share what the Lord showed me. I remember when I preached in front of my class in Bible school, there was a panel of pastors and bishops judging the way I preached. After I was done they pointed out my strong points and my weak points in the preaching. I had more weak points than strong points. They pointed out my repetitive words like "amen," "praise God," and they showed me how my sermon was not structured properly.
              </p>
              <p className="text-gray-800 font-semibold">
                After they made their assessment, I thought I wasn't even called to preach or be a pastor, but it was used to help me.
              </p>
            </div>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-900">"Whoever loves instruction loves knowledge, but he who hates correction is stupid."</p>
              <p className="text-sm mt-2 text-blue-700">— Proverbs 12:1</p>
            </blockquote>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🌊 THERE'S ALWAYS MORE TO DISCOVER
            </h3>

            <p className="mb-6">
              We can never know enough about our God. The Apostle John said it right when he said, "This is the disciple who testifies of these things, and wrote these things; and we know that his testimony is true. And there are also many other things that Jesus did, which if they were written one by one, I suppose that even the world itself could not contain the books that would be written. Amen" (John 21:24–25 NKJV). Dig deeper and hunger and thirst for righteousness through His Word. He promises you will be filled. So start digging.
            </p>

            <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-800 my-6 bg-yellow-50 p-4 rounded">
              <p className="font-semibold text-yellow-900">"Again, the kingdom of heaven is like treasure hidden in a field, which a man found and hid; and for joy over it he goes and sells all that he has and buys that field."</p>
              <p className="text-sm mt-2 text-yellow-700">— Matthew 13:44</p>
            </blockquote>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              💎 THE TREASURE IN THE FIELD
            </h3>

            <p className="mb-6">
              If you think about the story, many people walked right over the treasure, but one man was diligent and found the treasure and sold everything he had to buy the field to receive the treasure. We have to understand the same thing. We have passed by the stories and Scriptures in the Bible, not realizing there's so much more if you are willing to dig, if you're willing to be sold out to studying the Word with diligence.
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-4 my-6 rounded">
              <p className="font-bold text-teal-900 mb-2">📖 GREEK WORD: THĒSAUROS</p>
              <p className="text-gray-800 mb-2">
                The Greek word for "treasure" in this text is <strong>thēsauros</strong>, which means:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-gray-800 text-sm">
                <li>An accumulated wealth</li>
                <li>Storehouse</li>
                <li>The things laid up in a treasury</li>
                <li>Collected treasures</li>
              </ul>
              <p className="text-gray-800 mt-3 font-semibold">
                Thēsauros is where we get our English word "thesaurus" (a book containing systematized lists of synonyms and related words; a dictionary of selected words or topics; rare: a treasury).
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">✨ FRESH REVELATION</p>
              <p className="text-gray-800">
                Praise God! And just for you to know, I have never shared this with anyone yet, because as I was writing this chapter God gave me the story of the man that found the treasure, so I began to study it and that was what I discovered. A fresh revelation, another piece of treasure to use for God's glory.
              </p>
            </div>

            <p className="mb-6">
              You can start receiving God's treasure as well, but we have to be like the man that found the treasure and be totally sold out to God's Word. Then you can say what the great psalmist said, "I rejoice at Your word as one who finds great treasure" (Psalm 119:162).
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              🔥 DILIGENT SEEKING
            </h3>

            <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-800 my-6 bg-red-50 p-4 rounded">
              <p className="font-semibold text-red-900">"But without faith it is impossible to please Him, for he who comes to God must believe that He is, and that He is a rewarder of those who diligently seek Him."</p>
              <p className="text-sm mt-2 text-red-700">— Hebrews 11:6</p>
            </blockquote>

            <p className="mb-4 font-semibold text-gray-800">Remember what the word diligent meant:</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">📚 DILIGENT (ek-zā-te'-ō)</p>
              <p className="text-gray-800 mb-2">Outline of Biblical usage:</p>
              <ol className="list-decimal ml-6 space-y-1 text-gray-800 text-sm">
                <li>To seek out, search for</li>
                <li>To seek out, i.e., investigate, scrutinize</li>
                <li>To seek out for one's self, beg, crave</li>
                <li>To demand back, require</li>
              </ol>
              <p className="text-gray-800 mt-3 font-semibold">
                So get reading because leaders are readers.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🙏 MY PRAYER FOR YOU</p>
              <p className="text-gray-800 mb-2">
                I pray that the Lord will give you revelation through the Scriptures for His glory and that you would minister like never before, to bring people into a deeper understanding with their God so that they can be changed and used for service to bring people into the Kingdom of God through the Word of God.
              </p>
              <p className="text-gray-800 font-semibold text-center mt-3 text-lg">
                Challenge yourself and always remember we study for service because of our Savior.
              </p>
              <p className="font-bold text-center mt-2 text-lg text-green-800">
                Because the more you know your text, the more people will know their God!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              🌐 RESOURCE PAGE: GREATER WORKS
            </h3>

            <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-800 my-6 bg-purple-50 p-4 rounded">
              <p className="font-semibold text-purple-900">"Most assuredly, I say to you, he who believes in Me, the works that I do he will do also; and greater works than these he will do, because I go to My Father."</p>
              <p className="text-sm mt-2 text-purple-700">— John 14:12</p>
            </blockquote>

            <p className="mb-6">
              How in the world can we do greater things than Jesus? I believe Jesus was referring to how the church as a body working together could do more because He was going to send His Holy Spirit on the earth to His believers. I also believe He must have been referring to technology as well. Think about this: the TBN Christian channel gets millions of viewers a day all across the world and they minister the Gospel to them all at one time. Christian Internet sites are used to minister to millions. Christian radio stations are used to minister to millions.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">💻 LEARN TO USE TECHNOLOGY</p>
              <p className="text-gray-800">
                I believe people who do not know how to work a computer need to learn; it's not that complicated. It's very easy. The reason why we should do this is because we can study a lot easier and more effectively.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-teal-900 mt-8 mb-4">
              🔗 RECOMMENDED WEBSITES
            </h3>

            <div className="space-y-3">
              <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                <p className="font-semibold text-blue-900">www.sermonillustrations.com</p>
                <p className="text-gray-700 text-sm">Click on the first letter of your illustrated word. If you want a story about love, click on the letter "L."</p>
              </div>

              <div className="bg-white p-3 rounded border-l-4 border-green-500">
                <p className="font-semibold text-green-900">www.sermoncentral.com</p>
                <p className="text-gray-700 text-sm">Click on Illustrations. Type in the key word of your illustration.</p>
              </div>

              <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                <p className="font-semibold text-purple-900">www.biblestudy.org</p>
                <p className="text-gray-700 text-sm">Click on Bible Reference Books. Helpful complete books online: What Do Numbers Mean?</p>
              </div>

              <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                <p className="font-semibold text-orange-900">www.google.com</p>
                <p className="text-gray-700 text-sm">Type in the name of whatever you're looking for, like "the Greek word for Jesus." Then it will give you many listings.</p>
              </div>

              <div className="bg-white p-3 rounded border-l-4 border-red-500">
                <p className="font-semibold text-red-900">www.wikipedia.org</p>
                <p className="text-gray-700 text-sm">Then type in what you're looking for.</p>
              </div>

              <div className="bg-white p-3 rounded border-l-4 border-teal-500">
                <p className="font-semibold text-teal-900">www.blueletterbible.com ⭐</p>
                <p className="text-gray-700 text-sm font-semibold">Also available on a smartphone as an app. This is what I mainly use. Highly recommend this.</p>
              </div>

              <div className="bg-white p-3 rounded border-l-4 border-indigo-500">
                <p className="font-semibold text-indigo-900">www.apostolic-churches.net</p>
                <p className="text-gray-700 text-sm">This site has Greek and Hebrew definitions with Strong's Concordance.</p>
              </div>

              <div className="bg-white p-3 rounded border-l-4 border-pink-500">
                <p className="font-semibold text-pink-900">www.dictionary.com</p>
                <p className="text-gray-700 text-sm">Type in any word for definition.</p>
              </div>

              <div className="bg-white p-3 rounded border-l-4 border-yellow-500">
                <p className="font-semibold text-yellow-900">www.e-sword.com</p>
                <p className="text-gray-700 text-sm">Download and then add commentaries, dictionaries, and Bibles. Check up the original languages.</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              📚 IF YOU DON'T WANT TO USE THE INTERNET
            </h3>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-3">Buy yourself the following books:</p>
              <ol className="list-decimal ml-6 space-y-2 text-gray-800">
                <li>KJV Strong's Concordance Bible with the Greek and Hebrew word definitions.</li>
                <li>Spirit-Filled Bible with commentary and dictionary.</li>
                <li>Any book that has biblical illustrated stories.</li>
                <li>You can also use this book as a Bible study to teach others how to study the Bible and prepare sermons and lessons.</li>
              </ol>
              <p className="text-gray-800 mt-3 text-sm">
                You can buy or order these from any Christian bookstore.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">📞 NEED HELP? CALL ME!</p>
              <p className="text-gray-800 mb-2">
                You can call or text me at <strong>(708) 296-7663</strong> with any questions.
              </p>
              <p className="text-gray-800 font-semibold">
                Don't hesitate to call me; I want to help—whether it's helping you with a definition or a story or even to pray.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-3xl font-bold mb-4">
                🎓 CONGRATULATIONS! 🎉
              </p>
              <p className="text-xl mb-3">
                You have completed "Studying for Service"
              </p>
              <p className="text-lg mb-2">
                May God bless you and anoint you as you minister His Word!
              </p>
              <p className="text-lg font-semibold mt-4">
                Remember: The more you know your text, the more people will know their God!
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

