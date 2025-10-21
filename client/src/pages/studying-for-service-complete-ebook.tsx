import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2, Download } from "lucide-react";

export default function StudyingForServiceCompleteEbook() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const downloadPDF = () => {
    // Will add PDF link when available
    alert('PDF download will be available soon');
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    { id: 1, title: "Chapter 1: Know Your Text", audioUrl: "/studying-for-service-ch1.mp3" },
    { id: 2, title: "Chapter 2: Notice the Names", audioUrl: "/studying-for-service-ch2.mp3" },
    { id: 3, title: "Chapter 3: Look at the Places", audioUrl: "/studying-for-service-ch3.mp3" },
    { id: 4, title: "Chapter 4: The Numbers Game", audioUrl: "/studying-for-service-ch4.mp3" },
    { id: 5, title: "Chapter 5: Dig Deeper (Greek and Hebrew)", audioUrl: "/studying-for-service-ch5.mp3" },
    { id: 6, title: "Chapter 6: Pictures and Parables", audioUrl: "/studying-for-service-ch6.mp3" },
    { id: 7, title: "Chapter 7: Illustrations", audioUrl: "/studying-for-service-ch7.mp3" },
    { id: 8, title: "Chapter 8: Application", audioUrl: "/studying-for-service-ch8.mp3" },
    { id: 9, title: "Chapter 9: How to Make a Sermon", audioUrl: "/studying-for-service-ch9.mp3" },
    { id: 10, title: "Chapter 10: Balance", audioUrl: "/studying-for-service-ch10.mp3" },
    { id: 11, title: "Chapter 11: Personal Testimony", audioUrl: "/studying-for-service-ch11.mp3" },
    { id: 12, title: "Chapter 12: Conclusion", audioUrl: "/studying-for-service-ch12.mp3" }
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
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              ✍️ CHAPTER 2: NOTICE THE NAMES
            </h2>

            <p className="mb-4 text-lg">
              Now, since you've studied and familiarized yourself with the text, you can start getting in-depth. One of the ways I like doing this is looking at the meaning of the names in the original language.
            </p>

            <p className="mb-4">
              Look what Isaiah says.
            </p>

            <p className="mb-4">
              Isaiah 43:1 "But now, thus says the LORD, who created you, O Jacob, and He who formed you, O Israel: 'Fear not, for I have redeemed you; I have called you by your name; you are Mine.'"
            </p>

            <p className="mb-4">
              Isaiah 45:4 "For Jacob My servant's sake, and Israel My elect, I have even called you by your name; I have named you, though you have not known Me."
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              🎯 GOD CALLS US BY NAME
            </h3>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">💡 KEY INSIGHT</p>
              <p className="text-gray-800">
                This means that before we were born God picked a name out for us and the name He has given us is for a reason. In Bible times the people would name their children based on what they would wish for their children or what they would want them to become.
              </p>
            </div>

            <p className="mb-4">
              Many people named their children Jesus in New Testament times because they believed that the Messiah was going to come in their time, so they would name a lot of their sons Jesus because it means "Jehovah is salvation." Christ means anointed. So if you put His name together it means anointed Savior.
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🔍 BIBLE CODE: ADAM TO NOAH
            </h3>

            <p className="mb-4 font-semibold text-green-800">
              I'll prove to you that God speaks through the names. Let's look at some of the names from Adam to Noah and let's look at the meanings of their names. This series of names gives us insight to the future coming of the Messiah, Jesus the Christ.
            </p>

            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200 my-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">Adam</p>
                  <p className="text-sm text-gray-700">a man</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">Seth</p>
                  <p className="text-sm text-gray-700">is appointed</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">Enosh</p>
                  <p className="text-sm text-gray-700">a natural man</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">Kenan</p>
                  <p className="text-sm text-gray-700">of sorrow</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">Mahalalel</p>
                  <p className="text-sm text-gray-700">The Blessed God</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">Jared</p>
                  <p className="text-sm text-gray-700">shall come down</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">Enoch</p>
                  <p className="text-sm text-gray-700">teaching</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">Methuselah</p>
                  <p className="text-sm text-gray-700">his death shall bring</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">Lamech</p>
                  <p className="text-sm text-gray-700">the grieving</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <p className="font-bold text-green-900">Noah</p>
                  <p className="text-sm text-gray-700">rest</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded">
                <p className="font-bold mb-2">📖 THE HIDDEN MESSAGE:</p>
                <p className="italic">"A man is appointed, a natural man of sorrow. The Blessed God shall come down teaching. His death shall bring the grieving rest."</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">✨ AMAZING!</p>
              <p className="text-gray-800">
                It's like Bible code. It's awesome. As a matter of fact, in all 70 to 80 names in the genealogy of Jesus you will see a whole story of the things that happened in the Old Testament and they all point to Jesus, just like the above chart from Adam to Noah all point to and prophesy about Jesus.
              </p>
            </div>

            <p className="mb-4 font-semibold text-gray-800">
              Remember that when you want to pass all those names up in the Bible that you might say is boring. God has put them there for a reason. And it's our job to study and investigate so we can get the fullness of the Scripture and also apply it to our teachings.
            </p>

            <p className="mb-4">
              Now, since you see God uses names, it's time for you to notice the names when you're studying. I want to show you how you can use the names and their meanings in a sermon. Looking at John chapter 11, in the story of Lazarus Jesus went and helped him and his sisters. Look what their names mean:
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              💎 USING NAMES IN YOUR SERMON
            </h3>

            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 my-6">
              <p className="font-bold text-red-900 mb-3">📖 EXAMPLE: JOHN 11 - LAZARUS</p>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-red-900">Lazarus</p>
                  <p className="text-gray-700">= whom God helps</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-red-900">Martha</p>
                  <p className="text-gray-700">= she was rebellious</p>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="font-bold text-red-900">Mary</p>
                  <p className="text-gray-700">= rebellious, rebellion, bitter, rebels</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 HOW TO PREACH IT:</p>
              <p className="text-gray-800 italic">
                "Sometimes in the midst of our problems we can get rebellious and bitter because of things that we feel have died or that we missed out on, but God helps His people! And He's telling you in your situation, roll the stone away (the stubbornness) because I want to raise up that dead situation and help you in your time of need!"
              </p>
            </div>

            <p className="mb-4">
              Let's look at another famous story in the Bible. Have you ever heard of Shadrach, Meshach, and Abed-nego? Well, those weren't their real names. Daniel 1:6–7 says, "Now from among those of the sons of Judah were Daniel, Hananiah, Mishael, and Azariah. To them the chief of the eunuchs gave names: he gave Daniel the name Belteshazzar; to Hananiah, Shadrach; to Mishael, Meshach; and to Azariah, Abed-Nego." When Israel was invaded by the Babylonians they took certain men from among the Hebrews and appointed them to serve in Babylon. Some of the men they used were the three famous men we know as Shadrach, Meshach, and Abed-nego. Their real names, however, were Hananiah, Mishael, and Azariah.
            </p>

            <p className="mb-4">
              Shadrach, Meshach, and Abed-nego were names given to them by the enemy. They all represent worldly wisdom and false religion to false gods. Now if you know the story, they were thrown in the fire for not bowing down to a false religion and a false god. Because of their obedience to God, they were protected by God and they came out without being harmed. They even got promoted and the king realized that no other god could deliver like the God of Hananiah, Mishael, and Azariah (Daniel 3).
            </p>

            <p className="mb-4">
              Remember what Hananiah's, Mishael's, and Azariah's names meant? Now look how I connected the definitions of their names to my preaching. I preached this sermon and I said something like this:
            </p>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              🔥 SHADRACH, MESHACH, AND ABED-NEGO
            </h3>

            <div className="bg-orange-50 p-4 rounded-lg my-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                  <p className="font-bold text-blue-900 mb-2">HEBREW NAMES (Real Names)</p>
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold text-blue-800">Hananiah</p>
                      <p className="text-sm text-gray-700">= God has favored</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">Mishael</p>
                      <p className="text-sm text-gray-700">= who is what God is</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">Azariah</p>
                      <p className="text-sm text-gray-700">= Jehovah has helped</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <p className="font-bold text-red-900 mb-2">BABYLONIAN NAMES (Enemy's Labels)</p>
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold text-red-800">Shadrach</p>
                      <p className="text-sm text-gray-700">= false god's name</p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-800">Meshach</p>
                      <p className="text-sm text-gray-700">= false god's name</p>
                    </div>
                    <div>
                      <p className="font-semibold text-red-800">Abed-Nego</p>
                      <p className="text-sm text-gray-700">= servant of false god</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">🎤 HOW TO PREACH IT:</p>
              <p className="text-gray-800 italic mb-3">
                "The enemy will try to label you, and the enemy will get others to label you, and people might call you garbage, no good, drug addict, adulteress, and drunk—but no matter what they call you and no matter how much the enemy will tempt you, don't bow down to the enemy."
              </p>
              <p className="text-gray-800 italic">
                "The enemy tried to label and change the names of Hananiah, Mishael, and Azariah, but it didn't work. They didn't bow down no matter what happened, they didn't give in, they didn't give up, and they didn't let go of the promises of God! And if you do the same like the three faithful Hebrew men and not bow to the things of the world, the enemy might label you but he can never change the character God has made you. When you apply God's Word people will see God's favor upon [Hananiah] you, they will see how God has helped you [Azariah], and they will see God in you [Mishael]."
              </p>
            </div>

            <p className="mb-4">
              You can even connect it like this:
            </p>

            <p className="mb-4">
              Hananiah = "God has favored." God promoted them and showed them favor with the king after they got out of the fiery furnace.
            </p>

            <p className="mb-4">
              Mishael = "who is like God?" When the king looked in the furnace he said, "I thought we threw in three, but now there are four, and one looks like the son of God." God wants people to see Jesus in the midst of your fiery trials.
            </p>

            <p className="mb-4">
              Azariah = "Jehovah has helped." God helped them and took them out of harm's way. And He wants to do the same for you.
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              ⚡ THE ARK OF THE COVENANT STORY
            </h3>

            <p className="mb-4">
              One of my favorite sermons to preach is found in 2 Samuel 6. The scene in the story is King David bringing back the Ark of the Covenant to the city of Jerusalem. As David was bringing back the Ark he placed it on a new cart and brought it from the house of a man by the name of Abinadab. Something happened.
            </p>

            <p className="mb-4">
              As they were dancing and playing music the oxen that were pulling the cart stumbled and the Ark almost tipped over, so a man by the name of Uzzah leaned in to grab the Ark and as soon as he touched it he died. So the music stopped as well as the rejoicing. Then David went home angry and discouraged, and the Ark went to the house of a man by the name of Obed-Edom, and the Bible says God blessed him.
            </p>

            <p className="mb-4">
              Why would this happen?
            </p>

            <div className="ml-6 mb-4">
              <p className="mb-2">1. The Ark was supposed to be carried by priests, not on a cart. Sometimes we try to bring God's presence the easy way.</p>
              <p className="mb-2">2. No one was ever supposed to touch the Ark. You can't touch God's glory.</p>
              <p className="mb-2">3. Obed-Edom knew both of these things.</p>
            </div>

            <p className="mb-4">
              Let's look at their names and see if we can connect them to get an understanding:
            </p>

            <div className="bg-purple-50 p-4 rounded-lg my-6">
              <p className="font-bold text-purple-900 mb-3">📖 THE NAMES:</p>
              <div className="space-y-2">
                <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                  <p className="font-bold text-purple-900">Abinadab</p>
                  <p className="text-gray-700">= the father is willing</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                  <p className="font-bold text-purple-900">Uzzah</p>
                  <p className="text-gray-700">= strength</p>
                </div>
                <div className="bg-white p-3 rounded border-l-4 border-purple-500">
                  <p className="font-bold text-purple-900">Obed-Edom</p>
                  <p className="text-gray-700">= servant or worshipper</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 HOW TO CONNECT IT:</p>
              <p className="text-gray-800 italic">
                "Our Father in heaven is willing to bless us with His presence, but sometimes we try to cut corners to get it. We lean on our own strength and when we do this we will die spiritually no matter how much you dance and sing. The only way you will be blessed with the fullness of God's presence is when you are a true servant that worships God in spirit and in truth."
              </p>
            </div>

            <p className="mb-4">
              One more quick example. 1 Chronicles 4:10: "And Jabez called on the God of Israel saying, 'Oh, that You would bless me indeed, and enlarge my territory, that Your hand would be with me, and that You would keep me from evil, that I may not cause pain!' So God granted him what he requested." Jabez = sorrow. Basically, you have a guy whose name means sorrow. But he starts asking, confessing, blessing, and proclaiming instead of complaining, and he receives God's blessing. You can connect it like this: When we pray we should pray like Jabez prayed. He basically said, "Bless me not just to get through but bless me so I can get through and help others get through. Help me go more places and spread the Gospel than I ever have. May your hedge of protection be upon me and that you would keep me from falling into evil temptations and that I would not hurt or hinder anyone." When you pray like that with all your heart God will answer you and your sorrow will turn into joy!
            </p>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              🙏 THE PRAYER OF JABEZ
            </h3>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              👶 A PERSONAL STORY: MADISON ABIGAIL
            </h3>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-3">
                Speaking of joy, I'll give you a personal story about the seriousness of God using names. When my daughter Madison Abigail Lee was born on May 6th, I was reading a book about interpreting dreams and visions. In one of the chapters the author mentions a man named Agabus, a prophet who prophesied a famine. Because of this the disciples were prepared (see Acts 11).
              </p>
              <p className="text-gray-800 mb-3">
                After I read my book I sat down to read my daily reading of my Bible. Well, to my surprise my daily reading was Acts 11. So again I'm reading about this prophet named Agabus. Confirmation, I said. Then I began to ask God, what are you trying to show me?
              </p>
              <p className="text-gray-800 mb-3">
                As soon as I was saying this my wife sent me a picture of our daughter to my phone. I saw the picture and the Spirit of God spoke to me and said Agabus and Abigail mean the same thing. So I checked it out. Their names both mean "the father's joy."
              </p>
              <p className="text-gray-800 font-semibold">
                God encouraged me and said, "I'm going to use Abigail for my glory and she's going to bring joy to me and you."
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-2xl font-bold mb-2">
                ✍️ NOTICE THE NAMES 📖
              </p>
              <p className="text-lg">
                Start noticing the names and it will help unlock the Word for God's glory.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">📚 RESOURCE TIP</p>
              <p className="text-gray-800">
                To find out how to search the names in the Bible, check the resource page in the back of this book.
              </p>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              🏙️ CHAPTER 3: KEEP THE CITIES IN SIGHT
            </h2>

            <p className="mb-4 text-lg">
              In this chapter I want to show you the importance of looking up the meanings of the cities in the text and how to apply it to a sermon.
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              🙏 THE CITY OF JUDAH
            </h3>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">📍 JUDAH</p>
              <p className="text-gray-800 mb-2">Meaning: "He shall be praised" or "praise"</p>
            </div>

            <p className="mb-4">
              One of the famous cities ministers teach about is Judah, because Judah means "He shall be praised" or "praise." It's awesome how many ways you can connect Judah to a teaching; you can say things like:
            </p>

            <div className="bg-yellow-50 p-4 rounded-lg my-6">
              <ul className="list-disc ml-6 space-y-2 text-gray-800">
                <li>You have to build your house in praise!</li>
                <li>You have to praise Him no matter what!</li>
                <li>When you praise you will destroy the work of the enemy!</li>
                <li>You need to have a praise party, not a pity party!</li>
              </ul>
            </div>

            <p className="mb-4 font-semibold text-blue-800">
              That's all true, but there's more. Let's look deeper.
            </p>

            <p className="mb-4">
              The book of Micah teaches us that the city of Bethlehem has a prophetic significance to it. Micah 5:2 states, "But you, Bethlehem Ephrathah, though you are little among the thousands of Judah, yet out of you shall come forth to Me the One to be Ruler in Israel, whose goings forth are from of old, from everlasting."
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🍞 BETHLEHEM - THE HOUSE OF BREAD
            </h3>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">📍 BETHLEHEM</p>
              <p className="text-gray-800 mb-2">Meaning: "house of bread"</p>
              <p className="text-gray-800">
                Jesus was born in the city Bethlehem. In John chapter 6 Jesus said He is the bread of life, the manna. God sent His Son to bring us this manna from heaven so we can be fed and nurtured by His Word. It is no coincidence that God set it up so He could be born in the city whose name means house of bread.
              </p>
            </div>

            <p className="mb-4">
              In John chapter 11 Lazarus lived in the city of Bethany. Bethany means the "house of dates" or "house of misery." You can connect and say something like, "Jesus entered into a miserable situation and changed the atmosphere by resurrecting a dead situation. And He wants to do the same for you. Why? So you can be a witness and bear fruit for His glory [house of dates]."
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⚰️ BETHANY - HOUSE OF MISERY
            </h3>

            <p className="mb-4">
              When Jesus was getting the disciples together something happened when it came time to call Nathanael. "Philip found Nathanael and said to him, 'We have found Him of whom Moses in the law, and also the prophets, wrote—Jesus of Nazareth, the son of Joseph.' And Nathanael said to him, 'Can anything good come out of Nazareth?' Philip said to him, 'Come and see'" (John 1:45–46).
            </p>

            <p className="mb-4">
              Why would Nathanael say this? When you look up the definition for Nazareth in the Greek it means "the guarded one." In this case you really can't make sense out of it, so what you would have to do is find out the problem by looking up a little history about Nazareth. I did a search on Nazareth and found the following thought: it was not that Nazareth was a completely bad place that made Nathanael say what he said. It was hardly a town at all—just a dip of a town, literally. Nazareth was hidden in a large dip eroded into a ridge off the beaten trail. In Jesus' day, it didn't measure more than nine hundred by two hundred yards—and most of that was empty fields for farming or grazing. The closest the Old Testament comes to mentioning Nazareth is in a prophecy that must have seemed absolutely unrelated to Jesus' hometown: "Out of the stump of David's family (Jesse, the father of King David) will grow a shoot—yes, a new Branch bearing fruit from the old root" (Isaiah 11:1). Nazareth seems to come from the Hebrew word that means "branch or shoot."
            </p>

            <p className="mb-4">
              So, after checking on the name for Nazareth and finding out some history, now we can connect it to a sermon. You could say something like this: "Nathanael didn't know that Jesus was born in Bethlehem. He thought He was originally from Nazareth, a place barely seen on the map, a place where there were empty fields and just another place that was passed by to get to where you really needed to be. Like Nathanael, we judge people from where they came from and who their family is, or we look at their surroundings and automatically assume: What good can come from this person, or what can they possibly do for God or for me? Don't judge a person but embrace them with God's love and you will see that they will become a branch attached to the Vine, Jesus Christ, to bear Him fruit."
            </p>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              🌿 NAZARETH - THE BRANCH
            </h3>

            <p className="mb-4">
              There is another story in the Bible where you have to do some research on the city to truly understand the text. It's found in Mark chapter 8. People brought a blind man to Jesus to be healed. Sounds like a common story, but Jesus did something that made me wonder and caused me to find out some information about the city Bethsaida.
            </p>

            <p className="mb-4">
              Mark 8:22–26: "Then He came to Bethsaida; and they brought a blind man to Him, and begged Him to touch him. So He took the blind man by the hand and led him out of the town. And when He had spit on his eyes and put His hands on him, He asked him if he saw anything. And he looked up and said, 'I see men like trees, walking.' Then He put His hands on his eyes again and made him look up. And he was restored and saw everyone clearly. Then He sent him away to his house, saying, 'Neither go into the town, nor tell anyone in the town.'"
            </p>

            <p className="mb-4">
              There is so much to this story—this was the first sermon I preached when I became a pastor. But for now I want to focus on why Jesus brought the man out of the city. Bethsaida means "house of fish." One of the root words for Bethsaida means a few different things: household, home, within temple, prison, place, family, families, and dungeon. Looking at this definition and reading the following Scripture you will understand why Jesus took the blind man out of the city:
            </p>

            <p className="mb-4">
              Matthew 11:20–21: "Then He began to rebuke the cities in which most of His mighty works had been done, because they did not repent: 'Woe to you, Chorazin! Woe to you, Bethsaida! For if the mighty works which were done in you had been done in Tyre and Sidon, they would have repented long ago in sackcloth and ashes.'"
            </p>

            <p className="mb-4">
              You see, the people of Bethsaida were unbelieving, doubtful, stubborn, and unwilling to repent. And because of this, Jesus cursed the city of Bethsaida. When I was in Israel a few years ago a tour guide told me that in the city of Bethsaida nothing grows there still to this day.
            </p>

            <p className="mb-4">
              You can connect it in a sermon by saying something like this: "God wants to open your eyes to all that He has for you, but you have to allow Him to take you out of the prison, the bondage, the doubt, and the cursed life you're in, because God can't bless you if you're not willing to step out of disobedience. The Bible says if you're disobedient you're living a cursed life, but Jesus wants to lead you out! Let Him take you to the place of vision for your life, and when He takes you there don't allow yourself to go back into your disobedience, because if you do you'll never grow in God."
            </p>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              🐟 BETHSAIDA - THE CURSED CITY
            </h3>

            <p className="mb-4">
              I preached a message based on Deuteronomy 1:1–8. It was called "Enough Is Enough."
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              ⛰️ KADESH-BARNEA - HOLY & SHAKEN
            </h3>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">📖 DEUTERONOMY 1:1–8 - "ENOUGH IS ENOUGH"</p>
              <p className="text-gray-800 mb-3">
                God told Moses to tell the people they stood in one place long enough. One of the cities they were by was called <strong>Kadesh-barnea</strong>.
              </p>
              <p className="text-gray-800 mb-2">
                <strong>Definition:</strong> "holy"
              </p>
              <p className="text-gray-800">
                If you want to go where God wants you to be you have to live a holy life. You have to allow Him to shake you.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">🔍 ROOT WORD FOR "HOLY":</p>
              <p className="text-gray-800 mb-2">
                To quiver, totter, shake, reel, stagger, move, sift, waver, tremble, vibrate, be unstable, to be tossed about or around, to toss about, disturb, to cause to wander.
              </p>
              <p className="text-gray-800 font-semibold">
                The very definition of an earthquake!
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 THE APPLICATION:</p>
              <p className="text-gray-800 italic">
                "We have to let God take the world and its desires out of our lives and allow His presence in every area of our lives, because at God's presence the earth shakes. Let Him shake the world out of you!"
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-2">⚡ AMAZING TESTIMONY</p>
              <p className="text-gray-800 mb-2">
                The interesting part of this story is I was scheduled to preach this message on August 24, 2011, in Washington, D.C. While I was there the day before, getting ready to fellowship with the other ministers who were there for the services, something happened that brought a prophetic point to this same sermon I was about to preach.
              </p>
              <p className="text-gray-800 font-semibold">
                An earthquake hit Washington, D.C. on August 23, 2011—Virginia and the surrounding states were hit with a 5.8 magnitude earthquake. I can't tell you how awesome that service was the next day when I brought up the definition for Kadesh-barnea.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-2xl font-bold mb-2">
                🏙️ KEEP THE CITIES IN SIGHT 📖
              </p>
              <p className="text-lg">
                When studying for a sermon, keep the cities in sight because you never know what God can do through this awesome technique.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">📚 RESOURCE TIP</p>
              <p className="text-gray-800">
                To find out how to search the cities in the Bible, check the resource page in the back of this book.
              </p>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              🔢 CHAPTER 4: NUMBERS ADD UP
            </h2>

            <p className="mb-4 text-lg">
              In this chapter I want to look at numbers that are found in almost every text—whether they be about the numbers of days or the age of a person or the numbers of people in a certain group. You will always come across numbers, and I have found that they can really add a great deal to a sermon. The following information is from a website called C.A.R.M., Christian Apologetics & Research Ministry. The reason why I want you to read what they have to say about this is because they truly have researched this topic and can break it down better than I can.
            </p>

            <p className="mb-4 font-semibold text-blue-800">
              C.A.R.M. says:
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              📖 WHAT IS BIBLICAL NUMEROLOGY?
            </h3>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-3">
                It seems quite obvious that the Bible uses numbers in patterns. Who can deny that <strong>40</strong> is significant? Jesus was in the desert for 40 days, and the Israelites wandered in the desert for 40 years. Whether or not the analysis of these number patterns is accurate is up for debate. But I present to you this information condensed from the book Number in Scripture by Bullinger.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">💡 INTERESTING FEATURE</p>
              <p className="text-gray-800 mb-2">
                One of the interesting features of Hebrew and Greek is that in both written languages there are no numeric characters. Where we have numbers and letters, they have only letters. So, in each language the letters are also used as numbers. In a small way we do the same thing in English. For example, is "O" a zero or a letter in the alphabet? Is "l" a one or a small L? When they are used, the context tells us which is which and we have no problem understanding it. The same goes for Hebrew and Greek. They knew when they were writing numbers and when they were writing letters.
              </p>
              <p className="text-gray-800 mb-2">
                But the interesting thing is that when a word is written, it also has a numeric equivalent. For example, the word "Jesus" in Greek is "iasous." Since each letter has a numeric equivalent, we can add up each number and get a value. The value is the gammatria. Therefore, the gammatria of "Jesus" in Greek is 888 because i = 10, a = 8, s = 200, o = 70, u = 400, s = 200. There are many interesting 'games' that can be played with this feature of Greek and Hebrew and much of it is absurd. But, some of the numeric relationships are interesting.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">⚠️ IMPORTANT NOTE</p>
              <p className="text-gray-800">
                Like I said they know how to explain it better than I would be able to. Whether or not the numbers really do have a significance is still debated in many circles. The main reason is because some people try to find out the end time dates and year based on Biblical numerology, and we know from the Bible no person knows the time of the end. But you will see in the Bible where numbers play a significant part in a lot of texts. Nevertheless, I present the information for your examination.
              </p>
            </div>

            <p className="mb-4">
              I have been taught by some of my teachers the meanings of Biblical numerology. I have also researched a few websites and I've read many commentaries about Biblical numerology. I have seen a lot of the websites agree about the following numbers and their meanings on the chart below, but most importantly I have matched and aligned it by connecting it to the Word.
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              📊 BIBLICAL NUMBER MEANINGS
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
              {[
                { num: '1', meaning: 'God, Unity; New beginnings' },
                { num: '2', meaning: 'Union; Witnessing' },
                { num: '3', meaning: 'Unity, Divine completeness' },
                { num: '4', meaning: 'Creation; The world' },
                { num: '5', meaning: "Grace; God's goodness" },
                { num: '6', meaning: 'Weakness of man; Sin' },
                { num: '7', meaning: 'Spiritual completeness' },
                { num: '8', meaning: 'New birth; New beginnings' },
                { num: '9', meaning: 'Fruit of the Spirit' },
                { num: '10', meaning: 'Testimony; Law' },
                { num: '11', meaning: 'Disorder and judgment' },
                { num: '12', meaning: 'Governmental perfection' },
                { num: '13', meaning: 'Apostasy; Rebellion' },
                { num: '14', meaning: 'Deliverance; Salvation' },
                { num: '15', meaning: 'Rest' },
                { num: '16', meaning: 'Love' },
                { num: '17', meaning: 'Victory' },
                { num: '18', meaning: 'Bondage' },
                { num: '40', meaning: 'Trials; Testing' },
                { num: '50', meaning: 'Holy Spirit; Pentecost' },
                { num: '70', meaning: 'Universality' },
                { num: '666', meaning: 'Antichrist' },
                { num: '777', meaning: 'Christ' },
                { num: '888', meaning: 'Holy Spirit' },
              ].map((item) => (
                <div key={item.num} className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-2xl font-bold text-blue-900">{item.num}</p>
                  <p className="text-sm text-gray-700">{item.meaning}</p>
                </div>
              ))}
            </div>

            <p className="mb-4">
              Now that I have given you a little information about Biblical numerology let's connect it to the Bible. Let's look at the number four, the number of Creation, the world—North, South, East, West; four seasons. The fourth commandment is the first that refers to the earth. The fourth clause of the Lord's Prayer is the first that mentions the earth. The materials of the tabernacle were four and so were the coverings and the ornamentations.
            </p>

            <p className="mb-4">
              Let's connect it to the story of Lazarus in John chapter 11.
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              4️⃣ THE NUMBER FOUR - CREATION & THE WORLD
            </h3>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">📖 LAZARUS - DEAD FOUR DAYS (John 11)</p>
              <p className="text-gray-800 mb-3">
                In this story Lazarus has been dead for <strong>four days</strong> and on the fourth day Jesus shows up to resurrect him from the dead. After Lazarus rises from the dead, many people believe in Jesus, so Lazarus became a witness to and for the resurrecting power of Jesus.
              </p>
              <p className="text-gray-800">
                Back in those days because of the heat and moisture plus the insects, the body would start to decompose—it would begin to rot.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 HOW TO PREACH IT:</p>
              <p className="text-gray-800 italic">
                "No matter how bad you think your life is falling apart and no matter how bad it is, if you roll the stone away, allow God to remove the things that are blocking you from the resurrecting power of God, He will put the pieces back together. Because before you can see and experience the resurrecting power upon you and your house you have to die to the things of the world. Then you will rise up to be the witness God has called you to be to the world."
              </p>
            </div>

            <p className="mb-4">
              Let's look at another example. Four is the number of the world. It represents man's weakness and helplessness. But 4+1=5 when divine strength is added. We are made perfect in our weakness. The Bible says God's grace is sufficient for us.
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              5️⃣ THE NUMBER FIVE - GRACE & REDEMPTION
            </h3>

            <p className="mb-4">
              Five: the number of grace. Redemption. Israel came out of Egypt five in rank (Exodus 13:18). David picked up five smooth stones to fight Goliath (1 Samuel 17:40). The holy anointing oil was pure and composed of five parts (Exodus 30:23–25).
            </p>

            <p className="mb-4">
              Let's look at a story to connect this number to grace.
            </p>

            <p className="mb-4">
              "Jonathan, Saul's son, had a son who was lame in his feet. He was five years old when the news about Saul and Jonathan came from Jezreel; and his nurse took him up and fled. And it happened, as she made haste to flee, that he fell and became lame. His name was Mephibosheth" (2 Samuel 4:4).
            </p>

            <p className="mb-4">
              Mephibosheth was Jonathan's son, King Saul's grandson. The reason why Mephibosheth's nurse was running and fell was because she just found out that her masters, Saul and Jonathan, were killed in battle and she was afraid for Mephibosheth's life. Back in those days when an enemy would kill a king they would usually take the king's position over and rule the kingdom and they would kill all the remaining male family members of the king so they would not grow up and try to avenge their family's throne. So the nurse knew she had to run and try to save the life of the boy that was only five years old. Something happened, though, when this boy got older in the book of 2 Samuel chapter nine:
            </p>

            <p className="mb-4">
              "One day David asked, 'Is anyone in Saul's family still alive—anyone to whom I can show kindness for Jonathan's sake?' ... His name was Mephibosheth; he was Jonathan's son and Saul's grandson. When he came to David, he bowed low to the ground in deep respect.
            </p>

            <p className="mb-4">
              David said, 'Greetings, Mephibosheth.'
            </p>

            <p className="mb-4">
              Mephibosheth replied, 'I am your servant.'
            </p>

            <p className="mb-4">
              'Don't be afraid!' David said. 'I intend to show kindness to you because of my promise to your father, Jonathan. I will give you all the property that once belonged to your grandfather Saul, and you will eat here with me at the king's table!'
            </p>

            <p className="mb-4">
              Mephibosheth bowed respectfully and exclaimed, 'Who is your servant, that you should show such kindness to a dead dog like me?' ... And Mephibosheth, who was crippled in both feet, lived in Jerusalem and ate regularly at the king's table" (2 Samuel 9:1, 6–8, 13 NLT).
            </p>

            <p className="mb-4">
              You see, King David took the throne of Saul after he died but instead of David looking to kill Saul's family members he was looking to show kindness. Another word for kindness is grace. The reason why David did this was because Jonathan was his best friend and they were really close to each other. One day they made a covenant that when David took the throne he would watch out for Jonathan's family. David kept his word. There is so much insight to this story, like how Mephibosheth's name means "idol exterminator," but we are talking about numbers in this chapter so you're just going to have to study it yourself. Now that we know a little bit about the story of Mephibosheth we can connect the story and the number five to a sermon and say something like this:
            </p>

            <p className="mb-4">
              "Sin came into this world through Adam and Eve and we are still dealing with the consequence of their fall and the only way we can get right is by accepting the invitation of the King of kings to come sit at His table of provision and blessing through His Grace. Maybe you have even fallen because someone hurt you and has dropped you from God. Whatever the reason is the King is calling you back, so destroy those idols in your life and humbly bow to His saving grace and become the servant God has called you to be, even though we truly don't deserve it. But that's what Grace is—something not deserved but given anyway!"
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              5️⃣ THE NUMBER FIVE - GRACE & REDEMPTION
            </h3>

            <p className="mb-4">
              Let's look at another example. Eight: the number of new beginnings—eight people on Noah's ark (2 Peter 2:5); circumcision on the 8th day (Genesis 17:12); God made eight covenants with Abraham.
            </p>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              8️⃣ THE NUMBER EIGHT - NEW BEGINNINGS
            </h3>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">📍 SIGNIFICANCE OF 8</p>
              <ul className="list-disc ml-6 space-y-1 text-gray-800">
                <li><strong>Eight people</strong> on Noah's ark (2 Peter 2:5)</li>
                <li>Circumcision on the <strong>8th day</strong> (Genesis 17:12)</li>
                <li>God made <strong>eight covenants</strong> with Abraham</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">🚢 NOAH'S ARK - EIGHT PEOPLE SAVED</p>
              <blockquote className="text-gray-800 italic mb-3">
                "For if God did not spare the angels who sinned, but cast them down to hell and delivered them into chains of darkness, to be reserved for judgment; and did not spare the ancient world, but saved Noah, <strong>one of eight people</strong>, a preacher of righteousness, bringing in the flood on the world of the ungodly" (2 Peter 2:4–5)
              </blockquote>
              <p className="text-gray-800">
                Noah, his wife, his three sons, and his three daughters-in-law—a total of <strong>eight people</strong>—were the only ones who were saved in the ark. They had to repopulate the earth. It was like the world began all over again. It was a <strong>new beginning</strong>!
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 HOW TO PREACH IT:</p>
              <p className="text-gray-800 italic">
                "Like Noah and his family, when we seek God and do what He says no matter what happens around us God will lift us above the problems of this life and even when Satan comes as a flood if you seek after God's Kingdom and His righteousness, God will raise up a standard against the enemy and you will have new beginnings in your life no matter how far you have fallen and no matter what you've done, God will restore you."
              </p>
            </div>

            <p className="mb-4">
              Let's look at another example. Eighteen: the number representing bondage. The children of Israel were in bondage to their enemies twice for the period of eighteen years. The story of the children of Israel in bondage to the Egyptians is mentioned eighteen times in the Bible. Jesus healed a woman that was bound by the devil eighteen years.
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              🔗 THE NUMBER EIGHTEEN - BONDAGE
            </h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">📍 SIGNIFICANCE OF 18</p>
              <ul className="list-disc ml-6 space-y-1 text-gray-800">
                <li>Children of Israel were in bondage to their enemies <strong>twice for 18 years</strong></li>
                <li>Story of Israel in bondage to Egyptians is mentioned <strong>18 times</strong> in the Bible</li>
                <li>Jesus healed a woman bound by the devil for <strong>18 years</strong></li>
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-2">🙍‍♀️ WOMAN BOUND EIGHTEEN YEARS (Luke 13)</p>
              <blockquote className="text-gray-800 italic mb-3">
                "And behold, there was a woman who had a spirit of infirmity <strong>eighteen years</strong>, and was bent over and could in no way raise herself up. But when Jesus saw her, He called her to Him and said to her, 'Woman, you are loosed from your infirmity.' And He laid His hands on her, and immediately she was made straight, and glorified God. ... 'So ought not this woman, being a daughter of Abraham, whom Satan has bound <strong>eighteen years</strong>, be loosed from this bond on the Sabbath?'" (Luke 13:11–13, 16)
              </blockquote>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">🎤 APPLICATION:</p>
              <p className="text-gray-800 italic">
                "Today maybe you're dealing with bondage and it causes you to put your head down in condemnation, or maybe you're bound by a sickness in your body that the enemy is attacking you with and it's causing you to be depressed. Whatever the situation is Jesus wants to set you free from your bondage! All you have to do is believe it because He has already loosed you from that bondage in your life. Believe it and walk by faith because our God is the same yesterday, today, and forever!"
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-2xl font-bold mb-2">
                🔢 NUMBERS ADD UP 📖
              </p>
              <p className="text-lg">
                The numbers truly add up in a text. All numbers might not make sense in certain Scriptures, but when you see a number in the text at least see if you can add it to make the sermon more in-depth and to bring out the fullness of the story.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">📚 RESOURCE TIP</p>
              <p className="text-gray-800">
                To find out how to search the numbers in the Bible, check the resource page in the back of this book.
              </p>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
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
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              📖 CHAPTER 6: STORIES THAT BRING GLORY
            </h2>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-900">"All these things Jesus spoke to the multitude in parables; and without a parable He did not speak to them."</p>
              <p className="text-sm mt-2 text-blue-700">— Matthew 13:34</p>
            </blockquote>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">💡 WHAT IS A PARABLE?</p>
              <p className="text-gray-800">
                One of the definitions for the word parable is: <strong>an earthly story with a heavenly meaning</strong>.
              </p>
            </div>

            <p className="mb-4">
              One minister said it like this: "the people need commercial breaks." What he meant was when people are listening to a sermon, after a while they tend to drift off, so a good story usually gets people listening again and back on track. It could even be stories of what happened to you that week, as long as it connects to the sermon.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">✨ STORYTELLING TIP</p>
              <p className="text-gray-800">
                I at least try to tell <strong>two stories</strong> in a sermon, usually in the middle and at the end right before I call an altar call. Sometimes I even tell a story at the start to get the people excited to what they are about to hear preached.
              </p>
            </div>

            <p className="mb-4">
              If Jesus told earthly stories to connect heavenly meanings with the Scriptures everywhere He went, I believe we should do the same. Jesus was a storyteller that told stories that brought God glory. So in this chapter I want to talk about the importance of a good story to connect it with what you are preaching so that people will fully understand from ages 7–70. Remember, whether it be personal stories, someone else's story, or made up stories, everyone always remembers a good story.
            </p>

            <p className="mb-4">
              In this chapter I'm going to present some stories I told in some of my sermons. I'm going to tell you the subject I preached on and then show you a good story to connect the Biblical truth to a teaching. Then you'll get the full idea of how it works. One thing you don't want is a story that sounds good, but has nothing to do with the subject of what you're teaching.
            </p>

            <p className="mb-6">
              Some of these stories are kind of long for people to remember but what I do is I read it a few times and then tell my version of the story. Keep that in mind when you read a story. It's not about changing the story it's about telling a long story short.
            </p>

            <p className="mb-6 font-semibold text-gray-800">
              Let's say you were teaching on faith or faith in action and how you should have both of these characteristics in your walk with God because you truly can't have one without the other. The book of James says, "faith without actions is dead." You can tell the following story:
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              ⚓ STORY 1: FAITH AND WORKS - THE FERRYMAN
            </h3>

            <p className="mb-4">
              A man who had operated a ferryboat for many years was a man of much thought and observation, but was a man of few words. He was also a student of the Bible and believed in the truths of the Scriptures. Two of the regular passengers on the ferryboat were businessmen who cross together on the same day once a week. Frequently the subject of their conversation was faith and works. One of these men believed that it was sufficient to do without works if he had faith while the other thought it was sufficient to do without faith if he had works.
            </p>

            <p className="mb-4">
              The ferryman's patience had been tried by this fruitless arguing about faith and works. What he heard describing faith and works was not in harmony with the Scriptures so that he finally felt he must intervene. He decided upon a plan.
            </p>

            <p className="mb-4">
              On one oar he painted "Faith" and on the other "Works". Then on the next trip with these men, when he came to the most dangerous part of the crossing he took in the oar marked "Faith" and used "Works" with all his might. The ferryboat went around in circles to the fear and annoyance of these two passengers. "Put out the other oar," one yelled in an angry voice.
            </p>

            <p className="mb-4">
              "Very well," was the calm reply of the old man. He took in "Works" and put out "Faith". He used all his might on "Faith" and the boat continued to go round and round. The two men thought he must be out of his mind, but he continued his practical demonstration for a little while. Then he called attention to the names painted on the oars. "I have tried your way," he said to one man, "and yours," to the other, "and you have seen the result. Now observe my way." He gave a steady pull to each oar of the boat and in a few minutes they safely arrived at their landing.
            </p>

            <p className="mb-6">
              Basically the moral of that story is when you try one without the other you will go in circles but when you put them together you will go forward in your Christian walk.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-5 my-6 rounded">
              <p className="font-bold text-green-900 mb-3">🚣 The Ferryman's Lesson</p>
              <p className="text-gray-800 mb-3 text-sm leading-relaxed">
                A man who operated a ferryboat for many years had painted "Faith" on one oar and "Works" on the other. Two businessmen regularly argued about faith versus works. One believed faith alone was sufficient, the other believed works alone were enough.
              </p>
              <p className="text-gray-800 mb-3 text-sm leading-relaxed">
                At the most dangerous part of the crossing, the ferryman took in the "Faith" oar and used only "Works" with all his might. The boat went in circles! The passengers yelled, "Put out the other oar!" He took in "Works" and put out "Faith"—the boat continued in circles!
              </p>
              <p className="text-gray-800 font-semibold text-sm leading-relaxed">
                Then he gave a steady pull to BOTH oars and they safely arrived at their landing. When you try one without the other you will go in circles, but when you put them together you will go forward in your Christian walk!
              </p>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              I told the following story when I was teaching about religion verse relationship and how Christianity is not working for most of the "so-called Christians" because they are not applying the Word of Christ to their lives.
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              🧼 STORY 2: RELIGION VS RELATIONSHIP - THE RABBI & SOAP MAKER
            </h3>

            <p className="mb-6">
              "A rabbi and a soap maker went for a walk together. The soap maker said, 'What good is religion? Look at all the trouble and misery of the world! Still there, even after years—thousands of years—of teaching about goodness and truth and peace. Still there, after all the prayers and sermons and teachings. If religion is good and true, why should this be?' The rabbi said nothing. They continued walking until he noticed a child playing in the gutter. Then the rabbi said, 'Look at that child. You say that soap makes people clean, but see the dirt on that youngster. What good is soap? With all the soap in the world, over all these years, the child is still filthy. I wonder how effective soap is, after all!' The soap maker protested. 'But, Rabbi, soap cannot do any good unless it is applied.' 'As is religion!' the rabbi said."
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-5 my-6 rounded">
              <p className="font-bold text-red-900 mb-3">💬 The Soap Maker's Challenge</p>
              <p className="text-gray-800 mb-3 text-sm leading-relaxed">
                A soap maker said to a rabbi: "What good is religion? Look at all the trouble and misery of the world after thousands of years of teaching about goodness and truth!"
              </p>
              <p className="text-gray-800 mb-3 text-sm leading-relaxed">
                They walked until the rabbi noticed a dirty child in the gutter. The rabbi said, "Look at that child. You say soap makes people clean, but see the dirt! What good is soap? With all the soap in the world, the child is still filthy. I wonder how effective soap is!"
              </p>
              <p className="text-gray-800 mb-3 text-sm leading-relaxed">
                The soap maker protested: "But Rabbi, soap cannot do any good unless it is applied!"
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                The rabbi replied: <strong>"As is religion!"</strong>
              </p>
            </div>

            <p className="mb-4 font-semibold text-gray-800">
              Use this story to explain that Christianity is not working for most "so-called Christians" because they are not applying the Word of Christ to their lives.
            </p>

            {/* Due to length, I'll continue with more stories in a structured format */}
            
            <p className="mb-6 font-semibold text-gray-800">
              The next story is one that brought me to tears. You can use the following story to explain the miracles that Jesus still does today and forever. You can also tell this story to explain the gift of salvation or both. I told this story talking about the woman that was bound thirty-eight years (Luke 13). I also told the story in reference to the miracle of wine (John 2), and the woman with the issue of blood (Mark 8).
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              💰 STORY 3: HOW MUCH IS A MIRACLE?
            </h3>

            <p className="mb-4">
              A little girl went to her bedroom and pulled a glass jelly jar from its hiding place in the closet. She poured the change out on the floor and counted it carefully. Three times, even. The total had to be exactly perfect. No chance here for mistakes. Carefully placing the coins back in the jar and twisting on the cap, she slipped out the back door and made her way six blocks to Rexall's Drug Store with the big red Indian Chief sign above the door.
            </p>

            <p className="mb-4">
              She waited patiently for the pharmacist to give her some attention, but he was too busy at this moment. Tess twisted her feet to make a scuffing noise. Nothing. She cleared her throat with the most disgusting sound she could muster. No good. Finally she took a quarter from her jar and banged it on the glass counter. That did it!
            </p>

            <p className="mb-4">
              'And what do you want?' the pharmacist asked in an annoyed tone of voice. 'I'm talking to my brother from Chicago whom I haven't seen in ages,' he said without waiting for a reply to his question.
            </p>

            <p className="mb-4">
              'Well, I want to talk to you about my brother,' Tess answered back in the same annoyed tone. 'He's really, really sick... and I want to buy a miracle.' 'I beg your pardon?' said the pharmacist. 'His name is Andrew and he has something bad growing inside his head and my Daddy says only a miracle can save him now. So how much does a miracle cost?' 'We don't sell miracles here, little girl. I'm sorry but I can't help you,' the pharmacist said, softening a little. 'Listen, I have the money to pay for it. If it isn't enough, I will get the rest. Just tell me how much it costs.'
            </p>

            <p className="mb-4">
              The pharmacist's brother was a well-dressed man. He stooped down and asked the little girl, 'What kind of a miracle does your brother need?' 'I don't know,' Tess replied with her eyes welling up. 'I just know he's really sick and Mommy says he needs an operation. But my Daddy can't pay for it, so I want to use my money.' 'How much do you have?' asked the man from Chicago. 'One dollar and eleven cents,' Tess answered barely audible. 'And it's all the money I have, but I can get some more if I need to.' 'Well, what a coincidence,' smiled the man. 'A dollar and eleven cents—the exact price of a miracle for little brothers.' He took her money in one hand and with the other hand he grasped her mitten and said 'Take me to where you live. I want to see your brother and meet your parents. Let's see if I have the miracle you need.'
            </p>

            <p className="mb-6">
              That well-dressed man was Dr. Carlton Armstrong, a surgeon, specializing in neurosurgery. The operation was completed free of charge and it wasn't long until Andrew was home again and doing well. Mom and Dad were happily talking about the chain of events that had led them to this place. 'That surgery,' her Mom whispered, 'was a real miracle... I wonder how much it would have cost?' Tess smiled. She knew exactly how much a miracle cost... one dollar and eleven cents... plus the faith of a little child. (Author Unknown)
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-5 my-6 rounded">
              <p className="font-bold text-purple-900 mb-3">👧 The Little Girl's Faith</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                A little girl saved $1.11 in a jar. Her brother Andrew was dying with something growing in his head. She went to the pharmacy asking to buy a miracle.
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                The pharmacist said, "We don't sell miracles here, little girl." But his brother, Dr. Carlton Armstrong (a neurosurgeon), asked, "What kind of miracle does your brother need?"
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                "How much do you have?" he asked. "One dollar and eleven cents," Tess answered. "Well, what a coincidence," smiled the man. "A dollar and eleven cents—the exact price of a miracle for little brothers."
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                The operation was completed free of charge. Tess knew exactly how much a miracle cost... one dollar and eleven cents... plus the faith of a little child.
              </p>
            </div>

            <p className="mb-4 text-gray-700 italic text-sm">
              <strong>Use for:</strong> Miracles Jesus still does, gift of salvation, woman bound 38 years (Luke 13), miracle of wine (John 2), woman with issue of blood (Mark 8).
            </p>

            <p className="mb-6 font-semibold text-gray-800">
              The following two stories are about reading the Bible and the importance of it.
            </p>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              📚 STORY 4: THE COAL BASKET - READING THE BIBLE
            </h3>

            <p className="mb-4">
              The story is told of an old man who lived on a farm in the mountains of eastern Kentucky with his young grandson. Each morning, Grandpa was up early sitting at the kitchen table reading from his old worn-out Bible. His grandson who wanted to be just like him tried to imitate him in any way he could. One day the grandson asked, "Papa, I try to read the Bible just like you but I don't understand it, and what I do understand I forget as soon as I close the book. What good does reading the Bible do?"
            </p>

            <p className="mb-4">
              The Grandfather quietly turned from putting coal in the stove and said, "Take this coal basket down to the river and bring back a basket of water." The boy did as he was told, even though all the water leaked out before he could get back to the house. The grandfather laughed and said, "You will have to move a little faster next time," and sent him back to the river with the basket to try again. This time the boy ran faster, but again the basket was empty before he returned home. Out of breath, he told his grandfather that it was "impossible to carry water in a basket," and he went to get a bucket instead. The old man said, "I don't want a bucket of water; I want a basket of water. You can do this. You're just not trying hard enough," and he went out the door to watch the boy try again.
            </p>

            <p className="mb-6">
              At this point, the boy knew it was impossible, but he wanted to show his grandfather that even if he ran as fast as he could, the water would leak out before he got far at all. The boy scooped the water and ran hard, but when he reached his grandfather the basket was again empty. Out of breath, he said, "See Papa, it's useless!" "So you think it is useless?" The old man said, "Look at the basket." The boy looked at the basket and for the first time he realized that the basket looked different. Instead of a dirty old coal basket, it was clean. "Son, that's what happens when you read the Bible. You might not understand or remember everything, but when you read it, it will change you from the inside out. That is the work of God in our lives. To change us from the inside out and to slowly transform us into the image of His Son. Take time to read a portion of God's word each day. Pray that He will use it to turn your heart and mind to Him. 'How can a young man cleanse his way? By taking heed according to Your word' (Psalm 119:9). 'That He might sanctify and cleanse her with the washing of water by the word' (Ephesians 5:25–27)." Read no matter what—God will do the rest.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 my-6 rounded">
              <p className="font-bold text-blue-900 mb-3">🧺 Grandpa's Wisdom</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                A grandson asked his grandpa, "I try to read the Bible just like you but I don't understand it, and what I do understand I forget as soon as I close the book. What good does reading the Bible do?"
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                The grandfather said, "Take this coal basket to the river and bring back water." The boy tried multiple times but the water always leaked out. Finally exhausted, he said, "It's impossible!"
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                The old man said, "Look at the basket." The boy realized—instead of a dirty old coal basket, it was CLEAN!
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                "Son, that's what happens when you read the Bible. You might not understand or remember everything, but when you read it, it will change you from the inside out."
              </p>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              There's another story I love to tell about how we miss everything God wants to give us because we don't allow Him to speak to us when we don't open His Word.
            </p>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              🎓 STORY 5: THE SPORTS CAR - MISSING GOD'S BLESSINGS
            </h3>

            <p className="mb-4">
              A young man was getting ready to graduate from college. For many months he had admired a beautiful sports car in a dealer's showroom, and knowing his father could well afford it, he told him that was all he wanted. As graduation day approached, the young man awaited signs that his father had purchased the car. Finally, on the morning of his graduation, his father called him into his private study. His father told him how proud he was to have such a fine son, and told him how much he loved him. He handed his son a beautifully wrapped gift box. Curious, and somewhat disappointed, the young man opened the box and found a lovely, leather-bound Bible, with the young man's name embossed in gold. Angry, he raised his voice to his father and said, "With all your money, you give me a Bible?" and stormed out of the house.
            </p>

            <p className="mb-6">
              Many years passed and the young man was very successful in business. He had a beautiful home and wonderful family, but realized his father was very old, and thought perhaps he should go to him. He had not seen him since that graduation day. Before he could make arrangements, he received a telegram telling him his father had passed away, and willed all of his possessions to his son. He needed to come home immediately and take care of things. When he arrived at his father's house, sudden sadness and regret filled his heart. He began to search through his father's important papers and saw the still gift-wrapped Bible, just as he had left it years ago. With tears, he opened the Bible and began to turn the pages. His father had carefully underlined a verse, Matthew 7:11, "And if ye, being evil, know how to give good gifts to your children, how much more shall your Heavenly Father which is in Heaven, give to those who ask Him?" As he read those words, a car key dropped from the back of the Bible. It had a tag with the dealer's name, the same dealer who had the sports car he had desired. On the tag was the date of his graduation, and the words PAID IN FULL.
            </p>

            <p className="mb-6">
              How many times do we miss God's blessings because we can't see past our own desires? Allow God, your Father, to speak to you because He has a way better plan for you! (Jeremiah 29:11)
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-5 my-6 rounded">
              <p className="font-bold text-orange-900 mb-3">🚗 The Graduation Gift</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                A young man wanted a sports car for graduation. His father gave him a leather-bound Bible instead. Angry, he said, "With all your money, you give me a Bible?" and stormed out.
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                Years later, the father died. The son found the still-wrapped Bible. Opening it with tears, he found Matthew 7:11 underlined. A car key dropped from the Bible—the sports car key, dated his graduation day, with the words: <strong>PAID IN FULL</strong>.
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                How many times do we miss God's blessings because we can't see past our own desires? (Jeremiah 29:11)
              </p>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              These next two stories show the love of God and what He did for us, stories that can be told to explain that love and the price He paid for us. They can also be told to explain how we should not take that love for granted.
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ❤️ STORY 6: GOD'S LOVE - THE FATHER'S SACRIFICE
            </h3>

            <p className="mb-4 font-semibold text-red-800">
              God's Love.
            </p>

            <p className="mb-4">
              After a few of the usual Sunday evening hymns, the church's pastor slowly stood up, walked over to the pulpit and, before he gave his sermon for the evening, briefly introduced a guest minister who was in the service that evening. In the introduction, the pastor told the congregation that the guest minister was one of his dearest childhood friends and that he wanted him to have a few moments to greet the church and share whatever he felt would be appropriate for the service. With that, an elderly man stepped up to the pulpit and began to speak:
            </p>

            <p className="mb-4">
              "A father, his son, and a friend of his son were sailing off the Pacific Coast when a fast approaching storm blocked any attempt to get back to shore. The waves were so high, that even though the father was an experienced sailor, he could not keep the boat upright, and the three were swept into the ocean as the boat capsized."
            </p>

            <p className="mb-4">
              The old man hesitated for a moment, making eye contact with two teenagers who were, for the first time since the service began, looking somewhat interested in his story. The aged minister continued with his story, "Grabbing a rescue line, the father had to make the most excruciating decision of his life ... to which boy he would throw the other end of the life line. He only had seconds to make the decision. The father knew that his son was a Christian and he also knew that his son's friend was not. The agony of his decision could not be matched by the torrent of waves. As the father yelled out, 'I love you, son!' he threw out the life line to his son's friend. By the time the father had pulled the friend back to the capsized boat, his son had disappeared beneath the raging swells into the black of night. His body was never recovered."
            </p>

            <p className="mb-4">
              By this time, the two teenagers were sitting up straight in the pew, anxiously waiting for the next words to come out of the old minister's mouth. "The father," he continued, "knew his son would step into eternity with Jesus, and he could not bear the thought of his son's friend stepping into an eternity without Jesus. Therefore, he sacrificed his son to save his son's friend. How great is the love of God that He should do the same for us. Our heavenly Father sacrificed His only begotten Son that we could be saved. I urge you to accept His offer to rescue you and take ahold of the life line He is throwing out to you in this service."
            </p>

            <p className="mb-6">
              With that, the old man turned and sat back down in his chair as silence filled the room. The pastor again walked slowly to the pulpit and delivered a brief sermon with an invitation at the end. However, no one responded to the appeal.
Within minutes after the service ended, the two teenagers were at the old man's side. "That was a nice story," politely stated one of the boys, "but I don't think it was very realistic for a father to give up his only son's life in hopes that the other boy would become a Christian." "Well, you've got a point there," the old man replied, glancing down at his worn Bible. A big smile broadened his narrow face, and he once again looked up at the boys and said, "It sure isn't very realistic, is it? But I'm standing here today to tell you that THAT story gives me a glimpse of what it must have been like for God to give up His Son for me. You see ... I was that father and your pastor is my son's friend."
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-5 my-6 rounded">
              <p className="font-bold text-red-900 mb-3">⛵ The Storm at Sea</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                A father, his son, and his son's friend were sailing when a storm swept them into the ocean. The father grabbed a rescue line and had seconds to decide—to which boy would he throw the life line?
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                The father knew his son was a Christian and his friend was not. As he yelled "I love you, son!" he threw the line to his son's friend. By the time he pulled the friend back, his son had disappeared beneath the waves. His body was never recovered.
              </p>
              <p className="text-gray-800 mb-3 text-sm leading-relaxed">
                The old minister concluded: "The father knew his son would step into eternity with Jesus, and he could not bear the thought of his son's friend stepping into an eternity without Jesus. Therefore, he sacrificed his son to save his son's friend."
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                At the end, the minister revealed: "I'm standing here today to tell you that story gives me a glimpse of what it must have been like for God to give up His Son for me. You see... I was that father and your pastor is my son's friend."
              </p>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              Here's another story similar.
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              🌉 STORY 7: THE DRAWBRIDGE - GOD'S SACRIFICE
            </h3>

            <p className="mb-4">
              In past times when a drawbridge keeper was needed to act as a 'switchman' for trains that crossed above large rivers, one truly awful incident stands out. Most of the time, bridges were kept in a position to let ships pass freely in the water but at certain times of day, trains also had to travel and cross the river, using the drawbridge. The switchman's job was to make sure to extend the bridge for the train at certain times, then get the drawbridge back out of the way again so that water vehicles could travel as normal.
            </p>

            <p className="mb-4">
              One day, a switchman noted the approach of the train and began to operate the appropriate controls to lock the drawbridge into place. He watched the train headlights get closer, and double-checked the drawbridge, only to notice that the locking mechanisms weren't actually locking like they should! If these were not locked properly when the train began to cross the river, it would jump the track and crash far down below, into the river. He noted that, according to his schedule, the particular train in question happened to be a passenger train, and this further heightened his dilemma.
            </p>

            <p className="mb-4">
              Luckily, the drawbridge keeper had been trained for emergency situations, so he knew he could simply dash from the control room and to a control box nearby, to hold a specific lever into place and lock the drawbridge manually. He'd noticed the flawed lock in time, so he dashed outside to manually lock the drawbridge, relieved that he'd been taught this safety tactic. With the lever held firm, the train neared and the rumbling of engine and wheels on the track grew, and the switchman knew he should brace himself soon for the train.
            </p>

            <p className="mb-4">
              Just then, he heard a sound which made his blood run cold! "Daddy...Daddy where are you?" It was his 5 year old son, crossing part of the tracks to come find him. "Run, son—RUN!!!" the father shouted. But the train was fast approaching and the father's words were caught up in the thunder of the train's noise. He released the lever for a moment, in order to run and grab his son—but realized that the train was approaching with much greater speed than he had anticipated. He'd never be fast enough to run to grab his son, then make it back in time to hold the drawbridge lever in place again before the train reached the river crossing! If he didn't hold the lever, all the passengers on the oncoming train would crash into the river, most likely, all would die from a plunge of that distance overhead to the river below.
            </p>

            <p className="mb-6">
              With an agonizing cry, he grasped the lever as the train sped forward. Nobody aboard the train ever noticed the tiny, broken body flung violently and mercilessly into the river by the train. Nobody ever heard the dreaded splash of the young body plunging into the river. Nobody was ever aware of the sobbing man, still hanging on to the lever long minutes after the train was gone and out of sight. Nobody saw the man as he walked home, more slowly and dejectedly than ever before, to tell his wife how their son died.
            </p>

            <p className="mb-6 text-center font-semibold text-purple-800 text-lg">
              If you can comprehend, at all, this man's loss and heart, maybe you can begin to understand the feelings of Our Father in Heaven when he sacrificed His only Son in order to bridge the gap between us and eternal life.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-5 my-6 rounded">
              <p className="font-bold text-purple-900 mb-3">🚂 The Switchman's Choice</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                A drawbridge keeper noticed the train approaching but the locking mechanism failed! He dashed to manually lock it. Just then he heard: "Daddy...Daddy where are you?" His 5-year-old son was crossing the tracks!
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                "Run, son—RUN!!!" he shouted. But the train noise drowned his words. He calculated: if he released the lever to save his son, the passenger train would crash into the river and everyone would die. If he stayed, his son would die.
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                With an agonizing cry, he grasped the lever as the train sped forward. Nobody aboard noticed the tiny broken body. Nobody heard the splash. Nobody saw the sobbing man, still hanging on to the lever long after the train was gone.
              </p>
            </div>

            <p className="mb-4 text-center font-semibold text-red-800 text-lg">
              If you can comprehend this man's loss, maybe you can begin to understand the feelings of Our Father in Heaven when He sacrificed His only Son to bridge the gap between us and eternal life.
            </p>

            <p className="mb-6 font-semibold text-gray-800">
              I tell the following story when I'm at a funeral preaching a sermon or if I'm talking about how Jesus destroyed death, hell, and the grave. You can also use it with the story of the raising of Lazarus in John chapter eleven.
            </p>

            <h3 className="text-2xl font-bold text-teal-900 mt-8 mb-4">
              🐝 STORY 8: THE STING OF DEATH
            </h3>

            <p className="mb-4 font-semibold text-teal-800">
              About the Sting of Death
            </p>

            <p className="mb-4">
              A vacationing family is driving along in their car, windows rolled down, enjoying the warm summer breeze of the sunny day. All of a sudden a big black bee darts in the window and starts buzzing around inside the car. A little girl, highly allergic to bee stings, cringes in the back seat. If she is stung, she could die within an hour (or sooner). "Oh, Daddy," she squeals in terror, "it's a bee! It's going to sting me!"
            </p>

            <p className="mb-4">
              The father pulls the car over to a stop, and reaches back to try to catch the bee. Buzzing towards him, the bee bumps against the front windshield where the father traps it in his fist. Holding it in his closed hand, the father waits for the inevitable sting. The bee stings the father's hand and in pain, the father lets go of the bee.
            </p>

            <p className="mb-6">
              The bee is loose in the car again. The little girl again panics, "Daddy, it's going to sting me!" The father gently says, "No honey, he's not going to sting you now. Look at my hand." The bee's stinger is in my hand!
            </p>

            <p className="mb-4">
              "Where, O death, is your victory? Where, O death, is your sting?" (1 Corinthians 15:55)
            </p>

            <p className="mb-6">
              Jesus says to us, "Look at my hands." He has Satan's sting, the sting of death, the sting of sin, the sting of deceit, the sting of feeling worthless. Jesus has all of those stingers in His hands. When you see that nail-scarred hand, realize that, on your behalf, Jesus took all the pain that Satan could throw at Him. He reduced Satan to a big black bee that has lost its stinger—all Satan can do is buzz around. Because we have the power his power has been stripped and he has been made a public mockery. "Having disarmed principalities and powers, He made a public spectacle of them, triumphing over them in it" (Colossians 2:15). That's the victory that Jesus won for you! [Author Unknown — from Bill Champion]
            </p>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-5 my-6 rounded">
              <p className="font-bold text-teal-900 mb-3">🚗 The Bee in the Car</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                A family was driving when a bee flew in. A little girl, highly allergic to bee stings, panicked: "Daddy, it's going to sting me! I'll die!"
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                The father trapped the bee in his fist and let it sting his hand. In pain, he released it. The girl panicked again: "Daddy, it's going to sting me!"
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                The father gently said, "No honey, he's not going to sting you now. Look at my hand—the stinger is in MY hand!"
              </p>
            </div>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p className="font-semibold text-green-900">"Where, O death, is your victory? Where, O death, is your sting?"</p>
              <p className="text-sm mt-2 text-green-700">— 1 Corinthians 15:55</p>
            </blockquote>

            <p className="mb-4 text-gray-800">
              Jesus says to us, "Look at my hands." He has Satan's sting, the sting of death, sin, deceit, and worthlessness. Jesus took all the pain. He reduced Satan to a big black bee that has lost its stinger—all Satan can do is buzz around!
            </p>

            <p className="mb-6 font-semibold text-gray-800">
              The Bible talks about a bond servant as being a servant that doesn't need to stay and serve but loves his master and loves the way they are treated by their master; they willingly stay and be willing servants. A lot of the apostles refer to themselves as bond slaves in their opening letters in the Bible.
            </p>

            <p className="mb-6 font-semibold text-gray-800">
              The following story is about letting go of bitterness and unforgiveness—or any sin that's in our life—so that people can truly see Jesus in our lives. A good Scripture to connect it with is: "For we are God's masterpiece. He has created us anew in Christ Jesus, so we can do the good things he planned for us long ago" (Ephesians 2:10 NLT).
            </p>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              🎨 STORY 9: LEONARDO DA VINCI - FORGIVENESS
            </h3>

            <p className="mb-4">
              Just before Leonardo da Vinci began to work on his famous painting "The Last Supper," he had a bitter argument with a fellow painter. He grew so enraged that he decided to paint the face of his former friend into the face of Judas. Leonardo knew that if he painted his friend as Judas, succeeding generations would look upon the friend with scorn. The face of Judas was the first he completed, and all who saw it knew it was the face of the fellow painter.
            </p>

            <p className="mb-6">
              When Leonardo began to paint the face of Jesus, however, something seemed to hold him back, in spite of his best efforts. Over and over again he tried to paint Christ, only to be frustrated. Finally, he came to the conclusion that his frustration had to do with the fact that he had painted his friend's face into the face of Judas. So Leonardo painted out the face of Judas and began again to paint the face of Jesus—this time with success.
            </p>

            <p className="mb-6">
              We can't paint the features and attributes of Jesus into our own lives if we are painting bitterness, hate, greed, and every other sin in our lives.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 my-6 rounded">
              <p className="font-bold text-blue-900 mb-3">🖼️ The Last Supper</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                Before painting "The Last Supper," Leonardo had a bitter argument with a fellow painter. Enraged, he painted his friend's face as Judas—so generations would scorn him.
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                But when he tried to paint Jesus' face, he was frustrated and couldn't do it. Finally, he realized his bitterness was blocking him. He painted out Judas' face (his friend) and started over.
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                This time he successfully painted Jesus! We can't paint the features of Jesus into our lives if we are painting bitterness, hate, and greed.
              </p>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              The following story is one I share when I'm witnessing to people. I use this story in reference to Matthew 6:33 that says, "But seek first the kingdom of God and His righteousness, and all these things shall be added to you." People are too caught up with the things and sin in the world they miss the best thing they could ever receive, and that is the Son.
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🎭 STORY 10: THE SON - SEEK FIRST THE KINGDOM
            </h3>

            <p className="mb-4">
              A wealthy man and his son loved to collect rare works of art. They had everything in their collection, from Picasso to Raphael. They would often sit together and admire the great works of art. When the Viet Nam conflict broke out, the son went to war. He was very courageous and died in battle while rescuing another soldier. The father was notified and grieved deeply for his only son.
            </p>

            <p className="mb-4">
              About a month later, just before Christmas, there was a knock at the door. A young man stood at the door with a large package in his hands. He said, "Sir, you don't know me, but I am the soldier for whom your son gave his life. He saved many lives that day, and he was carrying me to safety when a bullet struck him in the heart and he died instantly. He often talked about you, and your love for art.
            </p>

            <p className="mb-4">
              The young man held out his package. "I know this isn't much. I'm not really a great artist, but I think your son would have wanted you to have this." The father opened the package. It was a portrait of his son, painted by the young man. He stared in awe at the way the soldier had captured the personality of his son in the painting. The father was so drawn to the eyes that his own eyes welled up with tears. He thanked the young man and offered to pay him for the picture.
            </p>

            <p className="mb-4">
              "Oh, no sir. I could never repay what your son did for me. It's a gift."
            </p>

            <p className="mb-4">
              The father hung the portrait over his mantle. Every time visitors came to his home he took them to see the portrait of his son before he showed them any of the other great works he had collected.
            </p>

            <p className="mb-4">
              The man died a few months later. There was to be a great auction of his paintings. Many influential people gathered, excited over seeing the great paintings and having an opportunity to purchase one for their collection. On the platform sat the painting of the son.
            </p>

            <p className="mb-4">
              The auctioneer pounded his gavel. "We will start the bidding with this picture of the son. Who will bid for this picture?" There was silence. Then a voice in the back of the room shouted, "We want to see the famous paintings! Skip this one!" But the auctioneer persisted. "Will someone bid for this painting? Who will start the bidding? $100, $200?" Another voice shouted angrily, "We didn't come to see this painting! We came to see the Van Gogh's, the Rembrandt's! Get on with the real bids!" But still the auctioneer continued. "The son! The son! Who'll take the son?"
            </p>

            <p className="mb-4">
              Finally, a voice came from the very back of the room. It was the longtime gardener of the man and his son. "I'll give $10 for the painting." Being a poor man, it was all he could afford. "We have $10, who will bid $20?" "Give it to him for $10! Let's see the masters!" "$10 is the bid, won't someone bid $20?" The crowd was becoming angry. They didn't want the picture of the son. They wanted the more worthy investments for their collections. The auctioneer pounded the gavel. "Going once, twice, SOLD for $10!"
            </p>

            <p className="mb-4">
              A man sitting in the second row shouted, "Now, let's get on with the collection!" The auctioneer laid down his gavel. "I'm sorry, the auction is over." "What about the paintings?" "I am sorry. When I was called to conduct this auction, I was told of a secret stipulation in the will. I was not allowed to reveal that stipulation until this time. Only the painting of the son would be auctioned. Whoever bought that painting would inherit the entire estate, including the paintings. The man who took the son gets everything!"
            </p>

            <p className="mb-6">
              God gave His son 2,000 years ago to die on a cruel cross. Much like the auctioneer, His message today is, "The son, the son, who'll take the son?" Because, you see, whoever takes the Son gets everything.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-5 my-6 rounded">
              <p className="font-bold text-green-900 mb-3">🖼️ The Art Auction</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                A wealthy art collector and his son loved rare artwork. The son died in Vietnam saving another soldier. A month later, a soldier brought a portrait of the son—painted by him. "It's a gift," he said. The father hung it over his mantle, showing it to visitors before his famous collection.
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                When the father died, his art was auctioned. The auctioneer started: "We'll begin with this picture of the son." The crowd protested: "We want the masters! Skip this one!" But he persisted: "The son! Who'll take the son?"
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                Finally, the gardener bid $10 (all he could afford). "SOLD for $10!" The crowd was angry. "Now let's see the real paintings!"
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                The auctioneer revealed: "The auction is over. The will said: whoever bought the painting of the son would inherit the entire estate, including ALL the paintings. The man who took the son gets EVERYTHING!"
              </p>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              The following story shows that you cannot do it on your own strength, it's only when you give up and let God take over your life then you will receive His strength to get you through.
            </p>

            <h3 className="text-2xl font-bold text-orange-900 mt-8 mb-4">
              🏊 STORY 11: THE DROWNING MAN - LET GO & LET GOD
            </h3>

            <p className="mb-4">
              There was a man that was on vacation with his family and he decides to go to a water theme park, the only problem was the man couldn't swim. He stood away from swimming in the deep ends of the pools, but as he was walking in the park he noticed a zipline ride. It was where you would hold on to this handle that was attached to a metal cable that was on a wheel bearing that would zip you across the pool and you would let go where you desired to swim, 11ft, 9ft, 6ft, and 3ft. This man figured this is easy, I'll just zip through the deep water and I'll drop off where the 3ft water is.
            </p>

            <p className="mb-4">
              As he grabbed the handle and began to lift off the platform something happened—he slipped and fell in the 11ft area of water! He began to sink down in the water then he began to fight and tried to swim all he could but there was no use he couldn't even get above the water to scream. The man thought within himself and said, "Jesus, I can't. I'm just gonna die." As soon as he stopped trying to swim and gave up and began to sink a life guard jumped in the pool, wrapped his arms around him, and brought him safely to the top. You see the life guard is trained not to try to help someone when they are fighting and nervous, because if they would try to help when a person's like that the person might get paranoid and take the life guard down. The life guard waits until the person stops fighting.
            </p>

            <p className="mb-6">
              The point is God wants you to stop trying yourself and understand that He will fight for you because the battles are not yours they're the Lord's! Until you do that you will sink lower and lower in this life but when you give it to Him you will rise above your problems!
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-5 my-6 rounded">
              <p className="font-bold text-orange-900 mb-3">💦 Personal Testimony</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                A man at a water park tried a zipline over a pool. He couldn't swim. He slipped and fell into 11ft water! He sank, fighting and trying to swim, but couldn't reach the surface to scream.
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                He thought: "Jesus, I can't. I'm just gonna die." As soon as he stopped fighting and gave up, a lifeguard jumped in, wrapped his arms around him, and brought him safely up!
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                The lifeguard is trained NOT to help when someone is fighting—they wait until the person stops. God wants you to stop trying yourself and understand that He will fight for you because the battles are not yours, they're the Lord's!
              </p>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              This is the last story and it represents how we have to align ourselves with the Word of God.
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              ⚾ STORY 12: THE BASEBALL - ALIGN WITH GOD'S BLESSING
            </h3>

            <p className="mb-4">
              There was a minister who received two baseball tickets to see his favorite team as a love offering from one of his congregation members. He and his wife went to the baseball game and as they were walking in the stadium the minister thought within himself, "God, if you allow me to catch a ball I can use it in a sermon as an illustration." After he thought this he got discouraged and said, "I'm not gonna catch a ball." He soon forgot about catching a ball and looked for the seats that were assigned to him. He found the seats, they were great seats, 15th row right on the side of first base and right in back of the players dugout.
            </p>

            <p className="mb-4">
              Something happened, though, the minister saw a couple empty seats a few rows up and he figured we can get really close. As the minister and his wife went to the seats that were empty and sat down, about five minutes later the minister's wife said, "I think we should go back to our seats, it will be very embarrassing if we have to move." The minister hesitated then agreed. As soon as they sat in their original seats, not more than five minutes later there was a fly pop-up and it was like the ball was coming straight for the minister out of heaven! He winds up getting the ball he asked God for and went home happy as can be and when Sunday came he ministered about aligning yourself with God's blessing. He explained how he tried to move to another seat that wasn't assigned to him, but when he went to the seat assigned to him the blessing fell and he was aligned to receive it.
            </p>

            <p className="mb-6">
              That story demonstrates how we think we know better and we try to move ourselves in places God hasn't assigned us to be but if we look to the Word He has made it clear what He wants from us. If the minister would have stayed were he wasn't assigned he would have missed the blessing, and if we don't align our life to the Word of God we will miss the blessing every time!
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-5 my-6 rounded">
              <p className="font-bold text-purple-900 mb-3">🎟️ Personal Testimony</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                A minister received Cubs tickets. He prayed: "God, if you allow me to catch a ball I can use it in a sermon." He found his assigned seats (15th row, first base). Then he saw better empty seats and moved.
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                His wife said, "We should go back to our seats." He agreed. Five minutes after returning to their ASSIGNED seats, a fly ball came straight for him out of heaven! He caught it!
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                He preached about aligning yourself with God's blessing. If he'd stayed where he wasn't assigned, he'd have missed the blessing. If we don't align our lives to the Word of God, we will miss the blessing every time!
              </p>
            </div>

            <p className="mb-6 font-semibold text-gray-800">
              The last two stories you read were very personal, the reason why is that the man in both of the stories was me! I was at the Chicago Cubs game and caught the ball and I was the person that almost drowned on vacation in Wisconsin Dells.
            </p>

            <p className="mb-6 font-semibold text-gray-800">
              However you decide to tell a story just make sure you take time and tell a story, because wherever Jesus went He connected the Word with a story. Hopefully you see the power of a story that brings God glory. To find out how to find more stories go to the resource page in back of this book.
            </p>

            <p className="mb-6 font-semibold text-gray-800">
              The Bible talks about a bond servant as being a servant that doesn't need to stay and serve but loves his master and loves the way they are treated by their master; they willingly stay and be willing servants. A lot of the apostles refer to themselves as bond slaves in their opening letters in the Bible.
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              ✊ STORY 13: THE BOND SERVANT - WILLING SERVICE
            </h3>

            <p className="mb-4 font-semibold text-green-800">
              Bond Servant.
            </p>

            <p className="mb-4">
              A man went down to a slave trade block and noticed an evil hateful looking man bidding on a young black lady, when the kind gentleman saw her fear, he too placed a bid. Soon only these two men were involved in the bidding as the price of the girl rose higher and higher. Finally the evil man bowed out of the bidding when realized that the price of the girl was more than he was willing to pay. When the auctioneer closed the bidding the kind gentleman paid the price for his purchase, was handed the Bill-of-Sale and turned to leave. The young girl started to follow her new master.
            </p>

            <p className="mb-4">
              He then turned to her and asked, "Where are you going?" "Why, I'm going with you," she responded; "You bought me and I belong to you." "O! You misunderstood," the man said, "I didn't buy you to make you my slave, I bought you to set you free. You are free." "What does that mean?" she demanded. "It means, you are free." "Does that mean that I can be what I want to be?" "Yes— you can be whatever you want to be." "Does that mean that I can say what I want to say?" "Yes—you can say whatever you want to say." "Does that mean that I can go where I want to go?" "Yes—you can go wherever you want to go." "Then," said the girl, "I'll go with you."
            </p>

            <p className="mb-6">
              Who was the man? President Abraham Lincoln, who was assassinated not too long after because he wanted the slaves to be free! This story shows that serving God shouldn't be burdensome but we should be willing and wanting to serve Him because He has paid for our freedom with His life because He is a good Master.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-5 my-6 rounded">
              <p className="font-bold text-green-900 mb-3">⛓️ Abraham Lincoln's Purchase</p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                At a slave auction, a kind gentleman outbid an evil man for a young black woman. After purchasing her, he said, "I didn't buy you to make you my slave, I bought you to set you free. You are free."
              </p>
              <p className="text-gray-800 mb-2 text-sm leading-relaxed">
                "Does that mean I can be what I want? Say what I want? Go where I want?" she asked. "Yes, yes, and yes," he replied.
              </p>
              <p className="text-gray-800 font-semibold text-sm">
                "Then," said the girl, "I'll go with you." The man was President Abraham Lincoln, who was later assassinated because he wanted slaves to be free!
              </p>
            </div>

            <p className="mb-4 text-gray-800">
              This story shows that serving God shouldn't be burdensome but we should be willing and wanting to serve Him because He has paid for our freedom with His life because He is a good Master.
            </p>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-2xl font-bold mb-3">
                📖 STORIES THAT BRING GLORY ✨
              </p>
              <p className="text-lg">
                However you decide to tell a story, just make sure you take time and tell a story, because wherever Jesus went He connected the Word with a story.
              </p>
              <p className="text-lg mt-2 font-semibold">
                Everyone always remembers a good story!
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">📚 RESOURCE TIP</p>
              <p className="text-gray-800">
                To find out how to find more stories, go to the resource page in back of this book.
              </p>
            </div>
          </div>
        );
      
      case 7:
        return (
          <div className="space-y-6">
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
          </div>
        );
      
      case 8:
        return (
          <div className="space-y-6">
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
          </div>
        );
      
      case 9:
        return (
          <div className="space-y-6">
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
          </div>
        );
      
      case 10:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              ✝️ CHAPTER 10: THE FULL GOSPEL
            </h2>

            <p className="mb-6">
              Jesus began the book of Revelation by sending seven letters to the seven churches in Asia Minor (Revelation 1–3). We know from church history that these were seven actual churches in cities that existed in the Roman province of Asia, now western Turkey, at the time the book was written. In each letter, Jesus gave a different description of Himself and gave a description of the spiritual condition of the church He was addressing. He also gave them some kind of admonition concerning what they should do in reference to their spiritual condition. Finally, He always made some kind of promise to "him who overcomes."
            </p>

            <p className="mb-6">
              Jesus sent different letters to the churches of Asia. In each church He described Himself differently. Each church He rebuked and/or commended, and each church He showed how to fix the problem—and if they did, they would receive the blessing and benefits Jesus promised.
            </p>

            <p className="mb-6">
              When we minister, we really have to seek God and ask Him what He would have us preach, whether in your home church or other churches, because God may have a direct word for that church and people. The church of Philadelphia was not rebuked but commended for their love (Revelation 3:7). The church of Ephesus was commended and rebuked because they left their first love (Revelation 2:1). If I was going to preach at a Philadelphia church I can't preach an Ephesus message. We have to be sensitive to the message God would have us share, and when we do share the message God has given us we have to make sure we are ministering not only the love of God but also the fear of God.
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⚖️ THE BALANCE: LOVE AND FEAR OF GOD
            </h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">🧂 THE SALT ANALOGY</p>
              <p className="text-gray-800 mb-3">
                There has to be balance. I recently found out that salt is made out of sodium and chloride; when you put them together they are used to make salt. If you separate them they are poisonous by themselves.
              </p>
              <p className="text-gray-800 mb-3">
                I said that to say this: if you preach just the love of God the people will feel that it's okay to sin because God overlooks it because He loves them too much. They might not say that but that's the mentality of some people. If you just talk about the fear of God, people will feel like God is too harsh and they will feel like they are not able to ever be right with Him and they will live a life of condemnation.
              </p>
              <p className="text-gray-800 font-semibold">
                If we minister the love and the fear of God then it becomes salt! Separated it's poison! This chapter is about being a man of the Gospel, the full Gospel!
              </p>
            </div>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-900">"Preach the word! Be ready in season and out of season. Convince, rebuke, exhort, with all longsuffering and teaching. For the time will come when they will not endure sound doctrine, but according to their own desires, because they have itching ears, they will heap up for themselves teachers; and they will turn their ears away from the truth, and be turned aside to fables. But you be watchful in all things, endure afflictions, do the work of an evangelist, fulfill your ministry."</p>
              <p className="text-sm mt-2 text-blue-700">— 2 Timothy 4:2–5 NKJV</p>
            </blockquote>

            <p className="mb-6">
              We should take the advice that was given to Timothy and us from the Apostle Paul because the Bible tells us a few things regarding the responsibilities of ministers.
            </p>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              ⚠️ THE RESPONSIBILITY OF MINISTERS
            </h3>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="font-bold text-purple-900 mb-2">1️⃣ STRICTER JUDGMENT</p>
              <blockquote className="text-gray-800 text-sm italic">
                "My brethren, let not many of you become teachers, knowing that we shall receive a stricter judgment. For we all stumble in many things. If anyone does not stumble in word, he is a perfect man, able also to bridle the whole body." (James 3:1–2 NKJV)
              </blockquote>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">2️⃣ BLOOD ON OUR HANDS</p>
              <blockquote className="text-gray-800 text-sm italic">
                "When I say to the wicked, 'O wicked man, you shall surely die!' and you do not speak to warn the wicked from his way, that wicked man shall die in his iniquity; but his blood I will require at your hand. Nevertheless if you warn the wicked to turn from his way, and he does not turn from his way, he shall die in his iniquity; but you have delivered your soul." (Ezekiel 33:8–9 NKJV)
              </blockquote>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">3️⃣ REJECTED AS PRIESTS</p>
              <blockquote className="text-gray-800 text-sm italic">
                "My people are destroyed for lack of knowledge. Because you have rejected knowledge, I also will reject you from being priest for Me; because you have forgotten the law of your God, I also will forget your children. The more they increased, the more they sinned against Me; I will change their glory into shame." (Hosea 4:6–7 NKJV)
              </blockquote>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              👤 JEREMIAH VS. HANANIAH: TRUE VS. FALSE PROPHET
            </h3>

            <p className="mb-6">
              I want you to notice something in the book of Jeremiah: the people of Israel were taken captive by the Babylonian army under King Nebuchadnezzar because the people of Israel were rebellious and stubborn to the things of God. As you read the following text ask yourself this question: what looks like the anointing? In this text Jeremiah was wearing a wooden yoke as an illustration to show the people of Israel what God has done to them because of their rebelliousness to Him.
            </p>

            <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-800 my-6 bg-orange-50 p-4 rounded text-sm">
              <p className="font-semibold text-orange-900 mb-2">Jeremiah 28:1–17 (Selected Verses)</p>
              <p className="mb-2">"And it happened in the same year, at the beginning of the reign of Zedekiah king of Judah, in the fourth year and in the fifth month, that Hananiah the son of Azur the prophet, who was from Gibeon, spoke to me in the house of the Lord in the presence of the priests and of all the people, saying, 'Thus speaks the Lord of hosts, the God of Israel, saying: I have broken the yoke of the king of Babylon. Within two full years I will bring back to this place all the vessels of the Lord's house, that Nebuchadnezzar king of Babylon took away from this place and carried to Babylon. And I will bring back to this place Jeconiah the son of Jehoiakim, king of Judah, with all the captives of Judah who went to Babylon, says the Lord, for I will break the yoke of the king of Babylon.'"</p>
              <p className="mb-2">"Then the prophet Jeremiah spoke to the prophet Hananiah in the presence of the priests and in the presence of all the people who stood in the house of the Lord, and the prophet Jeremiah said, 'Amen! The Lord do so; the Lord perform your words which you have prophesied, to bring back the vessels of the Lord's house and all who were carried away captive, from Babylon to this place. Nevertheless hear now this word that I speak in your hearing and in the hearing of all the people: The prophets who have been before me and before you of old prophesied against many countries and great kingdoms—of war and disaster and pestilence. As for the prophet who prophesies of peace, when the word of the prophet comes to pass, the prophet will be known as one whom the Lord has truly sent.'"</p>
              <p className="mb-2">"Then Hananiah the prophet took the yoke off the prophet Jeremiah's neck and broke it. And Hananiah spoke in the presence of all the people, saying, 'Thus says the Lord: Even so I will break the yoke of Nebuchadnezzar king of Babylon from the neck of all nations within the space of two full years.' And the prophet Jeremiah went his way."</p>
              <p className="mb-2">"Now the word of the Lord came to Jeremiah, after Hananiah the prophet had broken the yoke from the neck of the prophet Jeremiah, saying, 'Go and tell Hananiah, saying, "Thus says the Lord: You have broken the yokes of wood, but you have made in their place yokes of iron." For thus says the Lord of hosts, the God of Israel: "I have put a yoke of iron on the neck of all these nations, that they may serve Nebuchadnezzar king of Babylon; and they shall serve him. I have given him the beasts of the field also."'"</p>
              <p>"Then the prophet Jeremiah said to Hananiah the prophet, 'Hear now, Hananiah, the Lord has not sent you, but you make this people trust in a lie. Therefore thus says the Lord: Behold, I will cast you from the face of the earth. This year you shall die, because you have taught rebellion against the Lord.' So Hananiah the prophet died the same year in the seventh month."</p>
            </blockquote>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="font-bold text-red-900 mb-2">😱 WHAT LOOKED LIKE THE ANOINTING?</p>
              <p className="text-gray-800 mb-2">
                It totally looked like the anointing when Hananiah took the yoke and broke it; I can imagine the crowd cheering and clapping. There was only one thing wrong: it wasn't God's Word, it wasn't God's anointing. It was a false prophet that was trying to pronounce favor in the middle of God's judgment upon the people.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-2">📚 THE NAME: HANANIAH</p>
              <p className="text-gray-800">
                <strong>Meaning:</strong> mercy, gracious, merciful, supplication, favor, besought, pity, fair, favorable, favored.
              </p>
            </div>

            <p className="mb-6">
              A lot of ministers preach favor and blessings upon rebellious people. We have to minister repentance and obedience because without it you will never have favor and blessings upon your life. The reason why a lot of ministers do this is because, like Hananiah's message, that gets shouts and cheers from the crowd, but as you saw Hananiah's message only made it worse for the people and placed a heavier burden upon them. This is what happens when we as ministers do not preach the full Gospel to God's people. What is the full Gospel? The prophets of the Old Testament, John the Baptist, Jesus, the disciples, and Paul the Apostle's message was "repent for the Kingdom of God is near!" And we are told and commissioned to do the same: preach repentance so they can receive the fullness of God's grace and favor. Hananiah was trying to preach grace and favor without repentance. The Bible teaches otherwise.
            </p>

            <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-800 my-6 bg-purple-50 p-4 rounded">
              <p className="font-semibold text-purple-900">"For the grace of God that brings salvation has appeared to all men, teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly in the present age, looking for the blessed hope and glorious appearing of our great God and Savior Jesus Christ, who gave Himself for us, that He might redeem us from every lawless deed and purify for Himself His own special people, zealous for good works. Speak these things, exhort, and rebuke with all authority. Let no one despise you."</p>
              <p className="text-sm mt-2 text-purple-700">— Titus 2:11–15 NKJV</p>
            </blockquote>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              🔄 TITUS VS. JEREMIAH: THE SAME MESSAGE
            </h3>

            <p className="mb-4 font-semibold text-blue-800">
              Now let's compare Titus' message with Jeremiah's message:
            </p>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded text-sm">
              <p className="mb-2">"Then the word of the Lord came to me. He said, 'Can I not do with you, Israel, as this potter does?' declares the Lord. 'Like clay in the hand of the potter, so are you in my hand, Israel. If at any time I announce that a nation or kingdom is to be uprooted, torn down and destroyed, and if that nation I warned repents of its evil, then I will relent and not inflict on it the disaster I had planned. And if at another time I announce that a nation or kingdom is to be built up and planted, and if it does evil in my sight and does not obey me, then I will reconsider the good I had intended to do for it.'"</p>
              <p className="text-sm mt-2 text-green-700">— Jeremiah 18:5–10</p>
            </blockquote>

            <p className="mb-6">
              This message was basically saying if you repent God will restore you. And if you submit you will be able to serve. Now, look at the next message: "For thus says the Lord of hosts, the God of Israel: Do not let your prophets and your diviners who are in your midst deceive you, nor listen to your dreams which you cause to be dreamed. For they prophesy falsely to you in My name; I have not sent them, says the Lord. For thus says the Lord: After seventy years are completed at Babylon, I will visit you and perform My good word toward you, and cause you to return to this place. For I know the thoughts that I think toward you, says the Lord, thoughts of peace and not of evil, to give you a future and a hope. Then you will call upon Me and go and pray to Me, and I will listen to you. And you will seek Me and find Me, when you search for Me with all your heart." (Jeremiah 29:8–13 NKJV)
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="font-bold text-blue-900 mb-2">📖 JEREMIAH'S MESSAGE - 3 PARTS:</p>
              <ol className="list-decimal ml-6 space-y-2 text-gray-800">
                <li>Don't listen to the lies of false prophets.</li>
                <li>God wants to deliver you, bless you, use you for His glory and give you a prosperous future.</li>
                <li>At the appointed time God will deliver you out of the punishment He has placed upon you when you call upon Him, seek Him, and find Him when you search for Him with all your heart. This represents repentance and heartfelt relationship.</li>
              </ol>
            </div>

            <p className="mb-4 font-semibold text-green-800">
              Now look what the prophet of God's name means:
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="font-bold text-green-900 mb-2">📚 THE NAME: JEREMIAH</p>
              <p className="text-gray-800">
                <strong>Meaning:</strong> "whom Jehovah has appointed"—to raise, lift, lift up, take up, set up, erect, exalt, set on high.
              </p>
            </div>

            <p className="mb-6">
              When we minister the true Word of God to His people, God will anoint and appoint us to minister His Word to the nations; He will lift us up and take us where we need to be for His glory. He will do this only when you minister the full Gospel to His people, and when we do this we lift up Jesus—and when you lift up Jesus, all men will be drawn unto Him!
            </p>

            <p className="mb-6">
              The message of God's Word isn't always easy, but we as ministers have to tell the truth in love. We will have God's approval and blessing upon our lives and ministries. God's approval is what matters, because you're either man-appointed or God-anointed and appointed! It's not about looking for the emotions of the people; it's about operating in the anointing of God. You might not get all the shouts and cheers, but remember the Kingdom of Heaven is cheering you on (Hebrews 12:1).
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              💔 REAL-LIFE EXAMPLE: THE HOSPITAL VISIT
            </h3>

            <p className="mb-4">
              A few years back I was called by a member of the church that wanted me to pray for their family member that was in the hospital after trying to commit suicide. I went to the hospital and found out that this person was involved in drugs and fortunetelling, which is witchcraft. So I began to explain to this person that this is one of the reasons why they were dealing with suicidal thoughts because when you practice witchcraft and mess with drugs it brings demonic forces. I told this person if she was to commit suicide she would go to hell, especially if she didn't repent of fortunetelling and drugs. She began to cry and tell me that a pastor told her, "Come as you are." I explained to her that God wants us to come to Him as we are but He doesn't want us to stay that way—we have to change and repent. I told her I used to practice fortunetelling and I tried to commit suicide twice, so if anybody can understand I could. She didn't want to hear it, so I prayed with her and left.
            </p>

            <p className="mb-4">
              Not too long after the visit I got a phone call from the same person that called me to visit their family member in the hospital. He began to argue and said he wasn't coming to church any more and he said, "Why couldn't you have just prayed with her and left?" He didn't allow me to fully explain then he hung up on me. After this a lot of people were mad at me in the church and around the city because I told her the truth, which they thought was too harsh. A few weeks later I got a phone call about the same person I visited in the hospital telling me that that person was found in a hotel room dead after committing suicide. Very sad story but very true. What if I didn't tell that person the truth? What if I just told her God loves you and it's going to be okay? We have to warn the people because if not the blood will be on our hands.
            </p>

            <h3 className="text-2xl font-bold text-teal-900 mt-8 mb-4">
              🇨🇦 TESTIMONY: TORONTO, CANADA
            </h3>

            <p className="mb-4">
              Recently I was in Toronto, Canada, on an evangelism trip. I ministered a Word about the man at the pool of Bethesda and how Jesus told him to rise up (John 5:1). Then at the closing of the sermon I explained if we don't allow God to raise us up here on earth and if we are in our sins when the rapture comes or we die we will not rise up to heaven. I explained and named certain sins and fortunetelling was one of them. When I said this I began to see people getting angry and talking to one another because many of them were fortunetellers. At the end of the sermon they began to complain to the workers of the church about my bold preaching and how I was wrong for saying that. A few weeks later I received a call from one of the people that was listening to the sermon that night in Toronto and they told me that God ministered to them to give up fortunetelling! He called me to encourage me and thank me for ministering the truth! Praise God! You're not always going to have people like what you preach but remember it's not your Word it's God's Word. Jesus said, "If anyone is ashamed of me and my message, the Son of Man will be ashamed of that person when he returns in his glory and in the glory of the Father and the holy angels" (Luke 9:26 NLT).
            </p>

            <blockquote className="border-l-4 border-teal-500 pl-4 italic text-gray-800 my-6 bg-teal-50 p-4 rounded">
              <p className="font-semibold text-teal-900">"Son of man, do not fear them or their words. Don't be afraid even though their threats surround you like nettles and briers and stinging scorpions. Do not be dismayed by their dark scowls, even though they are rebels. You must give them my messages whether they listen or not. But they won't listen, for they are completely rebellious! Son of man, listen to what I say to you. Do not join them in their rebellion. Open your mouth, and eat what I give you."</p>
              <p className="text-sm mt-2 text-teal-700">— Ezekiel 2:6–8 NLT</p>
            </blockquote>

            <p className="mb-6 font-semibold text-gray-800 text-lg">
              Remember every time you minister to minister the full Gospel of Jesus Christ and ask God what He would have you say!
            </p>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg mt-8 text-center">
              <p className="text-2xl font-bold mb-3">
                ✝️ PREACH THE FULL GOSPEL! 📖
              </p>
              <p className="text-lg">
                Balance love and fear. Minister truth with compassion. Let God appoint and anoint you!
              </p>
              <p className="text-lg mt-2 font-semibold">
                The Kingdom of Heaven is cheering you on!
              </p>
            </div>
          </div>
        );
      
      case 11:
        return (
          <div className="space-y-6">
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
          </div>
        );
      
      case 12:
        return (
          <div className="space-y-6">
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
          </div>
        );
      
      default:
        return <div>Select a chapter to begin reading</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
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
              <h1 className="text-xl font-bold text-white">Studying for Service</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Audio Player */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none shadow-2xl">
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
                        <span className="align-middle">{currentChapterData.title}</span>
                      </p>
                    </div>
                  </div>

                  {/* Chapter Selector */}
                  <div className="mb-4">
                    <label className="text-sm font-medium text-white/80 mb-2 block">
                      Select Chapter
                    </label>
                    <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-blue-900 border-blue-400/30">
                        {chapters.map((chapter) => (
                          <SelectItem 
                            key={chapter.id} 
                            value={chapter.id.toString()}
                            className="text-white hover:bg-blue-800/50"
                          >
                            {chapter.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        onClick={handlePlayPause}
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
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Chapter Content */}
          <div className="lg:col-span-2">
            <Card className="bg-white/95 backdrop-blur-sm border-blue-400/30 shadow-xl">
              <CardContent className="p-8 prose max-w-none">
                {getChapterContent(currentChapter)}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

