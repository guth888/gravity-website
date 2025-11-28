import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import gravityLogo from '@/assets/gravity-logo.png';

export const Header = ({ className }: { className?: string }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-border/50 ${className || ''}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={gravityLogo} alt="Gravity" className="h-8 sm:h-10" />
            <span className="font-bold text-xl text-foreground">
              Gravity
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/publishers">For Publishers</NavLink>
            <NavLink to="/advertisers">For Advertisers</NavLink>
            <NavLink to="/#how-it-works">How It Works</NavLink>
            <NavLink to="/customers">Customers</NavLink>
          </nav>

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              to="/login"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/demo"
              className="btn-primary text-sm"
            >
              Get a Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <Link 
              to="/demo"
              className="btn-primary text-sm py-2 px-4"
            >
              Demo
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold text-lg">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="p-4 space-y-1">
              <MobileNavLink to="/publishers" onClick={() => setMobileMenuOpen(false)}>
                For Publishers
              </MobileNavLink>
              <MobileNavLink to="/advertisers" onClick={() => setMobileMenuOpen(false)}>
                For Advertisers
              </MobileNavLink>
              <MobileNavLink to="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </MobileNavLink>
              <MobileNavLink to="/customers" onClick={() => setMobileMenuOpen(false)}>
                Customers
              </MobileNavLink>
              
              <div className="pt-4 mt-4 border-t space-y-1">
                <MobileNavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Log In
                </MobileNavLink>
                <MobileNavLink to="/demo" onClick={() => setMobileMenuOpen(false)}>
                  Get a Demo
                </MobileNavLink>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

// Desktop nav link
const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to}
    className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
  >
    {children}
  </Link>
);

// Mobile nav link
const MobileNavLink = ({ 
  to, 
  children, 
  onClick 
}: { 
  to: string; 
  children: React.ReactNode; 
  onClick: () => void;
}) => (
  <Link 
    to={to}
    onClick={onClick}
    className="block py-3 px-4 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
  >
    {children}
  </Link>
);
