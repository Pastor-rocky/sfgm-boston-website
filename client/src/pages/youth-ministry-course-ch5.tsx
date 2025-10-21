import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft } from "lucide-react";

export default function YouthMinistryCourseCh5() {
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
                <p className="text-white/90 text-xl">Chapter 5: Making New Disciples</p>
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
              src="/uploads/textbook-audio/youth-ministry-ch5.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-blue-900">Chapter 5: Making New Disciples</h2>
              
              <p className="text-gray-700 mb-6">
                When Jesus called fishermen, He didn't say, "Come, attend my events." He said, "Come, follow me, and I will show you how to fish for people." That is the heart of youth ministry: not merely gathering students, but forming followers who make more followers. Discipleship isn't a side project; it's the mission. The question is not only, "How many came?" but "Who is coming to Christ, being baptized, growing in His Word, and helping others do the same?"
              </p>

              <p className="text-gray-700 mb-6">
                Making new disciples begins with a clear gospel, continues with simple next steps, and multiplies through a culture of invitation and empowerment. It is fueled by the Holy Spirit, clarified by faithful preaching, protected by wise systems, and modeled by leaders whose lives say, "Follow me as I follow Christ."
              </p>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">1) Clarify the gospel and the response</h3>
                <p className="text-orange-800 mb-4">
                  Students hear competing "good news" every day: self-creation, achievement, acceptance through performance. The gospel is startlingly different: God created us for Himself; we have sinned and cannot save ourselves; Jesus lived perfectly, died sacrificially, and rose victoriously; through repentance and faith in Him we are forgiven, made new, and brought into God's family. The response is not "try harder" but "trust Jesus" and follow Him as Lord.
                </p>
                <p className="text-orange-800 mb-4">
                  Keep the gospel central and simple. Avoid moralism ("Be better!") and vague inspiration ("You got this!"). Call students to turn from sin and trust in Jesus. When you invite a response, be clear and kind. Offer two pathways in the moment: a prayer of surrender and a concrete next step (talk to a leader, mark a card, join a baptism class). Tony Evans reminds us that our authority rests in God's Word and the Spirit's work, not our personality. Make the cross and resurrection the center. Speak plainly. Trust God to do what only He can do.
                </p>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">2) Build a simple pathway: from guest to disciple-maker</h3>
                <p className="text-blue-800 mb-4">
                  Crowds don't become disciples by accident. A clear pathway helps you shepherd students from first visit to fruitful service. Consider this framework:
                </p>
                <ul className="list-disc list-inside space-y-2 text-blue-800 mb-4">
                  <li><strong>First 48 hours: Connect</strong> - Send a personal text to the student and a brief, warm email to the parent. Thank them by name. Share the next gathering and how to get into a small group. An early human touch beats a generic mass message.</li>
                  <li><strong>First four weeks: Belong</strong> - Prioritize consistent small group attendance. Introduce two peers and one trusted adult leader. Give a simple "start here" guide: a readable gospel (like Mark), a basic prayer model, and a brief overview of your ministry rhythms. Create predictable on-ramps: pizza-and-Q&A nights, newcomer huddles, and leaders ready to host.</li>
                  <li><strong>First semester: Believe and become</strong> - Offer a four-week basics track: Who Jesus Is, The Gospel, How to Read the Bible, Prayer and Community. Share the gospel clearly in week two and invite decisions. Include a parents' note each week so home conversations continue. If a student trusts Christ, invite them into a baptism and next steps conversation. Pair every new believer with a mentor who meets three times in the first 30 days to establish habits.</li>
                  <li><strong>First year: Build others</strong> - Help students discover gifts and join a serving team (greeting, tech, worship, kids, outreach). Train them to share their testimony. Invite them to pray for three friends, invest in those friendships, and invite them to group or a gathering. Create an annual student leadership cohort that models and multiplies this life.</li>
                </ul>
                <p className="text-blue-800 mb-4">
                  Publish your pathway in one page for parents, leaders, and students. Simplicity wins. If it's too complex to explain, it's too complex to scale.
                </p>
              </div>

              <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-green-900 mb-4">3) Create a culture of invitation, not just a program of events</h3>
                <p className="text-green-800 mb-4">
                  Programs ebb and flow. Culture endures. An invite culture grows when:
                </p>
                <ul className="list-disc list-inside space-y-2 text-green-800 mb-4">
                  <li><strong>Leaders model it.</strong> Your team regularly names friends they are praying for and shares invitation stories (including the awkward ones). Maxwell's Law of the Picture applies: people do what people see.</li>
                  <li><strong>You lower barriers.</strong> Keep gatherings welcoming, predictable, and warm. Make the first five minutes of every night the easiest five minutes for a new student: clear signage, friendly faces, music that feels alive, and a host who explains what's happening.</li>
                  <li><strong>You teach a simple pattern.</strong> Pray for three friends by name. Invest in them weekly. Invite them to a next step. Include them once they show up. Celebrate every invite, not just the successful ones.</li>
                </ul>
                <p className="text-green-800 mb-4">
                  Normalize everyday mission. Instead of aiming for one mega-event, cultivate hundreds of small moments where students carry Jesus into hallways, group chats, lunch tables, and teams.
                </p>
              </div>

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">4) Preaching that invites and equips</h3>
                <p className="text-purple-800 mb-4">
                  Evangelistic clarity belongs in the weekly rhythm, not only in special services. Tony Evans urges us to preach the text with clarity and conviction, then call for a response. Each series should include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-purple-800 mb-4">
                  <li>A clear explanation of the gospel and why it matters in the topic at hand (identity, anxiety, relationships).</li>
                  <li>A moment to respond: raise a hand, come forward, or indicate on a card—then quickly connect each student with a leader.</li>
                  <li>A discipleship nudge: "Here's your next step this week"—a reading plan, a prayer challenge, a conversation with a parent, a serving opportunity.</li>
                </ul>
                <p className="text-purple-800 mb-4">
                  Train your leaders to recognize and follow up in the moment. Create a simple response card or digital form that gathers name, contact, decision/interest, and preferred next step. Follow up within 48 hours with warmth and clarity.
                </p>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-semibold text-red-900 mb-4">5) Environments for seekers and skeptics</h3>
                <p className="text-red-800 mb-4">
                  Not every student is ready for a sermon. Create spaces where questions are welcome:
                </p>
                <ul className="list-disc list-inside space-y-2 text-red-800 mb-4">
                  <li><strong>Q&A nights:</strong> gather anonymous questions, answer plainly, and admit when you don't know. Follow up privately with students who ask deeper or more personal questions.</li>
                  <li><strong>Alpha-style groups or "Explore Faith" tables:</strong> short videos or prompts, food, conversation, and no pressure to "perform" spiritually.</li>
                  <li><strong>Service first:</strong> invite students to join a service project; debrief afterward with Scripture and story, showing how mercy flows from the mercy we've received.</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">6) Equip students to share their story and the gospel</h3>
                <p className="text-yellow-800 mb-4">
                  Many students want to share but feel unprepared. Lower the complexity:
                </p>
                <ul className="list-disc list-inside space-y-2 text-yellow-800 mb-4">
                  <li><strong>The 3-minute testimony:</strong> Before Jesus, how I met Jesus, life with Jesus. Practice in small group. Give feedback. Celebrate the courage.</li>
                  <li><strong>The 3 circles or bridge:</strong> One simple tool for explaining the gospel with a pen and paper. Practice until it's muscle memory.</li>
                  <li><strong>Answering why:</strong> Help students articulate why they follow Jesus in one sentence. Encourage them to pair their "why" with an invite: "Want to come with me Wednesday and talk more?"</li>
                </ul>
                <p className="text-yellow-800 mb-4">
                  Maxwell's People Development (Level 4) is your goal: don't stop at students attending; train them to lead others to Jesus. When you equip students to witness, you're raising the lid on your ministry's impact far beyond your program hours.
                </p>
              </div>

              <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h3 className="text-xl font-semibold text-indigo-900 mb-4">7) Next steps that stick: baptism, Bible, belonging, blessing</h3>
                <p className="text-indigo-800 mb-4">
                  New believers need foundations more than fireworks:
                </p>
                <ul className="list-disc list-inside space-y-2 text-indigo-800 mb-4">
                  <li><strong>Baptism:</strong> explain its meaning clearly and invite publicly. Offer a short class and a conversation with a leader. Encourage students to invite family and friends.</li>
                  <li><strong>Bible:</strong> start with a simple reading plan (for example, 15 days in Mark). Pair with a friend and a leader. Share one question and one insight each day in a group thread.</li>
                  <li><strong>Belonging:</strong> place new believers into a small group quickly. Give the leader a heads-up to offer extra support.</li>
                  <li><strong>Blessing:</strong> invite new believers to serve soon in age-appropriate ways. Serving cements belonging and accelerates growth.</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                <h3 className="text-xl font-semibold text-pink-900 mb-4">8) Parent partnership in the disciple-making journey</h3>
                <p className="text-pink-800 mb-4">
                  Parents are your allies. Loop them in:
                </p>
                <ul className="list-disc list-inside space-y-2 text-pink-800 mb-4">
                  <li>When a student responds, reach out to parents (appropriately) with joy and next steps. Offer a brief guide for home conversations about faith and baptism.</li>
                  <li>Host parent prayer and info nights. Share the pathway, safety, and how to talk with teens about faith questions. Invite their stories and concerns.</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                <h3 className="text-xl font-semibold text-teal-900 mb-4">9) Pray like it depends on God, plan like it depends on you</h3>
                <p className="text-teal-800 mb-4">
                  Without prayer, evangelism becomes pressure. Without planning, passion fizzles. John Bevere's call to the fear of the Lord keeps our hearts tender: we share Christ because we revere God and love people, not to notch wins. Pray by name for friends. Set alarms to stop and pray daily for open doors and open hearts. Then plan faithfully: clear series, specific invites, trained leaders, ready next steps, scheduled follow-ups.
                </p>
              </div>

              <div className="mb-6 p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-semibold text-cyan-900 mb-4">10) Measure the right things and tell the right stories</h3>
                <p className="text-cyan-800 mb-4">
                  Attendance matters, but it's not the only barometer. Track next steps: first-time guests, gospel conversations, responses, baptisms, Scripture plans started, small group engagement, serving sign-ups. Review monthly with your team. Celebrate testimonies constantly—short, real, and God-centered. Stories teach your culture what you value.
                </p>
              </div>

              <div className="mb-6 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                <h3 className="text-xl font-semibold text-emerald-900 mb-4">11) Obstacles and how to overcome them</h3>
                <ul className="list-disc list-inside space-y-2 text-emerald-800 mb-4">
                  <li><strong>Fear:</strong> students worry about rejection. Coach them to share simply, ask good questions, and trust God with the outcome. Role-play common moments and replies.</li>
                  <li><strong>Apathy:</strong> refocus on the gospel's beauty. Invite students to ask God to break their hearts for their friends.</li>
                  <li><strong>Complexity:</strong> simplify your pathway and tools. Clarity beats cleverness. Repeat the basics.</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <h3 className="text-xl font-semibold text-amber-900 mb-4">12) A student leadership pipeline that multiplies</h3>
                <p className="text-amber-800 mb-4">
                  Move students from attenders to ambassadors:
                </p>
                <ul className="list-disc list-inside space-y-2 text-amber-800 mb-4">
                  <li><strong>Identify:</strong> who is faithful, available, teachable, and fruitful?</li>
                  <li><strong>Invest:</strong> meet monthly to train in prayer, character, gospel clarity, and relational skills.</li>
                  <li><strong>Involve:</strong> assign real responsibilities—hosting, follow-up calls, prayer team, outreach planning.</li>
                  <li><strong>Inspire:</strong> share vision, set reachable goals, and celebrate progress.</li>
                </ul>
                <p className="text-amber-800 mb-4">
                  Maxwell's Law of the Process will keep you patient; growth is daily, not in a day. Tony Evans will keep you anchored; the Word and Spirit do the heavy lifting. John Bevere will keep you holy; awe before God keeps your motives clean. Hold these together, and your ministry will not only gather—it will multiply.
                </p>
              </div>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Weekly Challenge (Week 5: Making New Disciples)</h3>
                <div className="space-y-3 text-orange-800">
                  <div>
                    <strong>Day 1: Prayer map</strong><br/>
                    Write the names of three students you're praying will meet Jesus. Pray for them daily this week. Send one encouraging, no-pressure message to each.
                  </div>
                  <div>
                    <strong>Day 2: Your story in three minutes</strong><br/>
                    Draft your testimony (before/Jesus/after). Practice it aloud twice. Share it with a leader or friend for feedback on clarity and compassion.
                  </div>
                  <div>
                    <strong>Day 3: Gospel tool</strong><br/>
                    Learn one simple gospel outline (e.g., a three-step tool). Share it once with a Christian friend to practice. Then ask God for an opportunity to share a piece of it with a seeking friend.
                  </div>
                  <div>
                    <strong>Day 4: Pathway draft</strong><br/>
                    Sketch your guest-to-disciple pathway on one page (48 hours, four weeks, first semester, first year). Share it with your pastor for refinement.
                  </div>
                  <div>
                    <strong>Day 5: Student multipliers</strong><br/>
                    Identify two students who could become evangelistic leaders. Invite each to coffee. Share vision, ask about their friends, and give them one simple goal for the next two weeks.
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deliverables to bring into the Conclusion</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Your one-page disciple-making pathway.</li>
                  <li>Names of three students you're praying for and any updates.</li>
                  <li>A written testimony (three minutes) and one gospel tool ready to use.</li>
                  <li>A short plan to launch or strengthen a student leadership cohort.</li>
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Conclusion</h3>
                <p className="text-gray-700">
                  As you reach the end of this five-week journey, pause and look back at how far God has brought you. You listened for His whisper, clarified who you're becoming, turned vision into weekly rhythms, embraced guardrails that keep you healthy and honest, and fixed your eyes on making new disciples. This isn't just a course finished—it's a calling formed. What you've learned is not theory; it's a way of life that can reshape students, families, and a church for years to come. Take a deep breath, thank God for His grace, and get ready to walk forward with clarity, courage, and a servant's heart.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


