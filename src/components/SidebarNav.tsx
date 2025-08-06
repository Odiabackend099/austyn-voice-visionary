import { BookOpen, TrendingUp, CreditCard, Settings, LogOut, Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarFooter 
} from '@/components/ui/sidebar';

const SidebarNav = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Courses', href: '/dashboard/courses' },
    { icon: TrendingUp, label: 'My Progress', href: '/dashboard/progress' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <Sidebar className="w-64 border-r border-border bg-card">
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-foreground">ODIA School</h2>
            <p className="text-xs text-muted-foreground">AI Learning Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to={item.href}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'text-foreground hover:bg-muted'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          onClick={handleSignOut}
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;