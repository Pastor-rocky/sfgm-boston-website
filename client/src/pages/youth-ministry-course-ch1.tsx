import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft } from "lucide-react";

export default function YouthMinistryCourseCh1() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min((audioRef.current.currentTime || 0) + seconds, duration));
  };

  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const setLocation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => setLocation('/course/8')}
            variant="ghost"
            className="text-white hover:text-orange-400 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>
        </div>
        <Card className="mb-8 bg-gradient-to-r from-orange-600 to-red-600">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <img src="/sfgm-youth-ministry-cover.png" alt="Youth Ministry Course Cover" className="w-24 h-auto rounded shadow-lg" />
              <div>
                <h3 className="text-white text-2xl font-bold">Youth Ministry Course</h3>
                <p className="text-white/90 text-xl">Chapter 1: The Calling</p>
              </div>
            </div>

            <Slider
              value={[currentTime]}
              max={duration || 0}
              step={1}
              onValueChange={([v]) => { if (audioRef.current) audioRef.current.currentTime = v; }}
              className="mb-2"
            />
            <div className="flex justify-between text-white/70 text-sm mb-4">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <Button onClick={() => skip(-15)} size="sm" variant="ghost" className="text-white">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button onClick={togglePlayPause} size="lg" className="bg-white text-orange-600 rounded-full h-14 w-14">
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button onClick={() => skip(15)} size="sm" variant="ghost" className="text-white">
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <Volume2 className="h-4 w-4 text-white" />
              <Slider
                value={[volume]}
                max={1}
                step={0.01}
                onValueChange={([v]) => {
                  setVolume(v);
                  if (audioRef.current) audioRef.current.volume = v;
                }}
                className="w-24"
              />
            </div>

            <audio
              ref={audioRef}
              src="/uploads/textbook-audio/youth-ministry-ch1.mp3"
              onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
              onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-6 text-blue-900">Introduction</h2>
              
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Why this book exists</h3>
                <p className="text-blue-800">
                  Youth ministry is holy ground. It's where God's Word meets real teenage lives, where calling turns into service, and where future disciples and leaders are formed. This course was written to help you grow into a trustworthy, Spirit-dependent youth minister who loves students, honors parents, serves your church, and makes new disciples. It blends biblical foundations with practical tools—anchored in Scripture, shaped by the awe of God (John Bevere), guided by wise leadership principles from (John Maxwell), and committed to text-driven, Spirit-empowered preaching from the principles of the book the power preaching by Dr Tony Evans.
                </p>
                <p className="text-blue-800 mt-3">
                  This course helps you to get involved in reading more books outside of the Bible that will help you in your spirituality leadership and preaching ability.
                </p>
              </div>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">Required reading for this course</h3>
                <ul className="list-disc list-inside space-y-2 text-orange-800">
                  <li><strong>The Awe of God</strong> - John Bevere</li>
                  <li><strong>The five levels of leadership</strong> - John Maxwell</li>
                  <li><strong>The 21 irrefutable laws of the leadership</strong> - John Maxwell</li>
                  <li><strong>The power of preaching</strong> - Tony Evans</li>
                </ul>
                <p className="mt-3 text-orange-900">
                  Additionally, we would like all students of this course to take the SFGM Studying for Service course prior to taking this course or after you have finished it.
                </p>
              </div>

              <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-green-900 mb-4">Why this course exists</h3>
                <ul className="list-disc list-inside space-y-2 text-green-800">
                  <li>To help you love Jesus, love students, and make new disciples—simply and faithfully.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-green-900 mb-4 mt-6">What this course does</h3>
                <ul className="list-disc list-inside space-y-2 text-green-800">
                  <li>Gives you one clear focus each week.</li>
                  <li>Turns big ideas into small steps you can actually do.</li>
                  <li>Keeps you aligned with Scripture, your church, and safe ministry practices.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-green-900 mb-4 mt-6">Who it's for</h3>
                <ul className="list-disc list-inside space-y-2 text-green-800">
                  <li>Anyone sensing a call to youth ministry or serving students now.</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">How to Use This Course</h3>
                <p className="text-purple-800 mb-4">Each week, do these four things:</p>
                <ol className="list-decimal list-inside text-purple-800 space-y-2">
                  <li><strong>Read:</strong> Take 15–20 minutes to read the chapter.</li>
                  <li><strong>Do:</strong> Complete the 5 short "Weekly Challenges" (10–20 minutes each).</li>
                  <li><strong>Meet:</strong> Share your progress with a mentor or leader (15–30 minutes).</li>
                  <li><strong>Apply:</strong> Try one small thing in real ministry that week.</li>
                </ol>
                
                <h4 className="text-lg font-bold text-purple-900 mb-2 mt-4">What you need</h4>
                <ul className="list-disc list-inside text-purple-800 space-y-1">
                  <li>A Bible, a notebook, and one mentor/leader for feedback.</li>
                </ul>
                
                <h4 className="text-lg font-bold text-purple-900 mb-2 mt-4">Time guide (per week)</h4>
                <ul className="list-disc list-inside text-purple-800 space-y-1">
                  <li>About 1–3 hours total, spread across the week.</li>
                </ul>
                
                <h4 className="text-lg font-bold text-purple-900 mb-2 mt-4">Keep it simple</h4>
                <ul className="list-disc list-inside text-purple-800 space-y-1">
                  <li>Pick one habit to start, one system to try, and one person to invest in each week.</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Simple Table of Contents</h3>
                <ul className="list-disc list-inside text-red-800 space-y-2">
                  <li><strong>Introduction:</strong> Why this book and how to use it</li>
                  <li><strong>Week 1: The Calling</strong> - Hear God's whisper, confirm it in community, root identity in Christ.</li>
                  <li><strong>Week 2: Requirements</strong> - Be the right person before you do the work: character, rhythms, safety, Scripture.</li>
                  <li><strong>Week 3: Responsibilities</strong> - A workable weekly rhythm: preach clearly, lead small groups, follow up, partner with parents, build volunteers, plan simply.</li>
                  <li><strong>Week 4: Accountability</strong> - Live in the light: guardrails for money, safety, teaching, feedback, and energy.</li>
                  <li><strong>Week 5: Making New Disciples</strong> - Keep the gospel clear, build a simple pathway, equip students to invite and share, secure next steps.</li>
                  <li><strong>Conclusion</strong> - Tie it all together, final encouragement, and closing prayer.</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-blue-900">Chapter 1: The Calling</h2>
              
              <p className="text-gray-700 mb-6">
                When God calls a young person, He rarely does it with fanfare. More often, He whispers. In the quiet, He stirs a heart to pay attention to what He's doing among the next generation. If you're reading this, perhaps you've sensed that whisper: a burden for students who are searching, a desire to teach God's Word so it lands like fire, a conviction that your life is meant to be poured out for the good of teens and the glory of God. Calling, especially to youth ministry, is God's invitation to partner with Him in shaping future disciples and leaders. It is holy, humbling, and deeply hopeful.
              </p>

              <p className="text-gray-700 mb-6">
                The stories of Samuel, David, and Timothy show us that God loves to entrust significant work to young people. Their age did not disqualify them; it made them dependent on God. And dependence is the soil where calling grows.
              </p>

              <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-900 mb-4">Samuel's Night in the Temple</h3>
                <p className="text-green-800 mb-4">
                  Samuel's night in the temple is a picture of the beginning of ministry: a child in a sacred place learning to recognize the Lord's voice (1 Samuel 3). Samuel didn't know it was God at first. He needed Eli, an older priest, to help him discern. That detail matters. Calling ripens in community and under mentorship. Samuel's simple response—"Speak, Lord; Your servant is listening"—is the first posture of a called leader: open-handed, attentive, ready to obey.
                </p>
                <p className="text-green-800 mb-4">
                  Many aspiring ministers rush toward what to do. Samuel shows us to start with whom we're hearing. As John Bevere emphasizes in The Awe of God, reverent fear of the Lord tunes our ears and cleanses our motives. The awe of God is not terror but trembling trust. You will hear God more clearly when you want His pleasure more than you want a platform.
                </p>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-900 mb-4">David's Anointing</h3>
                <p className="text-purple-800 mb-4">
                  David's anointing offers another layer. He was overlooked by family and invisible to power brokers. Yet God saw what mattered—the heart (1 Samuel 16). Before David held a sword, he held a harp; before he sat on a throne, he watched sheep. The hidden years are not wasted years. They are God's leadership school. John Maxwell calls this the Law of the Process: leadership develops daily, not in a day.
                </p>
                <p className="text-purple-800 mb-4">
                  If your call to youth ministry feels like a slow burn—faithfully leading a small group of four students, stacking chairs after service, learning to prepare a simple Bible study—remember David. Private victories come before public ones. The ceiling of your future ministry (Maxwell's Law of the Lid) will be raised as you let God shape your character now. The flock in your care—no matter how small—is the flock where you learn to shepherd hearts, not manage crowds.
                </p>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-900 mb-4">Timothy, Paul's Young Protégé</h3>
                <p className="text-red-800 mb-4">
                  Timothy, Paul's young protégé, rounds out the picture. He had a godly heritage, spiritual gifts, and a mentor who believed in him. But Timothy also faced criticism because of his youth. Paul's counsel was not to demand respect but to live in such a way that respect would be the natural response (1 Timothy 4:12). "Set the believers an example," Paul urged, in speech, conduct, love, faith, and purity.
                </p>
                <p className="text-red-800 mb-4">
                  That five-fold pattern is a roadmap for every emerging youth minister. Your words shape culture. Your actions build credibility. Your love earns permission (Maxwell's Five Levels of Leadership, Level 2: Permission). Your faith sustains you when fruit seems slow. Your purity protects the integrity of your influence. Paul also told Timothy to fan into flame the gift God had given him (2 Timothy 1:6–7). Gifts can grow cold without use. Calling isn't a certificate you frame; it's a fire you steward.
                </p>
              </div>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-xl font-bold text-orange-900 mb-4">What is a calling?</h3>
                <p className="text-orange-800 mb-4">
                  Biblically, calling is God's initiative to bring you into His purpose. It includes identity (called to belong to Jesus), character (called to be holy), and assignment (called to a specific work among specific people). Your calling to youth ministry is an assignment within your larger calling to Christ. That ordering matters.
                </p>
                <p className="text-orange-800 mb-4">
                  If you root your identity in your role, you'll ride the rollercoaster of attendance spikes and social media feedback. If you root your identity in being adopted by God and faithful to Him, your ministry will rest on a rock. John Bevere would say the fear of the Lord creates that rock. It purifies ambition and fuels obedience. You begin to ask different questions: "What honors God?" instead of "What grows my brand?" "What forms students in Christ?" instead of "What gets the biggest laugh?"
                </p>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Internal and External Confirmations</h3>
                <p className="text-blue-800 mb-4">
                  Because calling comes from God, it has both internal and external confirmations. Internally, the Holy Spirit burdens your heart for students, awakens desire to serve, and highlights Scriptures that shape your sense of assignment (Romans 12; 1 Corinthians 12). Externally, the church recognizes and affirms what God is doing. This includes mentors who speak truth (like Eli did for Samuel), leaders who invite you to serve (like Paul did for Timothy), and observable fruit over time.
                </p>
                <p className="text-blue-800 mb-4">
                  If you think you're called to teach, do students actually learn and respond when you teach? If you feel called to shepherd, do students open up to you, and do you follow through with care? Calling without community can drift into self-deception. Community without calling can drift into mere busyness. You need both.
                </p>
              </div>

              <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-900 mb-4">The Preaching Task</h3>
                <p className="text-green-800 mb-4">
                  The preaching task sits at the center of youth ministry because students need to encounter God through His Word. Tony Evans emphasizes that preaching draws its authority from God's Word empowered by the Spirit, not from the preacher's personality. Youth ministry preaching must be clear enough for a ninth grader to grasp and deep enough to feed a senior who's already leading peers. It must be faithful to the text and focused on transformation.
                </p>
                <p className="text-green-800 mb-4">
                  Remember, your message is not merely information transfer; it's an invitation to surrender to Jesus. Preaching with integrity starts in the secret place—with prayer, repentance, and the awe of God—and moves into the public place—with clarity, love, and urgency.
                </p>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-900 mb-4">Common Pitfalls</h3>
                <p className="text-red-800 mb-4">
                  Common pitfalls stalk the called. One is confusing emotion with vocation. A moving conference moment may awaken you, but only time, fruit, and counsel can confirm you. Another is chasing a platform. Jesus invested in twelve, not in metrics. If you aim at being impressive, you will neglect being faithful. A third is isolation. Lone rangers are vulnerable to error and burnout. Youth ministry is a team sport: parents, volunteers, pastors, and peers all matter.
                </p>
                <p className="text-red-800 mb-4">
                  Maxwell's Law of the Inner Circle applies here: your potential is determined by those closest to you. Choose mentors and teammates who love Jesus and love students.
                </p>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-900 mb-4">How to Discern and Respond to Calling</h3>
                <p className="text-purple-800 mb-4">
                  So how do you discern and respond to calling? Start with listening. Set aside quiet space, put your phone away, and ask God what He's saying about the students in your community. Then test what you hear. Take a gifts inventory based on Romans 12 and 1 Corinthians 12; ask others where they see fruit in your life. Next, seek external confirmation. Schedule conversations with your pastor or youth leader. Be ready to receive both affirmation and direction for growth.
                </p>
                <p className="text-purple-800 mb-4">
                  Finally, obey in small, concrete steps. Say yes to serving where you are. Prepare diligently even when you're teaching five students. Follow up with the freshman who's drifting. Faithfulness in little is the training ground for faithfulness in much.
                </p>
              </div>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-xl font-bold text-orange-900 mb-4">Keeping Your Soul Anchored</h3>
                <p className="text-orange-800 mb-4">
                  As you take those steps, keep your soul anchored. The awe of God keeps you honest. Daily Scripture keeps you grounded. Prayer keeps you connected. Journaling keeps you reflective. Fasting sharpens your hunger for God more than for success. Serving behind the scenes keeps you humble. And reading wise voices keeps you growing.
                </p>
                <p className="text-orange-800 mb-4">
                  Consider pairing your Bible reading this week with selections from The Awe of God (for your posture), The 21 Irrefutable Laws of Leadership (for your process), The 5 Levels of Leadership (for your relationships), and The Power of Preaching (for your proclamation). Let them mentor you as you walk with the Lord and with His people.
                </p>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Picture the Students</h3>
                <p className="text-blue-800 mb-4">
                  Picture the students you hope to serve. Some are skeptical. Some are wounded. Some are hungry for truth. Some are bored. God sees them all. He is already at work in their lives, and He may be inviting you to join Him. That invitation is not to become a celebrity but to become a shepherd. It's a call to lay down your life—your preferences, your time, your ego—so that students can find life in Christ.
                </p>
                <p className="text-blue-800 mb-4">
                  It's a call to carry God's Word in your mouth and God's heart in your chest. It's a call to endure, to rejoice, to pray, to laugh, to weep, and to wait on the Lord. It's a call worthy of your whole life.
                </p>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <h3 className="text-xl font-bold text-green-900 mb-4 text-center">Take Courage</h3>
                <p className="text-green-800 text-center mb-4">
                  If He calls you, He will equip you. If He equips you, He will place you. If He places you, He will sustain you. Your part is to respond as Samuel did: "Speak, Lord; Your servant is listening." Then, like David, be faithful in hidden places. Like Timothy, guard your life and doctrine closely. And like Paul, learn to labor with God's energy, which powerfully works within you.
                </p>
                <p className="text-green-800 text-center font-bold">
                  The journey begins here, with awe, humility, and a willing yes.
                </p>
              </div>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Weekly Challenge (Week 1: The Calling)</h3>
                <div className="space-y-3 text-orange-800">
                  <div>
                    <strong>Day 1: Listening Retreat (60 minutes)</strong><br/>
                    Read 1 Samuel 3 and 1 Timothy 4:6–16. In silence, ask: "Lord, what are You saying to me about youth?" Journal impressions and Scriptures that come to mind.
                  </div>
                  <div>
                    <strong>Day 2: Gifts and Fruit Inventory</strong><br/>
                    Review Romans 12:4–8 and 1 Corinthians 12. List 3–5 gifts you may have and 2–3 places you've seen fruit with students. Ask one trusted friend to add their observations.
                  </div>
                  <div>
                    <strong>Day 3: Mentor Conversations</strong><br/>
                    Meet with your pastor/youth leader and one mature believer. Ask: "Do you see a ministry call in me? Where should I stretch? What's one assignment I can take on now?"
                  </div>
                  <div>
                    <strong>Day 4: Serve Small</strong><br/>
                    Volunteer in a youth ministry task this week (lead prayer, co-lead a small group, follow up with a new student, organize a service project). Note what energized you, what challenged you, and how students responded.
                  </div>
                  <div>
                    <strong>Day 5: Calling Statement</strong><br/>
                    Write 3–4 sentences summarizing your sense of calling, your primary audience (which students), and your next faithful step in the next 30 days. Share it with your mentor for feedback.
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deliverables to bring into Week 2</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Written calling statement.</li>
                  <li>Notes from both mentor conversations.</li>
                  <li>One clear next step you will take in the next 30 days.</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-100 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Week Preview (Week 2: Requirements)</h3>
                <p className="text-gray-700">
                  Calling is the "why." Requirements are the "who you must become" and "what you must learn." In Week 2, we will explore biblical character qualifications, spiritual disciplines, relational competencies, and practical skills required for youth ministry. Drawing from 1 Timothy and Titus, insights from John Maxwell on personal growth and credibility, John Bevere on holiness and the fear of the Lord, and Tony Evans on handling God's Word, you will craft a personal development plan to steward your calling with integrity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


