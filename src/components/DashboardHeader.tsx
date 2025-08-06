import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { SidebarTrigger } from '@/components/ui/sidebar';

const DashboardHeader = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    const firstName = user?.user_metadata?.display_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';
    
    if (hour < 12) return `Good morning, ${firstName}`;
    if (hour < 17) return `Good afternoon, ${firstName}`;
    return `Good evening, ${firstName}`;
  };

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              {getGreeting()}
            </h1>
            <p className="text-sm text-muted-foreground">
              Ready to level-up your entrepreneurship game?
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="relative">
            <Search className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>
          
          <Avatar className="h-8 w-8 ring-2 ring-primary/10">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;