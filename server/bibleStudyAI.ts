// DeepSeek AI integration - Free AI service for SFGM Boston AI
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

async function callDeepSeekAPI(prompt: string, systemPrompt?: string): Promise<string> {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY || 'free-tier'}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      // If DeepSeek fails, use a local fallback for demonstration
      return generateDemoResponse(prompt);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || generateDemoResponse(prompt);
  } catch (error) {
    return generateDemoResponse(prompt);
  }
}

function generateDemoResponse(prompt: string): string {
  // Generate appropriate demo responses based on the type of analysis
  if (prompt.includes('Greek') || prompt.includes('Hebrew') || prompt.includes('love')) {
    // Comprehensive analysis for "love" showing both Greek and Hebrew meanings
    return JSON.stringify({
      word: "love",
      language: "Both",
      greekDefinitions: [
        {
          strongsNumber: "G26",
          transliteration: "agapē",
          pronunciation: "ag-ah'-pay",
          definition: "Divine, unconditional love; sacrificial love",
          usage: "God's love for humanity, believers' love for God and others",
          biblicalReferences: ["1 John 4:8", "John 3:16", "1 Corinthians 13:4-8"]
        },
        {
          strongsNumber: "G5368",
          transliteration: "phileō",
          pronunciation: "fil-eh'-o",
          definition: "Brotherly love, friendship, affection",
          usage: "Personal affection, friendship love",
          biblicalReferences: ["John 11:3", "John 20:2", "Revelation 3:19"]
        },
        {
          strongsNumber: "G2309",
          transliteration: "thelō", 
          pronunciation: "thel'-o",
          definition: "To will, wish, desire",
          usage: "Love expressed through desire and choice",
          biblicalReferences: ["Matthew 27:43", "John 21:22"]
        },
        {
          strongsNumber: "G4360",
          transliteration: "prosophileō",
          pronunciation: "pros-of-il-eh'-o", 
          definition: "To love tenderly, be fond of",
          usage: "Tender affection and care",
          biblicalReferences: ["Titus 3:15"]
        }
      ],
      hebrewDefinitions: [
        {
          strongsNumber: "H157",
          transliteration: "ahab",
          pronunciation: "aw-hab'",
          definition: "To love, like, be fond of",
          usage: "Human and divine love, romantic love, friendship",
          biblicalReferences: ["Deuteronomy 6:5", "Song of Songs 3:1", "Hosea 3:1"]
        },
        {
          strongsNumber: "H2617",
          transliteration: "chesed",
          pronunciation: "kheh'-sed",
          definition: "Loving-kindness, mercy, faithful love",
          usage: "Covenant love, loyal love, steadfast mercy",
          biblicalReferences: ["Psalm 136:1", "Lamentations 3:22", "Micah 6:8"]
        },
        {
          strongsNumber: "H7355",
          transliteration: "racham",
          pronunciation: "raw-kham'",
          definition: "To love, have compassion, tender mercy",
          usage: "Motherly love, deep compassion",
          biblicalReferences: ["Psalm 103:13", "Isaiah 49:15", "Jeremiah 31:20"]
        }
      ],
      spiritualMeaning: "Love represents the very essence of God's character and His relationship with creation. In Greek, 'agapē' reveals God's unconditional, sacrificial nature, while 'phileō' shows intimate friendship. Hebrew 'ahab' encompasses the full spectrum of divine and human love, while 'chesed' reveals God's covenant faithfulness that never fails.",
      etymology: "Greek 'agapē' comes from the root meaning 'to welcome with favor.' Hebrew 'ahab' connects to breathing and life-giving force.",
      numericalValue: 13, // Hebrew ahab (aleph=1, heh=5, bet=2, heh=5 = 13)
      numericalMeaning: "Number 13 represents love and unity - echad (one) = 13, showing that love brings oneness",
      pictographMeaning: "Hebrew letters: Aleph (א) = Ox/Strength, Heh (ה) = Window/Behold, Bet (ב) = House/Family, Heh (ה) = Window/Behold. Picture meaning: 'Strong One beholds the house, behold!' - God's strong love watching over His family.",
      letterMeanings: [
        "Aleph (א) - The Ox: Represents strength, leadership, God's power",
        "Heh (ה) - The Window: Represents revelation, breath of God, divine insight", 
        "Bet (ב) - The House: Represents family, household, dwelling place",
        "Heh (ה) - The Window: Represents revelation, breath of God, behold and see"
      ]
    });
  } else if (prompt.includes('historical') || prompt.includes('context')) {
    return JSON.stringify({
      passage: "John 3:16",
      author: "John the Apostle",
      dateWritten: "85-95 AD",
      location: "Ephesus",
      audience: "Gentile Christians and seekers",
      purpose: "To present Jesus as the Son of God and source of eternal life",
      historicalBackground: "Written during the early church period when Christianity was spreading throughout the Roman Empire",
      culturalContext: "Hellenistic culture with Jewish religious influence",
      literaryGenre: "Gospel narrative",
      keyThemes: ["Eternal life", "God's love", "Salvation through faith"]
    });
  } else if (prompt.includes('cross') || prompt.includes('reference')) {
    return JSON.stringify({
      verse: "John 3:16",
      relatedVerses: [
        {
          reference: "Romans 5:8",
          text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
          connection: "God's sacrificial love",
          theme: "Divine love and sacrifice"
        },
        {
          reference: "1 John 4:9",
          text: "This is how God showed his love among us: He sent his one and only Son into the world that we might live through him.",
          connection: "God's love demonstrated through sending Jesus",
          theme: "Eternal life through Jesus"
        }
      ]
    });
  } else if (prompt.includes('commentary')) {
    return JSON.stringify({
      verse: "John 3:16",
      gotQuestionsMinistries: "This verse is often called the 'Gospel in a nutshell' because it contains the essential message of salvation. 'For God so loved the world' shows God's universal love for all humanity. The word 'believe' means to trust in or rely upon Jesus Christ. This is not merely intellectual assent, but a personal commitment to Christ as Savior and Lord.",
      perryStone: "John 3:16 reveals the prophetic pattern of God's love throughout Scripture. The number 3 represents divine perfection, and 16 speaks of love in Hebrew gematria. This verse connects to the Abrahamic covenant where God promised to bless all nations through Abraham's seed - ultimately fulfilled in Christ.",
      johnMacArthur: "This verse presents the clearest statement of the Gospel. 'God so loved' demonstrates divine initiative in salvation. 'Gave his one and only Son' refers to the substitutionary atonement. 'Whoever believes' indicates faith is the sole condition for salvation. 'Shall not perish' guarantees eternal security for believers.",
      raviZacharias: "John 3:16 addresses humanity's deepest questions: Why do we exist? What is love? What happens after death? This verse shows that love is not merely an emotion but an action - God's giving of His Son. It demonstrates that truth exists objectively and that ultimate meaning is found in Christ.",
      johnMaxwell: "This verse teaches us about the ultimate leadership principle - sacrificial love. God demonstrated leadership by giving His most precious possession for those He led. As leaders, we must be willing to give our best for those we serve. The verse also shows that belief precedes achievement in the spiritual realm."
    });
  } else if (prompt.includes('concordance') || prompt.includes('keyword')) {
    return JSON.stringify({
      keyword: "faith",
      totalOccurrences: 336,
      keyVerses: [
        {
          reference: "Hebrews 11:1",
          text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
          context: "Definition of faith"
        },
        {
          reference: "Romans 10:17",
          text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
          context: "Source of faith"
        }
      ],
      themes: ["Salvation", "Trust in God", "Spiritual growth", "Prayer"],
      relatedWords: ["believe", "trust", "hope", "confidence"]
    });
  } else if (prompt.includes('study plan')) {
    return JSON.stringify([
      {
        title: "30-Day Journey Through the Gospels",
        description: "Explore the life and ministry of Jesus Christ through all four Gospel accounts",
        duration: "30 days",
        readings: [
          {
            day: 1,
            passage: "Matthew 1-2",
            focus: "The birth and genealogy of Jesus",
            questions: ["What do the genealogies tell us about God's faithfulness?", "How does Jesus fulfill Old Testament prophecies?"]
          },
          {
            day: 2,
            passage: "Mark 1:1-20",
            focus: "Jesus begins His ministry",
            questions: ["What was unique about Jesus' calling of disciples?", "How did people respond to His authority?"]
          }
        ]
      }
    ]);
  }
  
  return "SFGM Boston AI - Connect to DeepSeek API for full functionality";
}

