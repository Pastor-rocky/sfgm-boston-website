import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import {
  Paragraph,
  BlueSection,
  GreenSection,
  PurpleSection,
  RedSection,
  OrangeSection,
  YellowSection,
  InfoBox,
  WarningBox,
  BulletList,
  BulletItem,
} from "@/components/audio-player-text-template";

export default function BecomingAFireStarterCh8() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/uploads/firestarter-audio/fire-starter-cp8.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/course/2">
            <Button variant="ghost" className="mb-4">
              ← Back to Course
            </Button>
          </Link>
        </div>

        {/* Audio Player Card */}
        <Card className="mb-8 bg-gradient-to-r from-orange-600 to-red-600 border-none shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <img
                src="/fire-starter-cover.jpg"
                alt="Fire Starter"
                className="w-24 h-auto rounded shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-1">
                  <span className="text-3xl align-text-top mr-1">🔥</span>
                  <span className="align-middle">Fire Starter</span>
                </h3>
                <p className="text-white/90 text-xl font-semibold">
                  <span className="align-middle">Chapter 8</span>
                  <span className="text-2xl align-text-top ml-1">🔥</span>
                </p>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                onClick={() => skip(-15)}
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
                className="bg-white text-orange-600 hover:bg-white/90 rounded-full h-14 w-14"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
              <Button
                onClick={() => skip(15)}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <span className="mr-1 text-xs">15</span>
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress Slider */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-white/90 text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 mt-4">
              <Volume2 className="h-4 w-4 text-white" />
              <Slider
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-24 cursor-pointer"
              />
            </div>

            {/* Audio Element */}
            <audio ref={audioRef} src={audioSrc} preload="metadata" />
          </CardContent>
        </Card>

        {/* Text Content Card */}
        <Card className="shadow-xl border-orange-200">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">

            {/* Chapter 8: Fellowship of Fire */}
            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">🔥 CHAPTER 8: FELLOWSHIP OF FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Acts 2:1–4</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "And when the day of Pentecost was fully come, they were all with one accord in one place. And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting. And there appeared unto them cloven tongues like as of fire, and it sat upon each of them. And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Fire came upon the disciples when they were in one accord. The Greek word for accord (<em>homothumadon</em>) helps define the kind of people we should fellowship with.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">💡 Greek Word: Homothumadon (One Accord)</p>
                <BulletList>
                  <BulletItem><strong>Thayer:</strong> with one mind, with one accord, with one passion</BulletItem>
                  <BulletItem><strong>Strong:</strong> unanimously; with entire agreement of minds</BulletItem>
                </BulletList>
              </InfoBox>

              <Paragraph>
                The people who want the fire of God should surround themselves with those of the same mind (Philippians 2:5)—<strong>people passionate about saving the lost, serving, and obeying Jesus no matter what.</strong>
              </Paragraph>

              <Paragraph>
                We cannot hang out with the double-minded; it will hinder your walk and fire. Paul illustrates the seriousness:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">1 Corinthians 5:9–13 (CEV)</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "In my other letter I told you not to have anything to do with immoral people. But I wasn't talking about the people of this world. You would have to leave this world to get away from everyone who is immoral or greedy or who cheats or worships idols. I was talking about your own people who are immoral or greedy or worship idols or curse others or get drunk or cheat people. Don't even eat with them! Why should I judge outsiders? Aren't we supposed to judge only church members? God judges everyone else. The Scriptures say, 'Chase away any of your own people who are evil.'"
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Like Paul, I am not saying avoid unbelievers altogether—we must reach them. I am saying <strong>do not fellowship with people who claim to be Christians yet live contrary to the gospel.</strong> Paul says don't even sit down and eat with them.
              </Paragraph>
            </RedSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">⚠️ WHY APPLY THIS?</h2>
              
              <InfoBox>
                <p className="font-semibold mb-2">📖 It's a Command</p>
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-blue-900">2 Corinthians 6:14</p>
                  <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Be ye not unequally yoked together with unbelievers: for what fellowship hath righteousness with unrighteousness? And what communion hath light with darkness?"
                    </p>
                  </blockquote>
                </div>
                <Paragraph>
                  The Greek word for believe (<em>pisteuō</em>) speaks of a true believer—one who respects, entrusts, and commits their life to God. Those who claim Christ but do not respect, entrust, or commit themselves to Him live like unbelievers. <strong>If you want the light (fire) of God to rest on your life, do not fellowship that way.</strong>
                </Paragraph>
              </InfoBox>

              <WarningBox>
                <p className="font-semibold mb-2">⚠️ Their Ways Can Rub Off</p>
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-red-900">1 Corinthians 15:33 (CEV)</p>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Don't fool yourselves. Bad friends will destroy you."
                    </p>
                  </blockquote>
                </div>
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-red-900">Proverbs 12:26</p>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "A righteous man is cautious in friendship, but the way of the wicked leads them astray."
                    </p>
                  </blockquote>
                </div>
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-red-900">Proverbs 22:24–25</p>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                    <p>
                      "Don't make friends with people who have hot, violent tempers. You might learn their habits and not be able to change."
                    </p>
                  </blockquote>
                </div>
              </WarningBox>
            </BlueSection>

            <OrangeSection>
              <h2 className="text-2xl font-bold mb-6 text-orange-900">💔 PERSONAL TESTIMONY: WHEN SPIRITS RUB OFF</h2>
              
              <Paragraph>
                I once stopped by a family member's dinner with out-of-town guests. They were drinking, cursing, and claiming to be Christians (see 1 Corinthians 5:9–13). I stayed to witness, but the old drinking friend grew prideful and gave me attitude; I responded in the flesh and condemned him. <strong>His spirit rubbed off on me.</strong>
              </Paragraph>

              <Paragraph>
                While writing about this, I thought, "I need to call and apologize." Just then he called me—while trying to reach a drug dealer. I apologized, told him God had a plan, and that this "wrong number" was God's intervention. He said he was coming to church that night.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">👥 Go Two by Two</p>
                <Paragraph>
                  If I had gone with a brother, as Jesus modeled (Mark 6:7; Ecclesiastes 4:9–10), he could have corrected me in the moment.
                </Paragraph>
              </InfoBox>

              <WarningBox>
                <p className="font-semibold mb-2">🚨 You Could Fall Away</p>
                <Paragraph>
                  If you witness to unbelievers or rebellious "believers," take a solid, born-again believer with you. Jesus sent them two by two (Mark 6:7). I knew an usher once on fire for God. He began to hang with someone living in open rebellion. I warned him, but he insisted he'd be fine. <strong>Within two months he was no longer serving or on fire.</strong>
                </Paragraph>
              </WarningBox>

              <Paragraph>
                Please take the warning. Many have lost their fire because of who they chose to keep close.
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-orange-900">Luke 14:26–27</p>
                <blockquote className="border-l-4 border-orange-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "If any man cometh unto me, and hateth not his own father, and mother, and wife, and children, and brethren, and sisters, yea, and his own life also, he cannot be my disciple. Whosoever doth not bear his own cross, and come after me, cannot be my disciple."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">💡 Love Jesus More Than All</p>
                <Paragraph>
                  "Hate" here means to love less. We must put everyone and everything in second place to Him (Proverbs 18:24). Crucify the flesh and refuse the pull of relationships that dishonor God.
                </Paragraph>
              </InfoBox>
            </OrangeSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">🤝 TRUE FELLOWSHIP: WALKING IN THE LIGHT</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">1 John 1:6–7</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "If we say that we have fellowship with him and walk in the darkness, we lie, and do not the truth: but if we walk in the light, as he is in the light, we have fellowship one with another, and the blood of Jesus his Son cleanseth us from all sin."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">🤝 Greek Word: Koinonia (Fellowship)</p>
                <Paragraph>
                  The Greek for fellowship is <em>koinonia</em>—partnership, sharing, joint participation. In Luke 5:10, James, John, and Simon are called partners (<em>koinonoi</em>) in a fishing business. Then they left everything to partner with Jesus:
                </Paragraph>
              </InfoBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-green-900">Mark 1:16–20</p>
                <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "As Jesus walked along the shore of Lake Galilee, he saw two fishermen, Simon and his brother Andrew, catching fish with a net. Jesus said to them, 'Come with me, and I will teach you to catch people.' At once they left their nets and went with him. He went a little farther on and saw two other brothers, James and John, the sons of Zebedee. They were in their boat getting their nets ready. As soon as Jesus saw them, he called them; they left their father Zebedee in the boat with the hired men and went with Jesus."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Peter, James, and John formed Jesus' inner circle and saw what others didn't.
              </Paragraph>
            </GreenSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">👧 JAIRUS' DAUGHTER: THREE KEYS</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Mark 5:35–42</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    Jesus allowed only Peter, James, John, and the girl's parents into the room. He put out the mourners (hired wailers who mocked Him). He took the girl by the hand and said, "Talitha koum" ("Little girl, get up!"), and she rose.
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">🔑 Three Keys from This Story</p>
                <BulletList>
                  <BulletItem><strong>Wise counsel:</strong> Jairus listened to Jesus over the messenger of death</BulletItem>
                  <BulletItem><strong>Good fellowship:</strong> Jesus kept the mockers out and brought faithful companions in</BulletItem>
                  <BulletItem><strong>The Word of God:</strong> Jesus' command brought life</BulletItem>
                </BulletList>
                <Paragraph>
                  Follow wise counsel and good fellowship, and you will see God resurrect "dead" areas of your life.
                </Paragraph>
              </InfoBox>
            </PurpleSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">⛰️ THE TRANSFIGURATION: FELLOWSHIP WITH FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">Matthew 17:1–8</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    Jesus took Peter, James, and John up a high mountain. His face shone like the sun; His clothes became dazzling white. Moses (the Law) and Elijah (the Prophets) appeared and talked with Him. A bright cloud overshadowed them and the Father said, "This is my beloved Son... listen to Him."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Moses' face once shone with glory (Exodus 34:29). Elijah called down fire (2 Kings 1:10), saw fire consume sacrifice (1 Kings 18), and departed in a chariot of fire (2 Kings 2:11). <strong>Jesus—the Son—is the source of natural and divine fire;</strong> the fullness of the Word spoken by Moses and the prophets is fulfilled in Him.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">✨ The Fellowship of Fire</p>
                <Paragraph>
                  Again: wise counsel (God), good fellowship (Moses, Elijah, Jesus), and obedience to the Word. This is the fellowship of fire.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Will you, like those three, leave lesser things and call those around you to seriousness about Jesus? If they refuse, will you still follow Him no matter what?
              </Paragraph>
            </BlueSection>

            <YellowSection>
              <h2 className="text-2xl font-bold mb-6 text-yellow-900">🚢 YOUR COMPANIONS DETERMINE YOUR DIRECTION</h2>
              
              <InfoBox>
                <p className="font-semibold mb-2">🔍 Break Down "Fellowship"</p>
                <Paragraph>
                  Break "fellowship" into "fellow" (companion) and "ship" (a vessel moving you from point A to point B). <strong>Your companions determine your direction.</strong> Choose fellowship that's on fire, and you'll see what others don't and move from where you are to where God wants you—on fire for Him.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Expect persecution from those you disconnect from:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-yellow-900">1 Peter 4:3–5</p>
                <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "You have spent enough time in the past doing what the heathen like to do. Your lives were spent in indecency, lust, drunkenness, orgies, drinking parties, and the disgusting worship of idols. And now the heathen are surprised when you do not join them in the same wild and reckless living, and so they insult you. But they will have to give an account of themselves to God, who is ready to judge the living and the dead."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Keep praying for those who insult you. Pray for unbelievers and for professing believers living against God's Word—that they would be consumed by His presence and live set on fire by God.
              </Paragraph>
            </YellowSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">🙏 WHERE TWO OR THREE AGREE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Matthew 18:19–20</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Again I say unto you, that if two of you shall agree on earth as touching anything that they shall ask, it shall be done for them of my Father who is in heaven. For where two or three are gathered together in my name, there am I in the midst of them."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                The Greek for "agree" here (<em>symphōneō</em>) parallels the idea of accord. When the disciples were in one accord, God sent fire and the Holy Spirit.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🔥 A Testimony: Ring of Fire</p>
                <Paragraph>
                  At a men's retreat in Houston, a friend took a photo of a group praying. In the photo, <strong>a ring of fire encircled the group.</strong> God allowed the camera to capture what was happening spiritually: the consuming fire was in their midst. Fellowship with the world brings demonic activity; fellowship in the light (fire) brings God's presence.
                </Paragraph>
              </InfoBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Joshua 24:15</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "As for me and my house, we will serve the Lord."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Make your stand, as Joshua did. <strong>Connect to people passionately serving Christ, and get ready for the fire to fall as it did on the Day of Pentecost.</strong>
              </Paragraph>
            </PurpleSection>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

