import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";

export default function DontBeAJonahPlayerCh1() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button onClick={() => setLocation("/course/3")} variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Course
              </Button>
              <Button onClick={() => setLocation("/dont-be-a-jonah-complete-book")} variant="outline" className="text-white border-white/20 hover:bg-white/10">
                📖 Full Book
              </Button>
            </div>
            <h1 className="text-xl font-bold text-white">Don’t Be a Jonah - Chapter 1</h1>
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/dont-be-a-jonah-cover.jpg" 
                alt="Don't Be a Jonah Book Cover" 
                className="w-24 h-auto rounded shadow-sm flex-shrink-0"
              />
              <div>
                <h3 className="text-white text-2xl font-bold">🎶 Audiobook</h3>
                <p className="text-white/90 text-xl font-semibold">Chapter 1 🐋</p>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Button onClick={() => handleSkip(-15)} variant="ghost" className="text-white hover:bg-white/10" size="sm">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button onClick={handlePlayPause} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button onClick={() => handleSkip(15)} variant="ghost" className="text-white hover:bg-white/10" size="sm">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="px-2">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={([value]) => {
                    const audio = audioRef.current;
                    if (!audio) return;
                    audio.currentTime = value;
                    setCurrentTime(value);
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-white/70 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <Volume2 className="h-4 w-4 text-white" />
                <Slider value={[volume]} max={1} step={0.1} onValueChange={([v]) => setVolume(v)} className="w-24" />
              </div>

              <audio
                ref={audioRef}
                src="/uploads/textbook-audio/dont-be-a-jonah-ch1.mp3"
                preload="auto"
                onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Introduction</h2>
              <p>There are so many people in this world that are believers of Jesus Christ that are still going through life with no purpose, no goals, and no determination or plan to even change. There are also nonbelievers going through these same types of things in their life. On top of all this both nonbelievers and believers alike are facing all kinds of problems in their life like isolation, depression, discouragement, bitterness, suicidal thoughts, and unnecessary storms that are affecting them and the people around them. They have been swallowed up by all these life problems.</p>
              <p>Have you ever felt like you have been swallowed up and you feel like you are being consumed by all that is coming against you? You don't have to stay there! In life's hopeless situations it is usually the time where God is about to do something that will forever change your life either for good or for bad, the question is only what do you want the outcome to be? It is time to come out and step into your calling!</p>
              <p>The Bible says in the book of Psalms, "Unless the Lord builds the house, its builders labor in vain" (Psalms 127:1). The Hebrew word for vain provides a few different definitions—worthlessness, nothingness, disaster, and emptiness. This is why so many people are experiencing such devastation in their life. They are going through this because they're not allowing God to build and guide their lives because they are too busy trying to do it themselves.</p>
              <p>The reason for this is because whether they realize it or not they are running from the call that God has for their life! This call is the call of salvation, sacrifice, sanctification, and service. The only way to experience blessing, prosperity, fulfillment, peace, joy, and eternal life is answering the call of God to surrender to Him, serve Him, and obey Him with your heart and not just your mouth! God does not want just lip service, He wants heart service! God searches the heart.</p>
              <p>If you are tired of being empty, void, and discouraged and you want help to get out of the rut you're in and you're looking for direction to truly live a life pleasing unto God, then get ready because you are about to find out how by studying the story of Jonah found in The Bible. We will look at this prophet of God that knew the voice of God, knew the word and plan of God, but ran from the presence and call of God. He then experienced many problems because of this, then after many unnecessary storms he repented of his stubborn and rebellious attitude and answered the call that was on His life!</p>
              <p>We will learn from Jonah the repercussions of not serving and we will also find out the rewards and blessings of serving God by answering the call of God.</p>
              <p>Will you continue to run from God's call or will you stop and receive it? I Pray you will answer the call that God has for your life so you will truly stop running like Jonah and start serving like Jesus! Let the journey begin.</p>
              
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 1: Fighting Against God</h2>
              
              <div className="mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 1:1-4 NLT</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>The Lord gave this message to Jonah son of Amittai: "Get up and go to the great city of Nineveh. Announce my judgment against it because I have seen how wicked its people are."</p>
                </blockquote>
                <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                  <p>But Jonah got up and went in the opposite direction to get away from the Lord. He went down to the port of Joppa, where he found a ship leaving for Tarshish. He bought a ticket and went on board, hoping to escape from the Lord by sailing to Tarshish.</p>
                </blockquote>
                <blockquote className="border-l-4 border-yellow-400 pl-4 mb-6 italic text-gray-200">
                  <p>But the Lord hurled a powerful wind over the sea, causing a violent storm that threatened to break the ship apart.</p>
                </blockquote>
              </div>

              <p>God speaks by calling out to Jonah and telling him there's a city called Nineveh and a people there that are very wicked and need help. God tells Jonah, I'm choosing you to go and minister a Word to warn them!</p>
              
              <p>Sounds like a perfect job for a prophet of God, especially because this is the calling that God has chosen for Jonah—and Jonah is not ignorant of his calling. Instead of Jonah embracing the mission and call that God has for him, he runs from the presence of God and goes down to Joppa to board a ship that's headed to a city called Tarshish. I want to look at the cities in this chapter and explain the meanings of each city and how they apply to someone who is running from God.</p>
              
              <p>The Hebrew word for Joppa means beautiful. People that are running from God's call constantly try to fill a void in their life by trying to fill that void with "beautiful" things, like materialistic possessions maybe:</p>
              <ul className="list-disc list-inside ml-6 mb-4 space-y-1">
                <li>a car</li>
                <li>house</li>
                <li>clothing</li>
                <li>or jewelry</li>
              </ul>
              <p>These things might bring happiness for a moment but it will soon fade and you will begin looking for the next new car, house, and new trending designer, or the next beautiful place to go and visit. These "beautiful" things will never fill the void in your life; only God will fill the void when you embrace and receive the calling that God has for your life! Now don't get me wrong—it is not sin to have beautiful material things, just as long as those beautiful things don't have you!</p>
              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-yellow-300">💎 The Rich Young Ruler Story</p>
                <p>Explain; there was a rich young ruler who wanted to know how to receive salvation from Jesus and Jesus gave him a response that he couldn't handle...</p>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-300 mb-2">Mark 10:17-25 NLT</p>
                  <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                    <p>As Jesus was starting out on his way to Jerusalem, a man came running up to him, knelt down, and asked, "Good Teacher, what must I do to inherit eternal life?" "Why do you call me good?" Jesus asked. "Only God is truly good. But to answer your question, you know the commandments: 'You must not murder. You must not commit adultery. You must not steal. You must not testify falsely. You must not cheat anyone. Honor your father and mother.'" "Teacher," the man replied, "I've obeyed all these commandments since I was young." Looking at the man, Jesus felt genuine love for him. "There is still one thing you haven't done," he told him. "Go and sell all your possessions and give the money to the poor, and you will have treasure in heaven. Then come, follow me." At this the man's face fell, and he went away sad, for he had many possessions.</p>
                  </blockquote>
                  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-200">
                    <p>Jesus looked around and said to his disciples, "How hard it is for the rich to enter the Kingdom of God!" This amazed them. But Jesus said again, "Dear children, it is very hard to enter the Kingdom of God. In fact, it is easier for a camel to go through the eye of a needle than for a rich person to enter the Kingdom of God!"</p>
                  </blockquote>
                </div>
                
                <p>This rich young ruler didn't seem like too bad of a person, but he wasn't wiling to let go of the beautiful things that were holding him back from the call Jesus had for him. Jesus said, "Come follow me," but he wasn't willing, so he walked away disappointed and discouraged. This is how people walk around when they're putting the things of the world in front of serving Jesus. You don't have to walk around like this; all you have to do is trust God and let go and let God move in your life.</p>
              </div>
              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">🏖️ About Beautiful Places</p>
                <p>Some times people even try to go to "beautiful" places in an attempt to change the atmosphere around them to make them feel better. This does not work, because you can try to change all you want on the outside but it will never help you on the inside; it will never fill the void of the calling in your life. A few years ago I was in Israel and I was able to visit Joppa. It is truly beautiful—the atmosphere is amazing. The city sits on a natural bay on the Mediterranean Sea, with beautiful beaches loaded with tall green palm trees. What's not to like about Joppa? But if a person is running from God, I don't care how attractive a place is, you will not have joy, rest, or peace of mind. Jonah was there all while running from God; it's not about your location, it's about the destination that God has for you! For Jonah it wasn't Joppa, it was Nineveh.</p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">🏙️ About Nineveh</p>
                <p>Nineveh was a wicked evil city filled with:</p>
                <ul className="list-disc list-inside ml-6 mb-4 space-y-1">
                  <li>violence</li>
                  <li>witchcraft</li>
                  <li>sorcery</li>
                  <li>murderers</li>
                  <li>prostitution</li>
                  <li>and drunkards</li>
                </ul>
                <p>Just like the cities around us today that God has chosen us to impact, influence, and ignite the fire of God in their lives! It is time to stop running to the "beautiful" things and places for fulfillment—God has the fulfillment you need and you will only receive it when you are willing to allow God to change your life and the life of others around you through His Son Jesus!</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">📖 Acts Chapter 10 Connection</p>
                <p>In the New Testament, in Acts chapter 10, the disciple Peter was staying at Simon the tanners house in the city of Joppa and God showed him a vision. Basically, the vision was a representation of what he was to do regarding the Gentiles (non-Jewish people). God showed him he was to minister to the Gentiles about Jesus. At this point, no Jewish disciple was ministering to non-Jewish people, but Peter received the call from Joppa to minister to a sinful people. Even though it was against what he felt, he did what Jesus wanted him to do! It is time for us to do the same.</p>
              </div>
              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">⚓ Tarshish: The Breaking Point</p>
                <p>So maybe you're not ready to go to Nineveh, and for whatever reason you are not willing to fully serve God yet. Without realizing it, you like Jonah will be headed for Tarshish. What do I mean when I say this? Well, the Bible says Jonah paid the fare to go to Tarshish; when we run from our call we will begin to pay for our rebellious and stubborn attitudes. The Hebrew word Tarshish means "to break or fight against." The Bible says God sent a storm and the ship Jonah was on was about to break up!</p>
                
                <div className="bg-red-900/20 p-4 rounded border border-red-400/30 mt-4">
                  <p className="font-semibold text-red-300 mb-2">⚠️ Warning Signs:</p>
                  <ul className="list-disc list-inside ml-6 space-y-1">
                    <li>Do you have relationships that are about break up or have already disintegrated?</li>
                    <li>Is your family falling apart?</li>
                    <li>Do you feel you're headed towards a break down?</li>
                  </ul>
                  <p className="mt-3">When we continue to run from God's call on our life we will experience break downs, not break throughs. We actually are fighting against God, whether we acknowledge it or not. Have you been fighting against Gods call, plan, and purpose for your life?</p>
                </div>
              </div>

              <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-yellow-300">👨‍💼 The Story of Saul (Paul)</p>
                <p>If so, I want to show you what Jesus told a certain man named Saul from Tarsus…</p>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-300 mb-2">Acts 9:1-6 NKJV</p>
                  <blockquote className="border-l-4 border-yellow-400 pl-4 mb-4 italic text-gray-200">
                    <p>Then Saul, still breathing threats and murder against the disciples of the Lord, went to the high priest and asked letters from him to the synagogues of Damascus, so that if he found any who were of the Way, whether men or women, he might bring them bound to Jerusalem. As he journeyed he came near Damascus, and suddenly a light shone around him from heaven. Then he fell to the ground, and heard a voice saying to him, "Saul, Saul, why are you persecuting Me?" And he said, "Who are You, Lord?" Then the Lord said, "I am Jesus, whom you are persecuting. It is hard for you to kick against the goads."</p>
                  </blockquote>
                  <blockquote className="border-l-4 border-green-400 pl-4 mb-4 italic text-gray-200">
                    <p>So he, trembling and astonished, said, "Lord, what do You want me to do?" Then the Lord said to him, "Arise and go into the city, and you will be told what you must do."</p>
                  </blockquote>
                </div>
                
                <p>You probably guessed by now that this was the Apostle Paul before his conversion, also known as Saul. Paul, the writer of thirteen New Testament books and one of the greatest leaders in the Christian faith, wasn't always a good guy. He was religious, a Christian killer, and very angry and bitter. But God knocked him off his "high horse." If God can change him he can also change you!</p>
              </div>

              <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-600/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-gray-300">🐑 About Goads and Stubborn Sheep</p>
                <p>A goad was a shepherd's stick with spikes on it. It was used to discipline the stubborn sheep and oxen so that they would follow the path the shepherd was on, but sometimes these sheep acted very stubborn and stupid. They would kick against the goads and would end up only hurting themselves. The goad was to help the sheep on the shepherd's journey, but sometimes the sheep had a journey of their own in mind. When you run from God's call, you only hurt yourself even more all while the shepherd wants to help you on the journey that Jesus has for your life.</p>
                
                <blockquote className="border-l-4 border-blue-400 pl-4 mt-4 italic text-gray-200">
                  <p>"Whoever loves instruction loves knowledge, But he who hates correction is stupid." (Proverbs 12:1 NKJV)</p>
                </blockquote>
                
                <p className="mt-4">Don't be like the stupid, stubborn sheep—the Bible says in the book of Proverbs if a person doesn't take correction that person is stupid.</p>
              </div>

              <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-orange-300">🧠 The Definition of Insanity</p>
                <p>The clinical definition for insanity is "doing the same thing expecting a different result." Does that sound like your life? Going in circles, stuck in the same thing day after day? It's because we keep doing what we want and not what God wants. The Bible says God does not want His people ignorant (2 Corinthians 2:11).</p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 text-center">
                <p className="text-lg font-semibold mb-4 text-green-300">🎯 What's Next?</p>
                <p>So in the following chapters we are going to learn from this story of Jonah about the consequences of a person not willing to accept the call that God has for them and also learn what we have to be willing to do to receive the call God has for our life. When we do this, we can finally get on the right course in life to receive all that God has for us.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Required Bible Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.open('https://www.biblegateway.com/passage/?search=1+Timothy+1&version=NLT', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                📖 Read 1 Timothy 1 (NLT)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


