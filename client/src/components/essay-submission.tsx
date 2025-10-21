import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface EssaySubmissionProps {
  quizId: number;
  essayQuestion: {
    id: number;
    question: string;
  };
  studentId: string;
  onSubmissionComplete: () => void;
}

export function EssaySubmission({ quizId, essayQuestion, studentId, onSubmissionComplete }: EssaySubmissionProps) {
  const [essayText, setEssayText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setEssayText(prev => prev + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        toast({
          title: "Speech Recognition Error",
          description: "Unable to process speech. Please try typing instead.",
          variant: "destructive"
        });
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

  // Update word count
  useEffect(() => {
    const words = essayText.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [essayText]);

  const startSpeechRecognition = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Speech Recognition Started",
          description: "Start speaking. Your words will appear in the text area."
        });
      } catch (error) {
        toast({
          title: "Speech Recognition Unavailable",
          description: "Please use the text area to type your essay.",
          variant: "destructive"
        });
      }
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const readEssayAloud = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(essayText);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Text-to-Speech Unavailable",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive"
      });
    }
  };

  const submitEssayMutation = useMutation({
    mutationFn: async () => {
      if (wordCount < 100) {
        throw new Error('Essay must be at least 100 words');
      }

      return await apiRequest('POST', `/api/essays/submit`, {
        quizId,
        questionId: essayQuestion.id,
        studentId,
        essayText,
        wordCount,
        email: 'pastor_rocky@sfgmboston.com'
      });
    },
    onSuccess: (response: any) => {
      toast({
        title: "🎓 Essay Submitted Successfully!",
        description: "Your essay has been sent to pastor_rocky@sfgmboston.com for review. You will receive your course completion certificate via email after review."
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz-attempts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/certificates'] });
      onSubmissionComplete();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Unable to submit essay. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = () => {
    submitEssayMutation.mutate();
  };

  const speechSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  const ttsSupported = 'speechSynthesis' in window;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-2xl">Final Exam Essay</CardTitle>
            <p className="text-blue-100">Complete your essay to finish the final exam</p>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* Essay Question */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 text-amber-800 dark:text-amber-200">Essay Question:</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {essayQuestion.question}
              </p>
            </div>

            {/* Word Count and Speech Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Badge variant={wordCount >= 100 ? "default" : "destructive"} className="text-sm">
                  Word Count: {wordCount} / 100 minimum
                </Badge>
                {wordCount >= 100 && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    ✓ Requirement Met
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                {speechSupported && (
                  <Button
                    type="button"
                    variant={isListening ? "destructive" : "outline"}
                    size="sm"
                    onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}
                    className="flex items-center gap-2"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isListening ? 'Stop Speaking' : 'Speak to Write'}
                  </Button>
                )}

                {ttsSupported && essayText.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={readEssayAloud}
                    className="flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    Read Aloud
                  </Button>
                )}
              </div>
            </div>

            {/* Speech Recognition Status */}
            {isListening && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  🎤 Listening... Speak clearly and your words will appear in the text area below.
                </p>
              </div>
            )}

            {/* Essay Text Area */}
            <div className="space-y-2">
              <label htmlFor="essay" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Essay Response:
              </label>
              <Textarea
                id="essay"
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Begin typing your essay here... You can also use the 'Speak to Write' button to dictate your response."
                className="min-h-[300px] text-base leading-relaxed"
                disabled={submitEssayMutation.isPending}
              />
            </div>

            {/* Submission Button */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={handleSubmit}
                disabled={wordCount < 100 || submitEssayMutation.isPending}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8"
              >
                {submitEssayMutation.isPending ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Submit Essay
                  </>
                )}
              </Button>
            </div>

            {/* Requirements Reminder */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200">
              <h4 className="font-semibold mb-2">Essay Requirements:</h4>
              <ul className="space-y-1 ml-4">
                <li>• Minimum 100 words required</li>
                <li>• Use specific examples from the textbook</li>
                <li>• Explain how principles apply to your spiritual journey</li>
                <li>• Essay will be sent to pastor_rocky@sfgmboston.com for review</li>
                <li>• You will receive your course completion certificate via email after review</li>
                <li>• You cannot retake the final exam once essay is submitted</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}