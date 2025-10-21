# Beautiful Audio Player Template Documentation

## Overview
This template provides a stunning, professional layout for audiobook and text content pages with beautiful formatting, color-coded sections, and engaging visual elements.

---

## 🚀 **QUICK START - Essential Tools**

### **PDF Text Extractor** (Most Important Tool!)
To extract text from any PDF chapter:
```bash
node extract-pdf.cjs "path/to/your-chapter.pdf"
```
This will:
- Extract all text content from the PDF
- Save it as `_extracted.txt` file
- Display page count and character statistics
- Work with any encoded PDF format

**Dependencies:** `npm install pdf-parse` (already installed in this project)

**Location:** `/extract-pdf.cjs` in project root

---

## Template Components

### 1. AudioPlayerTemplate (`audio-player-template.tsx`)
The main layout component that provides:
- **Audiobook player** with cover image integration
- **Professional audio controls** (play, pause, skip, volume, speed)
- **Progress tracking** and save/load functionality
- **Responsive layout** with audio player on left, content on right
- **Beautiful gradient background** (purple to blue to indigo)

#### Usage:
```tsx
import AudioPlayerTemplate from '@/components/audio-player-template';

<AudioPlayerTemplate
  title="Chapter Title"
  subtitle="Chapter X 🐋"
  audioUrl="/path/to/audio.mp3"
  coverImageUrl="/path/to/cover.jpg"
  coverImageAlt="Book Cover"
>
  {/* Your formatted content goes here */}
</AudioPlayerTemplate>
```

### 2. AudioPlayerTextTemplate (`audio-player-text-template.tsx`)
Provides beautiful text formatting with:
- **Color-coded sections** (blue, green, purple, red, orange, yellow, gray)
- **Scripture quotes** with colored borders
- **Highlighted text** components
- **Grid layouts** for lists and comparisons
- **Warning/info boxes**
- **Professional typography**

## Beautiful Formatting Components

### Section Containers
```tsx
import { BlueSection, GreenSection, PurpleSection, RedSection, OrangeSection, YellowSection, GraySection } from '@/components/audio-player-text-template';

<BlueSection title="🔄 Section Title">
  <p>Your content here...</p>
</BlueSection>
```

### Scripture Quotes
```tsx
import { ScriptureQuote } from '@/components/audio-player-text-template';

<ScriptureQuote reference="John 3:16 NLT" color="blue">
  <p>"For God so loved the world that he gave his one and only Son..."</p>
</ScriptureQuote>
```

### Highlighted Text
```tsx
import { HighlightText } from '@/components/audio-player-text-template';

<p>This is <HighlightText color="green">important text</HighlightText> that stands out.</p>
```

### Lists
```tsx
import { BulletList, BulletItem } from '@/components/audio-player-text-template';

<BulletList>
  <BulletItem>First item</BulletItem>
  <BulletItem>Second item</BulletItem>
  <BulletItem>Third item</BulletItem>
</BulletList>
```

### Grid Layouts
```tsx
import { TwoColumnGrid, ComparisonCard } from '@/components/audio-player-text-template';

<TwoColumnGrid>
  <ComparisonCard>
    <p className="font-semibold text-blue-300 mb-1">Title 1</p>
    <p className="text-sm">Content here...</p>
  </ComparisonCard>
  <ComparisonCard>
    <p className="font-semibold text-blue-300 mb-1">Title 2</p>
    <p className="text-sm">Content here...</p>
  </ComparisonCard>
</TwoColumnGrid>
```

### Warning/Info Boxes
```tsx
import { WarningBox, InfoBox } from '@/components/audio-player-text-template';

<WarningBox title="⚠️ Warning">
  <p>Important warning message here...</p>
</WarningBox>

<InfoBox title="💡 Information">
  <p>Helpful information here...</p>
</InfoBox>
```

### Emoji Sizing
To make emojis larger and more prominent in headers or player titles:

