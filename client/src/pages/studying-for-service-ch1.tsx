import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh1() {
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
                  <span className="align-middle">Chapter 1: Know Your Text</span>
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
              src="/studying-for-service-ch1.mp3"
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
              📚 STUDYING FOR SERVICE INTRODUCTION
            </h2>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-900">"Study to show thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth."</p>
              <p className="text-sm mt-2 text-blue-700">— 2 Timothy 2:15</p>
            </blockquote>

            <p className="mb-4">
              This scripture deals with a few points we need to understand. First, the reason why we study is because we are supposed to please God and care about approval from Him and not from man. Second, we are supposed to never be ashamed of the Gospel; we should preach it to anyone, anytime, anyplace. Third, we are to rightly divide the Word of God, meaning we are to quote and use Scriptures in context; we are to know the Word so much so that we are able to defend the faith, explain the faith, and minister properly the Word of truth so that people will be able to understand it from ages 8 to 80.
            </p>

            <p className="mb-4">
              Sadly, many ministers are not doing this. Maybe because they are not studying properly—because they get too caught up in other responsibilities in the ministry. They need to understand this is the most important part of their service to God: to feed the sheep. A good shepherd always has treats in his shepherd's bag. Maybe it is because they simply are not men of the Word—what I mean by not men of the Word is they do not read the Word on a daily basis to feed themselves; they just read when they need a sermon. The problem with this is because they are limited in their knowledge of the Bible, they cannot give others knowledge because they are limited themselves. This is why God rebuked the priests in the prophet Hosea's day and told them:
            </p>

            <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-800 my-6 bg-red-50 p-4 rounded">
              <p className="font-semibold text-red-900">"My people are destroyed for lack of knowledge: because thou hast rejected knowledge, I will also reject thee, that thou shalt be no priest to me: seeing thou hast forgotten the law of thy God, I also will forget thy children"</p>
              <p className="text-sm mt-2 text-red-700">— Hosea 4:6</p>
            </blockquote>

            <p className="mb-4">
              I don't know about you, but I definitely don't want to be rejected as God's minister, and I don't want my children to miss out on any blessing because of my laziness toward His Word or laziness to tend to His sheep properly.
            </p>

            <p className="mb-4">
              I believe this is why our Master told us something very important when He defeated the enemy in the desert. Jesus said:
            </p>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p className="font-semibold text-green-900">"It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God"</p>
              <p className="text-sm mt-2 text-green-700">— Matthew 4:4</p>
            </blockquote>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">💡 KEY INSIGHT</p>
              <p className="text-gray-800">
                The key word there is <strong>EVERY</strong> word. We need to want every word of God in our lives. The more we know, the more the people will know, because you can't give someone something you don't have.
              </p>
            </div>

            <p className="mb-4">
              Recently I was in a pastors' meeting where this topic was discussed about the importance of the Word in our lives on a daily basis. A few months after this meeting one minister from California said, "Anthony, my life has changed ever since that meeting. It changed the way I even breathe. It's changed me and my ministry has changed because I have been in the Word on a daily basis." Another minister from New Jersey said, "Anthony, I never realized how much stuff I didn't know until I started reading every day."
            </p>

            <p className="mb-4 font-semibold text-blue-900">
              So, in short, you're truly not going to receive the fullness of God's Word until you start reading God's Word.
            </p>

            <p className="mb-4">
              The reason why I am stressing this so much is because you can read this book and a hundred others, but if you don't make a decision to get in the Holy Book on a daily basis, you will never operate in the fullness of the anointing that God wants you to operate in.
            </p>

            <p className="mb-4">
              This book is going to cover ways to study the Bible on a few different levels. It will help you learn how to get in depth and also how to make a sermon memorable and meaningful to yourself and the ones you minister to so we can truly be approved by God. We need to remember it's really not so much about what you say as it is about how you say it. This book is going to help you say it in such a way that it will be exciting. Think about this: if your sermon doesn't excite you, it's probably not going to excite them.
            </p>

            <p className="mb-4">
              I have seen many ministers preach a word out of context, without other solid references to back up what they were saying, and sermons that just didn't go anywhere because they didn't have any structure—no points and no application to apply the words they said. This is because of a lack of education in ministry and teachers that have not trained them properly because either they were limited in the knowledge of God's Word themselves or they did not want to hurt their student's feelings, so they never gave constructive criticism.
            </p>

            <p className="mb-4">
              I remember when I was in Bible school training to be a pastor, there was a time I had to go up and minister in front of a group of pastors and teachers from the school. Their job was to critique the students after they were done sharing a word. After I finished preaching they pointed out so many mistakes in my preaching that I had second thoughts about whether I was even called to preach God's Word. As time went on, though, I realized if they wouldn't have pointed out the mistakes I would have never learned from them, and I would never have learned to minister properly. So, I thank God for the correction they gave me. The Bible says that if a man doesn't take correction he is stupid (Proverbs 12:1). So thank God I took correction—and plenty of it. I graduated after over two years of training and received my pastor's license under the Church of God, International, Cleveland, TN.
            </p>

            <p className="mb-4">
              I have had the privilege of serving under some incredible and anointed ministers. I sat under a pastor for three years who was a preaching machine. He was the type of minister that screamed, jumped, walked on the pews, sang, and ran around. I also sat under my other pastor for another three years who was a teaching pastor. I mean this man never left the pulpit and his whole sermon was on paper—every word. I thank God because through these pastors that God put in my life I have learned how to preach and teach. I have been very fortunate to have these awesome opportunities that many people never have a chance to experience. And because of this I want to share the things that I have been taught with other ministers. I am not saying I know everything there is to know; I am growing every day. But what I do know I have a desire to share with others so together we will minister more effectively for the glory of our God.
            </p>

            <p className="mb-6 font-semibold">
              Please pray that God will give you wisdom to receive the fullness of the information in this book because Jesus is our true teacher.
            </p>

            <h2 className="text-3xl font-bold text-blue-900 mt-8 mb-6">
              📖 CHAPTER 1: KNOW YOUR TEXT
            </h2>

            <p className="mb-4 text-lg font-semibold text-blue-800">
              Before you can get in depth in your preaching you first must know your text.
            </p>

            <p className="mb-4">
              What do I mean when I say know your text? It simply means familiarize yourself with the story you are preaching. This is important because you don't want to misquote the Word or add or subtract from the Word; you want to stay in context. Also, let's say the story you are preaching or teaching about has a lot of verses to do with the story; instead of reading a lot of verses you can just read the major verses that have to do with the preaching and reference the rest by verbally telling the people what was going on in the text. Let's say I was preaching on Lazarus (John 11:1–46). Instead of reading all 46 verses that had to do with the story of Lazarus, I'll just read maybe four to ten verses and tell people the rest of the story. In school I learned you should only read ten to twelve verses max because you don't want people to drift off while you're reading. A good way of preventing this is to read a few verses then verbally tell them the rest of the story in regards to whatever you are preaching.
            </p>

            <p className="mb-4">
              In order to tell the story accurately, make sure you read the story a few times so it can sink into your heart, mind, and spirit. I want to show you a few ways to prevent preaching out of context and knowing the fullness of the text.
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🔍 THE FIVE W'S: WHAT, WHERE, WHEN, WHY, AND WHO
            </h3>

            <div className="space-y-4 ml-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="font-bold text-green-900 mb-2">1. WHAT</p>
                <p className="text-gray-800">
                  <strong>What was going on in the text?</strong> Let's say in John 11. Lazarus was sick and then died. Jesus purposely let Lazarus die so He could raise him up again. Mary and Martha, Lazarus' sisters, were mourning over the death of their brother.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-bold text-blue-900 mb-2">2. WHERE</p>
                <p className="text-gray-800">
                  <strong>Where were they?</strong> In a city called Bethany about two miles away from Jerusalem; also, they went to the tomb site where Lazarus was buried.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="font-bold text-purple-900 mb-2">3. WHEN</p>
                <p className="text-gray-800">
                  <strong>When did this happen?</strong> There are a few ways you can answer this question. It was four days after Lazarus died; it was a time that the Jews wanted to capture Jesus; or you can say it was between the years of 28 A.D. and 31 A.D. Then talk about how it was a different time: no big hospitals, no electricity, no air conditioning, or strong pain medication to comfort a dying Lazarus.
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <p className="font-bold text-orange-900 mb-2">4. WHY</p>
                <p className="text-gray-800">
                  <strong>Why did this happen?</strong> Lazarus was sick and nothing they tried worked. Or you could say why Jesus didn't answer Mary and Martha's request for Jesus to come heal Lazarus was because He wanted to give them not just a healing but a miracle. Or you can say why people die is because sin came in the world and that is one of the consequences of a sin-fallen world, but thank God Jesus showed up as the resurrection and the life.
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="font-bold text-red-900 mb-2">5. WHO</p>
                <p className="text-gray-800">
                  <strong>Who was the text talking about?</strong> Jesus, the disciples, Lazarus, Martha, Mary, and the people that were there during the mourning of Lazarus.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⚠️ STAY IN CONTEXT
            </h3>

            <p className="mb-4 font-semibold text-red-800">
              Make sure you're not trying to make the Scripture say something it's really not.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">❌ COMMON MISTAKE</p>
              <p className="text-gray-800 mb-2">
                I heard some ministers say that Jesus had to say Lazarus' name when He came to the tomb because if He would have just said "arise," all the dead would have been resurrected. There's a problem there because the Bible doesn't say this. Also, in that time period Lazarus was a very common name. If this was true, why didn't all the Lazaruses that were dead come back to life?
              </p>
              <p className="text-gray-800 italic">
                It sounds good, but it's not a biblical fact.
              </p>
            </div>

            <p className="mb-4">
              Let's say you're going to preach a textual sermon. This is the kind of sermon where you are not just using one text or one story but you are using many Scriptures from many different books of the Bible to prove your topic. If you were preaching on faith, then you would look for Scriptures and stories that had to do with faith. We have to make sure we are not misquoting God's Word. So when you look up those Scriptures make sure you do not take them out of context and you are not making them say something they are not.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">💭 EXAMPLE: PHILIPPIANS 4:19</p>
              <p className="text-gray-800 mb-2">
                Right now, if you can, quote out loud Philippians 4:19. Now read it: "And my God shall supply all your need according to His riches in glory by Christ Jesus." You probably said "my God shall provide all MY needs." You see, the apostle Paul said "my God shall supply all YOUR needs."
              </p>
              <p className="text-gray-800 mb-2">
                The reason why he said this is because if you read the whole book or letter addressed to the Philippians you will see the apostle Paul commending them on giving to the ministry and sending people to help with the ministry from their church, and he commends them on their love and generosity. After he does that, then he says this verse.
              </p>
              <p className="text-gray-800 font-semibold">
                We have to explain to people the fullness of the Scriptures in context, not out of context.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">✅ HOW TO EXPLAIN IT IN CONTEXT</p>
              <p className="text-gray-800">
                "Paul the apostle was speaking about them and not himself in this verse. The reason people are not being provided for is because we get greedy and we don't want to sacrifice our time, talents, and resources for God's glory, but until we start loving, giving, and start sacrificing like the Philippians, all our needs will not be provided for." It's time to be selfless and not selfish. Then and only then will God provide all of your needs.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">💭 EXAMPLE: ISAIAH 54:17</p>
              <p className="text-gray-800 mb-2">
                Quote Isaiah 54:17 out loud. Now let's read it: "No weapon formed against you shall prosper, and every tongue which rises against you in judgment you shall condemn. This is the heritage of the servants of the LORD, and their righteousness is from Me," says the LORD.
              </p>
              <p className="text-gray-800 mb-2">
                Weapons are formed and they prosper in a lot of people's lives. Why is this if this Scripture clearly says that it will be formed but it will not prosper? Because we look at a verse and we quote the part we like without realizing the fullness of the Scripture.
              </p>
              <p className="text-gray-800 font-semibold">
                The word heritage in this verse is another word for benefit. This means this promise is a benefit and only applies to the people who are true servants of the LORD.
              </p>
            </div>

            <p className="mb-4 font-semibold text-gray-800">
              So whether it's a story or a verse, make sure it's in context.
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              📚 READ, READ, AND READ AGAIN
            </h3>

            <p className="mb-4">
              The most important thing, after you have answered the Five W's and know you are in context, is to read the story or the chapter over and over until you can tell the complete story or reference the whole chapter without reading it.
            </p>

            <p className="mb-4">
              Some ministers read a few verses and then preach it—without realizing if they would have read and known the text better, it could have added so much more to the preaching. A good way of not making this mistake is to read the whole chapter of the story you are ministering on, but also read the chapters before and after the main chapter.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">📖 PRACTICAL TIP</p>
              <p className="text-gray-800">
                For instance, if you were preaching on John 11, also see what was going on in John 9–10 and John 12 to see if you can add more to the story you are preaching. Like in John 12 the Bible says that Lazarus and his sisters made Jesus a dinner, and as Jesus was reclining at the table, Mary anointed Jesus with a very expensive perfume (John 12:1–4).
              </p>
            </div>

            <p className="mb-4">
              When you study, remember we are studying for our Savior's service, so take your time and read and know your text. If you have ever read John 11, have you noticed John 11:35? It says only two words; as a matter of fact, it is the shortest verse in the Bible: "Jesus wept."
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">💎 HIDDEN GEM</p>
              <p className="text-gray-800">
                The reason why He wept is because of their unbelief, their ignorance, and because He loved His friend. You can preach a whole sermon on that one verse with two words. It's one of the most powerful Scriptures to preach if you understand the seriousness of the text that it's in.
              </p>
            </div>

            <p className="mb-4">
              Most people miss that fact because they are in too big of a rush to get through with studying. Take your time and read your Word. Know your text, because the more you know your text the more people will know their God.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

