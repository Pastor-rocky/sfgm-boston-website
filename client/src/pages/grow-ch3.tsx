import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function GrowCh3() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Audio Player Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 border-none shadow-2xl">
          <CardContent className="p-6">
            {/* Cover and Title */}
            <div className="flex items-start gap-4 mb-6">
              <img 
                src="/grow-cover.png" 
                alt="G.R.O.W" 
                className="w-24 h-auto rounded shadow-lg"
              />
              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-1">
                  <span className="text-3xl align-text-top mr-1">🌱</span>
                  <span className="align-middle">G.R.O.W</span>
                </h3>
                <p className="text-white/90 text-xl font-semibold">
                  <span className="align-middle">Chapter 3: Obey - Listen and Apply God's Word</span>
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
                  <SkipBack className="h-5 w-5 mr-1" />
                  15s
                </Button>
                <Button
                  onClick={togglePlayPause}
                  size="lg"
                  className="h-16 w-16 rounded-full bg-white text-green-600 hover:bg-white/90 shadow-lg"
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
              src="/grow-ch3.mp3"
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
            <h2 className="text-3xl font-bold text-purple-900 mb-6">
              ✅ CHAPTER 3: OBEY
            </h2>

            <p className="mb-4">
              In this section we will cover the importance of Obeying God and teaching others to do the same.
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⚠️ The Consequence of Disobedience: King Saul's Fall
            </h3>

            <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-800 my-6 bg-red-50 p-4 rounded">
              <p className="font-semibold text-red-900 mb-3">1 Samuel 15:10-23</p>
              <p className="mb-2">
                Then the LORD said to Samuel, "I am sorry that I ever made Saul king, for he has not been loyal to me and has refused to obey my command." Samuel was so deeply moved when he heard this that he cried out to the LORD all night.
              </p>
              <p className="mb-2">
                Early the next morning Samuel went to find Saul. Someone told him, "Saul went to the town of Carmel to set up a monument to himself; then he went on to Gilgal."
              </p>
              <p className="mb-2">
                When Samuel finally found him, Saul greeted him cheerfully. "May the LORD bless you," he said. "I have carried out the LORD's command!"
              </p>
              <p className="mb-2">
                "Then what is all the bleating of sheep and goats and the lowing of cattle I hear?" Samuel demanded.
              </p>
              <p className="mb-2">
                "It's true that the army spared the best of the sheep, goats, and cattle," Saul admitted. "But they are going to sacrifice them to the LORD your God. We have destroyed everything else."
              </p>
              <p className="mb-2">
                Then Samuel said to Saul, "Stop! Listen to what the LORD told me last night!" "What did he tell you?" Saul asked.
              </p>
              <p className="mb-2">
                And Samuel told him, "Although you may think little of yourself, are you not the leader of the tribes of Israel? The LORD has anointed you king of Israel. And the LORD sent you on a mission and told you, 'Go and completely destroy the sinners, the Amalekites, until they are all dead.' Why haven't you obeyed the LORD? Why did you rush for the plunder and do what was evil in the LORD's sight?"
              </p>
              <p className="mb-2">
                "But I did obey the LORD," Saul insisted. "I carried out the mission he gave me. I brought back King Agag, but I destroyed everyone else. Then my troops brought in the best of the sheep, goats, cattle, and plunder to sacrifice to the LORD your God in Gilgal."
              </p>
              <p className="mb-3">
                But Samuel replied,
              </p>
              <p className="font-semibold text-red-900 ml-4">
                "What is more pleasing to the LORD:<br/>
                your burnt offerings and sacrifices<br/>
                or your obedience to his voice?<br/>
                Listen! Obedience is better than sacrifice,<br/>
                and submission is better than offering the fat of rams.<br/>
                Rebellion is as sinful as witchcraft,<br/>
                and stubbornness as bad as worshiping idols.<br/>
                So because you have rejected the command of the LORD,<br/>
                he has rejected you as king."
              </p>
            </blockquote>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-6 rounded">
              <p className="font-bold text-orange-900 mb-2">🔍 What is the bleating that's stopping your blessing?</p>
              <p className="text-gray-800 italic">
                "Then what is all the bleating of sheep and goats and the lowing of cattle I hear?" Samuel demanded.
              </p>
            </div>

            <h4 className="text-xl font-bold text-purple-900 mt-6 mb-3">
              Discussion Point: Saul's Disobedience and Love to Please the People
            </h4>

            <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800 bg-purple-50 p-3 rounded">
              <p><strong>1 Samuel 15:30-31</strong> - Saul said, "I did sin, but please honor me in front of the leaders of the army and the people of Israel. Come back with me, so I can worship the Lord your God." Samuel followed Saul back, and Saul worshiped the Lord.</p>
            </blockquote>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">🎯 "Growing ourselves, to Grow others, to Grow the Kingdom"</p>
              <p className="text-gray-800 font-semibold">
                Just because you worship God does not mean it's accepted, if you have disobedience in your life and care about what the people think more than God!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              🏛️ David's Mistake: The Wrong Way to Bring God's Presence
            </h3>

            <p className="mb-4">
              King David takes the Kingdom after Saul and one of the first things he does is bring the ark of the covenant back to Jerusalem. But something happens in the midst of what looked like one of the greatest revivals in Israel with 30,000 people in attendance and every instrument known at that time playing accompanied by singing and dancing. It all came to a stop because of disobedience which led to someone's death!
            </p>

            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 my-6 bg-blue-50 p-4 rounded">
              <p className="font-semibold text-blue-900 mb-3">2 Samuel 6:6-11</p>
              <p className="mb-2">
                But when they arrived at the threshing floor of Nacon, the oxen stumbled, and Uzzah reached out his hand and steadied the Ark of God. Then the LORD's anger was aroused against Uzzah, and God struck him dead because of this. So Uzzah died right there beside the Ark of God.
              </p>
              <p className="mb-2">
                David was angry because the LORD's anger had burst out against Uzzah. He named that place Perez-uzzah (which means "to burst out against Uzzah"), as it is still called today.
              </p>
              <p>
                David was now afraid of the LORD, and he asked, "How can I ever bring the Ark of the LORD back into my care?" So David decided not to move the Ark of the LORD into the City of David. Instead, he took it to the house of Obed-edom of Gath. The Ark of the LORD remained there in Obed-edom's house for three months, and the LORD blessed Obed-edom and his entire household.
              </p>
            </blockquote>

            <h4 className="text-xl font-bold text-red-900 mt-6 mb-3">
              Why did God allow this?
            </h4>

            <p className="mb-4">
              The Bible says that the ark of the covenant was supposed to be carried by the poles that were attached to the ark and then placed on the shoulders of the priest (Deuteronomy 10:8). No one was supposed to touch the ark of the covenant because it represents God's Glory and presence.
            </p>

            <p className="mb-4">
              Why did David carry the ark on a new cart? The Bible says the Philistines when they stole the ark, years before they placed the ark on a cart (1 Samuel 6:10). <strong className="text-red-900">David tried to bring God's presence in the city the world's way!</strong>
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-3">
                When we try to change our cities with God's Presence we have to do it God's way, not the world's way. Because it does not matter how small or how big the congregation and it's not how many servants you have and how great your choir is, if you are not obeying God and His word we will experience the same thing David did:
              </p>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                <li>Disappointment</li>
                <li>Anger</li>
                <li>Frustration</li>
                <li>Hurt</li>
              </ul>
              <p className="text-gray-800 mt-3">
                Also the people will die spiritually, celebration and rejoicing will cease and the blessing of God's presence will go to another house (church/Obed-edom).
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">🎯 "Growing ourselves, to Grow others, to Grow the Kingdom"</p>
              <p className="text-gray-800 font-semibold">
                Also remember this happened before King David's adulterous affair and before he murdered and fell into pride! Meaning small disobedience is still disobedience!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              ✨ David's Redemption: Learning from Mistakes
            </h3>

            <p className="mb-4">
              David went home, learned from his mistakes, found out through the Word what he did wrong and corrected it.
            </p>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p className="font-semibold text-green-900 mb-3">2 Samuel 6:12-15</p>
              <p className="mb-2">
                Then King David was told, "The LORD has blessed Obed-edom's household and everything he has because of the Ark of God." So David went there and brought the Ark of God from the house of Obed-edom to the City of David with a great celebration. After the men who were carrying the Ark of the LORD had gone six steps, David sacrificed a bull and a fattened calf. And David danced before the LORD with all his might, wearing a priestly garment. So David and all the people of Israel brought up the Ark of the LORD with shouts of joy and the blowing of rams' horns.
              </p>
            </blockquote>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded">
              <p className="text-gray-800 font-semibold">
                That's why we are here today... To learn what's wrong, to correct the wrong and to go back and lead others to do the same. So together we will rejoice again with shouts of Joy!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              📚 Biblical Commands for Obedience
            </h3>

            <div className="space-y-4">
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Jeremiah 42:6</strong> - "Whether we like it or not, we will obey the LORD our God to whom we are sending you with our plea. For if we obey him, everything will turn out well for us."</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Jeremiah 7:23</strong> - "But this is what I commanded them, saying, 'Obey My voice, and I will be your God, and you will be My people; and you will walk in all the way which I command you, that it may be well with you.'"</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>Exodus 23:21</strong> - "Be on your guard before him and obey his voice; do not be rebellious toward him, for he will not pardon your transgression, since My name is in him."</p>
              </blockquote>

              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-800 bg-blue-50 p-3 rounded">
                <p><strong>2 Corinthians 10:5</strong> - "We are destroying speculations and every lofty thing raised up against the knowledge of God, and we are taking every thought captive to the obedience of Christ."</p>
              </blockquote>
            </div>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              👥 Teaching Others to Obey
            </h3>

            <p className="mb-4">
              We are also taught to teach others to obey as well.
            </p>

            <div className="space-y-4">
              <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800 bg-purple-50 p-3 rounded">
                <p><strong>Romans 1:5</strong> - "Through whom we have received grace and apostleship to bring about the obedience of faith among all the Gentiles for His name's sake."</p>
              </blockquote>

              <blockquote className="border-l-4 border-purple-400 pl-4 mb-4 italic text-gray-800 bg-purple-50 p-3 rounded">
                <p><strong>Joshua 1:7-8</strong> - "Be strong and very courageous. Be careful to obey all the instructions Moses gave you. Do not deviate from them, turning either to the right or to the left. Then you will be successful in everything you do. Study this Book of Instruction continually. Meditate on it day and night so you will be sure to obey everything written in it. Only then will you prosper and succeed in all you do."</p>
              </blockquote>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🎯 Practical Ideas to Help You Obey
            </h3>

            <div className="space-y-4">
              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-900 mb-2">1️⃣ Apply God's Word No Matter What</h4>
                <p className="text-gray-800">
                  Whatever situation you find yourself in whether it be trial, test or temptation do what the Word says no matter what! Think on the word. (If you don't know what it says in regards to your situation, find out and obey it!)
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-900 mb-2">2️⃣ Don't Set Yourself Up to Fail</h4>
                <p className="text-gray-800 mb-2">
                  If you know you're struggling in a certain area, don't allow yourself to be tempted by going there, watching it, listening to it, and hanging out with certain people and stay away from certain places.
                </p>
                <p className="text-gray-800">
                  Romans 13:14 says... "But put ye on the Lord Jesus Christ, and make not provision for the flesh, to fulfil the lusts thereof". <strong>IN SHORT DON'T SET YOURSELF UP TO FAIL!</strong>
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-900 mb-2">3️⃣ Read God's Word Daily</h4>
                <p className="text-gray-800">
                  I know we covered this in the last section but I can't stress it enough, because the more you read the more you're led to obey that which you have read!
                </p>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-orange-900 mb-2">4️⃣ Teach Obedience</h4>
                <p className="text-gray-800">
                  Don't get so caught up in preaching the people happy you forget to teach them to obey God in their daily living. You can do this by incorporating application points in your message. (Like if I was teaching people about obeying God I would give them the application points I just gave you! 1. Apply God's Word. 2. Don't set yourself up to fail. 3. Teach others to obey 4. Read the Word daily)
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              🔥 Conclusion
            </h3>

            <div className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-500 p-6 rounded-lg">
              <p className="text-lg font-bold text-red-900 text-center mb-2">
                REMEMBER: OBEDIENCE IS BETTER THAN SACRIFICE
              </p>
              <p className="text-gray-800 text-center">
                BUT TRULY YOU CAN'T HAVE OBEDIENCE IF YOU'RE NOT WILLING TO SACRIFICE OR CRUCIFY THE FLESH TO OBEY. BUT IT'S WELL WORTH THE BLESSING SO GET RID OF THE BLEATING!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
