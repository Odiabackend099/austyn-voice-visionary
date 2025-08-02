import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

const StorySection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const timelineEvents = [
    {
      year: '2019',
      title: 'The Beginning',
      description: 'Started with a vision to bring voice AI to Nigeria. Early demos failed, but the dream remained strong.',
      type: 'struggle'
    },
    {
      year: '2021',
      title: 'Cross AI Birth',
      description: 'Founded Cross AI with a mission to democratize voice technology across Nigeria.',
      type: 'milestone'
    },
    {
      year: '2022',
      title: 'The Pivot',
      description: 'Cross River state adoption marked our first major breakthrough in emergency voice response.',
      type: 'breakthrough'
    },
    {
      year: '2023',
      title: 'Rita Joins',
      description: 'Key partnership that transformed our technical capabilities and market reach.',
      type: 'milestone'
    },
    {
      year: '2024',
      title: 'Federal Recognition',
      description: 'ODIA technology gains federal attention, paving the way for national deployment.',
      type: 'breakthrough'
    },
    {
      year: '2025',
      title: 'AI School Vision',
      description: 'Launching Africa\'s first voice-powered AI education platform.',
      type: 'future'
    }
  ];

  return (
    <section id="story" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-bold text-foreground mb-6">
            My <span className="text-primary">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From failed demos to federal adoption — the honest story of building Nigeria's voice AI infrastructure
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-gold" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                data-index={index}
                className={`timeline-item flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2 px-8">
                  <Card className={`p-8 transition-all duration-700 ${
                    visibleItems.includes(index) 
                      ? 'translate-y-0 opacity-100' 
                      : index % 2 === 0 
                        ? 'translate-x-8 opacity-0' 
                        : '-translate-x-8 opacity-0'
                  }`}>
                    <div className="flex items-center mb-4">
                      <div className={`w-4 h-4 rounded-full mr-4 ${
                        event.type === 'struggle' ? 'bg-destructive' :
                        event.type === 'milestone' ? 'bg-accent' :
                        event.type === 'breakthrough' ? 'bg-primary' :
                        'bg-gold'
                      }`} />
                      <span className="text-sm font-semibold text-muted-foreground">
                        {event.year}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-display font-semibold mb-3 text-foreground">
                      {event.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="relative z-10">
                  <div className={`w-6 h-6 rounded-full border-4 border-background transition-all duration-500 ${
                    visibleItems.includes(index) ? 'scale-100' : 'scale-0'
                  } ${
                    event.type === 'struggle' ? 'bg-destructive' :
                    event.type === 'milestone' ? 'bg-accent' :
                    event.type === 'breakthrough' ? 'bg-primary' :
                    'bg-gold'
                  }`} />
                </div>

                <div className="w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;