import { Card } from '@/components/ui/card';
import { Code, Bot, Briefcase, Users } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "AI & Development",
      icon: <Code className="h-6 w-6" />,
      skills: [
        "Python", "AI Agent Development", "Voice AI (TTS/STT)", 
        "Natural Language Processing", "Machine Learning", "Deep Learning", 
        "Generative AI", "Prompt Engineering"
      ],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Automation & Platforms",
      icon: <Bot className="h-6 w-6" />,
      skills: [
        "WhatsApp Business API", "Telegram Bot Development", 
        "Workflow Automation", "API Integration", "Cloud Computing", 
        "Database Management", "System Architecture"
      ],
      gradient: "from-green-500 to-teal-600"
    },
    {
      title: "Business & Leadership",
      icon: <Briefcase className="h-6 w-6" />,
      skills: [
        "Strategic Planning", "Product Management", "Team Leadership", 
        "Business Development", "Market Analysis", "Innovation Management", 
        "Tech Entrepreneurship"
      ],
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "Communication & Collaboration",
      icon: <Users className="h-6 w-6" />,
      skills: [
        "Public Speaking", "Technical Writing", "Cross-functional Collaboration", 
        "Stakeholder Management", "Mentoring", "Community Building"
      ],
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive toolkit for building Nigeria's AI infrastructure
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index} className="p-8 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center`}>
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Ready to Collaborate?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Looking for partnerships, collaborations, or want to discuss how AI can transform your business? Let's connect and explore opportunities together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Open to Partnerships
                </span>
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                  Available for Consulting
                </span>
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  Speaking Engagements
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;