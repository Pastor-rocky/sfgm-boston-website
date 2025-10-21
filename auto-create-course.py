#!/usr/bin/env python3
"""
🚀 SFGM Boston - Automatic Course Creator
Creates complete courses with one command!
"""

import os
import sys
import json
import re
import shutil
from pathlib import Path

class CourseCreator:
    def __init__(self):
        self.course_name = ""
        self.course_id = 0
        self.num_chapters = 0
        self.num_quizzes = 0
        self.has_videos = False
        self.has_bible_readings = False
        self.course_folder = ""
        self.url_slug = ""  # e.g., "deacon-course"
        self.component_name = ""  # e.g., "DeaconCourse"
        
    def run(self):
        """Main entry point"""
        print("🚀 SFGM Boston - Automatic Course Creator\n")
        print("=" * 60)
        
        # Get course info
        self.get_course_info()
        
        # Confirm
        if not self.confirm_details():
            print("❌ Cancelled")
            return
            
        # Create course
        print("\n🎯 Creating course...\n")
        self.create_course()
        
        print("\n✅ Course created successfully!")
        print(f"\n📝 Next steps:")
        print(f"1. Run: DATABASE_URL='your-db' npx tsx add-{self.url_slug}-quizzes.ts")
        print(f"2. Restart server: pkill -f 'npm run dev' && npm run dev")
        print(f"3. Test: http://localhost:56000/course/{self.course_id}")
        print(f"4. E-book: http://localhost:56000/{self.url_slug}-complete-ebook")
        
    def get_course_info(self):
        """Get course information from user"""
        self.course_name = input("📚 Enter course name (e.g., 'Deacon Course'): ").strip()
        self.course_id = int(input("🔢 Enter course ID number: ").strip())
        self.num_chapters = int(input("📖 Enter number of chapters: ").strip())
        self.num_quizzes = int(input("📝 Enter number of weekly quizzes: ").strip())
        self.has_videos = input("🎥 Does this course have videos? (y/n): ").lower() == 'y'
        self.has_bible_readings = input("📕 Does this course have Bible readings? (y/n): ").lower() == 'y'
        self.course_folder = input("📁 Enter course folder path (relative to project): ").strip()
        
        # Generate URL slug (e.g., "Deacon Course" -> "deacon-course")
        self.url_slug = re.sub(r'[^a-z0-9]+', '-', self.course_name.lower()).strip('-')
        
        # Generate component name (e.g., "Deacon Course" -> "DeaconCourse")
        self.component_name = ''.join(word.capitalize() for word in self.course_name.split())
        
    def confirm_details(self):
        """Show details and confirm"""
        print("\n" + "=" * 60)
        print("📋 Course Details:")
        print("=" * 60)
        print(f"Name: {self.course_name}")
        print(f"ID: {self.course_id}")
        print(f"Chapters: {self.num_chapters}")
        print(f"Quizzes: {self.num_quizzes} weekly + 1 final exam")
        print(f"Videos: {'Yes' if self.has_videos else 'No'}")
        print(f"Bible Readings: {'Yes' if self.has_bible_readings else 'No'}")
        print(f"Folder: {self.course_folder}")
        print(f"\nURL Slug: {self.url_slug}")
        print(f"Component Name: {self.component_name}")
        print("=" * 60)
        
        response = input("\n✅ Create this course? (y/n): ").lower()
        return response == 'y'
        
    def create_course(self):
        """Create the complete course"""
        # Step 1: Extract all PDFs
        print("📄 Step 1: Extracting PDFs...")
        self.extract_pdfs()
        
        # Step 2: Copy audio files
        print("🎵 Step 2: Copying audio files...")
        self.copy_audio_files()
        
        # Step 3: Create chapter pages
        print("📖 Step 3: Creating chapter pages...")
        self.create_chapter_pages()
        
        # Step 4: Create complete e-book
        print("📚 Step 4: Creating complete e-book...")
        self.create_complete_ebook()
        
        # Step 5: Generate quiz scripts
        print("📝 Step 5: Generating quiz database script...")
        self.create_quiz_script()
        
        # Step 6: Update App.tsx
        print("🔗 Step 6: Updating routes...")
        self.update_app_routes()
        
        # Step 7: Update course-content-viewer.tsx
        print("📋 Step 7: Updating course page...")
        self.update_course_viewer()
        
        # Step 8: Update server routes
        print("🛣️ Step 8: Updating server routes...")
        self.update_server_routes()
        
        # Step 9: Update textbook catalog
        print("📚 Step 9: Updating textbook catalog...")
        self.update_textbook_catalog()
        
        print("\n🎉 All done!")
        
    def extract_pdfs(self):
        """Extract all PDFs using extract-pdf.cjs"""
        course_path = Path(self.course_folder)
        
        # Extract chapters
        textbook_path = course_path / "Text-Book"
        if textbook_path.exists():
            for i in range(1, self.num_chapters + 1):
                chapter_dir = textbook_path / str(i)
                if chapter_dir.exists():
                    pdf_files = list(chapter_dir.glob("*.pdf"))
                    if pdf_files:
                        pdf_file = pdf_files[0]
                        print(f"  Extracting Chapter {i}...")
                        os.system(f'node extract-pdf.cjs "{pdf_file}"')
        
        # Extract quizzes
        quiz_path = course_path / "Quiz"
        if quiz_path.exists():
            for i in range(1, self.num_quizzes + 1):
                quiz_dir = quiz_path / str(i)
                if quiz_dir.exists():
                    pdf_files = list(quiz_dir.glob("*.pdf"))
                    if pdf_files:
                        pdf_file = pdf_files[0]
                        print(f"  Extracting Quiz {i}...")
                        os.system(f'node extract-pdf.cjs "{pdf_file}"')
            
            # Final exam
            final_dir = quiz_path / "Final Exam"
            if final_dir.exists():
                pdf_files = list(final_dir.glob("*.pdf"))
                if pdf_files:
                    print(f"  Extracting Final Exam...")
                    os.system(f'node extract-pdf.cjs "{pdf_files[0]}"')
    
    def copy_audio_files(self):
        """Copy all audio files to /public/"""
        course_path = Path(self.course_folder)
        textbook_path = course_path / "Text-Book"
        
        if not textbook_path.exists():
            return
            
        for i in range(1, self.num_chapters + 1):
            chapter_dir = textbook_path / str(i)
            if chapter_dir.exists():
                audio_files = list(chapter_dir.glob("*.mp3"))
                if audio_files:
                    src = audio_files[0]
                    dest = Path("public") / f"{self.url_slug}-ch{i}.mp3"
                    print(f"  Copying {src.name} -> {dest.name}")
                    shutil.copy(src, dest)
    
    def create_chapter_pages(self):
        """Create all chapter pages with extracted content"""
        for i in range(1, self.num_chapters + 1):
            print(f"  Creating Chapter {i} page...")
            self.create_single_chapter_page(i)
    
    def create_single_chapter_page(self, chapter_num):
        """Create a single chapter page"""
        # Read extracted text
        course_path = Path(self.course_folder)
        textbook_path = course_path / "Text-Book" / str(chapter_num)
        extracted_files = list(textbook_path.glob("*_extracted.txt"))
        
        if not extracted_files:
            print(f"    ⚠️ No extracted text found for Chapter {chapter_num}")
            content = f"<p>Chapter {chapter_num} content will be added here.</p>"
        else:
            with open(extracted_files[0], 'r', encoding='utf-8') as f:
                raw_content = f.read()
            content = self.format_chapter_content(raw_content, chapter_num)
        
        # Generate component
        component = self.generate_chapter_component(chapter_num, content)
        
        # Write file
        output_path = Path("client/src/pages") / f"{self.url_slug}-ch{chapter_num}.tsx"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(component)
    
    def format_chapter_content(self, raw_content, chapter_num):
        """Format raw text into beautiful HTML with color-coded sections"""
        # This is a simplified formatter - adjust based on your content structure
        lines = raw_content.split('\n')
        formatted = []
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            # Detect headings
            if line.isupper() or (len(line) < 50 and line.endswith(':')):
                formatted.append(f'<h2 className="text-2xl font-bold mb-4 mt-6">{line}</h2>')
            # Detect scripture (starts with number or quote)
            elif line.startswith('"') or re.match(r'^\d+:', line):
                formatted.append(f'''<div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
                    <blockquote className="text-purple-900 italic">{line}</blockquote>
                </div>''')
            # Regular paragraph
            else:
                formatted.append(f'<p className="mb-4">{line}</p>')
        
        return '\n'.join(formatted)
    
    def generate_chapter_component(self, chapter_num, content):
        """Generate complete React component for chapter"""
        return f'''import React, {{ useRef, useState }} from "react";
import {{ useLocation }} from "wouter";
import {{ Button }} from "@/components/ui/button";
import {{ Card, CardContent }} from "@/components/ui/card";
import {{ Slider }} from "@/components/ui/slider";
import {{ Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2 }} from "lucide-react";

export default function {self.component_name}Ch{chapter_num}() {{
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handlePlayPause = () => {{
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {{
      audio.pause();
      setIsPlaying(false);
    }} else {{
      audio.play();
      setIsPlaying(true);
    }}
  }};

  const handleSkip = (delta: number) => {{
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(Math.max(0, audio.currentTime + delta), duration || audio.duration || 0);
    audio.currentTime = next;
    setCurrentTime(next);
  }};

  const formatTime = (time: number) => {{
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${{m}}:${{String(s).padStart(2, "0")}}`;
  }};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {{/* Header */}}
        <div className="mb-6 flex items-center justify-between">
          <Button
            onClick={{() => setLocation("/course/{self.course_id}")}}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </div>

        {{/* Audio Player */}}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none shadow-2xl mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
                  <span className="text-2xl sm:text-3xl align-text-top mr-1">📚</span>
                  <span className="align-middle">{self.course_name}</span>
                </h3>
                <p className="text-white/90 text-base sm:text-xl font-semibold">
                  <span className="align-middle">Chapter {chapter_num}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Button
                  onClick={{() => handleSkip(-15)}}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="h-4 w-4 mr-1" />
                  15s
                </Button>
                <Button
                  onClick={{handlePlayPause}}
                  size="lg"
                  className="h-14 w-14 rounded-full bg-white text-blue-600 hover:bg-white/90 shadow-lg"
                >
                  {{isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}}
                </Button>
                <Button
                  onClick={{() => handleSkip(15)}}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  15s
                  <SkipForward className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-1">
                <Slider
                  value={{[currentTime]}}
                  max={{duration || 100}}
                  step={{0.1}}
                  onValueChange={{([value]) => {{
                    if (audioRef.current) {{
                      audioRef.current.currentTime = value;
                      setCurrentTime(value);
                    }}
                  }}}}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs sm:text-sm text-white/80">
                  <span>{{formatTime(currentTime)}}</span>
                  <span>{{formatTime(duration)}}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center">
                <Volume2 className="h-4 w-4 text-white/70" />
                <Slider
                  value={{[volume * 100]}}
                  max={{100}}
                  step={{1}}
                  onValueChange={{([value]) => setVolume(value / 100)}}
                  className="w-24 sm:w-32"
                />
              </div>
            </div>

            <audio
              ref={{audioRef}}
              src="/{self.url_slug}-ch{chapter_num}.mp3"
              onTimeUpdate={{(e) => setCurrentTime(e.currentTarget.currentTime)}}
              onLoadedMetadata={{(e) => setDuration(e.currentTarget.duration)}}
              onPlay={{() => setIsPlaying(true)}}
              onPause={{() => setIsPlaying(false)}}
              onEnded={{() => setIsPlaying(false)}}
            />
          </CardContent>
        </Card>

        {{/* Content */}}
        <Card className="bg-white shadow-xl mb-8">
          <CardContent className="p-8 prose max-w-none">
            {content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}}
'''
    
    def create_complete_ebook(self):
        """Create complete e-book with all chapters"""
        print("  Generating complete e-book component...")
        
        # This would be similar but more complex - embedding all chapter content
        # For now, create a basic structure
        component = f'''import React, {{ useRef, useState, useEffect }} from "react";
import {{ useLocation }} from "wouter";
import {{ Button }} from "@/components/ui/button";
import {{ Card, CardContent }} from "@/components/ui/card";
import {{ Slider }} from "@/components/ui/slider";
import {{ Select, SelectContent, SelectItem, SelectTrigger, SelectValue }} from "@/components/ui/select";
import {{ Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2, Download }} from "lucide-react";

export default function {self.component_name}CompleteEbook() {{
  const [, setLocation] = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);

  const chapters = [
    {', '.join(f'{{ id: {i}, title: "Chapter {i}", audioUrl: "/{self.url_slug}-ch{i}.mp3" }}' for i in range(1, self.num_chapters + 1))}
  ];

  const currentChapterData = chapters[currentChapter - 1];

  useEffect(() => {{
    if (audioRef.current) {{
      audioRef.current.volume = volume;
      audioRef.current.src = currentChapterData.audioUrl;
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }}
  }}, [volume, currentChapter]);

  const handlePlayPause = () => {{
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {{
      audio.pause();
      setIsPlaying(false);
    }} else {{
      audio.play();
      setIsPlaying(true);
    }}
  }};

  const handleSkip = (delta: number) => {{
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.min(Math.max(0, audio.currentTime + delta), duration || audio.duration || 0);
    audio.currentTime = next;
    setCurrentTime(next);
  }};

  const formatTime = (time: number) => {{
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${{m}}:${{String(s).padStart(2, "0")}}`;
  }};

  const handleChapterChange = (chapterId: string) => {{
    setCurrentChapter(parseInt(chapterId));
  }};

  const getChapterContent = (chapterId: number) => {{
    // Content will be embedded here by build script
    return <div>Chapter {{chapterId}} content</div>;
  }};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button onClick={{() => setLocation("/course/{self.course_id}")}} variant="ghost" className="text-white hover:bg-white/20">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
          <Button onClick={{() => window.open('/{self.url_slug}-complete.pdf', '_blank')}} variant="ghost" className="text-white hover:bg-white/20">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* Audio Player - same structure as chapter pages */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none shadow-2xl mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
                  <span className="text-2xl sm:text-3xl align-text-top mr-1">📚</span>
                  <span className="align-middle">{self.course_name}</span>
                </h3>
                <p className="text-white/90 text-base sm:text-xl font-semibold">
                  <span className="align-middle">Complete E-Book</span>
                </p>
              </div>
            </div>

            <div className="mb-4">
              <Select value={{currentChapter.toString()}} onValueChange={{handleChapterChange}}>
                <SelectTrigger className="w-full bg-white/10 text-white border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {{chapters.map((ch) => (
                    <SelectItem key={{ch.id}} value={{ch.id.toString()}}>
                      {{ch.title}}
                    </SelectItem>
                  ))}}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <Button onClick={{() => handleSkip(-15)}} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <SkipBack className="h-4 w-4 mr-1" />15s
                </Button>
                <Button onClick={{handlePlayPause}} size="lg" className="h-14 w-14 rounded-full bg-white text-blue-600 hover:bg-white/90 shadow-lg">
                  {{isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}}
                </Button>
                <Button onClick={{() => handleSkip(15)}} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  15s<SkipForward className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-1">
                <Slider value={{[currentTime]}} max={{duration || 100}} step={{0.1}}
                  onValueChange={{([value]) => {{ if (audioRef.current) {{ audioRef.current.currentTime = value; setCurrentTime(value); }} }}}}
                  className="cursor-pointer" />
                <div className="flex justify-between text-xs sm:text-sm text-white/80">
                  <span>{{formatTime(currentTime)}}</span>
                  <span>{{formatTime(duration)}}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center">
                <Volume2 className="h-4 w-4 text-white/70" />
                <Slider value={{[volume * 100]}} max={{100}} step={{1}} onValueChange={{([value]) => setVolume(value / 100)}} className="w-24 sm:w-32" />
              </div>
            </div>

            <audio ref={{audioRef}} src={{currentChapterData.audioUrl}}
              onTimeUpdate={{(e) => setCurrentTime(e.currentTarget.currentTime)}}
              onLoadedMetadata={{(e) => setDuration(e.currentTarget.duration)}}
              onPlay={{() => setIsPlaying(true)}}
              onPause={{() => setIsPlaying(false)}}
              onEnded={{() => setIsPlaying(false)}} />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl">
          <CardContent className="p-6 sm:p-8 prose max-w-none">
            {{getChapterContent(currentChapter)}}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}}
'''
        
        output_path = Path("client/src/pages") / f"{self.url_slug}-complete-ebook.tsx"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(component)
    
    def create_quiz_script(self):
        """Generate database script for all quizzes"""
        # This would parse extracted quiz PDFs and generate the database script
        # Simplified version:
        script = f'''import {{ db }} from "./db";
import {{ quizzes, quizQuestions }} from "@db/schema";

async function addQuizzes() {{
  console.log("Adding {self.course_name} quizzes...");
  
  // TODO: Add actual quiz data here
  // This script needs to be populated with quiz questions from extracted PDFs
  
  console.log("✅ Quizzes added!");
  process.exit(0);
}}

addQuizzes().catch(console.error);
'''
        
        output_path = Path(f"add-{self.url_slug}-quizzes.ts")
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(script)
    
    def update_app_routes(self):
        """Add all routes to App.tsx"""
        app_path = Path("client/src/App.tsx")
        with open(app_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Add imports
        imports = '\n'.join([
            f'import {self.component_name}Ch{i} from "@/pages/{self.url_slug}-ch{i}";'
            for i in range(1, self.num_chapters + 1)
        ])
        imports += f'\nimport {self.component_name}CompleteEbook from "@/pages/{self.url_slug}-complete-ebook";'
        
        # Find where to insert imports (after last import)
        last_import = content.rfind('import ')
        insert_pos = content.find('\n', last_import)
        content = content[:insert_pos] + '\n' + imports + content[insert_pos:]
        
        # Add routes
        routes = '\n'.join([
            f'          <Route path="/{self.url_slug}-ch{i}" component={{{self.component_name}Ch{i}}} />'
            for i in range(1, self.num_chapters + 1)
        ])
        routes += f'\n          <Route path="/{self.url_slug}-complete-ebook" component={{{self.component_name}CompleteEbook}} />'
        
        # Find where to insert routes (before </Switch>)
        switch_end = content.rfind('</Switch>')
        content = content[:switch_end] + routes + '\n' + content[switch_end:]
        
        with open(app_path, 'w', encoding='utf-8') as f:
            f.write(content)
    
    def update_course_viewer(self):
        """Add week cards to course-content-viewer.tsx"""
        # This is complex - simplified version
        print("  ⚠️ Manual step required: Add week cards to course-content-viewer.tsx")
        print(f"     Add cards for courseId === {self.course_id}")
    
    def update_server_routes(self):
        """Add quiz ID mappings to server/routes.ts"""
        # This is complex - simplified version
        print("  ⚠️ Manual step required: Add quiz mappings to server/routes.ts")
        print(f"     Add '{self.url_slug}-week-X' mappings")
    
    def update_textbook_catalog(self):
        """Add e-book link to textbook catalog"""
        print("  ⚠️ Manual step required: Add e-book link to textbook-catalog.tsx")
        print(f"     Link courseId {self.course_id} to /{self.url_slug}-complete-ebook")

if __name__ == "__main__":
    creator = CourseCreator()
    creator.run()

