import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import DashboardHeader from '@/components/DashboardHeader';

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
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      <ChatInterface />
    </div>
  );
};

export default Dashboard;