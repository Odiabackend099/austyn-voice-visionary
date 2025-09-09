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
    console.log('Playing Adaqua AI greeting...');
  };

  return (
    <section className="hero-section flex items-center justify-center relative">
      <div className="hero-glow" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left side - Content */}
          <div className={`space-y-8 text-center lg:text-left ${isVisible ? 'slide-up animate' : 'slide-up'}`}>
            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-hero-foreground leading-tight">
                Hello, I'm{' '}
                <span className="bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
                  Austyn Eguale
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-hero-foreground/80 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Builder of Nigeria's Voice AI Infrastructure
              </p>
            </div>

            {/* Call to actions */}
            <div className="flex flex-col items-center lg:items-start space-y-4 pt-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#ai-school" aria-label="Browse AI School courses">
                  <Button size="lg">
                    Start Building with ODIA
                  </Button>
                </a>
                <a href="#projects" aria-label="Explore projects">
                  <Button variant="outline" size="lg">
                    Explore Projects
                  </Button>
                </a>
                <Button
                  onClick={playVoiceGreeting}
                  variant="ghost"
                  className="voice-button group"
                  size="lg"
                  aria-label="Play voice greeting from Adaqua AI"
                >
                  <Volume2 className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Hear from Adaqua AI
                  <div className="ml-3 w-2 h-2 bg-accent rounded-full animate-pulse" />
                </Button>
              </div>
              <p className="text-sm text-hero-foreground/60">
                Experience Nigeria's voice-first AI infrastructure
              </p>
            </div>
          </div>

          {/* Right side - Portrait */}
          <div className={`flex justify-center lg:justify-end ${isVisible ? 'fade-in animate' : 'fade-in'} delay-300`}>
            <div className="relative">
              {/* Glow effect behind portrait */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-accent rounded-full blur-2xl opacity-30 scale-110 animate-pulse" />
              
              {/* Portrait image */}
              <img
                src="/lovable-uploads/a3bedfeb-e5bf-4348-beb0-b14cc8f71537.png"
                alt="Austyn Eguale, professional voice visionary and AI coach, speaking at a technology conference about Nigeria's voice AI infrastructure"
                loading="eager"
                decoding="async"
                className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full object-cover border-4 border-accent/20 shadow-2xl hover:scale-105 transition-transform duration-700"
              />
              
              {/* Floating elements around portrait */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-bounce delay-500" />
              <div className="absolute -bottom-8 -left-8 w-6 h-6 bg-primary-glow rounded-full animate-bounce delay-1000" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-hero-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-hero-foreground/30 rounded-full mt-2 animate-pulse" />
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