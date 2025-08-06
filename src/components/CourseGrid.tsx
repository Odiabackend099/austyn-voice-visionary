import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_url: string;
  price: number;
  created_at: string;
}

const CourseGrid = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-t-lg"></div>
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-16 bg-muted rounded"></div>
            </CardContent>
            <CardFooter>
              <div className="h-10 bg-muted rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Available Courses
          </h2>
          <p className="text-muted-foreground">
            Master entrepreneurship with Austyn Eguale's voice-AI courses
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          {courses.length} courses
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Card 
            key={course.id} 
            className="group hover:shadow-brand transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <div 
                className="h-48 bg-gradient-accent bg-cover bg-center"
                style={{ 
                  backgroundImage: course.cover_url ? `url(${course.cover_url})` : undefined 
                }}
              >
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-primary-foreground" />
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">
                  Voice-AI Course
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-3">
              <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>Austyn Eguale</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>2-3 hours</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-4">
              <p className="text-muted-foreground text-sm line-clamp-3">
                {course.description}
              </p>
            </CardContent>

            <CardFooter className="pt-0">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-naira">
                    {formatPrice(course.price)}
                  </span>
                  <span className="text-xs text-muted-foreground">One-time payment</span>
                </div>
                <Button 
                  onClick={() => navigate(`/courses/${course.slug}`)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                >
                  Enroll →
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            No courses available yet
          </h3>
          <p className="text-muted-foreground">
            New courses will be added soon. Stay tuned!
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseGrid;