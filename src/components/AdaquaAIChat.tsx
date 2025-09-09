import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Mic, MessageCircle } from 'lucide-react';
import ChatInterface from './ChatInterface';

const AdaquaAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <div className="flex items-center gap-3">
            <Mic className="h-5 w-5" />
            <span>Hear from Adaqua AI</span>
            <MessageCircle className="h-5 w-5" />
          </div>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl h-[80vh] p-0 bg-background border-border">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-display font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center">
              <Mic className="h-5 w-5 text-white" />
            </div>
            Adaqua AI
            <span className="text-sm font-normal text-muted-foreground">Nigeria's Voice-First AI Assistant</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 p-6 pt-0">
          <ChatInterface />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdaquaAIChat;