import { Card } from '@/components/ui/card';
import { GraduationCap, Calendar } from 'lucide-react';

const EducationSection = () => {
  const education = [
    {
      degree: "MBA, Artificial Intelligence & Innovation",
      institution: "University of Dubai",
      duration: "2020 – 2022",
      focus: "Advanced AI Architectures, Machine Learning for Business, Innovation Management, Tech Entrepreneurship, Data Science Applications in Emerging Markets"
    },
    {
      degree: "BSc, Environmental Science",
      institution: "Caritas University",
      duration: "2013 – 2017",
      focus: "Foundation in analytical thinking and research methodologies"
    }
  ];

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Education
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Academic foundation in AI, innovation, and business leadership
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="p-8 bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-lg font-medium text-secondary mb-2">
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{edu.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pl-16">
                  <p className="text-muted-foreground leading-relaxed">
                    <span className="font-medium">Focus: </span>
                    {edu.focus}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;