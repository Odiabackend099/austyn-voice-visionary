import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/SidebarNav';
import DashboardHeader from '@/components/DashboardHeader';
import CourseGrid from '@/components/CourseGrid';

const DashboardCourses = () => {
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
                  All Courses
                </h1>
                <p className="text-muted-foreground">
                  Browse and enroll in our complete course library
                </p>
              </div>
              <CourseGrid />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardCourses;