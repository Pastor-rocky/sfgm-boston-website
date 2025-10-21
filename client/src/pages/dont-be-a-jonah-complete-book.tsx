import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2, Download } from "lucide-react";
import { AudioPlayerTextTemplate } from "@/components/audio-player-text-template";

export default function DontBeAJonahCompleteBook() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const downloadPDF = () => {
    // Open the PDF for Don't Be a Jonah
    window.open('/pdfs/Dont%20Be%20A%20Jonah%20Book.pdf', '_blank');
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    { id: 1, title: "Chapter 1: Fighting Against God", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch1.mp3" },
    { id: 2, title: "Chapter 2: The Bitter Root", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch2.mp3" },
    { id: 3, title: "Chapter 3: Deep Depression", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch3.mp3" },
    { id: 4, title: "Chapter 4: The Isolation Trap", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch4.mp3" },
    { id: 5, title: "Chapter 5: Unnecessary Storms", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch5.mp3" },
    { id: 6, title: "Chapter 6: Hell No, Let's Go", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch6.mp3" },
    { id: 7, title: "Chapter 7: God of Second Chances", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch7.mp3" },
    { id: 8, title: "Chapter 8: Your Mess is a Message", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch8.mp3" },
    { id: 9, title: "Chapter 9: Signs of Jonah", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch9.mp3" },
    { id: 10, title: "Chapter 10: Where is Your Nineveh?", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch10.mp3" },
    { id: 11, title: "Chapter 11: Leaving a Legacy", audioUrl: "/uploads/textbook-audio/dont-be-a-jonah-ch11.mp3" }
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
        case 3:
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Chapter 3: Deep Depression</h2>
              
              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">📖 Understanding Depression</p>
                <p className="text-purple-200 leading-relaxed mb-4">
                  I recently read part of an article describing depression as follows:
                </p>
                <p className="text-purple-200 leading-relaxed mb-4">
                  Depression, in psychology, a mood or emotional state that is marked by feelings of low self-worth or guilt and a reduced ability to enjoy life. A person who is depressed usually experiences several of the following symptoms: feelings of sadness, hopelessness, or pessimism; lowered self-esteem and heightened self-depreciation; a decrease or loss of ability to take pleasure in ordinary activities; reduced energy and vitality; slowness of thought or action; loss of appetite; and disturbed sleep or insomnia.
                </p>
                <p className="text-purple-200 leading-relaxed mb-4">
                  Depression differs from simple grief or mourning, which are appropriate emotional responses to the loss of loved persons or objects. Where there are clear grounds for a person's unhappiness, depression is considered to be present if the depressed mood is disproportionately long or severe vis-à-vis the precipitating event.
                </p>
                <p className="text-purple-200 leading-relaxed">
                  The world tries to fix depression in many ways such as psychiatrists, drugs, drinking, relationships with people, and even suicide.
                </p>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 1:3-5 KJV</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"But Jonah rose up to flee unto Tarshish from the presence of the Lord, and went down to Joppa; and he found a ship going to Tarshish: so he paid the fare thereof, and went down into it, to go with them unto Tarshish from the presence of the Lord. But the Lord sent out a great wind into the sea, and there was a mighty tempest in the sea, so that the ship was like to be broken. Then the mariners were afraid, and cried every man unto his god, and cast forth the wares that were in the ship into the sea, to lighten it of them. But Jonah was gone down into the sides of the ship; and he lay, and was fast asleep."</p>
                </blockquote>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">😴 The Sleep of Depression</p>
                <p className="text-red-200 leading-relaxed mb-4">
                  One of the most common clinical sicknesses around the world is depression! One of the most common side effects of depression is wanting to sleep. Why? You don't want to face the day—you would rather sleep your life away than face it. As soon as Jonah gets on the boat he goes to sleep. Many of us are trying to sleep through our lives because we don't want to face the things that come against us.
                </p>
                <p className="text-red-200 leading-relaxed">
                  The worst thing about depression is that it causes a spiritual sleep in the believer that brings them to a place where they don't want to do anything for the Lord any more.
                </p>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📖 Ephesians 5:13-16 NLT</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"But their evil intentions will be exposed when the light shines on them, for the light makes everything visible. This is why it is said, 'Awake, O sleeper, rise up from the dead, and Christ will give you light.' So be careful how you live. Don't live like fools, but like those who are wise. Make the most of every opportunity in these evil days."</p>
                </blockquote>
              </div>

              <p className="mb-4 text-gray-200">Hopefully this chapter will wake you up to this attack of depression.</p>

              <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-yellow-300">📉 The Downward Spiral</p>
                <p className="text-yellow-200 leading-relaxed mb-4">
                  Jonah begins a spiral downwards as soon as he runs from the call God placed on his life. Think about it—he goes down to Joppa, down in the boat, and he ends up going down in the belly of the fish!
                </p>
                <p className="text-yellow-200 leading-relaxed mb-4">
                  When you're not excepting God's call on your life you will be brought down low! Think about hills and valleys. A valley always comes between two hills. Another word for valley is depression. When a person is depressed they are in a spiritual valley! This is why the enemy wants to bring you down low.
                </p>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📖 Psalms 121:1-4 KJV</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the Lord, which made heaven and earth. He will not suffer thy foot to be moved: he that keepeth thee will not slumber. Behold, he that keepeth Israel shall neither slumber nor sleep."</p>
                </blockquote>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🏔️ Hills and Valleys</p>
                <p className="text-green-200 leading-relaxed mb-4">
                  A hill in the Bible represents victory and the blessing of God. There is always one hill behind and one hill in front of a valley. When a person is in a spiritual valley, they look back to the hill of blessing where they were and they feel regret and condemnation because they were in a place of blessing but something made them fall. They look to the hill in front of them and think it's too hard to get where they need to be, so they just end up settling in the valley.
                </p>
                <p className="text-green-200 leading-relaxed">
                  It is a sad truth that many people never make it out because they never obey the call to get out and help others do the same.
                </p>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">💀 The Valley of Dry Bones</p>
                <p className="text-blue-200 leading-relaxed mb-4">
                  You kind of see the consequences of those who do not make a decision to get out of a valley illustrated in the book of Ezekiel in chapter 37. God takes Ezekiel and shows him an entire valley of dry bones! But the prophet Ezekiel listened to God and prophesied to those bones and they got out of that valley! I'm prophesying in the name of Jesus you'll get out of yours too! Say Amen!
                </p>
                <p className="text-blue-200 leading-relaxed">
                  In Psalms 23 the psalmist said, "though I walk through the valley I will fear no evil because I'm with the shepherd." Jonah wasn't willing to obey the shepherd's voice. He was like the sheep that wandered rebelliously and refused to answer the call, so he was brought down low in a spiritual valley!
                </p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">👻 The Spirit of Heaviness</p>
                <p className="text-red-200 leading-relaxed mb-4">
                  God showed me the spirit that is at work in the hearts of the people that are dealing with depression. You see our battle isn't against flesh and blood but against spiritual forces. He showed me this when I was eating at a restaurant one day and I noticed a man I knew in the restaurant that attended our church but was missing regular church attendance for months.
                </p>
                <p className="text-red-200 leading-relaxed mb-4">
                  So I went up to him, shook his hand and greeted him, and asked how he was doing. He said he was fine. We talked for a few minutes, then we both went back to our tables and a few moments later some people with me at the table asked if I was ok. They asked this because I looked discouraged and was very quiet. I told them I was fine, but they were right; I felt discouraged and depressed. I wasn't earlier, so I began to ask God what was going on with me.
                </p>
                <p className="text-red-200 leading-relaxed">
                  He ministered to me that the feelings and emotions I was feeling of depression and hopelessness were because the man that was in the restaurant with me was feeling the same mixed emotions!
                </p>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">🎭 The Spirit of Heaviness Revealed</p>
                <p className="text-purple-200 leading-relaxed mb-4">
                  God revealed to me the spirit that was bothering him was the spirit of heaviness. We read about this spirit in the book of Isaiah 61:3, when God says he turn beauty into ashes and provide a garment of praise in exchange for a spirit of heaviness.
                </p>
                <p className="text-purple-200 leading-relaxed mb-4">
                  I began to read up and study about the spirit of heaviness right there in the restaurant and found out that this spirit makes you feel hopeless, discouraged, robs your faith, makes you think no one cares, like no one loves you, and stops your praise because you don't feel good enough to serve God. Because of all these emotions it even brings thoughts of suicide!
                </p>
                <p className="text-purple-200 leading-relaxed">
                  So after finding all this out I went back to the man's table and asked if I can speak to him privately. He agreed and I asked him if he felt any of these things I just mentioned. He said, "Pastor, how do you know all this? I feel every one of these things you just described." I began to tell him that God allowed me to feel what he was feeling to minister the truth to him and to expose the lies of the enemy!
                </p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🙏 The Power of Prayer</p>
                <p className="text-green-200 leading-relaxed mb-4">
                  We began to pray right there in the restaurant against the attack of the spirit of heaviness. The reason this man was able to be attacked, and for this attack to work on the him, was because he was living a lifestyle of sin and rebelliousness towards God. He was running from His call!
                </p>
                <p className="text-green-200 leading-relaxed">
                  The Bible tells us in God's presence there is fullness of joy (Psalms 16:11), and where the Spirit of the Lord is there is freedom! (2 Corinthians 3:17) But remember, the Bible tells us Jonah was running from the presence of God! When you run from your call you run from God's presence! Outside His presence it's the opposite of joy—it's depression! Outside of His presence is bondage and burdens!
                </p>
              </div>

              <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-red-300">💀 When Depression Leads to Suicide</p>
                <p className="text-red-200 leading-relaxed mb-4">
                  When depression isn't taken care of it gets to a point of thoughts of suicide. Jonah comes to a point of telling the people to throw him overboard. He even tells God at one point it's better for him to die. He would rather die than do what God has called him to do.
                </p>
                <p className="text-red-200 leading-relaxed">
                  One of the Hebrew definitions for depression is dĕ'agah, which means anxiety, fear, heaviness, or sorrow. How do you deal with anxiety? Simply submit your life to God's will and instead of trying to deal with your problems alone and complain about them, pray about them and put it before the Lord.
                </p>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📖 Philippians 4:6 ASV</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"In nothing be anxious; but in everything by prayer and supplication with thanksgiving let your requests be made known unto God."</p>
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📖 Isaiah 61:1-7 KJV</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"The Spirit of the Lord God is upon me; because the Lord hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound; To proclaim the acceptable year of the Lord, and the day of vengeance of our God; to comfort all that mourn; To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they might be called trees of righteousness, the planting of the Lord, that he might be glorified."</p>
                </blockquote>
              </div>

              <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-purple-300">⛪ Personal Testimony: My Battle with Depression</p>
                <p className="text-purple-200 leading-relaxed mb-4">
                  Before I accepted the call that God placed on my life I was very rebellious and disobedient. I went to church, worshipped God, gave in the offering, and even told people about how good God was; however, secretly I was fighting depression because no matter what I accomplished and what I tried to do to be happy, it didn't work. It's because I had religion but not a true relationship with God.
                </p>
                <p className="text-purple-200 leading-relaxed mb-4">
                  I wasn't willing to obey God and repent of my sinful and rebellious lifestyle. The depression got so bad that twice I tried committing suicide. The last time I tried I took a whole bottle of pills and fell asleep, but an hour later I got up out of my sleep throwing up. My cousin that was in the house called my uncle, and when he saw me he knew there was something wrong.
                </p>
                <p className="text-purple-200 leading-relaxed">
                  I wouldn't tell them what I did, and at this point I was delusional and talking crazy. So they forced me in a car, drove me to the emergency room, and the doctors found out what I had done and immediately began the process to help me. Three days later a doctor came in and told me if the pills would have been in my system for another hour or so I would have been dead!
                </p>
              </div>

              <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                <p className="text-lg font-semibold mb-4 text-green-300">🌟 God's Grace and Purpose</p>
                <p className="text-green-200 leading-relaxed mb-4">
                  I thank God because he allowed me to live and not die so I can warn people about not running from their calling and start serving God so they can receive the fullness of joy and help others do the same.
                </p>
                <p className="text-green-200 leading-relaxed mb-4">
                  I also have personal friends that have committed suicide. The sad part is I never knew they were dealing with suicidal thoughts. I never knew they were being attacked with depression. If I had known then what I know now, I would have known how to help them. The biggest sign of a person that's dealing with depression is a person running from serving God!
                </p>
                <p className="text-green-200 leading-relaxed">
                  Maybe you're not dealing with the spirit of heaviness but maybe you know someone who isn't willing to serve God and obey the calling that God has placed on their life. Allow them to read this chapter. After you're done reading this book, give it to a person that needs a word of hope in the midst of their depression—you never know, you might just save a life!
                </p>
              </div>

              <div className="mb-6">
                <p className="text-lg font-semibold mb-4 text-blue-300">📖 2 Corinthians 7:5-6 AMP</p>
                <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                  <p>"For even when we arrived in Macedonia our bodies had no rest, but we were oppressed at every turn--conflicts and disputes without, fears and dread within. But God, who comforts and encourages the depressed and the disquieted, comforted us by the arrival of Titus."</p>
                </blockquote>
              </div>

              <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 text-center">
                <p className="text-lg font-semibold mb-4 text-blue-300">🎯 Conclusion: Put on the Garment of Praise</p>
                <p className="text-blue-200 leading-relaxed mb-4">
                  God comforts the depressed and He also uses people to help others who are depressed. Don't allow depression to get the best of you; deal with it and allow God to remove the spirit of heaviness and place on you the garment of praise.
                </p>
                <p className="text-blue-200 leading-relaxed">
                  Just like a garment, you have to put it on! Start putting your praise on again—get your prayer life back and get in His word, for it's the medicine for the soul and it's the only medicine you need for fighting deep depression in Jesus' name!
                </p>
              </div>
            </div>
          );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-orange-300">Chapter 4: The Isolation Trap</h2>
            
            <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-orange-300">🏝️ The Dangers of Isolation</p>
              <p className="text-orange-200 leading-relaxed mb-4">
                I want to spend just a few moments in this chapter discussing the dangers of being isolated.
              </p>
              <p className="text-orange-200 leading-relaxed mb-4">
                Jonah was always by himself, alone in the ship, alone on the mountain. He was always alone. Why? Because the enemy wants to get you alone to speak his lies and make you feel like you are by yourself and no one cares.
              </p>
              <p className="text-orange-200 leading-relaxed">
                Proverbs 18:1 says, "A man who isolates him self seeks his own desire; He rages against all wise judgment."
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 The Hebrew Word for Isolation</p>
              <p className="text-gray-200 leading-relaxed mb-4">
                The Hebrew word for isolation here is the word parad. It means to separate, break into pieces, to divide, to make a division, be out of joint and to break (BLB Lexicon).
              </p>
              <p className="text-gray-200 leading-relaxed">
                When you search the Bible you will see it is often when people were alone when the enemy attacked them with discouragement and temptation the most. This caused them to be separated from the people that cared for them. It lead to divisions and even caused people to break God's law—breaking covenant with God!
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">🔥 Elijah's Isolation Trap</p>
              <p className="text-red-200 leading-relaxed mb-4">
                For instance, look at what took place with Elijah in the book of 1 Kings. We see that he just experienced a major victory from the Lord, defeating the 850 false prophets of the evil Queen Jezebel. He had help killing all these false prophets because the people of Israel helped him. Something happened after the victory, though—Jezebel found out and sent messengers to threaten Elijah. This is what she said:
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 1 Kings 19:2-4 NASB</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Then Jezebel sent a messenger to Elijah, saying, 'So may the gods do to me and even more, if I do not make your life as the life of one of them by tomorrow about this time.' And he was afraid and arose and ran for his life and came to Beersheba, which belongs to Judah, and left his servant there. But he himself went a day's journey into the wilderness, and came and sat down under a juniper tree; and he requested for himself that he might die, and said, 'It is enough; now, O LORD, take my life, for I am not better than my fathers.'"</p>
              </blockquote>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">😰 The Enemy's Strategy</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                This caused Elijah to run away from Jezebel, resulting in him being alone, driven by fear and isolated from everyone. While Elijah was with his people and they were unified in taking out the enemy he had victory, but as soon as the enemy isolated him, he began expressing his desire to just die! He also exaggerated about how he was the "only" one left out of God's people. God reassured him that there were still 7000 people left that didn't bow down to the idolatry Israel had fallen into. (1 Kings 19:18)
              </p>
              <p className="text-yellow-200 leading-relaxed">
                This is why the enemy wants to get you alone—to feel like you're the "only" one going through this, you're the "only" one suffering. Then you begin to exaggerate your situation, even though God took you through your biggest battles and you knew you were not alone. You end up running from the lie of the enemy because he has isolated you and such despair has set it that you no longer even want to be around people that can encourage you and lift you up! Because of this, like Elijah we sometimes feel like giving up and saying well we might as well die! We give up hope.
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">👑 King David's Isolation Trap</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                Another Example is King David. One time while David was king of Israel, he stayed home from a battle instead of leading his army. Kings were supposed to be on the battle field with their men. David felt like his men could take care of the battle, and besides he wanted to be lazy and he slept in that day. The enemy got him by himself, and led David out onto the balcony of his palace where he saw a woman named Bathsheba taking a bath. The enemy got him isolated! David fell for the lust of the eye and ended up committing adultery and even had Bathsheba's husband Uriah murdered to cover up his sin. (2 Samuel 11)
              </p>
              <p className="text-purple-200 leading-relaxed">
                We find out through the prophet Nathan that David wasn't alone in the spirit realm; the enemy was there with him! The prophet illustrates God's point about how he feels about David's sinful actions. Nathan uses a story about a man that had many sheep and was rich, but took a poor man's one and only sheep that he loved and cared for to prepare it for a "visitor" that visited this rich man. Who was the visitor? The enemy!
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 2 Samuel 12:7-10 NASB</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Nathan then said to David, 'You are the man! Thus says the LORD God of Israel, 'It is I who anointed you king over Israel and it is I who delivered you from the hand of Saul. I also gave you your master's house and your master's wives into your care, and I gave you the house of Israel and Judah; and if that had been too little, I would have added to you many more things like these! Why have you despised the word of the LORD by doing evil in His sight? You have struck down Uriah the Hittite with the sword, have taken his wife to be your wife, and have killed him with the sword of the sons of Ammon. Now therefore, the sword shall never depart from your house, because you have despised Me and have taken the wife of Uriah the Hittite to be your wife.'"</p>
              </blockquote>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">💔 The Consequences of Isolation</p>
              <p className="text-red-200 leading-relaxed mb-4">
                This all started when isolation and laziness came into David's life. David condemns himself, hurts his people, loses the first baby that he has with Bathsheba, and because he had blood on his hands due to the murder of Uriah he was not able to build the temple! (1 Chronicles 28:3) How did it all start? The isolation trap!
              </p>
              <p className="text-red-200 leading-relaxed">
                Don't allow the enemy to come and "visit" you and cause you to be isolated. Wake up to it and realize the trap of the enemy! Jonah was just another person caught in the isolation trap and because of this he experienced many negative things he didn't have to.
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🤝 The Power of Community</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Look at these Bible verses about the importance and benefits of staying connected to fellow believers...
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Matthew 18:19-20 NASB</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Again I say to you, that if two of you agree on earth about anything that they may ask, it shall be done for them by My Father who is in heaven. For where two or three have gathered together in My name, I am there in their midst."</p>
              </blockquote>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Ecclesiastes 4:9-12 NASB</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Two are better than one because they have a good return for their labor. For if either of them falls, the one will lift up his companion. But woe to the one who falls when there is not another to lift him up. Furthermore, if two lie down together they keep warm, but how can one be warm alone? And if one can overpower him who is alone, two can resist him. A cord of three strands is not quickly torn apart."</p>
              </blockquote>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Hebrews 10:24-25 NASB</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"And let us consider how to stimulate one another to love and good deeds, not forsaking our own assembling together, as is the habit of some, but encouraging one another; and all the more as you see the day drawing near."</p>
              </blockquote>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🌟 The Importance of Fellowship</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                You can see how these scriptures show us that it is very important to have fellowship and relationships with people of faith to strengthen our own faith and help our walk with Christ. So don't allow the enemy to make you fall for the isolation trap. Get out, stay out, and help others get out by accepting them for who they are and showing them the love of Christ.
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">⛪ Personal Testimony: Breaking Free from Isolation</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                I was in a certain city ministering about Jonah. I was talking about all the information that's in this book, like when you're running from God you will start fighting against God, grow bitter, become depressed and isolated, and go through unnecessary storms.
              </p>
              <p className="text-purple-200 leading-relaxed mb-4">
                After the altar call a person came up to me and said, "Pastor, you don't know how bad I needed to hear this message." She said for three days I've been depressed, mad at everyone, not wanting to be around anyone, and staying in my room in the dark with a knife wanting to kill myself! Then she said, "But now I know it's the enemy and I will stop and do what God wants me to do!" God used that preaching to break her free from the isolation trap!
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">🎭 The Enemy's Lies</p>
              <p className="text-red-200 leading-relaxed mb-4">
                See, we think it's just that we don't want to be around anyone. You might find yourself saying, "I just want to be alone for a little bit and not deal with anything." Or we may say "Everyone's fake—I'd rather just do my own thing." But what you need to understand is the enemy is whispering that in our ear to get us trapped!
              </p>
              <p className="text-red-200 leading-relaxed">
                If you are isolated, you need to get connected to the body of Christ and get under a man of God that can pour into you, and people of God that will care for you. Don't allow the enemy to trick you into falling into the isolation trap!
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🤝 How to Help Others</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Stop allowing the enemy to isolate you, because as we found out it can destroy us and the people around us that we love.
              </p>
              <p className="text-green-200 leading-relaxed">
                Do you know someone that's isolated? Go encourage them—call them to a fellowship dinner or invite them to just hang out. Go to them and show them what this chapter says. In doing this you can rescue them from the isolation trap. Don't give up on them! Why? Because Jesus never gave up on you!
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">✝️ Jesus in the Isolation Trap</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                When I was in Israel in 2018 we went to a location where Jesus was placed in a pit for the night before they put him on trial. I was in this pit—it is cold, dark, with no windows, and you feel all alone with no hope. The psalmist prophesies the Messiah's thoughts and prayer regarding his time in this pit. All of Psalms 88 has this prayer but here's just some of it:
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Psalms 88:4-8 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"I am as good as dead, like a strong man with no strength left. They have left me among the dead, and I lie like a corpse in a grave. I am forgotten, cut off from your care. You have thrown me into the lowest pit, into the darkest depths. Your anger weighs me down; with wave after wave you have engulfed me. Interlude You have driven my friends away by making me repulsive to them. I am in a trap with no way of escape."</p>
              </blockquote>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 text-center">
              <p className="text-lg font-semibold mb-4 text-yellow-300">🎯 Conclusion: The Trap Has Been Opened</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Jesus was in the isolation trap of the enemy during the passion of Christ. Why? So you will never have to be! He did it for you so you can be set free of the pity party and be connected to Him and His fellow believers in Jesus' name. The trap has been open—it's time for you get out!
              </p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 5: Unnecessary Storms</h2>
            
            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 1:4 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"But the Lord hurled a powerful wind over the sea, causing a violent storm that threatened to break the ship apart."</p>
              </blockquote>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">⛈️ The Storm Was Because of Jonah</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                The Bible says that the storm that was coming against the boat was because of Jonah! People today are going through things they don't have to because of their rebellious attitude towards God. One of the reasons may be because they have no proper knowledge of God's word. They find themselves thinking they are going through trials or tests, or even think that God is doing it to them. All the while it's not a trial, it's not a test, and it's not God—it's them! It is discipline for what they are doing and for not being willing to stop!
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 1 Peter 4:15-19 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"If you suffer, however, it must not be for murder, stealing, making trouble, or prying into other people's affairs. But it is no shame to suffer for being a Christian. Praise God for the privilege of being called by his name! For the time has come for judgment, and it must begin with God's household. And if judgment begins with us, what terrible fate awaits those who have never obeyed God's Good News? And also, 'If the righteous are barely saved, what will happen to godless sinners?' So if you are suffering in a manner that pleases God, keep on doing what is right, and trust your lives to the God who created you, for he will never fail you."</p>
              </blockquote>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">🎯 It's God's Discipline</p>
              <p className="text-red-200 leading-relaxed mb-4">
                So if you're going through something and you're not doing the will of God, it's not a test, it's not a trial, and sometimes it's not even the enemy. It is God disciplining you to get you back to the place you need to be.
              </p>
              <p className="text-red-200 leading-relaxed">
                People fail to realize the choices they make become the future they didn't want. The Bible says, "This day I call heaven and earth as witnesses against you that I have set before you life and death, blessings and curses. Now choose life, so that you and your children may live" (Deuteronomy 20:19).
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Galatians 6:7-9 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Don't be misled—you cannot mock the justice of God. You will always harvest what you plant. Those who live only to satisfy their own sinful nature will harvest decay and death from that sinful nature. But those who live to please the Spirit will harvest everlasting life from the Spirit. So let's not get tired of doing what is good. At just the right time we will reap a harvest of blessing if we don't give up."</p>
              </blockquote>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🌊 The Wake-Up Call</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                Don't you want to change what you have been receiving? Then change what you have been doing! Why would God send storms to His people? The psalmist gives us insight on this question.
              </p>
              <p className="text-purple-200 leading-relaxed">
                "Chase them with your fierce storm; terrify them with your tempest. Utterly disgrace them until they submit to your name, O Lord." (Psalms 83:15-16 NLT)
              </p>
              <p className="text-purple-200 leading-relaxed">
                It's a wake up call such as Jonah got in the midst of the storm, so that he would submit to God's will for his life. The hard part of unnecessary storms is that they don't only affect you; they affect everyone around you. Think about it—the sailors did nothing to bring this storm on them; if anything they thought they were doing a good thing by trying to help Jonah get to where he needed to go.
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">👨‍👩‍👧‍👦 Storms Affect Everyone Around You</p>
              <p className="text-green-200 leading-relaxed mb-4">
                When we run from the calling and service that God has created us, our families are affected, our marriages suffer, and our lives are chaotic. A spirit of confusion and an emptiness that we cannot shake can oppress us constantly. Because of this, we lash out at God and others and become bitter. We have bad attitudes toward those we love, and anyone that comes close to us, because of the storm that is raging inside of us. We are unpredictable. We're calm one minute and then the next minute we're unstable and out of control, not concerned about who we hurt or the disaster we leave behind!
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Biblical Examples of Unnecessary Storms</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Look at some people in the Bible that went through things they didn't have to because they failed to listen to God's word.
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Adam and Eve were given everything they could have ever wanted. They were only told not to eat the fruit of the one tree that was in the middle of the garden of Eden. They were warned that if they ate the fruit they would surely die (Genesis 2:17).
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Well, we all know what happened—they failed to listen to God's voice and instead listened to the enemy. As a result, they were kicked out of the garden, which in turn made their life harder. Unnecessary storms.
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">💀 Cain's Unnecessary Storm</p>
              <p className="text-red-200 leading-relaxed mb-4">
                Cain failed to learn from his mother's and father's mistake. When His offering wasn't accepted by God, Cain grew jealous and angry with his brother Able and in a fit of rage he killed him. Before Cain lured his brother to the field to kill him, God spoke to him and said:
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Genesis 4:7 NASB</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"If you do well, will not your countenance be lifted up? And if you do not do well, sin is crouching at the door; and its desire is for you, but you must master it."</p>
              </blockquote>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">👑 King David's Unnecessary Storm</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Cain failed to listen and let the enemy rule him—instead of him ruling the enemy—and committed the first murder! Cain became a wanderer for the rest of his life. Unnecessary storm.
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                King David had everything he wanted. God prospered him in every area of his life. He had a big family, a loving wife, and a nation that faithfully served him. It wasn't good enough for David—he wanted what he knew he shouldn't have and committed adultery with Bathsheba and then murdered her husband Uriah to cover it up. The penalty was the baby he had with Bathsheba had to die.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 2 Samuel 12:10-14 NASB</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Now therefore, the sword shall never depart from your house, because you have despised Me and have taken the wife of Uriah the Hittite to be your wife.' Thus says the LORD, 'Behold, I will raise up evil against you from your own household; I will even take your wives before your eyes and give them to your companion, and he will lie with your wives in broad daylight. Indeed you did it secretly, but I will do this thing before all Israel, and under the sun.'" Then David said to Nathan, "I have sinned against the LORD." And Nathan said to David, "The LORD also has taken away your sin; you shall not die. However, because by this deed you have given occasion to the enemies of the LORD to blaspheme, the child also that is born to you shall surely die."</p>
              </blockquote>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">✝️ Jesus: The Storm Calmer</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                King David, even though he was forgiven, still had to go through a lot of unnecessary storms because of his disobedience. Believe me, we could look at hundreds of more stories about people in the Bible that had to go through unnecessary storms because of their disobedience, rebelliousness and wickedness. But you get the point.
              </p>
              <p className="text-purple-200 leading-relaxed mb-4">
                In the stories of Adam and Eve, Cain and Able, and King David and Bathsheba, you will see a prophetic word in each story pointing towards the one who came to calm the storms in our lives through His ultimate sacrifice. His Name? Jesus! In Genesis chapter three we read the first prophecy concerning the future coming of Jesus, when Adam and Eve sinned (Genesis 3:15).
              </p>
              <p className="text-purple-200 leading-relaxed">
                Able's blood cried out! The Bible says: "You have come to Jesus, the one who mediates the new covenant between God and people, and to the sprinkled blood, which speaks of forgiveness instead of crying out for vengeance like the blood of Abel." (Hebrews 12:24 NLT)
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Galatians 3:13 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"But Christ has rescued us from the curse pronounced by the law. When he was hung on the cross, he took upon himself the curse for our wrongdoing. For it is written in the Scriptures, 'Cursed is everyone who is hung on a tree.'"</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🚢 Throw Jonah Overboard</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Although Jesus takes away the curse and forgives sin, Jesus also sends the storms to wake us up and strengthen our faith. He also has the power to calm those storms!
              </p>
              <p className="text-green-200 leading-relaxed mb-4">
                We have to repent of the things we have allowed in our boat—our life—that have been causing unnecessary storms and toss them overboard! We can learn a valuable lesson from the sailors and what they did in the story in regards to Jonah. You see, Jonah acknowledged it was his fault for the storm and he told them that they had to throw him out of the ship in order for the storm to stop.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 1:10-15 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"The sailors were terrified when they heard this, for he had already told them he was running away from the Lord. 'Oh, why did you do it?' they groaned. And since the storm was getting worse all the time, they asked him, 'What should we do to you to stop this storm?' 'Throw me into the sea,' Jonah said, 'and it will become calm again. I know that this terrible storm is all my fault.' Instead, the sailors rowed even harder to get the ship to the land. But the stormy sea was too violent for them, and they couldn't make it. Then they cried out to the Lord, Jonah's God. 'O Lord,' they pleaded, 'don't make us die for this man's sin. And don't hold us responsible for his death. O Lord, you have sent this storm upon him for your own good reasons.' Then the sailors picked Jonah up and threw him into the raging sea, and the storm stopped at once!"</p>
              </blockquote>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">📦 God Wants It All Out</p>
              <p className="text-red-200 leading-relaxed mb-4">
                The sailors tried to throw out the cargo that was on the ship instead. This is our problem nowadays—we think we can pick and choose what cargo (sin) we let go of and we think God will be happy with us. The Bible says obedience is better than sacrifice (1 Samuel 15:22). You cannot pick and choose; God wants it all out!
              </p>
              <p className="text-red-200 leading-relaxed mb-4">
                You might say: well, I gave up drugs but I drink a little. God wants it out! I stopped cursing but I still gossip a lot. God wants it all out! I stopped adultery but I still look a little. God wants it all out! I stopped the business that wasn't right, but I steal scam and deceive in my other business. God wants it all out! I stopped fighting and arguing with people, but I still have bitterness or unforgiveness for certain people. God wants it all out!
              </p>
              <p className="text-red-200 leading-relaxed">
                God wants you to repent of the Jonah (rebellious life) you have let in your boat (life) and throw it overboard. When the sailors threw Jonah off the boat, that's when the storms stopped and then there was a great calm! Then the sailors worshipped God.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 1:15-16 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Then the sailors picked Jonah up and threw him into the raging sea, and the storm stopped at once! The sailors were awestruck by the Lord's great power, and they offered him a sacrifice and vowed to serve him."</p>
              </blockquote>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🌊 What Storms Are You Going Through?</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                What kind of unnecessary storms are you going through because of something you have allowed in your boat? Maybe it's something you have been doing wrong, or something you're avoiding that God is telling you to do?
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                It's time to allow God to take the Jonah mentality out of your life and allow God to move in your life once again. That is, if you want a great calm like the sailors experienced? The sailors were actually idol worshippers; they didn't serve Jonah's God until they saw what Jonah's God could do! So in essence, Jonah was used to save the sailors and bring them to the true God. Think about how many times God used you even in your rebellion towards Him. Now think how much more He will use you when you become obedient to His will for you! Ask God to remove the unnecessary cargo of sin so you can live a life free from unnecessary storms! Then you can help others live a life without unnecessary storms.
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🚶‍♂️ Walking on Water with Jesus</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                On my 2018 Israel trip I was on a boat on the Sea of Galilee in Israel. This is where Jesus walked on water and calmed the storm for the disciples. When Peter was walking on water with Jesus in one of the storms, he started focusing on the storm instead of Jesus and began to sink. Peter prayed the shortest prayer in the Bible.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Matthew 14:30 KJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"But when he saw the wind boisterous, he was afraid; and beginning to sink, he cried, saying, Lord, save me."</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🙏 The Shortest Prayer</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Why don't you take a moment and pray the same prayer about whatever is going on in your life. Maybe you were serving God at one point in your life, but you looked back at all the problems and it caused you to fall. Today, like Jesus did for Peter, He wants to save you and bring you back to the heart of worship to serve Him again like never before in Jesus' name. It doesn't take a lot of words—it just takes a heart of sincere faith in the midst of life's storms that truly cries out, "Lord, save me!"
              </p>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">⛵ The Father's Choice</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                I close this chapter with a story. After a few of the usual Sunday evening hymns, the church's pastor once again slowly stood up, walked over to the pulpit, and gave a very brief introduction of his childhood friend. With that, an elderly man stepped up to the pulpit to speak.
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                "A father, his son, and a friend of his son were sailing off the Pacific Coast," he began, "when a fast approaching storm blocked any attempt to get back to shore. The waves were so high, that even though the father was an experienced sailor, he could not keep the boat upright, and the three were swept into the ocean."
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                "Grabbing a rescue line, the father had to make the most excruciating decision of his life: to which boy he would throw the other end of the line. He only had seconds to make the decision. The father knew that his son was a Christian, and he also knew that his son's friend was not. The agony of his decision could not be matched by the torrent of waves. As the father yelled out, 'I love you, son!' he threw the line to his son's friend."
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                "By the time he pulled the friend back to the capsized boat, his son had disappeared beyond the raging swells into the black of night. His body was never recovered."
              </p>
              <p className="text-yellow-200 leading-relaxed">
                "The father," he continued, "knew his son would step into eternity with Jesus, and he could not bear the thought of his son's friend stepping into an eternity without Jesus. Therefore, he sacrificed his son. How great is the love of God that He should do the same for us."
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">💝 The Ultimate Sacrifice</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Within minutes after the service ended, the two teenagers were at the old man's side. "That was a nice story," politely started one of the boys, "but I don't think it was very realistic for a father to give up his son's life in hopes that the other boy would become a Christian."
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                "Well, you've got a point there," the old man replied, glancing down at his worn Bible. A big smile broadened his narrow face, and he once again looked up at the boys and said, "It sure isn't very realistic, is it? But I'm standing here today to tell you that THAT story gives me a glimpse of what it must have been like for God to give up His son for me. You see . . . I was the son's friend."
              </p>
              <p className="text-blue-200 leading-relaxed">
                God the Father gave His Son to the storm of sin so we can be saved by the Father through the death of His Son. We can be saved from the storm of sin so we can make a difference and serve God like the son's friend did because he was grateful for the friend's sacrifice.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 John 15:13-14 KJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Greater love hath no man than this, that a man lay down his life for his friends. Ye are my friends, if ye do whatsoever I command you."</p>
              </blockquote>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-red-300">Chapter 6: Hell? No, Let Go!</h2>
            
            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">🔥 The Hell Experience</p>
              <p className="text-red-200 leading-relaxed mb-4">
                I was initially going to incorporate this information in the previous chapter, but I feel this is a specific word that deserves its own chapter. I want to talk about going through what people sometimes refer to as a "hell experience." This goes beyond an unnecessary storm; this is where you're drowning from the storm and all hell is breaking loose around you and it causes you to cry out to God like never before. Many times people have to go a through a breaking of self in order for them to come to their senses. This is the case with Jonah.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 2:1-6 KJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Then Jonah prayed unto the Lord his God out of the fish's belly, And said, I cried by reason of mine affliction unto the Lord, and he heard me; out of the belly of hell cried I, and thou heardest my voice. For thou hadst cast me into the deep, in the midst of the seas; and the floods compassed me about: all thy billows and thy waves passed over me. Then I said, I am cast out of thy sight; yet I will look again toward thy holy temple. The waters compassed me about, even to the soul: the depth closed me round about, the weeds were wrapped about my head. I went down to the bottoms of the mountains; the earth with her bars was about me for ever: yet hast thou brought up my life from corruption, O Lord my God."</p>
              </blockquote>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">💔 Breaking Points That Lead to Freedom</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                We all have heard the stories of people who had to experience jail in order to come to their freedom in Christ. A sickness came upon them or their family member and then they experienced the healing power of Jesus for their souls. Maybe the loss of a loved one to cause them to draw closer to God to experience true life in Christ. Or maybe a family hurt by a child that has rebelled, or by unfaithfulness in the marriage, to experience the true faithfulness of Jesus.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 2 Chronicles 7:12-15 ESV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Then the Lord appeared to Solomon in the night and said to him: 'I have heard your prayer and have chosen this place for myself as a house of sacrifice. When I shut up the heavens so that there is no rain, or command the locust to devour the land, or send pestilence among my people, if my people who are called by my name humble themselves, and pray and seek my face and turn from their wicked ways, then I will hear from heaven and will forgive their sin and heal their land. Now my eyes will be open and my ears attentive to the prayer that is made in this place.'"</p>
              </blockquote>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">⚡ God's Wake-Up Call</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                This verse shows us that God allows what we have to be taken from us—the locusts are commanded to devour the land. God will sometimes even stop his blessings—the rain—and even allow sickness or pestilence to come upon us! Why would a loving God want to do that to His people? To give them a wake up call here on earth so they wont have to face true hell for all eternity! The next verse says, essentially, "If my people call upon me, then I will hear, heal and restore!"
              </p>
              <p className="text-yellow-200 leading-relaxed">
                This is what Jonah did; he cried out to the Lord because of "his affliction," not because he felt like it. However, he had to experience that which he referred to as hell. The original Hebrew definition is Sheol, defined as follows: sheol, underworld, grave, hell, hades, or the world of the dead. It is a pit, a place without praise, a place where the wicked are sent, a devastating storm.
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🐋 Three Days of Hell</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                If you noticed it took him three days to come to his senses. Talk about stubborn—many people think that his skin was bleached white because of all the acid in the stomach of the fish. So think about this; he just went through a storm, and now he gets swallowed by a great fish. Many people believe it was a whale. It's hot and smelly, and acid is burning your skin, while water keeps coming in and out of the stomach of the fish and each time you almost drown. He's tired, weary, exhausted, can't fight off sleep any longer, and the pressure of being deep down in the depths of the sea is now making him delirious. He begins to realize if he dies, not only is he going through a hell of an experience, but he just might enter into hell if he dies. All this and more is going on for three days and he finally comes to understand you can't beat God!
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 2:7-10 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"As my life was slipping away, I remembered the Lord. And my earnest prayer went out to you in your holy Temple. Those who worship false gods turn their backs on all God's mercies. But I will offer sacrifices to you with songs of praise, and I will fulfill all my vows. For my salvation comes from the Lord alone." Then the Lord ordered the fish to spit Jonah out onto the beach.</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🙏 Remembering Jehovah</p>
              <p className="text-green-200 leading-relaxed mb-4">
                He remembered Jehovah! Isn't it time for us to do the same? Isn't it time that we remember that when we confessed Christ as Lord that automatically made us His servants! God wants us to serve Him in the way He wants, not how we want. We cannot pick and choose the things we want to obey and then say no to the things we don't want to do. Jonah learned that the hard way, and so do the people that are not willing to obey the Lord in whatever He has chosen for them to do. We need to say whatever He has called us to say and go wherever He has called us to go!
              </p>
              <p className="text-green-200 leading-relaxed">
                He realized that if he held on to his stubborn, rebellious, and bitter ways he would eventually have died in his rebellion. God would have still gotten His way because God could have used someone else.
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">🚫 Lying Vanities and Idols</p>
              <p className="text-red-200 leading-relaxed mb-4">
                He says something that really made me think. He said, "Those who hold on to lying vanities, or idols forsake their own mercy!"
              </p>
              <p className="text-red-200 leading-relaxed mb-4">
                Like Jonah, if we hold on to the empty lies of the enemy, and the idols—which are anything or anyone we put before God—we forsake God's grace and the mercy He died for us to have! It's not that God leaves us, but it's that we leave God; we forsake Him! The prophet Isaiah teaches us how sinful choices bind us in our iniquity and we forsake our God.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Isaiah 1:4 KJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Ah sinful nation, a people laden with iniquity, a seed of evildoers, children that are corrupters: they have forsaken the Lord, they have provoked the Holy One of Israel unto anger, they are gone away backward."</p>
              </blockquote>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">💔 Forsaking Grace and Mercy</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Jonah was a man of God who knew the word of God but ran away from God. Why? He was bitter and wanted them to perish, because he felt they needed judgment instead of mercy! When he finally realized he couldn't hold on to it anymore he gave us an amazing revelation. If we hold onto the things God has commanded us to let go of, we will end up living a life of rebellion against God. When we are not willing to change then we forsake grace and mercy—it doesn't forsake us! We make the decision to walk away and leave!
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Revelation 2:4-5 NASB</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"But I have this against you, that you have left your first love. Therefore remember from where you have fallen, and repent and do the deeds you did at first; or else I am coming to you and will remove your lampstand out of its place-unless you repent."</p>
              </blockquote>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">💝 Understanding Grace and Mercy</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                When you truly understand what God has done for you and the grace He has given you, it changes you. Grace is something we didn't deserve but was given to us anyway by Jesus. We didn't deserve heaven, we didn't deserve a second chance, we didn't deserve the ultimate sacrifice of the Son of God, and we didn't deserve to be able to serve Jesus, but it was given to us anyway!
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Mercy is stopping the punishment we deserve because of what we all have done. We did deserve death, hell, and the grave. We did deserve the lashes on our backs and the cross that Jesus took for us. Jesus loved us so much that He gave us the grace we didn't deserve and stopped the hell we did deserve. That's mercy!
              </p>
              <p className="text-blue-200 leading-relaxed">
                Why would you not want to serve Jesus? Once you truly understand mercy and grace would you actually want to walk away? Look what the Bible says grace teaches us.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Titus 2:11-15 KJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"For the grace of God that bringeth salvation hath appeared to all men, Teaching us that, denying ungodliness and worldly lusts, we should live soberly, righteously, and godly, in this present world; Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ; Who gave himself for us, that he might redeem us from all iniquity, and purify unto himself a peculiar people, zealous of good works. These things speak, and exhort, and rebuke with all authority. Let no man despise thee."</p>
              </blockquote>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Ephesians 2:8-10 KJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast. For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them."</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">📚 What Grace Teaches Us</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Grace is also a gift that we receive and that we should give others as well.
              </p>
              <p className="text-green-200 leading-relaxed mb-4">
                Because it's a free gift and because it has been given to us at the cost of the blood of God's Son Jesus, it teaches us to turn away from sin rather than turning away from the Son! It teaches us to turn away from ungodliness, not turn away from Godliness. It teaches us to turn away from lust, not turn to lust. It teaches us to turn to righteousness, not turn to unrighteousness. It teaches us to live soberly, not turn to drunkenness! Grace should teach you to walk away from hell and walk towards heaven!
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🎵 The Voice of Thanksgiving</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                Jonah realized this after a hell experience in the fish. This is why he said, "But I will sacrifice unto thee with the voice of thanksgiving; I will pay that that I have vowed. Salvation is of the Lord." (Jonah 2:9 KJV)
              </p>
              <p className="text-purple-200 leading-relaxed">
                When Jonah decided to let go of the lying vanities and the idols he was holding onto, look what happened: "And the Lord spake unto the fish, and it vomited out Jonah upon the dry land" (Jonah 2:10 KJV). That means as soon as Jonah let his rebellious attitude go, God commanded the fish to let Him go!
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">🎯 Let It Go</p>
              <p className="text-red-200 leading-relaxed mb-4">
                Instead of hanging onto the things that bring God's judgment, anger, and discipline—painful positions that will eventually lead to a breaking point—wouldn't it be better to just let it go? So many people wait until they're in a situation like Jonah, with all hell breaking out around them. Then they make God their last resort when God should have been their first priority!
              </p>
              <p className="text-red-200 leading-relaxed mb-4">
                I believe we all have done this a time or two in our life but we should not live a lifestyle like this. So often we allow the thing we hold onto to create stubbornness in our heart until we start justifying, excusing, and blaming everyone else for how our life has ended up and for the person we have become.
              </p>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 text-center">
              <p className="text-lg font-semibold mb-4 text-yellow-300">🎯 Conclusion: Hell? No, Let Go!</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Let's learn a lesson from this chapter of Jonah's life, that things that hold us from God like the fish held Jonah will not let us go until we let our rebellious attitude go. Decide today to let it go and you'll see how it will allow a release in your life and freedom to serve the Lord like never before so you can get back to what you vowed.
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                To serve the Lord because He first served us. Think about it today, do you want to go through a breaking in such a way you feel like all hell is breaking out around you and your house? Of course not, so let's have an attitude that says: hell? no, I'm letting go!
              </p>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-green-300">Chapter 7: God of Second Chances</h2>
            
            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 3:1-10 KJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"And the word of the Lord came unto Jonah the second time, saying, Arise, go unto Nineveh, that great city, and preach unto it the preaching that I bid thee. So Jonah arose, and went unto Nineveh, according to the word of the Lord. Now Nineveh was an exceeding great city of three days' journey. And Jonah began to enter into the city a day's journey, and he cried, and said, Yet forty days, and Nineveh shall be overthrown. So the people of Nineveh believed God, and proclaimed a fast, and put on sackcloth, from the greatest of them even to the least of them. For word came unto the king of Nineveh, and he arose from his throne, and he laid his robe from him, and covered him with sackcloth, and sat in ashes. And he caused it to be proclaimed and published through Nineveh by the decree of the king and his nobles, saying, Let neither man nor beast, herd nor flock, taste any thing: let them not feed, nor drink water: But let man and beast be covered with sackcloth, and cry mightily unto God: yea, let them turn every one from his evil way, and from the violence that is in their hands. Who can tell if God will turn and repent, and turn away from his fierce anger, that we perish not? And God saw their works, that they turned from their evil way; and God repented of the evil, that he had said that he would do unto them; and he did it not."</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🔄 The God of Second Chances</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Here's the good news: God is a God of second chances. The Bible says that the word of the Lord came to Jonah a second time. Throughout the Bible you see the stories of great men and women of God who fell but came back stronger and greater for the Glory of God. Too many people feel condemned and think they can't come back to God because they wandered too far away and did too much to hurt God. Sadly, they fall for the lie of the enemy that tells them they're too far gone to get back to who God has called them to be. The devil is a liar!
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">💙 Hope for Fallen Servants</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                This story gives hope to two different types of people. The first are people like Jonah—servants of God who ran from their call or fell away from it. If that's you, you can come back!
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Every chapter we just covered shows you the consequences of running from God's call on your life. If you have been experiencing any of this you can do what Jonah did. Admit it, submit to God, and He will forgive you, restore you, and use you right where you are at the very moment you let go and let God move in your life. He did it for King David, Jacob, Sampson, Naomi, Peter, and many more, and He can do it for you. He is the same God yesterday, today, and forever! He has no favoritism.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Revelation 2:5 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Look how far you have fallen! Turn back to me and do the works you did at first. If you don't repent, I will come and remove your lampstand from its place among the churches."</p>
              </blockquote>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Lamentations 3:21-23 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"This I recall to my mind, Therefore I have hope. Through the LORD's mercies we are not consumed, Because His compassions fail not. They are new every morning; Great is Your faithfulness."</p>
              </blockquote>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">💔 Hope for the Wicked</p>
              <p className="text-red-200 leading-relaxed mb-4">
                The second type of people the story of Jonah gives hope are those who never served the Lord and are in dwelling in all kinds of evil and wickedness like the people of Nineveh. If that is you, the Bible tells us:
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Isaiah 1:18-20 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Come now, let's settle this," says the Lord. "Though your sins are like scarlet, I will make them as white as snow. Though they are red like crimson, I will make them as white as wool. If you will only obey me, you will have plenty to eat. But if you turn away and refuse to listen, you will be devoured by the sword of your enemies. I, the Lord, have spoken!"</p>
              </blockquote>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">🩸 The Meaning of Scarlet</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                The Hebrew word for reason or settle Isaiah uses here is a word that means "redo," meaning a second chance! Also, the way that people would get the deep beautiful red color scarlet will shock you. They would take a bunch of maggots and squish them and then take the blood and use that as the dye for the color scarlet. It was a very deep red unlike you could get anywhere else. It was nearly impossible to wash the stain of the scarlet color away that was made with the maggots' blood.
              </p>
              <p className="text-yellow-200 leading-relaxed">
                So God is showing us that even though your sins are that deep and that disgusting He is willing to let it go and forgive it and wash it all away. You can receive His second chance and allow Him to offer a redo, restart, and renew your life because of what the Son did for us!
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Psalms 22:6-8 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"But I am a worm and not a man. I am scorned and despised by all! Everyone who sees me mocks me. They sneer and shake their heads, saying, "Is this the one who relies on the Lord? Then let the Lord save him! If the Lord loves him so much, let the Lord rescue him!""</p>
              </blockquote>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🐛 The Silk Worm Illustration</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                What does that mean? Well, first it represents that for Jesus to come down from heaven and leave all His glory, majesty, and splendor and take on a human body it would be compared to a man turning into a worm, a maggot! More importantly it illustrates what Jesus did for us so we can have our second chance.
              </p>
              <p className="text-purple-200 leading-relaxed mb-4">
                When it says scarlet it makes reference to a silk worm! You see, a silk worm is a worm that's very interesting when it comes to the birth process. The silk worm would attach itself to a tree when it was about to give birth, and as it gives birth it dies on the tree to give life to its children. After the birth is complete, and the worm falls from the tree after it dies, all that remains is a bloodstained tree from a worm!
              </p>
              <p className="text-purple-200 leading-relaxed">
                Jesus came down to take all our disgusting sin no matter how bad and how deep. God wants to take it from us and He has already done it! The bloodstained cross of Calvary's hill is the evidence of His love for His children, so they have the opportunity to be born again! His death brought those who turn to Him life!
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Romans 5:8-11 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"But God showed his great love for us by sending Christ to die for us while we were still sinners. And since we have been made right in God's sight by the blood of Christ, he will certainly save us from God's condemnation. For since our friendship with God was restored by the death of his Son while we were still his enemies, we will certainly be saved through the life of his Son. So now we can rejoice in our wonderful new relationship with God because our Lord Jesus Christ has made us friends of God."</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">📋 Biblical Examples of Second Chances</p>
              <p className="text-green-200 leading-relaxed mb-4">
                You might say, "I believe God can forgive me, but I think I've done too much for Him to use me. People won't take me seriously because I just messed up too bad." If that's you, think about this list before you doubt God can use you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-200">
                <div>
                  <p className="mb-2">• NOAH was a drunk</p>
                  <p className="mb-2">• ABRAHAM was too old</p>
                  <p className="mb-2">• ISAAC was a daydreamer</p>
                  <p className="mb-2">• JACOB was a liar</p>
                  <p className="mb-2">• LEAH was ugly</p>
                  <p className="mb-2">• JOSEPH was abused</p>
                  <p className="mb-2">• MOSES stuttered</p>
                  <p className="mb-2">• GIDEON was afraid</p>
                  <p className="mb-2">• SAMSON had long hair, and was a womanizer</p>
                  <p className="mb-2">• RAHAB was a prostitute</p>
                  <p className="mb-2">• JEREMIAH and TIMOTHY were too young</p>
                </div>
                <div>
                  <p className="mb-2">• DAVID had an affair and was a murderer</p>
                  <p className="mb-2">• ELIJAH was suicidal</p>
                  <p className="mb-2">• ISAIAH preached naked</p>
                  <p className="mb-2">• JONAH ran from God</p>
                  <p className="mb-2">• NAOMI was a widow</p>
                  <p className="mb-2">• JOB went bankrupt</p>
                  <p className="mb-2">• JOHN the Baptist ate bugs</p>
                  <p className="mb-2">• PETER denied Christ</p>
                  <p className="mb-2">• THE DISCIPLES fell asleep while praying</p>
                  <p className="mb-2">• MARTHA worried about everything</p>
                  <p className="mb-2">• MARY MAGDALENE was demon possessed</p>
                  <p className="mb-2">• THE SAMARITAN WOMAN was divorced—more than once</p>
                  <p className="mb-2">• ZACCHEUS was too small</p>
                  <p className="mb-2">• PAUL was too religious</p>
                  <p className="mb-2">• TIMOTHY had an ulcer</p>
                  <p className="mb-2">• AND LAZARUS WAS DEAD!</p>
                </div>
              </div>
              <p className="text-green-200 font-semibold mt-4">No more excuses! It's time to stop running and start serving!</p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 4:5-11 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Then Jonah went out to the east side of the city and made a shelter to sit under as he waited to see what would happen to the city. And the Lord God arranged for a leafy plant to grow there, and soon it spread its broad leaves over Jonah's head, shading him from the sun. This eased his discomfort, and Jonah was very grateful for the plant. But God also arranged for a worm! The next morning at dawn the worm ate through the stem of the plant so that it withered away. And as the sun grew hot, God arranged for a scorching east wind to blow on Jonah. The sun beat down on his head until he grew faint and wished to die. "Death is certainly better than living like this!" he exclaimed. Then God said to Jonah, "Is it right for you to be angry because the plant died?" "Yes," Jonah retorted, "even angry enough to die!" Then the Lord said, "You feel sorry about the plant, though you did nothing to put it there. It came quickly and died quickly. But Nineveh has more than 120,000 people living in spiritual darkness, not to mention all the animals. Shouldn't I feel sorry for such a great city?"</p>
              </blockquote>
            </div>

            <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-orange-300">🌿 God's Illustration to Jonah</p>
              <p className="text-orange-200 leading-relaxed mb-4">
                God gives Jonah a personal illustration using a very hot wind, a plant, and a worm! Jonah preached the message of repentance, but he still had no compassion for the people. He was actually upset that God showed mercy on the people of Nineveh, so God shows him an illustration that represents a few things. First of all, it was so hot Jonah wished he was dead. The heat illustrated hell, where the people of Nineveh deserved to go for their wickedness. The plant can represent life. In the Gospel of John, Jesus said we are like branches and He is the vine. The worm represents the disgusting consequences of our sin. The Bible says hell is where the worm never dies (Mark 9:48).
              </p>
              <p className="text-orange-200 leading-relaxed mb-4">
                Jonah was more concerned about the plant that covered him and gave him rest than he was grateful about the people that were covered by God's mercy and grace. Let us learn a lesson from this and not be so caught up with selfish ambitions and our own comfort that we forget the reason why God put us on this world. We are all called to help save souls by warning them of hell and eternal damnation, and to remind them of God's grace and mercy. No matter how bad they are, God wants to give them a second chance and cover them with His love!
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🎯 The Great Commission</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                And just like God had to make Jonah uncomfortable to realize this, maybe God is making you uncomfortable so you can get back to the only mission that matters. The Great Commission is our only real mission! This is what we should do with our second chance—tell others that they can have one too!
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Matthew 28:19-20 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Therefore, go and make disciples of all the nations, baptizing them in the name of the Father and the Son and the Holy Spirit. Teach these new disciples to obey all the commands I have given you. And be sure of this: I am with you always, even to the end of the age."</p>
              </blockquote>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 8: Your Mess is a Message</h2>
            
            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Romans 8:28 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"And we know that God causes everything to work together for the good of those who love God and are called according to his purpose for them."</p>
              </blockquote>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">⚔️ The Assyrians of Nineveh</p>
              <p className="text-red-200 leading-relaxed mb-4">
                When you would think about the Assyrians living in Nineveh, you would have never associated them with a being a kind, compassionate, and loving people. You would have been much more likely to think the exact opposite. The Assyrians of Jonah's day were a ruthless and evil people. They had a reputation for showing no mercy to their enemies, and committing atrocities such as decapitating prisoners. So the question is, why would they listen to the prophet Jonah? And not just listen—the king of Nineveh got off his throne, put on sackcloth, and sat down in ashes. Many people in the city copied the king's behavior. The king called for citywide fasting, repentance, and prayer in hopes that the Lord would show mercy to them.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🌑 Signs and Wonders in the Heavens</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                There could have been a couple reasons why Nineveh would repent like they did when they heard the warning of Jonah. One of those reasons could have been because there were signs and wonders in the heavens, like a solar eclipse which they have never seen; this is confirmed by astronomers in the same time period in which Jonah was warning the city of Nineveh. The eclipse would have lasted for hours, which may have struck fear and confusion in them.
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Consider the basic facts of an eclipse—the sun is blocked by the moon while it is in rotation, which causes the light to be shut out and darkness to affect the land. God is saying, through Jonah, that this is what the people of Nineveh did; they shut out the light and allowed evil to overtake the land and bring darkness and disaster on themselves. But God brought the light to shine on them again through Jonah and the Word of the Lord. Jesus said we are the light of the world (Matthew 5:18).
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">💡 Shining Light in Darkness</p>
              <p className="text-green-200 leading-relaxed mb-4">
                I'm here to remind you that no matter how bad the darkness takes over a person's life, they can still be used for the glory of God. All they need is someone to shine the light in the midst of their darkness. They can be affected by the light you shine and can be redirected in the life God wants them to live. Remember, no matter how dark a person's life may seem, don't count them out. All they need is someone to shine in the midst of their darkness so they can see the way to go—and God wants that person to be you!
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🐟 The God Dagon</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                You might say, "If you only knew how bad I was. There's no way anyone will take me seriously; there's no way I can be light with all the darkness I'm in and was involved in." If that's you, think about this:
              </p>
              <p className="text-purple-200 leading-relaxed mb-4">
                The second reason why Nineveh may have repented is that at the time of Jonah going to Nineveh, there was a false god they would worship named Dagon who was half man and half fish (pictured). Thats right, imagine it—the people of Nineveh are already wondering what's going on in the heavens and now they see a large fish, possibly a whale, pull up on their shores. They see this fish open its mouth and out comes a man—possibly bleached white from the acid in the fish's stomach. I imagine whoever saw this ran to the city to tell others, and it spreads like wild fire so by the time Jonah began to minister about repentance they were ready to do whatever this man who came out of the fish said.
              </p>
              <p className="text-purple-200 leading-relaxed">
                God used what the enemy meant for bad—a rebellious man of God running from the Lord's will because of bitterness—and used the fish as a vehicle to get Jonah from where he was to where he needed to be. God used Jonah and the fish to reveal that He alone is the one true God and that they needed to turn from their idols like Dagon.
              </p>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">📝 Your Mess is a Message</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                God used all of it to show the man of God His mercy and how a sinful people were able to repent. It only takes someone willing to tell them about the true God so they could turn away from their false gods and receive God's mercy and grace.
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Whether you're a minister, a man or woman of God on the run, or a rebellious person involved in all kinds of evil—if you come to God with a repentant heart and start doing what God has called you to do, God will use all the good, bad, and ugly things that have happened to you for His glory.
              </p>
              <p className="text-yellow-200 leading-relaxed">
                In short, He will take your mess and turn it into a message!
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🌳 The Genealogy of Christ</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Look no further than the genealogy of Christ in the opening verse of Matthew's Gospel to see examples that God can use people's messes and turn them into messages for His glory.
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Some people in this genealogy of Christ are people you would never think would be associated with Christ. The family tree of Jesus is filled with liars, thieves, prostitutes, adulteresses, fornicators, pagan worshippers, murderers, rebellious, and immoral people. God used all of these men and women of God that rebelled against Him—what an incredible way to show us that no matter how rebellious you may be, God can use your past as a place of hope for someone's future.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jeremiah 29:11-13 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"For I know the plans I have for you," says the Lord. "They are plans for good and not for disaster, to give you a future and a hope. In those days when you pray, I will listen. If you look for me wholeheartedly, you will find me."</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🌟 Your Testimony</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Allow God to help your story to be heard by others, so they will know that God can turn a mess into His message of hope for their future, as they call upon the true God of the world—Jesus Christ of Nazareth, the living Son of God. The true messenger of Salvation wants to use your message to help others overcome as Jonah helped the people of Nineveh overcome. You Have a testimony!
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Revelation 12:10-11 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Then I heard a loud voice saying in heaven, "Now salvation, and strength, and the kingdom of our God, and the power of His Christ have come, for the accuser of our brethren, who accused them before our God day and night, has been cast down. And they overcame him by the blood of the Lamb and by the word of their testimony, and they did not love their lives to the death.""</p>
              </blockquote>
            </div>

            <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-orange-300">💪 The Power of Shared Experience</p>
              <p className="text-orange-200 leading-relaxed mb-4">
                A lot of people that are locked in their problems don't listen to people who are preaching the Word to them because the people trying to minister to them have never experienced what they're dealing with. They write them off and say that the people trying to minister don't know what they're going through.
              </p>
              <p className="text-orange-200 leading-relaxed mb-4">
                Sometimes the greatest affect of the Gospel doesn't take place in people's lives until they meet someone preaching the gospel who struggled with what they're struggling with. It might be an addiction, a bondage, hurt, pain, sorrow, shame, sickness, depression, condemnation, un-forgiveness, adultery, immorality, fornication, drunkenness, perversion, abuse, abandonment, suicidal thoughts, church offense, and hurt. Whatever it is that you're dealing with or have dealt with, let it be your message you share to others so they will know that if God did it for you, then God can do it for them!
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🐋 Turning Your Whale into a Taxi Cab</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                <em>The rest of this chapter was written by Pastor Skippy Martin, SFGM</em>
              </p>
              <p className="text-purple-200 leading-relaxed mb-4">
                When we decide that we are going to be obedient to the will and the Word of God, that's when God begins to turn our whale into a taxi cab! This is the kind of prayer that turns whales into taxi cabs. I'm sure by now you're wondering what does that word mean. I'll show you.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 2:10 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"So the LORD spoke to the fish, and it vomited Jonah onto dry land."</p>
              </blockquote>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">🚕 From Whale to Taxi Cab</p>
              <p className="text-red-200 leading-relaxed mb-4">
                After Jonah prays a prayer of repentance, God speaks to the fish and it spits him out on dry land. Here's where it gets interesting—the whale spits him out on the shores of Nineveh. The very place where Jonah was meant to go preach. The very thing that had swallowed Jonah up, the very thing that should have destroyed him, was the very thing that took him right into the center of God's will for His life. And the same applies even to this very day. You're reading this book right now, and you too can turn your whale into a taxi cab. It's no accident. God can use what should have been your setback to become your setup for your comeback.
              </p>
              <p className="text-red-200 leading-relaxed">
                God can take what should have been your tombstone and turn it into your steppingstone on the path to God's destiny for your life.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🎭 The Whale as a Stage</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Remember, the people of Nineveh worshipped a half-fish, half-man God named Dagon. So it was only natural that when they saw Jonah, a man being spit out by a giant fish onto the shore with a message from God, that they listened and obeyed. All of Nineveh repented of their sin and the will of God was done. The story truly is a story of repentance. God used the whale as the means by which Jonah reached his destination. God used the whale as the means by which the attention of the Ninevites was captured. The whale was the stage for Jonah's sermon.
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🎪 Your Stage for God's Message</p>
              <p className="text-green-200 leading-relaxed mb-4">
                And that's what God can do with your whale. He'll use your failing marriage. Your failing ministry. Your poverty. Your drug addiction. Your barrenness. Your family problems. If you'll put it in God's hands, He can take these things and use them as the stage from which to preach the message God has for you. Maybe not a message of words, but a message of your life—your story of what God has brought you through. Your testimony of what God has done for you. What you went through can become the thing that opens people up to receive what God is speaking through you. The whale wasn't meant to kill Jonah, it was meant to help him do God's will and save people.
              </p>
              <p className="text-green-200 leading-relaxed mb-4">
                Your whale wasn't meant to destroy you, it was meant to help you accomplish God's will in the earth. A taxi cab takes you where you need to go, never to be seen again. Let God use your mess and turn it into a message. You'll never have to go through it again when God gets done. Let Him turn your trial into a triumph. Let Him turn your whales into taxi cabs!
              </p>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 text-center">
              <p className="text-lg font-semibold mb-4 text-yellow-300">🎯 Conclusion: Your Mess Can Become Your Message</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Think of the worst sin or problem you are facing right now. Now think of the verse we started off this chapter with—Romans 8:28, "God uses EVERYTHING to work together for His good" (emphasis mine).
              </p>
              <p className="text-yellow-200 leading-relaxed">
                If you will give it to God, the mess you're in now can become your message of hope to the hopeless!
              </p>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-orange-300">Chapter 9: The Signs of Jonah</h2>
            
            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">✈️ From Joppa to Jerusalem</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                I'm writing this chapter as I'm on a plane flying home from Israel. I was there on a tour, filming a DVD teaching series we are putting together. We believe people will be encouraged and inspired as they watch footage of us teaching the truths explored in this book, captured right at the very locations where these events took place in the Bible. The final location was Joppa.
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Thats right—the very location where Jonah had to decide to either go his own way or follow the Lord's way. Modern-day Joppa is a night time party scene, filled with lights and glitz and glamor. It's actually one of the biggest party spots in Israel. We have to choose between the glamor of the world and the calling of God. While I was there I couldn't help think about the decision he made and the price he paid for it. There is always a price to pay to go against God—it comes due just like any other bill, and Jonah had to pay a steep price.
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🕊️ The Dual Meaning of Jonah's Name</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                When you look at the name Jonah, you will discover that his name has a dual meaning. Jonah means both dove or destruction. Think about that—the dove in the Bible is a symbol of the Holy Spirit. Destruction is a representation of the devil, because this is what he wants to do to people; he wants to steal, kill, and destroy.
              </p>
              <p className="text-purple-200 leading-relaxed mb-4">
                When Jonah didn't listen to God, and instead tried to do what he wanted to do, everything that could have gone wrong did go wrong. Destruction followed Jonah wherever he went and it affected whoever he was around. When he finally came to his senses, and did what God wanted him to do, and listened to the Holy Spirit—people got saved and delivered.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Galatians 6:7-9 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Do not be deceived, God is not mocked; for whatever a man sows, that he will also reap. For he who sows to his flesh will of the flesh reap corruption, but he who sows to the Spirit will of the Spirit reap everlasting life. And let us not grow weary while doing good, for in due season we shall reap if we do not lose heart."</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🌱 Sowing and Reaping</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Look at what Galatians chapter six says, and reflect on the dual meaning of Jonah's name: There is a Biblical principle that when you follow your flesh, you are sowing corruption and destruction—and that which you sow is what you will reap. On the other hand, if you follow the Holy Spirit and do what God wants, you are sowing everlasting life and you will reap what you sow. You'll have everlasting life, and those who you sow the Word of God into will reap everlasting life as well.
              </p>
              <p className="text-green-200 leading-relaxed">
                Just like Jonah gave in to the Spirit of God and sowed the incorruptible seed—which is the Word of God (1 Peter1:23). And because of his ultimate obedience, the people of Nineveh got saved and delivered from the destruction that was about to come upon them.
              </p>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">✨ Choosing Between Glamor and God</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                The reason I put the picture of modern-day Joppa on the cover of the book is as a symbol of what we have to decide between. Do we want the glitz, glamour, and bright lights of this world, or do we give in to the Holy Spirit? Knowing that we are in this world but we're not of this world—we are, like the Bible says, aliens just passing through.
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Remember, every decision you'll ever make will be a choice that represents one of the definitions of Jonah's name, either dove or destruction. Let's choose wisely, because we know we have very little time before our Lord and Savior comes back. He's going to be looking for people who are obedient and faithful, but those who are lazy and wicked he will cast away.
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">📅 Signs of the Times</p>
              <p className="text-red-200 leading-relaxed mb-4">
                It's time to get serious about the signs of the times that are all around us. Jesus said you will know the seasons:
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Matthew 16:2-4 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"He answered and said to them, "When it is evening you say, ' It will be fair weather, for the sky is red'; and in the morning, ' It will be foul weather today, for the sky is red and threatening.' Hypocrites! You know how to discern the face of the sky, but you cannot discern the signs of the times. A wicked and adulterous generation seeks after a sign, and no sign shall be given to it except the sign of the prophet Jonah." And He left them and departed.""</p>
              </blockquote>
            </div>

            <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-orange-300">🌙 Blood Moons and Bethlehem</p>
              <p className="text-orange-200 leading-relaxed mb-4">
                Between 2016-2018 we have seen blood moons and Bethlehem start to reappear. Why does this matter?
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Joel 2:29-31 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"And also on My menservants and on My maidservants I will pour out My Spirit in those days. "And I will show wonders in the heavens and in the earth: Blood and fire and pillars of smoke. The sun shall be turned into darkness, And the moon into blood, Before the coming of the great and awesome day of the LORD.""</p>
              </blockquote>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🐋 The Sign of Jonah</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                What was the sign of Jonah? Many people believe it was the simple fact that as Jonah was in the belly of the fish in the sea for three days and on the third day came back, Jesus was going to die and be buried in the earth and on the third day return, and I believe this as well. There was something else that happened in the days of preaching to the people of Nineveh—this eclipse that made the city of Nineveh go dark for a time. When Jesus was dying on the cross, the Bible says that the whole land went dark for a time; from twelve to three in the afternoon darkness covered the land (Luke 23:44).
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📰 Historical Evidence from Pathos.com</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                I recently read an article from pathos.com regarding what happened in the days of Jonah:
              </p>
              <div className="bg-gray-800/50 p-4 rounded border-l-4 border-gray-400 mb-4">
                <p className="text-gray-200 italic leading-relaxed">
                  "did you know that a total solar eclipse appears to have played a role in the story of the Biblical prophet Jonah? First, of course, we have to decide whether Jonah was a fictional character or a real, historical person. If you've read my three-part article "Historicity: Does It Matter?" you'll know what I think. Taking Jonah to be historical as I do, the Bible's one specific clue as to when he lived was during the reign of Jeroboam II, or around 786-746 BCE, if we take 2 Kings 14:25 as evidence of the latest that he could have prophesied.
                </p>
                <p className="text-gray-200 italic leading-relaxed mt-4">
                  A total solar eclipse over Nineveh in northern Iraq on June 15, 763 BCE fits this time frame for the life and career of Jonah. Assyriologist Donald Wiseman, a former curator at the British Museum, and editor of Chronicles of Chaldean Kings and The Alalakh Tablets, published a lecture in the Tyndale Bulletin in 1979 where he argued persuasively that this eclipse would help explain the dramatic reaction to Jonah's preaching. to the Assyrian writings cited by Wiseman, here's what a solar eclipse would have meant to them: "the king will be deposed and killed, and a worthless fellow will seize the throne...rain from heaven will flood the land...the city walls will be destroyed.""
                </p>
              </div>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">🌑 The Perfect Timing</p>
              <p className="text-red-200 leading-relaxed mb-4">
                I believe that Jonah was in Nineveh in June of 763 BC during the total eclipse of the sun, which would help explain the remarkable response of the people of Nineveh. Jonah preaches at exactly the right time for the people of Nineveh to listen to him. The Assyrian nation was weak and in chaos in the decade around 760 BCE. They had one earthquake (one sign of divine wrath). There was a famine from 765-758 BCE. Assyria was losing battles and losing territory to its enemies. There were domestic riots. With all the trouble they already had going on, they could have easily believed that Jonah's warning would come to pass.
              </p>
              <p className="text-red-200 leading-relaxed">
                Now was a perfect time for a prophet from far away to arrive on the scene and command a response.
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🔮 Modern-Day Signs</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Thats right, that which happened to Nineveh happened in Jerusalem! What does that have to do with you and me? In 2017, we had an eclipse similar to the one in the time of Jonah and just like in the time of Jesus. This if from a report where an astronomer backtracked and discovered this amazing fact. The point is, can this be a sign that we are in the last days? Can this be a sign that Jesus is about to bring judgment unless our nations repent? Can this be a sign that we have to get ready for the coming of the Son of Man? I believe the answer to all these questions is yes. The Bible says God gives us signs concerning the stars and the moon and even the sun.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Luke 21:25-28 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"And there will be signs in the sun, in the moon, and in the stars; and on the earth distress of nations, with perplexity, the sea and the waves roaring; men's hearts failing them from fear and the expectation of those things which are coming on the earth, for the powers of the heavens will be shaken. Then they will see the Son of Man coming in a cloud with power and great glory. Now when these things begin to happen, look up and lift up your heads, because your redemption draws near.""</p>
              </blockquote>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">🎯 The Great Commission</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Even if none of this was true, shouldn't we be getting ready and helping others do the same? Of course we should—before Jesus left this was the church's mission. It's called the Great Commission to go out and save that which is lost!
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">💣 ISIS and Jonah's Tomb</p>
              <p className="text-red-200 leading-relaxed mb-4">
                Think about this—the evil Assyrians in Jonah's day are like the same people in our present day called ISIS. A few years ago back I was watching the news and they was reporting on how the terrorists called ISIS are an Assyrian based group and they bombed the tomb of Jonah. When I saw this it was a confirmation for me to write this book. The reason why they bombed Jonah's tomb was because he brought the Word of the Lord first to the city of Nineveh. I believe we have many signs of Jonah in our lifetime appearing and it's time to stop running from the call and start running to the call that God has placed on our life.
              </p>
              <p className="text-red-200 leading-relaxed mb-4">
                The reason why ISIS destroyed the tomb of Jonah was because they despised the Word of the Lord and the man that brought the word. Just like the enemy wants to destroy us because Jesus gave us an assignment to spread the word of The Lord—but I'm here to remind you that greater is He who lives in us than he who lives in the world (1st John 4:4).
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🌟 Becoming a Sign</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                So we know we have the signs all around us, so the question is what are we going to do about it? We can like every sign, ignore it, or yield to it and follow it. What will you do with the sign that has been given to you?
              </p>
              <p className="text-purple-200 leading-relaxed mb-4">
                It's time to destroy the kingdom of darkness by serving the Kingdom of light! Let's shine the light to a world that's not paying attention to the signs around them. The only way we can do that is becoming a sign for them, pointing people to Christ Jesus by our words, thoughts, actions, and deeds.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">👥 The Ministry of All Christians</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                You might say well, isn't that for the servants of the church to do? Look what Paul the apostle told ALL Christians that their ministry was:
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 II Corinthians 5:17-21 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new. Now all things are of God, who has reconciled us to Himself through Jesus Christ, and has given us the ministry of reconciliation, that is, that God was in Christ reconciling the world to Himself, not imputing their trespasses to them, and has committed to us the word of reconciliation. Now then, we are ambassadors for Christ, as though God were pleading through us: we implore you on Christ's behalf, be reconciled to God. For He made Him who knew no sin to be sin for us, that we might become the righteousness of God in Him.""</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 text-center">
              <p className="text-lg font-semibold mb-4 text-green-300">🤝 Becoming the Jonah to Your Nineveh</p>
              <p className="text-green-200 leading-relaxed mb-4">
                One of the definitions for reconciliation is "The restoration of friendly relations." The Bible says to be friends with the world makes you an enemy with God (James 4:4).
              </p>
              <p className="text-green-200 leading-relaxed mb-4">
                If you call yourself a Christian, every one of us has this ministry that God has given us. He expects us to walk in it—to help those who are in the world, participating in evil activity, and have befriended the world. To plead with them to come back to God and be a sign to them, pointing them to the true friend that sticks closer than a brother—Jesus! In short, become the Jonah to your Nineveh!
              </p>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-300">Chapter 10: Where is Your Nineveh?</h2>
            
            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🎤 The Question That Changed Everything</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                I heard a certain pastor ministered a message about Jonah that caused a man sitting in the congregation of the church to ask the question, "Where is my Nineveh?"
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Before we get into trying to answer that, let's first look at what an ambassador is, because the Bible says we are called ambassadors for Christ.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 II Corinthians 5:20 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Now then, we are ambassadors for Christ, as though God were pleading through us: we implore you on Christ's behalf, be reconciled to God."</p>
              </blockquote>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🏛️ What is an Ambassador?</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                The original word for ambassador in America was minister; at least five presidents of the United States were ambassadors before becoming president. An ambassador is a person that resides in another country while representing their own country. They stay in an embassy, and from there they conduct the business of representing their country and its citizens in that foreign country.
              </p>
              <p className="text-purple-200 leading-relaxed mb-4">
                They also grant immunity to people. Immunity is the act of stopping prosecution or penalties to be charged against a person by the government of a foreign country. If an individual is found guilty of certain crimes, they sometimes faces expulsion from the foreign country—sent back to their own country with no charges applied. Some ambassadors have been assassinated while on foreign ground because they were trying to represent their country and defend their people.
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">✝️ Jesus, Our Ultimate Ambassador</p>
              <p className="text-red-200 leading-relaxed mb-4">
                What's the point? Jesus came down from heaven to this earth to grant immunity to the world that was guilty and deserved death and hell, but He pleaded for us and won the case. He had to pay the penalty of our sin by dying the ultimate death of a thief and a rebel, even though He was innocent. Now all who call upon Him will be saved from death, hell and the grave.
              </p>
              <p className="text-red-200 leading-relaxed">
                He also came to represent heaven on earth to us so we can learn how to represent heaven on earth to others. Now He calls us His ambassadors; now we are citizens of heaven.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Ephesians 2:19 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Now, therefore, you are no longer strangers and foreigners, but fellow citizens with the saints and members of the household of God."</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">👑 Chosen by the King</p>
              <p className="text-green-200 leading-relaxed mb-4">
                An ambassador doesn't get to pick the foreign country he wants to go to as a representative of his home country. As a matter of fact, in America the president chooses the ambassador and chooses his location. Jesus chose you to be a representative of the Kingdom of heaven to this world.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 John 15:16-17 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"You did not choose Me, but I chose you and appointed you that you should go and bear fruit, and that your fruit should remain, that whatever you ask the Father in My name He may give you. These things I command you, that you love one another."</p>
              </blockquote>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">🗺️ Your Appointed Nineveh</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Also, in the same way you don't choose where you will represent Him—He chooses. It's obvious we are to represent Him wherever we go, but to every one of us He has appointed to us our own "Nineveh."
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Whether it be your home town amongst your own people, or whether it be in a foreign land in a different city or a different country—will you go?
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🍷 Gath Hepher - The Winepress</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Jonah had no problem being submissive to God when it was His own home town and amongst his own people.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 II Kings 14:25 NKJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"He restored the territory of Israel from the entrance of Hamath to the Sea of the Arabah, according to the word of the LORD God of Israel, which He had spoken through His servant Jonah the son of Amittai, the prophet who was from Gath Hepher."</p>
              </blockquote>
            </div>

            <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-orange-300">🎉 The Comfort of Home</p>
              <p className="text-orange-200 leading-relaxed mb-4">
                The town Jonah was from was called Gath Hepher, which means in Hebrew "the winepress." Wine in many places in the Bible represents joy, celebration, salvation, and the New Covenant. You see, it's easy to preach the Gospel of the New Covenant in a place where you have joy, where you're celebrated amongst family and friends, where your received and not rejected.
              </p>
              <p className="text-orange-200 leading-relaxed">
                But when God told Jonah to go to Nineveh, Jonah had to go through so much discipline and many unnecessary storms before he submitted to God's will and destination for his life.
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">🏃‍♂️ Nineveh - The Fugitive's Refuge</p>
              <p className="text-red-200 leading-relaxed mb-4">
                A few of the definitions for the word Nineveh are "refuge, a fleeing one and fugitive." It's not always easy to go to places that are dark, dirty, and disgusting—filled with sin and shame of this world, where the people don't celebrate you but hate you. Places where there is no joy, but depression and discouragement and the people don't want to hear about the Gospel or Jesus. That's Nineveh!
              </p>
              <p className="text-red-200 leading-relaxed mb-4">
                Many ministers want to go to the suburbs and the clean comfortable places, but Nineveh is more like the inner cities and ghettos near you. Nineveh is the place where you probably don't want to go and no one else wants to go either. Nineveh is the people that get on your nerves, the people that are addicted, bound, and rebellious towards everything that stands for God. Nineveh is where the outcasts live.
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">💡 Where Jesus Would Go</p>
              <p className="text-green-200 leading-relaxed mb-4">
                The Nineveh's of this world need a Christ ambassador to represent His light in the darkest of places. Nineveh is where Jesus would have gone. Jesus was always ministering to notorious sinners like the tax collectors, prostitutes, drunks, and adulterers. Nineveh is where God needs you the most.
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🕊️ Peacemakers and Reconciliation</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                The Bible says to be friends with the world makes you an enemy of God (James 4:4). There are people trying to run from God and run from the plan God has for them. God wants to use us to go after these enemies so that they can become friends—sons and daughters of God. Jesus said in Matthew 5:9: "Blessed are the peacemakers, for they shall be called sons of God" (NKJV).
              </p>
              <p className="text-purple-200 leading-relaxed mb-4">
                We are called to go after the ones that are an enemy of God because of their rebellious attitude toward Jesus. We need to do everything we can to bring them—no matter how bad they are or where they are from—and minister to them the saving knowledge of Christ. When they accept Him, we have just brought peace between them and God. That's a true peacemaker. When Jonah finally repented and accepted his Nineveh assignment, people got saved, a nation was spared, and people found out who the one true God really was.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🏠 My Personal Nineveh - Chicago</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                I never had true peace and fulfillment until I accepted the Nineveh in my life, and you will not have peace and fulfillment until you accept your Nineveh. As we have learned in this book, Jonah couldn't become right with God until he accepted his Nineveh.
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                For me, the place I started to minister was my hometown of Chicago. I was the most worst person—a real chief sinner before my born-again experience. So when God called me to minister, I thought he wanted me to go to a completely different city where no one knew me, because I felt there was no way that the people where I grew up were going to take me seriously. I hurt a lot of people. I was in trouble with five of the biggest families in Chicago for a lot of different reasons. I thought there was no way that God would tell me to start a ministry in Chicago. But He did; He truly used all my past as the testimony of His saving and changing Grace. In Chicago is where Soldiers for God Ministry (SFGM) started.
              </p>
              <p className="text-blue-200 leading-relaxed">
                Many of the same people that I had trouble with and hurt, God allowed me to be used to minister to them and help them in their walk with Jesus. Thank God, because the Bible says, "When the Lord takes pleasure in anyone's way, he causes their enemies to make peace with them" (Pro 16:7). I have seen this in my life and He can do it for you as well.
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">📈 God's Favor in Chicago</p>
              <p className="text-green-200 leading-relaxed mb-4">
                The ministry started in 2007 and immediately began to grow in amazing ways, with many new converts changed by the Gospel and the love of Jesus. About three years later the Church of God, the denomination I serve in, gave us our own building with a house that was connected to it. The best part was that it was the same church I attended for fifteen years of my life. A few years later we paid it off and remodeled both buildings. God was truly pouring out His favor on us. Many ministers were raised up in that church, five of whom planted their own ministries. Many families were raised up to serve the Lord and over fifteen marriages were established from the direct connection of the church. We raised hundreds of thousands of dollars for missions, for homeless ministry and events to bring people to Christ.
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">⚔️ Trials and Attacks</p>
              <p className="text-red-200 leading-relaxed mb-4">
                There were many trials and attacks on the ministry as well, some of which were my fault for stupid choices I made and pride that crept in, it was because the enemy had seen that God was using us to impact our city. Many times I wanted to leave my "Nineveh" because of the pressure, hurt, discouragement, anger, frustration, temptation, tribulation, and attacks of the enemy. But God! God wouldn't let me and gave me the grace, mercy and the strength of the Lord to go forward.
              </p>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">✈️ Destiny Calls in Orlando</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                I ministered in Chicago from 2007 until something happened in 2016. I was on vacation in Orlando, Florida, where I usually would take my family on vacation, but this time destiny began to reveal itself like never before. Let me explain. For over a year I kept feeling like God wanted me to do an outreach in Orlando. I thought that God wanted me to plant a church like before. It never occurred to me what God was about to do.
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                While on vacation in Orlando, one of my guys that lived there asked me to do a Church service while I was there. I told him I was on vacation and I would come back and do a service—I randomly said November 3rd, or so I thought it was a random date. I flew back home from Orlando to Chicago on a Sunday morning. When I got home, I began to pray before our evening service and I told God, "I'm sorry for telling the people of Orlando I was going to come there without asking you first, so I will not go to Orlando unless you confirm it."
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">👥 Divine Confirmation</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                Three hours later the service started. While it was going on, I noticed an American man and woman walk into the service, so at the end of the service I greeted them. They explained how they grew up in that church, and I told them I did too. Then I realized they left the church right around the same time I started attending there. Then he shared how he had just gotten off a plane from Orlando hours before he walked into the church. I told him I just got off a plane from Orlando, too. He said he was on vacation and wanted to visit the church he grew up in, and then said God sent him to Orlando, Florida, and he has a thriving ministry there.
              </p>
              <p className="text-purple-200 leading-relaxed">
                It completely blew me away because I knew this was the confirmation I needed to start an outreach in Orlando. Although it was more than that.
              </p>
            </div>

            <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-orange-300">⚰️ A Divine Burial</p>
              <p className="text-orange-200 leading-relaxed mb-4">
                I had family and friends set up a banquet hall in Orlando for November 3rd. Also, I had one of my guys from Dallas, Texas fly out and one of my guys from Chicago go with me, thinking maybe they would be potential candidates for the church in Orlando.
              </p>
              <p className="text-orange-200 leading-relaxed mb-4">
                On October 30th, I get a phone call that my grandmother in New Jersey passed away. I began to worry because I would have to cancel the service in Orlando to go to the funeral in New Jersey. My family told me something that shocked me—they said the funeral would be November 2nd and the burial on the 3rd, and it would be all done in Orlando!
              </p>
              <p className="text-orange-200 leading-relaxed mb-4">
                I questioned my family why would they burry my grandmother in Orlando if we didn't have any other family buried there. They explained how she wanted to be put to rest in Florida. I felt great about it because I could still honor my grandmother and not have to cancel the service. It worked out perfectly—I thought maybe it was too perfect, not knowing it was all by God's divine design.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🏛️ Biblical Principle of Burial</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                When we got to Orlando I conducted the funeral, and then on November 3rd we go to the burial ground to lay my grandmother to rest. While they were finishing up the burial, I noticed her last name Lee was on the head stone and I thought about when I was born I was named by my mothers last name of Lee. Why does this matter? God placed in my mind something that represented a Biblical principle that had to do with burial.
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Burial location was very important in Biblical days, and even now for Jewish people—something the gypsy people have in common with them. One reason the burial place was so important is it has to do with God's promise of the land. God had promised that Abraham's descendants would possess the land where he had been buried (Genesis 12:1-3). Also, Jacob knew that if he was buried in Canaan, his tomb would forever remain within the Promised Land. The fact that Abraham, Isaac, and Jacob would all be buried there—three generations—emphasized their belief in God's promise to give this land to their family.
              </p>
              <p className="text-blue-200 leading-relaxed">
                Burial was a mark of land ownership. The gypsy community also lay claim to a city by claiming their dead are buried there. So as I was thinking of all this, I said, "Lord, what are you doing?" Then God revealed to me that every Gypsy pastor that has ever ministered in Orlando never had any dead buried there. But I just thought it was just me and I'm always trying to connect things Biblically.
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🎤 The Jephthah Message</p>
              <p className="text-green-200 leading-relaxed mb-4">
                That night we had an amazing service in Orlando with about sixty-five people. The anointing was strong and I ministered a message I had preached in Chicago weeks before about how your past doesn't determine your future. It was about Jephthah from the book of Judges chapter eleven. A person in the Bible that was rejected by his family and friends because they were ashamed of him, but later begged him for his help to fight against the enemy that was coming against them. They wanted his help because he was a mighty warrior and soldier.
              </p>
              <p className="text-green-200 leading-relaxed mb-4">
                Then I called up the guys that I brought with me to say something for a few minutes. After they were done, God told me, "It isn't for them it's for you!" Then He showed me the people in the crowd, many were from Chicago but now live in Orlando. Like Jephthah, they rejected me and wanted nothing to do with me but God was about to make me their leader to help them fight against the enemy.
              </p>
              <p className="text-green-200 leading-relaxed">
                He also showed me that just like a shepherd goes after the lost sheep, He was sending me to the lost sheep from Chicago now living in Orlando—which were at least one hundred people. They were not serving God and many were hurt and let down by other pastors and leaders in the past.
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">🤔 Confusion and Confirmation</p>
              <p className="text-red-200 leading-relaxed mb-4">
                Again I thought maybe this is the enemy trying to confuse me, and trying to get me to leave a blessed people and a ministry that was in the midst of revival back in Chicago. At this time we were experiencing a mighty outpouring from God—there were five consecutive Sundays where we had to pull out extra chairs because there was no room. Most importantly, God was gracing us with His presence like never before and lives where changing. Also, we were raising up leaders that were about to start their own ministries.
              </p>
              <p className="text-red-200 leading-relaxed mb-4">
                So I left Orlando very confused, trying to understand if this was the enemy or God? When I got back home I told Gina my wife what I thought God was telling me, and she told me I was crazy and that she's not leaving. I told her she was right and she walked out of the room.
              </p>
              <p className="text-red-200 leading-relaxed">
                Then she came back and reminded me about when we were in Orlando in the winter of 2009 on vacation. I was outside next to the van we were about to get into, praying on the ground for the city of Orlando because I felt a heaviness for the people in the city. I got back in the car and I told her that, "I believe God wants me to be a pastor here one day." I was blown away because I totally forgot about that statement. This made her think maybe it is God bringing this to pass now. But both of us were still confused and scared thinking about whether this was God.
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">🌙 Dreams and Confirmations</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                Then, over the course of a couple weeks, people began to come up to me saying they were having dreams that I was a minister in Florida and they were worried I was going to leave. At the same time, people were calling and saying that God was showing them that He was sending me to Orlando. I began to feel pressured and even depressed, wondering how I was going to leave my congregation, my family, my daughter, and granddaughter, my church and house that's paid off and a city and people that loves me—well, most of them. Not to mention a very good salary.
              </p>
              <p className="text-purple-200 leading-relaxed">
                I mean, pastors leave when things are bad not when things are good, right? Believe me, I wanted to leave many times but God always got me through my little pity parties. This was a time in the ministry that Gina and I definitely didn't want to leave; everything was going so well and we felt like we were in harvest season.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">⏰ The Tenth Year Prophecy</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                I called my Administrative Bishop and explained what I was feeling and told him that I thought it might be the enemy trying to confuse me to get me out of my position. He responded with something that made me shift my thinking. He said, "Let me get this straight—you think the enemy is trying to get you to open up a ministry where people need it so they get saved and set free?" It made me look at this whole thing from a different perspective.
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                I began to lose sleep, getting up in the middle of the night, thinking God if you want me to go I'll go. Then the heaviness would lift, but when I would wake up in the morning I would say no way, I can't leave—and then the heaviness would come back. Then I began to think about how around the second year of the ministry in Chicago I was explaining how I believed at the tenth year of the ministry God was going to send me somewhere else. I remember the guys getting upset with me and me telling them I would only leave if God put a burden upon me that I couldn't handle and gave me confirmations that I couldn't deny. All these things God was reminding me of I had totally forgotten, but God was showing me He had this planned from the beginning. It was no coincidence my ministry in Chicago was months away from its tenth-year anniversary.
              </p>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">🙏 Fasting and Prayer for More Confirmation</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Gina and I began to pray and fast, asking for more confirmation. Then Gina recommended that I call a pastor friend of mine that truly works in the prophetic to come preach on a Wednesday night. I did, but I didn't call—I texted him because I didn't want him to hear the burden and hurt in my voice. If this was God He would use Him without me saying anything. So I text him and said, "Hey man, need a word." That's it. He didn't reply back until the next day, because he was on vacation, but God told him get off his vacation and come preach for me. I was excited for him to come because he prophesied many things for me and our church that God fulfilled.
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                So right before the fast was over, I felt a warm circular feeling around my heart that I have never felt before with my walk with God. I felt God say to me, "As Abraham left everything, I am telling you to do the same." Because I kept complaining to God and questioning Him, asking how He could expect me to leave everything and everybody I have in Chicago. So I told Gina, "The pastor that's coming, he has to preach about how Abraham left everything—that's how I will know this is really God." Then she told me that God told her there's going to be a shift in the church, and that's what the pastor had to say too.
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">⚡ The Prophetic Word</p>
              <p className="text-red-200 leading-relaxed mb-4">
                Wednesday came and we purposely went to church late. We didn't want to talk to anyone, especially the pastor. We wanted to see if this was really God. I gave him the mic and acted like everything was ok. He started off by saying how he felt a sorrowful spirit in the church; it was obviously me and Gina. He then began to explain how he wanted to preach another message, but God changed his message and he had to be sensitive to the Holy Spirit and needed to preach what God told him.
              </p>
              <p className="text-red-200 leading-relaxed mb-4">
                Then he said, "I need to let you know that there is going to be a shift in this church!" Gina looked at me and began to cry. Then He said turn to the book of Genesis chapter twelve which says:
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Genesis 12:1-3 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"The Lord had said to Abram, "Leave your native country, your relatives, and your father's family, and go to the land that I will show you. I will make you into a great nation. I will bless you and make you famous, and you will be a blessing to others. I will bless those who bless you and curse those who treat you with contempt. All the families on earth will be blessed through you.""</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🎯 The Direct Word</p>
              <p className="text-green-200 leading-relaxed mb-4">
                He then began to preach how Abraham left everything and that God wants us to step out of our comfort zone and walk in faith and do what He has called us to do. I was blown away, but then after preaching for fifteen minutes about listening to God's voice and doing what He tells you by faith he began to explain how there's a blessing on my life. He said God wants to use me to save many people from hell and that the church cannot be selfish and hold on to me because God wants to use me.
              </p>
              <p className="text-green-200 leading-relaxed mb-4">
                Then the pastor came up to me, straight to my face, pointed at me and said, "If God told you to go you have got to go!" I couldn't believe what was happening, and people in the church knew too. At the altar call everyone began to weep, knowing God was moving me and about to do something new.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">💭 The Dream Confirmation</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Right after the service, one of the servants of the church that I was truly concerned about approached me. He was there for only a short time, and his life had changed so dramatically and I was worried he would be hurt and leave the church. He explained how he would have been upset with me leaving, but God had to tell him first. I asked what do you mean? He said he had a dream the night before and God told him that Pastor Anthony will only be happy if I'm happy, and I wont be happy if Pastor Anthony stays in Chicago.
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Now I knew this was obviously God and not my emotions, feelings, and flesh. So I had a decision to make. Was I going to stay in my hometown where I was comfortable and everything was easy or was I going to be a Jonah and reject the Nineveh that God told me to go minister to?
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">📖 Writing This Book</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                I told Gina afterward that we have to go right away. As all this was going on, I was writing this very book that you're reading—which was more confirmation to me. Precisely at the exact time God was calling me to go to unfamiliar territory, I was writing a book about a man of God that rejected the word of the Lord and went through a lot of unnecessary storms because of it.
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🏆 SFGM Orlando's Success</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Long story short, we end up listening to the voice of God. Thank God that when we left a month or so later, after visiting and counseling with people and making sure the transition of my assistant pastor to senior pastor was ready to be filled we went forward. Also, after I left, my choir leader and armor bearer opened up another location in Chicago; I didn't know if it was God at the time or not, but I told him we would see in a year and then I would support him. Well, praise God—both churches just celebrated their second anniversary. They are doing an amazing job for the Lord. Also, I helped one of my other guys who was lead by the Lord to go to Canada to plant a church in Toronto because God lead me to tell him I felt like that was the city for him. He thought I was crazy at the start, but then he too received conformation from the Lord.
              </p>
              <p className="text-green-200 leading-relaxed mb-4">
                Thank God, SFGM Orlando is doing great. We thank God the Lord is moving in an awesome way. Sixty people have already been baptized in the first two years, there are hundreds of people in attendance, and God is raising up an army to impact the next generation for the glory of God.
              </p>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">🚗 The Burgundy Car Dream</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                When I got to Orlando and the shipper was taking the cars off the truck, they placed my burgundy Chevy Cruz on the road. As I was looking at the scene, God reminded me of a dream I had years ago. I was in Florida and I got out of a burgundy car and walked into the house of a minister that used to be in Orlando but fell away from serving the Lord. In the dream I was rebuking him and encouraging him to stop being a bad witness and start serving the Lord again. In the background on a radio in the house was playing a preaching called a call you can't ignore—the message was about Jonah. In the dream I'm telling the minister you have to repent. At the time he was upset, but after I told him that he got up, started crying, and fell on me as his tears began to hit my face.
              </p>
              <p className="text-yellow-200 leading-relaxed">
                Well right there God showed me outside of my Florida house looking at my burgundy car. By the way I didn't have this car when I had the dream years ago. God showed me the dream meant that He was going to use me to minister to this minister, which a few weeks ago I just did. Also, the compassion for the people that was on him now fell on me (tears) for the people.
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 text-center">
              <p className="text-lg font-semibold mb-4 text-red-300">❓ The Final Question</p>
              <p className="text-red-200 leading-relaxed mb-4">
                My question to you after you read all of this is when God speaks to you, will you listen? Maybe He's already speaking. Maybe you know where your Nineveh is and maybe you don't. Then start where you are—just like Jonah did, he started in his own hometown. Then he went to his Nineveh.
              </p>
              <p className="text-red-200 leading-relaxed mb-4">
                If you're a minister, don't just go where the weather is nice and there are palm trees and it's comfortable. You might say yeah, but pastor you're in Florida. There's a difference—I was called here, I didn't come without God approving it first. I mentioned a lot of the confirmations because you shouldn't go anywhere without real Spirit lead confirmation like the word of God, signs, dreams, and most importantly the peace of the Lord. There's a difference between just going somewhere and being sent somewhere!
              </p>
              <p className="text-red-200 leading-relaxed">
                Many people want to open up ministries in their own hometown because they're comfortable. I didn't start a ministry in Chicago because it was convenient; I did it because I was called and confirmed. And when I left, there were hundreds of people, money in the bank, and a person to take over leadership. Glory to God. Wherever you are and wherever you go, make sure it's because God has called you there. Don't be a Jonah—accept your Nineveh!
              </p>
            </div>
          </div>
        );
      case 11:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-purple-300">Chapter 11: Leaving a Legacy</h2>
            
            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Proverbs 3:35 MEV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"The wise will inherit glory, but shame will be the legacy of fools."</p>
              </blockquote>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📚 What is a Legacy?</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                According to Collins English Dictionary, a legacy of an event or period of history is something which is a direct result of it and which continues to exist after it is over.
              </p>
              <p className="text-blue-200 leading-relaxed">
                When you look at the differences of Jonah's and Jesus' legacy, they are very different. Jonah's story ends with a question mark (see Jonah 4:11). Jesus' story actually never ends, obviously—but in the Bible before He ascends to heaven He commissioned His disciples to go and change the world (Matthew 28). Why did his disciples and millions after them suffer pain, humiliation, and even death for the cause of Christ? Simple—because of the legacy that Jesus left that inspired their lives even unto death.
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">❓ The Question That Matters</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                My question is this: after you leave this earth, will you leave a legacy that inspires others to turn to Jesus or turn from Jesus? Personally, after God takes me home to be with the Lord, I want to know that even after my time is done here on earth that God will continue to use me. I pray that long after I am gone, the teachings God gave me to minister, the books He has allowed me to write, and the life He allowed me to live for His Glory, will still be shared, read, and talked about from generation to generation. Why? Simple, because I want God to use all that He allowed me to do for Him to point many more to Him even after I'm gone.
              </p>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🎉 The Welcome Home</p>
              <p className="text-green-200 leading-relaxed mb-4">
                I eagerly wait and serve Jesus here so that when I get there I will hear those amazing and humbling words from Jesus: "Welcome home, my good and faithful servant; enter into the joy of your rest."
              </p>
              <p className="text-green-200 leading-relaxed mb-4">
                I feel sorry for the people that will hear, "Go away from me for I have never known you, you workers of iniquity" (Matthew 7:21).
              </p>
              <p className="text-green-200 leading-relaxed">
                The grace you receive and the life you live here will determine what you will hear in the life that truly matters, eternity. You will live an eternity somewhere, the question is—where will it be?
              </p>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">💡 Living for Eternity</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Choose to live for Jesus here and live a life that after you're gone you will still point people to the resurrected Christ! As I was preparing this chapter, I began to think about a story in the Bible about the prophet Elisha. Elisha was a prophet under the prophet Elijah, one of the most powerful and influential prophets ever. Elisha learned everything from his mentor Elijah's great examples concerning the things of God.
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                Elisha was also a powerful man of God that received a double portion of Elisha's anointing on his life. Elisha lived and served God and he influenced many for the glory of God. The verse you are about to read actually has to do with what God did through the prophet Elisha—not while he was living but after he died.
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">💀 The Prophet's Bones</p>
              <p className="text-red-200 leading-relaxed mb-4">
                The prophet was dead and his bones laid in a burial site. Now, before the prophet Elisha took the place of his predecessor Elijah, he asked Elijah for a double portion of the anointing that was on Elijah's life (2 Kings 2:9). God ended up granting Elisha's request. The prophet Elijah was used by God to perform fourteen miracles, ranging from prophesies fulfilled, stopping the rain for a time, to raising the dead. The prophet Elisha died after performing twenty seven miracles, one short of the double portion blessing—or so we thought.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 2 Kings 13:21 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Once when some Israelites were burying a man, they spied a band of these raiders. So they hastily threw the corpse into the tomb of Elisha and fled. But as soon as the body touched Elisha's bones, the dead man revived and jumped to his feet!"</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🎊 The Twenty-Eighth Miracle</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Praise God—number twenty eight. The fulfillment of the double portion happened after the prophet was dead. His legacy made the dead leap to life. That just gets me exited every time I read that verse because it teaches us that after we're gone our testimony and life can still make people tap into the resurrecting power of Christ!
              </p>
            </div>

            <div className="bg-orange-900/20 p-6 rounded-lg border border-orange-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-orange-300">❓ Question Mark or Exclamation Point?</p>
              <p className="text-orange-200 leading-relaxed mb-4">
                Do you want your life to end with a question mark like Jonah's? When people pass away, we ask questions about their view of eternity and their loved ones place. Do you think they made it to heaven? Why did this happen to them? I wonder what's going to happen to their family? Do you think they had time to repent? If they only would have served the Lord, wouldn't it have been different?
              </p>
              <p className="text-orange-200 leading-relaxed mb-4">
                Instead of leaving this world with a question mark, leave it with an exclamation point! Peoples' spirits should be raised in excitement about how we live for Christ. Even when we pass away, our testimony should help them mourn in joy after our death because they know we lived a life that pointed people to Christ and that we helped people experience the resurrection saving power of Jesus!
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">💪 Faith and Inspiration</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                So instead of being filled with doubtful questions, they can be filled with faith and inspiration and can make bold statements of the person's faith. I wish I could serve God like they did! They really inspired me to serve God! They led me to Christ! They helped my family to really know Christ! I want to follow in their footsteps! They really were an example of Christ! They really loved and had compassion for people!
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">🔄 Jonah vs. Jesus</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Let's look at the life of Jonah when compared to Jesus. The following seven points are from an article I read about the parallels about Jonah and Jesus:
              </p>
            </div>

            <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-red-300">📋 Seven Parallels</p>
              <div className="space-y-4">
                <p className="text-red-200 leading-relaxed">
                  <strong className="text-red-300">1.</strong> Jonah spent three days inside the belly of a great fish because of his own sinfulness and rebellion. Jesus spent three days inside the belly of the earth because of our sin and rebellion.
                </p>
                <p className="text-red-200 leading-relaxed">
                  <strong className="text-red-300">2.</strong> Jonah ran from the difficult calling God gave Him (Jonah 1:3). Jesus perfectly obeyed the Father's will, coming to earth and dying on the cross.
                </p>
                <p className="text-red-200 leading-relaxed">
                  <strong className="text-red-300">3.</strong> Jonah was asleep on the ship during a storm caused by his own disobedience (Jonah 1:4-12). Jesus slept on a boat during a storm, and "rebuked the wind and said to the waves, 'Quiet! Be still!' Then the wind died down and it was completely calm." (Mark 4:35-41). Jonah caused a storm. Jesus had authority over the storm.
                </p>
                <p className="text-red-200 leading-relaxed">
                  <strong className="text-red-300">4.</strong> Jonah feared the Creator who had authority on earth (Jonah 1:9). Jesus is the Creator with all authority over heaven and earth (John 1:3; Matthew 28:18).
                </p>
                <p className="text-red-200 leading-relaxed">
                  <strong className="text-red-300">5.</strong> In the fish, Jonah knew that "Salvation belongs to the Lord" (Jonah 2:9). Jesus' name means "Yahweh saves." Jesus is the way of salvation (Hebrews 5:9; Acts 4:12).
                </p>
                <p className="text-red-200 leading-relaxed">
                  <strong className="text-red-300">6.</strong> Jonah became angry with God for showing grace toward repentant sinners (Jonah 4:2). Jesus modeled God's grace toward repentant sinners (Romans 3:24).
                </p>
                <p className="text-red-200 leading-relaxed">
                  <strong className="text-red-300">7.</strong> Jonah was angry enough to die because of God's grace toward his enemies (Jonah 4:3). Jesus was compassionate enough to die because of His love for his enemies (Romans 5:10).
                </p>
              </div>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">🤔 The Choice is Ours</p>
              <p className="text-green-200 leading-relaxed mb-4">
                The question we must ask is, are we more like Jesus or Jonah? The prayer we must pray is, make me more like Jesus.
              </p>
              <p className="text-green-200 leading-relaxed mb-4">
                Don't be a Jonah!
              </p>
              <p className="text-green-200 leading-relaxed">
                It's time to stop running like Jonah and start serving like Jesus so you can impact this generation and the next!
              </p>
            </div>

            <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-purple-300">📖 Epilogue</p>
              <p className="text-purple-200 leading-relaxed mb-4">
                My prayer is that you've learned enough in this book to get you to say yes to the calling that God has for your life, and that you would start a daily reading of the book that truly matters—the Bible!
              </p>
              <p className="text-purple-200 leading-relaxed mb-4">
                I mentioned in the previous chapters how we are called to be like ambassadors for God. Ambassadors are experts in the laws of their land, and foreign lands as well. What's the point? Like ambassadors, we too need to know the law of the kingdom and the Word of God. Then we can help others in this foreign land to point them to our home in heaven.
              </p>
            </div>

            <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📚 Start a Daily Devotional</p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Start a daily devotional in the Word of God. Why? The subtitle to this book is, "Stop running like Jonah and start serving like Jesus." Well, the only way you can truly start serving like Jesus is to study the life of Jesus; study the Gospels that tell us of Jesus, and study the whole book that Jesus gave to us to learn to be like Him. The Bible is what changed my life, the lives of many people I know, and millions more like us.
              </p>
              <p className="text-blue-200 leading-relaxed mb-4">
                Every man and women of God I know that is walking in their call are people of the Word who started a daily devotional in the Word of God and never stopped reading it. Why? Because they know that the Word is their bread, meat, water, and life. Please don't let this book be where it ends—let it be a beginning. Don't let this be the conclusion and just say, good book—and that's it. Let it actually be the start of you getting in the book that truly matters. The Bible.
              </p>
            </div>

            <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-yellow-300">⏰ Time Investment</p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                That's the only way you will learn how to serve Jesus and walk in your calling. If you read the Bible for fifteen minutes a day you can read it in a year. Fifteen minutes a day is actually only one percent of your day. If we can't give God one percent, how do we expect one hundred percent from Him?
              </p>
              <p className="text-yellow-200 leading-relaxed mb-4">
                If you read a chapter a day you can read it in about three and a half years, about the same time Jesus spent with his disciples.
              </p>
              <p className="text-yellow-200 leading-relaxed">
                However you decide to read, just start reading! Start in the New Testament and continue through the Old Testament.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 1:1 & 3:1 KJV</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"Now the word of the Lord came unto Jonah the son of Amittai, saying,"</p>
              </blockquote>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"And the word of the Lord came unto Jonah the second time, saying,"</p>
              </blockquote>
            </div>

            <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
              <p className="text-lg font-semibold mb-4 text-green-300">📖 The Word Brings Us Back</p>
              <p className="text-green-200 leading-relaxed mb-4">
                Jonah was a man of God that knew the word of God and I believe the Word is what kept him and no matter how far he went off course the Word brought him back. This is why we need the word every day in our lives as well.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold mb-4 text-blue-300">📖 John 1:1-4 NLT</p>
              <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                <p>"In the beginning the Word already existed. The Word was with God, and the Word was God. He existed in the beginning with God. God created everything through him, and nothing was created except through him. The Word gave life to everything that was created, and his life brought light to everyone."</p>
              </blockquote>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Chapter content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button onClick={() => setLocation("/textbook-catalog")} variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go back to catalog
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <img 
                src="/src/assets/sfgm-shield.png" 
                alt="SFGM Logo" 
                className="h-8 w-8"
              />
              <h1 className="text-xl font-bold text-white">Don't Be a Jonah</h1>
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
                <p className="text-white/90 text-xl font-semibold">{currentChapterData.title} 🐋</p>
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

              {/* Chapter Navigation Dropdown */}
              <div className="flex justify-center mt-6">
                <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
                  <SelectTrigger className="w-80 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select a chapter" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {chapters.map((chapter) => (
                      <SelectItem 
                        key={chapter.id} 
                        value={chapter.id.toString()}
                        className="text-white hover:bg-gray-700"
                      >
                        {chapter.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <audio
                ref={audioRef}
                preload="auto"
                onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Chapter Content */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="prose prose-invert max-w-none">
            <div className="text-white leading-relaxed space-y-6">
              {currentChapter === 1 && (
                <>
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
                </>
              )}

              {currentChapter === 2 && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-yellow-300">Chapter 2: The Bitter Root</h2>
                  
                  <div className="mb-6">
                    <p className="text-lg font-semibold mb-4 text-blue-300">📖 Hebrews 12:14-15 NLT</p>
                    <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                      <p>"Work at living in peace with everyone, and work at living a holy life, for those who are not holy will not see the Lord. Look after each other so that none of you fails to receive the grace of God. Watch out that no poisonous root of bitterness grows up to trouble you, corrupting many."</p>
                    </blockquote>
                  </div>

                  <p className="mb-4">Why was Jonah so against the mission that God called him to do? The people of Nineveh were Assyrians, and the Assyrians were enemies of the Jewish people. Theologians and scholars believe that the Assyrians killed Jonah's family and friends. I believe this is confirmed as truth because we see that when God showed mercy to the people of Nineveh, Jonah was angry about it.</p>

                  <div className="mb-6">
                    <p className="text-lg font-semibold mb-4 text-blue-300">📖 Jonah 4:2 NLT</p>
                    <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                      <p>"So he complained to the Lord about it: 'Didn't I say before I left home that you would do this, Lord? That is why I ran away to Tarshish! I knew that you are a merciful and compassionate God, slow to get angry and filled with unfailing love. You are eager to turn back from destroying people.'"</p>
                    </blockquote>
                  </div>

                  <p className="mb-4">The root of the problem was bitterness; he allowed a bitter root to set in his heart. I guess he had a good reason to be bitter. What do I mean?</p>

                  <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                    <p className="text-lg font-semibold mb-4 text-red-300">⚠️ The Assyrians: Ancient ISIS</p>
                    <p>Think about the modern day terrorists that go by the name ISIS. This terrorist group targets Christians and they are very cruel to the people they fight against; they are known for amputating their victim's body parts and cutting their heads off and parading their victim's dead bodies in the streets and for killing men, women, and children without remorse or regret. Many of the ISIS terrorists are from Assyria!</p>
                    <p>The Assyrians in Jonah's day were the modern day ISIS. They were very cruel to the Jewish people and they had no mercy for anyone; they brought terror and destruction wherever they went. I'm sure Jonah thought about all this when God told him to help the very people that were hurting Jonah's family and friends, and because of this he ran from his calling.</p>
                  </div>

                  <p className="mb-4">So the reason why Jonah was so against what God wanted him to do is because he was bitter. One of the biggest problems in the world in general and even in the church is bitterness. A bitter root doesn't just develop in a person's life over night; it all starts with a person being offended. Jesus even told us in the end times many people will be offended.</p>

                  <div className="mb-6">
                    <p className="text-lg font-semibold mb-4 text-blue-300">📖 Matthew 24:10 KJV</p>
                    <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                      <p>"And then shall many be offended, and shall betray one another, and shall hate one another."</p>
                    </blockquote>
                  </div>

                  <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
                    <p className="text-lg font-semibold mb-4 text-yellow-300">🎣 The Bait of Satan</p>
                    <p>I read a book called "The Bait of Satan" by John Bevere. In this book the author explains the dangers of being offended and allowing the enemy to instill bitterness in a person's heart. The word for "offense" found in Matthew 24:10 is the greek word skandalon. It is where we get our English word for scandal. The word skandalon was also the name of a lever that sets off a trap and catches the victim in its claws because they fell for the bait that was connected to the lever.</p>
                    <p>People today don't realize that the enemy is trapping them in offense, which leads to bitterness because they keep falling for the bait of Satan. This comes in many forms, like maybe God didn't answer your prayer so now you're bitter at God. Or like a certain person didn't acknowledge you or didn't show you the affection you thought they should—like a pastor that didn't do what you expected him to do, or a family member that didn't come through, or a friend that let you down. It might even be someone who hurt you or someone close to you, and what they did was their fault and you were truly an innocent victim of circumstance.</p>
                  </div>

                  <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                    <p className="text-lg font-semibold mb-4 text-green-300">🔄 The Cycle of Bitterness</p>
                    <p>Whatever it is that offended you it then becomes a scandal! You start complaining about it and telling others how you were done wrong. The people that you tell don't know both sides of the story fully, so they side with you and then that makes you feel justified as if you are in the right about the wrong that was done to you.</p>
                    <p>Then the hurt sets in and you start having a pity party. How they did you wrong and how you don't deserve this treatment, and because of this you start getting angry. You're angry because it's not resolved and they haven't said they are sorry, and they feel that they're right and you're wrong. Anger then gives a foothold to the enemy: "for anger gives a foothold to the devil" (Ephesians 4:27 NLT). Always remember, if someone is controlling your feet they are also controlling your direction!</p>
                  </div>

                  <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 mb-6">
                    <p className="text-lg font-semibold mb-4 text-purple-300">👥 Cain and Abel Example</p>
                    <p>Think about Cain and Abel. Cain got so angry because he was offended that God didn't receive his offering, and because of this he took it out on his brother because Abel's offering was accepted and his offering was rejected.</p>
                    <p>God warned Cain that the enemy was at the door and wanted to rule over him. God tried to get him to control his anger but Cain didn't listen.</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-lg font-semibold mb-4 text-blue-300">📖 Genesis 4:6-7 NLT</p>
                    <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                      <p>"Why are you so angry?" the Lord asked Cain. "Why do you look so dejected? You will be accepted if you do what is right. But if you refuse to do what is right, then watch out! Sin is crouching at the door, eager to control you. But you must subdue it and be its master."</p>
                    </blockquote>
                  </div>

                  <p className="mb-4">His anger controlled him, resulting in the first murder. Cain's anger became a bitterness in his heart, and like Hebrews says a bitter root will defile many around you. His bitterness killed his brother. Your bitterness will also spiritually kill you and those around you. You might say yes, but even though I have anger and bitterness God knows in my heart I still love Him? The Bible says other wise:</p>

                  <div className="mb-6">
                    <p className="text-lg font-semibold mb-4 text-blue-300">📖 1 John 4:20-21 KJV</p>
                    <blockquote className="border-l-4 border-blue-400 pl-4 mb-4 italic text-gray-200">
                      <p>"If a man say, I love God, and hateth his brother, he is a liar: for he that loveth not his brother whom he hath seen, how can he love God whom he hath not seen? And this commandment have we from him, That he who loveth God love his brother also."</p>
                    </blockquote>
                  </div>

                  <p className="mb-4">No matter what people have done to you and have done to the people around you, we have to forgive them no matter what. God is merciful with an everlasting love and He wants His people to display that same kind of mercy and love. Why should we love and forgive people no matter what?</p>

                  <div className="bg-yellow-900/20 p-6 rounded-lg border border-yellow-400/30 mb-6">
                    <p className="text-lg font-semibold mb-4 text-yellow-300">🌊 The Parable of the Unforgiving Servant</p>
                    <p>Then Peter came to him and asked, "Lord, how often should I forgive someone who sins against me? Seven times?" "No, not seven times," Jesus replied, "but seventy times seven!"</p>
                    <p>Jesus then told the parable of a king who forgave a servant millions of dollars in debt, but that same servant refused to forgive a fellow servant who owed him only a few thousand dollars. The king was angry and sent the unforgiving servant to prison to be tortured until he had paid his entire debt.</p>
                    <p>Jesus concluded: "That's what my heavenly Father will do to you if you refuse to forgive your brothers and sisters from your heart."</p>
                  </div>

                  <div className="bg-green-900/20 p-6 rounded-lg border border-green-400/30 mb-6">
                    <p className="text-lg font-semibold mb-4 text-green-300">💡 The Power of Forgiveness</p>
                    <p>I heard a quote before that said, "Un-forgiveness is a prison and when you forgive you let the prisoner go—and then you realize the prisoner was you!"</p>
                    <p>No matter how bad the people of Nineveh were, God wanted Jonah to minister His word so the people could repent and receive His love and mercy. Because of the bitter root Jonah had he was running from the very reason he was created and called to serve God. Maybe without realizing it you are running from God's call and purpose for your life because you have been hurt and you are not willing to resolve the problem by forgiving and forgetting? If that's the case it's time to let it go and release the person(s) that have hurt and hindered you from the call that is on your life. Don't let it happen; stop holding onto something Jesus died to forgive!</p>
                  </div>

                  <div className="bg-red-900/20 p-6 rounded-lg border border-red-400/30 mb-6">
                    <p className="text-lg font-semibold mb-4 text-red-300">⛪ Personal Testimony</p>
                    <p>About two years before I answered the call to become a minister, one of the hardest things in my life happened to me. That was the enemy's way to try to make me become offended at God, angry at a person, and bitter because of what happened.</p>
                    <p>My mother was murdered and it was her husband, my stepfather that did it! He was a cruel, evil man that had accusations against him of murdering others in the past before he ever murdered my mother.</p>
                    <p>When I finally got to the hospital, I thought I was going to fight with this man that did this to my mother. I entered the hospital room and I saw my mother, who was only forty-one years old at the time, filled with hoses and connected to machines. There were scars on her arms and neck from what looked like a fight she was in.</p>
                    <p>As I was reading the Bible, moments later the man that put my mother in a coma and murdered her walked in! I got off my chair and stood up thinking I'm gonna fight with this man, but something happened—God filled me with peace and love; I couldn't believe it! I began to tell him about Jesus and how only Jesus could help my mother.</p>
                    <p>The day I had to sign the papers to pull the plug on the life support that was keeping my mother in a comatose state, I was in the room with my mother and he walked in. When I saw him I began to argue with him and told him I wasn't crazy and told him to get out of the room. As soon as he left the room, God began to minister to me to go and tell him I was sorry!</p>
                    <p>I said, "God, why would you want me to do this? You know what he did." God told me, "I'm going to use you to display my love through your forgiveness and obedience." I shook my head in amazement; I then walked out of the room, went up to him, and said I'm sorry!</p>
                    <p>If God gave me the strength to forgive and show love in a tragedy I believe He can give you the same strength as well. Ask and you will receive!</p>
                  </div>

                  <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-400/30 mb-6">
                    <p className="text-lg font-semibold mb-4 text-blue-300">✝️ Jesus Took Our Bitterness</p>
                    <p>Besides, Jesus didn't only take our sin, sickness, sorrow, and shame—He also took our bitterness!</p>
                    <p>They gave him vinegar to drink mingled with gall: and when he had tasted thereof, he would not drink. (Matthew 27:34 KJV)</p>
                    <p>The Greek word here for "gall" is chole; it translates to bitterness! It's a word that means to greedily devour. Basically, Jesus ate bitterness so bitterness won't eat away at you!</p>
                    <p>Jesus taking bitterness on the cross is a picture of prophetic fulfillment of Exodus chapter fifteen, where God first revealed Himself as a healer by healing the bitter waters of Marah. The tree they threw in the water was a representation of the cross and the bitterness Jesus took! It's time to start putting Jesus in your life again and then the bitterness will be gone and life will be sweet again.</p>
                  </div>

                  <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-400/30 text-center">
                    <p className="text-lg font-semibold mb-4 text-purple-300">🎯 Conclusion</p>
                    <p>Jonah went through a lot of discipline because of the bitterness he had for the Assyrians. But when he finally came to his senses he got mercy from God that he didn't want them to get. See the problem is when people do us wrong we want justice, but when we do wrong we want mercy! It's time to apply what Jesus said: "Blessed are the merciful: for they shall obtain mercy." (Matthew 5:7 KJV)</p>
                  </div>
                </>
              )}

              {currentChapter >= 3 && (
                <div className="space-y-6">
                  {getChapterContent(currentChapter)}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
