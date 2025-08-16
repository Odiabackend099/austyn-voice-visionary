import { Card } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              My Focus
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
          </div>
          
          <Card className="p-8 bg-card border-border shadow-lg">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p className="text-foreground font-medium">
                As a Nigerian founder and AI developer, I'm driven by a single mission: to build practical, real-world AI solutions that solve uniquely Nigerian challenges.
              </p>
              
              <p>
                At ODIADEV, where I serve as Co-Founder and CEO, we specialize in Voice AI, Python-based AI agents, and workflow automation for widely-used platforms like WhatsApp and Telegram. We prioritize cost-effectiveness, speed, and unwavering reliability, building for the Nigerian context.
              </p>
              
              <p>
                Our core technology stack includes our proprietary ODIA TTS (Text-to-Speech) system and advanced multilingual ASR (Automatic Speech Recognition). We deliver tailored AI solutions across education, healthcare, legal services, and real estate.
              </p>
              
              <div className="pt-4">
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    Voice AI Infrastructure
                  </span>
                  <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                    Python Automation
                  </span>
                  <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    Nigerian Business Solutions
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;