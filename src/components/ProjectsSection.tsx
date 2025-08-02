import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink, Shield, MessageSquare, Search, GraduationCap } from 'lucide-react';

const ProjectsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const projects = [
    {
      title: 'Cross AI Protect',
      description: 'Emergency voice responder system deployed across Cross River State',
      icon: Shield,
      category: 'Emergency Response',
      features: ['Real-time voice recognition', 'Emergency dispatch', 'Multi-language support'],
      status: 'Live in Cross River State',
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'Agent Lexi',
      description: 'WhatsApp AI assistant empowering Nigerian SMEs with voice automation',
      icon: MessageSquare,
      category: 'Business Intelligence',
      features: ['WhatsApp integration', 'Voice commands', 'Business analytics'],
      status: 'Serving 1000+ businesses',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'SmartBiz Intel',
      description: 'Web scraping and WhatsApp lead generation agent for businesses',
      icon: Search,
      category: 'Lead Generation',
      features: ['Automated web scraping', 'Lead qualification', 'WhatsApp outreach'],
      status: 'Beta with select clients',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Agent MISS',
      description: 'AI school assistant deployed at Mudiame University',
      icon: GraduationCap,
      category: 'Education Technology',
      features: ['Student support', 'Course guidance', 'Voice interactions'],
      status: 'Live at Mudiame University',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const playProjectDemo = (projectTitle: string) => {
    console.log(`Playing demo for ${projectTitle}`);
    // Voice demo functionality will be implemented after Supabase setup
  };

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-bold text-foreground mb-6">
            Real <span className="text-primary">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Voice AI solutions deployed across Nigeria, from emergency response to business automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            
            return (
              <Card
                key={index}
                className="project-card h-full"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${project.color} text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {project.category}
                    </span>
                  </div>
                  
                  <CardTitle className="text-2xl font-display mb-2">
                    {project.title}
                  </CardTitle>
                  
                  <CardDescription className="text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-accent">
                        {project.status}
                      </span>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={() => playProjectDemo(project.title)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Case Study
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Want to see how ODIA can transform your organization?
          </p>
          <Button size="lg" className="px-8">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;