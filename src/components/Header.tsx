import { useState, useEffect, useRef } from 'react';
import { MobileNav } from './navigation/MobileNav';
import { Menu } from 'lucide-react';
import gravityLogo from '@/assets/new-gravitylogo-forwhitebackground.png';

export const Header = ({ className }: { className?: string }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show header when near top of page
      if (currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Scrolling UP - show header
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } 
      // Scrolling DOWN - hide header
      else if (currentScrollY > lastScrollY.current + 5) {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-5 lg:px-6 py-2.5 backdrop-blur-md bg-background/95 border-b border-border transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${className || ''}`}
      >
        <div className="w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex items-center justify-between gap-3 lg:gap-4">
          {/* Logo - Far Left */}
          <a href="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity shrink-0">
            <img 
              src={gravityLogo} 
              alt="Gravity AI" 
              className="h-7 sm:h-8"
              style={{ transform: 'scale(3.2)', transformOrigin: 'left center', marginRight: '32px' }}
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
              href="/careers" 
              className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors py-2 tracking-tight"
            >
              Careers
            </a>
            <a 
              href="/about" 
              className="text-sm font-normal text-foreground/70 hover:text-foreground transition-colors py-2 tracking-tight"
            >
              About
            </a>
          </nav>

          {/* Right Section - Desktop - Far Right */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a 
              href="/login" 
              className="font-medium text-foreground/70 hover:text-foreground transition-colors py-2"
              style={{ fontSize: '15px' }}
            >
              Log in
            </a>
            <a 
              href="/login"
              className="metallic-button"
              style={{ padding: '9px 18px', fontSize: '12px', display: 'inline-block', textDecoration: 'none' }}
            >
              <span>Sign up</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3 shrink-0">
            <a 
              href="/login"
              className="metallic-button"
              style={{ padding: '8px 14px', fontSize: '11px', display: 'inline-block', textDecoration: 'none' }}
            >
              <span>Sign up</span>
            </a>
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
