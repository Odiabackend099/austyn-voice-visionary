import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Instagram, Music, Users } from 'lucide-react';

const SocialSection = () => {
  const socialLinks = [
    {
      platform: 'WhatsApp',
      handle: '+234 810 578 6326',
      description: 'Direct line to Austyn for partnerships and collaborations',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
      action: 'Message'
    },
    {
      platform: 'Instagram',
      handle: '@odia.ai.dev',
      description: 'Behind-the-scenes of building Nigeria\'s voice AI',
      icon: Instagram,
      color: 'from-pink-500 to-rose-500',
      action: 'Follow'
    },
    {
      platform: 'TikTok',
      handle: '@odia.dev',
      description: 'AI education and Nigerian tech innovation',
      icon: Music,
      color: 'from-black to-gray-700',
      action: 'Follow'
    },
    {
      platform: 'Discord',
      handle: 'odia.dev',
      description: 'Join the community of African AI builders',
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      action: 'Join'
    }
  ];

  const handleSocialClick = (platform: string, handle: string) => {
    switch (platform) {
      case 'WhatsApp':
        window.open(`https://wa.me/2348105786326`, '_blank');
        break;
      case 'Instagram':
        window.open(`https://instagram.com/odia.ai.dev`, '_blank');
        break;
      case 'TikTok':
        window.open(`https://tiktok.com/@odia.dev`, '_blank');
        break;
      case 'Discord':
        window.open(`https://discord.gg/odia-dev`, '_blank');
        break;
      default:
        console.log(`Clicked ${platform}: ${handle}`);
    }
  };

  return (
    <section id="connect" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-bold text-foreground mb-6">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the conversation about Africa's AI future. Connect directly with Austyn and the ODIA community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            
            return (
              <Card 
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
                onClick={() => handleSocialClick(social.platform, social.handle)}
              >
                <CardContent className="p-6 text-center relative">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-display font-semibold mb-2 text-foreground">
                      {social.platform}
                    </h3>
                    
                    <p className="text-primary font-mono text-sm mb-3">
                      {social.handle}
                    </p>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {social.description}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                    >
                      {social.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-hero rounded-2xl p-12 text-hero-foreground relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-accent rounded-full blur-xl" />
              <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-primary-glow rounded-full blur-xl" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-display font-bold mb-4">
                Have a specific project in mind?
              </h3>
              <p className="text-xl text-hero-foreground/80 mb-8 max-w-2xl mx-auto">
                Whether it's emergency response, business automation, or educational AI — let's build something incredible together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => handleSocialClick('WhatsApp', '+234 810 578 6326')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Austyn
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground/10"
                >
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;