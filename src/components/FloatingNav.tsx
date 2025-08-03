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
      className={cn(
        'floating-nav',
        'transition-all duration-500',
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      )}
    >
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
        
        <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-border">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  {user.user_metadata?.display_name || user.email}
                </span>
              </div>
              <Button
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
    </nav>
  );
};

export default FloatingNav;