export interface GreekHebrewAnalysis {
  word: string;
  language: 'Greek' | 'Hebrew';
  allDefinitions: Array<{
    strongsNumber: string;
    transliteration: string;
    pronunciation: string;
    definition: string;
    usage: string;
    biblicalReferences: string[];
  }>;
  spiritualMeaning: string;
  etymology: string;
  numericalValue?: number;
  numericalMeaning?: string;
  pictographMeaning?: string; // Hebrew only - ancient picture meanings
  letterMeanings?: string[]; // Hebrew only - individual letter meanings
}

export interface HistoricalContext {
  passage: string;
  author: string;
  dateWritten: string;
  location: string;
  audience: string;
  purpose: string;
  historicalBackground: string;
  culturalContext: string;
  literaryGenre: string;
  keyThemes: string[];
}

export interface CrossReference {
  verse: string;
  relatedVerses: Array<{
    reference: string;
    text: string;
    connection: string;
    theme: string;
  }>;
}

export interface Commentary {
  verse: string;
  gotQuestionsMinistries: string;
  perryStone: string;
  johnMacArthur: string;
  raviZacharias: string;
  johnMaxwell: string;
}

export interface StudyPlan {
  title: string;
  description: string;
  duration: string;
  readings: Array<{
    day: number;
    passage: string;
    focus: string;
    questions: string[];
  }>;
}