```tsx
{/* In audio player header - larger emojis */}
<h3 className="text-white text-2xl font-bold">
  <span className="text-3xl align-text-top mr-1">🎶</span> 
  <span className="align-middle">Acts in Action</span>
</h3>
<p className="text-white/90 text-xl font-semibold">
  <span className="align-middle">Chapter 2</span> 
  <span className="text-2xl align-text-top ml-1">🎬</span>
</p>

{/* In section titles - medium emojis */}
<SectionHeading>💡 WHAT THEY FACED</SectionHeading>

{/* For even larger emojis, use text-4xl or text-5xl */}
```

**Key Techniques:**
- Use `text-3xl` or `text-4xl` for larger emoji size
- Use `align-text-top` to align emojis at the top of the text line
- Use `align-middle` for regular text to align with emojis
- Add `mr-1` or `ml-1` for spacing between emoji and text

## Complete Example

Here's how to create a beautifully formatted chapter page:

```tsx
import React from 'react';
import AudioPlayerTemplate from '@/components/audio-player-template';
import { 
  AudioPlayerTextTemplate,
  SectionHeading,
  BlueSection,
  GreenSection,
  PurpleSection,
  ScriptureQuote,
  BulletList,
  BulletItem,
  HighlightText,
  CenterText
} from '@/components/audio-player-text-template';

const ExampleChapter = () => {
  return (
    <AudioPlayerTemplate
      title="Chapter 1: Example Title"
      subtitle="Chapter 1 🐋"
      audioUrl="/audio/chapter1.mp3"
      coverImageUrl="/images/book-cover.jpg"
      coverImageAlt="Book Cover"
    >
      <AudioPlayerTextTemplate title="Chapter 1" subtitle="Example Title">
        <SectionHeading>Chapter 1: Example Title</SectionHeading>
        
        <BlueSection title="💡 Introduction">
          <p>This is an introduction to the chapter with beautiful formatting.</p>
        </BlueSection>

        <ScriptureQuote reference="John 3:16 NLT" color="blue">
          <p>"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."</p>
        </ScriptureQuote>

        <GreenSection title="📖 Key Points">
          <BulletList>
            <BulletItem>First important point</BulletItem>
            <BulletItem>Second important point</BulletItem>
            <BulletItem>Third important point</BulletItem>
          </BulletList>
        </GreenSection>

        <PurpleSection title="🎯 Conclusion">
          <p>This is the conclusion with <HighlightText color="purple">highlighted important text</HighlightText>.</p>
          
          <CenterText className="text-center text-lg font-semibold text-purple-300">
            Remember: This is the key takeaway!
          </CenterText>
        </PurpleSection>
      </AudioPlayerTextTemplate>
    </AudioPlayerTemplate>
  );
};

export default ExampleChapter;
```

## Color Scheme

The template uses a consistent color scheme:
- **Blue**: Information, introductions, general content
- **Green**: Positive messages, success, growth
- **Purple**: Spiritual content, conclusions, key points
- **Red**: Warnings, important alerts, critical information
- **Orange**: Calls to action, motivational content
- **Yellow**: Highlights, special emphasis
- **Gray**: Neutral content, explanations

## Features

### Audio Player Features:
- ✅ Play/pause controls
- ✅ 15-second skip forward/backward
- ✅ Volume control with mute
- ✅ Playback speed adjustment (0.5x to 2x)
- ✅ Progress bar with seeking
- ✅ Save/load progress functionality
- ✅ Download audio option
- ✅ Cover image integration
- ✅ Responsive design

### Text Formatting Features:
- ✅ Color-coded sections
- ✅ Scripture quotes with references
- ✅ Highlighted text components
- ✅ Bullet lists and numbered lists
- ✅ Grid layouts for comparisons
- ✅ Warning and info boxes
- ✅ Professional typography
- ✅ Responsive design
- ✅ Consistent spacing and margins

## Best Practices

