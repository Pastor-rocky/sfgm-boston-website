import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft } from "lucide-react";

export default function YouthMinistryCourseCh3() {
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
                <p className="text-white/90 text-xl">Chapter 3: Responsibilities</p>
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
              src="/uploads/textbook-audio/youth-ministry-ch3.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-blue-900">Chapter 3: Responsibilities</h2>
              
              <p className="text-gray-700 mb-6">
                If calling is the "why" and requirements are the "who," responsibilities are the "what" and "how" of youth ministry. This is where vision touches the calendar, where sermons become shepherding, and where systems become service. Think of your ministry as a table. Four sturdy legs hold it steady: the Word and prayer, people, teams, and wise planning. If any leg weakens, the table wobbles. Your charge is not to juggle a hundred tasks but to keep those legs strong so students can feast on the life of Jesus.
              </p>

              <p className="text-gray-700 mb-6">
                A faithful week is not glamorous. It's unhurried time with God (Acts 6:4), attentive time with students (1 Thessalonians 2:8), careful crafting of God's Word so students can hear and obey (2 Timothy 4:2), and thoughtful leadership that equips others to do the work of ministry (Ephesians 4:12). John Maxwell calls this the Law of Priorities: activity is not accomplishment. Tony Evans reminds us that preaching carries weight because it carries the Word, not because it carries our personality. John Bevere urges us to minister with holy awe, which keeps the work from becoming a performance. Hold those three voices together as you carry out the core responsibilities below.
              </p>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">1) Preaching and teaching: truth that aims at transformation</h3>
                <p className="text-orange-800 mb-4">
                  Preaching to students requires both reverence and relevance. Your goal is not to say everything, but to say the right thing clearly, faithfully, and pastorally. A simple weekly rhythm helps:
                </p>
                <ul className="list-disc list-inside space-y-2 text-orange-800 mb-4">
                  <li><strong>Pray first.</strong> Before you study the text, let the text study you. Ask what God wants to form in students through this passage. "Let the message about Christ... fill your lives" (Colossians 3:16).</li>
                  <li><strong>Find the big idea.</strong> What is this text saying? Aim for one clear sentence that a ninth grader can repeat.</li>
                  <li><strong>Build toward response.</strong> Ask, "If this is true, what should students believe differently? Feel differently? Do differently?" Preach Christ, not merely advice (Colossians 1:28–29).</li>
                </ul>
                <p className="text-orange-800 mb-4">
                  Tony Evans emphasizes clarity with conviction. Explain the text, illustrate with stories from student life, and call for a faith-filled step—prayer, confession, reconciliation, mission. Keep your tone warm, your words simple, and your applications specific. Over time, plan a balanced teaching calendar: gospel, identity in Christ, spiritual disciplines, relationships, wisdom, mission, and justice. A healthy preaching plan anticipates the school year rhythms and gives room for small group dialogue and Q&A nights.
                </p>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">2) Small groups and a discipleship pathway</h3>
                <p className="text-blue-800 mb-4">
                  Students grow best in circles, not just in rows. A small group is the place where teaching becomes transformation—where someone knows your name, your questions, and your week. Build a simple, consistent pathway:
                </p>
                <ul className="list-disc list-inside space-y-2 text-blue-800 mb-4">
                  <li><strong>Groups anchored to Scripture and real life.</strong> Use questions that help students observe, interpret, and apply God's Word. Invite honest stories and guide toward hope.</li>
                  <li><strong>Trained leaders.</strong> Recruit faithful adults who love Jesus and teenagers. Equip them to listen well, ask wise questions, and follow up during the week (2 Timothy 2:2).</li>
                  <li><strong>Clear expectations.</strong> Provide a short leader guide with the big idea, three to five discussion questions, and two concrete follow-ups: one spiritual (e.g., a reading plan) and one relational (e.g., check-in midweek).</li>
                  <li><strong>Relational safety.</strong> Keep groups predictable, on time, and trustworthy. Leaders should protect confidentiality while understanding when to report safety concerns.</li>
                </ul>
                <p className="text-blue-800 mb-4">
                  Measure what matters. Don't obsess over group size; track engagement, spiritual conversations, Scripture intake, prayer, and acts of service. Celebrate small group wins publicly so students see that growth is more than a crowd count.
                </p>
              </div>

              <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-green-900 mb-4">3) Pastoral care and follow-up</h3>
                <p className="text-green-800 mb-4">
                  Shepherds know the state of their flock (Proverbs 27:23). Create simple systems that help love stay organized:
                </p>
                <ul className="list-disc list-inside space-y-2 text-green-800 mb-4">
                  <li><strong>New student follow-up.</strong> Within 48 hours, send a welcoming text, a parent email, and an invite to next week. Thank them for coming by name. Offer to answer questions.</li>
                  <li><strong>Response follow-up.</strong> When students respond to a message—salvation, renewed commitment, confession—follow up personally within a few days. Help them take a next step: baptism class, a Bible reading plan, joining a small group, or meeting with a leader.</li>
                  <li><strong>Crisis care.</strong> Listen first, pray sincerely, and involve parents and pastors appropriately. Know when to refer to professional counselors. Have a clear reporting protocol for any safety concerns (Galatians 6:2; James 1:19).</li>
                  <li><strong>Prayer.</strong> Keep a running prayer list. Text students short Scripture-rooted prayers midweek. Few things communicate care like remembering.</li>
                </ul>
                <p className="text-green-800 mb-4">
                  Document care contacts briefly and securely. You're not building a dossier; you're stewarding souls. Your notes help you follow through and help your team stay unified.
                </p>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">4) Partnering with parents and the wider church</h3>
                <p className="text-purple-800 mb-4">
                  Parents are the primary disciple-makers. Your role is to partner, not replace. Build trust by communicating early and often:
                </p>
                <ul className="list-disc list-inside space-y-2 text-purple-800 mb-4">
                  <li><strong>Monthly parent update.</strong> Share the teaching plan, key dates, and a simple conversation guide so faith continues at home (Deuteronomy 6:6–7).</li>
                  <li><strong>Open doors.</strong> Invite parents to observe, serve, or attend special nights. Seek feedback with humility.</li>
                  <li><strong>Bridge to the church.</strong> Encourage students to worship, serve, and belong in the life of the whole church, not only in the youth room (1 Peter 5:2; Acts 2:42–47).</li>
                </ul>
                <p className="text-purple-800 mb-4">
                  Alignment matters. Sync your calendar and series with church leadership. Invite your senior pastor to speak occasionally. Let students see themselves as part of a larger family.
                </p>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-semibold text-red-900 mb-4">5) Volunteer development: from doer to developer</h3>
                <p className="text-red-800 mb-4">
                  If you do all the ministry, your impact will always be limited. If you develop people, your ministry multiplies. Maxwell's Five Levels of Leadership call you to move from Position to Permission to Production, but the long-term fruit comes at Level 4: People Development. Build a simple pipeline:
                </p>
                <ul className="list-disc list-inside space-y-2 text-red-800 mb-4">
                  <li><strong>Recruit with vision and clarity.</strong> Explain why their presence matters and what the role actually involves.</li>
                  <li><strong>Onboard with care.</strong> Background checks, clear expectations, and a warm welcome go a long way.</li>
                  <li><strong>Train consistently.</strong> Short, regular huddles beat occasional marathons. Teach one skill at a time: how to lead prayer, how to follow up, how to handle tough questions.</li>
                  <li><strong>Coach and celebrate.</strong> Give specific feedback after nights. Share stories of life change and say thank you often.</li>
                </ul>
                <p className="text-red-800 mb-4">
                  Aim to delegate real responsibility, not just tasks. Let leaders own a small group, a prayer team, a welcome process, or an outreach project. "Equip God's people to do his work and build up the church" (Ephesians 4:12).
                </p>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">6) Outreach and mission: seeking and sending</h3>
                <p className="text-yellow-800 mb-4">
                  A healthy ministry both gathers and goes. Jesus tells stories of pursuing the one who is lost (Luke 15). Help students see school hallways and digital spaces as mission fields:
                </p>
                <ul className="list-disc list-inside space-y-2 text-yellow-800 mb-4">
                  <li><strong>Invite culture.</strong> Teach students to pray for three friends, invest in those friendships, and invite them to a next step—a night, a small group, or a service opportunity.</li>
                  <li><strong>Service and justice.</strong> Plan regular service projects that meet tangible needs. Debrief biblically so students connect mercy with the gospel.</li>
                  <li><strong>Evangelism training.</strong> Offer simple tools for sharing the hope within them with gentleness and respect (1 Peter 3:15).</li>
                  <li><strong>Missions pathway.</strong> Partner with your church's local and global efforts. A well-led trip or local immersion can mark a student for life.</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h3 className="text-xl font-semibold text-indigo-900 mb-4">7) Administration and stewardship: order that serves love</h3>
                <p className="text-indigo-800 mb-4">
                  Good systems free you to love people. Keep administration simple and transparent:
                </p>
                <ul className="list-disc list-inside space-y-2 text-indigo-800 mb-4">
                  <li><strong>Calendar.</strong> Work six to nine months ahead. Mark key rhythms: retreats, camps, outreach, parent nights, leader trainings, and rest weeks.</li>
                  <li><strong>Budget.</strong> Spend to your values. Track expenses carefully. Ask, "Does this purchase help us make disciples?"</li>
                  <li><strong>Safety.</strong> Background checks, two-adult rule, check-in procedures, medical forms, transportation guidelines, and incident reporting. "Be sure that everything is done properly and in order" (1 Corinthians 14:40).</li>
                  <li><strong>Metrics that matter.</strong> Beyond attendance, track first-time guests, follow-up touches, small group participation, baptisms, Scripture reading plans started, service engagement, and leader retention. Numbers are servants, not masters. They help you notice where to celebrate and where to lean in.</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                <h3 className="text-xl font-semibold text-pink-900 mb-4">8) A sustainable weekly rhythm</h3>
                <p className="text-pink-800 mb-4">
                  Responsibilities are carried by rhythms, not heroic bursts. Consider a simple weekly template (adjust to your context):
                </p>
                <ul className="list-disc list-inside space-y-2 text-pink-800 mb-4">
                  <li><strong>Day of rest and worship:</strong> stop, delight, and recharge.</li>
                  <li><strong>Sermon prep block:</strong> study, pray, and write while you're fresh.</li>
                  <li><strong>People blocks:</strong> campus visits, one-on-ones, small group leader huddles.</li>
                  <li><strong>Team block:</strong> planning and communication with staff and volunteers.</li>
                  <li><strong>Admin block:</strong> calendar, budget, forms, and follow-up.</li>
                  <li><strong>Margin:</strong> space for the unexpected conversation or crisis.</li>
                </ul>
                <p className="text-pink-800 mb-4">
                  Guard your first things: time with God, time with your family, time with your team. "Teach us to realize the brevity of life, so that we may grow in wisdom" (Psalm 90:12). Wisdom allocates time to match calling.
                </p>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <h3 className="text-xl font-bold text-green-900 mb-4 text-center">Faithful Ministry</h3>
                <p className="text-green-800 text-center mb-4">
                  When you hold these responsibilities with reverent awe, relational warmth, and wise planning, students experience a ministry that feels both alive and safe—alive because the Word and Spirit are at work, safe because love is well-ordered.
                </p>
                <p className="text-green-800 text-center font-bold">
                  Your task is not to be everywhere or do everything, but to be faithful with what truly matters and to equip others to join you.
                </p>
              </div>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Weekly Challenge (Week 3: Responsibilities)</h3>
                <div className="space-y-3 text-orange-800">
                  <div>
                    <strong>Day 1: Map your ministry week</strong><br/>
                    Sketch a weekly schedule that protects sermon prep, people time, team time, admin, and rest. Choose three non-negotiables you'll keep for the next 30 days.
                  </div>
                  <div>
                    <strong>Day 2: Preaching sprint</strong><br/>
                    Choose an upcoming passage. Write one clear big idea, three student-centered applications, and one response step. Share it with a mentor for feedback on clarity and faithfulness.
                  </div>
                  <div>
                    <strong>Day 3: Small group health check</strong><br/>
                    List each current small group and its leader. For five students, note one spiritual next step and one relational follow-up this week. Send those notes to leaders and check back in seven days.
                  </div>
                  <div>
                    <strong>Day 4: Follow-up flow</strong><br/>
                    Build a 48-hour follow-up workflow for new students and for salvation/response cards. Draft two text templates and one parent email. Test them with a trusted leader for tone.
                  </div>
                  <div>
                    <strong>Day 5: Parent and volunteer touchpoints</strong><br/>
                    Draft next month's parent update with a short conversation guide. Create a 30-minute mini-training for leaders (topic: leading great discussions). Put both on the calendar and send invites.
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deliverables to bring into Week 4</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Your weekly rhythm with three non-negotiables.</li>
                  <li>One-page sermon plan (big idea, applications, response).</li>
                  <li>Small group health notes with next steps.</li>
                  <li>Follow-up templates and workflow diagram.</li>
                  <li>Parent update draft and leader training outline.</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-100 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Week Preview (Week 4: Accountability)</h3>
                <p className="text-gray-700">
                  We will build the guardrails that keep leaders and students safe and fruitful: personal accountability, team feedback loops, financial and safety accountability, doctrinal clarity, and measurable outcomes that serve people rather than pressure them. We'll explore how to invite correction, practice confession, report wisely, and create a culture where truth and grace grow together.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