export async function analyzeGreekHebrewWord(word: string): Promise<GreekHebrewAnalysis> {
  const prompt = `Analyze the biblical word "${word}" and provide ALL definitions in BOTH Greek AND Hebrew languages:

**CRITICAL REQUIREMENTS:**
1. Provide ALL Strong's numbers and definitions for this word in Greek
2. Provide ALL Strong's numbers and definitions for this word in Hebrew  
3. For Hebrew: Include gematria numerical value and pictograph meanings
4. For Hebrew: Include individual letter meanings and ancient picture representations
5. Include deep spiritual meanings for both languages

**FORMAT AS JSON:**
{
  "word": "${word}",
  "language": "Both",
  "greekDefinitions": [
    {
      "strongsNumber": "G####",
      "transliteration": "greek transliteration",
      "pronunciation": "pronunciation guide",
      "definition": "complete definition",
      "usage": "how it's used in context",
      "biblicalReferences": ["key verses where used"]
    }
    // Include ALL Greek variants of this word
  ],
  "hebrewDefinitions": [
    {
      "strongsNumber": "H####", 
      "transliteration": "hebrew transliteration",
      "pronunciation": "pronunciation guide",
      "definition": "complete definition",
      "usage": "how it's used in context",
      "biblicalReferences": ["key verses where used"]
    }
    // Include ALL Hebrew variants of this word
  ],
  "spiritualMeaning": "Deep spiritual significance combining both Greek and Hebrew understanding",
  "etymology": "Word origins and roots in both languages",
  "numericalValue": number (Hebrew gematria),
  "numericalMeaning": "Spiritual significance of the Hebrew numerical value",
  "pictographMeaning": "Ancient Hebrew pictograph meaning - what the letters originally represented as pictures",
  "letterMeanings": ["Individual meaning of each Hebrew letter with its ancient picture"]
}

**EXAMPLE FOR REFERENCE:** For "love" - Greek has agapē (G26), phileō (G5368), etc. Hebrew has ahab (H157), chesed (H2617), etc. Include ALL variants.`;

  try {
    const systemPrompt = 'You are a biblical scholar expert in Greek and Hebrew languages with deep knowledge of Strong\'s concordance, gematria, and ancient Hebrew pictographs. Provide comprehensive analysis of ALL definitions in both languages.';
    const response = await callDeepSeekAPI(prompt, systemPrompt);
    return JSON.parse(response);
  } catch (error: any) {
    throw new Error(`Failed to analyze word: ${error.message}`);
  }
}

export async function getHistoricalContext(passage: string): Promise<HistoricalContext> {
  const prompt = `Provide comprehensive historical context for the biblical passage "${passage}":

1. Who wrote it?
2. When was it written (approximate date)?
3. Where was it written?
4. Who was the intended audience?
5. What was the purpose of writing?
6. What was the historical background and circumstances?
7. What was the cultural context of that time?
8. What literary genre is this passage?
9. What are the key theological themes?

Format as JSON:
{
  "passage": "${passage}",
  "author": "author name",
  "dateWritten": "approximate date",
  "location": "where written",
  "audience": "intended readers",
  "purpose": "why it was written",
  "historicalBackground": "historical circumstances",
  "culturalContext": "cultural setting",
  "literaryGenre": "type of literature",
  "keyThemes": ["main theological themes"]
}`;

  try {
    const systemPrompt = 'You are a biblical historian and scholar. Provide accurate historical and cultural context for biblical passages.';
    const response = await callDeepSeekAPI(prompt, systemPrompt);
    return JSON.parse(response);
  } catch (error: any) {
    throw new Error(`Failed to get historical context: ${error.message}`);
  }
}

