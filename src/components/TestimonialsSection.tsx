import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Dr. Sunny Eromosele Mudiame',
      title: 'Chancellor, Mudiame University',
      company: 'Mudiame University',
      quote: 'Agent MISS has revolutionized how our students interact with university services. The voice-powered AI assistance has dramatically improved student satisfaction and engagement.',
      avatar: '/lovable-uploads/5c695c83-888a-4e31-9d9c-32989ffb3962.png',
      initials: 'SM'
    },
    {
      name: 'Peter Ntaji',
      title: 'CEO',
      company: 'Cross AI',
      quote: 'Austyn\'s vision for voice AI in emergency response has saved lives in Cross River State. The technology works flawlessly under pressure, exactly when it matters most.',
      avatar: '/lovable-uploads/5c695c83-888a-4e31-9d9c-32989ffb3962.png',
      initials: 'PN'
    },
    {
      name: 'Benjamin Nwoye',
      title: 'CEO',
      company: 'RS Autotech',
      quote: 'SmartBiz Intel transformed our lead generation process. The AI-powered WhatsApp automation has increased our qualified leads by 300% while reducing manual work.',
      avatar: '/lovable-uploads/5c695c83-888a-4e31-9d9c-32989ffb3962.png',
      initials: 'BN'
    }
  ];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-bold text-foreground mb-6">
            Trusted by <span className="text-primary">Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From university chancellors to tech CEOs — hear from those building Nigeria's future with ODIA
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="h-full hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden"
            >
              {/* Quote background decoration */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-primary" />
              </div>

              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-1 mb-6">
                  <Quote className="w-6 h-6 text-primary mb-4" />
                  <blockquote className="text-lg leading-relaxed text-foreground/90 font-light italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>

                <div className="flex items-center space-x-4 pt-6 border-t border-border">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={`${testimonial.name} — ${testimonial.title} at ${testimonial.company}`} loading="lazy" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-semibold mb-4">
              Ready to join them?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss how ODIA can transform your organization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Schedule a Call
              </button>
              <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;