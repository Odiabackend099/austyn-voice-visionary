import { useState, useEffect } from 'react';
import { Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const playVoiceGreeting = () => {
    // Placeholder for voice functionality - will be implemented after Supabase setup
    console.log('Playing Agent Lexi greeting...');
  };

  return (
    <section className="hero-section flex items-center justify-center relative">
      <div className="hero-glow" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className={`space-y-8 ${isVisible ? 'slide-up animate' : 'slide-up'}`}>
          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-display font-bold text-hero-foreground leading-tight">
              Hello, I'm{' '}
              <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                Austyn Eguale
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-hero-foreground/80 font-light max-w-3xl mx-auto leading-relaxed">
              Builder of Nigeria's Voice AI Infrastructure
            </p>
          </div>

          {/* Voice interaction button */}
          <div className="flex flex-col items-center space-y-4 pt-8">
            <Button
              onClick={playVoiceGreeting}
              className="voice-button group"
              size="lg"
            >
              <Volume2 className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Hear from Agent Lexi
              <div className="ml-3 w-2 h-2 bg-accent rounded-full animate-pulse" />
            </Button>
            
            <p className="text-sm text-hero-foreground/60">
              Experience ODIA's voice technology
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-hero-foreground/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-hero-foreground/30 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Waveform visualization placeholder */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        <div className="flex items-end justify-center h-full space-x-1">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="bg-accent/50 w-1 animate-pulse"
              style={{
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 50}ms`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;