1. **Use appropriate colors** for different types of content
2. **Include scripture references** with all quotes
3. **Use highlighting sparingly** for maximum impact
4. **Organize content** into logical sections
5. **Maintain consistent spacing** between sections
6. **Test on different screen sizes** for responsiveness

---

## 🎨 **COMPLETE CHAPTER FORMATTING GUIDE**

### **Fire Starter Chapter 5 - Perfect Example**

This section documents the **exact formatting style** used successfully in Fire Starter chapters. Follow this pattern for all future chapters to ensure visual consistency and professional appearance.

### **1. Audio Player Card Specifications**

**Exact Styling:**
```tsx
<Card className="mb-8 bg-gradient-to-r from-orange-600 to-red-600 border-none shadow-2xl">
  <CardContent className="p-6">  {/* NOTE: p-6, NOT p-8 */}
    <div className="flex items-start gap-4 mb-6">  {/* NOTE: items-start, NOT items-center */}
      <img
        src="/fire-starter-cover.jpg"
        alt="Fire Starter"
        className="w-24 h-auto rounded shadow-lg"  {/* NOTE: w-24, NOT w-32 */}
      />
      <div className="flex-1">
        <h3 className="text-white text-2xl font-bold mb-1">
          <span className="text-3xl align-text-top mr-1">🔥</span>  {/* NOTE: text-3xl, NOT text-4xl */}
          <span className="align-middle">Fire Starter</span>
        </h3>
        <p className="text-white/90 text-xl font-semibold">
          <span className="align-middle">Chapter 5</span>
          <span className="text-2xl align-text-top ml-1">🔥</span>  {/* NOTE: text-2xl */}
        </p>
      </div>
    </div>
```

**Critical Details:**
- ✅ Use `p-6` padding (not p-8)
- ✅ Use `items-start` alignment (not items-center)
- ✅ Cover image is `w-24` (not w-32)
- ✅ Gap is `gap-4` (not gap-6)
- ✅ Emoji sizes: `text-3xl` and `text-2xl` (not text-4xl)
- ✅ Use `align-text-top` and `align-middle` for emoji/text alignment

### **2. Audio Controls Specifications**

**Exact Button Styling:**
```tsx
{/* Main Controls */}
<div className="flex items-center justify-center gap-4 mb-4">
  <Button
    onClick={() => skip(-15)}
    size="sm"
    variant="ghost"
    className="text-white hover:bg-white/20"
  >
    <SkipBack className="h-5 w-5" />
    <span className="ml-1 text-xs">15</span>  {/* Show "15" text */}
  </Button>
  <Button
    onClick={togglePlayPause}
    size="lg"
    className="bg-white text-orange-600 hover:bg-white/90 rounded-full h-14 w-14"
  >
    {isPlaying ? (
      <Pause className="h-6 w-6" />
    ) : (
      <Play className="h-6 w-6 ml-1" />
    )}
  </Button>
  <Button
    onClick={() => skip(15)}
    size="sm"
    variant="ghost"
    className="text-white hover:bg-white/20"
  >
    <span className="mr-1 text-xs">15</span>  {/* Show "15" text */}
    <SkipForward className="h-5 w-5" />
  </Button>
</div>

{/* Volume Control */}
<div className="flex items-center gap-3 mt-4">
  <Volume2 className="h-4 w-4 text-white" />
  <Slider
    value={[volume]}
    max={1}
    step={0.01}  {/* NOTE: 0.01 for smooth control, NOT 0.1 */}
    onValueChange={handleVolumeChange}
    className="w-24 cursor-pointer"
  />
</div>
```

### **3. Scripture Formatting with Blockquotes**

**CRITICAL: Use blockquotes, NOT ScriptureQuote components!**

```tsx
<div className="mb-6">
  <p className="font-semibold mb-2 text-red-900">Mark 9:47–50 (KJV)</p>
  <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
    <p>
      "And if thine eye offend thee, pluck it out: it is better for thee to enter 
      into the kingdom of God with one eye, than having two eyes to be cast into 
      hell fire..."
    </p>
  </blockquote>
</div>
```

