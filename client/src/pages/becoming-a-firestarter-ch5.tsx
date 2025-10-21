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
  YellowSection,
  InfoBox,
  WarningBox,
  BulletList,
  BulletItem,
  CenterText,
} from "@/components/audio-player-text-template";

export default function BecomingAFireStarterCh5() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = "/uploads/firestarter-audio/fire-starter-cp5.mp3";

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
                  <span className="align-middle">Chapter 5</span>
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

            {/* Introduction */}
            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">🔥 CHAPTER 5: TESTED BY FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Mark 9:47–50 (KJV)</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "And if thine eye offend thee, pluck it out: it is better for thee to enter into the kingdom of God with one eye, than having two eyes to be cast into hell fire: where their worm dieth not, and the fire is not quenched. For every one shall be salted with fire, and every sacrifice shall be salted with salt. Salt is good: but if the salt have lost his saltness, wherewith will ye season it? Have salt in yourselves, and have peace one with another."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                The Good News Translation renders Mark 9:49 this way: "Everyone will be purified (tested) by fire as a sacrifice is purified by salt."
              </Paragraph>
              
              <Paragraph>
                In these verses Jesus first warns about what we let our eyes look upon, then He moves to how a believer is tested. We just discussed guarding our eyes in the previous chapter; now let's look at how believers are tested by God's fire for His glory.
              </Paragraph>
              
              <Paragraph>
                <strong>Why are believers tested in the first place?</strong>
              </Paragraph>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">1 Peter 1:6–7</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Be glad about this, even though it may now be necessary for you to be sad for a while because of the many kinds of trials you suffer. Their purpose is to prove that your faith is genuine. Even gold, which can be destroyed, is tested by fire; and so your faith, which is much more precious than gold, must also be tested, so that it may endure. Then you will receive praise and glory and honor on the Day when Jesus Christ is revealed."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">💡 The Greek Word for Trials</p>
                <Paragraph>
                  The Greek word for trials here is <em>peirasmos</em>. Thayer's definitions include: trial, proving integrity, virtue, constancy adversity, affliction, trouble sent by God and serving to test or prove one's character, faith, and holiness.
                </Paragraph>
              </InfoBox>

              <Paragraph>
                In Mark 9, Jesus also speaks of salt—our witness for Christ. Why must a person be tested? <strong>So our witness shines.</strong> As Peter says, just as gold is tested by fire to purify it, our lives before God must be purified. The more fire, the more purity is revealed—in the gold and in us. The result is integrity, virtue, faith, and holiness. God wants you to be the real deal.
              </Paragraph>

              <WarningBox>
                <p className="font-semibold mb-2">⚠️ Don't Bail When Things Get Hard</p>
                <Paragraph>
                  Too many so-called Christians bless the Lord when all is well, but bail when things get hard, and that's why the fire burns out in their lives.
                </Paragraph>
              </WarningBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-red-900">Luke 8:13</p>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "The seeds that fell on rocky ground stand for those who hear the message and receive it gladly. But it does not sink deep into them; they believe only for a while, but when the time of testing comes, they fall away."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                We need to <strong>embrace the fire, not run from it.</strong> The book of Malachi gives us an awesome example:
              </Paragraph>
            </RedSection>

            <BlueSection>
              <h2 className="text-2xl font-bold mb-6 text-blue-900">🪙 THE REFINER'S FIRE</h2>
              
              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">Malachi 3:2–3</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "But who can abide the day of his coming? and who shall stand when he appeareth? for he is like a refiner's fire, and like fullers' soap: and he will sit as a refiner and purifier of silver, and he will purify the sons of Levi, and refine them as gold and silver; and they shall offer unto Jehovah offerings in righteousness."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                Notice it says He will <strong>"sit"</strong> as a refiner. A refiner sits to ensure two things happen:
              </Paragraph>

              <BulletList>
                <BulletItem>
                  <strong>First</strong>, he uses a screen-like tool to skim away dross (impurities) as heat brings them to the surface, setting apart what is bad from what is good. When the fires of trial rise in your life, words may come out that shouldn't, thoughts may arise that aren't right, actions or habits may surface that aren't pleasing to God. He wants you to see them, bring them to Him, and let Him remove them so you can live a sanctified life.
                </BulletItem>
                <BulletItem>
                  <strong>Second</strong>, the refiner sits to make sure the gold or silver isn't ruined.
                </BulletItem>
              </BulletList>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">1 Corinthians 10:12–13</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "If you think you are standing firm you had better be careful that you do not fall. Every test that you have experienced is the kind that normally comes to people. But God keeps his promise, and he will not allow you to be tested beyond your power to remain firm; at the time you are put to the test, he will give you the strength to endure it, and so provide you with a way out."
                  </p>
                </blockquote>
              </div>

              <InfoBox>
                <p className="font-semibold mb-2">💪 God Wants You to Succeed</p>
                <Paragraph>
                  God does not want you to fail. He wants you to succeed, and He will help you.
                </Paragraph>
              </InfoBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">Isaiah 43:1–2</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Israel, the Lord who created you says, Do not be afraid—I will save you. I have called you by name—you are mine. When you pass through deep waters, I will be with you; your troubles will not overwhelm you. When you pass through fire, you will not be burned; the hard trials that come will not hurt you."
                  </p>
                </blockquote>
              </div>
              
              <WarningBox>
                <p className="font-semibold mb-2">⚖️ Test vs. Discipline - Know the Difference</p>
                <Paragraph>
                  You might say, I've been tested too much. Keep believing and waiting—God will get you through. But make sure it's a test and not discipline. Many confuse the two: they commit adultery, lie, cheat, live according to the flesh, and then say, "I'm going through some trials." <strong>No—that's discipline.</strong> Repent, and God will stop the discipline.
                </Paragraph>
              </WarningBox>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-blue-900">1 Peter 4:15–16</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "For let none of you suffer as a murderer, or a thief, or an evil-doer, or as a meddler in other men's matters: but if a man suffers as a Christian, let him not be ashamed; but let him glorify God in this name."
                  </p>
                </blockquote>
              </div>
            </BlueSection>

            <GreenSection>
              <h2 className="text-2xl font-bold mb-6 text-green-900">👨‍🏭 THE SILVERSMITH STORY</h2>
              <Paragraph>
                Here's a story that brings the refiner's picture to life:
              </Paragraph>

              <Paragraph>
                There was a group of women in a Bible study on Malachi. As they studied chapter 3, they came across verse 3: "He will sit as a refiner and purifier of silver." The statement puzzled them. One woman offered to find out more about refining silver and report back.
              </Paragraph>

              <Paragraph>
                She visited a silversmith and watched him at work. Without explaining her reason, she observed as he held a piece of silver over the fire, letting it heat up. He explained that to refine silver, he must hold it in the middle of the fire where the flames are hottest to burn away all impurities.
              </Paragraph>

              <Paragraph>
                She thought about God holding us in such a hot spot—and then about the verse that says He sits as a refiner. She asked if he really had to sit the entire time the silver was in the fire. "Yes," he said. He not only had to sit and hold the silver, but he had to keep his eyes on it the whole time. If left even a moment too long, the silver would be destroyed.
              </Paragraph>

              <Paragraph>
                She asked, "How do you know when the silver is fully refined?" He smiled: <strong>"Oh, that's easy—when I see my image in it."</strong>
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">✨ God's Eyes Are Fixed on You</p>
                <Paragraph>
                  This is especially meaningful for those in the hottest part of the flame right now. God's eyes are fixed on those He is refining. Nothing in your life goes unnoticed by the Father. He is aware of all—and He is for you. Jesus will allow strong fires of testing until He—and everyone else—sees His image, His character, in your life.
                </Paragraph>
              </InfoBox>
            </GreenSection>

            <PurpleSection>
              <h2 className="text-2xl font-bold mb-6 text-purple-900">🔥 THE FIERY FURNACE</h2>
              
              <Paragraph>
                There's a story in Daniel that shows people seeing Jesus in your life through trials. Three Hebrew men were carried to Babylon and taught its ways. The king made a golden idol and commanded all to bow when the music sounded. The three refused, because it was against God's law. Summoned before the king, they still would not bow. Then Shadrach, Meshach, and Abed-nego said:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Daniel 3:16–18</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "O Nebuchadnezzar, we have no need to answer thee in this matter. If it be so, our God whom we serve is able to deliver us from the burning fiery furnace; and he will deliver us out of thy hand, O king. But if not, be it known unto thee, O king, that we will not serve thy gods, nor worship the golden image which thou hast set up."
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                In fury, the king ordered the furnace heated seven times hotter and had the three bound and thrown in. The fire was so hot it killed the men who threw them in. But then:
              </Paragraph>

              <div className="mb-6">
                <p className="font-semibold mb-2 text-purple-900">Daniel 3:24–26</p>
                <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800">
                  <p>
                    "Did not we cast three men bound into the midst of the fire?" They answered, "True, O king." He said, "Lo, I see four men loose, walking in the midst of the fire, and they have no hurt; and the aspect of the fourth is like a son of the gods." Then he called them out, and Shadrach, Meshach, and Abed-nego came forth from the fire.
                  </p>
                </blockquote>
              </div>

              <Paragraph>
                They came out unharmed and loosed. <strong>The only thing that burned was the ropes</strong>—and the ones who threw them in. When you go through a test of fire without bowing to the world or giving in to the enemy—even if God doesn't change the situation—and you can say like they did, "Even if God doesn't deliver me, I will not give in, I will not let go, I will not bow," then the only thing that will burn are the bondages that tried to hold you. The enemy won't touch you because you submitted to God through testing by fire. You will go through the fire without being burned. And like the refiner's fire, people will see Jesus in you. The people saw a visitation of Jesus in the middle of the fire, protecting them with His holy fire.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🙏 The Meaning of Their Names</p>
                <Paragraph>
                  Many don't realize that Shadrach, Meshach, and Abed-nego's Hebrew names were Hananiah, Mishael, and Azariah (see Daniel 2:17).
                </Paragraph>
                <BulletList>
                  <BulletItem><strong>Hananiah</strong> means "favor"</BulletItem>
                  <BulletItem><strong>Mishael</strong> means "like God"</BulletItem>
                  <BulletItem><strong>Azariah</strong> means "the Lord helps"</BulletItem>
                </BulletList>
                <Paragraph>
                  The king gave them Babylonian names after Babylon's gods. Their character stood firm. They had God's favor—right after they came out, the king promoted them. He also declared that no other god could save like the God of the Hebrews. God helped them—and because of this, people saw the Son of God in their lives.
                </Paragraph>
              </InfoBox>

              <WarningBox>
                <p className="font-semibold mb-2">🎯 Your Setback Might Be a Set-Up</p>
                <Paragraph>
                  Another reason God allows tests of fire is to promote you. <strong>Don't be discouraged—your setback might be a set-up.</strong>
                </Paragraph>
              </WarningBox>
            </PurpleSection>

            <RedSection>
              <h2 className="text-2xl font-bold mb-6 text-red-900">💔 A PERSONAL TESTIMONY OF FIRE</h2>
              <Paragraph>
                Here is the biggest test I've gone through. In August 2005, I received a call that my mother was brain-dead in the hospital, and people said her husband did it. I flew to New York. I saw my mother full of tubes, with cuts and scrapes on her arms and neck. I remembered two weeks earlier she told me, "Anthony, this man is going to kill me; he put a knife to my throat and cut me." I was looking at those scars. She had asked me for money, and I had said no because I was upset she stayed with him, even though I warned her.
              </Paragraph>

              <Paragraph>
                I prayed and fasted for days, asking God for strength not to lose it, because her husband was at the hospital the whole time. One day he came into the room. I stood up, and God put such peace on me. He talked about praying to some saint, and I told him the only way to the Father is Jesus. As days passed, God worked on me. One day, reading Jeremiah—"vengeance is the Lord's"—I knew what God wanted me to do.
              </Paragraph>

              <Paragraph>
                Days later my family decided to remove life support. God gave me peace about it. The doctors said there was no way she would recover, even though I knew God could raise the dead. If it was His will, He could have raised my mother.
              </Paragraph>

              <Paragraph>
                I told them to take the machines off. If it was God's will for her to live, the machine wouldn't stop it. The Lord's will came to pass, and He took her to heaven. Shortly after, we buried her, and God gave me grace to forgive and forget. I told her husband I wasn't crazy—I knew he did it—but I shook his hand and forgave him by God's grace.
              </Paragraph>

              <Paragraph>
                You might ask how I know he killed my mother. My wife's aunt was married to his son. When my wife asked her aunt what happened, she said, "I can't tell you because they will kill me too." He had been accused of more than one murder and never charged. The Bible says God directs government officials (Romans 13:1) and that vengeance is the Lord's. I would rather he be transformed and serve Christ—like Saul, who persecuted Christians but turned to Jesus and became Paul the apostle (Acts 9). Whatever God has planned for him, I pray for mercy on his soul.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🙏 From Anger to Peace</p>
                <Paragraph>
                  God gave me strength to get through the test. If you remember my testimony, I was very angry. I fought anyone who gave me attitude. I beat my wife and even threw my father through a wall. But in Christ, the old is gone and the new has come (2 Corinthians 5:17). <strong>If God got me through that test, He can get you through yours.</strong>
                </Paragraph>
              </InfoBox>

              <Paragraph>
                I believe God used that time to purify me from rage and anger. The enemy still tries to attack me with anger sometimes, but I give it to the Sanctifier, who purifies me more and more through tests of fire.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">📖 Test into Testimony</p>
                <Paragraph>
                  God also turned that test into a testimony. I wrote a book about it—<em>How God Moves</em>—about how God moved during that trial. The book ended up in the hands of a young girl whose mother was also murdered. She held unforgiveness toward the killer, was upset at God, and had stopped going to church. Someone from a church where I used to do outreach in Indianapolis gave her the book. She read it, and praise God, she returned to church.
                </Paragraph>
              </InfoBox>
              
              <WarningBox>
                <p className="font-semibold mb-2">💰 Lies About Following Christ</p>
                <Paragraph>
                  Some say, "I don't want to become a Christian because I'll be broke." That's a lie from Satan. If He does pull your wealth, it's either because you made money your god or because He wants you to show you will serve Him no matter what, like Job—and like Job, if you remain faithful, you'll be blessed double.
                </Paragraph>
                <Paragraph>
                  Others say, "I'll go through too much." God allows trials, but they are for our good. <strong>I'd rather go through hard things with God than without Him.</strong> God allowed me to go through a lot because otherwise I couldn't minister and connect with people in their pain. <strong>You can't give what you don't have.</strong> Get through the tests, and God will turn your test into a testimony—there's glory in the stories of God's people.
                </Paragraph>
              </WarningBox>
            </RedSection>

            <YellowSection>
              <h2 className="text-2xl font-bold mb-6 text-yellow-900">💎 THE SILVER FIRE - A MOTHER'S DREAM</h2>
              
              <Paragraph>
                I'll close with this: I recently learned my mother had a dream in August 2003. In it, she stood in a huge room full of stained glass with a bright light she couldn't look at shining through—she said the light looked like silver. She saw many people rushing to an open wooden doorway with no door, people from all nations. She rushed to go through too, but a woman at a desk stopped her: "Where are you going?" "Through the door," my mother said. The woman opened a huge book, searched the pages, and said, "Your name's not in the book."
              </Paragraph>

              <Paragraph>
                My mother asked, "Why does my name need to be in the book to go through the doorway?" The woman replied, <strong>"You have two years to turn Christian; then your name will be in this book and you can go through the doorway."</strong> Then my mother woke up.
              </Paragraph>

              <InfoBox>
                <p className="font-semibold mb-2">🙏 Praise God, She Made Heaven</p>
                <Paragraph>
                  Two years later, in August 2005, my mother died. <strong>Praise God, she made heaven.</strong>
                </Paragraph>
              </InfoBox>

              <Paragraph>
                Why mention the dream? She saw the light—God, a consuming fire. Why did the light look silver? I studied this. Our fires shine orange, blue, and purple because of impurities. But a fire without impurities shines bright white—like silver. <strong>Each test of fire you pass purifies you. The more purified you are, the more you shine like Jesus.</strong>
              </Paragraph>
              
              <InfoBox>
                <p className="font-semibold mb-2">🔥 Final Word from John Maxwell</p>
                <Paragraph>
                  <em>"Don't allow the fire of adversity to make you a skeptic. Allow it to purify you."</em>
                </Paragraph>
              </InfoBox>
            </YellowSection>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

