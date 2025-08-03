import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Mic, Brain, Code, Users, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const AISchoolSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already on the waitlist",
            description: "This email is already registered for the waitlist.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        setIsSubmitted(true);
        toast({
          title: "Welcome to the waitlist!",
          description: "We'll notify you when enrollment opens."
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const curriculum = [
    {
      title: 'Prompt Engineering Mastery',
      description: 'Master the art of communicating with AI systems',
      icon: Brain,
      duration: '4 weeks',
      level: 'Beginner'
    },
    {
      title: 'Voice Automation Systems',
      description: 'Build voice-powered applications with ODIA technology',
      icon: Mic,
      duration: '6 weeks',
      level: 'Intermediate'
    },
    {
      title: 'Claude + TTS Integration',
      description: 'Create sophisticated AI voice applications',
      icon: Code,
      duration: '8 weeks',
      level: 'Advanced'
    },
    {
      title: 'AI Business Applications',
      description: 'Deploy AI solutions for real business problems',
      icon: Users,
      duration: '10 weeks',
      level: 'Expert'
    }
  ];

  const features = [
    'First voice-powered AI curriculum in Africa',
    'Live projects with Nigerian businesses',
    'Direct mentorship from Austyn Eguale',
    'ODIA technology stack training',
    'Job placement assistance',
    'Certificate of completion'
  ];

  return (
    <section id="ai-school" className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <Badge className="mb-6 px-4 py-2 text-sm font-semibold">
            Coming Soon
          </Badge>
          
          <h2 className="text-5xl font-display font-bold text-foreground mb-6">
            Africa's First <span className="text-primary">Voice-Powered</span> AI School
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join the next generation of African AI builders. Learn to create voice-powered applications that transform businesses and communities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Curriculum */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-display font-semibold mb-6">
                What You'll Learn
              </h3>
              
              <div className="space-y-4">
                {curriculum.map((course, index) => {
                  const IconComponent = course.icon;
                  
                  return (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{course.title}</h4>
                            <div className="flex space-x-2">
                              <Badge variant="outline">{course.duration}</Badge>
                              <Badge variant="secondary">{course.level}</Badge>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground">{course.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Program Highlights</h4>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gold flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Waitlist Form */}
          <div className="lg:sticky lg:top-24">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                
                <CardTitle className="text-2xl font-display">
                  Join the Waitlist
                </CardTitle>
                
                <CardDescription className="text-base">
                  Be among the first 100 students to shape Africa's AI future
                </CardDescription>
              </CardHeader>

              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-center"
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      Early access opens Q2 2025. Limited to 100 students.
                    </p>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-green-600">
                      You're on the list!
                    </h3>
                    
                    <p className="text-muted-foreground">
                      We'll notify you as soon as enrollment opens.
                    </p>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Questions about the program?
                    </p>
                    <Button variant="outline" size="sm">
                      Talk to Austyn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISchoolSection;