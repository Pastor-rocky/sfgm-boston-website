import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function StudyingForServiceCh4() {
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
                  <span className="align-middle">Chapter 4: Numbers Add Up</span>
                  <span className="text-2xl align-text-top ml-1">🔢</span>
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
              src="/studying-for-service-ch4.mp3"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

