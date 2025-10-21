import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh2() {
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
                  <span className="align-middle">Chapter 2: Notice the Names</span>
                  <span className="text-2xl align-text-top ml-1">✍️</span>
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
              src="/studying-for-service-ch2.mp3"
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
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