**Border Colors by Section:**
- RedSection: `border-red-400`
- BlueSection: `border-blue-400`
- GreenSection: `border-green-400`
- PurpleSection: `border-purple-400`
- YellowSection: `border-yellow-400`

### **4. InfoBox Usage (Cards Within Cards!)**

**When to use InfoBox:**
- Key insights that need to stand out
- Important theological points
- Definitions and explanations
- Positive messages and encouragement

**Example:**
```tsx
<InfoBox>
  <p className="font-semibold mb-2">💡 The Greek Word for Trials</p>
  <Paragraph>
    The Greek word for trials here is <em>peirasmos</em>. Thayer's definitions 
    include: trial, proving integrity, virtue, constancy...
  </Paragraph>
</InfoBox>

<InfoBox>
  <p className="font-semibold mb-2">✨ God's Eyes Are Fixed on You</p>
  <Paragraph>
    This is especially meaningful for those in the hottest part of the flame 
    right now. God's eyes are fixed on those He is refining...
  </Paragraph>
</InfoBox>
```

### **5. WarningBox Usage (Highlighted Warnings!)**

**When to use WarningBox:**
- Important warnings or cautions
- Common mistakes to avoid
- Critical spiritual principles
- Contrasts and corrections

**Example:**
```tsx
<WarningBox>
  <p className="font-semibold mb-2">⚠️ Don't Bail When Things Get Hard</p>
  <Paragraph>
    Too many so-called Christians bless the Lord when all is well, but bail 
    when things get hard, and that's why the fire burns out in their lives.
  </Paragraph>
</WarningBox>

<WarningBox>
  <p className="font-semibold mb-2">⚖️ Test vs. Discipline - Know the Difference</p>
  <Paragraph>
    You might say, I've been tested too much. Keep believing and waiting—God 
    will get you through. But make sure it's a test and not discipline...
  </Paragraph>
</WarningBox>
```

### **6. BulletList for Key Points**

**Use BulletLists for:**
- Multiple related points
- Steps or phases
- Lists of names, meanings, or definitions
- Organized content

**Example:**
```tsx
<BulletList>
  <BulletItem>
    <strong>First</strong>, he uses a screen-like tool to skim away dross 
    (impurities) as heat brings them to the surface, setting apart what is 
    bad from what is good...
  </BulletItem>
  <BulletItem>
    <strong>Second</strong>, the refiner sits to make sure the gold or 
    silver isn't ruined.
  </BulletItem>
</BulletList>

<BulletList>
  <BulletItem><strong>Hananiah</strong> means "favor"</BulletItem>
  <BulletItem><strong>Mishael</strong> means "like God"</BulletItem>
  <BulletItem><strong>Azariah</strong> means "the Lord helps"</BulletItem>
</BulletList>
```

### **7. Section Structure Pattern**

**Each section should follow this pattern:**

```tsx
<RedSection>  {/* or BlueSection, GreenSection, etc. */}
  <h2 className="text-2xl font-bold mb-6 text-red-900">
    🔥 SECTION TITLE IN ALL CAPS
  </h2>
  
  {/* Scripture with blockquote */}
  <div className="mb-6">
    <p className="font-semibold mb-2 text-red-900">Reference</p>
    <blockquote className="border-l-4 border-red-400 pl-4 mb-4 italic text-gray-800">
      <p>"Scripture text here..."</p>
    </blockquote>
  </div>
  
  {/* Regular paragraphs */}
  <Paragraph>
    Regular content with <strong>bold emphasis</strong> where needed.
  </Paragraph>
  
  {/* InfoBox for key insights */}
  <InfoBox>
    <p className="font-semibold mb-2">💡 Title</p>
    <Paragraph>Key insight here...</Paragraph>
  </InfoBox>
  
  {/* WarningBox for important warnings */}
  <WarningBox>
    <p className="font-semibold mb-2">⚠️ Warning Title</p>
    <Paragraph>Warning content here...</Paragraph>
  </WarningBox>
  
  {/* BulletList for organized points */}
  <BulletList>
    <BulletItem>Point 1</BulletItem>
    <BulletItem>Point 2</BulletItem>
  </BulletList>
</RedSection>
```

