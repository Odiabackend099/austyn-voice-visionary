import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      </div>
    </nav>
  );
};

export default FloatingNav;