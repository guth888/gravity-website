import { useState } from 'react';
import { NavItem } from './navData';
import { ChevronDown } from 'lucide-react';

interface NavDropdownProps {
  label: string;
  items: NavItem[];
  href?: string;
}

export const NavDropdown = ({ label, items, href }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="nav-item relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="nav-link flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2">
        {href ? (
          <a href={href} className="hover:text-foreground transition-colors">
            {label}
          </a>
        ) : (
          <span>{label}</span>
        )}
        <ChevronDown 
          className={`nav-arrow w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}
        />
      </div>
      
      <div 
        className={`nav-dropdown absolute top-full left-1/2 -translate-x-1/2 pt-4 min-w-[200px] bg-background border border-border rounded-xl shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
        style={{ 
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          zIndex: 1001 
        }}
      >
        <div 
          className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-xl transition-transform duration-300 ${
            isOpen ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(192, 192, 192, 0.8) 50%, transparent 100%)'
          }}
        />
        
        <div className="py-3">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="dropdown-item relative block px-5 py-2.5 text-sm text-foreground/70 hover:text-foreground transition-all duration-300 overflow-hidden"
            >
              <div 
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-white -translate-x-full transition-transform duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              />
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
