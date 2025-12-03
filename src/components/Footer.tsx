import { Link } from "react-router-dom";

export const Footer = ({ className }: { className?: string }) => {
  const navigation = {
    publishers: [
      { name: 'Docs', href: '/docs' },
    ],
    advertisers: [
      { name: 'FAQ', href: '/#faq' },
    ],
    company: [
      { name: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className={`relative overflow-hidden bg-background border-t border-border ${className || ''}`}>
      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32">
        
        {/* Top Section - Brand */}
        <div className="text-center mb-16 sm:mb-20">
          <Link to="/" className="inline-block">
            <span className="text-2xl sm:text-3xl font-headline font-bold text-foreground tracking-tight">
              Gravity
            </span>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-16 sm:mb-20 max-w-3xl mx-auto text-center">
          {/* For Publishers */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Publishers
            </p>
            <ul className="space-y-2">
              {navigation.publishers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="inline-block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Advertisers */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Advertisers
            </p>
            <ul className="space-y-2">
              {navigation.advertisers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="inline-block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
              Company
            </p>
            <ul className="space-y-2">
              {navigation.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="inline-block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gravity AI
          </p>
        </div>
      </div>
    </footer>
  );
};
