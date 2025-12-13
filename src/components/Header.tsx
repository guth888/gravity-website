import { useState, useEffect, useRef } from 'react';
import { MobileNav } from './navigation/MobileNav';
import { Menu } from 'lucide-react';
import gravityLogoLight from '@/assets/new-gravitylogo-forwhitebackground.png';
import gravityLogoDark from '@/assets/new-gravitylogo.png';

interface HeaderProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Header = ({ className, variant = 'light' }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const isDark = variant === 'dark';

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
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-5 lg:px-6 py-3.5 backdrop-blur-md transition-transform duration-300 ease-out ${
          isDark 
            ? 'bg-[#0a0a0a]/95 border-b border-white/10' 
            : 'bg-background/95 border-b border-border'
        } ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${className || ''}`}
      >
        <div className="w-full max-w-[1400px] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto flex items-center justify-between gap-3 lg:gap-4">
          {/* Logo - Far Left */}
          <a href="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity shrink-0">
            <img 
              src={isDark ? gravityLogoDark : gravityLogoLight} 
              alt="Gravity AI" 
              className="h-7 sm:h-8"
              style={{ transform: 'scale(3.6)', transformOrigin: 'left center', marginRight: '36px' }}
            />
            <span 
              className={`font-headline font-bold tracking-tight antialiased ${isDark ? 'text-white' : 'text-foreground'}`}
              style={{ fontSize: '1.5rem', marginLeft: '8px' }}
            >
              Gravity
            </span>
          </a>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-5 mx-auto">
            <a 
              href="/advertisers" 
              className={`text-sm font-normal transition-colors py-2 tracking-tight ${
                isDark ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Advertisers
            </a>
            <a 
              href="/publishers" 
              className={`text-sm font-normal transition-colors py-2 tracking-tight ${
                isDark ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Publishers
            </a>
            <a 
              href="/docs" 
              className={`text-sm font-normal transition-colors py-2 tracking-tight ${
                isDark ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Docs
            </a>
            <a 
              href="/careers" 
              className={`text-sm font-normal transition-colors py-2 tracking-tight ${
                isDark ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              Careers
            </a>
            <a 
              href="/about" 
              className={`text-sm font-normal transition-colors py-2 tracking-tight ${
                isDark ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              About
            </a>
          </nav>

          {/* Right Section - Desktop - Far Right */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a 
              href="/login" 
              className={`font-medium transition-colors py-2 ${
                isDark ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-foreground'
              }`}
              style={{ fontSize: '15px' }}
            >
              Log in
            </a>
            <a 
              href="/signup"
              className={isDark ? "px-[24px] py-[10px] bg-white text-[#0a0a0a] font-medium rounded-full hover:bg-white/90 transition-colors" : "metallic-button"}
              style={{ fontSize: '15px', display: 'inline-block', textDecoration: 'none' }}
            >
              <span>Sign up</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3 shrink-0">
            <a 
              href="/signup"
              className={isDark ? "px-[14px] py-[8px] bg-white text-[#0a0a0a] font-medium rounded-full hover:bg-white/90 transition-colors text-[11px]" : "metallic-button"}
              style={isDark ? { display: 'inline-block', textDecoration: 'none' } : { padding: '8px 14px', fontSize: '11px', display: 'inline-block', textDecoration: 'none' }}
            >
              <span>Sign up</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-accent'}`}
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
