import { Link } from "react-router-dom";

export const Footer = ({ className, dark }: { className?: string; dark?: boolean }) => {
  const isDark = dark || className?.includes('bg-[#0a0a0a]');
  
  return (
    <footer className={`relative overflow-hidden ${isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-background border-t border-border'} ${className || ''}`}>
      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32">
        
        {/* Top Section - Brand */}
        <div className="text-center mb-16 sm:mb-20">
          <Link to="/" className="inline-block">
            <span className={`text-2xl sm:text-3xl font-headline font-bold tracking-tight ${isDark ? 'text-white' : 'text-foreground'}`}>
              Gravity
            </span>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 sm:mb-20 max-w-3xl mx-auto text-center">
          {/* Publishers */}
          <div>
            <Link 
              to="/publishers"
              className={`text-xs uppercase tracking-[0.15em] transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Publishers
            </Link>
          </div>

          {/* Advertisers */}
          <div>
            <Link 
              to="/advertisers"
              className={`text-xs uppercase tracking-[0.15em] transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Advertisers
            </Link>
          </div>

          {/* Docs */}
          <div>
            <Link 
              to="/docs"
              className={`text-xs uppercase tracking-[0.15em] transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Docs
            </Link>
          </div>

          {/* Contact */}
          <div>
            <a 
              href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs uppercase tracking-[0.15em] transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Contact
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="text-center">
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>
            © {new Date().getFullYear()} Gravity AI
          </p>
        </div>
      </div>
    </footer>
  );
};
