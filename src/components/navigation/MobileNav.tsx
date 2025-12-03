import { useState } from 'react';
import { navData } from './navData';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '../ui/button';
import gravityLogo from '@/assets/gravity-logo.png';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 999 }}
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-[300px] bg-background border-l border-border shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <img src={gravityLogo} alt="Gravity AI" className="h-8" />
            <button 
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CTAs at top */}
          <div className="flex flex-col gap-3 p-6 border-b border-border">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = '/login'}
            >
              Log In
            </Button>
            <button 
              className="metallic-button w-full text-sm py-3"
              onClick={() => window.location.href = '/demo'}
            >
              <span>Book A Demo</span>
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {/* For Publishers */}
              <div>
                <div className="flex items-center justify-between w-full py-2">
                  <a
                    href="/publishers"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    For Publishers
                  </a>
                  <button
                    onClick={() => toggleDropdown('publishers')}
                    className="p-1 hover:bg-accent rounded transition-colors"
                  >
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openDropdown === 'publishers' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openDropdown === 'publishers' ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-1 pl-4">
                    {navData.forPublishers.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={onClose}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* For Advertisers */}
              <div>
                <div className="flex items-center justify-between w-full py-2">
                  <a
                    href="/advertisers"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    For Advertisers
                  </a>
                  <button
                    onClick={() => toggleDropdown('advertisers')}
                    className="p-1 hover:bg-accent rounded transition-colors"
                  >
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openDropdown === 'advertisers' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openDropdown === 'advertisers' ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-1 pl-4">
                    {navData.forAdvertisers.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={onClose}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <a
                href="/how-it-works"
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={onClose}
              >
                How It Works
              </a>

              {/* Resources */}
              <div>
                <button
                  onClick={() => toggleDropdown('resources')}
                  className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  Resources
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown === 'resources' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openDropdown === 'resources' ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-1 pl-4">
                    {navData.resources.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={onClose}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company */}
              <div>
                <button
                  onClick={() => toggleDropdown('company')}
                  className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  Company
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown === 'company' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openDropdown === 'company' ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-1 pl-4">
                    {navData.company.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={onClose}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
