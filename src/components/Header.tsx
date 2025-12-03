import { useState, useEffect, useRef } from 'react';
import { MobileNav } from './navigation/MobileNav';
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
          
          if (!headline || !header) {
            ticking = false;
            return;
          }
          
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
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 xl:px-10 py-2.5 backdrop-blur-md bg-background/95 border-b border-border transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${className || ''}`}
      >
        <div className="w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex items-center justify-between gap-4 lg:gap-6">
          {/* Logo - Far Left */}
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
            <img 
              src={gravityLogo} 
              alt="Gravity AI" 
              className="h-7 sm:h-8"
              style={{ transform: 'scale(2.5)', transformOrigin: 'left center', marginRight: '30px' }}
            />
            <span 
              className="font-headline font-bold text-foreground tracking-tight antialiased"
              style={{ fontSize: '1.5rem', marginLeft: '10px' }}
            >
              Gravity
            </span>
          </a>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 mx-auto">
            <a 
              href="/docs" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              Docs
            </a>
            <a 
              href="/login" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
            >
              Log in
            </a>
          </nav>

          {/* Right Section - Desktop - Far Right */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <button 
              className="metallic-button text-sm py-2.5 px-6"
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
