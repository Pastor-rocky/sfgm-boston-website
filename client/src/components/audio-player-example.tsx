import React from 'react';
import AudioPlayerTemplate from './audio-player-template';
import { 
  AudioPlayerTextTemplate, 
  SectionHeading, 
  SubSectionHeading,
  StepHeading,
  Paragraph,
  StepContent,
  StepParagraph
} from './audio-player-text-template';

// Example: How to create a new audio player using the templates
const ExampleAudioPlayer: React.FC = () => {
  return (
    <AudioPlayerTemplate
      title="Your Chapter Title"
      subtitle="Your Subtitle (optional)"
      audioUrl="/path/to/your/audio.mp3"
      coverImageUrl="/path/to/cover-image.png" // Optional
      coverImageAlt="Your Cover Image Alt Text" // Optional
    >
      <AudioPlayerTextTemplate
        title="YOUR MAIN TITLE"
        subtitle="Your subtitle here"
        content={
          <>
            <SectionHeading>MAIN SECTION HEADING</SectionHeading>
            <Paragraph>
              Your main paragraph content goes here. This will be styled with proper spacing and readability.
            </Paragraph>
            
            <SubSectionHeading>SUB-SECTION HEADING</SubSectionHeading>
            <Paragraph>
              Content for sub-sections goes here.
            </Paragraph>
            
            <StepContent>
              <StepHeading>Step 1: Your Step Title</StepHeading>
              <StepParagraph>
                Content for individual steps goes here. Perfect for numbered lists or procedures.
              </StepParagraph>
            </StepContent>
            
            <StepContent>
              <StepHeading>Step 2: Another Step</StepHeading>
              <StepParagraph>
                More step content here.
              </StepParagraph>
            </StepContent>
            
            <SectionHeading>ANOTHER MAIN SECTION</SectionHeading>
            <Paragraph>
              More content here...
            </Paragraph>
          </>
        }
      />
    </AudioPlayerTemplate>
  );
};

export default ExampleAudioPlayer;

/*
USAGE INSTRUCTIONS:

1. Copy this file and rename it to your new audio player (e.g., acts-audio-player-ch2.tsx)

2. Update the AudioPlayerTemplate props:
   - title: The main title displayed at the top
   - subtitle: Optional subtitle
   - audioUrl: Path to your MP3 file
   - coverImageUrl: Optional cover image path
   - coverImageAlt: Alt text for the cover image

3. Update the AudioPlayerTextTemplate content:
   - title: The title for the text content
   - subtitle: Optional subtitle for the text
   - content: Use the template components to structure your text

4. Available text components:
   - <SectionHeading> - Large yellow section headers
   - <SubSectionHeading> - Medium green sub-section headers
   - <StepHeading> - Small blue step headers
   - <Paragraph> - Standard paragraph styling
   - <StepContent> - Container for step content
   - <StepParagraph> - Smaller step paragraph text
   - <FinalParagraph> - Special styling for final paragraphs

5. Add the route to App.tsx:
   import YourNewAudioPlayer from '@/pages/your-new-audio-player';
   <Route path="/your-route" component={YourNewAudioPlayer} />

6. That's it! Your new audio player will have all the same functionality as the existing ones.
*/
