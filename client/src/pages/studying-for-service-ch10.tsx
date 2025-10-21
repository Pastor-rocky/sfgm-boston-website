import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh10() {
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
                  <span className="align-middle">Chapter 10: The Full Gospel</span>
                  <span className="text-2xl align-text-top ml-1">✝️</span>
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
              src="/studying-for-service-ch10.mp3"
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
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

