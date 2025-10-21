import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, ArrowLeft } from "lucide-react";

export default function YouthMinistryCourseCh2() {
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
                <p className="text-white/90 text-xl">Chapter 2: Requirements</p>
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
              src="/uploads/textbook-audio/youth-ministry-ch2.mp3"
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
              <h2 className="text-2xl font-bold mb-6 text-blue-900">Chapter 2: Requirements</h2>
              
              <p className="text-gray-700 mb-6">
                Calling answers why you are drawn to serve students. Requirements answer who you must become and what you must learn to serve them well. If calling is a seed, requirements are the soil and the gardener's care—the conditions under which that seed can grow into a sturdy, fruitful tree. In youth ministry, your presence will often speak louder than your programs. Your character will preach before your sermon starts. Your spiritual life will overflow into the room, for good or for ill. This chapter clarifies the inner life and core competencies that form a trustworthy youth minister.
              </p>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">1) Character before competency</h3>
                <p className="text-orange-800 mb-4">
                  The first requirement of spiritual leadership is a life that is "above reproach." Scripture paints a profile of sober-minded, faithful, self-controlled leaders whose homes, habits, and reputations align with their message (see 1 Timothy 3:1–7; Titus 1:5–9). That doesn't mean perfection; it means integrity—wholeness—so that who you are in private and who you are in public are the same person. "Guard your heart above all else, for it determines the course of your life" (Proverbs 4:23). You cannot shepherd students toward holiness if you are casual with your own. Purity, honesty, gentleness, and faithfulness are not electives; they are prerequisites.
                </p>
                <p className="text-orange-800 mb-4">Character shows up in the small choices:</p>
                <ul className="list-disc list-inside space-y-2 text-orange-800 mb-4">
                  <li>Truth-telling when it costs you.</li>
                  <li>Keeping confidences without hiding harm.</li>
                  <li>Owning mistakes without excuse-making.</li>
                  <li>Treating stress with prayer and rest rather than with secret escapes.</li>
                  <li>Handling money with transparency and generosity.</li>
                </ul>
                <p className="text-orange-800 mb-4">
                  John Bevere reminds us that the fear of the Lord is the beginning of wisdom. Awe purifies ambition and keeps us from playing games with sin. When you tremble at God's Word, you stop looking for loopholes and start looking for likeness to Christ. Confession and repentance are not punishments; they are the pathway back to joy and power. "Confess your sins to each other and pray for each other so that you may be healed" (James 5:16).
                </p>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">2) Spiritual vitality: live what you invite students into</h3>
                <p className="text-blue-800 mb-4">
                  The most essential ministry strategy is abiding in Christ. "Apart from me you can do nothing," Jesus says (John 15:5). Youth ministry requires energy, creativity, and patience, but none of these can substitute for a living connection with the Vine. Build an honest, sustainable rule of life—habits that keep you near Jesus:
                </p>
                <ul className="list-disc list-inside space-y-2 text-blue-800 mb-4">
                  <li><strong>Scripture:</strong> not only for teaching prep, but for feeding your soul. "Work hard so you can present yourself to God... one who correctly explains the word of truth" (2 Timothy 2:15).</li>
                  <li><strong>Prayer:</strong> adoration, confession, thanksgiving, and intercession. Keep a list of students and leaders and pray names, not just numbers.</li>
                  <li><strong>Sabbath and rest:</strong> receive God's gift of limits. "Come to me... and I will give you rest" (Matthew 11:28–29).</li>
                  <li><strong>Fasting:</strong> let hunger for God reorder lesser hungers.</li>
                  <li><strong>Community:</strong> spiritual friends and mentors who ask you real questions.</li>
                </ul>
                <p className="text-blue-800 mb-4">
                  Bevere's emphasis on holy reverence will guard your devotional life from becoming a ritual devoid of relationship. Reverence births obedience; obedience keeps the channel of fellowship clear.
                </p>
              </div>

              <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-green-900 mb-4">3) Relational credibility: trust is your first platform</h3>
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

              <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">4) Biblical and preaching competence: truth with clarity and grace</h3>
                <p className="text-purple-800 mb-4">
                  Youth workers handle Scripture in a way that is both faithful and accessible. Tony Evans emphasizes that our authority comes from God's Word empowered by the Spirit, not from our personalities. Aim for messages that are:
                </p>
                <ul className="list-disc list-inside space-y-2 text-purple-800 mb-4">
                  <li><strong>Text-driven:</strong> the main point of the passage becomes the main point of the message.</li>
                  <li><strong>Christ-centered:</strong> lead students to Jesus, not just to moral advice.</li>
                  <li><strong>Clear and concrete:</strong> one big idea, a few memorable handles, and specific next steps.</li>
                  <li><strong>Pastoral:</strong> speak to real questions students face (identity, anxiety, temptation, friendship, technology) with biblical wisdom and compassion.</li>
                </ul>
                <p className="text-purple-800 mb-4">
                  A simple pattern helps: Pray the text, explain the text, illustrate the text, apply the text. Let Scripture interpret students' lives, not the other way around. Shepherd, don't show off. "Preach the word of God. Be prepared, whether the time is favorable or not. Patiently correct, rebuke, and encourage" (2 Timothy 4:2).
                </p>
              </div>

              <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-semibold text-red-900 mb-4">5) Leadership and management: lift the lid</h3>
                <p className="text-red-800 mb-4">
                  Maxwell's Law of the Lid says your leadership capacity sets the ceiling of your ministry's impact. Youth ministry requires planning, prioritizing, and people development:
                </p>
                <ul className="list-disc list-inside space-y-2 text-red-800 mb-4">
                  <li><strong>Vision and priorities:</strong> define the win—disciples who know Jesus, belong to His people, and join His mission. Program your calendar to those outcomes, not to busyness.</li>
                  <li><strong>Systems:</strong> a simple follow-up pipeline for new students; a plan for small group placement; a clear pathway from first-time visitor to serving student.</li>
                  <li><strong>Teams:</strong> recruit, train, and empower volunteers. "Two people are better off than one" (Ecclesiastes 4:9–10). Build an inner circle that shares your values and complements your weaknesses.</li>
                  <li><strong>Communication:</strong> clear, multi-channel messaging to students, parents, and leaders. Over-communicate long before events.</li>
                  <li><strong>Stewardship:</strong> budget with integrity. Spend on disciple-making priorities. Track attendance and care contacts, not just for metrics but for shepherding.</li>
                </ul>
                <p className="text-red-800 mb-4">
                  The Law of Priorities reminds you that activity is not accomplishment. Do the first things first: prayer, people, preparation. The Law of the Inner Circle reminds you that those closest to you determine much of your potential—choose wisely.
                </p>
              </div>

              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">6) Emotional health and resilience: lead from overflow, not from exhaustion</h3>
                <p className="text-yellow-800 mb-4">
                  Ministry is joyful and weighty. You will carry stories of pain, walk with students through crisis, and absorb criticism. Unaddressed stress becomes a doorway to unwise coping. Build rhythms that sustain you: sleep, exercise, fun, spiritual friendship, and regular retreats. Normalize counseling and spiritual direction. Name what you're feeling and bring it to God and trusted people. "A cheerful heart is good medicine" (Proverbs 17:22), but that cheerfulness is not denial; it's the fruit of God's presence in an honest life.
                </p>
                <p className="text-yellow-800 mb-4">Keep special attention on moral integrity in three areas:</p>
                <ul className="list-disc list-inside space-y-2 text-yellow-800 mb-4">
                  <li><strong>Sexual purity:</strong> flee temptation, guard your digital life, and invite accountability. "Run from sexual sin!" (1 Corinthians 6:18).</li>
                  <li><strong>Financial integrity:</strong> receipts, transparency, and church-approved systems for purchases and reimbursements.</li>
                  <li><strong>Speech:</strong> no sarcasm that shames, no gossip that erodes trust, no promises you can't keep. "Let everything you say be good and helpful" (Ephesians 4:29).</li>
                </ul>
              </div>

              <div className="mb-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h3 className="text-xl font-semibold text-indigo-900 mb-4">7) Cultural wisdom and safety</h3>
                <p className="text-indigo-800 mb-4">
                  Students live in a digital world. Learn their platforms without trying to be a copy of them. Teach digital discipleship—wisdom about identity, comparison, and time stewardship. Prepare your team for trauma-informed care: how to listen, how to recognize when to refer, and how to report appropriately. Know your church's policies for background checks, reporting abuse, transportation, medical forms, and medication handling. Safety is discipleship—students cannot hear the gospel well in unsafe environments. "Be sure that everything is done properly and in order" (1 Corinthians 14:40).
                </p>
              </div>

              <div className="mb-6 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                <h3 className="text-xl font-semibold text-pink-900 mb-4">8) Alignment with the church and a learner's posture</h3>
                <p className="text-pink-800 mb-4">
                  Youth ministry is a ministry of the church, not a church within the church. Align your mission, teaching, and calendar with your leaders. Seek regular feedback. "Let the wise listen and become even wiser" (Proverbs 1:5). Teach students to love the whole church—multi-generational worship, service, and membership. You are preparing them not just for youth group, but for a lifetime with Jesus and His people.
                </p>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <h3 className="text-xl font-bold text-green-900 mb-4 text-center">The Order of Grace</h3>
                <p className="text-green-800 text-center mb-4">
                  Requirements can feel heavy until you remember the order of grace: Jesus invites you to abide, and then He empowers you to obey. The Spirit who calls you also forms you. Your job is not to manufacture holiness or competence, but to cooperate with God's forming work—daily, humbly, joyfully.
                </p>
                <p className="text-green-800 text-center font-bold">
                  Build the trellis, and the Vine will grow.
                </p>
              </div>

              <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Weekly Challenge (Week 2: Requirements)</h3>
                <div className="space-y-3 text-orange-800">
                  <div>
                    <strong>Day 1: Character and integrity audit</strong><br/>
                    In prayer, review 1 Timothy 3:1–7 and Titus 1:5–9. Journal honest reflections on where your life aligns and where it needs strengthening. Share one growth area with a mentor and ask for specific accountability for the next 30 days.
                  </div>
                  <div>
                    <strong>Day 2: Rule of life</strong><br/>
                    Draft a simple weekly rhythm for Scripture, prayer, Sabbath, community, exercise, and rest. Block it on your calendar. Share it with a friend who will check in weekly for a month.
                  </div>
                  <div>
                    <strong>Day 3: Safety and ethics plan</strong><br/>
                    Write a one-page safety plan that includes the two-adult rule, communication guidelines, transportation procedures, reporting protocol, and social media boundaries. Review it with your pastor.
                  </div>
                  <div>
                    <strong>Day 4: Leadership lab</strong><br/>
                    Identify two potential volunteer leaders. Schedule brief conversations to hear their stories, share vision, and invite them into specific roles. Draft a simple role description and a 60-day onboarding plan.
                  </div>
                  <div>
                    <strong>Day 5: Preaching practicum</strong><br/>
                    Choose a short passage. Craft one big idea, two supporting points, and one clear next step for students. Write a 600–800 word manuscript or detailed outline. Deliver an 8–10 minute talk to a trusted adult and ask for feedback on clarity, faithfulness, and relevance.
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deliverables to bring into Week 3</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>A one-page character growth plan and accountability partner's name.</li>
                  <li>Your weekly rule of life.</li>
                  <li>Your written safety and ethics plan.</li>
                  <li>Two role descriptions and onboarding plans for volunteers.</li>
                  <li>A sermon outline or manuscript with feedback notes.</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-100 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Week Preview (Week 3: Responsibilities)</h3>
                <p className="text-gray-700">
                  With calling clarified and requirements in view, we'll move into the everyday work of a youth minister. We'll map weekly rhythms and core responsibilities: preaching and teaching, small groups, pastoral care and follow-up, parent partnership, volunteer development, outreach and missions, and administration. You'll design a 90-day ministry rhythm that aligns with your church's mission and the discipleship outcomes you seek.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


