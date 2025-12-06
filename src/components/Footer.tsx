import { Link } from "react-router-dom";

export const Footer = ({ className, dark }: { className?: string; dark?: boolean }) => {
  const isDark = dark || className?.includes('bg-[#0a0a0a]') || className?.includes('bg-black');
  
  return (
    <footer className={`relative overflow-hidden ${isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#f5f5f5] border-t border-gray-200'} ${className || ''}`}>
      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 sm:py-20">
        
        {/* Main Grid - Logo and Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className={`text-2xl font-headline font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Gravity
              </span>
            </Link>
          </div>

          {/* Product Column */}
          <div>
            <h4 className={`text-sm font-medium mb-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/publishers"
                  className={`text-base transition-colors ${isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
                >
                  For Publishers
                </Link>
              </li>
              <li>
                <Link 
                  to="/advertisers"
                  className={`text-base transition-colors ${isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
                >
                  For Advertisers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className={`text-sm font-medium mb-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about"
                  className={`text-base transition-colors ${isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers"
                  className={`text-base transition-colors ${isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog"
                  className={`text-base transition-colors ${isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className={`text-sm font-medium mb-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/docs"
                  className={`text-base transition-colors ${isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link 
                  to="/help"
                  className={`text-base transition-colors ${isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <a 
                  href="https://calendly.com/zachtheoldham/iris-discovery?month=2025-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-base transition-colors ${isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-600'}`}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              © Gravity Inc. {new Date().getFullYear()}
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <Link 
                to="/terms"
                className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Terms of use
              </Link>
              <Link 
                to="/privacy"
                className={`text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Privacy policy
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/aigravity/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* X (Twitter) */}
              <a 
                href="https://x.com/gravity_ai"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