### **8. No Navigation Buttons**

**IMPORTANT:** Do NOT add navigation buttons at the bottom of chapter pages!

❌ **DO NOT INCLUDE:**
```tsx
{/* Navigation - DO NOT ADD THIS */}
<div className="flex justify-between mt-12 pt-6 border-t-2 border-orange-200">
  <Link href="/chapter-4"><Button>← Chapter 4</Button></Link>
  <Link href="/course/2"><Button>Back to Course</Button></Link>
  <Button disabled>Chapter 6 →</Button>
</div>
```

✅ **Instead:** Just end with the last section, like:
```tsx
            </YellowSection>

            </div>  {/* Close prose div */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

### **9. Complete Chapter 5 Example**

**Sections Used in Chapter 5:**
1. **RedSection**: 🔥 CHAPTER 5: TESTED BY FIRE
   - Opening scripture (Mark 9:47–50)
   - Why are believers tested? (1 Peter 1:6–7)
   - InfoBox: The Greek Word for Trials
   - WarningBox: Don't Bail When Things Get Hard
   - Scripture: Luke 8:13

2. **BlueSection**: 🪙 THE REFINER'S FIRE
   - Scripture: Malachi 3:2–3
   - BulletList: Two things the refiner does
   - Scripture: 1 Corinthians 10:12–13
   - InfoBox: God Wants You to Succeed
   - Scripture: Isaiah 43:1–2
   - WarningBox: Test vs. Discipline

3. **GreenSection**: 👨‍🏭 THE SILVERSMITH STORY
   - Story about the silversmith
   - InfoBox: God's Eyes Are Fixed on You

4. **PurpleSection**: 🔥 THE FIERY FURNACE
   - Scripture: Daniel 3:16–18
   - Scripture: Daniel 3:24–26
   - InfoBox: The Meaning of Their Names (with BulletList)
   - WarningBox: Your Setback Might Be a Set-Up

5. **RedSection**: 💔 A PERSONAL TESTIMONY OF FIRE
   - Author's testimony about his mother
   - InfoBox: From Anger to Peace
   - InfoBox: Test into Testimony
   - WarningBox: Lies About Following Christ

6. **YellowSection**: 💎 THE SILVER FIRE - A MOTHER'S DREAM
   - Mother's dream story
   - InfoBox: Praise God, She Made Heaven
   - InfoBox: Final Word from John Maxwell

### **10. Visual Element Summary**

**Chapter 5 includes:**
- ✅ **7 Scripture Blockquotes** with colored borders
- ✅ **8 InfoBoxes** with light backgrounds
- ✅ **4 WarningBoxes** with warning backgrounds
- ✅ **2 BulletLists** for organized content
- ✅ **6 Color-Coded Sections** (Red, Blue, Green, Purple, Red, Yellow)
- ✅ **Bold headings** with emojis
- ✅ **Italic emphasis** for scripture
- ✅ **Strong tags** for key phrases

**This creates the "cards within cards" visual hierarchy that makes content stand out!**

---

## Migration from Old Template

To update existing pages:
1. Replace the old template imports with the new ones
2. Wrap your content with `AudioPlayerTemplate`
3. Use the new formatting components instead of plain HTML
4. Apply color-coded sections for better organization
5. Add scripture quotes with proper formatting
6. Use highlighting for key phrases

This template ensures all course content has a consistent, professional, and engaging appearance that enhances the learning experience.

---

## 🔧 **PDF TEXT EXTRACTOR TOOL**

### **Complete PDF Extractor Code (`extract-pdf.cjs`)**

This tool is essential for converting PDF textbook chapters into formatted course content.

```javascript
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function extractPDFText(pdfPath) {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    return {
      text: data.text,
      numPages: data.numpages,
      info: data.info
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return null;
  }
}

