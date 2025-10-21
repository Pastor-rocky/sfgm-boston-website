import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import sfgmLogo from "@/assets/sfgm-logo-new-blue.png";

export default function StatementOfFaith() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faithSections = [
    {
      number: "1",
      title: "VERBAL INSPIRATION OF THE BIBLE",
      content: `We affirm the plenary, verbal inspiration and infallibility of the Holy Scriptures; the Bible is the authoritative Word of God in all matters of faith and practice. (2 Timothy 3:16; 2 Peter 1:21; Psalm 19:7–11)`,
      icon: "fas fa-book-open"
    },
    {
      number: "2",
      title: "ONE GOD IN THREE PERSONS",
      content: `We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit—the Holy Trinity. (Deuteronomy 6:4; Matthew 28:19; 2 Corinthians 13:14)`,
      icon: "fas fa-cloud"
    },
    {
      number: "3", 
      title: "JESUS CHRIST",
      content: `Jesus Christ is the eternal Son of God; He was conceived by the Holy Spirit, born of the Virgin Mary, lived a sinless life, was crucified for our sins, buried, rose bodily on the third day, and ascended to the right hand of the Father where He ever lives to intercede for us. (John 1:1,14; Luke 1:35; 1 Corinthians 15:3–4; Acts 1:9; Hebrews 7:25)`,
      icon: "fas fa-cross"
    },
    {
      number: "4",
      title: "SIN AND REPENTANCE",
      content: `All have sinned and fall short of God’s glory. God commands all people everywhere to repent—turning from sin to God with godly sorrow and faith in Christ—for the forgiveness of sins. (Romans 3:23; Acts 17:30; 2 Corinthians 7:10; 1 John 1:9)`,
      icon: "fas fa-exclamation-triangle"
    },
    {
      number: "5",
      title: "JUSTIFICATION, REGENERATION, AND NEW BIRTH", 
      content: `We are justified by grace through faith on the basis of Christ’s shed blood; by the Spirit we are regenerated and made new—born again—unto a living hope. Salvation is God’s gift, not of works. (Romans 5:1,9; John 3:3–7; Titus 3:5; Ephesians 2:8–9)`,
      icon: "fas fa-heart"
    },
    {
      number: "6",
      title: "SANCTIFICATION",
      content: `Sanctification is a definite, subsequent work of grace in the believer’s life, accomplished by the blood of Christ, the truth of God’s Word, and the indwelling Holy Spirit—setting us apart unto God and enabling holy living. (John 17:17; 1 Thessalonians 4:3; 1 Thessalonians 5:23; Hebrews 13:12)`,
      icon: "fas fa-dove"
    },
    {
      number: "7",
      title: "HOLINESS",
      content: `Holiness is God’s standard for His people. We are called to live lives of purity, love, and obedience, walking in the Spirit and bearing His fruit. (Hebrews 12:14; 1 Peter 1:15–16; Galatians 5:22–25)`,
      icon: "fas fa-praying-hands"
    },
    {
      number: "8",
      title: "BAPTISM WITH THE HOLY SPIRIT",
      content: `We believe in the baptism with the Holy Spirit as a distinct and subsequent enduement of power for service, given to believers who ask in faith. (Acts 1:8; Acts 2:4; Acts 8:14–17; Acts 10:44–46; Acts 19:1–6)`,
      icon: "fas fa-fire"
    },
    {
      number: "9",
      title: "SPEAKING WITH OTHER TONGUES",
      content: `We believe in speaking with other tongues as the Spirit gives utterance, as in the apostolic church. (Acts 2:4; Acts 10:46; Acts 19:6; 1 Corinthians 14:2,39)`,
      icon: "fas fa-language"
    },
    {
      number: "10",
      title: "WATER BAPTISM BY IMMERSION",
      content: `We practice water baptism by immersion for those who repent and believe in Christ, in obedience to His command—administered in the name of the Father and of the Son and of the Holy Spirit. (Matthew 28:19; Acts 2:38; Romans 6:3–4)`,
      icon: "fas fa-water"
    },
    {
      number: "11",
      title: "DIVINE HEALING",
      content: `Divine healing is provided for all in the atonement of Christ and may be appropriated by faith and prayer. (Isaiah 53:4–5; Matthew 8:16–17; 1 Peter 2:24; James 5:14–15)`,
      icon: "fas fa-hands-healing"
    },
    {
      number: "12",
      title: "THE LORD’S SUPPER (HOLY COMMUNION)",
      content: `We observe the Lord’s Supper in remembrance of Christ’s sacrifice and in proclamation of His death until He comes again. (Luke 22:19–20; 1 Corinthians 11:23–26)`,
      icon: "fas fa-bread-slice"
    },
    {
      number: "13",
      title: "THE PREMILLENNIAL COMING OF JESUS – THE RAPTURE",
      content: `We believe in the premillennial return of Jesus Christ: first, the resurrection of the righteous dead and the catching away of the living saints to meet the Lord in the air. (1 Thessalonians 4:16–17; 1 Corinthians 15:51–52)`,
      icon: "fas fa-cloud-arrow-up"
    },
    {
      number: "14",
      title: "THE PREMILLENNIAL REIGN OF CHRIST – THE KINGDOM",
      content: `Second, Jesus will return to reign upon the earth for a thousand years, fulfilling God’s promises to Israel and the nations. (Revelation 20:1–6; Isaiah 11:1–10)`,
      icon: "fas fa-crown"
    },
    {
      number: "15",
      title: "RESURRECTION AND ETERNAL DESTINIES",
      content: `There will be a bodily resurrection of the dead: the righteous to eternal life and the wicked to eternal punishment. (John 5:28–29; Daniel 12:2; Matthew 25:46; Revelation 20:11–15)`,
      icon: "fas fa-infinity"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <img 
                src={sfgmLogo} 
                alt="SFGM Boston Logo" 
                className="w-24 h-24 md:w-32 md:h-32 mb-6 object-contain"
              />
              <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 drop-shadow-2xl">
                Statement of Faith
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto">
                Official Declaration of Faith - Soldiers For God Ministries
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <p className="text-lg leading-relaxed text-center">
                <i className="fas fa-scroll text-amber-300 mr-3 text-xl"></i>
                "Soldiers For God Ministries believes the whole Bible to be completely and equally inspired and that it is the written Word of God. SFGM has adopted the following Declaration of Faith as its standard and official expression of its doctrine."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Faith Articles */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          {faithSections.map((section, index) => (
            <Card key={index} className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white shadow-lg">
                      <i className={`${section.icon} text-xl`}></i>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-2xl font-bold text-blue-700">
                        {section.number}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                        {section.title}
                      </h2>
                    </div>
                    
                    <div className="text-gray-700 leading-relaxed text-lg">
                      {section.content}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Closing Statement */}
        <Card className="mt-12 shadow-2xl border-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <i className="fas fa-bible text-4xl text-amber-300 mb-4"></i>
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Foundation</h2>
            <p className="text-xl mb-6 max-w-3xl mx-auto">
              These fundamental beliefs guide our ministry and shape our understanding of God's Word. 
              We stand firmly on these biblical truths as we serve the body of Christ.
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block">
              <p className="text-blue-200 italic">
                "All Scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness" - 2 Timothy 3:16 (KJV)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}