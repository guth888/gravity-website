import { useState, useEffect, useRef } from 'react';
import { NavDropdown } from './navigation/NavDropdown';
import { MobileNav } from './navigation/MobileNav';
import { navData } from './navigation/navData';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import gravityLogo from '@/assets/gravity-logo.png';

export const Header = ({ className }: { className?: string }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const headline = document.querySelector('.hero-headline');
          const header = headerRef.current;
          
          if (!headline || !header) return;
          
          const headlineRect = headline.getBoundingClientRect();
          const headerRect = header.getBoundingClientRect();
          
          const headerBottom = headerRect.bottom;
          const headlineTop = headlineRect.top;
          
          const isScrollingDown = currentScrollY > lastScrollY.current;
      
          // Hide navbar when it touches the headline (exact pixel detection)
          if (isScrollingDown && headerBottom >= headlineTop && headlineTop < headerRect.height) {
            setIsVisible(false);
          } 
          // Show navbar when scrolling up or when headline is below viewport
          else if (!isScrollingDown || headlineTop > headerRect.height) {
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 xl:px-10 py-3 backdrop-blur-md bg-background/95 border-b border-border transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${className || ''}`}
      >
        <div className="w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex items-center justify-between gap-4 lg:gap-6">
          {/* Logo - Far Left */}
          <a href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity shrink-0">
            <img src={gravityLogo} alt="Gravity AI" className="h-8 sm:h-10 md:h-12 lg:h-[90px]" />
            <span className="font-headline text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-tight antialiased">
              Gravity
            </span>
          </a>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 mx-auto">
            <NavDropdown label="For Publishers" items={navData.forPublishers} />
            <NavDropdown label="For Advertisers" items={navData.forAdvertisers} />
            <a 
              href="/#how-it-works" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              How It Works
            </a>
            <NavDropdown label="Resources" items={navData.resources} />
            <NavDropdown label="Company" items={navData.company} />
          </nav>

          {/* Right Section - Desktop - Far Right */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = '/login'}
            >
              Log In
            </Button>
            <button 
              className="metallic-button text-sm py-2.5 px-6"
              onClick={() => window.location.href = '/demo'}
            >
              <span>Get a Demo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3 shrink-0">
            <button 
              className="metallic-button text-xs py-2 px-4"
              onClick={() => window.location.href = '/demo'}
            >
              <span>Get a Demo</span>
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
