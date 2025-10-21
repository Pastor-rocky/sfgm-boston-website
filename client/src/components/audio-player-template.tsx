import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Headphones,
  Save,
  Download,
  Settings
} from 'lucide-react';

interface AudioPlayerTemplateProps {
  title: string;
  subtitle?: string;
  audioUrl: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  children: React.ReactNode; // The text content
}

const AudioPlayerTemplate: React.FC<AudioPlayerTemplateProps> = ({
  title,
  subtitle,
  audioUrl,
  coverImageUrl,
  coverImageAlt,
  children
}) => {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [savedProgress, setSavedProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setDuration(audio.duration);
      audio.volume = volume;
      audio.playbackRate = playbackRate;
      setIsLoading(false);
    };

    const handleCanPlay = () => {
      setDuration(audio.duration);
      audio.volume = volume;
      audio.playbackRate = playbackRate;
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleError = () => {
      console.error('Audio loading error');
      setIsLoading(false);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('error', handleError);
    };
  }, [volume, playbackRate]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 15, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 15, 0);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value[0];
    setVolume(value[0]);
  };

  const handlePlaybackRateChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = value[0];
    setPlaybackRate(value[0]);
  };

  const saveProgress = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setSavedProgress(audio.currentTime);
    localStorage.setItem(`audio-progress-${title}`, audio.currentTime.toString());
  };

  const loadProgress = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const saved = localStorage.getItem(`audio-progress-${title}`);
    if (saved) {
      const progress = parseFloat(saved);
      audio.currentTime = progress;
      setCurrentTime(progress);
    }
  };

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading audio player...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            onClick={() => setLocation('/course/1')}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            ← Back to Course
          </Button>
          
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Audio Player Card with Cover Image */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
              <CardContent className="p-4">
                {/* Cover Image and Title Section */}
                {coverImageUrl && (
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={coverImageUrl}
                      alt={coverImageAlt || title}
                      className="w-24 h-auto rounded shadow-sm flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-white text-2xl font-bold">🎶 Audiobook</h3>
                      <p className="text-white/90 text-xl font-semibold">{subtitle || title}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white/70">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full"
                  />
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={skipBackward}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    onClick={togglePlayPause}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  
                  <Button
                    onClick={skipForward}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                {/* Secondary Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={toggleMute}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  </Button>
                  
                  <Button
                    onClick={saveProgress}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <Save className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    onClick={downloadAudio}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Volume2 className="h-4 w-4" />
                    <span>Volume</span>
                  </div>
                  <Slider
                    value={[volume]}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                    className="w-full"
                  />
                </div>

                {/* Playback Speed */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Settings className="h-4 w-4" />
                    <span>Speed: {playbackRate}x</span>
                  </div>
                  <Slider
                    value={[playbackRate]}
                    min={0.5}
                    max={2}
                    step={0.25}
                    onValueChange={handlePlaybackRateChange}
                    className="w-full"
                  />
                </div>

                {/* Progress Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={loadProgress}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-white border-white/20 hover:bg-white/10"
                  >
                    Load Progress
                  </Button>
                  <Button
                    onClick={() => {
                      const audio = audioRef.current;
                      if (audio) {
                        audio.currentTime = 0;
                        setCurrentTime(0);
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-white border-white/20 hover:bg-white/10"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-2">
            {children}
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        preload="auto" 
        onLoadedData={() => { 
          if (audioRef.current) { 
            audioRef.current.volume = volume; 
            audioRef.current.playbackRate = playbackRate; 
          } 
        }} 
      />
    </div>
  );
};

export default AudioPlayerTemplate;