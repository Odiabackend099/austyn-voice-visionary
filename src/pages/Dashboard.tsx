import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/SidebarNav';
import DashboardHeader from '@/components/DashboardHeader';
import CourseGrid from '@/components/CourseGrid';

const Dashboard = () => {
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
            <CourseGrid />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;