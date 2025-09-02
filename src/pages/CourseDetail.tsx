import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Play, Clock, Users, Star, CheckCircle, ArrowLeft } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/SidebarNav';
import DashboardHeader from '@/components/DashboardHeader';
import SEOHead from '@/components/SEOHead';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_url: string;
  price: number;
  created_at: string;
}

interface Lesson {
  id: string;
  title: string;
  video_url: string;
  duration: number;
  order_index: number;
}

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
}

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchCourseData();
    }
  }, [slug]);

  const fetchCourseData = async () => {
    try {
      // Fetch course
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch lessons
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseData.id)
        .order('order_index');

      if (lessonsError) throw lessonsError;
      setLessons(lessonsData || []);

      // Fetch testimonials
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('*')
        .limit(5);

      if (testimonialsError) throw testimonialsError;
      setTestimonials(testimonialsData || []);

    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!course || !user) return;

    setPurchasing(true);
    try {
      // Create checkout session via edge function (to be implemented)
      console.log('Initiating purchase for course:', course.id);
      // This would call Flutterwave checkout
    } catch (error) {
      console.error('Purchase error:', error);
    } finally {
      setPurchasing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <SidebarNav />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main className="flex-1 p-6">
              <div className="animate-pulse space-y-6">
                <div className="h-64 bg-muted rounded-lg"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (!course) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <SidebarNav />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main className="flex-1 p-6">
              <div className="text-center py-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Course not found
                </h2>
                <p className="text-muted-foreground">
                  The course you're looking for doesn't exist.
                </p>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <SEOHead
        title={`${course.title} | ODIA Courses`}
        description={course.description}
        type="course"
        canonicalUrl={`${window.location.origin}/courses/${course.slug}`}
        image={course.cover_url || undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.description,
          provider: { "@type": "Organization", name: "ODIA" },
          offers: { "@type": "Offer", priceCurrency: "NGN", price: course.price }
        }}
      />
      <div className="min-h-screen flex w-full bg-background">
        <SidebarNav />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1">
            {/* Hero Video Section */}
            <div className="relative h-96 bg-gradient-accent">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: course.cover_url ? `url(${course.cover_url})` : undefined 
                }}
              >
                <div className="absolute inset-0 bg-primary/80"></div>
              </div>
              <div className="relative z-10 h-full flex items-center justify-center">
                <Button 
                  size="lg" 
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  variant="outline"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Preview
                </Button>
              </div>
            </div>

            <div className="p-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Course Header */}
                  <div>
                    <Button variant="ghost" className="mb-4 text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to courses
                    </Button>
                    <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                      {course.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Austyn Eguale</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{lessons.reduce((acc, lesson) => acc + lesson.duration, 0) / 60 | 0} minutes total</span>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">
                        Voice-first learning
                      </Badge>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Curriculum */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        Course Curriculum
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {lessons.map((lesson, index) => (
                          <AccordionItem key={lesson.id} value={`lesson-${index}`}>
                            <AccordionTrigger className="text-left">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="font-medium">{lesson.title}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {formatDuration(lesson.duration)}
                                  </div>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-11 text-muted-foreground">
                                In this lesson, you'll dive deep into the core concepts and practical applications.
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>

                  {/* Testimonials */}
                  {testimonials.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>What Students Say</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="border-l-4 border-primary pl-4">
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <p className="text-foreground mb-2">"{testimonial.content}"</p>
                              <p className="text-sm text-muted-foreground">— {testimonial.name}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="sticky top-24">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-naira mb-2">
                          {formatPrice(course.price)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          One-time payment • Lifetime access
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full mb-4" 
                        size="lg"
                        onClick={handlePurchase}
                        disabled={purchasing}
                      >
                        {purchasing ? 'Processing...' : `Pay ${formatPrice(course.price)}`}
                      </Button>
                      
                      <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>Lifetime access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>Mobile & desktop friendly</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>Voice-optimized for 2G/3G</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>Certificate of completion</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CourseDetail;