// Main execution
const pdfPath = process.argv[2];

if (!pdfPath) {
  console.error('Please provide a PDF file path as an argument');
  console.error('Usage: node extract-pdf.cjs <path-to-pdf>');
  process.exit(1);
}

const fullPath = path.resolve(pdfPath);

if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

console.log(`Extracting text from: ${fullPath}\n`);
console.log('='.repeat(80));

extractPDFText(fullPath).then(result => {
  if (result && result.text) {
    console.log(result.text);
    console.log('\n' + '='.repeat(80));
    console.log(`\nExtraction complete!`);
    console.log(`Pages: ${result.numPages}`);
    console.log(`Total characters: ${result.text.length}`);
    
    // Save to file
    const outputPath = fullPath.replace('.pdf', '_extracted.txt');
    fs.writeFileSync(outputPath, result.text, 'utf8');
    console.log(`Text saved to: ${outputPath}`);
  } else {
    console.error('Failed to extract text from PDF');
    process.exit(1);
  }
}).catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
```

### **How to Use the PDF Extractor:**

**Step 1: Install Dependencies (if not already installed)**
```bash
npm install pdf-parse
```

**Step 2: Run the Extractor**
```bash
node extract-pdf.cjs "path/to/your-chapter.pdf"
```

**Example:**
```bash
node extract-pdf.cjs "SFGM Orlando Courses/(3) fire starter 🔥Course/Text-Book/5/Chapter 5 Tested by Fire.pdf"
```

**Output:**
```
Extracting text from: /path/to/Chapter 5 Tested by Fire.pdf
================================================================================
[Full chapter text displayed here...]
================================================================================

Extraction complete!
Pages: 6
Total characters: 13990
Text saved to: /path/to/Chapter 5 Tested by Fire_extracted.txt
```

**Step 3: Use the Extracted Text**
The tool will:
- Display the text in the console
- Save it as `_extracted.txt` file (e.g., `Chapter 5 Tested by Fire_extracted.txt`)
- Show page count and character count

**Step 4: Format with Beautiful Template**
Copy the extracted text and format it using the Beautiful Audio Player Template components (sections, quotes, highlights, etc.).

### **PDF Extractor Features:**
- ✅ Handles encoded PDFs automatically
- ✅ Extracts all text content accurately
- ✅ Saves output to `.txt` file for easy access
- ✅ Works with any PDF file format
- ✅ Provides statistics (pages, characters)
- ✅ Console output for immediate viewing
- ✅ Error handling for missing files
- ✅ Preserves text structure and formatting

### **Common Use Cases:**
1. **Extracting Chapter Content**: Convert PDF chapters to formatted course pages
2. **Quiz Questions**: Extract questions from quiz PDF files
3. **Scripture References**: Get Bible verses from PDF documents
4. **Study Materials**: Process any PDF textbook content
5. **Course Materials**: Any PDF-based educational content

### **Workflow Example:**
```bash
# 1. Extract the PDF
node extract-pdf.cjs "path/to/Chapter-5.pdf"

# 2. Open the generated _extracted.txt file
# 3. Copy the text
# 4. Format it in your course page using template components
# 5. Add color-coded sections, scripture quotes, highlights
```

### **Success Example - Fire Starter Chapter 5:**
- **Input**: `Chapter 5 Tested by Fire.pdf` (45KB, encoded binary)
- **Command**: `node extract-pdf.cjs "path/to/Chapter 5 Tested by Fire.pdf"`
- **Output**: 13,990 characters extracted perfectly
- **Result**: Beautifully formatted page with 9 color-coded sections
- **Time Saved**: No manual copying or typing needed!

---


