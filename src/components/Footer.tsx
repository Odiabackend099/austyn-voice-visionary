import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-hero text-hero-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/5c695c83-888a-4e31-9d9c-32989ffb3962.png" 
                alt="ODIA Logo" 
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-2xl font-display font-bold text-gold">
                  ODIA.dev
                </h3>
                <p className="text-sm text-hero-foreground/70">
                  Voice AI for Africa
                </p>
              </div>
            </div>
            
            <blockquote className="text-lg font-display italic text-hero-foreground/90 leading-relaxed">
              "Africa deserves her own voice in the AI age."
            </blockquote>
            
            <p className="text-hero-foreground/70 text-sm leading-relaxed">
              Building Nigeria's voice AI infrastructure to empower businesses, 
              emergency services, and educational institutions across the continent.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-gold">
              Explore
            </h4>
            <nav className="space-y-3">
              {[
                { label: 'My Story', href: '#story' },
                { label: 'Real Projects', href: '#projects' },
                { label: 'AI School', href: '#ai-school' },
                { label: 'Connect', href: '#connect' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-hero-foreground/70 hover:text-hero-foreground transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-lg font-display font-semibold mb-6 text-gold">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-hero-foreground/50 mb-1">
                  Direct Line
                </p>
                <a 
                  href="https://wa.me/2348105786326"
                  className="text-hero-foreground hover:text-gold transition-colors"
                >
                  +234 810 578 6326
                </a>
              </div>
              
              <div>
                <p className="text-sm text-hero-foreground/50 mb-1">
                  Email
                </p>
                <a 
                  href="mailto:austyn@odia.dev"
                  className="text-hero-foreground hover:text-gold transition-colors"
                >
                  austyn@odia.dev
                </a>
              </div>
              
              <div>
                <p className="text-sm text-hero-foreground/50 mb-1">
                  Company
                </p>
                <p className="text-hero-foreground/70">
                  INTECH.ODIA LTD
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-hero-foreground/20 mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6 text-sm text-hero-foreground/50">
            <span>© 2025 ODIA.dev. All rights reserved.</span>
            <a href="#" className="hover:text-hero-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-hero-foreground transition-colors">
              Terms of Service
            </a>
          </div>

          <div className="text-sm text-hero-foreground/50">
            Built with ❤️ in Nigeria
          </div>
        </div>

        {/* Floating mission statement */}
        <div className="text-center mt-12 pt-8 border-t border-hero-foreground/10">
          <p className="text-sm text-hero-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Proudly building the future of voice AI from Lagos, Nigeria. 
            Empowering African innovation, one voice at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;