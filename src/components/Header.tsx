import { useState, useEffect, useRef } from 'react';
import { MobileNav } from './navigation/MobileNav';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import gravityLogo from '@/assets/gravity-logo.png';

export const Header = ({ className }: { className?: string }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show at the very top
      if (currentScrollY < 50) {
        setIsVisible(true);
        prevScrollY.current = currentScrollY;
        return;
      }
      
      // Determine scroll direction
      if (currentScrollY > prevScrollY.current + 5) {
        // Scrolling DOWN - hide navbar
        setIsVisible(false);
        prevScrollY.current = currentScrollY;
      } else if (currentScrollY < prevScrollY.current - 5) {
        // Scrolling UP - show navbar
        setIsVisible(true);
        prevScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-5 lg:px-6 py-2.5 backdrop-blur-md bg-background/95 border-b border-border transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${className || ''}`}
      >
        <div className="w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex items-center justify-between gap-3 lg:gap-4">
          {/* Logo - Far Left */}
          <a href="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity shrink-0">
            <img 
              src={gravityLogo} 
              alt="Gravity AI" 
              className="h-7 sm:h-8"
              style={{ transform: 'scale(2.5)', transformOrigin: 'left center', marginRight: '24px' }}
            />
            <span 
              className="font-headline font-bold text-foreground tracking-tight antialiased"
              style={{ fontSize: '1.5rem', marginLeft: '8px' }}
            >
              Gravity
            </span>
          </a>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-5 mx-auto">
            <a 
              href="/advertisers" 
              className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors py-2 tracking-tight"
            >
              Advertisers
            </a>
            <a 
              href="/publishers" 
              className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors py-2 tracking-tight"
            >
              Publishers
            </a>
            <a 
              href="/docs" 
              className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors py-2 tracking-tight"
            >
              Docs
            </a>
            <a 
              href="/login" 
              className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors py-2 tracking-tight"
            >
              Log in
            </a>
          </nav>

          {/* Right Section - Desktop - Far Right */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button 
              className="metallic-button text-xs py-2 px-4"
              onClick={() => window.open('https://calendly.com/zachtheoldham/iris-discovery?month=2025-11', '_blank')}
            >
              <span>Book A Demo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3 shrink-0">
            <button 
              className="metallic-button text-xs py-2 px-4"
              onClick={() => window.open('https://calendly.com/zachtheoldham/iris-discovery?month=2025-11', '_blank')}
            >
              <span>Book A Demo</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
