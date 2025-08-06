import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/SidebarNav';
import DashboardHeader from '@/components/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';

const DashboardProgress = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Mock progress data - in a real app, this would come from your database
  const progressData = [
    {
      course: "The Founder Mindset",
      progress: 75,
      completedLessons: 9,
      totalLessons: 12,
      lastAccessed: "2 days ago",
      status: "In Progress"
    },
    {
      course: "Sales Psychology",
      progress: 100,
      completedLessons: 8,
      totalLessons: 8,
      lastAccessed: "1 week ago",
      status: "Completed"
    },
    {
      course: "Fundraising Fundamentals",
      progress: 30,
      completedLessons: 3,
      totalLessons: 10,
      lastAccessed: "3 days ago",
      status: "In Progress"
    }
  ];

  const totalProgress = Math.round(
    progressData.reduce((acc, course) => acc + course.progress, 0) / progressData.length
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <SidebarNav />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                  My Progress
                </h1>
                <p className="text-muted-foreground">
                  Track your learning journey and achievements
                </p>
              </div>

              {/* Overall Progress Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalProgress}%</div>
                    <Progress value={totalProgress} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{progressData.length}</div>
                    <p className="text-xs text-muted-foreground">Active courses</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {progressData.filter(c => c.status === 'Completed').length}
                    </div>
                    <p className="text-xs text-muted-foreground">Courses finished</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24h</div>
                    <p className="text-xs text-muted-foreground">Total watched</p>
                  </CardContent>
                </Card>
              </div>

              {/* Course Progress Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {progressData.map((course, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{course.course}</h3>
                            <Badge variant={course.status === 'Completed' ? 'default' : 'secondary'}>
                              {course.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                            <span>Last accessed {course.lastAccessed}</span>
                          </div>
                          <Progress value={course.progress} className="w-full" />
                        </div>
                        <div className="ml-6 text-right">
                          <div className="text-2xl font-bold text-primary">{course.progress}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardProgress;