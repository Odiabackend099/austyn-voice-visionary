import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  disabled?: boolean;
}

const VoiceRecorder = ({ 
  onTranscript, 
  isRecording, 
  setIsRecording, 
  disabled 
}: VoiceRecorderProps) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      const audioChunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        
        if (audioBlob.size < 1000) {
          toast({
            title: "Recording too short",
            description: "Please hold the button longer and speak clearly.",
            variant: "destructive"
          });
          return;
        }

        try {
          // Convert audio to base64 for API call
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64Audio = (reader.result as string).split(',')[1];
            
            // Call speech-to-text via Supabase edge function
            const { supabase } = await import('@/integrations/supabase/client');
            const { data, error } = await supabase.functions.invoke('speech-to-text', {
              body: { audio: base64Audio }
            });
            
            if (error) {
              console.error('Speech-to-text error:', error);
              onTranscript("Sorry, I couldn't understand that. Please try speaking again.");
            } else {
              onTranscript(data?.text || "Voice input received");
            }
          };
          reader.readAsDataURL(audioBlob);
        } catch (error) {
          console.error('Voice processing error:', error);
          onTranscript("Voice processing failed. Please try again.");
        }
        
        // Clean up
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak now... Click the mic again to stop.",
      });
    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice input.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsRecording(false);
      
      toast({
        title: "Recording stopped",
        description: "Processing your voice input...",
      });
    }
  };

  const handleToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Button
      type="button"
      variant={isRecording ? "destructive" : "outline"}
      size="icon"
      onClick={handleToggle}
      disabled={disabled}
      className={isRecording ? "animate-pulse" : ""}
    >
      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
    </Button>
  );
};

export default VoiceRecorder;