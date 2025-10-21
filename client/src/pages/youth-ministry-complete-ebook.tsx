import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 } from "lucide-react";

export default function YouthMinistryCompleteEbook() {
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    { id: 1, title: "Chapter 1: The Calling", audioUrl: "/uploads/textbook-audio/youth-ministry-ch1.mp3" },
    { id: 2, title: "Chapter 2: Requirements", audioUrl: "/uploads/textbook-audio/youth-ministry-ch2.mp3" },
    { id: 3, title: "Chapter 3: Responsibilities", audioUrl: "/uploads/textbook-audio/youth-ministry-ch3.mp3" },
    { id: 4, title: "Chapter 4: Accountability", audioUrl: "/uploads/textbook-audio/youth-ministry-ch4.mp3" },
    { id: 5, title: "Chapter 5: Making New Disciples", audioUrl: "/uploads/textbook-audio/youth-ministry-ch5.mp3" }
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
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-orange-900 mb-4">Introduction</h2>
            <h3 className="text-xl font-semibold text-orange-800 mb-6">Why this book exists</h3>

            <p className="text-lg leading-relaxed mb-6">
              Youth ministry is holy ground. It's where God's Word meets real teenage lives, where calling turns into service, and where future disciples and leaders are formed. This course was written to help you grow into a trustworthy, Spirit-dependent youth minister who loves students, honors parents, serves your church, and makes new disciples. It blends biblical foundations with practical tools—anchored in Scripture, shaped by the awe of God (John Bevere), guided by wise leadership principles from (John Maxwell), and committed to text-driven, Spirit-empowered preaching from the principles of the book the power preaching by Dr Tony Evans.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              This course helps you to get involved in reading more books outside of the Bible that will help you in your spirituality leadership and preaching ability.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Required reading for this course</h3>
              <ul className="list-disc list-inside text-orange-800 space-y-2">
                <li>The Awe of God - John Bevere</li>
                <li>The five levels of leadership - John Maxwell</li>
                <li>The 21 irrefutable laws of the leadership - John Maxwell</li>
                <li>The power of preaching - Tony Evans</li>
              </ul>
              <p className="text-orange-900 mt-4">
                Additionally, we would like all students of this course to take the SFGM Studying for Service course prior to taking this course or after you have finished it.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Why this course exists</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
                <li>To help you love Jesus, love students, and make new disciples—simply and faithfully.</li>
              </ul>
              
              <h3 className="text-xl font-bold text-blue-900 mb-4 mt-6">What this course does</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
                <li>Gives you one clear focus each week.</li>
                <li>Turns big ideas into small steps you can actually do.</li>
                <li>Keeps you aligned with Scripture, your church, and safe ministry practices.</li>
              </ul>
              
              <h3 className="text-xl font-bold text-blue-900 mb-4 mt-6">Who it's for</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
                <li>Anyone sensing a call to youth ministry or serving students now.</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">How to Use This Course</h3>
              <p className="text-green-800 mb-4">Each week, do these four things:</p>
              <ol className="list-decimal list-inside text-green-800 space-y-2">
                <li>Read: Take 15–20 minutes to read the chapter.</li>
                <li>Do: Complete the 5 short "Weekly Challenges" (10–20 minutes each).</li>
                <li>Meet: Share your progress with a mentor or leader (15–30 minutes).</li>
                <li>Apply: Try one small thing in real ministry that week.</li>
              </ol>
              
              <h4 className="text-lg font-bold text-green-900 mb-2 mt-4">What you need</h4>
              <ul className="list-disc list-inside text-green-800 space-y-1">
                <li>A Bible, a notebook, and one mentor/leader for feedback.</li>
              </ul>
              
              <h4 className="text-lg font-bold text-green-900 mb-2 mt-4">Time guide (per week)</h4>
              <ul className="list-disc list-inside text-green-800 space-y-1">
                <li>About 1–3 hours total, spread across the week.</li>
              </ul>
              
              <h4 className="text-lg font-bold text-green-900 mb-2 mt-4">Keep it simple</h4>
              <ul className="list-disc list-inside text-green-800 space-y-1">
                <li>Pick one habit to start, one system to try, and one person to invest in each week.</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Simple Table of Contents</h3>
              <ul className="list-disc list-inside text-purple-800 space-y-2">
                <li>Introduction: Why this book and how to use it</li>
                <li>Week 1: The Calling - Hear God's whisper, confirm it in community, root identity in Christ.</li>
                <li>Week 2: Requirements - Be the right person before you do the work: character, rhythms, safety, Scripture.</li>
                <li>Week 3: Responsibilities - A workable weekly rhythm: preach clearly, lead small groups, follow up, partner with parents, build volunteers, plan simply.</li>
                <li>Week 4: Accountability - Live in the light: guardrails for money, safety, teaching, feedback, and energy.</li>
                <li>Week 5: Making New Disciples - Keep the gospel clear, build a simple pathway, equip students to invite and share, secure next steps.</li>
                <li>Conclusion - Tie it all together, final encouragement, and closing prayer.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-orange-900 mb-4">Chapter 1: The Calling</h2>
            <p className="text-lg leading-relaxed mb-6">
              When God calls a young person, He rarely does it with fanfare. More often, He whispers. In the quiet, He stirs a heart to pay attention to what He's doing among the next generation. If you're reading this, perhaps you've sensed that whisper: a burden for students who are searching, a desire to teach God's Word so it lands like fire, a conviction that your life is meant to be poured out for the good of teens and the glory of God. Calling, especially to youth ministry, is God's invitation to partner with Him in shaping future disciples and leaders. It is holy, humbling, and deeply hopeful.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              The stories of Samuel, David, and Timothy show us that God loves to entrust significant work to young people. Their age did not disqualify them; it made them dependent on God. And dependence is the soil where calling grows.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">Samuel's Night in the Temple</h3>
              <p className="text-green-800 mb-4">
                Samuel's night in the temple is a picture of the beginning of ministry: a child in a sacred place learning to recognize the Lord's voice (1 Samuel 3). Samuel didn't know it was God at first. He needed Eli, an older priest, to help him discern. That detail matters. Calling ripens in community and under mentorship. Samuel's simple response—"Speak, Lord; Your servant is listening"—is the first posture of a called leader: open-handed, attentive, ready to obey.
              </p>
              <p className="text-green-800 mb-4">
                Many aspiring ministers rush toward what to do. Samuel shows us to start with whom we're hearing. As John Bevere emphasizes in The Awe of God, reverent fear of the Lord tunes our ears and cleanses our motives. The awe of God is not terror but trembling trust. You will hear God more clearly when you want His pleasure more than you want a platform.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">David's Anointing</h3>
              <p className="text-purple-800 mb-4">
                David's anointing offers another layer. He was overlooked by family and invisible to power brokers. Yet God saw what mattered—the heart (1 Samuel 16). Before David held a sword, he held a harp; before he sat on a throne, he watched sheep. The hidden years are not wasted years. They are God's leadership school. John Maxwell calls this the Law of the Process: leadership develops daily, not in a day.
              </p>
              <p className="text-purple-800 mb-4">
                If your call to youth ministry feels like a slow burn—faithfully leading a small group of four students, stacking chairs after service, learning to prepare a simple Bible study—remember David. Private victories come before public ones. The ceiling of your future ministry (Maxwell's Law of the Lid) will be raised as you let God shape your character now. The flock in your care—no matter how small—is the flock where you learn to shepherd hearts, not manage crowds.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">Timothy, Paul's Young Protégé</h3>
              <p className="text-red-800 mb-4">
                Timothy, Paul's young protégé, rounds out the picture. He had a godly heritage, spiritual gifts, and a mentor who believed in him. But Timothy also faced criticism because of his youth. Paul's counsel was not to demand respect but to live in such a way that respect would be the natural response (1 Timothy 4:12). "Set the believers an example," Paul urged, in speech, conduct, love, faith, and purity.
              </p>
              <p className="text-red-800 mb-4">
                That five-fold pattern is a roadmap for every emerging youth minister. Your words shape culture. Your actions build credibility. Your love earns permission (Maxwell's Five Levels of Leadership, Level 2: Permission). Your faith sustains you when fruit seems slow. Your purity protects the integrity of your influence. Paul also told Timothy to fan into flame the gift God had given him (2 Timothy 1:6–7). Gifts can grow cold without use. Calling isn't a certificate you frame; it's a fire you steward.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-orange-900 mb-4">What is a calling?</h3>
              <p className="text-orange-800 mb-4">
                Biblically, calling is God's initiative to bring you into His purpose. It includes identity (called to belong to Jesus), character (called to be holy), and assignment (called to a specific work among specific people). Your calling to youth ministry is an assignment within your larger calling to Christ. That ordering matters.
              </p>
              <p className="text-orange-800 mb-4">
                If you root your identity in your role, you'll ride the rollercoaster of attendance spikes and social media feedback. If you root your identity in being adopted by God and faithful to Him, your ministry will rest on a rock. John Bevere would say the fear of the Lord creates that rock. It purifies ambition and fuels obedience. You begin to ask different questions: "What honors God?" instead of "What grows my brand?" "What forms students in Christ?" instead of "What gets the biggest laugh?"
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Internal and External Confirmations</h3>
              <p className="text-blue-800 mb-4">
                Because calling comes from God, it has both internal and external confirmations. Internally, the Holy Spirit burdens your heart for students, awakens desire to serve, and highlights Scriptures that shape your sense of assignment (Romans 12; 1 Corinthians 12). Externally, the church recognizes and affirms what God is doing. This includes mentors who speak truth (like Eli did for Samuel), leaders who invite you to serve (like Paul did for Timothy), and observable fruit over time.
              </p>
              <p className="text-blue-800 mb-4">
                If you think you're called to teach, do students actually learn and respond when you teach? If you feel called to shepherd, do students open up to you, and do you follow through with care? Calling without community can drift into self-deception. Community without calling can drift into mere busyness. You need both.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">The Preaching Task</h3>
              <p className="text-green-800 mb-4">
                The preaching task sits at the center of youth ministry because students need to encounter God through His Word. Tony Evans emphasizes that preaching draws its authority from God's Word empowered by the Spirit, not from the preacher's personality. Youth ministry preaching must be clear enough for a ninth grader to grasp and deep enough to feed a senior who's already leading peers. It must be faithful to the text and focused on transformation.
              </p>
              <p className="text-green-800 mb-4">
                Remember, your message is not merely information transfer; it's an invitation to surrender to Jesus. Preaching with integrity starts in the secret place—with prayer, repentance, and the awe of God—and moves into the public place—with clarity, love, and urgency.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">Common Pitfalls</h3>
              <p className="text-red-800 mb-4">
                Common pitfalls stalk the called. One is confusing emotion with vocation. A moving conference moment may awaken you, but only time, fruit, and counsel can confirm you. Another is chasing a platform. Jesus invested in twelve, not in metrics. If you aim at being impressive, you will neglect being faithful. A third is isolation. Lone rangers are vulnerable to error and burnout. Youth ministry is a team sport: parents, volunteers, pastors, and peers all matter.
              </p>
              <p className="text-red-800 mb-4">
                Maxwell's Law of the Inner Circle applies here: your potential is determined by those closest to you. Choose mentors and teammates who love Jesus and love students.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">How to Discern and Respond to Calling</h3>
              <p className="text-purple-800 mb-4">
                So how do you discern and respond to calling? Start with listening. Set aside quiet space, put your phone away, and ask God what He's saying about the students in your community. Then test what you hear. Take a gifts inventory based on Romans 12 and 1 Corinthians 12; ask others where they see fruit in your life. Next, seek external confirmation. Schedule conversations with your pastor or youth leader. Be ready to receive both affirmation and direction for growth.
              </p>
              <p className="text-purple-800 mb-4">
                Finally, obey in small, concrete steps. Say yes to serving where you are. Prepare diligently even when you're teaching five students. Follow up with the freshman who's drifting. Faithfulness in little is the training ground for faithfulness in much.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Keeping Your Soul Anchored</h3>
              <p className="text-orange-800 mb-4">
                As you take those steps, keep your soul anchored. The awe of God keeps you honest. Daily Scripture keeps you grounded. Prayer keeps you connected. Journaling keeps you reflective. Fasting sharpens your hunger for God more than for success. Serving behind the scenes keeps you humble. And reading wise voices keeps you growing.
              </p>
              <p className="text-orange-800 mb-4">
                Consider pairing your Bible reading this week with selections from The Awe of God (for your posture), The 21 Irrefutable Laws of Leadership (for your process), The 5 Levels of Leadership (for your relationships), and The Power of Preaching (for your proclamation). Let them mentor you as you walk with the Lord and with His people.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Picture the Students</h3>
              <p className="text-blue-800 mb-4">
                Picture the students you hope to serve. Some are skeptical. Some are wounded. Some are hungry for truth. Some are bored. God sees them all. He is already at work in their lives, and He may be inviting you to join Him. That invitation is not to become a celebrity but to become a shepherd. It's a call to lay down your life—your preferences, your time, your ego—so that students can find life in Christ.
              </p>
              <p className="text-blue-800 mb-4">
                It's a call to carry God's Word in your mouth and God's heart in your chest. It's a call to endure, to rejoice, to pray, to laugh, to weep, and to wait on the Lord. It's a call worthy of your whole life.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-4 text-center">Take Courage</h3>
              <p className="text-green-800 text-center mb-4">
                If He calls you, He will equip you. If He equips you, He will place you. If He places you, He will sustain you. Your part is to respond as Samuel did: "Speak, Lord; Your servant is listening." Then, like David, be faithful in hidden places. Like Timothy, guard your life and doctrine closely. And like Paul, learn to labor with God's energy, which powerfully works within you.
              </p>
              <p className="text-green-800 text-center font-bold">
                The journey begins here, with awe, humility, and a willing yes.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-orange-900 mb-4 text-center">Weekly Challenge (Week 1: The Calling)</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 1: Listening Retreat (60 minutes)</p>
                  <p className="text-orange-800">Read 1 Samuel 3 and 1 Timothy 4:6–16. In silence, ask: "Lord, what are You saying to me about youth?" Journal impressions and Scriptures that come to mind.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 2: Gifts and Fruit Inventory</p>
                  <p className="text-orange-800">Review Romans 12:4–8 and 1 Corinthians 12. List 3–5 gifts you may have and 2–3 places you've seen fruit with students. Ask one trusted friend to add their observations.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 3: Mentor Conversations</p>
                  <p className="text-orange-800">Meet with your pastor/youth leader and one mature believer. Ask: "Do you see a ministry call in me? Where should I stretch? What's one assignment I can take on now?"</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 4: Serve Small</p>
                  <p className="text-orange-800">Volunteer in a youth ministry task this week (lead prayer, co-lead a small group, follow up with a new student, organize a service project). Note what energized you, what challenged you, and how students responded.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 5: Calling Statement</p>
                  <p className="text-orange-800">Write 3–4 sentences summarizing your sense of calling, your primary audience (which students), and your next faithful step in the next 30 days. Share it with your mentor for feedback.</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Deliverables to bring into Week 2</h3>
              <ul className="list-disc list-inside text-purple-800 space-y-2">
                <li>Written calling statement.</li>
                <li>Notes from both mentor conversations.</li>
                <li>One clear next step you will take in the next 30 days.</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">Next Week Preview (Week 2: Requirements)</h3>
              <p className="text-green-800 mb-4">
                Calling is the "why." Requirements are the "who you must become" and "what you must learn." In Week 2, we will explore biblical character qualifications, spiritual disciplines, relational competencies, and practical skills required for youth ministry.
              </p>
              <p className="text-green-800">
                Drawing from 1 Timothy and Titus, insights from John Maxwell on personal growth and credibility, John Bevere on holiness and the fear of the Lord, and Tony Evans on handling God's Word, you will craft a personal development plan to steward your calling with integrity.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-900 mb-4">CHAPTER 2: REQUIREMENTS</h1>
            <p className="text-lg leading-relaxed mb-6">
              Calling answers why you are drawn to serve students. Requirements answer who you must become and what you must learn to serve them well. If calling is a seed, requirements are the soil and the gardener's care—the conditions under which that seed can grow into a sturdy, fruitful tree. In youth ministry, your presence will often speak louder than your programs. Your character will preach before your sermon starts. Your spiritual life will overflow into the room, for good or for ill. This chapter clarifies the inner life and core competencies that form a trustworthy youth minister.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-orange-900 mb-4">1) Character before competency</h3>
              <p className="text-orange-800 mb-4">
                The first requirement of spiritual leadership is a life that is "above reproach." Scripture paints a profile of sober-minded, faithful, self-controlled leaders whose homes, habits, and reputations align with their message (see 1 Timothy 3:1–7; Titus 1:5–9). That doesn't mean perfection; it means integrity—wholeness—so that who you are in private and who you are in public are the same person. "Guard your heart above all else, for it determines the course of your life" (Proverbs 4:23). You cannot shepherd students toward holiness if you are casual with your own. Purity, honesty, gentleness, and faithfulness are not electives; they are prerequisites.
              </p>
              <p className="text-orange-800 mb-4">Character shows up in the small choices:</p>
              <ul className="list-disc list-inside text-orange-800 space-y-2">
                <li>Truth-telling when it costs you.</li>
                <li>Keeping confidences without hiding harm.</li>
                <li>Owning mistakes without excuse-making.</li>
                <li>Treating stress with prayer and rest rather than with secret escapes.</li>
                <li>Handling money with transparency and generosity.</li>
              </ul>
              <p className="text-orange-800 mt-4">
                John Bevere reminds us that the fear of the Lord is the beginning of wisdom. Awe purifies ambition and keeps us from playing games with sin. When you tremble at God's Word, you stop looking for loopholes and start looking for likeness to Christ. Confession and repentance are not punishments; they are the pathway back to joy and power. "Confess your sins to each other and pray for each other so that you may be healed" (James 5:16).
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">2) Spiritual vitality: live what you invite students into</h3>
              <p className="text-blue-800 mb-4">
                The most essential ministry strategy is abiding in Christ. "Apart from me you can do nothing," Jesus says (John 15:5). Youth ministry requires energy, creativity, and patience, but none of these can substitute for a living connection with the Vine. Build an honest, sustainable rule of life—habits that keep you near Jesus:
              </p>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
                <li>Scripture: not only for teaching prep, but for feeding your soul. "Work hard so you can present yourself to God... one who correctly explains the word of truth" (2 Timothy 2:15).</li>
                <li>Prayer: adoration, confession, thanksgiving, and intercession. Keep a list of students and leaders and pray names, not just numbers.</li>
                <li>Sabbath and rest: receive God's gift of limits. "Come to me... and I will give you rest" (Matthew 11:28–29).</li>
                <li>Fasting: let hunger for God reorder lesser hungers.</li>
                <li>Community: spiritual friends and mentors who ask you real questions.</li>
              </ul>
              <p className="text-blue-800 mt-4">
                Bevere's emphasis on holy reverence will guard your devotional life from becoming a ritual devoid of relationship. Reverence births obedience; obedience keeps the channel of fellowship clear.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">3) Relational credibility: trust is your first platform</h3>
              <p className="text-green-800 mb-4">
                Students follow leaders they trust. John Maxwell's Five Levels of Leadership highlight that early influence rests at Level 2—Permission—where people follow because they want to, not because they have to. You earn that permission through consistent presence, empathy, and reliability. Learn names. Show up at games and performances. Ask questions and listen. Celebrate small wins. Keep your word, even about small things. Trust is slow to build and quick to lose.
              </p>
              <p className="text-green-800 mb-4">
                Relational credibility extends to parents and volunteers. Communicate calendar plans early. Respond to messages in a timely, respectful way. Align with your senior leadership and keep them in the loop. Honor parents' role as primary disciple-makers by partnering, not competing—equip them with conversation guides after big teaching series, and invite their feedback.
              </p>
              <p className="text-green-800 mb-4">
                Boundaries protect trust. Keep conversations with students observable and interruptible. Use the "two-adult rule" for meetings and transportation. Maintain appropriate physical and digital boundaries. Document pastoral care notes securely. These are not signs of suspicion; they are acts of wisdom that protect students, you, and the church.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">4) Biblical and preaching competence: truth with clarity and grace</h3>
              <p className="text-purple-800 mb-4">
                Youth workers handle Scripture in a way that is both faithful and accessible. Tony Evans emphasizes that our authority comes from God's Word empowered by the Spirit, not from our personalities. Aim for messages that are:
              </p>
              <ul className="list-disc list-inside text-purple-800 space-y-2">
                <li>Text-driven: the main point of the passage becomes the main point of the message.</li>
                <li>Christ-centered: lead students to Jesus, not just to moral advice.</li>
                <li>Clear and concrete: one big idea, a few memorable handles, and specific next steps.</li>
                <li>Pastoral: speak to real questions students face (identity, anxiety, temptation, friendship, technology) with biblical wisdom and compassion.</li>
              </ul>
              <p className="text-purple-800 mt-4">
                A simple pattern helps: Pray the text, explain the text, illustrate the text, apply the text. Let Scripture interpret students' lives, not the other way around. Shepherd, don't show off. "Preach the word of God. Be prepared, whether the time is favorable or not. Patiently correct, rebuke, and encourage" (2 Timothy 4:2).
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">5) Leadership and management: lift the lid</h3>
              <p className="text-red-800 mb-4">
                Maxwell's Law of the Lid says your leadership capacity sets the ceiling of your ministry's impact. Youth ministry requires planning, prioritizing, and people development:
              </p>
              <ul className="list-disc list-inside text-red-800 space-y-2">
                <li>Vision and priorities: define the win—disciples who know Jesus, belong to His people, and join His mission. Program your calendar to those outcomes, not to busyness.</li>
                <li>Systems: a simple follow-up pipeline for new students; a plan for small group placement; a clear pathway from first-time visitor to serving student.</li>
                <li>Teams: recruit, train, and empower volunteers. "Two people are better off than one" (Ecclesiastes 4:9–10). Build an inner circle that shares your values and complements your weaknesses.</li>
                <li>Communication: clear, multi-channel messaging to students, parents, and leaders. Over-communicate long before events.</li>
                <li>Stewardship: budget with integrity. Spend on disciple-making priorities. Track attendance and care contacts, not just for metrics but for shepherding.</li>
              </ul>
              <p className="text-red-800 mt-4">
                The Law of Priorities reminds you that activity is not accomplishment. Do the first things first: prayer, people, preparation. The Law of the Inner Circle reminds you that those closest to you determine much of your potential—choose wisely.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-orange-900 mb-4 text-center">Weekly Challenge (Week 2: Requirements)</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 1: Character and integrity audit</p>
                  <p className="text-orange-800">In prayer, review 1 Timothy 3:1–7 and Titus 1:5–9. Journal honest reflections on where your life aligns and where it needs strengthening. Share one growth area with a mentor and ask for specific accountability for the next 30 days.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 2: Rule of life</p>
                  <p className="text-orange-800">Draft a simple weekly rhythm for Scripture, prayer, Sabbath, community, exercise, and rest. Block it on your calendar. Share it with a friend who will check in weekly for a month.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 3: Safety and ethics plan</p>
                  <p className="text-orange-800">Write a one-page safety plan that includes the two-adult rule, communication guidelines, transportation procedures, reporting protocol, and social media boundaries. Review it with your pastor.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 4: Leadership lab</p>
                  <p className="text-orange-800">Identify two potential volunteer leaders. Schedule brief conversations to hear their stories, share vision, and invite them into specific roles. Draft a simple role description and a 60-day onboarding plan.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 5: Preaching practicum</p>
                  <p className="text-orange-800">Choose a short passage. Craft one big idea, two supporting points, and one clear next step for students. Write a 600–800 word manuscript or detailed outline. Deliver an 8–10 minute talk to a trusted adult and ask for feedback on clarity, faithfulness, and relevance.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-900 mb-4">CHAPTER 3: RESPONSIBILITIES</h1>
            <p className="text-lg leading-relaxed mb-6">
              If calling is the "why" and requirements are the "who," responsibilities are the "what" and "how" of youth ministry. This is where vision touches the calendar, where sermons become shepherding, and where systems become service. Think of your ministry as a table. Four sturdy legs hold it steady: the Word and prayer, people, teams, and wise planning. If any leg weakens, the table wobbles. Your charge is not to juggle a hundred tasks but to keep those legs strong so students can feast on the life of Jesus.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              A faithful week is not glamorous. It's unhurried time with God (Acts 6:4), attentive time with students (1 Thessalonians 2:8), careful crafting of God's Word so students can hear and obey (2 Timothy 4:2), and thoughtful leadership that equips others to do the work of ministry (Ephesians 4:12). John Maxwell calls this the Law of Priorities: activity is not accomplishment. Tony Evans reminds us that preaching carries weight because it carries the Word, not because it carries our personality. John Bevere urges us to minister with holy awe, which keeps the work from becoming a performance.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-orange-900 mb-4">1) Preaching and teaching: truth that aims at transformation</h3>
              <p className="text-orange-800 mb-4">
                Preaching to students requires both reverence and relevance. Your goal is not to say everything, but to say the right thing clearly, faithfully, and pastorally. A simple weekly rhythm helps:
              </p>
              <ul className="list-disc list-inside text-orange-800 space-y-2">
                <li>Pray first. Before you study the text, let the text study you. Ask what God wants to form in students through this passage. "Let the message about Christ... fill your lives" (Colossians 3:16).</li>
                <li>Find the big idea. What is this text saying? Aim for one clear sentence that a ninth grader can repeat.</li>
                <li>Build toward response. Ask, "If this is true, what should students believe differently? Feel differently? Do differently?" Preach Christ, not merely advice (Colossians 1:28–29).</li>
              </ul>
              <p className="text-orange-800 mt-4">
                Tony Evans emphasizes clarity with conviction. Explain the text, illustrate with stories from student life, and call for a faith-filled step—prayer, confession, reconciliation, mission. Keep your tone warm, your words simple, and your applications specific.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">2) Small groups and a discipleship pathway</h3>
              <p className="text-blue-800 mb-4">
                Students grow best in circles, not just in rows. A small group is the place where teaching becomes transformation—where someone knows your name, your questions, and your week. Build a simple, consistent pathway:
              </p>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
                <li>Groups anchored to Scripture and real life. Use questions that help students observe, interpret, and apply God's Word. Invite honest stories and guide toward hope.</li>
                <li>Trained leaders. Recruit faithful adults who love Jesus and teenagers. Equip them to listen well, ask wise questions, and follow up during the week (2 Timothy 2:2).</li>
                <li>Clear expectations. Provide a short leader guide with the big idea, three to five discussion questions, and two concrete follow-ups: one spiritual (e.g., a reading plan) and one relational (e.g., check-in midweek).</li>
                <li>Relational safety. Keep groups predictable, on time, and trustworthy. Leaders should protect confidentiality while understanding when to report safety concerns.</li>
              </ul>
              <p className="text-blue-800 mt-4">
                Measure what matters. Don't obsess over group size; track engagement, spiritual conversations, Scripture intake, prayer, and acts of service.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">3) Pastoral care and follow-up</h3>
              <p className="text-green-800 mb-4">
                Shepherds know the state of their flock (Proverbs 27:23). Create simple systems that help love stay organized:
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>New student follow-up. Within 48 hours, send a welcoming text, a parent email, and an invite to next week. Thank them for coming by name. Offer to answer questions.</li>
                <li>Response follow-up. When students respond to a message—salvation, renewed commitment, confession—follow up personally within a few days. Help them take a next step: baptism class, a Bible reading plan, joining a small group, or meeting with a leader.</li>
                <li>Crisis care. Listen first, pray sincerely, and involve parents and pastors appropriately. Know when to refer to professional counselors. Have a clear reporting protocol for any safety concerns (Galatians 6:2; James 1:19).</li>
                <li>Prayer. Keep a running prayer list. Text students short Scripture-rooted prayers midweek. Few things communicate care like remembering.</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">4) Partnering with parents and the wider church</h3>
              <p className="text-purple-800 mb-4">
                Parents are the primary disciple-makers. Your role is to partner, not replace. Build trust by communicating early and often:
              </p>
              <ul className="list-disc list-inside text-purple-800 space-y-2">
                <li>Monthly parent update. Share the teaching plan, key dates, and a simple conversation guide so faith continues at home (Deuteronomy 6:6–7).</li>
                <li>Open doors. Invite parents to observe, serve, or attend special nights. Seek feedback with humility.</li>
                <li>Bridge to the church. Encourage students to worship, serve, and belong in the life of the whole church, not only in the youth room (1 Peter 5:2; Acts 2:42–47).</li>
              </ul>
              <p className="text-purple-800 mt-4">
                Alignment matters. Sync your calendar and series with church leadership. Invite your senior pastor to speak occasionally. Let students see themselves as part of a larger family.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">5) Volunteer development: from doer to developer</h3>
              <p className="text-red-800 mb-4">
                If you do all the ministry, your impact will always be limited. If you develop people, your ministry multiplies. Maxwell's Five Levels of Leadership call you to move from Position to Permission to Production, but the long-term fruit comes at Level 4: People Development. Build a simple pipeline:
              </p>
              <ul className="list-disc list-inside text-red-800 space-y-2">
                <li>Recruit with vision and clarity. Explain why their presence matters and what the role actually involves.</li>
                <li>Onboard with care. Background checks, clear expectations, and a warm welcome go a long way.</li>
                <li>Train consistently. Short, regular huddles beat occasional marathons. Teach one skill at a time: how to lead prayer, how to follow up, how to handle tough questions.</li>
                <li>Coach and celebrate. Give specific feedback after nights. Share stories of life change and say thank you often.</li>
              </ul>
              <p className="text-red-800 mt-4">
                Aim to delegate real responsibility, not just tasks. Let leaders own a small group, a prayer team, a welcome process, or an outreach project. "Equip God's people to do his work and build up the church" (Ephesians 4:12).
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-orange-900 mb-4 text-center">Weekly Challenge (Week 3: Responsibilities)</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 1: Map your ministry week</p>
                  <p className="text-orange-800">Sketch a weekly schedule that protects sermon prep, people time, team time, admin, and rest. Choose three non-negotiables you'll keep for the next 30 days.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 2: Preaching sprint</p>
                  <p className="text-orange-800">Choose an upcoming passage. Write one clear big idea, three student-centered applications, and one response step. Share it with a mentor for feedback on clarity and faithfulness.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 3: Small group health check</p>
                  <p className="text-orange-800">List each current small group and its leader. For five students, note one spiritual next step and one relational follow-up this week. Send those notes to leaders and check back in seven days.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 4: Follow-up flow</p>
                  <p className="text-orange-800">Build a 48-hour follow-up workflow for new students and for salvation/response cards. Draft two text templates and one parent email. Test them with a trusted leader for tone.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 5: Parent and volunteer touchpoints</p>
                  <p className="text-orange-800">Draft next month's parent update with a short conversation guide. Create a 30-minute mini-training for leaders (topic: leading great discussions). Put both on the calendar and send invites.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-900 mb-4">CHAPTER 4: ACCOUNTABILITY</h1>
            <p className="text-lg leading-relaxed mb-6">
              Accountability is not a cage; it is a greenhouse. It creates the conditions where truth, trust, and healthy growth can flourish. For a youth minister, accountability is love organized—guardrails that protect students, volunteers, the church, and your own soul. If calling gives you a direction and requirements give you a standard, accountability keeps you on the road when the weather changes and the terrain gets rough. It names reality so you can repent quickly, adjust wisely, and lead faithfully.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              At its core, accountability is about stewardship. God entrusts you with His Word, His people, and your own gifts. "Now, a person who is put in charge as a manager must be faithful" (1 Corinthians 4:2). Faithfulness requires visibility: others can see your work, ask questions, and help you stay aligned to Christ. Youth ministry thrives when leaders gladly live in the light.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-orange-900 mb-4">1) Accountability to God: serving before an audience of One</h3>
              <p className="text-orange-800 mb-4">
                All other accountability is downstream from this. Ministry begins in the secret place, where you live in reverent awe before God. As John Bevere teaches, the fear of the Lord purifies motives and anchors obedience. When you tremble at God's Word, you stop performing for applause and start stewarding a trust. A few daily and weekly practices keep this foundation strong:
              </p>
              <ul className="list-disc list-inside text-orange-800 space-y-2">
                <li>Daily surrender: "Search me, O God, and know my heart... Point out anything in me that offends you" (Psalm 139:23–24). Invite God to correct you before anyone else has to.</li>
                <li>Confession and repentance: keep short accounts with God. Confession is not self-loathing; it is agreeing with God so you can walk clean again (1 John 1:9).</li>
                <li>Sabbath and limits: receiving rest is an act of faith. It says, "God runs this ministry, not me."</li>
                <li>Spiritual friendship: one or two seasoned believers who know your story, ask about your soul, and have permission to challenge you.</li>
              </ul>
              <p className="text-orange-800 mt-4">
                This Godward accountability keeps you from attempting public work on an empty tank. It turns duty into devotion and performance into worship.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">2) Accountability to the Word: letting the text master the preacher</h3>
              <p className="text-blue-800 mb-4">
                Youth ministers carry Scripture into the lives of students. Tony Evans reminds us that the preacher stands under the text, not over it. That means you invite the Word to set your agenda and your tone. Build a simple system that keeps your teaching aligned:
              </p>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
                <li>A sermon prep checklist. Before you write, read the passage in context. Ask, "What did it mean then? What does it mean now? How does Christ fulfill this?" Pray the text into your own life first (2 Timothy 2:15).</li>
                <li>Peer review. Share your big idea and outline with a trusted leader midweek. Ask for feedback on clarity, faithfulness, and applications to students' real questions (James 3:1).</li>
                <li>Source integrity. Never copy someone else's work as your own. Quote fairly. Give credit. It's not just ethics; it's humility.</li>
                <li>Doctrinal alignment. Stay inside your church's statement of faith. When you tackle tough topics, invite your pastor to preview your approach.</li>
              </ul>
              <p className="text-blue-800 mt-4">
                You are accountable for both your content and your spirit—truth with grace, conviction with compassion (Ephesians 4:15). Guard your life and doctrine closely (1 Timothy 4:16).
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">3) Accountability with people: the gift of honest mirrors</h3>
              <p className="text-green-800 mb-4">
                John Maxwell's Law of the Inner Circle teaches that those closest to you shape your capacity. Choose an inner circle that will tell you the truth in love. Build feedback into your team on purpose:
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Clear roles and expectations. Vague roles sabotage accountability. Write simple role descriptions for staff and volunteers. Clarity is kindness.</li>
                <li>Regular 1:1s. Meet with key leaders for 30 minutes every other week. Celebrate wins, review goals, address barriers, and ask, "What am I missing? How can I serve you better?"</li>
                <li>360 feedback moments. Twice a year, ask your pastor, peers, and volunteers three questions: What should I stop, start, continue? Summarize and share one change you'll make.</li>
                <li>Safe conflict. Jesus gives a pathway for conflict: go directly first, then involve others if needed (Matthew 18:15–16). Make it normal to address issues promptly and respectfully.</li>
              </ul>
              <p className="text-green-800 mt-4">
                Accountability is mutual. You call your team to standards and invite them to hold you to them. That shared humility creates a culture where growth is expected and failure is a teacher.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">4) Ethical, financial, and safety guardrails: trust you can see</h3>
              <p className="text-purple-800 mb-4">
                Trust is not a feeling; it is a set of agreements you keep. Write them down and live them out:
              </p>
              <ul className="list-disc list-inside text-purple-800 space-y-2">
                <li>Money: use approved systems for purchases, reimbursements, and counting offerings. Two unrelated people count cash. Keep receipts. Review budgets monthly. "Whoever can be trusted with very little can also be trusted with much" (Luke 16:10).</li>
                <li>Safety: two-adult rule, room visibility, approved transportation, background checks, and incident reporting. Communicate these clearly to parents and leaders so they know what to expect.</li>
                <li>Digital boundaries: use official channels for communication. Keep messages group-based when possible. If a private conversation is needed, copy a second leader or parent. No disappearing messages. Keep communication time-bound and content-appropriate.</li>
                <li>Counseling and care: you are a pastor, not a therapist. Listen, pray, and refer when needed. Document serious care conversations briefly and securely.</li>
              </ul>
              <p className="text-purple-800 mt-4">
                These guardrails free you to love boldly without crossing lines. They protect students, volunteers, and you.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-orange-900 mb-4 text-center">Weekly Challenge (Week 4: Accountability)</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 1: Accountability map</p>
                  <p className="text-orange-800">Draw your current accountability web: to God, to your pastor, to your team, to parents, to policies. Note strengths and gaps. Choose two gaps to close this month and schedule the first step.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 2: Leader covenant</p>
                  <p className="text-orange-800">Draft a one-page covenant for volunteers (character, communication, safety, discipleship expectations). Review it with your pastor and two trusted leaders. Plan a 15-minute walkthrough for your next team huddle.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 3: Safety and finance audit</p>
                  <p className="text-orange-800">Using your church's policies, review background checks, two-adult practices, check-in, transportation, medical forms, cash handling, and reimbursements. List three improvements and assign owners and due dates.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 4: Sermon review loop</p>
                  <p className="text-orange-800">Create a sermon prep checklist and recruit one peer reviewer. Put a 20-minute review slot on your calendar two days before youth night for the next four weeks.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 5: Feedback rhythms</p>
                  <p className="text-orange-800">Schedule six weeks of 1:1s (30 minutes) with key leaders. Prepare three questions: What's going well? What's hard? What should I adjust? Share one change you'll make based on their input.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-900 mb-4">CHAPTER 5: MAKING NEW DISCIPLES</h1>
            <p className="text-lg leading-relaxed mb-6">
              When Jesus called fishermen, He didn't say, "Come, attend my events." He said, "Come, follow me, and I will show you how to fish for people." That is the heart of youth ministry: not merely gathering students, but forming followers who make more followers. Discipleship isn't a side project; it's the mission. The question is not only, "How many came?" but "Who is coming to Christ, being baptized, growing in His Word, and helping others do the same?"
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Making new disciples begins with a clear gospel, continues with simple next steps, and multiplies through a culture of invitation and empowerment. It is fueled by the Holy Spirit, clarified by faithful preaching, protected by wise systems, and modeled by leaders whose lives say, "Follow me as I follow Christ."
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-orange-900 mb-4">1) Clarify the gospel and the response</h3>
              <p className="text-orange-800 mb-4">
                Students hear competing "good news" every day: self-creation, achievement, acceptance through performance. The gospel is startlingly different: God created us for Himself; we have sinned and cannot save ourselves; Jesus lived perfectly, died sacrificially, and rose victoriously; through repentance and faith in Him we are forgiven, made new, and brought into God's family. The response is not "try harder" but "trust Jesus" and follow Him as Lord.
              </p>
              <p className="text-orange-800 mb-4">
                Keep the gospel central and simple. Avoid moralism ("Be better!") and vague inspiration ("You got this!"). Call students to turn from sin and trust in Jesus. When you invite a response, be clear and kind. Offer two pathways in the moment: a prayer of surrender and a concrete next step (talk to a leader, mark a card, join a baptism class). Tony Evans reminds us that our authority rests in God's Word and the Spirit's work, not our personality. Make the cross and resurrection the center. Speak plainly. Trust God to do what only He can do.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">2) Build a simple pathway: from guest to disciple-maker</h3>
              <p className="text-blue-800 mb-4">
                Crowds don't become disciples by accident. A clear pathway helps you shepherd students from first visit to fruitful service. Consider this framework:
              </p>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
                <li>First 48 hours: Connect - Send a personal text to the student and a brief, warm email to the parent. Thank them by name. Share the next gathering and how to get into a small group. An early human touch beats a generic mass message.</li>
                <li>First four weeks: Belong - Prioritize consistent small group attendance. Introduce two peers and one trusted adult leader. Give a simple "start here" guide: a readable gospel (like Mark), a basic prayer model, and a brief overview of your ministry rhythms.</li>
                <li>First semester: Believe and become - Offer a four-week basics track: Who Jesus Is, The Gospel, How to Read the Bible, Prayer and Community. Share the gospel clearly in week two and invite decisions. Include a parents' note each week so home conversations continue.</li>
                <li>First year: Build others - Help students discover gifts and join a serving team (greeting, tech, worship, kids, outreach). Train them to share their testimony. Invite them to pray for three friends, invest in those friendships, and invite them to group or a gathering.</li>
              </ul>
              <p className="text-blue-800 mt-4">
                Publish your pathway in one page for parents, leaders, and students. Simplicity wins. If it's too complex to explain, it's too complex to scale.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">3) Create a culture of invitation, not just a program of events</h3>
              <p className="text-green-800 mb-4">
                Programs ebb and flow. Culture endures. An invite culture grows when:
              </p>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Leaders model it. Your team regularly names friends they are praying for and shares invitation stories (including the awkward ones). Maxwell's Law of the Picture applies: people do what people see.</li>
                <li>You lower barriers. Keep gatherings welcoming, predictable, and warm. Make the first five minutes of every night the easiest five minutes for a new student: clear signage, friendly faces, music that feels alive, and a host who explains what's happening.</li>
                <li>You teach a simple pattern. Pray for three friends by name. Invest in them weekly. Invite them to a next step. Include them once they show up. Celebrate every invite, not just the successful ones.</li>
              </ul>
              <p className="text-green-800 mt-4">
                Normalize everyday mission. Instead of aiming for one mega-event, cultivate hundreds of small moments where students carry Jesus into hallways, group chats, lunch tables, and teams.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">4) Preaching that invites and equips</h3>
              <p className="text-purple-800 mb-4">
                Evangelistic clarity belongs in the weekly rhythm, not only in special services. Tony Evans urges us to preach the text with clarity and conviction, then call for a response. Each series should include:
              </p>
              <ul className="list-disc list-inside text-purple-800 space-y-2">
                <li>A clear explanation of the gospel and why it matters in the topic at hand (identity, anxiety, relationships).</li>
                <li>A moment to respond: raise a hand, come forward, or indicate on a card—then quickly connect each student with a leader.</li>
                <li>A discipleship nudge: "Here's your next step this week"—a reading plan, a prayer challenge, a conversation with a parent, a serving opportunity.</li>
              </ul>
              <p className="text-purple-800 mt-4">
                Train your leaders to recognize and follow up in the moment. Create a simple response card or digital form that gathers name, contact, decision/interest, and preferred next step. Follow up within 48 hours with warmth and clarity.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">5) Equip students to share their story and the gospel</h3>
              <p className="text-red-800 mb-4">
                Many students want to share but feel unprepared. Lower the complexity:
              </p>
              <ul className="list-disc list-inside text-red-800 space-y-2">
                <li>The 3-minute testimony: Before Jesus, how I met Jesus, life with Jesus. Practice in small group. Give feedback. Celebrate the courage.</li>
                <li>The 3 circles or bridge: One simple tool for explaining the gospel with a pen and paper. Practice until it's muscle memory.</li>
                <li>Answering why: Help students articulate why they follow Jesus in one sentence. Encourage them to pair their "why" with an invite: "Want to come with me Wednesday and talk more?"</li>
              </ul>
              <p className="text-red-800 mt-4">
                Maxwell's People Development (Level 4) is your goal: don't stop at students attending; train them to lead others to Jesus. When you equip students to witness, you're raising the lid on your ministry's impact far beyond your program hours.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-orange-900 mb-4 text-center">Weekly Challenge (Week 5: Making New Disciples)</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 1: Prayer map</p>
                  <p className="text-orange-800">Write the names of three students you're praying will meet Jesus. Pray for them daily this week. Send one encouraging, no-pressure message to each.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 2: Your story in three minutes</p>
                  <p className="text-orange-800">Draft your testimony (before/Jesus/after). Practice it aloud twice. Share it with a leader or friend for feedback on clarity and compassion.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 3: Gospel tool</p>
                  <p className="text-orange-800">Learn one simple gospel outline (e.g., a three-step tool). Share it once with a Christian friend to practice. Then ask God for an opportunity to share a piece of it with a seeking friend.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 4: Pathway draft</p>
                  <p className="text-orange-800">Sketch your guest-to-disciple pathway on one page (48 hours, four weeks, first semester, first year). Share it with your pastor for refinement.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-900 mb-2">Day 5: Student multipliers</p>
                  <p className="text-orange-800">Identify two students who could become evangelistic leaders. Invite each to coffee. Share vision, ask about their friends, and give them one simple goal for the next two weeks.</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Chapter not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={() => setLocation("/course/8")}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </div>

        {/* Audio Player */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-orange-600 to-red-600 border-none shadow-2xl">
            <CardContent className="p-4 sm:p-6">
              {/* Cover and Title */}
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src="/sfgm-youth-ministry-cover.png" 
                  alt="Youth Ministry Course" 
                  className="w-20 h-auto rounded shadow-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
                    <span className="text-2xl sm:text-3xl align-text-top mr-1">👥</span>
                    <span className="align-middle">Youth Ministry Course</span>
                  </h3>
                  <p className="text-white/90 text-base sm:text-xl font-semibold">
                    <span className="align-middle">{currentChapterData.title}</span>
                  </p>
                </div>
              </div>

              {/* Chapter Selector */}
              <div className="mb-4">
                <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
                  <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chapters.map((ch) => (
                      <SelectItem key={ch.id} value={ch.id.toString()}>
                        {ch.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Playback Controls */}
              <div className="space-y-3">
                {/* Main Controls */}
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={() => handleSkip(-15)}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <SkipBack className="h-4 w-4 mr-1" />
                    15s
                  </Button>
                  <Button
                    onClick={handlePlayPause}
                    size="lg"
                    className="h-14 w-14 rounded-full bg-white text-orange-600 hover:bg-white/90 shadow-lg"
                  >
                    {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
                  </Button>
                  <Button
                    onClick={() => handleSkip(15)}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    15s
                    <SkipForward className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
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
                  <div className="flex justify-between text-xs sm:text-sm text-white/80">
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
                    className="w-24 sm:w-32"
                  />
                </div>
              </div>

              <audio
                ref={audioRef}
                src={currentChapterData.audioUrl}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <Card className="bg-white shadow-xl">
          <CardContent className="p-6 sm:p-8 prose max-w-none">
            {getChapterContent(currentChapter)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}