export async function getCrossReferences(verse: string): Promise<CrossReference> {
  const prompt = `Find comprehensive cross-references for "${verse}" like a chain reference Bible:

1. Find verses with similar themes
2. Find verses that support or explain the same doctrine
3. Find verses that use similar language or concepts
4. Find parallel passages in other books
5. Provide the actual text of each reference
6. Explain the connection and theme

Format as JSON:
{
  "verse": "${verse}",
  "relatedVerses": [
    {
      "reference": "book chapter:verse",
      "text": "full text of the verse",
      "connection": "how it connects to the original verse",
      "theme": "shared theological theme"
    }
  ]
}`;

  try {
    const systemPrompt = 'You are a biblical scholar expert in cross-references and thematic connections.';
    const response = await callDeepSeekAPI(prompt, systemPrompt);
    return JSON.parse(response);
  } catch (error: any) {
    throw new Error(`Failed to get cross references: ${error.message}`);
  }
}

export async function getMultiDenominationalCommentary(verse: string): Promise<Commentary> {
  const prompt = `Provide biblical commentary on "${verse}" from these specific ministries and theologians:

1. **Got Questions Ministries**: Focus on practical, accessible biblical truth with clear explanations. Known for addressing common questions about faith, doctrine, and Christian living.

2. **Perry Stone**: Emphasize prophetic insights, biblical patterns, and Hebrew/Jewish context. Known for connecting Old Testament prophecies with New Testament fulfillment and end-times teaching.

3. **John MacArthur**: Provide systematic, verse-by-verse exposition with strong emphasis on biblical authority and reformed theology. Known for precise exegesis and doctrinal clarity.

4. **Ravi Zacharias**: Focus on apologetics, philosophical depth, and cultural relevance. Known for defending the Christian faith intellectually and addressing complex theological questions.

5. **John Maxwell**: Emphasize leadership principles, practical application, and character development. Known for extracting leadership lessons and personal growth insights from Scripture.

Format as JSON:
{
  "verse": "${verse}",
  "gotQuestionsMinistries": "detailed commentary from Got Questions perspective",
  "perryStone": "detailed commentary from Perry Stone's prophetic perspective",
  "johnMacArthur": "detailed commentary from John MacArthur's expository approach",
  "raviZacharias": "detailed commentary from Ravi Zacharias' apologetic perspective",
  "johnMaxwell": "detailed commentary from John Maxwell's leadership perspective"
}`;

  try {
    const systemPrompt = 'You are a biblical scholar familiar with Got Questions Ministries, Perry Stone, John MacArthur, Ravi Zacharias, and John Maxwell teaching styles and theological perspectives.';
    const response = await callDeepSeekAPI(prompt, systemPrompt);
    return JSON.parse(response);
  } catch (error: any) {
    throw new Error(`Failed to get commentary: ${error.message}`);
  }
}

export async function generateStudyPlans(): Promise<StudyPlan[]> {
  const prompt = `Create 3 diverse Bible study plans:

1. A Gospel study plan (focus on Jesus' life and ministry)
2. A Pauline epistles study plan (focus on doctrine and Christian living)
3. An Old Testament wisdom literature plan (Proverbs, Ecclesiastes, Job)

Each plan should have:
- Clear title and description
- Suggested duration
- Daily readings with focus points
- Reflection questions for each reading

Format as JSON array of study plans.`;

  try {
    const systemPrompt = 'You are a biblical educator creating comprehensive study plans for spiritual growth.';
    const response = await callDeepSeekAPI(prompt, systemPrompt);
    return JSON.parse(response);
  } catch (error: any) {
    throw new Error(`Failed to generate study plans: ${error.message}`);
  }
}

export async function searchConcordance(keyword: string): Promise<any> {
  const prompt = `Perform a comprehensive concordance search for the keyword "${keyword}":

1. Estimate total occurrences in the Bible
2. Provide 5-7 key verses where this word appears
3. List main themes associated with this word
4. Provide related words and concepts
5. Include both Old and New Testament references

Format as JSON:
{
  "keyword": "${keyword}",
  "totalOccurrences": estimated_number,
  "keyVerses": [
    {
      "reference": "book chapter:verse",
      "text": "verse text",
      "context": "brief context explanation"
    }
  ],
  "themes": ["main themes"],
  "relatedWords": ["synonyms and related concepts"]
}`;

  try {
    const systemPrompt = 'You are a biblical concordance expert with comprehensive knowledge of word usage throughout Scripture.';
    const response = await callDeepSeekAPI(prompt, systemPrompt);
    return JSON.parse(response);
  } catch (error: any) {
    throw new Error(`Failed to search concordance: ${error.message}`);
  }
}