import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, X, MessageCircle } from 'lucide-react';
import { askAgentAndSpeak, initAudio } from '@/services/ttsService';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const SecureChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '🎤 Welcome to ODIA AI! I understand voice in English, Pidgin, Yoruba, Hausa & Igbo.',
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: '2',
      content: 'Click the microphone and speak to get started! 🗣️',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const startRecording = async () => {
    try {
      await initAudio();
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      audioChunksRef.current = [];
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = processRecording;
      mediaRecorder.start(100);
      setIsRecording(true);

      toast({
        title: "Recording started",
        description: "Speak now... Click the mic again to stop."
      });

    } catch (error) {
      console.error('Recording failed:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use voice input.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const processRecording = async () => {
    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      
      if (audioBlob.size < 1000) {
        toast({
          title: "Recording too short",
          description: "Please hold the button longer and speak clearly.",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      // Simulate transcription for now (would be replaced with actual speech-to-text)
      const userMessage = "Voice message received";
      addMessage(userMessage, 'user');

      // Get AI response and speak it
      const response = await askAgentAndSpeak(userMessage);
      addMessage(response, 'bot');

    } catch (error) {
      console.error('Processing failed:', error);
      addMessage('Sorry, I had trouble processing your voice message. Please try again.', 'bot');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'scale-110' : 'hover:scale-110'
        }`}
        variant="default"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-20 right-0 w-80 h-96 flex flex-col shadow-xl border">
          {/* Header */}
          <div className="p-4 bg-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-semibold">🤖 ODIA AI Assistant</h3>
            <p className="text-xs opacity-90">Voice-powered AI for Nigerian businesses</p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-muted/20 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-background border p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRecordToggle}
                disabled={isProcessing}
                className={`w-10 h-10 rounded-full ${
                  isRecording 
                    ? 'bg-destructive hover:bg-destructive/90 animate-pulse' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
                variant={isRecording ? "destructive" : "default"}
              >
                <Mic className="w-4 h-4" />
              </Button>
              <div className="flex-1 text-sm text-muted-foreground">
                {isRecording 
                  ? '🎤 Recording... Click to stop'
                  : isProcessing
                  ? 'Processing your message...'
                  : 'Hold to record voice message'
                }
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SecureChatWidget;