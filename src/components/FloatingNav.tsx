import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Story', id: 'story' },
    { label: 'Projects', id: 'projects' },
    { label: 'AI School', id: 'ai-school' },
    { label: 'Connect', id: 'connect' },
  ];

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        'fixed top-4 inset-x-0 z-50',
        'transition-all duration-500',
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between rounded-full border border-border bg-background/80 backdrop-blur px-4 py-2 shadow-md">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3 pl-6 border-l border-border">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="default" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="hidden sm:flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm text-muted-foreground">
                    {user.user_metadata?.display_name || user.email}
                  </span>
                </div>
                <Button
                  aria-label="Sign out"
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-muted-foreground hover:text-primary"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNav;