import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft } from "lucide-react";

export default function YouthMinistryCourseCh4() {
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
                <p className="text-white/90 text-xl">Chapter 4: Accountability</p>
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
              src="/uploads/textbook-audio/youth-ministry-ch4.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-blue-900">Chapter 4: Accountability</h2>
              
              <p className="text-gray-700 mb-6">
                Accountability is not a cage; it is a greenhouse. It creates the conditions where truth, trust, and healthy growth can flourish. For a youth minister, accountability is love organized—guardrails that protect students, volunteers, the church, and your own soul. If calling gives you a direction and requirements give you a standard, accountability keeps you on the road when the weather changes and the terrain gets rough. It names reality so you can repent quickly, adjust wisely, and lead faithfully.
              </p>

              <p className="text-gray-700 mb-6">
                At its core, accountability is about stewardship. God entrusts you with His Word, His people, and your own gifts. "Now, a person who is put in charge as a manager must be faithful" (1 Corinthians 4:2). Faithfulness requires visibility: others can see your work, ask questions, and help you stay aligned to Christ. Youth ministry thrives when leaders gladly live in the light.
              </p>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">1) Accountability to God: serving before an audience of One</h3>
                <p className="text-orange-800 mb-4">
                  All other accountability is downstream from this. Ministry begins in the secret place, where you live in reverent awe before God. As John Bevere teaches, the fear of the Lord purifies motives and anchors obedience. When you tremble at God's Word, you stop performing for applause and start stewarding a trust. A few daily and weekly practices keep this foundation strong:
                </p>
                <ul className="list-disc list-inside space-y-2 text-orange-800 mb-4">
                  <li><strong>Daily surrender:</strong> "Search me, O God, and know my heart... Point out anything in me that offends you" (Psalm 139:23–24). Invite God to correct you before anyone else has to.</li>
                  <li><strong>Confession and repentance:</strong> keep short accounts with God. Confession is not self-loathing; it is agreeing with God so you can walk clean again (1 John 1:9).</li>
                  <li><strong>Sabbath and limits:</strong> receiving rest is an act of faith. It says, "God runs this ministry, not me."</li>
                  <li><strong>Spiritual friendship:</strong> one or two seasoned believers who know your story, ask about your soul, and have permission to challenge you.</li>
                </ul>
                <p className="text-orange-800 mb-4">
                  This Godward accountability keeps you from attempting public work on an empty tank. It turns duty into devotion and performance into worship.
                </p>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">2) Accountability to the Word: letting the text master the preacher</h3>
                <p className="text-blue-800 mb-4">
                  Youth ministers carry Scripture into the lives of students. Tony Evans reminds us that the preacher stands under the text, not over it. That means you invite the Word to set your agenda and your tone. Build a simple system that keeps your teaching aligned:
                </p>
                <ul className="list-disc list-inside space-y-2 text-blue-800 mb-4">
                  <li><strong>A sermon prep checklist.</strong> Before you write, read the passage in context. Ask, "What did it mean then? What does it mean now? How does Christ fulfill this?" Pray the text into your own life first (2 Timothy 2:15).</li>
                  <li><strong>Peer review.</strong> Share your big idea and outline with a trusted leader midweek. Ask for feedback on clarity, faithfulness, and applications to students' real questions (James 3:1).</li>
                  <li><strong>Source integrity.</strong> Never copy someone else's work as your own. Quote fairly. Give credit. It's not just ethics; it's humility.</li>
                  <li><strong>Doctrinal alignment.</strong> Stay inside your church's statement of faith. When you tackle tough topics, invite your pastor to preview your approach.</li>
                </ul>
                <p className="text-blue-800 mb-4">
                  You are accountable for both your content and your spirit—truth with grace, conviction with compassion (Ephesians 4:15). Guard your life and doctrine closely (1 Timothy 4:16).
                </p>
              </div>

              <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-green-900 mb-4">3) Accountability with people: the gift of honest mirrors</h3>
                <p className="text-green-800 mb-4">
                  John Maxwell's Law of the Inner Circle teaches that those closest to you shape your capacity. Choose an inner circle that will tell you the truth in love. Build feedback into your team on purpose:
                </p>
                <ul className="list-disc list-inside space-y-2 text-green-800 mb-4">
                  <li><strong>Clear roles and expectations.</strong> Vague roles sabotage accountability. Write simple role descriptions for staff and volunteers. Clarity is kindness.</li>
                  <li><strong>Regular 1:1s.</strong> Meet with key leaders for 30 minutes every other week. Celebrate wins, review goals, address barriers, and ask, "What am I missing? How can I serve you better?"</li>
                  <li><strong>360 feedback moments.</strong> Twice a year, ask your pastor, peers, and volunteers three questions: What should I stop, start, continue? Summarize and share one change you'll make.</li>
                  <li><strong>Safe conflict.</strong> Jesus gives a pathway for conflict: go directly first, then involve others if needed (Matthew 18:15–16). Make it normal to address issues promptly and respectfully.</li>
                </ul>
                <p className="text-green-800 mb-4">
                  Accountability is mutual. You call your team to standards and invite them to hold you to them. That shared humility creates a culture where growth is expected and failure is a teacher.
                </p>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">4) Ethical, financial, and safety guardrails: trust you can see</h3>
                <p className="text-purple-800 mb-4">
                  Trust is not a feeling; it is a set of agreements you keep. Write them down and live them out.
                </p>
                <ul className="list-disc list-inside space-y-2 text-purple-800 mb-4">
                  <li><strong>Money:</strong> use approved systems for purchases, reimbursements, and counting offerings. Two unrelated people count cash. Keep receipts. Review budgets monthly. "Whoever can be trusted with very little can also be trusted with much" (Luke 16:10).</li>
                  <li><strong>Safety:</strong> two-adult rule, room visibility, approved transportation, background checks, and incident reporting. Communicate these clearly to parents and leaders so they know what to expect.</li>
                  <li><strong>Digital boundaries:</strong> use official channels for communication. Keep messages group-based when possible. If a private conversation is needed, copy a second leader or parent. No disappearing messages. Keep communication time-bound and content-appropriate.</li>
                  <li><strong>Counseling and care:</strong> you are a pastor, not a therapist. Listen, pray, and refer when needed. Document serious care conversations briefly and securely.</li>
                </ul>
                <p className="text-purple-800 mb-4">
                  These guardrails free you to love boldly without crossing lines. They protect students, volunteers, and you.
                </p>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-semibold text-red-900 mb-4">5) Measurable outcomes that serve people, not pressure them</h3>
                <p className="text-red-800 mb-4">
                  What you measure you tend to reproduce. Numbers can either reduce people to data or help you notice how to serve them better. Choose metrics that match your mission:
                </p>
                <ul className="list-disc list-inside space-y-2 text-red-800 mb-4">
                  <li><strong>Engagement metrics:</strong> first-time guests, small group participation, follow-up touches, baptisms, Scripture reading plans started, serving involvement.</li>
                  <li><strong>Formation metrics:</strong> testimonies, prayer participation, mentoring matches, parent feedback on conversations at home.</li>
                  <li><strong>Team metrics:</strong> volunteer retention, training attendance, leader-to-student ratios.</li>
                </ul>
                <p className="text-red-800 mb-4">
                  Set a few quarterly targets (not too many), then review them with your pastor. Celebrate wins loudly. If a number dips, don't hide it; explore causes and adjust. "Teach us to realize the brevity of life, so that we may grow in wisdom" (Psalm 90:12). Wisdom reallocates time and energy to what bears fruit.
                </p>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">6) Confession, correction, and restoration: how we respond when we miss it</h3>
                <p className="text-yellow-800 mb-4">
                  Leaders will make mistakes. The measure of a healthy culture is not perfection but swiftness to confess and willingness to be restored. Build a simple pathway:
                </p>
                <ul className="list-disc list-inside space-y-2 text-yellow-800 mb-4">
                  <li><strong>Surface the issue quickly.</strong> Hiding breeds harm. Bring concerns to your supervisor or elder team.</li>
                  <li><strong>Tell the truth plainly.</strong> Own what you did, without spin. Name impact, not just intent.</li>
                  <li><strong>Submit to a plan.</strong> Depending on the issue, that may include counseling, training, temporary step-backs, or, in serious cases, removal from leadership. Restoration is not rushed; it is careful, honest, and hopeful (Galatians 6:1).</li>
                  <li><strong>Communicate appropriately.</strong> If your mistake affected others, apologize personally or publicly as needed. Keep confidences, but don't hide harm.</li>
                </ul>
                <p className="text-yellow-800 mb-4">
                  Grace and truth walk together. Accountability without grace crushes; grace without accountability corrodes. You need both.
                </p>
              </div>

              <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h3 className="text-xl font-semibold text-indigo-900 mb-4">7) Guarding against isolation and burnout: accountability for your energy</h3>
                <p className="text-indigo-800 mb-4">
                  Fatigue distorts judgment. When you're exhausted, shortcuts look wise and temptations look harmless. Build energy accountability:
                </p>
                <ul className="list-disc list-inside space-y-2 text-indigo-800 mb-4">
                  <li><strong>Weekly check-in with a peer:</strong> How are you sleeping? Where are you tempted? What gave you joy? What's one boundary you need this week?</li>
                  <li><strong>Monthly spiritual direction or mentoring:</strong> someone who asks about your life with God, not just your output.</li>
                  <li><strong>Family conversations:</strong> your loved ones often see your limits first. Listen when they say you're thin.</li>
                  <li><strong>Time boundaries:</strong> choose a weekly day off, a nightly cut-off time for messages, and a plan for vacation. Keep them as promises to your family and your church.</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                <h3 className="text-xl font-semibold text-pink-900 mb-4">8) Transparency with parents and students: show your work</h3>
                <p className="text-pink-800 mb-4">
                  Accountability is most trusted when it's visible. Host an annual parent night where you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-pink-800 mb-4">
                  <li>Share your safety policies.</li>
                  <li>Introduce leaders and explain your screening process.</li>
                  <li>Walk through your teaching scope for the year.</li>
                  <li>Invite questions. Answer plainly. If you don't know, say so and follow up.</li>
                </ul>
                <p className="text-pink-800 mb-4">
                  For students, normalize feedback. Ask, "What helped you most tonight? What confused you?" Model teachability. You're not above correction; you are the lead repenter.
                </p>
              </div>

              <div className="mb-6 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                <h3 className="text-xl font-semibold text-teal-900 mb-4">9) Technology and integrity: stewarding influence in the digital age</h3>
                <p className="text-teal-800 mb-4">
                  Online life never stays online. Teach your team to treat digital spaces as public, permanent, and pastoral:
                </p>
                <ul className="list-disc list-inside space-y-2 text-teal-800 mb-4">
                  <li><strong>Use ministry accounts for ministry.</strong> Keep personal accounts personal and above reproach.</li>
                  <li><strong>Avoid direct messages late at night.</strong> Move long pastoral conversations to in-person meetings with appropriate visibility.</li>
                  <li><strong>Keep archives.</strong> If questions arise, you have a record.</li>
                </ul>
                <p className="text-teal-800 mb-4">
                  Maxwell's Law of the Picture says people do what people see. Your example online sets the tone for the whole ministry.
                </p>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <h3 className="text-xl font-bold text-green-900 mb-4 text-center">A Spiritual Posture</h3>
                <p className="text-green-800 text-center mb-4">
                  Accountability is not merely a set of policies. It is a spiritual posture—living gladly in the light because you trust that God's ways lead to life. When you cultivate awe before God (Bevere), submission to the Word (Evans), and humble feedback with others (Maxwell), you build a ministry that is both safe and strong.
                </p>
                <p className="text-green-800 text-center font-bold">
                  Your students learn an invaluable lesson: the way of Jesus is honest, hopeful, and healthy.
                </p>
              </div>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Weekly Challenge (Week 4: Accountability)</h3>
                <div className="space-y-3 text-orange-800">
                  <div>
                    <strong>Day 1: Accountability map</strong><br/>
                    Draw your current accountability web: to God, to your pastor, to your team, to parents, to policies. Note strengths and gaps. Choose two gaps to close this month and schedule the first step.
                  </div>
                  <div>
                    <strong>Day 2: Leader covenant</strong><br/>
                    Draft a one-page covenant for volunteers (character, communication, safety, discipleship expectations). Review it with your pastor and two trusted leaders. Plan a 15-minute walkthrough for your next team huddle.
                  </div>
                  <div>
                    <strong>Day 3: Safety and finance audit</strong><br/>
                    Using your church's policies, review background checks, two-adult practices, check-in, transportation, medical forms, cash handling, and reimbursements. List three improvements and assign owners and due dates.
                  </div>
                  <div>
                    <strong>Day 4: Sermon review loop</strong><br/>
                    Create a sermon prep checklist and recruit one peer reviewer. Put a 20-minute review slot on your calendar two days before youth night for the next four weeks.
                  </div>
                  <div>
                    <strong>Day 5: Feedback rhythms</strong><br/>
                    Schedule six weeks of 1:1s (30 minutes) with key leaders. Prepare three questions: What's going well? What's hard? What should I adjust? Share one change you'll make based on their input.
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deliverables to bring into Week 5</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Your accountability map with two gap-closure actions scheduled.</li>
                  <li>Final leader covenant.</li>
                  <li>A one-page audit summary with three improvements and owners.</li>
                  <li>Sermon prep checklist and review calendar invites sent.</li>
                  <li>1:1 feedback schedule with questions.</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-100 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Week Preview (Week 5: Making New Disciples)</h3>
                <p className="text-gray-700">
                  We will move from foundations to fruit—how to help students meet Jesus and grow as disciple-makers themselves. We'll clarify the gospel, train students to share their faith, design simple pathways from first visit to baptism to serving, and build a student leadership pipeline that multiplies ministry at school, at home, and online.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


