import { Request, Response } from 'express';

// Professional TTS endpoint using multiple high-quality services
export async function generateTTS(req: Request, res: Response) {
  try {
    const { text, voice, service, speed, pitch, quality } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Try OpenAI TTS first (excellent quality)
    const openaiAudio = await generateOpenAITTS(text, voice, speed);
    if (openaiAudio) {
      res.set('Content-Type', 'audio/mpeg');
      return res.send(openaiAudio);
    }

    // Try ElevenLabs (premium quality)
    const elevenlabsAudio = await generateElevenLabsTTS(text, voice, speed);
    if (elevenlabsAudio) {
      res.set('Content-Type', 'audio/mpeg');
      return res.send(elevenlabsAudio);
    }

    // Try Azure TTS (good quality)
    const azureAudio = await generateAzureTTS(text, voice, speed);
    if (azureAudio) {
      res.set('Content-Type', 'audio/wav');
      return res.send(azureAudio);
    }

    // Create a demo/preview audio using optimized browser synthesis
    const demoAudio = await generateDemoAudio(text, voice, speed);
    if (demoAudio) {
      res.set('Content-Type', 'audio/wav');
      return res.send(demoAudio);
    }

    // Final fallback
    res.status(503).json({ 
      error: 'TTS services not available',
      fallback: 'browser-optimized'
    });

  } catch (error) {
    console.error('TTS generation error:', error);
    res.status(500).json({ error: 'TTS generation failed' });
  }
}

// OpenAI TTS implementation
async function generateOpenAITTS(text: string, voice: string, speed: number): Promise<Buffer | null> {
  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      console.log('OpenAI API key not configured');
      return null;
    }

    const voiceMap = {
      'male': 'onyx',      // Deep, resonant male voice
      'female': 'nova',    // Warm, engaging female voice
      'natural-male': 'echo',     // Natural conversational male
      'natural-female': 'shimmer' // Clear, articulate female
    };

    const selectedVoice = voiceMap[voice as keyof typeof voiceMap] || 'alloy';

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1-hd', // High-definition model
        voice: selectedVoice,
        input: text,
        speed: Math.max(0.25, Math.min(4.0, speed || 1.0)),
        response_format: 'mp3'
      })
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    console.log('OpenAI TTS failed:', response.status, response.statusText);
    return null;

  } catch (error) {
    console.log('OpenAI TTS error:', error);
    return null;
  }
}

// ElevenLabs TTS implementation
async function generateElevenLabsTTS(text: string, voice: string, speed: number): Promise<Buffer | null> {
  try {
    const elevenlabsKey = process.env.ELEVENLABS_API_KEY;
    if (!elevenlabsKey) {
      console.log('ElevenLabs API key not configured');
      return null;
    }

    // High-quality voice IDs from ElevenLabs
    const voiceMap = {
      'male': 'ErXwobaYiN019PkySvjV',        // Antoni - warm, well-rounded
      'female': 'EXAVITQu4vr4xnSDxMaL',      // Bella - soft, pleasant
      'natural-male': '21m00Tcm4TlvDq8ikWAM',   // Rachel - natural, conversational
      'natural-female': 'AZnzlk1XvdvUeBnXmlld'  // Domi - strong, confident
    };

    const voiceId = voiceMap[voice as keyof typeof voiceMap] || voiceMap.male;

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': elevenlabsKey
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true
        }
      })
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    console.log('ElevenLabs TTS failed:', response.status, response.statusText);
    return null;

  } catch (error) {
    console.log('ElevenLabs TTS error:', error);
    return null;
  }
}

// Azure TTS implementation
async function generateAzureTTS(text: string, voice: string, speed: number): Promise<Buffer | null> {
  try {
    const azureKey = process.env.AZURE_TTS_KEY;
    const azureRegion = process.env.AZURE_TTS_REGION || 'eastus';
    
    if (!azureKey) {
      console.log('Azure TTS API key not configured');
      return null;
    }

    const voiceMap = {
      'male': 'en-US-DavisNeural',     // Professional, clear male voice
      'female': 'en-US-AriaNeural',    // Natural, friendly female voice
      'natural-male': 'en-US-JasonNeural',    // Conversational male
      'natural-female': 'en-US-JennyNeural'   // Warm, engaging female
    };

    const selectedVoice = voiceMap[voice as keyof typeof voiceMap] || voiceMap.male;
    const ratePercent = Math.round((speed - 1) * 100);
    const rateString = ratePercent >= 0 ? `+${ratePercent}%` : `${ratePercent}%`;

    const ssml = `
      <speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="${selectedVoice}">
          <prosody rate="${rateString}">
            ${text}
          </prosody>
        </voice>
      </speak>
    `;

    const response = await fetch(`https://${azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': azureKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
        'User-Agent': 'SFGM-TTS-Service'
      },
      body: ssml
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    console.log('Azure TTS failed:', response.status, response.statusText);
    return null;

  } catch (error) {
    console.log('Azure TTS error:', error);
    return null;
  }
}

// Demo audio generation for when premium services aren't available
async function generateDemoAudio(text: string, voice: string, speed: number): Promise<Buffer | null> {
  try {
    // Use Web Audio API to create better quality audio
    // This is a placeholder - in practice, you'd use a more sophisticated approach
    console.log('Generating demo audio for:', text.substring(0, 50) + '...');
    
    // For now, return null to trigger browser fallback with better optimization
    return null;
  } catch (error) {
    console.log('Demo audio generation failed:', error);
    return null;
  }
}

// Helper function to optimize browser TTS settings
export function getOptimizedVoiceSettings(voicePreference: 'male' | 'female') {
  const baseSettings = {
    rate: 0.9, // Slightly slower for clarity
    volume: 0.95,
    lang: 'en-US'
  };

  if (voicePreference === 'male') {
    return {
      ...baseSettings,
      pitch: 0.8, // Lower pitch for male voice
      rate: 0.85 // Slightly slower for deeper voices
    };
  } else {
    return {
      ...baseSettings,
      pitch: 1.1, // Higher pitch for female voice
      rate: 0.9
    };
  }
}