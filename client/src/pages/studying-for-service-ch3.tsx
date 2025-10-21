import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh3() {
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
                  <span className="align-middle">Chapter 3: Keep the Cities in Sight</span>
                  <span className="text-2xl align-text-top ml-1">🏙️</span>
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
              src="/studying-for-service-ch3.mp3"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

