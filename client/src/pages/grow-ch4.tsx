import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function GrowCh4() {
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
                  <span className="align-middle">Chapter 4: Win - Go, Witness, Make Disciples</span>
                  <span className="text-2xl align-text-top ml-1">🎯</span>
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
              src="/grow-ch4.mp3"
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
            <h2 className="text-3xl font-bold text-orange-900 mb-6">
              🎯 CHAPTER 4: WIN
            </h2>

            <p className="mb-4">
              In this section we will discuss the importance of carrying out the church's mission—the great commission! It's time for the church to Win souls for the Kingdom of God.
            </p>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🌍 The Great Commission: Our Foundation
            </h3>

            <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-800 my-6 bg-orange-50 p-4 rounded">
              <p className="font-semibold text-orange-900 mb-2">Matthew 28:18-20</p>
              <p>
                Jesus came and told his disciples, "I have been given all authority in heaven and on earth. Therefore, go and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit. Teach these new disciples to obey all the commands I have given you. And be sure of this: I am with you always, even to the end of the age."
              </p>
            </blockquote>

            <p className="mb-4 text-lg font-semibold text-gray-800">
              We all know that verse by heart but are we doing it?
            </p>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⚠️ The Problem: Churches Growing Without Evangelizing
            </h3>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-3">
                I read an article about evangelism and it said the following statement...
              </p>
              <p className="text-gray-800 italic">
                "Some churches are growing. Others are adding members without significant numerical growth. But many in both categories are growing at the expense of other churches. Some may be reaching unchurched Christians. That's good, but that's not evangelism. We can fool ourselves into thinking we are evangelistic when we are simply recycling the saints."
              </p>
              <p className="text-gray-800 mt-3 font-semibold">
                We are seeing more than ever that the world is winning more people than the church. This is a problem!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              📊 Startling Statistics
            </h3>

            <p className="mb-4">
              I read some very interesting statistics on a website about missionaries. You can find a lot of these statistics at www.aboutmissions.org:
            </p>

            <div className="space-y-3">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-800">
                  <strong className="text-blue-900">Despite Christ's command to evangelize, 67% of all humans from AD 30 to the present day have never even heard the name of Jesus Christ.</strong> (Baxter 2007, 12)
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="text-gray-800">
                  <strong className="text-purple-900">91% of all Christian outreach/evangelism does not target non-Christians, but targets other Christians.</strong> (Baxter 2007, 12)
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="text-gray-800">
                  In the last 40 years, over 1 billion people have died who have never heard of Jesus, and around 30 million people this year will perish without hearing the message of salvation. (Baxter 2007, 12)
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <p className="text-gray-800">
                  <strong className="text-orange-900">70,000+ people die every day in the unreached world without Jesus.</strong> (Baxter 2007, 12)
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              ✨ The Solution: Following the Acts 2 Model
            </h3>

            <p className="mb-4">
              I believe if we do what we have discussed in the previous pages of this teaching of growth like leadership classes, challenging our people to read daily, discipleship programs, giving in time-talents and treasure, meeting with our people on a one-to-one and group fellowship meals and obeying above all, then God will add to the church His people and open up new doors of favor to go out and bring people to Christ and His church!
            </p>

            <p className="mb-4">
              Look what the Bible says in the book of Acts chapter two. You will see what we learned is what the disciples did! Then and only then God added to the church...
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2 text-center">🎯 "Growing ourselves, to Grow others, to Grow the Kingdom"</p>
            </div>

            <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-800 my-6 bg-green-50 p-4 rounded">
              <p className="font-semibold text-green-900 mb-3">Acts 2:42-47</p>
              <p>
                All the believers devoted themselves to the apostles' teaching, and to fellowship, and to sharing in meals (including the Lord's Supper), and to prayer.
                A deep sense of awe came over them all, and the apostles performed many miraculous signs and wonders. And all the believers met together in one place and shared everything they had. They sold their property and possessions and shared the money with those in need. They worshiped together at the Temple each day, met in homes for the Lord's Supper, and shared their meals with great joy and generosity—all the while praising God and enjoying the goodwill of all the people. And each day the Lord added to their fellowship those who were being saved.
              </p>
            </blockquote>

            <h3 className="text-2xl font-bold text-purple-900 mt-8 mb-4">
              🚶 It's Time to GO!
            </h3>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-2">
                That word "go" in Matthew 28, is a verb not a noun word. A verb is an action meaning. It's time we start acting on what God has said to do.
              </p>
              <p className="text-gray-800 font-semibold">
                Jesus' last word before He ascended into heaven should be the first thing we, the church should do!
              </p>
            </div>

            <h3 className="text-2xl font-bold text-red-900 mt-8 mb-4">
              ⚠️ Faith Without Action Is Dead
            </h3>

            <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-800 my-6 bg-red-50 p-4 rounded">
              <p className="font-semibold text-red-900 mb-3">James 2:14-20 (NKJV)</p>
              <p>
                What does it profit, my brethren, if someone says he has faith but does not have works? Can faith save him? If a brother or sister is naked and destitute of daily food, and one of you says to them, "Depart in peace, be warmed and filled," but you do not give them the things which are needed for the body, what does it profit? Thus also faith by itself, if it does not have works, is dead.
                But someone will say, "You have faith, and I have works." Show me your faith without your works, and I will show you my faith by my works. You believe that there is one God. You do well. Even the demons believe—and tremble! But do you want to know, O foolish man, that faith without works is dead?
              </p>
            </blockquote>

            <h3 className="text-2xl font-bold text-blue-900 mt-8 mb-4">
              💡 What Can We Do to Put Faith in Action?
            </h3>

            <h4 className="text-xl font-bold text-green-900 mt-6 mb-4">
              Practical Ideas to Help You Win People Over to The Lord
            </h4>

            <div className="space-y-4">
              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-green-900 mb-2">1️⃣ Call 3 and Visit 2</h4>
                <p className="text-gray-800">
                  We can start with something I call the 3-2 rule. It's something God showed me to do every day: call three people that haven't been in church to check up on and share a word and prayer. Also every day visit at least two houses of people that haven't been in church or are not in church. I usually go to another house to check up and encourage those who have been faithful to just let them know I appreciate them.
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-blue-900 mb-2">2️⃣ Outreach Programs</h4>
                <p className="text-gray-800">
                  Look for opportunities to impact the cities around you. Start by getting connected to people in the area that have influence over a few people and then start doing Bible studies with them and give them the vision of what you're planning. Then have them help you evangelize and bring people. Schedule a GO date you will start the outreach and then start advertising—give at least a month notice. Even if you don't establish a church in this city you would have at least ministered the gospel and it might add members to your church. Also you can even pray about doing outreaches further from your city, let The Spirit lead.
                </p>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-purple-900 mb-2">3️⃣ Schedule Special Events</h4>
                <p className="text-gray-800">
                  You can put on a golf tournament, a baseball game, a BBQ in the park, Food and Fellowship in the church and put on biblical plays. These types of events attract non-believers, because really they're coming to have fun, but during the event you can show them love and after the event have a time of worship and Word. Then check up on them and invite them to church. Stay on them!
                </p>
              </div>

              <div className="bg-pink-50 p-5 rounded-lg border-l-4 border-pink-500">
                <h4 className="font-bold text-pink-900 mb-2">4️⃣ Make Sure the Church is a Church of Love!</h4>
                <p className="text-gray-800 mb-3">
                  One of the biggest complaints is the servants and people who represent the church do not show love and make people comfortable. Sometimes the people love the Pastor but hate the servants. And because of this people don't come to the church and most importantly they don't come to God! Look at this true story to illustrate the point further...
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-5 my-6 rounded">
              <h4 className="font-bold text-red-900 mb-3 text-lg">🙏 Gandhi's Story</h4>
              <p className="text-gray-800 mb-3">
                Gandhi says that one Sunday morning, Gandhi decided he would visit one of the Christian churches in Calcutta, India. Upon seeking entrance to the church sanctuary, he was stopped at the door by the ushers. He was told he was not welcome, nor would he be permitted to attend this particular church as it was for high-caste Indians and whites only. He was neither high caste nor white. Because of the rejection, the Mahatma turned his back on Christianity.
              </p>
              <p className="text-gray-800 mb-3">
                With this act, Gandhi rejected the Christian faith, never again to consider the claims of Christ. He was turned off by the sin of segregation practiced by the church. It was because of this experience that Gandhi later declared, <strong>"I'd be a Christian if it were not for the Christians."</strong>
              </p>
              <p className="text-gray-800 font-semibold">
                Because of this one usher's bad example of Christ this man Gandhi turned away from Christ and His church. Now millions of people are gonna go to hell following Gandhi's Buddhism beliefs!
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded">
              <p className="text-gray-800 mb-2">
                Let's learn from this story and teach the servants to show love, shake hands and welcome everyone the same way because the Bible says...
              </p>
              <blockquote className="mt-3 italic text-gray-700">
                <p><strong>Matthew 18:6</strong> - "But if you cause one of these little ones who trusts in me to fall into sin, it would be better for you to have a large millstone tied around your neck and be drowned in the depths of the sea."</p>
              </blockquote>
            </div>

            <div className="space-y-4 mt-6">
              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-orange-900 mb-2">5️⃣ Change It Up</h4>
                <p className="text-gray-800">
                  I read somewhere, where it said that sheep never eat in the same place twice—that's why they are always grazing in the field. They have to eat in different places every time they eat. They're always looking for something new! The church can get very religious sometimes. That's why people leave the church cause they get bored. Let's be sensitive to The Spirit's leading and let's be shepherds that help the sheep eat by changing it up. Invite different ministers, have a Worship service with prayer and intercession, think of doing things outside the "box".
                </p>
              </div>

              <div className="bg-teal-50 p-5 rounded-lg border-l-4 border-teal-500">
                <h4 className="font-bold text-teal-900 mb-2">6️⃣ Schedule 3 Sunday Events</h4>
                <p className="text-gray-800 mb-2">
                  I was in a leadership class with Bryan Cutshall and he said that <strong>85% of people that come for Sunday service 3 times in a row end up becoming members of the church.</strong>
                </p>
                <p className="text-gray-800">
                  A great time to do this is over the Easter holiday. On Palm Sunday do a baptism, Easter do a Special baby dedication service then the Sunday after Easter do a food and fellowship service. Remember to announce these special services a month before to get people to invite their families. These types of services will always attract non-believers because they will come and support their families that are getting baptized and dedicated.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded">
              <p className="font-bold text-yellow-900 mb-2">🎯 "Growing ourselves, to Grow others, to Grow the Kingdom"</p>
            </div>

            <h3 className="text-2xl font-bold text-green-900 mt-8 mb-4">
              🌟 Final Thoughts
            </h3>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500 p-6 my-6 rounded-lg">
              <p className="text-gray-800 mb-3">
                The Great Commission is not a suggestion—it's a command. Jesus' final words before ascending to heaven should be our first priority as the church. We cannot afford to be comfortable while 70,000+ people die every day without hearing the name of Jesus.
              </p>
              <p className="text-gray-800 mb-3">
                The statistics are sobering: 91% of Christian outreach targets other Christians instead of the lost. We're recycling saints instead of rescuing souls. But there's hope! When we follow the Acts 2 model—devoting ourselves to teaching, fellowship, prayer, and genuine love—God adds to the church those who are being saved.
              </p>
              <p className="text-gray-800 mb-3">
                It's time to move from knowing the Great Commission to doing it. Faith without works is dead. Whether through the 3-2 rule, outreach programs, special events, or simply showing Christ's love to every person who walks through our doors, we must GO!
              </p>
              <p className="text-gray-800 mb-3">
                Remember Gandhi's tragic story—one usher's lack of love turned away a man whose influence affected millions. Let's ensure that our churches are known for love, not legalism; for welcoming, not walls; for reaching out, not turning away.
              </p>
              <p className="text-gray-800 font-semibold">
                The harvest is ready. The workers are few. But with Christ's authority backing us and His presence with us always, we can and must WIN souls for the Kingdom of God.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded text-center">
              <p className="font-bold text-yellow-900 text-xl">
                🎯 "Growing ourselves, to Grow others, to Grow the Kingdom"
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
